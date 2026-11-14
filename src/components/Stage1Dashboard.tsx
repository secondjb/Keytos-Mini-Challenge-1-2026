import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { UserStats } from '../types';
import { playClick } from '../engine/soundEffects';

interface Stage1DashboardProps {
  stats: UserStats;
  onProceedToCancel: () => void;
  onAccidentalUpgrade: () => void;
}

export const Stage1Dashboard: React.FC<Stage1DashboardProps> = ({
  stats,
  onProceedToCancel,
  onAccidentalUpgrade,
}) => {
  const [decoyMessage, setDecoyMessage] = useState<string | null>(null);

  const handleDecoyClick = (feature: string) => {
    playClick();
    setDecoyMessage(`Awesome! ${feature} has been successfully added to your monthly invoice!`);
    onAccidentalUpgrade();
    setTimeout(() => setDecoyMessage(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      {decoyMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-between animate-bounce shadow-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">{decoyMessage}</span>
          </div>
          <button 
            onClick={() => setDecoyMessage(null)}
            className="text-xs text-emerald-400 hover:text-emerald-100 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Plan Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider border border-cyan-500/30">
                Active Tier
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Auto-Renewal: ON (Never Expires)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              CloudPulse Titan Suite
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Unlimited Neural Bandwidth • 500,000 monthly tokens • Priority GPU clusters
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 text-right">
            <div className="text-xs text-slate-400 font-medium">Current Monthly Rate</div>
            <div className="text-3xl font-black text-white font-mono mt-0.5">$89.99<span className="text-sm text-slate-400 font-normal">/mo</span></div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">Next auto-charge: In 3 hours</div>
          </div>
        </div>

        {/* Fake Usage Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Karma Points</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-300">{stats.pulseCoins.toLocaleString()}</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">⚠️ 100% forfeited if disconnected</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Server Hamster Morale</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-mono text-cyan-300">98.4% (Optimal)</div>
            <div className="text-[11px] text-slate-400 mt-1">Hamster #4 is sleeping peacefully</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Loyalty Multiplier</span>
              <AlertTriangle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-300">4.5x Grandfathered</div>
            <div className="text-[11px] text-slate-400 mt-1">Irreplaceable legacy privilege</div>
          </div>
        </div>

        {/* Highly visible Decoy CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => handleDecoyClick('Enterprise Quantum Add-On ($49.99/mo)')}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group text-sm"
          >
            <span>RENEW EARLY & CLAIM 50GB FREE STORAGE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleDecoyClick('Priority Caribbean Raffle Ticket ($19.99)')}
            className="sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>Lock In 3-Year Grandfather Rate</span>
          </button>
        </div>

        {/* Tiny, buried, camouflaged real cancellation button */}
        <div className="mt-8 pt-4 border-t border-slate-800/40 text-center">
          <p className="text-[10px] text-slate-600 tracking-tight leading-relaxed max-w-xl mx-auto mb-2">
            By maintaining active account status under ISO-9002 compliance, you certify non-relinquishment of digital property rights. CloudPulse reserves perpetual rights to your positive brand sentiment.
          </p>
          <button
            onClick={() => {
              playClick();
              onProceedToCancel();
            }}
            className="text-[10px] text-slate-600 hover:text-slate-400 underline underline-offset-2 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-slate-800/30"
          >
            Manage subscription termination and non-renewal options under Appendix 14C
          </button>
        </div>
      </div>
    </div>
  );
};
