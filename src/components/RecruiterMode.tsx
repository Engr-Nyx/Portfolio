import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Briefcase,
  Sparkles,
  FileDown,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  HelpCircle,
  Copy,
  Linkedin,
  Eye,
  EyeOff,
  ClipboardCheck
} from 'lucide-react';
import { analyzeJD, formatSummaryReport, type AnalysisResult } from '@/lib/jd-analyzer/analyze';

interface RecruiterModeProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRADE_STYLES: Record<string, { text: string; bg: string; ring: string }> = {
  'Strong fit': { text: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'border-emerald-500/30' },
  'Good fit': { text: 'text-cyan-400', bg: 'bg-cyan-500/10', ring: 'border-cyan-500/30' },
  'Partial fit': { text: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'border-amber-500/30' },
  Stretch: { text: 'text-rose-400', bg: 'bg-rose-500/10', ring: 'border-rose-500/30' },
};

const GRADE_COPY: Record<string, string> = {
  'Strong fit': "This JD lines up closely with Ramon's core stack — a strong match worth an interview.",
  'Good fit': "Solid overlap with Ramon's experience, with a few gaps worth a quick conversation.",
  'Partial fit': "Some relevant experience, but this role leans into areas outside Ramon's core focus.",
  Stretch: "Limited overlap with this JD — likely not the right fit based on the tools listed.",
};

