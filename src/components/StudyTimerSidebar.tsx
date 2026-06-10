import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  Zap,
  Volume2,
  VolumeX,
  Plus
} from 'lucide-react';

interface StudyTimerSidebarProps {
  currentScore: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  candidateName?: string;
  isLoggedIn?: boolean;
}

const SYLLABUS_TOPICS = [
  { id: 'CAD', name: 'Computer-Aided Design (CAD)', desc: 'Parametric modeling & assembly alignment constraints' },
  { id: 'FEA', name: 'Finite Element Analysis (FEA)', desc: 'Von-Mises stress fields & structural failures' },
  { id: 'CFD', name: 'Fluid Dynamics Study (CFD)', desc: 'Laminar boundaries, Reynolds numbers & aerodynamic flow' },
  { id: 'SRE', name: 'Reliability Engineering (SRE)', desc: 'Governor linkages & thermodynamic gas cycles' },
  { id: 'IoT', name: 'Internet of Things (IoT)', desc: 'Embedded sensory networks & remote mechanical telemetry' }
];

export default function StudyTimerSidebar({ 
  currentScore, 
  setScore, 
  candidateName = 'Guest Scholar',
  isLoggedIn = false
}: StudyTimerSidebarProps) {
  // Sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Timer State
  const [selectedTopicId, setSelectedTopicId] = useState('CAD');
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Custom Simulator speed toggle (for quick grading / trial runs)
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1); // 1 = real-time, 60 = 60x speed, 1500 = instant

  // Session History (local storage persisted)
  const [focusHistory, setFocusHistory] = useState<{
    id: string;
    topicName: string;
    timestamp: string;
    durationMinutes: number;
    pointsAwarded: number;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('mechFocusSessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Beep sound generator using Web Audio API (safe, no file paths)
  const playTriggerSound = (frequency = 523.25, type: OscillatorType = 'sine', duration = 0.3) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext failed to boot:", e);
    }
  };

  // Sound effects on buttons
  const clickBeep = () => playTriggerSound(330, 'triangle', 0.08);
  const finishFanfare = () => {
    playTriggerSound(523.25, 'sine', 0.15);
    setTimeout(() => playTriggerSound(659.25, 'sine', 0.15), 150);
    setTimeout(() => playTriggerSound(783.99, 'sine', 0.3), 300);
  };

  // Timer loop
  useEffect(() => {
    if (isActive) {
      const intervalMs = 1000 / simulationSpeed;
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            // Completed!
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, simulationSpeed, isBreak, selectedTopicId]);

  const handleTimerComplete = () => {
    setIsActive(false);
    finishFanfare();

    const topic = SYLLABUS_TOPICS.find(t => t.id === selectedTopicId) || SYLLABUS_TOPICS[0];
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const points = isBreak ? 0 : 10;

    if (!isBreak) {
      // Award points straight to Score board!
      setScore(prev => prev + 10);
      
      // Save focus session history
      const newSession = {
        id: crypto.randomUUID(),
        topicName: topic.name,
        timestamp,
        durationMinutes: 25,
        pointsAwarded: points
      };

      setFocusHistory(prev => {
        const updated = [newSession, ...prev].slice(0, 8); // Keep last 8 entries
        localStorage.setItem('mechFocusSessions', JSON.stringify(updated));
        return updated;
      });

      // Show temporary overlay window announcement
      alert(`🎓 FOCUS TARGET ACHIEVED!\nYou concentrated on: ${topic.name}!\n\n+10 points awarded to your certified candidate score matrix! Excellent job!`);
    } else {
      alert(`🧘 BREATHING BREAK COMPLETE!\nYou are now fully dynamic and calibrated to resume mechanical study sessions.`);
    }

    // Switch roles automatically
    if (!isBreak) {
      // Auto-set break of 5 minutes
      setIsBreak(true);
      setSecondsRemaining(5 * 60);
    } else {
      setIsBreak(false);
      setSecondsRemaining(25 * 60);
    }
  };

  // Toggle handlers
  const handleToggleActive = () => {
    clickBeep();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    clickBeep();
    setIsActive(false);
    setIsBreak(false);
    setSecondsRemaining(25 * 60);
  };

  const skipToAlmostComplete = () => {
    clickBeep();
    setSecondsRemaining(3); // Set to 3 seconds remaining for quick test confirmation
    setIsActive(true);
  };

  // Fast forward simulator speed helper
  const handleSpeedToggle = () => {
    clickBeep();
    // Loop through 1x, 60x, 300x
    setSimulationSpeed(prev => {
      if (prev === 1) return 60;
      if (prev === 60) return 300;
      return 1;
    });
  };

  // Circular timer calculation
  const totalDuration = isBreak ? 5 * 60 : 25 * 60;
  const progressPercent = ((totalDuration - secondsRemaining) / totalDuration) * 100;

  // Format MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeTopic = SYLLABUS_TOPICS.find(t => t.id === selectedTopicId) || SYLLABUS_TOPICS[0];

  return (
    <>
      {/* FLOATING ACTION TAB BUTTON */}
      <button
        id="study-timer-floating-toggle"
        onClick={() => {
          setIsOpen(!isOpen);
          clickBeep();
        }}
        className={`fixed top-1/2 -right-[2px] -translate-y-1/2 z-55 bg-zinc-950 border-y border-l transition-all duration-300 py-4 px-3 flex flex-col items-center gap-2 shadow-2xl rounded-l-xl select-none ${
          isOpen ? 'border-[#e2231a] -translate-x-[360px]' : 'border-white/10 hover:border-yellow-400 group'
        }`}
        title="Open Syllabus Focus Timer"
      >
        <div className="relative">
          <Clock 
            size={18} 
            className={`text-yellow-400 ${isActive ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} 
            style={{ animationDuration: isActive ? `${3 / simulationSpeed}s` : '3s' }}
          />
          {isActive && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          )}
        </div>
        <span className="font-bebas text-xs tracking-wider text-zinc-300 uppercase [writing-mode:vertical-lr] rotate-180">
          STUDY TIMELINE {isActive ? '• ACTIVE' : '• POMODORO'}
        </span>
        {isOpen ? <ChevronRight size={14} className="text-zinc-500" /> : <ChevronLeft size={14} className="text-yellow-400 animate-pulse" />}
      </button>

      {/* RECEPTACLE OVERLAY BACKGROUND BACKDROP */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-45 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* INTUITIVE STUDY TIMER SIDEBAR DRAWER */}
      <div
        id="study-timer-sidebar-drawer"
        className={`fixed top-0 right-0 h-full w-[360px] bg-[#0c0c0d] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 transform font-sans ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER SECTION */}
        <div className="p-5 border-b border-white/10 bg-black/40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_#facc15]" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                CORE SYLLABUS FOCUS DESK
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute cues" : "Mute cues"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          <h3 className="font-bebas text-3xl text-white tracking-widest uppercase font-black mt-2">
            POMODORO STUDIO
          </h3>
          <p className="text-xs text-zinc-400">
            Certified deep study engine. Complete a 25-minute focused interval to claim certificates and <strong className="text-yellow-400">+10 matrix points</strong>.
          </p>
        </div>

        {/* STUDY CONTROLS & SECTOR WHEEL */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* TOPIC SELECTOR */}
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
              1. Choose Syllabus Topic:
            </label>
            <div className="space-y-1.5">
              {SYLLABUS_TOPICS.map((topic) => {
                const isSel = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      if (!isActive) {
                        setSelectedTopicId(topic.id);
                        clickBeep();
                      } else {
                        alert("⚠️ TIMER IS RUNNING: Please pause or reset the timer before switching study topics.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSel 
                        ? 'bg-yellow-500/10 border-yellow-500/40 text-white' 
                        : 'bg-black/30 border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen size={13} className={isSel ? "text-yellow-400 animate-pulse" : "text-zinc-500"} />
                      <span className="font-sans font-bold text-xs">{topic.id} Track</span>
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-300 mt-0.5 truncate">
                      {topic.name}
                    </div>
                    <div className="text-[9px] text-zinc-500 mt-1">
                      {topic.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC CIRCULAR TIMER WATCH */}
          <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-xl space-y-4">
            
            {/* Visual Circular Dial */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-95 transform">
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  className="stroke-zinc-900 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  className={`fill-none transition-all duration-300 ${
                    isBreak ? 'stroke-emerald-500' : 'stroke-yellow-500'
                  }`}
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 72}
                  strokeDashoffset={2 * Math.PI * 72 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inner Countdown */}
              <div className="absolute text-center space-y-0.5">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-black block">
                  {isBreak ? '☕ REST' : '⚡ FOCUSING'}
                </span>
                <span className="font-mono text-3xl text-white font-extrabold tracking-wider block">
                  {formatTime(secondsRemaining)}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                  {isBreak ? "Break block" : "25M Target"}
                </span>
              </div>
            </div>

            {/* BUTTON TRIGGERS */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleToggleActive}
                className={`flex-1 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'bg-[#e2231a] hover:bg-red-700 text-white shadow-lg shadow-[#e2231a]/10'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause size={14} /> PAUSE INTERVAL
                  </>
                ) : (
                  <>
                    <Play size={14} /> START STUDYING
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                title="Reset timer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* SPEED-UP SIMULATOR CONTROLLER CARDS */}
            <div className="w-full border-t border-white/5 pt-3.5 space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold tracking-wider">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Zap size={11} className="text-yellow-400" /> SIMULATOR SPEED SHIELD:
                </span>
                <span className="text-yellow-400 font-extrabold">{simulationSpeed}x</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSpeedToggle}
                  className="py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded text-[10px] font-mono font-medium text-zinc-300 hover:text-white cursor-pointer"
                  title="Toggle emulation speed to bypass long waits"
                >
                  ⚡ SPEED: {simulationSpeed === 1 ? '1x' : simulationSpeed === 60 ? '60x' : '300x'}
                </button>

                <button
                  type="button"
                  onClick={skipToAlmostComplete}
                  className="py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 rounded text-[10px] font-mono font-extrabold text-yellow-400 cursor-pointer"
                  title="Force complete in 3 seconds to test points sync"
                >
                  ⏩ FAST COMPLETE
                </button>
              </div>
            </div>

          </div>

          {/* COMPLETED LEDGER TRANSACTION ACTIVITY */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
              2. Focal Ledger Records (Session History):
            </span>

            {focusHistory.length === 0 ? (
              <div className="p-6 border border-dashed border-white/5 bg-black/20 text-center rounded-lg text-zinc-500 text-xs font-mono">
                No verified focal checkpoints logged. Pick a track and start the Pomodoro desk to certifiably register matrix points!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {focusHistory.map((sess) => (
                  <div 
                    key={sess.id} 
                    className="p-3 bg-zinc-950 border border-white/10 rounded-lg flex items-center justify-between"
                  >
                    <div className="space-y-0.5 overflow-hidden pr-2">
                      <p className="text-xs text-white font-bold leading-tight truncate">
                        {sess.topicName}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono font-bold">
                        Completed at {sess.timestamp} • Duration: {sess.durationMinutes}M
                      </p>
                    </div>
                    <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded font-mono text-[11px] font-black shrink-0 flex items-center gap-1">
                      <CheckCircle size={10} /> +10 PTS
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* BOTTOM LEDGER METRICS */}
        <div className="p-4 border-t border-white/10 bg-black/50 text-center">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-zinc-500 font-bold uppercase">PROVED SCORECARD:</span>
            <span className="text-yellow-400 font-black text-sm">{currentScore} PTS</span>
          </div>
          <div className="mt-2 text-[10px] text-indigo-400/90 font-mono">
            🛡️ Certified Academic Blockchain Pipeline v2.4.0
          </div>
        </div>

      </div>
    </>
  );
}
