import { useReveal } from '../hooks/useReveal';

const stats = [
  { num: '8+', label: 'Years Experience' },
  { num: '2+', label: 'Projects Done' },
  { num: '2024', label: 'Graduate' },
];

export default function About() {
  const header = useReveal();
  const photo = useReveal();
  const text = useReveal();

  return (
    <section id="about" className="relative z-10 py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div ref={header.ref}
        className={`transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-yellow-200 tracking-[3px] uppercase mb-3">// about me</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Who is <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">Reem?</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-center">
        {/* Photo */}
        <div ref={photo.ref}
          className={`transition-all duration-700 delay-100 ${photo.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-[#13120A] border border-yellow-500/15
                            flex flex-col items-center justify-center gap-3 text-[#A89F7A] text-sm relative overflow-hidden">
              {/* Corner decorations */}
              <span className="absolute top-[-8px] left-[-8px] w-14 h-14 border-t-2 border-l-2 border-yellow-400 rounded-tl" />
              <span className="absolute bottom-[-8px] right-[-8px] w-14 h-14 border-b-2 border-r-2 border-yellow-400 rounded-br" />
              <span className="text-6xl opacity-30">👩‍💼</span>
              <span>Photo</span>
            </div>
            {/* Stats */}
            <div className="flex gap-4 mt-5">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 bg-[#13120A] border border-yellow-500/15 rounded-xl p-3 text-center">
                  <div className="font-mono text-2xl font-bold bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {s.num}
                  </div>
                  <div className="text-[10px] text-[#A89F7A] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={text.ref}
          className={`transition-all duration-700 delay-200 ${text.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4 text-[#A89F7A] text-sm leading-relaxed">
            <p>I'm an <strong className="text-[#FFF9E6]">Electrical Power Engineering</strong> graduate from Tishreen University (2016–2024), passionate about power distribution systems, protection engineering, and smart electrical design.</p>
            <p>My academic journey gave me hands-on experience with <strong className="text-[#FFF9E6]">DIALux, Revit, and ETABS</strong> — tools I used to design the complete electrical supply system for a four-floor academic institute, including lightning protection studies.</p>
            <p>Beyond engineering, I bring <strong className="text-[#FFF9E6]">over 8 years</strong> of professional freelance work in document services — printing, scanning, and digital operations — which sharpened my precision, client communication, and reliability.</p>
          </div>

          {/* Education card */}
          <div className="mt-6 bg-[#13120A] border border-yellow-500/15 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500
                            flex items-center justify-center text-xl flex-shrink-0">🎓</div>
            <div>
              <h4 className="text-sm font-semibold mb-1">B.Sc. Electrical Power Engineering</h4>
              <p className="text-xs text-[#A89F7A]">Tishreen University, Faculty of Mechanical & Electrical Engineering</p>
              <p className="text-xs text-[#A89F7A]">Lattakia, Syria · 2016 – 2024</p>
              <span className="mt-2 inline-block bg-yellow-400/10 border border-yellow-400/30
                               text-yellow-400 px-3 py-0.5 rounded-full text-[10px] font-mono">
                GRADUATED 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
