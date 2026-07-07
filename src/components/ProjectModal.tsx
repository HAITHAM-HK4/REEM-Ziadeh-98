import { useEffect } from 'react';
import { Project } from '../types';
import { useTranslation } from '../contexts/TranslationContext';

interface Props {
  project: Project | null;
  onClose: () => void;
  onImageClick: (images: string[], index: number) => void;
}

export default function ProjectModal({ project, onClose, onImageClick }: Props) {
  const { t, language } = useTranslation();
  const projIndex = project?.id.replace('proj', '');
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8 bg-void/90 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-void-card/95 border border-white/5 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent" />

        <div className="p-7 md:p-9">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono text-copper tracking-widest uppercase font-bold">{project.tag}</span>
              <h3 className="text-xl md:text-2xl font-bold text-milk mt-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${projIndex}.title`)}</h3>
              <p className="text-xs text-milk-muted/80 mt-1 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${projIndex}.subtitle`)}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                         text-milk-muted hover:text-copper hover:border-copper shrink-0 transition-all duration-300 bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Image gallery (only if project has images) */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-8">
              {project.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="aspect-video overflow-hidden rounded-lg border border-white/5 cursor-zoom-in"
                  onClick={() => onImageClick(project.images!, i)}
                >
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-milk-muted leading-relaxed mb-8 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${projIndex}.overview`)}</p>

          {/* Highlights section */}
          <h4 className="text-[10px] font-mono tracking-widest uppercase text-copper font-bold mb-4">{t('modal.keyAccomplishments')}</h4>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {project.highlights.map((h, i) => (
              <div key={h.title} className="p-4 bg-void-soft/50 border border-white/5 rounded-xl">
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="text-xs font-bold text-milk mb-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${projIndex}.highlight${i + 1}.title`)}</div>
                <div className="text-[11px] text-milk-muted leading-relaxed font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`proj${projIndex}.highlight${i + 1}.desc`)}</div>
              </div>
            ))}
          </div>

          {/* Tools / Technologies */}
          <h4 className="text-[10px] font-mono tracking-widest uppercase text-copper font-bold mb-3">{t('modal.projectToolkit')}</h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span key={t} className="text-[10px] font-mono px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-milk-muted hover:border-copper/30 hover:text-milk transition-colors duration-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}