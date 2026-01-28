import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">J</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Jabana Sector</h3>
                <p className="text-sm text-primary-foreground/70">Citizen Services</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Empowering citizens through transparent, efficient, and accessible government services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('nav.complaints')}
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('nav.track')}
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Transparency Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Portals</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Citizen Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('nav.register')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/staff" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Staff Portal
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Reports & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">+250 788 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">info@jabana.gov.rw</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  {t('footer.hours')}
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Stay Connected</h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Subscribe to receive updates about our services and community news.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} Jabana Sector. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
