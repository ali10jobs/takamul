import { services } from '@/data/services';
import en from '@/i18n/dictionaries/en.json';

describe('services data', () => {
  it('has 6 services', () => {
    expect(services).toHaveLength(6);
  });

  it('each service has required fields', () => {
    for (const service of services) {
      expect(service.id).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(service.iconName).toBeTruthy();
      expect(service.image).toBeTruthy();
      expect(service.tags.length).toBeGreaterThan(0);
    }
  });

  it('each service has a matching dictionary entry', () => {
    for (const service of services) {
      const dictEntry = en.services.items[service.id as keyof typeof en.services.items];
      expect(dictEntry).toBeDefined();
      expect(dictEntry.title).toBeTruthy();
      expect(dictEntry.excerpt).toBeTruthy();
      expect(dictEntry.description).toBeTruthy();
    }
  });

  it('all slugs are unique', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
