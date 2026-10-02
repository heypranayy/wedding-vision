import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { homepageData, venuesData } from '../content';
import type { ServiceType, BookingPrefill, Venue } from '../types';
import { analytics } from '../lib/analytics';

interface VenueShowcaseSectionProps {
  onOpenBooking: (serviceType: ServiceType, prefill?: BookingPrefill) => void;
}

export const VenueShowcaseSection: React.FC<VenueShowcaseSectionProps> = ({ onOpenBooking }) => {
  const { venueShowcase } = homepageData;
  const venues: Venue[] = venuesData as Venue[];

  const handleVenueClick = (venue: Venue) => {
    analytics.ctaClick(`Get Venue Options (${venue.name})`, 'venue_card', 'venue');
    analytics.bookingModalOpen('venue', `venue_card_${venue.id}`);
    onOpenBooking('venue', {
      city: venue.city,
      venueName: venue.name,
    });
  };

  return (
    <section
      id="venue-showcase"
      className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-heritage-sand-dark/70 border-y border-heritage-emerald/15 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
              {venueShowcase.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light mt-1">
              {venueShowcase.heading}
            </h2>
          </div>
          <p className="text-xs text-heritage-muted max-w-sm">
            {venueShowcase.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white border border-heritage-emerald/20 overflow-hidden shadow-sm flex flex-col justify-between hover:border-heritage-emerald transition-all group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-heritage-sand-dark">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-heritage-emerald text-heritage-sand px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider">
                    {venue.city}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
                      {venue.archetype}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-heritage-charcoal">
                      {venue.name}
                    </h3>
                  </div>

                  <p className="text-xs text-heritage-muted leading-relaxed line-clamp-2 font-light">
                    {venue.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-heritage-sand-dark">
                    <div>
                      <span className="text-[9px] text-heritage-muted uppercase block">Capacity</span>
                      <span className="font-semibold text-heritage-charcoal">{venue.capacityDisplay}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-heritage-muted uppercase block">Starting From</span>
                      <span className="font-semibold text-heritage-emerald">
                        {venue.startingFromDisplay}
                      </span>
                      {venue.isPricePlaceholder && (
                        <span className="block text-[8px] text-amber-700 font-mono" title={venue.placeholderTag}>
                          {venueShowcase.cardPlaceholderNote}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleVenueClick(venue)}
                  className="w-full bg-heritage-sand-dark border border-heritage-emerald/30 text-heritage-emerald hover:bg-heritage-emerald hover:text-heritage-sand py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{venueShowcase.cardCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Proof Element Near CTA */}
        <div className="p-4 bg-white border border-heritage-emerald/15 text-center text-xs font-mono text-heritage-charcoal flex flex-col sm:flex-row items-center justify-center gap-3">
          <ShieldCheck className="w-4 h-4 text-heritage-emerald shrink-0" />
          <span>{venueShowcase.proof}</span>
        </div>
      </div>
    </section>
  );
};
