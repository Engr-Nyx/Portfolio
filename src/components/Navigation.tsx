import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, User, Code2, Briefcase, Layers, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: Layers },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );

    navItems.forEach((item) => {
      const id = item.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="hidden md:flex items-center gap-1 px-2 py-2 bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 text-sm transition-all rounded-full ${isActive
                    ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                data-cursor-hover
              >
                {item.label}
              </a>
            );
          })}
        </div>

      </nav>

      {/* Mobile Bottom Navigation Layout */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-safe transition-all duration-500 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full pointer-events-none'
        }`}>
        <div className="flex items-center justify-between px-1 h-[64px] relative">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative flex flex-col items-center justify-center w-full h-full group z-10"
                data-cursor-hover
              >
                {/* Fixed Cutout Arc (Fades In) */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -top-[1px] w-[110px] h-[36px] transition-opacity duration-300 ease-in-out pointer-events-none -z-10 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <svg width="110" height="36" viewBox="0 0 110 36">
                    <path d="M 0 0 L 10 0 C 30 0, 18 36, 55 36 C 92 36, 80 0, 100 0 L 110 0 Z" fill="#020617" />
                    <path d="M 0 0 L 10 0 C 30 0, 18 36, 55 36 C 92 36, 80 0, 100 0" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </svg>
                </div>
                {/* Floating Icon Bubble */}
                <div
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] flex items-center justify-center ${isActive
                      ? '-top-5 w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full shadow-[0_8px_16px_rgba(6,182,212,0.4)]'
                      : 'top-[10px] w-8 h-8 bg-transparent rounded-full shadow-none'
                    }`}
                >
                  <Icon
                    size={isActive ? 22 : 20}
                    className={`transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                  />
                </div>

                {/* Text Label */}
                <span
                  className={`absolute bottom-2 text-[10px] font-medium tracking-wide transition-all duration-500 ${isActive ? 'text-cyan-400 translate-y-0 opacity-100 font-bold' : 'text-slate-400 translate-y-0 opacity-100'
                    }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
