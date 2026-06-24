"use client";

import { useState } from "react";
import type { Favorite } from "@/data/site";

type ShowCardProps = {
  show: Favorite;
  isExpanded: boolean;
  onToggle: () => void;
};

export function ShowCard({ show, isExpanded, onToggle }: ShowCardProps) {
  return (
    <article className="overflow-hidden border-2 border-black bg-brand-yellow transition-colors hover:bg-off-yellow/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 p-6 text-left md:p-8"
      >
        <div className="min-w-0">
          {show.featured && (
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-goldenrod">
              Melvin&apos;s favorite
            </p>
          )}
          <h3 className="font-display text-2xl uppercase leading-tight md:text-4xl">
            {show.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {show.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-goldenrod"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center text-2xl leading-none transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 px-6 pb-6 md:px-8 md:pb-8">
            <p className="max-w-2xl text-sm leading-relaxed text-light-grey md:text-base">
              {show.description}
            </p>
            {show.youtubeId && (
              <div className="aspect-video overflow-hidden border-2 border-black bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${show.youtubeId}`}
                  title={show.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

type ShowsSectionProps = {
  shows: Favorite[];
};

export function ShowsSection({ shows }: ShowsSectionProps) {
  const [expandedShow, setExpandedShow] = useState<number | null>(0);

  return (
    <section id="shows" className="section-padding border-t border-black">
      <div className="site-container-wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div className="flex flex-wrap items-end gap-3 md:gap-5">
            <h2 className="section-title">I love shows</h2>
            <span className="chinese-label font-serif text-3xl md:text-4xl">
              剧狂
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {shows.map((show, index) => (
            <ShowCard
              key={show.title}
              show={show}
              isExpanded={expandedShow === index}
              onToggle={() =>
                setExpandedShow(expandedShow === index ? null : index)
              }
            />
          ))}
        </div>


      </div>
    </section>
  );
}
