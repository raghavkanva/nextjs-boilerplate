"use client";

import Image from "next/image";
import { site } from "@/data/content";

export default function Footer() {
  const trackWhatsapp = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", { location: "footer" });
    }
  };

  return (
    <footer className="border-t border-line bg-surface py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Image src="/images/icon.png" alt="eTalVis" width={40} height={40} className="h-10 w-auto" />
            <span className="font-display font-bold text-xl text-text">eTalVis</span>
          </div>
          <p className="text-sm text-muted text-center max-w-sm">
            {site.brandTagline}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsapp}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-amber transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-amber">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Support
            </a>
            <span className="text-line">·</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-amber transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-amber">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Instructor LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-line pt-6 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted">
            <a href="/" className="hover:text-amber transition-colors">eTalVis Home</a>
            <span className="text-line">·</span>
            <a href="/#plans" className="hover:text-amber transition-colors">All Plans</a>
            <span className="text-line">·</span>
            <a href="/privacy-policy" className="hover:text-amber transition-colors">Privacy Policy</a>
          </nav>
          <p className="text-xs text-muted/70 text-center">
            &copy; {new Date().getFullYear()} eTalVis. All rights reserved.
          </p>
          <p className="text-xs text-muted/60 text-center">
            Landing page, SEO and AI Discoverability by Raghav Kanva
          </p>
        </div>
      </div>
    </footer>
  );
}
