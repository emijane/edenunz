import React, { useEffect, useState } from "react";

export default function SpotifyWidget() {
    const [song, setSong] = useState(null);

    useEffect(() => {
        fetch("/api/spotify")
            .then((res) => res.json())
            .then((data) => setSong(data))
            .catch((err) => console.error(err));
    }, []);

    if (!song) return null;
    if (!song.isPlaying) {
        return (
            <div className="text-xs text-white/60">
                Not listening to anything right now 🎧
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition">
            <img
                src={song.albumImageUrl}
                alt={song.title}
                className="w-12 h-12 rounded-md shadow-md"
            />
            <div>
                <a
                    href={song.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white font-medium hover:underline"
                >
                    {song.title}
                </a>
                <p className="text-xs text-white/60">{song.artist}</p>
            </div>
        </div>
    );
}
