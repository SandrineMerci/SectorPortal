import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Users,
  User,
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
import { useEffect } from 'react';
import axios from 'axios';

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
  email: string;
  phone: string;
  department: string;
  avatar?: string | null;
  activeCases: number;
  resolvedThisMonth: number;
  workloadPercent: number;
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

const [workloadData, setWorkloadData] = useState<StaffMember[]>([]);

 const [cases, setCases] = useState<Case[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("token"); // your JWT
      const res = await axios.get("http://localhost:5000/api/staff/team", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // calculate workloadPercent based on activeCases
      const dataWithPercent = res.data.map((member: any) => ({
        ...member,
        workloadPercent: Math.min((member.activeCases / 10) * 100, 100),
      }));

      setWorkloadData(dataWithPercent);
    } catch (err) {
      console.error("Failed to fetch team", err);
    }
  };

  fetchTeam();
}, []);

useEffect(() => {
  const fetchCases = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("API DATA:", data);

//       const formatStatus = (status: string): Case['status'] => {
//   switch (status) {
//     case 'submitted':
//     case 'review':
//     case 'progress':
//     case 'resolved':
//     case 'draft':
//       return status;
//     default:
//       return 'draft'; // fallback
//   }
// };

      // 🔥 merge services + complaints into one list
      const formattedCases: Case[] = [
        ...(data.services || []).map((s: any) => ({
          id: s.reference_number,
          type: "service",
          category: s.category,
          description: s.description,
          status: s.status,
          priority: s.priority || "medium",
          submittedDate: s.createdAt,
          citizen: s.user ? s.user.name : "Anonymous",
          citizenPhone: s.user?.phone,
          citizenEmail: s.user?.email,
          location: s.location || "Unknown",
          assignedTo: s.assignedTo || null,
          notes: s.notes || [],
        })),
        ...(data.complaints || []).map((c: any) => ({
          id: c.reference_number,
          type: "complaint",
          category: c.category,
          description: c.description,
          status:c.status,
          priority: c.priority || "medium",
          submittedDate: c.createdAt,
        citizen: c.user ? c.user.name : "Anonymous",
          citizenPhone: c.user?.phone,
          citizenEmail: c.user?.email,
          location: c.location || "Unknown",
          assignedTo: c.assignedTo || null,
          notes: c.notes || [],
        })),
      ];

      setCases(formattedCases);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCases();
}, []);

if (loading) {
  return <div>Loading dashboard...</div>;
}
const validCases = cases.filter(c => c.status !== "draft");

 const stats = {
  total: validCases.length,
  new: validCases.filter(c => c.status === 'submitted').length,
  inProgress: validCases.filter(c => c.status === 'progress' || c.status === 'review').length,
  resolved: validCases.filter(c => c.status === 'resolved').length,
  highPriority: validCases.filter(c => c.priority === 'high').length,
};

  const storedUser = localStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const filteredCases = cases.filter(c => {
      if (c.status === "draft") return false;

    const matchesSearch = 
      (c.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.citizen || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || c.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const handleLogout = () => {
  // remove stored auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // redirect to login page
  navigate("/login");
};

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
  const staff = workloadData.find(m => m.id === staffId);
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

 // Dragging a case
const handleDragStart = (caseId: string) => {
  setDraggedCase(caseId);
};

// Allow dropping
const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
};

// Assign dragged case to a staff member
const handleDrop = (staffId: string) => {
  if (!draggedCase) return;

  const staff = workloadData.find((m) => m.id === staffId);
  if (staff) {
    const updatedCases = cases.map((c) =>
      c.id === draggedCase ? { ...c, assignedTo: staff.name, status: 'review' as const } : c
    );
    setCases(updatedCases);

    // Update workloadData locally for UX (optional)
    const updatedWorkload = workloadData.map((m) =>
      m.id === staffId ? { ...m, activeCases: m.activeCases + 1, workloadPercent: Math.min(((m.activeCases + 1) / 10) * 100, 100) } : m
    );
    setWorkloadData(updatedWorkload);
  }

  setDraggedCase(null);
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
          <User className="h-5 w-5 text-sidebar-foreground/70" />
        )}
      </div>

      {/* Name & Role */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{currentUser.name}</p>
        <p className="text-xs text-sidebar-foreground/70 truncate uppercase">{currentUser.role}</p>
      </div>

      {/* Logout Button */}
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
                    <p className="text-sm text-muted-foreground">All Cases</p>
                    <p className="text-2xl font-bold text-foreground">{stats.new}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-warning">
                  {/* <ArrowUp className="h-3 w-3" />
                  <span>2 new today</span> */}
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
                        onClick={() => {
  setSelectedCase(caseItem);
  setCitizenPanelOpen(true);
}}
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
  <CardContent className="space-y-4 max-h-[520px] overflow-y-auto">
    {workloadData.map((member) => (
      <div
        key={member.id}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(member.id)}
        className={`p-3 rounded-lg border border-border hover:border-primary/50 transition-colors ${
          member.workloadPercent >= 100 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
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
              {/* <Card className="border-border">
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
              </Card> */}
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
            {workloadData.map((member) => (
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
