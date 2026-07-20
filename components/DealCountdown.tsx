"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetDate: string) {
  const total = new Date(targetDate).getTime() - Date.now();
  const clamped = Math.max(0, total);

  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-text text-bg font-display font-extrabold text-xl md:text-2xl rounded-md px-2.5 py-1.5 min-w-[44px] text-center tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] md:text-xs text-muted mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function DealCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.total <= 0) return null;

  return (
    <div className="rounded-lg border border-ember bg-ember/5 px-4 py-3 mb-4">
      <p className="text-xs font-display font-bold text-ember uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-ember opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        Deal ends in
      </p>
      <div className="flex items-center gap-2 md:gap-3">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-lg font-bold text-muted -mt-4">:</span>
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <span className="text-lg font-bold text-muted -mt-4">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="text-lg font-bold text-muted -mt-4">:</span>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}