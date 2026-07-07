export default function SkillsBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Electric Orange Ambient Gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] bg-[#ea580c]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Particles - Electric Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#f97316', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 3)],
              opacity: Math.random() * 0.5 + 0.2,
              animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Soft Glowing Orbs */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-[#f97316]/10 blur-[60px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-[#f59e0b]/10 blur-[80px] animate-pulse pointer-events-none" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-[60%] left-[60%] w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-[#ef4444]/10 blur-[50px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      {/* Embedded style tag for self-contained, GPU-accelerated CSS animations */}
      <style>{`
        @keyframes electricSpark {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          10% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5) translateY(-20px);
          }
          90% {
            opacity: 0.3;
            transform: scale(0.8) translateY(-40px);
          }
        }
        @keyframes lightningFlash {
          0%, 100% {
            opacity: 0;
          }
          5%, 15%, 25% {
            opacity: 0.8;
          }
          10%, 20% {
            opacity: 0.2;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.08;
          }
        }
        @keyframes energyFlow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes circuitDash {
          0% {
            stroke-dashoffset: 100%;
          }
          100% {
            stroke-dashoffset: 0%;
          }
        }
        @keyframes circuitGlow {
          0%, 100% {
            opacity: 0.3;
            filter: blur(1px);
          }
          50% {
            opacity: 0.8;
            filter: blur(3px);
          }
        }
        .animate-electric-spark {
          animation: electricSpark 3s ease-in-out infinite;
        }
        .animate-lightning-flash {
          animation: lightningFlash 8s ease-in-out infinite;
        }
        .animate-node-glow {
          transform-origin: center;
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .animate-grid-subtle {
          animation: gridPulse 6s ease-in-out infinite;
        }
        .animate-energy-flow {
          animation: energyFlow 8s ease-in-out infinite;
        }
        .animate-circuit-pulse {
          stroke-dasharray: 120 180;
          animation: circuitDash 8s linear infinite;
        }
        .animate-circuit-pulse-fast {
          stroke-dasharray: 80 120;
          animation: circuitDash 5s linear infinite;
        }
        .animate-circuit-pulse-slow {
          stroke-dasharray: 150 250;
          animation: circuitDash 12s linear infinite;
        }
      `}</style>

      {/* Lightning Flash Effect */}
      <div className="absolute inset-0 animate-lightning-flash pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-[#f97316] via-[#f59e0b] to-transparent blur-[1px]" />
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-[#f59e0b] via-[#ef4444] to-transparent blur-[1px]" />
      </div>

      {/* Electric Sparks */}
      <div className="absolute top-[20%] left-[15%] animate-electric-spark pointer-events-none">
        <div className="w-2 h-2 bg-[#f97316] rounded-full blur-[1px]" />
      </div>
      <div className="absolute top-[60%] right-[20%] animate-electric-spark pointer-events-none" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-[#f59e0b] rounded-full blur-[1px]" />
      </div>
      <div className="absolute bottom-[30%] left-[30%] animate-electric-spark pointer-events-none" style={{ animationDelay: '2s' }}>
        <div className="w-2 h-2 bg-[#ef4444] rounded-full blur-[1px]" />
      </div>

      {/* Energy Flow Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#f97316]/20 to-transparent animate-energy-flow" />
        <div className="absolute left-[30%] w-px h-full bg-gradient-to-b from-transparent via-[#f59e0b]/20 to-transparent animate-energy-flow" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[70%] w-px h-full bg-gradient-to-b from-transparent via-[#ef4444]/20 to-transparent animate-energy-flow" style={{ animationDelay: '4s' }} />
        <div className="absolute left-[90%] w-px h-full bg-gradient-to-b from-transparent via-[#f97316]/20 to-transparent animate-energy-flow" style={{ animationDelay: '6s' }} />
      </div>

      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 animate-grid-subtle opacity-5">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* SVG Animated Circuit Layout with Electric Theme */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ mixBlendMode: 'screen' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        {/* Definitions for Gradients */}
        <defs>
          <linearGradient id="electricGreyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333333" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4a4a4a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5a5a5a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="electricYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="electricPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a4a4a" stopOpacity="0" />
            <stop offset="50%" stopColor="#5a5a5a" stopOpacity="1" />
            <stop offset="100%" stopColor="#4a4a4a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- CIRCUIT TRACE 1: TOP LEFT TO MIDDLE - Electric Grey --- */}
        <path
          d="M -50 150 L 250 150 L 350 250 L 350 450 L 450 550 L 600 550"
          fill="none"
          stroke="url(#electricGreyGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.15"
        />
        <path
          d="M -50 150 L 250 150 L 350 250 L 350 450 L 450 550 L 600 550"
          fill="none"
          stroke="url(#electricPulseGrad)"
          strokeWidth="2"
          className="animate-circuit-pulse"
        />
        <circle cx="250" cy="150" r="3" fill="#5a5a5a" opacity="0.4" />
        <circle cx="350" cy="250" r="3" fill="#5a5a5a" opacity="0.4" />
        <circle cx="600" cy="550" r="5" fill="#5a5a5a" className="animate-node-glow" />
        <circle cx="600" cy="550" r="8" fill="none" stroke="#4a4a4a" strokeWidth="1" className="animate-node-glow" />

        {/* --- CIRCUIT TRACE 2: BOTTOM RIGHT TO MID RIGHT - Electric Yellow --- */}
        <path
          d="M 1500 650 L 1150 650 L 1050 550 L 1050 350 L 950 250 L 800 250"
          fill="none"
          stroke="url(#electricYellowGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.15"
        />
        <path
          d="M 1500 650 L 1150 650 L 1050 550 L 1050 350 L 950 250 L 800 250"
          fill="none"
          stroke="url(#electricPulseGrad)"
          strokeWidth="2"
          className="animate-circuit-pulse-slow"
        />
        <circle cx="1150" cy="650" r="3" fill="#fbbf24" opacity="0.4" />
        <circle cx="1050" cy="550" r="3" fill="#fbbf24" opacity="0.4" />
        <circle cx="800" cy="250" r="5" fill="#fbbf24" className="animate-node-glow" style={{ animationDelay: '-2s' }} />
        <circle cx="800" cy="250" r="8" fill="none" stroke="#f59e0b" strokeWidth="1" className="animate-node-glow" style={{ animationDelay: '-2s' }} />

        {/* --- CIRCUIT TRACE 3: BOTTOM LEFT BRANCH - Electric Orange --- */}
        <path
          d="M -50 600 L 150 600 L 250 500 L 150 400 L 300 400"
          fill="none"
          stroke="url(#electricYellowGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.12"
        />
        <path
          d="M -50 600 L 150 600 L 250 500 L 150 400 L 300 400"
          fill="none"
          stroke="url(#electricPulseGrad)"
          strokeWidth="2"
          className="animate-circuit-pulse-fast"
        />
        <circle cx="150" cy="600" r="3" fill="#f97316" opacity="0.3" />
        <circle cx="250" cy="500" r="3" fill="#f97316" opacity="0.3" />
        <circle cx="300" cy="400" r="4.5" fill="#f97316" className="animate-node-glow" style={{ animationDelay: '-1s' }} />

        {/* --- CIRCUIT TRACE 4: TOP RIGHT BRANCH - Electric Grey --- */}
        <path
          d="M 1500 150 L 1200 150 L 1100 250 L 1100 100 L 950 100"
          fill="none"
          stroke="url(#electricGreyGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.12"
        />
        <path
          d="M 1500 150 L 1200 150 L 1100 250 L 1100 100 L 950 100"
          fill="none"
          stroke="url(#electricPulseGrad)"
          strokeWidth="2"
          className="animate-circuit-pulse"
          style={{ animationDelay: '-4s' }}
        />
        <circle cx="1200" cy="150" r="3" fill="#5a5a5a" opacity="0.3" />
        <circle cx="1100" cy="250" r="3" fill="#5a5a5a" opacity="0.3" />
        <circle cx="950" cy="100" r="4.5" fill="#5a5a5a" className="animate-node-glow" style={{ animationDelay: '-3s' }} />

        {/* --- CIRCUIT TRACE 5: CENTER CONNECTIVE AXIS - Electric Yellow --- */}
        <path
          d="M 400 0 L 400 100 L 500 200 L 650 200 L 750 100 L 750 0"
          fill="none"
          stroke="url(#electricYellowGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.1"
        />
        <path
          d="M 400 0 L 400 100 L 500 200 L 650 200 L 750 100 L 750 0"
          fill="none"
          stroke="url(#electricPulseGrad)"
          strokeWidth="2"
          className="animate-circuit-pulse-slow"
          style={{ animationDelay: '-6s' }}
        />
        <circle cx="500" cy="200" r="3" fill="#fbbf24" opacity="0.3" />
        <circle cx="650" cy="200" r="3" fill="#fbbf24" opacity="0.3" />
      </svg>
    </div>
  );
}
