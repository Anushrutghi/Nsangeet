"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
  videoId: string;
};

type Artist = {
  id: string;
  name: string;
  tracks: Track[];
};

const ARTISTS: Artist[] = [
  {
    id: "sabin",
    name: "Sabin Rai",
    tracks: [
      { title: "Komal Tyo Timro", artist: "Sabin Rai", videoId: "sS1GinUOebo" },
      {
        title: "Timi Nai Hau",
        artist: "Sabin Rai & The Pharaoh",
        videoId: "0WQgceERyGo",
      },
      {
        title: "Ma Sansar Jitne",
        artist: "Sabin Rai & The Elektrix",
        videoId: "0FsK_xosi9g",
      },
      { title: "Samjhana Harulai", artist: "Sabin Rai", videoId: "mZxsB_GGbBU" },
      {
        title: "Baimaani",
        artist: "Sabin Rai & The Pharaoh",
        videoId: "Lb6-RvIZd-M",
      },
    ],
  },
  {
    id: "john",
    name: "John Rai",
    tracks: [
      { title: "Ko Cha Ra", artist: "John Rai", videoId: "sse42u6x2wM" },
      { title: "Sadhana", artist: "John Rai", videoId: "tsJtcam7m4U" },
      { title: "Hawa Jastai", artist: "John Rai", videoId: "K_XcqhPtmzo" },
      { title: "Farkanna Hola", artist: "John Rai", videoId: "i6bI8MRkxBc" },
      { title: "Badal Sari", artist: "John Rai", videoId: "oGFn8MI3Bmo" },
    ],
  },
  {
    id: "bartika",
    name: "Bartika Eam Rai",
    tracks: [
      { title: "Khai", artist: "Bartika Eam Rai", videoId: "H7ZODxg0yyY" },
      { title: "Najeek", artist: "Bartika Eam Rai", videoId: "AMRGmAh2NTk" },
      {
        title: "Nidari (Ko Nimti)",
        artist: "Bartika Eam Rai",
        videoId: "zrjXeGuxLTE",
      },
      { title: "Ghar", artist: "Bartika Eam Rai", videoId: "n7C7oXShSqE" },
      { title: "Umer", artist: "Bartika Eam Rai", videoId: "ZCqqt0R74vk" },
    ],
  },
  {
    id: "ankita",
    name: "Ankita Pun",
    tracks: [
      { title: "Maili", artist: "Ankita Pun", videoId: "LFSU-SqMrgk" },
      {
        title: "Maya Ta Yestai Ho",
        artist: "Ankita Pun",
        videoId: "dR2vjMp1wtg",
      },
      { title: "Purano Baasna", artist: "Ankita Pun", videoId: "_Tdp6Nt8x9o" },
      { title: "Shizenro", artist: "Ankita Pun", videoId: "1SKsK5vBU2Q" },
      { title: "Putali Aau", artist: "Ankita Pun", videoId: "cOxE0vG03H8" },
    ],
  },
  {
    id: "sajjan",
    name: "Sajjan Raj Vaidya",
    tracks: [
      { title: "Sasto Mutu", artist: "Sajjan Raj Vaidya", videoId: "XcEC2q4CotY" },
      {
        title: "Hataarindai, Bataasindai",
        artist: "Sajjan Raj Vaidya",
        videoId: "Ogr6ygCwRwc",
      },
      { title: "Suna Kaanchi", artist: "Sajjan Raj Vaidya", videoId: "17l66cbys_M" },
      { title: "Dhairya", artist: "Sajjan Raj Vaidya", videoId: "6FEsFvZ-hqY" },
      { title: "Naganya Maya", artist: "Sajjan Raj Vaidya", videoId: "csoXwcbmNLw" },
    ],
  },
  {
    id: "sushant",
    name: "Sushant KC",
    tracks: [
      {
        title: "Bardali",
        artist: "Sushant KC ft. Indrakala Rai",
        videoId: "HAcLoqZO-Z0",
      },
      { title: "Sarangi", artist: "Sushant KC", videoId: "Sh8ZYHnb86c" },
      { title: "Risaune Bhaye", artist: "Sushant KC", videoId: "cNBmzxE6Jf0" },
      {
        title: "Parkha Na",
        artist: "Sushant KC ft. Jhuma Limbu",
        videoId: "qQujA8u1zGI",
      },
      { title: "Sathi", artist: "Sushant KC", videoId: "7aoDZ8UeUxU" },
    ],
  },
  {
    id: "samir",
    name: "Samir Shrestha",
    tracks: [
      { title: "Thamana Haat", artist: "Samir Shrestha", videoId: "qyRrUEInzAs" },
      { title: "Hera Na", artist: "Samir Shrestha", videoId: "hev768NSXJQ" },
      { title: "Bujhideu", artist: "Samir Shrestha", videoId: "SbcPNZxvi0U" },
      {
        title: "Timi Bhayea Kafi",
        artist: "Samir Shrestha",
        videoId: "QTmWmHltYjM",
      },
      { title: "Timiley", artist: "Samir Shrestha", videoId: "1kgREda5OYw" },
    ],
  },
  {
    id: "elements",
    name: "The Elements",
    tracks: [
      {
        title: "Birsiney Hau Ki",
        artist: "The Elements",
        videoId: "H7bzyggFYSE",
      },
      { title: "Putali", artist: "The Elements", videoId: "nVJJ_ivgELA" },
      {
        title: "Sapana Ko Mayalu",
        artist: "The Elements",
        videoId: "hLpsSw0trak",
      },
      { title: "Oiliyeko Phool", artist: "The Elements", videoId: "0u6Copa54bM" },
      { title: "Tesaile Hidey Ma", artist: "The Elements", videoId: "O53HANUi7wc" },
    ],
  },
  {
    id: "tribalrain",
    name: "The Tribal Rain",
    tracks: [
      { title: "Bhanai", artist: "The Tribal Rain", videoId: "lPYZWN3O4lM" },
      { title: "Chinta", artist: "The Tribal Rain", videoId: "eARHYHeH2Gk" },
      { title: "Narisauna", artist: "The Tribal Rain", videoId: "LeVTfD6U5jA" },
      {
        title: "Jiunu Nai Hola",
        artist: "The Tribal Rain",
        videoId: "Zlh_5Eo91rY",
      },
      { title: "Laijau Malai", artist: "The Tribal Rain", videoId: "BB_GHTPRsh4" },
    ],
  },
];

