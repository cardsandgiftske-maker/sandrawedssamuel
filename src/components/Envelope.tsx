import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import rusticHallImage from '../assets/images/rustic_wedding_hall_1787674482870.jpg';

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
    }, 700);
  };

  const handleOpenManage = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new Event('open_admin_panel'));
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(4px)',
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background: Rustic Wedding Barn Hall with Ambient Warm Lights & Reflection */}
      <div className="absolute inset-0 z-0">
        <img
          src={rusticHallImage}
          alt="Wedding Venue Ballroom"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-90"
        />
        {/* Soft dark vignette & warm spotlight focused on envelope */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/25 to-black/70 pointer-events-none" />
      </div>

      {/* Discrete MANAGE access text in bottom right corner */}
      <button
        onClick={handleOpenManage}
        className="fixed bottom-4 right-5 z-30 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-sans text-stone-300/40 hover:text-stone-100/90 transition-all cursor-pointer select-none"
        title="Admin Portal"
      >
        MANAGE
      </button>

      {/* Main Envelope Wrapper */}
      <div className="relative z-10 p-4 w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.7, ease: 'easeOut' },
            scale: { duration: 0.7, ease: 'easeOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={handleOpen}
          className="relative w-full max-w-[500px] aspect-[1.56/1] cursor-pointer group select-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
        >
          {/* Outer Envelope Base (Clean Crisp White / Warm Ivory Paper) */}
          <div className="relative w-full h-full bg-[#FFFFFF] rounded-xs overflow-hidden shadow-2xl border border-stone-200/60">
            
            {/* Top V-Flap (Triangular flap pointing to the geometric center) */}
            <motion.div
              style={{ transformOrigin: 'top center' }}
              animate={
                isOpened
                  ? {
                      rotateX: 180,
                      zIndex: 0,
                      opacity: 0.8,
                      filter: 'drop-shadow(0 0 0 transparent)',
                    }
                  : {
                      rotateX: 0,
                      zIndex: 15,
                      opacity: 1,
                    }
              }
              transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
              className="absolute top-0 inset-x-0 h-1/2 z-15 pointer-events-none"
            >
              {/* Triangular Flap SVG */}
              <svg
                viewBox="0 0 500 160"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.08)]"
              >
                <path
                  d="M0 0 L250 160 L500 0 Z"
                  fill="#FAF7F2"
                />
                {/* Subtle soft gradient highlight on flap edge */}
                <path
                  d="M0 0 L250 160 L500 0"
                  stroke="#EBE5DC"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Subtle Diagonal Side Folds for Realistic Envelope Depth */}
            <svg
              viewBox="0 0 500 320"
              fill="none"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40"
            >
              {/* Left triangle fold line */}
              <line x1="0" y1="320" x2="250" y2="160" stroke="#EBE5DC" strokeWidth="0.8" />
              {/* Right triangle fold line */}
              <line x1="500" y1="320" x2="250" y2="160" stroke="#EBE5DC" strokeWidth="0.8" />
            </svg>

            {/* Four Subtle Corner Photo-Mount Accents in Warm Rose-Gold/Champagne */}
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="0,0 28,0 0,28" fill="#C89B7B" fillOpacity="0.45" />
                <polygon points="0,0 20,0 0,20" fill="#B3805E" fillOpacity="0.5" />
              </svg>
            </div>

            <div className="absolute top-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="28,0 0,0 28,28" fill="#C89B7B" fillOpacity="0.45" />
                <polygon points="28,0 8,0 28,20" fill="#B3805E" fillOpacity="0.5" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="0,28 28,28 0,0" fill="#C89B7B" fillOpacity="0.45" />
                <polygon points="0,28 20,28 0,8" fill="#B3805E" fillOpacity="0.5" />
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="28,28 0,28 28,0" fill="#C89B7B" fillOpacity="0.45" />
                <polygon points="28,28 8,28 28,8" fill="#B3805E" fillOpacity="0.5" />
              </svg>
            </div>

            {/* Center Wax Seal (Positioned at exact center of envelope) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25">
              <AnimatePresence>
                {isSealed && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 1.6,
                      opacity: 0,
                      rotate: 10,
                      filter: 'blur(4px)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 18,
                      exit: { duration: 0.55, ease: 'easeIn' },
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Subtle warm glow on hover */}
                    <div className="absolute -inset-3 rounded-full bg-[#8E381C]/20 blur-md group-hover:bg-[#C87545]/30 transition-all duration-300 pointer-events-none" />

                    {/* Circular Wax Seal SVG */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105 active:scale-95">
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <defs>
                          {/* Radial Gradient for 3D Wax Seal Body */}
                          <radialGradient id="wax-body-grad" cx="40%" cy="38%" r="60%">
                            <stop offset="0%" stopColor="#8A3419" />
                            <stop offset="35%" stopColor="#6C240E" />
                            <stop offset="75%" stopColor="#531B0A" />
                            <stop offset="100%" stopColor="#381005" />
                          </radialGradient>

                          {/* Outer Wax Lip Gradient */}
                          <linearGradient id="wax-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9C3F20" />
                            <stop offset="50%" stopColor="#5A1E0D" />
                            <stop offset="100%" stopColor="#2A0B03" />
                          </linearGradient>

                          {/* Inner Embossed Monogram Shadow */}
                          <filter id="seal-emboss-depth" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0.8" dy="1.2" stdDeviation="0.8" floodColor="#220601" floodOpacity="0.9" />
                          </filter>
                        </defs>

                        {/* Outer Stamped Wax Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="url(#wax-body-grad)"
                          stroke="url(#wax-rim-grad)"
                          strokeWidth="2"
                        />

                        {/* Embossed Outer Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#984424"
                          strokeWidth="1.2"
                          strokeOpacity="0.85"
                        />

                        {/* Embossed Inner Bezel Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="none"
                          stroke="#481406"
                          strokeWidth="1.4"
                          strokeOpacity="0.9"
                        />

                        {/* Monogram Sandra & Samuel in Elegant Italic Serif */}
                        <g filter="url(#seal-emboss-depth)">
                          <text
                            x="50"
                            y="56"
                            fontFamily="'Playfair Display', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif"
                            fontSize="21"
                            fontStyle="italic"
                            fontWeight="bold"
                            fill="#FBF5ED"
                            textAnchor="middle"
                            letterSpacing="0.02em"
                          >
                            SS
                          </text>
                        </g>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lower Invitation Text "You are invited" */}
            <div className="absolute bottom-5 inset-x-0 z-20 text-center pointer-events-none px-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-serif italic text-[13px] sm:text-[15px] text-[#4A4543] tracking-wide"
              >
                You are invited
              </motion.p>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
