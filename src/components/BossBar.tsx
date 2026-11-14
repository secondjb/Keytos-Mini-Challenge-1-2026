import React from 'react';
import { Stage } from '../types';

interface BossBarProps {
  stage: Stage;
  hpPercent: number; // 0 to 100
  strikes: number;
}

export const BossBar: React.FC<BossBarProps> = ({ stage, hpPercent, strikes }) => {
  const getStepText = () => {
    switch (stage) {
      case 'DASHBOARD':
        return 'Step 1 of 3 (Estimated: 2 min)';
      case 'CARIBBEAN_BRIBE':
        return 'Step 2 of 14 (Recalculating...)';
      case 'GUILT_TRIP':
        return 'Step 3 of 28 (Arbitration Phase)';
      case 'REVERSE_AKINATOR':
        return 'FINAL BOSS: THE RETENTION ORACLE';
      case 'FINAL_TRAP':
        return 'Step 99 of 100 (Pending De-Activation)';
    }
  };

  const totalBlocks = 10;
  const activeBlocks = Math.ceil((hpPercent / 100) * totalBlocks);

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-2 sm:px-4">
      {/* Chrome mockup header */}
      <div className="bg-slate-800/90 rounded-t-xl border border-slate-700/80 px-4 py-2 flex items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shrink-0"></span>
          <span className="ml-2 font-mono text-slate-400 truncate max-w-[200px] sm:max-w-md">
            cloudpulse.io/account/terminate?retention_resistance={100 - hpPercent}%
          </span>
        </div>
        <div className="font-mono text-amber-400 font-bold bg-slate-900/80 px-2.5 py-0.5 rounded border border-slate-700 whitespace-nowrap shrink-0 text-[11px] sm:text-xs">
          {getStepText()}
        </div>
      </div>

      {/* Boss title & HP bar */}
      <div className="bg-slate-950 border-x border-b border-slate-700/80 rounded-b-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
          <span className="whitespace-nowrap shrink-0 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-black text-xs tracking-wider uppercase animate-pulse">
            BOSS BATTLE
          </span>
          <span className="whitespace-nowrap shrink-0 font-black text-sm text-slate-200 tracking-wide uppercase">
            The Retention Department
          </span>
          {strikes > 0 && (
            <span className="whitespace-nowrap shrink-0 text-xs bg-red-600/30 border border-red-500/50 text-red-400 px-2.5 py-0.5 rounded-full font-bold">
              {strikes} {strikes === 1 ? 'Strike' : 'Strikes'}
            </span>
          )}
        </div>

        {/* Health blocks */}
        <div className="flex items-center gap-2 shrink-0 justify-end whitespace-nowrap">
          <span className="text-xs font-mono font-bold text-slate-400 whitespace-nowrap">BOSS HP:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 shrink-0">
            {Array.from({ length: totalBlocks }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 sm:w-4 h-4 rounded-xs transition-all duration-300 shrink-0 ${
                  i < activeBlocks
                    ? 'bg-amber-400 shadow-sm shadow-amber-400/50'
                    : 'bg-slate-800 opacity-40'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 w-10 text-right whitespace-nowrap">
            {hpPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};
