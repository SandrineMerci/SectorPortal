import { Link } from 'react-router-dom';
import {
  Globe,
  BarChart3,
  Download,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Clock,
  Star,
  MapPin,
  Calendar,
  ExternalLink,
  MessageSquare,
  Award,
  Phone,
  Mail,
  Building,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import CitizenLayout from '@/components/CitizenLayout';

const Transparency = () => {
  const { language } = useLanguage();

  const kpis = [
    { label: 'Total Requests (2025)', value: '1,247', change: '+18%', trend: 'up' },
    { label: 'Resolution Rate', value: '89%', change: '+5%', trend: 'up' },
    { label: 'Avg. Response Time', value: '2.3 days', change: '-0.8 days', trend: 'up' },
    { label: 'Citizen Satisfaction', value: '4.6/5', change: '+0.3', trend: 'up' },
  ];

  const requestsByCategory = [
    { name: 'Road Repair', value: 320, color: 'hsl(var(--primary))' },
    { name: 'Water Issues', value: 245, color: 'hsl(var(--secondary))' },
    { name: 'Waste Collection', value: 198, color: 'hsl(var(--accent))' },
    { name: 'Electricity', value: 156, color: 'hsl(var(--info))' },
    { name: 'Documents', value: 189, color: 'hsl(var(--warning))' },
    { name: 'Other', value: 139, color: 'hsl(var(--muted-foreground))' },
  ];

  const monthlyTrends = [
    { month: 'Jul', submitted: 145, resolved: 130 },
    { month: 'Aug', submitted: 162, resolved: 155 },
    { month: 'Sep', submitted: 158, resolved: 150 },
    { month: 'Oct', submitted: 181, resolved: 170 },
    { month: 'Nov', submitted: 175, resolved: 168 },
    { month: 'Dec', submitted: 197, resolved: 185 },
    { month: 'Jan', submitted: 229, resolved: 210 },
  ];

  const serviceStandards = [
    { service: 'Road Repair', target: '7 days', actual: '5.2 days', status: 'exceeding' },
    { service: 'Water Issues', target: '3 days', actual: '2.8 days', status: 'exceeding' },
    { service: 'Waste Collection', target: '2 days', actual: '1.5 days', status: 'exceeding' },
    { service: 'Document Requests', target: '5 days', actual: '4.2 days', status: 'meeting' },
    { service: 'Complaint Resolution', target: '10 days', actual: '8.5 days', status: 'meeting' },
  ];

  const recentResolutions = [
    {
      id: 'JAB-2025-001234',
      category: 'Road Repair',
      location: 'Sector 3, Cell 2',
      resolvedDate: 'Jan 10, 2025',
      daysToResolve: 4,
    },
    {
      id: 'JAB-2025-001220',
      category: 'Electricity',
      location: 'Sector 1, Cell 3',
      resolvedDate: 'Jan 9, 2025',
      daysToResolve: 2,
    },
    {
      id: 'JAB-2025-001198',
      category: 'Water Issues',
      location: 'Sector 5, Cell 1',
      resolvedDate: 'Jan 8, 2025',
      daysToResolve: 3,
    },
    {
      id: 'JAB-2025-001175',
      category: 'Waste Collection',
      location: 'Sector 2, Cell 4',
      resolvedDate: 'Jan 7, 2025',
      daysToResolve: 1,
    },
  ];

  const testimonials = [
    {
      name: 'Jean M.',
      rating: 5,
      comment: 'The road in front of my house was repaired within a week. Excellent service!',
      date: 'Jan 2025',
    },
    {
      name: 'Marie C.',
      rating: 5,
      comment: 'Very impressed with the new online system. Much easier than visiting the office.',
      date: 'Jan 2025',
    },
    {
      name: 'Patrick H.',
      rating: 4,
      comment: 'Good response time. Staff was helpful and kept me updated throughout.',
      date: 'Dec 2024',
    },
  ];

  const contactDirectory = [
    { office: 'Sector Executive Office', phone: '+250 788 000 001', email: 'executive@jabana.gov.rw' },
    { office: 'Public Services', phone: '+250 788 000 002', email: 'services@jabana.gov.rw' },
    { office: 'Complaints Desk', phone: '+250 788 000 003', email: 'complaints@jabana.gov.rw' },
    { office: 'Technical Support', phone: '+250 788 000 004', email: 'support@jabana.gov.rw' },
  ];

  const openDataReports = [
    { name: 'Monthly Performance Report - January 2025', format: 'PDF', size: '2.4 MB' },
    { name: 'Service Request Statistics Q4 2024', format: 'Excel', size: '1.8 MB' },
    { name: 'Annual Transparency Report 2024', format: 'PDF', size: '5.2 MB' },
    { name: 'Citizen Satisfaction Survey Results', format: 'PDF', size: '1.2 MB' },
  ];

  return (
    <CitizenLayout 
      title={language === 'rw' ? 'Urukiko rw\'Umugambi' : 'Public Transparency Portal'}
      subtitle={language === 'rw' ? 'Reba uko serivisi z\'umurenge wa Jabana zikora' : 'See how Jabana Sector public services are performing'}
    >
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {language === 'rw' ? 'Urukiko rw\'Umugambi' : 'Public Transparency Portal'}
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            {language === 'rw' 
              ? 'Dushyira ahagaragara amakuru y\'imikorere yacu.'
              : 'We are committed to transparency and accountability.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, idx) => (
              <Card key={idx} className="border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs ${kpi.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {kpi.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{kpi.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl mb-6">
              <TabsTrigger value="dashboard">
                {language === 'rw' ? 'Ibipimo' : 'Dashboard'}
              </TabsTrigger>
              <TabsTrigger value="opendata">
                {language === 'rw' ? 'Amakuru' : 'Open Data'}
              </TabsTrigger>
              <TabsTrigger value="standards">
                {language === 'rw' ? 'Serivisi' : 'Standards'}
              </TabsTrigger>
              <TabsTrigger value="feedback">
                {language === 'rw' ? 'Ibitekerezo' : 'Feedback'}
              </TabsTrigger>
              <TabsTrigger value="contact">
                {language === 'rw' ? 'Aho Tuvugira' : 'Contact'}
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Requests by Category */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      {language === 'rw' ? 'Ibisabwa ku Bwoko' : 'Requests by Category'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <ResponsiveContainer width="50%" height={250}>
                        <RechartsPie>
                          <Pie
                            data={requestsByCategory}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {requestsByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPie>
                      </ResponsiveContainer>
                      <div className="space-y-2">
                        {requestsByCategory.map((item, idx) => (
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

                {/* Monthly Trends */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      {language === 'rw' ? 'Imikorere y\'Ukwezi' : 'Monthly Trends'}
                    </CardTitle>
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
                        <Legend />
                        <Line type="monotone" dataKey="submitted" stroke="hsl(var(--primary))" strokeWidth={2} name="Submitted" />
                        <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2} name="Resolved" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recently Resolved */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    {language === 'rw' ? 'Byakemutse Vuba' : 'Recently Resolved Issues'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'rw' ? 'Ibibazo byakemutse mu minsi ishize' : 'Issues resolved in recent days'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentResolutions.map((item) => (
                      <div key={item.id} className="p-4 bg-muted/50 rounded-lg">
                        <Badge variant="outline" className="mb-2">{item.category}</Badge>
                        <p className="text-sm font-mono text-muted-foreground">{item.id}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">{item.resolvedDate}</span>
                          <Badge className="bg-success/10 text-success">
                            {item.daysToResolve} {language === 'rw' ? 'iminsi' : 'days'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Open Data Tab */}
            <TabsContent value="opendata" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Raporo Zishobora Kumanuka' : 'Downloadable Reports'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'rw' ? 'Kuramo raporo n\'amakuru y\'imikorere' : 'Download performance reports and data'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {openDataReports.map((report, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-muted-foreground">{report.format} • {report.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {language === 'rw' ? 'Kuramo' : 'Download'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {language === 'rw' ? 'API y\'Amakuru' : 'Open Data API'}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {language === 'rw' 
                          ? 'Abashaka gukoresha amakuru mu buryo bwa tekiniki bashobora gukoresha API yacu.'
                          : 'Developers can access our public data through our Open Data API for research and applications.'}
                      </p>
                      <Button variant="outline" className="mt-4">
                        {language === 'rw' ? 'Reba Inyandiko za API' : 'View API Documentation'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Standards Tab */}
            <TabsContent value="standards" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Amategeko y\'Igihe' : 'Service Level Commitments'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'rw' ? 'Dukurikirana igihe cyo gukemura ibibazo' : 'Our target vs actual resolution times'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceStandards.map((standard, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{standard.service}</h3>
                          <Badge className={standard.status === 'exceeding' ? 'bg-success/10 text-success' : 'bg-info/10 text-info'}>
                            {standard.status === 'exceeding' ? 'Exceeding Target' : 'Meeting Target'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">{language === 'rw' ? 'Intego' : 'Target'}:</span>
                            <span className="ml-2 font-medium">{standard.target}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{language === 'rw' ? 'Igihe Nyacyo' : 'Actual'}:</span>
                            <span className="ml-2 font-medium text-success">{standard.actual}</span>
                          </div>
                        </div>
                        <Progress 
                          value={parseFloat(standard.actual) / parseFloat(standard.target) * 100} 
                          className="mt-3 h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Ibitekerezo by\'Abaturage' : 'Citizen Testimonials'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.map((testimonial, idx) => (
                      <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-medium">{testimonial.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= testimonial.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{testimonial.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">{testimonial.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Feedback CTA */}
              <Card className="border-border bg-secondary/10">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'rw' ? 'Tanga Igitekerezo Cyawe' : 'Share Your Experience'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'rw' 
                      ? 'Ibitekerezo byawe bidufasha kunoza serivisi zacu.'
                      : 'Your feedback helps us improve our services for everyone.'}
                  </p>
                  <Link to="/complaints">
                    <Button>
                      {language === 'rw' ? 'Tanga Igitekerezo' : 'Submit Feedback'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Aho Tuvugira' : 'Contact Directory'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {contactDirectory.map((contact, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium mb-3">{contact.office}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${contact.phone}`} className="text-primary hover:underline">{contact.phone}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours & Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {language === 'rw' ? 'Amasaha y\'Akazi' : 'Office Hours'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>{language === 'rw' ? 'Kuwa Mbere - Kuwa Gatanu' : 'Monday - Friday'}</span>
                      <span className="font-medium">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'rw' ? 'Kuwa Gatandatu' : 'Saturday'}</span>
                      <span className="font-medium">8:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{language === 'rw' ? 'Ku Cyumweru' : 'Sunday'}</span>
                      <span>{language === 'rw' ? 'Bafunze' : 'Closed'}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {language === 'rw' ? 'Aho Turi' : 'Location'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Jabana Sector Office<br />
                      Gasabo District, Kigali City<br />
                      Rwanda
                    </p>
                    <Button variant="outline" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      {language === 'rw' ? 'Fungura mu Ikarita' : 'Open in Maps'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Resources */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{language === 'rw' ? 'Ibibazo Bikunze Kubazwa' : 'Frequently Asked Questions'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link to="/chatbot" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <h3 className="font-medium mb-2">{language === 'rw' ? 'Uko Usaba Serivisi' : 'How to Request Services'}</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to submitting requests</p>
                    </Link>
                    <Link to="/chatbot" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <h3 className="font-medium mb-2">{language === 'rw' ? 'Gukurikirana Icyifuzo' : 'Tracking Your Request'}</h3>
                      <p className="text-sm text-muted-foreground">How to check your request status</p>
                    </Link>
                    <Link to="/chatbot" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <h3 className="font-medium mb-2">{language === 'rw' ? 'Igihe cyo Gukemura' : 'Resolution Timelines'}</h3>
                      <p className="text-sm text-muted-foreground">Expected processing times</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </CitizenLayout>
  );
};

export default Transparency;
