import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Download,
  CalendarPlus,
  Lock,
  Sparkles,
} from 'lucide-react';
import { bookingData, navigationData } from '../content';
import type { ServiceType, BookingPrefill, Lead } from '../types';
import { analytics } from '../lib/analytics';

// Zod Schema for Booking Flow Validation
const bookingSchema = z.object({
  serviceType: z.enum(['venue', 'wedding']),
  selectedDate: z.string().min(1, 'Please select a consultation date'),
  selectedTimeSlot: z.string().min(1, 'Please select a time slot'),
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit phone number')
    .refine((val) => val.replace(/\D/g, '').length >= 10, 'Phone must have at least 10 digits'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  weddingSeason: z.string(),
  guestCountBracket: z.string(),
  preferredRegion: z.string(),
  budgetBracket: z.string(),
  venueBookedStatus: z.string(),
  specificNotes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  prefill?: BookingPrefill;
}

// Generate the next 14 calendar dates
const getUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    });
  }
  return dates;
};

const STORAGE_SESSION_KEY = 'wv_booking_session_draft';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'venue',
  prefill,
}) => {
  const { header, step1, step2, step3, step4, step5 } = bookingData;
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const upcomingDates = React.useMemo(() => getUpcomingDates(), []);

  // React Hook Form initialization with Zod resolver
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: initialService,
      selectedDate: upcomingDates[1]?.iso || '',
      selectedTimeSlot: step1.timeSlots[1].label,
      fullName: '',
      phone: '',
      email: '',
      weddingSeason: step3.chips.season.options[0],
      guestCountBracket: step3.chips.guests.options[1],
      preferredRegion: step3.chips.region.options[0],
      budgetBracket: step3.chips.budget.options[1],
      venueBookedStatus: step3.chips.venueStatus.options[0],
      specificNotes: '',
    },
  });

  const formValues = watch();
  const selectedService = formValues.serviceType;
  const currentPackage = step1.packages[selectedService];

  // GST Calculation Breakdown
  const totalPrice = currentPackage.priceINR;
  const basePrice = Math.round((totalPrice / 1.18) * 100) / 100;
  const gstAmount = Math.round((totalPrice - basePrice) * 100) / 100;

  // Restore saved draft on mount or prefill
  useEffect(() => {
    if (isOpen) {
      try {
        const savedDraft = sessionStorage.getItem(STORAGE_SESSION_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          Object.keys(parsed).forEach((k) => {
            setValue(k as any, parsed[k]);
          });
        }
      } catch {
        // ignore
      }

      if (prefill) {
        if (prefill.serviceType) setValue('serviceType', prefill.serviceType);
        if (prefill.city) setValue('preferredRegion', prefill.city);
        if (prefill.guestCount) setValue('guestCountBracket', `${prefill.guestCount} Guests`);
        if (prefill.budgetBracket) setValue('budgetBracket', prefill.budgetBracket);
        if (prefill.venueName) setValue('specificNotes', `Interested in ${prefill.venueName}`);
      } else if (initialService) {
        setValue('serviceType', initialService);
      }
      setStep(1);
      setIsProcessing(false);
    }
  }, [isOpen, initialService, prefill, setValue]);

  // Autosave to sessionStorage on change
  useEffect(() => {
    if (isOpen) {
      try {
        sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(formValues));
      } catch {
        // ignore
      }
    }
  }, [formValues, isOpen]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Immediate Lead Autosave on Step 2
  const commitLeadAutosave = () => {
    const cleanPhone = formValues.phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
      const lead: Lead = {
        id: `lead_${Date.now()}`,
        fullName: formValues.fullName || 'Visitor',
        phone: cleanPhone,
        email: formValues.email,
        serviceType: selectedService,
        selectedDate: formValues.selectedDate,
        selectedTimeSlot: formValues.selectedTimeSlot,
        sourceCta: 'step_flow_step2_autosave',
        status: 'lead_captured',
        createdAt: new Date().toISOString(),
        lastActiveStep: 2,
      };

      try {
        const stored = JSON.parse(localStorage.getItem('wv_leads') || '[]');
        stored.push(lead);
        localStorage.setItem('wv_leads', JSON.stringify(stored));
      } catch {
        // ignore
      }

      analytics.leadCaptured(lead);
    }
  };

  const handleStep2Next = () => {
    const cleanPhone = formValues.phone.replace(/\D/g, '');
    if (!formValues.fullName.trim() || cleanPhone.length < 10) {
      // Trigger validation display
      handleSubmit(() => {})();
      return;
    }

    commitLeadAutosave();
    analytics.formStep(2, selectedService, { client_name: formValues.fullName });
    setStep(3);
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    const mockRef = `WV-${Date.now().toString().slice(-6)}`;
    setBookingRef(mockRef);
    analytics.checkoutStarted(selectedService, totalPrice);

    if (typeof window !== 'undefined' && window.Razorpay) {
      try {
        const options = {
          key: 'rzp_test_placeholder_key',
          amount: totalPrice * 100, // paise
          currency: 'INR',
          name: navigationData.brand.name,
          description: `${currentPackage.title} (${formValues.selectedTimeSlot})`,
          image: navigationData.brand.logoDark,
          handler: function (response: { razorpay_payment_id: string }) {
            analytics.paymentSuccess(mockRef, response.razorpay_payment_id, selectedService, totalPrice);
            sessionStorage.removeItem(STORAGE_SESSION_KEY);
            setIsProcessing(false);
            setStep(5);
          },
          prefill: {
            name: formValues.fullName,
            email: formValues.email || navigationData.contact.email,
            contact: formValues.phone,
          },
          notes: {
            serviceType: selectedService,
            bookingRef: mockRef,
            date: formValues.selectedDate,
            slot: formValues.selectedTimeSlot,
            region: formValues.preferredRegion,
          },
          theme: {
            color: '#1a484c',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          analytics.paymentSuccess(mockRef, 'mock_pay_demo_success', selectedService, totalPrice);
          sessionStorage.removeItem(STORAGE_SESSION_KEY);
          setIsProcessing(false);
          setStep(5);
        });
        rzp.open();
      } catch {
        analytics.paymentSuccess(mockRef, 'mock_pay_demo_success', selectedService, totalPrice);
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
        setTimeout(() => {
          setIsProcessing(false);
          setStep(5);
        }, 1000);
      }
    } else {
      analytics.paymentSuccess(mockRef, 'mock_pay_demo_success', selectedService, totalPrice);
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(5);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-heritage-sand overflow-y-auto flex flex-col min-h-screen">
        {/* Full-Screen Step Flow Navigation Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-heritage-emerald/15 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {step > 1 && step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-heritage-emerald hover:text-heritage-emerald-deep font-semibold p-1 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                aria-label="Back to previous step"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{header.backLabel}</span>
              </button>
            ) : null}

            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-heritage-emerald">
                {header.brandName}
              </span>
              <span className="text-[10px] font-mono text-heritage-gold uppercase tracking-luxury hidden sm:inline">
                • {header.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-muted">
              {header.stepLabel} {step} of 5
            </span>
            <div className="w-20 sm:w-32 h-1.5 bg-heritage-sand-dark overflow-hidden rounded-full">
              <div
                className="h-full bg-heritage-emerald transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-heritage-charcoal hover:text-heritage-emerald ml-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
          {/* STEP 1: CHOOSE CONSULTATION TYPE + INLINE SLOT PICKER */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
                  {step1.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
                  {step1.heading}
                </h2>
                <p className="text-xs sm:text-sm text-heritage-muted">
                  {step1.description}
                </p>
              </div>

              {/* Consultation Type Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Venue Advisory */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setValue('serviceType', 'venue')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setValue('serviceType', 'venue');
                    }
                  }}
                  className={`cursor-pointer p-6 border transition-all relative focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                    selectedService === 'venue'
                      ? 'bg-white border-heritage-emerald shadow-lg ring-1 ring-heritage-emerald'
                      : 'bg-white/60 border-heritage-emerald/15 hover:border-heritage-emerald/40'
                  }`}
                >
                  {selectedService === 'venue' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-heritage-emerald" />
                    </div>
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block mb-1">
                    {step1.packages.venue.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-heritage-emerald">
                    {step1.packages.venue.title}
                  </h3>
                  <div className="text-2xl font-serif font-bold text-heritage-charcoal my-2">
                    {step1.packages.venue.priceFormatted}{' '}
                    <span className="text-xs font-mono font-normal text-heritage-muted">
                      {step1.packages.venue.gstNote}
                    </span>
                  </div>
                  <p className="text-xs text-heritage-muted leading-relaxed mb-4 font-light">
                    {step1.packages.venue.description}
                  </p>
                  <div className="text-[11px] font-mono text-emerald-800 flex items-center gap-1.5 font-medium border-t border-heritage-sand-dark pt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{step1.packages.venue.creditNote}</span>
                  </div>
                </div>

                {/* Option 2: Wedding Blueprint */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setValue('serviceType', 'wedding')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setValue('serviceType', 'wedding');
                    }
                  }}
                  className={`cursor-pointer p-6 border transition-all relative focus-visible:ring-2 focus-visible:ring-heritage-gold ${
                    selectedService === 'wedding'
                      ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald shadow-lg ring-1 ring-heritage-gold'
                      : 'bg-white/60 border-heritage-emerald/15 hover:border-heritage-emerald/40'
                  }`}
                >
                  {selectedService === 'wedding' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-heritage-gold" />
                    </div>
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block mb-1">
                    {step1.packages.wedding.tag}
                  </span>
                  <h3 className={`font-serif text-xl font-bold ${selectedService === 'wedding' ? 'text-heritage-sand' : 'text-heritage-emerald'}`}>
                    {step1.packages.wedding.title}
                  </h3>
                  <div className={`text-2xl font-serif font-bold my-2 ${selectedService === 'wedding' ? 'text-heritage-sand' : 'text-heritage-charcoal'}`}>
                    {step1.packages.wedding.priceFormatted}{' '}
                    <span className={`text-xs font-mono font-normal ${selectedService === 'wedding' ? 'text-heritage-sand/70' : 'text-heritage-muted'}`}>
                      {step1.packages.wedding.gstNote}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 font-light ${selectedService === 'wedding' ? 'text-heritage-sand/80' : 'text-heritage-muted'}`}>
                    {step1.packages.wedding.description}
                  </p>
                  <div className={`text-[11px] font-mono flex items-center gap-1.5 font-medium border-t pt-3 ${selectedService === 'wedding' ? 'border-heritage-sand/20 text-heritage-gold' : 'border-heritage-sand-dark text-emerald-800'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{step1.packages.wedding.creditNote}</span>
                  </div>
                </div>
              </div>

              {/* Inline Interactive Calendar & Slot Picker */}
              <div className="bg-white p-6 border border-heritage-emerald/15 shadow-sm space-y-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-charcoal font-semibold block mb-2">
                    {step1.datePickerLabel}
                  </span>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {upcomingDates.map((item) => (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setValue('selectedDate', item.iso)}
                        className={`shrink-0 w-16 sm:w-20 p-2 text-center border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.selectedDate === item.iso
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald shadow-md'
                            : 'bg-heritage-sand/60 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/40'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase block opacity-75">
                          {item.dayName}
                        </span>
                        <span className="font-serif text-lg font-bold block">
                          {item.dateNum}
                        </span>
                        <span className="text-[10px] font-mono uppercase block">
                          {item.monthName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-charcoal font-semibold block mb-2">
                    {step1.slotPickerLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {step1.timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setValue('selectedTimeSlot', slot.label)}
                        className={`p-3 text-left border flex items-center justify-between transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.selectedTimeSlot === slot.label
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-white text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${formValues.selectedTimeSlot === slot.label ? 'text-heritage-gold' : 'text-heritage-emerald'}`} />
                          <span className="text-xs font-mono">{slot.label}</span>
                        </div>
                        <span className={`text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider ${
                          formValues.selectedTimeSlot === slot.label
                            ? 'bg-heritage-emerald-deep text-heritage-sand'
                            : 'bg-heritage-sand-dark text-heritage-muted'
                        }`}>
                          {slot.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto bg-heritage-emerald text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-md flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{step1.buttonNext}</span>
                  <ArrowRight className="w-4 h-4 text-heritage-gold" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: NAME + PHONE ONLY (INSTANT DROP-OFF LEAD CAPTURE) */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 max-w-xl mx-auto w-full"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
                  {step2.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
                  {step2.heading}
                </h2>
                <p className="text-xs text-heritage-muted leading-relaxed font-light">
                  {step2.description}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-heritage-emerald/20 shadow-sm space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="flow-fullname" className="block text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold mb-1.5">
                    {step2.fields.nameLabel}
                  </label>
                  <input
                    id="flow-fullname"
                    type="text"
                    {...register('fullName')}
                    placeholder={step2.fields.namePlaceholder}
                    className="w-full px-4 py-3 text-sm bg-heritage-sand/40 border border-heritage-emerald/20 focus:border-heritage-emerald focus:bg-white focus:outline-none transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 font-mono mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label htmlFor="flow-phone" className="block text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold mb-1.5">
                    {step2.fields.phoneLabel}
                  </label>
                  <div className="flex border border-heritage-emerald/20 focus-within:border-heritage-emerald">
                    <span className="bg-heritage-sand-dark px-3.5 py-3 text-xs font-mono text-heritage-charcoal flex items-center border-r border-heritage-emerald/20 font-semibold">
                      +91
                    </span>
                    <input
                      id="flow-phone"
                      type="tel"
                      {...register('phone')}
                      onBlur={() => {
                        commitLeadAutosave();
                      }}
                      placeholder={step2.fields.phonePlaceholder}
                      className="w-full px-4 py-3 text-sm font-mono bg-heritage-sand/40 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.phone ? (
                    <p className="text-[11px] text-red-600 font-mono mt-1">{errors.phone.message}</p>
                  ) : (
                    <span className="text-[10px] font-mono text-heritage-muted block mt-1">
                      {step2.fields.phoneHint}
                    </span>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label htmlFor="flow-email" className="block text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold mb-1.5">
                    {step2.fields.emailLabel}{' '}
                    <span className="text-heritage-muted font-normal">{step2.fields.emailHint}</span>
                  </label>
                  <input
                    id="flow-email"
                    type="email"
                    {...register('email')}
                    placeholder={step2.fields.emailPlaceholder}
                    className="w-full px-4 py-3 text-sm bg-heritage-sand/40 border border-heritage-emerald/20 focus:border-heritage-emerald focus:bg-white focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-mono mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-heritage-sand-dark text-[10px] font-mono text-emerald-800">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{step2.trustBadge}</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-heritage-emerald hover:underline p-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  {step2.backLink}
                </button>

                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="bg-heritage-emerald text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{step2.buttonNext}</span>
                  <ArrowRight className="w-4 h-4 text-heritage-gold" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: EVENT PARAMETERS (TAP-FRIENDLY CHIPS) */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
                  {step3.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
                  {step3.heading}
                </h2>
                <p className="text-xs text-heritage-muted font-light">
                  {step3.description}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-heritage-emerald/20 shadow-sm space-y-6">
                {/* Season Chips */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block mb-2">
                    {step3.chips.season.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step3.chips.season.options.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setValue('weddingSeason', item)}
                        className={`px-3.5 py-2 text-xs border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.weddingSeason === item
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-heritage-sand/50 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Count Chips */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block mb-2">
                    {step3.chips.guests.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step3.chips.guests.options.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setValue('guestCountBracket', item)}
                        className={`px-3.5 py-2 text-xs border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.guestCountBracket === item
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-heritage-sand/50 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Chips */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block mb-2">
                    {step3.chips.region.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step3.chips.region.options.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setValue('preferredRegion', item)}
                        className={`px-3.5 py-2 text-xs border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.preferredRegion === item
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-heritage-sand/50 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Bracket Chips */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block mb-2">
                    {step3.chips.budget.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step3.chips.budget.options.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setValue('budgetBracket', item)}
                        className={`px-3.5 py-2 text-xs border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.budgetBracket === item
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-heritage-sand/50 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Venue Decided Status */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block mb-2">
                    {step3.chips.venueStatus.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step3.chips.venueStatus.options.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setValue('venueBookedStatus', item)}
                        className={`px-3.5 py-2 text-xs border transition-all focus-visible:ring-2 focus-visible:ring-heritage-emerald ${
                          formValues.venueBookedStatus === item
                            ? 'bg-heritage-emerald text-heritage-sand border-heritage-emerald font-semibold shadow-sm'
                            : 'bg-heritage-sand/50 text-heritage-charcoal border-heritage-emerald/15 hover:border-heritage-emerald/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-mono text-heritage-emerald hover:underline p-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  {step3.backLink}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-heritage-emerald text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{step3.buttonNext}</span>
                  <ArrowRight className="w-4 h-4 text-heritage-gold" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PRICE SUMMARY (INCL. GST LINE) + RAZORPAY WITH UPI FIRST */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 max-w-xl mx-auto w-full"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
                  {step4.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
                  {step4.heading}
                </h2>
                <p className="text-xs text-heritage-muted font-light">
                  {step4.description}
                </p>
              </div>

              <div className="bg-white border border-heritage-emerald/20 shadow-lg overflow-hidden">
                {/* Header Package Band */}
                <div className="bg-heritage-emerald text-heritage-sand p-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
                      {step4.packageConfirmedLabel}
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      {currentPackage.title}
                    </h3>
                    <span className="text-xs opacity-80 font-mono">
                      {formValues.selectedDate} • {formValues.selectedTimeSlot}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-serif font-bold text-heritage-sand">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Line Item Breakdown */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2.5 text-xs text-heritage-charcoal">
                    <div className="flex justify-between">
                      <span className="text-heritage-muted">{step4.labels.baseFee}</span>
                      <span className="font-mono">₹{basePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-heritage-muted">{step4.labels.gstLine}</span>
                      <span className="font-mono">₹{gstAmount.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-heritage-sand-dark pt-3 flex justify-between text-sm font-bold text-heritage-emerald">
                      <span>{step4.labels.totalPayable}</span>
                      <span className="font-serif text-xl">₹{totalPrice.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>

                  {/* 100% Credit Guarantee Box */}
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-semibold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>{step4.guarantee.title}</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed font-light">
                      {step4.guarantee.text}
                    </p>
                  </div>

                  {/* Payment Security Banner */}
                  <div className="pt-2 text-center space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-muted block">
                      {step4.paymentSecurity}
                    </span>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-heritage-charcoal">
                      {step4.paymentMethods.map((m) => (
                        <span key={m} className="px-2 py-1 bg-heritage-sand-dark border border-heritage-emerald/15">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleRazorpayPayment}
                    className="w-full bg-heritage-emerald text-heritage-sand py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-xl flex items-center justify-center gap-2 border border-heritage-emerald-deep mt-4 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                  >
                    {isProcessing ? (
                      <span>{step4.processingText}</span>
                    ) : (
                      <>
                        <span>
                          {step4.payButtonPrefix} ₹{totalPrice.toLocaleString('en-IN')} {step4.payButtonSuffix}
                        </span>
                        <ArrowRight className="w-4 h-4 text-heritage-gold" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-mono text-heritage-emerald hover:underline focus-visible:ring-2 focus-visible:ring-heritage-emerald p-1"
                >
                  {step4.backLink}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: CONFIRMATION WITH CALENDAR ADD, WHATSAPP & PREP CHECKLIST */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 max-w-xl mx-auto w-full text-center"
            >
              <div className="w-14 h-14 bg-emerald-100 text-heritage-emerald rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-heritage-emerald" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
                  {step5.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-heritage-emerald">
                  {step5.headingPrefix} {formValues.fullName}!
                </h2>
                <div className="inline-block bg-heritage-sand-dark border border-heritage-gold/50 px-3 py-1 font-mono text-xs font-bold text-heritage-charcoal">
                  {step5.refLabel} {bookingRef || `WV-${Date.now().toString().slice(-6)}`}
                </div>
                <p className="text-xs text-heritage-muted max-w-md mx-auto leading-relaxed">
                  {step5.scheduledText} <strong>{formValues.selectedDate}</strong> at{' '}
                  <strong>{formValues.selectedTimeSlot}</strong>.
                </p>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-white p-6 border border-heritage-emerald/20 text-left space-y-4 shadow-sm">
                <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-emerald font-bold block border-b pb-2">
                  {step5.nextSteps.title}
                </span>

                <div className="space-y-3 text-xs text-heritage-charcoal">
                  <div className="flex items-start gap-2.5">
                    <CalendarPlus className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                    <div>
                      <strong>{step5.nextSteps.items[0].title}</strong> {step5.nextSteps.items[0].text}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>{step5.nextSteps.items[1].title}</strong> {step5.nextSteps.items[1].text} (<strong>+91 {formValues.phone}</strong>).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                    <div>
                      <strong>{step5.nextSteps.items[2].title}</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-heritage-muted">
                        {step5.nextSteps.items[2].checklist?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Direct Calendar & WhatsApp Actions */}
                <div className="pt-3 border-t flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${navigationData.contact.phoneRaw.replace(/\D/g, '')}?text=Namaste%20Hemraj,%20I%20have%20confirmed%20my%20${selectedService}%20consultation%20(Ref:%20${bookingRef})%20for%20${formValues.selectedDate}%20at%20${encodeURIComponent(formValues.selectedTimeSlot)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border border-emerald-600/30 text-emerald-800 py-3 px-4 text-xs font-mono font-semibold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{step5.actions.whatsappButton}</span>
                  </a>

                  <a
                    href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Weddings%20Vision%20Consultation%20with%20Hemraj%0ADESCRIPTION:${currentPackage.title}%20Ref:%20${bookingRef}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download="weddings-vision-consultation.ics"
                    className="flex-1 bg-heritage-sand-dark border border-heritage-emerald/20 text-heritage-emerald py-3 px-4 text-xs font-mono font-semibold flex items-center justify-center gap-2 hover:bg-heritage-sand transition-colors focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                  >
                    <Download className="w-4 h-4 text-heritage-emerald" />
                    <span>{step5.actions.calendarButton}</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-heritage-emerald text-heritage-sand px-8 py-3 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  {step5.actions.doneButton}
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </AnimatePresence>
  );
};
