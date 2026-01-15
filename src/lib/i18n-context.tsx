"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

type i18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['fr']) => string;
};

const i18nContext = createContext<i18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'fr' || saved === 'en' || saved === 'es')) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      if (browserLang === 'fr' || browserLang === 'en' || browserLang === 'es') {
        setLanguage(browserLang);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: keyof typeof translations['fr']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <i18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </i18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(i18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
