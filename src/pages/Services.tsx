import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, MapPin, CheckCircle } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    priority: '',
    name: '',
    phone: '',
    email: '',
  });

  const categories = [
    { value: 'road-repair', label: t('service.road') },
    { value: 'water', label: t('service.water') },
    { value: 'waste', label: t('service.waste') },
    { value: 'electricity', label: t('service.electricity') },
    { value: 'health', label: t('service.health') },
    { value: 'education', label: t('service.education') },
  ];

  const priorities = [
    { value: 'low', label: t('priority.low') },
    { value: 'medium', label: t('priority.medium') },
    { value: 'high', label: t('priority.high') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <CitizenLayout title={t('common.success')} subtitle="Your request has been submitted">
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="max-w-md w-full text-center shadow-gov-lg animate-scale-in">
            <CardContent className="pt-10 pb-8 px-8">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                {t('common.success')}!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your service request has been submitted successfully.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                <p className="font-display font-bold text-xl text-primary">JAB-2025-001235</p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Please save this reference number to track your request status.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link to="/track">Track Request</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout title={t('nav.services')} subtitle="Fill out the form below to submit a new service request">
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-gov-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="font-display text-2xl">{t('nav.services')}</CardTitle>
              <CardDescription>
                All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('form.category')} *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
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
                        <SelectValue placeholder="Select priority" />
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
                  <Label htmlFor="location">{t('form.location')} *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter the location or address"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t('form.description')} *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your service request in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports: JPG, PNG, PDF (max 5MB)
                    </p>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Contact Information */}
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
                    <div className="md:col-span-2 space-y-2">
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

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    {t('form.submit')}
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

export default Services;
