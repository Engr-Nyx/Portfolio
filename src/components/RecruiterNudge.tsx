import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const DISMISS_KEY = 'recruiter-nudge-dismissed';

interface RecruiterNudgeProps {
  onOpen: () => void;
}

export function RecruiterNudge({ onOpen }: RecruiterNudgeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  const handleOpen = () => {
    dismiss();
    onOpen();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed z-[44] bottom-[136px] right-4 sm:bottom-auto sm:top-[76px] sm:right-6 w-[min(280px,calc(100vw-2rem))] animate-fade-in"
      role="status"
    >
      <div className="relative glass-strong rounded-2xl p-4 pr-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
        <div className="flex items-start gap-2.5">
          <Sparkles size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-200 leading-relaxed">
            <span className="font-semibold text-white">Hiring?</span> Try Recruiter Mode — JD matcher, resume, instant Q&A.
          </p>
        </div>
        <button
          onClick={handleOpen}
          className="mt-3 w-full text-center text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full py-2 hover:opacity-90 transition-opacity"
        >
          Open Recruiter Mode
        </button>
      </div>
    </div>
  );
}
