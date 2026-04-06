import contactFormReducer, {
  setStep,
  nextStep,
  prevStep,
  updateField,
  setErrors,
  clearErrors,
  setSubmitting,
  setSuccess,
  resetForm,
} from '@/store/slices/contactFormSlice';

const initialState = {
  currentStep: 1,
  formData: {
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  },
  errors: {},
  isSubmitting: false,
  isSuccess: false,
};

describe('contactFormSlice', () => {
  it('returns initial state', () => {
    expect(contactFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('step navigation', () => {
    it('sets step directly', () => {
      const state = contactFormReducer(initialState, setStep(3));
      expect(state.currentStep).toBe(3);
    });

    it('goes to next step', () => {
      const state = contactFormReducer(initialState, nextStep());
      expect(state.currentStep).toBe(2);
    });

    it('does not exceed step 3', () => {
      const state = contactFormReducer({ ...initialState, currentStep: 3 }, nextStep());
      expect(state.currentStep).toBe(3);
    });

    it('goes to previous step', () => {
      const state = contactFormReducer({ ...initialState, currentStep: 2 }, prevStep());
      expect(state.currentStep).toBe(1);
    });

    it('does not go below step 1', () => {
      const state = contactFormReducer(initialState, prevStep());
      expect(state.currentStep).toBe(1);
    });
  });

  describe('form data', () => {
    it('updates a field', () => {
      const state = contactFormReducer(initialState, updateField({ field: 'name', value: 'Ali' }));
      expect(state.formData.name).toBe('Ali');
    });

    it('updates email field', () => {
      const state = contactFormReducer(
        initialState,
        updateField({ field: 'email', value: 'ali@test.com' })
      );
      expect(state.formData.email).toBe('ali@test.com');
    });
  });

  describe('errors', () => {
    it('sets errors', () => {
      const errors = { name: 'Required', email: 'Invalid' };
      const state = contactFormReducer(initialState, setErrors(errors));
      expect(state.errors).toEqual(errors);
    });

    it('clears errors', () => {
      const stateWithErrors = {
        ...initialState,
        errors: { name: 'Required' },
      };
      const state = contactFormReducer(stateWithErrors, clearErrors());
      expect(state.errors).toEqual({});
    });
  });

  describe('submission', () => {
    it('sets submitting state', () => {
      const state = contactFormReducer(initialState, setSubmitting(true));
      expect(state.isSubmitting).toBe(true);
    });

    it('sets success state', () => {
      const state = contactFormReducer(initialState, setSuccess(true));
      expect(state.isSuccess).toBe(true);
    });

    it('resets form to initial state', () => {
      const modifiedState = {
        ...initialState,
        currentStep: 3,
        formData: { ...initialState.formData, name: 'Ali' },
        isSuccess: true,
      };
      const state = contactFormReducer(modifiedState, resetForm());
      expect(state).toEqual(initialState);
    });
  });
});
