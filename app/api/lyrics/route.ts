import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Stable LRCLIB IDs for every track that exists in their database.
// Fetching by ID is a single deterministic request — no flaky search,
// no rate-limit pileups when songs change quickly.
const LRCLIB_IDS: Record<string, number> = {
  "sabinrai|komaltyotimro": 35465478,
  "sabinraithepharaoh|timinaihau": 6587858,
  "sabinraithepharaoh|baimaani": 8099675,
  "johnrai|sadhana": 9420659,
  "johnrai|hawajastai": 10595509,
  "johnrai|farkannahola": 35336433,
  "johnrai|badalsari": 25693646,
  "bartikaeamrai|khai": 9097605,
  "bartikaeamrai|najeek": 9420664,
  "bartikaeamrai|nidarikonimti": 28150161,
  "bartikaeamrai|ghar": 3077510,
  "bartikaeamrai|umer": 3077651,
  "ankitapun|maili": 11595677,
  "ankitapun|mayatayestaiho": 27961417,
  "ankitapun|puranobaasna": 35552735,
  "ankitapun|shizenro": 34674968,
  "sajjanrajvaidya|sastomutu": 7836693,
  "sajjanrajvaidya|hataarindaibataasindai": 35811401,
  "sajjanrajvaidya|sunakaanchi": 7526743,
  "sajjanrajvaidya|dhairya": 7423139,
  "sajjanrajvaidya|naganyamaya": 4920054,
  "sushantkcftindrakalarai|bardali": 14481407,
  "sushantkc|sarangi": 12305094,
  "sushantkc|risaunebhaye": 36439379,
  "sushantkcftjhumalimbu|parkhana": 15826970,
  "sushantkc|sathi": 7064034,
  "samirshrestha|thamanahaat": 34507974,
  "samirshrestha|herana": 12389676,
  "samirshrestha|bujhideu": 7716373,
  // These IDs carry synced lyrics; the plain-only records for the same
  // songs are avoided so every track gets karaoke highlighting.
  "samirshrestha|timibhayeakafi": 34614278,
  "samirshrestha|timiley": 25016368,
  "theelements|birsineyhauki": 34562999,
  "theelements|putali": 35813116,
  "theelements|sapanakomayalu": 35251162,
  "theelements|oiliyekophool": 6981813,
  "theelements|tesailehideyma": 4833074,
  "thetribalrain|bhanai": 12311867,
  "thetribalrain|chinta": 12377131,
  "thetribalrain|jiununaihola": 35144057,
  "thetribalrain|laijaumalai": 23348739,
};

// Simple in-memory cache (per server process) so repeat plays are
// instant and never touch LRCLIB again.
const cache = new Map<string, { data: Record<string, unknown>; expires: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

function cached(key: string) {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.data;
  if (hit) cache.delete(key);
  return null;
}

function remember(key: string, data: Record<string, unknown>) {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL });
}

