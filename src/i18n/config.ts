export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeMetadata: Record<
  Locale,
  { name: string; nativeName: string; dir: 'ltr' | 'rtl' }
> = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
