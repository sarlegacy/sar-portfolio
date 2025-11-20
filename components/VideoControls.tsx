import React from 'react';
import { InfoIcon, PauseIcon, PlayIcon, VolumeOffIcon, VolumeUpIcon, CameraOffIcon, CameraIcon } from './icons/Icons';

type BackgroundMode = 'youtube' | 'camera';

interface VideoControlsProps {
    error: string | null;
    backgroundMode: BackgroundMode;
    isPlaying: boolean;
    isMuted: boolean;
    togglePlay: () => void;
    toggleMute: () => void;
    handleCameraToggle: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
    error,
    backgroundMode,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    handleCameraToggle,
}) => {
     if (error) {
        return (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-mono-light">
                <InfoIcon className="w-4 h-4" />
                <span>Video background unavailable.</span>
            </div>
        );
     }

     return (
        <>
            {backgroundMode === 'youtube' && (
                <>
                    <button onClick={togglePlay} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors" aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <button onClick={toggleMute} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors" aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
                        {isMuted ? <VolumeOffIcon className="w-5 h-5" /> : <VolumeUpIcon className="w-5 h-5" />}
                    </button>
                </>
            )}
            <button onClick={handleCameraToggle} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors" aria-label={backgroundMode === 'camera' ? "Turn off camera background" : "Use camera for background"}>
                {backgroundMode === 'camera' ? <CameraOffIcon className="w-5 h-5" /> : <CameraIcon className="w-5 h-5" />}
            </button>
        </>
     )
}
