import React from 'react';
import confetti from 'canvas-confetti';
import { CheckCheck, AlertTriangle, FileText, PartyPopper } from 'lucide-react';
import { playFanfare } from '../engine/soundEffects';

interface Stage5FinalProps {
  onRestartToBeginning: () => void;
}

export const Stage5Final: React.FC<Stage5FinalProps> = ({ onRestartToBeginning }) => {
  const handleMistakeAndRestore = () => {
    playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    // Loop back to start after momentary celebration!
    setTimeout(() => {
      onRestartToBeginning();
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 mb-4 shadow-inner">
          <FileText className="w-10 h-10" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider mb-4 border border-slate-700">
          FORM 1099-UNSUBSCRIBE-REV-4
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Notice of Non-Declination De-Enrollment
        </h2>

        {/* The triple-negative statements */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 my-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <CheckCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              <strong>Confirmation:</strong> You have not failed to unsuccessfully avoid declining not to discontinue your non-active subscription status.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              In accordance with Subsection 44-D, we have not omitted to not process your non-continuance request, meaning that your failure to not decline our non-membership will not remain un-reversed unless you do not refrain from not un-canceling.
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-3 text-[11px] text-slate-500 font-mono">
            Ticket ID: #CP-84920-DO-NOT-REPLY • Queued for Manual Fax Dispatch on Tuesday at 3:14 AM
          </div>
        </div>

        {/* Big circular trap button requested by user */}
        <div className="space-y-4 my-8">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Second Thoughts? Regret setting in?
          </div>

          <button
            onClick={handleMistakeAndRestore}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-emerald-500/25 text-lg sm:text-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
          >
            <PartyPopper className="w-6 h-6 text-yellow-300" />
            <span>NEVERMIND! I MADE A HORRIBLE MISTAKE! RESTORE MY PLAN NOW!</span>
          </button>
          
          <p className="text-[11px] text-slate-500 italic">
            Clicking this will instantly reverse all non-actions and return you safely to your dashboard.
          </p>
        </div>

        {/* Real True Completion acknowledgment */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-2">
            🏆 CHALLENGE OBJECTIVE ACHIEVED: HOSTILE YET SOLVABLE
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            You successfully navigated the Caribbean Giveaway, defeated the double-negative traps, outwitted the 5-round Reverse Akinator Retention Oracle without saying banned words, and arrived at the final exit screen.
          </p>
        </div>
      </div>
    </div>
  );
};
