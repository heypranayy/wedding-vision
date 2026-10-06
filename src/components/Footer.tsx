import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Heart
} from 'lucide-react';
import { homepageData, navigationData } from '../content';
import type { ServiceType } from '../types';

interface FooterProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { footer } = homepageData;

  const quickLinks = [
    { label: 'Venue Advisory (₹2,999)', action: () => onOpenBooking('venue'), isBooking: true },
    { label: 'Planning Blueprint (₹4,999)', action: () => onOpenBooking('wedding'), isBooking: true },
    { label: 'Palace Venues Showcase', href: '/#venue-showcase' },
    { label: 'Real Heritage Weddings', href: '/#real-weddings' },
    { label: 'Heritage & Our Team', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const palaceDestinations = [
    { name: 'Jaipur Heritage Palaces', href: '/#venue-showcase' },
    { name: 'Udaipur Lakeside Forts', href: '/#venue-showcase' },
    { name: 'Jodhpur Royal Havens', href: '/#venue-showcase' },
    { name: 'Pushkar Desert Resorts', href: '/#venue-showcase' },
    { name: 'Samode & Kumbhalgarh', href: '/#venue-showcase' },
  ];

  const planningServices = [
    { name: 'Full Wedding Planning', href: '/services' },
    { name: 'Destination Guest Hospitality', href: '/services' },
    { name: 'Event Design & Décor', href: '/services' },
    { name: 'Royal Catering & Menus', href: '/services' },
    { name: 'Folk Artists & Entertainment', href: '/services' },
  ];

  return (
    <footer className="bg-heritage-emerald-deep text-heritage-sand relative border-t border-heritage-gold/20 pt-16 pb-12 px-5 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-heritage-emerald/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main 4-Column Grid: Brand + Destinations + Services + Connect (Loverly architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">

          {/* Column 1: Brand, Mission & Social Icons (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide block">
                {navigationData.brand.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block mt-0.5">
                {navigationData.brand.location}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-heritage-sand/80 leading-relaxed font-sans font-light max-w-sm">
              {footer.description}
            </p>

            {/* Social Media Rounded Pills */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={footer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-heritage-gold text-heritage-sand hover:text-heritage-charcoal flex items-center justify-center transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={footer.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-heritage-gold text-heritage-sand hover:text-heritage-charcoal flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={homepageData.hero.proof.weddingWireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-heritage-gold text-xs font-mono border border-heritage-gold/30 transition-colors"
                title="View reviews on WeddingWire"
              >
                <Heart className="w-3.5 h-3.5 text-heritage-gold fill-heritage-gold/30" />
                <span className="text-[11px] font-sans text-heritage-sand">5.0 ★ Rated</span>
              </a>
            </div>

            {/* Credited Fee Notice Box */}
            <div className="bg-white/5 border border-heritage-gold/20 p-3.5 rounded-xl text-xs text-heritage-sand/85 max-w-sm space-y-1">
              <div className="flex items-center gap-1.5 text-heritage-gold font-mono text-[11px] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Fee Credit</span>
              </div>
              <p className="text-[11px] font-sans text-heritage-sand/75">
                {footer.creditTerms}
              </p>
            </div>
          </div>

          {/* Column 2: Palace Destinations (lg:col-span-3) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-heritage-gold font-semibold">
              Palace Destinations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-heritage-sand/80">
              {palaceDestinations.map((dest, idx) => (
                <li key={idx}>
                  <Link
                    to={dest.href}
                    className="hover:text-heritage-gold transition-colors block py-0.5"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Planning Services (lg:col-span-2) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-heritage-gold font-semibold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-heritage-sand/80">
              {planningServices.map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={service.href}
                    className="hover:text-heritage-gold transition-colors block py-0.5"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Consultations & Jaipur HQ (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-heritage-gold font-semibold">
              Jaipur Headquarters
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-heritage-sand/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                <span className="leading-snug">{footer.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-heritage-gold shrink-0" />
                <a href={`tel:${footer.phoneRaw}`} className="hover:text-heritage-gold transition-colors">
                  {footer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-heritage-gold shrink-0" />
                <a href={`mailto:${footer.email}`} className="hover:text-heritage-gold transition-colors">
                  {footer.email}
                </a>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking('venue')}
                className="w-full bg-white/10 hover:bg-heritage-gold text-white hover:text-heritage-charcoal border border-heritage-gold/40 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book 1-on-1 Session</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Massive Statement Typography (Guaranteed zero clipping with textLength scaling)
      <div className="w-full py-6 select-none border-y border-white/10 px-4 sm:px-8 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1900 240"
          className="w-full h-auto text-white/[0.12] hover:text-white/[0.22] transition-colors duration-500 block"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            textLength="1840"
            lengthAdjust="spacingAndGlyphs"
            className="font-serif fill-current font-light text-[210px]"
          >
            WEDDINGS VISION
          </text>
        </svg>
      </div> */}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Loverly-Style Bottom Bar: Copyright, Verification Badges & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-heritage-sand/60 gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>
              © {new Date().getFullYear()} {navigationData.brand.name}. All rights reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-heritage-sand/50">Zero Hidden Broker Markups</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-heritage-sand/70">
            {footer.badges.map((b, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{b}</span>
                {idx < footer.badges.length - 1 && <span className="text-heritage-gold/50">•</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
