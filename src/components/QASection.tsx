"use client";

import { useState } from "react";
import { qaItems } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function QASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding border-t border-black">
      <div className="site-container-wide">
        <SectionHeading label="Q&A" title="A few questions" chinese="问答" />

        <div className="divide-y divide-black border-y border-black">
          {qaItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:bg-off-yellow/30 md:py-8"
                >
                  <span className="max-w-3xl text-base leading-relaxed md:text-xl">
                    {item.question}
                  </span>
                  <span
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-2xl leading-none transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 text-sm leading-relaxed text-light-grey md:pb-8 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
