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
          alt=""
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
              "linear-gradient(180deg, rgba(0,0,0,0.25), transparent 40%, rgba(0,0,0,0.18))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div className="hero-brand">
          <div className="hero-logo">
            <Image
              src="/images/nsangeet-logo.png"
              alt="Nsangeet logo"
              width={300}
              height={226}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div className="hero-title">Nsangeet</div>
          <div className="hero-tagline">
            नेपाली संगीतको रेडियो — ९ कलाकार, ४५ गीत
          </div>
        </div>
      </div>

      <RadioPlayer />

      <div className="radio-credit">♫ रेडियो YouTube बाट बजिरहेको छ — streaming via YouTube</div>
    </div>
  );
}