const SPOTIFY_URL =
  "https://open.spotify.com/playlist/37i9dQZF1EIXmVJEYWsbyy";
const YT_MUSIC_URL =
  "https://music.youtube.com/playlist?list=RDATl9XfedG9wIDEw";

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
      loaded?: number;
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
  }
}

// YouTube player states
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

function PlatformIcon({ kind }: { kind: "spotify" | "youtube" }) {
  if (kind === "spotify") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
        <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.82 15.15a.87.87 0 0 1-1.2.29c-3.29-2.01-7.43-2.47-12.3-1.35a.87.87 0 1 1-.39-1.69c5.34-1.22 9.91-.7 13.6 1.55.4.24.53.77.29 1.2Zm1.62-3.6a1.09 1.09 0 0 1-1.5.36c-3.76-2.31-9.49-2.98-13.93-1.63a1.09 1.09 0 1 1-.63-2.08c5.08-1.54 11.4-.79 15.72 1.86.51.31.67.98.34 1.49Zm.14-3.75C14.08 6.66 7.27 6.42 3.27 7.63a1.31 1.31 0 0 1-.76-2.5c4.59-1.39 12.24-1.12 16.87 1.63a1.31 1.31 0 0 1-.8 2.54Z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <circle cx="12" cy="12" r="4" fill="white" />
      <path d="M12 5.2a6.8 6.8 0 0 1 5.89 3.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M17.89 15.4A6.8 6.8 0 0 1 12 18.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.11 15.4A6.8 6.8 0 0 1 6.11 12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function RadioPlayer() {
  const [artistId, setArtistId] = useState(ARTISTS[0].id);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(DURATION);
  const [fade, setFade] = useState(true);
  const [mode, setMode] = useState<"loading" | "yt" | "sim">("loading");
  const [menuOpen, setMenuOpen] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const indexRef = useRef(0);
  const tracksRef = useRef<Track[]>(ARTISTS[0].tracks);
  const errorCountRef = useRef(0);

  const artist = ARTISTS.find((a) => a.id === artistId) ?? ARTISTS[0];
  const tracks = artist.tracks;
  const track = tracks[index];

  // Keep refs in sync so YouTube event callbacks and the progress interval
  // never see a stale index or stale artist track list after switching.
  // playerRef.current is only set in onReady, so it doubles as our "yt mode"
  // flag without relying on possibly-stale state in event callbacks.
  const goTo = (nextIndex: number) => {
    const list = tracksRef.current;
    const target = (nextIndex + list.length) % list.length;
    indexRef.current = target;
    setIndex(target);
    setElapsed(0);
    setFade(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFade(true)));
    if (playerRef.current) {
      playerRef.current.loadVideoById(list[target].videoId);
      playerRef.current.playVideo();
    }
  };

  const skip = (dir: 1 | -1) => {
    goTo(indexRef.current + dir);
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

  const switchArtist = (id: string) => {
    if (id === artistId) {
      setMenuOpen(false);
      return;
    }
    setArtistId(id);
    const next = ARTISTS.find((a) => a.id === id) ?? ARTISTS[0];
    tracksRef.current = next.tracks;
    indexRef.current = 0;
    setIndex(0);
    setElapsed(0);
    setDuration(DURATION);
    setFade(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFade(true)));
    if (playerRef.current) {
      playerRef.current.loadVideoById(next.tracks[0].videoId);
      playerRef.current.playVideo();
    }
    setMenuOpen(false);
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
          videoId: ARTISTS[0].tracks[0].videoId,
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
                goTo(indexRef.current + 1);
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
              goTo(indexRef.current + 1);
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
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);

      // The API exposes YT asynchronously; poll instead of relying on the
      // global onYouTubeIframeAPIReady callback. YT.loaded flips to 1 only
      // after the player library is ready to construct.
      const poll = window.setInterval(() => {
        if (window.YT?.loaded === 1 && window.YT.Player && !playerRef.current) {
          window.clearInterval(poll);
          create();
        }
      }, 200);

      return () => {
        cancelled = true;
        window.clearTimeout(fallbackTimer);
        window.clearInterval(poll);
        playerRef.current?.destroy();
        playerRef.current = null;
      };
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
          goTo(indexRef.current + 1);
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
    <>
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

      {/* Top-right: platform links + artist switcher */}
      <div className="topbar-cluster">
        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify playlist"
          title="Spotify playlist"
          className="platform-link"
        >
          <PlatformIcon kind="spotify" />
          <span>Spotify</span>
          <span className="topbar-arrow">↗</span>
        </a>
        <a
          href={YT_MUSIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Music playlist"
          title="YouTube Music playlist"
          className="platform-link"
        >
          <PlatformIcon kind="youtube" />
          <span>YouTube Music</span>
          <span className="topbar-arrow">↗</span>
        </a>

        <span className="topbar-divider" aria-hidden="true" />

        <button
          type="button"
          aria-label="Choose artist"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="menu-btn"
        >
          <span className="menu-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        {menuOpen && (
          <>
            <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
            <div className="artist-menu" role="menu">
              <div className="artist-menu-label">गायक छान्नुहोस् — choose artist</div>
              {ARTISTS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="menuitem"
                  onClick={() => switchArtist(a.id)}
                  className={`artist-menu-item ${
                    a.id === artistId ? "active" : ""
                  }`}
                >
                  <span className="artist-menu-name">{a.name}</span>
                  <span className="artist-menu-count">{a.tracks.length} songs</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom: glass radio player */}
      <div className="glass-player">
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

        <div className="player-times">
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

        <div className="glass-controls">
          <button
            type="button"
            aria-label="Previous song"
            onClick={() => skip(-1)}
            className="glass-btn secondary"
          >
            <span>⏮</span>
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className="glass-btn main"
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
          >
            <span>⏭</span>
          </button>
        </div>

        <div className="keyboard-hint">
          {mode === "yt" && !playing
            ? "बजाउन थाल्नुहोस् ▶ — Nsangeet"
            : `${artist.name} बजिरहेको छ — Nsangeet, रेडियो चलिरहेको छ`}
        </div>
      </div>
    </>
  );
}
