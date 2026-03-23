import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Home } from 'lucide-react';
import { CustomCursor } from './CustomCursor';
import { GradientBackground } from './GradientBackground';

export function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.animate-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden">
      <CustomCursor />
      <GradientBackground />
      
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="animate-item mb-6 inline-flex items-center justify-center p-4 glass rounded-full ring-1 ring-white/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold text-xl">404</span>
          </div>
        </div>
        
        <h1 className="animate-item text-6xl md:text-8xl font-bold text-white font-['Space_Grotesk'] tracking-tight mb-6">
          Page Not <span className="text-gradient">Found</span>
        </h1>
        
        <p className="animate-item text-lg text-slate-400 mb-10 max-w-lg mx-auto">
          The live demo you're looking for isn't publicly available! This project is currently private or strictly an enterprise internal tool.
        </p>
        
        <div className="animate-item flex items-center justify-center">
          <a
            href="/"
            className="group relative px-10 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 flex items-center gap-2"
            data-cursor-hover
          >
            <Home size={18} />
            <span className="relative z-10">Go To Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/5 pointer-events-none select-none z-0 font-['Space_Grotesk'] leading-none text-center mix-blend-overlay">
        404
      </div>
    </div>
  );
}
