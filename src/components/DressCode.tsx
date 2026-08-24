import React from 'react';
import { Sparkles, Users, Shirt, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#FAF0F3] via-[#FCE4EC] to-[#F8D7E0] text-stone-850 overflow-hidden" id="dress-code-section">
      {/* Dynamic Background: Multi-layer Shades of Pink with Glowing Dusty Blue Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Pink Ambient Wash */}
        <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-[#F4A7B9]/35 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#E892A2]/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD1DC]/40 rounded-full blur-[90px]" />

        {/* Luminous Dusty Blue & Serenity Blue Accent Glows */}
        <div className="absolute top-12 right-10 w-[380px] h-[380px] bg-[#7096D1]/25 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-16 left-12 w-[340px] h-[340px] bg-[#93C5FD]/30 rounded-full blur-[95px]" />
        <div className="absolute top-2/3 right-1/4 w-[280px] h-[280px] bg-[#60A5FA]/20 rounded-full blur-[80px]" />

        {/* Subtle Geometric Dot Grid with Blue and Pink Tint */}
        <div className="absolute inset-0 bg-[radial-gradient(#60A5FA_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#93C5FD]/60 shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E892A2]" />
            <span className="text-[#5A1827] text-xs font-bold tracking-widest uppercase font-sans">Attire &amp; Etiquette</span>
            <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-light text-[#5A1827] mt-1 mb-3">Dress Code</h2>
          
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#E892A2]" />
            <span className="text-[#3B82F6] text-xs">❖</span>
            <span className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#60A5FA]" />
          </div>

          <p className="text-stone-700 text-base md:text-lg max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite our cherished guests to celebrate with us in formal elegance with harmonious touches of soft rose, blush, and dusty blue.
          </p>
        </div>

        {/* Featured Tagline Banner with Pink & Blue Glassmorphism */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 mb-10 shadow-[0_20px_50px_rgba(90,24,39,0.08)] relative overflow-hidden text-center border-2 border-pink-200/90 hover:border-[#93C5FD] transition-colors duration-500">
          {/* Decorative Corner Glows */}
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#93C5FD]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-[#F4A7B9]/35 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF0F4] to-[#EBF3FC] border border-[#93C5FD]/60 flex items-center justify-center shadow-inner mb-3">
              <Sparkles className="w-7 h-7 text-[#D4AF37]" />
            </div>
            
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100/80 text-[#5A1827] text-[10px] uppercase font-bold tracking-widest font-sans border border-pink-200">
                Wedding Theme
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#1E40AF] text-[10px] uppercase font-bold tracking-widest font-sans border border-blue-200">
                Palette Touches
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl text-[#5A1827] font-bold my-2 tracking-wide">
              {WEDDING_DETAILS.dressCode.formalTheme}
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm font-sans mt-2 max-w-xl leading-relaxed">
              We look forward to seeing everyone dressed in their finest formal attire to celebrate our special day with timeless grace.
            </p>
          </div>
        </div>

        {/* Ladies (Pink Accented) and Gentlemen (Blue Accented) Attire Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Ladies Card - Soft Rose & Blush Pink Focus */}
          <div className="bg-gradient-to-br from-white/95 via-[#FFF6F8] to-[#FFF0F4] border-2 border-[#E892A2]/70 rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between shadow-[0_10px_30px_rgba(232,146,162,0.15)] relative overflow-hidden group hover:border-[#E892A2] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#E892A2]/15 rounded-bl-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-100 text-[#5A1827] flex items-center justify-center border border-pink-200 shadow-xs">
                    <Heart className="w-5 h-5 text-[#C86B85]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C86B85] font-sans block">For Her</span>
                    <h4 className="font-serif text-xl text-[#5A1827] font-bold">Ladies Attire</h4>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-pink-100/90 text-[#722F37] font-bold font-sans">
                  Formal
                </span>
              </div>
              
              <p className="text-stone-800 text-sm font-serif leading-relaxed mt-3 font-medium">
                {WEDDING_DETAILS.dressCode.ladies}
              </p>
              
              <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-between text-xs text-stone-600 font-sans">
                <span className="italic">Evening gowns, midi formal dresses, chic formal wear</span>
                <span className="w-3 h-3 rounded-full bg-[#E892A2] shrink-0 ml-2" title="Blush & Rose Palette" />
              </div>
            </div>
          </div>

          {/* Gentlemen Card - Dusty Blue & Slate Focus */}
          <div className="bg-gradient-to-br from-white/95 via-[#F6F9FE] to-[#EFF6FF] border-2 border-[#93C5FD]/80 rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between shadow-[0_10px_30px_rgba(59,130,246,0.12)] relative overflow-hidden group hover:border-[#60A5FA] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#93C5FD]/20 rounded-bl-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1E40AF] flex items-center justify-center border border-blue-200 shadow-xs">
                    <Shirt className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#2563EB] font-sans block">For Him</span>
                    <h4 className="font-serif text-xl text-[#1E3A8A] font-bold">Gentlemen Attire</h4>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100/90 text-[#1E40AF] font-bold font-sans">
                  Formal
                </span>
              </div>
              
              <p className="text-stone-800 text-sm font-serif leading-relaxed mt-3 font-medium">
                {WEDDING_DETAILS.dressCode.gentlemen}
              </p>
              
              <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs text-stone-600 font-sans">
                <span className="italic">Tailored suits, blazers with trousers, or formal traditional wear</span>
                <span className="w-3 h-3 rounded-full bg-[#60A5FA] shrink-0 ml-2" title="Dusty Blue Palette" />
              </div>
            </div>
          </div>
        </div>

        {/* Special Guest Celebration Note with Pink & Blue Dual Trim */}
        <div className="bg-white/90 border-2 border-gradient-to-r from-pink-200 to-blue-200 border-pink-200/80 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-md shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-blue-100 text-[#5A1827] flex items-center justify-center shrink-0 border border-blue-200/70 shadow-xs">
            <Users className="w-5 h-5 text-[#5A1827]" />
          </div>
          <div>
            <h5 className="font-serif text-base font-bold text-[#5A1827] mb-1">Celebration Note</h5>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-serif">
              {WEDDING_DETAILS.dressCode.kidsNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

