import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, User, Phone, Check, Heart, Utensils, Calendar, MapPin, Lock } from 'lucide-react';
import { RsvpGuest } from '../types';
import { saveRsvp, findRsvpByPhone, isFirebaseConfigured } from '../lib/firebase';

const LOCAL_USER_RSVP_KEY = 'sandra_samuel_user_rsvp';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  // Check if guest previously submitted on this device
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_RSVP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName && parsed.phoneNumber) {
          setSubmittedGuest(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

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

    const trimmedName = fullName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!trimmedPhone) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      // Check if this phone number has already submitted an RSVP
      const existingRsvp = await findRsvpByPhone(trimmedPhone);
      if (existingRsvp) {
        setErrorMessage(`An RSVP has already been submitted for phone number "${trimmedPhone}" (${existingRsvp.fullName}). Each phone number can only submit once.`);
        setLoading(false);
        return;
      }

      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: trimmedName,
        phoneNumber: trimmedPhone,
        willAttend,
        adultsCount: willAttend === 'yes' ? 1 : 0,
        dietaryRequirements: dietaryRequirements.trim() || 'None',
        notes: notes.trim() || '',
        submittedAt: new Date().toISOString(),
      };

      await saveRsvp(newGuest);

      // Save locally to lock this device to their submission
      try {
        localStorage.setItem(LOCAL_USER_RSVP_KEY, JSON.stringify(newGuest));
      } catch {
        // ignore
      }

      setSubmittedGuest(newGuest);
      setLoading(false);

      setFullName('');
      setPhoneNumber('');
      setDietaryRequirements('');
      setWillAttend('yes');
      setNotes('');

      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      console.error('Error in RSVP submission:', err);
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
      <section className="relative py-24 bg-[#F2F7FA] text-stone-850" id="rsvp-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#7D9BA8]/15 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#E0ECF3] border border-[#7D9BA8]/40 text-[#2C4D5E] text-xs font-bold tracking-widest uppercase font-sans shadow-xs mb-3">
              Celebration Attendance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#5A1827] mt-1 mb-4">Confirm Attendance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7D9BA8] to-transparent mx-auto rounded-full" />
            <p className="text-stone-700 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
              Kindly RSVP by <span className="font-bold text-[#5A1827] not-italic font-sans">1st October 2026</span> to help us prepare for your presence. Thank you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column with Dusty Blue Accents and Deep Burgundy Elements */}
            <div className="md:col-span-6 bg-white border-2 border-[#7D9BA8]/40 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#7D9BA8]/20">
                <h3 className="font-serif text-xl text-[#5A1827] flex items-center gap-2 font-bold">
                  <Mail className="w-5 h-5 text-[#4B738A]" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-[#2C4D5E] bg-[#E0ECF3] border border-[#7D9BA8]/40 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 bg-[#4B738A] rounded-full animate-pulse" />
                    <span>Cloud Synced</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-600 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>Local Database</span>
                  </span>
                )}
              </div>

              {submittedGuest ? (
                /* Already Submitted Notice in Place of Form */
                <div className="py-6 px-4 bg-[#F2F7FA] border-2 border-[#7D9BA8]/30 rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 bg-white border-2 border-[#4B738A]/40 rounded-full flex items-center justify-center mx-auto text-[#4B738A] shadow-xs">
                    <Lock className="w-5 h-5 text-[#4B738A]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#5A1827]">
                      Attendance Already Confirmed
                    </h4>
                    <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed max-w-sm mx-auto">
                      An RSVP has already been submitted for <span className="font-bold text-stone-900">{submittedGuest.fullName}</span> ({submittedGuest.phoneNumber}).
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-[#7D9BA8]/30 rounded-xl text-[11px] text-stone-600 font-sans">
                    Each phone number is limited to one RSVP. If you need to make changes to your reservation, please contact Sandra &amp; Samuel directly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4" id="rsvp-wedding-form">
                  
                  {/* 1. Full Names input */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#2C4D5E] font-sans font-bold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#4B738A]" />
                      <span>Full Names <span className="text-[#5A1827]">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Kiptoo & Samuel Ochieng"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F7FAFC] border-2 border-[#7D9BA8]/30 focus:border-[#4B738A] focus:ring-2 focus:ring-[#7D9BA8]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all font-medium"
                    />
                    <p className="text-[11px] text-stone-500 font-sans">
                      Please enter the full name(s) of guest(s) attending.
                    </p>
                  </div>

                  {/* 2. Phone Number input */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#2C4D5E] font-sans font-bold flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#4B738A]" />
                      <span>Phone Number <span className="text-[#5A1827]">*</span></span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#F7FAFC] border-2 border-[#7D9BA8]/30 focus:border-[#4B738A] focus:ring-2 focus:ring-[#7D9BA8]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all font-medium"
                    />
                    <p className="text-[11px] text-stone-500 font-sans">
                      One RSVP per phone number.
                    </p>
                  </div>

                  {/* Attendance toggle with Deep Burgundy & Dusty Blue styling */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-[#2C4D5E] font-sans font-bold block">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWillAttend('yes')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-bold border-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          willAttend === 'yes'
                            ? 'bg-[#5A1827] border-[#5A1827] text-white shadow-md'
                            : 'bg-[#F2F7FA] border-[#7D9BA8]/40 text-[#2C4D5E] hover:border-[#4B738A]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Yes, attending</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWillAttend('no')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-bold border-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          willAttend === 'no'
                            ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs'
                            : 'bg-[#F2F7FA] border-[#7D9BA8]/40 text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Any dietary requirements or allergies */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-[#2C4D5E] font-sans font-bold flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-[#4B738A]" />
                      <span>Any dietary requirements or allergies</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Gluten-free, Nut allergy, None"
                      value={dietaryRequirements}
                      onChange={(e) => setDietaryRequirements(e.target.value)}
                      className="w-full bg-[#F7FAFC] border-2 border-[#7D9BA8]/30 focus:border-[#4B738A] focus:ring-2 focus:ring-[#7D9BA8]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Optional Message / Wishes */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-stone-600 font-sans font-bold block">
                      Warm Wishes for the Couple (Optional)
                    </label>
                    <textarea
                      placeholder="Leave a sweet congratulatory message for Sandra & Sam..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-[#F7FAFC] border-2 border-[#7D9BA8]/30 focus:border-[#4B738A] focus:ring-2 focus:ring-[#7D9BA8]/20 rounded-xl px-4 py-2.5 text-sm text-stone-900 outline-none transition-all resize-none font-medium"
                    />
                  </div>

                  {/* Errors display */}
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 font-semibold leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit button: Dusty Blue CTA button with Deep Burgundy Primary text */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#4B738A] via-[#3D647A] to-[#4B738A] hover:from-[#3D647A] hover:to-[#2F5369] active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F2D7DC]" />
                        <span className="tracking-widest">Submit RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              )}
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
                    className="w-full max-w-[400px] bg-white border-2 border-[#7D9BA8]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative flex flex-col overflow-hidden text-center"
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B738A] via-[#5A1827] to-[#4B738A]" />

                    <div className="flex flex-col items-center mb-4 pb-4 border-b border-[#7D9BA8]/20">
                      <div className="w-12 h-12 bg-[#E0ECF3] border-2 border-[#7D9BA8]/50 text-[#2C4D5E] rounded-full flex items-center justify-center mb-3 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-[#2C4D5E]" />
                      </div>
                      <h4 className="font-sans font-bold uppercase text-xs tracking-widest text-[#2C4D5E]">RSVP Received!</h4>
                      <p className="text-sm text-stone-800 font-serif mt-1">
                        Thank you, <span className="font-bold text-[#5A1827]">{submittedGuest.fullName}</span>!
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="bg-[#F2F7FA] border-2 border-[#7D9BA8]/30 rounded-2xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-[#7D9BA8]/20">
                          <span className="text-[#2C4D5E] font-sans uppercase text-[10px] font-bold">Full Name(s)</span>
                          <span className="font-bold text-stone-900">
                            {submittedGuest.fullName}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-[#7D9BA8]/20">
                          <span className="text-[#2C4D5E] font-sans uppercase text-[10px] font-bold">Attendance</span>
                          <span className="font-bold text-[#5A1827]">
                            {submittedGuest.willAttend === 'yes' ? 'Attending with pleasure' : 'Regretfully decline'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-[#7D9BA8]/20">
                          <span className="text-[#2C4D5E] font-sans uppercase text-[10px] font-bold">Phone Number</span>
                          <span className="font-mono text-stone-900 font-bold">{submittedGuest.phoneNumber}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#2C4D5E] font-sans uppercase text-[10px] font-bold">Dietary / Allergies</span>
                          <span className="font-medium text-stone-800 italic">
                            {submittedGuest.dietaryRequirements || 'None'}
                          </span>
                        </div>
                      </div>

                      {submittedGuest.notes && (
                        <div className="bg-white border-2 border-[#7D9BA8]/30 rounded-2xl p-3.5 text-center italic font-serif text-xs text-stone-800">
                          “{submittedGuest.notes}”
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#7D9BA8]/20 text-center text-xs text-stone-600 space-y-2">
                      <p className="font-serif">We look forward to celebrating with you on 17th October 2026!</p>
                      <div className="text-[11px] text-[#2C4D5E] font-sans font-medium bg-[#F2F7FA] py-2 px-3 rounded-lg border border-[#7D9BA8]/30">
                        Your response is locked. If you need to make changes, please reach out to the couple.
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Info Card with Dusty Blue Accents & Deep Burgundy Typography */
                  <motion.div
                    key="standard-info-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[400px] bg-white border-2 border-[#7D9BA8]/40 shadow-xl rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E0ECF3] border-2 border-[#7D9BA8]/50 flex items-center justify-center text-[#2C4D5E] shadow-sm">
                      <Heart className="w-7 h-7 text-[#5A1827] fill-[#5A1827]/15" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-[#5A1827] font-bold">Join Our Celebration</h4>
                      <p className="text-sm text-stone-700 font-serif leading-relaxed max-w-[280px] mx-auto">
                        Please confirm your presence with your full names so we can reserve your seat and cater to your preferences.
                      </p>
                    </div>

                    <div className="w-full bg-[#F2F7FA] border-2 border-[#7D9BA8]/30 rounded-2xl p-4 text-left space-y-2.5 text-xs text-stone-700 font-sans">
                      <div className="flex items-center gap-2 text-stone-900 font-bold">
                        <Calendar className="w-4 h-4 text-[#4B738A]" />
                        <span>Saturday, 17th October 2026</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-900 font-bold">
                        <MapPin className="w-4 h-4 text-[#4B738A]" />
                        <span>Church &amp; Reception Venues</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-600 pt-1 border-t border-[#7D9BA8]/20">
                        Reception reservations are confirmed upon RSVP submission.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#7D9BA8]/20 w-full text-[11px] text-[#5A1827] uppercase tracking-widest font-sans font-extrabold">
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
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#4B738A] hover:bg-[#3B5F75] border-2 border-white/80 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F2D7DC] animate-spin" style={{ animationDuration: '4s' }} />
              <span>Confirm Attendance</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
