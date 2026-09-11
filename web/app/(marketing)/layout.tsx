import { BackgroundGridCanvas } from '@/components/BackgroundGridCanvas';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-white text-slate-900 selection:bg-black selection:text-white overflow-x-hidden">
      <BackgroundGridCanvas />
      <Navbar />
      <div className="relative z-10 pt-28 pb-10">{children}</div>
      <Footer />
    </main>
  );
}