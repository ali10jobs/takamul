import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';

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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section Placeholder */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
          {dict.home.hero.eyebrow}
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {dict.home.hero.title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          {dict.home.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`/${locale}/contact`}
            className="bg-primary hover:bg-primary/90 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors"
          >
            {dict.home.hero.cta}
          </a>
          <a
            href={`/${locale}/case-studies`}
            className="border-border hover:bg-muted rounded-full border px-8 py-3 text-sm font-semibold transition-colors"
          >
            {dict.home.hero.ctaSecondary}
          </a>
        </div>
      </section>
    </div>
  );
}
