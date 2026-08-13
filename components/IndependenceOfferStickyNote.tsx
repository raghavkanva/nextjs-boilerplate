"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const OFFER_DEADLINE = "2026-08-31T23:59:59+05:30";
const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";

const STARTER_ORIGINAL = 639;
const STARTER_OFFER = Math.round(STARTER_ORIGINAL * 0.8);
const STARTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26";
const STARTER_PER_DAY = Math.round(STARTER_OFFER / 30);

const SEMESTER_ORIGINAL = 2559;
const SEMESTER_OFFER = Math.round(SEMESTER_ORIGINAL * 0.8);
const SEMESTER_CHECKOUT = "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca";
const SEMESTER_PER_DAY = Math.round(SEMESTER_OFFER / 180);
const SEMESTER_DISCOUNT = Math.round((1 - SEMESTER_OFFER / (STARTER_OFFER * 6)) * 100);

type CountState = { days: number; hours: number; minutes: number; seconds: number; expired: boolean };

function useCountdown(iso: string) {
  const [state, setState] = useState<CountState>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(iso).getTime() - Date.now();
      if (diff <= 0) { setState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      setState({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
        expired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [iso]);

  return state;
}

function Digit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex min-w-[28px] items-center justify-center rounded-md bg-white/20 px-1.5 py-0.5 text-xs font-black tabular-nums text-white sm:min-w-[32px] sm:text-sm">
        {String(val).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-white/60">{label}</span>
    </div>
  );
}

export default function IndependenceOfferStickyNote() {
  const { days, hours, minutes, seconds, expired } = useCountdown(OFFER_DEADLINE);
  if (expired) return null;

  const handleClick = (plan: string, url: string) => {
    track("independence_offer_sticky_click", { page: "embedded-systems", plan, offer_code: OFFER_CODE });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div aria-hidden="true" className="h-[152px] sm:h-[88px]" />

      <aside
        aria-label="Independence Day offer — enroll now"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-emerald-700 bg-[#0A3D1F] shadow-[0_-8px_40px_rgba(10,61,31,0.45)]">
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-3.5">

            {/* Left: offer label + countdown */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden flex-col sm:flex">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-300">
                  Independence Offer · Ends Aug 31
                </p>
                <p className="text-[11px] font-semibold text-white/60">
                  Code: {OFFER_CODE}
                </p>
              </div>
              {/* Countdown */}
              <div className="flex items-center gap-1">
                <Digit val={days} label="Days" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={hours} label="Hrs" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={minutes} label="Min" />
                <span className="mb-3 text-xs font-black text-white/30">:</span>
                <Digit val={seconds} label="Sec" />
              </div>
            </div>

            {/* Enroll buttons */}
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
              {/* Starter */}
              <button
                type="button"
                onClick={() => handleClick("starter", STARTER_CHECKOUT)}
                className="flex flex-col items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-left transition hover:bg-white/18 sm:items-start"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">Starter · 1 Month</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-black text-white">₹{STARTER_OFFER}</span>
                  <span className="text-xs text-white/40 line-through">₹{STARTER_ORIGINAL}</span>
                </div>
                <span className="text-[10px] text-white/50">≈₹{STARTER_PER_DAY}/day · All 10 courses</span>
              </button>

              {/* Semester */}
              <button
                type="button"
                onClick={() => handleClick("semester", SEMESTER_CHECKOUT)}
                className="relative flex flex-col items-center rounded-xl border border-[#FFC400]/60 bg-[#FFC400]/15 px-4 py-2 text-left transition hover:bg-[#FFC400]/25 sm:items-start"
              >
                <div className="absolute -top-2 right-2 rounded-full bg-[#FFC400] px-2 py-0.5 text-[9px] font-extrabold text-[#0A3D1F]">
                  BEST VALUE · {SEMESTER_DISCOUNT}% OFF
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFC400]">Semester · 6 Months</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-black text-white">₹{SEMESTER_OFFER.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-white/40 line-through">₹{SEMESTER_ORIGINAL.toLocaleString("en-IN")}</span>
                </div>
                <span className="text-[10px] text-white/50">≈₹{SEMESTER_PER_DAY}/day · Includes mock interview</span>
              </button>
            </div>
          </div>

          {/* Mobile offer text */}
          <p className="border-t border-white/10 px-4 py-1.5 text-center text-[10px] font-semibold text-white/50 sm:hidden">
            Pay 80% · Code: {OFFER_CODE} · Valid until Aug 31, 2026
          </p>
        </div>
      </aside>
    </>
  );
}
