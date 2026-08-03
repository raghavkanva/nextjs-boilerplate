"use client";

import { useState } from "react";

type Topic = { number: string; question: string; body: string };

export default function TopicsAccordion({ topics }: { topics: Topic[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {topics.map((topic, i) => (
        <div key={topic.number} className="rounded-xl border-2 border-[#111827] bg-white overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center gap-4 px-5 py-4 text-left"
          >
            <span
              className="font-extrabold text-4xl text-[#E5E7EB] shrink-0 leading-none w-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {topic.number}
            </span>
            <span className="font-bold text-[#111827] text-base md:text-lg flex-1 leading-snug">
              {topic.question}
            </span>
            <span className="text-[#16A34A] text-2xl shrink-0 font-bold">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <p className="px-5 pb-5 text-[#4B5563] text-base md:text-lg leading-relaxed border-t border-[#E5E7EB] pt-4 mx-5 mb-1">
              {topic.body}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
