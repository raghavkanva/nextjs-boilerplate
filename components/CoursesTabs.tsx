"use client";

import { useState } from "react";
import PlansGrid from "@/components/Plans";
import IndividualCoursesGrid from "@/components/IndividualCoursesGrid";
import { track } from "@/lib/analytics";

type Tab = "bundle" | "individual";

export default function CoursesTabs() {
  const [tab, setTab] = useState<Tab>("bundle");

  const handleTab = (t: Tab) => {
    setTab(t);
    track("courses_tab_switch", { tab: t, page: "courses" });
  };

  return (
    <div>
      {/* Tab toggle */}
      <div className="mx-auto mb-8 flex max-w-xs rounded-2xl border border-line bg-surfaceRaised p-1">
        <button
          type="button"
          onClick={() => handleTab("bundle")}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
            tab === "bundle"
              ? "bg-text text-white shadow-sm"
              : "text-muted hover:text-text"
          }`}
        >
          Bundle Course
        </button>
        <button
          type="button"
          onClick={() => handleTab("individual")}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
            tab === "individual"
              ? "bg-text text-white shadow-sm"
              : "text-muted hover:text-text"
          }`}
        >
          Individual Courses
        </button>
      </div>

      {tab === "bundle" ? (
        <PlansGrid
          id="plans"
          heading="Choose How Long You Want Access"
          subline="Same 10 courses in every plan. Pick the timeframe that fits how you learn."
        />
      ) : (
        <IndividualCoursesGrid />
      )}
    </div>
  );
}
