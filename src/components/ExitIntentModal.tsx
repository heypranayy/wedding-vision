import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { analytics } from '../lib/analytics';
import { homepageData, navigationData } from '../content';
import type { Lead } from '../types';

export const ExitIntentModal: React.FC = () => {
  const { exitPrompt } = homepageData;
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [hasScrolledMeaningfully, setHasScrolledMeaningfully] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if dismissed before in this session
    const dismissed = sessionStorage.getItem('wv_exit_modal_dismissed');
    if (dismissed) return;

    // Track scroll depth > 55%
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollRatio = window.scrollY / scrollHeight;
      if (scrollRatio > 0.55) {
        setHasScrolledMeaningfully(true);
      }
    };

    // Track mouse leaving desktop viewport towards top (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && hasScrolledMeaningfully) {
        const alreadyShown = sessionStorage.getItem('wv_exit_modal_shown');
        if (!alreadyShown) {
          setIsOpen(true);
          sessionStorage.setItem('wv_exit_modal_shown', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasScrolledMeaningfully]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('wv_exit_modal_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');

    // Save lead record to localStorage for drop-off recovery
    const leadRecord: Lead = {
      id: `lead_exit_${Date.now()}`,
      fullName: 'Exit Prompt Lead',
      phone: cleanPhone,
      serviceType: 'venue',
      sourceCta: 'exit_intent_price_guide',
      status: 'lead_captured',
      createdAt: new Date().toISOString(),
      lastActiveStep: 2,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('wv_leads') || '[]');
      existing.push(leadRecord);
      localStorage.setItem('wv_leads', JSON.stringify(existing));
    } catch {
      // ignore storage quota issues
    }

    analytics.ctaClick(exitPrompt.buttonText, 'exit_modal', 'venue');
    setIsSubmitted(true);

    // Auto open WhatsApp link after 1.5s
    setTimeout(() => {
      const waUrl = `https://wa.me/${navigationData.contact.phoneRaw.replace(/\D/g, '')}?text=Hi%20Hemraj,%20please%20send%20me%20the%20Rajasthan%20Palace%20Venue%20%26%20Sound%20Curfew%20Guide%20to%20my%20number%20${cleanPhone}.`;
      window.open(waUrl, '_blank');
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 bg-heritage-charcoal-deep/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white border border-heritage-gold/50 shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 text-heritage-charcoal"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-heritage-muted hover:text-heritage-emerald transition-colors focus-visible:ring-2 focus-visible:ring-heritage-emerald"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-heritage-sand-dark border border-heritage-emerald/20 text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold">
                <span>{exitPrompt.eyebrow}</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-heritage-charcoal font-normal leading-tight">
                  {exitPrompt.heading}
                </h3>
                <p className="text-xs text-heritage-muted leading-relaxed font-light">
                  {exitPrompt.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div>
                  <label htmlFor="exit-phone" className="block text-[11px] font-mono uppercase tracking-wider text-heritage-charcoal font-semibold mb-1">
                    {exitPrompt.inputLabel}
                  </label>
                  <div className="flex border border-heritage-emerald/30 focus-within:border-heritage-emerald">
                    <span className="bg-heritage-sand-dark px-3 py-3 text-xs font-mono text-heritage-charcoal flex items-center border-r border-heritage-emerald/20">
                      +91
                    </span>
                    <input
                      id="exit-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={exitPrompt.inputPlaceholder}
                      className="w-full px-3 py-3 text-sm font-mono bg-white focus:outline-none"
                      maxLength={15}
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-[11px] text-red-600 font-mono mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-heritage-emerald text-heritage-sand py-3.5 px-4 text-xs uppercase tracking-luxury font-bold hover:bg-heritage-emerald-deep transition-all flex items-center justify-center gap-2 shadow focus-visible:ring-2 focus-visible:ring-heritage-emerald"
                >
                  <span>{exitPrompt.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-heritage-gold" />
                </button>
              </form>

              <div className="flex items-center gap-2 text-[10px] font-mono text-heritage-muted pt-1 border-t border-heritage-sand-dark">
                <ShieldCheck className="w-3.5 h-3.5 text-heritage-emerald shrink-0" />
                <span>{exitPrompt.trustText}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-heritage-emerald rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-heritage-emerald">
                Check Your WhatsApp!
              </h3>
              <p className="text-xs text-heritage-muted max-w-xs mx-auto">
                We're dispatching the 2026 Rajasthan Palace Curfew & Cost Guide to <strong>+91 {phone}</strong>.
              </p>
              <a
                href={`https://wa.me/${navigationData.contact.phoneRaw.replace(/\D/g, '')}?text=Hi%20Hemraj,%20I%20requested%20the%20Rajasthan%20Palace%20Guide%20for%20my%20number%20${phone}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Open WhatsApp Chat Directly</span>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

