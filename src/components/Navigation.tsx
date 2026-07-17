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
  const [mobileBarShown, setMobileBarShown] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const suppressHideRef = useRef(false);
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Auto-hide the mobile bar on scroll-down, reveal it on scroll-up —
  // gives the small viewport back to content while keeping nav one
  // swipe away. Ignores tiny jitters so it doesn't flicker.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (Math.abs(delta) < 8) return;

      // Don't hide the bar mid-tap: a nav click triggers a smooth scroll
      // toward the target section, which would otherwise read as
      // scroll-down and yank the bar away right as the user used it.
      if (delta > 0 && y > 120 && !suppressHideRef.current) {
        setMobileBarShown(false);
      } else {
        setMobileBarShown(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

    if (navigator.vibrate) navigator.vibrate(8);

    // Keep the mobile bar visible through the smooth-scroll it just
    // triggered, then let normal scroll-direction behavior resume.
    suppressHideRef.current = true;
    setMobileBarShown(true);
    if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current);
    suppressTimeoutRef.current = setTimeout(() => {
      suppressHideRef.current = false;
    }, 1000);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Spring pop whenever the mobile bar transitions between shown/hidden,
  // instead of a flat CSS opacity/translate fade.
  useEffect(() => {
    const el = mobileNavRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    if (mobileBarShown) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }
      );
    } else {
      gsap.to(el, { y: 40, opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' });
    }
  }, [mobileBarShown]);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-800/50 z-[60]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
          style={{ width: '0%' }}
        />
      </div>

      {/* Desktop Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="hidden md:flex items-center gap-1 px-2 py-2 bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 text-sm transition-all duration-300 rounded-full ${isActive
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

      {/* Mobile Bottom Navigation — floats just above the screen edge,
          always present on mobile viewports including the landing/hero
          section; only auto-hides on scroll-down (never mid-tap) to give
          the small viewport back to content. */}
      <div
        ref={mobileNavRef}
        className={`md:hidden fixed left-3 right-3 z-50 rounded-3xl bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${mobileBarShown ? '' : 'pointer-events-none'
          }`}
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between px-1 h-[60px] relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative flex flex-col items-center justify-center flex-1 h-full group z-10 active:scale-90 transition-transform duration-150"
                data-cursor-hover
                aria-label={item.label}
              >
                {/* Active arc cutout */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -top-[1px] w-[80px] h-[28px] transition-opacity duration-300 ease-in-out pointer-events-none -z-10 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                >
                  <svg width="80" height="28" viewBox="0 0 80 28">
                    <path d="M 0 0 L 8 0 C 22 0, 14 28, 40 28 C 66 28, 58 0, 72 0 L 80 0 Z" fill="#0f172a" />
                    <path d="M 0 0 L 8 0 C 22 0, 14 28, 40 28 C 66 28, 58 0, 72 0" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Floating icon bubble */}
                <div
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] flex items-center justify-center ${isActive
                      ? '-top-4 w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full shadow-[0_6px_16px_rgba(6,182,212,0.4)] animate-pulse-glow'
                      : 'top-[8px] w-7 h-7 bg-transparent rounded-full'
                    }`}
                >
                  <Icon
                    size={isActive ? 18 : 17}
                    className={`transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`absolute bottom-1.5 text-[9px] font-medium tracking-wide transition-all duration-500 ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
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
