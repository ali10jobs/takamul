import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/Hero';
import { ValuesGrid } from '@/components/sections/ValuesGrid';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PartnersStrip } from '@/components/sections/PartnersStrip';
import { CTASection } from '@/components/sections/CTASection';
import { values } from '@/data/values';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { partners } from '@/data/partners';
import { testimonials } from '@/data/testimonials';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.home.hero.title,
    description: dict.home.hero.subtitle,
    path: '',
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Map testimonials to current locale
  const localizedTestimonials = testimonials.map((t) => ({
    id: t.id,
    quote: locale === 'ar' ? t.quoteAr : t.quote,
    author: t.author,
    role: locale === 'ar' ? t.roleAr : t.role,
    company: t.company,
  }));

  return (
    <div className="flex flex-col">
      <Hero
        eyebrow={dict.home.hero.eyebrow}
        title={dict.home.hero.title}
        subtitle={dict.home.hero.subtitle}
        cta={dict.home.hero.cta}
        ctaSecondary={dict.home.hero.ctaSecondary}
      />

      <ValuesGrid
        eyebrow={dict.home.values.eyebrow}
        title={dict.home.values.title}
        subtitle={dict.home.values.subtitle}
        items={dict.home.values.items}
        values={values}
      />

      <ServiceGrid
        eyebrow={dict.home.services.eyebrow}
        title={dict.home.services.title}
        subtitle={dict.home.services.subtitle}
        items={dict.services.items}
        services={services}
      />

      <CaseStudiesShowcase
        eyebrow={dict.home.caseStudies.eyebrow}
        title={dict.home.caseStudies.title}
        subtitle={dict.home.caseStudies.subtitle}
        filterAll={dict.caseStudies.filterAll}
        items={dict.caseStudies.items}
        caseStudies={caseStudies}
      />

      <TestimonialsSection
        eyebrow={dict.home.testimonials.eyebrow}
        title={dict.home.testimonials.title}
        subtitle={dict.home.testimonials.subtitle}
        testimonials={localizedTestimonials}
      />

      <PartnersStrip title={dict.home.partners.title} partners={partners} />

      <CTASection
        title={dict.home.ctaSection.title}
        subtitle={dict.home.ctaSection.subtitle}
        ctaText={dict.common.cta.getStarted}
      />
    </div>
  );
}
