/**
 * Lightweight feature flag and A/B test backlog helper
 * Supports default values, URL query param overrides, and localStorage persistence.
 */

export interface FeatureFlags {
  enableExitIntent: boolean;
  enableNRIBadge: boolean;
  heroCtaVariant: 'book_consultation' | 'claim_slot';
  enableCurfewNoticeBadge: boolean;
}

export const DEFAULT_FLAGS: FeatureFlags = {
  enableExitIntent: true,
  enableNRIBadge: true,
  heroCtaVariant: 'book_consultation',
  enableCurfewNoticeBadge: true,
};

export const getFeatureFlag = <K extends keyof FeatureFlags>(flag: K): FeatureFlags[K] => {
  if (typeof window === 'undefined') return DEFAULT_FLAGS[flag];

  // 1. Check URL query params for testing (e.g. ?ff_enableExitIntent=false)
  const params = new URLSearchParams(window.location.search);
  const paramVal = params.get(`ff_${flag}`);
  if (paramVal !== null) {
    if (paramVal === 'true') return true as FeatureFlags[K];
    if (paramVal === 'false') return false as FeatureFlags[K];
    return paramVal as FeatureFlags[K];
  }

  // 2. Check localStorage for persistent A/B bucketing
  try {
    const stored = localStorage.getItem(`wv_ff_${flag}`);
    if (stored !== null) {
      if (stored === 'true') return true as FeatureFlags[K];
      if (stored === 'false') return false as FeatureFlags[K];
      return stored as FeatureFlags[K];
    }
  } catch {
    // ignore storage error
  }

  // 3. Fallback to default configuration
  return DEFAULT_FLAGS[flag];
};

export const setFeatureFlag = <K extends keyof FeatureFlags>(flag: K, value: FeatureFlags[K]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`wv_ff_${flag}`, String(value));
  } catch {
    // ignore storage error
  }
};
