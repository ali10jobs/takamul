'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { mainNav } from '@/data/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeMobileMenu } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import type { Dictionary } from '@/types/dictionary';

interface MobileMenuProps {
  dictionary: Dictionary['common'];
}

export function MobileMenu({ dictionary }: MobileMenuProps) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.mobileMenuOpen);

  // Close on route change
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => dispatch(closeMobileMenu())}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="bg-background fixed inset-y-0 end-0 z-50 flex w-72 flex-col shadow-2xl lg:hidden"
          >
            {/* Close button */}
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => dispatch(closeMobileMenu())}
                className="text-foreground hover:bg-muted rounded-lg p-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1 px-4" aria-label="Mobile navigation">
              {mainNav.map((item, i) => {
                const href = `/${locale}${item.href === '/' ? '' : item.href}`;
                const isActive =
                  item.href === '/'
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(`/${locale}${item.href}`);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-300)]'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      {dictionary.nav[item.id as keyof typeof dictionary.nav]}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Theme + Language at bottom */}
            <div className="border-border flex items-center justify-between border-t p-4">
              <LanguageSwitcher
                dictionary={dictionary.language}
                className="flex-1 justify-center"
              />
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
