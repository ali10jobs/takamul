import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { blogPosts } from '@/data/blog';
import { BlogPostContent } from './BlogPostContent';

export async function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const item = dict.blog.items[post.id];
  return generatePageMetadata({
    title: item?.title ?? post.id,
    description: item?.excerpt ?? '',
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const item = dict.blog.items[post.id];
  if (!item) notFound();

  return <BlogPostContent post={post} dictionary={item} blogDict={dict.blog} locale={locale} />;
}
