import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, MessageSquare, Bell, Shield, BarChart3, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const mainNavLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/complaints', label: t('nav.complaints') },
    // { href: '/track', label: t('nav.track') },
  ];

  const portalLinks = [
    { href: '/dashboard', label: 'My Dashboard', icon: Users, description: 'View your submissions and track progress' },
    { href: '/chatbot', label: 'AI Assistant', icon: MessageSquare, description: 'Get help in English or Kinyarwanda' },
    { href: '/notifications', label: 'Notifications', icon: Bell, description: 'Manage alerts and preferences' },
    { href: '/transparency', label: 'Transparency Portal', icon: Eye, description: 'Public data and performance metrics' },
  ];

  const staffLinks = [
    { href: '/staff', label: 'Staff Dashboard', icon: Users, description: 'Manage cases and assignments' },
    { href: '/reports', label: 'Reports & Analytics', icon: BarChart3, description: 'View KPIs and performance data' },
    { href: '/privacy', label: 'Data Protection', icon: Shield, description: 'Privacy settings and compliance' },
  ];

  const allMobileLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/complaints', label: t('nav.complaints') },
    { href: '/track', label: t('nav.track') },
    { href: '/dashboard', label: 'My Dashboard' },
    { href: '/chatbot', label: 'AI Assistant' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/transparency', label: 'Transparency Portal' },
    { href: '/staff', label: 'Staff Dashboard' },
    { href: '/reports', label: 'Reports & Analytics' },
    { href: '/privacy', label: 'Data Protection' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-gov">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-gov">
              <span className="text-primary-foreground font-display font-bold text-lg">J</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-foreground text-lg leading-tight">
                Jabana Sector
              </h1>
              <p className="text-xs text-muted-foreground">Citizen Services</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Citizen Portal</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4">
                      {portalLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="flex items-start gap-3 rounded-md p-3 hover:bg-muted transition-colors"
                            >
                              <link.icon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">{link.label}</div>
                                <p className="text-xs text-muted-foreground">{link.description}</p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Staff Area</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4">
                      {staffLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="flex items-start gap-3 rounded-md p-3 hover:bg-muted transition-colors"
                            >
                              <link.icon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">{link.label}</div>
                                <p className="text-xs text-muted-foreground">{link.description}</p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'English' : 'Kinyarwanda'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  <span className={language === 'en' ? 'font-semibold' : ''}>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('rw')}>
                  <span className={language === 'rw' ? 'font-semibold' : ''}>Kinyarwanda</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {/* <Button variant="ghost" size="sm" asChild>
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">{t('nav.register')}</Link>
              </Button> */}
              <Button size="sm" asChild>
                <Link to="/Login">{t('Logout')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {allMobileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-sm font-medium bg-primary text-primary-foreground"
              >
                {t('nav.register')}
              </Link>
              
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
