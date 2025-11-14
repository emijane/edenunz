import Accordion from "../components/Accordion";
import ProjectCard from "../components/ProjectCard";
import { CodeXml } from "lucide-react";

export default function ProjectsSection() {
    return (
        <Accordion
            title="Projects"
            icon={
                <CodeXml className="text-pink-200 w-5 h-5 drop-shadow-[0_0_5px_rgba(255,192,203,0.8)]" />
            }
            defaultOpen={true}
        >
            <div className="flex flex-col gap-4 pl-7 border-l border-pink-200/20 ml-9 text-left">

                <ProjectCard
                    title="StrataUI"
                    link="https://github.com/emijane/StrataUI"
                    tech="Next.js, React.js, TypeScript, Tailwind CSS, Supabase"
                    description="A curated catalog of modern frontend toolkits for developers and designers."
                />

                <ProjectCard
                    title="AskEric"
                    link="https://github.com/emijane/EquityEric"
                    tech="React.js, Python (Django), REST API, OpenAI’s BERT module"
                    description="AskEric is a chatbot that uses NLP to provide accurate, truthful answers about health insurance and health-related topics, helping users navigate complex insurance systems easily."
                />

                <ProjectCard
                    title="Black Sun Games"
                    link="https://github.com/emijane/BSG"
                    tech="React.js, Tailwind CSS, Vercel"
                    description="Solo-developed landing pages created with React + Vite, TailwindCSS, and deployed with Vercel."
                />

                <ProjectCard
                    title="Personal Website"
                    link="https://portfolio-2-0-iota.vercel.app/"
                    tech="React.js, Tailwind CSS, Vercel"
                    description="Get to know me more through my personal website!"
                />

            </div>
        </Accordion>
    );
}
