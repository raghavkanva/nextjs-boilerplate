"use client";

import { BookOpen, CalendarDays, ChevronRight } from "lucide-react";
import { track } from "@/lib/analytics";

const COURSES_URL = "https://courses.etalvis.com/courses";
const WORKSHOPS_URL = "https://courses.etalvis.com/workshop";

export default function StickyExploreBar() {
  return (
    <>
      {/* Prevents the fixed bar from covering the final page content */}
      <div
        aria-hidden="true"
        className="h-[88px] sm:h-[100px] lg:h-[108px]"
      />

      <aside
        aria-label="Explore eTalVis courses and workshops"
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-5 sm:pb-4 lg:px-6 lg:pb-5"
      >
        <div className="mx-auto grid w-full max-w-3xl grid-cols-2 overflow-hidden rounded-2xl shadow-[0_-12px_40px_rgba(120,53,15,0.35)] sm:rounded-3xl">
          {/* Courses */}
          <a
            href={COURSES_URL}
            onClick={() => track("sticky_explore_courses_click", { page: "home", destination: "courses" })}
            className="group flex min-h-[68px] items-center justify-between gap-2 border-r border-[#FFC400]/30 bg-[#78350F] px-3 py-3 text-left text-white transition-colors hover:bg-[#92400E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#FFC400]/40 sm:min-h-[76px] sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC400]/20 sm:h-11 sm:w-11">
                <BookOpen
                  aria-hidden="true"
                  className="h-[18px] w-[18px] text-[#FFC400] sm:h-5 sm:w-5"
                />
              </span>

              <span className="min-w-0">
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200 sm:block sm:text-xs">
                  Self-paced learning · from ₹511
                </span>

                <span className="block text-[13px] font-extrabold leading-tight sm:mt-0.5 sm:text-base lg:text-lg">
                  Explore Courses
                </span>
              </span>
            </span>

            <ChevronRight
              aria-hidden="true"
              className="hidden h-5 w-5 shrink-0 text-[#FFC400] transition-transform duration-200 group-hover:translate-x-1 md:block"
            />
          </a>

          {/* Workshops */}
          <a
            href={WORKSHOPS_URL}
            onClick={() => track("sticky_join_workshops_click", { page: "home", destination: "workshop" })}
            className="group flex min-h-[68px] items-center justify-between gap-2 bg-[#FFC400] px-3 py-3 text-left text-[#78350F] transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#78350F]/30 sm:min-h-[76px] sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#78350F]/15 sm:h-11 sm:w-11">
                <CalendarDays
                  aria-hidden="true"
                  className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                />
              </span>

              <span className="min-w-0">
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#92400E] sm:block sm:text-xs">
                  Live expert sessions · ₹159
                </span>

                <span className="block text-[13px] font-extrabold leading-tight sm:mt-0.5 sm:text-base lg:text-lg">
                  Join Workshops
                </span>
              </span>
            </span>

            <ChevronRight
              aria-hidden="true"
              className="hidden h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 md:block"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
