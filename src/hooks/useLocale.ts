'use client';

import { useParams } from 'next/navigation';
import { localeMetadata, type Locale } from '@/i18n/config';

export function useLocale() {
  const params = useParams<{ locale: string }>();
  const locale = (params.locale ?? 'en') as Locale;
  const { dir, name, nativeName } = localeMetadata[locale] ?? localeMetadata.en;

  return { locale, dir, name, nativeName };
}
