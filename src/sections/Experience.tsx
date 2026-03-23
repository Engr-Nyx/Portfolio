import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Software Development Engineer in Test',
    company: 'Personal Project',
    location: 'Makati City, Metro Manila',
    period: 'Oct 2025 - Present',
    description: [
      'Developed an AI-Powered Playwright Automation Framework with Allure Reporting for detailed test visualization.',
      'Integrated OpenAI API to enhance test creation, analysis, and maintenance through AI-driven automation.',
      'Built complete CI/CD pipeline with GitHub Actions for automated test execution on every commit.',
    ],
    highlights: ['Playwright', 'OpenAI API', 'Allure', 'GitHub Actions'],
  },
  {
    title: 'Automation Developer',
    company: 'Cognizant (Google)',
    location: 'BGC, Metro Manila',
    period: 'Aug 2025 - Present',
    description: [
      'Developed and maintained AI-powered automation test scripts using Java and Appium for Google applications.',
      'Integrated automated tests with Fusion and Kokoro CI/CD pipelines for continuous testing.',
      'Utilized Gemini AI for image recognition to validate map images and visual elements.',
      'Leveraged Digital.ai device farm for cross-platform testing across multiple devices.',
    ],
    highlights: ['Java', 'Appium', 'Gemini AI', 'Kokoro CI/CD', 'Digital.ai'],
  },
  {
    title: 'Sr. Automation Engineer',
    company: 'Accenture (Xcel Energy)',
    location: 'Mandaluyong, Metro Manila',
    period: 'Sep 2024 - Aug 2025',
    description: [
      'Developed automated tests for API and mobile UI using Agile Scrum methodologies.',
      'Used Karate framework for API validation and TypeScript for cross-platform mobile automation.',
      'Integrated test scripts into GitLab CI/CD pipelines supporting DevOps practices.',
      'Documented and reported defects using JIRA with clear root cause analysis.',
    ],
    highlights: ['Karate', 'TypeScript', 'GitLab CI/CD', 'JIRA', 'Agile'],
  },
  {
    title: 'Automation Tester',
    company: 'WeSupport, Inc. (TechMahindra)',
    location: 'Makati, Metro Manila',
    period: 'May 2023 - Aug 2024',
    description: [
      'Spearheaded creation and execution of comprehensive test plans and schedules.',
      'Conducted manual and automated testing using Selenium, Appium, and Perfecto.',
      'Implemented load and stress tests to optimize system performance.',
      'Collaborated with cross-functional teams to define test objectives.',
    ],
    highlights: ['Selenium', 'Appium', 'Perfecto', 'Performance Testing'],
  },
  {
    title: 'Junior Odoo Programmer',
    company: 'WeSupport, Inc.',
    location: 'Makati, Metro Manila',
    period: 'Oct 2022 - May 2023',
    description: [
      'Designed and developed robust backend systems and APIs using Python.',
      'Created and maintained frontend elements using XML for intuitive UI.',
      'Managed server updates, patches, and security enhancements.',
      'Acted as primary client liaison for technical coordination.',
    ],
    highlights: ['Python', 'Odoo', 'REST APIs', 'Server Management'],
  },
  {
    title: 'Odoo Developer Trainee',
    company: 'WeSupport, Inc.',
    location: 'Makati, Metro Manila',
    period: 'Jul 2022 - Oct 2022',
    description: [
      'Completed intensive training in Odoo development and ERP systems.',
      'Learned Python, XML, and PostgreSQL for business application development.',
      'Contributed to real-world projects under senior developer mentorship.',
    ],
    highlights: ['Odoo', 'Python', 'PostgreSQL', 'ERP'],
  },
];

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !title || !timeline || !line) return;

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

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
          },
        }
      );

      const cards = timeline.querySelectorAll('.experience-card');
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-20 z-20"
    >
      <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">JOURNEY</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Career <span className="text-gradient">Path</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            A timeline of my professional growth, from trainee to senior automation engineer.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-500 origin-top hidden sm:block"
          />

          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-500 sm:hidden" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className={`experience-card relative flex flex-col sm:flex-row items-start gap-8 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 border-4 border-[#020617] z-10" />

                  <div
                    className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      isLeft ? 'sm:pr-8' : 'sm:pl-8'
                    }`}
                  >
                    <div 
                      className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 group cursor-pointer"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gradient transition-colors select-none">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-indigo-400">
                            <Briefcase size={16} />
                            <span className="font-medium select-none">{exp.company}</span>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-cyan-400' : ''}`}
                        />
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4 select-none">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <div 
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                          expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="space-y-2 py-2">
                            {exp.description.map((desc, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-slate-400 text-sm"
                              >
                                <ChevronRight
                                  size={16}
                                  className="text-indigo-400 flex-shrink-0"
                                />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
