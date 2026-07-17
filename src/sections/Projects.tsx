import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles, Zap, Shield } from 'lucide-react';
import { useHeadingReveal } from '../hooks/use-heading-reveal';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  icon: React.ElementType;
  links: {
    demo?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    title: 'AI-Powered Test Framework',
    subtitle: 'Intelligent Automation Suite',
    description:
      'An end-to-end test automation framework built using Playwright and integrated with Allure Reporting. Leverages OpenAI API to enhance test creation, analysis, and maintenance through AI-driven automation. Features automatic test execution via GitHub Actions CI/CD pipeline with live Allure reports deployed to GitHub Pages.',
    image: `${import.meta.env.BASE_URL}project-1.jpg`,
    tags: ['Playwright', 'OpenAI API', 'Allure', 'GitHub Actions', 'TypeScript'],
    icon: Sparkles,
    links: {
      demo: 'https://engr-nyx.github.io/PlaywrightAutomation/',
      github: 'https://github.com/Engr-Nyx/PlaywrightAutomation',
    },
  },
  {
    title: 'Playwright & LambdaTest',
    subtitle: 'Cloud Automation Framework',
    description:
      'A Playwright automation framework integrated with LambdaTest, featuring full CI/CD pipelines using GitHub Actions and GitHub Pages.',
    image: `${import.meta.env.BASE_URL}project-2.jpg`,
    tags: ['Playwright', 'LambdaTest', 'GitHub Actions', 'CI/CD'],
    icon: Zap,
    links: {
      demo: 'https://engr-nyx.github.io/PlaywrightWithLamdaTest/',
      github: 'https://github.com/Engr-Nyx/PlaywrightWithLamdaTest',
    },
  },
  {
    title: 'Visual AI Testing Platform',
    subtitle: 'Gemini-Powered Image Validation',
    description:
      'An innovative testing platform that uses Google Gemini AI for intelligent image recognition and validation. Capable of detecting UI anomalies, validating map renderings, and performing visual regression testing with human-like perception accuracy.',
    image: `${import.meta.env.BASE_URL}project-1.jpg`,
    tags: ['Gemini AI', 'Python', 'Appium', 'Computer Vision', 'Cloud'],
    icon: Shield,
    links: {
      demo: `${import.meta.env.BASE_URL}404`,
      github: `${import.meta.env.BASE_URL}404`,
    },
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useHeadingReveal(headingRef);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !title || !cardsContainer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
          },
        }
      );

      const cards = cardsContainer.querySelectorAll('.project-card');

      // Cards swing up into place, alternating tilt direction so they read
      // as being "dealt" onto the grid rather than rising in lockstep.
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateX: 20,
            rotateY: i % 2 === 0 ? -18 : 18,
            scale: 0.85,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainer,
              start: 'top 70%',
            },
          }
        );
      });

      cards.forEach((card, i) => {
        const offset = i === 1 ? -60 : -20; // Middle card moves up further
        gsap.to(card, {
          y: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 18;
    const rotateY = (x - rect.width / 2) / 18;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 z-40"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">PORTFOLIO</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Showcasing my most impactful automation projects and frameworks.
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.title}
                className="project-card group relative h-full flex flex-col"
                style={{ perspective: '1000px' }}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                data-cursor-hover
              >
                <div className="relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:glow-primary flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />

                    <div className="absolute top-4 left-4 p-3 glass-strong rounded-xl">
                      <Icon className="text-indigo-400" size={24} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-cyan-400 text-sm mono mb-2">
                      {project.subtitle}
                    </p>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                          data-cursor-hover
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass text-slate-300 text-sm font-medium rounded-full hover:text-white transition-colors"
                          data-cursor-hover
                        >
                          <Github size={14} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            data-cursor-hover
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
