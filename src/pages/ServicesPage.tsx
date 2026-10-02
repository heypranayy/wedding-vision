import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CORE_SERVICES } from '../constants';
import type { ServiceType } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
          Full Scope of Capabilities
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-tight">
          Our Wedding Planning Services
        </h1>
        <p className="text-heritage-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          From concept architecture to final guest farewells, we provide end-to-end luxury wedding management across Rajasthan. Every service is governed by strict financial transparency and local Jaipur execution mastery.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CORE_SERVICES.map((srv, idx) => (
          <div
            key={idx}
            className="p-8 bg-white border border-heritage-emerald/15 hover:border-heritage-emerald/40 transition-all shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold">
                  Service 0{idx + 1}
                </span>
                <span className="text-xs font-mono text-heritage-muted">{srv.scope}</span>
              </div>
              <h3 className="font-serif text-2xl text-heritage-emerald">
                {srv.title}
              </h3>
              <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-4 border-t border-heritage-sand-dark flex items-center justify-between">
              <button
                type="button"
                onClick={() => onOpenBooking('wedding')}
                className="text-xs font-mono uppercase tracking-wider text-heritage-emerald hover:text-heritage-emerald-deep font-semibold flex items-center gap-1.5"
              >
                <span>Consult on this service</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Card */}
      <div className="p-10 bg-heritage-emerald-deep text-heritage-sand border border-heritage-gold/30 shadow-regal text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-light">
          Start with a Strategic Planning Consultation
        </h2>
        <p className="text-xs sm:text-sm text-heritage-sand/80 max-w-lg mx-auto leading-relaxed">
          Book our 1-on-1 strategy session to receive an itemized Rajasthan wedding budget model, timeline roadmap, and vetted venue shortlist. 100% credited toward your full planning engagement.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onOpenBooking('venue')}
            className="bg-heritage-sand text-heritage-emerald px-7 py-3.5 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <span>Venue Advisory (₹2,999)</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>
          <button
            type="button"
            onClick={() => onOpenBooking('wedding')}
            className="border border-heritage-gold/40 text-heritage-sand px-7 py-3.5 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald transition-all shadow-md flex items-center gap-2"
          >
            <span>Planning Blueprint (₹4,999)</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>
        </div>
      </div>
    </div>
  );
};
