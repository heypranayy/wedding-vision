import React from 'react';
import { ExternalLink, Award, AlertCircle } from 'lucide-react';
import { homepageData } from '../content';

export const ProofStripSection: React.FC = () => {
  const { proofStrip } = homepageData;

  return (
    <section className="bg-heritage-sand-dark py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-y border-heritage-emerald/15">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
              {proofStrip.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-light mt-1">
              {proofStrip.heading}
            </h2>
          </div>
          <a
            href={proofStrip.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-heritage-emerald hover:underline font-semibold"
          >
            <span>{proofStrip.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-heritage-gold" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofStrip.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-heritage-emerald/15 flex flex-col justify-between shadow-sm relative space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-heritage-charcoal">
                    {rev.client}
                  </span>
                  <span className="text-xs font-mono font-bold text-heritage-gold">
                    {rev.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-heritage-muted border-b pb-2">
                  <span>{rev.venue}</span>
                  <span>Date: {rev.date}</span>
                </div>

                <p className="text-xs text-heritage-charcoal/90 leading-relaxed italic font-light">
                  "{rev.quote}"
                </p>
              </div>

              {/* Transparency Flag for Historical Reviews */}
              {rev.isStale && rev.staleTag && (
                <div className="pt-2 border-t flex items-center gap-1.5 text-[10px] font-mono text-amber-800 bg-amber-50 p-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                  <span>{rev.staleTag}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Proof Element Near CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left text-xs font-mono text-heritage-charcoal pt-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-heritage-gold" />
            <span>{proofStrip.proof.award}</span>
          </div>
          <span className="hidden sm:inline text-heritage-muted">•</span>
          <span>{proofStrip.proof.authentication}</span>
        </div>
      </div>
    </section>
  );
};
