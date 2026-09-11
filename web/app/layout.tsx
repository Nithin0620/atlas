import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
