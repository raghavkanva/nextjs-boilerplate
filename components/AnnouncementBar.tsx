import { announcements } from "@/data/content";

export default function AnnouncementBar() {
  const items = [...announcements, ...announcements];

  return (
    <div className="w-full bg-text text-white overflow-hidden py-2.5" aria-label="Announcements">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 shrink-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cta shrink-0" />
            {item.href ? (
              <a href={item.href} className="text-sm font-medium hover:text-cta transition-colors">
                {item.text}
              </a>
            ) : (
              <span className="text-sm font-medium">{item.text}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
