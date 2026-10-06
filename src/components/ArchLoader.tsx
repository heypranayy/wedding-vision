import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchLoaderProps {
  onLoadingComplete?: () => void;
}

export const ArchLoader: React.FC<ArchLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToReveal, setIsReadyToReveal] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 5 seconds total luxury loader progress
    const totalDurationMs = 5000;
    const intervalMs = 50;
    const totalSteps = totalDurationMs / intervalMs;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPct = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentPct);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        // Seamlessly initiate reveal sequence without abrupt pauses
        setTimeout(() => {
          setIsReadyToReveal(true);
        }, 200);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  // Handle completion callback once zoom-out reveal animation has finished
  const handleAnimationComplete = () => {
    if (isReadyToReveal) {
      setIsFinished(true);
      onLoadingComplete?.();
    }
  };

  if (isFinished) return null;

  // Circular progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="arch-loader-overlay"
          initial={{ opacity: 1 }}
          animate={
            isReadyToReveal
              ? {
                opacity: 0,
                transition: {
                  duration: 1.5,
                  ease: [0.33, 1, 0.68, 1], // Smooth cubic-bezier
                  delay: 0.2, // Let the arch zoom lead before full fade
                },
              }
              : { opacity: 1 }
          }
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Solid base that fades away in perfect sync, letting hero shine through */}
          <motion.div
            className="absolute inset-0 bg-[#FBF9F4]"
            animate={
              isReadyToReveal
                ? {
                  opacity: 0,
                  transition: {
                    duration: 1.4,
                    ease: [0.33, 1, 0.68, 1],
                  },
                }
                : { opacity: 1 }
            }
          />

          {/* Ambient jaali architectural texture */}
          <div className="absolute inset-0 jaali-watermark opacity-35 pointer-events-none" />

          {/* Full Screen Viewport Frame */}
          <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
            {/* The Royal Arch: Zooms forward and parts open in synchronized elegance */}
            <motion.div
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isReadyToReveal
                  ? {
                    scale: 4.8,
                    opacity: 0,
                    filter: 'blur(6px)',
                    transition: {
                      duration: 1.5,
                      ease: [0.25, 0.1, 0.25, 1], // Continuous cubic ease
                    },
                  }
                  : {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
              }
            >
              <img
                src="/arch.png"
                alt="Royal Rajasthan Arch Portal"
                className="w-full h-full object-cover sm:object-contain md:object-cover scale-105 sm:scale-100 filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Circular Counter & Loading Text inside the arch opening */}
            <motion.div
              className="relative z-20 flex flex-col items-center justify-center space-y-5 -mt-6 sm:-mt-8"
              animate={
                isReadyToReveal
                  ? {
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(4px)',
                    transition: {
                      duration: 0.45,
                      ease: 'easeIn',
                    },
                  }
                  : {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                  }
              }
            >
              {/* Luxury SVG Circular Loader */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center drop-shadow-md">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
                  {/* Outer decorative halo */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius + 6}
                    className="stroke-heritage-gold/20"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                  {/* Background track circle */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    className="stroke-heritage-gold/30"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    className="stroke-heritage-emerald transition-all duration-150 ease-out"
                    strokeWidth="4.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Numerical Counter in Center */}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl sm:text-4xl font-bold text-heritage-emerald tracking-tight">
                    {progress}
                    <span className="text-sm font-mono font-medium text-heritage-gold ml-0.5">%</span>
                  </span>
                </div>
              </div>

              {/* Loading Text under the circular counter */}
              <div className="text-center space-y-1.5">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-heritage-emerald font-semibold block animate-pulse">
                  Curating Royal Experience
                </span>
                <span className="text-[10px] font-mono text-heritage-charcoal/60 uppercase tracking-[0.2em] block">
                  Weddings Vision
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArchLoader;
