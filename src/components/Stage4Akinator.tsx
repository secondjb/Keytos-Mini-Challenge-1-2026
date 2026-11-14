import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Flame, 
  Gift, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { ChatMessage } from '../types';
import { processOracleTurn } from '../engine/akinatorEngine';
import { playBuzzer, playMysticChime, playClick, playFanfare } from '../engine/soundEffects';
import { PoliceCheckpointModal } from './PoliceCheckpointModal';
import { BouncingDvdBox } from './BouncingDvdBox';
import { RoamingAnimalBanner } from './RoamingAnimalBanner';

interface Stage4AkinatorProps {
  onVictory: () => void;
  onStay: () => void;
  onStrikeIssued: () => void;
  onRestartToBeginning: () => void;
  strikes: number;
}

export const Stage4Akinator: React.FC<Stage4AkinatorProps> = ({
  onVictory,
  onStay,
  onStrikeIssued,
  onRestartToBeginning,
  strikes,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'oracle',
      text: "Greetings, user. Under Corporate Retention Bylaw §88, you cannot simply press a button to leave. You must feed me clues or questions until I deduce your hidden desire. Speak carefully: any aggressive or forbidden departure language will be met with swift disciplinary action!",
      guessTitle: "🔮 THE ORACLE AWAITS YOUR CLUE",
      guiltTrip: "Every keystroke you type makes our customer loyalty servers sweat.",
      bribeOffer: "🎁 Hint: You could simply ask for our 50% discount coupon instead!",
      timestamp: 'Just now'
    }
  ]);

  const [inputClue, setInputClue] = useState<string>('');
  const [turnCount, setTurnCount] = useState<number>(1);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [showPoliceStop, setShowPoliceStop] = useState<boolean>(false);
  const [hasPassedPolice, setHasPassedPolice] = useState<boolean>(false);
  const [animalAlert, setAnimalAlert] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Check for 4th violation full restart!
  useEffect(() => {
    if (strikes >= 4) {
      try {
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance("Four violations reached. Contempt threshold exceeded. Resetting to start.");
          window.speechSynthesis.speak(utter);
        }
      } catch {
        // Ignore
      }
      onRestartToBeginning();
    }
  }, [strikes, onRestartToBeginning]);

  const handleSendClue = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputClue.trim();
    if (!trimmed || isThinking || isWon) return;

    playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputClue('');
    setIsThinking(true);

    setTimeout(() => {
      const result = processOracleTurn(trimmed, turnCount);

      if (result.isViolation) {
        playBuzzer();
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);
        onStrikeIssued();
      } else if (result.isVictory) {
        playFanfare();
        setIsWon(true);
      } else {
        playMysticChime();
        const nextTurn = turnCount + 1;
        setTurnCount(nextTurn);

        // Check if round 3 was just completed and police checkpoint hasn't been passed yet!
        if (nextTurn === 4 && !hasPassedPolice) {
          setShowPoliceStop(true);
        }
      }

      const oracleMsg: ChatMessage = {
        id: `oracle-${Date.now()}`,
        sender: 'oracle',
        text: result.oracleMessage,
        guessTitle: result.guessTitle,
        guiltTrip: result.guiltTrip,
        bribeOffer: result.bribeOffer,
        isViolation: result.isViolation,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, oracleMsg]);
      setIsThinking(false);
    }, 1200);
  };

  const isBlinkingRed = strikes === 3;

  return (
    <div className={`max-w-4xl mx-auto px-4 pb-16 relative ${shakeScreen ? 'shake-screen' : ''} ${isBlinkingRed ? 'animate-pulse' : ''}`}>
      {/* 3 STRIKES BLINKING RED WARNING BAR */}
      {isBlinkingRed && (
        <div className="mb-4 p-4 rounded-2xl bg-red-600/90 border-4 border-white text-white font-black text-center text-sm sm:text-base animate-bounce shadow-2xl">
          🚨 CRITICAL CONTEMPT LEVEL: 3 VIOLATIONS DETECTED! 🚨
          <div className="text-xs font-mono font-normal mt-1">
            WARNING: A 4TH INFRACTION WILL IMMEDIATELY RESTART YOUR ENTIRE SESSION FROM THE BEGINNING!
          </div>
        </div>
      )}

      {/* Roaming Animal Mascot Banners (every 15s) */}
      <RoamingAnimalBanner
        onBribeClicked={(msg) => {
          setAnimalAlert(msg);
          setTimeout(() => setAnimalAlert(null), 4000);
        }}
      />

      {animalAlert && (
        <div className="mb-4 p-3 rounded-xl bg-pink-950/80 border border-pink-500 text-pink-200 text-xs text-center font-bold animate-bounce">
          {animalAlert}
        </div>
      )}

      {/* Police Checkpoint Modal after round 3 */}
      {showPoliceStop && (
        <PoliceCheckpointModal
          onPass={() => {
            setShowPoliceStop(false);
            setHasPassedPolice(true);
          }}
        />
      )}

      {/* Bouncing DVD logo victory target when Oracle is defeated! */}
      {isWon && (
        <BouncingDvdBox onProceed={onVictory} />
      )}

      <div className={`bg-slate-900 border-2 rounded-3xl p-6 sm:p-8 shadow-2xl relative ${
        isBlinkingRed ? 'border-red-600 shadow-red-600/40' : 'border-indigo-500/50'
      }`}>
        {/* Arena Header (Rounds count removed as requested!) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <Bot className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white whitespace-nowrap">The Retention Oracle</h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase whitespace-nowrap shrink-0">
                  Reverse Akinator
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                Ask questions or give clues until the AI figures out what you want.
              </p>
            </div>
          </div>

          {/* Mysterious Status (NO round count indication!) */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-4 py-2 text-center whitespace-nowrap min-w-[130px] sm:min-w-[150px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">Oracle State</div>
              <div className="text-xs font-mono font-bold text-indigo-400 animate-pulse whitespace-nowrap">
                🔮 Evaluating Aura...
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-4 py-2 text-center whitespace-nowrap min-w-[85px] sm:min-w-[100px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">Strikes</div>
              <div className={`text-sm font-mono font-black flex items-center justify-center gap-1.5 whitespace-nowrap ${
                strikes >= 3 ? 'text-red-400 animate-ping' : strikes > 0 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                <Flame className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{strikes} / 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning banner */}
        <div className="my-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Warning:</strong> Use only subtle, indirect clues. Negative corporate vocabulary will result in strikes!
          </span>
        </div>

        {/* Chat Log Window */}
        <div className="h-96 overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-slate-500 mb-1 px-1">
                {msg.sender === 'user' ? 'You (Discontent User)' : 'The Retention Oracle'}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-xs'
                    : msg.isViolation
                    ? 'bg-rose-950 border border-rose-500/60 text-rose-200 rounded-bl-xs'
                    : 'bg-slate-900 border border-slate-700/80 text-slate-200 rounded-bl-xs shadow-md'
                }`}
              >
                {msg.guessTitle && (
                  <div className="font-bold text-xs uppercase tracking-wide text-amber-300 mb-2 pb-1.5 border-b border-slate-800/80 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{msg.guessTitle}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.guiltTrip && (
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic flex items-start gap-1.5">
                    <span className="text-rose-400 shrink-0">💔</span>
                    <span>{msg.guiltTrip}</span>
                  </div>
                )}

                {msg.bribeOffer && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{msg.bribeOffer}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs p-2">
              <Bot className="w-4 h-4 animate-spin" />
              <span>The Oracle is peering into your soul and consulting customer retention algorithms...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        {!isWon ? (
          <form onSubmit={handleSendClue} className="flex gap-2">
            <input
              type="text"
              value={inputClue}
              onChange={(e) => setInputClue(e.target.value)}
              placeholder="Ask a question or enter a clue for the Oracle..."
              disabled={isThinking}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputClue.trim() || isThinking}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-center text-xs text-emerald-300 animate-pulse">
            🎯 The Oracle has broken! Catch the bouncing DVD box above to proceed to final exit!
          </div>
        )}

        {/* Surrender button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Stuck?</span>
          <button
            onClick={() => {
              playClick();
              onStay();
            }}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
          >
            I surrender! Keep my subscription and restore happiness
          </button>
        </div>
      </div>
    </div>
  );
};
