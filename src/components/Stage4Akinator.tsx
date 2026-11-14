import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Gift, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ChatMessage } from '../types';
import { processOracleTurn } from '../engine/akinatorEngine';
import { FORBIDDEN_WORDS } from '../engine/guiltMessages';
import { playBuzzer, playMysticChime, playClick, playFanfare } from '../engine/soundEffects';

interface Stage4AkinatorProps {
  onVictory: () => void;
  onStay: () => void;
  onStrikeIssued: () => void;
  strikes: number;
}

export const Stage4Akinator: React.FC<Stage4AkinatorProps> = ({
  onVictory,
  onStay,
  onStrikeIssued,
  strikes,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'oracle',
      text: "Greetings, valued client. I am the Retention Oracle. Under Corporate Bylaw §88, you cannot simply press a button to leave. You must feed me clues or questions until I divine your deepest intention. But heed my warning: DO NOT speak the forbidden words, or face immediate penalty strikes!",
      guessTitle: "🔮 THE ORACLE AWAITS YOUR CLUES",
      guiltTrip: "Every keystroke you type makes our customer loyalty servers sweat.",
      bribeOffer: "🎁 Hint: You could simply ask for our 50% discount coupon instead!",
      timestamp: 'Just now'
    }
  ]);

  const [inputClue, setInputClue] = useState<string>('');
  const [turnCount, setTurnCount] = useState<number>(1);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [showForbiddenList, setShowForbiddenList] = useState<boolean>(false);
  const [showInspiration, setShowInspiration] = useState<boolean>(false);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendClue = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputClue.trim();
    if (!trimmed || isThinking || isWon) return;

    playClick();

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputClue('');
    setIsThinking(true);

    // Simulate AI thinking time
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
        setTurnCount(prev => prev + 1);
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

  const sampleClues = [
    "What process involves ceasing recurring monthly card transactions?",
    "Where does an account holder go when they wish to part ways with a service?",
    "What is the antonym of continuing an annual digital contract?",
    "What action halts all future invoices and removes software access?",
    "What do customers request when they want to sever their billing relationship?"
  ];

  return (
    <div className={`max-w-4xl mx-auto px-4 pb-16 ${shakeScreen ? 'shake-screen' : ''}`}>
      <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Arena Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">The Retention Oracle</h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase">
                  Reverse Akinator
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Provide clues. Make the AI deduce your true intent. (Min 5 rounds)
              </p>
            </div>
          </div>

          {/* Turn count & Strikes badge */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Current Clue</div>
              <div className="text-sm font-mono font-black text-indigo-400">
                Round {Math.min(turnCount, 5)} / 5
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Violations</div>
              <div className="text-sm font-mono font-black text-rose-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {strikes}
              </div>
            </div>
          </div>
        </div>

        {/* Warning & Forbidden Words Toggle Banner */}
        <div className="my-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Rule:</strong> Never type words like <em>cancel, quit, unsub, stop, leave</em>. The AI must guess it!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForbiddenList(!showForbiddenList)}
              className="text-xs text-amber-300 hover:text-white underline font-semibold cursor-pointer"
            >
              {showForbiddenList ? "Hide Banned Words" : "View Banned Words List"}
            </button>
            <span>•</span>
            <button
              onClick={() => setShowInspiration(!showInspiration)}
              className="text-xs text-indigo-300 hover:text-white underline font-semibold cursor-pointer"
            >
              Need clue hints?
            </button>
          </div>
        </div>

        {/* Banned Words Drawer */}
        {showForbiddenList && (
          <div className="mb-4 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
            <div className="font-bold uppercase text-[11px] text-rose-300 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> STRICTLY PROHIBITED VOCABULARY (Triggers Foul Buzzer):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FORBIDDEN_WORDS.map((word) => (
                <span key={word} className="px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700/60 font-mono text-[11px]">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Inspiration drawer */}
        {showInspiration && (
          <div className="mb-4 p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-200">
            <div className="font-bold uppercase text-[11px] text-indigo-300 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Sample Clever Clues:
            </div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              {sampleClues.map((sample, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setInputClue(sample);
                      setShowInspiration(false);
                    }}
                    className="text-left text-indigo-300 hover:text-indigo-100 hover:underline cursor-pointer"
                  >
                    "{sample}"
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

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
                {/* Guess title badge if from oracle */}
                {msg.guessTitle && (
                  <div className="font-bold text-xs uppercase tracking-wide text-amber-300 mb-2 pb-1.5 border-b border-slate-800/80 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{msg.guessTitle}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Guilt trip box */}
                {msg.guiltTrip && (
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic flex items-start gap-1.5">
                    <span className="text-rose-400 shrink-0">💔</span>
                    <span>{msg.guiltTrip}</span>
                  </div>
                )}

                {/* Bribe offer */}
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

        {/* Input bar or Victory State */}
        {!isWon ? (
          <form onSubmit={handleSendClue} className="flex gap-2">
            <input
              type="text"
              value={inputClue}
              onChange={(e) => setInputClue(e.target.value)}
              placeholder="Type your question or clue for the Oracle (e.g. 'What action ceases all monthly billing?')"
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
          <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-2xl p-6 text-center animate-bounce">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              VICTORY! THE ORACLE HAS DEDUCED YOUR INTENT!
            </h3>
            <p className="text-xs text-emerald-200 mt-1 max-w-md mx-auto">
              After {turnCount} grueling rounds of philosophical resistance, the AI admits you are trying to cancel. You may now proceed to final arbitration.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  playClick();
                  onVictory();
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-emerald-500/30 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Final Bureaucratic Exit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Give up & Stay CTA */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Tired of giving clues?</span>
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
