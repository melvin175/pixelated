"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
