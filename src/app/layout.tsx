import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Takamul Smart Technology',
  description:
    'Digital Transformation Agency — Delivering innovative solutions that drive business growth.',
};

/**
 * Root layout — minimal shell.
 * The actual <html lang dir> and fonts are set in [locale]/layout.tsx.
 * This exists because Next.js requires a root layout at src/app/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
