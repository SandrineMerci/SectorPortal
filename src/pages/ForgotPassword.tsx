import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, KeyRound, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useLanguage } from '@/contexts/LanguageContext';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

type Step = 'method' | 'otp' | 'reset' | 'success';
type Method = 'email' | 'sms';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<Method>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) setStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      setStep('success');
    }
  };

  const Header = () => (
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
  );

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full text-center shadow-lg animate-scale-in">
            <CardContent className="pt-10 pb-8 px-8">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="font-bold text-2xl text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Password Reset!</h2>
              <p className="text-muted-foreground mb-6">Your password has been successfully reset. You can now log in with your new password.</p>
              <Button onClick={() => navigate('/login')} className="w-full">Proceed to Login</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" size="sm" onClick={() => step === 'method' ? navigate('/login') : setStep(step === 'otp' ? 'method' : 'otp')} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {step === 'method' ? 'Back to Login' : 'Back'}
          </Button>

          <Card className="shadow-lg">
            {step === 'method' && (
              <>
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Forgot Password</CardTitle>
                  <CardDescription>Choose how you'd like to receive your verification code</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-3 mb-6">
                    <Button
                      type="button"
                      variant={method === 'email' ? 'default' : 'outline'}
                      className="flex-1 gap-2"
                      onClick={() => setMethod('email')}
                    >
                      <Mail className="h-4 w-4" /> Email
                    </Button>
                    <Button
                      type="button"
                      variant={method === 'sms' ? 'default' : 'outline'}
                      className="flex-1 gap-2"
                      onClick={() => setMethod('sms')}
                    >
                      <Phone className="h-4 w-4" /> SMS
                    </Button>
                  </div>
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact">
                        {method === 'email' ? t('form.email') : t('form.phone')}
                      </Label>
                      <div className="relative">
                        {method === 'email' ? (
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        )}
                        <Input
                          id="contact"
                          type={method === 'email' ? 'email' : 'tel'}
                          placeholder={method === 'email' ? 'your@email.com' : '+250 7XX XXX XXX'}
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full">Send Verification Code</Button>
                  </form>
                </CardContent>
              </>
            )}

            {step === 'otp' && (
              <>
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Enter Verification Code</CardTitle>
                  <CardDescription>
                    We sent a 6-digit code to{' '}
                    <span className="font-medium text-foreground">{contact}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <span className="mx-2 text-muted-foreground">-</span>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={otp.length !== 6}>
                      Verify Code
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Didn't receive the code?{' '}
                      <button type="button" className="text-primary hover:underline font-medium" onClick={() => {}}>
                        Resend
                      </button>
                    </p>
                  </form>
                </CardContent>
              </>
            )}

            {step === 'reset' && (
              <>
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Set New Password</CardTitle>
                  <CardDescription>Create a strong password for your account</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <PasswordStrengthIndicator password={newPassword} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-destructive">Passwords do not match</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!newPassword || newPassword !== confirmPassword}
                    >
                      Reset Password
                    </Button>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
