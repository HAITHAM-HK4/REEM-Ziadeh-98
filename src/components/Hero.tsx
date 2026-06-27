import { useTypewriter } from '../hooks/useTypewriter';

export default function Hero() {
  const typed = useTypewriter();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative z-10 px-6 md:px-16">
      <div className="text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/8 border border-yellow-400/30
                        px-5 py-2 rounded-full font-mono text-xs text-yellow-400 tracking-widest
                        mb-8 animate-[fadeSlideDown_0.8s_ease_both]">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          ⚡ Electrical Power Engineer
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-5
                       animate-[fadeSlideUp_0.9s_ease_0.2s_both]">
          <span className="text-[#FFF9E6]">Reem </span>
          <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Ziadeh
          </span>
        </h1>

        {/* Typewriter */}
        <div className="font-mono text-lg md:text-2xl text-orange-500 mb-6 min-h-8
                        animate-[fadeSlideUp_0.9s_ease_0.4s_both]">
          {typed}
          <span className="animate-pulse">|</span>
        </div>

        {/* Sub */}
        <p className="text-[#A89F7A] text-base max-w-xl mx-auto leading-relaxed mb-10
                      animate-[fadeSlideUp_0.9s_ease_0.5s_both]">
          Electrical Power Engineering graduate from Tishreen University, Lattakia — specializing
          in power distribution systems, protection design, and electrical installations.
        </p>

        {/* CTA */}
        <div className="flex gap-4 justify-center flex-wrap animate-[fadeSlideUp_0.9s_ease_0.6s_both]">
          <a href="#projects"
            className="bg-gradient-to-br from-yellow-400 to-orange-500 text-[#0A0A08] font-bold
                       px-9 py-3.5 rounded-lg text-sm shadow-[0_0_30px_rgba(255,215,0,0.3)]
                       hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(255,215,0,0.55)]
                       transition-all">
            View Projects
          </a>
          <a href="#contact"
            className="border border-white/15 text-[#FFF9E6] px-9 py-3.5 rounded-lg text-sm
                       hover:border-yellow-400 hover:text-yellow-400 transition-all">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center
                      gap-2 text-[#A89F7A] text-xs tracking-widest animate-bounce">
        <span>SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-yellow-400 to-transparent" />
      </div>
    </section>
  );
}
