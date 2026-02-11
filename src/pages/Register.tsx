import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import NationalIdInput from '@/components/NationalIdInput';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>J</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Jabana Sector</h1>
                <p className="text-xs text-muted-foreground">Citizen Services</p>
              </div>
            </Link>
          </div>
        </div>

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full text-center shadow-lg animate-scale-in">
            <CardContent className="pt-10 pb-8 px-8">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="font-bold text-2xl text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Registration Successful!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your account has been created. Please check your email or phone for verification.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate('/login')} className="w-full">Proceed to Login</Button>
                <Button variant="outline" onClick={() => navigate('/')} className="w-full">Back to Home</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>J</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Jabana Sector</h1>
              <p className="text-xs text-muted-foreground">Citizen Services</p>
            </div>
          </Link>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>

          <Card className="shadow-lg">
            <CardHeader className="text-center pb-0">
              <CardTitle className="text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t('nav.register')}</CardTitle>
              <CardDescription>Create an account to submit and track service requests</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <ProfilePictureUpload onImageChange={setProfileImage} />

                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name')} *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <NationalIdInput
                  value={formData.nationalId}
                  onChange={(val) => setFormData({ ...formData, nationalId: val })}
                  label={t('form.nationalId')}
                />

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('form.phone')} *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+250 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com (optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrengthIndicator password={formData.password} />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6" disabled={!agreedToTerms}>
                  {t('nav.register')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">{t('nav.login')}</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Register;
