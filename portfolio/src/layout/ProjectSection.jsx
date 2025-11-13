import ContentBlock from "../components/ContentBlock";

export default function ProjectsSection() {
    return (
        <div className='flex flex-col gap-3 text-left outline-1 outline-white/10 rounded-lg p-6 max-w-200'>
          <h2 className='text-2xl text-white text-glow'>Projects</h2>
            <ContentBlock
                title="StrataUI"
                link="https://github.com/emijane/StrataUI"
                description="A curated catalog of modern frontend toolkits for developers and designers. Built with Next.js, Tailwind CSS, and Supabase."
            />
            <ContentBlock
                title="AskEric"
                link="https://github.com/emijane/EquityEric"
                description="AskEric is a chatbot that uses NLP to provide accurate, truthful answers about health insurance and health-related topics, helping users navigate complex insurance systems easily."
            />
            <ContentBlock
                title="Black Sun Games"
                link="https://github.com/emijane/BSG"
                description="Solo-developed landing pages created with React + Vite, TailwindCSS, and deployed with Vercel."
            />
            <ContentBlock
                title="Personal Website"
                link="https://portfolio-2-0-iota.vercel.app/"
                description="Get to know me more through my personal website!"
            />
        </div>
    );
}
