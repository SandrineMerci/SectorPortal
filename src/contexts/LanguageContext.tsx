import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'rw';

interface Translations {
  [key: string]: {
    en: string;
    rw: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', rw: 'Ahabanza' },
  'nav.services': { en: 'Services', rw: 'Serivisi' },
  'nav.complaints': { en: 'Complaints', rw: 'Ibibazo' },
  'nav.track': { en: 'Track Request', rw: 'Kurikirana' },
  'nav.login': { en: 'Login', rw: 'Kwinjira' },
  'nav.register': { en: 'Register', rw: 'Kwiyandikisha' },
  
  // Hero Section
  'hero.title': { en: 'Jabana Sector Citizen Services', rw: 'Serivisi z\'Abaturage - Umurenge wa Jabana' },
  'hero.subtitle': { en: 'Submit service requests, file complaints, and track progress all in one place', rw: 'Tanga ibisabwa, andika ibibazo, kandi ukurikirane ibyakozwe ahantu hamwe' },
  'hero.submit': { en: 'Submit Request', rw: 'Tanga Icyifuzo' },
  'hero.track': { en: 'Track Status', rw: 'Reba Aho Bigeze' },
  
  // Services
  'services.title': { en: 'Our Services', rw: 'Serivisi Zacu' },
  'services.subtitle': { en: 'Choose from a variety of government services', rw: 'Hitamo muri serivisi zitandukanye za Leta' },
  'service.road': { en: 'Road Repair', rw: 'Gusana Imihanda' },
  'service.water': { en: 'Water Issues', rw: 'Ibibazo by\'Amazi' },
  'service.waste': { en: 'Waste Collection', rw: 'Gukusanya Imyanda' },
  'service.electricity': { en: 'Electricity', rw: 'Amashanyarazi' },
  'service.health': { en: 'Health Services', rw: 'Ubuzima' },
  'service.education': { en: 'Education', rw: 'Uburezi' },
  
  // Forms
  'form.name': { en: 'Full Name', rw: 'Amazina Yose' },
  'form.phone': { en: 'Phone Number', rw: 'Telefoni' },
  'form.email': { en: 'Email Address', rw: 'Imeyili' },
  'form.nationalId': { en: 'National ID', rw: 'Indangamuntu' },
  'form.category': { en: 'Category', rw: 'Icyiciro' },
  'form.description': { en: 'Description', rw: 'Ibisobanuro' },
  'form.location': { en: 'Location', rw: 'Ahantu' },
  'form.priority': { en: 'Priority', rw: 'Ibyihutirwa' },
  'form.submit': { en: 'Submit', rw: 'Ohereza' },
  'form.cancel': { en: 'Cancel', rw: 'Reka' },
  
  // Priority Levels
  'priority.low': { en: 'Low', rw: 'Gake' },
  'priority.medium': { en: 'Medium', rw: 'Hagati' },
  'priority.high': { en: 'High', rw: 'Cyane' },
  
  // Status
  'status.submitted': { en: 'Submitted', rw: 'Byoherejwe' },
  'status.review': { en: 'Under Review', rw: 'Birasuzumwa' },
  'status.progress': { en: 'In Progress', rw: 'Birakozwe' },
  'status.resolved': { en: 'Resolved', rw: 'Byarangiye' },
  
  // Track
  'track.title': { en: 'Track Your Request', rw: 'Kurikirana Icyifuzo Cyawe' },
  'track.enter': { en: 'Enter your reference number', rw: 'Andika nomero yawe' },
  'track.search': { en: 'Search', rw: 'Shakisha' },
  
  // Footer
  'footer.contact': { en: 'Contact Us', rw: 'Twandikire' },
  'footer.address': { en: 'Jabana Sector Office, Gasabo District', rw: 'Ibiro by\'Umurenge wa Jabana, Akarere ka Gasabo' },
  'footer.hours': { en: 'Working Hours: Mon-Fri 8AM-5PM', rw: 'Amasaha y\'akazi: Kuwa Mbere-Kuwa Gatanu 8:00-17:00' },
  'footer.rights': { en: 'All rights reserved', rw: 'Uburenganzira bwose burafitwe' },
  
  // Common
  'common.welcome': { en: 'Welcome', rw: 'Murakaza neza' },
  'common.language': { en: 'Language', rw: 'Ururimi' },
  'common.loading': { en: 'Loading...', rw: 'Gutegereza...' },
  'common.success': { en: 'Success', rw: 'Byagenze neza' },
  'common.error': { en: 'Error', rw: 'Ikosa' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
