import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name.first} ${site.name.last}`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} h-full`}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
