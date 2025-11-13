import './App.css'
import React from 'react';

import ProjectsSection from './layout/ProjectSection';
import ProfileCard from './layout/ProfileCard';
import ExperienceSection from './layout/ExperienceSection';
import SpotifyWidget from './components/SpotifyWidget';


function App() {
  return (
    <>
      <div className='flex gap-10 mt-10 justify-center items-center'>
        <div className='flex gap-10'>
          <div className='flex flex-col justify-center'>
            <ProfileCard />
            <SpotifyWidget />
          </div>
          <div className='max-w-200'>
            <ExperienceSection />
            <ProjectsSection />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
