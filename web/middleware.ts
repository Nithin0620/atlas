import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('atlas_token')?.value;

  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isProtectedPage = pathname.startsWith('/dashboard') || pathname.startsWith('/call');

  // If user is already authenticated and tries to visit sign-in/sign-up, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not authenticated and tries to access dashboard or call stage, redirect to sign-in
  if (isProtectedPage && !token) {
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/call/:path*', '/sign-in', '/sign-up'],
};
