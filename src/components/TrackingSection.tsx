import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from './StatusBadge';

const TrackingSection = () => {
  const { t } = useLanguage();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceNumber.trim()) {
      setShowResult(true);
    }
  };

  // Mock tracking result
  const mockResult = {
    referenceNumber: 'JAB-2025-001234',
    type: 'Road Repair',
    status: 'progress' as const,
    submittedDate: 'January 5, 2025',
    lastUpdate: 'January 7, 2025',
    description: 'Pothole repair request on Main Street near the market',
    timeline: [
      { date: 'Jan 5, 2025', status: 'Submitted', description: 'Request received and logged' },
      { date: 'Jan 6, 2025', status: 'Under Review', description: 'Assigned to roads department' },
      { date: 'Jan 7, 2025', status: 'In Progress', description: 'Repair team scheduled for Jan 10' },
    ],
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('track.title')}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              {t('track.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('track.enter')}
            </p>
          </div>

          {/* Search Form */}
          <Card className="border-border shadow-gov-lg mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="e.g., JAB-2025-001234"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="gap-2 min-w-[140px]">
                  {t('track.search')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Search Result */}
          {showResult && (
            <Card className="border-border shadow-gov-lg animate-scale-in overflow-hidden">
              <div className="bg-primary/5 border-b border-border px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reference Number</p>
                    <p className="font-display font-bold text-lg text-foreground">{mockResult.referenceNumber}</p>
                  </div>
                  <StatusBadge status={mockResult.status} />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Service Type</p>
                    <p className="font-medium text-foreground">{mockResult.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submitted Date</p>
                    <p className="font-medium text-foreground">{mockResult.submittedDate}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-foreground">{mockResult.description}</p>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-4">Progress Timeline</p>
                  <div className="space-y-4">
                    {mockResult.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${index === mockResult.timeline.length - 1 ? 'bg-primary' : 'bg-success'}`} />
                          {index < mockResult.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{item.status}</span>
                            <span className="text-xs text-muted-foreground">• {item.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
