'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { mainNav } from '@/data/navigation';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/types/dictionary';

interface NavbarProps {
  dictionary: Dictionary['common']['nav'];
}

export function Navbar({ dictionary }: NavbarProps) {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (
    <nav className="hidden items-center lg:flex" aria-label="Main navigation">
      {/* Liquid glass pill wrapping all links */}
      <div className="relative flex items-center gap-0.5 rounded-full border-2 border-white/20 bg-white/10 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-[3px] dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_24px_rgba(0,0,0,0.3)]">
        {/* Gloss sheen overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/20 to-transparent dark:from-white/8" />

        {mainNav.map((item) => {
          const href = `/${locale}${item.href === '/' ? '' : item.href}`;
          const isActive =
            item.href === '/'
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(`/${locale}${item.href}`);

          return (
            <Link
              key={item.id}
              href={href}
              suppressHydrationWarning
              className={cn(
                'relative mx-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-foreground dark:text-white] bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_4px_rgba(0,0,0,0.1)] dark:bg-white/15'
                  : 'text-foreground/40 hover:text-foreground dark:text-foreground/70 dark:hover:text-foreground hover:bg-white/15 dark:hover:bg-white/10'
              )}
            >
              {dictionary[item.id as keyof typeof dictionary]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
