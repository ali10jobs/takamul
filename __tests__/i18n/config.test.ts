import { locales, defaultLocale, isValidLocale, localeMetadata } from '@/i18n/config';

describe('i18n config', () => {
  it('has en and ar locales', () => {
    expect(locales).toContain('en');
    expect(locales).toContain('ar');
  });

  it('defaults to en', () => {
    expect(defaultLocale).toBe('en');
  });

  it('validates known locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('ar')).toBe(true);
  });

  it('rejects unknown locales', () => {
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('')).toBe(false);
    expect(isValidLocale('english')).toBe(false);
  });

  it('has correct dir for each locale', () => {
    expect(localeMetadata.en.dir).toBe('ltr');
    expect(localeMetadata.ar.dir).toBe('rtl');
  });
});
