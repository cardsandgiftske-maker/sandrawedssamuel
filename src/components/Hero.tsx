import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';
import Crest from './Crest';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FCFAF7] text-stone-850 py-16" id="hero-section">
      {/* Background Image with Theme Color Wash Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/carol_and_john_portrait_1784461506194.jpg"
          alt="Sandra and Samuel Portrait"
          className="w-full h-full object-cover object-center opacity-[0.16] scale-105 filter brightness-[1.02] contrast-[0.98]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle theme color ambient glows in pink & burgundy */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[#E892A2]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#722F37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E6C280]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Elegant warm radial and gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-[#FCFAF7]/90 to-[#FCFAF7]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FCFAF7]/50 to-[#FCFAF7]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center max-w-4xl">
        {/* Elegant Crest at the top of the hero */}
        <div className="mb-6">
          <Crest size="md" animated={true} />
        </div>

        {/* Feature tagline badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E892A2]/20 via-[#FFF0F3] to-[#722F37]/15 border border-[#E892A2]/40 text-[#722F37] text-xs font-serif italic mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C86B85]" />
          <span className="font-semibold">{WEDDING_DETAILS.couple.featureHeadline}</span>
        </motion.div>

        {/* Family invitation text block */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-600 font-serif leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-6 px-2"
        >
          <p className="italic">
            With grateful hearts and the blessings of our families,
          </p>
          <p className="text-base sm:text-lg md:text-xl text-stone-900 font-serif mt-2.5 font-bold tracking-wide">
            {WEDDING_DETAILS.families.brideFamily}
          </p>
          <p className="text-sm sm:text-base text-[#C86B85] font-serif italic my-1 font-bold">&amp;</p>
          <p className="text-base sm:text-lg md:text-xl text-stone-900 font-serif font-bold tracking-wide">
            {WEDDING_DETAILS.families.groomFamily}
          </p>
          <p className="italic text-stone-600 text-xs sm:text-sm mt-2">
            joyfully invite you to celebrate the holy matrimony and union of their children
          </p>
        </motion.div>

        {/* Main Couple Names with Theme Colors */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light tracking-tight mb-4"
        >
          <span className="block mb-1 md:inline md:mb-0 text-[#C86B85] font-semibold drop-shadow-sm">{WEDDING_DETAILS.couple.bride}</span>
          <span className="font-serif text-[#722F37] mx-3 text-3xl sm:text-4xl md:text-5xl italic font-normal">&amp;</span>
          <span className="block mt-1 md:inline md:mt-0 text-[#722F37] font-semibold drop-shadow-sm">{WEDDING_DETAILS.couple.groom}</span>
        </motion.h1>

        {/* Full Names subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-stone-700 font-serif text-sm sm:text-base italic mb-3"
        >
          <span>{WEDDING_DETAILS.couple.brideFull}</span>
          <span className="mx-2 text-[#C86B85]">•</span>
          <span>{WEDDING_DETAILS.couple.groomFull}</span>
        </motion.div>

        {/* Hashtag / Nickname */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[#722F37] font-sans text-xs tracking-widest font-extrabold uppercase mb-6 flex items-center justify-center gap-2"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#E892A2]" />
          <span>#{WEDDING_DETAILS.couple.nickname}</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#E892A2]" />
        </motion.div>

        {/* Request presence string */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-stone-700 font-serif tracking-wide text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed italic"
        >
          as they exchange sacred vows and unite their lives in love, faith, and joy.
        </motion.p>

        {/* Key Event Summary Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-stone-700 font-sans text-xs sm:text-sm font-medium mb-8 bg-white/90 backdrop-blur-sm border border-stone-200/90 px-5 py-3 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[#722F37] font-semibold">
            <Calendar className="w-4 h-4 text-[#C86B85]" />
            <span>Saturday, 17th October 2026</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5 text-[#722F37] font-semibold">
            <Clock className="w-4 h-4 text-[#722F37]" />
            <span>Church 9:00 AM • Reception 12:00 PM</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5 text-stone-800 font-medium">
            <MapPin className="w-4 h-4 text-[#C86B85]" />
            <span>{WEDDING_DETAILS.ceremony.venue}</span>
          </div>
        </motion.div>

        {/* Biblical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="max-w-md mx-auto mb-10 text-stone-600 italic font-serif text-sm md:text-base border-y border-[#E892A2]/40 py-3.5"
        >
          <p className="mb-1">“{WEDDING_DETAILS.bibleVerses[0].text}”</p>
          <p className="text-[#722F37] text-xs tracking-wider uppercase font-sans font-semibold not-italic">
            {WEDDING_DETAILS.bibleVerses[0].reference}
          </p>
        </motion.div>

        {/* Countdown timer with Pink & Burgundy Color Coding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center mb-6"
        >
          <h3 className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C86B85]" />
            <span>Countdown to our Wedding Day</span>
          </h3>
          
          <div className="flex gap-2.5 sm:gap-4 text-center">
            {/* Days block - Burgundy */}
            <div className="flex flex-col bg-white border border-[#722F37]/30 rounded-xl px-3.5 sm:px-5 py-3 min-w-[65px] sm:min-w-[85px] shadow-sm">
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#722F37]">{timeLeft.days}</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1 font-medium">Days</span>
            </div>

            {/* Hours block - Dusty Rose */}
            <div className="flex flex-col bg-white border border-[#C86B85]/30 rounded-xl px-3.5 sm:px-5 py-3 min-w-[65px] sm:min-w-[85px] shadow-sm">
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#C86B85]">{timeLeft.hours}</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1 font-medium">Hours</span>
            </div>

            {/* Minutes block - Soft Rose */}
            <div className="flex flex-col bg-white border border-[#E892A2]/50 rounded-xl px-3.5 sm:px-5 py-3 min-w-[65px] sm:min-w-[85px] shadow-sm">
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#B85B73]">{timeLeft.minutes}</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1 font-medium">Mins</span>
            </div>

            {/* Seconds block - Champagne Accent */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-3.5 sm:px-5 py-3 min-w-[65px] sm:min-w-[85px] shadow-sm">
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-stone-800">{timeLeft.seconds}</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1 font-medium">Secs</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FCFAF7] to-transparent pointer-events-none" />
    </section>
  );
}

