'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  nextStep,
  prevStep,
  updateField,
  setErrors,
  clearErrors,
  setSubmitting,
  setSuccess,
  resetForm,
} from '@/store/slices/contactFormSlice';
import { stepSchemas, contactFormSchema } from '@/lib/validations/contact';
import { Button } from '@/components/ui/Button';
import { FormField, Input, Textarea, Select } from './FormField';
import { FormSuccess } from './FormSuccess';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import type { Dictionary } from '@/types/dictionary';

interface ContactFormProps {
  dictionary: Dictionary['contact']['form'];
  services: Array<{ id: string; title: string }>;
}

const budgetRanges = [
  { value: 'under-25k', label: '< $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: 'over-250k', label: '$250,000+' },
];

export function ContactForm({ dictionary, services }: ContactFormProps) {
  const dispatch = useAppDispatch();
  const { currentStep, formData, errors, isSubmitting, isSuccess } = useAppSelector(
    (s) => s.contactForm
  );

  const validateCurrentStep = useCallback(() => {
    const schema = stepSchemas[currentStep - 1];
    if (!schema) return true;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        // Map Zod error codes to dictionary keys
        fieldErrors[field] =
          dictionary.errors[issue.message as keyof typeof dictionary.errors] || issue.message;
      }
      dispatch(setErrors(fieldErrors));
      return false;
    }
    dispatch(clearErrors());
    return true;
  }, [currentStep, formData, dispatch, dictionary]);

  const handleNext = () => {
    if (validateCurrentStep()) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(clearErrors());
    dispatch(prevStep());
  };

  const handleSubmit = async () => {
    // Validate full form
    const result = contactFormSchema.safeParse({ ...formData, _honey: '' });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] =
          dictionary.errors[issue.message as keyof typeof dictionary.errors] || issue.message;
      }
      dispatch(setErrors(fieldErrors));
      return;
    }

    dispatch(setSubmitting(true));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');

      dispatch(setSuccess(true));
    } catch {
      dispatch(setErrors({ message: 'Failed to send message. Please try again.' }));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateField({ field: field as keyof typeof formData, value }));
  };

  if (isSuccess) {
    return (
      <div>
        <FormSuccess title={dictionary.success.title} message={dictionary.success.message} />
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => dispatch(resetForm())}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step === currentStep
                  ? 'bg-[var(--color-primary-400)] text-white shadow-[var(--color-primary-500)]/30 shadow-md dark:bg-[var(--color-primary-700)]'
                  : step < currentStep
                    ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-600)] dark:bg-[var(--color-primary-900)] dark:text-[var(--color-primary-300)]'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`h-0.5 w-8 rounded-full transition-colors ${
                  step < currentStep ? 'bg-[var(--color-primary-400)]' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step title */}
      <h3 className="text-foreground mb-6 text-center text-lg font-semibold">
        {currentStep === 1
          ? dictionary.step1Title
          : currentStep === 2
            ? dictionary.step2Title
            : dictionary.step3Title}
      </h3>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {currentStep === 1 && (
            <div className="space-y-4">
              <FormField label={dictionary.name} error={errors.name}>
                <Input
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder={dictionary.namePlaceholder}
                  hasError={!!errors.name}
                />
              </FormField>
              <FormField label={dictionary.email} error={errors.email}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder={dictionary.emailPlaceholder}
                  hasError={!!errors.email}
                />
              </FormField>
              <FormField label={dictionary.company}>
                <Input
                  value={formData.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  placeholder={dictionary.companyPlaceholder}
                />
              </FormField>
              <FormField label={dictionary.phone}>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder={dictionary.phonePlaceholder}
                  dir="ltr"
                />
              </FormField>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <FormField label={dictionary.service}>
                <Select
                  value={formData.service}
                  onChange={(e) => handleFieldChange('service', e.target.value)}
                >
                  <option value="">{dictionary.servicePlaceholder}</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label={dictionary.budget}>
                <Select
                  value={formData.budget}
                  onChange={(e) => handleFieldChange('budget', e.target.value)}
                >
                  <option value="">{dictionary.budgetPlaceholder}</option>
                  {budgetRanges.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <FormField label={dictionary.message} error={errors.message}>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder={dictionary.messagePlaceholder}
                  hasError={!!errors.message}
                  rows={5}
                />
              </FormField>

              {/* Review summary */}
              <div className="border-border bg-muted/50 rounded-xl border p-4">
                <p className="text-foreground mb-3 text-sm font-medium">{dictionary.review}</p>
                <dl className="space-y-2 text-sm">
                  {formData.name && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{dictionary.name}</dt>
                      <dd className="text-foreground font-medium">{formData.name}</dd>
                    </div>
                  )}
                  {formData.email && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{dictionary.email}</dt>
                      <dd className="text-foreground font-medium">{formData.email}</dd>
                    </div>
                  )}
                  {formData.company && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{dictionary.company}</dt>
                      <dd className="text-foreground font-medium">{formData.company}</dd>
                    </div>
                  )}
                  {formData.service && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{dictionary.service}</dt>
                      <dd className="text-foreground font-medium">
                        {services.find((s) => s.id === formData.service)?.title ?? formData.service}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Honeypot — hidden from real users */}
              <div className="absolute -start-[9999px] opacity-0" aria-hidden="true">
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        {currentStep > 1 ? (
          <Button variant="ghost" onClick={handlePrev} className="gap-1">
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {dictionary.step1Title === dictionary.step1Title && 'Back'}
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-1 rounded-full bg-[var(--color-primary-400)] px-4 py-2 text-white dark:bg-[var(--color-primary-700)]"
          >
            Next
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            loading={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary-400)] px-4 py-2 text-white dark:bg-[var(--color-primary-700)]"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? dictionary.sending : dictionary.submit}
          </button>
        )}
      </div>
    </div>
  );
}