// Some tracks aren't in LRCLIB's database (or only under a misspelled
// title). Keep a small curated fallback so every song on the radio shows
// lyrics instead of "not found". Plain text — the player renders these
// without the karaoke highlight.
const FALLBACK_LYRICS: Record<string, string> = {
  "sabinrai|masansarjitne": `म संसार जित्ने आठ गर्दै छु
मात्र तिमि मेरो साथ् बसिदेउ
भबिष्य ले गाउने गीत म रच्दै छु
मात्र तिमि सुर मा ताल मिलाई देउ
यहि हो आर्थ रच्नु को
इतिहास मा अमर रहोस
तिम्रो मेरो कहानी सधै सधै

जब हिड्दा हिड्दा थाक्छु म कहिले कहिँ
त्यति बेला मेरो आड बनि देउ
जिन्दगि को मोडमा सोच्न सकिन भने
तिम्रो मिठो विचार मलाई देउ
यहि हो अर्थ भन्नु को
सपना ठुलो छैन
बिलौना गर्न नपरोस
जिन्दगीमा

सुनौलो हाम्रो भबिष्य
साकार हुन्छ मलाई भरोसा छ
म हरपल तिम्रो रक्षा गर्ने छु
मात्र तिमि आत्मबल बनिदेउ

म संसार जित्ने आठ गर्दै छु
मात्र तिमि मेरो साथ् बसिदेउ`,
  "sabinrai|samjhanaharulai": `सम्झना हरुलाई अंगाल्दै यो जीवन बिताउछु
के गर्नु भाग्य यस्तै थियो भनेर बुझौछु
म रोए पनि तिमी कहिले नरुनु
उसको अंगालोमा बाँधी हरपल हासी रहनु
यस्तै भयो मैले माया लाउन जनिना
मेरो सारा खुसी तिमीलाई दिन कहिले सकिन
तेसैले होला मै रुनु पर्यो आन्त्यामा

ठिकै हो तिम्र हरेक इक्ष्य पुरौना सक्दिन थे
तिम्ले मग्योउ भने चन्द्रमा सामु ल्याउन सक्दिन थे
सेतो कफन ओडी दिदा म, तिमी बेहुली भैदिनु
मेरो लाश बोकी लादा तिमी डोली चाडदिनु
यो जनाममा तिमी मेरो होइनौ रहेछ
खुसी थिए हासी दिदा हासो मेरो होइन रहेछ
तेसैले होला मै रुनु पर्यो आन्त्यामा

गएर नजिक माया दिन सकिन
चाहेर पनि तिमीलाई भुल्न सकिन
मान् रोए पनि यो देखौना सकिन
नयन रसे पनि आँसु झरना सकिन
तेसैले होला मै रुनु पर्यो आन्त्यामा`,
  "johnrai|kochara": `को छ र तिमीलाई
को छ र तिमीलाई आजा बुझिदिने
तिम्रा मनका
तिम्रा मनका कुरा सबै सोधिदिने

आकाश छुने रहर
तिम्रो पनि कति होला
एक्लै बस्दा आँशु
नयना बाट झर्दा
पीडा हुन्छ

तिम्रो मन दुख्यो होला
दुखाउने लाई के थाहा
कति सपना बग्य होला
नदेख्ने लाई के थाहा

को छ र तिमीलाई
को छ र तिमीलाई आजा बुझिदिने
तिम्रा मनका
तिम्रा मनका कुरा सबै सोधिदिने`,
  "johnrai|mayagarnula": `माया गर्नु ल
माया गर्नु ल
कति बाँच्छु खै
माया गर्नु ल

सँगै राख्नु ल
हात नछोडेर
जति बाँचे नि
माया गर्नु ल

टाढा गएनि मलाई
नबिर्सिदिनु ल
त्यो मन भरी को माया
दिएरै जानु ल

मोहनी लायौ आँखैले
जानी नजानी फसे
टाढा गएनि मलाई
नबिर्सिदिनु ल
त्यो मन भरी को माया
दिएरै जानु ल

माया गर्नु ल
माया गर्नु ल
जति बाँचे नि
माया गर्नु ल`,
  "ankitapun|putaliaau": `चिसो चिसो मौसममा
तिम्रो न्यानो अंगालो
मायाको त्यो गलबन्दीले
बाँधी राख है
सिरी सिरी हावामा
मायालुका गीत हरू
सधै भरी यसरी नै
बगी रहोस है

तिमी आऊ… पुतली आऊ…
मलाई अंगाल… तिम्रो त्यो रंगी विरंगी
पखेटा मा…

सानो सानो बंगेरी
नाच्दै आउँछन तिमी तिरै
कालो कालो केशमा
फुला हरू सजाउँछन
रंगी चंगी फरिया
गोलो गोलो घुमाउछौ
कालो कालो आँखाहरू
वारी पारी दुलाउछौ

तिमी आऊ… पुतली आऊ…
मलाई अंगाल… तिम्रो त्यो रंगी विरंगी
पखेटा मा…`,
  "thetribalrain|narisauna": `नरिसाउना तिमी बिना मेरो जीवन शुन्य छ
नरिसाउना तिमी नै हौ मेरो एउटै सपना
तिम्रै लागि मैले संसार लाई भुलि दिए
तिम्रो लागि म आफु जिउन भुलि दिए

आखा मा आँशु तिम्रो साउदैन
खै मैले त माया लाउनु जानिन रैछु
हामीले सँगै बिताएका दिन हरु याद हरु
एउटा सपना सम्झी न भुलि दिनु

यो माया भने के हो?
तिमी बाट थाहा पाए मैले
म देखी टाढा नजाऊ
बिर्सी सके आफैलाई तिम्रो लागि
तिम्रो लागि

नरिसाउना अब निकाली देउ यो एक्लोपन देखी
सुखमा हाँसी दुखमा रुई दिउला तिम्रो लागि
नरिसाउना न तिमीलाई मेरो याद आउने छ
मन दुखाए पनि यो मन नतोडिदेउ

आखा मा आँशु तिम्रो साउदैन
खै मैले त माया लाउनु जानिन रैछु
हामीले सँगै बिताएका दिन हरु याद हरु
एउटा सपना सम्झी न भुलि दिनु

तर सबै ठिकै लाग्छ जब तिमी
भन्ने गर्छौ यस्तै हुँदो रैछ माया भने
तर सबै ठिकै लाग्छ जब तिमी
भन्ने गर्छौ यस्तै हुँदो रैछ माया भने`,
};

