import React, { useEffect, useState } from "react";
import { Music } from "lucide-react";

export default function SpotifyWidget() {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const baseUrl =
                    import.meta.env.DEV ? "https://edenunz.vercel.app" : "";
                const res = await fetch(`${baseUrl}/api/spotify`);
                const data = await res.json();
                setSong(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSong();
        const dataInterval = setInterval(fetchSong, 8000);

        const progressInterval = setInterval(() => {
            setSong((prev) => {
                if (!prev || !prev.isPlaying) return prev;
                const next = prev.progressMs + 1000;
                if (next >= prev.durationMs) return prev;
                return { ...prev, progressMs: next };
            });
        }, 1000);

        return () => {
            clearInterval(dataInterval);
            clearInterval(progressInterval);
        };
    }, []);

    if (!song) return null;

    const formatTime = (ms = 0) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (!song.isPlaying) {
        return (
            <div className="w-full p-4 flex flex-col gap-3 text-left">
                <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-pink-300/70" />
                    <p className="text-xs text-white/60">
                        Not listening to anything 🎧
                    </p>
                </div>
            </div>
        );
    }

    const progressPercent =
        (song.progressMs / song.durationMs) * 100;

    return (
        <div className="w-full p-4 text-left rounded-xl 
                        bg-white/5 border border-white/5 
                        shadow-[0_0_10px_rgba(255,255,255,0.05)]
                        backdrop-blur-md">

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <Music className="w-4 h-4 text-pink-300 drop-shadow-[0_0_6px_rgba(255,192,203,0.5)]" />
                <h3 className="text-xs text-white/70 tracking-wide">
                    Listening to:
                </h3>
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-4 w-full">
                <img
                    src={song.albumImageUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded-md shadow-md"
                />

                <div className="flex flex-col w-full">
                    <a
                        href={song.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white font-medium truncate hover:underline"
                    >
                        {song.title}
                    </a>

                    <p className="text-xs text-white/50 truncate">
                        {song.artist}
                    </p>

                    {/* Progress */}
                    <div className="mt-1">
                        <div className="flex justify-between text-[10px] text-white/40">
                            <span>{formatTime(song.progressMs)}</span>
                            <span>{formatTime(song.durationMs)}</span>
                        </div>

                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-pink-300 rounded-full 
                                           transition-all duration-1000 ease-linear
                                           shadow-[0_0_6px_rgba(255,192,203,0.6)]"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
