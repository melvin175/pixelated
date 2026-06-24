export const site = {
  name: {
    first: "MELVIN",
    last: "FERNANDO",
  },
  location: "Pune, India",
  tagline:
    "",
  bio: "I'm a full-stack developer from Pune, India ✦ Four years in, and I still get that rush when an idea becomes something real. I live where design, engineering, and DevOps meet — building products that feel human, not just functional 💛 I sweat the small stuff: the transition, the typo, the moment someone smiles because it just works ✨ Always asking why. Always shipping with care 🚀",
  email: "melvinfernando175@gmail.com",
  copyright: "",
  resume: "#",
};

export type ViewMode = "grid" | "list";

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  color: string;
  colorAlt: string;
  description: string;
  href: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "esign-sdk",
    title: "eSign SDK",
    client: "Zoop · ZoopSign",
    year: "2025",
    tags: ["SDK Engineering", "Svelte", "CI/CD", "Security"],
    color: "#ffc451",
    colorAlt: "#c99226",
    description:
      "Architected a production-grade, embeddable eSign SDK in Svelte from zero — three phases covering core signing flow, camera & GPS capture, and device fingerprinting. Shipped a PDF viewer with annotation markers, a draw signature pad, New Relic observability, and a fully automated NPM publish pipeline via GitHub Actions. Integrated a Razorpay payment SDK for in-flow eStamp procurement and configured both Flow and Standalone modes for flexible client integrations.",
    href: "",
  },
  {
    id: "talk-to-pdf",
    title: "Talk to PDF",
    client: "Zoop · ZoopSign",
    year: "2023",
    tags: ["AI Product", "Frontend", "Analytics", "Cross-origin"],
    color: "#181610",
    colorAlt: "#36332e",
    description:
      "Spearheaded end-to-end frontend delivery of Talk to PDF — ZoopSign's AI document Q&A feature. Built the intent selection page, upload & PDF previewer, chatbox component, and cross-origin integration with talktopdf.ai. Designed a GridSelector component for role-based intent selection and a reusable Tab layout system. Instrumented a full analytics event suite for granular funnel tracking, and fixed a DOC→PDF conversion fallback bug that blocked non-PDF users.",
    href: "",
  },
  {
    id: "mymotor-web",
    title: "MyMotor Web",
    client: "Zoop · MyMotor",
    year: "2025 – 2026",
    tags: ["SEO", "Auth", "Mobile", "Security"],
    color: "#dadada",
    colorAlt: "#856f53",
    description:
      "Led a broad technical build-out on MyMotor — a high-traffic vehicle services platform. Delivered structured data SEO across state pages (Org, App, FAQ & Breadcrumb schemas), CLS fixes for Core Web Vitals, and authored llms.txt for LLM discoverability. Shipped dual-channel OTP onboarding, VAPT security remediations, anonymous session fixation protection, CleverTap analytics, Android deferred deep linking, and a Bulk Challan Payment flow.",
    href: "",
  },
  {
    id: "estamp-platform",
    title: "eStamp Platform",
    client: "Zoop · ZoopSign",
    year: "2024",
    tags: ["Payments", "State Architecture", "Product", "Revenue"],
    color: "#ffd177",
    colorAlt: "#a5a800",
    description:
      "Led the frontend integration of ZoopSign's digital stamping platform — built the eStamp inventory view, order details sidebar, and attach/detach flow within the eSign journey. Engineered payment state gating so signing actions unlock only after a valid eStamp is procured. Extracted eStamp state into a dedicated context away from the monolithic EsignContext, reducing re-render surface and improving modularity — directly enabling a new revenue stream for the business.",
    href: "",
  },
  {
    id: "zoopsign-dashboard",
    title: "ZoopSign Dashboard",
    client: "Zoop · ZoopSign",
    year: "2023 – 2024",
    tags: ["Dashboard", "UX", "Onboarding", "Architecture"],
    color: "#ffc451",
    colorAlt: "#181610",
    description:
      "Drove cross-cutting UX and architectural improvements across the ZoopSign dashboard — global searchbox redesign, navigation hierarchy simplification, Driver.js onboarding tour, LinkedIn & Microsoft auth, and a centralised subscription state layer that gates premium features across the product. Consolidated file-upload logic from multiple duplicate components into a single reusable module, migrated the entire icon library to Heroicons, and mentored 5–6 interns from zero to shipping production-ready code.",
    href: "",
  },
  {
    id: "creator-ai",
    title: "Creator AI",
    client: "Personal Project",
    year: "2026",
    tags: ["AI", "SaaS", "Full-Stack", "Product"],
    color: "#0f0f1a",
    colorAlt: "#1e1b4b",
    description:
      "Built an AI growth platform for creators and brands — a full-stack SaaS that lets content creators leverage AI for content strategy, brand positioning, and audience growth. Designed and engineered end-to-end: product architecture, AI integrations, authentication, and deployment pipeline. A personal project exploring what it looks like when engineering craft meets product thinking.",
    href: "https://creator-ai-psi.vercel.app/",
  },
];

