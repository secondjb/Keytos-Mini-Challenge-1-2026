import React, { useState } from 'react';
import { Stage, UserStats } from './types';
import { Header } from './components/Header';
import { BossBar } from './components/BossBar';
import { Stage1Dashboard } from './components/Stage1Dashboard';
import { Stage2Bribe } from './components/Stage2Bribe';
import { Stage3Guilt } from './components/Stage3Guilt';
import { Stage4Akinator } from './components/Stage4Akinator';
import { Stage5Final } from './components/Stage5Final';

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('DASHBOARD');
  const [stats, setStats] = useState<UserStats>({
    planName: 'CloudPulse Titan Suite',
    price: '$89.99/mo',
    pulseCoins: 14290,
    daysSubscribed: 482,
    serverHamstersSaved: 4,
    retentionAttendedRounds: 0,
    strikes: 0,
  });

  // Calculate Boss Health based on current stage and progress
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

  const handleStay = () => {
    // Returns user back to the dashboard with extra coins
    setStats(prev => ({
      ...prev,
      pulseCoins: prev.pulseCoins + 1000,
    }));
    setCurrentStage('DASHBOARD');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <Header stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 flex flex-col items-center justify-start">
        {/* Boss bar with HP and step indicator */}
        <BossBar 
          stage={currentStage} 
          hpPercent={getBossHP()} 
          strikes={stats.strikes} 
        />

        {/* Stage Content */}
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
            strikes={stats.strikes}
          />
        )}

        {currentStage === 'FINAL_TRAP' && (
          <Stage5Final
            onRestartToBeginning={() => {
              setStats(prev => ({ ...prev, strikes: 0 }));
              setCurrentStage('DASHBOARD');
            }}
          />
        )}
      </main>

      {/* Satirical Corporate Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>
            Keytos Mini-Challenge #1 — <em>"Worst Cancel Screen Ever"</em> • Built with React, Vite & Tailwind CSS.
          </p>
          <p className="text-[10px] text-slate-600">
            CloudPulse is a 100% fictional satirical SaaS. No real credit cards, accounts, or server hamsters were harmed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
