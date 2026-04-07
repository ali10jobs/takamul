'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Dictionary } from '@/types/dictionary';

const fallback = {
  title: 'Page Not Found',
  message:
    "Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.",
  backHome: 'Back to Home',
};

export default function NotFound() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';
  const [dict, setDict] = useState<Dictionary['notFound']>(fallback);

  useEffect(() => {
    import(`@/i18n/dictionaries/${locale}.json`).then((mod) => {
      setDict(mod.default.notFound);
    });
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">{dict.title}</h2>
      <p className="text-muted-foreground mt-2 max-w-md">{dict.message}</p>
      <Link
        href={`/${locale}`}
        className="bg-primary hover:bg-primary/90 mt-8 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors"
      >
        {dict.backHome}
      </Link>
    </div>
  );
}
