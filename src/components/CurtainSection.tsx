"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ContactFolder } from "./ContactFolder";

const CURTAIN_BG = `repeating-linear-gradient(
  to right,
  #1c0505 0px,
  #3d0d0d 16px,
  #1c0505 32px,
  #4a1010 48px,
  #2a0808 64px,
  #1c0505 80px
)`;

export function CurtainSection() {
  const [closed, setClosed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setClosed(true), 400);
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#060606]"
    >
      {/* Stage spotlight from above */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,209,119,0.10) 0%, transparent 65%)",
          zIndex: 1,
        }}
      />


      {/* Main title — always in front of curtains */}
      <div
        className="relative flex flex-col items-center gap-5 px-6 text-center"
        style={{ zIndex: 30 }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
          Thank you for your time
        </p>

        <h2
          className="font-display uppercase leading-[0.9] tracking-tight text-white"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
        >
          That&apos;s my time
        </h2>

        <div className="mt-10">
          <ContactFolder />
        </div>
      </div>

      {/* Left curtain */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[44%]"
        style={{
          zIndex: 20,
          backgroundImage: CURTAIN_BG,
          boxShadow: "inset -40px 0 80px rgba(0,0,0,0.75), inset -4px 0 12px rgba(255,50,50,0.05)",
          transform: closed ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Right curtain */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[44%]"
        style={{
          zIndex: 20,
          backgroundImage: CURTAIN_BG,
          boxShadow: "inset 40px 0 80px rgba(0,0,0,0.75), inset 4px 0 12px rgba(255,50,50,0.05)",
          transform: closed ? "translateX(0)" : "translateX(100%)",
          transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Top valance bar — the horizontal header piece of stage curtains */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-20"
        style={{
          zIndex: 25,
          backgroundImage: CURTAIN_BG,
          boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
        }}
      />

      {/* Valance bottom shadow */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-20 h-10"
        style={{
          zIndex: 25,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        }}
      />

      {/* Copyright at very bottom */}
      <p
        className="absolute bottom-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/10"
        style={{ zIndex: 30 }}
      >
        {site.copyright}
      </p>
    </section>
  );
}
