"use client";

import { ArrowRight, BadgePercent } from "lucide-react";
import { track } from "@/lib/analytics";

const OFFER_CODE = "INDIA_80TH_INDEPENDENCE_DAY";
const OFFER_URL = "https://courses.etalvis.com/independence-offer";

export default function IndependenceOfferStickyNote() {
  return (
    <>
      <div
        aria-hidden="true"
        className="h-[126px] sm:h-[92px]"
      />

      <aside
        aria-label="Independence Day offer"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-4 sm:pb-4"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-emerald-800 bg-emerald-500 p-3 text-slate-950 shadow-[0_-8px_35px_rgba(15,23,42,0.22)] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-4">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/50 sm:h-11 sm:w-11">
              <BadgePercent
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-black leading-5 sm:text-base">
                Independence Day Offer : Pay Only 80%
              </p>

              <p className="mt-0.5 break-words text-[11px] font-semibold leading-4 text-slate-800 sm:text-sm">
                Code: {OFFER_CODE} · Valid until August 31, 2026
              </p>
            </div>
          </div>

          <a
            href={OFFER_URL}
            onClick={() => track("independence_offer_sticky_click", { page: "embedded-systems", offer_code: OFFER_CODE })}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-950 bg-slate-950 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:w-auto"
          >
            View Offer

            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
