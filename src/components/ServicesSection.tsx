import { Construction, Droplets, Trash2, Zap, Heart, GraduationCap } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Construction,
      title: t('service.road'),
      description: 'Report potholes, damaged roads, and request infrastructure repairs in your area.',
      href: '/services/road-repair',
      color: 'primary' as const,
    },
    {
      icon: Droplets,
      title: t('service.water'),
      description: 'Report water supply problems, leaks, or request new water connections.',
      href: '/services/water',
      color: 'secondary' as const,
    },
    {
      icon: Trash2,
      title: t('service.waste'),
      description: 'Schedule waste collection or report missed pickups in your neighborhood.',
      href: '/services/waste',
      color: 'accent' as const,
    },
    {
      icon: Zap,
      title: t('service.electricity'),
      description: 'Report power outages, electrical hazards, or request new connections.',
      href: '/services/electricity',
      color: 'primary' as const,
    },
    {
      icon: Heart,
      title: t('service.health'),
      description: 'Access health programs, report health concerns, and find local health centers.',
      href: '/services/health',
      color: 'secondary' as const,
    },
    {
      icon: GraduationCap,
      title: t('service.education'),
      description: 'Inquire about schools, educational programs, and related services.',
      href: '/services/education',
      color: 'accent' as const,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('services.title')}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            {t('services.subtitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a service category below to submit your request. Our team is committed to addressing your needs promptly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.href}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
