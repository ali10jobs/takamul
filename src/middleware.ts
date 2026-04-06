import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isValidLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicons') ||
    pathname.includes('.') // static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a valid locale
  const pathnameLocale = pathname.split('/')[1];
  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const preferredLocale = getPreferredLocale(acceptLanguage);

  // Redirect to the preferred locale
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(url);
}

/**
 * Parse Accept-Language header and return the best matching locale.
 * Falls back to defaultLocale if no match is found.
 */
function getPreferredLocale(acceptLanguage: string): string {
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, quality] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(), // 'en-US' → 'en'
        quality: quality ? parseFloat(quality) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const lang of languages) {
    if (isValidLocale(lang.code)) {
      return lang.code;
    }
  }

  return defaultLocale;
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ['/((?!_next|api|favicons|.*\\..*).*)'],
};
