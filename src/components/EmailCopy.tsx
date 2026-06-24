"use client";

import { useState } from "react";

type EmailCopyProps = {
  email: string;
};

export function EmailCopy({ email }: EmailCopyProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-off-black shadow-lg transition-transform hover:scale-110 active:scale-95 md:h-16 md:w-16"
    >
      {copied ? (
        /* Checkmark */
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-brand-yellow"
          aria-hidden
        >
          <path
            d="M4 10l5 5 7-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* Envelope */
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-brand-yellow"
          aria-hidden
        >
          <rect
            x="2"
            y="4"
            width="16"
            height="12"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M2 6l8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
