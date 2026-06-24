"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { parseBio } from "@/lib/parseBio";

export function BioHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCount, setActiveCount] = useState(0);
  const { words, total } = useMemo(() => parseBio(site.bio), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollRoom = section.offsetHeight - window.innerHeight;

      if (scrollRoom <= 0) {
        setActiveCount(total);
        return;
      }

      const scrolled = Math.min(scrollRoom, Math.max(0, -rect.top));
      const progress = scrolled / scrollRoom;
      setActiveCount(Math.round(progress * total));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setActiveCount(total);
      return;
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  return (
    <section ref={sectionRef} className="bio-highlight" aria-label="About">
      <div className="bio-highlight__sticky">
        <p className="bio-highlight__text" aria-label={site.bio}>
          {words.map((word, wordIndex) => (
            <span
              key={`word-${word.items[0]?.flatIndex ?? wordIndex}`}
              className="bio-highlight__word"
            >
              {wordIndex > 0 && " "}
              {word.items.map(({ grapheme, flatIndex, isEmoji }) => {
                const isActive = flatIndex < activeCount;

                return (
                  <span
                    key={flatIndex}
                    className={[
                      "bio-highlight__char",
                      isActive && "bio-highlight__char--active",
                      isEmoji && "bio-highlight__char--emoji",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {grapheme}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
