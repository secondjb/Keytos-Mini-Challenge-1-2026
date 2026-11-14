import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Clock, User, Gift } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  const [timeLeft, setTimeLeft] = useState<number>(299); // 04:59

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 299));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Panic top banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 tracking-wide animate-pulse">
        <ShieldAlert className="w-4 h-4" />
        <span>URGENT: YOUR 80% LOYALTY MULTIPLIER EXPIRES IN</span>
        <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-amber-200 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatTime(timeLeft)}
        </span>
        <span className="hidden md:inline">— DO NOT REFRESH OR CLOSE THIS WINDOW!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent">
              CloudPulse<span className="text-cyan-400">.ai</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Enterprise Neural Suite
            </div>
          </div>
        </div>

        {/* Live Perks / Coins Counter */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1 flex items-center gap-2 text-xs">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Karma Points:</span>
            <span className="font-mono font-bold text-amber-300">{stats.pulseCoins.toLocaleString()}</span>
          </div>

          <div className="bg-cyan-950/40 border border-cyan-800/50 rounded-lg px-3 py-1 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-cyan-300 font-medium">Titan Tier ($89.99/mo)</span>
          </div>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-200">Alex Vance (You)</div>
            <div className="text-[10px] text-emerald-400 font-mono">Status: Extremely Valued</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 ring-2 ring-cyan-500/30">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};
