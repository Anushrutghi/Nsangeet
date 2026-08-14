import Image from "next/image";
import RadioPlayer from "./components/RadioPlayer";

export default function Home() {
  return (
    <div className="scene">
      <div className="bg-stage">
        <Image
          src="/images/image-hd.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={100}
          suppressHydrationWarning
          className="bg-image"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        <div className="brand-header" suppressHydrationWarning>
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
