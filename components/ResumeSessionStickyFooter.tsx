"use client";

import { useEffect, useState } from "react";
import { metaEvent, track } from "@/lib/analytics";

const CHECKOUT_URL =
  "https://learn.etalvis.com/web/checkout/6a705fab512af2dc942ae7d6";

const DEADLINE_ISO = "2026-08-08T23:59:59+05:30";
const PRICE = 80;

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function useCountdown(targetISO: string) {
  const [state, setState] = useState<CountdownState>({
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
        setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });

        return;
      }

      setState({
        days: Math.floor(total / 86_400_000),
        hours: Math.floor((total / 3_600_000) % 24),
        minutes: Math.floor((total / 60_000) % 60),
        seconds: Math.floor((total / 1_000) % 60),
        expired: false,
      });
    };

    tick();

    const interval = window.setInterval(tick, 1_000);

    return () => window.clearInterval(interval);
  }, [targetISO]);

  return state;
}

function CountdownDigit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[1.6rem] rounded-md bg-white px-1 py-1 text-center text-[11px] font-black leading-none tabular-nums text-[#0A3D1F] shadow-sm sm:min-w-[1.9rem] sm:text-xs">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wide text-white/70 sm:text-[8px]">
        {label}
      </span>
    </div>
  );
}

export default function ResumeSessionStickyFooter() {
  const { days, hours, minutes, seconds, expired } =
    useCountdown(DEADLINE_ISO);

  if (expired) return null;

  const handleRegisterClick = () => {
    track("resume_sticky_register_click", {
      price: PRICE,
      currency: "INR",
      page: "resume-session",
    });

    metaEvent("InitiateCheckout", {
      content_name: "Resume Session",
      value: PRICE,
      currency: "INR",
    });
  };

  return (
    <>
      {/* Prevents content from hiding behind the fixed footer */}
      <div aria-hidden="true" className="h-[64px] sm:h-[76px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-[90] px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto grid w-full max-w-4xl grid-cols-[1fr_auto] items-center gap-2 rounded-xl border border-emerald-700 bg-gradient-to-r from-[#062E18] via-[#0A3D1F] to-[#062E18] px-2.5 py-2 text-white shadow-[0_-8px_28px_rgba(15,23,42,0.28)] sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-2.5">
          {/* Desktop-only session information */}
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-extrabold leading-tight text-white">
              Resume Masterclass: Live Online
            </p>

            <p className="mt-0.5 truncate text-[11px] font-medium text-white/65">
              Aug 9, 2026 · 11 AM to 1 PM IST · Balajee Seshadri
            </p>
          </div>

          {/* Countdown centered */}
          <div className="flex min-w-0 items-center justify-center">
            <div className="flex items-start justify-center gap-0.5 sm:gap-1">
              <CountdownDigit value={days} label="Days" />

              <span className="mt-1 text-xs font-black text-white/40">
                :
              </span>

              <CountdownDigit value={hours} label="Hrs" />

              <span className="mt-1 text-xs font-black text-white/40">
                :
              </span>

              <CountdownDigit value={minutes} label="Min" />

              <span className="mt-1 text-xs font-black text-white/40">
                :
              </span>

              <CountdownDigit value={seconds} label="Sec" />
            </div>
          </div>

          {/* Register button */}
          <div className="flex shrink-0 items-center justify-end">
            <a
              href={CHECKOUT_URL}
              onClick={handleRegisterClick}
              className="inline-flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 border-white bg-white px-3 text-xs font-black text-[#0A3D1F] shadow-[0_3px_0_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-slate-100 hover:text-[#062E18] active:translate-y-0 active:shadow-none sm:min-h-10 sm:px-5 sm:text-sm"
            >
              Register Now · ₹{PRICE}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}