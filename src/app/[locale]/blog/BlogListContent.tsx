'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import type { BlogPost } from '@/data/blog';
import type { Dictionary } from '@/types/dictionary';

interface BlogListContentProps {
  dictionary: Dictionary['blog'];
  posts: BlogPost[];
  locale: string;
}

export function BlogListContent({ dictionary, posts, locale }: BlogListContentProps) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 text-center lg:py-28">
        <Container>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-[var(--color-primary-500)] uppercase"
          >
            {dictionary.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-foreground mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {dictionary.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg"
          >
            {dictionary.hero.subtitle}
          </motion.p>
        </Container>
      </section>

      {/* Posts grid */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {posts.map((post) => {
              const item = dictionary.items[post.id];
              if (!item) return null;

              return (
                <motion.div key={post.id} variants={fadeUp}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:border-[var(--color-primary-300)] hover:shadow-[var(--color-primary-500)]/5 hover:shadow-xl"
                  >
                    {/* Image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-900)]">
                      <div className="flex h-full items-center justify-center">
                        <ArrowUpRight className="h-8 w-8 text-[var(--color-primary-300)] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {/* Meta */}
                      <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(
                            locale === 'ar' ? 'ar-SA' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </time>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} {dictionary.readTime}
                        </span>
                      </div>

                      <h2 className="text-foreground mb-2 text-lg font-semibold transition-colors group-hover:text-[var(--color-primary-500)]">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                        {item.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
