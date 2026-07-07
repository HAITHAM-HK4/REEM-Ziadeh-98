import { useState } from 'react';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ProfileFrame({
  src = '/images/profile.jpg',
  alt = 'Reem Ziadeh',
  className = '',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px] mx-auto animate-floatY ${className}`}>
      {/* Left side effects */}
      <div className="absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 pointer-events-none" aria-hidden="true">
        <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-copper/80 to-transparent animate-sideBeamLeft" />
        <div className="w-1 rounded-full bg-gradient-to-b from-transparent via-copper to-transparent animate-sidePulse" />
        <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-copper-light/60 to-transparent animate-sideBeamLeft [animation-delay:0.8s]" />
        <div className="w-2 h-2 rounded-full bg-copper/60 blur-[2px] animate-pulse" />
      </div>

      {/* Right side effects */}
      <div className="absolute -right-6 sm:-right-10 top-1/2 -translate-y-1/2 flex flex-col items-start gap-3 pointer-events-none" aria-hidden="true">
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-copper/80 to-transparent animate-sideBeamRight" />
        <div className="w-1 rounded-full bg-gradient-to-b from-transparent via-copper-light to-transparent animate-sidePulse [animation-delay:0.5s]" />
        <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-copper-light/60 to-transparent animate-sideBeamRight [animation-delay:1.2s]" />
        <div className="w-2 h-2 rounded-full bg-copper-light/60 blur-[2px] animate-pulse [animation-delay:0.7s]" />
      </div>

      {/* Outer glow rings */}
      <div className="absolute -inset-6 sm:-inset-8 rounded-[2rem] bg-copper/5 blur-2xl animate-glowPulse pointer-events-none" aria-hidden="true" />
      <div className="absolute -inset-3 rounded-[1.75rem] border border-copper/20 pointer-events-none" aria-hidden="true" />

      <div className="profile-frame group relative animate-glowPulse">
        <div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-copper/70 via-copper/25 to-copper/50 opacity-90 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] bg-void-card/90 backdrop-blur-md">
          {!failed ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`w-full h-full object-cover object-top transition-all duration-700
                          group-hover:scale-[1.04]
                          ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : null}

          {(!loaded || failed) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-copper/40 flex items-center justify-center
                              bg-copper/10 text-4xl font-semibold text-copper-light tracking-wide">
                RZ
              </div>
              <p className="text-[11px] font-mono text-milk-muted tracking-[0.18em] uppercase leading-relaxed">
                Your photo here
                <br />
                <span className="text-copper-light/80">public/images/profile.jpg</span>
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-void/10 pointer-events-none" />

          {/* Side inner shine */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-copper/10 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-copper/10 to-transparent pointer-events-none" />

          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-copper/60 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-copper/60 rounded-bl-xl pointer-events-none" />
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-copper/30 rounded-tl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-copper/30 rounded-br-lg pointer-events-none" />
        </div>
      </div>

      <p className="mt-5 text-center text-xs font-mono text-milk-muted tracking-[0.3em] uppercase">
        Reem Ziadeh
      </p>
    </div>
  );
}
