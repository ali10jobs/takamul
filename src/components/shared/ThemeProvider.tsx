'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme } from '@/store/slices/uiSlice';

// useLayoutEffect runs synchronously before paint — eliminates FOUC without an inline script.
// Falls back to useEffect on server (where layout effects don't run).
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  // Sync localStorage → Redux before first paint (no flash)
  useIsomorphicLayoutEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      dispatch(setTheme(saved));
    }
  }, [dispatch]);

  // Apply class to <html> and persist whenever theme changes
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <>{children}</>;
}
