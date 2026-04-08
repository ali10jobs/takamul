'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { mainNav } from '@/data/navigation';
import { siteConfig } from '@/data/site-config';
import { Container } from '@/components/ui/Container';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/store/hooks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Dictionary } from '@/types/dictionary';

interface FooterProps {
  dictionary: Dictionary['common'];
}

export function Footer({ dictionary }: FooterProps) {
  const { locale } = useLocale();
  const year = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  return (
    <footer className="border-border bg-muted/40 border-t">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="text-foreground text-lg font-bold">
              {/* <span className="text-[var(--color-primary-500)]">Takamul</span> Smart Tech */}
              <Image
                src={theme === 'dark' ? '/images/takamul-dark.png' : '/images/takamul-light.png'}
                alt="Takamul Smart Tech"
                width={120}
                height={40}
              />
            </Link>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
              {dictionary.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${locale}${item.href === '/' ? '' : item.href}`}
                    className="text-muted-foreground text-sm transition-colors hover:text-[var(--color-primary-500)]"
                  >
                    {dictionary.nav[item.id as keyof typeof dictionary.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
              {dictionary.footer.contactUs}
            </h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.address}
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-primary-500)]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-primary-500)]"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Language */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
              {dictionary.footer.followUs}
            </h3>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted text-muted-foreground rounded-lg p-2 transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-500)]"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted text-muted-foreground rounded-lg p-2 transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-500)]"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted text-muted-foreground rounded-lg p-2 transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-500)]"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <LanguageSwitcher variant="footer" dictionary={dictionary.language} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-10 flex flex-col items-center gap-4 border-t pt-8 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {year} {siteConfig.name}. {dictionary.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {dictionary.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {dictionary.footer.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
