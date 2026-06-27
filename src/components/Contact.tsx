import { useReveal } from '../hooks/useReveal';

const cards = [
  { icon: '✉️', label: 'Email', value: 'reem.ziadeh@email.com', href: 'mailto:reem.ziadeh@email.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/reemziadeh', href: 'https://linkedin.com' },
  { icon: '📍', label: 'Location', value: 'Lattakia, Syria', href: '#' },
];

export default function Contact() {
  const header = useReveal();
  const cardsReveal = useReveal();

  return (
    <section id="contact" className="relative z-10 py-24 px-6 md:px-16 max-w-2xl mx-auto text-center">
      <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.07)_0%,transparent_70%)]
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div ref={header.ref}
        className={`transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-yellow-200 tracking-[3px] uppercase mb-3">// contact</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Let's <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">Connect</span>
        </h2>
        <p className="text-[#A89F7A] text-sm leading-relaxed">
          Open to opportunities in power engineering, electrical design, and project collaboration.
        </p>
      </div>

      <div ref={cardsReveal.ref}
        className={`flex gap-4 justify-center flex-wrap mt-10 transition-all duration-700 delay-100
                    ${cardsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {cards.map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
            className="bg-[#13120A] border border-yellow-500/15 rounded-2xl p-6 text-center flex-1 min-w-[150px]
                       hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,215,0,0.15)]
                       transition-all duration-300 no-underline text-inherit">
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-[10px] text-[#A89F7A] tracking-widest uppercase mb-1">{c.label}</div>
            <div className="text-xs font-medium">{c.value}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
