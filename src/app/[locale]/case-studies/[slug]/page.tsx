import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/case-studies';
import { CaseStudyDetailContent } from './CaseStudyDetailContent';

export async function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((cs) => ({ locale, slug: cs.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};

  const item = dict.caseStudies.items[cs.id as keyof typeof dict.caseStudies.items];
  return generatePageMetadata({
    title: item?.title ?? cs.id,
    description: item?.excerpt ?? '',
    path: `/case-studies/${slug}`,
    locale,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) notFound();

  const item = dict.caseStudies.items[cs.id as keyof typeof dict.caseStudies.items];
  if (!item) notFound();

  return (
    <CaseStudyDetailContent
      caseStudy={cs}
      dictionary={item}
      ctaText={dict.common.cta.contactUs}
      locale={locale}
    />
  );
}
