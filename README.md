<div align="center">

# ✦ pixelated

**The personal site of Melvin Fernando** — full-stack developer by day, music producer (M7VN) by night.

_Design, engineering, and DevOps in one place. Built to feel human, not just functional._ 💛

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS v4`

</div>

---

## 👋 What is this?

Not your average dev portfolio. `pixelated` is an interactive, scroll-driven experience that tells a story instead of listing bullet points:

- A **split hero** with oversized type and a live clock
- A **bio that highlights word-by-word** as you read it
- A **pixel-me figure** that scatters into thousands of pixels and reassembles on scroll
- A **theatre-curtain finale** that closes the show 🎭
- Live **Spotify integration** showing my latest M7VN releases 🎵

It's a portfolio that's as much about *how* it feels as *what* it says.

---

## 🛠 Built with

| Layer | Tech |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [simple-icons](https://simpleicons.org) |
| Canvas | Native `<canvas>` for the pixel-scatter animation |
| Data | Spotify Web API (live releases + now playing) |

---

## 🚀 Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start scrolling.

```bash
# build for production
npm run build && npm start
```

---

## 🔑 Environment

The music sections pull live data from Spotify. Create a `.env.local` file:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

> No keys? No problem. The site gracefully falls back to a curated, hardcoded release list — so it always looks complete.

---

## 🗺 The journey (section by section)

```
HERO            →  name, tagline, live clock
BIO             →  scroll-highlighted intro
SELECTED WORK   →  case studies (grid / list toggle)
TECH STACK      →  the tools I reach for
EXPERIENCE      →  "My Journey So Far"
MUSIC           →  what I'm listening to
PIXEL ME        →  scatter → reassemble on scroll
M7VN            →  my original releases (live via Spotify)
Q&A             →  a few honest answers
CURTAIN         →  "That's a wrap" 🎭
```

---

## 📁 Project structure

```
portsite/
├── src/
│   ├── app/
│   │   ├── api/spotify/     # Spotify Web API routes
│   │   ├── globals.css      # design tokens + custom utilities
│   │   └── page.tsx
│   ├── components/          # every section lives here
│   └── data/site.ts         # all content in one editable file
└── public/                  # images, SVGs, the pixel-me asset
```

> Want to make it yours? Almost all copy lives in [`src/data/site.ts`](src/data/site.ts).

---

<div align="center">

**Made with care in Pune, India** 🇮🇳

[Email](mailto:melvinfernando175@gmail.com) · [Spotify](https://open.spotify.com/artist/0rjIdD6rhjXgD9UsDAqSrs)

_Always asking why. Always shipping with care._ 🚀

</div>
