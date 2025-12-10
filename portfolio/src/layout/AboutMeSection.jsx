import minecraft from "../assets/minecraft-icon.png";

export default function AboutMeSection() {
    return (
        <div className="mt-3">

            {/* OUTER AURA GLOW */}
            <div className="card-aura" />

            {/* SOFT HIGHLIGHT */}
            <div className="card-highlight" />

            {/* MAIN CARD */}
            <div
                className="card-styles text-left lg:max-w-2xl"
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
