import React, { useState } from 'react';
import { HeartCrack, AlertOctagon, HelpCircle, ShieldX, Sparkles } from 'lucide-react';
import { UserStats } from '../types';
import { playClick, playBuzzer } from '../engine/soundEffects';

interface Stage3GuiltProps {
  stats: UserStats;
  onStay: () => void;
  onProceedToAkinator: () => void;
}

export const Stage3Guilt: React.FC<Stage3GuiltProps> = ({
  stats,
  onStay,
  onProceedToAkinator,
}) => {
  // Trap checkboxes state
  const [box1, setBox1] = useState<boolean>(false);
  const [box2, setBox2] = useState<boolean>(false);
  const [trapError, setTrapError] = useState<string | null>(null);

  const handleAttemptContinue = () => {
    // Solvable puzzle: Box 1 must be checked (declining the non-cancellation) and Box 2 must be checked
    if (!box1 || !box2) {
      playBuzzer();
      setTrapError("Logic Validation Error: You must properly navigate our triple-negative arbitration waivers below before meeting the Arbiter.");
      return;
    }

    playClick();
    onProceedToAkinator();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Guilt header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 font-bold text-xs uppercase tracking-wider mb-4 animate-pulse">
            <HeartCrack className="w-4 h-4 text-rose-400" />
            <span>CONFIRMSHAME AUDIT PROTOCOL IN EFFECT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Are you 100% sure you're truly sure?
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
            Before proceeding, please look upon the devastation your departure causes to our digital ecosystem.
          </p>
        </div>

        {/* Guilt Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Hamster feed webcam mockup */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" /> LIVE CAM: Server Rack B
              </span>
              <span className="font-mono text-[10px] text-slate-500">FPS: 12</span>
            </div>
            
            <div className="h-32 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-3 text-center border border-slate-800/80">
              <div className="text-3xl mb-1">🐹💔</div>
              <div className="text-xs font-bold text-slate-200">Barnaby the Server Hamster</div>
              <p className="text-[10px] text-slate-400 mt-1 max-w-xs">
                Sunflower seed rations automatically reduce from 100% to 58% if your subscription terminates.
              </p>
            </div>
            <div className="text-[10px] text-rose-400/80 text-center mt-2 font-medium">
              Barnaby has been notified of your pending departure.
            </div>
          </div>

          {/* Sunk-cost loss list */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldX className="w-4 h-4 text-rose-400" /> What You Are Abandoning Forever
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong className="text-amber-300 font-mono">{stats.pulseCoins.toLocaleString()}</strong> unused Karma Points (vaporized instantly)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Exclusive Discord Role: <strong className="text-cyan-400">@TitanSponsor</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Unlimited neural rendering priority during solar flares</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>A personalized holiday greeting card signed by our CFO</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Triple Negative Checkbox Trap (Solvable obstacle!) */}
        <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" /> Mandatory Double-Negative Verification
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-start gap-3 cursor-pointer select-none p-2 rounded-lg hover:bg-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={box1}
                onChange={(e) => {
                  setBox1(e.target.checked);
                  setTrapError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-800"
              />
              <span>
                <strong>Clause 1A:</strong> I confirm I do not wish to avoid failing to decline the continuation of my non-canceled privileges.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer select-none p-2 rounded-lg hover:bg-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={box2}
                onChange={(e) => {
                  setBox2(e.target.checked);
                  setTrapError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-800"
              />
              <span>
                <strong>Clause 1B:</strong> I certify that un-checking or checking this statement verifies that I refuse to not face the Retention Oracle in single combat.
              </span>
            </label>
          </div>

          {trapError && (
            <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{trapError}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              playClick();
              onStay();
            }}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/25 text-base sm:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>NEVERMIND! KEEP MY ACCOUNT ACTIVE & SAVE BARNABY</span>
          </button>

          <button
            onClick={handleAttemptContinue}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Face the AI Retention Oracle →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
