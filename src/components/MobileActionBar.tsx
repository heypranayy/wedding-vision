import React from 'react';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { navigationData, homepageData } from '../content';
import type { ServiceType } from '../types';

interface MobileActionBarProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  const { mobileBar } = homepageData;

  return (
    <aside
      aria-label="Quick booking, call and inquiry actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-heritage-sand/95 backdrop-blur-md border-t border-heritage-emerald/20 px-3 py-2 shadow-2xl safe-area-bottom"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Phone Call (48px tap target) */}
        <a
          href={`tel:${navigationData.contact.phoneRaw}`}
          className="w-12 h-12 bg-white border border-heritage-emerald/30 text-heritage-emerald flex items-center justify-center shrink-0 active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-heritage-emerald"
          aria-label="Direct Phone Call to Weddings Vision Jaipur Office"
        >
          <Phone className="w-4 h-4 text-heritage-emerald" />
        </a>

        {/* WhatsApp Secondary CTA (48px tap target) */}
        <a
          href={navigationData.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 bg-white border border-emerald-700/30 text-emerald-800 font-medium text-xs flex items-center justify-center gap-1.5 px-2 active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-emerald-700"
          aria-label="Chat with Senior Wedding Planner on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate uppercase tracking-wider text-[11px] font-semibold">
            {mobileBar.whatsappLabel}
          </span>
        </a>

        {/* Primary Paid Consultation CTA (48px tap target) */}
        <button
          type="button"
          onClick={() => onOpenBooking('venue')}
          className="flex-[1.6] h-12 bg-heritage-emerald text-heritage-sand font-medium text-xs flex items-center justify-center gap-2 px-3 shadow-md active:scale-95 transition-transform border border-heritage-emerald-deep focus-visible:ring-2 focus-visible:ring-heritage-emerald"
          aria-label="Book a paid Rajasthan venue or wedding consultation"
        >
          <Calendar className="w-4 h-4 text-heritage-gold shrink-0" />
          <div className="text-left leading-tight truncate">
            <span className="block text-[11px] uppercase tracking-wider font-semibold">
              {mobileBar.bookTitle}
            </span>
            <span className="block text-[9px] text-heritage-gold font-mono">
              {mobileBar.bookSubtitle}
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
};


