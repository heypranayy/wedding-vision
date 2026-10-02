import React from 'react';
import { ArrowUpRight, MessageCircle, ShieldCheck, Award } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

interface HeroSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { hero } = homepageData;
  const ctaVariant = useFeatureFlag('heroCtaVariant');

  const handleBooking = () => {
    analytics.ctaClick(hero.ctaPrimary, 'hero_primary', 'venue');
    analytics.bookingModalOpen('venue', 'hero_primary');
    onOpenBooking('venue');
  };

  const handleWhatsApp = () => {
    analytics.whatsappClick('hero_secondary', hero.whatsappIntent);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Subtle Architectural Motif */}
      <div className="absolute top-0 right-1/4 w-72 h-72 jaali-watermark rounded-full opacity-40 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Narrative Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 border border-heritage-gold/50 bg-heritage-sand-dark/80 px-3 py-1 shadow-sm">
            <span className="w-1.5 h-1.5 bg-heritage-emerald rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold">
              {hero.eyebrow}
            </span>
          </div>

          {/* Oversized Type in Editorial Asymmetry */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-[1.08] tracking-tight">
            {hero.promisePrefix}{' '}
            <span className="italic font-normal text-heritage-emerald">
              {hero.promiseEmphasis}
            </span>
          </h1>

          <p className="text-heritage-muted text-base sm:text-lg leading-[1.75] font-light max-w-2xl">
            {hero.subhead}
          </p>

          {/* Direct Dual CTAs with Micro-Cluster Proof */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={handleBooking}
                className="inline-flex items-center justify-center gap-2.5 bg-heritage-emerald text-heritage-sand px-7 py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-heritage-emerald-deep transition-all duration-300 border border-heritage-emerald shadow-lg group focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              >
                <span>
                  {ctaVariant === 'claim_slot' ? 'Claim Your Advisory Slot' : hero.ctaPrimary}
                </span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={hero.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 bg-white border border-emerald-800/30 text-emerald-900 px-6 py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Verified Trust Proof Directly Under CTAs */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] font-mono text-heritage-charcoal/90 pt-1.5 border-t border-heritage-sand-dark">
              <a
                href={hero.proof.weddingWireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-heritage-emerald hover:underline font-semibold"
              >
                <Award className="w-3.5 h-3.5 text-heritage-gold" />
                <span>{hero.proof.rating}</span>
              </a>

              <span className="flex items-center gap-1.5 text-heritage-charcoal">
                <span className="w-1.5 h-1.5 bg-heritage-gold rounded-full" />
                <span>{hero.proof.award}</span>
              </span>

              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{hero.proof.guarantee}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Column (5 cols) - LCP Element: No animation on image */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="p-3 bg-white border border-heritage-gold/30 shadow-regal">
              <div className="overflow-hidden bg-heritage-sand-dark aspect-[4/5] relative">
                <img
                  src={hero.media.image}
                  alt={hero.media.alt}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.05] lcp-hero-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal-deep/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-heritage-sand/95 backdrop-blur-sm border border-heritage-gold/40 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-luxury text-heritage-gold block">
                      {hero.media.badgeTitle}
                    </span>
                    <span className="font-serif text-sm font-semibold text-heritage-emerald">
                      {hero.media.badgeSubtitle}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-heritage-charcoal block">
                      {hero.media.badgeRating}
                    </span>
                    <span className="text-[9px] text-heritage-muted font-mono">
                      {hero.media.badgeSource}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -top-3 -right-3 bg-heritage-emerald-deep text-heritage-sand px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-heritage-gold/40 shadow">
              {hero.media.locationTag}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
