import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
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
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-12">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
          {faq.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light">
          {faq.heading}
        </h2>
        <p className="text-xs text-heritage-muted font-light">
          {faq.description}
        </p>
      </div>

      <div className="space-y-3">
        {faq.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-heritage-emerald/20 transition-colors overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleFaq(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-heritage-charcoal hover:text-heritage-emerald transition-colors focus-visible:ring-2 focus-visible:ring-heritage-emerald"
              aria-expanded={openFaq === idx}
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-heritage-gold transition-transform duration-200 shrink-0 ${
                  openFaq === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-heritage-muted leading-relaxed border-t border-heritage-sand-dark pt-3 font-light">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proof Element Near FAQ CTA */}
      <div className="mt-8 p-4 bg-heritage-sand-dark border border-heritage-emerald/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="text-xs font-mono text-heritage-charcoal">
          <MapPin className="w-3.5 h-3.5 text-heritage-emerald inline mr-1" />
          <span>{faq.proof.address}</span>
        </div>
        <a
          href={faq.proof.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.whatsappClick('faq_whatsapp', 'faq_question')}
          className="text-xs font-mono text-emerald-800 hover:underline font-semibold shrink-0"
        >
          {faq.proof.whatsappPrompt}
        </a>
      </div>
    </section>
  );
};
