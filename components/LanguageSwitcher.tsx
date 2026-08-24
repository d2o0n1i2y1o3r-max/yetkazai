'use client';

import { useStore } from '@/store/useStore';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useStore();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: 'uz' | 'ru' | 'en') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange('uz')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'uz'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        UZ
      </button>
      <button
        onClick={() => handleLanguageChange('ru')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'ru'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}