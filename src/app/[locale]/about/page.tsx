import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { AboutContent } from './AboutContent';
import { values } from '@/data/values';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.about.hero.title,
    description: dict.about.hero.subtitle,
    path: '/about',
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <AboutContent dictionary={dict} values={values} locale={locale} />;
}
