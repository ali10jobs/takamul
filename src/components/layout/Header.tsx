'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useAppDispatch } from '@/store/hooks';
import { toggleMobileMenu } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Navbar } from './Navbar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import type { Dictionary } from '@/types/dictionary';

interface HeaderProps {
  dictionary: Dictionary['common'];
}

export function Header({ dictionary }: HeaderProps) {
  const { locale } = useLocale();
  const { direction, isAtTop } = useScrollDirection();
  const dispatch = useAppDispatch();

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-30 transition-colors duration-300',
          !isAtTop && 'border-border bg-background/80 border-b backdrop-blur-xl'
        )}
        initial={{ y: 0 }}
        animate={{ y: direction === 'down' && !isAtTop ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-foreground text-xl font-bold tracking-tight">
            <span className="text-[var(--color-primary-500)]">Takamul</span>
            <span className="hidden sm:inline"> Smart Tech</span>
          </Link>

          {/* Desktop nav */}
          <Navbar dictionary={dictionary.nav} />

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher dictionary={dictionary.language} />
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="sm">
                {dictionary.cta.contactUs}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="text-foreground hover:bg-muted rounded-lg p-2 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </motion.header>

      <MobileMenu dictionary={dictionary} />
    </>
  );
}