/** Highlights matched keywords inline within the pasted JD text. */
function HighlightedJD({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const escaped = terms
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) && terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="bg-indigo-500/30 text-indigo-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

const FAQ_RESPONSES = [
  {
    question: "What is your current notice period?",
    answer: "I am available to start immediately or within a standard 30-day notice period depending on the project requirements."
  },
  {
    question: "What are your core technical strengths?",
    answer: "My primary expertise is in Mobile & Web Test Automation (Appium, Playwright, Selenium) using Java and TypeScript. I also build custom CI/CD pipelines (GitHub Actions, GitLab) and integrate AI-assisted testing (Gemini AI, OpenAI)."
  },
  {
    question: "Are you open to relocation or remote work?",
    answer: "I am based in Taguig, Metro Manila, and open to hybrid/onsite roles in Metro Manila, as well as fully remote international opportunities."
  },
  {
    question: "Tell me about your experience at Waze/Google.",
    answer: "At Waze (via Cognizant), I developed and maintained AI-powered mobile automation scripts using Java and Appium. I integrated testing into Kokoro pipelines and used Gemini AI for visual verification of map rendering."
  }
];

export function RecruiterMode({ isOpen, onClose }: RecruiterModeProps) {
  const [jdText, setJdText] = useState('');
  const [matchResult, setMatchResult] = useState<AnalysisResult | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !sectionsRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionsRef.current!.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, [isOpen]);

  const handleJdTextChange = (value: string) => {
    setJdText(value);
    if (!value) setMatchResult(null);
  };

  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;
    setMatchResult(analyzeJD(jdText));
  };

  const handleCopySummary = async () => {
    if (!matchResult) return;
    try {
      await navigator.clipboard.writeText(formatSummaryReport(matchResult));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore, button stays actionable.
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('arcee.tomaquin@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleFaqClick = (index: number) => {
    if (isTyping) return;
    
    // Add user question to chat
    setChatHistory(prev => [...prev, { sender: 'user', text: FAQ_RESPONSES[index].question }]);
    setIsTyping(true);

    // Simulate typing effect
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'bot', text: FAQ_RESPONSES[index].answer }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        data-lenis-prevent
        className="w-full sm:max-w-md bg-[#020617]/95 border-l border-white/10 backdrop-blur-xl text-white overflow-y-auto z-[999] p-5 sm:p-8"
      >
        <SheetHeader className="pb-8 border-b border-white/10">
          <SheetTitle className="text-2xl font-bold flex items-center gap-3 text-white">
            <Briefcase className="text-indigo-400" />
            Recruiter <span className="text-gradient">Console</span>
          </SheetTitle>
          <SheetDescription className="text-slate-400 text-sm mt-2">
            Quick tools to evaluate Ramon's fit for your open roles.
          </SheetDescription>
        </SheetHeader>

        <div ref={sectionsRef} className="py-8 space-y-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col justify-center min-h-[85px]">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Clock size={14} className="text-indigo-400" />
                <span>Notice Period</span>
              </div>
              <p className="text-sm font-semibold text-white">Immediate / 30 Days</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col justify-center min-h-[85px]">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <MapPin size={14} className="text-cyan-400" />
                <span>Work Preference</span>
              </div>
              <p className="text-sm font-semibold text-white">Hybrid / Remote</p>
            </div>
          </div>

          {/* Resume Download */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-1">
              <FileDown size={16} className="text-indigo-400" />
              Direct Documents
            </h3>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Ramon_Tomaquin_Resume.pdf"
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold h-14 flex items-center justify-center gap-2 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              data-cursor-hover
            >
              <FileDown size={18} />
              Download PDF Resume
            </a>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 rounded-xl border border-white/5 transition-colors"
                data-cursor-hover
              >
                {emailCopied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} className="text-indigo-400" />}
                {emailCopied ? 'Copied!' : 'Copy Email'}
              </button>
              <a
                href="https://www.linkedin.com/in/arcee-tomaquin-bb0b7a1b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 rounded-xl border border-white/5 transition-colors"
                data-cursor-hover
              >
                <Linkedin size={14} className="text-indigo-400" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* JD Matcher */}
          <div className="space-y-5 bg-white/5 p-5 sm:p-6 rounded-3xl border border-white/5">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              JD Fit Analyzer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste a Job Description to get a detailed, weighted fit analysis — not just a keyword count.
            </p>
            <div className="space-y-4">
              <Textarea
                placeholder="Paste Job Description here (e.g. 'Looking for a Java Automation Engineer with Appium experience...')"
                value={jdText}
                onChange={(e) => handleJdTextChange(e.target.value)}
                className="bg-slate-900/80 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 rounded-2xl text-xs h-28 p-4 resize-none leading-relaxed"
              />
              <Button
                onClick={handleAnalyzeJD}
                disabled={!jdText.trim()}
                className="w-full bg-white/10 hover:bg-white/15 text-white text-xs h-12 rounded-2xl transition-all font-medium"
              >
                Analyze Job Description
              </Button>
            </div>

            {matchResult && (
              <div className="mt-5 space-y-5 pt-5 border-t border-white/5 animate-fade-in">
                {/* Overall score + grade */}
                <div className={`rounded-2xl border p-4 ${GRADE_STYLES[matchResult.grade].bg} ${GRADE_STYLES[matchResult.grade].ring}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300 font-medium">Overall Fit</span>
                    <span className={`text-2xl font-bold ${GRADE_STYLES[matchResult.grade].text}`}>
                      <AnimatedScore value={matchResult.score} />%
                    </span>
                  </div>
                  <Progress value={matchResult.score} className="h-2 bg-slate-800/80 rounded-full mb-3" />
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold ${GRADE_STYLES[matchResult.grade].text}`}>{matchResult.grade}</span>
                    {matchResult.yearsRequired && (
                      <span className="text-[10px] text-slate-400">JD asks for {matchResult.yearsRequired}+ yrs experience</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-2">{GRADE_COPY[matchResult.grade]}</p>
                </div>

                {/* Category breakdown */}
                {matchResult.categories.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Breakdown by Category</span>
                    <div className="space-y-2.5">
                      {matchResult.categories.map((c) => (
                        <div key={c.category}>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-slate-300">{c.category}</span>
                            <span className="text-slate-500">{c.matched}/{c.relevant} · {c.score}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
                              style={{ width: `${c.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Skills */}
                {matchResult.matches.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      Matched Skills ({matchResult.matches.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matches.map((m) => (
                        <span
                          key={m.skill.id}
                          title={m.skill.proficiencyNote}
                          className={`px-2.5 py-1 text-[10px] rounded-full border font-medium cursor-default ${
                            m.strength === 'required'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {m.skill.id}
                          {m.strength === 'required' && <span className="ml-1 opacity-70">•required</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gaps & talking points */}
                {matchResult.gaps.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <AlertCircle size={12} className="text-amber-400" />
                      Gaps & Talking Points
                    </span>
                    <div className="space-y-1.5">
                      {matchResult.gaps.map((g) => (
                        <div key={g.skill.id} className="flex items-start gap-2 text-[11px] text-slate-400 bg-amber-500/5 border border-amber-500/10 rounded-xl px-3 py-2">
                          <span className="font-semibold text-amber-300">{g.skill.id}</span>
                          {g.skill.adjacentTo && (
                            <span className="text-slate-500">— adjacent: {g.skill.adjacentTo.join(', ')}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline highlight toggle */}
                <button
                  onClick={() => setShowHighlights((v) => !v)}
                  className="w-full flex items-center justify-center gap-2 text-[11px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl h-9 transition-colors"
                >
                  {showHighlights ? <EyeOff size={12} /> : <Eye size={12} />}
                  {showHighlights ? 'Hide highlighted JD' : 'Show matched terms in JD'}
                </button>
                {showHighlights && (
                  <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 border border-white/5 rounded-xl p-3 max-h-40 overflow-y-auto whitespace-pre-wrap">
                    <HighlightedJD text={jdText} terms={matchResult.highlightedTerms} />
                  </div>
                )}

                {/* Copy summary */}
                <Button
                  onClick={handleCopySummary}
                  className="w-full bg-white/10 hover:bg-white/15 text-white text-xs h-11 rounded-2xl transition-all font-medium flex items-center justify-center gap-2"
                >
                  {copiedSummary ? <ClipboardCheck size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copiedSummary ? 'Copied to clipboard!' : 'Copy Full Fit Report'}
                </Button>
              </div>
            )}
          </div>

          {/* Quick Q&A Chat */}
          <div className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/5">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-400" />
              Ask Ramon (Instant Answers)
            </h3>
            
            {/* Chat Screen */}
            <div className="bg-slate-950/80 rounded-2xl p-5 min-h-[160px] max-h-[220px] overflow-y-auto space-y-4 border border-white/5 text-xs">
              {chatHistory.length === 0 ? (
                <div className="text-slate-500 flex flex-col items-center justify-center h-full py-6 gap-2">
                  <HelpCircle size={24} className="opacity-40" />
                  <p>Click any question below to chat</p>
                </div>
              ) : (
                chatHistory.map((chat, i) => (
                  <div key={i} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      chat.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-200 rounded-tl-none'
                    }`}>
                      {chat.text}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="space-y-2.5">
              {FAQ_RESPONSES.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleFaqClick(index)}
                  disabled={isTyping}
                  className="w-full text-left p-4 bg-slate-900/50 hover:bg-slate-800/80 text-xs text-slate-300 hover:text-white rounded-2xl border border-white/5 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{faq.question}</span>
                  <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