export const workHistory = [
  {
    role: "Software Development Engineer II",
    company: "Zoop Energy",
    period: "2025 – Present",
  },
  {
    role: "Software Development Engineer I",
    company: "Zoop",
    period: "2022 – 2025",
  },
];

export type Favorite = {
  title: string;
  tags: string[];
  description: string;
  youtubeId?: string;
  featured?: boolean;
};

export const favorites: Favorite[] = [
  {
    title: "Everything Everywhere All at Once",
    tags: ["Adventure", "Film"],
    featured: true,
    youtubeId: "wrECxBsgs4k",
    description:
      "The first time I watched this, my jaw dropped. Multiverse, family, grief, joy, and action — all colliding in a way that still feels personal. It made me rethink how much emotion you can pack into visual chaos without losing the thread.",
  },
  {
    title: "Past Lives",
    tags: ["Drama", "Film"],
    youtubeId: "kA244xekfwI",
    description:
      "Quiet, devastating, and beautifully restrained. What stays with me is the editing — how much is said in glances, pauses, and the space between words.",
  },
  {
    title: "Severance",
    tags: ["Sci-fi", "TV Series"],
    youtubeId: "dGA0yYb2j4M",
    description:
      "The production design alone is a masterclass. Creepy, funny, and weirdly relatable — a show about work that somehow makes you feel seen.",
  },
  {
    title: "The Bear",
    tags: ["Drama", "TV Series"],
    youtubeId: "y-cqqAJIXhs",
    description:
      "Chaotic in the best way. The pacing, the sound design, the stress — it all feels intentional. One of the few shows where the craft behind the craft is part of the story.",
  },
];

export const playlists = [
  {
    label: "All-time favorites",
    platform: "Spotify",
    href: "https://open.spotify.com/playlist/5OHf788NCnmT9R7M5bxSSx",
    spotifyId: "5OHf788NCnmT9R7M5bxSSx",
  },
  {
    label: "Work tunes",
    platform: "Apple Music",
    href: "https://music.apple.com",
  },
  {
    label: "Soundtrack mode",
    platform: "Apple Music",
    href: "https://music.apple.com",
  },
  {
    label: "Love Vibin'",
    platform: "Apple Music",
    href: "https://music.apple.com",
  },
  {
    label: "In the background",
    platform: "Apple Music",
    href: "https://music.apple.com",
  },
  {
    label: "Lofi Girl Beats",
    platform: "YouTube",
    href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/melvinfernando" },
  { label: "GitHub", href: "https://github.com/melvinfernando" },
  { label: "Spotify", href: "https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs" },
];

export const qaItems = [
  {
    question: "What's your approach when starting a new product from scratch?",
    answer:
      "I start with the user's most uncomfortable moment — the thing that makes them close the tab or sigh. Then I work backwards. Most mistakes happen when teams jump into building before they've felt the friction themselves. I prototype rough, validate fast, and only invest in polish once the direction is real.",
  },
  {
    question: "How do you balance design and engineering when they conflict?",
    answer:
      "I don't think they actually conflict as often as people say — they conflict when design skips constraints and engineering skips empathy. Since I do both, I usually know which side is being lazy. The real tension is timeline vs. quality, and there I always try to protect the user experience first, then negotiate scope.",
  },
  {
    question: "What's your go-to stack when you're building something yourself?",
    answer:
      "Next.js, TypeScript, Tailwind, and whatever deployment story is fastest — usually Vercel. For data I reach for Postgres with Drizzle or Prisma. I keep the stack boring on purpose because complexity is a tax. The interesting decisions are product decisions, not tech decisions.",
  },
  {
    question: "How do you think about performance vs. developer experience?",
    answer:
      "Performance is a feature the user feels but can't name — they just know the product feels alive or sluggish. I track Core Web Vitals on everything I ship seriously. DX matters too, but a fast dev experience that ships a slow product is backwards. I've spent real time on CLS fixes and bundle audits, and it pays off.",
  },
  {
    question: "What makes a good designer, in your opinion?",
    answer:
      "Understanding the purpose, the meaning, and the people they're designing for. The design can look incredible but if the audience doesn't get it, the designer hasn't done their job. Good design disappears — you only notice it when it's missing.",
  },
  {
    question: "What do you do when you are not coding or designing?",
    answer:
      "I have a pretty disciplined lifestyle — you'll catch me in the gym, cooking, listening to music obsessively, or making music of my own. I also run a tight rotation of shows and films. The creative work and the rest of life feed each other more than people think.",
  },
  {
    question: "There is skill, and there's talent. What is a natural talent you've always had?",
    answer:
      "Music and rhythm. I've always been able to feel the structure of a song — the tension, the release, where a beat wants to go. It bleeds directly into how I think about UI: timing, flow, the pacing of an interaction. Animation feels like music to me.",
  },
  {
    question: "What keeps you up at night?",
    answer:
      "AI moving faster than our ability to reason about it. I use it constantly — it's genuinely changed how I prototype and think. But the questions around authorship, bias, and what we lose when we stop struggling through hard problems — those stay with me. I try to use AI as a thinking partner, not a replacement for judgment.",
  },
];
