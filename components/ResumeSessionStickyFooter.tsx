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
      <span className="flex min-h-[38px] min-w-[42px] items-center justify-center rounded-lg border-2 border-[#0A3D1F] bg-white px-2 text-base font-black leading-none tabular-nums text-[#0A3D1F] shadow-[0_3px_0_#0A3D1F] sm:min-h-[42px] sm:min-w-[48px] sm:text-lg">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-1 text-[8px] font-black uppercase tracking-[0.08em] text-[#0A3D1F]/75 sm:text-[9px]">
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
      {/* Prevent page content from being hidden behind the footer */}
      <div aria-hidden="true" className="h-[122px] sm:h-[92px]" />

      <aside
        aria-label="Resume session registration deadline"
        className="fixed inset-x-0 bottom-0 z-[90] px-2 pb-2 sm:px-4 sm:pb-3"
      >
        <div className="relative mx-auto w-full max-w-4xl pt-5 sm:pt-0">
          {/* Independence Offer Ribbon */}
          <div className="absolute left-3 top-0 z-20 max-w-[92%] sm:hidden">
            <div className="absolute inset-0 rounded-t-xl rounded-br-xl bg-white/30 blur-md" />

            <div className="relative rounded-t-xl rounded-br-xl border border-white/20 bg-gradient-to-r from-[#7C2D12] via-[#B45309] to-[#7C2D12] px-4 py-2 shadow-[0_10px_28px_rgba(0,0,0,0.28)]">
              <p
                className="whitespace-nowrap text-[10px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white"
                style={{
                  textShadow:
                    "0 0 4px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.75), 0 0 20px rgba(255,255,255,0.45)",
                }}
              >
                India Enters Its 80th Year • Pay Just ₹80
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border-2 border-[#0A3D1F] bg-gradient-to-r from-[#FFE45E] via-[#FFD84D] to-[#FFC107] px-3 pb-3 pt-8 text-[#0A3D1F] shadow-[0_-10px_30px_rgba(15,23,42,0.25)] sm:grid-cols-[1fr_auto_1fr] sm:gap-5 sm:px-5 sm:py-3">
            {/* Desktop information */}
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-black leading-tight text-[#0A3D1F]">
                Resume Masterclass: Live Online
              </p>

              <p className="mt-1 truncate text-[11px] font-semibold text-[#0A3D1F]/70">
                Aug 9, 2026 • 11 AM to 1 PM IST • Balajee Seshadri
              </p>
            </div>

            {/* Countdown */}
            <div className="min-w-0">
              <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-[#0A3D1F] sm:hidden">
                Registration closes in
              </p>

              <div className="flex items-start gap-1">
                <CountdownDigit value={days} label="Days" />

                <span className="mt-2 text-base font-black text-[#0A3D1F]/45">
                  :
                </span>

                <CountdownDigit value={hours} label="Hrs" />

                <span className="mt-2 text-base font-black text-[#0A3D1F]/45">
                  :
                </span>

                <CountdownDigit value={minutes} label="Min" />

                <span className="mt-2 hidden text-base font-black text-[#0A3D1F]/45 min-[390px]:block">
                  :
                </span>

                <div className="hidden min-[390px]:block">
                  <CountdownDigit value={seconds} label="Sec" />
                </div>
              </div>
            </div>

            {/* Register CTA */}
            <div className="flex shrink-0 items-center justify-end">
              <a
                href={CHECKOUT_URL}
                onClick={handleRegisterClick}
                className="inline-flex min-h-[52px] min-w-[126px] shrink-0 flex-col items-center justify-center whitespace-nowrap rounded-xl border-2 border-[#0A3D1F] bg-gradient-to-b from-[#14532D] to-[#08361C] px-4 text-white shadow-[0_5px_0_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(10,61,31,0.35)] active:translate-y-0 active:shadow-none sm:min-h-11 sm:min-w-0 sm:flex-row sm:px-6"
              >
                <span className="text-sm font-black leading-none sm:text-base">
                  Register Now
                </span>

                <span className="mt-1 text-[11px] font-bold text-[#FFD84D] sm:ml-2 sm:mt-0 sm:text-sm">
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