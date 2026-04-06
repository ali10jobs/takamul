import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
        doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 mt-8 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
