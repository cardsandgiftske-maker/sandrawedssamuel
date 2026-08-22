import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Gift, Shirt, Sparkles, Mail, Camera, ChevronUp, Heart } from 'lucide-react';
import Hero from './components/Hero';
import LoveStory from './components/LoveStory';
import Program from './components/Program';
import DressCode from './components/DressCode';
import Gifting from './components/Gifting';
import LocationMap from './components/LocationMap';
import GuestPhotoUpload from './components/GuestPhotoUpload';
import RsvpForm from './components/RsvpForm';
import AdminPanel from './components/AdminPanel';
import Envelope from './components/Envelope';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  useEffect(() => {
    if (!isEnvelopeOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEnvelopeOpened]);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpened(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = ['hero-section', 'love-story-section', 'maps-section', 'program-section', 'dress-code-section', 'gifting-section', 'gallery-section', 'rsvp-section'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero-section', label: 'Welcome', icon: Sparkles },
    { id: 'love-story-section', label: 'Our Story', icon: Heart },
    { id: 'maps-section', label: 'When & Where', icon: MapPin },
    { id: 'program-section', label: 'Program', icon: Calendar },
    { id: 'dress-code-section', label: 'Dress Code', icon: Shirt },
    { id: 'gifting-section', label: 'Gifting', icon: Gift },
    { id: 'gallery-section', label: 'Photo QR', icon: Camera },
    { id: 'rsvp-section', label: 'RSVP', icon: Mail },
  ];

  return (
    <>
      <MusicPlayer shouldPlay={shouldPlayMusic} />
      
      <AnimatePresence>
        {!isEnvelopeOpened && (
          <Envelope 
            onOpen={handleEnvelopeOpen} 
            onSealBreak={() => setShouldPlayMusic(true)} 
          />
        )}
      </AnimatePresence>

      {isEnvelopeOpened && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative min-h-screen bg-[#FCFAF7] text-stone-800 font-sans selection:bg-[#FCE4EC] selection:text-[#722F37] overflow-x-hidden antialiased"
        >
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-500/[0.02] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#FCFAF7]" />
        </div>

      {/* Floating Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-pink-100/60 transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo Name */}
          <button 
            onClick={() => scrollToSection('hero-section')}
            className="font-serif text-lg tracking-widest font-bold cursor-pointer flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span className="text-[#722F37]">SANDRA</span>
            <span className="text-[#C86B85] font-sans text-xs italic">&amp;</span>
            <span className="text-[#722F37]">SAMUEL</span>
          </button>

          {/* Desktop Nav menu items */}
          <nav className="hidden md:flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-stone-500">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer hover:text-stone-950 ${
                    activeSection === item.id 
                      ? 'bg-[#722F37] text-white font-bold shadow-sm' 
                      : 'border border-transparent hover:bg-pink-50'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Direct Action Button */}
          <button
            onClick={() => scrollToSection('rsvp-section')}
            className="md:hidden px-4 py-1.5 bg-[#722F37] hover:bg-[#5C242C] text-white font-sans font-extrabold text-[10px] uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-sm"
          >
            RSVP NOW
          </button>
        </div>
      </header>

      {/* Main Content Sections Wrapper */}
      <main className="relative z-10 pt-16">
        <Hero />
        <LoveStory />
        <LocationMap />
        <Program />
        <DressCode />
        <Gifting />
        <GuestPhotoUpload />
        <RsvpForm />
      </main>

      {/* Couple Administrative Database Section */}
      <AdminPanel />

      {/* Desktop Vertical Indicator Navigation Dots (Right Edge) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 items-center">
        {navItems.map((item) => (
          <button
            key={`dot-${item.id}`}
            onClick={() => scrollToSection(item.id)}
            className="group relative flex items-center justify-end"
            title={item.label}
          >
            <span className="absolute right-full mr-4 bg-white/95 border border-[#E892A2]/30 px-2.5 py-1 rounded text-[10px] font-sans font-bold uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-[#722F37]">
              {item.label}
            </span>
            <span className={`w-2.5 h-2.5 rounded-full border transition-all ${
              activeSection === item.id 
                ? 'bg-[#722F37] border-[#C86B85] scale-125' 
                : 'bg-stone-200 border-stone-300/80 group-hover:border-[#E892A2] group-hover:scale-110'
            }`} />
          </button>
        ))}
      </div>

      {/* Floating scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 left-6 z-45"
            id="scroll-to-top-button-container"
          >
            <button
              onClick={() => scrollToSection('hero-section')}
              className="p-3 bg-white hover:bg-pink-50 border border-stone-200/80 text-[#722F37] rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
              title="Scroll to Top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    )}
    </>
  );
}
