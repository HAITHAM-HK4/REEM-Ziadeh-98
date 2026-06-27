import { useEffect } from 'react';
import { Project } from '../types';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-[500] flex items-center justify-center p-8
                     bg-black/85 backdrop-blur-lg transition-opacity duration-300
                     ${project ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#1a1908] border border-yellow-500/15 rounded-2xl w-full max-w-2xl
                      max-h-[85vh] overflow-y-auto scale-100 transition-transform duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1908] border-b border-yellow-500/15 px-8 py-6 z-10
                        flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
            <p className="text-xs text-[#A89F7A]">{project.subtitle}</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center
                       justify-center text-[#A89F7A] hover:bg-white/12 hover:text-white transition-all flex-shrink-0">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-7">
          <div>
            <h4 className="font-mono text-[10px] text-yellow-200 tracking-[2px] uppercase mb-3">Overview</h4>
            <p className="text-sm text-[#A89F7A] leading-relaxed">{project.overview}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-yellow-200 tracking-[2px] uppercase mb-3">Key Highlights</h4>
            <div className="grid grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <div key={h.title} className="bg-[#13120A] border border-yellow-500/15 rounded-xl p-4">
                  <div className="text-2xl mb-1.5">{h.icon}</div>
                  <div className="text-xs font-semibold mb-1">{h.title}</div>
                  <div className="text-[11px] text-[#A89F7A]">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-yellow-200 tracking-[2px] uppercase mb-3">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span key={t} className="bg-yellow-400/8 border border-yellow-400/20 text-yellow-400
                                         px-3 py-1.5 rounded-full text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
