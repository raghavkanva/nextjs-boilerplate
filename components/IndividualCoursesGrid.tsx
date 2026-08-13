"use client";

import { useState } from "react";
import { courses, individualCourseCheckouts } from "@/data/content";
import { track, metaEvent } from "@/lib/analytics";

type Duration = "1month" | "3months";

const PRICE_1M = 159;
const PRICE_3M = 319;
const PER_DAY_1M = Math.round((PRICE_1M / 30) * 10) / 10; // 5.3
const PER_DAY_3M = Math.round((PRICE_3M / 90) * 10) / 10; // 3.5

const checkoutMap = Object.fromEntries(
  individualCourseCheckouts.map((c) => [
    c.courseNumber,
    { "1month": c.checkout1Month, "3months": c.checkout3Month },
  ])
);

const individualCourses = courses.filter((c) => c.number !== 6);

// Per-course thumbnail config: bg gradient + accent + visual SVG
const courseThumbnails: Record<number, {
  bg: string;
  accent: string;
  visual: React.ReactNode;
}> = {
  1: {
    bg: "from-sky-950 via-sky-900 to-slate-900",
    accent: "#38BDF8",
    visual: (
      <svg width="88" height="56" viewBox="0 0 88 56" fill="none" aria-hidden="true">
        {/* Sine wave */}
        <path d="M4 28 Q15 8 26 28 Q37 48 48 28 Q59 8 70 28 Q81 48 88 36" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Ground rail */}
        <line x1="4" y1="50" x2="84" y2="50" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        {/* Resistor symbol */}
        <rect x="38" y="10" width="14" height="6" rx="1" stroke="#7DD3FC" strokeWidth="1.4" fill="none" />
        <line x1="32" y1="13" x2="38" y2="13" stroke="#7DD3FC" strokeWidth="1.4" />
        <line x1="52" y1="13" x2="58" y2="13" stroke="#7DD3FC" strokeWidth="1.4" />
        {/* Nodes */}
        <circle cx="4" cy="28" r="2.5" fill="#38BDF8" />
        <circle cx="48" cy="28" r="2.5" fill="#38BDF8" />
      </svg>
    ),
  },
  2: {
    bg: "from-violet-950 via-purple-900 to-slate-900",
    accent: "#A78BFA",
    visual: (
      <svg width="96" height="56" viewBox="0 0 96 56" fill="none" aria-hidden="true">
        {/* Terminal window top */}
        <rect x="6" y="6" width="84" height="44" rx="5" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.5" />
        <line x1="6" y1="17" x2="90" y2="17" stroke="#A78BFA" strokeWidth="1" opacity="0.4" />
        <circle cx="14" cy="11.5" r="2.5" fill="#A78BFA" opacity="0.5" />
        <circle cx="22" cy="11.5" r="2.5" fill="#A78BFA" opacity="0.3" />
        {/* Code lines */}
        <text x="12" y="30" fill="#C4B5FD" fontSize="7" fontFamily="monospace" fontWeight="bold">int main() &#123;</text>
        <text x="18" y="40" fill="#DDD6FE" fontSize="7" fontFamily="monospace">return 0;</text>
        <text x="12" y="48" fill="#C4B5FD" fontSize="7" fontFamily="monospace">&#125;</text>
      </svg>
    ),
  },
  3: {
    bg: "from-orange-950 via-amber-900 to-slate-900",
    accent: "#FB923C",
    visual: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" aria-hidden="true">
        {/* Chip body */}
        <rect x="22" y="14" width="36" height="32" rx="3" stroke="#FB923C" strokeWidth="1.8" fill="none" />
        {/* Chip cross lines */}
        <line x1="40" y1="14" x2="40" y2="46" stroke="#FB923C" strokeWidth="0.8" opacity="0.3" />
        <line x1="22" y1="30" x2="58" y2="30" stroke="#FB923C" strokeWidth="0.8" opacity="0.3" />
        {/* Left pins */}
        {[20, 26, 32, 38].map((y, i) => (
          <line key={i} x1="12" y1={y} x2="22" y2={y} stroke="#FDBA74" strokeWidth="1.5" />
        ))}
        {/* Right pins */}
        {[20, 26, 32, 38].map((y, i) => (
          <line key={i} x1="58" y1={y} x2="68" y2={y} stroke="#FDBA74" strokeWidth="1.5" />
        ))}
        {/* Top pins */}
        {[30, 40, 50].map((x, i) => (
          <line key={i} x1={x} y1="6" x2={x} y2="14" stroke="#FDBA74" strokeWidth="1.5" />
        ))}
        {/* Bottom pins */}
        {[30, 40, 50].map((x, i) => (
          <line key={i} x1={x} y1="46" x2={x} y2="54" stroke="#FDBA74" strokeWidth="1.5" />
        ))}
        <text x="33" y="33" fill="#FB923C" fontSize="8" fontWeight="bold">MCU</text>
      </svg>
    ),
  },
  4: {
    bg: "from-emerald-950 via-green-900 to-slate-900",
    accent: "#34D399",
    visual: (
      <svg width="92" height="56" viewBox="0 0 92 56" fill="none" aria-hidden="true">
        {/* GPIO pin header */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={8 + i * 11} y="20" width="7" height="7" rx="1" fill={i === 3 ? "#34D399" : "none"} stroke="#34D399" strokeWidth="1.2" opacity={i === 3 ? 1 : 0.45} />
        ))}
        {/* LED */}
        <circle cx="72" cy="38" r="7" stroke="#34D399" strokeWidth="1.5" fill="none" />
        <circle cx="72" cy="38" r="3" fill="#34D399" opacity="0.7" />
        {/* Wire from pin to LED */}
        <path d="M43 23.5 L43 38 L65 38" stroke="#6EE7B7" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* PWM squarewave */}
        <path d="M8 48 L16 48 L16 44 L24 44 L24 48 L32 48 L32 44 L40 44 L40 48" stroke="#34D399" strokeWidth="1.4" strokeLinecap="square" fill="none" opacity="0.55" />
      </svg>
    ),
  },
  5: {
    bg: "from-rose-950 via-red-900 to-slate-900",
    accent: "#FB7185",
    visual: (
      <svg width="92" height="56" viewBox="0 0 92 56" fill="none" aria-hidden="true">
        {/* PWM signal */}
        <path d="M6 38 L14 38 L14 20 L22 20 L22 38 L30 38 L30 20 L38 20 L38 38 L46 38 L46 28 L54 28 L54 38 L62 38" stroke="#FB7185" strokeWidth="2" strokeLinecap="square" fill="none" />
        {/* Timer arc */}
        <path d="M72 42 A14 14 0 0 1 72 14" stroke="#FCA5A5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M72 42 A14 14 0 0 0 86 28" stroke="#FCA5A5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="72" cy="28" r="3" fill="#FB7185" />
        <line x1="72" y1="28" x2="80" y2="20" stroke="#FB7185" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  7: {
    bg: "from-cyan-950 via-teal-900 to-slate-900",
    accent: "#22D3EE",
    visual: (
      <svg width="90" height="56" viewBox="0 0 90 56" fill="none" aria-hidden="true">
        {/* CPU block */}
        <rect x="28" y="12" width="34" height="32" rx="2" stroke="#22D3EE" strokeWidth="1.5" fill="none" />
        {/* Internal pipeline stages */}
        <rect x="31" y="16" width="8" height="10" rx="1" fill="#22D3EE" opacity="0.25" />
        <rect x="41" y="16" width="8" height="10" rx="1" fill="#22D3EE" opacity="0.35" />
        <rect x="51" y="16" width="8" height="10" rx="1" fill="#22D3EE" opacity="0.45" />
        {/* Arrows between stages */}
        <path d="M39 21 L41 21" stroke="#67E8F9" strokeWidth="1" markerEnd="url(#a)" />
        <path d="M49 21 L51 21" stroke="#67E8F9" strokeWidth="1" />
        {/* Bus lines */}
        {[30, 34, 38].map((y, i) => (
          <line key={i} x1="10" y1={y} x2="28" y2={y} stroke="#22D3EE" strokeWidth="1" opacity={0.3 + i * 0.15} />
        ))}
        {[30, 34, 38].map((y, i) => (
          <line key={i} x1="62" y1={y} x2="80" y2={y} stroke="#22D3EE" strokeWidth="1" opacity={0.3 + i * 0.15} />
        ))}
        <text x="33" y="38" fill="#67E8F9" fontSize="6" fontFamily="monospace">FETCH</text>
        <text x="40" y="38" fill="#67E8F9" fontSize="6" fontFamily="monospace">DEC</text>
        <text x="50" y="38" fill="#67E8F9" fontSize="6" fontFamily="monospace">EXE</text>
      </svg>
    ),
  },
  8: {
    bg: "from-yellow-950 via-amber-900 to-slate-900",
    accent: "#FBBF24",
    visual: (
      <svg width="86" height="56" viewBox="0 0 86 56" fill="none" aria-hidden="true">
        {/* 8085 die outline */}
        <rect x="20" y="8" width="46" height="40" rx="2" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
        {/* Internal blocks */}
        <rect x="24" y="12" width="16" height="12" rx="1" stroke="#FCD34D" strokeWidth="1" fill="none" />
        <text x="26" y="21" fill="#FCD34D" fontSize="5.5" fontFamily="monospace">ALU</text>
        <rect x="44" y="12" width="18" height="12" rx="1" stroke="#FCD34D" strokeWidth="1" fill="none" />
        <text x="46" y="21" fill="#FCD34D" fontSize="5.5" fontFamily="monospace">REG</text>
        <rect x="24" y="28" width="38" height="16" rx="1" stroke="#FCD34D" strokeWidth="1" fill="none" />
        <text x="36" y="39" fill="#FCD34D" fontSize="5.5" fontFamily="monospace">BUS CTRL</text>
        {/* Pins */}
        {[16, 22, 28, 34, 40, 46].map((y, i) => (
          <line key={i} x1="8" y1={y} x2="20" y2={y} stroke="#FBBF24" strokeWidth="1.2" opacity="0.6" />
        ))}
        {[16, 22, 28, 34, 40, 46].map((y, i) => (
          <line key={i} x1="66" y1={y} x2="78" y2={y} stroke="#FBBF24" strokeWidth="1.2" opacity="0.6" />
        ))}
        <text x="26" y="8" fill="#FBBF24" fontSize="7" fontWeight="bold" textAnchor="middle" dy="-2">8085</text>
      </svg>
    ),
  },
  9: {
    bg: "from-indigo-950 via-blue-900 to-slate-900",
    accent: "#818CF8",
    visual: (
      <svg width="88" height="56" viewBox="0 0 88 56" fill="none" aria-hidden="true">
        {/* ARM chip */}
        <rect x="24" y="10" width="40" height="36" rx="3" stroke="#818CF8" strokeWidth="1.5" fill="none" />
        {/* ARM text */}
        <text x="44" y="31" fill="#818CF8" fontSize="10" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">ARM</text>
        {/* Pipeline arrows */}
        <path d="M12 18 L24 18" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M12 24 L24 24" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M12 30 L24 30" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M12 36 L24 36" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M64 18 L76 18" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M64 24 L76 24" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M64 30 L76 30" stroke="#A5B4FC" strokeWidth="1.2" />
        <path d="M64 36 L76 36" stroke="#A5B4FC" strokeWidth="1.2" />
        {/* Thumb mode dots */}
        <circle cx="12" cy="44" r="2" fill="#818CF8" opacity="0.6" />
        <circle cx="20" cy="44" r="2" fill="#818CF8" opacity="0.6" />
        <circle cx="28" cy="44" r="2" fill="#818CF8" opacity="0.6" />
      </svg>
    ),
  },
  10: {
    bg: "from-teal-950 via-cyan-900 to-slate-900",
    accent: "#2DD4BF",
    visual: (
      <svg width="92" height="56" viewBox="0 0 92 56" fill="none" aria-hidden="true">
        {/* Network layers stack */}
        {["APP", "TCP", "IP", "ETH"].map((label, i) => (
          <g key={label}>
            <rect x="26" y={8 + i * 11} width="40" height="9" rx="1.5" stroke="#2DD4BF" strokeWidth="1.2" fill={i === 0 ? "#2DD4BF" : "none"} fillOpacity="0.12" />
            <text x="46" y={15.5 + i * 11} fill={i === 0 ? "#2DD4BF" : "#99F6E4"} fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity={1 - i * 0.18}>
              {label}
            </text>
          </g>
        ))}
        {/* Nodes */}
        <circle cx="10" cy="28" r="5" stroke="#2DD4BF" strokeWidth="1.2" fill="none" />
        <circle cx="82" cy="28" r="5" stroke="#2DD4BF" strokeWidth="1.2" fill="none" />
        {/* Connections */}
        <line x1="15" y1="28" x2="26" y2="28" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="66" y1="28" x2="77" y2="28" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
};

function CourseThumbnail({ course }: { course: typeof individualCourses[number] }) {
  const t = courseThumbnails[course.number];
  if (!t) return null;
  return (
    <div className={`relative flex h-28 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${t.bg}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
        style={{ background: t.accent, opacity: 0.18 }}
      />
      {t.visual}
      <span
        className="absolute bottom-2.5 right-3 text-[9px] font-extrabold uppercase tracking-widest"
        style={{ color: t.accent }}
      >
        Course {course.number}
      </span>
    </div>
  );
}

function CourseCard({ course }: { course: typeof individualCourses[number] }) {
  const [duration, setDuration] = useState<Duration>("3months");
  const price = duration === "1month" ? PRICE_1M : PRICE_3M;
  const perDay = duration === "1month" ? PER_DAY_1M : PER_DAY_3M;
  const checkoutUrl = checkoutMap[course.number]?.[duration] ?? null;

  const handleToggle = (d: Duration) => {
    setDuration(d);
    track("pricing_toggle", {
      section: "individual_course",
      course_number: course.number,
      selected_duration: d,
      page: "individual-courses",
    });
  };

  const handleEnroll = () => {
    track("individual_course_enroll_click", {
      course_number: course.number,
      course_title: course.title,
      duration,
      price,
      currency: "INR",
      page: "individual-courses",
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
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(15,23,42,0.12)]">
      <CourseThumbnail course={course} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mutedDim">
            {course.tag}
          </span>
        </div>

        <h3 className="font-display text-sm font-bold leading-snug text-text">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-xs leading-5 text-muted">{course.description}</p>
        )}

        {course.note && (
          <p className="text-[11px] font-semibold text-amber">{course.note}</p>
        )}

        <div className="mt-auto pt-2">
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

          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-text">
              ₹{price}
            </span>
            <span className="text-xs text-mutedDim">
              {duration === "1month" ? "/ 1 month" : "/ 3 months"}
            </span>
            <span className="ml-auto text-[11px] font-semibold text-amber">
              ≈₹{perDay}/day
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
      </div>
    </article>
  );
}

export default function IndividualCoursesGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-black text-text sm:text-2xl">
          Individual Foundation Courses
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          ₹159 / 1 month &nbsp;·&nbsp; ₹319 / 3 months &nbsp;·&nbsp; 9 courses to choose from
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
