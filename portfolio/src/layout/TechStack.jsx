import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill, RiSupabaseFill } from "react-icons/ri";

export default function ToolkitCard() {
    return (
        <div
            className="
                flex flex-col p-3
                relative z-10
                rounded-xl 
                bg-white/5
                border border-pink-200/10 
                backdrop-blur-xl
                shadow-[0_0_20px_rgba(255,255,255,0.06)]
                transition-all duration-500
                hover:bg-white/10
                hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
            "
        >
            {/* Title */}
            <h3 className="text-xs text-white tracking-wide mb-2">
                Tools
            </h3>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 gap-3 place-items-center text-pink-200 text-xl">
                <FaReact
                    title="React"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] hover:scale-110 transition"
                />
                <RiTailwindCssFill
                    title="Tailwind CSS"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] hover:scale-110 transition"
                />
                <RiNextjsFill
                    title="Next.js"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] hover:scale-110 transition"
                />
                <RiSupabaseFill
                    title="Supabase"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] hover:scale-110 transition"
                />
            </div>
        </div>
    );
}
