import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface FinalCtaSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  const { finalCta } = homepageData;
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    analytics.formSubmit('newsletter_cta', { email });
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const handleBookingClick = (type: ServiceType, location: string) => {
    analytics.ctaClick(
      type === 'venue' ? finalCta.ctaVenue : finalCta.ctaWedding,
      location,
      type
    );
    analytics.bookingModalOpen(type, location);
    onOpenBooking(type);
  };

  return (
    <section className="w-full bg-[#133c40] text-heritage-sand border-t px-5 border-heritage-gold/25 relative overflow-hidden">
      {/* Subtle luxury background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left Side: Editorial Serif Headline & Subtext */}
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-heritage-gold uppercase tracking-luxury">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Rajasthan Heritage Wedding Planning</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight">
              Plan your wedding like royalty.
            </h2>
            <p className="text-xs sm:text-sm text-heritage-sand/80 font-sans font-light">
              Curated palace scouting, line-item budget models, and authentic hospitality across Jaipur, Udaipur & Jodhpur.
            </p>
          </div>

          {/* Right Side: Loverly-Style Pill Newsletter & Direct Action */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">

            {/* Newsletter Pill Signup */}
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-heritage-gold font-semibold">
                Join our private insider list:
              </span>

              {isSubscribed ? (
                <div className="flex items-center gap-2 bg-heritage-sand text-heritage-emerald px-5 py-3 rounded-full text-xs font-medium shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Welcome! We've sent our Jaipur guide to your inbox.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="w-full sm:w-[340px] md:w-[380px] relative flex items-center"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-heritage-sand text-heritage-charcoal placeholder-heritage-charcoal/50 text-xs sm:text-sm pl-5 pr-14 py-3.5 rounded-full border border-heritage-gold/40 focus:outline-none focus:ring-2 focus:ring-heritage-gold transition-all shadow-md"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1.5 w-9 h-9 rounded-full bg-heritage-emerald hover:bg-heritage-emerald-deep text-heritage-sand flex items-center justify-center transition-all hover:scale-105 shadow-sm group"
                  >
                    <ArrowRight className="w-4 h-4 text-heritage-gold group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            {/* Quick Booking Button */}
            <div className="w-full sm:w-auto pt-2 sm:pt-5">
              <button
                type="button"
                onClick={() => handleBookingClick('venue', 'cta_banner_pill')}
                className="w-full sm:w-auto bg-heritage-gold hover:bg-white text-heritage-charcoal px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Book 1-on-1 Advisory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
