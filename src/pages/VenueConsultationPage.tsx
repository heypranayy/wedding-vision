import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Compass, MessageCircle } from 'lucide-react';
import { CONSULTATION_PACKAGES, BUSINESS_INFO } from '../constants';
import type { ServiceType } from '../types';

interface VenueConsultationPageProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const VenueConsultationPage: React.FC<VenueConsultationPageProps> = ({ onOpenBooking }) => {
  const pkg = CONSULTATION_PACKAGES.venue;

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header / Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 border border-heritage-gold/50 bg-heritage-sand-dark px-3 py-1">
          <Compass className="w-3.5 h-3.5 text-heritage-emerald" />
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-bold">
            Service 01 • Objective Scouting Intelligence
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-tight">
          Rajasthan Palace & Heritage Venue Advisory
        </h1>
        <p className="text-heritage-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          60-Minute 1-on-1 strategic video session with our senior Jaipur planners. Avoid hidden sound curfews, generator markups, and mandatory vendor lock-ins before signing palace deposits.
        </p>
      </div>

      {/* Pricing & Booking Card (High Prominence) */}
      <div className="p-8 bg-white border border-heritage-emerald/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
            {pkg.duration}
          </span>
          <div className="font-serif text-3xl font-bold text-heritage-emerald">
            {pkg.priceFormatted}{' '}
            <span className="text-xs font-sans font-normal text-heritage-muted">
              (All-Inclusive Flat Fee)
            </span>
          </div>
          <p className="text-xs text-emerald-800 flex items-center justify-center md:justify-start gap-1 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>100% credited towards our full planning service if retained.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => onOpenBooking('venue')}
            className="bg-heritage-emerald text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Book Venue Advisory (₹2,999)</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-emerald-800/30 text-emerald-900 bg-white px-5 py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* The 4 Traps of Rajasthan Venue Selection */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal">
          The 4 Hidden Traps in Rajasthan Palace Contracts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-heritage-sand-dark border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-terracotta">01 • Sound Curfew Violations</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">The 10:00 PM Outdoor Cutoff</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Rajasthan state police strictly enforce outdoor decibel limits after 10:00 PM. If your venue does not possess an acoustically isolated ballroom, your sangeet gets shut down abruptly mid-party.
            </p>
          </div>

          <div className="p-6 bg-heritage-sand-dark border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-terracotta">02 • Power Generation Penalties</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">Unquoted DG Set Overages</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Palace lighting and modern truss stages consume tremendous wattage. Venues frequently bill ₹1.5L - ₹3L in sudden fuel and generator overages not mentioned in standard event brochures.
            </p>
          </div>

          <div className="p-6 bg-heritage-sand-dark border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-terracotta">03 • Royalty Fees on Outside Vendors</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">The "Empanelled Vendor" Surcharge</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Bringing your own trusted decorator or photographer? Many properties impose a 15% to 25% "royalty fee" simply for external vendor gate passes unless negotiated out upfront.
            </p>
          </div>

          <div className="p-6 bg-heritage-sand-dark border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-terracotta">04 • Room Buyout Lock-Ins</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">Mandatory 100% Occupancy Rules</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Certain heritage havelis require booking all 40-100 rooms across 2 nights even if your guest arrival timeline is staggered, resulting in dead room costs for empty days.
            </p>
          </div>
        </div>
      </div>

      {/* Deliverables Breakdown */}
      <div className="p-8 bg-white border border-heritage-emerald/15 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal">
          What We Audit in Your 60-Minute Session
        </h2>
        <div className="space-y-4">
          {pkg.deliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-heritage-emerald shrink-0 mt-0.5" />
              <p className="text-sm text-heritage-charcoal leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Booking Trigger */}
      <div className="text-center p-10 bg-heritage-emerald-deep text-heritage-sand space-y-4 border border-heritage-gold/30">
        <h3 className="font-serif text-2xl sm:text-3xl font-light">
          Never sign a venue contract blind.
        </h3>
        <p className="text-xs sm:text-sm text-heritage-sand/80 max-w-lg mx-auto">
          Book your session today. 100% credited toward full planning services if booked within 45 days.
        </p>
        <button
          type="button"
          onClick={() => onOpenBooking('venue')}
          className="bg-heritage-sand text-heritage-emerald px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-xl inline-flex items-center gap-2"
        >
          <span>Book Venue Advisory (₹2,999)</span>
          <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
        </button>
      </div>
    </div>
  );
};
