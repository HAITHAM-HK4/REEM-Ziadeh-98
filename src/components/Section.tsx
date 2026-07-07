import { ReactNode } from 'react';

interface Props {
  id: string;
  tone?: 'dark' | 'light';
  children: ReactNode;
  className?: string;
}

export default function Section({ id, tone = 'dark', children, className = '' }: Props) {
  const bg = tone === 'light' ? 'bg-paper text-stone' : 'bg-void text-milk';
  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      {children}
    </section>
  );
}
