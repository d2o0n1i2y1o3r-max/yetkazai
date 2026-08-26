import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Navigation from '@/components/Navigation';
import DarkModeProvider from '@/components/DarkModeProvider';
import I18nProvider from '@/components/I18nProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YetkazAI - Delivery Optimization Platform",
  description: "Compare courier services and optimize delivery routes for small businesses in Uzbekistan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <I18nProvider>
          <DarkModeProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </DarkModeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
