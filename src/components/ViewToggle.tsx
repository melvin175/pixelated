"use client";

import type { ViewMode } from "@/data/site";

type ViewToggleProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  light?: boolean;
};

export function ViewToggle({ mode, onChange, light = false }: ViewToggleProps) {
  const activeClass = light ? "text-brand-yellow" : "text-black";
  const inactiveClass = light
    ? "text-white/40 hover:text-white/70"
    : "text-light-grey hover:text-black";

  return (
    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`transition-colors ${mode === "grid" ? activeClass : inactiveClass}`}
      >
        Grid
      </button>
      <span className={light ? "text-white/20" : "text-black/20"}>/</span>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`transition-colors ${mode === "list" ? activeClass : inactiveClass}`}
      >
        List
      </button>
    </div>
  );
}
