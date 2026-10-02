import React, { useRef } from 'react';
import { ArrowUpRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType, BookingPrefill, CaseStudy } from '../types';
import { analytics } from '../lib/analytics';

interface RealWeddingsSectionProps {
  onOpenBooking: (serviceType: ServiceType, prefill?: BookingPrefill) => void;
}

export const RealWeddingsSection: React.FC<RealWeddingsSectionProps> = ({ onOpenBooking }) => {
  const { realWeddings } = homepageData;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCaseStudyClick = (study: CaseStudy) => {
    analytics.ctaClick(`Plan Similar (${study.venueName})`, 'real_wedding_card', 'wedding');
    analytics.bookingModalOpen('wedding', `real_wedding_${study.id}`);
    onOpenBooking('wedding', {
      city: study.city,
      guestCount: String(study.guestCount),
      budgetBracket: study.budgetBracket,
    });
  };

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
            {realWeddings.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light mt-1">
            {realWeddings.heading}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm text-heritage-muted max-w-sm hidden md:block">
            {realWeddings.description}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollHorizontally('left')}
              className="p-2 border border-heritage-emerald/20 hover:border-heritage-emerald text-heritage-charcoal hover:text-heritage-emerald transition-colors"
              aria-label="Scroll left in case studies"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollHorizontally('right')}
              className="p-2 border border-heritage-emerald/20 hover:border-heritage-emerald text-heritage-charcoal hover:text-heritage-emerald transition-colors"
              aria-label="Scroll right in case studies"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroller Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {realWeddings.items.map((wedding, idx) => (
          <div
            key={wedding.id}
            className="w-[85vw] sm:w-[420px] shrink-0 snap-start bg-white border border-heritage-emerald/20 overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-heritage-sand-dark relative">
                <img
                  src={wedding.heroImage}
                  alt={wedding.venueName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-heritage-emerald text-heritage-sand px-2 py-1 text-[10px] font-mono uppercase tracking-wider">
                  {wedding.city}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono font-bold text-heritage-charcoal">
                  Chapter 0{idx + 1}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl font-bold text-heritage-charcoal">
                  {wedding.venueName}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-heritage-sand-dark/60 p-3 border border-heritage-emerald/10">
                  <div>
                    <span className="text-[9px] text-heritage-muted uppercase block">Guest Count</span>
                    <span className="font-semibold text-heritage-charcoal">{wedding.guestCountDisplay}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-heritage-muted uppercase block">Budget Bracket</span>
                    <span className="font-semibold text-heritage-emerald">{wedding.budgetBracket}</span>
                  </div>
                </div>

                <p className="text-xs text-heritage-muted leading-relaxed font-light">
                  {wedding.highlightScope}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleCaseStudyClick(wedding as CaseStudy)}
                className="w-full bg-heritage-emerald text-heritage-sand py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-heritage-emerald-deep transition-all flex items-center justify-center gap-1.5 shadow focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              >
                <span>{realWeddings.cardCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Element Near CTA */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-heritage-sand-dark px-4 py-2 border border-heritage-emerald/20 text-xs font-mono text-heritage-charcoal">
          <ShieldCheck className="w-3.5 h-3.5 text-heritage-emerald" />
          <span>{realWeddings.proof}</span>
        </div>
      </div>
    </section>
  );
};
