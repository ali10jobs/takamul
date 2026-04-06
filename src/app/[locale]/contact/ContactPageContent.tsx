'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/data/site-config';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import type { Dictionary } from '@/types/dictionary';

interface ContactPageContentProps {
  dictionary: Dictionary;
  serviceOptions: Array<{ id: string; title: string }>;
}

export function ContactPageContent({ dictionary, serviceOptions }: ContactPageContentProps) {
  const { contact } = dictionary;

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
            {contact.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-foreground mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {contact.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg"
          >
            {contact.hero.subtitle}
          </motion.p>
        </Container>
      </section>

      {/* Form + Contact Info */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
            >
              <div className="border-border bg-card rounded-2xl border p-6 sm:p-8">
                <ContactForm dictionary={contact.form} services={serviceOptions} />
              </div>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              className="lg:col-span-2"
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className="space-y-6">
                <motion.div
                  variants={fadeUp}
                  className="border-border bg-card rounded-2xl border p-6"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-2.5 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                    <MapPin className="h-5 w-5 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {dictionary.common.footer.contactUs}
                  </h3>
                  <p className="text-muted-foreground text-sm">{siteConfig.address}</p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="border-border bg-card rounded-2xl border p-6"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-2.5 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                    <Mail className="h-5 w-5 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="text-foreground mb-1 font-semibold">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted-foreground text-sm transition-colors hover:text-[var(--color-primary-500)]"
                  >
                    {siteConfig.email}
                  </a>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="border-border bg-card rounded-2xl border p-6"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-2.5 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                    <Phone className="h-5 w-5 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="text-foreground mb-1 font-semibold">Phone</h3>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="text-muted-foreground text-sm transition-colors hover:text-[var(--color-primary-500)]"
                    dir="ltr"
                  >
                    {siteConfig.phone}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
