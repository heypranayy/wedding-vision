import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ArrowUpRight,
  MessageCircle,
  Search,
  ChevronDown,
  Sparkles,
  Building2,
} from 'lucide-react';
import { navigationData, venuesData } from '../content';
import type { ServiceType } from '../types';

interface HeaderProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'venues' | 'services' | null>(null);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  // Mega menu hover handlers with slight delay for silky smooth interaction
  const handleMouseEnter = (menu: 'venues' | 'services') => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  // Filtered venues for search
  const filteredVenues = venuesData.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.archetype.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  return (
    <>
      {/* Top Banner / Announcement Bar (Loverly-style with Rajasthan Heritage Palette) */}
      <div className="bg-heritage-emerald-deep text-heritage-sand text-[11px] font-mono relative z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 tracking-normal uppercase text-[10px] text-heritage-gold">
            <Sparkles className="w-3 h-3 text-heritage-gold shrink-0 animate-pulse" />
            <span className="hidden sm:inline">Rajasthan Wedding Season 2026/27</span>
            <span className="hidden md:inline text-heritage-sand/40">•</span>
            <span className="text-heritage-sand/90 normal-case tracking-normal font-sans text-xs">
              Direct Palace Slot Booking & Objective Advisory
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${navigationData.contact.phoneRaw}`}
              className="hover:text-heritage-gold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-heritage-gold" />
              <span className="font-mono text-[11px]">{navigationData.contact.phone}</span>
            </a>
            <span className="text-heritage-gold/40">|</span>
            <a
              href={navigationData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px] text-emerald-300 font-sans"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-heritage-sand/98 backdrop-blur-md shadow-regal py-2.5'
          : 'bg-heritage-sand py-4'
          }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Left: Brand Logo & Tagline */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 md:h-12 flex items-center">
                <img
                  src={navigationData.brand.logoDark}
                  alt={navigationData.brand.logoAlt}
                  className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
                  <span className="block text-[9px] uppercase tracking-normal text-heritage-gold font-mono">
                    {navigationData.brand.location}
                  </span>
                </div>
              </div>
            </Link>

            {/* Middle: Loverly-style Desktop Navigation Bar with Mega Menus */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* Home Link */}
              <Link
                to="/"
                className="px-3 py-2 text-xs uppercase tracking-normal font-medium text-heritage-charcoal hover:text-heritage-emerald transition-colors rounded hover:bg-heritage-gold/10"
              >
                Home
              </Link>

              {/* Venues Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('venues')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/venue-consultation"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-normal font-medium transition-colors rounded ${activeMegaMenu === 'venues'
                    ? 'text-heritage-emerald bg-heritage-gold/15'
                    : 'text-heritage-charcoal hover:text-heritage-emerald hover:bg-heritage-gold/10'
                    }`}
                >
                  <span>Venues</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'venues' ? 'rotate-180 text-heritage-emerald' : 'text-heritage-muted'
                      }`}
                  />
                </Link>

                {/* Mega Dropdown for Venues */}
                {activeMegaMenu === 'venues' && (
                  <div
                    className="absolute top-full left-0 -ml-16 w-[640px] bg-heritage-sand border border-heritage-gold/30 shadow-regal-lg p-6 rounded-none z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                    onMouseEnter={() => handleMouseEnter('venues')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {/* Column 1: Featured Palaces */}
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-normal text-heritage-emerald font-bold mb-3 pb-1 border-b border-heritage-gold/30 flex items-center justify-between">
                          <span>Signature Royal Palaces</span>
                          <span className="text-[9px] text-heritage-gold font-sans lowercase">curated</span>
                        </div>
                        <ul className="space-y-2.5">
                          {venuesData.slice(0, 4).map((venue) => (
                            <li key={venue.id}>
                              <Link
                                to={`/#venue-showcase`}
                                className="group block p-2 -mx-2 hover:bg-heritage-gold/10 rounded transition-colors"
                              >
                                <div className="text-xs font-serif font-bold text-heritage-charcoal group-hover:text-heritage-emerald flex items-center justify-between">
                                  <span>{venue.name}</span>
                                  <span className="text-[10px] font-mono text-heritage-gold font-normal">
                                    {venue.city}
                                  </span>
                                </div>
                                <p className="text-[11px] text-heritage-muted line-clamp-1 mt-0.5">
                                  {venue.archetype}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Regions & Venue Advisory CTA */}
                      <div className="bg-heritage-sand-dark/60 p-4 border border-heritage-gold/20 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-normal text-heritage-emerald font-bold mb-2">
                            Top Rajasthan Hubs
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {['Jaipur (Pink City)', 'Udaipur (Lakes)', 'Jodhpur (Blue City)', 'Jaisalmer (Dunes)', 'Pushkar & Ranthambore'].map(
                              (hub, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono bg-heritage-sand px-2 py-1 text-heritage-charcoal border border-heritage-gold/30"
                                >
                                  {hub}
                                </span>
                              )
                            )}
                          </div>
                          <p className="text-xs text-heritage-muted leading-relaxed font-sans mb-3">
                            Unbiased rate negotiations, hidden cost audits & direct palace date holds.
                          </p>
                        </div>

                        <Link
                          to="/venue-consultation"
                          className="inline-flex items-center justify-center gap-2 bg-heritage-emerald text-heritage-sand px-3 py-2 text-[11px] font-mono uppercase tracking-normal hover:bg-heritage-emerald-deep transition-colors w-full"
                        >
                          <span>Explore Venue Advisory</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-normal font-medium transition-colors rounded ${activeMegaMenu === 'services'
                    ? 'text-heritage-emerald bg-heritage-gold/15'
                    : 'text-heritage-charcoal hover:text-heritage-emerald hover:bg-heritage-gold/10'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'services' ? 'rotate-180 text-heritage-emerald' : 'text-heritage-muted'
                      }`}
                  />
                </Link>

                {/* Mega Dropdown for Services */}
                {activeMegaMenu === 'services' && (
                  <div
                    className="absolute top-full -left-20 w-[580px] bg-heritage-sand border border-heritage-gold/30 shadow-regal-lg p-6 rounded-none z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-5">
                      <Link
                        to="/venue-consultation"
                        className="group p-3 border border-heritage-gold/30 hover:border-heritage-emerald hover:bg-heritage-gold/10 transition-all"
                      >
                        <div className="w-7 h-7 bg-heritage-emerald/10 text-heritage-emerald flex items-center justify-center mb-2.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="font-serif text-base font-bold text-heritage-charcoal group-hover:text-heritage-emerald mb-1">
                          Venue Advisory & Scouting
                        </div>
                        <p className="text-[11px] text-heritage-muted leading-relaxed">
                          Rate audits, date locks, food & beverage contract scrutinies for 30+ Rajasthan palaces.
                        </p>
                      </Link>

                      <Link
                        to="/wedding-consultation"
                        className="group p-3 border border-heritage-gold/30 hover:border-heritage-emerald hover:bg-heritage-gold/10 transition-all"
                      >
                        <div className="w-7 h-7 bg-heritage-gold/20 text-heritage-emerald flex items-center justify-center mb-2.5">
                          <Sparkles className="w-4 h-4 text-heritage-gold-dark" />
                        </div>
                        <div className="font-serif text-base font-bold text-heritage-charcoal group-hover:text-heritage-emerald mb-1">
                          Full Wedding Planning
                        </div>
                        <p className="text-[11px] text-heritage-muted leading-relaxed">
                          End-to-end royal wedding direction, guest hospitality logistics, decor, and artists.
                        </p>
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-heritage-gold/20 flex items-center justify-between text-xs">
                      <span className="text-heritage-muted text-[11px]">Need custom bridal advisory?</span>
                      <Link
                        to="/services"
                        className="font-mono text-[11px] uppercase tracking-normal text-heritage-emerald font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View All 8 Deliverables</span>
                        <ArrowUpRight className="w-3 h-3 text-heritage-gold" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Planning Guide / Advisory Link */}
              <Link
                to="/wedding-consultation"
                className="px-3 py-2 text-xs uppercase tracking-normal font-medium text-heritage-charcoal hover:text-heritage-emerald transition-colors rounded hover:bg-heritage-gold/10"
              >
                Planning
              </Link>

              {/* About Link */}
              <Link
                to="/about"
                className="px-3 py-2 text-xs uppercase tracking-normal font-medium text-heritage-charcoal hover:text-heritage-emerald transition-colors rounded hover:bg-heritage-gold/10"
              >
                Heritage & Team
              </Link>

              {/* Contact Link */}
              <Link
                to="/contact"
                className="px-3 py-2 text-xs uppercase tracking-normal font-medium text-heritage-charcoal hover:text-heritage-emerald transition-colors rounded hover:bg-heritage-gold/10"
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search Bar, Call & Consultation CTA (Loverly-style utility bar) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Loverly Search Bar / Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-heritage-charcoal hover:text-heritage-emerald hover:bg-heritage-gold/10 transition-colors flex items-center gap-1.5"
                  aria-label="Search venues and planning guides"
                  title="Search Palaces & Venues"
                >
                  <Search className="w-4 h-4 text-heritage-emerald" />
                  <span className="hidden xl:inline text-xs font-sans text-heritage-muted">Search venues...</span>
                </button>

                {/* Search Popup Dropdown */}
                {searchOpen && (
                  <div className="absolute right-0 top-full mt-1 w-150 sm:w-96 bg-heritage-sand border border-heritage-gold/40 shadow-regal-lg rounded-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-heritage-gold/30">
                      <span className="text-[10px] font-mono uppercase tracking-normal text-heritage-emerald font-bold">
                        Search Rajasthan Venues
                      </span>
                      <button
                        type="button"
                        onClick={() => setSearchOpen(false)}
                        className="text-heritage-muted hover:text-heritage-charcoal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative mb-3">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Rambagh, Udaipur, Jaipur..."
                        className="w-full bg-heritage-sand-dark px-3 py-2 text-xs border border-heritage-gold/40 focus:outline-none focus:border-heritage-emerald font-sans text-heritage-charcoal placeholder:text-heritage-muted/60"
                      />
                      <Search className="w-3.5 h-3.5 text-heritage-muted absolute right-3 top-2.5 pointer-events-none" />
                    </div>

                    {/* Quick Results */}
                    <div className="space-y-1.5 max-h-56 overflow-y-auto">
                      {filteredVenues.length > 0 ? (
                        filteredVenues.map((v) => (
                          <Link
                            key={v.id}
                            to="/#venue-showcase"
                            onClick={() => setSearchOpen(false)}
                            className="block p-2 hover:bg-heritage-gold/15 transition-colors text-left"
                          >
                            <div className="text-xs font-serif font-bold text-heritage-charcoal flex justify-between">
                              <span>{v.name}</span>
                              <span className="font-mono text-[10px] text-heritage-gold font-normal">
                                {v.city}
                              </span>
                            </div>
                            <div className="text-[10px] text-heritage-muted">{v.capacityDisplay}</div>
                          </Link>
                        ))
                      ) : (
                        <div className="text-xs text-heritage-muted p-2 text-center font-sans">
                          No venues matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Booking CTA (Loverly-style high visibility action button) */}
              <button
                type="button"
                onClick={() => onOpenBooking('venue')}
                className="hidden sm:inline-flex items-center gap-2 bg-heritage-emerald text-heritage-sand px-4 py-2.5 text-xs uppercase tracking-normal font-semibold rounded-lg hover:bg-heritage-emerald-deep transition-all duration-200 border border-heritage-emerald shadow-sm hover:shadow-regal"
              >
                <span>{navigationData.actions.bookDesktop}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-heritage-charcoal hover:text-heritage-emerald hover:bg-heritage-gold/10 transition-colors focus:outline-none"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Loverly-style Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-heritage-sand flex flex-col justify-between p-6 pt-16 overflow-y-auto lg:hidden">
          <div className="flex items-center justify-between pb-4 border-b border-heritage-gold/30">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-heritage-emerald">
                {navigationData.brand.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-heritage-charcoal hover:text-heritage-emerald"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 my-6 flex-1">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Rajasthan Venues..."
                className="w-full bg-heritage-sand-dark px-3 py-2.5 text-xs border border-heritage-gold/40 focus:outline-none focus:border-heritage-emerald font-sans text-heritage-charcoal"
              />
              <Search className="w-4 h-4 text-heritage-muted absolute right-3 top-3" />
            </div>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1 border-b border-heritage-gold/15"
              >
                Home
              </Link>
              <Link
                to="/venue-consultation"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1 border-b border-heritage-gold/15 flex items-center justify-between"
              >
                <span>Rajasthan Palace Venues</span>
                <span className="text-[10px] font-mono uppercase tracking-normal text-heritage-gold font-sans">
                  Advisory
                </span>
              </Link>
              <Link
                to="/wedding-consultation"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1 border-b border-heritage-gold/15 flex items-center justify-between"
              >
                <span>Full Wedding Planning</span>
                <span className="text-[10px] font-mono uppercase tracking-normal text-heritage-gold font-sans">
                  Concierge
                </span>
              </Link>
              <Link
                to="/services"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1 border-b border-heritage-gold/15"
              >
                All 8 Services & Pricing
              </Link>
              <Link
                to="/about"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1 border-b border-heritage-gold/15"
              >
                Heritage & Curators
              </Link>
              <Link
                to="/contact"
                className="font-serif text-xl text-heritage-emerald hover:text-heritage-emerald-deep py-1"
              >
                Jaipur Office & Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Bottom CTA Area */}
          <div className="space-y-3 pt-4 border-t border-heritage-gold/30">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('venue');
              }}
              className="w-full bg-heritage-emerald text-heritage-sand py-3 text-xs uppercase tracking-normal font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{navigationData.actions.bookDesktop}</span>
              <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
            </button>

            <a
              href={navigationData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-emerald-600/40 text-emerald-800 bg-emerald-50/50 py-2.5 text-xs uppercase tracking-normal font-medium text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct Inquiry</span>
            </a>

            <div className="text-center text-[11px] font-mono text-heritage-muted pt-1">
              Jaipur Headquarters: {navigationData.contact.phone}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
