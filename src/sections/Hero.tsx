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
      // Select word spans (not char spans)
      const words = title.querySelectorAll('.word');

      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 45,
          rotateX: -80,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: 'back.out(1.5)',
        }
      );

      tl.fromTo(
        subtitle,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );

      tl.fromTo(
        cta,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );

      tl.fromTo(
        socials.children,
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out' },
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

  /**
   * Splits text into word-level spans so the entire word animates as one unit.
   * Spaces between words are preserved as literal space characters.
   */
  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word-wrapper inline-block overflow-hidden">
        <span
          className="word inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </span>
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
      {/* Background decorations */}
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

      <div className="relative z-10 text-center px-8 sm:px-12 lg:px-16 pt-16 pb-28 mt-12 w-full max-w-[90rem] mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-['Space_Grotesk'] tracking-tight mb-6 leading-tight"
          style={{ perspective: '800px' }}
        >
          {/* Line 1: TEST AUTOMATION ENGINEER */}
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 mb-4">
            {splitWords('TEST AUTOMATION ENGINEER')}
          </div>
          {/* Line 2: & */}
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 my-4 text-indigo-400 text-4xl md:text-5xl lg:text-6xl">
            {splitWords('&')}
          </div>
          {/* Line 3: SOFTWARE DEVELOPMENT ENGINEER IN TEST */}
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
            {splitWords('SOFTWARE DEVELOPMENT ENGINEER IN TEST')}
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-slate-400 mono tracking-widest mb-8"
        >
          Ramon Christus Tomaquin
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
            data-cursor-hover
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-full hover:border-indigo-500 hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
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
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            data-cursor-hover
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/arcee-tomaquin-bb0b7a1b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            data-cursor-hover
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:arcee.tomaquin@gmail.com"
            className="p-3 glass rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            data-cursor-hover
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
        data-cursor-hover
      >
        <span className="text-xs text-slate-500 mono tracking-widest">SCROLL</span>
        <ChevronDown className="text-slate-500 animate-bounce" size={20} />
      </div>

      {/* Side label */}
      <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
        <span className="text-xs text-slate-600 mono tracking-widest" style={{ writingMode: 'vertical-lr' }}>
          BASED IN TAGUIG, PH
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      </div>
    </section>
  );
}
