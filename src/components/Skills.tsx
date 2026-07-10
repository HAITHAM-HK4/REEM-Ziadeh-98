import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTranslation } from '../contexts/TranslationContext';
import Section from './Section';
import SkillsBackground from './SkillsBackground';
import VideoBackground from './VideoBackground';

// ─── Data ──────────────────────────────────────────────────────────────────
const skillCategories = [
  {
    id: '01',
    nameKey: 'skills.category1',
    icon: '⚡',
    color: 'electric-orange',
    flyFrom: 'left' as const,
    skillKeys: [
      { key: 'skills.skill1', value: 88 },
      { key: 'skills.skill2', value: 82 },
      { key: 'skills.skill3', value: 85 },
      { key: 'skills.skill4', value: 86 },
      { key: 'skills.skill5', value: 80 },
    ],
  },
  {
    id: '02',
    nameKey: 'skills.category2',
    icon: '💻',
    color: 'electric-amber',
    flyFrom: 'bottom' as const,
    skillKeys: [
      { key: 'skills.skill6', value: 90 },
      { key: 'skills.skill7', value: 80 },
      { key: 'skills.skill8', value: 75 },
      { key: 'skills.skill9', value: 78 },
    ],
  },
  {
    id: '03',
    nameKey: 'skills.category3',
    icon: '🛠️',
    color: 'electric-red',
    flyFrom: 'right' as const,
    skillKeys: [
      { key: 'skills.skill10', value: 95 },
      { key: 'skills.skill11', value: 90 },
      { key: 'skills.skill12', value: 85 },
    ],
  },
];

const electricColors = {
  'electric-orange': { text: '#f97316', rgb: '249, 115, 22', dim: '#c2410c' },
  'electric-amber':  { text: '#f59e0b', rgb: '245, 158, 11', dim: '#b45309' },
  'electric-red':    { text: '#ef4444', rgb: '239, 68, 68',  dim: '#b91c1c' },
};

// ─── Angular skill meter (diagonal notches instead of a horizontal bar) ─────
interface MeterProps {
  labelKey: string;
  value: number;
  delay: number;
  color: string;
  active: boolean;
}

