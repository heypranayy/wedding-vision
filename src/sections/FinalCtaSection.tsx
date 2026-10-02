import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface FinalCtaSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  const { finalCta } = homepageData;

  const handleBookingClick = (type: ServiceType, location: string) => {
    analytics.ctaClick(
      type === 'venue' ? finalCta.ctaVenue : finalCta.ctaWedding,
      location,
      type
    );
    analytics.bookingModalOpen(type, location);
    onOpenBooking(type);
  };

  const handleWhatsAppClick = () => {
    analytics.whatsappClick('final_cta_whatsapp', 'final_chat_inquiry');
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-heritage-emerald text-heritage-sand text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
          {finalCta.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
          {finalCta.heading}
        </h2>
        <p className="text-heritage-sand/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
          {finalCta.description}
        </p>

        {/* Repeat Both Paths & WhatsApp */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBookingClick('venue', 'final_cta_venue')}
            className="w-full sm:w-auto bg-heritage-sand text-heritage-emerald px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>{finalCta.ctaVenue}</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>

          <button
            type="button"
            onClick={() => handleBookingClick('wedding', 'final_cta_wedding')}
            className="w-full sm:w-auto bg-heritage-emerald-deep border border-heritage-gold/60 text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep/80 transition-all shadow-xl flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-heritage-gold"
          >
            <span>{finalCta.ctaWedding}</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>

          <a
            href={finalCta.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-heritage-sand border border-heritage-sand/30 px-6 py-4 text-xs uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
          >
            <MessageCircle className="w-4 h-4 text-heritage-gold" />
            <span>{finalCta.ctaWhatsApp}</span>
          </a>
        </div>

        {/* Proof Element Near CTA */}
        <div className="pt-4 text-xs font-mono text-heritage-sand/70 flex flex-wrap items-center justify-center gap-3">
          {finalCta.proof.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < finalCta.proof.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
