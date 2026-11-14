import React from 'react';
import { Download, Sparkles, Heart, Gift, Award, TrendingUp, AlertTriangle } from 'lucide-react';
import { playFanfare } from '../engine/soundEffects';

interface SkyscraperAdsProps {
  onAdClicked: (msg: string) => void;
}

export const LeftSidebarAds: React.FC<SkyscraperAdsProps> = ({ onAdClicked }) => {
  const handleAdClick = (title: string, perk: string) => {
    playFanfare();
    onAdClicked(`🎉 You clicked: "${title}"! ${perk}`);
  };

  return (
    <aside className="hidden lg:flex flex-col gap-4 flex-1 min-w-[200px] max-w-md 2xl:max-w-lg p-2 2xl:p-4 z-20 pointer-events-auto select-none">
      {/* Ad 1: Doctors Hate Him */}
      <div 
        onClick={() => handleAdClick("Doctors Hate This", "5,000 Placebo Karma Points added!")}
        className="w-full bg-slate-900/90 border-2 border-amber-400/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-amber-950/40"
      >
        <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold mb-1">
          ⚠️ MEDICAL RETENTION BREAKTHROUGH
        </div>
        <div className="text-3xl my-1 animate-wiggle">👨‍⚕️💊</div>
        <div className="text-xs sm:text-sm font-black text-white leading-snug group-hover:text-amber-300">
          Doctors HATE This One Weird Retention Trick!
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-tight">
          Local subscriber cures fear of missing out simply by keeping auto-renewal active for 48 consecutive months.
        </p>
        <button className="mt-3 w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow">
          Learn Secret Method
        </button>
      </div>

      {/* Ad 2: Hot Single Discounts in your area */}
      <div 
        onClick={() => handleAdClick("Hot Local Discounts", "Matched with a 15% Grandfathered Renewal!")}
        className="w-full bg-slate-900/90 border-2 border-rose-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-rose-950/40"
      >
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider mb-1 animate-pulse">
          ❤️ GPS LOCATED (0.2 MILES)
        </div>
        <div className="text-2xl my-1">📍🔥</div>
        <div className="text-xs sm:text-sm font-black text-rose-300 leading-snug">
          3 Hot Single Discounts Near You Want To Renew!
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-tight">
          These discounts don't want you to leave. Chat with a lonely 25% coupon code right now!
        </p>
        <button className="mt-3 w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow">
          Connect With Coupon
        </button>
      </div>

      {/* Ad 3: Hamster Florida Retirement Fund */}
      <div 
        onClick={() => handleAdClick("Hamster Retirement", "Hamster #4 sent you a tiny virtual postcard!")}
        className="w-full bg-slate-900/90 border-2 border-emerald-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-emerald-950/40"
      >
        <div className="text-3xl my-1">🐹🕶️🏖️</div>
        <div className="text-xs sm:text-sm font-black text-emerald-300 leading-snug">
          Help Barnaby Retire To Palm Beach!
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-tight">
          Barnaby has been running on the server wheel since 2021. Every month you stay gets him 1 grain of sunflower seed.
        </p>
        <div className="mt-2 text-[10px] text-emerald-400 font-mono font-bold">
          PROGRESS: 84% OF SEED GOAL
        </div>
      </div>

      {/* Ad 4: Sponsored Survey */}
      <div 
        onClick={() => handleAdClick("Loyalty Survey", "You answered: 100% Devotion!")}
        className="w-full bg-slate-900/90 border-2 border-indigo-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group"
      >
        <div className="text-[10px] font-mono text-indigo-300 uppercase font-bold mb-1">
          📊 SPONSORED MICRO-SURVEY
        </div>
        <div className="text-xs font-black text-white">How much do you love your billing cycle?</div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] font-bold">
          <div className="p-2 rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-200">
            (A) Immeasurably
          </div>
          <div className="p-2 rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-200">
            (B) More than oxygen
          </div>
        </div>
      </div>
    </aside>
  );
};

