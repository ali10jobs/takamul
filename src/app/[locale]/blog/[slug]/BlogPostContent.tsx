'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, staggerContainer } from '@/animations/variants';
import type { BlogPost } from '@/data/blog';
import type { Dictionary } from '@/types/dictionary';

interface BlogPostContentProps {
  post: BlogPost;
  dictionary: { title: string; excerpt: string; content: string };
  blogDict: Dictionary['blog'];
  backLabel: string;
  locale: string;
}

export function BlogPostContent({
  post,
  dictionary,
  blogDict,
  backLabel,
  locale,
}: BlogPostContentProps) {
  return (
    <div className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}/blog`}
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {backLabel}
          </Link>
        </motion.div>

        <motion.article variants={staggerContainer(0.12)} initial="hidden" animate="visible">
          {/* Meta */}
          <motion.div
            variants={fadeUp}
            className="text-muted-foreground mb-4 flex flex-wrap items-center gap-4 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {blogDict.publishedOn}{' '}
              {new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} {blogDict.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {dictionary.title}
          </motion.h1>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* Hero image placeholder */}
          <motion.div
            variants={fadeUp}
            className="mb-10 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] sm:h-80 dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-900)]"
          />

          {/* Content */}
          <motion.div variants={fadeUp} className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">{dictionary.content}</p>
          </motion.div>
        </motion.article>
      </Container>
    </div>
  );
}
