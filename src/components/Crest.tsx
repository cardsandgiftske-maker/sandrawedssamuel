import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  // Dimension definitions for sizes
  const dimensions = {
    sm: { outer: 'w-20 h-20', inner: 'w-16 h-16', svg: 'w-10 h-10' },
    md: { outer: 'w-28 h-28', inner: 'w-22 h-22', svg: 'w-14 h-14' },
    lg: { outer: 'w-40 h-40', inner: 'w-32 h-32', svg: 'w-20 h-20' },
    xl: { outer: 'w-52 h-52', inner: 'w-42 h-42', svg: 'w-26 h-26' },
  };

  const dim = dimensions[size] || dimensions.md;

  return (
    <div className="relative flex items-center justify-center select-none" id="wedding-crest-container">
      {/* Background ambient warm gold/burgundy glow */}
      <div className="absolute -inset-4 rounded-full bg-[#D4AF37]/25 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -inset-2 rounded-full bg-[#5A1827]/30 blur-lg" />

      {/* Main Wax Seal Container that Rotates */}
      <motion.div
        animate={animated ? { rotate: 360 } : { rotate: 0 }}
        transition={animated ? { repeat: Infinity, duration: 28, ease: 'linear' } : {}}
        className={`relative ${dim.outer} rounded-full flex items-center justify-center p-1.5 bg-gradient-to-br from-[#722F37] via-[#5A1827] to-[#3B0B14] shadow-[0_12px_28px_rgba(90,24,39,0.45),_inset_0_3px_6px_rgba(255,255,255,0.3),_inset_0_-4px_8px_rgba(0,0,0,0.7)] border-2 border-[#D4AF37]/80 cursor-pointer`}
      >
        {/* Outer Rotating Dotted Gold Decorative Ring */}
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#F3E5AB]/70 pointer-events-none opacity-90" />

        {/* Inner Wax Ring */}
        <div className={`relative ${dim.inner} rounded-full bg-gradient-to-tl from-[#380A15] via-[#4A101C] to-[#661626] flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.65)] border border-[#D4AF37]/50 overflow-hidden`}>
          
          {/* Inner Accent Circle */}
          <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/40 pointer-events-none" />

          {/* Radial Gold Flare overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent opacity-80" />

          {/* Gold Monogram SVG */}
          <div className="flex items-center justify-center text-center select-none pointer-events-none relative z-10">
            <svg className={dim.svg} viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="crest-gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFF1D6" />
                  <stop offset="55%" stopColor="#DFAC6C" />
                  <stop offset="85%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#8E5B23" />
                </linearGradient>
              </defs>
              
              <g>
                <text 
                  x="50" 
                  y="58" 
                  fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                  fontSize="13" 
                  fontWeight="bold"
                  fill="url(#crest-gold-seal)"
                  textAnchor="middle"
                  letterSpacing="-0.01em"
                >
                  S &amp; S
                </text>
              </g>
            </svg>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
