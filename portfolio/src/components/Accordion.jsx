import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ icon, title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="w-full select-none mb-5">

            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full flex items-center justify-between
                    py-2
                    text-left
                    transition-all duration-300
                    group
                "
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-pink-300">{icon}</span>}

                    <h2 className="text-lg font-semibold text-white tracking-wide">
                        {title}
                    </h2>
                </div>

                <ChevronDown
                    className={`
                        text-white/70 transition-transform duration-300
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {/* Divider */}
            <div
                className={`
                    w-full h-px bg-white/10 mb-3 origin-center
                    transition-all duration-500
                    ${open ? "opacity-0 scale-x-50" : "opacity-100 scale-x-100"}
                `}
            ></div>

            {/* Body */}
            <div
                className={`
                    overflow-hidden transition-all duration-500
                    ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div>{children}</div>
            </div>
        </div>
    );
}
