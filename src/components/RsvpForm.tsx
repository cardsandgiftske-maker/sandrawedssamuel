import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, User, Phone, Check, Heart, Users, Utensils, Calendar, MapPin } from 'lucide-react';
import { RsvpGuest } from '../types';
import { WEDDING_DETAILS } from '../data';
import { saveRsvp, isFirebaseConfigured } from '../lib/firebase';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [peopleComingWith, setPeopleComingWith] = useState(0);
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        peopleComingWith: willAttend === 'yes' ? Math.max(0, Number(peopleComingWith)) : 0,
        adultsCount: willAttend === 'yes' ? 1 + Math.max(0, Number(peopleComingWith)) : 0,
        dietaryRequirements: dietaryRequirements.trim() || undefined,
        notes: notes.trim() || undefined,
        submittedAt: new Date().toISOString(),
      };

      await saveRsvp(newGuest);

      setSubmittedGuest(newGuest);
      setLoading(false);

      setFullName('');
      setPhoneNumber('');
      setPeopleComingWith(0);
      setDietaryRequirements('');
      setWillAttend('yes');
      setNotes('');

      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      setErrorMessage('Something went wrong saving your RSVP. Please try again.');
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative py-24 bg-[#FCFAF7] text-stone-850" id="rsvp-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#E892A2]/[0.08] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-[#C86B85] text-xs font-semibold tracking-widest uppercase font-sans">Celebration Attendance</span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Confirm Attendance</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C86B85] to-transparent mx-auto" />
            <p className="text-stone-700 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
              Kindly RSVP by 1st October 2026 to help us prepare for your presence. Thank you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-white border border-[#E892A2]/30 p-6 sm:p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-stone-900 flex items-center gap-2 font-medium">
                  <Mail className="w-5 h-5 text-[#722F37]" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    <span>Cloud Synced</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>Local Database</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-4" id="rsvp-wedding-form">
                
                {/* 1. Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Name <span className="text-[#722F37]">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandra Chebet"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50/60 border border-stone-200 focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]/20 rounded-xl px-4 py-3 text-sm text-stone-850 outline-none transition-all"
                  />
                </div>

                {/* 2. Phone Number input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>Phone Number <span className="text-[#722F37]">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50/60 border border-stone-200 focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]/20 rounded-xl px-4 py-3 text-sm text-stone-850 outline-none transition-all"
                  />
                </div>

                {/* Attendance toggle */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold block">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWillAttend('yes')}
                      className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        willAttend === 'yes'
                          ? 'bg-[#722F37] border-[#722F37] text-white shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Yes, attending</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWillAttend('no')}
                      className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-medium border rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        willAttend === 'no'
                          ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>

                {/* 3. Number of people coming with */}
                {willAttend === 'yes' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>Number of people coming with</span>
                      </span>
                      <span className="text-[11px] text-[#722F37] font-semibold">
                        {peopleComingWith === 0 ? 'Just myself (0)' : `+${peopleComingWith} ${peopleComingWith === 1 ? 'person' : 'people'}`}
                      </span>
                    </label>
                    
                    {/* Quick selection chips + custom counter */}
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPeopleComingWith(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer border ${
                            peopleComingWith === num
                              ? 'bg-[#722F37] border-[#722F37] text-white shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-pink-50 hover:border-pink-200'
                          }`}
                        >
                          {num === 0 ? '0 (None)' : `+${num}`}
                        </button>
                      ))}
                      <div className="w-16 shrink-0">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={peopleComingWith}
                          onChange={(e) => setPeopleComingWith(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-stone-50/60 border border-stone-200 focus:border-[#722F37] rounded-xl px-2.5 py-2 text-center text-xs font-bold text-stone-800 outline-none"
                          title="Custom number of accompanying guests"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-400 font-sans">
                      Indicate how many family members or plus-ones will accompany you.
                    </p>
                  </div>
                )}

                {/* 4. Any dietary requirements or allergies */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-stone-400" />
                    <span>Any dietary requirements or allergies</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Gluten-free, Nut allergy, None"
                    value={dietaryRequirements}
                    onChange={(e) => setDietaryRequirements(e.target.value)}
                    className="w-full bg-stone-50/60 border border-stone-200 focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]/20 rounded-xl px-4 py-3 text-sm text-stone-850 outline-none transition-all"
                  />
                </div>

                {/* Optional Message / Wishes */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Warm Wishes for the Couple (Optional)
                  </label>
                  <textarea
                    placeholder="Leave a sweet congratulatory message for Sandra & Samuel..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full bg-stone-50/60 border border-stone-200 focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]/20 rounded-xl px-4 py-2.5 text-sm text-stone-850 outline-none transition-all resize-none"
                  />
                </div>

                {/* Errors display */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-250 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 bg-[#722F37] hover:bg-[#5C242C] active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-pink-200" />
                      <span>Submit RSVP</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Confirmation / Info Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <AnimatePresence mode="wait">
                {submittedGuest ? (
                  /* Success Card */
                  <motion.div
                    key="success-card-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-[400px] bg-gradient-to-b from-white to-[#FFF9FA] border border-[#E892A2]/40 rounded-3xl p-6 sm:p-8 shadow-md relative flex flex-col overflow-hidden text-center"
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#722F37] to-transparent" />

                    <div className="flex flex-col items-center mb-4 pb-4 border-b border-stone-100">
                      <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-700 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-sans font-bold uppercase text-xs tracking-widest text-green-800">RSVP Received!</h4>
                      <p className="text-sm text-stone-700 font-serif mt-1">
                        Thank you, <span className="font-semibold text-stone-900">{submittedGuest.fullName}</span>!
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                          <span className="text-stone-500 font-sans uppercase text-[10px] font-bold">Attendance</span>
                          <span className="font-semibold text-[#722F37]">
                            {submittedGuest.willAttend === 'yes' ? 'Attending with pleasure' : 'Regretfully decline'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                          <span className="text-stone-500 font-sans uppercase text-[10px] font-bold">Phone Number</span>
                          <span className="font-mono text-stone-800">{submittedGuest.phoneNumber}</span>
                        </div>

                        {submittedGuest.willAttend === 'yes' && (
                          <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                            <span className="text-stone-500 font-sans uppercase text-[10px] font-bold">People Coming With</span>
                            <span className="font-semibold text-stone-800">
                              {submittedGuest.peopleComingWith === 0 ? '0 (Just yourself)' : `+${submittedGuest.peopleComingWith} guests (Total: ${1 + submittedGuest.peopleComingWith})`}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-stone-500 font-sans uppercase text-[10px] font-bold">Dietary / Allergies</span>
                          <span className="font-medium text-stone-800 italic">
                            {submittedGuest.dietaryRequirements || 'None'}
                          </span>
                        </div>
                      </div>

                      {submittedGuest.notes && (
                        <div className="bg-[#FFF0F3]/60 border border-[#E892A2]/30 rounded-2xl p-3.5 text-center italic font-serif text-xs text-stone-700">
                          “{submittedGuest.notes}”
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500 space-y-2">
                      <p className="font-serif">We look forward to celebrating with you on 17th October 2026!</p>
                      <button
                        onClick={() => setSubmittedGuest(null)}
                        className="text-[#722F37] hover:underline font-semibold block mx-auto cursor-pointer text-xs"
                      >
                        Submit another RSVP
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Info Card */
                  <motion.div
                    key="standard-info-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[400px] bg-white border border-[#E892A2]/30 shadow-md rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FFF0F3] border border-[#E892A2]/40 flex items-center justify-center text-[#722F37] shadow-sm">
                      <Heart className="w-7 h-7 text-[#722F37] fill-[#C86B85]/20" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-xl text-stone-850 font-semibold">Join Our Celebration</h4>
                      <p className="text-sm text-stone-600 font-serif leading-relaxed max-w-[280px] mx-auto">
                        Please confirm your presence so we can reserve your seat and cater to your dietary preferences.
                      </p>
                    </div>

                    <div className="w-full bg-[#FFF9FA] border border-[#E892A2]/30 rounded-2xl p-4 text-left space-y-2.5 text-xs text-stone-600 font-sans">
                      <div className="flex items-center gap-2 text-stone-800 font-semibold">
                        <Calendar className="w-4 h-4 text-[#722F37]" />
                        <span>Saturday, 17th October 2026</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-800 font-semibold">
                        <MapPin className="w-4 h-4 text-[#722F37]" />
                        <span>All Saints Cathedral &amp; Marist University</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-500 pt-1 border-t border-pink-100">
                        Reception entry reservations are based on confirmed RSVP counts.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 w-full text-[11px] text-[#C86B85] uppercase tracking-widest font-sans font-bold">
                      Kindly RSVP by 1st October 2026
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#722F37] hover:bg-[#5C242C] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-pink-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Confirm Attendance</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
