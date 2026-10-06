import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "../../lib/utils";

export interface Skiper48Image {
  src: string;
  alt: string;
  name?: string;
  city?: string;
  capacity?: string;
  price?: string;
}

interface Carousel002Props {
  images: Skiper48Image[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}

const Carousel_002: React.FC<Carousel002Props> = ({
  images,
  className,
  showPagination = false,
  showNavigation = true,
  autoplay = false,
}) => {
  const css = `
  .Carousal_002 {
    padding-bottom: 24px !important;
    overflow: visible !important;
  }
  .Carousal_002 .swiper-slide {
    border-radius: 1.5rem !important;
    overflow: hidden;
    background: #FAF7F2;
    box-shadow: 0 25px 50px -12px rgba(26, 72, 76, 0.28);
    border: 1px solid rgba(197, 168, 128, 0.35);
    transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease !important;
  }
  /* Website Heritage Emerald Green Tint Overlay for Inactive Cards */
  .Carousal_002 .swiper-slide::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(26, 72, 76, 0.72) 0%, rgba(15, 41, 44, 0.82) 100%);
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.4s ease;
    z-index: 10;
  }
  /* Active main front card is full color without green overlay */
  .Carousal_002 .swiper-slide-active::after {
    opacity: 0;
  }
  .Carousal_002 .swiper-slide:not(.swiper-slide-active) {
    filter: saturate(0.85);
  }
  .skiper-nav-btn {
    width: 42px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FAF7F2;
    border: 1px solid rgba(197, 168, 128, 0.45);
    border-radius: 9999px;
    color: #1a484c;
    box-shadow: 0 4px 14px rgba(26, 72, 76, 0.12);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    user-select: none;
  }
  .skiper-nav-btn:hover {
    background: #1a484c;
    color: #FAF7F2;
    border-color: #1a484c;
    transform: scale(1.08);
  }
  .skiper-nav-btn:active {
    transform: scale(0.96);
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.15,
      }}
      className={cn("relative w-full flex flex-col items-center justify-center", className)}
    >
      <style>{css}</style>

      <Swiper
        autoplay={
          autoplay
            ? {
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
            : false
        }
        speed={600}
        touchRatio={1.2}
        resistanceRatio={0.7}
        effect="cards"
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 1.5,
          rotate: true,
          slideShadows: false,
        }}
        grabCursor={true}
        loop={false}
        rewind={true}
        pagination={
          showPagination
            ? {
              clickable: true,
            }
            : false
        }
        navigation={
          showNavigation
            ? {
              nextEl: ".skiper-button-next",
              prevEl: ".skiper-button-prev",
            }
            : false
        }
        className="Carousal_002 h-[520px] w-[330px] sm:h-[550px] sm:w-[370px] lg:h-[570px] lg:w-[400px]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative group select-none">
            <img
              className="h-full w-full object-cover filter saturate-[0.98] contrast-[1.02]"
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Floating Palace Info Badge (Visible primarily on active card) */}
            {image.name && (
              <div className="absolute bottom-4 left-3.5 right-3.5 p-3.5 bg-heritage-sand/95 backdrop-blur-md border border-heritage-gold/40 rounded-xl flex items-center justify-between z-20 shadow-md">
                <div className="pr-2">
                  <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold block">
                    {image.city || "Rajasthan"}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-semibold text-heritage-emerald block leading-tight mt-0.5">
                    {image.name}
                  </span>
                  {image.capacity && (
                    <span className="text-[11px] text-heritage-muted font-mono mt-0.5 block">
                      Capacity: {image.capacity}
                    </span>
                  )}
                </div>

                {image.price && (
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-heritage-muted block">
                      Starting
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-heritage-charcoal block">
                      {image.price}
                    </span>
                  </div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}

        {showNavigation && (
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="button"
              className="skiper-nav-btn skiper-button-prev"
              aria-label="Previous card"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="skiper-nav-btn skiper-button-next"
              aria-label="Next card"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_002, Carousel_002 as Skiper48 };
export default Carousel_002;
