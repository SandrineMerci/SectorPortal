import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  Search,
  MessageSquare,
  Bell,
  Shield,
  Globe,
  User,
  LogOut,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CitizenSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  user?: {
    name: string;
    email: string;
  };
}

const CitizenSidebar = ({ isOpen, onToggle, user }: CitizenSidebarProps) => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard',
      description: 'Overview & submissions'
    },
    { 
      label: t('nav.services'), 
      icon: FileText, 
      path: '/services',
      description: 'Request a service'
    },
    { 
      label: t('nav.complaints'), 
      icon: AlertCircle, 
      path: '/complaints',
      description: 'File a complaint'
    },
    { 
      label: t('nav.track'), 
      icon: Search, 
      path: '/track',
      description: 'Track your requests'
    },
    { 
      label: 'AI Assistant', 
      icon: MessageSquare, 
      path: '/chatbot',
      description: 'Get help & guidance'
    },
    { 
      label: 'Notifications', 
      icon: Bell, 
      path: '/notifications',
      badge: 2,
      description: 'Alerts & updates'
    },
    { 
      label: 'Privacy', 
      icon: Shield, 
      path: '/privacy',
      description: 'Data & compliance'
    },
    { 
      label: 'Transparency', 
      icon: Globe, 
      path: '/transparency',
      description: 'Public data portal'
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <span className="text-sidebar-primary-foreground font-bold text-lg">J</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg">Jabana Sector</h1>
                  <p className="text-xs text-sidebar-foreground/70">Citizen Portal</p>
                </div>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-sidebar-foreground"
                onClick={onToggle}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors mb-2"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <div className="h-px bg-sidebar-border my-3" />
            
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive(item.path) 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className={cn("block", isActive(item.path) && "font-medium")}>
                    {item.label}
                  </span>
                  <span className="text-xs text-sidebar-foreground/60 truncate block">
                    {item.description}
                  </span>
                </div>
                {item.badge && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  asChild
                >
                  <Link to="/login">
                    <LogOut className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="flex-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default CitizenSidebar;
