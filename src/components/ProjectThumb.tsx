"use client";

import type { CaseStudy } from "@/data/site";

type ProjectThumbProps = {
  study: CaseStudy;
};

/* ── Unique animated SVG pattern per project ── */
function CircuitPattern({ fg }: { fg: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Horizontal traces */}
      {[40, 100, 160, 220].map((y, i) => (
        <line key={y} x1="-10" y1={y} x2="410" y2={y}
          stroke={fg} strokeWidth="0.8" strokeDasharray="18 8"
          opacity="0.25"
          style={{ animation: `circuitSlide ${3 + i * 0.7}s linear infinite`, animationDelay: `${i * -1.2}s` }}
        />
      ))}
      {/* Vertical traces */}
      {[80, 200, 320].map((x, i) => (
        <line key={x} x1={x} y1="-10" x2={x} y2="310"
          stroke={fg} strokeWidth="0.8" strokeDasharray="12 10"
          opacity="0.2"
          style={{ animation: `circuitSlideV ${4 + i * 0.5}s linear infinite`, animationDelay: `${i * -0.8}s` }}
        />
      ))}
      {/* Nodes */}
      {[[80,40],[200,160],[320,100],[80,220],[200,40]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={fg} opacity="0.3"
          style={{ animation: `nodePulse ${2 + i * 0.3}s ease-in-out infinite alternate`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}

function BubblePattern({ fg }: { fg: string }) {
  const bubbles = [
    { x: 60,  y: 260, r: 18, dur: "4s",  delay: "0s"    },
    { x: 160, y: 280, r: 12, dur: "5.5s", delay: "1.2s" },
    { x: 280, y: 270, r: 22, dur: "3.8s", delay: "0.6s" },
    { x: 340, y: 260, r: 9,  dur: "6s",   delay: "2s"   },
    { x: 110, y: 290, r: 7,  dur: "4.5s", delay: "1.8s" },
    { x: 230, y: 285, r: 14, dur: "5s",   delay: "0.3s" },
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {bubbles.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r}
          fill="none" stroke={fg} strokeWidth="1.2"
          opacity="0.25"
          style={{ animation: `bubbleRise ${b.dur} ease-in infinite`, animationDelay: b.delay }}
        />
      ))}
      {/* Chat-bubble shapes */}
      <rect x="60" y="60" width="100" height="36" rx="8" fill={fg} opacity="0.08"
        style={{ animation: `fadeShift 4s ease-in-out infinite alternate` }} />
      <rect x="240" y="110" width="80" height="28" rx="8" fill={fg} opacity="0.06"
        style={{ animation: `fadeShift 5s ease-in-out infinite alternate`, animationDelay: "1s" }} />
    </svg>
  );
}

function SpeedPattern({ fg }: { fg: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[60, 110, 155, 195, 230].map((y, i) => (
        <line key={y}
          x1="-200" y1={y} x2="600" y2={y}
          stroke={fg} strokeWidth={i === 2 ? "1.5" : "0.7"}
          opacity={i === 2 ? "0.35" : "0.15"}
          strokeDasharray={`${40 + i * 20} ${20 + i * 10}`}
          style={{ animation: `speedLine ${1.8 + i * 0.4}s linear infinite`, animationDelay: `${i * -0.5}s` }}
        />
      ))}
      {/* Road markers */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={i * 80 - 20} y="148" width="36" height="4" rx="2"
          fill={fg} opacity="0.2"
          style={{ animation: `roadDash 1.4s linear infinite`, animationDelay: `${i * -0.23}s` }}
        />
      ))}
    </svg>
  );
}

function StampPattern({ fg }: { fg: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[30, 60, 90, 120, 150].map((r, i) => (
        <circle key={r} cx="200" cy="150" r={r}
          fill="none" stroke={fg} strokeWidth="0.8"
          opacity="0"
          style={{ animation: `stampRing 3.5s ease-out infinite`, animationDelay: `${i * 0.6}s` }}
        />
      ))}
      {/* Grid overlay */}
      {[80,160,240,320].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke={fg} strokeWidth="0.5" opacity="0.1" />
      ))}
      {[75,150,225].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={fg} strokeWidth="0.5" opacity="0.1" />
      ))}
    </svg>
  );
}

