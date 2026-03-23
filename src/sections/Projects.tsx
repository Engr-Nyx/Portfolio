import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles, Zap, Shield } from 'lucide-react';

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
    image: '/project-1.jpg',
    tags: ['Playwright', 'OpenAI API', 'Allure', 'GitHub Actions', 'TypeScript'],
    icon: Sparkles,
    links: {
      demo: '/404',
      github: 'https://github.com/Engr-Nyx/PlaywrightAutomation',
    },
  },
  {
    title: 'Zero-Touch CI/CD Pipeline',
    subtitle: 'Enterprise Deployment Validation',
    description:
      'A comprehensive CI/CD pipeline system that automates the entire deployment validation process. Integrates with multiple testing frameworks including Selenium, Appium, and API testing tools. Features real-time monitoring, automatic rollback on failure, and detailed reporting dashboards.',
    image: '/project-2.jpg',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'Selenium', 'REST APIs'],
    icon: Zap,
    links: {
      demo: '/404',
      github: '/404',
    },
  },
  {
    title: 'Visual AI Testing Platform',
    subtitle: 'Gemini-Powered Image Validation',
    description:
      'An innovative testing platform that uses Google Gemini AI for intelligent image recognition and validation. Capable of detecting UI anomalies, validating map renderings, and performing visual regression testing with human-like perception accuracy.',
    image: '/project-1.jpg',
    tags: ['Gemini AI', 'Python', 'Appium', 'Computer Vision', 'Cloud'],
    icon: Shield,
    links: {
      demo: '/404',
      github: '/404',
    },
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: 15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.2,
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 z-40"
    >
      <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">PORTFOLIO</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Showcasing my most impactful automation projects and frameworks.
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.title}
                className="project-card group relative h-full flex flex-col"
                style={{ perspective: '1000px' }}
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
                          className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
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
