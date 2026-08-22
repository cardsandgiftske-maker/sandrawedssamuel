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
    <section className="relative py-24 bg-[#1E0A12] text-stone-100" id="maps-section">
      <div className="absolute inset-0 bg-radial-gradient from-[#E892A2]/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#E892A2] text-xs font-semibold tracking-widest uppercase font-sans">The Venue &amp; Schedule</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white mt-2 mb-4">When &amp; Where</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#E892A2]/60 to-transparent mx-auto" />
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            Find addresses, driving routes, and interactive maps for our wedding ceremony and reception celebration.
          </p>
        </div>

        {/* Date, Location, Time Info Panel (When & Where) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto bg-stone-900/90 border border-[#E892A2]/30 p-6 rounded-2xl shadow-xl mb-12 relative z-10 backdrop-blur-md">
          {/* Calendar Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#E892A2]/15 text-[#E892A2] flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-pink-200/80 uppercase tracking-widest font-sans font-semibold mb-1">The Date</p>
            <p className="text-sm text-stone-200 font-serif font-medium">Saturday</p>
            <p className="text-base text-[#E892A2] font-serif font-semibold">October 17, 2026</p>
          </div>

          {/* Time Card */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-stone-800">
            <div className="w-10 h-10 rounded-full bg-[#E892A2]/15 text-[#E892A2] flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-pink-200/80 uppercase tracking-widest font-sans font-semibold mb-1">The Time</p>
            <p className="text-sm text-stone-200 font-serif font-medium">Church: 9:00 AM</p>
            <p className="text-xs text-[#E892A2] font-sans mt-1 font-medium">Reception: 12:00 Noon</p>
          </div>

          {/* Venue Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#E892A2]/15 text-[#E892A2] flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs text-pink-200/80 uppercase tracking-widest font-sans font-semibold mb-1">Ceremony Venue</p>
            <p className="text-sm text-stone-200 font-serif font-medium leading-tight">{WEDDING_DETAILS.ceremony.venue}</p>
            <p className="text-xs text-pink-300/90 font-sans mt-1 font-medium">Nairobi, Kenya</p>
          </div>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-stone-900/80 border border-[#E892A2]/30 p-1.5 rounded-full shadow-inner backdrop-blur-md">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'ceremony' ? 'bg-[#722F37] text-white shadow-md' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4 text-[#E892A2]" />
              <span>1. Ceremony (All Saints Cathedral)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'reception' ? 'bg-[#722F37] text-white shadow-md' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Navigation className="w-4 h-4 text-[#E892A2]" />
              <span>2. Reception (Marist University)</span>
            </button>
          </div>
        </div>

        {/* Info + Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-stone-900/90 border border-[#E892A2]/30 rounded-2xl shadow-xl relative overflow-hidden text-stone-100">
            {/* Venue Photo header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-stone-800">
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
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-8 flex flex-col justify-between flex-1">
              <div className="space-y-6 z-10">
                <span className="text-[10px] tracking-widest uppercase font-sans font-extrabold text-[#E892A2] px-3 py-1 bg-[#E892A2]/10 rounded-full border border-[#E892A2]/30 inline-block">
                  {activeVenue === 'ceremony' ? 'Part A: Church Service' : 'Part B: Reception Celebration'}
                </span>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight font-medium">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-[#E892A2]/90 text-xs tracking-wider uppercase font-sans font-medium">
                    {activeVenue === 'ceremony' ? 'Holy Matrimony Service' : 'Reception & Wedding Banquet'}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E892A2] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Address</p>
                      <p className="text-sm text-stone-200 leading-normal mt-0.5">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[#E892A2] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Time</p>
                      <p className="text-sm text-stone-200 mt-0.5">
                        {activeVenue === 'ceremony' ? '9:00 AM - 11:00 AM (Church Service)' : '12:00 Noon onwards (Arrival & Banquet)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-6 border-t border-stone-800 z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37]/60 border border-[#E892A2]/40 hover:bg-[#722F37] hover:text-white font-sans font-bold uppercase tracking-wider text-xs text-pink-200 rounded-xl transition-all shadow-md group"
                >
                  <span>Navigate on Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-8 bg-stone-900 border border-[#E892A2]/30 rounded-2xl overflow-hidden min-h-[350px] lg:min-h-auto flex shadow-xl relative animate-fade-in">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[350px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[400px] border-0 filter contrast-[0.98] hover:contrast-100 transition-all duration-500"
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
