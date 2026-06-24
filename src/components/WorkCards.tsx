"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

type CardData = {
  id: string;
  role: string;
  company: string;
  period: string;
  href?: string;
  mark: ReactNode;
};

/* ── Company marks ── */

function ZoopEnergyMark() {
  return (
    <svg
      viewBox="0 0 120 140"
      width="80"
      height="93"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_12px_rgba(0,0,0,0.25))]"
      style={{ transformOrigin: "center" }}
    >
      <polygon
        points="72,6 36,72 58,72 36,134 96,62 70,62 96,6"
        fill="black"
        className="transition-all duration-300 group-hover:fill-[#1a1610]"
      />
    </svg>
  );
}

function ZoopMark() {
  return (
    <div
      aria-hidden
      className="transition-all duration-500 group-hover:tracking-widest group-hover:opacity-80"
      style={{
        fontFamily: "var(--font-display), Impact, sans-serif",
        fontSize: "clamp(3rem, 5vw, 5rem)",
        fontWeight: 400,
        letterSpacing: "0.01em",
        lineHeight: 1,
        color: "black",
        textTransform: "uppercase",
        userSelect: "none",
      }}
    >
      ZOOP
    </div>
  );
}

function CreatorAIMark() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="90"
      height="90"
      fill="none"
      aria-hidden
      className="transition-transform duration-700 group-hover:rotate-[30deg]"
      style={{ transformOrigin: "center" }}
    >
      <path
        d="M60,6 L68,52 L114,60 L68,68 L60,114 L52,68 L6,60 L52,52 Z"
        fill="black"
      />
      <path
        d="M60,28 L65,52 L88,60 L65,68 L60,92 L55,68 L32,60 L55,52 Z"
        fill="#ffd177"
        className="transition-opacity duration-300 group-hover:opacity-100"
        opacity="0.7"
      />
      <circle cx="60" cy="60" r="5" fill="black" />
    </svg>
  );
}

/* ── Card data ── */
const cards: CardData[] = [
  {
    id: "zoop-energy",
    role: "Software Development Engineer II",
    company: "Zoop Energy",
    period: "2025 – Present",
    mark: <ZoopEnergyMark />,
  },
  {
    id: "zoopsign",
    role: "Software Development Engineer I",
    company: "ZoopSign",
    period: "2022 – 2025",
    mark: <ZoopMark />,
  },
  {
    id: "creator-ai",
    role: "Personal Project",
    company: "Creator AI",
    period: "2026",
    href: "https://creator-ai-psi.vercel.app/",
    mark: <CreatorAIMark />,
  },
];

/* ── Single card ── */
function WorkCard({ card }: { card: CardData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTilt({ rx: (y - 0.5) * -10, ry: (x - 0.5) * 10 });
    setGlow({ x: x * 100, y: y * 100 });
  }

  function onMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
    setGlow({ x: 50, y: 50 });
  }

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-off-yellow p-7 md:min-h-[280px] md:p-8"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.rx === 0 ? "transform 0.5s ease, box-shadow 0.5s ease" : "transform 0.1s ease",
        boxShadow: tilt.rx !== 0
          ? "0 20px 60px rgba(0,0,0,0.18)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(120,75,0,0.32) 0%, rgba(120,75,0,0.12) 30%, transparent 55%)`,
        }}
      />

      {/* Top-right: role + company */}
      <div className="relative flex justify-end">
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.15em] text-black">
            {card.role}
          </p>
          <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.15em] text-black/50">
            @ {card.company}
          </p>
        </div>
      </div>

      {/* Center: company mark */}
      <div className="relative flex flex-1 items-center justify-start py-4 pl-2">
        {card.mark}
      </div>

      {/* Bottom-left: period + link hint */}
      <div className="relative flex items-end justify-between">
        <p className="text-sm text-black/45">{card.period}</p>
        {card.href && (
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 transition-colors group-hover:text-black">
            Visit ↗
          </span>
        )}
      </div>
    </div>
  );

  if (card.href) {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

/* ── Grid ── */
export function WorkCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
      {cards.map((card) => (
        <WorkCard key={card.id} card={card} />
      ))}
    </div>
  );
}
