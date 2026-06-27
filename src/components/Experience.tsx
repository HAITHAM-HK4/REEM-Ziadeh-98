import { useReveal } from '../hooks/useReveal';
import { experiences } from '../data/portfolio';

export default function Experience() {
  const header = useReveal();
  const grid = useReveal();

  return (
    <section id="experience" className="relative z-10 py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div ref={header.ref}
        className={`transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-yellow-200 tracking-[3px] uppercase mb-3">// experience</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          My <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">Journey</span>
        </h2>
        <p className="text-[#A89F7A] text-sm leading-relaxed max-w-lg mb-14">
          A blend of academic engineering and professional real-world experience.
        </p>
      </div>

      <div ref={grid.ref}
        className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-100
                    ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {experiences.map((exp) => (
          <div key={exp.title}
            className="bg-[#13120A] border border-yellow-500/15 rounded-2xl p-8 relative overflow-hidden
                       hover:border-yellow-400/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="font-mono text-xs text-yellow-400 tracking-widest mb-3">{exp.period}</div>
            <h3 className="text-base font-semibold mb-1.5">{exp.title}</h3>
            <p className="text-sm text-orange-500 mb-4">{exp.org}</p>
            <p className="text-xs text-[#A89F7A] leading-relaxed">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
