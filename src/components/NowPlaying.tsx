"use client";

import { useEffect, useState } from "react";

type Track = {
  configured: boolean;
  isPlaying: boolean;
  title: string | null;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  songUrl?: string;
};

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = () =>
      fetch("/api/spotify")
        .then((r) => r.json())
        .then((t: Track) => {
          setTrack(t);
          if (t?.configured && t.title) setTimeout(() => setVisible(true), 800);
        })
        .catch(() => {});

    load();
    const id = window.setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!track?.configured || !track.title) return null;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 rounded-2xl bg-black/90 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_48px_rgba(29,185,84,0.2)]"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0px" : "80px"})`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
      }}
    >
      {/* Album art */}
      <div className="relative h-10 w-10 shrink-0">
        {track.albumArt ? (
          <img
            src={track.albumArt}
            alt={track.album}
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-[#1db954]" />
        )}
        {/* Playing indicator dot */}
        {track.isPlaying && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#1db954] ring-2 ring-black pulse-dot" />
        )}
      </div>

      {/* Track info */}
      <div className="min-w-0 max-w-[180px]">
        <p className="truncate text-[11px] font-bold text-white">{track.title}</p>
        <p className="truncate text-[10px] text-white/40">{track.artist}</p>
      </div>

      {/* Bars or "Last played" */}
      <div className="ml-1 flex shrink-0 items-center gap-1">
        {track.isPlaying ? (
          [0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="inline-block w-[3px] rounded-full bg-[#1db954]"
              style={{
                height: 16,
                animation: "barBounce 0.7s ease-in-out infinite alternate",
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))
        ) : (
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">
            Last
          </span>
        )}
      </div>

      {/* Spotify logo */}
      <svg width="14" height="14" viewBox="0 0 24 24" className="shrink-0 opacity-40">
        <circle cx="12" cy="12" r="12" fill="#1db954" />
        <path fill="white" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.3.1-.65-.1-.75-.45-.1-.3.1-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" />
      </svg>
    </a>
  );
}
