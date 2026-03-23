import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  TestTube, 
  GitBranch, 
  Database, 
  Terminal, 
  Cpu,
  Layers,
  Workflow,
  Box,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'Java', icon: Code2, category: 'Languages', level: 95 },
  { name: 'Python', icon: Terminal, category: 'Languages', level: 90 },
  { name: 'TypeScript', icon: Code2, category: 'Languages', level: 88 },
  { name: 'JavaScript', icon: Code2, category: 'Languages', level: 85 },
  { name: 'Selenium', icon: TestTube, category: 'Testing', level: 95 },
  { name: 'Appium', icon: Smartphone, category: 'Testing', level: 92 },
  { name: 'Playwright', icon: Monitor, category: 'Testing', level: 90 },
  { name: 'WebDriverIO', icon: Globe, category: 'Testing', level: 88 },
  { name: 'Perfecto', icon: TestTube, category: 'Testing', level: 85 },
  { name: 'Digital.ai', icon: Layers, category: 'Testing', level: 82 },
  { name: 'Git', icon: GitBranch, category: 'DevOps', level: 92 },
  { name: 'GitHub', icon: GitBranch, category: 'DevOps', level: 90 },
  { name: 'GitLab', icon: GitBranch, category: 'DevOps', level: 88 },
  { name: 'Docker', icon: Box, category: 'DevOps', level: 80 },
  { name: 'CI/CD', icon: Workflow, category: 'DevOps', level: 85 },
  { name: 'Linux', icon: Terminal, category: 'Systems', level: 88 },
  { name: 'Odoo', icon: Database, category: 'Systems', level: 85 },
  { name: 'AI Testing', icon: Cpu, category: 'Emerging', level: 82 },
];

const categories = ['All', 'Languages', 'Testing', 'DevOps', 'Systems', 'Emerging'];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );


      gsap.fromTo(
        grid.children,
        { scale: 0.8, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          stagger: 0.05, 
          duration: 0.6,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: Math.sin(i * 0.5) * 10,
        duration: 3 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, [filteredSkills]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen pt-24 pb-20 z-30 flex flex-col justify-center"
    >
      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div ref={titleRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">EXPERTISE</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            A comprehensive toolkit of technologies and frameworks I use to build robust automation solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
                data-cursor-hover
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.name;

            return (
              <div
                key={skill.name}
                className="skill-card relative group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                data-cursor-hover
              >
                <div
                  className={`relative p-4 glass rounded-2xl transition-all duration-300 ${
                    isHovered ? 'scale-110 glow-primary' : ''
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <Icon
                      className={`transition-colors ${
                        isHovered ? 'text-indigo-400' : 'text-slate-400'
                      }`}
                      size={24}
                    />
                  </div>

                  <p className="text-center text-xs text-white font-medium mb-2">
                    {skill.name}
                  </p>

                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {index < filteredSkills.length - 1 && index % 6 !== 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-slate-700/50" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Test Frameworks', value: '8+' },
            { label: 'Languages', value: '4+' },
            { label: 'CI/CD Tools', value: '6+' },
            { label: 'Cloud Platforms', value: '3+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mono tracking-wider">
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
