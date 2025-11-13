{/* dynamic content component */}

import React from "react";

export default function ContentBlock({ title, link, description }) {
    return (
        <div>
            <h3 className='hover:underline'>
                {/* Link + Title for h3*/}
                <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer">
                    {title}
                </a>
            </h3>
            {/* Description */}
            <p className='text-xs text-white/60'>
                {description}
            </p>
        </div>
    );
}