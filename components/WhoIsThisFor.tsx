import { whoIsThisFor } from "@/data/content";

const icons: JSX.Element[] = [
  // College Students, graduation cap
  <path
    key="0"
    d="M12 3L2 8l10 5 10-5-10-5zM6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Final-Year Students, checkered flag / finish
  <path
    key="1"
    d="M6 3v18M6 4h5l-1.5 2.5L11 9H6M6 13h5l-1.5 2.5L11 18H6"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Recent Graduates, badge
  <path
    key="2"
    d="M12 15a5 5 0 100-10 5 5 0 000 10zM8.5 14l-2 7 5.5-3 5.5 3-2-7"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Actively Job-Searching, briefcase
  <path
    key="3"
    d="M4 8h16v11H4V8zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M4 13h16"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Higher Secondary Students, book
  <path
    key="4"
    d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 001.5-1.5v-13z"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Just Finished Schooling, door/exit
  <path
    key="5"
    d="M15 3H6a1 1 0 00-1 1v16a1 1 0 001 1h9M15 3v18M15 3l5 2v14l-5 2M11 12h.01"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // Career switch, swap arrows
  <path
    key="6"
    d="M4 7h13l-3-3M20 17H7l3 3"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
];

export default function WhoIsThisFor() {
  return (
    <section className="bg-bg py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-text text-center mb-4">
          Who Is <span className="text-amber">This For?</span>
        </h2>
        <div className="w-16 h-1 bg-amber rounded-full mx-auto mb-6" />
        <p className="text-lg md:text-xl text-muted text-center mb-12">
          This is for you if you're a:
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {whoIsThisFor.map((segment, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-line bg-surface px-6 py-5"
            >
              <span className="shrink-0 w-12 h-12 rounded-full bg-amber/15 flex items-center justify-center text-amber">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {icons[i]}
                </svg>
              </span>
              <div>
                <span className="font-display font-semibold text-lg md:text-xl text-text leading-snug">
                  {segment.title}
                </span>
                {segment.line && (
                  <p className="text-base text-muted leading-relaxed mt-1.5">
                    {segment.line}
                  </p>
                )}
                {segment.note && (
                  <p className="text-sm text-muted/80 italic leading-relaxed mt-1.5">
                    {segment.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
