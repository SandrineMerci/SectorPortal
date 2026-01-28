import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color?: 'primary' | 'secondary' | 'accent';
}

const ServiceCard = ({ icon: Icon, title, description, href, color = 'primary' }: ServiceCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    secondary: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground',
    accent: 'bg-accent/20 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground',
  };

  return (
    <Link to={href} className="group">
      <Card className="h-full card-hover border-border bg-card overflow-hidden">
        <CardContent className="p-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${colorClasses[color]}`}
          >
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
