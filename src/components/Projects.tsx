import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTranslation } from '../contexts/TranslationContext';
import { projects } from '../data/portfolio';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import ImageLightbox from './ImageLightbox';

const tagStyle = {
  blue: 'bg-yellow-400/8 border-yellow-400/25 text-yellow-400',
  gold: 'bg-orange-500/10 border-orange-500/30 text-orange-500',
  violet: 'bg-yellow-200/8 border-yellow-200/25 text-yellow-200',
};

const gradStyle = {
  'blue-grad': 'bg-gradient-to-br from-yellow-400/8 to-orange-500/15',
  'gold-grad': 'bg-gradient-to-br from-orange-500/10 to-yellow-400/12',
  'violet-grad': 'bg-gradient-to-br from-yellow-200/8 to-orange-500/10',
};

export default function Projects() {
  const { t, language } = useTranslation();
  const header = useReveal();
  const grid = useReveal();
  const [selected, setSelected] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openModal = (p: Project) => {
    setSelected(p);
    window.dispatchEvent(new Event('modal:open'));
  };

  const closeModal = () => {
    setSelected(null);
    window.dispatchEvent(new Event('modal:close'));
  };

  const openLightbox = (e: React.MouseEvent, images: string[], index: number) => {
    e.stopPropagation(); // Prevent the card click (openModal) from firing
    setLightbox({ images, index });
  };

  return (
    <section id="projects" className="relative z-10 py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div ref={header.ref}
        className={`transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-yellow-200 tracking-[3px] uppercase mb-3">{t('projects.tag')}</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t('projects.title')} <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">{t('projects.titleHighlight')}</span>
        </h2>
        <p className="text-[#A89F7A] text-sm leading-relaxed max-w-lg mb-14">
          {t('projects.description')}
        </p>
      </div>

      <div ref={grid.ref}
        className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-100
                    ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {projects.map((p, index) => (
          <div key={p.id} onClick={() => openModal(p)}
            className="bg-[#13120A] border border-yellow-500/15 rounded-2xl overflow-hidden cursor-pointer
                       hover:border-yellow-400/50 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(255,215,0,0.12)]
                       transition-all duration-300 group">
            <div className={`h-48 ${gradStyle[p.gradientClass as keyof typeof gradStyle]}`}>
              {p.images && p.images.length > 0 ? (
                <div className="grid grid-cols-2 grid-rows-2 gap-0.5 h-full">
                  {p.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden cursor-zoom-in"
                      onClick={(e) => openLightbox(e, p.images!, i)}
                    >
                      <img
                        src={img}
                        alt={`${p.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-200"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-8xl opacity-40">{p.icon}</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <span className={`inline-block border px-3 py-0.5 rounded-full font-mono text-[10px] tracking-widest mb-3 ${tagStyle[p.tagVariant]}`}>
                {p.tag}
              </span>
              <h3 className="text-base font-semibold mb-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${index + 1}.title`)}</h3>
              <p className="text-xs text-[#A89F7A] leading-relaxed line-clamp-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${index + 1}.overview`)}</p>
            </div>
            <div className="px-6 pb-5 border-t border-yellow-500/10 pt-4 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {p.tools.slice(0, 3).map((t) => (
                  <span key={t} className="bg-white/5 border border-white/8 px-2 py-0.5 rounded-full text-[10px] text-[#A89F7A]">{t}</span>
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center
                              justify-center text-yellow-400 text-sm group-hover:bg-yellow-400 group-hover:text-[#0A0A08] transition-all">
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selected}
        onClose={closeModal}
        onImageClick={(images, index) => setLightbox({ images, index })}
      />

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}