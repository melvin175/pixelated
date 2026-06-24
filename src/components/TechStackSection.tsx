"use client";

import { useState } from "react";
import {
  siJavascript, siTypescript, siGo,
  siReact, siNextdotjs, siSvelte, siTailwindcss, siBootstrap, siRedux, siVite,
  siNodedotjs, siExpress,
  siPostgresql, siMongodb, siRedis, siFirebase,
  siJsonwebtokens, siClerk,
  siGooglecloud, siDocker, siKubernetes, siVercel, siNetlify, siCloudflare,
  siJenkins, siGithubactions, siSentry, siNewrelic,
  siGoogleanalytics, siMixpanel,
  siGithub, siPostman, siRazorpay, siStrapi,
} from "simple-icons";

type Tech = { name: string; icon?: { svg: string; hex: string } };

const categories: { label: string; items: Tech[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", icon: siJavascript },
      { name: "TypeScript", icon: siTypescript },
      { name: "Go",         icon: siGo },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React",       icon: siReact },
      { name: "Next.js",     icon: siNextdotjs },
      { name: "Svelte",      icon: siSvelte },
      { name: "Tailwind",    icon: siTailwindcss },
      { name: "Bootstrap",   icon: siBootstrap },
      { name: "Redux",       icon: siRedux },
      { name: "Zustand" },
      { name: "Vite",        icon: siVite },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",  icon: siNodedotjs },
      { name: "Express",  icon: siExpress },
      { name: "REST API" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MongoDB",    icon: siMongodb },
      { name: "Redis",      icon: siRedis },
      { name: "Firebase",   icon: siFirebase },
      { name: "Mongoose" },
    ],
  },
  {
    label: "Auth",
    items: [
      { name: "JWT",   icon: siJsonwebtokens },
      { name: "OAuth" },
      { name: "Clerk", icon: siClerk },
    ],
  },
  {
    label: "Cloud & Infra",
    items: [
      { name: "GCP",        icon: siGooglecloud },
      { name: "Docker",     icon: siDocker },
      { name: "Kubernetes", icon: siKubernetes },
      { name: "Vercel",     icon: siVercel },
      { name: "Netlify",    icon: siNetlify },
      { name: "Cloudflare", icon: siCloudflare },
    ],
  },
  {
    label: "CI/CD & Monitoring",
    items: [
      { name: "Jenkins",        icon: siJenkins },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "Sentry",         icon: siSentry },
      { name: "New Relic",      icon: siNewrelic },
      { name: "Playwright" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { name: "Google Analytics", icon: siGoogleanalytics },
      { name: "Mixpanel",         icon: siMixpanel },
      { name: "Amplitude" },
      { name: "Segment" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "GitHub",     icon: siGithub },
      { name: "Postman",    icon: siPostman },
      { name: "Apidog" },
      { name: "Razorpay",   icon: siRazorpay },
      { name: "Strapi",     icon: siStrapi },
      { name: "Builder.io" },
    ],
  },
];

function TechChip({ tech, highlight }: { tech: Tech; highlight: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200"
      style={{
        borderColor: highlight && tech.icon ? `#${tech.icon.hex}55` : "rgba(255,255,255,0.1)",
        color: highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
        background: highlight && tech.icon ? `#${tech.icon.hex}12` : "transparent",
      }}
    >
      {tech.icon && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: highlight ? `#${tech.icon.hex}` : "rgba(255,255,255,0.3)", flexShrink: 0 }}
          dangerouslySetInnerHTML={{ __html: tech.icon.svg }}
        />
      )}
      {tech.name}
    </span>
  );
}

export function TechStackSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="border-t border-black bg-off-black">
      <div className="site-container-wide py-20 lg:py-28">
        <div className="mb-14">
          <p className="label mb-3 text-brand-yellow/60">Stack</p>
          <h2
            className="font-display font-black uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            What I ship with.
          </h2>
        </div>

        <div className="divide-y divide-white/[0.08]">
          {categories.map((cat) => {
            const isHovered = hovered === cat.label;
            const isDimmed = hovered !== null && !isHovered;

            return (
              <div
                key={cat.label}
                className="flex cursor-default flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-8"
                style={{ opacity: isDimmed ? 0.4 : 1, transition: "opacity 0.3s ease" }}
                onMouseEnter={() => setHovered(cat.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <span
                  className="w-44 shrink-0 pt-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <TechChip key={tech.name} tech={tech} highlight={isHovered} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
