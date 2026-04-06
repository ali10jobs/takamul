'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCookieConsent } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/Button';

interface CookieConsentProps {
  dictionary: {
    message: string;
    accept: string;
    decline: string;
  };
}

const STORAGE_KEY = 'takamul-cookie-consent';

export function CookieConsent({ dictionary }: CookieConsentProps) {
  const dispatch = useAppDispatch();
  const consent = useAppSelector((s) => s.ui.cookieConsent);

  // Read stored preference on mount via dispatching to Redux
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      dispatch(setCookieConsent(stored === 'true'));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(accepted));
    dispatch(setCookieConsent(accepted));
  };

  // Hide if already decided
  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="border-border bg-card fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border p-4 shadow-xl sm:inset-x-auto sm:start-auto sm:end-6"
      >
        <p className="text-muted-foreground mb-4 text-sm">{dictionary.message}</p>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={() => handleConsent(true)}>
            {dictionary.accept}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleConsent(false)}>
            {dictionary.decline}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
