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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#01001a] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
