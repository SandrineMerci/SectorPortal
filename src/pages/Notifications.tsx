import { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  Settings,
  Check,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Megaphone,
  Calendar,
  Filter,
  Trash2,
  Eye,
  EyeOff,
  Send,
  Edit,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import CitizenLayout from '@/components/CitizenLayout';

interface Notification {
  id: string;
  type: 'status' | 'alert' | 'announcement' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  channel: ('email' | 'sms' | 'push')[];
}

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'status_update' | 'reminder' | 'escalation' | 'announcement';
}

const Notifications = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('inbox');
  const [filter, setFilter] = useState('all');
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [broadcastDialogOpen, setBroadcastDialogOpen] = useState(false);

  const [preferences, setPreferences] = useState({
    email: { enabled: true, statusUpdates: true, reminders: true, announcements: true },
    sms: { enabled: true, statusUpdates: true, reminders: false, announcements: false },
    push: { enabled: true, statusUpdates: true, reminders: true, announcements: true },
    doNotDisturb: { enabled: false, start: '22:00', end: '07:00' },
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'status',
      title: 'Request Status Updated',
      message: 'Your road repair request (JAB-2025-001234) is now In Progress. Expected completion: Jan 15, 2025.',
      timestamp: '2 hours ago',
      read: false,
      channel: ['email', 'sms', 'push'],
    },
    {
      id: '2',
      type: 'alert',
      title: 'Action Required',
      message: 'Additional information needed for your document request. Please upload proof of residence.',
      timestamp: '5 hours ago',
      read: false,
      channel: ['email', 'push'],
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Sector Office Closed',
      message: 'The sector office will be closed on January 15th for a public holiday. Online services remain available.',
      timestamp: 'Yesterday',
      read: true,
      channel: ['email', 'sms', 'push'],
    },
    {
      id: '4',
      type: 'status',
      title: 'Complaint Resolved',
      message: 'Your complaint (JAB-CMP-2024-00789) has been resolved. Please provide feedback on your experience.',
      timestamp: '2 days ago',
      read: true,
      channel: ['email'],
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Follow-up Reminder',
      message: 'You have a pending request that requires your attention. Please review and respond.',
      timestamp: '3 days ago',
      read: true,
      channel: ['push'],
    },
  ]);

  const templates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'Status Update - In Progress',
      subject: 'Your Request is Being Processed',
      body: 'Dear {{citizen_name}}, your request ({{reference_number}}) is now being processed. Expected completion: {{expected_date}}.',
      type: 'status_update',
    },
    {
      id: '2',
      name: 'Status Update - Resolved',
      subject: 'Your Request Has Been Resolved',
      body: 'Dear {{citizen_name}}, your request ({{reference_number}}) has been successfully resolved. Please rate your experience.',
      type: 'status_update',
    },
    {
      id: '3',
      name: 'Overdue Escalation',
      subject: 'Urgent: Request Requires Attention',
      body: 'Request {{reference_number}} is overdue and requires immediate attention. Please prioritize.',
      type: 'escalation',
    },
    {
      id: '4',
      name: 'Public Announcement',
      subject: 'Important Announcement from Jabana Sector',
      body: 'Dear citizens, {{announcement_content}}. Thank you for your understanding.',
      type: 'announcement',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'status': return <FileText className="h-5 w-5 text-primary" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'announcement': return <Megaphone className="h-5 w-5 text-secondary" />;
      case 'reminder': return <Clock className="h-5 w-5 text-warning" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      status: 'bg-primary/10 text-primary',
      alert: 'bg-destructive/10 text-destructive',
      announcement: 'bg-secondary/10 text-secondary',
      reminder: 'bg-warning/10 text-warning',
    };
    return variants[type] || 'bg-muted text-muted-foreground';
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <CitizenLayout 
      title={language === 'rw' ? 'Amakuru & Ibisobanuro' : 'Notifications & Alerts'}
      subtitle={language === 'rw' ? 'Genzura ubutumwa bwawe no guhindura uko ubutumwa bugutungurira' : 'Manage your notifications and alert preferences'}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          {unreadCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground h-8 px-4">
              {unreadCount} {language === 'rw' ? 'Bitarasomwa' : 'Unread'}
            </Badge>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-lg mb-6">
            <TabsTrigger value="inbox">
              {language === 'rw' ? 'Inbox' : 'Inbox'}
            </TabsTrigger>
            <TabsTrigger value="preferences">
              {language === 'rw' ? 'Amahitamo' : 'Preferences'}
            </TabsTrigger>
            <TabsTrigger value="templates">
              {language === 'rw' ? 'Ingero' : 'Templates'}
            </TabsTrigger>
            <TabsTrigger value="broadcast">
              {language === 'rw' ? 'Itangazo' : 'Broadcast'}
            </TabsTrigger>
          </TabsList>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
            <Card className="border-border">
              <CardHeader className="border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>{language === 'rw' ? 'Ubutumwa Bwawe' : 'Your Notifications'}</CardTitle>
                  <div className="flex items-center gap-3">
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === 'rw' ? 'Byose' : 'All'}</SelectItem>
                        <SelectItem value="unread">{language === 'rw' ? 'Bitarasomwa' : 'Unread'}</SelectItem>
                        <SelectItem value="read">{language === 'rw' ? 'Byasomwe' : 'Read'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      <Check className="h-4 w-4 mr-1" />
                      {language === 'rw' ? 'Soma Byose' : 'Mark All Read'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="divide-y divide-border">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/30 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h3>
                                  <Badge variant="outline" className={getTypeBadge(notification.type)}>
                                    {notification.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                                  <div className="flex gap-1">
                                    {notification.channel.includes('email') && (
                                      <Mail className="h-3 w-3 text-muted-foreground" />
                                    )}
                                    {notification.channel.includes('sms') && (
                                      <Smartphone className="h-3 w-3 text-muted-foreground" />
                                    )}
                                    {notification.channel.includes('push') && (
                                      <Bell className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredNotifications.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{language === 'rw' ? 'Nta makuru' : 'No notifications'}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Preferences */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Amakuru ya Imeri' : 'Email Notifications'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{language === 'rw' ? 'Gufungura Amakuru ya Imeri' : 'Enable Email'}</Label>
                    <Switch
                      checked={preferences.email.enabled}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, email: { ...prev.email, enabled: checked } }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Amakuru yo Guhindura' : 'Status Updates'}</span>
                      <Switch
                        checked={preferences.email.statusUpdates}
                        disabled={!preferences.email.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, email: { ...prev.email, statusUpdates: checked } }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Ibikorwa' : 'Reminders'}</span>
                      <Switch
                        checked={preferences.email.reminders}
                        disabled={!preferences.email.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, email: { ...prev.email, reminders: checked } }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Amatangazo' : 'Announcements'}</span>
                      <Switch
                        checked={preferences.email.announcements}
                        disabled={!preferences.email.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, email: { ...prev.email, announcements: checked } }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SMS Preferences */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Amakuru ya SMS' : 'SMS Notifications'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{language === 'rw' ? 'Gufungura SMS' : 'Enable SMS'}</Label>
                    <Switch
                      checked={preferences.sms.enabled}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, sms: { ...prev.sms, enabled: checked } }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Amakuru yo Guhindura' : 'Status Updates'}</span>
                      <Switch
                        checked={preferences.sms.statusUpdates}
                        disabled={!preferences.sms.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, sms: { ...prev.sms, statusUpdates: checked } }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Ibikorwa' : 'Reminders'}</span>
                      <Switch
                        checked={preferences.sms.reminders}
                        disabled={!preferences.sms.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, sms: { ...prev.sms, reminders: checked } }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language === 'rw' ? 'Amatangazo' : 'Announcements'}</span>
                      <Switch
                        checked={preferences.sms.announcements}
                        disabled={!preferences.sms.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, sms: { ...prev.sms, announcements: checked } }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Do Not Disturb */}
              <Card className="border-border md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-primary" />
                    {language === 'rw' ? 'Igihe cyo Kuruhuka' : 'Do Not Disturb'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'rw' ? 'Hagarika amakuru mu gihe runaka' : 'Pause notifications during specified hours'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={preferences.doNotDisturb.enabled}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, doNotDisturb: { ...prev.doNotDisturb, enabled: checked } }))
                        }
                      />
                      <Label>{language === 'rw' ? 'Gufungura' : 'Enable'}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">{language === 'rw' ? 'Kuva' : 'From'}</Label>
                      <Input
                        type="time"
                        value={preferences.doNotDisturb.start}
                        onChange={(e) =>
                          setPreferences(prev => ({ ...prev, doNotDisturb: { ...prev.doNotDisturb, start: e.target.value } }))
                        }
                        className="w-32"
                        disabled={!preferences.doNotDisturb.enabled}
                      />
                      <Label className="text-sm text-muted-foreground">{language === 'rw' ? 'Kugeza' : 'To'}</Label>
                      <Input
                        type="time"
                        value={preferences.doNotDisturb.end}
                        onChange={(e) =>
                          setPreferences(prev => ({ ...prev, doNotDisturb: { ...prev.doNotDisturb, end: e.target.value } }))
                        }
                        className="w-32"
                        disabled={!preferences.doNotDisturb.enabled}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full sm:w-auto">
              <Check className="h-4 w-4 mr-2" />
              {language === 'rw' ? 'Bika Amahitamo' : 'Save Preferences'}
            </Button>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <Card className="border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle>{language === 'rw' ? 'Ingero z\'Ubutumwa' : 'Message Templates'}</CardTitle>
                  <Button onClick={() => setTemplateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Ongeraho' : 'Add Template'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {templates.map((template) => (
                    <div key={template.id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{template.name}</h3>
                            <Badge variant="outline">{template.type.replace('_', ' ')}</Badge>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">{template.subject}</p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.body}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast Tab */}
          <TabsContent value="broadcast" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Itangazo Rusange' : 'Public Broadcast'}
                </CardTitle>
                <CardDescription>
                  {language === 'rw' ? 'Ohereza ubutumwa ku baturage bose' : 'Send announcements to all citizens'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{language === 'rw' ? 'Umutwe' : 'Subject'}</Label>
                  <Input placeholder={language === 'rw' ? 'Umutwe w\'itangazo...' : 'Announcement subject...'} />
                </div>
                <div>
                  <Label>{language === 'rw' ? 'Ubutumwa' : 'Message'}</Label>
                  <Textarea 
                    placeholder={language === 'rw' ? 'Andika ubutumwa hano...' : 'Write your message here...'}
                    rows={5}
                  />
                </div>
                <div>
                  <Label>{language === 'rw' ? 'Inzira' : 'Channels'}</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">SMS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">Push</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Ohereza Nonaha' : 'Send Now'}
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    {language === 'rw' ? 'Shiraho Igihe' : 'Schedule'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Report */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{language === 'rw' ? 'Raporo yo Kohereza' : 'Delivery Report'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">1,234</p>
                    <p className="text-sm text-muted-foreground">{language === 'rw' ? 'Byoherejwe' : 'Delivered'}</p>
                  </div>
                  <div className="p-4 bg-warning/10 rounded-lg">
                    <p className="text-2xl font-bold text-warning">56</p>
                    <p className="text-sm text-muted-foreground">{language === 'rw' ? 'Bitegereje' : 'Pending'}</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">12</p>
                    <p className="text-sm text-muted-foreground">{language === 'rw' ? 'Byanze' : 'Failed'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CitizenLayout>
  );
};

export default Notifications;
