import type { Metadata } from "next";
import Script from "next/script";
import {
  Fredoka,
  IBM_Plex_Mono,
  Inter,
  Sora,
} from "next/font/google";

import "./globals.css";

import {
  buildOrganizationSchema,
  buildPersonSchema,
} from "@/lib/schema";

import SiteHeader from "@/components/SiteHeader";
import { PromotionSliderProvider } from "@/components/PromotionSliderContext";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["500", "600", "700"],
  display: "swap",
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization and Person are globally relevant across all routes.
  // Page-specific Course, FAQ, and BreadcrumbList schemas are injected by each route's own layout.
  const schemas = [
    buildOrganizationSchema(),
    buildPersonSchema(),
  ];

  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${sora.variable} ${inter.variable} ${plexMono.variable} font-body bg-bg text-text antialiased`}
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
            title="Google Tag Manager"
          />
        </noscript>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1385045223537164&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NW77K92B');
          `}
        </Script>

        {/* Meta Pixel stub — runs before hydration so fbq() is available when useEffect fires */}
        <Script id="meta-pixel-stub" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {
              if(f.fbq)return;

              n=f.fbq=function(){
                n.callMethod
                  ? n.callMethod.apply(n,arguments)
                  : n.queue.push(arguments)
              };

              if(!f._fbq)f._fbq=n;

              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1385045223537164');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel actual fbevents.js load — deferred, stub above handles queueing */}
        <Script id="meta-pixel-load" strategy="afterInteractive">
          {`
            (function(){
              var t=document.createElement('script');
              t.async=true;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              var s=document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(t,s);
            })();
          `}
        </Script>

        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        <PromotionSliderProvider>
          <SiteHeader />
          {children}
        </PromotionSliderProvider>
      </body>
    </html>
  );
}