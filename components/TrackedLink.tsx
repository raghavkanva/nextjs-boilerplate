"use client";

import { track, metaEvent } from "@/lib/analytics";

type Params = Record<string, string | number | boolean>;

/**
 * An <a> tag that fires a GTM + Meta custom event on click.
 * Optionally also fires a Meta standard event (e.g. InitiateCheckout).
 * Usable inside both server and client components.
 */
export default function TrackedLink({
  href,
  event,
  params = {},
  metaStdEvent,
  metaStdParams = {},
  className,
  children,
  target,
  rel,
}: {
  href: string;
  event: string;
  params?: Params;
  metaStdEvent?: string;
  metaStdParams?: Params;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => {
        track(event, params);
        if (metaStdEvent) metaEvent(metaStdEvent, metaStdParams);
      }}
    >
      {children}
    </a>
  );
}
