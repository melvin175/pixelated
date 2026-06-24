"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function format(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export function SessionTimer() {
  const [seconds, setSeconds] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 800);
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => { clearTimeout(show); clearInterval(tick); };
  }, []);

  return (
    <div
      className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-1 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label — slides down and fades in on hover */}
      <span
        className="text-[9px] font-bold uppercase tracking-[0.2em] text-off-black/50 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        Time on site
      </span>

      {/* Pill — always visible, expands on hover */}
      <div
        className="flex h-10 cursor-default items-center justify-end overflow-hidden rounded-full bg-off-black shadow-md transition-all duration-300"
        style={{ width: hovered ? "120px" : "40px" }}
      >
        {/* Clock icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeLinecap="round" style={{ stroke: "#ffffff", strokeWidth: 2 }}>
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 14" />
          </svg>
        </div>

        {/* Time — slides in from right */}
        <span
          className="pr-4 font-display text-[0.85rem] font-black leading-none tracking-tight text-white transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(8px)",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {format(seconds)}
        </span>
      </div>
    </div>
  );
}
