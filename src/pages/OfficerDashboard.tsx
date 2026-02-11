import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Bell,
  Search,
  ChevronRight,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  MapPin,
  MessageSquare,
  Send,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
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
  notes: { author: string; text: string; date: string }[];
}

const OfficerDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [newNote, setNewNote] = useState('');

  // Mock officer data
  const currentOfficer = {
    name: 'Bob Nshimiyimana',
    role: 'Sector Officer',
    department: 'Field Operations',
  };

  // Mock assigned cases (only cases assigned to this officer)
  const [myCases, setMyCases] = useState<Case[]>([
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
      notes: [
        { author: 'Sector Executive Secretary', text: 'Please prioritize this case.', date: 'Jan 5, 2025' },
        { author: 'Bob Nshimiyimana', text: 'Inspected the site. Damage is significant.', date: 'Jan 6, 2025' },
      ],
    },
    {
      id: 'JAB-2025-001220',
      type: 'service',
      category: 'Electricity',
      description: 'Street light not working near the school, creating safety concerns at night.',
      status: 'review',
      priority: 'medium',
      submittedDate: 'Jan 2, 2025',
      citizen: 'School Admin',
      location: 'Sector 1, Cell 3',
      notes: [],
    },
    {
      id: 'JAB-2025-001240',
      type: 'service',
      category: 'Water Issues',
      description: 'Broken water pipe causing flooding in the residential area.',
      status: 'progress',
      priority: 'high',
      submittedDate: 'Jan 9, 2025',
      citizen: 'Marie Uwase',
      citizenPhone: '+250 788 456 789',
      location: 'Sector 4, Cell 1',
      notes: [
        { author: 'Sector Executive Secretary', text: 'Urgent - coordinate with water authority.', date: 'Jan 9, 2025' },
      ],
    },
    {
      id: 'JAB-2025-001215',
      type: 'complaint',
      category: 'Noise Complaint',
      description: 'Excessive noise from construction site during night hours.',
      status: 'resolved',
      priority: 'low',
      submittedDate: 'Jan 1, 2025',
      citizen: 'Anonymous',
      location: 'Sector 2, Cell 3',
      notes: [
        { author: 'Bob Nshimiyimana', text: 'Spoke with construction company. They agreed to limit work hours.', date: 'Jan 2, 2025' },
      ],
    },
  ]);

  const stats = {
    total: myCases.length,
    inProgress: myCases.filter(c => c.status === 'progress' || c.status === 'review').length,
    resolved: myCases.filter(c => c.status === 'resolved').length,
    resolvedThisMonth: 8,
  };

  const filteredCases = myCases.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
      const updatedCases = myCases.map(c => {
        if (c.id === selectedCase.id) {
          return {
            ...c,
            notes: [...c.notes, { author: currentOfficer.name, text: newNote, date: 'Jan 11, 2025' }],
          };
        }
        return c;
      });
      setMyCases(updatedCases);
      setSelectedCase({
        ...selectedCase,
        notes: [...selectedCase.notes, { author: currentOfficer.name, text: newNote, date: 'Jan 11, 2025' }],
      });
      setNewNote('');
    }
  };

  const handleStatusChange = (newStatus: 'submitted' | 'review' | 'progress' | 'resolved') => {
    if (selectedCase) {
      const updatedCases = myCases.map(c => {
        if (c.id === selectedCase.id) {
          return { ...c, status: newStatus };
        }
        return c;
      });
      setMyCases(updatedCases);
      setSelectedCase({ ...selectedCase, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Jabana Sector</h1>
                <p className="text-xs text-sidebar-foreground/70">Officer Portal</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/officer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">My Dashboard</span>
            </Link>
            <Link
              to="/officer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>My Cases</span>
              <Badge className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground">{stats.total}</Badge>
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

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <UserCircle className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentOfficer.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{currentOfficer.role}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
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
                <h1 className="font-bold text-xl text-foreground">My Dashboard</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">View and manage your assigned cases</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">My Cases</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold text-foreground">{stats.resolved}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground">{stats.resolvedThisMonth}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search cases..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cases List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                My Assigned Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {filteredCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-medium text-foreground">{caseItem.id}</span>
                            <Badge variant="outline" className={getPriorityColor(caseItem.priority)}>
                              {caseItem.priority}
                            </Badge>
                            <StatusBadge status={caseItem.status} />
                          </div>
                          <p className="mt-1 text-sm font-medium text-foreground">{caseItem.category}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{caseItem.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {caseItem.submittedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {caseItem.location}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                  {filteredCases.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No cases found</p>
                    </div>
                  )}
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
                <SheetTitle className="flex items-center gap-2">
                  <span className="font-mono">{selectedCase.id}</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Status & Priority */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={getPriorityColor(selectedCase.priority)}>
                    {selectedCase.priority} priority
                  </Badge>
                  <StatusBadge status={selectedCase.status} />
                </div>

                {/* Category & Description */}
                <div>
                  <h3 className="font-semibold text-foreground">{selectedCase.category}</h3>
                  <p className="mt-1 text-muted-foreground">{selectedCase.description}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Citizen</p>
                    <p className="font-medium text-foreground">{selectedCase.citizen}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{selectedCase.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium text-foreground">{selectedCase.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground capitalize">{selectedCase.type}</p>
                  </div>
                </div>

                {/* Contact Info */}
                {(selectedCase.citizenPhone || selectedCase.citizenEmail) && (
                  <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-foreground">Contact Information</p>
                    {selectedCase.citizenPhone && (
                      <p className="text-sm text-muted-foreground">{selectedCase.citizenPhone}</p>
                    )}
                    {selectedCase.citizenEmail && (
                      <p className="text-sm text-muted-foreground">{selectedCase.citizenEmail}</p>
                    )}
                  </div>
                )}

                {/* Status Update */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Update Status</p>
                  <Select value={selectedCase.status} onValueChange={(value: any) => handleStatusChange(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Case Notes</p>
                  <ScrollArea className="h-40 border border-border rounded-lg p-3">
                    {selectedCase.notes.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCase.notes.map((note, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{note.author}</span>
                              <span className="text-xs text-muted-foreground">{note.date}</span>
                            </div>
                            <p className="text-muted-foreground mt-1">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No notes yet</p>
                    )}
                  </ScrollArea>
                </div>

                {/* Add Note */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Add Note</p>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Write a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <Button 
                    className="mt-2 w-full" 
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OfficerDashboard;
