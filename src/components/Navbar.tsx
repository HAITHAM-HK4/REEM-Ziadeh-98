import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Languages } from 'lucide-react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { language, toggleLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal open/close listeners (keeps navbar hidden while modal is open)
  useEffect(() => {
    const onModalOpen = () => setModalOpen(true);
    const onModalClose = () => setModalOpen(false);

    window.addEventListener('modal:open', onModalOpen);
    window.addEventListener('modal:close', onModalClose);

    return () => {
      window.removeEventListener('modal:open', onModalOpen);
      window.removeEventListener('modal:close', onModalClose);
    };
  }, []);

  // Scroll behavior: show navbar for 1s after scrolling stops, then hide.
  // Always visible at the very top of the page.
  useEffect(() => {
    const handleScroll = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);

      const atTop = window.scrollY <= 10;

      if (atTop) {
        setHidden(false);
        return;
      }

      setHidden(false); // show while scrolling / right after stopping

      hideTimer.current = setTimeout(() => {
        // Re-check position in case user scrolled back to top during the delay
        if (window.scrollY > 10) {
          setHidden(true);
        }
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const isHidden = hidden || modalOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5
                  transition-all duration-500 ease-in-out
                  ${isHidden ? '-translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between
                      bg-void/60 backdrop-blur-xl border border-white/8
                      rounded-2xl px-6 py-4">
        <a href="#hero" className="text-lg font-bold tracking-tight text-milk">
          Reem<span className="text-copper">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}
              className="text-xs font-medium tracking-widest uppercase text-milk-muted
                         hover:text-copper-light transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleLanguage}
          className="hidden md:inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-copper/30 px-6 py-2.5 text-xs tracking-widest uppercase"
        >
          <Languages className="w-4 h-4" />
          {language === 'en' ? 'AR' : 'EN'}
        </button>

        <button className="md:hidden text-milk text-2xl p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </nav>

        <div className="md:hidden max-w-6xl mx-auto mt-2 bg-void/95 backdrop-blur-xl border border-white/8
                        rounded-2xl p-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-milk-muted hover:text-copper-light py-3 min-h-[44px] flex items-center">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              toggleLanguage();
              setOpen(false);
            }}
            className="bg-copper hover:bg-copper-light text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-copper/30 px-6 py-3 text-xs tracking-widest uppercase min-h-[44px] flex items-center justify-center gap-2"
          >
            <Languages className="w-4 h-4" />
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      
    </header>
  );
}