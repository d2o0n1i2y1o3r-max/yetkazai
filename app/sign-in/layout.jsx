import '../globals.css';
import 'leaflet/dist/leaflet.css';
import DarkModeProvider from '@/components/DarkModeProvider';
import I18nProvider from '@/components/I18nProvider';

export default function SignInLayout({ children }) {
  return (
    <html lang="uz">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <I18nProvider>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}