import { Project, SkillCategory, ExperienceItem } from '../types';

export const projects: Project[] = [
  {
    id: 'proj1',
    title: '4-Floor Academic Institute — Full Electrical Supply',
    subtitle: 'Graduation Project · 2024',
    tag: 'GRADUATION PROJECT',
    tagVariant: 'blue',
    icon: '🏫',
    gradientClass: 'blue-grad',
    tools: ['DIALux', 'AutoCAD', 'Revit MEP', 'ETABS', 'MS Excel'],
    overview:
      'Designed a complete electrical power distribution system for a four-floor academic institute. The project encompassed everything from load calculations and single-line diagrams to detailed panel board layouts and cable sizing — all compliant with Syrian and international electrical standards.',
    highlights: [
      { icon: '💡', title: 'Lighting Design', desc: 'Full DIALux simulation across all floors' },
      { icon: '⚡', title: 'Power Distribution', desc: 'Switchboards, feeders & branch circuits' },
      { icon: '📐', title: 'Technical Drawings', desc: 'AutoCAD & Revit layout plans' },
      { icon: '🔢', title: 'Load Analysis', desc: 'Complete load & demand calculations' },
    ],
  },
  {
    id: 'proj2',
    title: 'Lightning Protection System Design',
    subtitle: 'Protection Engineering Study · 2024',
    tag: 'PROTECTION STUDY',
    tagVariant: 'gold',
    icon: '⛈️',
    gradientClass: 'gold-grad',
    tools: ['IEC 62305', 'ETABS', 'AutoCAD', 'Technical Analysis'],
    overview:
      'Conducted a comprehensive lightning protection study for the same academic institute. The study covered risk assessment, protection zone analysis, down conductor routing, grounding system design, and surge protection — following IEC 62305 and international best practices.',
    highlights: [
      { icon: '⛈️', title: 'Risk Assessment', desc: 'Lightning risk level calculations' },
      { icon: '🔰', title: 'Protection Zones', desc: 'Rolling sphere & mesh method analysis' },
      { icon: '🌍', title: 'Grounding System', desc: 'Earth resistance & electrode design' },
      { icon: '🛡️', title: 'Surge Protection', desc: 'SPD coordination per IEC standards' },
    ],
  },
  {
    id: 'proj3',
    title: 'Substation Training — Engineers Syndicate',
    subtitle: 'Certified by Lattakia Engineers Syndicate · 2023–2024',
    tag: 'CERTIFIED TRAINING',
    tagVariant: 'violet',
    icon: '🏭',
    gradientClass: 'violet-grad',
    tools: ['HV Systems', 'Transformer Maintenance', 'LV / MV / HV', 'Field Diagnostics'],
    overview:
      'Completed a certified practical training program issued by the Lattakia Engineers Syndicate. The program provided field-level experience in transformer maintenance, electrical fault diagnosis, and hands-on work in real switching centers at HV, MV, and LV levels.',
    highlights: [
      { icon: '🔧', title: 'Transformer Maintenance', desc: 'Oil, insulation & winding inspection' },
      { icon: '🔍', title: 'Fault Detection', desc: 'Diagnosis tools & troubleshooting methods' },
      { icon: '⚡', title: 'HV Switching Centers', desc: 'Live field training at power substations' },
      { icon: '📜', title: 'Syndicate Certified', desc: 'Official certificate · Engineers Syndicate' },
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    icon: '⚡',
    name: 'Engineering Software',
    variant: 'blue',
    skills: [
      { label: 'DIALux', value: 90 },
      { label: 'Revit (MEP)', value: 80 },
      { label: 'ETABS', value: 75 },
      { label: 'AutoCAD (Electrical)', value: 78 },
    ],
  },
  {
    icon: '🔧',
    name: 'Power Systems Knowledge',
    variant: 'violet',
    skills: [
      { label: 'Power Distribution Design', value: 88 },
      { label: 'Lightning Protection', value: 82 },
      { label: 'Transformer Maintenance', value: 85 },
      { label: 'HV / MV / LV Substations', value: 80 },
    ],
  },
  {
    icon: '💼',
    name: 'Professional Tools',
    variant: 'gold',
    skills: [
      { label: 'Microsoft Office Suite', value: 95 },
      { label: 'Technical Documentation', value: 90 },
      { label: 'Fault Diagnosis', value: 82 },
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    period: '2016 — 2024',
    title: 'B.Sc. Electrical Power Engineering',
    org: '🎓 Tishreen University, Lattakia',
    desc: '8-year engineering program covering power systems, protection, distribution networks, electrical machines, and building installations. Graduated with a full-system design project.',
  },
  {
    period: '2016 — Present',
    title: 'Freelance Document Services Professional',
    org: '💼 Self-Employed, Lattakia',
    desc: 'Over 8 years of professional freelance work in printing, scanning, document digitization, and office operations — building exceptional precision and client relationship skills alongside engineering studies.',
  },
  {
    period: '2023 — 2024',
    title: 'Certified Electrical Maintenance Trainee',
    org: '⚡ Lattakia Engineers Syndicate',
    desc: 'Hands-on certified training in transformer maintenance, electrical fault diagnosis, and practical field work at switching centers across HV, MV, and LV voltage levels.',
  },
  {
    period: '2023 — 2024',
    title: 'Graduation Project: Institute Power Design',
    org: '🏫 Tishreen University Engineering Dept.',
    desc: 'Designed complete electrical power supply system for a 4-floor academic institute — including DIALux lighting simulation, load analysis, distribution boards, and a full lightning protection study.',
  },
];
