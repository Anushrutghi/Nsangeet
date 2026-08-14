import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type LrcLibItem = {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string | null;
  duration: number;
  instrumental: boolean;
  plainLyrics: string | null;
  syncedLyrics: string | null;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const artist = searchParams.get("artist")?.trim() ?? "";
  const track = searchParams.get("track")?.trim() ?? "";

  if (!artist || !track) {
    return NextResponse.json(
      { error: "artist and track are required" },
      { status: 400 }
    );
  }

  const query = encodeURIComponent(`${artist} ${track}`);
  const res = await fetch(`https://lrclib.net/api/search?q=${query}`, {
    headers: {
      "User-Agent": "NsangeetRadio/1.0 (https://localhost:3000)",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `lyrics service error ${res.status}` },
      { status: 502 }
    );
  }

  let results: LrcLibItem[];
  try {
    results = (await res.json()) as LrcLibItem[];
  } catch {
    return NextResponse.json({ error: "bad lyrics response" }, { status: 502 });
  }

  const artistNorm = normalize(artist);
  const trackNorm = normalize(track);

  const score = (item: LrcLibItem) => {
    let s = 0;
    const a = normalize(item.artistName ?? "");
    const t = normalize(item.trackName ?? "");
    if (a.includes(artistNorm) || artistNorm.includes(a)) s += 2;
    if (t.includes(trackNorm) || trackNorm.includes(t)) s += 2;
    if (item.instrumental) s -= 3;
    if (item.plainLyrics) s += 1;
    if (item.syncedLyrics) s += 2;
    return s;
  };

  const ranked = [...results].sort((x, y) => score(y) - score(x));
  const best = ranked.find(
    (r) =>
      r.plainLyrics &&
      (normalize(r.artistName ?? "").includes(artistNorm) ||
        artistNorm.includes(normalize(r.artistName ?? "")))
  );

  if (!best) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: best.trackName,
    artist: best.artistName,
    syncedLyrics: best.syncedLyrics,
    plainLyrics: best.plainLyrics,
  });
}
