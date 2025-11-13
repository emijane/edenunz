{/* experience block component */}

import React from "react";
import { Braces } from "lucide-react";

export default function ExperienceBlock({ company, date, role, description }) {
    return (
        <div className="relative">
            {/* Header row */}
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-white mb-2">{company}</h3>
                <p className="text-xs text-white/50">{date}</p>
            </div>

            {/* Role + Description */}
            <p className="text-xs italic text-pink-200">{role}</p>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
