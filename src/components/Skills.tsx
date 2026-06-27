import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { skillCategories } from '../data/portfolio';

const fillClass = {
  blue: 'bg-gradient-to-r from-yellow-400 to-yellow-200',
  violet: 'bg-gradient-to-r from-orange-500 to-orange-300',
  gold: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
};

const iconBg = {
  blue: 'bg-yellow-400/12',
  violet: 'bg-orange-500/12',
  gold: 'bg-yellow-200/12',
};

function SkillBar({ label, value, variant }: { label: string; value: number; variant: 'blue' | 'violet' | 'gold' }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(value), 200);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs text-[#A89F7A] mb-1.5">
        <span>{label}</span>
        <span className="text-yellow-400 font-mono">{value}%</span>
      </div>
      <div className="h-1 bg-white/6 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${fillClass[variant]}`}
          style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const header = useReveal();
  const grid = useReveal();

  return (
    <section id="skills" className="relative z-10 py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div ref={header.ref}
        className={`transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-yellow-200 tracking-[3px] uppercase mb-3">// technical skills</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          What I <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">Work With</span>
        </h2>
        <p className="text-[#A89F7A] text-sm leading-relaxed max-w-lg mb-14">
          A focused toolkit built through academic projects, certified training, and years of hands-on application.
        </p>
      </div>

      <div ref={grid.ref}
        className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-100
                    ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {skillCategories.map((cat) => (
          <div key={cat.name}
            className="bg-[#13120A] border border-yellow-500/15 rounded-2xl p-7
                       hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${iconBg[cat.variant]}`}>
                {cat.icon}
              </div>
              <span className="text-sm font-semibold">{cat.name}</span>
            </div>
            {cat.skills.map((s) => (
              <SkillBar key={s.label} label={s.label} value={s.value} variant={cat.variant} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
