//StaffCaseAssign.tsx
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  MapPin,
  MessageSquare,
  Send,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  PieChart,
  Users,
  Bell,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from '@/components/StatusBadge';
import { useEffect } from 'react';

interface AssignedStaff {
  id: string;
  name: string;
  department: string;
}

interface Case {
  id: string;
  referenceNumber?: string;
  type: 'service' | 'complaint';
  category: string;
  description: string;
  status: 'submitted' | 'under_review' | 'progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  submittedDate: string;
  citizen: string;
  citizenPhone?: string;
  citizenEmail?: string;
  location: string;
  assignedTo: AssignedStaff | null;
  notes: { author: string; text: string; date: string }[];
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  activeCases: number;
  resolvedThisMonth: number;
  status: 'available' | 'busy' | 'offline';
}

const StaffCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  const storedUser = localStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;

  // Find the case by ID
 const [caseData, setCaseData] = useState<Case | null>(null);
const [loading, setLoading] = useState(true);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
const [teamMembers, setTeamMembers] = useState<StaffMember[]>([]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddNote = () => {
    if (caseData && newNote.trim()) {
      setCaseData({
        ...caseData,
        notes: [...caseData.notes, { author: currentUser?.name || 'Unknown', text: newNote, date: new Date().toLocaleString() }],
      });
      setNewNote('');
    }
  };

const handleStatusChange = async (
  newStatus: 'submitted' | 'under_review' | 'progress' | 'resolved' | 'closed'
) => {
  if (!caseData) return;

  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/cases/${caseData.id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          type: caseData.type,
        }),
      }
    );

    // ✅ update UI after DB success
    setCaseData({ ...caseData, status: newStatus });

  } catch (err) {
    console.error("Failed to update status:", err);
  }
};

const handleAssign = (staffId: string) => {
  const staff = teamMembers.find(m => m.id === staffId);

  if (caseData && staff) {
    // UI update immediately
    setCaseData({
      ...caseData,
      assignedTo: { id: staff.id, name: staff.name, department: staff.department },
      status: 'under_review'
    });

    setAssignDialogOpen(false);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/dashboard/cases/${caseData.id}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        staffId: staff.id,      //  correct key
        type: caseData.type     //  VERY IMPORTANT (service or complaint)
      })
    })
      .then(res => res.json())
      .then(data => console.log("Assigned:", data))
      .catch(console.error);
  }
};

  useEffect(() => {
  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/staff/team`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch team");
      const data = await res.json();
      const officers = data.filter((m: any) => m.role.toUpperCase() === 'OFFICER');
      setTeamMembers(officers);
    } catch (err) {
      console.error(err);
    }
  };

  fetchTeam();
}, []);
  
 useEffect(() => {
  const fetchCase = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/dashboard/cases/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Not found");

      const data = await res.json();

      const formattedCase: Case = {
        id: data.reference_number,
        type: data.type,
        category: data.category,
        description: data.description,
        status: data.status,
        priority: data.priority || "medium",
       submittedDate: new Date(data.created_at).toLocaleString(),
        citizen: data.user?.name || "Anonymous",
        citizenPhone: data.user?.phone,
        citizenEmail: data.user?.email,
        location: data.location || "Unknown",
        assignedTo: data.assignedTo || null,
        notes: data.notes || [],
      };

      setCaseData(formattedCase);
    } catch (error) {
      console.error(error);
      setCaseData(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchCase();
}, [id]);

if (loading) {
  return <div>Loading case details...</div>;
}

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Case Not Found</h2>
          <p className="text-muted-foreground mb-4">The case you're looking for doesn't exist.</p>
          <Button onClick={() =>navigate(`/staff/cases/`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Jabana Sector</h1>
                <p className="text-xs text-sidebar-foreground/70">Staff Portal</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/staff"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/staff/cases"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>All Cases</span>
            </Link>
            <Link
              to="/staff/priority"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>High Priority</span>
            </Link>
            <Link
              to="/staff/team"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Team</span>
            </Link>
            <Link
              to="/reports"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <PieChart className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            <Link
              to="/notifications"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link
              to="/staff/settings"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <UserCircle className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentUser.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate uppercase">{currentUser.role}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/staff/cases')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">Case Details</h1>
                <p className="text-sm text-muted-foreground hidden sm:block font-mono">{caseData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Case Header */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{caseData.category}</CardTitle>
                    <p className="text-sm text-muted-foreground font-mono mt-1">{caseData.id}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getPriorityColor(caseData.priority)}>
                      {caseData.priority} priority
                    </Badge>
                    <StatusBadge status={caseData.status} />
                    {caseData.type === 'complaint' && (
                      <Badge variant="destructive">Complaint</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{caseData.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      Citizen
                    </h4>
                    <p className="text-sm">{caseData.citizen}</p>
                    {caseData.citizenPhone && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" />
                        {caseData.citizenPhone}
                      </p>
                    )}
                    {caseData.citizenEmail && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="h-3 w-3" />
                        {caseData.citizenEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h4>
                    <p className="text-sm text-muted-foreground">{caseData.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Submitted
                    </h4>
                    <p className="text-sm text-muted-foreground">{caseData.submittedDate}</p>
                  </div>
                </div>

                {/* Assignment */}
            <div className="border-t border-border pt-6">
  <h4 className="text-sm font-medium mb-3">Assigned To</h4>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <UserCircle className="h-5 w-5 text-primary" />
      </div>
    <span className="font-medium">
  {caseData.assignedTo?.name ? `${caseData.assignedTo.name} — ${caseData.assignedTo.department}` : 'Not Assigned'}
</span>

    </div>
    <Button variant="outline" size="sm" onClick={() => setAssignDialogOpen(true)}>
      Assign
    </Button>
  </div>

  {assignDialogOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="font-bold mb-4">Assign Staff</h3>
     <Select onValueChange={handleAssign}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select staff..." />
  </SelectTrigger>
<SelectContent>
  {teamMembers.map((staff) => (
    <SelectItem key={staff.id} value={staff.id}>
      {`${staff.name ?? ''} — ${String(staff.department ?? '')}`}
    </SelectItem>
  ))}
</SelectContent>
</Select>
        <Button className="mt-4" onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
      </div>
    </div>
  )}
</div>

                {/* Status Update */}
             <div className="border-t border-border pt-6">
  <h4 className="text-sm font-medium mb-3">Update Status</h4>
  <Select
    value={caseData.status}
    onValueChange={(val: string) =>
      handleStatusChange(
        val as 'submitted' | 'under_review' | 'progress' | 'resolved' | 'closed'
      )
    }
  >
    <SelectTrigger className="w-full md:w-64">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="submitted">Submitted</SelectItem>
      <SelectItem value="under_review">Under Review</SelectItem>
      <SelectItem value="progress">In Progress</SelectItem>
      <SelectItem value="resolved">Resolved</SelectItem>
      <SelectItem value="closed">Closed</SelectItem>
    </SelectContent>
  </Select>
</div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Internal Notes ({caseData.notes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="max-h-[300px]">
                  <div className="space-y-3">
                    {caseData.notes.length > 0 ? (
                      caseData.notes.map((note, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{note.author}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {note.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No notes yet</p>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Textarea
                    placeholder="Add internal note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffCaseDetail;
