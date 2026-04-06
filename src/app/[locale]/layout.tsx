import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { inter, ibmPlexArabic } from '@/lib/fonts';
import { locales, localeMetadata, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/utils';
import { StoreProvider } from '@/store/provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/shared/CookieConsent';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa';

  return {
    title: {
      template: locale === 'ar' ? '%s | تكامل للتقنية الذكية' : '%s | Takamul Smart Technology',
      default: locale === 'ar' ? 'تكامل للتقنية الذكية' : 'Takamul Smart Technology',
    },
    description:
      locale === 'ar'
        ? 'شريكك الموثوق للتحول الرقمي'
        : 'Your trusted partner for digital transformation',
    metadataBase: new URL(siteUrl),
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
      },
    },
    icons: {
      icon: '/favicons/favicon.ico',
      apple: '/favicons/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const { dir } = localeMetadata[locale as Locale];
  const dictionary = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(inter.variable, ibmPlexArabic.variable, 'h-full antialiased')}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Takamul Smart Technology',
              alternateName: 'تكامل للتقنية الذكية',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa'}/images/logo.png`,
              description: dictionary.common.footer.description,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Riyadh',
                addressCountry: 'SA',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: dictionary.contact.info.email,
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-full">
        <StoreProvider>
          {/* Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
          </a>
          <Header dictionary={dictionary.common} />
          <main id="main-content" className="pt-16 lg:pt-20">
            {children}
          </main>
          <Footer dictionary={dictionary.common} />
          <CookieConsent dictionary={dictionary.common.cookie} />
        </StoreProvider>
      </body>
    </html>
  );
}
