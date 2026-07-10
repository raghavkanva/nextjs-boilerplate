"use client";

import { useState } from "react";
import Image from "next/image";
import { instructor } from "@/data/content";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`text-amber shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InstructorCard() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "instructor_bio_expand");
    }
  };

  return (
    <section className="border-y border-line bg-surface">
      <button
        onClick={handleToggle}
        className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-left"
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-line shrink-0">
            <Image
              src={instructor.photoFormal}
              alt={instructor.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-display font-semibold text-3xl md:text-4xl text-text leading-tight">
              {instructor.name}
            </span>
            <p className="text-base md:text-lg text-muted mt-1">
              {instructor.yearsExperience} years in the Electronics Industry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="font-display font-semibold text-2xl text-amber">
              {instructor.studentsEnrolled}
            </div>
            <div className="text-sm text-muted">students enrolled</div>
          </div>
          <div className="text-center">
            <div className="font-display font-semibold text-2xl text-amber">
              {instructor.followers}
            </div>
            <div className="text-sm text-muted">LinkedIn followers</div>
          </div>
          <ChevronDown open={open} />
        </div>
      </button>

      {open && (
        <div className="max-w-3xl mx-auto px-6 pb-10 -mt-2">
          <p className="text-base md:text-lg text-muted leading-relaxed mb-4">
            {instructor.bio}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-mono text-sm text-amber">{instructor.tagline}</p>
            <a
              href={instructor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber underline"
            >
              View LinkedIn profile
            </a>
          </div>
        </div>
      )}
    </section>
  );
}