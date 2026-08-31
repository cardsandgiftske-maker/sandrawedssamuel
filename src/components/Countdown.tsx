import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Heart, Clock, Bell } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Countdown() {
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
        minutes: Math.floor((difference / (1000 * 60 * 60)) % 24),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'text-[#5A1827]', border: 'border-[#D4AF37]' },
    { label: 'Hours', value: timeLeft.hours, color: 'text-[#C5A059]', border: 'border-[#D4AF37]' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'text-[#5A1827]', border: 'border-[#D4AF37]' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'text-[#C5A059]', border: 'border-[#D4AF37]' },
  ];

  return (
    <section 
      id="countdown-section" 
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#F9F4F0] via-[#FCFAF7] to-[#F9F4F0] text-stone-850 border-y border-[#D4AF37]/30 overflow-hidden"
    >
      {/* Subtle background ambient glow and radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#5A1827]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        
        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-[#D4AF37]/50 shadow-xs text-xs font-sans font-bold uppercase tracking-widest text-[#5A1827] mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Counting Down The Moments</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#5A1827] mb-3"
        >
          Until We Say <span className="italic font-normal text-[#D4AF37]">“I Do”</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-stone-600 font-serif italic text-sm sm:text-base max-w-lg mx-auto mb-10"
        >
          Join us as we count down each precious second leading to our holy matrimony.
        </motion.p>

        {/* Countdown Timer Blocks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 max-w-3xl mx-auto mb-10"
        >
          {timeBlocks.map((block, idx) => (
            <div
              key={block.label}
              className="relative group bg-gradient-to-b from-white via-[#FFFDF9] to-[#FFF9F2] border-2 border-[#D4AF37]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_25px_rgba(212,175,55,0.15)] hover:shadow-[0_12px_30px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-tr-2xl pointer-events-none" />

              {/* Number Value */}
              <span className={`block text-3xl sm:text-4xl md:text-5xl font-serif font-bold ${block.color} drop-shadow-xs tracking-tight`}>
                {String(block.value).padStart(2, '0')}
              </span>

              {/* Gold Divider Line */}
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-2 opacity-80" />

              {/* Label */}
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8E5B23] font-sans font-extrabold">
                {block.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Date Confirmation Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2.5 rounded-full bg-white border border-[#D4AF37]/60 shadow-sm text-xs sm:text-sm font-sans"
        >
          <div className="flex items-center gap-2 text-[#5A1827] font-bold">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Saturday, 17th October 2026</span>
          </div>
          <span className="text-[#D4AF37] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-stone-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Ceremony begins at 10:00 AM EAT</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
