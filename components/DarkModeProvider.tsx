'use client';

import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}