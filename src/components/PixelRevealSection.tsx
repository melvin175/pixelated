"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const COLS = 14;
const ROWS = 14;

type Release = {
  title: string;
  type: string;
  year: string;
  imageUrl: string | null;
  href: string;
};

function PixelReveal({ src }: { src: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Pre-compute so values are stable across renders
  const cells = useMemo(() =>
    Array.from({ length: ROWS * COLS }, (_, i) => ({
      row: Math.floor(i / COLS),
      col: i % COLS,
      offsetX: (Math.random() - 0.5) * 500,
      offsetY: (Math.random() - 0.5) * 500,
      delay: Math.random() * 1.1,
    })),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        aspectRatio: "1",
        width: "100%",
      }}
    >
      {cells.map(({ row, col, offsetX, offsetY, delay }) => (
        <div
          key={`${row}-${col}`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
            transform: triggered
              ? "translate(0,0) scale(1)"
              : `translate(${offsetX}px,${offsetY}px) scale(0.3)`,
            opacity: triggered ? 1 : 0,
            transition: triggered
              ? `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.6s ease ${delay * 0.5}s`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export function PixelRevealSection() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    fetch("/api/spotify/releases")
      .then((r) => r.json())
      .then((data) => {
        if (data.configured && data.releases?.length > 0) {
          setRelease(data.releases[0]);
        }
      })
      .catch(() => {});
  }, []);

  if (!release?.imageUrl) return null;

  return (
    <section className="border-t border-black bg-[#0d0d0d]">
      <div className="site-container-wide py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pixel reveal */}
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <PixelReveal src={release.imageUrl} />
          </div>

          {/* Info */}
          <div>
            <p className="label mb-4 text-brand-yellow/50">Latest release</p>
            <h3
              className="font-display font-black uppercase leading-none text-white"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              {release.title}
            </h3>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              {release.type} · {release.year}
            </p>

            <a
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-yellow px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#1db954" />
                <path d="M7 15.5c3-1.8 7-2 10-0.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.5 12c3.5-2 8.5-2.2 12-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 8.5c4-2.2 10-2.4 14-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Listen on Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
