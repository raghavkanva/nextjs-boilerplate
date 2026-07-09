import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mutedDim">
        <a href="/privacy-policy" className="hover:text-amber transition-colors">
          Privacy Policy
        </a>
        <span className="text-line">·</span>
        <a
          href={site.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber transition-colors"
        >
          WhatsApp Support
        </a>
        <span className="text-line">·</span>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber transition-colors"
        >
          Instructor LinkedIn
        </a>
      </div>
    </footer>
  );
}
