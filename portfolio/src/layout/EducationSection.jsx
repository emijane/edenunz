import ExperienceBlock from "../components/ExperienceBlock";
import { BookHeart } from "lucide-react";

export default function ProfileCard() {
    return (
        <div className='flex flex-col gap-3 text-left p-6 mx-auto'>
            <div className="flex gap-3 items-center">
                <BookHeart className="text-pink-200 w-5 h-5 drop-shadow-[0_0_5px_rgba(255,192,203,0.8)]" />
                <h2 className="text-lg font-semibold text-white">
                    Education
                </h2>
            </div>
            <div className="relative flex flex-col gap-6 pl-7 border-l border-pink-200/20 ml-9">
                <ExperienceBlock
                        company="The University of Florida"
                        date="December 2026 (expected)"
                        role="Bachelors in Sciences, Computer Science"
                />
            </div>
        </div>
    );
}