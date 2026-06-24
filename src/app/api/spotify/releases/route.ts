export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const ARTIST_ID = "0rjIdD6rhjXgD9UsDAqSrs";
const ARTIST_ALBUMS_URL = `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?limit=10`;

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const json = await res.json();
  return json.access_token as string;
}

type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: string;
  total_tracks: number;
  release_date: string;
  images: { url: string }[];
  external_urls: { spotify: string };
};

export async function GET() {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({ configured: false, releases: [] });
  }

  try {
    const token = await getAccessToken(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN);
    const res = await fetch(ARTIST_ALBUMS_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return Response.json({ configured: false, releases: [] });

    const data = await res.json();

    const seen = new Set<string>();
    const releases = (data.items as SpotifyAlbum[])
      .filter((item) => {
        const key = item.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => ({
        id: item.id,
        title: item.name,
        type:
          item.album_type === "album"
            ? "Album"
            : item.total_tracks > 2
              ? "EP"
              : "Single",
        year: item.release_date.slice(0, 4),
        imageUrl: item.images[0]?.url ?? null,
        href: item.external_urls.spotify,
      }));

    return Response.json({ configured: true, releases });
  } catch {
    return Response.json({ configured: false, releases: [] });
  }
}
