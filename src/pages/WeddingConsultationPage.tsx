import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, FileText, Clock, MessageCircle, BarChart3 } from 'lucide-react';
import { CONSULTATION_PACKAGES, BUSINESS_INFO } from '../constants';
import type { ServiceType } from '../types';

interface WeddingConsultationPageProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const WeddingConsultationPage: React.FC<WeddingConsultationPageProps> = ({ onOpenBooking }) => {
  const pkg = CONSULTATION_PACKAGES.wedding;

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header / Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 border border-heritage-gold/50 bg-heritage-sand-dark px-3 py-1">
          <FileText className="w-3.5 h-3.5 text-heritage-emerald" />
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-bold">
            Service 02 • Master Architecture & Financial Strategy
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-tight">
          Comprehensive Wedding Planning Blueprint
        </h1>
        <p className="text-heritage-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          90-Minute architectural planning session. We model your exact wedding budget, design an authentic heritage aesthetic, and provide a battle-tested 12-month milestone timeline.
        </p>
      </div>

      {/* Pricing & Booking Card (High Prominence) */}
      <div className="p-8 bg-heritage-emerald-deep text-heritage-sand border border-heritage-gold/30 shadow-regal flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
            {pkg.duration}
          </span>
          <div className="font-serif text-3xl font-bold text-heritage-sand">
            {pkg.priceFormatted}{' '}
            <span className="text-xs font-sans font-normal text-heritage-sand/70">
              (All-Inclusive Master Strategy Session)
            </span>
          </div>
          <p className="text-xs text-heritage-gold flex items-center justify-center md:justify-start gap-1 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% credited towards our full planning service if retained.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => onOpenBooking('wedding')}
            className="bg-heritage-sand text-heritage-emerald px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Book Planning Blueprint (₹4,999)</span>
            <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
          </button>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-heritage-gold/40 text-heritage-sand bg-heritage-emerald/40 px-5 py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-heritage-emerald transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-heritage-gold" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* The Pillars of the Blueprint */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal">
          The 4 Pillars of Your 90-Minute Blueprint
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <BarChart3 className="w-5 h-5 text-heritage-emerald mb-1" />
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">01 • Line-Item Budget Allocation</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              We allocate realistic percentages for F&B, sound production, floral art, artist curation, and hospitality logistics. You know exactly what each event costs before committing.
            </p>
          </div>

          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <Clock className="w-5 h-5 text-heritage-emerald mb-1" />
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">02 • 12-Month Critical Path Timeline</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              A sequence of what to finalize in which month: vendor contracts, invitation dispatches, bridal attire trials, liquor excise permits, and rehearsal coordination.
            </p>
          </div>

          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <FileText className="w-5 h-5 text-heritage-emerald mb-1" />
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">03 • Heritage-Modern Concept Design</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Mandap structural concepts, lighting choreography, and floral moodboards that honor royal Rajasthani architecture while maintaining sleek contemporary elegance.
            </p>
          </div>

          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <ShieldCheck className="w-5 h-5 text-heritage-emerald mb-1" />
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">04 • Vendor Selection Matrix</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              Vetted recommendations for top photographers, mehendi artists, makeup stylists, folk ensembles, and sound engineers with zero broker kickbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Deliverables Breakdown */}
      <div className="p-8 bg-white border border-heritage-emerald/15 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal">
          Deliverables Included in Session
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
      <div className="text-center p-10 bg-heritage-sand-dark border border-heritage-emerald/20 space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal font-light">
          Eliminate wedding planning stress before it starts.
        </h3>
        <p className="text-xs sm:text-sm text-heritage-muted max-w-lg mx-auto">
          Reserve your 90-minute master strategy session today. 100% credited towards your full planning engagement if retained.
        </p>
        <button
          type="button"
          onClick={() => onOpenBooking('wedding')}
          className="bg-heritage-emerald text-heritage-sand px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all shadow-xl inline-flex items-center gap-2"
        >
          <span>Book Planning Blueprint (₹4,999)</span>
          <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
        </button>
      </div>
    </div>
  );
};
