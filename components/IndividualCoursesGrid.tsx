"use client";

import { useState } from "react";
import { courses, individualCourseCheckouts } from "@/data/content";
import { track, metaEvent } from "@/lib/analytics";

type Duration = "1month" | "3months";

const PRICE_1M = 159;
const PRICE_3M = 319;

const checkoutMap = Object.fromEntries(
  individualCourseCheckouts.map((c) => [
    c.courseNumber,
    { "1month": c.checkout1Month, "3months": c.checkout3Month },
  ])
);

// Course 6 (Interface Protocols) is included in the complete course only.
const individualCourses = courses.filter((c) => c.number !== 6);

function CourseCard({ course }: { course: (typeof individualCourses)[number] }) {
  const [duration, setDuration] = useState<Duration>("3months");
  const price = duration === "1month" ? PRICE_1M : PRICE_3M;
  const checkoutUrl = checkoutMap[course.number]?.[duration] ?? null;

  const handleToggle = (d: Duration) => {
    setDuration(d);
    track("pricing_toggle", {
      section: "individual_course",
      course_number: course.number,
      selected_duration: d,
      page: "courses",
    });
  };

  const handleEnroll = () => {
    track("individual_course_enroll_click", {
      course_number: course.number,
      course_title: course.title,
      duration,
      price,
      currency: "INR",
      page: "courses",
    });
    metaEvent("InitiateCheckout", {
      content_name: course.title,
      content_type: `individual-course-${course.number}`,
      value: price,
      currency: "INR",
      num_items: 1,
    });
  };

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surfaceRaised text-sm font-black text-amber">
          {course.number}
        </span>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mutedDim">
          {course.tag}
        </span>
      </div>

      <h3 className="mt-3 font-display text-base font-bold leading-snug text-text">
        {course.title}
      </h3>

      {course.description && (
        <p className="mt-1.5 text-xs leading-5 text-muted">{course.description}</p>
      )}

      {course.note && (
        <p className="mt-1 text-[11px] font-semibold text-amber">{course.note}</p>
      )}

      <div className="mt-auto pt-4">
        {/* Duration toggle */}
        <div className="flex rounded-xl border border-line p-1">
          {(["1month", "3months"] as Duration[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleToggle(d)}
              className={`flex-1 rounded-lg py-1.5 text-center text-xs font-bold transition ${
                duration === d
                  ? "bg-text text-white shadow-sm"
                  : "text-muted hover:text-text"
              }`}
            >
              {d === "1month" ? "1 Month" : "3 Months"}
            </button>
          ))}
        </div>

        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-black text-text">
            ₹{price}
          </span>
          <span className="text-xs text-mutedDim">
            {duration === "1month" ? "/ 1 month access" : "/ 3 months access"}
          </span>
        </div>

        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            onClick={handleEnroll}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-xl border-2 border-text bg-cta py-2.5 text-center text-sm font-black text-text shadow-[0_3px_0_#0f172a] transition hover:-translate-y-0.5 hover:bg-amber-300 active:translate-y-0.5 active:shadow-none"
          >
            Enroll
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-3 block w-full cursor-not-allowed rounded-xl border-2 border-line bg-line py-2.5 text-center text-sm font-black text-mutedDim"
          >
            Coming Soon
          </button>
        )}
      </div>
    </article>
  );
}

export default function IndividualCoursesGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-black text-text sm:text-2xl">
          Or Enroll in Individual Courses
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          ₹159 for 1 month &middot; ₹319 for 3 months
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {individualCourses.map((course) => (
          <CourseCard key={course.number} course={course} />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-mutedDim">
        Course 6 (Embedded Software: Interface Protocols) is available in the complete course only.
      </p>
    </section>
  );
}
