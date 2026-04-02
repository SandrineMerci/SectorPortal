import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Users,
  Bell,
  Search,
  ChevronRight,
  AlertTriangle,
  ArrowUp,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  MapPin,
  MessageSquare,
  Send,
  GripVertical,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  PieChart,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from '@/components/StatusBadge';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

interface Case {
  id: string;
  type: 'service' | 'complaint';
  category: string;
  description: string;
  status: 'submitted' | 'review' | 'progress' | 'resolved' | 'draft';
  priority: 'high' | 'medium' | 'low';
  submittedDate: string;
  citizen: string;
  citizenPhone?: string;
  citizenEmail?: string;
  location: string;
  assignedTo: string | null;
  notes: { author: string; text: string; date: string }[];
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  activeCases: number;
  resolvedThisMonth: number;
}

const StaffCases = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [cases, setCases] = useState<Case[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

  const storedUser = localStorage.getItem("user");
 // console.log("Stored user:", localStorage.getItem("user"));
const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const teamMembers: StaffMember[] = [
    { id: '1', name: 'Alice Mukamana', role: 'Sector Officer', activeCases: 3, resolvedThisMonth: 12 },
    { id: '2', name: 'Bob Nshimiyimana', role: 'Sector Officer', activeCases: 5, resolvedThisMonth: 8 },
    { id: '3', name: 'Claire Uwase', role: 'Sector Officer', activeCases: 2, resolvedThisMonth: 15 },
    { id: '4', name: 'David Mugabo', role: 'Sector Officer', activeCases: 4, resolvedThisMonth: 6 },
  ];


const validCases = cases.filter(c => c.status !== "draft");

const stats = {
  total: validCases.length,
  new: validCases.filter(c => c.status === 'submitted').length,
  inProgress: validCases.filter(c => c.status === 'progress' || c.status === 'review').length,
  resolved: validCases.filter(c => c.status === 'resolved').length,
  highPriority: validCases.filter(c => c.priority === 'high').length,
};

const filteredCases = cases.filter(c => {
  if (c.status === "draft") return false;

  // 🔍 Build ONE searchable string (everything)
  const searchableText = `
    ${c.id}
    ${c.category}
    ${c.description}
    ${c.citizen}
    ${c.location}
    ${c.assignedTo || ""}
    ${c.status}
    ${c.priority}
  `.toLowerCase();

  const matchesSearch = searchableText.includes(searchQuery.toLowerCase());

  const matchesPriority =
    selectedPriority === "all" || c.priority === selectedPriority;

  const matchesStatus =
    selectedStatus === "all" || c.status === selectedStatus;

  return matchesSearch && matchesPriority && matchesStatus;
});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddNote = () => {
    if (selectedCase && newNote.trim()) {
      const updatedCases = cases.map(c => {
        if (c.id === selectedCase.id) {
          return {
            ...c,
            notes: [...c.notes, { author: currentUser.name, text: newNote, date: 'Jan 11, 2025' }],
          };
        }
        return c;
      });
      setCases(updatedCases);
      setSelectedCase({
        ...selectedCase,
        notes: [...selectedCase.notes, { author: currentUser.name, text: newNote, date: 'Jan 11, 2025' }],
      });
      setNewNote('');
    }
  };

  const handleAssign = (staffId: string) => {
    const staff = teamMembers.find(m => m.id === staffId);
    if (selectedCase && staff) {
      const updatedCases = cases.map(c => {
        if (c.id === selectedCase.id) {
          return { ...c, assignedTo: staff.name, status: 'review' as const };
        }
        return c;
      });
      setCases(updatedCases);
      setSelectedCase({ ...selectedCase, assignedTo: staff.name, status: 'review' });
      setAssignDialogOpen(false);
    }
  };

  const handleStatusChange = (newStatus: 'submitted' | 'review' | 'progress' | 'resolved') => {
    if (selectedCase) {
      const updatedCases = cases.map(c => {
        if (c.id === selectedCase.id) {
          return { ...c, status: newStatus };
        }
        return c;
      });
      setCases(updatedCases);
      setSelectedCase({ ...selectedCase, status: newStatus });
    }
  };
  const { id } = useParams<{ id: string }>();


if (!currentUser) {
  console.error("User is not logged in");
  navigate("/login"); // optional redirect
  return null;
}

useEffect(() => {
  const fetchCases = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

     const formattedCases: Case[] = [
  ...(data.services || []).map((s: any) => ({
    id: String(s.reference_number), // 🔥 FIX
    type: "service",
    category: s.category,
    description: s.description,
    status: s.status,
    priority: s.priority || "medium",
    submittedDate: new Date(s.created_at).toLocaleString(), 
    citizen: s.user ? s.user.name : "Anonymous",
    citizenPhone: s.user?.phone,
    citizenEmail: s.user?.email,
    location: s.location || "Unknown",
    assignedTo: s.assignedTo || null,
    notes: s.notes || [],
  })),
  ...(data.complaints || []).map((c: any) => ({
    id: String(c.reference_number), // 🔥 FIX
    type: "complaint",
    category: c.category,
    description: c.description,
    status: c.status,
    priority: c.priority || "medium",
   submittedDate: new Date(c.created_at).toLocaleString(), 
    citizen: c.user ? c.user.name : "Anonymous",
    citizenPhone: c.user?.phone,
    citizenEmail: c.user?.email,
    location: c.location || "Unknown",
    assignedTo: c.assignedTo || null,
    notes: c.notes || [],
  })),
];

      setCases(formattedCases);
    } catch (err) {
      console.error("Error fetching cases", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCases();
}, []);


  const handleLogout = () => {
  // remove stored auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // redirect to login page
  navigate("/login");
};


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
                <p className="text-xs text-sidebar-foreground/70">Executive Secretary Portal</p>
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
              <Badge className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground">{stats.total}</Badge>
            </Link>
            <Link
              to="/staff/priority"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>High Priority</span>
              <Badge className="ml-auto bg-destructive text-destructive-foreground">{stats.highPriority}</Badge>
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
  {currentUser && (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center overflow-hidden">
        {currentUser.avatar ? (
          <img
            src={`http://localhost:5000/uploads/${currentUser.avatar}`}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserCircle className="h-5 w-5 text-sidebar-foreground/70" />
        )}
      </div>

      {/* Name & Role */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{currentUser.name}</p>
        <p className="text-xs text-sidebar-foreground/70 truncate uppercase">
          {currentUser.role}
        </p>
      </div>

      {/* Logout */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  )}
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
              <div>
                <h1 className="font-bold text-xl text-foreground">All Cases</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Manage all citizen requests and complaints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {stats.new}
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Filters */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cases by ID, category, or citizen..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cases List */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cases ({filteredCases.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                {filteredCases.map((caseItem, idx) => (
  <div
    key={`${caseItem.id}-${idx}`} // combines id + index to guarantee uniqueness
    className="p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
    onClick={() => navigate(`/staff/cases/${caseItem.id}`)}>
  
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getPriorityColor(caseItem.priority)}>
                              {caseItem.priority}
                            </Badge>
                            <Badge variant="outline">{caseItem.category}</Badge>
                            {caseItem.type === 'complaint' && (
                              <Badge variant="destructive">Complaint</Badge>
                            )}
                          </div>
                          <p className="font-mono text-sm text-muted-foreground">{caseItem.id}</p>
                          <p className="text-sm mt-1 line-clamp-2">{caseItem.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {caseItem.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {caseItem.submittedDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={caseItem.status} />
                          {caseItem.assignedTo && (
                            <p className="text-xs text-muted-foreground mt-2">{caseItem.assignedTo}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Case Detail Sheet */}
      <Sheet open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedCase && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="font-mono text-sm text-muted-foreground block mb-1">{selectedCase.id}</span>
                  {selectedCase.category}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(selectedCase.priority)}>
                    {selectedCase.priority} priority
                  </Badge>
                  <StatusBadge status={selectedCase.status} />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedCase.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Citizen</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.citizen}</p>
                    {selectedCase.citizenPhone && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" />
                        {selectedCase.citizenPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedCase.location}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Assigned To</h4>
                  {selectedCase.assignedTo ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm">{selectedCase.assignedTo}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setAssignDialogOpen(true)}>
                        Reassign
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setAssignDialogOpen(true)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Staff
                    </Button>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Update Status</h4>
                  <Select value={selectedCase.status} onValueChange={(val) => handleStatusChange(val as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Notes ({selectedCase.notes.length})</h4>
                  <div className="space-y-2 mb-3">
              {selectedCase.notes.map((note) => (
  <div key={`${note.author}-${note.date}-${note.text}`} className="p-3 bg-muted/50 rounded-lg">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium">{note.author}</span>
      <span className="text-xs text-muted-foreground">{note.date}</span>
    </div>
    <p className="text-sm text-muted-foreground">{note.text}</p>
  </div>
))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={2}
                    />
                    <Button size="icon" onClick={handleAddNote}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Case</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                className="w-full p-3 border border-border rounded-lg hover:border-primary transition-colors text-left"
                onClick={() => handleAssign(member.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <Badge variant="outline">{member.activeCases} active</Badge>
                </div>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffCases;
