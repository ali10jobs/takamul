'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import type { Dictionary } from '@/types/dictionary';

const fallback = {
  title: 'Something Went Wrong',
  message: 'An unexpected error occurred. Please try again.',
  retry: 'Try Again',
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';
  const [dict, setDict] = useState<Dictionary['error']>(fallback);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    import(`@/i18n/dictionaries/${locale}.json`).then((mod) => {
      setDict(mod.default.error);
    });
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">{dict.title}</h1>
      <p className="text-muted-foreground mt-4 max-w-md">{dict.message}</p>
      <button
        onClick={reset}
        className="bg-primary hover:bg-primary/90 mt-8 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors"
      >
        {dict.retry}
      </button>
    </div>
  );
}
