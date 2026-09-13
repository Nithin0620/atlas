'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlight, setHighlight] = useState({ x: 0, y: 0, w: 0, show: false });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is authenticated by calling an API endpoint
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setIsAuthenticated(res.ok && data.success);
      } catch {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (in case token is added/removed)
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const target = e.target as HTMLElement;
    const link = target.closest('[data-nav-link]');

    if (link) {
      const linkRect = link.getBoundingClientRect();
      setHighlight({
        x: linkRect.left - rect.left,
        y: linkRect.top - rect.top,
        w: linkRect.width,
        show: true,
      });
    } else {
      setHighlight((prev) => ({ ...prev, show: false }));
    }
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      <div
        className="
          relative w-full max-w-5xl rounded-full
          bg-white/25
          backdrop-blur-2xl
          border border-white/40
          shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.2)]
          px-5 py-2.5
        "
      >
        <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-white/5 pointer-events-none" />
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
              Atlas
            </span>
          </Link>

          {/* Navigation Links — cursor-tracking pill */}
          <nav
            ref={navRef}
            onMouseMove={handleNavMouseMove}
            onMouseLeave={() => setHighlight((prev) => ({ ...prev, show: false }))}
            className="hidden md:flex items-center gap-1 relative"
          >
            {/* Hover pill */}
            <span
              className="absolute rounded-full bg-black/[0.06] pointer-events-none transition-all duration-200 ease-out"
              style={{
                width: highlight.w,
                height: 28,
                transform: `translate(${highlight.x}px, ${highlight.y}px)`,
                opacity: highlight.show ? 1 : 0,
              }}
            />

            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                data-nav-link
                href={link.href}
                className="
                  relative z-10 px-4 py-1.5 text-sm font-medium text-slate-600
                  hover:text-black rounded-full transition-colors duration-150
                  data-[active]:text-black
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3 text-sm shrink-0">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-medium text-slate-600 hover:text-black px-3 py-1.5 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="font-medium text-slate-600 hover:text-black px-3 py-1.5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-700 hover:text-black p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu — glassmorphism */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden mt-3 pt-3
              border-t border-white/40
              flex flex-col gap-1 text-sm
              rounded-2xl bg-white/30 backdrop-blur-2xl border border-white/50 shadow-xl
              p-2
            "
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-slate-700 hover:bg-black/[0.04] hover:text-black rounded-xl font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full border border-white/50 bg-white/30 text-slate-900 font-medium backdrop-blur-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2.5 rounded-full bg-black text-white font-semibold text-xs"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full border border-white/50 bg-white/30 text-slate-900 font-medium backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full bg-black text-white font-semibold text-xs"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}