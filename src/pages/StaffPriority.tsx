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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Case {
  id: string;
  type: 'service' | 'complaint';
  category: string;
  description: string;
  status: 'submitted' | 'review' | 'progress' | 'resolved' | 'draft' | 'closed';
  priority: 'high' | 'medium' | 'low';
  submittedDate: string;
  citizen: string;
  location: string;
  assignedTo: string | null;
}

const StaffPriority = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

   const storedUser = localStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [cases, setCases] = useState<Case[]>([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // or use navigate if you prefer
};

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

      const formattedCases: Case[] = [
        ...(data.services || []).map((s: any) => ({
          id: String(s.reference_number),
          type: "service",
          category: s.category,
          description: s.description,
          status: s.status,
          priority: s.priority || "medium",
        submittedDate: new Date(s.created_at).toLocaleString(), 
          citizen: s.user ? s.user.name : "Anonymous",
          location: s.location || "Unknown",
          assignedTo: s.assignedTo || null,
        })),
        ...(data.complaints || []).map((c: any) => ({
          id: String(c.reference_number),
          type: "complaint",
          category: c.category,
          description: c.description,
          status: c.status,
          priority: c.priority || "medium",
        submittedDate: new Date(c.created_at).toLocaleString(), 
          citizen: c.user ? c.user.name : "Anonymous",
          location: c.location || "Unknown",
          assignedTo: c.assignedTo || null,
        })),
      ];

      setCases(formattedCases);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchCases();
}, []);

const highPriorityCases = cases.filter(
  c =>
    c.priority === "high" &&
    c.status !== "draft" &&
    c.status !== "resolved" &&
    c.status !== "closed"
);

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
                   <div
  key={caseItem.id}
  onClick={() => navigate(`/staff/cases/${caseItem.id}`)}
  className="p-4 border border-destructive/30 bg-destructive/5 rounded-lg cursor-pointer hover:border-primary transition-colors">
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
