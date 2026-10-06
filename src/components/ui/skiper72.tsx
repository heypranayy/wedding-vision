import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { Play, Maximize2, X } from "lucide-react";

interface AnimatedWordProps {
    word: string;
    index: number;
    totalWords: number;
    scrollProgress: MotionValue<number>;
    isHighlighted?: boolean;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({
    word,
    index,
    totalWords,
    scrollProgress,
    isHighlighted = false,
}) => {
    // Phase 1: Words animate from progress 0.04 to 0.52
    const windowStart = 0.04;
    const windowEnd = 0.52;
    const step = (windowEnd - windowStart) / totalWords;

    const wordStart = windowStart + index * step;
    const wordEnd = Math.min(wordStart + 0.12, 0.56);

    // Animate from right side into position
    const x = useTransform(scrollProgress, [wordStart, wordEnd], [400, 0]);
    const opacity = useTransform(scrollProgress, [wordStart, wordEnd], [0, 1]);

    return (
        <motion.span
            className={`mr-2.5 inline-block select-none ${isHighlighted
                ? "text-heritage-emerald font-semibold decoration-heritage-gold/50 decoration-2"
                : ""
                }`}
            style={{
                x,
                opacity,
            }}
        >
            {word}
        </motion.span>
    );
};

export const Skiper72: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const previewVideoRef = useRef<HTMLVideoElement>(null);
    const modalVideoRef = useRef<HTMLVideoElement>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Video enters from right side AFTER text is fully revealed (progress 0.52 to 0.72)
    const videoX = useTransform(scrollYProgress, [0.52, 0.72], [600, 0]);
    const videoOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
    const videoScale = useTransform(scrollYProgress, [0.52, 0.72], [0.92, 1]);

    // Features entrance animation (fades and moves in as text finishes)
    const featuresOpacity = useTransform(scrollYProgress, [0.46, 0.64], [0, 1]);
    const featuresY = useTransform(scrollYProgress, [0.46, 0.64], [30, 0]);

    // Autoplay preview video
    useEffect(() => {
        if (previewVideoRef.current) {
            previewVideoRef.current.defaultMuted = true;
            previewVideoRef.current.muted = true;
            previewVideoRef.current.play().catch(() => { });
        }
    }, []);

    // Handle Fullscreen Modal Play
    useEffect(() => {
        if (isModalOpen && modalVideoRef.current) {
            modalVideoRef.current.play().catch(() => { });
        }
    }, [isModalOpen]);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    const headingText = "Your Dream Wedding, Elegantly Crafted.";
    const bodyText =
        "At Weddings Vision, we specialize in creating unforgettable royal wedding experiences tailored to your unique love story. Our team blends the majesty of Rajasthani heritage with bespoke contemporary design, delivering a seamless and stress-free planning journey. From imperial palace décor to flawless day-of execution, every moment reflects your vision.";

    const headingWords = headingText.split(" ");
    const bodyWords = bodyText.split(" ");
    const allWords = [...headingWords, ...bodyWords];

    // Highlighted words within body text
    const highlightWordsSet = new Set([
        "unforgettable",
        "royal",
        "wedding",
        "Rajasthani",
        "heritage",
        "bespoke",
        "seamless",
        "palace",
        "flawless"
    ]);

    const features = [
        {
            title: "Personalized Planning",
            desc: "Custom themes & curated timelines",
            icon: "💍",
        },
        {
            title: "Seamless Execution",
            desc: "Flawless on-ground coordination",
            icon: "🏛️",
        },
        {
            title: "Heritage Meets Modern",
            desc: "Palace grandeur, contemporary luxury",
            icon: "✨",
        },
    ];

