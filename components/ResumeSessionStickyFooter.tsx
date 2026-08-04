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
      <span className="flex min-h-[32px] min-w-[36px] items-center justify-center rounded-md border-2 border-[#0A3D1F] bg-white px-1.5 text-sm font-black leading-none tabular-nums text-[#0A3D1F] shadow-[0_2px_0_#0A3D1F] sm:min-h-[36px] sm:min-w-[40px] sm:text-base">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-0.5 text-[7px] font-black uppercase tracking-[0.08em] text-[#0A3D1F]/70 sm:text-[8px]">
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
      {/* Prevent content from hiding behind the compact footer */}
      <div aria-hidden="true" className="h-[78px] sm:h-[72px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-[90] px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border-2 border-[#0A3D1F] bg-gradient-to-r from-[#FFE45E] via-[#FFD84D] to-[#FFC107] px-2.5 py-2 text-[#0A3D1F] shadow-[0_-8px_24px_rgba(15,23,42,0.20)] sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-4 sm:py-2.5">
            {/* Desktop information */}
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-black leading-tight text-[#0A3D1F]">
                Resume Masterclass: Live Online
              </p>

              <p className="mt-0.5 truncate text-[10px] font-semibold text-[#0A3D1F]/70">
                Aug 9, 2026 • 11 AM to 1 PM IST • Balajee Seshadri
              </p>
            </div>

            {/* Countdown */}
            <div className="min-w-0">
              <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-[#0A3D1F] sm:hidden">
                Registration closes in
              </p>

              <div className="flex items-start gap-0.5 sm:gap-1">
                <CountdownDigit value={days} label="Days" />

                <span className="mt-1.5 text-sm font-black text-[#0A3D1F]/40">
                  :
                </span>

                <CountdownDigit value={hours} label="Hrs" />

                <span className="mt-1.5 text-sm font-black text-[#0A3D1F]/40">
                  :
                </span>

                <CountdownDigit value={minutes} label="Min" />

                <span className="mt-1.5 hidden text-sm font-black text-[#0A3D1F]/40 min-[390px]:block">
<span className="mt-1.5 text-sm font-black text-[#0A3D1F]/40">
  :
</span>

<CountdownDigit value={seconds} label="Sec" />
              </div>
   
            {/* Register CTA */}
            <div className="flex shrink-0 items-center justify-end">
              <a
                href={CHECKOUT_URL}
                onClick={handleRegisterClick}
                className="inline-flex min-h-[42px] min-w-[112px] shrink-0 flex-col items-center justify-center whitespace-nowrap rounded-lg border-2 border-[#0A3D1F] bg-gradient-to-b from-[#14532D] to-[#08361C] px-3 text-white shadow-[0_3px_0_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-none sm:min-h-10 sm:min-w-0 sm:flex-row sm:px-5"
              >
                <span className="text-xs font-black leading-none sm:text-sm">
                  Register Now
                </span>

                <span className="mt-0.5 text-[10px] font-bold text-[#FFD84D] sm:ml-2 sm:mt-0 sm:text-xs">
                  ₹{PRICE}
                </span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}