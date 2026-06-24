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
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "/in/melvinfernando",
    href: "https://linkedin.com/in/melvinfernando",
    bg: "#0a66c2",
    fg: "#fff",
  },
  {
    id: "github",
    label: "GitHub",
    sub: "/melvinfernando",
    href: "https://github.com/melvinfernando",
    bg: "#e8e8e8",
    fg: "#000",
  },
  {
    id: "spotify",
    label: "Spotify",
    sub: "Melvin175",
    href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs",
    bg: "#1db954",
    fg: "#000",
  },
];

/* Fan positions: arc above the folder */
const FAN: { x: number; y: number; r: number }[] = [
  { x: -165, y: -150, r: -22 },
  { x:  -55, y: -185, r:  -7 },
  { x:   55, y: -185, r:   7 },
  { x:  165, y: -150, r:  22 },
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
  const fan = FAN[index];
  const delay = open ? index * 60 : (SOCIALS.length - 1 - index) * 40;

  return (
    <a
      href={social.href}
      target={social.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="absolute flex flex-col justify-between overflow-hidden rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      style={{
        width: 120,
        height: 96,
        background: social.bg,
        color: social.fg,
        left: "50%",
        top: "50%",
        /* Start at folder center, animate to fan position */
        transform: open
          ? `translate(calc(-50% + ${fan.x}px), calc(-50% + ${fan.y}px)) rotate(${fan.r}deg)`
          : `translate(-50%, -50%) rotate(0deg)`,
        transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms,
                     opacity 0.3s ease ${delay}ms`,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        zIndex: 10 + index,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className="text-[9px] font-bold uppercase tracking-[0.2em]"
        style={{ opacity: 0.6 }}
      >
        {social.label}
      </p>
      <p className="truncate text-[12px] font-bold leading-tight">{social.sub}</p>
      <span className="self-end text-xs font-bold opacity-50">↗</span>
    </a>
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
