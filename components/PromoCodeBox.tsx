"use client";

import { useState } from "react";

export default function PromoCodeBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail in some browsers, code is still visible to copy manually
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full max-w-sm mx-auto flex items-center justify-between gap-4 rounded-lg border-2 border-dashed border-amber bg-amber/10 px-6 py-4 mb-2"
    >
      <span className="font-mono font-semibold text-xl md:text-2xl text-amber tracking-wide">
        {code}
      </span>
      <span className="text-sm font-medium text-amber shrink-0">
        {copied ? "Copied" : "Tap to copy"}
      </span>
    </button>
  );
}
