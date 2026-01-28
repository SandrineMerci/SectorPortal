import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const Complaints = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    priority: '',
    description: '',
    location: '',
    name: '',
    phone: '',
    email: '',
    nationalId: '',
  });

  const categories = [
    { value: 'corruption', label: 'Corruption / Misuse of Funds' },
    { value: 'poor-service', label: 'Poor Service Delivery' },
    { value: 'staff-conduct', label: 'Staff Misconduct' },
    { value: 'infrastructure', label: 'Infrastructure Issues' },
    { value: 'environment', label: 'Environmental Concerns' },
    { value: 'other', label: 'Other' },
  ];

  const priorities = [
    { value: 'low', label: t('priority.low') },
    { value: 'medium', label: t('priority.medium') },
    { value: 'high', label: t('priority.high') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <CitizenLayout title="Complaint Submitted" subtitle="Your complaint has been filed">
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="max-w-md w-full text-center shadow-gov-lg animate-scale-in">
            <CardContent className="pt-10 pb-8 px-8">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Complaint Submitted
              </h2>
              <p className="text-muted-foreground mb-6">
                Your complaint has been filed successfully and will be reviewed by our team.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                <p className="font-display font-bold text-xl text-primary">JAB-CMP-2025-00456</p>
              </div>
              {isAnonymous ? (
                <p className="text-sm text-muted-foreground mb-6">
                  Your complaint was submitted anonymously. Save your reference number to track the status.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mb-6">
                  You will receive updates via SMS and email about the progress of your complaint.
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link to="/track">Track Complaint</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  File Another Complaint
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout title={t('nav.complaints')} subtitle="File a complaint about government services, staff conduct, or any other concerns">
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-gov-lg">
            <CardHeader className="border-b border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <CardTitle className="font-display text-2xl">{t('nav.complaints')}</CardTitle>
                  <CardDescription>
                    Your feedback helps us improve.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted mb-6">
                <div className="flex items-center gap-3">
                  {isAnonymous ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground text-sm">Submit Anonymously</p>
                    <p className="text-xs text-muted-foreground">Your identity will not be recorded</p>
                  </div>
                </div>
                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Complaint Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('form.category')} *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">{t('form.priority')} *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">{t('form.location')}</Label>
                  <Input
                    id="location"
                    placeholder="Where did this issue occur? (if applicable)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t('form.description')} *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your complaint in detail. Include dates, names, and any evidence if available..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                {/* Contact Information (shown if not anonymous) */}
                {!isAnonymous && (
                  <>
                    <hr className="border-border" />
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('form.name')} *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationalId">{t('form.nationalId')}</Label>
                          <Input
                            id="nationalId"
                            placeholder="1 XXXX X XXXXXXX X XX"
                            value={formData.nationalId}
                            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('form.phone')} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+250 7XX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('form.email')}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com (optional)"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Submit Complaint
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <Link to="/dashboard">{t('form.cancel')}</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Complaints;
