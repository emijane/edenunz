import icon from '../assets/icon.jpg';
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import TechIcons from '../components/ui/tech-icons';
import SpotifyWidget from '../components/SpotifyWidget';

export default function ProfileCard() {
    return (
        <div className="relative group">

            {/* OUTER AURA GLOW */}
            <div
                className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10
                    blur-2xl opacity-70
                    group-hover:opacity-90
                    transition-all duration-700
                    pointer-events-none
                "
            ></div>

            {/* SOFT TOP HIGHLIGHT */}
            <div
                className="
                    absolute inset-0 rounded-3xl
                    bg-white/5 blur-xl opacity-10
                    pointer-events-none
                "
            ></div>

            {/* MAIN CARD */}
            <div
                className="
                    relative z-10
                    px-8 py-7
                    rounded-3xl
                    bg-white/5
                    border border-pink-200/5
                    shadow-[0_0_10px_rgba(255,255,255,0.1)]
                    ring-1 ring-white/10
                    transition-all duration-500
                    group-hover:bg-pink-200/5
                    group-hover:shadow-[0_0_15px_rgba(255,255,255,0.17)]
                    w-full
                "
            >
                <div className="flex flex-col sm:flex-row items-center gap-7 relative">

                    {/* AVATAR + orbit icons wrapper */}
                    <div className="relative w-fit mx-auto">
                        <img
                            src={icon}
                            alt="Icon"
                            className="
                                w-24 lg:w-28 rounded-full
                                shadow-[0_0_25px_rgba(255,255,255,0.18)]
                            "
                        />

                        {/* Orbiting icons positioned relative to THIS wrapper */}
                        <TechIcons />
                    </div>

                    {/* TEXT BLOCK */}
                    <div className="text-left flex flex-col sm:items-start items-center">
                        <div className="flex items-center gap-2">
                            <h1
                                className="
                                    text-xl font-semibold text-white tracking-wide
                                    drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]
                                "
                            >
                                emma denunzio
                            </h1>

                            <span className="text-pink-300 text-xs animate-pulse-slow">
                                ✦
                            </span>
                        </div>

                        <p className="text-xs text-pink-200/80 tracking-wide mt-1">
                            jr frontend developer · CS @ UF
                        </p>

                        <div className="flex flex-row gap-3 mt-3">
                            {[Linkedin, Instagram, Github, Mail].map((Icon, i) => (
                                <Icon
                                    key={i}
                                    className="
                                        text-white/70 w-4 h-4
                                        transition-all duration-300
                                        hover:text-white hover:scale-[1.18]
                                        cursor-pointer
                                        drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]
                                    "
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <SpotifyWidget />
            </div>
        </div>
    );
}
