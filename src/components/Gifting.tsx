import React, { useState } from 'react';
import { Gift, Copy, Check, Heart, Smartphone, Mail } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifting() {
  const [copiedTill, setCopiedTill] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  return (
    <section className="relative py-24 bg-[#FFF9FA] text-stone-900" id="gifting-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#E892A2]/[0.08] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#C86B85] text-xs font-semibold tracking-widest uppercase font-sans">Love &amp; Support</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Gifting Options</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C86B85] to-transparent mx-auto" />
        </div>

        {/* Registry Message Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Narrative card */}
          <div className="md:col-span-7 flex flex-col justify-between bg-white border border-[#E892A2]/30 p-8 rounded-3xl shadow-lg">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF0F3] to-[#FCE4EC] flex items-center justify-center text-[#722F37] mb-4 border border-[#E892A2]/30">
                <Gift className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl text-stone-900 font-medium">Love &amp; Blessings</h3>

              <div className="text-stone-700 text-sm md:text-base leading-relaxed space-y-4 font-serif">
                <p className="italic text-lg text-stone-800">
                  “{WEDDING_DETAILS.registry.message}”
                </p>
                
                <div className="pt-3 space-y-3 text-stone-600 text-sm">
                  <div className="flex items-start gap-3 p-3.5 bg-[#FFF5F7] rounded-xl border border-[#E892A2]/30">
                    <Mail className="w-5 h-5 text-[#722F37] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#722F37]">1. Envelope Blessing</h5>
                      <p className="font-serif text-xs text-stone-600 mt-0.5">
                        Gift envelopes can be presented in person at the reception venue during the speeches and gifts session.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-[#FFF5F7] rounded-xl border border-[#E892A2]/30">
                    <Smartphone className="w-5 h-5 text-[#722F37] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#722F37]">2. M-Pesa Contribution</h5>
                      <p className="font-serif text-xs text-stone-600 mt-0.5">
                        For friends and family who wish to send their monetary gift digitally via Lipa na M-Pesa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#722F37] fill-[#C86B85]" />
              <span className="text-xs text-stone-600 font-sans tracking-wider uppercase font-semibold">
                Thank you for your love, generosity, and prayers!
              </span>
            </div>
          </div>

          {/* M-PESA Till Number Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-white via-[#FFF8F9] to-[#FFF0F3] border border-[#E892A2]/40 p-8 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* M-Pesa Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-green-50 border border-green-200 text-green-800 rounded-full text-[10px] uppercase font-sans font-bold tracking-widest mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              <span>LIPA NA M-PESA</span>
            </div>

            <h4 className="font-serif text-xl text-stone-900 mb-2 font-medium">DIGITAL GIFT</h4>
            <p className="text-stone-500 text-xs max-w-[240px] mb-6">
              Buy Goods &amp; Services
            </p>

            {/* Key-Value Copy Blocks */}
            <div className="w-full space-y-4 mb-6">
              {/* Till Block */}
              <div className="bg-white border border-[#E892A2]/40 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">M-Pesa Till Number</p>
                  <p className="text-2xl font-mono font-bold text-[#722F37] tracking-wide">{WEDDING_DETAILS.registry.tillNumber}</p>
                </div>
                <button
                  onClick={() => handleCopy(WEDDING_DETAILS.registry.tillNumber)}
                  className={`p-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedTill
                      ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                      : 'bg-stone-50 border border-stone-200 text-stone-600 hover:text-[#722F37] hover:border-[#C86B85]'
                  }`}
                  title="Copy Till Number"
                >
                  {copiedTill ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account / Name Block */}
              <div className="bg-white border border-[#E892A2]/40 rounded-2xl p-4 text-left shadow-sm">
                <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">Account / Name</p>
                <p className="text-sm font-serif font-semibold text-stone-800 mt-0.5">{WEDDING_DETAILS.registry.accountName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

