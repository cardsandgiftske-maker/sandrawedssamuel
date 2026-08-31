import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import churchVenueImg from '../assets/images/church_venue_1784464948619.jpg';
import receptionVenueImg from '../assets/images/reception_venue_1784475057575.jpg';

export default function LocationMap() {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const venueInfo = activeVenue === 'ceremony' ? WEDDING_DETAILS.ceremony : WEDDING_DETAILS.reception;

  const getNavigationUrl = () => {
    const destination = encodeURIComponent(`${venueInfo.venue}, ${venueInfo.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#F2F7F4] via-[#E8F0EA] to-[#DFECE2] text-stone-900" id="maps-section">
      <div className="absolute inset-0 bg-[radial-gradient(#8FA89B_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-white/90 border border-[#8FA89B]/50 text-[#2D4D3D] text-xs font-bold tracking-widest uppercase font-sans shadow-sm mb-3">
            The Venues &amp; Schedule
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1B3426] mt-1 mb-4">When &amp; Where</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8FA89B] to-transparent mx-auto rounded-full" />
          <p className="text-[#2C4436] text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
            Find addresses, driving routes, and interactive maps for our wedding ceremony and reception celebration.
          </p>
        </div>

        {/* Date, Location, Time Info Panel (When & Where) - Organic Sage Botanical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto bg-white/95 border-2 border-[#8FA89B]/45 p-6 sm:p-8 rounded-3xl shadow-xl mb-12 relative z-10 backdrop-blur-md">
          {/* 1. Date Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E5EFE8] text-[#254232] border border-[#8FA89B]/40 flex items-center justify-center mb-3 shadow-sm">
              <Calendar className="w-6 h-6 text-[#254232]" />
            </div>
            <p className="text-xs text-[#426854] uppercase tracking-widest font-sans font-bold mb-1">The Date</p>
            <p className="text-sm text-stone-600 font-serif font-medium">Saturday</p>
            <p className="text-base text-[#1B3426] font-serif font-bold">October 17, 2026</p>
          </div>

          {/* 2. Schedule Card */}
          <div className="flex flex-col items-center text-center p-3 border-t sm:border-t-0 sm:border-l border-[#8FA89B]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#E5EFE8] text-[#254232] border border-[#8FA89B]/40 flex items-center justify-center mb-3 shadow-sm">
              <Clock className="w-6 h-6 text-[#254232]" />
            </div>
            <p className="text-xs text-[#426854] uppercase tracking-widest font-sans font-bold mb-1">Timeline</p>
            <p className="text-xs text-stone-850 font-sans font-bold">9:00 AM - Church</p>
            <p className="text-xs text-[#1B3426] font-sans font-bold mt-1">12:00 PM - Reception</p>
          </div>

          {/* 3. Church Venue Card */}
          <div className="flex flex-col items-center text-center p-3 border-t lg:border-t-0 lg:border-l border-[#8FA89B]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#E5EFE8] text-[#254232] border border-[#8FA89B]/40 flex items-center justify-center mb-3 shadow-sm">
              <MapPin className="w-6 h-6 text-[#254232]" />
            </div>
            <p className="text-xs text-[#426854] uppercase tracking-widest font-sans font-bold mb-1">Church Venue</p>
            <p className="text-sm text-[#1B3426] font-serif font-bold leading-snug">{WEDDING_DETAILS.ceremony.venue}</p>
            <p className="text-[11px] text-stone-600 font-sans mt-0.5">{WEDDING_DETAILS.ceremony.address.split(',')[0]}</p>
          </div>

          {/* 4. Reception Venue Card */}
          <div className="flex flex-col items-center text-center p-3 border-t sm:border-t-0 sm:border-l border-[#8FA89B]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#E5EFE8] text-[#254232] border border-[#8FA89B]/40 flex items-center justify-center mb-3 shadow-sm">
              <Compass className="w-6 h-6 text-[#254232]" />
            </div>
            <p className="text-xs text-[#426854] uppercase tracking-widest font-sans font-bold mb-1">Reception Venue</p>
            <p className="text-sm text-[#1B3426] font-serif font-bold leading-snug">{WEDDING_DETAILS.reception.venue}</p>
            <p className="text-[11px] text-stone-600 font-sans mt-0.5">Langata / Karen, Nairobi</p>
          </div>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/95 border-2 border-[#8FA89B]/40 p-1.5 rounded-full shadow-md backdrop-blur-md">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'ceremony' ? 'bg-[#2D4D3D] text-white shadow-md' : 'text-stone-700 hover:text-[#2D4D3D]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Ceremony (All Saints Cathedral)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'reception' ? 'bg-[#2D4D3D] text-white shadow-md' : 'text-stone-700 hover:text-[#2D4D3D]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>2. Reception (Marist University)</span>
            </button>
          </div>
        </div>

        {/* Info + Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border-2 border-[#8FA89B]/40 rounded-3xl shadow-xl relative overflow-hidden text-stone-900">
            {/* Venue Photo header */}
            <div className="relative h-52 w-full overflow-hidden border-b border-[#8FA89B]/30">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVenue}
                  src={activeVenue === 'ceremony' ? churchVenueImg : receptionVenueImg}
                  alt={venueInfo.venue}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-xs text-white font-sans font-bold px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                {activeVenue === 'ceremony' ? 'Part A: Church Service' : 'Part B: Reception Celebration'}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div className="space-y-6 z-10">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#1B3426] leading-tight font-bold">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-[#3F6652] text-xs tracking-wider uppercase font-sans font-bold">
                    {activeVenue === 'ceremony' ? 'Holy Matrimony Service' : 'Reception & Wedding Banquet'}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#8FA89B]/25">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E5EFE8] border border-[#8FA89B]/40 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#254232]" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-600 uppercase tracking-widest font-sans font-bold">Address</p>
                      <p className="text-sm text-stone-900 leading-normal mt-0.5 font-medium">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E5EFE8] border border-[#8FA89B]/40 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4 text-[#254232]" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-600 uppercase tracking-widest font-sans font-bold">Time</p>
                      <p className="text-sm text-stone-900 mt-0.5 font-medium">
                        {activeVenue === 'ceremony' ? '9:00 AM - 11:00 AM (Church Service)' : '12:00 Noon onwards (Arrival & Banquet)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-6 border-t border-[#8FA89B]/25 z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2D4D3D] to-[#1E382B] hover:from-[#1E382B] hover:to-[#2D4D3D] font-sans font-bold uppercase tracking-wider text-xs text-white rounded-2xl transition-all shadow-md hover:shadow-lg group active:scale-[0.98]"
                >
                  <span>Navigate on Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-8 bg-white border-2 border-[#8FA89B]/45 rounded-3xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[380px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[420px] border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
