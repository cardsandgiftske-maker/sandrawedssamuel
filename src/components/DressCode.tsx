import React from 'react';
import { Sparkles, Users, Info } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#FFF9FA] via-[#FAF2F4] to-[#F7EBEF] text-stone-850 overflow-hidden" id="dress-code-section">
      {/* Soft Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-[#F4A7B9]/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#E892A2]/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD1DC]/25 rounded-full blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E892A2]/40 shadow-xs mb-3">
            <span className="text-[#5A1827] text-xs font-bold tracking-widest uppercase font-sans">Attire &amp; Etiquette</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-light text-[#5A1827] mt-1 mb-3">Dress Code</h2>
          
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#E892A2]" />
            <span className="text-[#5A1827] text-xs">❖</span>
            <span className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#E892A2]" />
          </div>

          <p className="text-stone-700 text-base md:text-lg max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite our cherished guests to celebrate with us in formal elegance.
          </p>
        </div>

        {/* Featured Tagline Banner */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-8 sm:p-10 mb-8 shadow-[0_15px_40px_rgba(90,24,39,0.06)] relative overflow-hidden text-center border border-[#E892A2]/40">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF5F7] border border-[#E892A2]/40 flex items-center justify-center shadow-inner mb-3">
              <Sparkles className="w-7 h-7 text-[#C5A059]" />
            </div>
            
            <span className="px-3 py-1 rounded-full bg-[#FAF0F2] text-[#5A1827] text-[11px] uppercase font-bold tracking-widest font-sans border border-[#E892A2]/30 mb-2">
              Wedding Attire
            </span>

            <h3 className="font-serif text-3xl md:text-4xl text-[#5A1827] font-bold my-2 tracking-wide">
              {WEDDING_DETAILS.dressCode.formalTheme}
            </h3>

            <p className="text-stone-600 text-sm md:text-base font-serif max-w-lg mt-1 mb-4 leading-relaxed">
              We look forward to seeing everyone dressed in their finest formal attire to celebrate our special day.
            </p>

            {/* Reassurance note about no color restrictions */}
            <div className="mt-2 p-4 bg-[#FFF9FA] border border-[#E892A2]/30 rounded-2xl max-w-xl text-stone-700 text-xs sm:text-sm font-sans flex items-start gap-2.5 text-left shadow-xs">
              <Info className="w-4 h-4 text-[#5A1827] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-[#5A1827]">Theme Note:</strong> Our wedding celebration theme is Pink &amp; Burgundy, but <span className="font-semibold text-stone-900">guests are not restricted to these colors</span>. Please feel free to wear any color of your choice that makes you feel celebratory and elegant!
              </p>
            </div>
          </div>
        </div>

        {/* Celebration Note */}
        <div className="bg-white/90 border border-stone-200/80 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-xs shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] text-[#5A1827] flex items-center justify-center shrink-0 border border-[#E892A2]/30 shadow-xs">
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

