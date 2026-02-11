import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Download,
  Filter,
  ArrowLeft,
  Star,
  ThumbsUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const Reports = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const requestsByType = [
    { name: 'Road Repair', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Water Issues', value: 30, color: 'hsl(var(--secondary))' },
    { name: 'Waste Collection', value: 25, color: 'hsl(var(--accent))' },
    { name: 'Electricity', value: 20, color: 'hsl(var(--info))' },
    { name: 'Other', value: 15, color: 'hsl(var(--muted-foreground))' },
  ];

  const requestsByStatus = [
    { name: 'Resolved', value: 65, color: 'hsl(var(--success))' },
    { name: 'In Progress', value: 45, color: 'hsl(var(--warning))' },
    { name: 'Pending', value: 25, color: 'hsl(var(--info))' },
  ];

  const monthlyTrends = [
    { month: 'Jul', requests: 45, resolved: 40, complaints: 12 },
    { month: 'Aug', requests: 52, resolved: 48, complaints: 15 },
    { month: 'Sep', requests: 48, resolved: 45, complaints: 10 },
    { month: 'Oct', requests: 61, resolved: 55, complaints: 18 },
    { month: 'Nov', requests: 55, resolved: 52, complaints: 14 },
    { month: 'Dec', requests: 67, resolved: 60, complaints: 20 },
    { month: 'Jan', requests: 72, resolved: 65, complaints: 22 },
  ];

  const resolutionTimeData = [
    { category: 'Road Repair', avgDays: 5.2 },
    { category: 'Water Issues', avgDays: 2.8 },
    { category: 'Waste Collection', avgDays: 1.5 },
    { category: 'Electricity', avgDays: 3.2 },
    { category: 'Documents', avgDays: 4.0 },
  ];

  const locationData = [
    { location: 'Sector 1', cases: 35, resolved: 30 },
    { location: 'Sector 2', cases: 28, resolved: 25 },
    { location: 'Sector 3', cases: 42, resolved: 38 },
    { location: 'Sector 4', cases: 22, resolved: 20 },
    { location: 'Sector 5', cases: 31, resolved: 28 },
  ];

  const staffPerformance = [
    { name: 'Alice Mukamana', resolved: 45, avgTime: 2.1, satisfaction: 4.8 },
    { name: 'Bob Nshimiyimana', resolved: 38, avgTime: 2.5, satisfaction: 4.6 },
    { name: 'Claire Uwase', resolved: 52, avgTime: 1.8, satisfaction: 4.9 },
    { name: 'David Mugabo', resolved: 30, avgTime: 3.2, satisfaction: 4.4 },
  ];

  const satisfactionData = [
    { rating: '5 Stars', count: 85, percent: 45 },
    { rating: '4 Stars', count: 62, percent: 33 },
    { rating: '3 Stars', count: 28, percent: 15 },
    { rating: '2 Stars', count: 10, percent: 5 },
    { rating: '1 Star', count: 5, percent: 2 },
  ];

  const kpiCards = [
    {
      title: 'Total Requests',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'primary',
    },
    {
      title: 'Resolution Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'success',
    },
    {
      title: 'Avg. Resolution Time',
      value: '3.2 days',
      change: '-0.5 days',
      trend: 'up',
      icon: Clock,
      color: 'warning',
    },
    {
      title: 'Citizen Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'accent',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/staff">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-2xl text-foreground">Reports & Analytics</h1>
              <p className="text-sm text-muted-foreground">Data-driven insights for Jabana Sector</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, idx) => (
            <Card key={idx} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-${kpi.color}/10 flex items-center justify-center`}>
                    <kpi.icon className={`h-5 w-5 text-${kpi.color}`} />
                  </div>
                </div>
                <div className={`flex items-center gap-1 mt-2 text-xs ${
                  kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  <span>{kpi.change} vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for different report views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>Requests and resolutions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="requests" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Requests" />
                      <Area type="monotone" dataKey="resolved" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} name="Resolved" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Requests by Type */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Requests by Category
                  </CardTitle>
                  <CardDescription>Distribution of service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <ResponsiveContainer width="50%" height={250}>
                      <RechartsPie>
                        <Pie
                          data={requestsByType}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {requestsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPie>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {requestsByType.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-medium ml-auto">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resolution Time by Category */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Average Resolution Time by Category
                </CardTitle>
                <CardDescription>Days to resolve requests by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={resolutionTimeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" unit=" days" className="text-xs" />
                    <YAxis type="category" dataKey="category" width={120} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgDays" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Staff Performance Metrics
                </CardTitle>
                <CardDescription>Individual performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Staff Member</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Cases Resolved</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg. Time (days)</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Satisfaction</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffPerformance.map((staff, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <span className="font-medium">{staff.name}</span>
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="font-bold text-lg">{staff.resolved}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <Badge variant={staff.avgTime <= 2 ? 'default' : staff.avgTime <= 3 ? 'secondary' : 'outline'}>
                              {staff.avgTime} days
                            </Badge>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 text-accent fill-accent" />
                              <span className="font-medium">{staff.satisfaction}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="w-full max-w-32 mx-auto">
                              <Progress value={(staff.resolved / 60) * 100} className="h-2" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Complaints Trend */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Complaints Trend
                </CardTitle>
                <CardDescription>Monthly complaint submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="complaints" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Cases by Location
                </CardTitle>
                <CardDescription>Geographic distribution of service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="location" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total Cases" />
                    <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Location Heatmap Visualization */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {locationData.map((loc, idx) => {
                const resolutionRate = Math.round((loc.resolved / loc.cases) * 100);
                return (
                  <Card key={idx} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium">{loc.location}</h3>
                      <p className="text-2xl font-bold text-foreground mt-1">{loc.cases}</p>
                      <p className="text-xs text-muted-foreground">total cases</p>
                      <div className="mt-3">
                        <Progress value={resolutionRate} className="h-2" />
                        <p className="text-xs text-success mt-1">{resolutionRate}% resolved</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Satisfaction Tab */}
          <TabsContent value="satisfaction" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Satisfaction Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    Citizen Satisfaction Ratings
                  </CardTitle>
                  <CardDescription>Distribution of feedback scores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {satisfactionData.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-accent fill-accent" />
                          <span>{item.rating}</span>
                        </div>
                        <span className="font-medium">{item.count} ({item.percent}%)</span>
                      </div>
                      <Progress value={item.percent} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Overall Satisfaction */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Overall Satisfaction Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-success">4.6</p>
                        <p className="text-sm text-muted-foreground">out of 5</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 ${star <= 4 ? 'text-accent fill-accent' : 'text-accent/30'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">Based on 190 citizen reviews</p>
                  <div className="flex items-center gap-2 mt-2 text-success">
                    <ArrowUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+0.2 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recent Citizen Feedback</CardTitle>
                <CardDescription>Latest comments from citizens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Jean M.', rating: 5, comment: 'Excellent service! The road was repaired within days.', date: 'Jan 10, 2025' },
                    { name: 'Marie C.', rating: 4, comment: 'Good response time. Staff was very helpful.', date: 'Jan 9, 2025' },
                    { name: 'Patrick H.', rating: 5, comment: 'Very impressed with the new online system. Much easier than before!', date: 'Jan 8, 2025' },
                  ].map((feedback, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{feedback.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= feedback.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;
