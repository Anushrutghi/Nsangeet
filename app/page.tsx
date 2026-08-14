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
          src="/images/image.png"
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
