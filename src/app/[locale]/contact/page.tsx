import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { ContactPageContent } from './ContactPageContent';
import { services } from '@/data/services';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.contact.hero.title,
    description: dict.contact.hero.subtitle,
    path: '/contact',
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Build localized service options for the form
  const serviceOptions = services.map((s) => ({
    id: s.id,
    title: dict.services.items[s.id as keyof typeof dict.services.items]?.title ?? s.id,
  }));

  return <ContactPageContent dictionary={dict} serviceOptions={serviceOptions} />;
}
