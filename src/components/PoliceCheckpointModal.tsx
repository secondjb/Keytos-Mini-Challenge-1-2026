import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Car } from 'lucide-react';
import { playClick, playBuzzer, playFanfare } from '../engine/soundEffects';

interface PoliceCheckpointModalProps {
  onPass: () => void;
  onFail?: () => void;
}

export const PoliceCheckpointModal: React.FC<PoliceCheckpointModalProps> = ({ onPass }) => {
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [failedTouch, setFailedTouch] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sound sirens on mount
  useEffect(() => {
    try {
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance("Driver, step out of the subscription. Field sobriety test required.");
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(100, Math.max(0, (x / width) * 100));

    // Vertical deviation check (field sobriety corridor)
    const y = e.clientY - rect.top;
    const height = rect.height;
    if (y < 4 || y > height - 4) {
      // Swerved out of corridor!
      playBuzzer();
      setFailedTouch(true);
      setDragProgress(0);
      setIsDragging(false);
      setTimeout(() => setFailedTouch(false), 800);
      return;
    }

    setDragProgress(percent);

    if (percent >= 92) {
      setIsDragging(false);
      playFanfare();
      onPass();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const touch = e.touches[0];
    const rect = trackRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(100, Math.max(0, (x / width) * 100));

    const y = touch.clientY - rect.top;
    const height = rect.height;
    if (y < 4 || y > height - 4) {
      playBuzzer();
      setFailedTouch(true);
      setDragProgress(0);
      setIsDragging(false);
      setTimeout(() => setFailedTouch(false), 800);
      return;
    }

    setDragProgress(percent);

    if (percent >= 92) {
      setIsDragging(false);
      playFanfare();
      onPass();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Flashing Police Lights Bar */}
      <div className="absolute top-0 inset-x-0 h-3 flex">
        <div className="flex-1 bg-red-600 animate-pulse" />
        <div className="flex-1 bg-blue-600 animate-ping" />
        <div className="flex-1 bg-red-600 animate-pulse" />
        <div className="flex-1 bg-blue-600 animate-ping" />
      </div>

      <div className="bg-slate-900 border-4 border-amber-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-400 mx-auto flex items-center justify-center mb-4">
          <Car className="w-8 h-8 animate-bounce" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-red-950 border border-red-500 text-red-300 font-black text-xs uppercase tracking-wider mb-2 animate-pulse">
          🚨 MANDATORY CHURN PATROL CHECKPOINT 🚨
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          STATE TROOPER SOBRIETY & INTENT TEST
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          "Step out of the subscription, citizen! You have passed 3 rounds without showing proper corporate gratitude. Walk the white line by dragging your vehicle through the narrow sobriety corridor without swerving!"
        </p>

        {failedTouch && (
          <div className="my-3 p-2 bg-red-900/60 border border-red-500 text-red-200 text-xs font-bold rounded-lg animate-shake">
            ⚠️ SWERVE DETECTED! Field sobriety failed! Resetting to start line.
          </div>
        )}

        {/* Sobriety Test Track Corridor */}
        <div className="my-6">
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1 px-2">
            <span className="text-emerald-400">START (SOBER)</span>
            <span className="text-amber-400">DON'T TOUCH THE EDGES</span>
            <span className="text-cyan-400">FINISH LINE</span>
          </div>

          <div
            ref={trackRef}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            className="h-16 bg-slate-950 border-y-4 border-dashed border-amber-400/60 rounded-xl relative overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center px-2"
          >
            {/* Narrow driving lane indicator */}
            <div className="absolute inset-x-0 h-8 top-4 bg-slate-900/60 border-y border-slate-700 pointer-events-none" />

            {/* Finish flag */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
              🏁
            </div>

            {/* Draggable Token */}
            <div
              onMouseDown={() => {
                playClick();
                setIsDragging(true);
              }}
              onTouchStart={() => {
                playClick();
                setIsDragging(true);
              }}
              style={{ left: `${Math.min(92, Math.max(2, dragProgress))}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white shadow-lg flex items-center justify-center text-lg cursor-grab active:cursor-grabbing z-10 transition-transform active:scale-110"
            >
              🚓
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2">
            Click and drag the police car steadily across to the finish line without straying outside the lines.
          </div>
        </div>

        <div className="text-[11px] text-slate-400 italic">
          Refusal to blow into the breathalyzer results in immediate 12-month contract renewal.
        </div>
      </div>
    </div>
  );
};
