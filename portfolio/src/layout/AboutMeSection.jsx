import { BookHeart } from "lucide-react";

import minecraft from '../assets/minecraft-icon.png';

export default function EducationAccordion() {
    return (
        <div className="w-full max-w-xl">
            
            <div className="w-full flex flex-col gap-2 text-left mt-4
            
                        relative z-10
                        px-8 py-7
                        rounded-3xl
                        border border-pink-200/5
                        ring-1 ring-white/10">
                <p className="text-xs text-pink-200">(v0.0.1)</p>
                <div className="flex gap-2 items-center">
                    <img
                        src={minecraft}
                        alt="Icon"
                        className="
                            w-5 h-5
                        "
                    />
                    <h3>unofficial patch notes</h3>
                </div>
                <p className="text-xs leading-relaxed">at 10 i started creating minecraft texture packs and tumblr themes, and somewhere in between i realized, “oh wait… i can make anything i want with code.” that little spark never really went away.</p>
            </div>
        </div>
    );
}
