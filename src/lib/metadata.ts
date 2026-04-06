import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa';
const SITE_NAME = 'Takamul Smart Technology';

type MetadataParams = {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
};

/**
 * Generate page metadata with OG, Twitter Cards, and hreflang alternates
 */
export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImage = '/images/og-default.jpg',
}: MetadataParams): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
