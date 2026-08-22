import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, Award, Compass, Music, MessageCircle, Gift, Cake, LogOut, Camera, Users, Sparkles, Heart } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string, isChurch: boolean) => {
    const t = title.toLowerCase();
    const colorClass = isChurch ? 'text-[#722F37]' : 'text-[#C86B85]';
    if (t.includes('arrival') || t.includes('ushering')) return <Clock className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('church') || t.includes('service') || t.includes('matrimony') || t.includes('mass')) return <Award className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('photo') || t.includes('shoot')) return <Camera className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('mocktail') || t.includes('cocktail') || t.includes('welcome') || t.includes('lunch') || t.includes('banquet')) return <CheckCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('entertainment') || t.includes('dance') || t.includes('music')) return <Music className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('speech') || t.includes('tribute')) return <MessageCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('cake')) return <Cake className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('gift') || t.includes('thanks') || t.includes('envelope')) return <Gift className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('closing') || t.includes('prayer') || t.includes('departure')) return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    return <Users className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section className="relative py-24 bg-[#FCFAF7] text-stone-900" id="program-section">
      <div className="absolute inset-0 bg-radial-gradient from-[#E892A2]/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[#C86B85] text-xs font-semibold tracking-widest uppercase font-sans">The Order of Events</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Wedding Programme</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C86B85] to-transparent mx-auto" />
          <p className="text-stone-700 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            “Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.” <br />
            <span className="text-[#722F37] uppercase font-sans text-xs tracking-wider font-semibold not-italic block mt-1">— 1 Corinthians 13:4,7</span>
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-stone-200/80 p-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-[#722F37] text-white font-semibold shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Full Programme
            </button>
            <button
              onClick={() => setActiveTab('church')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'church' ? 'bg-[#722F37] text-white font-semibold shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Church Service
            </button>
            <button
              onClick={() => setActiveTab('reception')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'reception' ? 'bg-[#C86B85] text-white font-semibold shadow-sm animate-fade-in' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reception
            </button>
          </div>
        </div>

        {/* Program Timeline */}
        <div className="relative border-l-2 border-[#E892A2]/40 ml-6 md:ml-40 pl-8 md:pl-12 pb-4 space-y-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`program-item-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative"
            >
              {/* Date/Time Left Sidebar Anchor (Desktop only) */}
              <div className="hidden md:flex absolute right-full mr-32 top-1 items-center justify-end text-right w-28 pointer-events-none">
                <div className="flex flex-col items-end">
                  <span className={`${item.isChurch ? 'text-[#722F37]' : 'text-[#C86B85]'} font-serif font-bold text-sm tracking-tight`}>
                    {item.time.split(' - ')[0]}
                  </span>
                  <span className="text-stone-500 font-sans text-[10px] uppercase tracking-wider font-semibold">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Timeline Icon Node */}
              <div className={`absolute -left-[32px] md:-left-[48px] -translate-x-1/2 top-1 w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center shadow-sm z-10 ${
                item.isChurch ? 'border-[#722F37]/40 text-[#722F37]' : 'border-[#C86B85]/40 text-[#C86B85]'
              }`}>
                {getIconForTitle(item.title, item.isChurch)}
              </div>

              {/* Program Detail Card */}
              <div className="bg-white border border-stone-200/70 rounded-2xl p-6 hover:border-[#E892A2] transition-all shadow-sm hover:shadow-md group">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className={`text-lg md:text-xl font-serif font-medium text-stone-900 ${
                    item.isChurch ? 'group-hover:text-[#722F37]' : 'group-hover:text-[#C86B85]'
                  } transition-colors`}>
                    {item.title}
                  </h4>
                  {/* Category Pill */}
                  <span className={`text-[9px] uppercase tracking-wider font-sans font-semibold px-2.5 py-1 rounded-full ${
                    item.isChurch 
                      ? 'bg-[#FFF0F3] text-[#722F37] border border-[#E892A2]/40' 
                      : 'bg-[#FFF5F7] text-[#C86B85] border border-[#E892A2]/40'
                  }`}>
                    {item.isChurch ? 'Church Service' : 'Reception'}
                  </span>
                </div>

                {/* Time & Duration Badge inside card */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-50 border border-stone-200/80 rounded-lg text-stone-700 text-xs font-sans font-semibold mt-1">
                  <Clock className={`w-3.5 h-3.5 ${item.isChurch ? 'text-[#722F37]' : 'text-[#C86B85]'}`} />
                  <span>{item.time}</span>
                  <span className="text-stone-400 font-normal">|</span>
                  <span className="text-stone-500 font-normal text-[11px]">{item.duration}</span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-stone-600 font-serif text-sm md:text-base mt-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing card */}
        <div className="mt-16 text-center bg-white border border-[#E892A2]/30 p-6 rounded-2xl max-w-xl mx-auto shadow-sm">
          <p className="font-serif text-[#722F37] italic text-base">
            “We look forward to celebrating this joyous occasion with you as we say ‘I Do’”
          </p>
        </div>
      </div>
    </section>
  );
}

