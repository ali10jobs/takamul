'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Menu, Mail } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useAppDispatch } from '@/store/hooks';
import { toggleMobileMenu } from '@/store/slices/uiSlice';
import { Container } from '@/components/ui/Container';
import { Navbar } from './Navbar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
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
        className="fixed inset-s-4 inset-e-4 top-4 z-30"
        initial={false}
        animate={{ y: direction === 'down' && !isAtTop ? -120 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container className="flex h-14 items-center justify-between lg:h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="p-2">
            <Image src="/images/takamul.png" alt="Takamul Logo" width={40} height={40} />
          </Link>

          {/* Desktop nav */}
          <Navbar dictionary={dictionary.nav} />

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 rounded-2xl px-2 py-1.5 lg:flex">
            <ThemeToggle />
            <LanguageSwitcher dictionary={dictionary.language} />
            <Link
              href={`/${locale}/contact`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-xl backdrop-blur-lg transition-all hover:bg-white/20"
              aria-label={dictionary.cta.contactUs}
            >
              <Mail className="h-4 w-4 text-gray-400" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="text-foreground rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-2xl transition-all hover:bg-white/20 lg:hidden dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
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
