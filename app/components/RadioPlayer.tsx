"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
};

const QUEUE: Track[] = [
  { title: "Komal Tyo Timro", artist: "Sabin Rai" },
  { title: "Ko Cha Ra", artist: "John Rai" },
  { title: "Khai", artist: "Bartika Eam Rai" },
  { title: "Timi Nai Hau", artist: "Sabin Rai & The Pharaoh" },
  { title: "Sadhana", artist: "John Rai" },
  { title: "Najeek", artist: "Bartika Eam Rai" },
  { title: "Ma Sansar Jitne", artist: "Sabin Rai" },
  { title: "Hawa Jastai", artist: "John Rai" },
  { title: "Nidari (Ko Nimti)", artist: "Bartika Eam Rai" },
  { title: "Samjhana Harulai", artist: "Sabin Rai" },
  { title: "Farkanna Hola", artist: "John Rai" },
  { title: "Ghar", artist: "Bartika Eam Rai" },
  { title: "Baimaani", artist: "Sabin Rai & The Pharaoh" },
  { title: "Badal Sari", artist: "John Rai" },
  { title: "Timi Ra Ma", artist: "Bartika Eam Rai" },
  { title: "Nilo Chata", artist: "Sabin Rai & The Pharaoh" },
  { title: "Maya Garnu La", artist: "John Rai" },
  { title: "Umer", artist: "Bartika Eam Rai" },
];

const DURATION = 240;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function RadioPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [fade, setFade] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = QUEUE[index];

  useEffect(() => {
    if (!playing) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= DURATION) {
          setIndex((i) => (i + 1) % QUEUE.length);
          setFade(false);
          requestAnimationFrame(() => requestAnimationFrame(() => setFade(true)));
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const skip = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + QUEUE.length) % QUEUE.length);
    setElapsed(0);
    setFade(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFade(true)));
  };

  const progress = useMemo(() => (elapsed / DURATION) * 100, [elapsed]);

  return (
    <div className="glass-player">
      <div className="player-top">
        <span className={`status-dot ${playing ? "active" : ""}`} />
        {playing ? "ON AIR" : "PAUSED"}
        <span>RADIO</span>
        <span>माछापुच्छ्रे FM</span>
      </div>

      <div className="song-info" key={`${index}-${elapsed}`}>
        <div className={`song-title ${fade ? "song-fade" : ""}`}>{track.title}</div>
        <div className="song-artist">{track.artist}</div>
      </div>

      <div className="song-artist" style={{ display: "none" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
          fontSize: 10,
          color: "hsla(0,0%,100%,0.55)",
        }}
      >
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(DURATION)}</span>
      </div>

      <div
        className="glass-progress"
        style={{
          position: "relative",
          width: "100%",
          height: 5,
          borderRadius: 20,
          background: "hsla(0,0%,100%,0.18)",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="glass-progress-fill"
          style={{
            height: "100%",
            borderRadius: "inherit",
            background: "linear-gradient(90deg, #d9ad50, #ffe19a)",
            boxShadow: "0 0 8px rgba(255,218,130,0.55)",
            transition: "width 1s linear",
            width: `${progress}%`,
          }}
        />
      </div>

      <div
        className="glass-controls"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 26,
          marginTop: 19,
        }}
      >
        <button
          type="button"
          aria-label="Previous song"
          onClick={() => skip(-1)}
          className="glass-btn secondary"
          style={{
            border: "1px solid hsla(0,0%,100%,0.18)",
            cursor: "pointer",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "hsla(0,0%,100%,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: 18,
            color: "hsla(0,0%,100%,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>⏮</span>
        </button>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="glass-btn main"
          style={{
            border: "1px solid hsla(0,0%,100%,0.4)",
            cursor: "pointer",
            width: 58,
            height: 58,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, hsla(0,0%,100%,0.3), hsla(0,0%,100%,0.12))",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.25), inset 0 1px 0 hsla(0,0%,100%,0.35)",
            fontSize: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="play-icon" style={{ marginLeft: playing ? 0 : 3 }}>
            {playing ? "⏸" : "▶"}
          </span>
        </button>
        <button
          type="button"
          aria-label="Next song"
          onClick={() => skip(1)}
          className="glass-btn secondary"
          style={{
            border: "1px solid hsla(0,0%,100%,0.18)",
            cursor: "pointer",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "hsla(0,0%,100%,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: 18,
            color: "hsla(0,0%,100%,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>⏭</span>
        </button>
      </div>

      <div className="keyboard-hint">साबिन • जोन • बर्तिका — चिया तातो छ, रेडियो चलिरहेको छ</div>
    </div>
  );
}
