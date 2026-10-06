import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Calendar, Video, FileCheck } from 'lucide-react';
import { homepageData } from '../content';
import type { ServiceType } from '../types';
import { analytics } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenBooking }) => {
  const { howItWorks } = homepageData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleStep1Click = () => {
    analytics.ctaClick(howItWorks.steps[0].actionText || 'Select Slot', 'how_it_works_step1', 'venue');
    analytics.bookingModalOpen('venue', 'how_it_works_step1');
    onOpenBooking('venue');
  };

  const stepIcons = [Calendar, Video, FileCheck];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray<HTMLElement>('.step-card');

    const ctx = gsap.context(() => {
      // Set initial states for cards 2 and 3
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            opacity: 0.25,
            y: 40,
            scale: 0.96,
            filter: 'blur(3px)',
          });
        } else {
          gsap.set(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          });
        }
      });

      // Pin the section while scrolling through each step
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.7,
          start: 'top top',
          end: '+=1800',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Reveal Step 2
      tl.to('.progress-fill', {
        width: '50%',
        duration: 0.8,
        ease: 'power1.inOut',
      }, 'step2')
        .to(cards[0], {
          opacity: 0.5,
          scale: 0.98,
          filter: 'blur(1px)',
          duration: 0.8,
          ease: 'power2.out',
        }, 'step2')
        .to(cards[1], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        }, 'step2')
        .to('.step-dot-1', {
          backgroundColor: '#C5A880',
          borderColor: '#C5A880',
          duration: 0.3,
        }, 'step2');

      // Reveal Step 3
      tl.to('.progress-fill', {
        width: '100%',
        duration: 0.8,
        ease: 'power1.inOut',
      }, 'step3')
        .to(cards[1], {
          opacity: 0.5,
          scale: 0.98,
          filter: 'blur(1px)',
          duration: 0.8,
          ease: 'power2.out',
        }, 'step3')
        .to(cards[2], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        }, 'step3')
        .to('.step-dot-2', {
          backgroundColor: '#C5A880',
          borderColor: '#C5A880',
          duration: 0.3,
        }, 'step3');

      // Final lingering pause at full completion
      tl.to({}, { duration: 0.4 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen w-full bg-heritage-emerald text-heritage-sand flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >

      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center relative z-10 space-y-8 md:space-y-10 my-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-normal tracking-tight">
            {howItWorks.heading}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-heritage-sand/80 max-w-lg mx-auto font-sans leading-relaxed">
            {howItWorks.description}
          </p>
        </div>


        {/* Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch"
        >
          {howItWorks.steps.map((step, idx) => {
            const StepIcon = stepIcons[idx] || Calendar;
            const isFirst = idx === 0;

            return (
              <div
                key={step.stepNum}
                className={`step-card rounded-2xl flex flex-col justify-between p-6 sm:p-7 transition-shadow duration-300 relative group overflow-hidden border ${isFirst
                  ? 'bg-gradient-to-b from-[#184448] to-heritage-emerald-deep border-heritage-gold/60 shadow-xl cursor-pointer hover:border-heritage-gold'
                  : 'bg-[#153f43]/90 backdrop-blur-md border-white/15 shadow-lg hover:border-heritage-gold/40'
                  }`}
                onClick={isFirst ? handleStep1Click : undefined}
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-heritage-gold/0 via-heritage-gold/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Tag & Number */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-heritage-gold border border-white/10">
                      <StepIcon className="w-3.5 h-3.5" />
                      <span>{step.tag}</span>
                    </div>

                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white/40 group-hover:text-heritage-gold transition-colors">
                      {step.stepNum}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-heritage-gold transition-colors leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-heritage-sand/80 leading-relaxed font-sans font-light">
                    {step.description}
                  </p>
                </div>

                {/* Bottom CTA / Note */}
                <div className="pt-5 border-t border-white/10 mt-6 relative z-10">
                  {isFirst ? (
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-heritage-gold group-hover:text-white transition-colors">
                      <span className="uppercase tracking-wider">{step.actionText}</span>
                      <div className="w-7 h-7 rounded-full bg-heritage-gold/20 flex items-center justify-center group-hover:bg-heritage-gold group-hover:text-heritage-charcoal transition-all">
                        <ArrowUpRight className="w-4 h-4 text-heritage-gold group-hover:text-heritage-charcoal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-sans text-heritage-sand/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-heritage-gold" />
                      <span>{step.footerNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Proof Badge */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 bg-heritage-emerald-deep/90 backdrop-blur-sm px-5 py-2 rounded-full border border-heritage-gold/30 text-xs text-heritage-sand shadow-lg font-sans">
            <Sparkles className="w-4 h-4 text-heritage-gold shrink-0" />
            <span className="font-light">{howItWorks.proof}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