function BarPattern({ fg }: { fg: string }) {
  const bars = [
    { x: 50,  h: 80,  dur: "2.2s", delay: "0s"   },
    { x: 110, h: 120, dur: "2.8s", delay: "0.3s"  },
    { x: 170, h: 60,  dur: "2.4s", delay: "0.6s"  },
    { x: 230, h: 140, dur: "3s",   delay: "0.2s"  },
    { x: 290, h: 90,  dur: "2.6s", delay: "0.8s"  },
    { x: 350, h: 110, dur: "2.9s", delay: "0.4s"  },
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Baseline */}
      <line x1="20" y1="240" x2="380" y2="240" stroke={fg} strokeWidth="0.8" opacity="0.25" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={240 - b.h} width="28" height={b.h} rx="3"
          fill={fg} opacity="0.15"
          style={{ animation: `barRise ${b.dur} ease-in-out infinite alternate`, animationDelay: b.delay }}
        />
      ))}
      {/* Trend line */}
      <polyline points="64,200 124,170 184,220 244,140 304,190 364,160"
        fill="none" stroke={fg} strokeWidth="1.5" strokeDasharray="5 4"
        opacity="0.3"
        style={{ animation: `fadeShift 3s ease-in-out infinite alternate` }} />
    </svg>
  );
}

function NeuralPattern({ fg }: { fg: string }) {
  const nodes = [[60,80],[200,50],[340,90],[100,180],[260,160],[180,260],[320,240]];
  const edges = [[0,1],[1,2],[0,3],[1,4],[2,4],[3,5],[4,5],[4,6],[5,6]];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {edges.map(([a,b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={fg} strokeWidth="0.8" opacity="0"
          style={{ animation: `edgePulse ${2 + i * 0.35}s ease-in-out infinite`, animationDelay: `${i * 0.28}s` }}
        />
      ))}
      {nodes.map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill={fg} opacity="0.25"
          style={{ animation: `nodePulse ${1.8 + i * 0.25}s ease-in-out infinite alternate`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {/* Sparkles */}
      {[[150,130],[280,100],[100,240]].map(([x,y], i) => (
        <path key={i}
          d={`M${x},${y-8} L${x+2},${y-2} L${x+8},${y} L${x+2},${y+2} L${x},${y+8} L${x-2},${y+2} L${x-8},${y} L${x-2},${y-2} Z`}
          fill={fg} opacity="0"
          style={{ animation: `sparkle ${2.5 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </svg>
  );
}

const patternMap: Record<string, React.FC<{ fg: string }>> = {
  "esign-sdk":          CircuitPattern,
  "talk-to-pdf":        BubblePattern,
  "mymotor-web":        SpeedPattern,
  "estamp-platform":    StampPattern,
  "zoopsign-dashboard": BarPattern,
  "creator-ai":         NeuralPattern,
};

/* ── Animated floating initials ── */
function FloatingInitials({ text, color }: { text: string; color: string }) {
  const chars = text.toUpperCase().slice(0, 3).split("");
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none gap-1">
      {chars.map((ch, i) => (
        <span
          key={i}
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            fontSize: "clamp(4.5rem, 12vw, 8rem)",
            fontWeight: 400,
            lineHeight: 1,
            color,
            display: "inline-block",
            animation: `letterFloat ${2.8 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );
}

export function ProjectThumb({ study }: ProjectThumbProps) {
  /* derive short initials from the project title */
  const initials = study.title
    .split(/[\s·\-]+/)
    .filter(Boolean)
    .map(w => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const isDark = study.color.startsWith("#0") || study.color.startsWith("#1") || study.color === "#181610";
  const fgColor = isDark ? "#ffd177" : "#000000";
  const initialsColor = isDark ? "rgba(255,209,119,0.12)" : "rgba(0,0,0,0.10)";

  const Pattern = patternMap[study.id] ?? CircuitPattern;

  return (
    <div
      className="relative aspect-[3/2] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${study.color} 0%, ${study.colorAlt} 100%)` }}
    >
      {/* Animated SVG pattern — unique per project */}
      <Pattern fg={fgColor} />

      {/* Floating animated initials */}
      <FloatingInitials text={initials} color={initialsColor} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Year pill */}
      <div className="absolute top-4 right-4 rounded-full bg-black/15 px-3 py-1 backdrop-blur-sm">
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: fgColor, opacity: 0.7 }}>
          {study.year}
        </span>
      </div>

      {/* Tags — slide up on card hover */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1.5 p-4 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
        {study.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full bg-black/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
