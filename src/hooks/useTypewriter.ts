import { useState, useEffect } from 'react';

const phrases = [
  'Electrical Power Engineer',
  'DIALux & Revit Specialist',
  'Power Distribution Designer',
  'Lightning Protection Engineer',
];

export function useTypewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const speed = deleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(phrase.substring(0, charIndex + 1));
        if (charIndex + 1 === phrase.length) {
          setTimeout(() => setDeleting(true), 1800);
          return;
        }
        setCharIndex((c) => c + 1);
      } else {
        setText(phrase.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }
        setCharIndex((c) => c - 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex]);

  return text;
}
