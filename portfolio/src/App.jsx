import './App.css'
import React from 'react';

import ProjectsSection from './layout/ProjectSection';
import ProfileCard from './layout/ProfileCard';
import ExperienceSection from './layout/ExperienceSection';
import SpotifyWidget from './components/SpotifyWidget';
import EducationSection from './layout/EducationSection';
import { StarsBackground } from './components/ui/stars-background';
import ParallaxHover from './components/ParallaxHover';

function App() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white p-8">

            {/* ★ Background Layers */}
            <StarsBackground className="z-0" />

            {/* ★ Main Content */}
            <div className="relative z-10 flex gap-10 mt-10 justify-center items-center">
                <div className="flex flex-col xl:flex-row gap-10">
                    <div className="flex flex-col justify-center items-center">
                      <ParallaxHover>
                        <ProfileCard />
                      </ParallaxHover>
                    </div>

                    <div className="max-w-210">
                      <EducationSection />
                      <ExperienceSection />
                      <ProjectsSection />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
