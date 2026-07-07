export interface Project {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  tag: string;
  tagVariant: 'blue' | 'gold' | 'violet';
  icon: string;
  gradientClass: string;
  tools: string[];
  highlights: Highlight[];
  featured?: boolean;
  images?: string[];
}

export interface Highlight {
  icon: string;
  title: string;
  desc: string;
}

export interface Skill {
  label: string;
  value: number;
}

export interface SkillCategory {
  icon: string;
  name: string;
  variant: 'blue' | 'violet' | 'gold';
  skills: Skill[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  desc: string;
  skills?: string[];
  iconType?: 'graduation' | 'briefcase' | 'certificate' | 'building';
}
