import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrackingSection from '@/components/TrackingSection';
import { Shield, Clock, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        
        {/* Features Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">Fast Response</h3>
                  <p className="text-sm text-muted-foreground">Get acknowledgment within 24 hours and regular updates on your request status.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Your personal information is protected with industry-standard security measures.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">Bilingual Support</h3>
                  <p className="text-sm text-muted-foreground">Access all services in both English and Kinyarwanda for your convenience.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrackingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
