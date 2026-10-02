import React from 'react';
import { ArrowUpRight, ShieldCheck, MapPin, CheckCircle2, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import type { ServiceType } from '../types';

interface AboutPageProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
          Our Heritage & Ethos
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-tight">
          Crafting celebrations where Rajasthani heritage meets modern design.
        </h1>
        <p className="text-heritage-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          Headquartered in Jaipur, Weddings Vision was established to provide couples with a disciplined, transparent, and aesthetically elevated alternative to traditional wedding brokerages.
        </p>
      </div>

      {/* Two Column Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 space-y-5 text-sm text-heritage-muted leading-relaxed">
          <h2 className="font-serif text-2xl text-heritage-charcoal">
            A Decade of Precision in Jaipur, Rajasthan
          </h2>
          <p>
            Rajasthan is home to the world's most breathtaking wedding destinations — from grand royal palaces and ancient hilltop fortresses to tranquil lakeside havelis. Yet, executing a celebration here requires far more than aesthetic taste; it demands rigorous logistical mastery, local authority compliance, and uncompromising vendor accountability.
          </p>
          <p>
            Led by senior planner <strong className="text-heritage-charcoal font-semibold">Hemraj</strong> and our dedicated production team, Weddings Vision operates with a foundational commitment to <strong className="text-heritage-emerald font-semibold">radical commercial transparency</strong>. We reject the pervasive industry practice of hidden venue kickbacks and supplier markups. Every quote, contract, and bill is settled openly at net actual cost.
          </p>
          <p>
            Whether coordinating intimate 80-guest palace gatherings or 800-guest royal extravaganzas, our approach remains architectural: deliberate, calm, and unmistakably refined.
          </p>
        </div>

        <div className="md:col-span-5 bg-white p-6 border border-heritage-emerald/20 shadow-md space-y-4">
          <div className="space-y-1 pb-4 border-b border-heritage-sand-dark">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
              Verified Industry Recognition
            </span>
            <h3 className="font-serif text-xl text-heritage-emerald">
              Wedding Awards 2024 Winner
            </h3>
          </div>

          <div className="space-y-3 text-xs text-heritage-charcoal">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>WeddingWire India Annual Wedding Award Winner</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>5.0 / 5.0 Star Rating across verified client reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Over a decade of continuous operational experience</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Jaipur Headquarters: Mahima Trinity Mall, Sodala</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={BUSINESS_INFO.awards.weddingWireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-heritage-emerald hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View authentic WeddingWire profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal">
          Our Three Guiding Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-gold">01</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">Zero Secret Markups</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              We operate exclusively on a transparent, flat professional management fee. All vendor quotes, venue contracts, and beverage billing are passed directly to you at net cost.
            </p>
          </div>

          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-gold">02</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">Heritage Meets Modern</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              We honor the regal grandeur of Rajasthani architectural heritage without the tacky cliches. Clean lines, antique brass, authentic textiles, and deliberate negative space.
            </p>
          </div>

          <div className="p-6 bg-white border border-heritage-emerald/15 space-y-2">
            <span className="text-xs font-mono font-bold text-heritage-gold">03</span>
            <h3 className="font-serif text-lg font-semibold text-heritage-charcoal">Radical Logistical Mastery</h3>
            <p className="text-xs text-heritage-muted leading-relaxed">
              From power load balancing to municipal sound curfew enforcement, we engineer every contingency so you can enjoy your celebration completely stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center p-10 bg-heritage-emerald-deep text-heritage-sand space-y-4 border border-heritage-gold/30">
        <h3 className="font-serif text-2xl sm:text-3xl font-light">
          Meet with our senior planners.
        </h3>
        <p className="text-xs sm:text-sm text-heritage-sand/80 max-w-lg mx-auto">
          Schedule your 1-on-1 strategy consultation today. 100% credited toward your full planning engagement.
        </p>
        <button
          type="button"
          onClick={() => onOpenBooking('venue')}
          className="bg-heritage-sand text-heritage-emerald px-8 py-4 text-xs uppercase tracking-luxury font-bold hover:bg-white transition-all shadow-xl inline-flex items-center gap-2"
        >
          <span>Book Consultation (From ₹2,999)</span>
          <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
        </button>
      </div>
    </div>
  );
};
