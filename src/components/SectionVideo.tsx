import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  label: string;
  caption?: string;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function SectionVideo({
  src,
  label,
  caption,
  variant = 'light',
  className = '',
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          videoRef.current?.play().catch(() => {});
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const frameClass = variant === 'dark' ? 'video-frame' : 'video-frame-light';

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-1000 ease-out
                  ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'}
                  ${className}`}
    >
      <div className={`${frameClass} group animate-glowPulse`}>
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-copper/40 via-transparent to-copper/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setReady(true)}
            className={`w-full h-full object-cover transition-all duration-[2s] ease-out
                        group-hover:scale-105
                        ${ready ? 'opacity-100' : 'opacity-0'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-stone/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-copper" />
            </span>
            <span className="text-[10px] font-mono text-white/90 tracking-widest uppercase backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>

          {caption && (
            <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-xs text-white/90 leading-relaxed backdrop-blur-md bg-black/30 rounded-xl px-4 py-3">
                {caption}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-[10px] font-mono text-stone-muted tracking-[0.2em] uppercase text-center md:text-left">
        {label}
      </p>
    </div>
  );
}
