import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Award, Users, Star } from 'lucide-react';
import { handleSpotlight } from '@/lib/spotlight';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Award,
    title: 'Deans Lister',
    description: 'Academic Excellence 2018-2019',
  },
  {
    icon: Users,
    title: 'Student Leadership',
    description: 'Department Student Council - Vice President (2018-2019)',
  },
  {
    icon: Star,
    title: 'Organization President',
    description: 'Junior Information Systems Security Association (2018-2020)',
  },
  {
    icon: Users,
    title: 'Student Representative',
    description: 'Supreme Student Council - Information Systems (2020-2021)',
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const degreeCardRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useHeadingReveal(headingRef);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Degree card unfolds with a slight 3D tilt, like a diploma being laid flat.
      if (degreeCardRef.current) {
        gsap.fromTo(
          degreeCardRef.current,
          { opacity: 0, rotateX: -25, y: 40, transformPerspective: 800 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: content, start: 'top 80%' },
          }
        );
      }

      // Achievement cards pop in one by one with an elastic bounce.
      if (achievementsRef.current) {
        gsap.fromTo(
          achievementsRef.current.children,
          { y: 40, opacity: 0, scale: 0.5, rotate: -6 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: achievementsRef.current, start: 'top 88%' },
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, scale: 0.7, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(2.4)',
            scrollTrigger: { trigger: bannerRef.current, start: 'top 92%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 z-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef}>
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
              <span className="text-cyan-400 mono text-sm tracking-widest">BACKGROUND</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
            </div>

            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
              Education <span className="text-gradient">& Awards</span>
            </h2>
          </div>

          <div ref={degreeCardRef} className="glass p-8 rounded-3xl mb-12 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-2xl">
                <GraduationCap className="text-indigo-400" size={48} />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Bachelor of Science in Information Systems
                </h3>
                <p className="text-cyan-400 text-lg mb-2">
                  Technological Institute of the Philippines
                </p>
                <p className="text-slate-500 mb-4">
                  Quezon City, Metro Manila • Graduated June 2022
                </p>
                
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
                  <BookOpen className="text-indigo-400 flex-shrink-0" size={20} />
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-medium">Published Research:</span>{' '}
                    "Predicting Cyber-Trafficking Websites Using Naive Bayes, Logistic Regression, KNN, and SVM"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={achievementsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  onMouseMove={handleSpotlight}
                  className="spotlight-card glass p-6 rounded-2xl text-center hover:glow-primary hover:-translate-y-1 transition-all duration-300 group"
                  data-cursor-hover
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all duration-300">
                      <Icon className="text-indigo-400" size={24} />
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{achievement.title}</h4>
                  <p className="text-slate-500 text-sm">{achievement.description}</p>
                </div>
              );
            })}
          </div>

          <div ref={bannerRef} className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 glass-strong px-8 py-4 rounded-full">
              <Award className="text-yellow-400" size={32} />
              <div className="text-left">
                <p className="text-yellow-400 font-bold text-lg">Rookie of the Year</p>
                <p className="text-slate-400 text-sm">Professional Excellence Award</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
