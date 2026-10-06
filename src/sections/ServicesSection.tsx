import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, RotateCw, CheckCircle2, Sparkles } from 'lucide-react';
import type { ServiceType } from '../types';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  scope: string;
  image: string;
  summary: string;
  highlights: string[];
  serviceType: ServiceType;
}

const servicesData: ServiceItem[] = [
  {
    id: 'full-wedding-planning',
    title: 'Full Wedding Planning',
    scope: 'Complete Guidance',
    image: '/assets/service-wedding-planning.jpg',
    summary:
      'We guide you from your very first ideas to the final farewell. From vendor management and schedule planning to day-of coordination, we take care of every detail.',
    highlights: [
      'Personalized budget planning & price negotiations',
      'Ritual timelines & ceremony choreography',
      'Dedicated lead planner & on-ground execution crew'
    ],
    serviceType: 'wedding',
  },
  {
    id: 'destination-weddings',
    title: 'Destination Weddings',
    scope: 'Travel & Hospitality',
    image: '/assets/service-destination-weddings.jpg',
    summary:
      'Effortless destination celebrations across Jaipur, Udaipur, Jodhpur, and beyond. We handle guest airport pickups, room bookings, and warm welcomes.',
    highlights: [
      'Airport welcome concierges & charter transport',
      'Palace room allocations & check-in coordination',
      'Multi-venue travel & luggage distribution'
    ],
    serviceType: 'wedding',
  },
  {
    id: 'event-design-decor',
    title: 'Event Design & Décor',
    scope: 'Décor & Styling',
    image: '/assets/service-event-decor.jpg',
    summary:
      'Beautiful mandaps, lavish floral arrangements, warm lighting, and traditional Rajasthani elegance brought together to create a breathtaking celebration setting.',
    highlights: [
      'Bespoke mood boards & stage designs',
      'Exotic floral structures & heritage canopies',
      'Ambient lighting & royal table settings'
    ],
    serviceType: 'wedding',
  },
  {
    id: 'guest-management',
    title: 'Guest Management',
    scope: 'Warm Hospitality',
    image: '/assets/service-guest-management.jpg',
    summary:
      'Welcoming your loved ones with traditional royal hospitality—dhol, flowers, and attentive assistance throughout their stay to make them feel truly cherished.',
    highlights: [
      '24/7 guest assistance desks at hotel lobbies',
      'Digital itineraries & RSVP coordination',
      'Royal aarti, tikka & traditional music welcome'
    ],
    serviceType: 'wedding',
  },
  {
    id: 'catering-menu-planning',
    title: 'Catering & Menu Planning',
    scope: 'Food & Dining',
    image: '/assets/service-catering-menu.jpg',
    summary:
      'Curating unforgettable wedding feasts featuring authentic Rajasthani delicacies, live food counters, and multi-cuisine menus loved by all your guests.',
    highlights: [
      'Authentic regional delicacies & global culinary menus',
      'Live interactive chaat & gourmet food stations',
      'Menu tasting curation & portions management'
    ],
    serviceType: 'wedding',
  },
  {
    id: 'entertainment-management',
    title: 'Entertainment Management',
    scope: 'Music & Performances',
    image: '/assets/service-entertainment.jpg',
    summary:
      'Bringing your celebrations to life with folk dancers, soulful live singers, energetic sangeet DJs, and music that keeps the dance floor packed all night.',
    highlights: [
      'Folk ensembles, Sufi vocalists & celebrity DJs',
      'State-of-the-art sound setup & required permits',
      'High-energy sangeet choreography & entertainment'
    ],
    serviceType: 'wedding',
  },
];

interface ServicesSectionProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll width
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 60);
      };

      gsap.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 200, 1200)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FBF9F4] border-t border-heritage-gold/30 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Subtle jaali architectural watermark */}
      <div className="absolute inset-0 jaali-watermark opacity-25 pointer-events-none" />

      {/* Centered Heading in the Middle */}
      <div className="w-full text-center px-4 pt-4 pb-6 sm:pb-8 relative z-10">
        <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-emerald font-semibold block">
          Tailored, Stress-Free Weddings
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-semibold text-heritage-emerald tracking-tight mt-1">
          Our Services
        </h2>
      </div>

      {/* Horizontal GSAP Pin-Scrolled Track (Full Width) */}
      <div className="w-full overflow-hidden relative z-10">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-16 w-max py-2"
        >
          {/* First Card: Tailored Stress-Free Weddings Editorial Card (Same Width & Height) */}
          <div className="w-[320px] sm:w-[360px] md:w-[380px] h-[480px] sm:h-[500px] shrink-0 rounded-3xl p-8 bg-gradient-to-br from-heritage-emerald via-heritage-emerald to-heritage-emerald-deep text-heritage-sand border border-heritage-emerald-deep flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-heritage-gold/40 flex items-center justify-center text-heritage-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-3xl pt-10 sm:text-4xl font-semibold leading-tight text-heritage-sand">
                Tailored, Stress-Free Weddings
              </h3>
              <p className="font-sans text-xs sm:text-sm text-heritage-sand/80 leading-relaxed font-light">
                Every celebration is an architectural masterpiece. We orchestrate all logistics with complete financial transparency and regal precision.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15">
              <button
                type="button"
                onClick={() => onOpenBooking('wedding')}
                className="w-full py-3.5 px-4 bg-heritage-gold text-heritage-charcoal hover:bg-white hover:text-heritage-emerald rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Plan Your Wedding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service Cards with 3D Flip (Matching exact height and width as the first card) */}
          {servicesData.map((service) => {
            const isFlipped = !!flippedCards[service.id];

            return (
              <div
                key={service.id}
                className="w-[320px] sm:w-[360px] md:w-[380px] h-[480px] sm:h-[500px] shrink-0"
                style={{ perspective: '1200px' }}
              >
                {/* 3D Flippable Container (Full Height & Width) */}
                <div
                  className="relative w-full h-full rounded-3xl cursor-pointer transition-transform duration-700 select-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  onClick={() => toggleFlip(service.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${service.title} details. Click to flip.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFlip(service.id);
                    }
                  }}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-heritage-gold/40 bg-heritage-charcoal flex flex-col justify-end"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Full Card Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Dramatic Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

                    {/* Top Scope Tag & Flip Icon */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-heritage-gold border border-heritage-gold/30">
                        {service.scope}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-heritage-emerald transition-colors">
                        <RotateCw className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Service Name Under the Image (Inside the card) */}
                    <div className="relative p-6 space-y-1.5 z-10">
                      <h3 className="font-serif text-4xl sm:text-4xl font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* BACK SIDE (3D Flipped 180deg) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 bg-heritage-emerald text-heritage-sand border border-heritage-gold flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="space-y-4">
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/30">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-gold font-semibold">
                          {service.scope}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(service.id, e)}
                          className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-heritage-emerald transition-colors"
                          aria-label="Flip back"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl font-bold text-heritage-sand leading-tight">
                        {service.title}
                      </h3>

                      {/* Summary */}
                      <p className="font-sans text-xs sm:text-sm text-heritage-sand/85 leading-relaxed font-light">
                        {service.summary}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] font-mono uppercase text-heritage-gold tracking-wider block">
                          What We Deliver
                        </span>
                        {service.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-heritage-sand/90">
                            <CheckCircle2 className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back Action CTA */}
                    <div className="pt-3 border-t border-heritage-gold/30">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(service.serviceType);
                        }}
                        className="w-full py-3 px-4 bg-heritage-gold hover:bg-white text-heritage-charcoal hover:text-heritage-emerald rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Inquire About This</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
