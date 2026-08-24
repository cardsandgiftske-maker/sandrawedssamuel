import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';

import couplePortrait from '../assets/images/carol_and_john_portrait_1784461560414.jpg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF0F2] via-[#F6E3E6] to-[#F1D7DC] text-stone-850 py-12 sm:py-16 md:py-20 px-3 sm:px-6 md:px-10" id="hero-section">
      {/* Background Image with Soft Dusty Pink Wash & Radiant Warm Gold Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
       <img
  src={couplePortrait}
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

          {/* Couple Photo Frame with Gold Leaf Border & Radiance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 relative group z-10"
          >
            {/* Warm gold and burgundy aura behind photo */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/45 via-[#5A1827]/30 to-[#C5A059]/45 blur-lg opacity-85 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] p-1.5 bg-gradient-to-br from-[#FFF9EE] via-white to-[#FFF5EB]">
              <img
                src="/src/assets/images/carol_and_john_portrait_1784461506194.jpg"
                alt="Sandra & Sam Couple Portrait"
                className="w-full h-full object-cover object-center rounded-xl"
                referrerPolicy="no-referrer"
              />
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

          {/* Family invitation text block with Gold Ornamental Dividers */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-6 px-2 relative z-10"
          >
            <div className="flex items-center justify-center gap-3 mb-2 opacity-80">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs">❖</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <p className="italic text-stone-600 text-sm">
              With grateful hearts and the blessings of our families,
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#5A1827] font-serif mt-2 font-bold tracking-wide">
              {WEDDING_DETAILS.families.brideFamily}
            </p>
            <p className="text-base sm:text-lg text-[#C5A059] font-serif italic my-0.5 font-bold drop-shadow-xs">&amp;</p>
            <p className="text-base sm:text-lg md:text-xl text-[#5A1827] font-serif font-bold tracking-wide">
              {WEDDING_DETAILS.families.groomFamily}
            </p>
            <p className="italic text-stone-600 text-xs sm:text-sm mt-2">
              joyfully invite you to celebrate the holy matrimony and union of their children
            </p>

            <div className="flex items-center justify-center gap-3 mt-3 opacity-80">
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
            className="text-5xl sm:text-6xl md:text-7xl font-display font-light tracking-tight mb-3 relative z-10"
          >
            <span className="block mb-1 md:inline md:mb-0 text-[#5A1827] font-bold drop-shadow-sm">{WEDDING_DETAILS.couple.bride}</span>
            <span className="font-serif text-[#D4AF37] mx-3 text-4xl sm:text-5xl md:text-6xl italic font-normal drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)]">&amp;</span>
            <span className="block mt-1 md:inline md:mt-0 text-[#5A1827] font-bold drop-shadow-sm">{WEDDING_DETAILS.couple.groom}</span>
          </motion.h1>

          {/* Full Names subtitle with Warm Gold divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-stone-800 font-serif text-sm sm:text-base italic mb-3 font-medium relative z-10"
          >
            <span className="text-[#5A1827] font-semibold">{WEDDING_DETAILS.couple.brideFull}</span>
            <span className="mx-2.5 text-[#D4AF37] font-bold">✦</span>
            <span className="text-[#5A1827] font-semibold">{WEDDING_DETAILS.couple.groomFull}</span>
          </motion.div>

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
            className="max-w-lg mx-auto mb-10 text-stone-850 italic font-serif text-sm md:text-base border-y-2 border-[#D4AF37]/60 py-4 px-4 bg-[#FAF0F2]/40 rounded-lg relative z-10"
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

          {/* Countdown timer with Deep Burgundy & Warm Gold Accents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="flex flex-col items-center relative z-10 w-full"
          >
            <h3 className="text-[11px] text-stone-600 uppercase tracking-widest font-sans font-extrabold mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#5A1827]">Countdown to our Wedding Day</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </h3>
            
            <div className="flex gap-2.5 sm:gap-4 text-center justify-center flex-wrap">
              {/* Days block - Deep Burgundy with Gold Border */}
              <div className="flex flex-col bg-gradient-to-b from-white to-[#FFFBF5] border-2 border-[#D4AF37]/80 rounded-2xl px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] shadow-md hover:border-[#D4AF37] transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#5A1827]">{timeLeft.days}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#996515] font-sans mt-1 font-extrabold">Days</span>
              </div>

              {/* Hours block - Warm Gold Accent */}
              <div className="flex flex-col bg-gradient-to-b from-white to-[#FFFBF5] border-2 border-[#D4AF37]/80 rounded-2xl px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] shadow-md hover:border-[#D4AF37] transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#C5A059]">{timeLeft.hours}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#996515] font-sans mt-1 font-extrabold">Hours</span>
              </div>

              {/* Minutes block - Burgundy */}
              <div className="flex flex-col bg-gradient-to-b from-white to-[#FFFBF5] border-2 border-[#D4AF37]/80 rounded-2xl px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] shadow-md hover:border-[#D4AF37] transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#5A1827]">{timeLeft.minutes}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#996515] font-sans mt-1 font-extrabold">Mins</span>
              </div>

              {/* Seconds block - Gold Accent */}
              <div className="flex flex-col bg-gradient-to-b from-white to-[#FFFBF5] border-2 border-[#D4AF37]/80 rounded-2xl px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] shadow-md hover:border-[#D4AF37] transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#C5A059]">{timeLeft.seconds}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#996515] font-sans mt-1 font-extrabold">Secs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F1D7DC] to-transparent pointer-events-none" />
    </section>
  );
}

