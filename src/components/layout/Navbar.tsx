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
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
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
            className={cn(
              'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary-500)]',
              isActive ? 'text-[var(--color-primary-500)]' : 'text-foreground'
            )}
          >
            {dictionary[item.id as keyof typeof dictionary]}
            {isActive && (
              <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[var(--color-primary-500)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
