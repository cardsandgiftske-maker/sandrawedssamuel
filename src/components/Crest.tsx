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
    md: { outer: 'w-32 h-32', inner: 'w-26 h-26', svg: 'w-16 h-16' },
    lg: { outer: 'w-44 h-44', inner: 'w-36 h-36', svg: 'w-22 h-22' },
    xl: { outer: 'w-56 h-56', inner: 'w-46 h-46', svg: 'w-28 h-28' },
  };

  const dim = dimensions[size] || dimensions.md;

  return (
    <div className="relative flex items-center justify-center select-none" id="wedding-crest-container">
      {/* Background ambient warm gold/maroon glow */}
      <div className="absolute -inset-4 rounded-full bg-maroon-600/25 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Main Wax Seal Container that Rotates */}
      <motion.div
        animate={animated ? { rotate: 360 } : { rotate: 0 }}
        transition={animated ? { repeat: Infinity, duration: 25, ease: 'linear' } : {}}
        className={`relative ${dim.outer} rounded-full flex items-center justify-center p-1.5 bg-gradient-to-br from-maroon-700 via-maroon-850 to-maroon-950 shadow-[0_12px_30px_rgba(114,47,55,0.45),_inset_0_3px_6px_rgba(255,255,255,0.25),_inset_0_-4px_8px_rgba(0,0,0,0.65)] border border-maroon-900/80 cursor-pointer`}
      >
        {/* Outer Rotating Dotted Gold Decorative Ring */}
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-amber-300/40 pointer-events-none opacity-80" />

        {/* Inner Wax Ring */}
        <div className={`relative ${dim.inner} rounded-full bg-gradient-to-tl from-maroon-950 via-maroon-900 to-maroon-750 flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] border border-maroon-950/60 overflow-hidden`}>
          
          {/* Inner Accent Circle */}
          <div className="absolute inset-2 rounded-full border border-amber-300/30 pointer-events-none" />

          {/* Radial Gold Flare overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-transparent opacity-70" />

          {/* Gold Monogram SVG */}
          <div className="flex items-center justify-center text-center select-none pointer-events-none relative z-10">
            <svg className={dim.svg} viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="crest-gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1D6" />
                  <stop offset="35%" stopColor="#DFAC6C" />
                  <stop offset="70%" stopColor="#C68B45" />
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
