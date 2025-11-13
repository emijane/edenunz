import React, { useEffect, useState } from "react";
import { Music } from "lucide-react";

export default function SpotifyWidget() {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const baseUrl =
                    import.meta.env.DEV
                        ? "https://edenunz.vercel.app"
                        : "";
                const res = await fetch(`${baseUrl}/api/spotify`);
                const data = await res.json();
                setSong(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSong();
        const interval = setInterval(fetchSong, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!song) return null;

    if (!song.isPlaying) {
        return (
            <div className="flex flex-col text-left gap-3 p-6 w-full">
                <div className="flex gap-3 items-center">
                    <Music className="text-pink-200 w-4 h-4" />
                    <h3 className="text-sm text-white/60">
                        Not listening to anything right now 🎧
                    </h3>
                </div>
            </div>
        );
    }

    // Format mm:ss safely
    const formatTime = (ms = 0) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const progressPercent = song.durationMs
        ? (song.progressMs / song.durationMs) * 100
        : 0;

    return (
        <div className="flex flex-col text-left gap-3 p-6 w-full">
            {/* Header */}
            <div className="flex gap-3 items-center">
                <Music className="text-pink-200 w-4 h-4 drop-shadow-[0_0_5px_rgba(255,192,203,0.8)]" />
                <h3 className="text-sm text-white/80">Listening to:</h3>
            </div>

            {/* Song info */}
            <div className="flex gap-4 items-center w-full">
                <img
                    src={song.albumImageUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded-md shadow-md shrink-0"
                />
                <div className="flex flex-col w-full">
                    <a
                        href={song.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-white font-medium hover:underline cursor-pointer truncate"
                    >
                        {song.title}
                    </a>
                    <p className="text-xs text-white/60 truncate">{song.artist}</p>

                    {/* Full-width glowing progress bar */}
                    <div className="mt-1 w-full">
                        <div className="flex justify-between text-[10px] text-white/40 mb-0.5">
                            <span>{formatTime(song.progressMs)}</span>
                            <span>{formatTime(song.durationMs)}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                            <div
                                className="h-full bg-pink-300 rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_1px_rgba(255,192,203,0.7)]"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
