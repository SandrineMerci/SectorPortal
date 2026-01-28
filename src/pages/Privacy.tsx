import { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Download,
  Trash2,
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  Key,
  Database,
  UserX,
  History,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import CitizenLayout from '@/components/CitizenLayout';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'access' | 'update' | 'delete' | 'export';
}

const Privacy = () => {
  const { language } = useLanguage();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const [consents, setConsents] = useState({
    essential: true, // Cannot be disabled
    analytics: true,
    communications: true,
    thirdParty: false,
  });

  const complianceChecklist = [
    { id: '1', item: 'Data encryption at rest', status: 'complete' },
    { id: '2', item: 'Data encryption in transit (SSL/TLS)', status: 'complete' },
    { id: '3', item: 'User consent management', status: 'complete' },
    { id: '4', item: 'Data retention policy', status: 'complete' },
    { id: '5', item: 'Access control implementation', status: 'complete' },
    { id: '6', item: 'Audit logging enabled', status: 'complete' },
    { id: '7', item: 'Regular security assessments', status: 'in_progress' },
    { id: '8', item: 'Incident response plan', status: 'complete' },
  ];

  const auditLogs: AuditLog[] = [
    { id: '1', action: 'Profile Viewed', user: 'Staff: Alice M.', timestamp: 'Jan 10, 2025 14:32', details: 'Viewed citizen profile for case JAB-2025-001234', type: 'access' },
    { id: '2', action: 'Data Export', user: 'Admin: System', timestamp: 'Jan 10, 2025 10:00', details: 'Weekly analytics report generated', type: 'export' },
    { id: '3', action: 'Record Updated', user: 'Staff: Bob N.', timestamp: 'Jan 9, 2025 16:45', details: 'Updated case status for JAB-2025-001220', type: 'update' },
    { id: '4', action: 'Profile Viewed', user: 'Staff: Claire U.', timestamp: 'Jan 9, 2025 11:20', details: 'Viewed citizen contact information', type: 'access' },
    { id: '5', action: 'Data Anonymized', user: 'System', timestamp: 'Jan 8, 2025 00:00', details: 'Automated anonymization of archived records', type: 'delete' },
  ];

  const retentionPolicies = [
    { category: 'Service Requests', retention: '5 years', action: 'Archive then anonymize' },
    { category: 'Complaints', retention: '7 years', action: 'Archive then delete' },
    { category: 'User Accounts', retention: 'Until deletion request', action: 'Full deletion' },
    { category: 'Audit Logs', retention: '10 years', action: 'Read-only archive' },
    { category: 'Analytics Data', retention: '2 years', action: 'Anonymize' },
  ];

  const getAuditTypeColor = (type: string) => {
    switch (type) {
      case 'access': return 'bg-info/10 text-info';
      case 'update': return 'bg-warning/10 text-warning';
      case 'delete': return 'bg-destructive/10 text-destructive';
      case 'export': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const completedItems = complianceChecklist.filter(c => c.status === 'complete').length;
  const complianceScore = Math.round((completedItems / complianceChecklist.length) * 100);

  return (
    <CitizenLayout 
      title={language === 'rw' ? 'Kurinda Amakuru & Amategeko' : 'Data Protection & Compliance'}
      subtitle={language === 'rw' ? 'Genzura amakuru yawe no kureba uko arindwa' : 'Manage your data and privacy settings'}
    >
      <div className="container mx-auto px-4 py-8">

        <Tabs defaultValue="privacy">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mb-6">
            <TabsTrigger value="privacy">
              {language === 'rw' ? 'Ibanga' : 'Privacy'}
            </TabsTrigger>
            <TabsTrigger value="consent">
              {language === 'rw' ? 'Kwemera' : 'Consent'}
            </TabsTrigger>
            <TabsTrigger value="data">
              {language === 'rw' ? 'Amakuru' : 'My Data'}
            </TabsTrigger>
            <TabsTrigger value="audit">
              {language === 'rw' ? 'Amateka' : 'Audit Log'}
            </TabsTrigger>
            <TabsTrigger value="compliance">
              {language === 'rw' ? 'Amategeko' : 'Compliance'}
            </TabsTrigger>
          </TabsList>

          {/* Privacy Policy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Politiki y\'Ibanga' : 'Privacy Policy'}
                </CardTitle>
                <CardDescription>
                  {language === 'rw' ? 'Yavuguruwe: Mutarama 2025' : 'Last updated: January 2025'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="collection">
                    <AccordionTrigger>
                      {language === 'rw' ? 'Amakuru Dukusanya' : 'Information We Collect'}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">We collect the following types of information:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Personal identification (Name, National ID, Contact details)</li>
                        <li>Service request and complaint details</li>
                        <li>Location information for service delivery</li>
                        <li>Communication preferences</li>
                        <li>Usage data for improving our services</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="use">
                    <AccordionTrigger>
                      {language === 'rw' ? 'Uko Dukoresha Amakuru' : 'How We Use Your Data'}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">Your data is used to:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Process and track your service requests</li>
                        <li>Communicate status updates and important notices</li>
                        <li>Improve public service delivery</li>
                        <li>Generate anonymized statistics for transparency</li>
                        <li>Ensure accountability in government operations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="protection">
                    <AccordionTrigger>
                      {language === 'rw' ? 'Kurinda Amakuru' : 'Data Protection'}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">We protect your data through:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>End-to-end encryption for sensitive data</li>
                        <li>Secure government cloud infrastructure</li>
                        <li>Regular security audits and assessments</li>
                        <li>Strict access controls for staff</li>
                        <li>Compliance with local data protection laws</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rights">
                    <AccordionTrigger>
                      {language === 'rw' ? 'Uburenganzira Bwawe' : 'Your Rights'}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">You have the right to:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Access your personal data</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data (where applicable)</li>
                        <li>Export your data in a portable format</li>
                        <li>Withdraw consent for optional data processing</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consent Management Tab */}
          <TabsContent value="consent" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Gucunga Kwemera' : 'Consent Management'}
                </CardTitle>
                <CardDescription>
                  {language === 'rw' ? 'Hitamo uburyo amakuru yawe akoreshwa' : 'Control how your data is used'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Essential */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{language === 'rw' ? 'Ibikenewe' : 'Essential Services'}</h3>
                        <Badge>Required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Required for core functionality. Cannot be disabled.
                      </p>
                    </div>
                    <Switch checked={consents.essential} disabled />
                  </div>
                </div>

                {/* Analytics */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{language === 'rw' ? 'Isesengura' : 'Analytics & Improvement'}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Help us improve services through anonymized usage data.
                      </p>
                    </div>
                    <Switch
                      checked={consents.analytics}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, analytics: checked }))}
                    />
                  </div>
                </div>

                {/* Communications */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{language === 'rw' ? 'Itumanaho' : 'Communications'}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Receive updates about new services and community announcements.
                      </p>
                    </div>
                    <Switch
                      checked={consents.communications}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, communications: checked }))}
                    />
                  </div>
                </div>

                {/* Third Party */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{language === 'rw' ? 'Abandi' : 'Third-Party Integration'}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Share data with partner organizations for enhanced services.
                      </p>
                    </div>
                    <Switch
                      checked={consents.thirdParty}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, thirdParty: checked }))}
                    />
                  </div>
                </div>

                <Button>
                  <Check className="h-4 w-4 mr-2" />
                  {language === 'rw' ? 'Bika Amahitamo' : 'Save Preferences'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Data Summary */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Amakuru Yawe' : 'Your Data Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Service Requests</span>
                    <Badge variant="outline">12 records</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Complaints</span>
                    <Badge variant="outline">3 records</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Profile Data</span>
                    <Badge variant="outline">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Communication History</span>
                    <Badge variant="outline">45 messages</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Data Actions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Ibikorwa ku Makuru' : 'Data Actions'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setExportDialogOpen(true)}>
                    <Download className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Kuramo Amakuru Yose' : 'Export All My Data'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Kureba Amakuru Yuzuye' : 'View Full Data Report'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Gusaba Gukosora' : 'Request Data Correction'}
                  </Button>
                  <Separator />
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Gusaba Gusiba Konte' : 'Request Account Deletion'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Data Retention */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Politiki yo Kubika' : 'Data Retention Policy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Retention Period</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action After Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retentionPolicies.map((policy, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="py-3 px-4">{policy.category}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{policy.retention}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{policy.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Amateka yo Kugera ku Makuru' : 'Data Access History'}
                </CardTitle>
                <CardDescription>
                  {language === 'rw' ? 'Reba uwabonye amakuru yawe' : 'See who accessed your data and when'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="divide-y divide-border">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getAuditTypeColor(log.type)}`}>
                            {log.type === 'access' && <Eye className="h-5 w-5" />}
                            {log.type === 'update' && <FileText className="h-5 w-5" />}
                            {log.type === 'delete' && <UserX className="h-5 w-5" />}
                            {log.type === 'export' && <Download className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{log.action}</h3>
                              <Badge variant="outline" className={getAuditTypeColor(log.type)}>
                                {log.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{log.user}</span>
                              <span>{log.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Compliance Score */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Urwego rw\'Amategeko' : 'Compliance Score'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative w-40 h-40 mx-auto">
                    <div className="w-full h-full rounded-full bg-success/10 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-success">{complianceScore}%</p>
                        <p className="text-sm text-muted-foreground">Compliant</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {completedItems} of {complianceChecklist.length} security measures implemented
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Status */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Umutekano' : 'Security Status'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">SSL/TLS Encryption</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Data Encryption at Rest</p>
                      <p className="text-xs text-muted-foreground">AES-256</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Access Controls</p>
                      <p className="text-xs text-muted-foreground">Role-based</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                    <Clock className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium">Security Audit</p>
                      <p className="text-xs text-muted-foreground">Scheduled: Feb 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Checklist */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{language === 'rw' ? 'Urutonde rw\'Amategeko' : 'Compliance Checklist'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceChecklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      {item.status === 'complete' ? (
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      ) : (
                        <Clock className="h-5 w-5 text-warning flex-shrink-0" />
                      )}
                      <span className="flex-1">{item.item}</span>
                      <Badge variant={item.status === 'complete' ? 'default' : 'secondary'}>
                        {item.status === 'complete' ? 'Complete' : 'In Progress'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {language === 'rw' ? 'Gusiba Konte' : 'Delete Account'}
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted after a 30-day grace period.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              If you proceed, you will lose access to:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
              <li>All service request history</li>
              <li>All complaint records</li>
              <li>Your profile and preferences</li>
              <li>All communication history</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              {language === 'rw' ? 'Siba Konte' : 'Delete My Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Data Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              {language === 'rw' ? 'Kuramo Amakuru' : 'Export Your Data'}
            </DialogTitle>
            <DialogDescription>
              Download a copy of all your personal data in a portable format.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Profile Information</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Service Requests</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Complaints</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Communication History</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              {language === 'rw' ? 'Kuramo (JSON)' : 'Export as JSON'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CitizenLayout>
  );
};

export default Privacy;
