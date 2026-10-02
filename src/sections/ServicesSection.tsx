import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface ServicesSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const { services } = homepageData;

  const handleConsultClick = () => {
    analytics.ctaClick(services.proof.cta, 'services_editorial_cta', 'wedding');
    analytics.bookingModalOpen('wedding', 'services_editorial_cta');
    onOpenBooking('wedding');
  };

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
            {services.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light mt-1">
            {services.heading}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-heritage-muted max-w-md leading-relaxed font-light">
          {services.description}
        </p>
      </div>

      <div className="divide-y divide-heritage-emerald/15 border-y border-heritage-emerald/15">
        {services.items.map((service, idx) => (
          <div
            key={idx}
            className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/60 transition-colors px-2 sm:px-4"
          >
            <div className="md:col-span-1 text-xs font-mono text-heritage-gold font-bold">
              0{idx + 1}
            </div>
            <div className="md:col-span-4">
              <span className="text-[9px] font-mono uppercase tracking-wider text-heritage-muted block">
                {service.scope}
              </span>
              <h3 className="font-serif text-xl font-bold text-heritage-charcoal">
                {service.title}
              </h3>
            </div>
            <div className="md:col-span-5 text-xs text-heritage-muted leading-relaxed font-light">
              {service.description}
            </div>
            <div className="md:col-span-2 text-right">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-emerald hover:text-heritage-emerald-deep font-semibold"
              >
                <span>Explore Detail</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Element Near CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-heritage-sand-dark border border-heritage-emerald/20 text-xs font-mono">
        <div className="flex items-center gap-2 text-heritage-charcoal">
          <ShieldCheck className="w-4 h-4 text-heritage-emerald shrink-0" />
          <span>{services.proof.text}</span>
        </div>
        <button
          type="button"
          onClick={handleConsultClick}
          className="text-heritage-emerald font-semibold uppercase tracking-wider hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-heritage-emerald p-1"
        >
          <span>{services.proof.cta}</span>
        </button>
      </div>
    </section>
  );
};
