"use client";

import { useState } from "react";

export default function CopyCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy code"
      className={`inline-flex items-center gap-1.5 font-mono font-black transition ${className ?? ""}`}
    >
      <span>{code}</span>
      <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded" aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="white" />
          </svg>
        )}
      </span>
      {copied && <span className="sr-only">Copied!</span>}
    </button>
  );
}
