import './App.css'
import React from 'react';

import ProjectsSection from './layout/ProjectSection';
import ProfileCard from './layout/ProfileCard';
import ExperienceSection from './layout/ExperienceSection';
import SpotifyWidget from './components/SpotifyWidget';
import EducationSection from './layout/EducationSection';
import { StarsBackground } from './components/ui/stars-background';
import ParallaxHover from './components/ParallaxHover';
import AboutMeSection from './layout/AboutMeSection';

function App() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white p-8">

            {/* ★ Background Layers */}
            <StarsBackground className="z-0" />

            {/* ★ Main Content */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-5 mt-10 max-w-5xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <ParallaxHover>
                        <ProfileCard />
                      </ParallaxHover>
                    </div>
                      <div>
                        <ExperienceSection />
                        <ProjectsSection />
                      </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <SpotifyWidget />
                  <AboutMeSection />
                </div>
            </div>
        </div>
    );
}

export default App;
