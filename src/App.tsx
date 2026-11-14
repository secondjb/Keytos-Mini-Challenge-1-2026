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
      {/* Dynamic Font Shift Notification */}
      {fontNotification && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-purple-950/90 border-2 border-purple-400 text-purple-200 text-xs px-4 py-1.5 rounded-full shadow-2xl font-mono animate-bounce">
          {fontNotification}
        </div>
      )}

      {/* Top Header */}
      <Header stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 flex flex-col items-center justify-start">
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
