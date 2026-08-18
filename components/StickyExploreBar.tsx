"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import { track } from "@/lib/analytics";

const COURSES_URL = "https://courses.etalvis.com/courses";

export default function StickyExploreBar() {
  return (
    <>
      {/* Prevents the fixed bar from covering the final page content */}
      <div
        aria-hidden="true"
        className="h-[88px] sm:h-[100px] lg:h-[108px]"
      />

      <aside
        aria-label="Explore eTalVis courses"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-5 sm:pb-4 lg:px-6 lg:pb-5"
      >
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_-8px_35px_rgba(15,23,42,0.20)] sm:rounded-3xl">
          {/* Courses — full width */}
          <a
            href={COURSES_URL}
            onClick={() => track("sticky_explore_courses_click", { page: "home", destination: "courses" })}
            className="group flex min-h-[68px] w-full items-center justify-between gap-2 bg-emerald-600 px-3 py-3 text-left text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200 sm:min-h-[76px] sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:h-11 sm:w-11">
                <BookOpen
                  aria-hidden="true"
                  className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                />
              </span>

              <span className="min-w-0">
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-50 sm:block sm:text-xs">
                  Self-paced learning · from ₹511
                </span>

                <span className="block text-[13px] font-extrabold leading-tight sm:mt-0.5 sm:text-base lg:text-lg">
                  Explore Courses
                </span>
              </span>
            </span>

            <ChevronRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
