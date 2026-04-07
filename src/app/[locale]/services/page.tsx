import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/data/services';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.services.hero.title,
    description: dict.services.hero.subtitle,
    path: '/services',
    locale,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-[var(--color-primary-500)] uppercase">
            {dict.services.hero.eyebrow}
          </span>
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {dict.services.hero.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">{dict.services.hero.subtitle}</p>
        </div>
      </section>

      <ServiceGrid
        eyebrow=""
        title=""
        subtitle=""
        items={dict.services.items}
        services={services}
      />

      <CTASection
        title={dict.home.ctaSection.title}
        subtitle={dict.home.ctaSection.subtitle}
        ctaText={dict.common.cta.getStarted}
      />
    </div>
  );
}
