"use client";

import { useEffect, useRef } from "react";


const PIXEL_SIZE = 3;
const CHAR_W = 320;
const CHAR_H = 480;
const VISIBLE_H = CHAR_H;
type Pixel = {
  x: number; y: number;
  color: string;
  dx: number; dy: number;
};

export function PixelFigureSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{ pixels: Pixel[]; off: HTMLCanvasElement | null }>({
    pixels: [],
    off: null,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    canvas.width = CHAR_W;
    canvas.height = VISIBLE_H;
    const ctx = canvas.getContext("2d")!;

    const img = new Image();
    img.src = `/pixelated-me.svg?v=${Date.now()}`;
    img.onerror = () => {};

    img.onload = () => {
      // Offscreen canvas: full image at CHAR_W × CHAR_H
      const off = document.createElement("canvas");
      off.width = CHAR_W;
      off.height = CHAR_H;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, CHAR_W, CHAR_H);
      stateRef.current.off = off;

      // Sample pixels from the visible (top 70%) portion
      const pixels: Pixel[] = [];
      for (let y = 0; y < VISIBLE_H; y += PIXEL_SIZE) {
        for (let x = 0; x < CHAR_W; x += PIXEL_SIZE) {
          const d = octx.getImageData(x, y, 1, 1).data;
          if (d[3] > 60) {
            pixels.push({
              x, y,
              color: `rgb(${d[0]},${d[1]},${d[2]})`,
              dx: (Math.random() - 0.5) * window.innerWidth * 1.5,
              dy: (Math.random() - 0.5) * window.innerHeight * 1.5,
            });
          }
        }
      }
      stateRef.current.pixels = pixels;

      function draw() {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const { top, height } = sectionEl.getBoundingClientRect();
        // start assembling as the section scrolls INTO view (top = vh → 0 → negative)
        const raw = Math.max(0, Math.min(1, (window.innerHeight - top) / height));
        // gentle ease — mostly linear so scroll feels 1:1
        const progress = raw < 0.5
          ? 1.6 * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 8;


        ctx.clearRect(0, 0, CHAR_W, VISIBLE_H);

        if (progress < 0.92) {
          // Phase 1: scattered pixels fly into place (takes most of the scroll)
          const t = progress / 0.92;
          ctx.globalAlpha = 1;
          for (const p of stateRef.current.pixels) {
            ctx.fillStyle = p.color;
            ctx.fillRect(
              p.x + p.dx * (1 - t),
              p.y + p.dy * (1 - t),
              PIXEL_SIZE - 1,
              PIXEL_SIZE - 1,
            );
          }
        } else {
          // Phase 2: crossfade pixel blocks → crisp original SVG (last 8% of scroll)
          const t = (progress - 0.92) / 0.08; // 0→1 during crossfade

          // Pixel blocks fading out
          ctx.globalAlpha = 1 - t;
          for (const p of stateRef.current.pixels) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
          }

          // Original SVG fading in (source: top VISIBLE_H px of offscreen canvas)
          const { off } = stateRef.current;
          if (off) {
            ctx.globalAlpha = t;
            ctx.drawImage(off, 0, 0, CHAR_W, VISIBLE_H, 0, 0, CHAR_W, VISIBLE_H);
          }
        }
      }

      function onScroll() {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(draw);
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      draw();

      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafRef.current);
      };
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-black bg-brand-yellow"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden" style={{ paddingTop: "6vh" }}>
        {/* Background name */}
        <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center">
          <span
            className="font-display font-black uppercase leading-none text-black/[0.07]"
            style={{ fontSize: "clamp(14vw, 20vw, 24vw)" }}
          >
            MELVIN
          </span>
          <span
            className="font-display font-black uppercase leading-none text-black/[0.07]"
            style={{ fontSize: "clamp(10vw, 14vw, 18vw)" }}
          >
            FERNANDO
          </span>
        </div>

        {/* Canvas — positioned in upper portion of viewport */}
        <canvas
          ref={canvasRef}
          style={{ imageRendering: "pixelated", width: CHAR_W, height: VISIBLE_H, zIndex: 1, position: "relative", marginTop: 55 }}
        />

        {/* Text intro to music — always visible at foot of background name */}
        <div
          className="pointer-events-none absolute inset-x-0 flex flex-col items-center text-center"
          style={{ zIndex: 2, top: "calc(62% + 80px)" }}
        >
          <p className="label mb-1.5 text-black/40">AND</p>
          <p
            className="font-display font-black uppercase leading-none text-black"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Off the clock, I make music.
          </p>
        </div>
      </div>
    </div>
  );
}
