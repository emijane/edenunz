import './App.css'
import React from 'react';
import icon from './assets/icon.jpg'
import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import { Github } from "lucide-react";
import { Mail } from "lucide-react";

import ProjectsSection from './layout/ProjectSection';


function App() {
  return (
    <>
      <div className='flex gap-10 mt-10'>
        <div className='flex'>
          <div className="flex flex-row items-center gap-6 p-6">
            <img src={icon} alt="Icon" className='w-35 rounded-full'/>
            <div className='text-left'>
              <h1 className="text-3xl text-white text-glow">Emma DeNunzio</h1>
              <p className='font-medium text-white/70 mt-1'>Frontend Developer | CS @ UF</p>
              <div className='flex flex-row gap-3 mt-2'>
                <Linkedin className='text-white/70 w-5 hover:text-white cursor-pointer' />
                <Instagram className='text-white/70 w-5 hover:text-white cursor-pointer' />
                <Github className='text-white/70 w-5 hover:text-white cursor-pointer' />
                <Mail className='text-white/70 w-5 hover:text-white cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
        <ProjectsSection />
      </div>
    </>
  )
}

export default App
