import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import portrait1 from '../assets/images/sandra_and_Samuel_potrait_1.jpg';
import portrait4 from '../assets/images/sandra_and_Samuel_potrait_4.jpg';
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
    src: portrait4,
    title: 'Joyful Union',
    subtitle: 'Blessed by God’s Perfect Timing',
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
    <section className="relative min-h-screen flex items-center justify-center bg-[#FAF2F4] text-stone-850 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" id="hero-section">
      {/* Clean, subtle background tone */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#FAF0F2] via-[#FAF2F4] to-[#F5E6E9]" />

      {/* Main Wedding Invitation Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-stone-200/80 shadow-xs flex flex-col items-center text-center w-full"
        >
          {/* Couple Photo Carousel Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6 relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
              {/* Active Photo Slide with Smooth Crossfade & Motion */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPhotoIndex}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={COUPLE_PHOTOS[currentPhotoIndex].src}
                    alt={COUPLE_PHOTOS[currentPhotoIndex].title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlay for bottom caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-left pointer-events-none flex items-end justify-between">
                    <div>
                      <p className="text-white font-serif text-xs sm:text-sm md:text-base font-bold drop-shadow-sm">
                        {COUPLE_PHOTOS[currentPhotoIndex].title}
                      </p>
                      <p className="text-stone-200 text-[10px] sm:text-xs font-sans tracking-wide opacity-90">
                        {COUPLE_PHOTOS[currentPhotoIndex].subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top Corner Photo Index Badge */}
              <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 text-white font-sans text-[10px] sm:text-xs font-medium tracking-wider">
                {currentPhotoIndex + 1} / {COUPLE_PHOTOS.length}
              </div>

              {/* Navigation Chevron: Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/35 hover:bg-black/60 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm opacity-85 hover:opacity-100"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/35 hover:bg-black/60 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm opacity-85 hover:opacity-100"
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
                        ? 'w-5 sm:w-6 bg-[#D4AF37]'
                        : 'w-1.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature tagline badge */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] text-[#5A1827] text-xs font-serif italic mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-semibold tracking-wide">{WEDDING_DETAILS.couple.featureHeadline}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          </motion.div>

          {/* Invitation introductory line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-stone-600 font-serif leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-4 px-2"
          >
            <p className="italic">
              Together with their families, joyfully invite you to celebrate the holy matrimony and union of
            </p>
          </motion.div>

          {/* Main Couple Names */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tight mb-3 text-stone-900"
          >
            <span className="text-[#5A1827] font-bold">{WEDDING_DETAILS.couple.bride}</span>
            <span className="font-serif text-[#C5A059] mx-3 text-3xl sm:text-4xl md:text-5xl italic font-normal">&amp;</span>
            <span className="text-[#5A1827] font-bold">{WEDDING_DETAILS.couple.groom}</span>
          </motion.h1>

          {/* Parents: Daughter of & Son of */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 max-w-xl mx-auto w-full mb-3 px-2"
          >
            <div className="text-center sm:text-right">
              <span className="block text-xs font-serif italic text-[#8E5B23]">
                Daughter of
              </span>
              <span className="font-serif text-sm sm:text-base font-semibold text-stone-800 tracking-wide">
                {WEDDING_DETAILS.parents.bride.father} &amp; {WEDDING_DETAILS.parents.bride.mother}
              </span>
            </div>

            <div className="hidden sm:block w-px h-7 bg-stone-300/80" />
            <div className="sm:hidden w-12 h-px bg-stone-200 my-0.5" />

            <div className="text-center sm:text-left">
              <span className="block text-xs font-serif italic text-[#8E5B23]">
                Son of
              </span>
              <span className="font-serif text-sm sm:text-base font-semibold text-stone-800 tracking-wide">
                {WEDDING_DETAILS.parents.groom.father} &amp; {WEDDING_DETAILS.parents.groom.mother}
              </span>
            </div>
          </motion.div>

          {/* Request presence string */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone-600 font-serif tracking-wide text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed italic"
          >
            as they exchange sacred vows and unite their lives in love, faith, and joy.
          </motion.p>

          {/* Wedding Date Pill */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="inline-flex items-center gap-2 text-stone-850 font-sans text-xs sm:text-sm font-semibold mb-7 bg-[#FAF0F2] border border-[#E892A2]/40 px-5 py-2.5 rounded-full"
          >
            <Calendar className="w-4 h-4 text-[#5A1827]" />
            <span className="tracking-wider text-[#5A1827] font-bold">Saturday, 17th October 2026</span>
          </motion.div>

          {/* Biblical Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="max-w-lg mx-auto text-stone-700 italic font-serif text-sm md:text-base border-t border-b border-stone-200 py-3.5 px-4"
          >
            <div className="text-center mb-1">
              <span>“{WEDDING_DETAILS.bibleVerses[0].text}”</span>
            </div>
            <p className="text-stone-500 text-xs tracking-widest uppercase font-sans font-semibold not-italic mt-1">
              {WEDDING_DETAILS.bibleVerses[0].reference}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

