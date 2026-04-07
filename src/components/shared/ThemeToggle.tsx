'use client';

import { Sun, Moon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => dispatch(setTheme(isDark ? 'light' : 'dark'))}
      className={cn(
        'text-foreground/40 inset-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 shadow-sm backdrop-blur-[1px]',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
