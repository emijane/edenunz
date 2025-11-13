/* eslint-env node */
/* global process, Buffer */

export default async function handler(req, res) {
    const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

    const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    try {
        // 1️⃣ Refresh your access token
        const tokenResponse = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
            }),
        });

        const token = await tokenResponse.json();

        // 2️⃣ Use that token to get currently playing track
        const nowPlaying = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });

        if (nowPlaying.status === 204 || nowPlaying.status > 400) {
            return res.status(200).json({ isPlaying: false });
        }

        const song = await nowPlaying.json();

        // 3️⃣ Extract what we need — add progress + duration
        return res.status(200).json({
            isPlaying: song.is_playing,
            title: song.item?.name,
            artist: song.item?.artists.map((a) => a.name).join(', '),
            albumImageUrl: song.item?.album.images[0].url,
            songUrl: song.item?.external_urls.spotify,
            progressMs: song.progress_ms || 0,
            durationMs: song.item?.duration_ms || 0,
        });
    } catch (err) {
        console.error('Spotify API error:', err);
        return res.status(500).json({ error: 'Failed to fetch from Spotify API' });
    }
}
