import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { scale: 1.1, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%', // Animates into place when in view
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'arcee.tomaquin@gmail.com',
      href: 'mailto:arcee.tomaquin@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '09925937460',
      href: 'tel:09925937460',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Taguig, Metro Manila',
      href: '#',
    },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Engr-Nyx' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arcee-tomaquin-bb0b7a1b4/' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center z-50"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={contentRef} className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">CONNECT</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Let's Build{' '}
            <span className="text-gradient">Quality</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Ready to elevate your software quality? Let's discuss how automation can transform your testing workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:glow-primary transition-all group"
                    data-cursor-hover
                  >
                    <div className="p-3 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                      <Icon className="text-indigo-400" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                    <ArrowUpRight className="ml-auto text-slate-600 group-hover:text-indigo-400 transition-colors" size={20} />
                  </a>
                );
              })}
            </div>

            <div>
              <p className="text-slate-500 text-sm mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 glass rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      data-cursor-hover
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thank you for reaching out. I'll get back to you soon.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-white/10 hover:bg-white/20 text-white"
                  data-cursor-hover
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Your Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold py-6"
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg">Ramon Tomaquin</p>
              <p className="text-slate-500 text-sm">Automation QA Engineer</p>
            </div>
            
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Built with</span>
              <span className="text-indigo-400">React</span>
              <span>+</span>
              <span className="text-cyan-400">GSAP</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
