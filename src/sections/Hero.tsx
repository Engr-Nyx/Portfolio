import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const socials = socialsRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !title || !subtitle || !cta || !socials || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      const chars = title.querySelectorAll('.char');

      const tl = gsap.timeline({ delay: 1.5 });

      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        }
      );

      tl.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        socials.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        scrollIndicator,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-float-delayed" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 pb-20">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-white font-['Space_Grotesk'] tracking-tight mb-4"
        >
          <div className="mb-2 md:mb-0">
            <span className="block md:inline-block md:mr-4">{splitText('TEST')}</span>
            <span className="block md:inline-block">{splitText('AUTOMATION ENGINEER')}</span>
          </div>
          <span className="block my-2 md:my-0">{splitText('AND')}</span>
          <span className="block mb-2 md:mb-0">{splitText('SHOPIFY DEVELOPER')}</span>
          <span className="block text-gradient">{splitText('QA ENGINEER')}</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-slate-400 mono tracking-widest mb-8"
        >
          Ramon Christus Tomaquin
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105"
            data-cursor-hover
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-full hover:border-indigo-500 hover:text-white transition-colors"
            data-cursor-hover
          >
            Get In Touch
          </a>
        </div>

        <div ref={socialsRef} className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Engr-Nyx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            data-cursor-hover
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/arcee-tomaquin-bb0b7a1b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            data-cursor-hover
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:arcee.tomaquin@gmail.com"
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            data-cursor-hover
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
        data-cursor-hover
      >
        <span className="text-xs text-slate-500 mono tracking-widest">SCROLL</span>
        <ChevronDown className="text-slate-500 animate-bounce" size={20} />
      </div>

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
        <span className="text-xs text-slate-600 mono tracking-widest" style={{ writingMode: 'vertical-lr' }}>
          BASED IN TAGUIG, PH
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      </div>
    </section>
  );
}
