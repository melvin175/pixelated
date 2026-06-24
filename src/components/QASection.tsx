import { qaItems } from "@/data/site";

export function QASection() {
  return (
    <section className="border-t border-black bg-brand-yellow">
      <div className="flex items-start px-8 sm:px-12 md:px-16 lg:px-20">
        {/* Left: full scrollable Q&A list */}
        <div className="flex-1 py-20 lg:py-24">
          <div className="max-w-[620px] space-y-12">
            {qaItems.map((item) => (
              <div key={item.question}>
                <p className="mb-2 text-[15px] font-bold leading-snug text-black">
                  {item.question}
                </p>
                <p className="text-[15px] leading-[1.72] text-black/75">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: sticky giant Q&A label */}
        <div className="hidden self-stretch select-none lg:block">
          <div className="sticky top-0 flex h-screen items-start pt-20 pl-8 lg:pt-24">
            <span
              className="font-display font-black uppercase leading-none text-black"
              style={{ fontSize: "clamp(9rem, 12vw, 17rem)", lineHeight: 0.85 }}
            >
              Q&A
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
