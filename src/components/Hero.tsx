import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import portrait1 from '../assets/images/sandra_and_Samuel_potrait_1.jpg';
import portrait2 from '../assets/images/sandra_and_Samuel_potrait_2.jpg';
import portrait4 from '../assets/images/sandra_and_Samuel_potrait_4.jpg';
import portrait5 from '../assets/images/sandra_and_Samuel_potrait_5.jpg';
import portrait6 from '../assets/images/sandra_and_Samuel_potrait_6.jpg';
import portrait7 from '../assets/images/sandra_and_Samuel_potrait_7.jpg';
import portrait8 from '../assets/images/sandra_and_Samuel_potrait_8.jpg';
import portrait9 from '../assets/images/sandra_and_Samuel_potrait_9.jpg';
import portrait11 from '../assets/images/sandra_and_Samuel_potrait_11.jpg';

const COUPLE_PHOTOS = [
  {
    src: portrait1,
    title: 'Sandra & Samuel',
    subtitle: 'Celebrating Holy Matrimony',
  },
  {
    src: portrait2,
    title: 'Garden Romance',
    subtitle: 'Walking in Love & Grace',
  },
  {
    src: portrait4,
    title: 'Joyful Union',
    subtitle: 'Blessed by God’s Perfect Timing',
  },
    {
    src: portrait5,
    title: 'Love & Happiness',
    subtitle: 'Choosing each other Everyday',
  },
    {
    src: portrait6,
    title: 'Life Together',
    subtitle: 'Experiencing life together in Love',
  },
    {
    src: portrait7,
    title: 'Smiles of Love',
    subtitle: 'Riding the waves of Love',
  },
    {
    src: portrait8,
    title: 'Future Together',
    subtitle: 'Walking into the forever thereafter',
  },
    {
    src: portrait9,
    title: 'Love Birds',
    subtitle: 'Blessed to have found each other',
  },
    {
    src: portrait11,
    title: 'Best Friends',
    subtitle: 'Before Love we were friends first',
  },
];

