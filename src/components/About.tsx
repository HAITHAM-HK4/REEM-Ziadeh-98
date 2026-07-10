import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import VideoBackground from './VideoBackground';
import ProfileFrame from './ProfileFrame';

// ─── Scroll-triggered reveal hook (fires once per element, direction-aware) ─
function useDirectionalReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function About() {
  const { t, language } = useTranslation();
  const section = useDirectionalReveal(0.1);
  const eyebrow = useDirectionalReveal(0.15);
  const title = useDirectionalReveal(0.15);
  const paragraph1 = useDirectionalReveal(0.15);
  const paragraph2 = useDirectionalReveal(0.15);
  const paragraph3 = useDirectionalReveal(0.15);
  const credential = useDirectionalReveal(0.15);
  const photo = useDirectionalReveal(0.15);

  // Shared, slowed-down easing to match the Skills section's fly-in feel
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const DURATION = '1400ms';

  return (
    <section
      ref={section.ref}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      <VideoBackground src="https://res.cloudinary.com/e2kvlfyf/video/upload/w_1280,q_auto,f_auto/about-power-lines_iipdk4.mp4" overlay="copper" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-copper/5 to-transparent animate-shimmer opacity-60" />
      </div>

      {/* Top gradient fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[2]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-b from-void via-void/80 to-transparent" />
      </div>

      {/* Bottom gradient fade for seamless transition to Skills section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-t from-void via-void/70 to-transparent" />
      </div>

      <div className="relative z-10 container-main py-20 sm:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-[1fr_minmax(340px,440px)] gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="max-w-2xl">
            {/* Eyebrow tag — slides in from the left */}
            <span
              ref={eyebrow.ref}
              className="tag-dark mb-4 sm:mb-5 backdrop-blur-sm text-[9px] sm:text-[10px] inline-block"
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: DURATION,
                transitionTimingFunction: EASE,
                opacity: eyebrow.visible ? 1 : 0,
                transform: eyebrow.visible ? 'translateX(0)' : 'translateX(-60px)',
              }}
            >
              {t('about.tag')}
            </span>

            {/* Title — flies in from the left with a slight rotation, more dramatic than the tag */}
            <h2
              ref={title.ref}
              className="heading-lg text-milk mb-4 sm:mb-6 drop-shadow-lg"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: DURATION,
                transitionTimingFunction: EASE,
                transitionDelay: '100ms',
                opacity: title.visible ? 1 : 0,
                transform: title.visible
                  ? 'translateX(0) translateY(0) rotateZ(0deg)'
                  : 'translateX(-90px) translateY(20px) rotateZ(-2deg)',
              }}
            >
              {t('about.title')}<br />
              <span className="text-copper-light">{t('about.titleHighlight')}</span>
            </h2>

            {/* Paragraphs — staggered fly-in from the left, one after another */}
            <div className="space-y-3 sm:space-y-4 text-milk-muted text-xs sm:text-sm leading-relaxed">
              <p
                ref={paragraph1.ref}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: DURATION,
                  transitionTimingFunction: EASE,
                  transitionDelay: '200ms',
                  opacity: paragraph1.visible ? 1 : 0,
                  transform: paragraph1.visible ? 'translateX(0)' : 'translateX(-50px)',
                }}
              >
                {t('about.p1')}
              </p>
              <p
                ref={paragraph2.ref}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: DURATION,
                  transitionTimingFunction: EASE,
                  transitionDelay: '320ms',
                  opacity: paragraph2.visible ? 1 : 0,
                  transform: paragraph2.visible ? 'translateX(0)' : 'translateX(-50px)',
                }}
              >
                {t('about.p2')}
              </p>
              <p
                ref={paragraph3.ref}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: DURATION,
                  transitionTimingFunction: EASE,
                  transitionDelay: '440ms',
                  opacity: paragraph3.visible ? 1 : 0,
                  transform: paragraph3.visible ? 'translateX(0)' : 'translateX(-50px)',
                }}
              >
                {t('about.p3')}
              </p>
            </div>

            {/* Credential card — arrives last, rising up from below with a soft scale-in */}
            <div
              ref={credential.ref}
              className="mt-6 sm:mt-8 card-dark p-4 sm:p-5 flex gap-3 sm:gap-4 items-start backdrop-blur-md bg-void-card/80"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: DURATION,
                transitionTimingFunction: EASE,
                transitionDelay: '600ms',
                opacity: credential.visible ? 1 : 0,
                transform: credential.visible
                  ? 'translateY(0) scale(1)'
                  : 'translateY(50px) scale(0.94)',
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-copper/15 flex items-center justify-center text-lg sm:text-xl shrink-0">
                🎓
              </div>
              <div>
                <h4 className="font-semibold text-milk text-xs sm:text-sm">{t('about.degree')}</h4>
                <p className="text-[10px] sm:text-xs text-milk-muted mt-1">{t('about.university')}</p>
                <span className="inline-block mt-2 text-[9px] sm:text-[10px] font-mono text-copper-light tracking-wider uppercase">
                  {t('about.graduated')}
                </span>
              </div>
            </div>
          </div>

          {/* Profile photo — flies in from the right with a counter-rotation, mirroring the title's motion */}
          <div
            ref={photo.ref}
            className="w-full px-2 sm:px-6 lg:px-0"
            style={{
              perspective: '1400px',
              transitionProperty: 'opacity, transform',
              transitionDuration: '1600ms',
              transitionTimingFunction: EASE,
              transitionDelay: '250ms',
              opacity: photo.visible ? 1 : 0,
              transform: photo.visible
                ? 'translateX(0) translateY(0) rotateY(0deg) rotateZ(0deg) scale(1)'
                : 'translateX(90px) translateY(30px) rotateY(18deg) rotateZ(3deg) scale(0.92)',
            }}
          >
            <ProfileFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
