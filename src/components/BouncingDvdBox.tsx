import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { playClick } from '../engine/soundEffects';

interface BouncingDvdBoxProps {
  onProceed: () => void;
}

const COLORS = [
  'border-emerald-500 shadow-emerald-500/50 bg-emerald-950/90',
  'border-purple-500 shadow-purple-500/50 bg-purple-950/90',
  'border-pink-500 shadow-pink-500/50 bg-pink-950/90',
  'border-cyan-500 shadow-cyan-500/50 bg-cyan-950/90',
  'border-amber-500 shadow-amber-500/50 bg-amber-950/90',
  'border-blue-500 shadow-blue-500/50 bg-blue-950/90'
];

export const BouncingDvdBox: React.FC<BouncingDvdBoxProps> = ({ onProceed }) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 50, y: 100 });
  const [colorIdx, setColorIdx] = useState<number>(0);
  const posRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 50,
    y: 100,
    vx: 3.2,
    vy: 2.8,
  });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      const box = boxRef.current;
      const boxWidth = box ? box.offsetWidth : 400;
      const boxHeight = box ? box.offsetHeight : 200;

      const maxX = window.innerWidth - boxWidth - 10;
      const maxY = window.innerHeight - boxHeight - 10;

      let { x, y, vx, vy } = posRef.current;

      x += vx;
      y += vy;

      let hitWall = false;

      if (x <= 10) {
        x = 10;
        vx = Math.abs(vx);
        hitWall = true;
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
        hitWall = true;
      }

      if (y <= 10) {
        y = 10;
        vy = Math.abs(vy);
        hitWall = true;
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
        hitWall = true;
      }

      if (hitWall) {
        setColorIdx(prev => (prev + 1) % COLORS.length);
      }

      posRef.current = { x, y, vx, vy };
      setPos({ x, y });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 50,
      }}
      className={`border-4 rounded-3xl p-5 sm:p-6 text-center max-w-md shadow-2xl transition-colors duration-300 select-none ${COLORS[colorIdx]}`}
    >
      <div className="inline-flex p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 mb-1.5 animate-pulse">
        <CheckCircle2 className="w-7 h-7" />
      </div>

      <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
        VICTORY! THE ORACLE HAS DEDUCED YOUR INTENT!
      </h3>

      <p className="text-[11px] sm:text-xs text-emerald-200 mt-1 mb-3">
        Catch this DVD bouncing box to advance to final arbitration!
      </p>

      <button
        onClick={() => {
          playClick();
          onProceed();
        }}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/40 text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
      >
        <span>Proceed to Final Bureaucratic Exit</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
