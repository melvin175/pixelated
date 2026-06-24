"use client";

import { useRef } from "react";
import { playlists } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

/* Unique gradient artwork per playlist */
const artworkGradients: Record<string, [string, string, string?]> = {
  "Chinese New Year":   ["#c0392b", "#e67e22", "#f39c12"],
  "All-time favorites": ["#8e44ad", "#3498db", "#1abc9c"],
  "Soundtrack mode":    ["#f39c12", "#e74c3c", "#8e44ad"],
  "Love Vibin'":        ["#e84393", "#fd79a8", "#6c5ce7"],
  "Work tunes":         ["#00b894", "#00cec9", "#0984e3"],
  "In the background":  ["#0984e3", "#74b9ff", "#a8d8f0"],
  "Lofi Girl Beats":    ["#2d3436", "#6c5ce7", "#a29bfe"],
};

const defaultGradient: [string, string] = ["#2d3436", "#636e72"];

/* Platform icons */
function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="Spotify">
      <circle cx="12" cy="12" r="12" fill="#1db954" />
      <path d="M7 15.5c3-1.8 7-2 10-0.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 12c3.5-2 8.5-2.2 12-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 8.5c4-2.2 10-2.4 14-0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-label="Apple Music">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-label="YouTube">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Spotify") return <SpotifyIcon />;
  if (platform === "YouTube") return <YouTubeIcon />;
  return <AppleMusicIcon />;
}

/* Vinyl record artwork circle */
function VinylArt({ gradient }: { gradient: string[] }) {
  const id = Math.random().toString(36).slice(2);
  return (
    <div className="relative flex aspect-square w-full items-center justify-center">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
      {/* Gradient fill */}
      <div
        className="absolute inset-[5%] rounded-full"
        style={{
          background:
            gradient.length === 3
              ? `radial-gradient(circle at 40% 35%, ${gradient[0]}, ${gradient[1]} 55%, ${gradient[2]})`
              : `radial-gradient(circle at 40% 35%, ${gradient[0]}, ${gradient[1]})`,
        }}
      />
      {/* Vinyl grooves */}
      {[0.72, 0.55, 0.40].map((scale) => (
        <div
          key={scale}
          className="absolute rounded-full border border-white/5"
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
          }}
        />
      ))}
      {/* Center hole */}
      <div className="absolute h-[8%] w-[8%] rounded-full bg-black/60 ring-1 ring-white/10" />
    </div>
  );
}

/* Single playlist card */
function PlaylistCard({ playlist }: { playlist: (typeof playlists)[0] }) {
  const gradient = artworkGradients[playlist.label] ?? defaultGradient;

  return (
    <a
      href={playlist.href || undefined}
      target={playlist.href ? "_blank" : undefined}
      rel={playlist.href ? "noopener noreferrer" : undefined}
      className="group relative flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#111] p-5 transition-transform duration-300 hover:-translate-y-1.5 md:w-[290px]"
      style={{ minHeight: 360 }}
    >
      {/* Artwork */}
      <div className="mb-5 w-full">
        <VinylArt gradient={gradient.filter((c): c is string => !!c)} />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom info */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.15em] text-white">
            {playlist.label}
          </p>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
            {playlist.platform}
          </p>
        </div>
        <div className="shrink-0">
          <PlatformIcon platform={playlist.platform} />
        </div>
      </div>
    </a>
  );
}

const featuredPlaylist = playlists.find((p) => p.spotifyId);

export function MusicSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  const newLocal = <div className="relative">
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-4"
      style={{
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {playlists.map((p) => (
        <div key={p.label} style={{ scrollSnapAlign: "start" }}>
          <PlaylistCard playlist={p} />
        </div>
      ))}
    </div>

    {/* Nav buttons */}
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-off-yellow text-black transition-all hover:bg-black hover:text-brand-yellow"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-off-yellow text-black transition-all hover:bg-black hover:text-brand-yellow"
      >
        →
      </button>
    </div>
  </div>;
  return (
    <section id="music" className="border-t border-black">
      <div className="site-container-wide pt-16 pb-12 lg:pt-20">
        <SectionHeading title="I live for music" />

        {/* Featured Spotify embed */}
        {featuredPlaylist?.spotifyId && (
          <div className="mt-10 overflow-hidden rounded-2xl">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${featuredPlaylist.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={featuredPlaylist.label}
            />
          </div>
        )}
      </div>

    </section>
  );
}
