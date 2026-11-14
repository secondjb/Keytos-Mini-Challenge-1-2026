import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { playClick, playFanfare } from '../engine/soundEffects';

interface RoamingAnimalBannerProps {
  onBribeClicked: (msg: string) => void;
}

const ANIMALS = [
  { emoji: '🐱', name: 'Mittens the Kitten', cry: 'Please do not leave us! Meow meow meow!', banner: 'PRESS ME TO RENEW & GET A FREE LIFETIME CAT PHOTO!' },
  { emoji: '🐶', name: 'Barnaby the Golden Pup', cry: 'Bark! Who will play fetch if you cancel?!', banner: 'CLICK HERE TO EXTEND MEMBERSHIP & CLAIM 20,000 FREE COINS!' },
  { emoji: '🐹', name: 'Hamster #4 (Server Rack B)', cry: 'My sunflower seeds depend on your monthly fee!', banner: 'TAP ME TO RESTORE TITAN STATUS WITH 50% BONUS SPEED!' },
  { emoji: '🐧', name: 'Pebbles the Penguin', cry: 'It is too cold in the open market without CloudPulse!', banner: 'PRESS ME TO ENTER THE SECRET CARIBBEAN CRUISE DRAWING!' }
];

export const RoamingAnimalBanner: React.FC<RoamingAnimalBannerProps> = ({ onBribeClicked }) => {
  const [activeAnimalIndex, setActiveAnimalIndex] = useState<number | null>(null);
  const [positionX, setPositionX] = useState<number>(-30); // percentage across screen

  useEffect(() => {
    // Trigger every 15 seconds
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * ANIMALS.length);
      setActiveAnimalIndex(randomIdx);
      setPositionX(-30);

      // Play speech
      try {
        if ('speechSynthesis' in window) {
          const text = ANIMALS[randomIdx].cry;
          const utter = new SpeechSynthesisUtterance(text);
          utter.pitch = 1.3;
          utter.rate = 1.05;
          window.speechSynthesis.speak(utter);
        }
      } catch {
        // Ignore
      }

      // Animate walking across screen (50% slower for easy reading)
      let currentPos = -30;
      const walkTimer = setInterval(() => {
        currentPos += 0.85;
        setPositionX(currentPos);
        if (currentPos > 120) {
          clearInterval(walkTimer);
          setActiveAnimalIndex(null);
        }
      }, 70);

    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (activeAnimalIndex === null) return null;

  const animal = ANIMALS[activeAnimalIndex];

  const handleClick = () => {
    playFanfare();
    onBribeClicked(`Aww! You clicked ${animal.name}! 10,000 Bonus PulseCoins credited!`);
    setActiveAnimalIndex(null);
  };

  return (
    <div
      style={{ left: `${positionX}%`, top: '22%' }}
      className="fixed z-40 transition-all pointer-events-auto select-none cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 p-2 sm:p-3 rounded-2xl shadow-2xl border-2 border-white text-white animate-bounce">
        <span className="text-3xl sm:text-4xl animate-pulse">{animal.emoji}</span>
        <div className="text-left">
          <div className="flex items-center gap-1 text-[11px] font-black uppercase text-amber-200">
            <Heart className="w-3 h-3 fill-current text-rose-300" />
            <span>{animal.name} pleads:</span>
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-white underline decoration-yellow-300 decoration-2">
            {animal.banner}
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
      </div>
    </div>
  );
};
