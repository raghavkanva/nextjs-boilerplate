import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildCourseSchema,
  buildFaqSchema,
} from "@/lib/schema";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
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
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body bg-bg text-text antialiased`}
      >
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