function AngularMeter({ labelKey, value, delay, color, active }: MeterProps) {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(0);
  const colors = electricColors[color as keyof typeof electricColors];
  const totalTicks = 20;
  const filledTicks = Math.round((display / 100) * totalTicks);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setDisplay(value), delay);
    return () => clearTimeout(t);
  }, [active, value, delay]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-milk/70 text-[10px] sm:text-[11px] font-medium tracking-wide">{t(labelKey)}</span>
        <span
          className="font-mono text-[11px] sm:text-xs font-bold tabular-nums"
          style={{ color: colors.text }}
        >
          {display}
        </span>
      </div>
      {/* Angular tick meter — diagonal slashes, not a rounded bar */}
      <div className="flex gap-[2px] h-3">
        {Array.from({ length: totalTicks }).map((_, i) => {
          const isFilled = i < filledTicks;
          return (
            <div
              key={i}
              className="flex-1 transition-all ease-out"
              style={{
                transform: 'skewX(-20deg)',
                background: isFilled
                  ? `linear-gradient(180deg, ${colors.text} 0%, ${colors.dim} 100%)`
                  : 'rgba(255,255,255,0.06)',
                boxShadow: isFilled ? `0 0 6px rgba(${colors.rgb}, 0.5)` : 'none',
                transitionDuration: '700ms',
                transitionDelay: `${delay + i * 12}ms`,
                opacity: isFilled ? 1 : 0.5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Identity Card ───────────────────────────────────────────────────────────
interface SkillCardProps {
  cat: typeof skillCategories[0];
}

function SkillCard({ cat }: SkillCardProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const colors = electricColors[cat.color as keyof typeof electricColors];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll fly-in origin per card (left / right / bottom)
  const hiddenTransform =
    cat.flyFrom === 'left'
      ? 'translateX(-120px) translateY(30px) rotateY(-25deg) rotateZ(-4deg)'
      : cat.flyFrom === 'right'
      ? 'translateX(120px) translateY(30px) rotateY(25deg) rotateZ(4deg)'
      : 'translateX(0) translateY(140px) rotateX(20deg)';

  return (
    <div
      ref={cardRef}
      className="transition-all ease-out"
      style={{
        perspective: '1400px',
        transitionDuration: '2500ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0) translateY(0) rotateY(0) rotateX(0) rotateZ(0)' : hiddenTransform,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-500"
        style={{
          borderColor: hovered ? `${colors.text}55` : 'rgba(255,255,255,0.06)',
          background: hovered
            ? 'linear-gradient(160deg, rgba(24,24,27,0.9) 0%, rgba(15,15,17,0.9) 100%)'
            : 'linear-gradient(160deg, rgba(20,20,22,0.75) 0%, rgba(12,12,14,0.75) 100%)',
          boxShadow: hovered
            ? `0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px ${colors.text}22, 0 0 40px rgba(${colors.rgb}, 0.12)`
            : '0 10px 30px rgba(0,0,0,0.4)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        {/* Diagonal accent stripe, top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${colors.dim}, ${colors.text}, transparent)` }}
        />

        {/* Oversized ghost icon watermark */}
        <div
          className="absolute -right-4 -top-2 text-[9rem] sm:text-[10rem] leading-none pointer-events-none select-none transition-all duration-700"
          style={{
            opacity: hovered ? 0.1 : 0.05,
            filter: `drop-shadow(0 0 30px ${colors.text})`,
            transform: hovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {cat.icon}
        </div>

        <div className="relative p-6 sm:p-7">
          {/* ID header row: big index number + label stack */}
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <span
                className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-1"
                style={{ color: colors.text }}
              >
                Module {cat.id}
              </span>
              <h3 className="font-bold text-milk text-sm sm:text-base uppercase tracking-wide leading-tight max-w-[10rem]">
                {t(cat.nameKey)}
              </h3>
            </div>
            <span
              className="font-mono text-4xl sm:text-5xl font-black leading-none select-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: `1.5px ${colors.text}`,
                opacity: 0.5,
              }}
            >
              {cat.id}
            </span>
          </div>

          {/* Angular divider */}
          <div
            className="h-px w-full mb-5 sm:mb-6"
            style={{ background: `linear-gradient(90deg, ${colors.text}44, transparent)` }}
          />

          {/* Angular meters */}
          <div className="space-y-4">
            {cat.skillKeys.map((s, i: number) => (
              <AngularMeter
                key={s.key}
                labelKey={s.key}
                value={s.value}
                delay={i * 100}
                color={cat.color}
                active={visible}
              />
            ))}
          </div>
        </div>

        {/* Bottom-right corner cut accent */}
        <div
          className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${colors.text}18 50%)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Skills() {
  const { t } = useTranslation();
  const header = useReveal(0.1);

  return (
    <Section id="skills" tone="dark" className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-void">
      {/* Top gradient fade for seamless transition from About section */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-[4]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-b from-void via-void/70 to-transparent" />
      </div>

      {/* Storm Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <VideoBackground src="https://res.cloudinary.com/e2kvlfyf/video/upload/w_1280,q_auto,f_auto/storm_lsas3q.mp4" overlay="dark" className="absolute inset-0 w-full h-full" />
      </div>

      {/* Gray Overlay — untouched */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, backgroundColor: '#71717a', opacity: 0.05 }}
      />

      {/* Animated background layer — untouched */}
      <div className="relative" style={{ zIndex: 3 }}>
        <SkillsBackground />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <div
          ref={header.ref}
          className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="tag-dark mb-4 sm:mb-5 inline-block text-[9px] sm:text-[10px]">{t('skills.tag')}</span>

          <h2 className="heading-lg text-milk mt-2">
            {t('skills.title')}{' '}
            <span className="relative inline-block">
              <span className="text-[#f97316]">{t('skills.titleHighlight')}</span>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#ea580c] via-[#f97316] to-transparent
                             transition-all duration-1000 delay-500
                             ${header.visible ? 'w-full' : 'w-0'}`}
              />
            </span>
          </h2>

          <p className="text-milk-muted text-xs sm:text-sm mt-4 sm:mt-5 max-w-lg leading-relaxed font-sans">
            {t('skills.description')}
          </p>
        </div>

        {/* Grid — each card flies in from its own direction on scroll */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-20">
          {skillCategories.map((cat) => (
            <SkillCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
