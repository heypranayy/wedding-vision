import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { navigationData } from '../content';
import type { ServiceType } from '../types';

interface HeaderProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-heritage-sand/95 backdrop-blur-md shadow-sm py-3.5 border-b border-heritage-emerald/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 md:h-12 flex items-center">
                <img
                  src={navigationData.brand.logoDark}
                  alt={navigationData.brand.logoAlt}
                  className="h-9 md:h-11 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('brand-text-fallback');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div id="brand-text-fallback" className="hidden">
                  <span className="font-serif text-2xl font-bold tracking-tight text-heritage-emerald">
                    {navigationData.brand.name}
                  </span>
                  <span className="block text-[9px] uppercase tracking-luxury text-heritage-gold font-mono">
                    {navigationData.brand.location}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation (4 links max from navigation.json) */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationData.links.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-xs uppercase tracking-luxury font-medium text-heritage-charcoal hover:text-heritage-emerald transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Direct Contact & Primary Booking Action */}
            <div className="hidden md:flex items-center space-x-5">
              <a
                href={`tel:${navigationData.contact.phoneRaw}`}
                className="flex items-center gap-2 text-xs font-mono font-medium text-heritage-emerald hover:text-heritage-emerald-deep transition-colors px-2.5 py-1.5"
                title="Call Weddings Vision Jaipur Office"
              >
                <Phone className="w-3.5 h-3.5 text-heritage-gold" />
                <span>{navigationData.contact.phone}</span>
              </a>

              <div className="flex flex-col items-end">
                <button
                  type="button"
                  onClick={() => onOpenBooking('venue')}
                  className="inline-flex items-center gap-2 bg-heritage-emerald text-heritage-sand px-5 py-2.5 rounded-none text-xs uppercase tracking-luxury font-semibold hover:bg-heritage-emerald-deep transition-all duration-200 border border-heritage-emerald shadow-sm focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{navigationData.actions.bookDesktop}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
                </button>
                <span className="text-[9px] font-mono text-heritage-muted mt-0.5">
                  {navigationData.actions.bookBadge}
                </span>
              </div>
            </div>

            {/* Mobile Actions: Phone, WhatsApp, Book & Menu */}
            <div className="flex items-center md:hidden gap-2">
              <a
                href={`tel:${navigationData.contact.phoneRaw}`}
                className="p-2 text-heritage-emerald hover:bg-heritage-emerald/10 border border-heritage-emerald/20 transition-colors"
                aria-label="Direct Phone Call to Jaipur Office"
              >
                <Phone className="w-4 h-4 text-heritage-emerald" />
              </a>

              <a
                href={navigationData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-emerald-700 hover:bg-emerald-50 border border-emerald-600/30 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking('venue')}
                className="bg-heritage-emerald text-heritage-sand px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold"
              >
                {navigationData.actions.bookMobile}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-heritage-charcoal hover:text-heritage-emerald focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-heritage-sand/98 flex flex-col justify-between p-6 pt-24 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-heritage-charcoal"
            aria-label="Close Menu"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-luxury text-heritage-gold">
              Navigation
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                Home
              </Link>
              <Link
                to="/venue-consultation"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                Rajasthan Venue Advisory
              </Link>
              <Link
                to="/wedding-consultation"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                Full Wedding Planning
              </Link>
              <Link
                to="/services"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                All 8 Services
              </Link>
              <Link
                to="/about"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                Heritage & Team
              </Link>
              <Link
                to="/contact"
                className="font-serif text-2xl text-heritage-emerald hover:text-heritage-emerald-deep"
              >
                Jaipur Office & Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-heritage-emerald/15">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('venue');
              }}
              className="w-full bg-heritage-emerald text-heritage-sand py-3 text-xs uppercase tracking-luxury font-medium text-center flex items-center justify-center gap-2"
            >
              <span>{navigationData.actions.bookDesktop}</span>
              <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
            </button>

            <a
              href={navigationData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-heritage-emerald/30 text-heritage-emerald py-3 text-xs uppercase tracking-luxury font-medium text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="text-center text-[11px] font-mono text-heritage-muted">
              Jaipur: {navigationData.contact.phone}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
