import uiReducer, {
  setTheme,
  toggleMobileMenu,
  closeMobileMenu,
  setCookieConsent,
} from '@/store/slices/uiSlice';

const initialState = {
  theme: 'system' as const,
  mobileMenuOpen: false,
  cookieConsent: null as boolean | null,
};

describe('uiSlice', () => {
  it('returns initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('theme', () => {
    it('sets theme to dark', () => {
      const state = uiReducer(initialState, setTheme('dark'));
      expect(state.theme).toBe('dark');
    });

    it('sets theme to light', () => {
      const state = uiReducer(initialState, setTheme('light'));
      expect(state.theme).toBe('light');
    });

    it('sets theme to system', () => {
      const state = uiReducer({ ...initialState, theme: 'dark' }, setTheme('system'));
      expect(state.theme).toBe('system');
    });
  });

  describe('mobileMenu', () => {
    it('toggles mobile menu open', () => {
      const state = uiReducer(initialState, toggleMobileMenu());
      expect(state.mobileMenuOpen).toBe(true);
    });

    it('toggles mobile menu closed', () => {
      const state = uiReducer({ ...initialState, mobileMenuOpen: true }, toggleMobileMenu());
      expect(state.mobileMenuOpen).toBe(false);
    });

    it('closes mobile menu', () => {
      const state = uiReducer({ ...initialState, mobileMenuOpen: true }, closeMobileMenu());
      expect(state.mobileMenuOpen).toBe(false);
    });
  });

  describe('cookieConsent', () => {
    it('sets consent to true', () => {
      const state = uiReducer(initialState, setCookieConsent(true));
      expect(state.cookieConsent).toBe(true);
    });

    it('sets consent to false', () => {
      const state = uiReducer(initialState, setCookieConsent(false));
      expect(state.cookieConsent).toBe(false);
    });
  });
});
