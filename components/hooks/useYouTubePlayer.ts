import { useState, useEffect, useRef, useCallback } from 'react';

interface YouTubePlayerOptions {
  videoId: string;
  containerId: string;
  enabled?: boolean;
}

// Interfaces to provide types for the YouTube IFrame Player API
// These replace the use of `any` for better type safety.
interface YTPlayer {
    destroy: () => void;
    playVideo: () => void;
    pauseVideo: () => void;
    isMuted: () => boolean;
    mute: () => void;
    unMute: () => void;
    getPlayerState: () => number;
}

interface YTEvent {
    target: YTPlayer;
    data: number;
}


// Enum values from the YouTube Iframe Player API for player states.
const PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
};

/**
 * A custom hook to manage an interactive YouTube background video.
 * It initializes the player, syncs its state with React state,
 * and returns the state and control functions. Can be disabled.
 */
export const useYouTubePlayer = ({ videoId, containerId, enabled = true }: YouTubePlayerOptions) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = () => {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
            playerRef.current = null;
        }
    };

    // If the player is disabled, ensure it's destroyed and we do nothing further.
    if (!enabled) {
      cleanup();
      if (isPlaying) setIsPlaying(false); // Reset state
      return;
    }
    
    // Prevent re-initialization if the player already exists.
    if (playerRef.current) {
      return;
    }

    const onPlayerReady = (event: YTEvent) => {
      setError(null);
      event.target.playVideo();
      // The player is initialized with mute: 1, but we sync state here to be sure.
      setIsMuted(event.target.isMuted());
    };

    const onPlayerStateChange = (event: YTEvent) => {
      if (event.data === PLAYER_STATES.PLAYING) {
        setIsPlaying(true);
      } else if (
        event.data === PLAYER_STATES.PAUSED ||
        event.data === PLAYER_STATES.ENDED ||
        event.data === PLAYER_STATES.UNSTARTED
      ) {
        setIsPlaying(false);
      }
    };

    const onPlayerError = (event: YTEvent) => {
      console.error("YouTube Player Error:", event.data);
      setError(`Player error: ${event.data}`);
      cleanup(); // Destroy the broken player
    };

    const initializePlayer = () => {
       if (playerRef.current && typeof playerRef.current.destroy === 'function') {
         playerRef.current.destroy();
       }
       setError(null); // Clear previous errors
      playerRef.current = new (window as any).YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          /**
           * YouTube Player Parameters for Background Video:
           * - autoplay: 1 -> Enables automatic playback when the player loads.
           * - mute: 1 -> Mutes the video. This is CRITICAL for autoplay to work on most
           *             modern browsers (Chrome, Safari, Firefox) which block unmuted
           *             autoplay to improve user experience.
           * - loop: 1 & playlist: videoId -> These two work together to make the video
           *                                 loop continuously. The `playlist` parameter
           *                                 is required for `loop` to function correctly.
           * - controls: 0 -> Hides the player controls (play/pause, volume, etc.).
           * - playsinline: 1 -> Ensures the video plays within the element on iOS,
           *                  rather than going fullscreen.
           * - showinfo: 0 -> Hides information like the video title.
           * - modestbranding: 1 -> Reduces the YouTube logo visibility.
           * - fs: 0 -> Disables the fullscreen button.
           */
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId, // Required for loop to work
          mute: 1,
          playsinline: 1,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    };

    if (!(window as any).onYouTubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }
    
    // In case the API script is already loaded and the global function has been called
    if (typeof (window as any).YT !== 'undefined' && typeof (window as any).YT.Player !== 'undefined' && !playerRef.current) {
        initializePlayer();
    }

    return cleanup;
  }, [videoId, containerId, enabled, isPlaying]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !playerRef.current.getPlayerState) return;
    const playerState = playerRef.current.getPlayerState();
    if (playerState === PLAYER_STATES.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !playerRef.current.isMuted) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, []);

  return { isPlaying, isMuted, togglePlay, toggleMute, error };
};
