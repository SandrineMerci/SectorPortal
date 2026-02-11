import { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NationalIdInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

const NationalIdInput = ({ value, onChange, label = 'National ID', required = true }: NationalIdInputProps) => {
  const [touched, setTouched] = useState(false);

  // Rwanda National ID: 1 YYYY X XXXXXXX X XX (16 digits)
  const formatNationalId = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    let formatted = '';
    if (digits.length > 0) formatted += digits.slice(0, 1);
    if (digits.length > 1) formatted += ' ' + digits.slice(1, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 6);
    if (digits.length > 6) formatted += ' ' + digits.slice(6, 13);
    if (digits.length > 13) formatted += ' ' + digits.slice(13, 14);
    if (digits.length > 14) formatted += ' ' + digits.slice(14, 16);
    return formatted;
  };

  const digitsOnly = value.replace(/\D/g, '');
  const isValid = digitsOnly.length === 16;
  const showValidation = touched && value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNationalId(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="nationalId">{label} {required && '*'}</Label>
      <div className="relative">
        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="nationalId"
          placeholder="1 XXXX X XXXXXXX X XX"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          className={`pl-10 pr-10 ${showValidation ? (isValid ? 'border-success' : 'border-destructive') : ''}`}
          required={required}
        />
        {showValidation && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
      {showValidation && !isValid && (
        <p className="text-xs text-destructive">
          National ID must be 16 digits (format: 1 XXXX X XXXXXXX X XX)
        </p>
      )}
    </div>
  );
};

export default NationalIdInput;
