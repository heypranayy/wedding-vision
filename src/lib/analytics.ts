/**
 * Typed, consent-aware analytics utility for Weddings Vision
 * Implements GA4 event taxonomy and Microsoft Clarity tag dispatching
 * as specified in /cro/strategy.md
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams?: Record<string, any>) => void;
    clarity?: (command: string, key: string, value: string) => void;
  }
}

export type CtaLocation = 
  | 'hero_primary'
  | 'hero_secondary'
  | 'two_paths_panel_venue'
  | 'two_paths_panel_wedding'
  | 'how_it_works_step1'
  | 'services_editorial_cta'
  | 'venue_card'
  | 'real_wedding_card'
  | 'faq_whatsapp'
  | 'final_cta_venue'
  | 'final_cta_wedding'
  | 'final_cta_whatsapp'
  | 'header_desktop'
  | 'header_mobile'
  | 'sticky_mobile_bar'
  | 'exit_modal'
  | string;

export interface ConsentSettings {
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_STORAGE_KEY = 'wv_user_consent';

export const getConsent = (): ConsentSettings => {
  if (typeof window === 'undefined') return { analytics: true, marketing: true };
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  // Default to granted under opt-out model
  return { analytics: true, marketing: true };
};

export const setConsent = (settings: ConsentSettings) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(settings));
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: settings.analytics ? 'granted' : 'denied',
        ad_storage: settings.marketing ? 'granted' : 'denied',
      });
    }
  } catch {
    // ignore
  }
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  const consent = getConsent();
  if (!consent.analytics) {
    return;
  }

  const payload = {
    ...params,
    timestamp: new Date().toISOString(),
    viewport_width: typeof window !== 'undefined' ? window.innerWidth : 0,
  };

  // Dispatch to Google Analytics 4 if present
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  } else {
    // Safe Development Debug Log
    console.debug(`[Analytics: ${eventName}]`, payload);
  }

  // Set Clarity custom tags if present
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    if (params.service_type) {
      window.clarity('set', 'service_type', String(params.service_type));
    }
    if (params.step_number) {
      window.clarity('set', 'booking_step', `step_${params.step_number}`);
    }
  }
};

export const analytics = {
  ctaClick: (ctaName: string, ctaLocation: CtaLocation, serviceType?: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      cta_location: ctaLocation,
      service_type: serviceType || 'general',
    });
  },

  pathSelected: (pathName: 'no_venue' | 'venue_booked' | 'browsing') => {
    trackEvent('path_selected', {
      path_name: pathName,
    });
  },

  bookingModalOpen: (initialService: string, sourceCta: string) => {
    trackEvent('booking_modal_open', {
      initial_service: initialService,
      source_cta: sourceCta,
    });
  },

  leadCaptured: (lead: Record<string, any>) => {
    trackEvent('lead_captured', {
      lead_id: lead.id,
      service_type: lead.serviceType,
      phone_digits: lead.phone ? lead.phone.length : 0,
      source_cta: lead.sourceCta,
    });
  },

  formStep: (stepNumber: number, serviceType: string, extraData?: Record<string, any>) => {
    trackEvent(`form_step_${stepNumber}`, {
      step_number: stepNumber,
      service_type: serviceType,
      ...extraData,
    });
  },

  slotSelected: (date: string, timeSlot: string, serviceType: string) => {
    trackEvent('slot_selected', {
      slot_date: date,
      slot_time: timeSlot,
      service_type: serviceType,
    });
  },

  checkoutStarted: (serviceType: string, amountInr: number) => {
    trackEvent('checkout_started', {
      service_type: serviceType,
      amount_inr: amountInr,
      currency: 'INR',
    });
  },

  paymentSuccess: (orderId: string, paymentId: string, serviceType: string, amountInr: number) => {
    trackEvent('payment_success', {
      order_id: orderId,
      payment_id: paymentId,
      service_type: serviceType,
      amount_inr: amountInr,
      currency: 'INR',
    });
  },

  paymentFailed: (orderId: string, errorCode: string, serviceType: string) => {
    trackEvent('payment_failed', {
      order_id: orderId,
      error_code: errorCode,
      service_type: serviceType,
    });
  },

  whatsappClick: (triggerLocation: string, prefilledIntent?: string) => {
    trackEvent('whatsapp_click', {
      trigger_location: triggerLocation,
      prefilled_intent: prefilledIntent || 'general',
    });
  },

  callClick: (triggerLocation: string) => {
    trackEvent('call_click', {
      trigger_location: triggerLocation,
    });
  },

  faqToggle: (question: string, isOpen: boolean) => {
    trackEvent('faq_toggle', {
      faq_question: question,
      open_state: isOpen ? 'opened' : 'closed',
    });
  },
};
