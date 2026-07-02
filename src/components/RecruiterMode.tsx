import { useState, useEffect } from 'react';
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
  HelpCircle
} from 'lucide-react';

interface RecruiterModeProps {
  isOpen: boolean;
  onClose: () => void;
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

const SKILL_KEYWORDS: { [key: string]: string[] } = {
  'Java': ['java', 'jdk', 'jvm'],
  'Python': ['python', 'py'],
  'TypeScript': ['typescript', 'ts'],
  'JavaScript': ['javascript', 'js', 'es6'],
  'Selenium': ['selenium', 'webdriver', 'grid'],
  'Appium': ['appium', 'ios', 'android', 'mobile automation'],
  'Playwright': ['playwright'],
  'WebDriverIO': ['webdriverio', 'wdio'],
  'Perfecto': ['perfecto'],
  'Digital.ai': ['digital.ai', 'device farm', 'see-test'],
  'Docker': ['docker', 'container', 'kubernetes', 'k8s'],
  'CI/CD': ['ci/cd', 'jenkins', 'gitlab ci', 'github actions', 'kokoro', 'pipeline'],
  'Linux': ['linux', 'bash', 'shell'],
  'AI Testing': ['ai', 'gemini', 'openai', 'llm', 'artificial intelligence']
};

export function RecruiterMode({ isOpen, onClose }: RecruiterModeProps) {
  const [jdText, setJdText] = useState('');
  const [matchResult, setMatchResult] = useState<{
    score: number;
    matched: string[];
    missing: string[];
  } | null>(null);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Reset JD match on text clear
  useEffect(() => {
    if (!jdText) {
      setMatchResult(null);
    }
  }, [jdText]);

  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;

    const lowerJD = jdText.toLowerCase();
    const matched: string[] = [];
    const missing: string[] = [];

    Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
      const isMatched = keywords.some(keyword => lowerJD.includes(keyword));
      if (isMatched) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const totalSkills = Object.keys(SKILL_KEYWORDS).length;
    const score = Math.round((matched.length / Math.min(matched.length + 3, totalSkills)) * 100); 
    // Normalized score so matching 4-5 core skills gives a highly positive match

    setMatchResult({
      score: Math.min(score, 100),
      matched,
      missing: missing.slice(0, 4) // Show top 4 missing as "opportunities to grow/discuss"
    });
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
        className="w-full sm:max-w-md bg-[#020617]/95 border-l border-white/10 backdrop-blur-xl text-white overflow-y-auto z-[999] p-8 sm:p-10"
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

        <div className="py-8 space-y-10">
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
            <Button 
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold h-14 flex items-center justify-center gap-2 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank')}
            >
              <FileDown size={18} />
              Download PDF Resume
            </Button>
          </div>

          {/* JD Matcher */}
          <div className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/5">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              JD Fit Analyzer (ATS Sim)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste your Job Description below to instantly calculate Ramon's skill alignment.
            </p>
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste Job Description here (e.g. 'Looking for a Java Automation Engineer with Appium experience...')"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
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
              <div className="mt-5 space-y-4 pt-5 border-t border-white/5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">ATS Match Score</span>
                  <span className="text-sm font-bold text-cyan-400">{matchResult.score}%</span>
                </div>
                <Progress value={matchResult.score} className="h-2 bg-slate-800 rounded-full" />

                {/* Matched Skills */}
                {matchResult.matched.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      Matched Requirements
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matched.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-[10px] bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {matchResult.missing.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <AlertCircle size={12} className="text-amber-400" />
                      Open for Discussion / Additional Tech
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missing.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-[10px] bg-amber-500/10 text-amber-300 rounded-full border border-amber-500/20 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
