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
    <div className="flex flex-col items-center min-w-0 flex-1">
      <div className="bg-text text-bg font-display font-bold text-xs sm:text-sm rounded px-1 py-1 w-full text-center tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[7px] sm:text-[8px] text-muted mt-0.5 uppercase tracking-tight leading-none">
        {label}
      </span>
    </div>
  );
}

export default function DealCountdown({
  targetDate,
  label = "Deal ends in",
}: {
  targetDate: string;
  label?: string;
}) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.total <= 0) return null;

  return (
    <div className="rounded-lg border border-ember bg-ember/5 px-2.5 py-2.5 mb-4 w-full overflow-hidden">
      <p className="text-xs sm:text-sm font-display font-bold text-ember uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-ember opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        {label}
      </p>
      <div className="flex items-stretch gap-1 w-full">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}