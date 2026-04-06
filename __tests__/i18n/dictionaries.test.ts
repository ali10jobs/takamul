import en from '@/i18n/dictionaries/en.json';
import ar from '@/i18n/dictionaries/ar.json';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys.push(...getKeys(val as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe('i18n dictionaries', () => {
  it('en.json and ar.json have matching keys', () => {
    const enKeys = getKeys(en as unknown as Record<string, unknown>);
    const arKeys = getKeys(ar as unknown as Record<string, unknown>);
    expect(enKeys).toEqual(arKeys);
  });

  it('no empty string values in en.json', () => {
    const enKeys = getKeys(en as unknown as Record<string, unknown>);
    for (const key of enKeys) {
      const value = key.split('.').reduce<unknown>((obj, k) => {
        if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k];
        return undefined;
      }, en);
      expect(value).not.toBe('');
    }
  });

  it('no empty string values in ar.json', () => {
    const arKeys = getKeys(ar as unknown as Record<string, unknown>);
    for (const key of arKeys) {
      const value = key.split('.').reduce<unknown>((obj, k) => {
        if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k];
        return undefined;
      }, ar);
      expect(value).not.toBe('');
    }
  });
});
