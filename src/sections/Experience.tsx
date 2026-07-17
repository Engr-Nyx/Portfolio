import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import { useHeadingReveal } from '../hooks/use-heading-reveal';
import { handleSpotlight } from '../lib/spotlight';

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
    company: 'Waze (through Cognizant)',
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
    company: 'Xcel Energy (through Accenture)',
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
    company: 'Globe Telecom (through WeSupport Inc.)',
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
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useHeadingReveal(headingRef);

  const matchesSkill = (exp: ExperienceItem, skill: string) => {
    if (skill === 'All') return true;
    if (skill === 'CI/CD') {
      return exp.highlights.some(h => 
        h.toLowerCase().includes('ci/cd') || 
        h.toLowerCase().includes('actions') || 
        h.toLowerCase().includes('kokoro')
      );
    }
    return exp.highlights.some(h => h.toLowerCase().includes(skill.toLowerCase()));
  };

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

      // The line grows continuously as you scroll through the timeline
      // (scrubbed to scroll position, not a one-shot tween)...
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.4,
          },
        }
      );

      // ...and each card rises up to meet it in the same continuous motion —
      // no fade-in pop, just a slow, scroll-tied slide that stays locked to
      // the line's own growth so the whole timeline feels like one piece.
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 90, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              // Finishes exactly as the card's center crosses the viewport
              // center, so it's always fully visible by the time it's
              // actually centered on screen — not still catching up.
              end: 'center center',
              scrub: 0.2,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Clicking a filter button changes the timeline's height (collapsed/
  // expanded cards), which shifts where each remaining card's scroll
  // trigger actually sits on the page. Refreshing ScrollTrigger recalculates
  // those positions and re-evaluates every trigger against the current
  // scroll position, so an already-passed card is immediately shown fully
  // rather than waiting for the next scroll event.
  //
  // Note: don't force cards visible with gsap.set here — killing the
  // scrub tweens that ScrollTrigger owns leaves their triggers orphaned
  // and breaks scrolling for the rest of the section.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 550);
    return () => clearTimeout(refreshTimer);
  }, [selectedSkill]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 z-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">JOURNEY</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Career <span className="text-gradient">Path</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            A timeline of my professional growth, from trainee to senior automation engineer.
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {['All', 'Appium', 'Playwright', 'Selenium', 'Java', 'Python', 'TypeScript', 'CI/CD', 'Odoo'].map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 active:scale-95 ${
                  selectedSkill === skill
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    : 'glass text-slate-400 hover:text-white'
                }`}
                data-cursor-hover
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div ref={timelineRef} className="relative overflow-x-hidden">
          <div
            ref={lineRef}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-500 origin-top"
          />

          <div>
            {experiences.map((exp, index) => {
              const isMatched = matchesSkill(exp, selectedSkill);
              // Alternation is based on the visible (matched) order, not the
              // raw array index — otherwise a filter that hides odd-indexed
              // cards can leave two "left" cards in a row. Whenever the
              // filter changes and a card's side flips, it slides across
              // to its new side instead of jumping.
              const visiblePosition = experiences
                .slice(0, index + 1)
                .filter((e) => matchesSkill(e, selectedSkill)).length - 1;
              const isLeft = visiblePosition % 2 === 0;

              return (
                  <div
                    key={`${exp.company}-${exp.period}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      isMatched ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className="experience-card relative pb-14 sm:pb-16 last:pb-0"
                      >
                        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 border-4 border-[#020617] z-10" />

                        <div
                          className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] sm:px-8 transition-transform duration-500 ease-in-out ${
                            isLeft ? 'sm:translate-x-0' : 'sm:translate-x-[calc(100%+4rem)]'
                          }`}
                        >
                        <div
                          onMouseMove={handleSpotlight}
                          className="spotlight-card glass p-6 sm:p-8 rounded-2xl transition-all duration-300 group cursor-pointer border border-white/10 shadow-[0_0_0_1px_rgba(99,102,241,0.08),0_12px_40px_-12px_rgba(99,102,241,0.35)] hover:border-indigo-500/30 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_0_45px_-5px_rgba(6,182,212,0.4),0_0_90px_-10px_rgba(99,102,241,0.3)] hover:-translate-y-1"
                          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                      <div className="flex items-start justify-between mb-5 gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-gradient transition-colors select-none">
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

                      <div className="flex flex-wrap gap-4 sm:gap-5 text-sm text-slate-500 mb-5 select-none">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'
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

                      <div className="flex flex-wrap gap-2.5">
                        {exp.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1.5 text-xs bg-indigo-500/15 text-indigo-300 rounded-full border border-indigo-500/20 hover:bg-indigo-500/25 hover:border-indigo-500/40 transition-colors"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
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
