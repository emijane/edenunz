
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiNextjsFill } from "react-icons/ri";
import { RiSupabaseFill } from "react-icons/ri";

export default function EducationAccordion() {
    return (
        <div className="
                flex flex-col mt-5 p-3 
                relative z-10 
                rounded-3xl 
                bg-white/5 border border-pink-200/5 shadow-[0_0_10px_rgba(255,255,255,0.1)]
                ring-1 ring-white/10
                transition-all duration-500
                group-hover:bg-pink-200/5 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.17)]">
            <h3 className="text-white">Tech Stack</h3>
            <div className="flex gap-3 text-blackrounded-md p-3">
                <FaReact title="React" className="w-5 h-5 text-white"/>
                <RiTailwindCssFill title="Tailwind CSS" className="w-5 h-5 text-white"/>
                <RiNextjsFill title="Next.js" className="w-5 h-5 text-white"/>
                <RiSupabaseFill title="Supabase" className="w-5 h-5 text-white"/>
            </div>
        </div>
    );
}
