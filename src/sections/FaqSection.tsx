import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Sparkles, HelpCircle } from 'lucide-react';
import { homepageData } from '../content';
import { analytics } from '../lib/analytics';

export const FaqSection: React.FC = () => {
  const { faq } = homepageData;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    const isOpening = openFaq !== index;
    setOpenFaq(isOpening ? index : null);
    analytics.faqToggle(faq.items[index].q, isOpening);
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FBF9F4] to-heritage-sand relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-heritage-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-5 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-emerald/5 border border-heritage-emerald/15 text-heritage-emerald text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold-antique" />
            <span className="uppercase tracking-wider font-semibold">{faq.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-heritage-emerald font-medium tracking-tight">
            {faq.heading}
          </h2>
        </div>

        {/* 2-Column Layout: Left Image + Right FAQ Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Atmospheric Heritage Image Card (lg:col-span-5) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-heritage-emerald/15">
              <img
                src="/assets/service-wedding-planning.jpg"
                alt="Rajasthan Heritage Wedding Ceremony"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-heritage-emerald font-semibold">
                  <HelpCircle className="w-4 h-4 text-heritage-gold" />
                  <span>Have questions before booking?</span>
                </div>
                <p className="text-xs text-heritage-muted font-sans font-light">
                  Speak directly with our senior wedding team. We are always happy to help guide you.
                </p>
                <a
                  href={faq.proof.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.whatsappClick('faq_image_card', 'faq_question')}
                  className="inline-flex items-center gap-2 pt-1 text-xs font-mono font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion Items (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-3.5">
            {faq.items.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${isOpen
                    ? 'bg-white border-heritage-emerald/30 shadow-md'
                    : 'bg-white/70 hover:bg-white border-heritage-emerald/10 hover:border-heritage-emerald/20 shadow-sm'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-heritage-charcoal hover:text-heritage-emerald transition-colors focus-visible:ring-2 focus-visible:ring-heritage-emerald cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-normal leading-snug">{item.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen ? 'bg-heritage-emerald text-white' : 'bg-heritage-sand text-heritage-charcoal'
                      }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-heritage-charcoal'
                          }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-heritage-muted leading-relaxed font-sans font-light border-t border-heritage-sand-dark/60 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Bottom Help Notice */}
            <div className="pt-2">
              <div className="p-4 bg-heritage-sand/80 rounded-2xl border border-heritage-emerald/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-heritage-charcoal font-sans">
                  {faq.proof.address}
                </span>
                <a
                  href={faq.proof.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.whatsappClick('faq_bottom_bar', 'faq_question')}
                  className="font-mono text-emerald-800 hover:text-emerald-950 font-bold shrink-0 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp a Senior Planner →</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
