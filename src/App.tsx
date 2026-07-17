import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { CursorGlow } from './components/CursorGlow';
import { GradientBackground } from './components/GradientBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { RecruiterMode } from './components/RecruiterMode';
import { RecruiterNudge } from './components/RecruiterNudge';
import { Briefcase } from 'lucide-react';
import { useReducedMotion } from './hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

// Bi-directional by default: sections replay their entrance when scrolling
// back up instead of staying revealed forever.
ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const coarsePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    // Disable smooth-scroll hijacking for reduced-motion users and touch
    // devices, where native scrolling is both accessible and expected.
    if (reducedMotion || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [reducedMotion, coarsePointer]);

  useEffect(() => {
    if (isRecruiterOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isRecruiterOpen]);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#020617]">
      <LoadingScreen />
      <CustomCursor />
      <CursorGlow />
      <GradientBackground />
      <Navigation />
      
      {/* Recruiter Mode entry point — desktop pill (top-right) */}
      <button
        onClick={() => setIsRecruiterOpen(true)}
        className="hidden sm:flex fixed top-5 right-5 lg:top-6 lg:right-6 z-[45] items-center gap-2.5 pl-1.5 pr-5 py-1.5 rounded-full text-white text-xs font-semibold shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95 group overflow-hidden isolate recruiter-cta"
        data-cursor-hover
        aria-label="Open Recruiter Mode"
      >
        <span className="absolute inset-0 -z-10 rounded-full animate-spin-slow bg-[conic-gradient(from_0deg,#6366f1,#06b6d4,#818cf8,#6366f1)] opacity-90" />
        <span className="absolute inset-[2px] -z-10 rounded-full bg-slate-950/90 backdrop-blur-xl" />
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex-shrink-0">
          <Briefcase size={13} className="text-white" />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[9px] uppercase tracking-wider text-cyan-300/80 font-medium mb-0.5">For Recruiters</span>
          <span className="flex items-center gap-1">
            Recruiter Mode
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </span>
      </button>

      {/* Recruiter Mode entry point — mobile FAB, docked with a clear gap
          above the floating bottom nav so the two never crowd each other */}
      <button
        onClick={() => setIsRecruiterOpen(true)}
        className="sm:hidden fixed right-4 z-[45] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(99,102,241,0.45)] active:scale-90 transition-transform recruiter-cta"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 6.5rem)' }}
        data-cursor-hover
        aria-label="Open Recruiter Mode"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-indigo-500/40" style={{ animationDuration: '2.5s' }} />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500" />
        <Briefcase size={20} className="relative text-white" />
      </button>

      <RecruiterNudge onOpen={() => setIsRecruiterOpen(true)} />

      <RecruiterMode isOpen={isRecruiterOpen} onClose={() => setIsRecruiterOpen(false)} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
