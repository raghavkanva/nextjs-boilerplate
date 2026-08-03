import { announcements } from "@/data/content";

export default function AnnouncementBar() {
  return (
    <div className="relative w-full overflow-hidden" aria-label="Announcements" style={{ backgroundColor: "#0A3D1F" }}>
      <div
        className="flex overflow-x-auto scrollbar-hide gap-0 py-2.5"
        style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
      >
        {announcements.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 shrink-0 whitespace-nowrap"
            style={{ scrollSnapAlign: "start" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#FFC400" }} />
            {item.href ? (
              <a href={item.href} className="text-sm font-medium text-white hover:text-[#FFC400] transition-colors">
                {item.text}
              </a>
            ) : (
              <span className="text-sm font-medium text-white">{item.text}</span>
            )}
          </span>
        ))}
        <span className="inline-block w-8 shrink-0" aria-hidden="true" />
      </div>
      {/* Right fade — hints there is more content to scroll */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-12"
        style={{ background: "linear-gradient(to right, transparent, #0A3D1F)" }}
      />
    </div>
  );
}
