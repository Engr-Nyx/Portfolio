import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top+=100',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    gsap.to(progressRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === '#hero' || st.vars.trigger === 'body') {
          st.kill();
        }
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMobileOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800/50 z-[60]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
          style={{ width: '0%' }}
        />
      </div>

      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="hidden md:flex items-center gap-1 px-2 py-2 bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
              data-cursor-hover
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-3 glass rounded-full text-white"
          data-cursor-hover
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl text-slate-300 hover:text-white transition-colors"
              style={{
                transitionDelay: isMobileOpen ? `${i * 50}ms` : '0ms',
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
