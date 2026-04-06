import { z } from 'zod';

// Step 1: Personal info
export const contactStep1Schema = z.object({
  name: z.string().min(2, 'nameRequired'),
  email: z.string().email('emailInvalid'),
  company: z.string().optional(),
  phone: z.string().optional(),
});

// Step 2: Project details
export const contactStep2Schema = z.object({
  service: z.string().min(1, 'serviceRequired').optional(),
  budget: z.string().optional(),
});

// Step 3: Message
export const contactStep3Schema = z.object({
  message: z.string().min(10, 'messageRequired'),
});

// Full schema — used by API route for server-side validation
export const contactFormSchema = contactStep1Schema
  .merge(contactStep2Schema)
  .merge(contactStep3Schema)
  .extend({
    // Honeypot field — must be empty (bots fill it in)
    _honey: z.string().max(0).optional(),
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Per-step schemas for multi-step validation
export const stepSchemas = [contactStep1Schema, contactStep2Schema, contactStep3Schema] as const;
