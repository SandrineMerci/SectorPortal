import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  HelpCircle,
  FileText,
  AlertCircle,
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Headphones,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import CitizenLayout from '@/components/CitizenLayout';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  helpful?: boolean | null;
}

interface QuickAction {
  icon: typeof FileText;
  label: string;
  labelRw: string;
  query: string;
}

const Chatbot = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'rw' 
        ? 'Muraho! Ndi umufasha wawe wa digitale wa Jabana. Nshobora kubafasha gukora inyandiko z\'ibikorwa, gutanga ibibazo, cyangwa kubafasha kubona amakuru. Ni iki nshobora kubafasha uyu munsi?'
        : 'Hello! I\'m your Jabana Sector digital assistant. I can help you submit service requests, file complaints, or provide guidance on various services. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { icon: FileText, label: 'Submit Service Request', labelRw: 'Tanga Icyifuzo', query: 'How do I submit a service request?' },
    { icon: AlertCircle, label: 'File Complaint', labelRw: 'Tanga Ikibazo', query: 'How do I file a complaint?' },
    { icon: MapPin, label: 'Track My Request', labelRw: 'Kurikirana Icyifuzo', query: 'How can I track my request?' },
    { icon: Clock, label: 'Processing Times', labelRw: 'Igihe cyo Gutunganya', query: 'What are the processing times?' },
  ];

  const faqResponses: Record<string, { en: string; rw: string }> = {
    'service request': {
      en: 'To submit a service request:\n\n1. Go to "Services" page\n2. Select the type of service you need\n3. Fill out the request form with details\n4. Upload any supporting documents\n5. Submit and save your reference number\n\nYou can track your request anytime using the reference number.',
      rw: 'Gusaba serivisi:\n\n1. Jya ku rupapuro rwa "Serivisi"\n2. Hitamo ubwoko bwa serivisi ukeneye\n3. Uzuza ifomulari y\'icyifuzo hamwe n\'amakuru\n4. Shyiraho inyandiko zifasha\n5. Ohereza ukize nomero y\'icyifuzo\n\nUshobora gukurikirana icyifuzo cyawe igihe cyose ukoresheje nomero.',
    },
    'complaint': {
      en: 'To file a complaint:\n\n1. Navigate to "Complaints" page\n2. Choose the category of your complaint\n3. Describe the issue in detail\n4. You can submit anonymously if needed\n5. Submit and receive a tracking number\n\nOur team will review your complaint within 24-48 hours.',
      rw: 'Gutanga ikibazo:\n\n1. Jya ku rupapuro rwa "Ibibazo"\n2. Hitamo ubwoko bw\'ikibazo cyawe\n3. Sobanura ikibazo mu buryo burambuye\n4. Ushobora kohereza mu ibanga niba ukeneye\n5. Ohereza uhabwe nomero yo gukurikirana\n\nIkipe yacu izasuzuma ikibazo cyawe mu masaha 24-48.',
    },
    'track': {
      en: 'To track your request or complaint:\n\n1. Go to "Track" page\n2. Enter your reference number (e.g., JAB-2025-001234)\n3. View current status and timeline\n4. See any updates or comments from staff\n\nYou\'ll also receive SMS/email notifications for status changes.',
      rw: 'Gukurikirana icyifuzo cyawe:\n\n1. Jya ku rupapuro rwa "Gukurikirana"\n2. Andika nomero yawe (urugero: JAB-2025-001234)\n3. Reba aho bigeze n\'amateka\n4. Reba amakuru mashya y\'abakozi\n\nUzabona kandi ubutumwa bwa SMS/imeri ku bihinduka.',
    },
    'processing': {
      en: 'Average processing times:\n\n• Road Repair: 5-7 business days\n• Water Issues: 2-3 business days\n• Waste Collection: 1-2 business days\n• Document Requests: 3-5 business days\n• Complaints: Initial response within 48 hours\n\nUrgent cases are prioritized.',
      rw: 'Igihe cyo gutunganya:\n\n• Gukosora Imihanda: Iminsi 5-7\n• Ibibazo by\'Amazi: Iminsi 2-3\n• Gukusanya Imyanda: Iminsi 1-2\n• Inyandiko: Iminsi 3-5\n• Ibibazo: Igisubizo mu masaha 48\n\nIbintu byihutirwa bihabwa umwanya wa mbere.',
    },
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('request') || lowerMessage.includes('serivisi')) {
      return faqResponses['service request'][language === 'rw' ? 'rw' : 'en'];
    }
    if (lowerMessage.includes('complaint') || lowerMessage.includes('ikibazo') || lowerMessage.includes('file')) {
      return faqResponses['complaint'][language === 'rw' ? 'rw' : 'en'];
    }
    if (lowerMessage.includes('track') || lowerMessage.includes('status') || lowerMessage.includes('kurikirana')) {
      return faqResponses['track'][language === 'rw' ? 'rw' : 'en'];
    }
    if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('igihe')) {
      return faqResponses['processing'][language === 'rw' ? 'rw' : 'en'];
    }
    
    return language === 'rw'
      ? 'Murakoze ku kibazo cyanyu. Sinumva neza icyo mubaza. Mwaba mushaka gusobanukirwa ibyerekeye gusaba serivisi, gutanga ikibazo, cyangwa gukurikirana icyifuzo cyanyu? Mushobora kandi gusaba kuvugana n\'umukozi.'
      : 'Thank you for your question. I\'m not sure I fully understand. Would you like help with submitting a service request, filing a complaint, or tracking your request? You can also request to speak with a staff member.';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date(),
        helpful: null,
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    handleSend();
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue(language === 'rw' ? 'Ndashaka gusaba serivisi' : 'I want to submit a service request');
      }, 2000);
    }
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  return (
    <CitizenLayout 
      title={language === 'rw' ? 'Umufasha wa Digitale' : 'Digital Assistant'} 
      subtitle={language === 'rw' ? 'Baza ikibazo cyose ku serivisi za Jabana' : 'Ask any question about Jabana Sector services'}
      showFooter={false}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="border-border h-[600px] flex flex-col">
              <CardHeader className="border-b border-border bg-primary/5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Jabana Assistant</CardTitle>
                    <p className="text-sm text-success flex items-center gap-1">
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      {language === 'rw' ? 'Ku murongo' : 'Online'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' ? 'bg-secondary' : 'bg-primary'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="h-4 w-4 text-secondary-foreground" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            )}
                          </div>
                          <div>
                            <div className={`rounded-2xl px-4 py-3 ${
                              message.type === 'user'
                                ? 'bg-secondary text-secondary-foreground rounded-br-sm'
                                : 'bg-muted text-foreground rounded-bl-sm'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{message.content}</p>
                            </div>
                            {message.type === 'bot' && message.helpful === null && (
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {language === 'rw' ? 'Byabafashije?' : 'Was this helpful?'}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleFeedback(message.id, true)}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleFeedback(message.id, false)}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                            {message.helpful !== null && message.helpful !== undefined && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {language === 'rw' ? 'Murakoze ku bisubizo!' : 'Thanks for your feedback!'}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button
                      variant={isListening ? 'destructive' : 'outline'}
                      size="icon"
                      onClick={handleVoiceInput}
                      className="flex-shrink-0"
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Input
                      placeholder={language === 'rw' ? 'Andika ubutumwa bwawe...' : 'Type your message...'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Ibikorwa Byihuse' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setInputValue(action.query);
                      setTimeout(() => handleSend(), 100);
                    }}
                  >
                    <action.icon className="h-4 w-4 text-primary" />
                    {language === 'rw' ? action.labelRw : action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Live Support */}
            {/* <Card className="border-border bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === 'rw' ? 'Ukeneye Ubufasha?' : 'Need Human Help?'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'rw' ? 'Vugana n\'umukozi' : 'Talk to staff'}
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="secondary">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === 'rw' ? 'Tangira Ikiganiro' : 'Start Live Chat'}
                </Button>
              </CardContent>
            </Card> */}

            {/* Guidance History */}
            {/* <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  {language === 'rw' ? 'Amateka' : 'Recent Topics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">Service Request</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Tracking</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Road Repair</Badge>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Chatbot;