    return (
        /* Lighter, Distinguished Heritage Sand/Ivory Background with soft gold accent */
        <section className="relative bg-[#FBF9F4] text-heritage-charcoal overflow-x-clip border-y border-heritage-gold/25 shadow-sm">
            {/* Background jaali architectural pattern */}
            <div className="absolute inset-0 jaali-watermark opacity-20 pointer-events-none" />

            {/* Pinning scroll container: 350vh gives comfortable scrolling room */}
            <div ref={containerRef} className="h-[350vh] w-full relative">
                <div className="sticky top-0 h-screen flex items-center px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
                        {/* Left Column: Horizontal Animated Text Reveal + 3 Feature Blocks (7 Cols) */}
                        <div className="lg:col-span-7 space-y-6">

                            <div className="overflow-x-clip py-1 space-y-4">
                                {/* Distinguished Green Heading */}
                                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-semibold leading-[1.18] text-heritage-emerald tracking-tight">
                                    {headingWords.map((word, index) => (
                                        <AnimatedWord
                                            key={`h-${index}`}
                                            word={word}
                                            index={index}
                                            totalWords={allWords.length}
                                            scrollProgress={scrollYProgress}
                                        />
                                    ))}
                                </h2>

                                {/* Supporting Narrative Body with selective highlights */}
                                <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-light leading-[1.35] text-heritage-charcoal/90 tracking-tight pt-5">
                                    {bodyWords.map((word, index) => {
                                        // Clean punctuation to test highlight
                                        const cleanWord = word.replace(/[^a-zA-Z]/g, "");
                                        const isHighlighted = highlightWordsSet.has(cleanWord);
                                        return (
                                            <AnimatedWord
                                                key={`b-${index}`}
                                                word={word}
                                                index={headingWords.length + index}
                                                totalWords={allWords.length}
                                                scrollProgress={scrollYProgress}
                                                isHighlighted={isHighlighted}
                                            />
                                        );
                                    })}
                                </p>
                            </div>

                            {/* 3 Features Under the Main Text */}
                            <motion.div
                                style={{
                                    opacity: featuresOpacity,
                                    y: featuresY,
                                }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3"
                            >
                                {features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="group/card flex items-center gap-3 p-3 rounded-lg bg-heritage-emerald text-heritage-sand border border-heritage-emerald-deep shadow-regal hover:bg-heritage-gold hover:text-heritage-charcoal hover:border-heritage-gold-antique hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-heritage-emerald-deep/60 group-hover/card:bg-white/80 border border-heritage-gold/30 group-hover/card:border-heritage-gold flex items-center justify-center text-lg shrink-0 shadow-inner transition-colors duration-300">
                                            <span>{feature.icon}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-serif font-semibold text-m text-heritage-sand group-hover/card:text-heritage-charcoal leading-none transition-colors duration-300">
                                                {feature.title}
                                            </h4>

                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column: Video enters from right side after text completes */}
                        <div className="lg:col-span-5 flex justify-center">
                            <motion.div
                                style={{
                                    x: videoX,
                                    opacity: videoOpacity,
                                    scale: videoScale,
                                }}
                                onClick={() => setIsModalOpen(true)}
                                className="group relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer border border-heritage-gold/50 shadow-regal-lg bg-white transition-all duration-300 hover:scale-[1.02] hover:border-heritage-emerald hover:shadow-2xl"
                                role="button"
                                tabIndex={0}
                                aria-label="Open wedding film in full screen"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
                                }}
                            >
                                {/* Looping Ambient Preview Video */}
                                <video
                                    ref={previewVideoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                                >
                                    <source src="/assets/hero-bg.mp4" type="video/mp4" />
                                </video>

                                {/* Subtle vignette gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                {/* Floating Play & Fullscreen Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-heritage-sand/90 backdrop-blur-md border border-heritage-gold/60 text-heritage-emerald flex items-center justify-center shadow-regal transition-transform duration-300 group-hover:scale-110">
                                        <Play className="w-7 h-7 text-heritage-emerald fill-heritage-emerald ml-1" />
                                    </div>
                                </div>

                                {/* Bottom Video Badge */}
                                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-heritage-sand/95 backdrop-blur-md rounded-2xl border border-heritage-gold/40 flex items-center justify-between pointer-events-none shadow-md">
                                    <div>
                                        <span className="text-[9px] font-mono uppercase tracking-luxury text-heritage-gold block">
                                            Cinematic Film
                                        </span>
                                        <span className="font-serif text-sm sm:text-base font-semibold text-heritage-emerald block leading-tight">
                                            Royal Rajasthan Celebrations
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-heritage-emerald bg-heritage-gold/20 px-2.5 py-1 rounded-full text-[10px] font-mono">
                                        <Maximize2 className="w-3 h-3 text-heritage-emerald" />
                                        <span>Tap Fullscreen</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Video Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
                    onClick={() => setIsModalOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-6 right-6 z-50 p-3 bg-heritage-sand/20 hover:bg-heritage-sand text-white hover:text-heritage-emerald rounded-full border border-heritage-gold/40 transition-colors"
                        aria-label="Close fullscreen video"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Modal Video Container */}
                    <div
                        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-heritage-gold/30 bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            ref={modalVideoRef}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                        >
                            <source src="/assets/hero-bg.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Skiper72;