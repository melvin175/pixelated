import { socialLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-black py-10 md:py-14">
      <div className="site-container-wide flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl uppercase leading-none md:text-5xl">
            Let&apos;s talk
          </p>
          <a
            href={`mailto:${site.email}`}
            className="hover-line mt-3 inline-block text-sm text-light-grey transition-colors hover:text-black"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border-2 border-black px-6 text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:bg-black hover:text-brand-yellow"
            >
              {link.label}
            </a>
          ))}

          {/* Resume download */}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-black bg-brand-yellow px-6 text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:bg-black hover:text-brand-yellow"
          >
            Resume
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>

      <div className="site-container-wide mt-10 border-t border-black/10 pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-light-grey">
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}
