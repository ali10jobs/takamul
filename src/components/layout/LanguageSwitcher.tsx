'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { spanToBaggageHeader } from '@sentry/nextjs';

interface LanguageSwitcherProps {
  className?: string;
  dictionary: {
    switchTo: string;
    current: string;
  };
  variant?: 'default' | 'footer';
}

export function LanguageSwitcher({ className, dictionary, variant }: LanguageSwitcherProps) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const targetLocale = locale === 'en' ? 'ar' : 'en';

  const handleSwitch = () => {
    // Replace the locale segment in the current path
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    router.push(segments.join('/'));
  };

  return (
    <button
      onClick={handleSwitch}
      className={
        variant === 'footer'
          ? cn(
              'text-foreground/40 inset-10 rounded-full border-2 border-white/20 bg-white/10 shadow-sm backdrop-blur-[1px]',
              className
            )
          : cn(
              'text-foreground/40 inset-10 h-10 w-10 rounded-full border-2 border-white/20 bg-white/10 shadow-sm backdrop-blur-[1px]',
              className
            )
      }
      aria-label={`Switch to ${dictionary.switchTo}`}
    >
      {/* <Globe className="h-4 w-4" /> */}
      {variant === 'footer' ? (
        <div className="flex items-center justify-center gap-2 px-4 py-2">
          <Globe className="h-4 w-4" />
          <span className="text-gray-400">
            {dictionary.switchTo === 'English' ? 'العربية' : 'English'}
          </span>
        </div>
      ) : (
        <span className="text-gray-400">{dictionary.switchTo === 'English' ? 'ع' : 'En'}</span>
      )}
    </button>
  );
}
