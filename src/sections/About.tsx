import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const trigger = ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(
          { value: 0 },
          {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].value));
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !image || !content || !stats) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        content,
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        stats.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 85%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center z-20"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={imageRef} className="relative max-w-[300px] sm:max-w-[380px] lg:max-w-[480px] mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 animate-spin-slow p-1">
              <div className="w-full h-full rounded-full bg-[#020617]" />
            </div>

            <div className="relative aspect-square rounded-full overflow-hidden m-1">
              <img
                src="profile.png"
                alt="Ramon Tomaquin"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 to-transparent" />
            </div>

            <div className="absolute -bottom-1 -right-4 glass-strong px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Award className="text-indigo-400" size={20} />
                <span className="text-white font-semibold">Rookie of the Year</span>
              </div>
            </div>
          </div>

          <div ref={contentRef}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-indigo-500 to-cyan-500" />
              <span className="text-cyan-400 mono text-sm tracking-widest">ABOUT ME</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-6">
              Behind the{' '}
              <span className="text-gradient">Code</span>
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed mb-8">
              <p>
                I am a dedicated <span className="text-white font-semibold">Automation QA Engineer</span> with a passion for building robust, scalable testing frameworks. My expertise lies in bridging the gap between development and quality, ensuring that software not only works but excels.
              </p>
              <p>
                From Selenium to AI-powered testing with Gemini, I leverage cutting-edge tools to deliver precision. I've worked with industry giants like <span className="text-white font-semibold">Google (via Cognizant)</span> and <span className="text-white font-semibold">Accenture</span>, delivering enterprise-grade automation solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={16} className="text-indigo-400" />
                <span className="text-sm">Taguig, Metro Manila</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={16} className="text-indigo-400" />
                <span className="text-sm">09925937460</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-sm">arcee.tomaquin@gmail.com</span>
              </div>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  <Counter end={5} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 mono">YEARS EXP</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  <Counter end={50} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 mono">PROJECTS</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  <Counter end={100} suffix="%" />
                </div>
                <div className="text-xs text-slate-500 mono">AUTOMATION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
