"use client";

import { useEffect, useState } from "react";

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

export default function ResumeSessionStickyFooter() {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE_ISO);

  if (expired) return null;

  return (
    <>
      <div aria-hidden="true" className="h-[120px] sm:h-[80px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-4 sm:pb-4"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-[#0A3D1F] bg-[#0A3D1F] p-3 text-white shadow-[0_-8px_35px_rgba(15,23,42,0.22)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-white/80 sm:text-sm">
              Registration closes in
            </p>

            <div className="mt-1.5 flex items-end gap-1">
              <div className="flex flex-col items-center">
                <span className="min-w-[2rem] rounded bg-white px-1.5 py-0.5 text-center text-sm font-black tabular-nums text-[#0A3D1F] sm:text-base">
                  {String(days).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Days</span>
              </div>

              <span className="mb-4 text-sm font-bold text-white/60">:</span>

              <div className="flex flex-col items-center">
                <span className="min-w-[2rem] rounded bg-white px-1.5 py-0.5 text-center text-sm font-black tabular-nums text-[#0A3D1F] sm:text-base">
                  {String(hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Hrs</span>
              </div>

              <span className="mb-4 text-sm font-bold text-white/60">:</span>

              <div className="flex flex-col items-center">
                <span className="min-w-[2rem] rounded bg-white px-1.5 py-0.5 text-center text-sm font-black tabular-nums text-[#0A3D1F] sm:text-base">
                  {String(minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Min</span>
              </div>

              <span className="mb-4 text-sm font-bold text-white/60">:</span>

              <div className="flex flex-col items-center">
                <span className="min-w-[2rem] rounded bg-white px-1.5 py-0.5 text-center text-sm font-black tabular-nums text-[#0A3D1F] sm:text-base">
                  {String(seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Sec</span>
              </div>
            </div>
          </div>

          <a
            href={CHECKOUT_URL}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl border-2 border-white bg-white px-5 py-2.5 text-sm font-extrabold text-[#0A3D1F] transition hover:bg-[#FFC400] hover:border-[#FFC400] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:w-auto"
          >
            Register Now, Rs. {PRICE}
          </a>
        </div>
      </aside>
    </>
  );
}
