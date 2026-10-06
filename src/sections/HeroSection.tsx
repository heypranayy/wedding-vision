import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { venuesData } from '../content';
import type { ServiceType, BookingPrefill } from '../types';
import { analytics } from '../lib/analytics';
import { Skiper48 } from '../components/ui/skiper48';

interface HeroSectionProps {
  onOpenBooking: (serviceType?: ServiceType, prefill?: BookingPrefill) => void;
}

// Convert palace venue data to Skiper48 card images
const PALACE_CARDS = venuesData.slice(0, 6).map((venue) => ({
  src: venue.image,
  alt: `${venue.name} luxury wedding venue in ${venue.city}`,
  name: venue.name,
  city: `${venue.city} • ${venue.region}`,
  capacity: venue.capacityDisplay,
  price: venue.startingFromDisplay,
}));

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  // Date selection state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const [selectedGuests, setSelectedGuests] = useState('200-500');

  // Set minimum date to tomorrow (YYYY-MM-DD)
  const tomorrowStr = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.ctaClick('Find My Venue', 'hero_planner_date_picker', 'venue');
    analytics.bookingModalOpen('venue', 'hero_planner_date_picker');

    onOpenBooking('venue', {
      city: selectedCity,
      guestCount: selectedGuests,
      serviceType: 'venue',
    });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Clean Editorial Headline + Interactive Booking Bar (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-sand-dark/90 px-3 py-1 rounded-md shadow-sm">
            <span className="w-1.5 h-1.5 bg-heritage-emerald rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-luxury text-heritage-emerald font-semibold">
              YOUR HERITAGE WEDDING PARTNER
            </span>
          </div>

          {/* Simple, powerful headline */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-heritage-charcoal font-light leading-[1.1] tracking-tight">
              Plan your royal wedding{' '}
              <span className="font-bold text-heritage-emerald">in Rajasthan.</span>
            </h1>
            <p className="text-heritage-muted text-base sm:text-lg leading-relaxed font-light max-w-xl">
              We help you find the best palace venues, negotiate clear prices, and manage every detail of your luxury wedding.
            </p>
          </div>

          {/* Loverly-Style Date & Destination Picker Bar */}
          <div className="pt-2">
            <form
              onSubmit={handleConsultationSubmit}
              className="bg-white border border-heritage-gold/40 shadow-regal rounded-xl p-4 sm:p-5 transition-shadow hover:shadow-regal-lg"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-heritage-gold-dark font-semibold mb-3 flex items-center gap-1.5">
                <span>FIND VENUES & GET IN TOUCH</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {/* 1. Date Picker */}
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="wedding-date"
                    className="text-[10px] font-mono uppercase tracking-wider text-heritage-charcoal flex items-center gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-heritage-emerald" />
                    <span>Wedding Date</span>
                  </label>
                  <input
                    id="wedding-date"
                    type="date"
                    min={tomorrowStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-heritage-sand/60 border border-heritage-gold/30 px-3 py-2 text-xs font-sans text-heritage-charcoal rounded-lg focus:outline-none focus:border-heritage-emerald cursor-pointer"
                  />
                </div>

                {/* 2. Destination City Dropdown */}
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="wedding-city"
                    className="text-[10px] font-mono uppercase tracking-wider text-heritage-charcoal flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-heritage-emerald" />
                    <span>Destination</span>
                  </label>
                  <select
                    id="wedding-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-heritage-sand/60 border border-heritage-gold/30 px-3 py-2 text-xs font-sans text-heritage-charcoal rounded-lg focus:outline-none focus:border-heritage-emerald cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur (Pink City)</option>
                    <option value="Udaipur">Udaipur (Lake Palaces)</option>
                    <option value="Jodhpur">Jodhpur (Blue City)</option>
                    <option value="Jaisalmer">Jaisalmer (Golden Forts)</option>
                    <option value="Pushkar / Neemrana">Pushkar & Neemrana</option>
                  </select>
                </div>

                {/* 3. Estimated Guest Count */}
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="wedding-guests"
                    className="text-[10px] font-mono uppercase tracking-wider text-heritage-charcoal flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-heritage-emerald" />
                    <span>Guest Count</span>
                  </label>
                  <select
                    id="wedding-guests"
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(e.target.value)}
                    className="w-full bg-heritage-sand/60 border border-heritage-gold/30 px-3 py-2 text-xs font-sans text-heritage-charcoal rounded-lg focus:outline-none focus:border-heritage-emerald cursor-pointer"
                  >
                    <option value="Under 150">Under 150 Guests</option>
                    <option value="200-500">200 – 500 Guests</option>
                    <option value="500-800">500 – 800 Guests</option>
                    <option value="800+">800+ Royal Scale</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-heritage-emerald hover:bg-heritage-emerald-deep text-heritage-sand py-3 px-6 text-xs uppercase tracking-luxury font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Find Venues & Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>

          {/* Minimal Trust Indicator */}
          <div className="flex items-center gap-5 text-xs font-mono text-heritage-muted pt-1">
            <span className="flex items-center gap-1.5">
              <span className="text-heritage-gold font-bold">5.0 ★</span>
              <span>Rating by 100+ Clients.</span>
            </span>
            <span className="text-heritage-gold/50">•</span>
            <span>WeddingWire Winner 2024</span>
          </div>
        </div>

        {/* Right Column: Skiper48 Card Swipe Carousel (5 Cols) */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none">
          <div className="w-full flex items-center justify-center">
            <Skiper48
              images={PALACE_CARDS}
              autoplay={true}
              loop={true}
              showNavigation={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
