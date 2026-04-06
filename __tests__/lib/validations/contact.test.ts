import {
  contactStep1Schema,
  contactStep2Schema,
  contactStep3Schema,
  contactFormSchema,
} from '@/lib/validations/contact';

describe('Contact form validation schemas', () => {
  describe('Step 1 — Personal info', () => {
    it('passes with valid data', () => {
      const result = contactStep1Schema.safeParse({
        name: 'Ali',
        email: 'ali@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('fails with missing name', () => {
      const result = contactStep1Schema.safeParse({
        name: '',
        email: 'ali@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('fails with invalid email', () => {
      const result = contactStep1Schema.safeParse({
        name: 'Ali',
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });

    it('allows optional company and phone', () => {
      const result = contactStep1Schema.safeParse({
        name: 'Ali',
        email: 'ali@example.com',
        company: 'Takamul',
        phone: '+966501234567',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Step 2 — Project details', () => {
    it('passes with empty data (all optional)', () => {
      const result = contactStep2Schema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('passes with service and budget', () => {
      const result = contactStep2Schema.safeParse({
        service: 'web-development',
        budget: '50k-100k',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Step 3 — Message', () => {
    it('passes with a valid message', () => {
      const result = contactStep3Schema.safeParse({
        message: 'I need a website for my business.',
      });
      expect(result.success).toBe(true);
    });

    it('fails with a short message', () => {
      const result = contactStep3Schema.safeParse({
        message: 'Hi',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Full schema', () => {
    it('passes with all required fields', () => {
      const result = contactFormSchema.safeParse({
        name: 'Ali',
        email: 'ali@example.com',
        message: 'I need a website for my business.',
      });
      expect(result.success).toBe(true);
    });

    it('rejects non-empty honeypot field', () => {
      const result = contactFormSchema.safeParse({
        name: 'Bot',
        email: 'bot@spam.com',
        message: 'Buy our products now!',
        _honey: 'spam-content',
      });
      expect(result.success).toBe(false);
    });

    it('accepts empty honeypot field', () => {
      const result = contactFormSchema.safeParse({
        name: 'Ali',
        email: 'ali@example.com',
        message: 'I need a website for my business.',
        _honey: '',
      });
      expect(result.success).toBe(true);
    });
  });
});
