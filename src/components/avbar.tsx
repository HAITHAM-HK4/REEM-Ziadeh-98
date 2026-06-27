import { useState } from 'react';

const links = ['about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5
                    bg-black/85 backdrop-blur-xl border-b border-yellow-500/15">
      <div className="font-mono text-lg tracking-widest text-yellow-400">
        RZ<span className="text-orange-500">.</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {links.map((l) => (
          <a key={l} href={`#${l}`}
            className="text-yellow-900/70 text-xs font-medium tracking-widest uppercase
                       hover:text-yellow-400 transition-colors">
            {l}
          </a>
        ))}
        <button
          onClick={() => alert('🔄 Arabic translation coming soon!\nالترجمة العربية قريباً')}
          className="border border-yellow-500/20 text-yellow-900/60 px-4 py-1.5 rounded-full
                     text-xs tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-all">
          عربي <span className="text-[10px] opacity-50 font-mono">soon</span>
        </button>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden text-yellow-400 text-xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-yellow-500/15
                        flex flex-col items-center gap-4 py-6 md:hidden">
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}
              className="text-yellow-900/70 text-sm uppercase tracking-widest hover:text-yellow-400 transition-colors">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
