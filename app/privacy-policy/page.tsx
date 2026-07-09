import { site } from "@/data/content";

export const metadata = {
  title: "Privacy Policy, eTalVis",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display font-semibold text-3xl text-text mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-mutedDim mb-10">Last updated: July 2026</p>

      <div className="flex flex-col gap-8 text-muted leading-relaxed text-base">
        <p>
          This Privacy Policy explains how eTalVis ("we," "us," "our")
          collects, uses, and protects information when you visit
          etalvis.com and its subdomains, including courses.etalvis.com
          (together, the "Site").
        </p>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-2 font-medium text-text">
            Information you provide directly:
          </p>
          <ul className="list-disc list-inside mb-4 flex flex-col gap-1">
            <li>
              Name, email address, and phone number when you enroll in a
              course, contact us, or reach out via WhatsApp
            </li>
            <li>
              Payment information when you make a purchase, processed
              entirely by our payment partner, Tagmango. We do not store
              your card or payment details ourselves.
            </li>
          </ul>
          <p className="mb-2 font-medium text-text">
            Information collected automatically:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-1">
            <li>
              Usage data such as pages visited, time spent on the Site, and
              referral source, collected through Google Analytics (GA4)
            </li>
            <li>
              Advertising and interaction data collected through the Meta
              Pixel, used to measure ad performance and show relevant ads on
              Meta platforms (Facebook and Instagram)
            </li>
            <li>
              Device and browser information (IP address, browser type,
              operating system)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-1">
            <li>Process course enrollments and payments</li>
            <li>Provide customer support, including doubt clearing over WhatsApp</li>
            <li>Send you course-related updates and communication</li>
            <li>Measure and improve our advertising campaigns</li>
            <li>Understand how visitors use the Site so we can improve it</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            3. Third-Party Services
          </h2>
          <p className="mb-3">
            We work with the following third parties, each of which has its
            own privacy practices:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-1 mb-3">
            <li>Tagmango, handles course checkout and payment processing</li>
            <li>Google Analytics (GA4), website usage analytics</li>
            <li>
              Meta (Facebook and Instagram) Pixel, advertising measurement
              and retargeting
            </li>
            <li>
              WhatsApp, used for direct doubt clearing support. Messages
              sent to our WhatsApp number are subject to WhatsApp's own
              privacy policy.
            </li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            4. Cookies
          </h2>
          <p>
            The Site uses cookies and similar tracking technologies (via
            Google Analytics and Meta Pixel) to understand visitor behavior
            and measure advertising effectiveness. You can control or
            disable cookies through your browser settings, though this may
            affect Site functionality.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            5. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your information, but no
            method of transmission or storage over the internet is
            completely secure. Payment information is handled directly by
            Tagmango's secure payment infrastructure and is not stored on
            our servers.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-1 mb-3">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction or deletion of your information</li>
            <li>Opt out of promotional communications at any time</li>
          </ul>
          <p>To exercise these rights, contact us using the details below.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            7. Children's Privacy
          </h2>
          <p>
            Our courses are intended for engineering students and
            professionals. The Site is not directed at children, and we do
            not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes
            will be posted on this page with an updated "Last updated"
            date.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-text mb-3">
            9. Contact Us
          </h2>
          <p className="mb-2">
            If you have questions about this Privacy Policy or how your
            information is handled, contact us at:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-1">
            <li>WhatsApp: {site.whatsapp}</li>
            <li>Website: https://etalvis.com</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
