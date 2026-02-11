import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users,
  Bell,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  MapPin,
  Calendar,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  location: string;
  assignedTo: string | null;
}

const StaffPriority = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStaff = {
    name: 'Jean Pierre Habimana',
    role: 'Sector Executive Secretary',
  };

  const highPriorityCases: Case[] = [
    {
      id: 'JAB-2025-001234',
      type: 'service',
      category: 'Road Repair',
      description: 'Pothole repair request on Main Street near the market. Urgent safety hazard.',
      status: 'progress',
      priority: 'high',
      submittedDate: 'Jan 5, 2025',
      citizen: 'Jean B. Uwimana',
      location: 'Sector 3, Cell 2',
      assignedTo: 'Alice Mukamana',
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
    },
  ];

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
            <Link to="/staff/priority" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors">
              <AlertTriangle className="h-5 w-5" />
              <span>High Priority</span>
              <Badge className="ml-auto bg-destructive text-destructive-foreground">{highPriorityCases.length}</Badge>
            </Link>
            <Link to="/staff/team" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors">
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
                <h1 className="font-bold text-xl text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  High Priority Cases
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Cases requiring immediate attention</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">Attention Required</p>
                  <p className="text-sm text-muted-foreground">These cases have been flagged as high priority and require immediate action.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>High Priority Cases ({highPriorityCases.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {highPriorityCases.map((caseItem) => (
                    <div key={caseItem.id} className="p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">High Priority</Badge>
                            <Badge variant="outline">{caseItem.category}</Badge>
                            {caseItem.type === 'complaint' && (
                              <Badge variant="destructive">Complaint</Badge>
                            )}
                          </div>
                          <p className="font-mono text-sm text-muted-foreground">{caseItem.id}</p>
                          <p className="text-sm mt-1">{caseItem.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
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
                          {caseItem.assignedTo ? (
                            <p className="text-xs text-muted-foreground mt-2">{caseItem.assignedTo}</p>
                          ) : (
                            <Badge variant="outline" className="mt-2 text-warning border-warning">Unassigned</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" asChild>
                          <Link to="/staff/cases">View Details</Link>
                        </Button>
                        {!caseItem.assignedTo && (
                          <Button size="sm" variant="outline">Assign</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StaffPriority;
