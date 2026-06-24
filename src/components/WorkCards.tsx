"use client";

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
    <svg viewBox="0 0 120 140" width="80" height="93" fill="none" aria-hidden>
      {/* Bold lightning bolt */}
      <polygon
        points="72,6 36,72 58,72 36,134 96,62 70,62 96,6"
        fill="black"
      />
    </svg>
  );
}

function ZoopMark() {
  return (
    <div
      aria-hidden
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
    <svg viewBox="0 0 120 120" width="90" height="90" fill="none" aria-hidden>
      {/* 4-pointed star */}
      <path
        d="M60,6 L68,52 L114,60 L68,68 L60,114 L52,68 L6,60 L52,52 Z"
        fill="black"
      />
      {/* Inner glow layer */}
      <path
        d="M60,28 L65,52 L88,60 L65,68 L60,92 L55,68 L32,60 L55,52 Z"
        fill="#ffd177"
        opacity="0.7"
      />
      {/* Center dot */}
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
  const inner = (
    <div className="work-card group relative flex min-h-[260px] flex-col justify-between rounded-2xl bg-off-yellow p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] md:min-h-[280px] md:p-8">
      {/* Top-right: role + company */}
      <div className="flex justify-end">
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
      <div className="flex flex-1 items-center justify-start py-4 pl-2">
        {card.mark}
      </div>

      {/* Bottom-left: period + link hint */}
      <div className="flex items-end justify-between">
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
      <a href={card.href} target="_blank" rel="noopener noreferrer">
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
