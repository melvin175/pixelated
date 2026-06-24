const items = [
  "Full-Stack Development",
  "UI / UX",
  "Design Systems",
  "Product Thinking",
  "Front-End Engineering",
  "DevOps & Deployment",
  "Prototyping",
  "Component Architecture",
  "Web Performance",
  "End-to-End Delivery",
];

export function Marquee() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="marquee-root border-y border-black overflow-hidden py-4">
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-black"
          >
            {item}
            <span className="text-brand-yellow text-base leading-none select-none">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
