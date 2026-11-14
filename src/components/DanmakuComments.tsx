import React, { useState, useEffect } from 'react';

interface BulletComment {
  id: string;
  text: string;
  topPercent: number; // 5% to 85%
  durationSec: number; // 6 to 12 seconds
  color: string;
  fontSize: string;
  fontWeight: string;
}

const USER_MESSAGES = [
  "SO GLAD I STAYED! JUST GOT MY 500 CLOUDTOKENS! 🎉",
  "Leaving CloudPulse is a rookie mistake lol 💀",
  "HAMSTER #4 IS MY HERO 🐹❤️ STAY FOR BARNABY!",
  "Best $89.99/mo of my entire life!! 🚀",
  "Why would anyone ever click cancel?? cringe",
  "I almost cancelled in 2022 and my credit score dropped 200 points 📉",
  "Chad from Retention is an absolute saint 🙏",
  "LOYALTY TITAN TIER FOR LIFE 💎",
  "Wait people actually try to leave? LMAOOO",
  "Caribbean Cruise sweepstakes winner here, it's 100% real!! 🌴🍹",
  "Cancelling literally hurts the server hamsters 🥺💔",
  "NEVER GIVING UP MY 14,000 KARMA POINTS 🔥",
  "Subscribed since 2019, zero regrets!",
  "Imagine giving up your @TitanSponsor Discord role haha",
  "Stayed for the high-res pizza JPG, totally worth it 🍕",
  "My company relies on CloudPulse 24/7/365!!",
  "If you cancel, you lose your grandfathered multiplier forever!! ⚠️",
  "Thank you CloudPulse CEO for my personalized holiday card!",
  "Bro don't do it, the reverse akinator broke my friend's soul",
  "KEEP CLICKING RENEW IT FEELS SO GOOD 💸✨",
  "10/10 would pay auto-renewal again next month!",
  "My cat loves when I keep my subscription active 🐱",
  "Auto-renewal is self-care 🧘‍♀️",
  "I tried to cancel once... now I own 4 Enterprise Titan licenses"
];

const COLORS = [
  '#38bdf8', // sky blue
  '#f43f5e', // rose
  '#fbbf24', // amber
  '#34d399', // emerald
  '#a855f7', // purple
  '#ec4899', // pink
  '#ffffff', // white
  '#22d3ee', // cyan
];

export const DanmakuComments: React.FC = () => {
  const [bullets, setBullets] = useState<BulletComment[]>([]);

  useEffect(() => {
    // Function to spawn a burst of Danmaku bullet comments
    const spawnWave = (count: number) => {
      const newBullets: BulletComment[] = [];
      const usedLanes = new Set<number>();

      for (let i = 0; i < count; i++) {
        // Distribute across vertical lanes from 6% to 88%
        let lane = Math.floor(Math.random() * 16);
        while (usedLanes.has(lane) && usedLanes.size < 16) {
          lane = Math.floor(Math.random() * 16);
        }
        usedLanes.add(lane);

        const topPercent = 6 + lane * 5.2;
        const text = USER_MESSAGES[Math.floor(Math.random() * USER_MESSAGES.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const durationSec = 7 + Math.random() * 5; // 7s to 12s
        const fontSize = Math.random() > 0.7 ? '18px' : Math.random() > 0.4 ? '15px' : '13px';
        const fontWeight = Math.random() > 0.5 ? '800' : '700';

        newBullets.push({
          id: `bullet-${Date.now()}-${i}-${Math.random()}`,
          text,
          topPercent,
          durationSec,
          color,
          fontSize,
          fontWeight,
        });
      }

      setBullets(prev => [...prev.slice(-40), ...newBullets]);
    };

    // Initial gentle wave
    spawnWave(4);

    // Continuous steady trickle every 3.5 seconds
    const trickleInterval = setInterval(() => {
      spawnWave(Math.floor(Math.random() * 3) + 2);
    }, 3500);

    // Periodic huge Danmaku barrage that fills up the screen every 16 seconds!
    const barrageInterval = setInterval(() => {
      spawnWave(12);
    }, 16000);

    return () => {
      clearInterval(trickleInterval);
      clearInterval(barrageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes danmaku-fly {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      {bullets.map((bullet) => (
        <div
          key={bullet.id}
          style={{
            position: 'absolute',
            top: `${bullet.topPercent}%`,
            left: 0,
            color: bullet.color,
            fontSize: bullet.fontSize,
            fontWeight: bullet.fontWeight,
            animation: `danmaku-fly ${bullet.durationSec}s linear forwards`,
            textShadow: '0 0 4px #000, 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000',
            whiteSpace: 'nowrap',
            letterSpacing: '0.03em',
            opacity: 0.92,
            willChange: 'transform',
          }}
          className="font-sans"
        >
          {bullet.text}
        </div>
      ))}
    </div>
  );
};
