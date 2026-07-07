import { useEffect, useState } from 'react';

interface Props {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [images.length]);

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                   text-milk hover:text-copper hover:border-copper transition-all duration-300 bg-white/5 z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-xs font-mono tracking-widest text-milk-muted">
        {index + 1} / {images.length}
      </div>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 md:left-6 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 flex items-center justify-center
                     text-milk text-xl hover:text-copper hover:border-copper transition-all duration-300 bg-white/5 shrink-0 z-10"
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="max-w-full max-h-[85vh] object-contain rounded-lg select-none"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 flex items-center justify-center
                     text-milk text-xl hover:text-copper hover:border-copper transition-all duration-300 bg-white/5 shrink-0 z-10"
          aria-label="Next image"
        >
          →
        </button>
      )}
    </div>
  );
}