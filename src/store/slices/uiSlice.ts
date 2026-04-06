import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark' | 'system';

interface UiState {
  theme: Theme;
  mobileMenuOpen: boolean;
  cookieConsent: boolean | null;
}

const initialState: UiState = {
  theme: 'system',
  mobileMenuOpen: false,
  cookieConsent: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    setCookieConsent(state, action: PayloadAction<boolean>) {
      state.cookieConsent = action.payload;
    },
  },
});

export const { setTheme, toggleMobileMenu, closeMobileMenu, setCookieConsent } = uiSlice.actions;
export default uiSlice.reducer;
