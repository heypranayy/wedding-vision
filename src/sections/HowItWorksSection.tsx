import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface HowItWorksSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenBooking }) => {
  const { howItWorks } = homepageData;

  const handleStep1Click = () => {
    analytics.ctaClick(howItWorks.steps[0].actionText || 'Select Slot', 'how_it_works_step1', 'venue');
    analytics.bookingModalOpen('venue', 'how_it_works_step1');
    onOpenBooking('venue');
  };

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
          {howItWorks.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
          {howItWorks.heading}
        </h2>
        <p className="text-xs sm:text-sm text-heritage-muted">
          {howItWorks.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Interactive CTA */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleStep1Click}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStep1Click();
            }
          }}
          className="cursor-pointer bg-heritage-sand-dark/50 border-2 border-heritage-emerald p-6 sm:p-8 space-y-4 hover:shadow-lg transition-all group relative focus-visible:ring-2 focus-visible:ring-heritage-emerald"
          aria-label="Click step 1 to pick consultation slot"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-heritage-emerald">
              {howItWorks.steps[0].stepNum}
            </span>
            <span className="text-[9px] font-mono uppercase bg-heritage-emerald text-heritage-sand px-2 py-0.5 tracking-wider">
              {howItWorks.steps[0].tag}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-heritage-charcoal group-hover:text-heritage-emerald transition-colors">
            {howItWorks.steps[0].title}
          </h3>
          <p className="text-xs text-heritage-muted leading-relaxed">
            {howItWorks.steps[0].description}
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-bold text-heritage-emerald">
            <span>{howItWorks.steps[0].actionText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-heritage-emerald/15 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-heritage-gold">
              {howItWorks.steps[1].stepNum}
            </span>
            <span className="text-[9px] font-mono uppercase bg-heritage-sand-dark text-heritage-charcoal px-2 py-0.5 tracking-wider">
              {howItWorks.steps[1].tag}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-heritage-charcoal">
            {howItWorks.steps[1].title}
          </h3>
          <p className="text-xs text-heritage-muted leading-relaxed">
            {howItWorks.steps[1].description}
          </p>
          <span className="text-[10px] font-mono text-heritage-muted block pt-2">
            {howItWorks.steps[1].footerNote}
          </span>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-heritage-emerald/15 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-heritage-gold">
              {howItWorks.steps[2].stepNum}
            </span>
            <span className="text-[9px] font-mono uppercase bg-heritage-sand-dark text-heritage-charcoal px-2 py-0.5 tracking-wider">
              {howItWorks.steps[2].tag}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-heritage-charcoal">
            {howItWorks.steps[2].title}
          </h3>
          <p className="text-xs text-heritage-muted leading-relaxed">
            {howItWorks.steps[2].description}
          </p>
          <span className="text-[10px] font-mono text-heritage-muted block pt-2">
            {howItWorks.steps[2].footerNote}
          </span>
        </div>
      </div>

      {/* Proof Element Near CTA */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-heritage-sand-dark px-4 py-2 border border-heritage-emerald/20 text-xs font-mono text-heritage-charcoal shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
          <span>{howItWorks.proof}</span>
        </div>
      </div>
    </section>
  );
};
