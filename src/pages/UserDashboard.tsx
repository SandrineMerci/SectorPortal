import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from '@/components/StatusBadge';
import { useEffect } from 'react';

const UserDashboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


const stats = {
  total: submissions.length,
  pending: submissions.filter(s => s.status === 'submitted' || s.status === 'review').length,
  inProgress: submissions.filter(s => s.status === 'progress').length,
  resolved: submissions.filter(s => s.status === 'resolved').length,
};

  const filteredSubmissions = submissions.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

useEffect(() => {
  const fetchDashboard = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("DATA:", data);

      // 🔥 Merge services + complaints
      const merged = [
        ...data.services.map((s: any) => ({
          id: s.reference_number,
          type: 'service',
          category: s.category,
          description: s.description,
          status: s.status,
          submittedDate: new Date(s.created_at).toLocaleDateString(),
          expectedResolution: 'N/A',
        })),
        ...data.complaints.map((c: any) => ({
          id: c.reference_number,
          type: 'complaint',
          category: c.category,
          description: c.description,
          status: c.status,
          submittedDate: new Date(c.created_at).toLocaleDateString(),
          expectedResolution: 'N/A',
        })),
      ];

      setSubmissions(merged);
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  fetchDashboard();
}, []);

if (loading) return <div>Loading...</div>; // wait until user is loaded

  return (
 <CitizenLayout
  title={`${t('common.welcome')}!`}
  subtitle="Manage your service requests and complaints"
>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Header with New Request Button */}
          <div className="flex justify-end mb-8">
            <Button asChild>
              <Link to="/services" className="gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{stats.inProgress}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{stats.resolved}</p>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions List */}
          <Card className="border-border shadow-gov">
            <CardHeader className="border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="font-display text-xl">My Submissions</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <div className="border-b border-border px-4">
                  <TabsList className="bg-transparent h-12 p-0 gap-4">
                    <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
                      All ({submissions.length})
                    </TabsTrigger>
                    <TabsTrigger value="services" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
                      Services ({submissions.filter(s => s.type === 'service').length})
                    </TabsTrigger>
                    <TabsTrigger value="complaints" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
                      Complaints ({submissions.filter(s => s.type === 'complaint').length})
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="m-0">
                  <div className="divide-y divide-border">
                    {filteredSubmissions.map((submission) => (
                      <Link
                        key={submission.id}
                        to={`/track?ref=${submission.id}`}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            submission.type === 'service' ? 'bg-primary/10' : 'bg-destructive/10'
                          }`}>
                            {submission.type === 'service' ? (
                              <FileText className="h-5 w-5 text-primary" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{submission.id}</span>
                              <Badge variant="outline" className="text-xs">{submission.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{submission.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Submitted: {submission.submittedDate} • Expected: {submission.expectedResolution}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusBadge status={submission.status} />
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="m-0">
                  <div className="divide-y divide-border">
                    {filteredSubmissions.filter(s => s.type === 'service').map((submission) => (
                      <Link
                        key={submission.id}
                        to={`/track?ref=${submission.id}`}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{submission.id}</span>
                              <Badge variant="outline" className="text-xs">{submission.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{submission.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusBadge status={submission.status} />
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="complaints" className="m-0">
                  <div className="divide-y divide-border">
                    {filteredSubmissions.filter(s => s.type === 'complaint').map((submission) => (
                      <Link
                        key={submission.id}
                        to={`/track?ref=${submission.id}`}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{submission.id}</span>
                              <Badge variant="outline" className="text-xs">{submission.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{submission.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusBadge status={submission.status} />
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default UserDashboard;