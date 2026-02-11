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

interface Case {
  id: string;
  type: 'service' | 'complaint';
  category: string;
  description: string;
  status: 'submitted' | 'review' | 'progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  submittedDate: string;
  citizen: string;
  citizenPhone?: string;
  citizenEmail?: string;
  location: string;
  assignedTo: string | null;
  notes: { author: string; text: string; date: string }[];
}

// Mock data - in a real app this would come from an API/database
const mockCases: Case[] = [
  {
    id: 'JAB-2025-001234',
    type: 'service',
    category: 'Road Repair',
    description: 'Pothole repair request on Main Street near the market. The pothole is approximately 2 meters wide and poses a safety hazard.',
    status: 'progress',
    priority: 'high',
    submittedDate: 'Jan 5, 2025',
    citizen: 'Jean B. Uwimana',
    citizenPhone: '+250 788 123 456',
    citizenEmail: 'jean.uwimana@email.rw',
    location: 'Sector 3, Cell 2',
    assignedTo: 'Alice Mukamana',
    notes: [
      { author: 'Alice Mukamana', text: 'Inspected the site. Damage is significant.', date: 'Jan 6, 2025' },
      { author: 'Bob Nshimiyimana', text: 'Repair team scheduled for next week.', date: 'Jan 7, 2025' },
    ],
  },
  {
    id: 'JAB-CMP-2025-00456',
    type: 'complaint',
    category: 'Staff Misconduct',
    description: 'Complaint about unprofessional behavior at the sector office during morning hours.',
    status: 'review',
    priority: 'high',
    submittedDate: 'Jan 4, 2025',
    citizen: 'Anonymous',
    location: 'Sector Office',
    assignedTo: null,
    notes: [],
  },
  {
    id: 'JAB-2025-001235',
    type: 'service',
    category: 'Water Issues',
    description: 'Low water pressure in residential area affecting multiple households.',
    status: 'submitted',
    priority: 'medium',
    submittedDate: 'Jan 8, 2025',
    citizen: 'Marie Claire N.',
    citizenPhone: '+250 788 234 567',
    location: 'Sector 5, Cell 1',
    assignedTo: null,
    notes: [],
  },
  {
    id: 'JAB-2025-001236',
    type: 'service',
    category: 'Waste Collection',
    description: 'Missed waste collection on Tuesday schedule for the entire neighborhood.',
    status: 'submitted',
    priority: 'low',
    submittedDate: 'Jan 8, 2025',
    citizen: 'Patrick Habimana',
    citizenPhone: '+250 788 345 678',
    location: 'Sector 2, Cell 4',
    assignedTo: null,
    notes: [],
  },
  {
    id: 'JAB-2025-001220',
    type: 'service',
    category: 'Electricity',
    description: 'Street light not working near the school, creating safety concerns at night.',
    status: 'resolved',
    priority: 'medium',
    submittedDate: 'Jan 2, 2025',
    citizen: 'School Admin',
    location: 'Sector 1, Cell 3',
    assignedTo: 'Bob Nshimiyimana',
    notes: [
      { author: 'Bob Nshimiyimana', text: 'Light bulb replaced successfully.', date: 'Jan 3, 2025' },
    ],
  },
];

const StaffCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  const currentStaff = {
    name: 'Alice Mukamana',
    role: 'Senior Officer',
    department: 'Public Services',
  };

  // Find the case by ID
  const [caseData, setCaseData] = useState<Case | null>(() => 
    mockCases.find(c => c.id === id) || null
  );

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
        notes: [...caseData.notes, { author: currentStaff.name, text: newNote, date: 'Jan 11, 2025' }],
      });
      setNewNote('');
    }
  };

  const handleStatusChange = (newStatus: 'submitted' | 'review' | 'progress' | 'resolved') => {
    if (caseData) {
      setCaseData({ ...caseData, status: newStatus });
    }
  };

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Case Not Found</h2>
          <p className="text-muted-foreground mb-4">The case you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/staff/cases')}>
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
                <p className="font-medium text-sm truncate">{currentStaff.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{currentStaff.role}</p>
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
                  {caseData.assignedTo ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{caseData.assignedTo}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/staff/cases/${caseData.id}/assign`}>
                          Reassign
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" asChild>
                      <Link to={`/staff/cases/${caseData.id}/assign`}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign Staff
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Status Update */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-medium mb-3">Update Status</h4>
                  <Select value={caseData.status} onValueChange={(val) => handleStatusChange(val as any)}>
                    <SelectTrigger className="w-full md:w-64">
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
