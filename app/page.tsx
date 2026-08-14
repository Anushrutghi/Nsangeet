import Image from "next/image";
import RadioPlayer from "./components/RadioPlayer";

// Deterministic particle config (fixed values so SSR == client).
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  key: i,
  left: `${(i * 61 + 7) % 100}%`,
  size: 3 + (i % 3) * 2,
  duration: 9 + (i % 5) * 2.4,
  delay: `${(i * 1.7) % 12}s`,
  opacity: 0.35 + (i % 4) * 0.13,
  sway: `${((i % 2 === 0 ? 1 : -1) * (22 + (i % 4) * 14))}px`,
}));

export default function Home() {
  return (
    <div className="scene">
      <div className="bg-stage">
        {/* Cartoon posterize filter — flattens the photo into bold bands */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="cartoonFilter" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1" />
              <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1" />
              <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1" />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="1.3" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.05" intercept="-0.02" />
              <feFuncG type="linear" slope="1.05" intercept="-0.02" />
              <feFuncB type="linear" slope="1.05" intercept="-0.02" />
            </feComponentTransfer>
          </filter>
        </svg>

        <Image
          src="/images/image.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="bg-image"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Breathing warm grade */}
        <div className="bg-grade" />
        {/* Soft vignette to focus the middle */}
        <div className="bg-vignette" />

        {/* Drifting embers / notes — dreamy, like the song */}
        <div className="particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <span
              key={p.key}
              className="particle"
              style={
                {
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  "--dur": `${p.duration}s`,
                  "--delay": p.delay,
                  "--op": p.opacity,
                  "--sway": p.sway,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="brand-header">
          <Image
            src="/images/nsangeet-logo.png"
            alt="Nsangeet logo"
            width={64}
            height={48}
            priority
            className="brand-logo"
          />
          <div className="brand-text">
            <div className="brand-name">Nsangeet</div>
            <div className="brand-tagline">नेपाली संगीतको रेडियो</div>
          </div>
        </div>
      </div>

      <RadioPlayer />
    </div>
  );
}
