import './App.css'
import React from 'react';

import ProjectsSection from './layout/ProjectSection';
import ProfileCard from './layout/ProfileCard';


function App() {
  return (
    <>
      <div className='flex gap-10 mt-10'>
        <ProfileCard />
        <ProjectsSection />
      </div>
    </>
  )
}

export default App
