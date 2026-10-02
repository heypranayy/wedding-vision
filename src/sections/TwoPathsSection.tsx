import React from 'react';
import { Compass, FileText, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface TwoPathsSectionProps {
  onOpenBooking: (serviceType: ServiceType) => void;
}

export const TwoPathsSection: React.FC<TwoPathsSectionProps> = ({ onOpenBooking }) => {
  const { twoPaths } = homepageData;
  const { panelA, panelB, proof } = twoPaths;

  const handleBooking = (type: ServiceType, location: string) => {
    analytics.ctaClick(
      type === 'venue' ? panelA.ctaText : panelB.ctaText,
      location,
      type
    );
    analytics.bookingModalOpen(type, location);
    onOpenBooking(type);
  };

  return (
    <section
      id="two-paths"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-heritage-sand-dark/60 border-y border-heritage-emerald/15 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
            {twoPaths.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
            {twoPaths.heading}
          </h2>
          <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
            {twoPaths.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* PANEL A: FIND MY VENUE */}
          <div className="bg-white border-2 border-heritage-emerald/20 hover:border-heritage-emerald p-6 sm:p-8 flex flex-col justify-between shadow-sm relative transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-heritage-emerald/10 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-heritage-emerald" />
                  <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-emerald font-bold">
                    {panelA.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-heritage-sand-dark px-2.5 py-1 text-heritage-charcoal font-semibold">
                  {panelA.duration}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal group-hover:text-heritage-emerald transition-colors">
                  {panelA.title}
                </h3>
                <span className="text-xs text-heritage-gold font-mono block mt-0.5">
                  {panelA.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                {panelA.audience}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block">
                  What You Get:
                </span>
                <ul className="space-y-2 text-xs text-heritage-charcoal">
                  {panelA.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-heritage-emerald shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-heritage-emerald/10 mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-muted block">
                    Consultation Investment
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-heritage-emerald">
                    {panelA.priceFormatted}
                  </span>
                  <span className="text-[11px] font-mono text-heritage-muted ml-1.5">
                    {panelA.priceNote}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 border border-emerald-200">
                  {panelA.creditBadge}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBooking('venue', 'two_paths_panel_venue')}
                className="w-full bg-heritage-emerald text-heritage-sand py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-md flex items-center justify-center gap-2 border border-heritage-emerald-deep focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              >
                <span>{panelA.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
              </button>
            </div>
          </div>

          {/* PANEL B: PLAN MY WEDDING */}
          <div className="bg-heritage-emerald text-heritage-sand border-2 border-heritage-gold/50 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-heritage-sand/15 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-heritage-gold" />
                  <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-gold font-bold">
                    {panelB.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-heritage-emerald-deep px-2.5 py-1 text-heritage-sand font-semibold border border-heritage-gold/30">
                  {panelB.duration}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-heritage-sand group-hover:text-heritage-gold transition-colors">
                  {panelB.title}
                </h3>
                <span className="text-xs text-heritage-sand/80 font-mono block mt-0.5">
                  {panelB.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-heritage-sand/80 leading-relaxed font-light">
                {panelB.audience}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-gold font-semibold block">
                  What You Get:
                </span>
                <ul className="space-y-2 text-xs text-heritage-sand/90">
                  {panelB.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-heritage-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-heritage-sand/15 mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-sand/70 block">
                    Consultation Investment
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-heritage-sand">
                    {panelB.priceFormatted}
                  </span>
                  <span className="text-[11px] font-mono text-heritage-sand/70 ml-1.5">
                    {panelB.priceNote}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-heritage-sand bg-heritage-emerald-deep px-2 py-1 border border-heritage-gold/40">
                  {panelB.creditBadge}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBooking('wedding', 'two_paths_panel_wedding')}
                className="w-full bg-heritage-sand text-heritage-emerald py-4 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 border border-white focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              >
                <span>{panelB.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
              </button>
            </div>
          </div>
        </div>

        {/* Proof Element Near CTAs */}
        <div className="bg-white p-4 border border-heritage-emerald/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-heritage-charcoal">
            <ShieldCheck className="w-4 h-4 text-heritage-emerald shrink-0" />
            <span>
              <strong>{proof.title}:</strong> {proof.text}
            </span>
          </div>
          <span className="text-[11px] font-mono text-heritage-gold uppercase tracking-wider shrink-0 font-semibold">
            {proof.pledge}
          </span>
        </div>
      </div>
    </section>
  );
};
