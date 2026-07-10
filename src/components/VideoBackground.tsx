import { useEffect, useRef, useState, memo } from 'react';

interface Props {
  src: string;
  overlay?: 'dark' | 'light' | 'copper';
  className?: string;
  kenBurns?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
}

const overlays = {
  dark: `
    linear-gradient(105deg, rgba(15,15,16,0.92) 0%, rgba(15,15,16,0.75) 45%, rgba(15,15,16,0.35) 100%),
    linear-gradient(to top, rgba(15,15,16,0.6) 0%, transparent 40%)
  `,
  light: `
    linear-gradient(135deg, rgba(245,242,237,0.15) 0%, transparent 60%),
    linear-gradient(to bottom, transparent 70%, rgba(245,242,237,0.4) 100%)
  `,
  copper: `
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(212,98,42,0.18) 0%, transparent 60%),
    linear-gradient(105deg, rgba(15,15,16,0.88) 0%, rgba(15,15,16,0.55) 50%, rgba(15,15,16,0.25) 100%)
  `,
};

// Global state to ensure only one video plays at a time
let activeVideoId: string | null = null;
const setActiveVideo = (id: string | null) => {
  activeVideoId = id;
};

const VideoBackground = memo(({
  src,
  overlay = 'dark',
  className = '',
  kenBurns = true,
  preload = 'metadata',
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const videoId = useRef<string>(src); // Use src as unique ID
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isPlayingRef = useRef(false);

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Clean up on unmount
    return () => {
      if (activeVideoId === videoId.current) {
        setActiveVideo(null);
      }
      playPromiseRef.current = null;
      isPlayingRef.current = false;
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // This video is now visible
          if (!hasLoadedRef.current) {
            video.load();
            hasLoadedRef.current = true;
          }

          // If another video is active, pause it first
          if (activeVideoId && activeVideoId !== videoId.current) {
            // Find and pause the other video
            document.querySelectorAll('video').forEach(v => {
              if (v !== video && !v.paused) {
                v.pause();
              }
            });
          }

          // Set this as the active video
          setActiveVideo(videoId.current);

          // Play this video with race condition protection
          if (!isPlayingRef.current) {
            const playPromise = video.play();
            playPromiseRef.current = playPromise;
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  isPlayingRef.current = true;
                  playPromiseRef.current = null;
                })
                .catch((err) => {
                  // Ignore AbortError (common during fast scrolling)
                  if (err.name !== 'AbortError') {
                    console.warn('Video play error:', err);
                  }
                  isPlayingRef.current = false;
                  playPromiseRef.current = null;
                });
            }
          }
        } else {
          // Video is not visible, pause it
          if (isPlayingRef.current) {
            // Cancel any pending play promise to prevent race conditions
            if (playPromiseRef.current) {
              playPromiseRef.current = null;
            }
            
            video.pause();
            isPlayingRef.current = false;
            
            // If this was the active video, clear the active state
            if (activeVideoId === videoId.current) {
              setActiveVideo(null);
            }
          }
        }
      },
      { threshold: 0.4, rootMargin: '100px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (isPlayingRef.current) {
        video.pause();
        isPlayingRef.current = false;
      }
      if (activeVideoId === videoId.current) {
        setActiveVideo(null);
      }
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload={preload}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.8s] ease-out
                    ${kenBurns ? 'animate-kenBurns' : ''}
                    ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ aspectRatio: '16/9' }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[1.8s]"
        style={{
          background: overlays[overlay],
          opacity: ready ? 1 : 0,
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjEyLDk4LDQyLDAuMDUpIi8+PC9zdmc+')] opacity-40 mix-blend-overlay pointer-events-none" />
    </div>
  );
});

export default VideoBackground;
