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

  const currentStaff = {
    name: 'Jean Pierre Habimana',
    role: 'Sector Executive Secretary',
    department: 'Jabana Sector Administration',
  };

  const teamMembers: StaffMember[] = [
    { id: '1', name: 'Alice Mukamana', role: 'Sector Officer', activeCases: 3, resolvedThisMonth: 12 },
    { id: '2', name: 'Bob Nshimiyimana', role: 'Sector Officer', activeCases: 5, resolvedThisMonth: 8 },
    { id: '3', name: 'Claire Uwase', role: 'Sector Officer', activeCases: 2, resolvedThisMonth: 15 },
    { id: '4', name: 'David Mugabo', role: 'Sector Officer', activeCases: 4, resolvedThisMonth: 6 },
  ];

  const [cases, setCases] = useState<Case[]>([
    {
      id: 'JAB-2025-001234',
      type: 'service',
      category: 'Road Repair',
      description: 'Pothole repair request on Main Street near the market.',
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
      ],
    },
    {
      id: 'JAB-CMP-2025-00456',
      type: 'complaint',
      category: 'Staff Misconduct',
      description: 'Complaint about unprofessional behavior at the sector office.',
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
      description: 'Low water pressure in residential area.',
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
      description: 'Missed waste collection on Tuesday schedule.',
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
      description: 'Street light not working near the school.',
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
  ]);

  const stats = {
    total: cases.length,
    new: cases.filter(c => c.status === 'submitted').length,
    inProgress: cases.filter(c => c.status === 'progress' || c.status === 'review').length,
    resolved: cases.filter(c => c.status === 'resolved').length,
    highPriority: cases.filter(c => c.priority === 'high').length,
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || c.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
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
            notes: [...c.notes, { author: currentStaff.name, text: newNote, date: 'Jan 11, 2025' }],
          };
        }
        return c;
      });
      setCases(updatedCases);
      setSelectedCase({
        ...selectedCase,
        notes: [...selectedCase.notes, { author: currentStaff.name, text: newNote, date: 'Jan 11, 2025' }],
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
                  {filteredCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/staff/cases/${caseItem.id}`)}
                    >
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
                    {selectedCase.notes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-muted/50 rounded-lg">
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
