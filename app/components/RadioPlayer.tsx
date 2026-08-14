"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
  videoId: string;
};

const QUEUE: Track[] = [
  { title: "Komal Tyo Timro", artist: "Sabin Rai", videoId: "sS1GinUOebo" },
  { title: "Ko Cha Ra", artist: "John Rai", videoId: "sse42u6x2wM" },
  { title: "Khai", artist: "Bartika Eam Rai", videoId: "H7ZODxg0yyY" },
  {
    title: "Timi Nai Hau",
    artist: "Sabin Rai & The Pharaoh",
    videoId: "0WQgceERyGo",
  },
  { title: "Sadhana", artist: "John Rai", videoId: "tsJtcam7m4U" },
  { title: "Najeek", artist: "Bartika Eam Rai", videoId: "AMRGmAh2NTk" },
  {
    title: "Ma Sansar Jitne",
    artist: "Sabin Rai & The Elektrix",
    videoId: "0FsK_xosi9g",
  },
  { title: "Hawa Jastai", artist: "John Rai", videoId: "K_XcqhPtmzo" },
  {
    title: "Nidari (Ko Nimti)",
    artist: "Bartika Eam Rai",
    videoId: "zrjXeGuxLTE",
  },
  { title: "Samjhana Harulai", artist: "Sabin Rai", videoId: "mZxsB_GGbBU" },
  { title: "Farkanna Hola", artist: "John Rai", videoId: "i6bI8MRkxBc" },
  { title: "Ghar", artist: "Bartika Eam Rai", videoId: "n7C7oXShSqE" },
  {
    title: "Baimaani",
    artist: "Sabin Rai & The Pharaoh",
    videoId: "Lb6-RvIZd-M",
  },
  { title: "Badal Sari", artist: "John Rai", videoId: "oGFn8MI3Bmo" },
  { title: "Timi Ra Ma", artist: "Bartika Eam Rai", videoId: "L3iJkQi7ilc" },
  {
    title: "Nilo Chata",
    artist: "Sabin Rai & The Pharaoh",
    videoId: "NV7fDgGkpqM",
  },
  { title: "Maya Garnu La", artist: "John Rai", videoId: "zt15lLuMVmE" },
  { title: "Umer", artist: "Bartika Eam Rai", videoId: "ZCqqt0R74vk" },
];

// Fallback length used when the simulated player is active (no YouTube API).
const DURATION = 240;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// YouTube player states
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

export default function RadioPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(DURATION);
  const [fade, setFade] = useState(true);
  const [mode, setMode] = useState<"loading" | "yt" | "sim">("loading");

  const playerRef = useRef<YTPlayer | null>(null);
  const indexRef = useRef(0);
  const errorCountRef = useRef(0);

  const track = QUEUE[index];

  // Keep a ref in sync so YouTube event callbacks never see a stale index.
  // playerRef.current is only set in onReady, so it doubles as our "yt mode"
  // flag without relying on possibly-stale state in event callbacks.
  const goTo = (nextIndex: number) => {
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setElapsed(0);
    setFade(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFade(true)));
    if (playerRef.current) {
      playerRef.current.loadVideoById(QUEUE[nextIndex].videoId);
      playerRef.current.playVideo();
    }
  };

  const skip = (dir: 1 | -1) => {
    goTo((indexRef.current + dir + QUEUE.length) % QUEUE.length);
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (playing) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
      return;
    }
    setPlaying((p) => !p);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const target = ratio * duration;
    if (mode === "yt" && playerRef.current) {
      playerRef.current.seekTo(target, true);
    }
    setElapsed(target);
  };

  // Load the YouTube IFrame API and create the hidden player.
  useEffect(() => {
    let cancelled = false;

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled && !playerRef.current) setMode("sim");
    }, 6000);

    const create = () => {
      if (cancelled || playerRef.current || !window.YT?.Player) return;
      try {
        new window.YT.Player("raichiya-yt-player", {
          videoId: QUEUE[0].videoId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (e) => {
              playerRef.current = e.target;
              errorCountRef.current = 0;
              setMode("yt");
              setPlaying(false); // autoplay with sound is usually blocked; wait for state
              e.target.playVideo();
            },
            onStateChange: (e) => {
              if (e.data === YT_ENDED) {
                goTo((indexRef.current + 1) % QUEUE.length);
              } else if (e.data === YT_PLAYING) {
                setPlaying(true);
              } else if (e.data === YT_PAUSED) {
                setPlaying(false);
              }
            },
            onError: () => {
              // A single video being unavailable shouldn't stop the radio —
              // skip to the next track like a real station would. If several
              // fail in a row (e.g. region-blocked), fall back to the sim.
              errorCountRef.current += 1;
              if (errorCountRef.current >= 3) {
                // Give up on YouTube entirely and run the simulated player.
                playerRef.current?.destroy();
                playerRef.current = null;
                setMode("sim");
                return;
              }
              goTo((indexRef.current + 1) % QUEUE.length);
            },
          },
        });
      } catch {
        // The API isn't usable — fall back to the simulated player.
        setMode("sim");
      }
    };

    if (window.YT?.Player) {
      create();
    } else {
      window.onYouTubeIframeAPIReady = create;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  // Drive progress — read the real player in "yt" mode, tick a timer in "sim".
  useEffect(() => {
    if (mode === "loading") return;
    const timer = window.setInterval(() => {
      if (mode === "yt") {
        const p = playerRef.current;
        if (!p) return;
        try {
          const state = p.getPlayerState();
          if (state === YT_PLAYING || state === 3) {
            setPlaying(true);
            setElapsed(p.getCurrentTime());
          } else if (state === YT_PAUSED) {
            setPlaying(false);
          }
          const dur = p.getDuration();
          if (dur > 0) setDuration(dur);
        } catch {
          // ignore transient player errors
        }
        return;
      }
      if (!playing) return;
      setElapsed((e) => {
        if (e + 1 >= duration) {
          goTo((indexRef.current + 1) % QUEUE.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, playing, duration]);

  const progress = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(100, (elapsed / duration) * 100);
  }, [elapsed, duration]);

  return (
    <div className="glass-player">
      <div
        id="raichiya-yt-player"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          width: 320,
          height: 180,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div className="player-top">
        <span className={`status-dot ${playing ? "active" : ""}`} />
        {playing ? "ON AIR" : "PAUSED"}
        <span>RADIO</span>
        <span>माछापुच्छ्रे FM</span>
      </div>

      <div className="song-info" key={index}>
        <div className={`song-title ${fade ? "song-fade" : ""}`}>{track.title}</div>
        <div className="song-artist">{track.artist}</div>
      </div>

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
        <span>{formatTime(duration)}</span>
      </div>

      <div
        className="glass-progress"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(elapsed)}
        onClick={seek}
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
          onClick={togglePlay}
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

      <div className="keyboard-hint">
        {mode === "yt" && !playing
          ? "बजाउन थाल्नुहोस् ▶ — चिया तातो छ"
          : "साबिन • जोन • बर्तिका — चिया तातो छ, रेडियो चलिरहेको छ"}
      </div>
    </div>
  );
}
