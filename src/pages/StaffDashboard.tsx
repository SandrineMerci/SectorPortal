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
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  avatar?: string;
  activeCases: number;
  resolvedThisMonth: number;
}

const StaffDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [citizenPanelOpen, setCitizenPanelOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [draggedCase, setDraggedCase] = useState<string | null>(null);

  // Mock staff data
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

  // Mock cases
  const [cases, setCases] = useState<Case[]>([
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
    return matchesSearch && matchesPriority;
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

  const handleDragStart = (caseId: string) => {
    setDraggedCase(caseId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (staffId: string) => {
    if (draggedCase) {
      const staff = teamMembers.find(m => m.id === staffId);
      if (staff) {
        const updatedCases = cases.map(c => {
          if (c.id === draggedCase) {
            return { ...c, assignedTo: staff.name, status: 'review' as const };
          }
          return c;
        });
        setCases(updatedCases);
      }
      setDraggedCase(null);
    }
  };

  const workloadData = teamMembers.map(member => ({
    ...member,
    workloadPercent: (member.activeCases / 10) * 100,
  }));

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
                <p className="text-xs text-sidebar-foreground/70">Executive Secretary Portal</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/staff"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/staff/cases"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
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

          {/* User */}
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
                <h1 className="font-bold text-xl text-foreground">Executive Secretary Dashboard</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Manage and assign citizen requests and complaints</p>
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

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Cases</p>
                    <p className="text-2xl font-bold text-foreground">{stats.new}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-warning">
                  <ArrowUp className="h-3 w-3" />
                  <span>2 new today</span>
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
                    <AlertCircle className="h-5 w-5 text-info" />
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
            <Card className="border-border border-l-4 border-l-destructive">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold text-destructive">{stats.highPriority}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Case Queue / Unified Inbox */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-sm">
                <CardHeader className="border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-xl">Unified Inbox</CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search cases..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="divide-y divide-border">
                      {filteredCases.map((caseItem) => (
                        <div
                          key={caseItem.id}
                          draggable
                          onDragStart={() => handleDragStart(caseItem.id)}
                          className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                            draggedCase === caseItem.id ? 'opacity-50' : ''
                          }`}
                          onClick={() => navigate(`/staff/cases/${caseItem.id}`)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 cursor-grab">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              caseItem.type === 'service' ? 'bg-primary/10' : 'bg-destructive/10'
                            }`}>
                              {caseItem.type === 'service' ? (
                                <FileText className="h-5 w-5 text-primary" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{caseItem.id}</span>
                                <Badge variant="outline" className={`text-xs ${getPriorityColor(caseItem.priority)}`}>
                                  {caseItem.priority}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-foreground">{caseItem.category}</p>
                              <p className="text-sm text-muted-foreground truncate">{caseItem.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <UserCircle className="h-3 w-3" />
                                  {caseItem.citizen}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {caseItem.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <StatusBadge status={caseItem.status} />
                              <span className="text-xs text-muted-foreground">{caseItem.submittedDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Workload Distribution & Team Assignment */}
            <div className="space-y-6">
              {/* Workload Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Workload Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workloadData.map((member) => (
                    <div
                      key={member.id}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(member.id)}
                      className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{member.activeCases} active</Badge>
                      </div>
                      <Progress value={member.workloadPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {member.resolvedThisMonth} resolved this month
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                    <span className="text-sm">Resolved</span>
                    <span className="font-bold text-success">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
                    <span className="text-sm">In Review</span>
                    <span className="font-bold text-warning">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                    <span className="text-sm">Escalated</span>
                    <span className="font-bold text-destructive">1</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Citizen Profile Sidebar / Case Detail */}
      <Sheet open={citizenPanelOpen} onOpenChange={setCitizenPanelOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedCase && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedCase.type === 'service' ? 'bg-primary/10' : 'bg-destructive/10'
                  }`}>
                    {selectedCase.type === 'service' ? (
                      <FileText className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  {selectedCase.id}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Status & Priority */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedCase.status} />
                  <Badge variant="outline" className={getPriorityColor(selectedCase.priority)}>
                    {selectedCase.priority} priority
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setAssignDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange('progress')}>
                    <Clock className="h-4 w-4 mr-1" />
                    In Progress
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleStatusChange('resolved')}>
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Escalate
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleStatusChange('resolved')}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Resolve
                  </Button>
                </div>

                <Separator />

                {/* Case Details */}
                <div>
                  <h3 className="font-medium mb-2">{selectedCase.category}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCase.description}</p>
                </div>

                {/* Citizen Info */}
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <h4 className="font-medium text-sm">Citizen Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCase.citizen}</span>
                    </div>
                    {selectedCase.citizenPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCase.citizenPhone}</span>
                      </div>
                    )}
                    {selectedCase.citizenEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCase.citizenEmail}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCase.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Submitted: {selectedCase.submittedDate}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Internal Notes */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Internal Notes
                  </h4>
                  <ScrollArea className="h-48 pr-4">
                    <div className="space-y-3">
                      {selectedCase.notes.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">No notes yet</p>
                      ) : (
                        selectedCase.notes.map((note, idx) => (
                          <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{note.author}</span>
                              <span className="text-xs text-muted-foreground">{note.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{note.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  <div className="mt-3 flex gap-2">
                    <Textarea
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button className="mt-2 w-full" onClick={handleAddNote} disabled={!newNote.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Assignment Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Case</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleAssign(member.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{member.activeCases} cases</Badge>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffDashboard;
