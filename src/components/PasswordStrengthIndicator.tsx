import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const checks = useMemo(() => [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /[0-9]/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = checks.filter(c => c.met).length;
  const strengthLabel = strength <= 1 ? 'Weak' : strength <= 3 ? 'Fair' : strength <= 4 ? 'Good' : 'Strong';
  const strengthColor = strength <= 1 ? 'bg-destructive' : strength <= 3 ? 'bg-warning' : strength <= 4 ? 'bg-primary' : 'bg-success';

  if (!password) return null;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : 'bg-muted'}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${strength <= 1 ? 'text-destructive' : strength <= 3 ? 'text-warning' : 'text-success'}`}>
        Password strength: {strengthLabel}
      </p>
      <div className="space-y-1">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {check.met ? (
              <Check className="h-3 w-3 text-success" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={check.met ? 'text-success' : 'text-muted-foreground'}>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
