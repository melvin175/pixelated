import type { ReactNode } from "react";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  external?: boolean;
};

const variants = {
  primary:
    "border-2 border-black bg-off-yellow text-black hover:bg-goldenrod hover:text-white",
  secondary:
    "border-2 border-black bg-brand-yellow text-black hover:bg-off-yellow",
  dark: "border-2 border-black bg-black text-brand-yellow hover:scale-105",
};

export function PillButton({
  href,
  children,
  variant = "primary",
  external = false,
}: PillButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex h-14 items-center rounded-full px-8 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200 active:scale-[0.98] md:h-16 md:px-10 ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
