import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    setIsOpened(true);

    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(6px)',
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-950/95 backdrop-blur-sm p-2 sm:p-4 md:p-6 select-none"
    >
      {/* Background ambient lighting in blush pink, dusty rose & rich burgundy */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#722F37]/55 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C86B85]/35 blur-[100px]" />
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#E892A2]/30 blur-[90px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-[#FFF0F3]/20 blur-[80px]" />
      </div>

      {/* Main Smartphone Envelope Container matching the luxurious wedding invitation frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          scale: 1.12, 
          y: -20, 
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[420px] aspect-[9/18.5] max-h-[92vh] bg-stone-900 rounded-[44px] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-stone-800 flex items-center justify-center overflow-hidden"
      >
        {/* Phone Frame Outer Shadow & Inner Screen Envelope */}
        <div className="relative w-full h-full bg-[#52131F] rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between border border-[#E892A2]/30">
          
          {/* Rich Burgundy, Dusty Rose & Blush Pink Envelope Flaps Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#661626] via-[#722F37] to-[#3D0C15] overflow-hidden">
            
            {/* Subtle Diagonal Texture / Fine Paper Grain Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFE4E8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Back Pocket Shadow with subtle rose vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none" />

            {/* ENVELOPE FLAPS OVERLAY LAYER */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              
              {/* Left Flap */}
              <motion.svg 
                animate={isOpened ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-0 w-full h-full drop-shadow-[6px_0_12px_rgba(0,0,0,0.4)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L200 350 L0 700 Z" fill="#6A1828" />
                <path d="M0 0 L200 350 L0 700" stroke="#C86B85" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d="M4 10 L194 350 L4 690" stroke="#E892A2" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="6 4" />
              </motion.svg>

              {/* Right Flap */}
              <motion.svg 
                animate={isOpened ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-0 w-full h-full drop-shadow-[-6px_0_12px_rgba(0,0,0,0.4)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M400 0 L200 350 L400 700 Z" fill="#5C1423" />
                <path d="M400 0 L200 350 L400 700" stroke="#C86B85" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d="M396 10 L206 350 L396 690" stroke="#E892A2" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="6 4" />
              </motion.svg>

              {/* Bottom Triangular Flap */}
              <motion.svg 
                animate={isOpened ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                className="absolute inset-0 w-full h-full drop-shadow-[0_-8px_16px_rgba(0,0,0,0.45)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 700 L200 350 L400 700 Z" fill="#50111E" />
                <path d="M0 700 L200 350 L400 700" stroke="#A84860" strokeWidth="1.5" strokeOpacity="0.45" />
                <path d="M15 694 L200 360 L385 694" stroke="#E892A2" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="6 4" />
              </motion.svg>

              {/* Top Flap (Folds down with Dusty Rose & Blush Pink beveled borders) */}
              <motion.svg 
                animate={isOpened ? { 
                  rotateX: 180, 
                  transformOrigin: 'top',
                  y: '-10%',
                  opacity: 0,
                  zIndex: 0
                } : { 
                  rotateX: 0,
                  transformOrigin: 'top',
                  y: 0,
                  opacity: 1,
                  zIndex: 20
                }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                className="absolute inset-0 w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L200 380 L400 0 Z" fill="#751A2C" />
                <path d="M0 0 L200 380 L400 0" stroke="#E892A2" strokeWidth="1.75" strokeOpacity="0.7" />
                <path d="M15 4 L200 365 L385 4" stroke="#FFF0F3" strokeWidth="0.75" strokeOpacity="0.35" strokeDasharray="6 4" />
              </motion.svg>

            </div>

          </div>

          {/* Top Header Text (Subtle Luxury Branding in Blush Pink & White) */}
          <div className="relative z-30 w-full text-center pt-8 px-6 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-[#E892A2]/30 mb-1">
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-sans font-extrabold text-[#FCD5DE] drop-shadow-sm block">
                WEDDING INVITATION
              </span>
            </div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-[0.08em] text-white mt-1 drop-shadow-md">
              Sandra weds Samuel
            </h1>
          </div>

          {/* Center Wax Seal in Blush Pink, Dusty Rose & Rich Burgundy */}
          <div className="relative z-30 flex-1 w-full flex items-center justify-center">
            <AnimatePresence>
              {isSealed && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ 
                    scale: 1.7, 
                    opacity: 0,
                    rotate: 12,
                    filter: 'blur(6px)'
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 160,
                    damping: 16,
                    exit: { duration: 0.7, ease: 'easeIn' }
                  }}
                  onClick={handleOpen}
                  className="relative cursor-pointer select-none group flex flex-col items-center justify-center"
                >
                  {/* Outer Blush Pink & Dusty Rose Ambient Glow */}
                  <div className="absolute -inset-8 rounded-full bg-[#E892A2]/35 blur-2xl group-hover:bg-[#FAD2E1]/50 transition-all duration-500 animate-pulse" style={{ animationDuration: '3.5s' }} />
                  <div className="absolute -inset-4 rounded-full bg-[#722F37]/40 blur-xl pointer-events-none" />

                  {/* Organic Melted Wax Seal SVG with Blush Pink, Dusty Rose & Burgundy Palette */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                    
                    {/* Organic Scalloped Wax Shape with custom multi-layer rose and burgundy gradients */}
                    <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
                      <defs>
                        {/* Outer Lip: Pearlescent Dusty Rose to Rich Burgundy */}
                        <linearGradient id="seal-lip-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFF0F3" />
                          <stop offset="25%" stopColor="#E892A2" />
                          <stop offset="55%" stopColor="#C86B85" />
                          <stop offset="85%" stopColor="#722F37" />
                          <stop offset="100%" stopColor="#4A121D" />
                        </linearGradient>

                        {/* Inner Wax Bed: Rich Velvet Burgundy with Dusty Rose undertone */}
                        <linearGradient id="seal-inner-bed" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#5E1624" />
                          <stop offset="50%" stopColor="#722F37" />
                          <stop offset="100%" stopColor="#3B0B14" />
                        </linearGradient>

                        {/* Monogram & Embossed Bezel: Shimmering Blush Pink & Dusty Rose Highlight */}
                        <linearGradient id="seal-emboss-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="30%" stopColor="#FFF0F3" />
                          <stop offset="70%" stopColor="#FAD2E1" />
                          <stop offset="100%" stopColor="#E892A2" />
                        </linearGradient>

                        <linearGradient id="seal-rim-sheen" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#C86B85" />
                          <stop offset="50%" stopColor="#FAD2E1" />
                          <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>

                        <filter id="seal-rose-shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#2A080F" floodOpacity="0.8" />
                        </filter>
                      </defs>

                      {/* Organic Hand-Stamped Wax Contour Outer Lip */}
                      <path 
                        d="M60 4 C72 2, 82 8, 92 14 C102 20, 112 28, 115 40 C118 52, 114 65, 110 76 C106 87, 100 98, 89 105 C78 112, 65 116, 52 115 C39 114, 26 109, 16 99 C6 89, 2 76, 4 62 C6 48, 12 36, 21 26 C30 16, 48 6, 60 4 Z" 
                        fill="url(#seal-lip-gradient)"
                        stroke="url(#seal-rim-sheen)"
                        strokeWidth="1.2"
                        opacity="0.99"
                      />

                      {/* Inner Pressed Deep Burgundy Wax Circle */}
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="44" 
                        fill="url(#seal-inner-bed)" 
                        stroke="#C86B85" 
                        strokeWidth="1.2"
                        strokeOpacity="0.8"
                      />

                      {/* Delicate Beaded / Dotted Rose Ring */}
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="40" 
                        fill="none" 
                        stroke="url(#seal-emboss-rose)" 
                        strokeWidth="0.85" 
                        strokeDasharray="2 3"
                        opacity="0.75"
                      />

                      {/* Botanical Laurel Flourish Under Monogram */}
                      <path
                        d="M48 72 C52 74, 56 75, 60 75 C64 75, 68 74, 72 72"
                        stroke="url(#seal-emboss-rose)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                      <circle cx="60" cy="75" r="1.5" fill="#FFF0F3" />
                      <circle cx="53" cy="73" r="1" fill="#FAD2E1" />
                      <circle cx="67" cy="73" r="1" fill="#FAD2E1" />

                      {/* Monogram Sandra & Samuel in Blush Pink Embossed Typography */}
                      <g filter="url(#seal-rose-shadow)">
                        <text 
                          x="60" 
                          y="62" 
                          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                          fontSize="14" 
                          fontWeight="bold"
                          fill="url(#seal-emboss-rose)"
                          textAnchor="middle"
                          letterSpacing="0.04em"
                        >
                          S &amp; S
                        </text>
                      </g>
                    </svg>

                  </div>

                  {/* Tap Seal instruction button with blush pink and dusty rose badge */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#400E17]/85 backdrop-blur-md border border-[#E892A2]/45 text-[#FFF0F3] font-sans text-xs tracking-wider uppercase font-bold shadow-lg animate-bounce" style={{ animationDuration: '2.5s' }}>
                      <Sparkles className="w-3.5 h-3.5 text-[#FAD2E1] animate-spin" style={{ animationDuration: '5s' }} />
                      <span>Tap Seal to Open</span>
                    </span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Footer Hashtag / Date / Matrimony */}
          <div className="relative z-10 w-full text-center pb-8 px-6 pointer-events-none flex flex-col items-center gap-1">
            <span className="text-[#FCD5DE] font-serif italic text-sm sm:text-base tracking-wider drop-shadow-sm font-medium">
              The Celebration of Holy Matrimony
            </span>
            <span className="text-[10px] text-pink-200/80 font-sans tracking-widest uppercase font-semibold">
              #SandraAndSamuel2026 • 17th October 2026
            </span>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
