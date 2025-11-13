{/* experience section */}

import ExperienceBlock from "../components/ExperienceBlock";

export default function ExperienceSection() {
    return (
        <div className="flex flex-col gap-3 text-left p-6 mx-auto">
            <h2 className="text-2xl font-semibold text-white text-glow mb-2">
                Experience
            </h2>

            {/* Timeline container */}
            <div className="relative flex flex-col gap-6 pl-7 border-l border-pink-200">
                <ExperienceBlock
                    company="emagine"
                    date="2022 - 2025"
                    role="Frontend Developer"
                    description="Built responsive, pixel-perfect websites with HTML, CSS, and JavaScript. Created reusable UI components and optimized build processes for performance. Ensured accessibility, cross-browser support, and mobile-first design."
                />
                <ExperienceBlock
                    company="emagine"
                    date="2021 - 2022"
                    role="Frontend Development Intern"
                    description="Converted high-fidelity mockups into interactive web pages using HTML, CSS, and JavaScript. Collaborated with engineers on feature development and UI optimization using Git and PHP. Improved UX, resolved interface bugs, and contributed to agile sprint cycles."
                />
            </div>
        </div>
    );
}
