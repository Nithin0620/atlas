import type { Metadata } from 'next';
import './globals.css';
import { AmbientBackground } from '@/components/AmbientBackground';

export const metadata: Metadata = {
  title: 'Atlas — AI Voice Learning Platform',
  description: 'Voice-powered AI learning companion for Web and Mobile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
