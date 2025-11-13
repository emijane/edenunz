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
            <div className="flex flex-col text-left gap-3 p-6">
                <div className="flex gap-3 items-center">
                    <Music className="text-pink-200 w-4 h-4" />
                    <h3 className="text-sm text-white/60">
                        Not listening to anything right now 🎧
                    </h3>
                </div>
            </div>
        );
    }

    // Format time in mm:ss
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const progressPercent = (song.progressMs / song.durationMs) * 100;

    return (
        <div className="flex flex-col text-left gap-3 p-6">
            {/* Header */}
            <div className="flex gap-3 items-center">
                <Music className="text-pink-200 w-4 h-4" />
                <h3 className="text-sm text-white/80">Listening to:</h3>
            </div>

            {/* Song info */}
            <div className="flex gap-3 items-center">
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
                        className="block text-sm text-white font-medium hover:underline cursor-pointer"
                    >
                        {song.title}
                    </a>
                    <p className="text-xs text-white/60">{song.artist}</p>

                    {/* Progress bar */}
                    <div className="mt-1 w-40">
                        <div className="flex justify-between text-[10px] text-white/40 mb-0.5">
                            <span>{formatTime(song.progressMs)}</span>
                            <span>{formatTime(song.durationMs)}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-pink-300 rounded-full transition-all duration-1000 ease-linear"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
