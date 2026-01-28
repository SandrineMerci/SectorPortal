import { useLanguage } from '@/contexts/LanguageContext';

type Status = 'submitted' | 'review' | 'progress' | 'resolved';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useLanguage();

  const statusConfig = {
    submitted: {
      label: t('status.submitted'),
      className: 'bg-info/10 text-info border-info/20',
    },
    review: {
      label: t('status.review'),
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    progress: {
      label: t('status.progress'),
      className: 'bg-primary/10 text-primary border-primary/20',
    },
    resolved: {
      label: t('status.resolved'),
      className: 'bg-success/10 text-success border-success/20',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === 'submitted' ? 'bg-info' :
        status === 'review' ? 'bg-warning' :
        status === 'progress' ? 'bg-primary' :
        'bg-success'
      }`} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
