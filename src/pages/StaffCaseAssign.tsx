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
  PieChart,
  Users,
  Bell,
  ArrowLeft,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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

// Mock data
const mockCases: Case[] = [
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
    notes: [],
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
    notes: [],
  },
];

const teamMembers: StaffMember[] = [
  { id: '1', name: 'Alice Mukamana', role: 'Sector Officer', activeCases: 3, resolvedThisMonth: 12 },
  { id: '2', name: 'Bob Nshimiyimana', role: 'Sector Officer', activeCases: 5, resolvedThisMonth: 8 },
  { id: '3', name: 'Claire Uwase', role: 'Sector Officer', activeCases: 2, resolvedThisMonth: 15 },
  { id: '4', name: 'David Mugabo', role: 'Sector Officer', activeCases: 4, resolvedThisMonth: 6 },
];

const StaffCaseAssign = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const currentStaff = {
    name: 'Jean Pierre Habimana',
    role: 'Sector Executive Secretary',
    department: 'Jabana Sector Administration',
  };

  // Find the case by ID
  const caseData = mockCases.find(c => c.id === id);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAssign = () => {
    if (selectedStaff) {
      const staff = teamMembers.find(m => m.id === selectedStaff);
      toast({
        title: "Case Assigned",
        description: `Case ${id} has been assigned to ${staff?.name}`,
      });
      navigate(`/staff/cases/${id}`);
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
              <Button variant="ghost" size="icon" onClick={() => navigate(`/staff/cases/${id}`)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">Assign Case</h1>
                <p className="text-sm text-muted-foreground hidden sm:block font-mono">{caseData.id}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Case Summary */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Case Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getPriorityColor(caseData.priority)}>
                    {caseData.priority} priority
                  </Badge>
                  <Badge variant="outline">{caseData.category}</Badge>
                  {caseData.type === 'complaint' && (
                    <Badge variant="destructive">Complaint</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{caseData.description}</p>
                {caseData.assignedTo && (
                  <p className="text-sm mt-3">
                    Currently assigned to: <span className="font-medium">{caseData.assignedTo}</span>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Select Team Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedStaff === member.id 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedStaff(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedStaff === member.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                      }`}>
                        {selectedStaff === member.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <UserCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{member.activeCases} active</Badge>
                      <p className="text-xs text-muted-foreground">{member.resolvedThisMonth} resolved this month</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => navigate(`/staff/cases/${id}`)}>
                Cancel
              </Button>
              <Button onClick={handleAssign} disabled={!selectedStaff}>
                <Check className="h-4 w-4 mr-2" />
                Assign Case
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffCaseAssign;
