import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  FileText,
  AlertTriangle,
  PieChart,
  Mail,
  Phone,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  activeCases: number;
  resolvedThisMonth: number;
  status: 'available' | 'busy' | 'offline';
}

const StaffTeam = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStaff = {
    name: 'Jean Pierre Habimana',
    role: 'Sector Executive Secretary',
  };

  const teamMembers: StaffMember[] = [
    { id: '1', name: 'Alice Mukamana', role: 'Sector Officer', email: 'alice@jabana.gov.rw', phone: '+250 788 000 001', activeCases: 3, resolvedThisMonth: 12, status: 'available' },
    { id: '2', name: 'Bob Nshimiyimana', role: 'Sector Officer', email: 'bob@jabana.gov.rw', phone: '+250 788 000 002', activeCases: 5, resolvedThisMonth: 8, status: 'busy' },
    { id: '3', name: 'Claire Uwase', role: 'Sector Officer', email: 'claire@jabana.gov.rw', phone: '+250 788 000 003', activeCases: 2, resolvedThisMonth: 15, status: 'available' },
    { id: '4', name: 'David Mugabo', role: 'Sector Officer', email: 'david@jabana.gov.rw', phone: '+250 788 000 004', activeCases: 4, resolvedThisMonth: 6, status: 'offline' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const totalResolved = teamMembers.reduce((acc, m) => acc + m.resolvedThisMonth, 0);
  const totalActive = teamMembers.reduce((acc, m) => acc + m.activeCases, 0);

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
            <Link to="/staff" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/staff/cases" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
              <FileText className="h-5 w-5" />
              <span>All Cases</span>
            </Link>
            <Link to="/staff/priority" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
              <AlertTriangle className="h-5 w-5" />
              <span>High Priority</span>
            </Link>
            <Link to="/staff/team" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors">
              <Users className="h-5 w-5" />
              <span>Team</span>
            </Link>
            <Link to="/reports" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
              <PieChart className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            <Link to="/notifications" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link to="/staff/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
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
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">Team Management</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">View and manage team members</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold">{totalActive}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Resolved This Month</p>
                <p className="text-2xl font-bold text-success">{totalResolved}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'available').length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-8 w-8 text-primary" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(member.status)}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Workload</span>
                            <span>{member.activeCases}/10 cases</span>
                          </div>
                          <Progress value={(member.activeCases / 10) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant="outline">{member.activeCases} active</Badge>
                          <Badge className="bg-success/10 text-success">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {member.resolvedThisMonth} resolved
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StaffTeam;
