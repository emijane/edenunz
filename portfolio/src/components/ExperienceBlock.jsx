{/* experience block component */}

import React from "react";

export default function ExperienceBlock({ company, date, role, description }) {
    return (
        <div className="relative">
            {/* Header row */}
            <div className="flex items-center gap-3">
                <h3 className="text-md font-semibold text-white mb-1">
                    {company} <span className="opacity-50">/</span>
                </h3>
                <p className="text-xs text-white/50 ">{date}</p>
            </div>

            {/* Role + Description */}
            <p className="text-xs italic text-pink-200">{role}</p>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
