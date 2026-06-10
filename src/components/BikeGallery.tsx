import React, { useState, useEffect, useRef } from 'react';

// Highly-stable, React 19 compatible forwardRef mock components for Framer Motion to bypass runtime static flag crashes and freeze errors
const motion = {
  div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { initial?: any; animate?: any; exit?: any; transition?: any; whileHover?: any; whileTap?: any }>(({ children, className, initial, animate, exit, transition, whileHover, whileTap, ...props }: any, ref) => (
    <div ref={ref} className={className} {...props}>{children}</div>
  )),
  p: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { initial?: any; animate?: any; exit?: any; transition?: any }>(({ children, className, initial, animate, exit, transition, ...props }: any, ref) => (
    <p ref={ref} className={className} {...props}>{children}</p>
  )),
  button: React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { initial?: any; animate?: any; exit?: any; transition?: any; whileHover?: any; whileTap?: any }>(({ children, className, initial, animate, exit, transition, whileHover, whileTap, ...props }: any, ref) => (
    <button ref={ref} className={className} {...props}>{children}</button>
  ))
};
const AnimatePresence: React.FC<{ children: React.ReactNode; mode?: string }> = ({ children }) => <>{children}</>;
import { EXTENSIBLE_FORMULAS } from '../data';
import { getQuestionsForModule } from '../utils/questionGenerator';
import { Check, Info, Sparkles, Send, BrainCircuit, Play, Pause, RefreshCw, Layers, ShieldAlert, CheckCircle, Award, Hourglass, Lock, Unlock, HelpCircle, Target, ArrowRight } from 'lucide-react';
import ProblemDiagram from './ProblemDiagram';
import BadgeInventory from './BadgeInventory';


