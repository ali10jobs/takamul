import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import contactFormReducer from './slices/contactFormSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contactForm: contactFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
