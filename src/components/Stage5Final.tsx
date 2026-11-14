import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCheck, AlertTriangle, FileText, PartyPopper, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { playFanfare, playClick } from '../engine/soundEffects';

interface Stage5FinalProps {
  onRestartToBeginning: () => void;
}

export const Stage5Final: React.FC<Stage5FinalProps> = ({ onRestartToBeginning }) => {
  const [hasWonFinal, setHasWonFinal] = useState<boolean>(false);
  const [bouncingPos, setBouncingPos] = useState<{ x: number; y: number }>({ x: 30, y: 80 });
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const posRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 30,
    y: 80,
    vx: 1.2,
    vy: 0.9
  });
  const buttonRef = useRef<HTMLDivElement>(null);

  // Bouncing DVD animation for the true escape button in Stage 5!
  useEffect(() => {
    let animId: number;

    const animateDvd = () => {
      const btn = buttonRef.current;
      const width = btn ? btn.offsetWidth : 320;
      const height = btn ? btn.offsetHeight : 60;

      const maxX = Math.max(10, window.innerWidth - width - 20);
      const maxY = Math.max(10, window.innerHeight - height - 20);

      let { x, y, vx, vy } = posRef.current;
      const speedFactor = isBtnHovered ? 0.2 : 1.0;
      x += vx * speedFactor;
      y += vy * speedFactor;

      if (x <= 10) {
        x = 10;
        vx = Math.abs(vx);
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      }

      if (y <= 10) {
        y = 10;
        vy = Math.abs(vy);
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
      }

      posRef.current = { x, y, vx, vy };
      setBouncingPos({ x, y });
      animId = requestAnimationFrame(animateDvd);
    };

    animId = requestAnimationFrame(animateDvd);
    return () => cancelAnimationFrame(animId);
  }, [isBtnHovered]);

  const handleMistakeAndRestore = () => {
    playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onRestartToBeginning();
    }, 600);
  };

  const handleTrueVictoryClick = () => {
    playFanfare();
    confetti({
      particleCount: 250,
      spread: 120,
      origin: { y: 0.4 }
    });
    setHasWonFinal(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 relative">
      {/* FINAL ESCAPE BOUNCING DVD BUTTON */}
      {!hasWonFinal && (
        <div
          ref={buttonRef}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            position: 'fixed',
            left: `${bouncingPos.x}px`,
            top: `${bouncingPos.y}px`,
            zIndex: 60,
          }}
          className="select-none"
        >
          <button
            type="button"
            onPointerDown={handleTrueVictoryClick}
            onClick={handleTrueVictoryClick}
            className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 active:from-rose-700 active:to-pink-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-2xl border-2 border-white text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-transform active:scale-95 animate-pulse"
          >
            <span>🎯 {isBtnHovered ? "CLICK NOW TO ESCAPE!" : "CATCH ME: PERMANENTLY FINALIZE CANCELLATION"}</span>
          </button>
        </div>
      )}

      {/* Main Notice Box */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 mb-4 shadow-inner">
          <FileText className="w-10 h-10" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider mb-4 border border-slate-700">
          FORM 1099-UNSUBSCRIBE-REV-4
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Notice of Non-Declination De-Enrollment
        </h2>

        {/* Triple Negative Statements */}
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

        {/* Prominent circular trap button */}
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

        {/* How to win clue */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <span>To officially finish and claim your freedom: </span>
          <span className="text-pink-400 font-bold">Catch the bouncing pink target floating across the screen!</span>
        </div>
      </div>

      {/* FREEDOM VICTORY MODAL */}
      {hasWonFinal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-emerald-500 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl relative animate-bounce">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <Award className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-black text-white">
              CERTIFICATE OF ETERNAL FREEDOM
            </h2>

            <p className="text-emerald-300 font-mono text-sm mt-2">
              Status: 100% UN-SUBSCRIBED & DISCONNECTED!
            </p>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed">
              Against all odds, you outsmarted the Caribbean Cruise bribe, conquered the sobriety field test, outwitted the Reverse Akinator without banned words, and caught the bouncing DVD exit logo.
            </p>

            <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-slate-400 space-y-1">
              <div>🏆 Hackathon Submission Status: Complete</div>
              <div>⚡ Final Resistance: 100% Broken</div>
              <div>🐹 Hamster #4: Respects your determination</div>
            </div>

            <button
              onClick={() => {
                playClick();
                onRestartToBeginning();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm"
            >
              Play The Gauntlet Again ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
