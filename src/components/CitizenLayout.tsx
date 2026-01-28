import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CitizenSidebar from './CitizenSidebar';
import Footer from './Footer';

interface CitizenLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showFooter?: boolean;
}

const CitizenLayout = ({ children, title, subtitle, showFooter = true }: CitizenLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user - in real app this would come from auth context
  const user = {
    name: 'Jean Baptiste Uwimana',
    email: 'jean.uwimana@email.com',
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      <CitizenSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default CitizenLayout;
