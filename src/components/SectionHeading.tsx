type SectionHeadingProps = {
  title: string;
  chinese?: string;
  label?: string;
};

export function SectionHeading({ title, chinese, label }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      {label && <p className="section-label mb-3">{label}</p>}
      <div className="flex flex-wrap items-end gap-3 md:gap-5">
        <h2 className="section-title">{title}</h2>
        {chinese && (
          <span className="chinese-label font-serif text-3xl md:text-4xl">
            {chinese}
          </span>
        )}
      </div>
    </div>
  );
}
