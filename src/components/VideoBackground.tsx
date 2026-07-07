import { useEffect, useRef, useState, memo } from 'react';

interface Props {
  src: string;
  overlay?: 'dark' | 'light' | 'copper';
  className?: string;
  kenBurns?: boolean;
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

const VideoBackground = memo(({
  src,
  overlay = 'dark',
  className = '',
  kenBurns = true,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.load();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.8s] ease-out
                    ${kenBurns ? 'animate-kenBurns' : ''}
                    ${ready ? 'opacity-100' : 'opacity-0'}`}
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
