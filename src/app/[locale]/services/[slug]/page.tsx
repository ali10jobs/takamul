import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { services } from '@/data/services';
import { ServiceDetailContent } from './ServiceDetailContent';

export async function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const item = dict.services.items[service.id as keyof typeof dict.services.items];
  return generatePageMetadata({
    title: item?.title ?? service.id,
    description: item?.description ?? '',
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const item = dict.services.items[service.id as keyof typeof dict.services.items];
  if (!item) notFound();

  return (
    <ServiceDetailContent
      service={service}
      dictionary={item}
      ctaText={dict.common.cta.contactUs}
      backLabel={dict.common.nav.services}
      locale={locale}
    />
  );
}
