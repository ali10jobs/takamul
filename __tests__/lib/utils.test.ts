import { cn } from '@/lib/utils';

describe('cn (classname utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('deduplicates tailwind classes', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn('base', undefined, null)).toBe('base');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});
