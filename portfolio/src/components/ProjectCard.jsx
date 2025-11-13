{/* dynamic project card component */}

import React from "react";

export default function ProjectCard({ title, link, tech, description }) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className='text-md hover:underline'>
                {/* Link + Title for h3*/}
                <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer">
                    {title}
                </a>
            </h3>
            <p className="text-xs italic text-pink-200">
                {tech}
            </p>

            {/* Description */}
            <p className='text-xs text-white/60'>
                {description}
            </p>
        </div>
    );
}