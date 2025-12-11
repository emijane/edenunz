import icon from '../assets/icon.jpg';
import cover from '../assets/cover-photo.jpg';
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import TechIcons from '../components/ui/tech-icons';
import SpotifyWidget from '../components/SpotifyWidget';

export default function ProfileCard() {
    return (
        <div className="relative group">

            {/* MAIN CARD */}
            <div className="card-black w-full pt-40 pb-10 relative">

                {/* COVER PHOTO */}
                <div className="absolute inset-0 w-full h-28 sm:h-32 lg:h-36 overflow-hidden rounded-t-3xl">
                    <img
                        src={cover}
                        alt="Cover Photo"
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>

                {/* CONTENT WRAPPER */}
                <div className="flex flex-col gap-3 relative z-10">

                    {/* AVATAR */}
                    <div className="relative w-fit -mt-25 z-10">
                        <img
                            src={icon}
                            alt="Avatar"
                            className="
                                w-24 lg:w-40
                                aspect-square
                                rounded-full
                                object-cover
                                border-4 border-black
                            "
                        />
                    </div>

                    {/* TEXT BLOCK */}
                    <div className="text-left flex flex-col">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold text-white tracking-wide">
                                Emma DeNunzio
                            </h1>
                        </div>

                        <p className="text-sm text-pink-200 tracking-wide">
                            Frontend Developer
                        </p>

                        <p className='text-xs mt-2 opacity-70'>CS @ The University of Florida</p>

                        <div className="flex flex-row gap-3 mt-3">
                            {[Linkedin, Instagram, Github, Mail].map((Icon, i) => (
                                <Icon
                                    key={i}
                                    className="text-white/70 w-4 h-4 transition-all duration-300 hover:text-white hover:scale-[1.18] cursor-pointer drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

