import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill, RiSupabaseFill } from "react-icons/ri";

export default function TechStackCard() {
    return (
        <div className="relative w-full max-w-xs group">

            {/* Outer glow aura (same as profile card) */}
            <div className="
                absolute inset-0 
                rounded-3xl 
                bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10
                blur-2xl opacity-70 
                group-hover:opacity-90
                transition-all duration-700
                pointer-events-none
            "></div>

            {/* Top highlight overlay (same) */}
            <div className="
                absolute inset-0 rounded-3xl
                bg-white/5 blur-xl 
                opacity-10
                pointer-events-none
            "></div>

            {/* MAIN GLASS CARD — same styling as ProfileCard */}
            <div className="
                relative z-10 
                px-6 py-5
                rounded-3xl 
                bg-white/5 
                border border-pink-200/5
                shadow-[0_0_10px_rgba(255,255,255,0.1)]
                ring-1 ring-white/10
                backdrop-blur-xl
                transition-all duration-500
                group-hover:bg-pink-200/5
                group-hover:shadow-[0_0_15px_rgba(255,255,255,0.17)]
            ">

                {/* Title */}
                <h3 className="text-white/80 text-sm tracking-wide mb-4 text-left">
                    Toolkit
                </h3>

                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-4 place-items-center text-white text-2xl">
                    <FaReact
                        title="React"
                        className="hover:scale-110 transition drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
                    />
                    <RiTailwindCssFill
                        title="Tailwind CSS"
                        className="hover:scale-110 transition drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
                    />
                    <RiNextjsFill
                        title="Next.js"
                        className="hover:scale-110 transition drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
                    />
                    <RiSupabaseFill
                        title="Supabase"
                        className="hover:scale-110 transition drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
                    />
                </div>

            </div>
        </div>
    );
}
