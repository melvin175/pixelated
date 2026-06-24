"use client";

import { site } from "@/data/site";
import { LiveClock } from "./LiveClock";

export function Hero() {
  return (
    <section className="hero-split ">
      <div className="hero-left">
        {/* M175 monogram */}
        <div className="mb-6 self-start">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-[#1a1610]">
            <div className="flex flex-col items-center leading-none">
              <span
                className="font-display text-[1.45rem] font-normal uppercase tracking-tight text-brand-yellow"
                style={{ letterSpacing: "-0.02em" }}
              >
                M
              </span>
              <span className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-brand-yellow/60">
                175
              </span>
            </div>
            {/* Thin outer ring for depth */}
            <div className="pointer-events-none absolute inset-[-5px] rounded-full border border-black/20" />
          </div>
        </div>

        <div className="hero-names">
          <p className="label mb-3 tracking-[0.22em] text-black/50">
            Developer&nbsp;·&nbsp;Artist&nbsp;·&nbsp;Athlete
          </p>
          <div className="hero-name-row">
            <h1 className="hero-name hero-name--first">{site.name.first}</h1>
            <p className="hero-tagline">{site.tagline}</p>
          </div>
          <h1 className="hero-name hero-name--last">{site.name.last}</h1>
        </div>

        <div className="hero-meta">
          <span className="label">{site.location}</span>
          <LiveClock layout="row" />
        </div>
      </div>

      <div className="hero-photo" role="img" aria-label="Portrait" />
    </section>
  );
}



