import './App.css'
import React from 'react';

import ProjectsSection from './layout/ProjectSection';
import ProfileCard from './layout/ProfileCard';
import ExperienceSection from './layout/ExperienceSection';


function App() {
  return (
    <>
      <div className='flex flex-col gap-10 mt-10 justify-center items-center'>
        <div className='max-w-200'>
          <ProfileCard />
          <ExperienceSection />
          <ProjectsSection />
        </div>
      </div>
    </>
  )
}

export default App
