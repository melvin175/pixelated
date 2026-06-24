"use client";

import { useEffect, useState } from "react";

type Release = {
  id: string;
  title: string;
  type: string;
  year: string;
  imageUrl: string | null;
  href: string;
};

/* Per-release descriptions + gradient fallback colours */
const RELEASE_META: Record<string, { description: string; gradient: [string, string] }> = {
  SERVED: {
    description: "Debut EP — raw energy and unfiltered expression, served straight.",
    gradient: ["#e74c3c", "#c0392b"],
  },
  "Fill The Plate": {
    description: "Hustle anthem. About hunger, drive, and never leaving empty-handed.",
    gradient: ["#f39c12", "#e67e22"],
  },
  "SOS Freestyle": {
    description: "Uncut, urgent, straight from the mind to the mic.",
    gradient: ["#0984e3", "#74b9ff"],
  },
  "Searching For Hope": {
    description: "A full-length reflective journey through doubt, resilience, and light.",
    gradient: ["#8e44ad", "#6c3483"],
  },
  "Starting To See Through": {
    description: "Clarity cutting through the noise — seeing things as they really are.",
    gradient: ["#27ae60", "#1e8449"],
  },
  Climb: {
    description: "The relentless pursuit. One step, then another. Keep climbing.",
    gradient: ["#e67e22", "#d35400"],
  },
  Paralyzed: {
    description: "Still but aware — the tension of knowing and not moving.",
    gradient: ["#636e72", "#2d3436"],
  },
  "Push Myself To Live": {
    description: "Finding the will to push through when everything feels heavy.",
    gradient: ["#6c5ce7", "#a29bfe"],
  },
};

const DEFAULT_META = {
  description: "A release from Melvin175.",
  gradient: ["#2d3436", "#636e72"] as [string, string],
};

/* Curated set of releases to feature (in display order).
   Add "Fill The Plate" here if you want to extend the row. */
const FEATURED_TITLES = [
  "SERVED",
  "Starting To See Through",
  "Push Myself To Live",
  "SOS Freestyle",
];

function curateReleases(releases: Release[]): Release[] {
  return FEATURED_TITLES.map((title) =>
    releases.find((release) => release.title === title),
  ).filter((release): release is Release => Boolean(release));
}

/* Fallback releases shown when Spotify API isn't configured */
const FALLBACK_RELEASES: Release[] = [
  { id: "served", title: "SERVED", type: "EP", year: "2025", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "fill-the-plate", title: "Fill The Plate", type: "Single", year: "2025", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "sos-freestyle", title: "SOS Freestyle", type: "Single", year: "2025", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "searching-for-hope", title: "Searching For Hope", type: "Album", year: "2024", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "starting-to-see-through", title: "Starting To See Through", type: "EP", year: "2024", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "climb", title: "Climb", type: "Single", year: "2024", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "paralyzed", title: "Paralyzed", type: "Single", year: "2024", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
  { id: "push-myself", title: "Push Myself To Live", type: "Single", year: "2024", imageUrl: null, href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
];

function Disc({ imageUrl, gradient }: { imageUrl: string | null; gradient: [string, string] }) {
  return (
    <div className="relative aspect-square w-full">
      {/* Outer vinyl body */}
      <div className="absolute inset-0 rounded-full bg-[#1c1c1c] shadow-xl" />
      {/* Vinyl grooves */}
      {[0.88, 0.74, 0.60].map((s) => (
        <div
          key={s}
          className="absolute rounded-full border border-white/[0.05]"
          style={{ inset: `${(1 - s) * 50}%` }}
        />
      ))}
      {/* Album art / gradient label */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "20%",
          ...(imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: `radial-gradient(circle at 40% 35%, ${gradient[0]}, ${gradient[1]})`,
              }),
        }}
      />
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: "20%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
        }}
      />
      {/* Center hole */}
      <div className="absolute left-1/2 top-1/2 h-[8%] w-[8%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1 ring-white/20" />
    </div>
  );
}

function MarqueePhrase({ phrase, index }: { phrase: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(90);

  return (
    <span
      key={index}
      className="font-display shrink-0 cursor-default px-10 font-black uppercase leading-none"
      style={{
        fontSize: "clamp(3.5rem, 9vw, 8rem)",
        ...(hovered
          ? {
              background: `linear-gradient(${angle}deg, #ffd177, #ffc09f, #ffe5b4, #a8c5e8, #ffb347, #ffd8b1, #a8c5e8, #ffc09f, #ffd177)`,
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "fluid-gradient 5s linear infinite",
            }
          : {
              color: "rgba(255,255,255,0.70)",
              WebkitTextFillColor: "rgba(255,255,255,0.70)",
            }),
      }}
      onMouseEnter={() => { setAngle(Math.floor(Math.random() * 360)); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {phrase}
    </span>
  );
}

function MarqueeStatement() {
  const phrases = ["I move.", "I make.", "I listen."];

  return (
    <div className="overflow-hidden border-t border-white/10 py-5">
      <style>{`
        @keyframes fluid-gradient {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        .statement-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
          will-change: transform;
          width: max-content;
        }
      `}</style>
      <div className="statement-track">
        {Array.from({ length: 3 }, (_, gi) =>
          phrases.map((phrase, pi) => (
            <MarqueePhrase key={`${gi}-${pi}`} phrase={phrase} index={gi * 3 + pi} />
          ))
        )}
      </div>
    </div>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const meta = RELEASE_META[release.title] ?? DEFAULT_META;

  return (
    <a
      href={release.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#111] p-4 transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Spinning disc */}
      <div className="disc-spin mb-4 w-full">
        <Disc imageUrl={release.imageUrl} gradient={meta.gradient} />
      </div>

      {/* Release info */}
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-bold text-white">{release.title}</p>
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
          {release.type}
        </span>
      </div>
      <p className="mb-2 mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
        {release.year}
      </p>
      <p className="text-[11px] leading-relaxed text-white/50">{meta.description}</p>
    </a>
  );
}

export function OriginalMusicSection() {
  const [releases, setReleases] = useState<Release[]>(
    curateReleases(FALLBACK_RELEASES),
  );

  useEffect(() => {
    fetch("/api/spotify/releases")
      .then((r) => r.json())
      .then((data) => {
        if (data.configured && data.releases.length > 0) {
          const curated = curateReleases(data.releases);
          if (curated.length > 0) {
            setReleases(curated);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="border-t border-black bg-[#0d0d0d]">
      <div className="site-container-wide section-padding">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-white">
            I also go by M7VN
          </h2>
          <a
            href="https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#1db954" />
              <path d="M7 15.5c3-1.8 7-2 10-0.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6.5 12c3.5-2 8.5-2.2 12-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 8.5c4-2.2 10-2.4 14-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            M7VN on Spotify
          </a>
        </div>

        {/* Artist bio */}
        <p className="mb-12 max-w-2xl text-[15px] leading-[1.75] text-white/50">
          An emerging artist from India, inspired by a diverse range of musical
          influences that ignited a passion for creating his own sound. What began as a
          passion for production grew into a full exploration of songwriting, mixing,
          mastering. His work reflects a personal journey of growth and ambition, with the
          ultimate goal of crafting music that resonates deeply, striving to create the
          best sound he&rsquo;s ever heard.
        </p>

        {/* Release grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </div>

      {/* Statement marquee — below albums */}
      <MarqueeStatement />
    </section>
  );
}
