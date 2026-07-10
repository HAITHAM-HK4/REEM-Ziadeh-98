import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Building2 } from 'lucide-react';
import { experiences } from '../data/portfolio';
import Section from './Section';
import { useTranslation } from '../contexts/TranslationContext';
import { memo } from 'react';

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  certificate: Award,
  building: Building2,
};

const Experience = () => {
  const { t, language } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Creative entrance animation: clip-path reveal + subtle 3D rotateY tilt
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -60,
      rotateY: -15,
      clipPath: 'inset(0 100% 0 0)',
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Section id="experience" tone="dark" className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://res.cloudinary.com/e2kvlfyf/video/upload/so_7/about-power-lines_iipdk4.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 30% 40%, rgba(212,98,42,0.18) 0%, transparent 60%),
              linear-gradient(105deg, rgba(15,15,16,0.88) 0%, rgba(15,15,16,0.55) 50%, rgba(15,15,16,0.25) 100%)
            `,
          }}
        />
      </div>

      {/* Top gradient fade for seamless transition from the previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[2]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-b from-void via-void/80 to-transparent" />
      </div>

      {/* Bottom gradient fade for seamless transition to the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-t from-void via-void/70 to-transparent" />
      </div>

      <div className="container-main relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="tag-dark mb-4 sm:mb-5 inline-block text-[9px] sm:text-[10px]">{t('experience.tag')}</span>
          <h2 className="heading-lg text-milk">
            {t('experience.title')} <span className="text-copper-light">{t('experience.titleHighlight')}</span>
          </h2>
          <p className="text-milk-muted text-xs sm:text-sm mt-4 max-w-md leading-relaxed font-sans">
            {t('experience.description')}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper/30 to-transparent" />

          {/* Glowing effect on timeline */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper to-transparent opacity-50" />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, index) => {
              const IconComponent = iconMap[exp.iconType || 'briefcase'];
              const expIndex = index + 1;

              return (
                <motion.div
                  key={exp.title}
                  variants={itemVariants}
                  className="relative pl-16 sm:pl-20"
                  style={{ transformPerspective: 1000 }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 sm:left-6 top-6 w-5 h-5 rounded-full bg-void border-2 border-copper shadow-[0_0_20px_rgba(212,98,42,0.4)] z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-copper" />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      rotateX: 2,
                      rotateY: -2,
                      scale: 1.01,
                      boxShadow: '0 25px 70px rgba(212, 98, 42, 0.18), 0 0 0 1px rgba(212, 98, 42, 0.25)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-void-card/60 to-void-card/30 backdrop-blur-md p-6 sm:p-7"
                  >
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-copper/10 via-transparent to-copper/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-copper via-copper-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header with icon and date */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-copper/20 to-copper/5 border border-copper/30 flex items-center justify-center text-copper-light group-hover:scale-110 transition-transform duration-300">
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-milk text-base sm:text-lg group-hover:text-copper-light transition-colors duration-300" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              {t(`exp${expIndex}.title`)}
                            </h3>
                            <p className="text-sm text-copper-light/80 mt-0.5">{t(`exp${expIndex}.org`)}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-copper tracking-widest bg-copper/5 border border-copper/20 px-3 py-1 rounded-full whitespace-nowrap">
                          {t(`exp${expIndex}.period`)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-milk-muted leading-relaxed mb-5 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {t(`exp${expIndex}.desc`)}
                      </p>

                      {/* Skills/Tags */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono px-2.5 py-1 border border-white/8 bg-white/[0.02] backdrop-blur-sm rounded text-milk-muted/90 group-hover:border-copper/15 group-hover:bg-copper/5 transition-colors duration-300"
                            >
                              {t(`exp${expIndex}.skill${skillIndex + 1}`)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default memo(Experience);
