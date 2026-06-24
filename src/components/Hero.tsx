"use client";

import { site } from "@/data/site";
import { LiveClock } from "./LiveClock";

export function Hero() {
  return (
    <section className="hero-split">
      <div className="hero-left">
        <div>
          <Monogram />
        </div>

        <div className="hero-names">
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

function Monogram() {
  return (
    <div className="hero-monogram">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        aria-label="MF monogram"
      >
        <line x1="4" y1="8" x2="4" y2="30" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="4" y1="8" x2="13" y2="22" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="13" y1="22" x2="22" y2="8" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="22" y1="8" x2="22" y2="30" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="27" y1="8" x2="27" y2="30" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="27" y1="8" x2="35" y2="8" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="27" y1="19" x2="33" y2="19" stroke="#ffd177" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
