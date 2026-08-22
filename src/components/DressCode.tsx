import React from 'react';
import { Sparkles, Users, Shirt, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-24 bg-[#722F37] text-white" id="dress-code-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#E892A2]/[0.15] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-pink-200 text-xs font-semibold tracking-widest uppercase font-sans">Attire &amp; Etiquette</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white mt-2 mb-4">Dress Code</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#E892A2] to-transparent mx-auto relative mb-6" />
          <p className="text-pink-100/90 text-base md:text-lg max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite our cherished guests to celebrate with us in formal elegance.
          </p>
        </div>

        {/* Featured Tagline Banner */}
        <div className="bg-stone-900/85 text-white rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden text-center border border-[#E892A2]/30 backdrop-blur-md">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#E892A2]/15 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#E892A2] mb-3" />
            <p className="text-xs font-sans tracking-widest uppercase text-pink-200/90 font-bold mb-1">Official Dress Code</p>
            <h3 className="font-serif text-2xl md:text-4xl text-white font-medium my-2">
              {WEDDING_DETAILS.dressCode.formalTheme}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-sans mt-2 max-w-xl">
              We look forward to seeing everyone dressed in their finest formal attire for our special day.
            </p>
          </div>
        </div>

        {/* Ladies and Gentlemen Attire Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Ladies */}
          <div className="bg-stone-900/80 border border-[#E892A2]/30 rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E892A2]/20 text-pink-200 flex items-center justify-center border border-[#E892A2]/40">
                  <Heart className="w-5 h-5 text-[#E892A2]" />
                </div>
                <h4 className="font-serif text-xl text-pink-100 font-semibold">Ladies Attire</h4>
              </div>
              <p className="text-stone-200 text-sm font-serif leading-relaxed mt-2">
                {WEDDING_DETAILS.dressCode.ladies}
              </p>
              <p className="text-stone-400 text-xs mt-3 italic font-sans">
                Elegant evening gowns, midi formal dresses, or chic celebratory attire.
              </p>
            </div>
          </div>

          {/* Gentlemen */}
          <div className="bg-stone-900/80 border border-[#E892A2]/30 rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E892A2]/20 text-pink-200 flex items-center justify-center border border-[#E892A2]/40">
                  <Shirt className="w-5 h-5 text-[#E892A2]" />
                </div>
                <h4 className="font-serif text-xl text-pink-100 font-semibold">Gentlemen Attire</h4>
              </div>
              <p className="text-stone-200 text-sm font-serif leading-relaxed mt-2">
                {WEDDING_DETAILS.dressCode.gentlemen}
              </p>
              <p className="text-stone-400 text-xs mt-3 italic font-sans">
                Tailored suits, classic blazers with formal trousers, or distinguished traditional wear.
              </p>
            </div>
          </div>
        </div>

        {/* Special Guest Notes */}
        <div className="bg-stone-900/80 border border-[#E892A2]/30 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-[#E892A2]/20 text-pink-200 flex items-center justify-center shrink-0 border border-[#E892A2]/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-serif text-base font-medium text-pink-100 mb-1">Celebration Note</h5>
            <p className="text-stone-300 text-xs leading-relaxed font-serif">
              {WEDDING_DETAILS.dressCode.kidsNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
