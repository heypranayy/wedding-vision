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
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
          Tailored Wedding Services
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-normal leading-tight">
          Everything You Need for Your Dream Wedding
        </h1>
        <p className="text-heritage-charcoal/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          From your first planning session to the day you celebrate, our team takes care of every detail so you and your families can simply enjoy the moment.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CORE_SERVICES.map((srv, idx) => (
          <div
            key={idx}
            className="p-8 bg-white border border-heritage-gold/30 hover:border-heritage-emerald transition-all space-y-4 flex flex-col justify-between rounded-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold">
                  0{idx + 1}
                </span>
                <span className="text-xs font-mono text-heritage-emerald font-medium">{srv.scope}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-heritage-emerald">
                {srv.title}
              </h3>
              <p className="text-sm text-heritage-charcoal/75 leading-relaxed font-light">
                {srv.description}
              </p>
            </div>

            <div className="pt-4 border-t border-heritage-gold/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onOpenBooking('wedding')}
                className="text-xs font-mono uppercase tracking-wider text-heritage-emerald hover:text-heritage-gold transition-colors font-semibold flex items-center gap-1.5"
              >
                <span>Plan With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Card */}
      <div className="p-10 md:p-12 bg-heritage-emerald text-heritage-sand border border-heritage-gold/40 rounded-3xl text-center space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal">
          Let’s Bring Your Wedding Vision to Life
        </h2>
        <p className="text-sm sm:text-base text-heritage-sand/85 max-w-xl mx-auto leading-relaxed font-light">
          Have questions about venues, decor, or where to begin? Speak directly with our senior wedding planning team and let’s get started.
        </p>
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onOpenBooking('venue')}
            className="bg-heritage-gold text-heritage-charcoal px-7 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-white hover:text-heritage-emerald transition-all flex items-center gap-2 rounded-xl"
          >
            <span>Explore Venues With Us</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-emerald" />
          </button>
          <button
            type="button"
            onClick={() => onOpenBooking('wedding')}
            className="border border-heritage-sand/40 text-heritage-sand px-7 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-white hover:text-heritage-emerald transition-all flex items-center gap-2 rounded-xl"
          >
            <span>Talk to a Wedding Planner</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>
        </div>
      </div>
    </div>
  );
};
