import React, { useState, useEffect } from 'react';
import { Stage, UserStats } from './types';
import { Header } from './components/Header';
import { BossBar } from './components/BossBar';
import { Stage1Dashboard } from './components/Stage1Dashboard';
import { Stage2Bribe } from './components/Stage2Bribe';
import { Stage3Guilt } from './components/Stage3Guilt';
import { Stage4Akinator } from './components/Stage4Akinator';
import { Stage5Final } from './components/Stage5Final';
import { DanmakuComments } from './components/DanmakuComments';
import { LeftSidebarAds, RightSidebarAds } from './components/SidebarSkyscraperAds';

const CHAOTIC_FONTS = [
  "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive",
  "'Papyrus', fantasy",
  "'Impact', 'Charcoal', sans-serif",
  "'Courier New', Courier, monospace",
  "'Brush Script MT', cursive",
  "'Copperplate', 'Copperplate Gothic Bold', fantasy",
  "'Lucida Console', Monaco, monospace",
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
];

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('DASHBOARD');
  const [currentFont, setCurrentFont] = useState<string>(CHAOTIC_FONTS[0]);
  const [fontNotification, setFontNotification] = useState<string | null>(null);
  const [adToast, setAdToast] = useState<string | null>(null);

  const [stats, setStats] = useState<UserStats>({
    planName: 'CloudPulse Titan Suite',
    price: '$89.99/mo',
    pulseCoins: 14290,
    daysSubscribed: 482,
    serverHamstersSaved: 4,
    retentionAttendedRounds: 0,
    strikes: 0,
  });

  // Random font change every 10-20 seconds!
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleNextFontChange = () => {
      // Random delay between 10,000ms and 20,000ms
      const delay = Math.floor(Math.random() * 10000) + 10000;

      timer = setTimeout(() => {
        const nextFont = CHAOTIC_FONTS[Math.floor(Math.random() * CHAOTIC_FONTS.length)];
        setCurrentFont(nextFont);
        setFontNotification(`🔤 Brand Typography Recalibrated: ${nextFont.split(',')[0].replace(/'/g, '')}`);
        setTimeout(() => setFontNotification(null), 3000);

        scheduleNextFontChange();
      }, delay);
    };

    scheduleNextFontChange();
    return () => clearTimeout(timer);
  }, []);

  const getBossHP = (): number => {
    switch (currentStage) {
      case 'DASHBOARD':
        return 100;
      case 'CARIBBEAN_BRIBE':
        return 80;
      case 'GUILT_TRIP':
        return 60;
      case 'REVERSE_AKINATOR':
        return 40;
      case 'FINAL_TRAP':
        return 0;
    }
  };

  const handleAccidentalUpgrade = () => {
    setStats(prev => ({
      ...prev,
      pulseCoins: prev.pulseCoins + 2500,
    }));
  };

  const handleStrikeIssued = () => {
    setStats(prev => ({
      ...prev,
      strikes: prev.strikes + 1,
    }));
  };

  const handleFullReset = () => {
    setStats({
      planName: 'CloudPulse Titan Suite',
      price: '$89.99/mo',
      pulseCoins: 14290,
      daysSubscribed: 482,
      serverHamstersSaved: 4,
      retentionAttendedRounds: 0,
      strikes: 0,
    });
    setCurrentStage('DASHBOARD');
  };

  const handleStay = () => {
    setStats(prev => ({
      ...prev,
      pulseCoins: prev.pulseCoins + 1000,
      strikes: 0,
    }));
    setCurrentStage('DASHBOARD');
  };

  return (
    <div 
      style={{ fontFamily: currentFont }}
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white transition-all duration-700 ${
        stats.strikes === 3 ? 'bg-red-950/40 ring-8 ring-inset ring-red-600 animate-pulse' : ''
      }`}
    >
      {/* Bilibili-style Danmaku Bullet Comments (pointer-events-none) */}
      <DanmakuComments />

      {/* Top Header */}
      <Header stats={stats} />

      {/* Main 3-Column Layout: Left Ads fill all empty left space, Center Stage, Right Ads fill all empty right space */}
      <div className="flex-1 w-full flex items-start justify-center gap-2 sm:gap-4 px-2">
        {/* Left Ad Column taking up all empty left space */}
        <LeftSidebarAds 
          onAdClicked={(msg) => {
            setAdToast(msg);
            setStats(prev => ({ ...prev, pulseCoins: prev.pulseCoins + 500 }));
            setTimeout(() => setAdToast(null), 3500);
          }}
        />

        {/* Center Main Content Area */}
        <main className="w-full max-w-4xl shrink-0 py-8 px-2 sm:px-4 flex flex-col items-center justify-start min-w-0">
          <BossBar 
            stage={currentStage} 
            hpPercent={getBossHP()} 
            strikes={stats.strikes} 
          />

          {currentStage === 'DASHBOARD' && (
            <Stage1Dashboard
              stats={stats}
              onProceedToCancel={() => setCurrentStage('CARIBBEAN_BRIBE')}
              onAccidentalUpgrade={handleAccidentalUpgrade}
            />
          )}

          {currentStage === 'CARIBBEAN_BRIBE' && (
            <Stage2Bribe
              onKeepSubscription={handleStay}
              onProceedToGuilt={() => setCurrentStage('GUILT_TRIP')}
            />
          )}

          {currentStage === 'GUILT_TRIP' && (
            <Stage3Guilt
              stats={stats}
              onStay={handleStay}
              onProceedToAkinator={() => setCurrentStage('REVERSE_AKINATOR')}
            />
          )}

          {currentStage === 'REVERSE_AKINATOR' && (
            <Stage4Akinator
              onVictory={() => setCurrentStage('FINAL_TRAP')}
              onStay={handleStay}
              onStrikeIssued={handleStrikeIssued}
              onRestartToBeginning={handleFullReset}
              strikes={stats.strikes}
            />
          )}

          {currentStage === 'FINAL_TRAP' && (
            <Stage5Final
              onRestartToBeginning={handleFullReset}
            />
          )}
        </main>

        {/* Right Ad Column taking up all empty right space */}
        <RightSidebarAds 
          onAdClicked={(msg) => {
            setAdToast(msg);
            setStats(prev => ({ ...prev, pulseCoins: prev.pulseCoins + 500 }));
            setTimeout(() => setAdToast(null), 3500);
          }}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>
            Keytos Mini-Challenge #1 — <em>"Worst Cancel Screen Ever"</em> • Built with React, Vite & Tailwind CSS.
          </p>
          <p className="text-[10px] text-slate-600">
            CloudPulse is a 100% fictional satirical SaaS. No real credit cards or animals were harmed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
