"use client";

import type { ReactNode } from "react";
import { caseStudies, type ViewMode } from "@/data/site";
import { PillButton } from "./PillButton";
import { ProjectThumb } from "./ProjectThumb";
import { SectionHeading } from "./SectionHeading";

type CaseStudiesProps = {
  mode: ViewMode;
};

/* Only use <a> when there's a real URL — avoids scroll-to-top on href="#" */
function CardWrapper({
  href,
  className,
  onMouseMove,
  onMouseLeave,
  children,
}: {
  href: string;
  className: string;
  onMouseMove: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  children: ReactNode;
}) {
  const isLink = href && !href.startsWith("#");
  if (isLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseMove={onMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
  return (
    <div
      className={className}
      onMouseMove={onMouseMove as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
    >
      {children}
    </div>
  );
}

function tilt(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  e.currentTarget.style.setProperty("--rx", `${y * -5}deg`);
  e.currentTarget.style.setProperty("--ry", `${x * 5}deg`);
}

function resetTilt(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export function CaseStudies({ mode }: CaseStudiesProps) {
  return (
    <section id="studies" className="section-padding border-t border-black">
      <div className="site-container-wide">
        <SectionHeading label="Case studies" title="Selected work" />

        {mode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {caseStudies.map((study) => (
              <CardWrapper
                key={study.id}
                href={study.href}
                className="project-card group block overflow-hidden border-2 border-black bg-brand-yellow"
                onMouseMove={tilt}
                onMouseLeave={resetTilt}
              >
                <ProjectThumb study={study} />
                <div className="p-4 md:p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl uppercase leading-none">
                      {study.title}
                    </h3>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.15em] text-light-grey">
                      {study.year}
                    </span>
                  </div>
                  <p className="mb-3 text-xs text-light-grey">{study.client}</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold uppercase tracking-[0.12em] text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {study.href && !study.href.startsWith("#") && (
                    <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.15em] text-goldenrod">
                      View project →
                    </p>
                  )}
                </div>
              </CardWrapper>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-black border-y border-black">
            {caseStudies.map((study) => (
              <CardWrapper
                key={study.id}
                href={study.href}
                className="group grid gap-6 py-8 transition-colors hover:bg-off-yellow/50 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:py-10"
                onMouseMove={() => {}}
                onMouseLeave={() => {}}
              >
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none md:text-3xl">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-light-grey">{study.client}</p>
                </div>
                <p className="text-sm leading-relaxed text-light-grey md:text-base">
                  {study.description}
                </p>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-light-grey">
                    {study.year}
                  </span>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {study.href && !study.href.startsWith("#") && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-goldenrod">↗</span>
                  )}
                </div>
              </CardWrapper>
            ))}
          </div>
        )}

        <div className="mt-12">
          <PillButton href="#" variant="primary">
            More works →
          </PillButton>
        </div>
      </div>
    </section>
  );
}
