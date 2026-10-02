export type ServiceType = 'venue' | 'wedding';

// 1. Lead Model (Captured at Step 2 to guarantee drop-off recovery)
export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: ServiceType;
  selectedDate?: string;
  selectedTimeSlot?: string;
  sourceCta?: string;
  status: 'lead_captured' | 'booking_abandoned' | 'payment_completed' | 'whatsapp_contacted';
  createdAt: string;
  lastActiveStep: 1 | 2 | 3 | 4 | 5;
}

// 2. Consultation Package Model
export interface ConsultationPackage {
  id: ServiceType;
  title: string;
  subtitle: string;
  duration: string;
  durationMinutes: 60 | 90;
  priceINR: number;
  priceFormatted: string;
  badge?: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  guarantee: string;
  basePriceINR?: number;
  gstRate?: number;
}

// 3. Calendar Slot Model
export interface Slot {
  id: string;
  date: string; // YYYY-MM-DD
  timeWindow: string; // "11:00 AM - 12:00 PM IST"
  isAvailable: boolean;
  isNriFriendly: boolean;
}

// 4. Booking Model (Complete session record)
export interface Booking {
  bookingRef: string; // WV-XXXXXX
  leadId: string;
  consultationId: ServiceType;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  slotDate: string;
  slotTime: string;
  parameters: {
    weddingSeason?: string;
    guestCountBracket?: string;
    preferredRegion?: string;
    budgetBracket?: string;
    venueBookedStatus?: boolean;
    specificNotes?: string;
  };
  meetingUrl?: string;
  status: 'pending_payment' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

// 5. Payment Model (Razorpay Verification)
export interface Payment {
  id: string;
  bookingRef: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amountPaise: number;
  currency: 'INR';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  status: 'authorized' | 'captured' | 'failed';
  verifiedAt: string;
}

// 6. Venue Model (Mapped to /content/venues.json)
export interface Venue {
  id: string;
  name: string;
  city: string;
  region: string;
  archetype: string;
  description: string;
  capacityPax: number;
  capacityDisplay: string;
  startingFromPriceINR: number;
  startingFromDisplay: string;
  isPricePlaceholder: boolean;
  placeholderTag?: string;
  image: string;
  verifiedSource: string;
}

// 7. Case Study Model
export interface CaseStudy {
  id: string;
  city: string;
  venueName: string;
  guestCount: number;
  guestCountDisplay: string;
  budgetBracket: string;
  highlightScope: string;
  heroImage: string;
  isPlaceholderData: boolean;
  placeholderTag?: string;
}

export interface BookingPrefill {
  serviceType?: ServiceType;
  city?: string;
  guestCount?: string;
  venueName?: string;
  budgetBracket?: string;
}

export interface BookingFormData {
  serviceType: ServiceType;
  fullName: string;
  phone: string;
  email: string;
  selectedDate: string;
  selectedTimeSlot: string;
  weddingSeason: string;
  guestCountBracket: string;
  preferredRegion: string;
  budgetBracket: string;
  venueBookedStatus: string;
  specificNotes: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

