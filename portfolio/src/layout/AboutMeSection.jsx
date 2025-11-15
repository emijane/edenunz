import minecraft from "../assets/minecraft-icon.png";

export default function AboutMeSection() {
    return (
        <div className="mt-3">

            {/* OUTER AURA GLOW */}
            <div
                className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10
                    blur-2xl opacity-70
                    group-hover:opacity-90
                    transition-all duration-700
                    pointer-events-none
                "
            />

            {/* SOFT HIGHLIGHT */}
            <div
                className="
                    absolute inset-0 rounded-3xl
                    bg-white/5 blur-xl opacity-10
                    pointer-events-none
                "
            />

            {/* MAIN CARD */}
            <div
                className="
                    relative z-10
                    px-8 py-7
                    rounded-3xl
                    bg-white/5
                    border border-pink-200/5
                    shadow-[0_0_10px_rgba(255,255,255,0.1)]
                    ring-1 ring-white/10
                    transition-all duration-500
                    group-hover:bg-pink-200/5
                    group-hover:shadow-[0_0_15px_rgba(255,255,255,0.17)]
                    text-left
                "
            >
                {/* VERSION LABEL */}
                <p className="text-[10px] text-pink-200/80 tracking-wide mb-2">
                    (v0.0.1)
                </p>

                {/* TITLE AREA */}
                <div className="flex items-center gap-2 mb-3">
                    <img
                        src={minecraft}
                        alt="Icon"
                        className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                    />
                    <h3
                        className="
                            text-sm font-medium text-white
                            tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]
                        "
                    >
                        unofficial patch notes
                    </h3>
                </div>

                {/* BODY TEXT */}
                <p className="text-xs leading-relaxed text-pink-100/80">
                    at 10 i started creating minecraft texture packs and tumblr themes,
                    and somewhere in between i realized, “oh wait… i can make anything
                    i want with code.” that little spark never really went away.
                </p>
            </div>
        </div>
    );
}
