import Accordion from "../components/Accordion";
import ExperienceBlock from "../components/ExperienceBlock";
import { BadgeCheck } from "lucide-react";

export default function ExperienceSection() {
    return (
        <div className="flex flex-col card-black gap-4 pl-7 text-left">
            <div className="flex flex-row gap-3 items-center">
                <BadgeCheck className="text-pink-200 w-5 h-5 drop-shadow-[0_0_5px_rgba(255,192,203,0.8)] " />
                <h3 className="text-lg">Experience</h3>
            </div>
            <ExperienceBlock
                company="Boats Group"
                date="Summer 2026"
                role="Software Development Intern"
            />
            <ExperienceBlock
                company="emagine"
                date="2022 - 2025"
                role="Frontend Developer Associate"
                description="Built responsive, pixel-perfect websites with HTML, CSS, and JavaScript. Created reusable UI components and optimized build processes for performance. Ensured accessibility, cross-browser support, and mobile-first design."
            />

            <ExperienceBlock
                company="emagine"
                date="2021 - 2022"
                role="Frontend Development Intern"
                description="Converted high-fidelity mockups into interactive web pages using HTML, CSS, and JavaScript. Collaborated with engineers on feature development and UI optimization using Git and PHP. Improved UX, resolved interface bugs, and contributed to agile sprint cycles."
            />

        </div>
    );
}
