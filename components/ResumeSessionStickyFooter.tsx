"use client";

import { useEffect, useState } from "react";
import { track, metaEvent } from "@/lib/analytics";

const CHECKOUT_URL = "https://learn.etalvis.com/web/checkout/6a705fab512af2dc942ae7d6";
const DEADLINE_ISO = "2026-08-08T23:59:59+05:30";
const PRICE = 80;

function useCountdown(targetISO: string) {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const tick = () => {
      const total = new Date(targetISO).getTime() - Date.now();
      if (total <= 0) {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setState({
        days: Math.floor(total / 86400000),
        hours: Math.floor((total / 3600000) % 24),
        minutes: Math.floor((total / 60000) % 60),
        seconds: Math.floor((total / 1000) % 60),
        expired: false,
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  return state;
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[1.6rem] rounded bg-white px-1 py-0.5 text-center text-xs font-black tabular-nums text-[#0A3D1F]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] font-semibold uppercase tracking-wide text-white/60">{label}</span>
    </div>
  );
}

export default function ResumeSessionStickyFooter() {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE_ISO);

  if (expired) return null;

  return (
    <>
      <div aria-hidden="true" className="h-[72px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-row items-center gap-2 rounded-xl border border-[#0A3D1F] bg-[#0A3D1F] px-3 py-2.5 text-white shadow-[0_-6px_24px_rgba(15,23,42,0.22)] sm:gap-4 sm:px-5 sm:py-3">

          {/* Countdown */}
          <div className="shrink-0 pr-3 border-r border-white/20">
            <p className="text-[9px] font-bold uppercase tracking-wide text-white/60 mb-1">Closes in</p>
            <div className="flex items-end gap-0.5">
              <CountdownDigit value={days} label="Days" />
              <span className="mb-3 text-xs font-bold text-white/40">:</span>
              <CountdownDigit value={hours} label="Hrs" />
              <span className="mb-3 text-xs font-bold text-white/40">:</span>
              <CountdownDigit value={minutes} label="Min" />
              <span className="mb-3 text-xs font-bold text-white/40">:</span>
              <CountdownDigit value={seconds} label="Sec" />
            </div>
          </div>

          {/* Session info */}
          <div className="flex-1 min-w-0 pl-1">
            <p className="font-bold text-white text-sm leading-tight truncate">Resume Masterclass: Live Online</p>
            <p className="text-white/60 text-xs mt-0.5 truncate">Aug 9, 2026 · 11 AM to 1 PM IST · Balajee Seshadri</p>
          </div>

          {/* Price + button */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block text-right">
              <p className="text-white font-extrabold text-lg leading-none">Rs. {PRICE}</p>
              <p className="text-white/50 text-[10px]">One-time</p>
            </div>
            <a
              href={CHECKOUT_URL}
              onClick={() => {
                track("resume_sticky_register_click", { price: PRICE, currency: "INR", page: "resume-session" });
                metaEvent("InitiateCheckout", { content_name: "Resume Session", value: PRICE, currency: "INR" });
              }}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white px-4 py-1.5 text-xs font-extrabold text-[#0A3D1F] transition hover:bg-[#FFC400] hover:border-[#FFC400] whitespace-nowrap"
            >
              Register · Rs. {PRICE}
            </a>
          </div>

        </div>
      </aside>
    </>
  );
}
