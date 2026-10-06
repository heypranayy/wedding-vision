import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  MapPin,
  Sparkles,
  Compass
} from 'lucide-react';
import { homepageData, venuesData } from '../content';
import type { ServiceType, BookingPrefill, Venue } from '../types';
import { analytics } from '../lib/analytics';

interface VenueShowcaseSectionProps {
  onOpenBooking: (serviceType: ServiceType, prefill?: BookingPrefill) => void;
}

export const VenueShowcaseSection: React.FC<VenueShowcaseSectionProps> = ({ onOpenBooking }) => {
  const { venueShowcase } = homepageData;
  const venues: Venue[] = venuesData as Venue[];

  // Place filters
  const [selectedPlace, setSelectedPlace] = useState<string>('All');

  // Derive unique city/place list
  const places = useMemo(() => {
    const unique = Array.from(new Set(venues.map((v) => {
      if (v.city.toLowerCase().includes('jaipur') && !v.city.toLowerCase().includes('neemrana')) return 'Jaipur';
      if (v.city.toLowerCase().includes('udaipur')) return 'Udaipur';
      if (v.city.toLowerCase().includes('jodhpur')) return 'Jodhpur';
      if (v.city.toLowerCase().includes('neemrana')) return 'Neemrana';
      return v.city;
    })));
    return ['All', ...unique];
  }, [venues]);

  const filteredVenues = useMemo(() => {
    if (selectedPlace === 'All') return venues;
    return venues.filter((venue) => {
      if (selectedPlace === 'Jaipur') return venue.city.toLowerCase().includes('jaipur') && !venue.city.toLowerCase().includes('neemrana');
      if (selectedPlace === 'Udaipur') return venue.city.toLowerCase().includes('udaipur');
      if (selectedPlace === 'Jodhpur') return venue.city.toLowerCase().includes('jodhpur');
      if (selectedPlace === 'Neemrana') return venue.city.toLowerCase().includes('neemrana');
      return venue.city.toLowerCase().includes(selectedPlace.toLowerCase());
    });
  }, [venues, selectedPlace]);

  const handleVenueClick = (venue: Venue) => {
    analytics.ctaClick(`Inquire About Venue (${venue.name})`, 'venue_card', 'venue');
    analytics.bookingModalOpen('venue', `venue_card_${venue.id}`);
    onOpenBooking('venue', {
      city: venue.city,
      venueName: venue.name,
    });
  };

  return (
    <section
      id="venue-showcase"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-heritage-sand to-[#F5EFE6] border-y border-heritage-emerald/10 scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-heritage-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">

        {/* Header & Filter Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">

          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-emerald/5 border border-heritage-emerald/15 text-heritage-emerald text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold-antique" />
              <span className="uppercase tracking-wider font-semibold">{venueShowcase.eyebrow}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-heritage-emerald font-medium tracking-tight">
              {venueShowcase.heading}
            </h2>

            <p className="text-xs sm:text-sm text-heritage-muted font-sans font-light">
              {venueShowcase.description}
            </p>
          </div>

          {/* Place Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {places.map((place) => {
              const isActive = selectedPlace === place;
              return (
                <button
                  key={place}
                  type="button"
                  onClick={() => setSelectedPlace(place)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isActive
                    ? 'bg-heritage-emerald text-white shadow-md shadow-heritage-emerald/20 scale-[1.02]'
                    : 'bg-white/80 text-heritage-charcoal hover:bg-white hover:text-heritage-emerald border border-heritage-emerald/15 shadow-sm'
                    }`}
                >
                  {place !== 'All' && <MapPin className={`w-3 h-3 ${isActive ? 'text-heritage-gold' : 'text-heritage-muted'}`} />}
                  <span>{place}</span>
                  {place === 'All' && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ml-1 ${isActive ? 'bg-white/20 text-white' : 'bg-heritage-sand-dark text-heritage-muted'}`}>
                      {venues.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Venues Grid with Framer Motion Transition */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredVenues.map((venue) => (
              <motion.div
                key={venue.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-heritage-emerald/15 overflow-hidden shadow-sm hover:shadow-xl hover:border-heritage-gold/50 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Venue Image with Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-heritage-sand-dark">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Location Badge */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[11px] font-mono">
                      <MapPin className="w-3 h-3 text-heritage-gold" />
                      <span>{venue.city}</span>
                    </div>

                    {/* Region Pill */}
                    {venue.region && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-heritage-emerald text-[10px] font-mono px-2.5 py-1 rounded-full font-medium">
                        {venue.region}
                      </div>
                    )}

                    {/* Bottom Floating Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif text-xl sm:text-3xl font-m text-white leading-tight">
                        {venue.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed font-sans font-light line-clamp-2">
                      {venue.description}
                    </p>

                    {/* Quick Specs (Capacity & Budget) in Rounded Pill Container */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-heritage-sand/60 border border-heritage-sand-dark text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-muted flex items-center gap-1">
                          <Users className="w-3 h-3 text-heritage-emerald" />
                          <span>Capacity</span>
                        </span>
                        <span className="font-serif text-sm font-semibold text-heritage-charcoal block">
                          {venue.capacityDisplay}
                        </span>
                      </div>

                      <div className="space-y-0.5 border-l border-heritage-sand-dark pl-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-muted block">
                          Est. Budget
                        </span>
                        <span className="font-serif text-sm font-semibold text-heritage-emerald block">
                          {venue.startingFromDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleVenueClick(venue)}
                    className="w-full bg-heritage-emerald/5 hover:bg-heritage-emerald text-heritage-emerald hover:text-white border border-heritage-emerald/20 py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{venueShowcase.cardCta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Proof / Verification Bar at Bottom */}
        <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-sm rounded-xl border border-heritage-emerald/15 shadow-sm text-center text-xs sm:text-sm text-heritage-charcoal flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-light">
            <strong className="font-semibold text-heritage-charcoal">Verified Venues:</strong>{' '}
            <span className="text-heritage-muted">{venueShowcase.proof}</span>
          </span>
        </div>

      </div>
    </section>
  );
};
