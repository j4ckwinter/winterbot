import { useState, useEffect, useRef } from 'preact/hooks';
import './dialogue.css';
import PixelAvatar from './PixelAvatar';

const MESSAGES: Record<string, { text: string; expr: 'neutral' | 'excited' | 'warm' }> = {
  hero:       { text: "Welcome, Trainer! Your adventure begins here. Take a moment to get acquainted with your guide.", expr: 'excited' },
  about:      { text: "Ah, the Origin story. Every great journey starts somewhere \u2014 this is where ours began.", expr: 'warm' },
  experience: { text: "The Quest Log! Each entry marks a challenge faced and conquered. These victories shaped the Trainer you see today.", expr: 'excited' },
  projects:   { text: "The Pok\u00e9dex\u2026 I mean, the Project Dex. Each entry is a creation, catalogued and ready for inspection.", expr: 'neutral' },
  skills:     { text: "The Inventory. Every tool, language, and framework collected on the road. A well-stocked bag.", expr: 'neutral' },
  contact:    { text: "A Rest Area at last! Save your progress and reach out \u2014 the Trainer is always happy to hear from fellow adventurers.", expr: 'warm' },
};

export default function DialogueSystem() {
  const [sectionId, setSectionId] = useState<string>('hero');
  const [charIndex, setCharIndex] = useState<number>(0);

  const reducedMotion = useRef<boolean>(false);

  // Read prefers-reduced-motion on mount (client only — guard for SSR)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // If reduced motion is set, immediately show full text
      if (reducedMotion.current) {
        const { text } = MESSAGES[sectionId] ?? MESSAGES.hero;
        setCharIndex(text.length);
      }
    }
  }, []);

  // Listen for section changes dispatched by JourneyNav IntersectionObserver
  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      setSectionId(id);
    };
    window.addEventListener('sectionChange', handler);
    return () => window.removeEventListener('sectionChange', handler);
  }, []);

  const { text, expr } = MESSAGES[sectionId] ?? MESSAGES.hero;
  const isComplete = charIndex >= text.length;
  const displayed = text.slice(0, charIndex);

  // Reset charIndex when section changes (D-03: immediate interrupt)
  useEffect(() => {
    setCharIndex(reducedMotion.current ? text.length : 0);
  }, [sectionId]);

  // Typewriter interval — runs when not complete and not reduced-motion
  useEffect(() => {
    if (isComplete || reducedMotion.current) return;
    const id = setInterval(() => setCharIndex(i => i + 1), 40);
    return () => clearInterval(id);
  }, [sectionId, isComplete]);

  // Skip handler: instantly reveal full message (DLG-05)
  const skip = () => setCharIndex(text.length);

  return (
    <div class="dialogue-system">
      <PixelAvatar expression={expr} />
      <button class="dialogue-box" onClick={skip} aria-label="Skip dialogue (click to reveal full message)">
        <span class="speaker-name" aria-label="GUIDE says:">GUIDE</span>
        <p role="status" aria-live="polite" class="dialogue-text">
          {displayed}
          {isComplete && <span class="cursor" aria-hidden="true">&#x258C;</span>}
        </p>
        {isComplete && <span class="prompt-indicator" aria-hidden="true">[A]</span>}
      </button>
    </div>
  );
}
