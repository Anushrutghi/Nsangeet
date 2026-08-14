import Image from "next/image";
import RadioPlayer from "./components/RadioPlayer";

const SPOTIFY_URL =
  "https://open.spotify.com/playlist/37i9dQZF1EIXmVJEYWsbyy";
const YT_MUSIC_URL =
  "https://music.youtube.com/playlist?list=RDATl9XfedG9wIDEw";

function PlatformIcon({ kind }: { kind: "spotify" | "youtube" }) {
  if (kind === "spotify") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
        <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.82 15.15a.87.87 0 0 1-1.2.29c-3.29-2.01-7.43-2.47-12.3-1.35a.87.87 0 1 1-.39-1.69c5.34-1.22 9.91-.7 13.6 1.55.4.24.53.77.29 1.2Zm1.62-3.6a1.09 1.09 0 0 1-1.5.36c-3.76-2.31-9.49-2.98-13.93-1.63a1.09 1.09 0 1 1-.63-2.08c5.08-1.54 11.4-.79 15.72 1.86.51.31.67.98.34 1.49Zm.14-3.75C14.08 6.66 7.27 6.42 3.27 7.63a1.31 1.31 0 0 1-.76-2.5c4.59-1.39 12.24-1.12 16.87 1.63a1.31 1.31 0 0 1-.8 2.54Z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <circle cx="12" cy="12" r="4" fill="white" />
      <path d="M12 5.2a6.8 6.8 0 0 1 5.89 3.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M17.89 15.4A6.8 6.8 0 0 1 12 18.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.11 15.4A6.8 6.8 0 0 1 6.11 12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="scene">
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/images/chiya-pasal.jpg"
          alt="Rai ko chiya pasal"
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18), transparent 35%, rgba(0,0,0,0.12))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: 1000,
            textAlign: "center",
            fontFamily: "var(--font-yatra-one), serif",
            color: "#f8f6f3",
            fontSize: "clamp(50px, 9vw, 130px)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: 0,
            textShadow:
              "0 3px 8px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.25)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div>राईको चिया</div>
          <div>पसल</div>
          <div
            className="story-text"
            style={{
              marginTop: 22,
              fontFamily: "var(--font-yatra-one), serif",
              fontSize: "clamp(11px, 1.5vw, 18px)",
              fontWeight: 400,
              lineHeight: 1.4,
              color: "rgb(255, 248, 235)",
              letterSpacing: 0.1,
              textShadow: "0 2px 6px rgba(0,0,0,0.45)",
              opacity: 0,
              animation: "storyFade 7s ease-in-out forwards",
            }}
          >
            तीन राईका स्वरहरू, एउटै चियाको धुवाँमा।
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: 6,
            borderRadius: 14,
            background: "rgba(0, 0, 0, 0.30)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 20,
          }}
        >
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify playlist"
            title="Spotify playlist"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 9px",
              borderRadius: 9,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: 0.3,
              background: "rgba(255,255,255,0.06)",
            }}
            className="platform-link"
          >
            <PlatformIcon kind="spotify" />
            <span>Spotify</span>
            <span style={{ fontSize: 12, opacity: 0.65 }}>↗</span>
          </a>
          <a
            href={YT_MUSIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube Music playlist"
            title="YouTube Music playlist"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 9px",
              borderRadius: 9,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: 0.3,
              background: "rgba(255,255,255,0.06)",
            }}
            className="platform-link"
          >
            <PlatformIcon kind="youtube" />
            <span>YouTube Music</span>
            <span style={{ fontSize: 12, opacity: 0.65 }}>↗</span>
          </a>
        </div>
      </div>

      <RadioPlayer />

      <div className="radio-credit">♫ रेडियो YouTube बाट बजिरहेको छ — streaming via YouTube</div>
    </div>
  );
}
