import Accordion from "../components/Accordion";
import ExperienceBlock from "../components/ExperienceBlock";
import { BookHeart } from "lucide-react";

export default function EducationAccordion() {
    return (
        <Accordion
            title="Education"
            icon={<BookHeart className="text-pink-200 w-5 h-5 drop-shadow-[0_0_5px_rgba(255,192,203,0.8)] " />}
            defaultOpen={true}
        >
            <div className="flex flex-col pl-7 border-l border-pink-200/20 ml-9 text-left">
                <ExperienceBlock
                    company="The University of Florida"
                    date="December 2026 (expected)"
                    role="Bachelors in Sciences, Computer Science"
                />
            </div>
        </Accordion>
    );
}
