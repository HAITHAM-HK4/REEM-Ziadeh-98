import { memo } from 'react';

const ExperienceBackground = memo(() => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d12 50%, #0a0a0f 100%)',
        }}
      />

      {/* Single soft glow - top left (orange/copper) */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,98,42,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Single soft glow - bottom right (teal) */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Very faint dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4622a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
});

export default ExperienceBackground;
