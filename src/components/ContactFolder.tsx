"use client";

import { useState } from "react";
import { site } from "@/data/site";

const SOCIALS = [
  {
    id: "email",
    label: "Email",
    sub: "melvinfernando175@gmail.com",
    href: `mailto:${site.email}`,
    bg: "#ffd177",
    fg: "#000",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect width="24" height="24" rx="4" fill="rgba(0,0,0,0.12)" />
        <path d="M4 7h16v10H4V7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "/in/melvinfernando",
    href: "https://linkedin.com/in/melvinfernando",
    bg: "#0a66c2",
    fg: "#fff",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <rect width="24" height="24" rx="3" fill="#0A66C2" />
        <path fill="white" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    sub: "/melvinfernando",
    href: "https://github.com/melvinfernando",
    bg: "#e8e8e8",
    fg: "#000",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="rgba(0,0,0,0.08)" />
        <path d="M12 3a9 9 0 00-2.85 17.54c.45.08.61-.2.61-.43v-1.5c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.97 2.62.74.08-.58.31-.97.57-1.19-1.99-.23-4.09-1-4.09-4.44 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.37 0 0 .76-.24 2.49.93a8.67 8.67 0 014.53 0c1.72-1.17 2.49-.93 2.49-.93.49 1.23.18 2.14.09 2.37.58.63.93 1.43.93 2.41 0 3.45-2.1 4.2-4.1 4.43.32.28.61.82.61 1.66v2.46c0 .24.16.52.62.43A9 9 0 0012 3z" />
      </svg>
    ),
  },
  {
    id: "spotify",
    label: "Spotify",
    sub: "Melvin175",
    href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs",
    bg: "#1db954",
    fg: "#000",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="12" fill="#1DB954" />
        <path fill="white" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.3.1-.65-.1-.75-.45-.1-.3.1-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" />
      </svg>
    ),
  },
];

/* Fan positions: arc above the folder — spread wider for bigger cards */
const FAN: { x: number; y: number; r: number }[] = [
  { x: -195, y: -165, r: -22 },
  { x:  -65, y: -205, r:  -7 },
  { x:   65, y: -205, r:   7 },
  { x:  195, y: -165, r:  22 },
];

function FolderSVG({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 110 90"
      width="140"
      height="114"
      fill="none"
      aria-hidden
    >
      {/* Folder back (darker gold) */}
      <rect x="2" y="18" width="106" height="68" rx="6" fill="#b8841a" />
      {/* Tab */}
      <path d="M 2,18 L 2,10 Q 2,6 6,6 L 40,6 Q 46,6 48,10 L 52,18 Z" fill="#b8841a" />
      {/* Folder body */}
      <rect x="2" y="18" width="106" height="68" rx="6" fill="#ffc451" />
      {/* Open flap shadow line */}
      {open && (
        <line x1="2" y1="40" x2="108" y2="40" stroke="#c99226" strokeWidth="1.5" opacity="0.5" />
      )}
      {/* Shine */}
      <rect x="2" y="18" width="106" height="16" rx="6" fill="rgba(255,255,255,0.12)" />
    </svg>
  );
}

function SocialCard({
  social,
  index,
  open,
}: {
  social: (typeof SOCIALS)[0];
  index: number;
  open: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const fan = FAN[index];
  const delay = open ? index * 60 : (SOCIALS.length - 1 - index) * 40;

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const text = social.id === "email" ? social.sub : social.href;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div
      className="absolute overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
      style={{
        width: 148,
        height: 140,
        background: social.bg,
        color: social.fg,
        left: "50%",
        top: "50%",
        transform: open
          ? `translate(calc(-50% + ${fan.x}px), calc(-50% + ${fan.y}px)) rotate(${hovered ? 0 : fan.r}deg) scale(${hovered ? 1.12 : 1})`
          : `translate(-50%, -50%) rotate(0deg) scale(1)`,
        transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms,
                     opacity 0.3s ease ${delay}ms`,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        zIndex: hovered ? 30 : 10 + index,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Closed face — large icon centered + platform name */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-250"
        style={{ opacity: hovered ? 0 : 1, transform: hovered ? "translateY(-8px)" : "translateY(0)" }}
      >
        <div style={{ opacity: 0.85 }}>
          {/* Bigger icon for closed state */}
          {social.id === "email" && (
            <svg viewBox="0 0 24 24" width="38" height="38" fill="none">
              <path d="M4 7h16v10H4V7z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {social.id === "linkedin" && (
            <svg viewBox="0 0 24 24" width="38" height="38">
              <rect width="24" height="24" rx="3" fill="#0A66C2" />
              <path fill="white" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          )}
          {social.id === "github" && (
            <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor">
              <path d="M12 3a9 9 0 00-2.85 17.54c.45.08.61-.2.61-.43v-1.5c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.97 2.62.74.08-.58.31-.97.57-1.19-1.99-.23-4.09-1-4.09-4.44 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.37 0 0 .76-.24 2.49.93a8.67 8.67 0 014.53 0c1.72-1.17 2.49-.93 2.49-.93.49 1.23.18 2.14.09 2.37.58.63.93 1.43.93 2.41 0 3.45-2.1 4.2-4.1 4.43.32.28.61.82.61 1.66v2.46c0 .24.16.52.62.43A9 9 0 0012 3z" />
            </svg>
          )}
          {social.id === "spotify" && (
            <svg viewBox="0 0 24 24" width="38" height="38">
              <circle cx="12" cy="12" r="12" fill="#1DB954" />
              <path fill="white" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.3.1-.65-.1-.75-.45-.1-.3.1-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" />
            </svg>
          )}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ opacity: 0.5 }}>
          {social.label}
        </p>
      </div>

      {/* Open face — details + actions */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-4 transition-all duration-250"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ opacity: 0.55 }}>
            {social.label}
          </p>
          {social.icon}
        </div>

        {/* Handle */}
        <p className="truncate text-[12px] font-bold leading-tight">{social.sub}</p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-bold"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            {copied ? (
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v8a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <a
            href={social.href}
            target={social.id === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-bold"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
              <path d="M6 4h6v6M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}

export function ContactFolder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Fullscreen backdrop — blur + darken when open */}
      <div
        className="fixed inset-0 transition-all duration-500"
        style={{
          zIndex: 40,
          background: open ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
          backdropFilter: open ? "blur(8px)" : "blur(0px)",
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Folder + fanned cards container — sits above backdrop */}
      <div className="relative" style={{ width: 140, height: 114, zIndex: 50 }}>
        {/* Cards sit behind folder when closed, fan out when open */}
        {SOCIALS.map((social, i) => (
          <SocialCard key={social.id} social={social} index={i} open={open} />
        ))}

        {/* Folder button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label={open ? "Close contact folder" : "Open contact folder"}
          style={{
            transform: open ? "translateY(-6px)" : "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <FolderSVG open={open} />
        </button>
      </div>

      <p
        className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300"
        style={{ zIndex: 50, position: "relative" }}
      >
        {open ? "Pick a platform" : "Get in touch"}
      </p>
    </div>
  );
}
