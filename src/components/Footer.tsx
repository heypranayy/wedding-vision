import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Instagram, Facebook } from 'lucide-react';
import { homepageData, navigationData } from '../content';
import type { ServiceType } from '../types';

interface FooterProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { footer } = homepageData;

  return (
    <footer className="bg-heritage-emerald-deep text-heritage-sand pt-16 pb-24 md:pb-16 border-t border-heritage-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-heritage-sand/10">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
              {footer.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-heritage-sand font-light leading-snug">
              {footer.heading}
            </h2>
            <p className="text-heritage-sand/70 text-sm leading-relaxed max-w-md font-light">
              {footer.description}
            </p>

            {/* Verified Awards & Ratings */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={homepageData.hero.proof.weddingWireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-heritage-sand/5 border border-heritage-gold/30 px-3 py-1.5 hover:bg-heritage-sand/10 transition-colors"
                title="View verified client reviews on WeddingWire"
              >
                <img
                  src="/assets/badge-rated-10.png"
                  alt="WeddingWire 5.0 Star Rating"
                  className="h-6 w-auto object-contain"
                />
                <span className="text-[11px] font-mono text-heritage-sand/90">
                  {homepageData.hero.proof.rating}
                </span>
                <ArrowUpRight className="w-3 h-3 text-heritage-gold" />
              </a>

              <div className="inline-flex items-center gap-2 bg-heritage-sand/5 border border-heritage-gold/30 px-3 py-1.5">
                <ShieldCheck className="w-4 h-4 text-heritage-gold" />
                <span className="text-[11px] font-mono text-heritage-sand/90">
                  {homepageData.hero.proof.award}
                </span>
              </div>
            </div>
          </div>

          {/* Paid Consultations Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
              Paid Advisory Sessions
            </span>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('venue')}
                  className="text-left group flex items-start justify-between w-full hover:text-heritage-gold transition-colors focus-visible:ring-2 focus-visible:ring-heritage-gold p-1"
                >
                  <div>
                    <span className="block font-medium text-heritage-sand group-hover:text-heritage-gold">
                      {homepageData.twoPaths.panelA.title}
                    </span>
                    <span className="text-xs text-heritage-sand/60">
                      {homepageData.twoPaths.panelA.duration} • {homepageData.twoPaths.panelA.priceFormatted}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold mt-1" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('wedding')}
                  className="text-left group flex items-start justify-between w-full hover:text-heritage-gold transition-colors focus-visible:ring-2 focus-visible:ring-heritage-gold p-1"
                >
                  <div>
                    <span className="block font-medium text-heritage-sand group-hover:text-heritage-gold">
                      {homepageData.twoPaths.panelB.title}
                    </span>
                    <span className="text-xs text-heritage-sand/60">
                      {homepageData.twoPaths.panelB.duration} • {homepageData.twoPaths.panelB.priceFormatted}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold mt-1" />
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-heritage-gold/80 italic font-light">
              {footer.creditTerms}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-heritage-sand/80">
              {navigationData.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.href} className="hover:text-heritage-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
              Jaipur Headquarters
            </span>
            <div className="space-y-2.5 text-xs text-heritage-sand/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-heritage-gold shrink-0 mt-0.5" />
                <span>{footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-heritage-gold shrink-0" />
                <a href={`tel:${footer.phoneRaw}`} className="hover:text-heritage-gold transition-colors">
                  {footer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-heritage-gold shrink-0" />
                <a href={`mailto:${footer.email}`} className="hover:text-heritage-gold transition-colors">
                  {footer.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={footer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-heritage-sand/10 hover:bg-heritage-gold/20 text-heritage-sand hover:text-heritage-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={footer.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-heritage-sand/10 hover:bg-heritage-gold/20 text-heritage-sand hover:text-heritage-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Micro Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-heritage-sand/50 gap-4">
          <div>
            © {new Date().getFullYear()} {navigationData.brand.name}. {footer.copyright}
          </div>
          <div className="flex items-center space-x-6 text-[11px] font-mono">
            {footer.badges.map((b, idx) => (
              <span key={idx}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

