import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.terms.hero.title,
    description: dict.terms.hero.subtitle,
    path: '/terms',
    locale,
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <section className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            {dict.terms.hero.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">{dict.terms.hero.subtitle}</p>
          <p className="text-muted-foreground mt-2 text-sm">{dict.terms.lastUpdated}</p>
        </section>

        <div className="space-y-8">
          {dict.terms.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-foreground mb-3 text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
