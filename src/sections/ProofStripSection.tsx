import React, { useRef, useEffect } from 'react';
import { Star, Quote, Award, ExternalLink, Sparkles } from 'lucide-react';
import { homepageData } from '../content';

// Import Swiper and Swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

export const ProofStripSection: React.FC = () => {
  const { proofStrip } = homepageData;

  // Duplicate items for smooth continuous loop
  const allReviews = [...proofStrip.reviews, ...proofStrip.reviews];

  return (
    <section 
      id="testimonials"
      className="py-16 md:py-24 bg-gradient-to-b from-heritage-sand to-[#FAF7F2] border-y border-heritage-emerald/10 relative overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-heritage-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-emerald/5 border border-heritage-emerald/15 text-heritage-emerald text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold-antique" />
            <span className="uppercase tracking-wider font-semibold">{proofStrip.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-heritage-emerald font-medium tracking-tight">
            {proofStrip.heading}
          </h2>

          <p className="text-xs sm:text-sm text-heritage-muted font-sans font-light">
            Genuine notes and ratings from couples who celebrated with Weddings Vision.
          </p>
        </div>

      </div>

      {/* Full-Width Draggable Continuous Slideshow with Swiper */}
      <div className="mt-8 relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Left & Right Smooth Gradient Fade Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-heritage-sand via-heritage-sand/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20 pointer-events-none" />

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
          }}
          speed={7000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView="auto"
          spaceBetween={24}
          grabCursor={true}
          className="swiper-continuous w-full py-4 px-4 sm:px-6"
        >
          {allReviews.map((rev, idx) => (
            <SwiperSlide 
              key={idx} 
              className="!w-[340px] sm:!w-[380px] md:!w-[410px] !h-[270px] flex"
            >
              <div className="w-full h-full bg-white rounded-3xl p-6 sm:p-7 border border-heritage-emerald/15 shadow-sm flex flex-col justify-between group relative">
                <div className="space-y-3.5">
                  {/* Top Row: User DP & Google Rating Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Reviewer DP Avatar */}
                      <div className="relative">
                        <img
                          src={rev.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.client)}&background=1a484c&color=FAF7F2`}
                          alt={rev.client}
                          className="w-10 h-10 rounded-full object-cover border border-heritage-emerald/20 shadow-xs"
                          loading="lazy"
                        />
                        {/* Google Icon Badge on DP */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs border border-gray-100">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Name & Source */}
                      <div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-heritage-charcoal leading-tight">
                          {rev.client}
                        </h4>
                        <span className="text-[10px] font-mono text-heritage-muted block">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    {/* 5.0 Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-heritage-charcoal/85 leading-relaxed font-sans font-light line-clamp-3 pt-1">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-3 border-t border-heritage-sand-dark flex items-center justify-between text-[11px] font-mono text-heritage-muted">
                  <div className="flex items-center gap-1.5 text-heritage-emerald font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{rev.location}</span>
                  </div>
                  <span className="text-heritage-gold font-medium">
                    Verified Google Review
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Proof Bar & WeddingWire Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-heritage-emerald/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-heritage-charcoal">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-heritage-sand text-heritage-gold flex items-center justify-center shrink-0 border border-heritage-gold/30">
              <Award className="w-4 h-4 text-heritage-emerald" />
            </div>
            <div>
              <strong className="font-semibold text-heritage-charcoal">{proofStrip.proof.award}</strong>
              <span className="text-heritage-muted ml-2 hidden md:inline">({proofStrip.proof.authentication})</span>
            </div>
          </div>

          <a
            href={proofStrip.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-heritage-emerald/5 hover:bg-heritage-emerald text-heritage-emerald hover:text-white border border-heritage-emerald/20 transition-all font-mono text-xs font-semibold shrink-0"
          >
            <span>{proofStrip.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
