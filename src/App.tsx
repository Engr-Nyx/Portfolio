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
import { GradientBackground } from './components/GradientBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { RecruiterMode } from './components/RecruiterMode';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
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
  }, []);

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
      <GradientBackground />
      <Navigation />
      
      {/* Floating Recruiter Mode Button */}
      <button
        onClick={() => setIsRecruiterOpen(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[45] flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 border border-white/10 text-white text-xs font-semibold rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
        data-cursor-hover
      >
        <Briefcase size={14} className="text-indigo-400 group-hover:animate-bounce" />
        <span>Recruiter Mode</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </button>

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
