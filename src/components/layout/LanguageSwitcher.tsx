'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  dictionary: {
    switchTo: string;
    current: string;
  };
}

export function LanguageSwitcher({ className, dictionary }: LanguageSwitcherProps) {
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
      className={cn(
        'text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        className
      )}
      aria-label={`Switch to ${dictionary.switchTo}`}
    >
      <Globe className="h-4 w-4" />
      <span>{dictionary.switchTo}</span>
    </button>
  );
}
