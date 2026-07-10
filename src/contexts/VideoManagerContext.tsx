import { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';

interface VideoManagerContextType {
  activeVideoId: string | null;
  registerVideo: (videoId: string, videoRef: React.RefObject<HTMLVideoElement | null>) => void;
  unregisterVideo: (videoId: string) => void;
  activateVideo: (videoId: string) => void;
}

const VideoManagerContext = createContext<VideoManagerContextType | undefined>(undefined);

export function VideoManagerProvider({ children }: { children: ReactNode }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, React.RefObject<HTMLVideoElement | null>>>(new Map());

  const registerVideo = useCallback((videoId: string, videoRef: React.RefObject<HTMLVideoElement | null>) => {
    videoRefs.current.set(videoId, videoRef);
  }, []);

  const unregisterVideo = useCallback((videoId: string) => {
    videoRefs.current.delete(videoId);
    if (activeVideoId === videoId) {
      setActiveVideoId(null);
    }
  }, [activeVideoId]);

  const activateVideo = useCallback((videoId: string) => {
    // If this video is already active, do nothing
    if (activeVideoId === videoId) {
      return;
    }

    // Pause the currently active video (if any)
    if (activeVideoId && videoRefs.current.has(activeVideoId)) {
      const previousVideoRef = videoRefs.current.get(activeVideoId);
      if (previousVideoRef?.current && !previousVideoRef.current.paused) {
        previousVideoRef.current.pause();
      }
    }

    // Set the new active video
    setActiveVideoId(videoId);

    // Play the new video
    const newVideoRef = videoRefs.current.get(videoId);
    if (newVideoRef?.current) {
      const playPromise = newVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: Error) => {
          // Ignore AbortError (common during fast scrolling)
          if (err.name !== 'AbortError') {
            console.warn('Error playing video:', err);
          }
          // If play failed, clear the active state
          setActiveVideoId(null);
        });
      }
    }
  }, [activeVideoId]);

  return (
    <VideoManagerContext.Provider value={{ activeVideoId, registerVideo, unregisterVideo, activateVideo }}>
      {children}
    </VideoManagerContext.Provider>
  );
}

export function useVideoManager() {
  const context = useContext(VideoManagerContext);
  if (context === undefined) {
    throw new Error('useVideoManager must be used within a VideoManagerProvider');
  }
  return context;
}
