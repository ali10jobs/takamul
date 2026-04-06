'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">Something Went Wrong</h1>
      <p className="text-muted-foreground mt-4 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-primary hover:bg-primary/90 mt-8 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
