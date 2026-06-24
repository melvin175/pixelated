"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  layout?: "stacked" | "row";
};

export function LiveClock({ layout = "stacked" }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const date = now
    ? now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : "— — —";

  const time = now
    ? now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).toUpperCase()
    : "—:— —";

  if (layout === "row") {
    return (
      <>
        <span className="label">{date}</span>
        <span className="label">{time}</span>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-light-grey">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}