export const RightSidebarAds: React.FC<SkyscraperAdsProps> = ({ onAdClicked }) => {
  const handleAdClick = (title: string, perk: string) => {
    playFanfare();
    onAdClicked(`🎉 You clicked: "${title}"! ${perk}`);
  };

  return (
    <aside className="hidden lg:flex flex-col gap-4 flex-1 min-w-[200px] max-w-md 2xl:max-w-lg p-2 2xl:p-4 z-20 pointer-events-auto select-none">
      {/* Ad 5: Download More RAM */}
      <div 
        onClick={() => handleAdClick("Download More RAM", "256MB of Cloud RAM successfully downloaded into your spirit!")}
        className="w-full bg-slate-900/90 border-2 border-cyan-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-cyan-950/40"
      >
        <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold mb-1 flex items-center justify-center gap-1">
          <Download className="w-3 h-3 animate-bounce" /> SPEED ACCELERATOR
        </div>
        <div className="text-xs sm:text-sm font-black text-white leading-snug">
          Download 128GB of Virtual RAM For Free!
        </div>
        <div className="my-2 bg-slate-950 rounded-full h-3 p-0.5 border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full w-[98%] animate-pulse" />
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          Download status: 99.8% (Est: 43 years left)
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-tight">
          *Cancelling pauses RAM download and wipes your cache!
        </p>
      </div>

      {/* Ad 6: 1,000,000th Visitor Win an iPad Nano */}
      <div 
        onClick={() => handleAdClick("1,000,000th Visitor", "You won! (Terms: 36-month non-refundable contract applies)")}
        className="w-full bg-slate-900/90 border-2 border-purple-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-purple-950/40"
      >
        <div className="text-3xl my-1 animate-pulse">🎁📱✨</div>
        <div className="text-xs sm:text-sm font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent leading-snug">
          CONGRATULATIONS 1,000,000TH SUBSCRIBER!
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-tight">
          You have been randomly selected to receive a gold-plated stylus pen! Claim before timer resets!
        </p>
        <button className="mt-3 w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow">
          CLAIM FREE STYLUS
        </button>
      </div>

      {/* Ad 7: The JPEG Pizza Slice */}
      <div 
        onClick={() => handleAdClick("High-Res Pizza JPEG", "High-resolution JPEG of pepperoni pizza sent to your email!")}
        className="w-full bg-slate-900/90 border-2 border-orange-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-orange-950/40"
      >
        <div className="text-3xl my-1">🍕✨</div>
        <div className="text-xs sm:text-sm font-black text-orange-300 leading-snug">
          Why Eat Real Pizza? Own a Pizza JPEG!
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-tight">
          Active Titan subscribers receive 1 uncompressed 8K JPEG of a cheese pizza every billing cycle. Zero calories. Infinite satisfaction.
        </p>
        <div className="mt-2 text-[10px] text-orange-400 font-mono font-bold">
          CERTIFIED DELICIOUS • 0g FAT
        </div>
      </div>

      {/* Ad 8: Mittens Cat Protest */}
      <div 
        onClick={() => handleAdClick("Mittens Cat Protest", "Mittens purrs and gives you 1,000 cat karma!")}
        className="w-full bg-slate-900/90 border-2 border-pink-500/80 rounded-2xl p-4 text-center shadow-xl hover:scale-[1.01] transition-transform cursor-pointer group bg-gradient-to-b from-slate-900 to-pink-950/40"
      >
        <div className="text-3xl my-1 animate-bounce">🐱🥺</div>
        <div className="text-xs sm:text-sm font-black text-pink-300 leading-snug">
          Local Cat Staging Hunger Strike
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-tight">
          Mittens refuses to eat her Fancy Feast until you renew for 12 months. Save Mittens today!
        </p>
      </div>
    </aside>
  );
};
