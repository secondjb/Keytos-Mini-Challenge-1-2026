import React, { useState } from 'react';
import { Palmtree, Sun, Award, Anchor, Sparkles } from 'lucide-react';
import { playClick, playBuzzer } from '../engine/soundEffects';

interface Stage2BribeProps {
  onKeepSubscription: () => void;
  onProceedToGuilt: () => void;
}

export const Stage2Bribe: React.FC<Stage2BribeProps> = ({
  onKeepSubscription,
  onProceedToGuilt,
}) => {
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [isDodging, setIsDodging] = useState<boolean>(false);
  const [upgradeChecked, setUpgradeChecked] = useState<boolean>(true);

  // Evasive button mechanic (dodges 2 times before admitting defeat, so it remains 100% possible to cancel!)
  const handleHoverCancel = () => {
    if (dodgeCount < 2) {
      playBuzzer();
      setIsDodging(true);
      setDodgeCount(prev => prev + 1);
      setTimeout(() => setIsDodging(false), 300);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        {/* Tropical glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Tropical giveaway header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider mb-6 animate-pulse">
          <Palmtree className="w-4 h-4 text-emerald-400" />
          <span>VIP RETENTION SWEEPSTAKES UNLOCKED!</span>
          <Sun className="w-4 h-4 text-amber-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Wait! Before you leave... <br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Win an All-Inclusive 7-Day Caribbean Cruise!
          </span>
        </h2>

        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
          As a top-tier CloudPulse subscriber, you have been pre-selected to enter our Grand Bahamas Getaway. Unsubscribing now immediately surrenders your lottery ticket to user <span className="font-mono text-cyan-400 font-semibold">@kevin_99</span>.
        </p>

        {/* Cruise preview card */}
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 mb-8 text-left flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
            <Anchor className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
              <Award className="w-3.5 h-3.5" /> 1-in-4,000,000 Odds Guaranteed
            </div>
            <div className="font-bold text-white text-base mt-0.5">
              Royal Caribbean Royal Suite + Unlimited Piña Coladas
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              *Winner is responsible for port taxes, wifi fees, oxygen surcharges, and maintaining an uninterrupted 48-month CloudPulse Titan subscription.
            </div>
          </div>
        </div>

        {/* Primary CTA (Bright green renewal trap) */}
        <div className="space-y-4">
          <button
            onClick={() => {
              playClick();
              onKeepSubscription();
            }}
            className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:to-green-400 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-green-600/30 text-lg sm:text-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
            <span>KEEP MY MEMBERSHIP & ENTER CRUISE RAFFLE (RECOMMENDED)</span>
          </button>

          {/* Sneaky pre-checked upgrade checkbox */}
          <label className="flex items-center justify-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={upgradeChecked}
              onChange={(e) => setUpgradeChecked(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 bg-slate-800"
            />
            <span>[X] Also automatically upgrade me to the 3-Year Platinum Concierge Plan ($149/mo)</span>
          </label>

          {/* Double negative decoy button */}
          <button
            onClick={() => {
              playClick();
              onKeepSubscription();
            }}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-8 rounded-xl border border-slate-700 text-sm transition-all"
          >
            Don't not keep my subscription
          </button>
        </div>

        {/* Evasive True Exit link */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center">
          <div
            onMouseEnter={handleHoverCancel}
            className={`transition-all duration-300 transform ${
              isDodging && dodgeCount < 2 ? 'translate-x-16 sm:translate-x-28 -translate-y-4' : 'translate-x-0'
            }`}
          >
            <button
              onClick={() => {
                playClick();
                onProceedToGuilt();
              }}
              className="text-xs text-slate-500 hover:text-rose-400 underline underline-offset-4 transition-colors py-2 px-4 cursor-pointer"
            >
              {dodgeCount >= 2 
                ? "→ (Fine, you caught me) Proceed to cancellation review" 
                : "No thanks, I hate tropical sunshine and prefer losing everything"}
            </button>
          </div>

          {dodgeCount > 0 && dodgeCount < 2 && (
            <p className="text-[11px] text-amber-400 mt-2 animate-bounce">
              ⚠️ Warning: Cursor stability compromised! The exit button is attempting to self-preserve.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
