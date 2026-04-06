import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { blogPosts } from '@/data/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/services', '/case-studies', '/blog', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${page}`])),
        },
      });
    }
  }

  // Service detail pages
  for (const service of services) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/services/${service.slug}`])
          ),
        },
      });
    }
  }

  // Case study detail pages
  for (const cs of caseStudies) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/case-studies/${cs.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/case-studies/${cs.slug}`])
          ),
        },
      });
    }
  }

  // Blog post pages
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
