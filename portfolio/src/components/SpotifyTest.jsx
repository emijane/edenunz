import icon from '../assets/icon.jpg'
import { Music } from "lucide-react";

export default function SpotifyTest() {
    return (
        <div className="flex flex-col text-left gap-3 p-6">
            <div className='flex gap-3 items-center'>
                <Music className="text-pink-200 w-4 h-4" />
                <h3 className='text-sm'>Listening to:</h3>
            </div>
            <div className='flex gap-3'>
                <img
                    src={icon}
                    className="w-12 h-12 rounded-md shadow-md"
                />
                <div>
                    <p className="block text-sm text-white font-medium hover:underline cursor-pointer">Song Title</p>
                    <p className="text-xs text-white/60">Song Artist</p>
                </div>
            </div>
        </div>
    );
}