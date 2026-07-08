"use client";

import { useEffect, useState } from "react";

const BALLOON_COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];
const BALLOON_COUNT = 14;
const CELEBRATION_DURATION_MS = 5200;

interface Balloon {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

function generateBalloons(): Balloon[] {
  return Array.from({ length: BALLOON_COUNT }, (_, id) => ({
    id,
    left: Math.random() * 92 + 2,
    color: BALLOON_COLORS[id % BALLOON_COLORS.length],
    delay: Math.random() * 0.6,
    duration: 3.2 + Math.random() * 1.6,
    size: 34 + Math.random() * 20,
  }));
}

export function BalloonCelebration({ active, onDone }: { active: boolean; onDone?: () => void }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (!active) return;
    setBalloons(generateBalloons());
    const timer = setTimeout(() => {
      setBalloons([]);
      onDone?.();
    }, CELEBRATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, onDone]);

  if (balloons.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-[-140px] flex flex-col items-center animate-balloon-rise motion-reduce:hidden"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          <div
            className="rounded-[50%] shadow-md"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              backgroundColor: balloon.color,
            }}
          />
          <div className="h-10 w-px bg-slate-400/60" />
        </div>
      ))}
    </div>
  );
}
