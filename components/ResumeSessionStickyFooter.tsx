"use client";

import { useEffect, useState } from "react";
import { metaEvent, track } from "@/lib/analytics";

const CHECKOUT_URL =
  "https://learn.etalvis.com/web/checkout/6a705fab512af2dc942ae7d6";

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
      <span className="min-w-[1.55rem] rounded-md bg-white px-1 py-1 text-center text-[11px] font-black leading-none tabular-nums text-emerald-950 shadow-sm sm:min-w-[1.8rem] sm:text-xs">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wide text-white/65 sm:text-[8px]">
        {label}
      </span>
    </div>
  );
}

export default function ResumeSessionStickyFooter() {
  const { days, hours, minutes, seconds, expired } =
    useCountdown(DEADLINE_ISO);

  if (expired) return null;

  return (
    <>
      {/* Prevents page content from hiding behind the sticky footer */}
      <div aria-hidden="true" className="h-[62px] sm:h-[74px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-[90] px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2 rounded-xl border border-emerald-800 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-2.5 py-2 text-white shadow-[0_-6px_24px_rgba(15,23,42,0.24)] sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-2.5">
          {/* Countdown */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:border-r sm:border-white/15 sm:pr-4">
            <div className="hidden shrink-0 sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">
                Registration closes in
              </p>

              <p className="mt-0.5 text-xs font-extrabold text-amber-300">
                Limited-time ₹80 access
              </p>
            </div>

            <div className="flex shrink-0 items-start gap-0.5">
              <CountdownDigit value={days} label="Days" />

              <span className="mt-1 text-xs font-black text-white/35">
                :
              </span>

              <CountdownDigit value={hours} label="Hrs" />

              <span className="mt-1 text-xs font-black text-white/35">
                :
              </span>

              <CountdownDigit value={minutes} label="Min" />

              <span className="mt-1 text-xs font-black text-white/35">
                :
              </span>

              <CountdownDigit value={seconds} label="Sec" />
            </div>
          </div>

          {/* Hidden entirely on mobile */}
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="truncate text-sm font-extrabold leading-tight text-white">
              Resume Masterclass: Live Online
            </p>

            <p className="mt-0.5 truncate text-[11px] font-medium text-white/65">
              Aug 9, 2026 · 11 AM to 1 PM IST · Balajee Seshadri
            </p>
          </div>

          {/* Price and registration */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="text-lg font-black leading-none text-amber-300">
                ₹{PRICE}
              </p>

              <p className="mt-0.5 text-[9px] font-medium text-white/55">
                One-time
              </p>
            </div>

            <a
              href={CHECKOUT_URL}
              onClick={() => {
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
              }}
              className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-lg bg-amber-300 px-3 text-xs font-black text-emerald-950 shadow-[0_3px_0_rgba(120,53,15,0.65)] transition hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-[0_4px_0_rgba(120,53,15,0.65)] active:translate-y-0 active:shadow-none sm:min-h-10 sm:px-4 sm:text-sm"
            >
              Register · ₹{PRICE}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}