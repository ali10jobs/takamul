import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

interface ContactFormState {
  currentStep: number;
  formData: ContactFormData;
  errors: Partial<Record<keyof ContactFormData, string>>;
  isSubmitting: boolean;
  isSuccess: boolean;
}

const initialState: ContactFormState = {
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

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      state.currentStep = Math.min(state.currentStep + 1, 3);
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    updateField(state, action: PayloadAction<{ field: keyof ContactFormData; value: string }>) {
      state.formData[action.payload.field] = action.payload.value;
    },
    setErrors(state, action: PayloadAction<Partial<Record<keyof ContactFormData, string>>>) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.errors = {};
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateField,
  setErrors,
  clearErrors,
  setSubmitting,
  setSuccess,
  resetForm,
} = contactFormSlice.actions;
export default contactFormSlice.reducer;
