"use client";

import { useEffect, useState } from "react";
import type { ViewMode } from "@/data/site";
import { ViewToggle } from "./ViewToggle";

type SiteHeaderProps = {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
};

const navLinks = [
  { label: "Work", href: "#studies", sectionId: "studies" },
  { label: "Shows", href: "#shows", sectionId: "shows" },
  { label: "Music", href: "#music", sectionId: "music" },
  { label: "Q&A", href: "#qa", sectionId: "qa" },
];

export function SiteHeader({ viewMode, onViewChange }: SiteHeaderProps) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Slide in after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.sectionId);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-35% 0px -35% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <header
      className="fixed left-5 top-5 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="overflow-hidden rounded-[10px] bg-black shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center">
          {/* Desktop nav links */}
          <div className="hidden items-center sm:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex h-12 items-center px-5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors"
                  style={{ color: isActive ? "#ffd177" : "rgba(255,255,255,0.4)" }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Studies pill */}
          <a
            href="#studies"
            className="flex h-12 items-center bg-brand-yellow px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80"
          >
            Studies
          </a>

          {/* Grid / List toggle */}
          <div className="hidden h-12 items-center gap-5 border-l border-white/10 px-5 sm:flex">
            <ViewToggle mode={viewMode} onChange={onViewChange} light />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-12 items-center px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-yellow sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 px-5 py-4 sm:hidden">
            <div className="mb-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <ViewToggle mode={viewMode} onChange={onViewChange} light />
          </nav>
        )}
      </div>
    </header>
  );
}
