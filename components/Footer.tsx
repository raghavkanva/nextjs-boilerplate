"use client";

import Image from "next/image";
import { site } from "@/data/content";
import { track } from "@/lib/analytics";

const STARTER_URL = "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26";
const SEMESTER_URL = "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0A3D1F]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">

          {/* Brand */}
          <div>
            <a
              href="https://etalvis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5"
            >
              <Image
                src="/images/icon.png"
                alt="eTalVis"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                eTalVis
              </span>
            </a>
            <p className="mt-3 text-sm leading-6 text-white/60">
              {site.brandTagline}
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "footer" })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +91 9790873099
              </a>
              <a
                href="mailto:info@etalvis.com"
                onClick={() => track("email_click", { location: "footer" })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                info@etalvis.com
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Instructor on LinkedIn
              </a>
            </div>
          </div>

          {/* Bundle Plans */}
          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#FFC400]">
              Bundle Plans
            </h3>
            <p className="mt-0.5 text-[10px] text-white/40">All 10 courses included</p>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={STARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 transition hover:border-white/20 hover:bg-white/10"
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/80">Starter · 1 Month</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-base font-black text-white">₹639</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={SEMESTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-[#FFC400]/30 bg-[#FFC400]/10 px-3.5 py-3 transition hover:border-[#FFC400]/50 hover:bg-[#FFC400]/15"
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFC400]">Semester · 6 Months</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-base font-black text-white">₹2,559</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-white/40">Includes mock interview</p>
                </a>
              </li>
              <li>
                <a
                  href="/individual-courses"
                  className="text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  Browse individual courses &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-7 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/40 sm:justify-start">
            <a href="https://etalvis.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">eTalVis Main Website</a>
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/courses" className="transition hover:text-white">Courses</a>
            <a href="/embedded-systems#plans" className="transition hover:text-white">Plans</a>
            <a href="/individual-courses" className="transition hover:text-white">Individual Courses</a>
            <a href="/workshop" className="transition hover:text-white">Workshops</a>
            <a href="/career-guidance" className="transition hover:text-white">Career Guidance</a>
            <a href="/privacy-policy" className="transition hover:text-white">Privacy Policy</a>
          </nav>
          <div className="text-center text-xs text-white/35 sm:text-right">
            <p>© {new Date().getFullYear()} eTalVis. All rights reserved.</p>
            <p className="mt-0.5">
              Built by{" "}
              <a href="https://www.linkedin.com/in/raghavkanva/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/80 hover:text-white transition">
                Raghav Kanva
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
