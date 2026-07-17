import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
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
        {/* Facebook Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1385045223537164');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1385045223537164&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* TEMPORARY - Keep GA4 until GTM is verified */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-986DLXGDMD"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-986DLXGDMD');
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

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-NW77K92B" />
    </html>
  );
}