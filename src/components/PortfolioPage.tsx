"use client";

import { useState } from "react";
import {
  favorites,
  site,
  type ViewMode,
} from "@/data/site";
import { BioHighlight } from "./BioHighlight";
import { CaseStudies } from "./CaseStudies";
import { EmailCopy } from "./EmailCopy";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { PillButton } from "./PillButton";
import { QASection } from "./QASection";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { CurtainSection } from "./CurtainSection";
import { MusicSection } from "./MusicSection";
import { NowPlaying } from "./NowPlaying";
import { OriginalMusicSection } from "./OriginalMusicSection";
import { PixelFigureSection } from "./PixelFigureSection";
import { ShowsSection } from "./ShowsSection";
import { SessionTimer } from "./SessionTimer";
import { SiteHeader } from "./SiteHeader";
import { TechStackSection } from "./TechStackSection";
import { WorkCards } from "./WorkCards";

export function PortfolioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <>
      <SiteHeader viewMode={viewMode} onViewChange={setViewMode} />
      <NowPlaying />
      <SessionTimer />
      <EmailCopy email={site.email} />

      <main>
        <Hero />
        {/* Marquee ticker between hero and work */}
        <Marquee />
        <BioHighlight />

        <CaseStudies mode={viewMode} />

        <TechStackSection />

        {/* Work history */}
        <section id="work" className="section-padding border-t border-black">
          <div className="site-container-wide">
            <ScrollReveal>
              <SectionHeading title="My Journey So Far" label="Experience" />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <WorkCards />
            </ScrollReveal>
          </div>
        </section>

        {/* <ShowsSection shows={favorites} /> */}

        <MusicSection />

        <PixelFigureSection />

        <OriginalMusicSection />

        <div id="qa">
          <QASection />
        </div>

        <CurtainSection />
      </main>

      {/* <Footer /> */}
    </>
  );
}
