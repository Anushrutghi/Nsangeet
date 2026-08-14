import Image from "next/image";
import RadioPlayer from "./components/RadioPlayer";

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
            नेपाली स्वरहरू, एउटै चियाको धुवाँमा।
          </div>
        </div>
      </div>

      <RadioPlayer />

      <div className="radio-credit">♫ रेडियो YouTube बाट बजिरहेको छ — streaming via YouTube</div>
    </div>
  );
}
