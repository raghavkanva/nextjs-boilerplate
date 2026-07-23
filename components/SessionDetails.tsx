import { sessionDetails } from "@/data/content";

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 20a6 6 0 0112 0M16 8a3 3 0 110 6M21 20a6 6 0 00-6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const icons = [CalendarIcon, ClockIcon, PlayCircleIcon, AlertIcon, GroupIcon];

export default function SessionDetails() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10 md:py-12">
      <div className="rounded-2xl border border-amber bg-surface p-6 md:p-8 glow-amber-soft">
        <h2 className="font-display font-bold text-2xl text-text text-center mb-6">
          Session Details
        </h2>
        <div className="flex flex-col divide-y divide-line">
          {sessionDetails.map((detail, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="flex items-start gap-3 py-3.5">
                <Icon />
                <div>
                  <p className="text-sm font-semibold text-muted uppercase tracking-wide">
                    {detail.label}
                  </p>
                  <p className="text-base text-text mt-0.5">{detail.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}