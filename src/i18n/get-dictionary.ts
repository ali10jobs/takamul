import type { Locale } from './config';
import type { Dictionary } from '@/types/dictionary';

// Dynamic imports for code splitting — only the requested locale is loaded
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default as Dictionary),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
