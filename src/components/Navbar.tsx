import { useState, useEffect, useRef } from 'react';
import { Menu, X, Landmark, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenRideForm: () => void;
  currentScore: number;
  isLoggedIn?: boolean;
  candidateName?: string;
  candidateEmail?: string;
  dailyStreak?: number;
  animateStreakTrigger?: number;
}

export default function Navbar({
  onOpenRideForm,
  currentScore,
  isLoggedIn,
  candidateName,
  candidateEmail,
  dailyStreak = 1,
  animateStreakTrigger = 0
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const prevStreakRef = useRef<number>(dailyStreak);
  const prevTriggerRef = useRef<number>(animateStreakTrigger);

  useEffect(() => {
    if (
      dailyStreak > prevStreakRef.current ||
      (animateStreakTrigger > prevTriggerRef.current && animateStreakTrigger > 0)
    ) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dailyStreak, animateStreakTrigger]);

  useEffect(() => {
    prevStreakRef.current = dailyStreak;
    prevTriggerRef.current = animateStreakTrigger;
  }, [dailyStreak, animateStreakTrigger]);

  useEffect(() => {
    // Scroll detection
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Live Clock to show beautiful attention to detail (non-tech-larp, strictly helpful human clock)
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#080808]/92 backdrop-blur-md py-4 border-b border-suzuki-red/20 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-suzuki-red relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
               style={{
                 clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 70% 50%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 30% 50%, 0% 30%)'
               }}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="font-bebas text-xl md:text-2xl tracking-wider font-bold text-white">MECHFORGE_V2.4.0</span>
            {isLoggedIn ? (
              <motion.span
                variants={{
                  shake: {
                    x: [0, -6, 6, -6, 6, -3, 3, 0],
                    scale: [1, 1.15, 1.15, 1.2, 1.2, 1.05, 1.05, 1],
                    rotate: [0, -4, 4, -4, 4, 0],
                    backgroundColor: [
                      "rgba(226,35,26,0.25)",
                      "rgba(234,179,8,0.7)",
                      "rgba(251,146,60,0.8)",
                      "rgba(234,179,8,0.9)",
                      "rgba(226,35,26,0.25)"
                    ],
                    borderColor: ["#e2231a", "#eab308", "#fb923c", "#eab308", "#e2231a"],
                    boxShadow: [
                      "0 0 0px rgba(226,35,26,0)",
                      "0 0 15px rgba(234,179,8,0.6)",
                      "0 0 25px rgba(251,146,60,0.8)",
                      "0 0 15px rgba(234,179,8,0.6)",
                      "0 0 0px rgba(226,35,26,0)"
                    ],
                  },
                  pulse: {
                    scale: [1, 1.03, 1],
                    boxShadow: [
                      "0 0 0px rgba(226,35,26,0)",
                      "0 0 8px rgba(226,35,26,0.3)",
                      "0 0 0px rgba(226,35,26,0)"
                    ],
                  }
                }}
                animate={isShaking ? "shake" : "pulse"}
                transition={
                  isShaking 
                    ? { duration: 1.2, ease: "easeInOut" }
                    : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }
                className="px-2 py-0.5 bg-[#e2231a]/25 border border-[#e2231a] text-[9.5px] font-mono tracking-widest font-extrabold text-white rounded cursor-help relative flex items-center gap-1.5"
                title="Your daily consecutive study streak! Keep completing daily Socratic/Numerical quizzes to maintain!"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{dailyStreak} DAY STREAK // ACTIVE 🔥</span>
              </motion.span>
            ) : (
              <span className="px-1.5 py-0.5 bg-zinc-800/40 border border-zinc-700/60 text-[9px] font-mono tracking-widest font-extrabold text-zinc-500 rounded">
                0 DAY STREAK // INACTIVE
              </span>
            )}
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm tracking-widest font-condensed uppercase font-semibold text-gray-300">
          <li>
            <a href="#bikes" className="hover:text-suzuki-red transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-suzuki-red after:transition-all hover:after:w-full">
              Socratic Quizzes
            </a>
          </li>
          <li>
            <a href="#difference" className="hover:text-[#e2231a] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#e2231a] after:transition-all hover:after:w-full font-bold">
              Emerging Tech Feed
            </a>
          </li>

          <li>
            <a href="#technology" className="hover:text-[#e2231a] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#e2231a] after:transition-all hover:after:w-full">
              Sci-Tech Theory
            </a>
          </li>
          <li>
            <a href="#deals" className="hover:text-[#e2231a] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#e2231a] after:transition-all hover:after:w-full">
              Leaderboard Matrix
            </a>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* User Credentials status */}
          {isLoggedIn && candidateEmail && (
            <div className="flex flex-col text-right leading-tight bg-white/5 border border-white/5 px-3 py-1.5 rounded">
              <span className="text-[10px] text-[#e2231a] font-mono tracking-widest uppercase font-black">
                SCHOLAR CREDENTIALS
              </span>
              <span className="text-[12px] text-white font-sans font-semibold">
                {candidateEmail}
              </span>
            </div>
          )}

          {/* Indian Live Time Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-400 font-mono text-xs rounded">
            <Clock size={11} className="text-suzuki-red animate-pulse" />
            <span>{currentTime}</span>
          </div>

          <button
            onClick={onOpenRideForm}
            className="bg-[#e2231a] text-white font-condensed px-5 py-2 text-sm tracking-wider font-extrabold uppercase hover:bg-red-700 transition-all shadow-md shadow-[#e2231a]/20"
          >
            Terminal Access
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-suzuki-red transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#080808]/98 z-40 lg:hidden flex flex-col justify-center items-center gap-6 px-12 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="text-center font-bebas text-3xl tracking-widest uppercase space-y-5">
          <li>
            <a href="#bikes" onClick={() => setMobileMenuOpen(false)} className="hover:text-suzuki-red transition-colors block">
              Dashboard Grades
            </a>
          </li>
          <li>
            <a href="#difference" onClick={() => setMobileMenuOpen(false)} className="hover:text-suzuki-red transition-colors block">
              Emerging Tech Feed
            </a>
          </li>

          <li>
            <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="hover:text-suzuki-red transition-colors block">
              Sci-Tech Theory
            </a>
          </li>
          <li>
            <a href="#deals" onClick={() => setMobileMenuOpen(false)} className="hover:text-suzuki-red transition-colors block">
              Leaderboard Matrix
            </a>
          </li>
        </ul>

        {isLoggedIn && candidateEmail && (
          <div className="w-full text-center bg-white/5 border border-white/10 p-3 rounded mb-2">
            <span className="text-[9px] text-[#e2231a] font-mono tracking-widest uppercase font-bold block mb-1">Authenticated Scholar</span>
            <span className="text-sm text-white font-sans font-medium block">{candidateName}</span>
            <span className="text-xs text-zinc-400 font-mono block">{candidateEmail}</span>
          </div>
        )}

        <div className="w-full h-[1px] bg-white/10 my-4" />

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRideForm();
            }}
            className="w-full py-3 bg-suzuki-red text-white font-condensed tracking-wider uppercase font-extrabold text-sm shadow-md"
          >
            Formulas Dictionary
          </button>
        </div>
      </div>
    </>
  );
}
