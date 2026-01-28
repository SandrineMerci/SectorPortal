import { useState } from 'react';
import { Search, ArrowRight, FileText, AlertCircle } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from '@/components/StatusBadge';

const Track = () => {
  const { t } = useLanguage();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data
  const mockRequests = {
    'JAB-2025-001234': {
      type: 'service',
      referenceNumber: 'JAB-2025-001234',
      category: 'Road Repair',
      status: 'progress' as const,
      submittedDate: 'January 5, 2025',
      lastUpdate: 'January 7, 2025',
      description: 'Pothole repair request on Main Street near the market',
      priority: 'Medium',
      timeline: [
        { date: 'Jan 5, 2025', status: 'Submitted', description: 'Request received and logged' },
        { date: 'Jan 6, 2025', status: 'Under Review', description: 'Assigned to roads department' },
        { date: 'Jan 7, 2025', status: 'In Progress', description: 'Repair team scheduled for Jan 10' },
      ],
    },
    'JAB-CMP-2025-00456': {
      type: 'complaint',
      referenceNumber: 'JAB-CMP-2025-00456',
      category: 'Staff Misconduct',
      status: 'review' as const,
      submittedDate: 'January 4, 2025',
      lastUpdate: 'January 6, 2025',
      description: 'Complaint about unprofessional behavior at the sector office',
      priority: 'High',
      timeline: [
        { date: 'Jan 4, 2025', status: 'Submitted', description: 'Complaint received' },
        { date: 'Jan 6, 2025', status: 'Under Review', description: 'Being reviewed by sector leadership' },
      ],
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const result = mockRequests[referenceNumber.toUpperCase() as keyof typeof mockRequests];
    setSearchResult(result || null);
  };

  return (
    <CitizenLayout title={t('track.title')} subtitle="Enter your reference number to check the status of your service request or complaint">
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-3xl">

          {/* Search Form */}
          <Card className="shadow-gov-lg mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="e.g., JAB-2025-001234 or JAB-CMP-2025-00456"
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
              <p className="text-xs text-muted-foreground mt-3">
                Try: JAB-2025-001234 (service request) or JAB-CMP-2025-00456 (complaint)
              </p>
            </CardContent>
          </Card>

          {/* Search Result */}
          {hasSearched && (
            <>
              {searchResult ? (
                <Card className="shadow-gov-lg animate-scale-in overflow-hidden">
                  <div className="bg-primary/5 border-b border-border px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          searchResult.type === 'service' ? 'bg-primary/10' : 'bg-destructive/10'
                        }`}>
                          {searchResult.type === 'service' ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {searchResult.type === 'service' ? 'Service Request' : 'Complaint'}
                          </p>
                          <p className="font-display font-bold text-lg text-foreground">
                            {searchResult.referenceNumber}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={searchResult.status} />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Tabs defaultValue="details">
                      <TabsList className="mb-6">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Category</p>
                            <p className="font-medium text-foreground">{searchResult.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Priority</p>
                            <p className="font-medium text-foreground">{searchResult.priority}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Submitted Date</p>
                            <p className="font-medium text-foreground">{searchResult.submittedDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Last Update</p>
                            <p className="font-medium text-foreground">{searchResult.lastUpdate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description</p>
                          <p className="text-foreground">{searchResult.description}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="timeline">
                        <div className="space-y-4">
                          {searchResult.timeline.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${
                                  index === searchResult.timeline.length - 1 ? 'bg-primary' : 'bg-success'
                                }`} />
                                {index < searchResult.timeline.length - 1 && (
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
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-gov-lg animate-scale-in">
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      No Results Found
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      We couldn't find any request or complaint with that reference number. Please check and try again.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Track;