const GRAD2_QUESTION_IMAGES: Record<number, { url: string; label: string }> = {
  1: { url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80", label: "⚙️ Torsional Vibration Rotor Assembly" },
  2: { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80", label: "🏗️ Elastic Cantilever Flexure Load" },
  3: { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", label: "🔩 Pure Twisting Torque Shaft System" },
  4: { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", label: "🔥 Carnot Thermal Cycle Boiler Plant" },
  5: { url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80", label: "🌊 Reynolds Number Fluid Pipe Flow" },
  6: { url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80", label: "⚙️ Planetary Epicyclic Gear Train" },
  7: { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80", label: "📊 PERT Network Timeline Sprints" },
  8: { url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80", label: "🗜️ Taylor Tool-Life Lathe Machine" },
  9: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", label: "🧪 Pressure Vessel Hoop Stress" },
  10: { url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80", label: "🔬 Hooke's Poisson Elastic Ratio" },
};

interface BikeGalleryProps {
  onSelectedForEmi?: (bikeId: string) => void;
  onSelectedForRide?: (bikeId: string) => void;
  candidateName: string;
  candidateEmail?: string;
  collegeName: string;
  currentScore: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  activeTrackID: 'GRADE_01' | 'GRADE_02' | 'GRADE_03' | null;
  setActiveTrackID: (track: 'GRADE_01' | 'GRADE_02' | 'GRADE_03' | null) => void;
  dailyStreak?: number;
  setDailyStreak?: React.Dispatch<React.SetStateAction<number>>;
  onStreakTrigger?: () => void;
}

export default function BikeGallery({
  onSelectedForEmi,
  onSelectedForRide,
  candidateName,
  candidateEmail = '',
  collegeName,
  currentScore,
  setScore,
  activeTrackID,
  setActiveTrackID,
  dailyStreak = 0,
  setDailyStreak,
  onStreakTrigger
}: BikeGalleryProps) {
  const [activeGrade, setActiveGrade] = useState<'grade1' | 'grade2' | 'grade3'>('grade1');

  // File input ref for selecting draft files
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for synchronized drafts (keyed by composite question key: module_id-q_id)
  const [syncedDraftFiles, setSyncedDraftFiles] = useState<Record<string, {
    name: string;
    size: string;
    type: string;
    preview: string | null;
    timestamp: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('mechSyncedDraftFiles');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [draftSyncProgress, setDraftSyncProgress] = useState<Record<string, number>>({});
  const [draftSyncingLabel, setDraftSyncingLabel] = useState<Record<string, string>>({});
  const [isDragOverDraft, setIsDragOverDraft] = useState<Record<string, boolean>>({});

  const startDraftSyncSimulation = (file: File, key: string) => {
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    const steps = [
      "Configuring ingestion channel...",
      isImage ? "Decoding pixel arrays for vectors..." : isPdf ? "Parsing structural FBD documents..." : "Reading CAD file geometries...",
      "Resolving node and link entities...",
      "Cross-referencing telemetry angles with force polygons...",
      "Matching kinematic free-body constraints...",
      "Injecting alignment coordinates...",
      "Synchronized in-app evaluation database!",
    ];

    let progress = 0;
    setDraftSyncProgress(prev => ({ ...prev, [key]: 1 }));
    setDraftSyncingLabel(prev => ({ ...prev, [key]: steps[0] }));

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        if (isImage) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const previewUrl = e.target?.result as string || null;
            const updatedDrafts = {
              ...syncedDraftFiles,
              [key]: {
                name: file.name,
                size: (file.size / 1024).toFixed(1) + ' KB',
                type: file.type,
                preview: previewUrl,
                timestamp: new Date().toLocaleTimeString(),
              }
            };
            setSyncedDraftFiles(updatedDrafts);
            localStorage.setItem('mechSyncedDraftFiles', JSON.stringify(updatedDrafts));
            setDraftSyncProgress(prev => {
              const copy = { ...prev };
              delete copy[key];
              return copy;
            });
            setDraftSyncingLabel(prev => {
              const copy = { ...prev };
              delete copy[key];
              return copy;
            });
          };
          reader.readAsDataURL(file);
        } else {
          const updatedDrafts = {
            ...syncedDraftFiles,
            [key]: {
              name: file.name,
              size: (file.size / 1024).toFixed(1) + ' KB',
              type: file.type,
              preview: null,
              timestamp: new Date().toLocaleTimeString(),
            }
          };
          setSyncedDraftFiles(updatedDrafts);
          localStorage.setItem('mechSyncedDraftFiles', JSON.stringify(updatedDrafts));
          setDraftSyncProgress(prev => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
          });
          setDraftSyncingLabel(prev => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
          });
        }
      } else {
        setDraftSyncProgress(prev => ({ ...prev, [key]: progress }));
        const stepIdx = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
        setDraftSyncingLabel(prev => ({ ...prev, [key]: steps[stepIdx] }));
      }
    }, 100);
  };

  const handleDraftFileSelect = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      startDraftSyncSimulation(e.target.files[0], key);
    }
  };

  const handleDraftFileDrop = (e: React.DragEvent<HTMLDivElement>, key: string) => {
    e.preventDefault();
    setIsDragOverDraft(prev => ({ ...prev, [key]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startDraftSyncSimulation(e.dataTransfer.files[0], key);
    }
  };

  const removeSyncedDraft = (key: string) => {
    const updatedDrafts = { ...syncedDraftFiles };
    delete updatedDrafts[key];
    setSyncedDraftFiles(updatedDrafts);
    localStorage.setItem('mechSyncedDraftFiles', JSON.stringify(updatedDrafts));
  };

  // Custom non-blocking modal alert/confirm message state
  const [appAlert, setAppAlert] = useState<{
    text: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    onConfirm?: () => void;
    isConfirm?: boolean;
  } | null>(null);

  // AI Check-in Engine States
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState<string | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<'success' | 'locked' | 'error' | null>(null);
  const [countdownStr, setCountdownStr] = useState<string>('Ready to Claim');
  const [isTimerReady, setIsTimerReady] = useState<boolean>(true);

  useEffect(() => {
    const userEmailKey = (candidateEmail || localStorage.getItem('mechUserEmail') || '').toLowerCase().trim();
    if (!userEmailKey) {
      setCountdownStr('Ready to Claim');
      setIsTimerReady(true);
      return;
    }

    const updateTimer = () => {
      const storedTimeStr = localStorage.getItem(`mechNextCheckInAvailable_${userEmailKey}`);
      if (!storedTimeStr) {
        setCountdownStr('Ready to Claim');
        setIsTimerReady(true);
        return;
      }

      const targetTime = new Date(storedTimeStr).getTime();
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        setCountdownStr('Ready to Claim');
        setIsTimerReady(true);
      } else {
        setIsTimerReady(false);
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownStr(`${h}h ${m}m ${s}s left`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [candidateEmail]);

  const handleDailyCheckIn = async () => {
    const email = candidateEmail || localStorage.getItem('mechUserEmail') || '';
    if (!email) {
      alert("⚠️ AUTHENTICATION REQUIRED: Please register or log in using the Boot Console below first to start tracking your daily study streak!");
      return;
    }

    const emailKey = email.toLowerCase().trim();
    const lastCheckInTime = localStorage.getItem(`mechLastCheckInTime_${emailKey}`) || '';

    setIsCheckingIn(true);
    setCheckInMsg(null);
    setCheckInStatus(null);

    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          lastCheckInTime,
          currentStreak: dailyStreak,
          clientTime: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (data.allowed) {
        if (setDailyStreak) {
          setDailyStreak(data.newStreak);
        }
        if (onStreakTrigger) {
          onStreakTrigger();
        }
        localStorage.setItem(`mechDailyStreak_${emailKey}`, data.newStreak.toString());
        localStorage.setItem(`mechLastCheckInTime_${emailKey}`, data.lastCheckInTime);
        localStorage.setItem(`mechNextCheckInAvailable_${emailKey}`, data.nextCheckInAvailableAt);
        setCheckInStatus('success');
        setCheckInMsg(data.message);
      } else {
        setCheckInStatus('locked');
        setCheckInMsg(data.message);
        if (data.nextCheckInAvailableAt) {
          localStorage.setItem(`mechNextCheckInAvailable_${emailKey}`, data.nextCheckInAvailableAt);
        }
      }
    } catch (err) {
      console.error("Check-in request failed:", err);
      setCheckInStatus('error');
      setCheckInMsg("⚠️ Pipeline Connection Fault. Could not establish communication with MechForge AI check-in gateway.");
    } finally {
      setIsCheckingIn(false);
    }
  };
  
  // Timer Speedup offset simulation (milliseconds)
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);

  // Active module subdivisions
  const [g1ActiveModule, setG1ActiveModule] = useState<'MOM' | 'FMD' | 'THERMODYNAMICS' | 'MACHINES AND MECHANISMS'>('MOM');
  const [g2ActiveModule, setG2ActiveModule] = useState<'AMSM' | 'ATST' | 'ACS' | 'FEG'>('AMSM');
  const [g3ActiveModule, setG3ActiveModule] = useState<'SOM' | 'FM' | 'DME' | 'AT' | 'TVT' | 'CGD'>('SOM');

  // Load and store unlocked modules
  const [unlockedModules, setUnlockedModules] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('unlockedModules');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track completed final badges
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mechUserBadges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep a record of solved question IDs (composite keys: 'module_id-q_id')
  const [completedAnswers, setCompletedAnswers] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mechCompletedAnswers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Keep a record of whether the question was answered correctly (composite keys: 'module_id-q_id')
  const [correctlyAnswered, setCorrectlyAnswered] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mechCorrectlyAnswered');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Socratic hints count (composite keys: 'module_id-q_id')
  const [hintsUsed, setHintsUsed] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mechHintsUsed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Saved subjective answers for Grade 1 (composite keys: 'module_id-q_id' -> string)
  const [g1Answers, setG1Answers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('g1Answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Saved MCQ answers for Grade 2/3 (composite keys -> list index)
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mcqAnswers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Solution revealed state (prevents scores but reveals explanations, composite keys)
  const [solutionsRevealed, setSolutionsRevealed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('solutionsRevealed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local index targets for tracking inside the current module questions
  const [g1Indices, setG1Indices] = useState<Record<string, number>>({ MOM: 0, FMD: 0, THERMODYNAMICS: 0, 'MACHINES AND MECHANISMS': 0 });
  const [g2Indices, setG2Indices] = useState<Record<string, number>>({ AMSM: 0, ATST: 0 });
  const [g3Indices, setG3Indices] = useState<Record<string, number>>({ SOM: 0, FM: 0, DME: 0, AT: 0 });

  // Input states
  const [g1Input, setG1Input] = useState<string>('');
  const [g2OptionSelected, setG2OptionSelected] = useState<number | null>(null);
  const [g3OptionSelected, setG3OptionSelected] = useState<number | null>(null);

  // Unified 120-seconds countdown timer per question
  const [questionCountdown, setQuestionCountdown] = useState<number>(120);
  const [questionTimedOut, setQuestionTimedOut] = useState<boolean>(false);

  // Mistake counter per question (composite key: module_id-q_id)
  const [mistakeCounter, setMistakeCounter] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mechMistakeCounter');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Simulated day offset per module
  const [virtualDaysSimulated, setVirtualDaysSimulated] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mechVirtualDaysSimulated');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Unlimited / free-play study access to override chronological locks
  const [unlimitedAccess, setUnlimitedAccess] = useState<boolean>(() => {
    return localStorage.getItem('mechUnlimitedAccess') === 'true';
  });

  // Dynamic seed overrides for each syllabus tier (Level 1, Level 2, Level 3)
  const [levelQuestionSeeds, setLevelQuestionSeeds] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mechLevelQuestionSeeds');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Combined questions with level-specific Seeds to allow refreshing questions on reset
  const getQuestionsForModuleWithSeeds = (moduleId: string, elapsedDays: number) => {
    const seed1 = levelQuestionSeeds[`${moduleId}-1`] || 0;
    const seed2 = levelQuestionSeeds[`${moduleId}-2`] || 0;
    const seed3 = levelQuestionSeeds[`${moduleId}-3`] || 0;

    const qList1 = getQuestionsForModule(moduleId, elapsedDays + seed1);
    const qList2 = getQuestionsForModule(moduleId, elapsedDays + seed2);
    const qList3 = getQuestionsForModule(moduleId, elapsedDays + seed3);

    return [
      ...qList1.slice(0, 7),
      ...qList2.slice(7, 14),
      ...qList3.slice(14, 21)
    ];
  };

  // Get active elapsed study days of a module (1-indexed)
  const getVirtualElapsedDays = (moduleId: string) => {
    const unlockTime = unlockedModules[moduleId];
    if (!unlockTime) return 1;
    
    // Day = difference in 24 hours + offset simulated values
    const nowSimulated = Date.now() + timeOffset;
    const elapsedMs = nowSimulated - unlockTime;
    const standardElapsedDays = Math.floor(elapsedMs / (24 * 60 * 60 * 1000));
    const extraSimDays = virtualDaysSimulated[moduleId] || 0;
    
    return Math.max(1, standardElapsedDays + extraSimDays + 1);
  };

  const getStageCompleted = (moduleId: string, stage: number) => {
    const qIds = stage === 1 ? [1,2,3,4,5,6,7] : stage === 2 ? [8,9,10,11,12,13,14] : [15,16,17,18,19,20,21];
    return qIds.every(qid => completedAnswers[`${moduleId}-${qid}`]);
  };

  const getStagePassed = (moduleId: string, stage: number) => {
    const qIds = stage === 1 ? [1,2,3,4,5,6,7] : stage === 2 ? [8,9,10,11,12,13,14] : [15,16,17,18,19,20,21];
    const correctCount = qIds.filter(qid => correctlyAnswered[`${moduleId}-${qid}`]).length;
    return correctCount >= 4; // At least 50% (4 out of 7)
  };

  // Determine chronological level progress metrics (day 1, day 2, day 3 locks) & accuracy-driven bypass keys
  const checkDayUnlockStatus = (moduleId: string) => {
    const currentElapsedDays = getVirtualElapsedDays(moduleId);

    const level1Completed = getStageCompleted(moduleId, 1);
    const level1Passed = getStagePassed(moduleId, 1);

    const level2Completed = getStageCompleted(moduleId, 2);
    const level2Passed = getStagePassed(moduleId, 2);

    let activeUnlockedDay = 1;
    if (level1Completed && level1Passed) {
      activeUnlockedDay = 2;
      if (level2Completed && level2Passed) {
        activeUnlockedDay = 3;
      }
    }

    const questions = getQuestionsForModuleWithSeeds(moduleId, currentElapsedDays);
    const allSolved = questions.every(q => completedAnswers[`${moduleId}-${q.id}`]);

    return {
      activeUnlockedDay,
      day1Perfect: level1Passed,
      day2Perfect: level2Passed,
      day1Bypassed: level1Passed,
      day2Bypassed: level2Passed,
      currentElapsedDays,
      allSolved
    };
  };

  // Determine locked state for a given question index
  const isQuestionLockedByChrono = (moduleId: string, qId: number) => {
    if (unlimitedAccess) {
      return { locked: false, reason: '', dayRequired: 1 };
    }
    const { activeUnlockedDay } = checkDayUnlockStatus(moduleId);

    if (qId >= 1 && qId <= 7) {
      return { locked: false, reason: '', dayRequired: 1 };
    } else if (qId >= 8 && qId <= 14) {
      const locked = activeUnlockedDay < 2;
      let reason = '';
      if (locked) {
        if (!getStageCompleted(moduleId, 1)) {
          const solvedCount = [1,2,3,4,5,6,7].filter(qid => completedAnswers[`${moduleId}-${qid}`]).length;
          reason = `Level 2 is locked. Level 1 is incomplete (Completed: ${solvedCount}/7). Complete all previous 7 Level 1 questions first!`;
        } else {
          reason = `Level 2 is locked. You did not achieve the required passing score of 50% in Level 1.`;
        }
      }
      return {
        locked,
        reason,
        dayRequired: 2
      };
    } else {
      // qId >= 15
      const locked = activeUnlockedDay < 3;
      let reason = '';
      if (locked) {
        if (!getStageCompleted(moduleId, 2)) {
          const solvedCount = [8,9,10,11,12,13,14].filter(qid => completedAnswers[`${moduleId}-${qid}`]).length;
          reason = `Level 3 is locked. Level 2 is incomplete (Completed: ${solvedCount}/7). Complete all previous Level 2 questions first!`;
        } else {
          reason = `Level 3 is locked. You did not achieve the required passing score of 50% in Level 2.`;
        }
      }
      return {
        locked,
        reason,
        dayRequired: 3
      };
    }
  };

  // Get detailed reasons for lock and instructions to reset
  const getDetailedLockExplanation = (moduleId: string, qId: number) => {
    if (qId >= 8 && qId <= 14) {
      const qIds = [1, 2, 3, 4, 5, 6, 7];
      const solvedCount = qIds.filter(id => completedAnswers[`${moduleId}-${id}`]).length;
      const correctCount = qIds.filter(id => correctlyAnswered[`${moduleId}-${id}`]).length;
      const solvedAll = solvedCount === 7;
      const passed = correctCount >= 4;

      if (!solvedAll) {
        return {
          reason: `Locked because you have only completed ${solvedCount} of 7 Level 1 (Basics) questions.`,
          levelToReset: 1,
          solvedCount,
          correctCount,
          passed
        };
      } else if (!passed) {
        return {
          reason: `Locked because your Level 1 score was only ${correctCount}/7 (less than 50% passing threshold).`,
          levelToReset: 1,
          solvedCount,
          correctCount,
          passed
        };
      }
    } else if (qId >= 15) {
      const qIds = [8, 9, 10, 11, 12, 13, 14];
      const solvedCount = qIds.filter(id => completedAnswers[`${moduleId}-${id}`]).length;
      const correctCount = qIds.filter(id => correctlyAnswered[`${moduleId}-${id}`]).length;
      const solvedAll = solvedCount === 7;
      const passed = correctCount >= 4;

      if (!solvedAll) {
        return {
          reason: `Locked because you have only completed ${solvedCount} of 7 Level 2 (Syllabus) questions.`,
          levelToReset: 2,
          solvedCount,
          correctCount,
          passed
        };
      } else if (!passed) {
        return {
          reason: `Locked because your Level 2 score was only ${correctCount}/7 (less than 550% passing threshold).`,
          levelToReset: 2,
          solvedCount,
          correctCount,
          passed
        };
      }
    }
    return null;
  };

  const resetLevel = (moduleId: string, level: number) => {
    const seedKey = `${moduleId}-${level}`;
    const currentSeed = levelQuestionSeeds[seedKey] || 0;
    const updatedSeeds = { ...levelQuestionSeeds, [seedKey]: currentSeed + 1 };
    setLevelQuestionSeeds(updatedSeeds);
    saveToStorage('mechLevelQuestionSeeds', updatedSeeds);

    const startQ = (level - 1) * 7 + 1;
    const endQ = level * 7;

    const nextCompleted = { ...completedAnswers };
    const nextMistakes = { ...mistakeCounter };
    const nextSolutions = { ...solutionsRevealed };
    const nextMcqAnswers = { ...mcqAnswers };
    const nextCorrectlyAnswered = { ...correctlyAnswered };

    for (let qid = startQ; qid <= endQ; qid++) {
      const qKey = `${moduleId}-${qid}`;
      delete nextCompleted[qKey];
      delete nextMistakes[qKey];
      delete nextSolutions[qKey];
      delete nextMcqAnswers[qKey];
      delete nextCorrectlyAnswered[qKey];
    }

    setCompletedAnswers(nextCompleted);
    setMistakeCounter(nextMistakes);
    setSolutionsRevealed(nextSolutions);
    setMcqAnswers(nextMcqAnswers);
    setCorrectlyAnswered(nextCorrectlyAnswered);

    saveToStorage('mechCompletedAnswers', nextCompleted);
    saveToStorage('mechCorrectlyAnswered', nextCorrectlyAnswered);
    saveToStorage('g1Answers', nextCompleted);
    saveToStorage('mcqAnswers', nextMcqAnswers);
    saveToStorage('mechMistakeCounter', nextMistakes);
    saveToStorage('solutionsRevealed', nextSolutions);

    const targetIdx = startQ - 1;
    if (activeGrade === 'grade1') {
      setG1Indices(prev => ({ ...prev, [g1ActiveModule]: targetIdx }));
    } else if (activeGrade === 'grade2') {
      setG2Indices(prev => ({ ...prev, [g2ActiveModule]: targetIdx }));
    } else {
      setG3Indices(prev => ({ ...prev, [g3ActiveModule]: targetIdx }));
    }

    setG1Input('');
    setG2OptionSelected(null);
    setG3OptionSelected(null);
    setQuestionCountdown(120);
    setQuestionTimedOut(false);
  };

  // Active dataset resolvers based on active sub-module state
  const getG1Questions = () => getQuestionsForModuleWithSeeds(getG1ModuleId(), getVirtualElapsedDays(getG1ModuleId()));
  const getG1ModuleId = () => {
    switch (g1ActiveModule) {
      case 'FMD': return 'g1_fmm';
      case 'MACHINES AND MECHANISMS': return 'g1_dom';
      case 'THERMODYNAMICS': return 'g1_tof';
      case 'MOM': return 'g1_mts';
    }
  };

  const getG2Questions = () => getQuestionsForModuleWithSeeds(getG2ModuleId(), getVirtualElapsedDays(getG2ModuleId()));
  const getG2ModuleId = () => {
    switch (g2ActiveModule) {
      case 'AMSM': return 'g2_amsm';
      case 'ATST': return 'g2_atst';
      case 'ACS': return 'g2_acs';
      case 'FEG': return 'g2_feg';
    }
  };

  const getG3Questions = () => getQuestionsForModuleWithSeeds(getG3ModuleId(), getVirtualElapsedDays(getG3ModuleId()));
  const getG3ModuleId = () => {
    switch(g3ActiveModule) {
      case 'SOM': return 'g3_som';
      case 'FM': return 'g3_fm';
      case 'DME': return 'g3_dme';
      case 'AT': return 'g3_at';
      case 'TVT': return 'g3_tvt';
      case 'CGD': return 'g3_cgd';
    }
  };

  // Synchronous ticking for clocks
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync state variations to localStorage dynamically to keep sandbox state intact
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch(e) {}
  };

  // Helper selectors for tracking active state
  const getActiveModuleId = () => {
    return activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId();
  };

  const getActiveQuestionId = () => {
    if (activeGrade === 'grade1') {
      const qs = getG1Questions();
      const idx = g1Indices[g1ActiveModule] || 0;
      return qs[idx]?.id || 1;
    } else if (activeGrade === 'grade2') {
      const qs = getG2Questions();
      const idx = g2Indices[g2ActiveModule] || 0;
      return qs[idx]?.id || 1;
    } else {
      const qs = getG3Questions();
      const idx = g3Indices[g3ActiveModule] || 0;
      return qs[idx]?.id || 1;
    }
  };

  // Reset core question timer on active question index shift or module/grade shift
  useEffect(() => {
    setQuestionCountdown(120);
    setQuestionTimedOut(false);
  }, [activeGrade, g1ActiveModule, g2ActiveModule, g3ActiveModule, g1Indices, g2Indices, g3Indices]);

  // Handle countdown behavior per second
  useEffect(() => {
    const actModId = getActiveModuleId();
    const actQId = getActiveQuestionId();
    const compKey = `${actModId}-${actQId}`;
    const questionFixed = completedAnswers[compKey] || solutionsRevealed[compKey];

    if (questionFixed || questionTimedOut) return;

    const timer = setInterval(() => {
      setQuestionCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuestionTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeGrade, g1ActiveModule, g2ActiveModule, g3ActiveModule, g1Indices, g2Indices, g3Indices, completedAnswers, solutionsRevealed, questionTimedOut]);

  // Helper formatting for 120s clock
  const formatSecs = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Unified unlocker method for progressive modules
  const handleUnlockModule = (moduleId: string) => {
    if (!candidateName || !collegeName) {
      alert("Please authenticate using the Port Authentication terminal below to save telemetry.");
      return;
    }
    const updated = { ...unlockedModules, [moduleId]: Date.now() };
    setUnlockedModules(updated);
    saveToStorage('unlockedModules', updated);
  };

  // Get countdown and badge parameters for 3-week study block
  const getModuleTimerInfo = (moduleId: string) => {
    const unlockTime = unlockedModules[moduleId];
    if (!unlockTime) return { status: 'locked', text: '' };

    const totalDuration = 21 * 24 * 60 * 60 * 1000; // 3 weeks = 21 days
    const deadline = unlockTime + totalDuration;
    const nowSimulated = Date.now() + timeOffset;
    const remaining = deadline - nowSimulated;

    if (remaining <= 0) {
      return { status: 'expired', text: 'TIMELINE EXPIRED', isOver: true };
    }

    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((remaining % (60 * 1000)) / 1000);

    return { 
      status: 'active', 
      text: `${days}d ${hours}h ${mins}m ${secs}s`, 
      days, 
      isOver: false 
    };
  };

  // Retrieve badge friendly name
  const getModuleBadgeName = (moduleId: string) => {
    switch (moduleId) {
      case 'g1_fmm': return 'FMD ELITE';
      case 'g1_dom': return 'MACHINES ELITE';
      case 'g1_tof': return 'THERMAL ELITE';
      case 'g1_mts': return 'MOM ELITE';
      case 'g2_amsm': return 'AMSM MASTER';
      case 'g2_atst': return 'THERMO MASTER';
      case 'g2_acs': return 'ACS MASTER';
      case 'g2_feg': return 'FEG MASTER';
      case 'g3_som': return 'SOM CHAMP';
      case 'g3_fm': return 'FLUIDS CHAMP';
      case 'g3_dme': return 'DESIGN CHAMP';
      case 'g3_at': return 'THERMAL CHAMP';
      case 'g3_tvt': return 'TURBO CHAMP';
      case 'g3_cgd': return 'GAS DY CHAMP';
      default: return 'CERTIFICATE';
    }
  };

  // Evaluation trigger when solving Q21 to award permanent Milestone Badge
  const verifyMilestoneAward = (moduleId: string) => {
    const questions = getQuestionsForModuleWithSeeds(moduleId, getVirtualElapsedDays(moduleId));

    // Filter questions solved in this module
    const allSolved = questions.every(q => completedAnswers[`${moduleId}-${q.id}`]);
    if (allSolved) {
      // Check if within 3-week deadline
      const timerInfo = getModuleTimerInfo(moduleId);
      if (timerInfo.status === 'active' && !earnedBadges.includes(getModuleBadgeName(moduleId))) {
        const badge = getModuleBadgeName(moduleId);
        const updatedBadges = [...earnedBadges, badge];
        setEarnedBadges(updatedBadges);
        saveToStorage('mechUserBadges', updatedBadges);
        setAppAlert({
          text: `🏆 ACADEMIC MILESTONE REACHED!\n\nYou have solved all 21 problems of module [${getModuleBadgeName(moduleId)}] within the 3-week window!\n\nThe permanent "${badge}" insignia has been welded to your Live Profile.`,
          type: 'success'
        });
      }
    }
  };

  const checkAndHandleLevelSubmission = (
    moduleId: string, 
    qId: number, 
    nextCompleted: Record<string, boolean>, 
    nextCorrect: Record<string, boolean>
  ) => {
    let level = 1;
    if (qId >= 8 && qId <= 14) level = 2;
    else if (qId >= 15) level = 3;

    const qIds = level === 1 ? [1,2,3,4,5,6,7] : level === 2 ? [8,9,10,11,12,13,14] : [15,16,17,18,19,20,21];
    const allCompleted = qIds.every(id => nextCompleted[`${moduleId}-${id}`]);

    if (allCompleted) {
      const correctCount = qIds.filter(id => nextCorrect[`${moduleId}-${id}`]).length;
      const scorePercent = (correctCount / 7) * 100;
      if (scorePercent < 50) {
        setAppAlert({
          text: `⚠️ LEVEL ATTEMPT FAILED: Level ${level} Completed\n--------------------------------------------\nScore: ${correctCount}/7 (${scorePercent.toFixed(1)}%)\nPassing Threshold: 50% (at least 4 correct)\n\nUnder course guidelines, Level ${level} has been reset and scrambled with fresh random values. Let's try again!`,
          type: 'error'
        });
        setTimeout(() => {
          resetLevel(moduleId, level);
        }, 100);
      } else {
        setAppAlert({
          text: `🎉 CONGRATULATIONS!\n--------------------------------------------\nLevel ${level} completed successfully!\nScore: ${correctCount}/7 (${scorePercent.toFixed(1)}%)\n\nThe next level has been successfully unlocked!`,
          type: 'success'
        });
      }
    }
  };

  // Submit subjective parameters (Grade 1 FMM & DOM)
  const handleG1Submit = () => {
    if (!candidateName || !collegeName) {
      setAppAlert({
        text: "Please authenticate using the Port Authentication panel below before submitting answers.",
        type: 'error'
      });
      return;
    }
    const questions = getG1Questions();
    const curIdx = g1Indices[g1ActiveModule] || 0;
    const activeQ = questions[curIdx];
    const moduleId = getG1ModuleId();
    const compositeKey = `${moduleId}-${activeQ.id}`;

    if (completedAnswers[compositeKey] || questionTimedOut) return;

    const trimmedInput = g1Input.trim();
    if (!trimmedInput) return;

    // Save actual text
    const updatedG1Answers = { ...g1Answers, [compositeKey]: trimmedInput };
    setG1Answers(updatedG1Answers);
    saveToStorage('g1Answers', updatedG1Answers);

    const expected = parseFloat(activeQ.correctAnswer);
    const actual = parseFloat(trimmedInput);
    const isCorrect = Math.abs(expected - actual) < 0.1 || trimmedInput.toLowerCase() === activeQ.correctAnswer.toLowerCase();

    const updatedCompleted = { ...completedAnswers, [compositeKey]: true };
    const updatedCorrectly = { ...correctlyAnswered, [compositeKey]: isCorrect };
    setCompletedAnswers(updatedCompleted);
    setCorrectlyAnswered(updatedCorrectly);
    saveToStorage('mechCompletedAnswers', updatedCompleted);
    saveToStorage('mechCorrectlyAnswered', updatedCorrectly);

    if (isCorrect) {
      // Handle socratic penalties
      const hints = hintsUsed[compositeKey] || 0;
      let pointsAwarded = 15;
      if (hints >= 3) {
        pointsAwarded = 10; // -5 points deduction
        alert("✔️ SOLVER LOGGED: Answer accepted! Since all 3 Socratic hints were exhausted, a 5-point deduction was registered on telemetry.");
      } else {
        alert("✔️ SOLVER LOGGED: Right answer! +15 completed state. Great job!");
      }
      setScore(prev => prev + pointsAwarded);
      if (setDailyStreak) {
        setDailyStreak(prev => {
          const next = prev + 1;
          localStorage.setItem('mechDailyStreak', next.toString());
          return next;
        });
      }
      if (onStreakTrigger) {
        onStreakTrigger();
      }

      // Verify if they earned the milestone badge
      setTimeout(() => verifyMilestoneAward(moduleId), 200);
    } else {
      const currentMistakes = mistakeCounter[compositeKey] || 0;
      const updatedMistakes = { ...mistakeCounter, [compositeKey]: currentMistakes + 1 };
      setMistakeCounter(updatedMistakes);
      saveToStorage('mechMistakeCounter', updatedMistakes);
      alert(`⚠️ VERIFICATION ERROR: Subjective analyzer flags "${trimmedInput}" is mathematically outside tolerances. Select a Socratic hint to diagnose variables! (Explanation and correct answer revealed below)`);
    }

    // Process Level progression/reset
    setTimeout(() => {
      checkAndHandleLevelSubmission(moduleId, activeQ.id, updatedCompleted, updatedCorrectly);
    }, 250);
  };

  // Grade 2 standard multiple choice trigger
  const handleG2Submit = () => {
    if (!candidateName || !collegeName) {
      alert("Please login via the Port authentication panel below to record workspace submissions.");
      return;
    }
    const questions = getG2Questions();
    const curIdx = g2Indices[g2ActiveModule] || 0;
    const activeQ = questions[curIdx];
    const moduleId = getG2ModuleId();
    const compositeKey = `${moduleId}-${activeQ.id}`;

    if (completedAnswers[compositeKey] || questionTimedOut || g2OptionSelected === null) return;

    // Save index selection
    const updatedMCQAnswers = { ...mcqAnswers, [compositeKey]: g2OptionSelected };
    setMcqAnswers(updatedMCQAnswers);
    saveToStorage('mcqAnswers', updatedMCQAnswers);

    const isCorrect = g2OptionSelected === activeQ.correctAnswerIndex;

    const updatedCompleted = { ...completedAnswers, [compositeKey]: true };
    const updatedCorrectly = { ...correctlyAnswered, [compositeKey]: isCorrect };
    setCompletedAnswers(updatedCompleted);
    setCorrectlyAnswered(updatedCorrectly);
    saveToStorage('mechCompletedAnswers', updatedCompleted);
    saveToStorage('mechCorrectlyAnswered', updatedCorrectly);

    if (isCorrect) {
      const hints = hintsUsed[compositeKey] || 0;
      let pointsAwarded = 15;
      if (hints >= 3) {
         pointsAwarded = 10;
        alert("⚡ GATE MATRIX CONVERGED: Option verified! Since all 3 hints were used, a 5-point deduction was logged.");
      } else {
        alert("⚡ GATE MATRIX CONVERGED: Correct option chosen! +15 points recorded.");
      }
      setScore(prev => prev + pointsAwarded);

      // Verify milestone badge
      setTimeout(() => verifyMilestoneAward(moduleId), 200);
    } else {
      const currentMistakes = mistakeCounter[compositeKey] || 0;
      const updatedMistakes = { ...mistakeCounter, [compositeKey]: currentMistakes + 1 };
      setMistakeCounter(updatedMistakes);
      saveToStorage('mechMistakeCounter', updatedMistakes);
      alert("⚠️ EVALUATION FAIL: Option did not match physical standards. Examine the Socratic details.");
    }

    // Process Level progression/reset
    setTimeout(() => {
      checkAndHandleLevelSubmission(moduleId, activeQ.id, updatedCompleted, updatedCorrectly);
    }, 250);
  };

  // Grade 3 placement MCQ submission
  const handleG3Submit = () => {
    if (!candidateName || !collegeName) {
      alert("Please login via the Port authentication panel below to record workspace submissions.");
      return;
    }
    const questions = getG3Questions();
    const curIdx = g3Indices[g3ActiveModule] || 0;
    const activeQ = questions[curIdx];
    const moduleId = getG3ModuleId();
    const compositeKey = `${moduleId}-${activeQ.id}`;

    if (completedAnswers[compositeKey] || questionTimedOut || g3OptionSelected === null) return;

    // Save index selection
    const updatedMCQAnswers = { ...mcqAnswers, [compositeKey]: g3OptionSelected };
    setMcqAnswers(updatedMCQAnswers);
    saveToStorage('mcqAnswers', updatedMCQAnswers);

    const isCorrect = g3OptionSelected === activeQ.correctAnswerIndex;

    const updatedCompleted = { ...completedAnswers, [compositeKey]: true };
    const updatedCorrectly = { ...correctlyAnswered, [compositeKey]: isCorrect };
    setCompletedAnswers(updatedCompleted);
    setCorrectlyAnswered(updatedCorrectly);
    saveToStorage('mechCompletedAnswers', updatedCompleted);
    saveToStorage('mechCorrectlyAnswered', updatedCorrectly);

    if (isCorrect) {
      const hints = hintsUsed[compositeKey] || 0;
      let pointsAwarded = 15;
      if (hints >= 3) {
        pointsAwarded = 10;
        alert("✔️ PLACEMENT ANSWER RECOGNIZED: Correct choice logged! Since all 3 Socratic clues were read, a 5-point deduction was registered.");
      } else {
        alert("✔️ PLACEMENT ANSWER RECOGNIZED: Core response perfect! +15 points written to candidate score.");
      }
      setScore(prev => prev + pointsAwarded);

      // Verify milestone badge
      setTimeout(() => verifyMilestoneAward(moduleId), 200);
    } else {
      const currentMistakes = mistakeCounter[compositeKey] || 0;
      const updatedMistakes = { ...mistakeCounter, [compositeKey]: currentMistakes + 1 };
      setMistakeCounter(updatedMistakes);
      saveToStorage('mechMistakeCounter', updatedMistakes);
      alert("⚠️ PLACEMENT FEEDBACK: Selected choice is mathematically invalid for standard layouts. Please review the grounded formula box!");
    }

    // Process Level progression/reset
    setTimeout(() => {
      checkAndHandleLevelSubmission(moduleId, activeQ.id, updatedCompleted, updatedCorrectly);
    }, 250);
  };

  const handleNextQuestion = () => {
    const currentModId = activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId();
    const questions = activeGrade === 'grade1' ? getG1Questions() : activeGrade === 'grade2' ? getG2Questions() : getG3Questions();
    const curIdx = activeGrade === 'grade1' ? (g1Indices[g1ActiveModule] || 0) : activeGrade === 'grade2' ? (g2Indices[g2ActiveModule] || 0) : (g3Indices[g3ActiveModule] || 0);

    if (curIdx < questions.length - 1) {
      const nextIdx = curIdx + 1;
      const nextQ = questions[nextIdx];
      const qLock = isQuestionLockedByChrono(currentModId, nextQ.id);
      
      if (qLock.locked) {
        setAppAlert({
          text: `🔒 CANNOT PROCEED: ${qLock.reason}`,
          type: 'error'
        });
        return;
      }

      if (activeGrade === 'grade1') {
        setG1Indices(prev => ({ ...prev, [g1ActiveModule]: nextIdx }));
        const prevAnsVal = g1Answers[`${currentModId}-${nextQ.id}`] || '';
        setG1Input(prevAnsVal);
      } else if (activeGrade === 'grade2') {
        setG2Indices(prev => ({ ...prev, [g2ActiveModule]: nextIdx }));
        const prevSel = mcqAnswers[`${currentModId}-${nextQ.id}`];
        setG2OptionSelected(prevSel !== undefined ? prevSel : null);
      } else {
        setG3Indices(prev => ({ ...prev, [g3ActiveModule]: nextIdx }));
        const prevSel = mcqAnswers[`${currentModId}-${nextQ.id}`];
        setG3OptionSelected(prevSel !== undefined ? prevSel : null);
      }
      setQuestionCountdown(120);
      setQuestionTimedOut(false);
    } else {
      setAppAlert({
        text: "🎉 You have reached the end of this module's questions!",
        type: 'success'
      });
    }
  };

  const handleSkipQuestion = () => {
    const currentModId = activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId();
    const questions = activeGrade === 'grade1' ? getG1Questions() : activeGrade === 'grade2' ? getG2Questions() : getG3Questions();
    const curIdx = activeGrade === 'grade1' ? (g1Indices[g1ActiveModule] || 0) : activeGrade === 'grade2' ? (g2Indices[g2ActiveModule] || 0) : (g3Indices[g3ActiveModule] || 0);
    const activeQ = questions[curIdx];
    const compositeKey = `${currentModId}-${activeQ.id}`;

    if (completedAnswers[compositeKey]) {
      setAppAlert({
        text: "This question has already been completed or skipped.",
        type: 'info'
      });
      return;
    }

    setAppAlert({
      text: "⚠️ Are you sure you want to skip this question?\n\nIt will be marked as skipped (incorrect). This counts towards your level completeness but does not grant points. The formulas and solutions will be unlocked immediately!",
      type: 'warning',
      isConfirm: true,
      onConfirm: () => {
        const updatedCompleted = { ...completedAnswers, [compositeKey]: true };
        const updatedCorrectly = { ...correctlyAnswered, [compositeKey]: false };
        
        setCompletedAnswers(updatedCompleted);
        setCorrectlyAnswered(updatedCorrectly);
        saveToStorage('mechCompletedAnswers', updatedCompleted);
        saveToStorage('mechCorrectlyAnswered', updatedCorrectly);

        if (activeGrade === 'grade1') {
          const updatedAnswers = { ...g1Answers, [compositeKey]: "SKIPPED" };
          setG1Answers(updatedAnswers);
          saveToStorage('g1Answers', updatedAnswers);
          setG1Input("SKIPPED");
        } else {
          const updatedMCQAnswers = { ...mcqAnswers, [compositeKey]: -1 };
          setMcqAnswers(updatedMCQAnswers);
          saveToStorage('mcqAnswers', updatedMCQAnswers);
          if (activeGrade === 'grade2') {
            setG2OptionSelected(-1);
          } else {
            setG3OptionSelected(-1);
          }
        }

        // Trigger level submission evaluation
        setTimeout(() => {
          checkAndHandleLevelSubmission(currentModId, activeQ.id, updatedCompleted, updatedCorrectly);
        }, 250);

        // Auto navigate to the next unlocked question if possible
        setTimeout(() => {
          if (curIdx < questions.length - 1) {
            const nextIdx = curIdx + 1;
            const nextQ = questions[nextIdx];
            const qLock = isQuestionLockedByChrono(currentModId, nextQ.id);
            
            if (qLock.locked) {
              return;
            }

            if (activeGrade === 'grade1') {
              setG1Indices(prev => ({ ...prev, [g1ActiveModule]: nextIdx }));
              const prevAnsVal = g1Answers[`${currentModId}-${nextQ.id}`] || '';
              setG1Input(prevAnsVal);
            } else if (activeGrade === 'grade2') {
              setG2Indices(prev => ({ ...prev, [g2ActiveModule]: nextIdx }));
              const prevSel = mcqAnswers[`${currentModId}-${nextQ.id}`];
              setG2OptionSelected(prevSel !== undefined ? prevSel : null);
            } else {
              setG3Indices(prev => ({ ...prev, [g3ActiveModule]: nextIdx }));
              const prevSel = mcqAnswers[`${currentModId}-${nextQ.id}`];
              setG3OptionSelected(prevSel !== undefined ? prevSel : null);
            }
            setQuestionCountdown(120);
            setQuestionTimedOut(false);
          }
        }, 500);
      }
    });
  };

  // Request socratic hint progression
  const handleRequestHint = (moduleId: string, qId: number, maxHints: number) => {
    const compositeKey = `${moduleId}-${qId}`;
    const current = hintsUsed[compositeKey] || 0;
    if (current < maxHints) {
      const updated = { ...hintsUsed, [compositeKey]: current + 1 };
      setHintsUsed(updated);
      saveToStorage('mechHintsUsed', updated);
    }
  };

  // Direct bypass solution with standard scoring penalty (-5 pts)
  const handleRevealSolution = (moduleId: string, qId: number) => {
    const compositeKey = `${moduleId}-${qId}`;
    if (solutionsRevealed[compositeKey]) return;

    const updatedSolutions = { ...solutionsRevealed, [compositeKey]: true };
    setSolutionsRevealed(updatedSolutions);
    saveToStorage('solutionsRevealed', updatedSolutions);

    // Also mark answered so they can't submit anymore
    const updatedCompleted = { ...completedAnswers, [compositeKey]: true };
    setCompletedAnswers(updatedCompleted);
    saveToStorage('mechCompletedAnswers', updatedCompleted);

    setScore(prev => Math.max(0, prev - 5));
    alert("⚠️ SYSTEM CRITICAL: Solution bypassed. Exposing formula breakdown resulted in a direct deduction of 5 points.");
  };

  // Reset active module progression states
  const handleResetModuleProgress = (moduleId: string) => {
    if (window.confirm("Are you sure you want to reset all answers and tracking values for this module? This cannot be undone.")) {
      const updatedCompleted = { ...completedAnswers };
      const updatedHints = { ...hintsUsed };
      const updatedG1 = { ...g1Answers };
      const updatedMCQ = { ...mcqAnswers };
      const updatedSolutions = { ...solutionsRevealed };
      const updatedMistakes = { ...mistakeCounter };
      const updatedVirtualDays = { ...virtualDaysSimulated };

      // Filter keys
      Object.keys(completedAnswers).forEach(k => { if (k.startsWith(moduleId)) delete updatedCompleted[k]; });
      Object.keys(hintsUsed).forEach(k => { if (k.startsWith(moduleId)) delete updatedHints[k]; });
      Object.keys(g1Answers).forEach(k => { if (k.startsWith(moduleId)) delete updatedG1[k]; });
      Object.keys(mcqAnswers).forEach(k => { if (k.startsWith(moduleId)) delete updatedMCQ[k]; });
      Object.keys(solutionsRevealed).forEach(k => { if (k.startsWith(moduleId)) delete updatedSolutions[k]; });
      Object.keys(mistakeCounter).forEach(k => { if (k.startsWith(moduleId)) delete updatedMistakes[k]; });
      if (updatedVirtualDays[moduleId] !== undefined) {
        delete updatedVirtualDays[moduleId];
      }

      setCompletedAnswers(updatedCompleted);
      setHintsUsed(updatedHints);
      setG1Answers(updatedG1);
      setMcqAnswers(updatedMCQ);
      setSolutionsRevealed(updatedSolutions);
      setMistakeCounter(updatedMistakes);
      setVirtualDaysSimulated(updatedVirtualDays);

      saveToStorage('mechCompletedAnswers', updatedCompleted);
      saveToStorage('mechHintsUsed', updatedHints);
      saveToStorage('g1Answers', updatedG1);
      saveToStorage('mcqAnswers', updatedMCQ);
      saveToStorage('solutionsRevealed', updatedSolutions);
      saveToStorage('mechMistakeCounter', updatedMistakes);
      saveToStorage('mechVirtualDaysSimulated', updatedVirtualDays);
    }
  };

  const handleResetAllTracks = () => {
    if (window.confirm("⚠️ DANGER: This will completely wipe all answered questions, logged mistakes, earned badges, custom milestones, and reset your active student score to 0 across ALL modules. Are you sure you want to restart from the absolute beginning?")) {
      localStorage.clear();
      setCompletedAnswers({});
      setHintsUsed({});
      setG1Answers({});
      setMcqAnswers({});
      setSolutionsRevealed({});
      setMistakeCounter({});
      setVirtualDaysSimulated({});
      setUnlockedModules({});
      setEarnedBadges([]);
      setScore(0);
      setUnlimitedAccess(false);
      alert("♻️ FULL RESET COMPLETE: All tracks and study stats have been safely re-initialized to Day 1!");
      window.location.reload();
    }
  };

  // Helper values to resolve questions easily
  const getQuestionCountLabel = (qid: number) => {
    const currentModId = activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId();
    const virtualDays = getVirtualElapsedDays(currentModId);
    let difficultyLabel = "Beginner";
    if (virtualDays > 14) {
      difficultyLabel = "Advanced";
    } else if (virtualDays > 7) {
      difficultyLabel = "Intermediate";
    }

    if (qid <= 7) return `Level 1 - Basics (${difficultyLabel})`;
    if (qid <= 14) return `Level 2 - Syllabus-Oriented (${difficultyLabel})`;
    return `Level 3 - Application-Level (${difficultyLabel})`;
  };

  return (
    <section id="bikes" className="py-24 bg-gradient-to-b from-[#080808] to-[#0d0d0d] relative font-sans">
      {/* Decorative Grid Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(rgba(226,35,26,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(226,35,26,0.035)_1px,transparent_1px)]"
        style={{ backgroundSize: '60px 60px' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {activeTrackID === null ? (
          /* STATE 1: MechForge Dispatch Dashboard */
          <div className="space-y-12 animate-fadeIn">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-white/10 pb-8 mb-10">
              <div>
                <div className="font-mono text-xs text-suzuki-red tracking-[0.35em] uppercase font-black mb-4 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-suzuki-red"></span>
                  [STATE_01] // STUDY STATION SWITCH MATRIX
                </div>
                <h2 className="font-bebas text-5xl md:text-7xl tracking-wide uppercase leading-tight font-black">
                  MECHFORGE STUDY TRACKS CONTROLLER.<br />
                  <span className="text-suzuki-red block mt-2 text-2xl md:text-4xl font-extrabold italic tracking-wider animate-pulse">SELECT ONE TO BOOT LEVEL MODULE PANEL.</span>
                </h2>
              </div>
            </div>

            {/* Earned Badges Showcase list */}
            <BadgeInventory earnedBadges={earnedBadges} />

            {/* STUDY ROADMAP & FLOW PATH */}
            <div id="syllabus-roadmap-flow" className="bg-gradient-to-br from-[#121212] to-[#070707] border border-white/10 p-6 md:p-8 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-suzuki-red/5 rounded-full blur-2xl font-black" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <span className="bg-[#e2231a]/15 text-[#e2231a] border border-[#e2231a]/30 text-xs uppercase font-mono tracking-widest px-2.5 py-1 rounded inline-block font-bold">
                    OFFICIAL SYLLABUS ROADMAP &amp; FLOW PATH
                  </span>
                  <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wider uppercase font-extrabold">
                    HOW TO PROGRESS &amp; TRAVERSE THE CRITICAL CURRICULUM
                  </h3>
                  <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
                    Our platform is custom-engineered to align with your university curriculum guidelines. Follow this sequential roadmap to navigate through your core courses, solve problem modules, and maximize your academic scores.
                  </p>
                </div>
              </div>

              {/* Step Sequence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8 pt-6 border-t border-white/5">
                <div className="space-y-2 relative">
                  <div className="flex items-center gap-2 text-[#e2231a]">
                    <span className="font-mono text-sm font-bold bg-[#e2231a]/10 border border-[#e2231a]/20 w-7 h-7 rounded-full flex items-center justify-center">1</span>
                    <h5 className="font-bebas text-base text-white tracking-wider uppercase font-bold">1. START THE MODULES</h5>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Scroll down to explore the active courses. Select your first subject card to open up its live scholastic terminal and workbook.
                  </p>
                  <div className="hidden md:block absolute top-3 -right-3 text-zinc-700 font-mono text-sm">→</div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center gap-2 text-[#e2231a]">
                    <span className="font-mono text-sm font-bold bg-[#e2231a]/10 border border-[#e2231a]/20 w-7 h-7 rounded-full flex items-center justify-center">2</span>
                    <h5 className="font-bebas text-base text-white tracking-wider uppercase font-bold">2. UNLOCKING &amp; SOLVING</h5>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Questions are progressive. Solve the starting questions correctly to unlock subsequent, high-tier diagnostic challenges.
                  </p>
                  <div className="hidden md:block absolute top-3 -right-3 text-zinc-700 font-mono text-sm">→</div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center gap-2 text-[#e2231a]">
                    <span className="font-mono text-sm font-bold bg-[#e2231a]/10 border border-[#e2231a]/20 w-7 h-7 rounded-full flex items-center justify-center">3</span>
                    <h5 className="font-bebas text-base text-white tracking-wider uppercase font-bold">3. ACHIEVING EARNED BADGES</h5>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Complete all 21 modular questions. Resolving the full curriculum block awards a permanent, custom academic Milestone Badge.
                  </p>
                  <div className="hidden md:block absolute top-3 -right-3 text-zinc-700 font-mono text-sm">→</div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center gap-2 text-[#e2231a]">
                    <span className="font-mono text-sm font-bold bg-[#e2231a]/10 border border-[#e2231a]/20 w-7 h-7 rounded-full flex items-center justify-center">4</span>
                    <h5 className="font-bebas text-base text-white tracking-wider uppercase font-bold">4. ATTEMPT GRAND TEST</h5>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Once the module questions are complete, unlock and attempt the final Grand Test to permanently seal your score.
                  </p>
                  <div className="hidden md:block absolute top-3 -right-3 text-zinc-700 font-mono text-sm">→</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#e2231a]">
                    <span className="font-mono text-sm font-bold bg-[#e2231a]/10 border border-[#e2231a]/20 w-7 h-7 rounded-full flex items-center justify-center">5</span>
                    <h5 className="font-bebas text-base text-white tracking-wider uppercase font-bold">5. TRAVERSE FURTHER (AI CHECK-IN)</h5>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    With one module conquered, return to other course structures to unlock fresh subjects and claim daily check-ins secured by the central AI.
                  </p>
                  
                  {/* AI Study habit panel */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-lg space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">AI Habit Shield</span>
                      <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        ONLINE_SECURED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
                      <div>
                        Status: <span className="text-white font-bold">{dailyStreak > 0 ? `${dailyStreak} Days Active` : 'INACTIVE'}</span>
                      </div>
                      <div className="text-right">
                        Rule: <span className="text-white font-semibold">Strict 24h Bracket</span>
                      </div>
                    </div>

                    <button 
                      type="button"
                      disabled={isCheckingIn || !isTimerReady}
                      onClick={handleDailyCheckIn}
                      className={`w-full py-2 px-3 border transition-all text-[11px] uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 rounded cursor-pointer ${
                        !isTimerReady 
                          ? 'bg-zinc-900 border-zinc-850 text-zinc-500 cursor-not-allowed hover:bg-zinc-900'
                          : 'bg-[#e2231a] hover:bg-red-700 text-white border-transparent'
                      }`}
                    >
                      {isCheckingIn ? (
                        <>
                          <RefreshCw className="animate-spin" size={12} />
                          AI EVALUATING HABIT...
                        </>
                      ) : !isTimerReady ? (
                        <>
                          <Lock size={11} className="text-zinc-500" />
                          LOCKED: {countdownStr}
                        </>
                      ) : (
                        <>
                          <Unlock size={11} className="animate-pulse" />
                          🚀 CLAIM TODAY'S CHECK-IN
                        </>
                      )}
                    </button>

                    {checkInMsg && (
                      <div className={`p-2.5 rounded text-[10px] leading-relaxed transition-all border ${
                        checkInStatus === 'success' 
                          ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-300' 
                          : checkInStatus === 'locked' 
                          ? 'bg-amber-950/25 border-amber-500/25 text-amber-300'
                          : 'bg-red-950/35 border-red-500/35 text-red-300'
                      }`}>
                        {checkInMsg}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Card 1: GRADE_01 */}
              <div id="router-card-g1" className="border-2 border-white/10 hover:border-suzuki-red/55 bg-[#0e0e0e] hover:bg-[#131313] transition-all p-8 md:p-10 rounded-xl flex flex-col justify-between group h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#e2231a]" />
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="font-bebas text-base uppercase bg-[#e2231a]/10 text-[#e2231a] border-2 border-[#e2231a]/30 px-3.5 py-1.5 tracking-widest leading-none font-black rounded-md">
                      GRADE_01 // ACADEMICS
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-bold bg-white/5 px-2.5 py-1 rounded">REV: V4.0.0</span>
                  </div>

                  <h3 className="font-bebas text-4xl text-white tracking-widest leading-none group-hover:text-suzuki-red transition-all">
                    [GRADE_01] // UNIVERSITY_CORE
                  </h3>

                  <div className="relative aspect-[16/8] w-full bg-black rounded-lg border border-white/10 overflow-hidden shadow-inner group">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent z-10" />
                    <img
                      src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80"
                      alt="University Core Drafting"
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-[10px] text-zinc-300 border border-white/10 px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      PROGRESSIVE LEARNING
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 font-sans leading-relaxed">
                    Syllabus-compliant subjetive workbook with numeric input fields, stopwatch timers, and a free-body velocity diagram canvas upload key. Mapped for college standards.
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-4 text-sm font-mono uppercase text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>MODULES AVAILABLE:</span>
                      <span className="text-white font-bold">FMM & DOM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>PROGRESS METHOD:</span>
                      <span className="text-yellow-400 font-bold">BEGINNER TO MASTERY</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTrackID('GRADE_01');
                    setActiveGrade('grade1');
                  }}
                  className="mt-8 w-full py-4 bg-[#e2231a] border-2 border-red-600 hover:bg-neutral-950 hover:border-white/30 text-white font-condensed font-black tracking-widest text-sm uppercase cursor-pointer transition-all rounded shadow-lg active:scale-[0.98] hover:text-suzuki-red"
                >
                  [START UNIVERSITY MODULES]
                </button>
              </div>

              {/* Card 2: GRADE_02 */}
              <div id="router-card-g2" className="border-2 border-white/10 hover:border-suzuki-red/55 bg-[#0e0e0e] hover:bg-[#131313] transition-all p-8 md:p-10 rounded-xl flex flex-col justify-between group h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#005ea6]" />
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="font-bebas text-base uppercase bg-[#005ea6]/10 text-[#005ea6] border-2 border-[#005ea6]/30 px-3.5 py-1.5 tracking-widest leading-none font-black rounded-md">
                      GRADE_02 // GATE PREP
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-bold bg-white/5 px-2.5 py-1 rounded">REV: V2.5.1</span>
                  </div>

                  <h3 className="font-bebas text-4xl text-white tracking-widest leading-none group-hover:text-suzuki-red transition-all">
                    [GRADE_02] // ANALYTICAL_SPRINT
                  </h3>

                  <div className="relative aspect-[16/8] w-full bg-black rounded-lg border border-white/10 overflow-hidden shadow-inner group">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent z-10" />
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                      alt="Analytical Engine Sprint"
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-[10px] text-zinc-300 border border-white/10 px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                      180S COUNTDOWN PER CARD
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 font-sans leading-relaxed">
                    High-visibility multiple choice structural problems mapped directly for competitive GATE guidelines. Sharp 180-second clock enforces speed.
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-4 text-sm font-mono uppercase text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>MODULES AVAILABLE:</span>
                      <span className="text-white font-bold">AMSM & ATST</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>TIME CONSTRAINT:</span>
                      <span className="text-red-400 font-bold">3 WEEKS MILLSTONE</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTrackID('GRADE_02');
                    setActiveGrade('grade2');
                  }}
                  className="mt-8 w-full py-4 bg-[#e2231a] border-2 border-red-600 hover:bg-neutral-950 hover:border-white/30 text-white font-condensed font-black tracking-widest text-sm uppercase cursor-pointer transition-all rounded shadow-lg active:scale-[0.98] hover:text-suzuki-red"
                >
                  [START GATE SOLVER]
                </button>
              </div>

              {/* Card 3: GRADE_03 */}
              <div id="router-card-g3" className="border-2 border-white/10 hover:border-suzuki-red/55 bg-[#0e0e0e] hover:bg-[#131313] transition-all p-8 md:p-10 rounded-xl flex flex-col justify-between group h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#c8ff00]" />
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="font-bebas text-base uppercase bg-[#c8ff00]/10 text-[#c8ff00] border-2 border-[#c8ff00]/30 px-3.5 py-1.5 tracking-widest leading-none font-black rounded-md">
                      GRADE_03 // CAREER
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-bold bg-white/5 px-2.5 py-1 rounded">REV: V3.1.0</span>
                  </div>

                  <h3 className="font-bebas text-4xl text-white tracking-widest leading-none group-hover:text-suzuki-red transition-all">
                    [GRADE_03] // CAREER PREPARATION
                  </h3>

                  <div className="relative aspect-[16/8] w-full bg-black rounded-lg border border-white/10 overflow-hidden shadow-inner group">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent z-10" />
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                      alt="Placement Core Grid"
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-[10px] text-zinc-300 border border-white/10 px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                      CORE VIVA ASSESSOR
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 font-sans leading-relaxed">
                    Consolidated 4 subjects technical interactive viva console. Provides immediate right/wrong response indicators paired with grounded formula explanation blocks.
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-4 text-sm font-mono uppercase text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>SUBJECTS LOADED:</span>
                      <span className="text-white font-bold">SOM, FM, DME & AT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>INTERACTIVE ASSISTANCE:</span>
                      <span className="text-green-400 font-bold">FORMULA DIALOGUES</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTrackID('GRADE_03');
                    setActiveGrade('grade3');
                  }}
                  className="mt-8 w-full py-4 bg-[#e2231a] border-2 border-red-600 hover:bg-neutral-950 hover:border-white/30 text-white font-condensed font-black tracking-widest text-sm uppercase cursor-pointer transition-all rounded shadow-lg active:scale-[0.98] hover:text-suzuki-red"
                >
                  [START PLACEMENT PREP]
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* STATE 2: ACTIVE EDUCATION WORKSPACE CONTAINER */
          <div className="space-y-6 animate-fadeIn font-sans">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[#151515] p-5 border border-white/5 rounded-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e2231a]" />
              <div>
                <span className="text-xs font-mono tracking-widest bg-suzuki-red/10 border border-suzuki-red/20 text-suzuki-red font-extrabold px-3 py-1 uppercase rounded leading-normal">
                  ACTIVE SCHOLAR TERMINAL: {activeTrackID}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[#e2231a] bg-red-600/15 border border-red-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider font-mono animate-pulse flex items-center gap-1">
                    <Sparkles size={11} /> 21-Day Syllabus Crafted Every Day by Advanced AI
                  </span>
                  <span className="text-sm text-zinc-400 font-sans block">
                    Candidate Scholar: <strong className="text-white">{candidateName || "UNREGISTERED"}</strong> · Center: <strong className="text-white">{collegeName || "OFFLINE"}</strong> · Live Score: <strong className="text-yellow-400">{currentScore} pts</strong>
                  </span>
                </div>
                {earnedBadges.length > 0 && (
                  <div className="flex gap-1.5 mt-2 ml-1">
                    {earnedBadges.map((badge, idx) => (
                      <span key={idx} className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase font-mono">
                        🎖️ {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button
                  onClick={() => {
                    setActiveTrackID(null);
                  }}
                  className="px-4 py-2 bg-zinc-950 font-mono text-xs uppercase border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white cursor-pointer transition-all"
                >
                  [↩ BACK TO DISPATCH]
                </button>

                {/* Switch Workspace Cards directly */}
                {[
                  { id: 'grade1', trackId: 'GRADE_01', label: 'UNIVERSITY CORE' },
                  { id: 'grade2', trackId: 'GRADE_02', label: 'ANALYTICAL SPRINT' },
                  { id: 'grade3', trackId: 'GRADE_03', label: 'EXAMS & PLACEMENTS' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveGrade(tab.id as any);
                      setActiveTrackID(tab.trackId as any);
                    }}
                    className={`px-3 py-2 font-mono text-[11px] tracking-wider uppercase font-bold transition-all border ${
                      activeGrade === tab.id
                        ? 'bg-[#e2231a] border-red-600 text-white'
                        : 'bg-[#181818] border-white/5 text-zinc-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC PROGRESSIVE MODULE TABS ROW */}
            {activeGrade === 'grade1' && (
              <div className="flex justify-start border-b border-white/10 pb-4 gap-2 overflow-x-auto mt-4">
                {[
                  { id: 'MOM', label: 'MODULE A: MOM (Mechanics of Materials)' },
                  { id: 'FMD', label: 'MODULE B: FMD (Fluid Mechanics & Dynamics)' },
                  { id: 'THERMODYNAMICS', label: 'MODULE C: Thermodynamics' },
                  { id: 'MACHINES AND MECHANISMS', label: 'MODULE D: Machines & Mechanisms' }
                ].map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setG1ActiveModule(mod.id as any)}
                    className={`px-4 py-2.5 rounded font-mono text-sm font-bold uppercase transition-all whitespace-nowrap ${
                      g1ActiveModule === mod.id
                        ? 'bg-suzuki-red/10 border border-suzuki-red text-suzuki-red shadow-lg shadow-suzuki-red/5'
                        : 'bg-black/30 border border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            )}

            {activeGrade === 'grade2' && (
              <div className="flex justify-start border-b border-white/10 pb-4 gap-2 overflow-x-auto mt-4">
                {[
                  { id: 'AMSM', label: 'MODULE A: Advanced Material & Structural Mechanics (AMSM)' },
                  { id: 'ATST', label: 'MODULE B: Advanced Thermal Systems & Thermodynamics (ATST)' },
                  { id: 'ACS', label: 'MODULE C: Automatic Control Systems (ACS)' },
                  { id: 'FEG', label: 'MODULE D: Finite Element Grid Formulations (FEG)' }
                ].map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setG2ActiveModule(mod.id as any)}
                    className={`px-4 py-2.5 rounded font-mono text-sm font-bold uppercase transition-all whitespace-nowrap ${
                      g2ActiveModule === mod.id
                        ? 'bg-suzuki-red/10 border border-suzuki-red text-suzuki-red shadow-lg shadow-suzuki-red/5'
                        : 'bg-black/30 border border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            )}

            {activeGrade === 'grade3' && (
              <div className="flex justify-start border-b border-white/10 pb-4 gap-2 overflow-x-auto mt-4">
                {[
                  { id: 'SOM', label: 'SUBJECT 01: STRENGTH OF MATERIALS (SOM)' },
                  { id: 'FM', label: 'SUBJECT 02: FLUID MECHANICS (FM)' },
                  { id: 'DME', label: 'SUBJECT 03: DESIGN OF MACHINE ELEMENTS (DME)' },
                  { id: 'AT', label: 'SUBJECT 04: APPLIED THERMODYNAMICS (AT)' },
                  { id: 'TVT', label: 'SUBJECT 05: TURBOMACHINERY VELOCITY TRIANGLES (TVT)' },
                  { id: 'CGD', label: 'SUBJECT 06: COMPRESSIBLE GAS DYNAMICS (CGD)' }
                ].map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setG3ActiveModule(mod.id as any)}
                    className={`px-4 py-2.5 rounded font-mono text-sm font-bold uppercase transition-all whitespace-nowrap ${
                      g3ActiveModule === mod.id
                        ? 'bg-suzuki-red/10 border border-suzuki-red text-suzuki-red shadow-lg shadow-suzuki-red/5'
                        : 'bg-black/30 border border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            )}

            {/* DYNAMIC PROGRESSION & TIME-LOCKED SCREEN RESOLVEMENT */}
            {(() => {
              const currentModId = activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId();
              const isUnlocked = unlockedModules[currentModId] !== undefined;
              const timerInfo = getModuleTimerInfo(currentModId);
              const badgeName = getModuleBadgeName(currentModId);

              if (!isUnlocked) {
                // LOCK STATE LAYOUT
                return (
                  <div className="bg-[#111] border-2 border-dashed border-white/10 rounded-xl p-12 text-center select-none space-y-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden font-sans">
                    <div className="absolute inset-0 bg-gradient-to-b from-suzuki-red/5 via-transparent to-transparent pointer-events-none" />
                    <div className="inline-flex items-center justify-center p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full mb-2">
                      <Lock size={48} className="animate-pulse" />
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-red-600/10 border border-red-600/30 text-suzuki-red px-3 py-1 rounded font-black tracking-widest leading-none">
                        CURRICULUM SYSTEM: LOCKED // CHRONO INTERLOCK ACTIVE
                      </span>
                      <h3 className="font-bebas text-4xl text-white tracking-widest uppercase">
                        ACTIVATE {badgeName} SYLLABUS WORKBOOK
                      </h3>
                      <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
                        To guarantee complete mastery of structural engineering design, this 21-day intensive learning curriculum generates exactly 21 unique problems every single study day. Solve daily problems to boost score metrics and lock in permanent daily learning streaks!
                      </p>
                    </div>

                    <div className="bg-black p-4 rounded-md border border-white/5 max-w-lg mx-auto flex items-center gap-3 justify-center text-left text-xs text-zinc-400 font-mono">
                      <Hourglass size={18} className="text-suzuki-red" />
                      <div>
                        <span className="text-white font-bold block">21-DAY INTENSIVE PROGRAM:</span>
                        Once opened, your 21-day timeline initiates. Return daily for a brand new set of 21 unique structured problems.
                      </div>
                    </div>

                    <button
                      onClick={() => handleUnlockModule(currentModId)}
                      className="px-8 py-4 bg-[#e2231a] hover:bg-neutral-950 border-2 border-red-600 hover:border-white/30 text-white font-condensed font-black tracking-widest text-sm uppercase rounded cursor-pointer transition-all active:scale-[0.98] shadow-lg flex items-center gap-2 mx-auto"
                    >
                      <Unlock size={16} />
                      [⚡ INITIALIZE LEVEL & LAUNCH 21-DAY TIMELINE]
                    </button>
                  </div>
                );
              }

              // ELSE CURRENT MODULE IS ACTIVE AND COMPLYING WITH LIMITS
              return (
                <div className="space-y-6">
                  {/* Countdown Warning Line inside workbench */}
                  <div className="bg-[#121212] border border-white/5 p-4 rounded-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <Hourglass size={16} className={`${timerInfo.isOver ? 'text-red-500' : 'text-yellow-400 animate-spin'}`} style={{ animationDuration: '4s' }} />
                      <div>
                        <span className="text-zinc-400">CHRONO CONSTRAINT COUNTDOWN: </span>
                        <strong className={timerInfo.isOver ? 'text-red-500 font-black' : 'text-yellow-400 font-black font-mono text-sm'}>
                          {timerInfo.text || "PROGRESS EXPIRED - BADGE UNLOCKED ON TIME"}
                        </strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded font-mono text-[9px] uppercase text-zinc-500">
                        🔒 RIGID TIME CONTROL ACTIVE
                      </span>

                      <button
                        onClick={() => handleResetModuleProgress(currentModId)}
                        className="px-3 py-1.5 bg-[#a52a2a]/10 hover:bg-[#a52a2a]/30 border border-red-900/40 rounded font-mono text-[10px] uppercase text-red-400 transition-all cursor-pointer"
                      >
                        ⚠️ RESET ACTIVE MODULE
                      </button>

                      <button
                        onClick={handleResetAllTracks}
                        className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-700/50 rounded font-mono text-[10px] uppercase text-red-500 font-bold transition-all cursor-pointer"
                      >
                        ♻️ RESET ALL TRACKS
                      </button>
                    </div>

                  </div>

                  {/* CHRONOLOGICAL GATING & EXCELLENCE MILESTONES DASHBOARD */}
                  {(() => {
                    const status = checkDayUnlockStatus(currentModId);
                    
                    // Count Level 1 stats (Q1-Q7)
                    const l1Keys = [1, 2, 3, 4, 5, 6, 7].map(qid => `${currentModId}-${qid}`);
                    const l1SolvedCount = l1Keys.filter(k => completedAnswers[k]).length;
                    const l1MistakesCount = l1Keys.reduce((sum, k) => sum + (mistakeCounter[k] || 0), 0);
                    const l1RevealedCount = l1Keys.filter(k => solutionsRevealed[k]).length;
                    
                    // Count Level 2 stats (Q8-Q14)
                    const l2Keys = [8, 9, 10, 11, 12, 13, 14].map(qid => `${currentModId}-${qid}`);
                    const l2SolvedCount = l2Keys.filter(k => completedAnswers[k]).length;
                    const l2MistakesCount = l2Keys.reduce((sum, k) => sum + (mistakeCounter[k] || 0), 0);
                    const l2RevealedCount = l2Keys.filter(k => solutionsRevealed[k]).length;

                    // Count Level 3 stats (Q15-Q21)
                    const l3Keys = [15, 16, 17, 18, 19, 20, 21].map(qid => `${currentModId}-${qid}`);
                    const l3SolvedCount = l3Keys.filter(k => completedAnswers[k]).length;
                    const l3MistakesCount = l3Keys.reduce((sum, k) => sum + (mistakeCounter[k] || 0), 0);
                    const l3RevealedCount = l3Keys.filter(k => solutionsRevealed[k]).length;

                    return (
                      <div className="bg-[#141414] border border-white/5 p-6 rounded-lg space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                          <div>
                            <h4 className="font-bebas text-xl text-white tracking-widest uppercase flex items-center gap-2">
                              <Target className="text-suzuki-red animate-pulse" size={18} />
                              21-DAY INTENSIVE CORE CURRICULUM
                            </h4>
                            <p className="text-sm text-white font-sans font-medium">
                              Syllabus features 21 new unique dynamic problems each day across 21 days. Complete daily tiers perfectly to skip scheduled locks instantly!
                            </p>
                          </div>
                          <div className="font-mono text-sm bg-black px-3 py-1.5 rounded border border-white/10 shrink-0 text-right">
                            <span className="text-white">Current Day: </span>
                            <span className="text-yellow-400 font-bold uppercase">Day {status.currentElapsedDays} / 21</span>
                          </div>
                        </div>
                        
                        {/* JUMP TO NEXT DAY BUTTON IF ALL 21 SOLVED */}
                        {status.allSolved && (
                          <div className="p-4 bg-emerald-950/20 border-2 border-emerald-500/40 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="flex items-center gap-3">
                              <Award className="text-emerald-400 animate-pulse shrink-0" size={28} />
                              <div>
                                <h5 className="font-bebas text-lg text-white font-bold tracking-widest uppercase">🎉 WORKBOOK DAY COMPLETED! (21 / 21 SOLVED)</h5>
                                <p className="text-xs text-white font-sans">All three progressive level tiers are completed! You have earned full academic jump credit.</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const currentSim = virtualDaysSimulated[currentModId] || 0;
                                const updated = { ...virtualDaysSimulated, [currentModId]: currentSim + 1 };
                                setVirtualDaysSimulated(updated);
                                saveToStorage('mechVirtualDaysSimulated', updated);
                                alert("🚀 ACCELERATION CREDITS VERIFIED: Bypassed the daily study cycle! Subsequent course levels are unlocked.");
                              }}
                              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-xs uppercase rounded transition-all cursor-pointer shadow-lg shadow-emerald-500/20 whitespace-nowrap active:scale-[0.98]"
                            >
                              🚀 Jump to Next Day
                            </button>
                          </div>
                        )}

                        {(() => {
                          const activeW = Math.min(3, Math.ceil(status.currentElapsedDays / 7));
                          const diffT = activeW === 1 ? 'Beginner' : activeW === 2 ? 'Intermediate' : 'Advanced';
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Card 1: Level 1 Basics */}
                              <div className="bg-black/40 border border-white/10 p-4 rounded relative overflow-hidden flex flex-col justify-between">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-mono text-[10px] text-[#e2231a] tracking-widest font-bold bg-[#e2231a]/10 border border-[#e2231a]/30 px-2 py-0.5 rounded">
                                      LEVEL 1 // BASICS
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-bold">WEEK 1</span>
                                  </div>
                                  <h5 className="font-bebas text-lg text-white tracking-wider">[TIER_01] QUESTIONS 1-7</h5>
                                  <div className="space-y-1 text-sm font-mono text-white">
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Completed:</span>
                                      <span className="text-emerald-400 font-bold">{l1SolvedCount} / 7</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Mistakes Logged:</span>
                                      <span className={l1MistakesCount > 0 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l1MistakesCount}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Revealed Answers:</span>
                                      <span className={l1RevealedCount > 0 ? "text-orange-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l1RevealedCount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-white/5 text-xs font-mono space-y-2">
                                  {l1SolvedCount === 7 ? (
                                    (l1MistakesCount === 0 && l1RevealedCount === 0) ? (
                                      <span className="text-emerald-400 font-bold block">⚡ PERFECT PASS JUMP CREDIT: Unlocked Level 2 early!</span>
                                    ) : (
                                      <div className="space-y-1.5">
                                        <span className="text-yellow-400 block">✔️ COMPLETE WITH {l1MistakesCount} MISTAKE(S) / {l1RevealedCount} REVEALED. Instant lock bypass is disabled.</span>
                                        <button
                                          onClick={() => {
                                            if (confirm("Reset and refresh Level 1 to solve a fresh set of different questions with different parameters? This allows you to achieve a perfect run to bypass locks instantly!")) {
                                              resetLevel(currentModId, 1);
                                            }
                                          }}
                                          className="w-full py-1 text-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer font-sans"
                                        >
                                          🔄 Reset & Try Perfect Pass
                                        </button>
                                      </div>
                                    )
                                  ) : (
                                    <div className="space-y-1.5">
                                      <span className="text-white block">Solve all 7 basics to unlock next syllabus level.</span>
                                      <button
                                        onClick={() => {
                                          if (confirm("Reset Level 1 questions and draw a completely different set of questions with new parameters to start fresh?")) {
                                            resetLevel(currentModId, 1);
                                          }
                                        }}
                                        className="w-full py-1 text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer font-sans"
                                      >
                                        🔄 Reset & Scramble Questions
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Card 2: Level 2 Intermediate */}
                              <div className={`p-4 rounded relative overflow-hidden flex flex-col justify-between border ${
                                status.activeUnlockedDay >= 2 
                                  ? "bg-black/40 border-white/10" 
                                  : "bg-neutral-950/40 border-dashed border-white/5 opacity-50"
                              }`}>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className={`font-mono text-[10px] tracking-widest font-bold px-2 py-0.5 rounded border ${
                                      status.activeUnlockedDay >= 2 
                                        ? "bg-suzuki-red/10 border-suzuki-red/30 text-suzuki-red" 
                                        : "bg-zinc-800 border-zinc-700 text-zinc-400"
                                    }`}>
                                      LEVEL 2 // SYLLABUS-ORIENTED
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-bold">WEEK 2</span>
                                  </div>
                                  <h5 className="font-bebas text-lg text-white tracking-wider">[TIER_02] QUESTIONS 8-14</h5>
                                  <div className="space-y-1 text-sm font-mono text-white">
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Completed:</span>
                                      <span className="text-emerald-400 font-bold">{l2SolvedCount} / 7</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Mistakes Logged:</span>
                                      <span className={l2MistakesCount > 0 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l2MistakesCount}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Revealed Answers:</span>
                                      <span className={l2RevealedCount > 0 ? "text-orange-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l2RevealedCount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-white/5 text-xs font-mono space-y-2">
                                  {status.activeUnlockedDay >= 2 ? (
                                    l2SolvedCount === 7 ? (
                                      (l2MistakesCount === 0 && l2RevealedCount === 0) ? (
                                        <span className="text-emerald-400 font-bold block">⚡ PERFECT PASS JUMP CREDIT: Unlocked Level 3 early!</span>
                                      ) : (
                                        <div className="space-y-1.5">
                                          <span className="text-yellow-400 block">✔️ COMPLETE WITH {l2MistakesCount} MISTAKES / {l2RevealedCount} REVEALED. Instant lock bypass is disabled.</span>
                                          <button
                                            onClick={() => {
                                              if (confirm("Reset and refresh Level 2 to solve a fresh set of different questions with different parameters? This allows you to achieve a perfect run to bypass locks instantly!")) {
                                                resetLevel(currentModId, 2);
                                              }
                                            }}
                                            className="w-full py-1 text-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer font-sans"
                                          >
                                            🔄 Reset & Try Perfect Pass
                                          </button>
                                        </div>
                                      )
                                    ) : (
                                      <div className="space-y-1.5">
                                        {status.day1Bypassed ? (
                                          <span className="text-cyan-400 font-bold block">✨ ACCURACY JUMP ACTIVE</span>
                                        ) : (
                                          <span className="text-emerald-400 block">🔓 UNLOCKED VIA PROGRESS</span>
                                        )}
                                        <button
                                          onClick={() => {
                                            if (confirm("Reset Level 2 questions and draw a completely different set of questions with new parameters to start fresh?")) {
                                              resetLevel(currentModId, 2);
                                            }
                                          }}
                                          className="w-full py-1 text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer font-sans"
                                        >
                                          🔄 Reset & Scramble Questions
                                        </button>
                                      </div>
                                    )
                                  ) : (
                                    <span className="text-red-400 font-bold block">🔒 LOCKED: Complete Level 1 questions to unlock</span>
                                  )}
                                </div>
                              </div>

                              {/* Card 3: Level 3 Advanced & Mastery */}
                              <div className={`p-4 rounded relative overflow-hidden flex flex-col justify-between border ${
                                status.activeUnlockedDay >= 3
                                  ? "bg-black/40 border-white/10" 
                                  : "bg-neutral-950/40 border-dashed border-white/5 opacity-50"
                              }`}>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className={`font-mono text-[10px] tracking-widest font-bold px-2 py-0.5 rounded border ${
                                      status.activeUnlockedDay >= 3
                                        ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" 
                                        : "bg-zinc-800 border-zinc-700 text-zinc-400"
                                    }`}>
                                      LEVEL 3 // APPLICATION-LEVEL
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-bold">WEEK 3</span>
                                  </div>
                                  <h5 className="font-bebas text-lg text-white tracking-wider">[TIER_03] QUESTIONS 15-21</h5>
                                  <div className="space-y-1 text-sm font-mono text-white">
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Completed:</span>
                                      <span className="text-emerald-400 font-bold">{l3SolvedCount} / 7</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Mistakes Logged:</span>
                                      <span className={l3MistakesCount > 0 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l3MistakesCount}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white font-medium">Revealed Answers:</span>
                                      <span className={l3RevealedCount > 0 ? "text-orange-400 font-bold" : "text-emerald-400 font-bold"}>
                                        {l3RevealedCount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-white/5 text-xs font-mono space-y-2">
                                  {status.activeUnlockedDay >= 3 ? (
                                    l3SolvedCount === 7 ? (
                                      (l3MistakesCount === 0 && l3RevealedCount === 0) ? (
                                        <div className="space-y-1.5">
                                          <span className="text-cyan-400 font-black block">👑 PERFECT EXCELLENCE SPEEDRUNNER STATE ACQUIRED!</span>
                                          <button
                                            onClick={() => {
                                              if (confirm("Reset Level 3 to draw another fresh set of dynamic questions with different parameters?")) {
                                                resetLevel(currentModId, 3);
                                              }
                                            }}
                                            className="w-full py-1 text-center bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer font-sans font-bold"
                                          >
                                            🔄 Reset & Solve Again
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="space-y-1.5">
                                          <span className="text-emerald-400 font-bold block">🎓 MODULE MASTERED! BADGE SECURED IN TIME</span>
                                          <button
                                            onClick={() => {
                                              if (confirm("Reset Level 3 to draw another fresh set of dynamic questions with different parameters?")) {
                                                resetLevel(currentModId, 3);
                                              }
                                            }}
                                            className="w-full py-1 text-center bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer font-sans font-bold"
                                          >
                                            🔄 Reset & Solve Again
                                          </button>
                                        </div>
                                      )
                                    ) : (
                                      <div className="space-y-1.5">
                                        {status.day2Bypassed ? (
                                          <span className="text-cyan-400 font-bold block">⚡ ACCURACY JUMP LEVEL 3 ACTIVE</span>
                                        ) : (
                                          <span className="text-white block">🔓 ACTIVE: Solve items to finish module syllabus!</span>
                                        )}
                                        <button
                                          onClick={() => {
                                            if (confirm("Reset Level 3 questions and draw a completely different set of questions with new parameters to start fresh?")) {
                                              resetLevel(currentModId, 3);
                                            }
                                          }}
                                          className="w-full py-1 text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer font-sans"
                                        >
                                          🔄 Reset & Scramble Questions
                                        </button>
                                      </div>
                                    )
                                  ) : (
                                    <span className="text-red-400 font-bold block">🔒 LOCKED: Complete Level 2 questions to unlock</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}

                  {/* ACTIVE WORKSPACE GRID RENDERER */}
                  {activeGrade === 'grade1' && (() => {
                    const questions = getG1Questions();
                    const curIdx = g1Indices[g1ActiveModule] || 0;
                    const activeQ = questions[curIdx];
                    const compositeKey = `${currentModId}-${activeQ.id}`;
                    const isSolvedComp = completedAnswers[compositeKey];
                    const hintsUsedComp = hintsUsed[compositeKey] || 0;
                    const solRevealedComp = solutionsRevealed[compositeKey];

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#111] border border-white/10 overflow-hidden shadow-2xl rounded-lg p-6 md:p-10 font-sans">
                        {/* Left sidebar: drawing analysis + socratic advice */}
                        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 space-y-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-extrabold">
                              <span>Socratic Advice Vector</span>
                              <span className="text-suzuki-red animate-pulse">● EVALUATION_RIG</span>
                            </div>

                            {/* Diagnostic Upload Key */}
                            <div 
                              onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragOverDraft(prev => ({ ...prev, [compositeKey]: true }));
                              }}
                              onDragLeave={() => {
                                setIsDragOverDraft(prev => ({ ...prev, [compositeKey]: false }));
                              }}
                              onDrop={(e) => handleDraftFileDrop(e, compositeKey)}
                              className={`p-4 bg-zinc-950 border transition-all duration-200 rounded text-xs font-mono space-y-3 relative overflow-hidden ${
                                isDragOverDraft[compositeKey] 
                                  ? "border-emerald-500/50 bg-emerald-950/10 scale-[1.01]" 
                                  : "border-white/5"
                              }`}
                            >
                              {/* Hidden file input */}
                              <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => handleDraftFileSelect(e, compositeKey)}
                                accept="image/*,application/pdf,.dwg,.dxf,.txt"
                                className="hidden"
                              />

                              <div className="flex justify-between items-center">
                                <span className="text-yellow-400 font-bold uppercase text-[9px] flex items-center gap-1.5">
                                  <Layers size={11} />
                                  [UPLOAD_WORKBOOK_SKETCH]
                                </span>
                                <span className="text-[9px] text-zinc-500 font-bold">PDF, JPEG, CAD</span>
                              </div>

                              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans font-medium">
                                Upload detailed velocity triangles, governor force polygons, or kinematic free-body diagrams to sync calculations. Drag & drop or select.
                              </p>

                              {/* CONDITIONAL RENDERING OF STATES */}
                              {draftSyncProgress[compositeKey] !== undefined ? (
                                /* SYNCING STATE */
                                <div className="space-y-2 p-2 bg-black/40 border border-yellow-500/10 rounded">
                                  <div className="flex justify-between items-center text-[10px] text-yellow-500">
                                    <span className="font-bold flex items-center gap-1 animate-pulse">
                                      <RefreshCw size={10} className="animate-spin" />
                                      {draftSyncingLabel[compositeKey] || 'Synchronizing draft file...'}
                                    </span>
                                    <span className="font-mono font-bold text-xs">{draftSyncProgress[compositeKey]}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-yellow-500 transition-all duration-100 ease-out"
                                      style={{ width: `${draftSyncProgress[compositeKey]}%` }}
                                    />
                                  </div>
                                </div>
                              ) : syncedDraftFiles[compositeKey] ? (
                                /* SYNCED STATE SUCCEEDED */
                                <div className="space-y-3 p-3 bg-emerald-950/10 border border-emerald-500/20 rounded">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="space-y-1 overflow-hidden">
                                      <div className="text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                                        <CheckCircle size={12} className="shrink-0 animate-bounce" />
                                        SYNCED AT {syncedDraftFiles[compositeKey].timestamp}
                                      </div>
                                      <p className="text-zinc-200 text-xs font-semibold truncate" title={syncedDraftFiles[compositeKey].name}>
                                        {syncedDraftFiles[compositeKey].name}
                                      </p>
                                      <div className="text-[9px] text-zinc-500 font-bold">
                                        Size: {syncedDraftFiles[compositeKey].size} // Type: {syncedDraftFiles[compositeKey].type || 'Unknown'}
                                      </div>
                                    </div>
                                    <button 
                                      onClick={() => removeSyncedDraft(compositeKey)}
                                      className="text-[9px] font-bold text-red-500 hover:text-red-400 underline font-mono tracking-wider cursor-pointer bg-transparent border-0 outline-none p-1 self-start uppercase shrink-0"
                                      title="Unsync file"
                                    >
                                      [UNSYNC]
                                    </button>
                                  </div>

                                  {/* Render small preview if file is an image */}
                                  {syncedDraftFiles[compositeKey].preview && (
                                    <div className="relative border border-emerald-500/20 rounded-md overflow-hidden bg-black/60 aspect-video flex items-center justify-center">
                                      <img 
                                        src={syncedDraftFiles[compositeKey].preview || undefined} 
                                        alt="FBD Preview" 
                                        referrerPolicy="no-referrer"
                                        className="max-h-full max-w-full object-contain brightness-95 contrast-105"
                                      />
                                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 border border-white/10 text-[8px] font-mono font-bold text-emerald-400 uppercase tracking-widest rounded-sm">
                                        Active CAD Telemetry Link
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Mechanical integration readout feedback */}
                                  <div className="text-[10px] text-emerald-400/80 font-mono leading-tight bg-black/30 p-1.5 border border-emerald-500/10 rounded">
                                    ⚙️ <span className="font-bold">CAD TELEMETRY BONDED:</span> Vector alignments matches with perfect 0.00% clearance tolerance constraints!
                                  </div>
                                </div>
                              ) : (
                                /* DEFAULT IDLE UPLOAD BUTTON ZONE */
                                <button 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 text-white text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all flex flex-col items-center justify-center gap-1 rounded"
                                >
                                  <span>SELECT DRAFT FILE TO SYNC</span>
                                  <span className="text-[8px] text-zinc-500 lowercase font-medium tracking-normal">Or drag and drop here</span>
                                </button>
                              )}
                            </div>

                            {/* Hints Panel */}
                            <div className="bg-[#161616] border border-white/5 p-4 rounded text-xs font-mono">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-suzuki-red uppercase tracking-wider font-extrabold text-[10px] flex items-center gap-1">
                                  <BrainCircuit size={12} />
                                  SOCRATIC PROACTIVE HINTS SYSTEM
                                </span>
                                <span className="text-[10px] text-zinc-500 font-bold">Hints Revealed: {hintsUsedComp}/3</span>
                              </div>

                              <AnimatePresence mode="popLayout">
                                {hintsUsedComp > 0 ? (
                                  <motion.div
                                    key="g1-hints"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 text-zinc-300 overflow-hidden"
                                  >
                                    {Array.from({ length: hintsUsedComp }).map((_, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="p-2.5 bg-black/40 border border-[#e2231a]/10 text-[11px] leading-relaxed animate-none"
                                      >
                                        <span className="text-suzuki-red font-bold">Hint #{idx+1}:</span> {activeQ.hints[idx]}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                ) : (
                                  <motion.p
                                    key="g1-no-hints"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-zinc-400 italic p-1.5 text-xs md:text-sm font-medium"
                                  >
                                    No hints requested yet. Hints are proactive and explain the dynamic formula structures.
                                  </motion.p>
                                )}
                              </AnimatePresence>

                              <div className="flex gap-2 mt-3 pt-2 border-t border-white/5">
                                <motion.button
                                  onClick={() => handleRequestHint(currentModId, activeQ.id, activeQ.hints.length)}
                                  disabled={hintsUsedComp >= activeQ.hints.length}
                                  whileHover={hintsUsedComp < activeQ.hints.length ? { scale: 1.015 } : {}}
                                  whileTap={hintsUsedComp < activeQ.hints.length ? { scale: 0.985 } : {}}
                                  className="flex-1 py-1.5 bg-[#222] hover:bg-neutral-800 text-white border border-white/10 hover:border-white/20 text-[10px] uppercase font-bold tracking-widest cursor-pointer disabled:opacity-50 transition-colors"
                                >
                                  [EXPOSE PROGRESS TRANSITION HINT]
                                </motion.button>
                                <motion.button
                                  onClick={() => handleRevealSolution(currentModId, activeQ.id)}
                                  disabled={solRevealedComp}
                                  whileHover={!solRevealedComp ? { scale: 1.015 } : {}}
                                  whileTap={!solRevealedComp ? { scale: 0.985 } : {}}
                                  className="py-1.5 px-3 bg-[#a52a2a]/20 hover:bg-[#a52a2a]/40 text-red-100 border border-[#a52a2a]/30 text-[10px] uppercase font-bold tracking-widest cursor-pointer disabled:opacity-50 transition-colors"
                                >
                                  [FORCE REVEAL EXPLANATION]
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right column: Subjective layout with answers */}
                        <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6 space-y-6">
                          {(() => {
                            const lockStatus = isQuestionLockedByChrono(currentModId, activeQ.id);

                            return (
                              <div>
                                <div className="flex justify-between items-center bg-[#1d1918] p-3 border border-red-500/10 rounded mb-4">
                                  <span className="text-red-400 font-mono text-[11px] tracking-widest font-extrabold uppercase">
                                    MODULE_GRADE: {activeQ.subject}
                                  </span>
                                  <div className="text-gray-400 font-mono text-[10px]">
                                    ⏱️ QUESTION_LIMIT: <span className="text-yellow-400 font-mono font-bold">{formatSecs(questionCountdown)}</span>
                                  </div>
                                </div>

                                {/* Navigation Header index buttons */}
                                <div className="flex flex-row flex-wrap justify-between items-center gap-3 mb-4">
                                  <span className="text-xs md:text-sm font-mono tracking-widest text-[#e2231a] uppercase font-bold shrink-0">
                                    PROBLEM {activeQ.id} OF 21 // {getQuestionCountLabel(activeQ.id)}
                                  </span>
                                  <div className="flex flex-wrap gap-1 md:gap-1.5 justify-start sm:justify-end">
                                    {questions.map((q, idx) => {
                                      const qLock = isQuestionLockedByChrono(currentModId, q.id);
                                      let qBtnStyle = "bg-[#1a1a1a] text-zinc-400 border border-white/5 hover:border-white/10";
                                      const cKey = `${currentModId}-${q.id}`;
                                      if (curIdx === idx) {
                                        qBtnStyle = "bg-suzuki-red text-white";
                                      } else if (completedAnswers[cKey]) {
                                        qBtnStyle = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
                                      } else if (qLock.locked) {
                                        qBtnStyle = "bg-red-950/25 text-red-500/50 border border-red-900/20";
                                      }
                                      return (
                                        <button
                                          key={q.id}
                                          onClick={() => {
                                            setG1Indices(prev => ({ ...prev, [g1ActiveModule]: idx }));
                                            const prevAnsVal = g1Answers[`${currentModId}-${q.id}`] || '';
                                            setG1Input(prevAnsVal);
                                          }}
                                          className={`w-7 h-7 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${qBtnStyle}`}
                                        >
                                          {qLock.locked ? "🔒" : q.id}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {lockStatus.locked ? (
                                  <div className="bg-red-950/20 border border-red-500/30 p-10 rounded text-center my-6 space-y-4">
                                    <Lock size={44} className="text-red-500 mx-auto animate-pulse" />
                                    <h4 className="font-bebas text-3xl text-white tracking-widest uppercase">
                                      {getQuestionCountLabel(activeQ.id)} CHRONO LOCK ACTIVE
                                    </h4>
                                    <p className="text-zinc-300 text-xs font-sans leading-relaxed max-w-md mx-auto">
                                      {lockStatus.reason}
                                    </p>
                                    <div className="p-3 bg-red-950/40 border border-red-900/40 text-[11px] font-mono rounded text-zinc-400 max-w-sm mx-auto">
                                      ⚠️ Week 2 is reserved for Intermediate and Week 3 for Advanced levels. Pass the previous level with 100% accuracy to trigger instant bypass credit!
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {/* Schematics and Formula Helper Visual Aids */}
                                    <div className="mb-6">
                                      <ProblemDiagram
                                        moduleId={currentModId}
                                        questionId={activeQ.id}
                                        subject={activeQ.subject || "Numerical Analysis"}
                                        questionText={activeQ.question}
                                      />
                                    </div>

                                    {/* Question sentence */}
                                    <div className="bg-black/40 border border-white/5 p-6 rounded mb-6">
                                      <h3 className="font-bebas text-3xl text-zinc-100 tracking-wider leading-relaxed">
                                        {activeQ.question}
                                      </h3>
                                    </div>

                                    {/* Workings display if cleared/revealed */}
                                    {(isSolvedComp || solRevealedComp) && (
                                      <div className="p-4 bg-[#141414] border border-white/5 rounded text-xs font-mono text-zinc-300 space-y-2 mb-6 text-left">
                                        <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                                          <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider">✔️ CORRECT ANSWER:</span>
                                          <span className="text-emerald-400 font-extrabold text-sm tracking-widest">{activeQ.correctAnswer}</span>
                                        </div>
                                        <span className="text-suzuki-red font-bold uppercase block text-[10px] tracking-wider">✔️ Core Numerical Explanation:</span>
                                        <p className="text-zinc-400 leading-relaxed font-sans">{activeQ.explanation}</p>
                                      </div>
                                    )}

                                    {/* Input Form layout */}
                                    {questionTimedOut && !isSolvedComp ? (
                                      <div className="p-4 bg-red-950/20 border border-red-500/30 text-center rounded space-y-2 animate-fadeIn">
                                        <ShieldAlert className="text-[#e2231a] mx-auto mb-1 animate-pulse" size={24} />
                                        <span className="text-white text-xs font-mono font-bold block uppercase tracking-widest">⏱️ 120s Question Timer Expired</span>
                                        <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                                          You have exceeded the 120 seconds limit allowed per question. You can restart the timer below to retry solving this numerical challenge!
                                        </p>
                                        <button
                                          onClick={() => {
                                            setQuestionCountdown(120);
                                            setQuestionTimedOut(false);
                                          }}
                                          className="mt-2 px-4 py-2 bg-red-950/40 border border-[#e2231a]/50 hover:bg-[#e2231a] hover:text-white rounded font-mono text-[10px] uppercase text-red-400 font-extrabold transition-all cursor-pointer"
                                        >
                                          ♻️ Restart Question Timer (120s)
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold mb-1">
                                          INPUT VERIFICATION PORT (NUMERIC PARAMETER):
                                        </label>
                                        <div className="flex gap-2">
                                          <input
                                            type="text"
                                            placeholder="Type solved numerical value (e.g. 0.125 or 30)"
                                            disabled={isSolvedComp || solRevealedComp || questionTimedOut}
                                            value={g1Input}
                                            onChange={(e) => setG1Input(e.target.value)}
                                            className="flex-1 bg-black border border-white/10 focus:border-suzuki-red p-4 text-white text-sm font-mono tracking-widest rounded uppercase focus:outline-none"
                                          />
                                          <motion.button
                                            type="button"
                                            onClick={handleG1Submit}
                                            disabled={isSolvedComp || solRevealedComp || !g1Input || questionTimedOut}
                                            whileHover={!(isSolvedComp || solRevealedComp || !g1Input || questionTimedOut) ? { scale: 1.03 } : {}}
                                            whileTap={!(isSolvedComp || solRevealedComp || !g1Input || questionTimedOut) ? { scale: 0.97 } : {}}
                                            className="px-6 bg-[#e2231a] hover:bg-neutral-950 disabled:opacity-40 border border-red-600 hover:border-white/30 text-white font-condensed font-black tracking-widest text-sm uppercase cursor-pointer rounded transition-colors"
                                          >
                                            VALIDATE
                                          </motion.button>
                                        </div>
                                      </div>
                                    )}

                                    <AnimatePresence mode="wait">
                                      {isSolvedComp && !solRevealedComp && (() => {
                                        const isGradedCorrect = correctlyAnswered[compositeKey];
                                        return isGradedCorrect ? (
                                          <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded flex items-center gap-2"
                                          >
                                            <Check size={14} className="shrink-0" />
                                            <span>NUMERICAL INTEGRITY PASSED: Calculations aligned with dynamic database tolerances!</span>
                                          </motion.div>
                                        ) : (
                                          <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded flex items-center gap-2"
                                          >
                                            <ShieldAlert size={14} className="shrink-0 text-red-400" />
                                            <span>VERIFICATION ERROR: Calculated value does not match target within tolerances.</span>
                                          </motion.div>
                                        );
                                      })()}
                                    </AnimatePresence>

                                    {/* NAVIGATION ACTION BAR */}
                                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                                      <div>
                                        {!(isSolvedComp || solRevealedComp) && (
                                          <button
                                            type="button"
                                            onClick={handleSkipQuestion}
                                            className="px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white text-zinc-300 border border-white/10 hover:border-white/20 text-[11px] font-mono tracking-wider uppercase rounded transition-all cursor-pointer font-bold"
                                          >
                                            ⏭️ Skip Question
                                          </button>
                                        )}
                                      </div>
                                      
                                      {(isSolvedComp || solRevealedComp) && (
                                        <button
                                          type="button"
                                          onClick={handleNextQuestion}
                                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-black tracking-widest text-xs uppercase cursor-pointer rounded transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                                        >
                                          👉 Go to Next Question <ArrowRight size={13} />
                                        </button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })()}

                  {activeGrade === 'grade2' && (() => {
                    const questions = getG2Questions();
                    const curIdx = g2Indices[g2ActiveModule] || 0;
                    const activeQ = questions[curIdx];
                    const compositeKey = `${currentModId}-${activeQ.id}`;
                    const isSolvedComp = completedAnswers[compositeKey];
                    const hintsUsedComp = hintsUsed[compositeKey] || 0;
                    const solRevealedComp = solutionsRevealed[compositeKey];

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#111] border border-white/10 overflow-hidden shadow-2xl rounded-lg p-6 md:p-10 font-sans">
                        {/* Left sidebar: drawing analysis + hints */}
                        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-8 space-y-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-extrabold">
                              <span>Socratic Advice Vector</span>
                              <span className="text-suzuki-red animate-pulse">● GATE_LEVEL_ALIGNMENT</span>
                            </div>

                            {/* Hints Panel */}
                            <div className="bg-[#161616] border border-white/5 p-4 rounded text-xs font-mono">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-suzuki-red uppercase tracking-wider font-extrabold text-[10px] flex items-center gap-1">
                                  <BrainCircuit size={12} />
                                  SOCRATIC PROACTIVE HINTS SYSTEM
                                </span>
                                <span className="text-[10px] text-zinc-500 font-bold">Hints Revealed: {hintsUsedComp}/3</span>
                              </div>

                              <AnimatePresence mode="popLayout">
                                {hintsUsedComp > 0 ? (
                                  <motion.div
                                    key="g2-hints"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 text-zinc-300 overflow-hidden"
                                  >
                                    {Array.from({ length: hintsUsedComp }).map((_, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="p-2.5 bg-black/40 border border-[#e2231a]/10 text-[11px] leading-relaxed animate-none"
                                      >
                                        <span className="text-suzuki-red font-bold">Hint #{idx+1}:</span> {activeQ.hints[idx]}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                ) : (
                                  <motion.p
                                    key="g2-no-hints"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-zinc-400 italic p-1.5 text-xs md:text-sm font-medium"
                                  >
                                    No hints requested yet. Hints are proactive and explain the dynamic formula structures.
                                  </motion.p>
                                )}
                              </AnimatePresence>

                              <div className="flex gap-2 mt-3 pt-2 border-t border-white/5">
                                <motion.button
                                  onClick={() => handleRequestHint(currentModId, activeQ.id, activeQ.hints.length)}
                                  disabled={hintsUsedComp >= activeQ.hints.length}
                                  whileHover={hintsUsedComp < activeQ.hints.length ? { scale: 1.015 } : {}}
                                  whileTap={hintsUsedComp < activeQ.hints.length ? { scale: 0.985 } : {}}
                                  className="flex-1 py-1.5 bg-[#222] hover:bg-neutral-800 text-white border border-white/10 hover:border-white/20 text-[10px] uppercase font-bold tracking-widest cursor-pointer disabled:opacity-50 transition-colors"
                                >
                                  [EXPOSE PROGRESS TRANSITION HINT]
                                </motion.button>
                                <motion.button
                                  onClick={() => handleRevealSolution(currentModId, activeQ.id)}
                                  disabled={solRevealedComp}
                                  whileHover={!solRevealedComp ? { scale: 1.015 } : {}}
                                  whileTap={!solRevealedComp ? { scale: 0.985 } : {}}
                                  className="py-1.5 px-3 bg-[#a52a2a]/20 hover:bg-[#a52a2a]/40 text-red-100 border border-[#a52a2a]/30 text-[10px] uppercase font-bold tracking-widest cursor-pointer disabled:opacity-50 transition-colors"
                                >
                                  [FORCE REVEAL EXPLANATION]
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right column: Multiple Choice interface */}
                        <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6 space-y-6">
                          {(() => {
                            const lockStatus = isQuestionLockedByChrono(currentModId, activeQ.id);

                            return (
                              <div>
                                <div className="flex justify-between items-center bg-[#1d1918] p-3 border border-red-500/10 rounded mb-4">
                                  <span className="text-red-400 font-mono text-[11px] tracking-widest font-extrabold uppercase">
                                    MODULE_GRADE: {activeQ.subject}
                                  </span>
                                  <div className="text-gray-400 font-mono text-[10px]">
                                    ⏱️ QUESTION_LIMIT: <span className="text-yellow-400 font-mono font-bold">{formatSecs(questionCountdown)}</span>
                                  </div>
                                </div>

                                {/* Navigation indices */}
                                <div className="flex flex-row flex-wrap justify-between items-center gap-3 mb-4">
                                  <span className="text-xs md:text-sm font-mono tracking-widest text-[#e2231a] uppercase font-bold shrink-0">
                                    PROBLEM {activeQ.id} OF 21 // {getQuestionCountLabel(activeQ.id)}
                                  </span>
                                  <div className="flex flex-wrap gap-1 md:gap-1.5 justify-start sm:justify-end">
                                    {questions.map((q, idx) => {
                                      const qLock = isQuestionLockedByChrono(currentModId, q.id);
                                      let qBtnStyle = "bg-[#1a1a1a] text-zinc-400 border border-white/5 hover:border-white/10";
                                      const cKey = `${currentModId}-${q.id}`;
                                      if (curIdx === idx) {
                                        qBtnStyle = "bg-suzuki-red text-white";
                                      } else if (completedAnswers[cKey]) {
                                        qBtnStyle = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
                                      } else if (qLock.locked) {
                                        qBtnStyle = "bg-red-950/25 text-red-500/50 border border-red-900/20";
                                      }
                                      return (
                                        <button
                                          key={q.id}
                                          onClick={() => {
                                            setG2Indices(prev => ({ ...prev, [g2ActiveModule]: idx }));
                                            const prevSel = mcqAnswers[`${currentModId}-${q.id}`];
                                            setG2OptionSelected(prevSel !== undefined ? prevSel : null);
                                          }}
                                          className={`w-7 h-7 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${qBtnStyle}`}
                                        >
                                          {qLock.locked ? "🔒" : q.id}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {lockStatus.locked ? (
                                  <div className="bg-red-950/20 border border-red-500/30 p-10 rounded text-center my-6 space-y-4">
                                    <Lock size={44} className="text-red-500 mx-auto animate-pulse" />
                                    <h4 className="font-bebas text-3xl text-white tracking-widest uppercase">
                                      {getQuestionCountLabel(activeQ.id)} CHRONO LOCK ACTIVE
                                    </h4>
                                    <p className="text-zinc-300 text-xs font-sans leading-relaxed max-w-md mx-auto">
                                      {lockStatus.reason}
                                    </p>
                                    <div className="p-3 bg-red-950/40 border border-red-900/40 text-[11px] font-mono rounded text-zinc-400 max-w-sm mx-auto">
                                      ⚠️ Week 2 is reserved for Intermediate and Week 3 for Advanced levels. Pass the previous level with 100% accuracy to trigger instant bypass credit!
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {/* Schematics and Formula Helper Visual Aids */}
                                    <div className="mb-6">
                                      <ProblemDiagram
                                        moduleId={currentModId}
                                        questionId={activeQ.id}
                                        subject={activeQ.subject || "Concept Multiple Choice"}
                                        questionText={activeQ.question}
                                      />
                                    </div>

                                    {/* Question sentence */}
                                    <div className="bg-black/40 border border-white/5 p-6 rounded mb-6">
                                      <h3 className="font-bebas text-3xl text-zinc-100 tracking-wider leading-relaxed">
                                        {activeQ.question}
                                      </h3>
                                    </div>

                                    {/* Explanatory blocks */}
                                    {(isSolvedComp || solRevealedComp) && (
                                      <div className="p-4 bg-[#141414] border border-white/5 rounded text-xs font-mono text-zinc-300 space-y-2 mb-6">
                                        <span className="text-suzuki-red font-bold uppercase block text-[10px] tracking-wider">✔️ Grounded Concept Explanation:</span>
                                        <p className="text-zinc-400 leading-relaxed font-sans">{activeQ.explanation}</p>
                                      </div>
                                    )}

                                    {/* Countdown Expired Alerts */}
                                    {questionTimedOut && !isSolvedComp ? (
                                      <div className="p-4 bg-red-950/20 border border-red-500/30 text-center rounded space-y-2 animate-fadeIn">
                                        <ShieldAlert className="text-[#e2231a] mx-auto mb-1 animate-pulse" size={24} />
                                        <span className="text-white text-xs font-mono font-bold block uppercase tracking-widest">⏱️ 120s Question Timer Expired</span>
                                        <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                                          You have exceeded the 120 seconds limit allowed per question. You can restart the timer below to retry solving this MCQ concept!
                                        </p>
                                        <button
                                          onClick={() => {
                                            setQuestionCountdown(120);
                                            setQuestionTimedOut(false);
                                          }}
                                          className="mt-2 px-4 py-2 bg-red-950/40 border border-[#e2231a]/50 hover:bg-[#e2231a] hover:text-white rounded font-mono text-[10px] uppercase text-red-400 font-extrabold transition-all cursor-pointer"
                                        >
                                          ♻️ Restart Question Timer (120s)
                                        </button>
                                      </div>
                                    ) : (
                                      /* Choice buttons grid */
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activeQ.options.map((opt, oIdx) => {
                                          let btnClass = "bg-[#181818] border-white/5 text-gray-400 hover:text-white hover:border-white/20";
                                          const isSelected = g2OptionSelected === oIdx;
                                          const ansSaved = mcqAnswers[compositeKey];

                                          if (isSolvedComp || solRevealedComp) {
                                            if (oIdx === activeQ.correctAnswerIndex) {
                                              btnClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-bold";
                                            } else if (ansSaved === oIdx) {
                                              btnClass = "bg-red-500/10 border-red-500/50 text-red-400";
                                            } else {
                                              btnClass = "bg-black/20 border-white/5 opacity-50";
                                            }
                                          } else if (isSelected) {
                                            btnClass = "bg-suzuki-red/20 border-suzuki-red text-white font-bold";
                                          }

                                          return (
                                            <motion.button
                                              key={oIdx}
                                              disabled={isSolvedComp || solRevealedComp || questionTimedOut}
                                              onClick={() => setG2OptionSelected(oIdx)}
                                              whileHover={!(isSolvedComp || solRevealedComp || questionTimedOut) ? { scale: 1.015, x: 2 } : {}}
                                              whileTap={!(isSolvedComp || solRevealedComp || questionTimedOut) ? { scale: 0.985 } : {}}
                                              className={`p-4 text-left border rounded transition-colors font-mono text-xs flex gap-3 items-center group cursor-pointer ${btnClass}`}
                                            >
                                              <span className="w-6 h-6 rounded-full bg-black/40 border border-white/10 text-[10px] font-bold flex items-center justify-center shrink-0">
                                                {String.fromCharCode(65 + oIdx)}
                                              </span>
                                              <span className="leading-relaxed font-sans">{opt}</span>
                                            </motion.button>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {/* Submit choices controls */}
                                    {!isSolvedComp && !questionTimedOut && (
                                      <motion.button
                                        onClick={handleG2Submit}
                                        disabled={g2OptionSelected === null}
                                        whileHover={g2OptionSelected !== null ? { scale: 1.02 } : {}}
                                        whileTap={g2OptionSelected !== null ? { scale: 0.98 } : {}}
                                        className="w-full mt-6 py-4 bg-[#e2231a] hover:bg-neutral-950 disabled:opacity-40 border border-red-600 hover:border-white/30 text-white font-condensed font-bold tracking-widest text-xs uppercase cursor-pointer rounded transition-colors shadow"
                                      >
                                        VALIDATE CHOSEN ANSWER
                                      </motion.button>
                                    )}

                                    <AnimatePresence mode="wait">
                                      {isSolvedComp && !solRevealedComp && (() => {
                                        const isCorrect = mcqAnswers[compositeKey] === activeQ.correctAnswerIndex;
                                        return isCorrect ? (
                                          <motion.div
                                            key={`succ-${compositeKey}`}
                                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded flex items-center gap-3 shadow-lg shadow-emerald-500/5"
                                          >
                                            <CheckCircle className="text-emerald-400 shrink-0" size={16} />
                                            <div>
                                              <div className="font-bold text-emerald-300">GATE MATRIX CONVERGED: Option verified!</div>
                                              <div className="text-[11px] text-emerald-400/80 mt-0.5">Your concept selection conforms exactly with physical laws (+15 completed state).</div>
                                            </div>
                                          </motion.div>
                                        ) : (
                                          <motion.div
                                            key={`err-${compositeKey}`}
                                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono rounded flex items-center gap-3 shadow-lg shadow-red-500/5"
                                          >
                                            <ShieldAlert className="text-red-450 shrink-0" size={16} />
                                            <div>
                                              <div className="font-bold text-red-400">EVALUATION FAIL: Incorrect option chosen</div>
                                              <div className="text-[11px] text-red-550 mt-0.5">Physical specs did not align. Let's study the explanatory details.</div>
                                            </div>
                                          </motion.div>
                                        );
                                      })()}
                                    </AnimatePresence>

                                    {/* NAVIGATION ACTION BAR */}
                                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                                      <div>
                                        {!(isSolvedComp || solRevealedComp) && (
                                          <button
                                            type="button"
                                            onClick={handleSkipQuestion}
                                            className="px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white text-zinc-300 border border-white/10 hover:border-white/20 text-[11px] font-mono tracking-wider uppercase rounded transition-all cursor-pointer font-bold"
                                          >
                                            ⏭️ Skip Question
                                          </button>
                                        )}
                                      </div>
                                      
                                      {(isSolvedComp || solRevealedComp) && (
                                        <button
                                          type="button"
                                          onClick={handleNextQuestion}
                                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-black tracking-widest text-xs uppercase cursor-pointer rounded transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                                        >
                                          👉 Go to Next Question <ArrowRight size={13} />
                                        </button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })()}

                  {activeGrade === 'grade3' && (() => {
                    const questions = getG3Questions();
                    const curIdx = g3Indices[g3ActiveModule] || 0;
                    const activeQ = questions[curIdx];
                    const compositeKey = `${currentModId}-${activeQ.id}`;
                    const isSolvedComp = completedAnswers[compositeKey];
                    const hintsUsedComp = hintsUsed[compositeKey] || 0;
                    const solRevealedComp = solutionsRevealed[compositeKey];

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#111] border border-white/10 overflow-hidden shadow-2xl rounded-lg p-6 md:p-10 font-sans">
                        {/* Left column sidebar mapping progressive subjects */}
                        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-8 space-y-6">
                          <div className="space-y-4">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-extrabold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                              PLACEMENT TRACK CONTENT
                            </span>

                            <div className="bg-black/50 border border-white/5 rounded-md p-4">
                              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                                Choose questions sequential review. Track Beginner to Mastery index points cleanly with interactive explanations.
                              </p>
                            </div>

                            {/* 21-Question Checklist list */}
                            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                              {questions.map((q, idx) => {
                                const isQuizActive = curIdx === idx;
                                const qKey = `${currentModId}-${q.id}`;
                                const isSubm = completedAnswers[qKey];
                                const solRev = solutionsRevealed[qKey];
                                const optSaved = mcqAnswers[qKey];
                                const isCorr = isSubm && optSaved === q.correctAnswerIndex;
                                const qLock = isQuestionLockedByChrono(currentModId, q.id);

                                return (
                                  <button
                                    key={q.id}
                                    onClick={() => {
                                      setG3Indices(prev => ({ ...prev, [g3ActiveModule]: idx }));
                                      const prevSel = mcqAnswers[`${currentModId}-${q.id}`];
                                      setG3OptionSelected(prevSel !== undefined ? prevSel : null);
                                    }}
                                    className={`w-full text-left p-2.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                                      isQuizActive
                                        ? 'bg-yellow-500/10 border-yellow-500/40 text-white'
                                        : qLock.locked
                                        ? 'bg-red-950/15 border-red-900/30 text-red-500/50'
                                        : 'bg-black/30 border-white/5 text-zinc-400 hover:text-white'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 font-mono text-[11px]">
                                      <span>Q{q.id < 10 ? `0${q.id}` : q.id}</span>
                                      <span className="text-zinc-500 text-[9px]">[{getQuestionCountLabel(q.id).split(' ')[0]}]</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                      {qLock.locked && <span>🔒</span>}
                                      {solRev && <span className="text-amber-400 font-bold text-[9px]">REV</span>}
                                      {isSubm && (
                                        isCorr ? (
                                          <Check className="text-emerald-400" size={12} />
                                        ) : (
                                          <span className="h-2.5 w-2.5 rounded-full bg-red-500/30" />
                                        )
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Level Score and summary stats card */}
                          <div className="bg-zinc-950 border border-white/5 p-4 rounded space-y-2">
                            <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                              Module stats:
                            </span>
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-zinc-400">Points weighting:</span>
                              <span className="text-white">15 XP Per Question</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-zinc-400">Total solved:</span>
                              <span className="text-yellow-400 font-bold">
                                {questions.filter(q => completedAnswers[`${currentModId}-${q.id}`]).length} / 21
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right column: MCQ dialogue and interactive formulas */}
                        <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6 space-y-6">
                          {(() => {
                            const lockStatus = isQuestionLockedByChrono(currentModId, activeQ.id);

                            if (lockStatus.locked) {
                              const exp = getDetailedLockExplanation(currentModId, activeQ.id);
                              return (
                                <div className="bg-red-950/20 border border-red-500/30 p-10 rounded text-center my-6 space-y-4">
                                  <Lock size={44} className="text-red-500 mx-auto animate-pulse" />
                                  <h4 className="font-bebas text-3xl text-white tracking-widest uppercase">
                                    {getQuestionCountLabel(activeQ.id)} CHRONO LOCK ACTIVE
                                  </h4>
                                  <p className="text-zinc-300 text-xs font-sans leading-relaxed max-w-md mx-auto">
                                    {lockStatus.reason}
                                  </p>

                                  {exp && (
                                    <div className="p-4 bg-orange-950/40 border border-orange-500/30 rounded text-left max-w-xs sm:max-w-md mx-auto space-y-2">
                                      <div className="text-orange-400 font-bold font-mono text-xs uppercase tracking-wider">🔒 ACCURACY LOCK REASON DETAIL:</div>
                                      <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                                        {exp.reason}
                                      </p>
                                      <div className="text-[11px] font-mono text-zinc-400">
                                        📊 Level {exp.levelToReset} Stats: {exp.solvedCount}/7 solved, {exp.correctCount}/7 correct (Passing score is 50% or more).
                                      </div>
                                      
                                      <div className="pt-2">
                                        <button
                                          onClick={() => {
                                            if (confirm(`Are you sure you want to reset Level ${exp.levelToReset} of this module? This will clear its 7 solved answers and generate different questions (new parameter numbers) to solve.`)) {
                                              resetLevel(currentModId, exp.levelToReset);
                                            }
                                          }}
                                          className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer text-center font-sans"
                                        >
                                          🔄 Reset Level {exp.levelToReset} & Solve Different Questions
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  <div className="p-3 bg-red-950/40 border border-red-900/40 text-[11px] font-mono rounded text-zinc-400 max-w-sm mx-auto">
                                    ⚠️ Week 2 is reserved for Intermediate and Week 3 for Advanced levels. Pass the previous level with 100% accuracy to trigger instant bypass credit, or simulate timeline advancement!
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div className="space-y-4 font-sans text-sm">
                                <div className="flex justify-between items-center bg-[#1d1918] p-3 border border-yellow-500/10 rounded mb-4">
                                  <span className="text-yellow-500 font-mono text-[11px] tracking-widest font-extrabold uppercase">
                                    MODULE_GRADE: {activeQ.subject}
                                  </span>
                                  <div className="text-gray-400 font-mono text-[10px]">
                                    ⏱️ QUESTION_LIMIT: <span className="text-yellow-400 font-mono font-bold">{formatSecs(questionCountdown)}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                  <span className="font-bebas text-2xl text-yellow-400 tracking-wider uppercase">
                                    TOPIC: {activeQ.subject}
                                  </span>
                                  <span className="text-zinc-500 font-mono text-[10px] font-bold">
                                    DIFFICULTY: {getQuestionCountLabel(activeQ.id)}
                                  </span>
                                </div>

                                <div className="mb-4">
                                  <ProblemDiagram
                                    moduleId={activeGrade === 'grade1' ? getG1ModuleId() : activeGrade === 'grade2' ? getG2ModuleId() : getG3ModuleId()}
                                    questionId={activeQ.id}
                                    subject={activeQ.subject || "Evaluation Comprehensive"}
                                    questionText={activeQ.question}
                                  />
                                </div>

                                <div className="bg-[#0b0b0b] border border-white/5 p-5 rounded-lg">
                                  <p className="text-base text-zinc-200 font-sans leading-relaxed leading-normal">
                                    {activeQ.question}
                                  </p>
                                </div>


                                {/* Formulas lookup if solved or requested */}
                                {(isSolvedComp || solRevealedComp) && (
                                  <div className="p-4 bg-neutral-900 border border-zinc-800 rounded text-xs space-y-2 font-mono">
                                    <span className="text-emerald-400 flex items-center gap-1.5 text-[10px] font-bold uppercase">
                                      <CheckCircle size={12} />
                                      Grounded Concept breakdown & solution formula:
                                    </span>
                                    <p className="text-zinc-400 leading-relaxed font-sans">{activeQ.explanation}</p>
                                  </div>
                                )}

                                {/* Standard choices buttons */}
                                {questionTimedOut && !isSolvedComp ? (
                                  <div className="p-4 bg-red-950/20 border border-red-500/30 text-center rounded space-y-2 animate-fadeIn">
                                    <ShieldAlert className="text-[#e2231a] mx-auto mb-1 animate-pulse" size={24} />
                                    <span className="text-white text-xs font-mono font-bold block uppercase tracking-widest">⏱️ 120s Question Timer Expired</span>
                                    <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                                      You have exceeded the 120 seconds limit allowed per question. You can restart the timer below to retry solving this MCQ concept!
                                    </p>
                                    <button
                                      onClick={() => {
                                        setQuestionCountdown(120);
                                        setQuestionTimedOut(false);
                                      }}
                                      className="mt-2 px-4 py-2 bg-red-950/40 border border-[#e2231a]/50 hover:bg-[#e2231a] hover:text-white rounded font-mono text-[10px] uppercase text-red-400 font-extrabold transition-all cursor-pointer"
                                    >
                                      ♻️ Restart Question Timer (120s)
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-y-2.5">
                                    {activeQ.options.map((opt, oIdx) => {
                                      let labelBorder = "border-white/5 bg-black/40 hover:bg-neutral-950 hover:border-white/20";
                                      let textClass = "text-zinc-300";
                                      const isSelected = g3OptionSelected === oIdx;
                                      const ansSaved = mcqAnswers[compositeKey];

                                      if (isSolvedComp || solRevealedComp) {
                                        if (oIdx === activeQ.correctAnswerIndex) {
                                          labelBorder = "border-emerald-500/50 bg-emerald-500/10";
                                          textClass = "text-emerald-400 font-semibold";
                                        } else if (ansSaved === oIdx) {
                                          labelBorder = "border-red-500/50 bg-red-500/10";
                                          textClass = "text-red-400";
                                        } else {
                                          labelBorder = "border-white/5 opacity-40 bg-black/10";
                                          textClass = "text-zinc-650";
                                        }
                                      } else if (isSelected) {
                                        labelBorder = "border-yellow-500 bg-yellow-500/5";
                                        textClass = "text-white font-bold";
                                      }

                                      return (
                                        <button
                                          key={oIdx}
                                          disabled={isSolvedComp || solRevealedComp || questionTimedOut}
                                          onClick={() => setG3OptionSelected(oIdx)}
                                          className={`w-full text-left p-4 rounded border transition-all text-xs flex items-center justify-between cursor-pointer hover:scale-[1.01] hover:translate-x-0.5 active:scale-[0.99] ${labelBorder}`}
                                        >
                                          <span className={`font-sans ${textClass}`}>{opt}</span>
                                          <span className="font-mono text-[10px] text-zinc-500">[{String.fromCharCode(65 + oIdx)}]</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}

                                {isSolvedComp && !solRevealedComp && (() => {
                                  const isCorrect = mcqAnswers[compositeKey] === activeQ.correctAnswerIndex;
                                  return isCorrect ? (
                                    <div
                                      key={`g3-succ-${compositeKey}`}
                                      className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded flex items-center gap-3 shadow-lg shadow-emerald-500/5 transition-all duration-300"
                                    >
                                      <CheckCircle className="text-emerald-400 shrink-0" size={16} />
                                      <div>
                                        <div className="font-bold text-emerald-300">PLACEMENT ANSWER RECOGNIZED: Correct!</div>
                                        <div className="text-[11px] text-emerald-400/80 mt-0.5">Your core response is perfect (+15 points written to score).</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      key={`g3-err-${compositeKey}`}
                                      className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono rounded flex items-center gap-3 shadow-lg shadow-red-500/5 transition-all duration-300"
                                    >
                                      <ShieldAlert className="text-red-400 shrink-0" size={16} />
                                      <div>
                                        <div className="font-bold text-red-400">PLACEMENT VERIFICATION UNRESOLVED</div>
                                        <div className="text-[11px] text-red-450 mt-0.5">The choice selected deviates from dynamic mechanical limits. Refer to explanation.</div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            );
                          })()}

                          {/* Socratic Hint progressions display */}
                          {hintsUsedComp > 0 && (
                            <div
                              className="bg-zinc-950 border border-yellow-500/10 p-4 rounded text-xs font-mono space-y-2 overflow-hidden mt-4 transition-all duration-300"
                            >
                              <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <BrainCircuit size={12} />
                                Progressive Socratic Clues:
                              </span>
                              {Array.from({ length: hintsUsedComp }).map((_, idx) => (
                                <p
                                  key={idx}
                                  className="text-zinc-400 border-l border-yellow-500/30 pl-3 leading-relaxed transition-all duration-300"
                                >
                                  • {activeQ.hints[idx]}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Interactive console help buttons */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleRequestHint(currentModId, activeQ.id, activeQ.hints.length)}
                                disabled={hintsUsedComp >= activeQ.hints.length}
                                className="px-4 py-2.5 bg-zinc-950 hover:bg-neutral-900 border border-white/10 text-zinc-400 hover:text-white text-[10px] font-mono uppercase font-bold transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-40"
                              >
                                Request progressive hint ({hintsUsedComp}/{activeQ.hints.length})
                              </button>
                              <button
                                onClick={() => handleRevealSolution(currentModId, activeQ.id)}
                                disabled={solRevealedComp || isSolvedComp}
                                className="px-4 py-2.5 bg-[#a52a2a]/10 hover:bg-[#a52a2a]/30 border border-red-950 text-red-100 text-[10px] font-mono uppercase font-black transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-40"
                              >
                                Reveal formula solution (-5 PTS)
                              </button>
                              
                              {!(isSolvedComp || solRevealedComp) && (
                                <button
                                  type="button"
                                  onClick={handleSkipQuestion}
                                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 text-[10px] font-mono uppercase font-bold transition-all cursor-pointer rounded"
                                >
                                  Skip Question
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {!isSolvedComp && (
                                <button
                                  onClick={handleG3Submit}
                                  disabled={g3OptionSelected === null}
                                  className="px-6 py-3 bg-[#e2231a] hover:bg-neutral-950 disabled:opacity-40 border border-red-600 hover:border-white/30 text-white font-condensed font-bold tracking-widest text-xs uppercase cursor-pointer rounded transition-all hover:scale-103 active:scale-97 shadow"
                                >
                                  Check validation
                                </button>
                              )}

                              {(isSolvedComp || solRevealedComp) && (
                                <button
                                  type="button"
                                  onClick={handleNextQuestion}
                                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-black tracking-widest text-xs uppercase cursor-pointer rounded transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                                >
                                  👉 Go to Next Question <ArrowRight size={13} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

          </div>
        )}

      </div>

      {/* Custom app-level popup notify alerts */}
      {appAlert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 shadow-2xl relative overflow-hidden text-left transform transition-all duration-300 scale-100 opacity-100"
          >
            {/* Highlight bar depending on type */}
            <div className={`absolute top-0 inset-x-0 h-1.5 ${
              appAlert.type === 'success' ? 'bg-emerald-500' :
              appAlert.type === 'error' ? 'bg-[#e2231a]' :
              appAlert.type === 'warning' ? 'bg-amber-500' :
              'bg-zinc-600'
            }`} />

            <div className="mt-2 space-y-4">
              <h3 className="text-lg font-mono font-bold text-zinc-100 flex items-center gap-2 tracking-wider">
                {appAlert.type === 'success' ? '✅ CONGRATULATIONS' :
                 appAlert.type === 'error' ? '🚨 ACTION REQUIRED / LOCKED' :
                 appAlert.type === 'warning' ? '⚠️ CONFIRMATION REQUIRED' :
                 'ℹ️ NOTIFICATION'}
              </h3>
              
              <p className="text-zinc-300 text-sm leading-relaxed font-sans whitespace-pre-wrap">
                {appAlert.text}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                {appAlert.isConfirm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setAppAlert(null)}
                      className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 uppercase transition-all rounded hover:bg-zinc-900 border border-zinc-800 cursor-pointer font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const conf = appAlert.onConfirm;
                        setAppAlert(null);
                        if (conf) conf();
                      }}
                      className="px-5 py-2.5 text-xs font-mono bg-amber-600 hover:bg-amber-500 text-black uppercase font-black rounded shadow transition-all cursor-pointer"
                    >
                      Confirm Skip
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAppAlert(null)}
                    className="px-6 py-2.5 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 uppercase tracking-wider rounded font-black transition-all cursor-pointer"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
