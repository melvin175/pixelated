const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ?? "",
    }),
  });
  const json = await res.json();
  return json.access_token as string;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({ configured: false });
  }

  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    // Try currently playing
    const nowRes = await fetch(NOW_PLAYING_URL, { headers });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        return Response.json({
          configured: true,
          isPlaying: data.is_playing as boolean,
          title: data.item.name as string,
          artist: (data.item.artists as { name: string }[])
            .map((a) => a.name)
            .join(", "),
          album: data.item.album.name as string,
          albumArt: (data.item.album.images as { url: string }[])[0]?.url ?? null,
          songUrl: data.item.external_urls.spotify as string,
        });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers });

    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const track = data.items?.[0]?.track;
      if (track) {
        return Response.json({
          configured: true,
          isPlaying: false,
          title: track.name as string,
          artist: (track.artists as { name: string }[])
            .map((a) => a.name)
            .join(", "),
          album: track.album.name as string,
          albumArt: (track.album.images as { url: string }[])[0]?.url ?? null,
          songUrl: track.external_urls.spotify as string,
        });
      }
    }

    return Response.json({ configured: true, isPlaying: false, title: null });
  } catch {
    return Response.json({ configured: false });
  }
}