export default function Hero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Carousel controls
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentPhotoIndex((prev) => (prev + 1) % COUPLE_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentPhotoIndex((prev) => (prev - 1 + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentPhotoIndex ? 1 : -1);
    setCurrentPhotoIndex(index);
  };

  // Auto-play timer for couple photo carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF0F2] via-[#F6E3E6] to-[#F1D7DC] text-stone-850 py-12 sm:py-16 md:py-20 px-3 sm:px-6 md:px-10" id="hero-section">
      {/* Background Image with Soft Dusty Pink Wash & Radiant Warm Gold Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/carol_and_john_portrait_1784461506194.jpg"
          alt="Sandra and Sam Portrait"
          className="w-full h-full object-cover object-center opacity-[0.12] scale-105 filter brightness-[1.02] contrast-[0.98]"
          referrerPolicy="no-referrer"
        />
        {/* Soft dusty pink and radiant warm gold ambient glows */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[#E892A2]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#5A1827]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#C5A059]/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Soft dusty pink gradient overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1D7DC]/95 via-[#FAF0F2]/85 to-[#FAF0F2]/65" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF0F2]/40 to-[#F1D7DC]/90" />

        {/* Fine Linen Texture Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Screen End-to-End Foil-Linen Frame Border System */}
      <div className="absolute inset-2 sm:inset-3 md:inset-5 border-2 border-[#D4AF37]/70 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]" />
      <div className="absolute inset-3.5 sm:inset-5 md:inset-7 border border-dashed border-[#D4AF37]/45 rounded-xl sm:rounded-2xl pointer-events-none z-20" />
      
      {/* Ornamental Gold Corner Cornerpieces for Screen End-to-End Frame */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 text-[#D4AF37]/80 text-sm sm:text-base select-none pointer-events-none z-20 font-serif">
        ❖
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-[#D4AF37]/80 text-sm sm:text-base select-none pointer-events-none z-20 font-serif">
        ❖
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-[#D4AF37]/80 text-sm sm:text-base select-none pointer-events-none z-20 font-serif">
        ❖
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-[#D4AF37]/80 text-sm sm:text-base select-none pointer-events-none z-20 font-serif">
        ❖
      </div>

      {/* Main Luxury Wedding Invitation Card with Gold Foil Trim extending End-to-End */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(90,24,39,0.1)] border-2 border-[#D4AF37]/60 flex flex-col items-center text-center overflow-hidden w-full"
        >
          {/* Inner Inset Gold Foil Border */}
          <div className="absolute inset-2.5 sm:inset-4 rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 pointer-events-none" />
          <div className="absolute inset-3.5 sm:inset-5 rounded-lg sm:rounded-xl border border-dashed border-[#D4AF37]/25 pointer-events-none" />

          {/* Couple Photo Carousel Frame with Gold Leaf Border & Radiance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 relative group z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Warm gold and burgundy aura behind photo */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#D4AF37]/45 via-[#5A1827]/30 to-[#C5A059]/45 blur-lg opacity-85 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] p-1.5 bg-gradient-to-br from-[#FFF9EE] via-white to-[#FFF5EB]">
              {/* Carousel Inner Container */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 select-none">
                
                {/* Active Photo Slide with Smooth Crossfade & Motion */}
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    custom={direction}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={COUPLE_PHOTOS[currentPhotoIndex].src}
                      alt={COUPLE_PHOTOS[currentPhotoIndex].title}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay for bottom caption readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 pointer-events-none" />

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-left pointer-events-none flex items-end justify-between">
                      <div>
                        <p className="text-white font-serif text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
                          {COUPLE_PHOTOS[currentPhotoIndex].title}
                        </p>
                        <p className="text-[#F2D7DC] text-[10px] sm:text-xs font-sans tracking-wide drop-shadow-sm opacity-90">
                          {COUPLE_PHOTOS[currentPhotoIndex].subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Top Corner Photo Index Badge */}
                <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white font-sans text-[10px] sm:text-xs font-medium tracking-wider">
                  {currentPhotoIndex + 1} / {COUPLE_PHOTOS.length}
                </div>

                {/* Navigation Chevron: Prev */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-[#5A1827]/80 active:scale-95 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg opacity-85 hover:opacity-100"
                  aria-label="Previous photo"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* Navigation Chevron: Next */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-[#5A1827]/80 active:scale-95 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg opacity-85 hover:opacity-100"
                  aria-label="Next photo"
                  title="Next Photo"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* Bottom Center Indicator Dots */}
                <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 pointer-events-auto">
                  {COUPLE_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentPhotoIndex
                          ? 'w-5 sm:w-6 bg-[#D4AF37] shadow-sm'
                          : 'w-1.5 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

          {/* Feature tagline badge with Warm Gold Accents & Foil Trim */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFFDF8] via-white to-[#FFFDF8] border-2 border-[#D4AF37]/70 text-[#5A1827] text-xs font-serif italic mb-5 shadow-sm backdrop-blur-sm relative z-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold tracking-wide">{WEDDING_DETAILS.couple.featureHeadline}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </motion.div>

          {/* Invitation introductory line with Gold Ornamental Dividers */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-5 px-2 relative z-10"
          >
            <div className="flex items-center justify-center gap-3 mb-2 opacity-80">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs">❖</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <p className="italic text-stone-600 text-sm sm:text-base">
              Together with their families, joyfully invite you to celebrate the holy matrimony and union of
            </p>

            <div className="flex items-center justify-center gap-3 mt-2.5 opacity-80">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs">❖</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Main Couple Names with Deep Burgundy & Warm Gold Ampersand */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-light tracking-tight mb-4 relative z-10"
          >
            <span className="block mb-1 md:inline md:mb-0 text-[#5A1827] font-bold drop-shadow-sm">{WEDDING_DETAILS.couple.bride}</span>
            <span className="font-serif text-[#D4AF37] mx-3 text-4xl sm:text-5xl md:text-6xl italic font-normal drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)]">&amp;</span>
            <span className="block mt-1 md:inline md:mt-0 text-[#5A1827] font-bold drop-shadow-sm">{WEDDING_DETAILS.couple.groom}</span>
          </motion.h1>

          {/* Hashtag with Warm Gold Borders */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[#5A1827] font-sans text-xs tracking-widest font-extrabold uppercase mb-5 flex items-center justify-center gap-2 relative z-10"
          >
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#8E5B23] font-bold">#{WEDDING_DETAILS.couple.nickname}</span>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </motion.div>

          {/* Request presence string */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-stone-700 font-serif tracking-wide text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed italic relative z-10"
          >
            as they exchange sacred vows and unite their lives in love, faith, and joy.
          </motion.p>

          {/* Wedding Date Only Pill with Opulent Gold Accents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-flex items-center gap-2.5 text-stone-900 font-sans text-xs sm:text-sm font-semibold mb-8 bg-gradient-to-r from-[#FFFDF9] via-white to-[#FFFDF9] backdrop-blur-sm border-2 border-[#D4AF37] px-7 py-3 rounded-full shadow-[0_6px_20px_rgba(212,175,55,0.2)] relative z-10"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="tracking-wider text-[#5A1827] font-extrabold">Saturday, 17th October 2026</span>
          </motion.div>

          {/* Biblical Quote: Isaiah 60:22 with Gold Borders and Accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.85 }}
            className="max-w-lg mx-auto text-stone-850 italic font-serif text-sm md:text-base border-y-2 border-[#D4AF37]/60 py-4 px-4 bg-[#FAF0F2]/40 rounded-lg relative z-10"
          >
            <div className="text-center mb-1">
              <span className="text-[#D4AF37] text-lg font-serif">“</span>
              <span className="text-stone-850">{WEDDING_DETAILS.bibleVerses[0].text}</span>
              <span className="text-[#D4AF37] text-lg font-serif">”</span>
            </div>
            <p className="text-[#996515] text-xs tracking-widest uppercase font-sans font-bold not-italic mt-1.5 flex items-center justify-center gap-1.5">
              <span className="w-4 h-px bg-[#D4AF37]" />
              <span>{WEDDING_DETAILS.bibleVerses[0].reference}</span>
              <span className="w-4 h-px bg-[#D4AF37]" />
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F1D7DC] to-transparent pointer-events-none" />
    </section>
  );
}

