import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";

export default function TechIcons() {
    return (
        <div className="absolute inset-0">

            {/* React */}
            <FaReact
                className="
                    absolute
                    bottom-[110px] right-[15px]
                    lg:top-[-5px] lg:left-[-48px]
                    text-blue-300 w-7 h-7
                    drop-shadow-[0_0_10px_rgba(120,180,255,0.9)]
                    transition-all duration-300
                    hover:scale-110 hover:-rotate-6 hover:brightness-125
                "
            />


            {/* Next.js */}
            <TbBrandNextjs
                className="
                    absolute 
                    bottom-[110px] right-[50px]
                    lg:top-[30px] lg:left-[-48px]
                    text-white
                    w-7 h-7
                    drop-shadow-[0_0_14px_rgba(80,150,255,0.8)]
                    -rotate-8
                    hover:scale-110 hover:rotate-2
                    transition-all duration-300
                "
            />

            {/* Tailwind */}
            <RiTailwindCssFill
                className="
                    absolute 
                    bottom-[110px] right-[86px]
                    lg:top-[60px] lg:left-[-48px]
                    text-blue-400
                    w-7 h-7
                    drop-shadow-[0_0_8px_rgba(100,180,255,0.8)]
                    rotate-8
                    hover:scale-110 hover:-rotate-4
                    transition-all duration-300
                "
            />

            {/* Supabase */}
            <RiSupabaseFill
                className="
                    absolute
                    bottom-[111px] left-[88px]
                    lg:top-[92px] lg:left-[-46px]
                    text-green-400
                    w-6 h-6
                    z-20
                    drop-shadow-[0_0_8px_rgba(80,200,120,0.7)]
                    hover:scale-110
                    hover:rotate-12
                    transition-all duration-300
                "
            />
        </div>
    );
}
