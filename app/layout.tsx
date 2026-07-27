import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildCourseSchema,
  buildFaqSchema,
} from "@/lib/schema";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Embedded Systems Foundation Courses, eTalVis",
  description:
    "10 foundation courses in electronics, C programming, and embedded systems, taught by Balajee Seshadri, 40+ years in the Electronics Industry. Pre-recorded, watch anytime, doubts cleared over WhatsApp.",
  metadataBase: new URL("https://courses.etalvis.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    buildOrganizationSchema(),
    buildPersonSchema(),
    buildCourseSchema(),
    buildFaqSchema(),
  ];

  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${plexMono.variable} font-body bg-bg text-text antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NW77K92B"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NW77K92B');
          `}
        </Script>

        {/* Structured Data */}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        {children}
      </body>
    </html>
  );
}