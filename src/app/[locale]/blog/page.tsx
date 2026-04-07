import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { BlogListContent } from './BlogListContent';
import { blogPosts } from '@/data/blog';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.blog.hero.title,
    description: dict.blog.hero.subtitle,
    path: '/blog',
    locale,
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <BlogListContent dictionary={dict.blog} posts={blogPosts} locale={locale} />;
}
