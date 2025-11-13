import icon from '../assets/icon.jpg'
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import SpotifyWidget from "../components/SpotifyWidget";

export default function ProfileCard() {
    return (
        <div className="relative">

            {/* Soft outer glow */}
            <div className="absolute inset-0 rounded-3xl blur-3xl 
                            bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 
                            opacity-50 pointer-events-none"></div>

            {/* Main card container */}
            <div className="relative z-10 w-full max-w-xl 
                            bg-black/30 backdrop-blur-md 
                            border border-white/10 rounded-3xl
                            shadow-[0_0_25px_rgba(255,255,255,0.15)]
                            p-6 flex flex-col gap-6">

                {/* Top: Avatar + Text */}
                <div className="flex flex-row items-center gap-6">
                    <img 
                        src={icon}
                        alt="Icon"
                        className="w-24 lg:w-28 rounded-full 
                                   shadow-[0_0_40px_rgba(255,200,255,0.3)]"
                    />

                    <div className="text-left">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl lg:text-2xl font-semibold 
                                           text-white tracking-wide 
                                           drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                                Emma DeNunzio
                            </h1>
                            <span className="text-pink-300 animate-sparkle text-sm">✦</span>
                        </div>

                        <p className="text-sm text-pink-200/80 mt-1 tracking-wide">
                            Jr Frontend Developer <span className="text-white/40">|</span> CS @ UF
                        </p>

                        <div className="flex flex-row gap-3 mt-2">
                            {[Linkedin, Instagram, Github, Mail].map((Icon, i) => (
                                <Icon 
                                    key={i}
                                    className="text-white/60 w-5 h-5 
                                               hover:text-white hover:scale-110 
                                               transition-all duration-300 cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spotify inside the card */}
                <div className="w-full">
                    <SpotifyWidget />
                </div>

            </div>

        </div>
    );
}
