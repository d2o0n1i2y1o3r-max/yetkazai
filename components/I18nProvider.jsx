'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { resources } from '@/lib/i18n';

export default function I18nProvider({ children }) {
  const { language } = useStore();

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
          resources,
          lng: language,
          fallbackLng: 'uz',
          interpolation: {
            escapeValue: false
          }
        });
    } else {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return <>{children}</>;
}