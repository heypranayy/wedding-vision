import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  FileText,
  Check,
  ShieldCheck,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

interface TwoPathsSectionProps {
  onOpenBooking: (serviceType: ServiceType) => void;
}

export const TwoPathsSection: React.FC<TwoPathsSectionProps> = ({ onOpenBooking }) => {
  const { twoPaths } = homepageData;
  const { panelA, panelB, proof } = twoPaths;
  const [activeTab, setActiveTab] = useState<'all' | 'venue' | 'wedding'>('all');

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
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f7f3ec] via-heritage-sand to-[#f3ede3] border-y border-heritage-emerald/10 scroll-mt-20 relative overflow-hidden"
    >
      {/* Decorative Heritage Ambience Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-heritage-emerald/5 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >

          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-heritage-emerald font-medium tracking-tight">
            {twoPaths.heading}
          </h2>

          <p className="text-sm sm:text-base text-heritage-muted leading-relaxed max-w-xl mx-auto font-sans">
            {twoPaths.description}
          </p>

          {/* Quick interactive filter on mobile/tablet */}
          <div className="pt-2 flex items-center justify-center gap-1.5 md:hidden">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'all'
                ? 'bg-heritage-emerald text-white shadow-sm'
                : 'bg-white/80 text-heritage-muted border border-heritage-emerald/10'
                }`}
            >
              Both Sessions
            </button>
            <button
              onClick={() => setActiveTab('venue')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'venue'
                ? 'bg-heritage-emerald text-white shadow-sm'
                : 'bg-white/80 text-heritage-muted border border-heritage-emerald/10'
                }`}
            >
              Venue Only
            </button>
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'wedding'
                ? 'bg-heritage-emerald text-white shadow-sm'
                : 'bg-white/80 text-heritage-muted border border-heritage-emerald/10'
                }`}
            >
              Full Planning
            </button>
          </div>
        </motion.div>

        {/* 2 Consultation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* CARD A: FIND MY VENUE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className={`bg-white rounded-2xl border border-heritage-emerald/15 p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-heritage-emerald/40 transition-all duration-300 relative group overflow-hidden ${activeTab === 'wedding' ? 'hidden md:flex' : 'flex'
              }`}
          >
            {/* Top accent pill */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-heritage-emerald/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-sand text-heritage-emerald border border-heritage-emerald/15">
                  <Compass className="w-4 h-4 text-heritage-emerald" />
                  <span className="text-xs font-semibold font-sans">{panelA.tag}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-muted bg-heritage-sand/80 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-heritage-gold-antique" />
                  <span>{panelA.duration}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal font-normal group-hover:text-heritage-emerald transition-colors">
                  {panelA.title}
                </h3>
                <p className="text-xs sm:text-sm text-heritage-gold font-medium mt-1">
                  {panelA.subtitle}
                </p>
              </div>

              {/* Audience Context */}
              <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed font-sans bg-heritage-sand/50 p-3.5 rounded-xl border border-heritage-sand-dark">
                {panelA.audience}
              </p>

              {/* What You Get Deliverables */}
              <div className="space-y-3 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold block">
                  What we cover in this session:
                </span>
                <ul className="space-y-2.5">
                  {panelA.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-heritage-charcoal leading-snug">
                      <div className="w-4 h-4 rounded-full bg-heritage-emerald/10 text-heritage-emerald flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Pricing & CTA */}
            <div className="pt-6 border-t border-heritage-emerald/10 mt-8 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-muted block">
                    Session Fee
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-heritage-emerald">
                      {panelA.priceFormatted}
                    </span>
                    <span className="text-xs text-heritage-muted font-sans">
                      {panelA.priceNote}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {panelA.creditBadge}
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBooking('venue', 'two_paths_panel_venue')}
                className="w-full bg-heritage-emerald text-white rounded-xl py-4 px-5 text-xs uppercase tracking-luxury font-semibold hover:bg-heritage-emerald-deep transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <span>{panelA.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* CARD B: PLAN MY WEDDING (Featured / Recommended) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className={`bg-gradient-to-br from-heritage-emerald to-heritage-emerald-deep text-white rounded-2xl border-2 border-heritage-gold/40 p-7 sm:p-9 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden ${activeTab === 'venue' ? 'hidden md:flex' : 'flex'
              }`}
          >
            {/* Subtle glow / highlight in background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-heritage-gold border border-heritage-gold/30">
                  <FileText className="w-4 h-4 text-heritage-gold" />
                  <span className="text-xs font-semibold font-sans">{panelB.tag}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-sand/90 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-heritage-gold" />
                  <span>{panelB.duration}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-heritage-gold transition-colors">
                  {panelB.title}
                </h3>
                <p className="text-xs sm:text-sm text-heritage-gold font-medium mt-1">
                  {panelB.subtitle}
                </p>
              </div>

              {/* Audience Context */}
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans bg-white/5 p-3.5 rounded-xl border border-white/10">
                {panelB.audience}
              </p>

              {/* What You Get Deliverables */}
              <div className="space-y-3 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-gold font-semibold block">
                  What we cover in this session:
                </span>
                <ul className="space-y-2.5">
                  {panelB.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 leading-snug">
                      <div className="w-4 h-4 rounded-full bg-heritage-gold/20 text-heritage-gold flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Pricing & CTA */}
            <div className="pt-6 border-t border-white/15 mt-8 space-y-4 relative z-10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    Session Fee
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      {panelB.priceFormatted}
                    </span>
                    <span className="text-xs text-white/70 font-sans">
                      {panelB.priceNote}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] font-medium text-heritage-sand bg-black/25 px-2.5 py-1 rounded-full border border-heritage-gold/40">
                    {panelB.creditBadge}
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBooking('wedding', 'two_paths_panel_wedding')}
                className="w-full bg-heritage-gold hover:bg-white text-heritage-charcoal rounded-xl py-4 px-5 text-xs uppercase tracking-luxury font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <span>{panelB.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-charcoal transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Proof & Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-heritage-emerald/15 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm"
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm text-heritage-charcoal">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="font-semibold text-heritage-charcoal">{proof.title}:</strong>{' '}
              <span className="text-heritage-muted">{proof.text}</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-mono text-heritage-emerald bg-heritage-sand px-3 py-1.5 rounded-full border border-heritage-emerald/10 shrink-0 font-medium">
            <span>{proof.pledge}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