// LRCLIB stores some titles under a different spelling than the app uses.
const TRACK_ALIASES: Record<string, string> = {
  // LRCLIB indexes this title with a typo; keys are normalized.
  laijaumalai: "laijaw malai",
};

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

/** Artist search variants — "The Tribal Rain" also matches "Tribal Rain". */
function artistVariants(artist: string): string[] {
  const variants = new Set<string>([artist]);
  const stripped = artist.replace(/^(the|a)\s+/i, "").trim();
  if (stripped && stripped !== artist) variants.add(stripped);
  return [...variants];
}

/**
 * Levenshtein distance — lets "Laijau Malai" match LRCLIB's
 * "Laijaw Malai" typo.
 */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/**
 * How well a candidate matches our track. Returns a score; the best
 * candidate wins even when names differ slightly (typos in LRCLIB data
 * like "Laijaw Malai" vs "Laijau Malai").
 */
function matchScore(
  item: LrcLibItem,
  artistNorm: string,
  trackNorm: string,
  targetDuration: number | null = null
): number {
  const a = normalize(item.artistName ?? "");
  const t = normalize(item.trackName ?? "");
  let s = 0;
  // Prefer the record that matches the video's length — LRCLIB holds
  // multiple versions (studio, live, shortened edits) of the same song,
  // and only the version whose duration matches the video will highlight
  // in time.
  if (targetDuration && item.duration) {
    const diff = Math.abs(item.duration - targetDuration);
    if (diff <= 6) s += 3;
    else if (diff <= 15) s += 1;
  }
  if (a === artistNorm) s += 6;
  else if (a.includes(artistNorm) || artistNorm.includes(a)) s += 4;
  else if (a.includes(artistNorm.slice(0, Math.max(4, artistNorm.length - 2)))) s += 2;

  if (t === trackNorm) s += 6;
  else if (t.includes(trackNorm) || trackNorm.includes(t)) s += 4;
  else {
    // fuzzy: share of the shorter name that appears in the longer one
    const short = t.length <= trackNorm.length ? t : trackNorm;
    const long = t.length <= trackNorm.length ? trackNorm : t;
    if (short.length >= 4 && long.includes(short)) s += 3;
    // edit distance: catch typos like laijaumalai vs laijawmalai
    const dist = editDistance(t, trackNorm);
    const maxLen = Math.max(t.length, trackNorm.length);
    if (maxLen >= 6 && dist <= Math.max(1, Math.floor(maxLen * 0.2))) s += 2;
  }
  if (item.instrumental) s -= 5;
  if (item.syncedLyrics) s += 3;
  else if (item.plainLyrics) s += 1;
  return s;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function searchLrcLib(query: string): Promise<LrcLibItem[]> {
  // LRCLIB rate-limits aggressively (about 1 req/s per IP); retry 429s
  // with a growing backoff and pace queries to stay under the limit.
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) await sleep(700 * attempt + 300);
    const res = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent": "NsangeetRadio/1.0 (contact: nsangeet.app)",
        },
        cache: "no-store",
      }
    );
    if (res.status === 429) continue;
    if (!res.ok) throw new Error(`lyrics service error ${res.status}`);
    return (await res.json()) as LrcLibItem[];
  }
  return [];
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const artist = searchParams.get("artist")?.trim() ?? "";
  const track = searchParams.get("track")?.trim() ?? "";
  // Optional: the actual duration of the YouTube video being played. Lets
  // us pick the LRCLIB version (studio/live/edit) that matches the video
  // so the highlight lands on the right words.
  const targetDuration = (() => {
    const raw = searchParams.get("duration")?.trim();
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  })();

  if (!artist || !track) {
    return NextResponse.json(
      { error: "artist and track are required" },
      { status: 400 }
    );
  }

  const artistNorm = normalize(artist);
  const trackNorm = normalize(track);
  const key = `${artistNorm}|${trackNorm}`;

  // Fast path 1: already resolved this track recently.
  const fromCache = cached(key);
  if (fromCache) {
    return NextResponse.json(fromCache);
  }

  // Fast path 2: known LRCLIB ID — one deterministic request. If the
  // known record only has plain lyrics, keep it as a fallback and still
  // run the search below in case a synced version exists under another
  // record (e.g. Timiley, Hataarindai, Timi Bhayea Kafi).
  let knownFallback: Record<string, unknown> | null = null;
  const knownId = LRCLIB_IDS[key];
  if (knownId) {
    try {
      const res = await fetch(`https://lrclib.net/api/get/${knownId}`, {
        headers: {
          "User-Agent": "NsangeetRadio/1.0 (contact: nsangeet.app)",
        },
        cache: "no-store",
      });
      if (res.ok) {
        const item = (await res.json()) as LrcLibItem;
        if (item.plainLyrics || item.syncedLyrics) {
          const data = {
            title: item.trackName,
            artist: item.artistName,
            syncedLyrics: item.syncedLyrics,
            plainLyrics: item.plainLyrics,
            recordDuration: item.duration ?? null,
          };
          if (item.syncedLyrics) {
            remember(key, data);
            return NextResponse.json(data);
          }
          knownFallback = data;
        }
      }
    } catch {
      // fall through to search
    }
  }

  // Slow path: fuzzy search with artist variants + aliases. LRCLIB's
  // search is case-sensitive, so title-case query terms.
  const titleCase = (s: string) =>
    s
      .split(/\s+/)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  const alias = TRACK_ALIASES[trackNorm];
  const aliasTitle = alias ? titleCase(alias) : null;
  const trackTitle = titleCase(track);
  const queries = [
    ...artistVariants(artist).map((a) => `${a} ${track}`),
    ...(aliasTitle && aliasTitle.toLowerCase() !== trackTitle.toLowerCase()
      ? artistVariants(artist).map((a) => `${a} ${aliasTitle}`)
      : []),
    track,
  ];

  let best: { item: LrcLibItem; score: number } | null = null;
  for (const q of queries) {
    let results: LrcLibItem[];
    try {
      results = await searchLrcLib(q);
    } catch {
      continue;
    }
    await sleep(450);
    for (const item of results) {
      if (!item.plainLyrics && !item.syncedLyrics) continue;
      const score = matchScore(item, artistNorm, trackNorm, targetDuration);
      // Require a real artist match before accepting (protects against
      // unrelated tracks sharing a word, e.g. "Chinta"). Falls back to
      // edit distance for DB-side typos.
      const a = normalize(item.artistName ?? "");
      const artistOk =
        a === artistNorm ||
        a.includes(artistNorm) ||
        artistNorm.includes(a) ||
        a.includes(artistNorm.slice(0, Math.max(4, artistNorm.length - 2))) ||
        (Math.max(a.length, artistNorm.length) >= 5 &&
          editDistance(a, artistNorm) <= Math.max(1, Math.floor(Math.max(a.length, artistNorm.length) * 0.25)));
      if (!artistOk) continue;
      if (!best || score > best.score) best = { item, score };
    }
  }

  if (!best || best.score < 6) {
    // A known plain-only record beats nothing — use it before the curated
    // fallback text.
    if (knownFallback) {
      remember(key, knownFallback);
      return NextResponse.json(knownFallback);
    }
    // Curated fallback for songs LRCLIB doesn't have at all. The app's
    // artist strings vary ("Sabin Rai & The Elektrix" vs "Sabin Rai"),
    // so try the full artist plus its base form (part before &/ft).
    const baseArtist = normalize(artist.split(/&|ft\.?/i)[0] ?? artist);
    const candidates = [
      `${artistNorm}|${trackNorm}`,
      `${baseArtist}|${trackNorm}`,
    ];
    const fallback = candidates
      .map((k) => FALLBACK_LYRICS[k])
      .find((v) => !!v);
    if (fallback) {
      const data = {
        title: track,
        artist,
        syncedLyrics: null,
        plainLyrics: fallback,
        recordDuration: null,
      };
      remember(key, data);
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const data = {
    title: best.item.trackName,
    artist: best.item.artistName,
    syncedLyrics: best.item.syncedLyrics,
    plainLyrics: best.item.plainLyrics,
    recordDuration: best.item.duration ?? null,
  };
  remember(key, data);
  return NextResponse.json(data);
}
