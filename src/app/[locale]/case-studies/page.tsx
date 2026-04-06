import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { caseStudies } from '@/data/case-studies';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.caseStudies.hero.title,
    description: dict.caseStudies.hero.subtitle,
    path: '/case-studies',
    locale,
  });
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-[var(--color-primary-500)] uppercase">
            {dict.caseStudies.hero.eyebrow}
          </span>
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {dict.caseStudies.hero.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">{dict.caseStudies.hero.subtitle}</p>
        </div>
      </section>

      <CaseStudiesShowcase
        eyebrow=""
        title=""
        subtitle=""
        filterAll={dict.caseStudies.filterAll}
        items={dict.caseStudies.items}
        caseStudies={caseStudies}
      />
    </div>
  );
}
