function PlayCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 10l6-3v10l-6-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber shrink-0">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhatYouGet() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 md:py-12">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text text-center mb-10">
        Everything Included When You Register
      </h2>

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-line bg-surface p-6 flex items-start gap-4">
          <PlayCircleIcon />
          <div>
            <h3 className="font-display font-semibold text-lg text-text mb-1">
              Live Session Access
            </h3>
            <p className="text-muted leading-relaxed">
              Full live session on July 26, direct access to Balajee sir's
              industry insights and myth-busting content, plus live Q&A to
              ask your own questions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 flex items-start gap-4">
          <VideoIcon />
          <div>
            <h3 className="font-display font-semibold text-lg text-text mb-1">
              Recorded Video Access
            </h3>
            <p className="text-muted leading-relaxed">
              Can't attend live, or want to revisit it? Get the full recorded
              session from July 27, 2026, available for one month.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-amber bg-amber/5 p-6 md:p-7 glow-amber-soft">
          <div className="flex items-start gap-4 mb-4">
            <BookIcon />
            <div>
              <h3 className="font-display font-bold text-xl text-amber mb-1">
                Free Starter Plan, Worth Rs. 999
              </h3>
              <p className="text-muted leading-relaxed">
                Normally Rs. 999 for one month of access. Given free, one
                month, no extra payment, just for registering.
              </p>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-muted pl-9">
            <li>• All 10 Electronics Foundation courses</li>
            <li>• Pre-recorded, watch anytime</li>
            <li>• Learn at your own pace</li>
            <li>• Practice exercises included</li>
          </ul>
        </div>
      </div>

      <p className="text-center font-display font-semibold text-lg text-text mt-8">
        That's Rs. 999 worth of course access, included, when you register
        for Rs. 99.
      </p>
    </section>
  );
}