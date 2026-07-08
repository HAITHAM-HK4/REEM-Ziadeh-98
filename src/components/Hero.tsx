import { useTypewriter } from '../hooks/useTypewriter';
import { useReveal } from '../hooks/useReveal';
import { useTranslation } from '../contexts/TranslationContext';
import VideoBackground from './VideoBackground';

export default function Hero() {
  const { t, language } = useTranslation();
  const typed = useTypewriter();
  const content = useReveal();
  const stats = useReveal(0.1);

  return (
    <section id="hero" className="relative min-h-screen flex items-end md:items-center overflow-hidden bg-void">
      <VideoBackground src="https://res.cloudinary.com/e2kvlfyf/video/upload/hero-substation_p2ok4v.mp4" overlay="copper" />

      {/* Animated scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-copper/5 to-transparent animate-shimmer opacity-60" />
      </div>

      {/* Bottom gradient fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-t from-void via-void/80 to-transparent" />
      </div>

      <div className="relative z-10 container-main pb-24 md:pb-0 pt-24 sm:pt-32 w-full">
        <div
          ref={content.ref}
          className={`max-w-2xl transition-all duration-1000 ease-out ${
            content.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="hero-badge mb-4 sm:mb-6 text-[10px] sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper-light opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-copper-light" />
            </span>
            {t('hero.badge')}
          </div>

          <h1 className="heading-xl text-milk mb-3 sm:mb-4 drop-shadow-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('hero.name')}<br />
            <span className="text-copper-light">{t('hero.lastname')}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-milk-muted font-light mb-2 min-h-8">
            {typed}<span className="text-copper animate-pulse">|</span>
          </p>

          <p className="text-xs sm:text-sm md:text-base text-milk leading-relaxed max-w-lg mb-6 sm:mb-10 mt-4 sm:mt-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects" className="btn-primary min-h-[44px]">{t('hero.btnWork')}</a>
            <a href="#about" className="btn-secondary-dark backdrop-blur-sm min-h-[44px]">{t('hero.btnAbout')}</a>
          </div>
        </div>

        <div
          ref={stats.ref}
          className={`hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4 transition-all duration-1000 ease-out delay-200 ${
            stats.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}
        >
          {[
            { n: '1', l: t('hero.stats.exp') },
            { n: '2', l: t('hero.stats.projects') },
            { n: '2024', l: t('hero.stats.graduate') },
          ].map((s, i) => (
            <div
              key={s.l}
              className="card-dark px-6 py-4 text-center min-w-[120px] backdrop-blur-md bg-void-card/80 animate-floatY"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="text-2xl font-bold text-copper-light">{s.n}</div>
              <div className="text-[10px] text-milk-muted uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
                      text-milk-dim text-[10px] tracking-[0.3em] uppercase animate-floatY">
        <span>{t('hero.scroll')}</span>
        <div className="w-px h-10 bg-gradient-to-b from-copper to-transparent" />
      </div>
    </section>
  );
}
