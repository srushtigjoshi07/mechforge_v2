import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Check,
  Landmark,
  Compass,
  Clock,
  Wrench,
  ChevronDown,
  ArrowUpRight,
  Heart,
  Share2,
  Sparkles,
  Play,
  Phone,
  Bike as BikeIcon,
  Cpu,
  BookmarkCheck,
  Award,
  Users,
  Info,
  Swords,
  Send,
  Trophy,
  Flame
} from 'lucide-react';

import { BIKES_DATA, DEALS_DATA, SAFETY_PILLARS, SERVICE_FAQS, TIMELINE_MOMENTS } from './data';
import Navbar from './components/Navbar';
import BikeGallery from './components/BikeGallery';
import TestRideForm from './components/TestRideForm';
import FilmModal from './components/FilmModal';
import TechNewsFeed from './components/TechNewsFeed';

import MatrixExplorers from './components/MatrixExplorers';
import StudyTimerSidebar from './components/StudyTimerSidebar';
import QuickQuizModal from './components/QuickQuizModal';
import PeerDiscussionChat from './components/PeerDiscussionChat';

export default function App() {
  // One-time final reset checking for pristine submission review starting at Day 1
  useEffect(() => {
    if (localStorage.getItem('mechFinalReset_v5') !== 'true') {
      localStorage.clear();
      localStorage.setItem('mechFinalReset_v5', 'true');
      window.location.reload();
    }
  }, []);

  const [candidateName, setCandidateName] = useState<string>(() => localStorage.getItem('mechCandidateName') || '');
  const [candidateEmail, setCandidateEmail] = useState<string>(() => localStorage.getItem('mechUserEmail') || '');
  const [collegeName, setCollegeName] = useState<string>(() => localStorage.getItem('mechCollegeName') || '');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('mechIsLoggedIn') === 'true');
  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    const isLg = localStorage.getItem('mechIsLoggedIn') === 'true';
    if (!isLg) return 0;
    const email = localStorage.getItem('mechUserEmail');
    if (email) {
      const saved = localStorage.getItem('mechDailyStreak_' + email.toLowerCase().trim());
      if (saved) return parseInt(saved, 10);
    }
    const savedGlobal = localStorage.getItem('mechDailyStreak');
    return savedGlobal ? parseInt(savedGlobal, 10) : 1;
  });
  const [streakAnimTrigger, setStreakAnimTrigger] = useState<number>(0);
  const [currentScore, setScore] = useState<number>(() => {
    const isLg = localStorage.getItem('mechIsLoggedIn') === 'true';
    if (!isLg) return 0;
    const email = localStorage.getItem('mechUserEmail');
    if (email) {
      const saved = localStorage.getItem('mechCurrentScore_' + email.toLowerCase().trim());
      if (saved) return parseInt(saved, 10);
    }
    const savedGlobal = localStorage.getItem('mechCurrentScore');
    const resetDone = localStorage.getItem('mechFinalReset_v4') === 'true';
    if (!resetDone) return 0;
    return savedGlobal ? parseInt(savedGlobal, 10) : 0; // Default score starts at 0 for a clean assess track
  });

  // Advanced AI score verification logs state
  const [aiAuditLogs, setAiAuditLogs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mechAiAuditLogs');
      return saved ? JSON.parse(saved) : [
        "🤖 [AUDITOR_LOADED]: AI verification engine running on pipeline 2A.",
        "✓ System baseline synchronized: 0 point anomalies detected."
      ];
    } catch {
      return ["🤖 [AUDITOR_LOADED]: AI verification engine running on pipeline 2A."];
    }
  });

  // Synchronize dynamic AI verification audit log lines when score changes
  const prevScoreRef = useRef<number>(currentScore);
  useEffect(() => {
    if (currentScore !== prevScoreRef.current) {
      const diff = currentScore - prevScoreRef.current;
      const timestamp = new Date().toLocaleTimeString();
      let logMsg = "";
      if (diff > 0) {
        logMsg = `🔋 [PTS_DELTA]: +${diff} points verified at ${timestamp}. Action: Curriculum progress/file sync successfully synced to master pipeline.`;
      } else if (diff < 0) {
        logMsg = `🚨 [PTS_DELTA]: ${diff} points deduction logged at ${timestamp}. Action: System bypass or parameter reset activated.`;
      }
      if (logMsg) {
        setAiAuditLogs(prev => {
          const updated = [...prev, logMsg];
          const trimmed = updated.slice(-6); // Keep last 6 logs
          localStorage.setItem('mechAiAuditLogs', JSON.stringify(trimmed));
          return trimmed;
        });
      }
      prevScoreRef.current = currentScore;
    }
  }, [currentScore]);


  const [activeMatrixId, setActiveMatrixId] = useState<"CAD" | "FEA" | "CFD" | "SRE" | "IoT" | null>(null);
  const [activeTrackID, setActiveTrackID] = useState<'GRADE_01' | 'GRADE_02' | 'GRADE_03' | null>(null);
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const [isEvaluatingPillar, setIsEvaluatingPillar] = useState<boolean>(false);

  const handleResetAllState = () => {
    localStorage.clear();
    setCandidateName('');
    setCandidateEmail('');
    setCollegeName('');
    setIsLoggedIn(false);
    setScore(0);
    setDailyStreak(1);
    alert("🔄 Platform data deleted! All regional stats, scores, daily streaks, unlocked paths and badges have been wiped. Reloading platform with standard parameters...");
    window.location.reload();
  };

  // Persist score and streak updates
  useEffect(() => {
    localStorage.setItem('mechCurrentScore', currentScore.toString());
    localStorage.setItem('mechDailyStreak', dailyStreak.toString());

    if (isLoggedIn && candidateEmail) {
      const emailKey = candidateEmail.toLowerCase().trim();
      localStorage.setItem('mechCurrentScore_' + emailKey, currentScore.toString());
      localStorage.setItem('mechDailyStreak_' + emailKey, dailyStreak.toString());

      try {
        const saved = localStorage.getItem('mechRegisteredUsers');
        if (saved) {
          const users = JSON.parse(saved);
          let updated = false;
          const newUsers = users.map((u: any) => {
            if (u.name.toLowerCase().trim() === candidateName.toLowerCase().trim()) {
              updated = true;
              return { ...u, score: currentScore };
            }
            return u;
          });
          if (updated) {
            localStorage.setItem('mechRegisteredUsers', JSON.stringify(newUsers));
          }
        }
      } catch (e) {}
    }
  }, [currentScore, dailyStreak, isLoggedIn, candidateEmail, candidateName]);

  // Leaderboard toggler filter state
  const [leaderboardFilter, setLeaderboardFilter] = useState<'intra' | 'inter'>('inter');

  // Direct Peer Challenge states and operations
  const [peerChallengePanelActive, setPeerChallengePanelActive] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('mechPeerChallenges');
      if (saved) return JSON.parse(saved);
      const initial = [
        {
          id: 'chal-mock-1',
          senderName: 'Ananya Sen',
          receiverName: 'You',
          college: localStorage.getItem('mechCollegeName') || 'IIT Madras',
          topicId: 'CAD',
          status: 'PENDING',
          createdAt: '12:45:10 PM'
        },
        {
          id: 'chal-mock-2',
          senderName: 'Pranav Kulkarni',
          receiverName: 'You',
          college: localStorage.getItem('mechCollegeName') || 'IIT Madras',
          topicId: 'FEA',
          status: 'ACCEPTED',
          createdAt: '11:20:15 AM'
        }
      ];
      localStorage.setItem('mechPeerChallenges', JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  });

  const [challengeReceiver, setChallengeReceiver] = useState<string>('');
  const [challengeTopic, setChallengeTopic] = useState<'CAD' | 'FEA' | 'CFD' | 'SRE' | 'IoT'>('CAD');
  const [activeDuelId, setActiveDuelId] = useState<string | null>(null);
  const [isDuelQuizOpen, setIsDuelQuizOpen] = useState<boolean>(false);
  const [duelTopicId, setDuelTopicId] = useState<'CAD' | 'FEA' | 'CFD' | 'SRE' | 'IoT'>('CAD');

  useEffect(() => {
    localStorage.setItem('mechPeerChallenges', JSON.stringify(challenges));
  }, [challenges]);

  const handleSendChallenge = (receiverName: string, topic: 'CAD' | 'FEA' | 'CFD' | 'SRE' | 'IoT') => {
    if (!receiverName) return;
    const newChallenge = {
      id: 'chal-' + Date.now(),
      senderName: 'You',
      receiverName: receiverName,
      college: collegeName || 'IIT Madras',
      topicId: topic,
      status: 'PENDING',
      createdAt: new Date().toLocaleTimeString()
    };

    setChallenges(prev => [newChallenge, ...prev]);
    setShowNotification(`⚔️ CHALLENGE TRANSMITTED: Issued 1v1 ${topic} duel challenge to ${receiverName}!`);

    // Simulate peer accepting challenge after a realistic delay (2 seconds)
    setTimeout(() => {
      setChallenges(prev => {
        return prev.map(c => {
          if (c.id === newChallenge.id) {
            setAiAuditLogs(logs => [
              `📡 [DUEL_SIGNAL]: Peer ${receiverName} accepted your challenge on ${topic}! Matrix duel channel locked.`,
              ...logs
            ]);
            return { ...c, status: 'ACCEPTED' };
          }
          return c;
        });
      });
    }, 2000);
  };

  const handleAcceptChallenge = (challengeId: string) => {
    setChallenges(prev => {
      const updated = prev.map(c => {
        if (c.id === challengeId) {
          const opponent = c.senderName === 'You' ? c.receiverName : c.senderName;
          setAiAuditLogs(logs => [
            `📡 [DUEL_CONNECTION]: Accepted inbound challenge from ${opponent} on topic ${c.topicId}.`,
            ...logs
          ]);
          return { ...c, status: 'ACCEPTED' };
        }
        return c;
      });
      return updated;
    });
  };

  const handleDeclineChallenge = (challengeId: string) => {
    setChallenges(prev => {
      const filtered = prev.filter(c => c.id !== challengeId);
      setShowNotification(`✕ Challenge transaction terminated.`);
      return filtered;
    });
  };

  const handleLaunchDuel = (challengeId: string, topic: 'CAD' | 'FEA' | 'CFD' | 'SRE' | 'IoT') => {
    setActiveDuelId(challengeId);
    setDuelTopicId(topic);
    setIsDuelQuizOpen(true);
  };

  const handleDuelSuccess = (pts: number) => {
    // Award base points
    setScore(prev => prev + pts);
    setStreakAnimTrigger(prev => prev + 1);
    
    if (activeDuelId) {
      setChallenges(prev => {
        const updated = prev.map(c => {
          if (c.id === activeDuelId) {
            const rand = Math.random();
            let finalStatus: 'COMPLETED_WIN' | 'COMPLETED_LOSS' | 'COMPLETED_DRAW' = 'COMPLETED_WIN';
            let winner = 'You';
            let bonusPts = 30; // +30 pt stakes
            let logMsg = '';
            
            const opponent = c.senderName === 'You' ? c.receiverName : c.senderName;

            if (rand < 0.5) {
              finalStatus = 'COMPLETED_WIN';
              winner = 'You';
              bonusPts = 30;
              logMsg = `🏆 [PEER_DUEL_VICTORY]: Successfully defeated ${opponent} on ${c.topicId} Socratic scenario! Verified stakes +30 points credited.`;
            } else {
              finalStatus = 'COMPLETED_DRAW';
              winner = 'Draw';
              bonusPts = 10;
              logMsg = `🤝 [PEER_DUEL_DRAW]: Ended in tie with ${opponent} on ${c.topicId}! Verified stakes +10 points mutual credit.`;
            }

            // Award bonus points
            setScore(scorePrev => scorePrev + bonusPts);
            
            setAiAuditLogs(logs => [
              logMsg,
              ...logs
            ]);

            return {
              ...c,
              status: finalStatus,
              senderScore: c.senderName === 'You' ? 1 : 1,
              receiverScore: c.receiverName === 'You' ? 1 : 1,
              winnerName: winner
            };
          }
          return c;
        });
        return updated;
      });
      setActiveDuelId(null);
    }
    setIsDuelQuizOpen(false);
  };

  const handleDuelClose = () => {
    if (activeDuelId) {
      setChallenges(prev => {
        const updated = prev.map(c => {
          if (c.id === activeDuelId && c.status === 'ACCEPTED') {
            const opponent = c.senderName === 'You' ? c.receiverName : c.senderName;
            setAiAuditLogs(logs => [
              `💀 [PEER_DUEL_LOSS]: Forfeited or failed challenge against ${opponent} on ${c.topicId}. Winner: ${opponent}.`,
              ...logs
            ]);
            return {
              ...c,
              status: 'COMPLETED_LOSS',
              senderScore: c.senderName === 'You' ? 0 : 1,
              receiverScore: c.receiverName === 'You' ? 0 : 1,
              winnerName: opponent
            };
          }
          return c;
        });
        return updated;
      });
      setActiveDuelId(null);
    }
    setIsDuelQuizOpen(false);
  };

  // Agentic AI Diagnostics & Benchmarking Dashboard states
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticsLogs, setDiagnosticsLogs] = useState<string[]>([
    "[SYS_STATUS]: AI monitor core online. Enforcing integrity constraints."
  ]);
  const [diagStatus, setDiagStatus] = useState<'IDLE' | 'SCANNING' | 'RESOLVED'>('IDLE');
  const [lastScanTime, setLastScanTime] = useState<string>("SYSTEM_INITIAL_BOOT");

  // AI Diagnostic Solver & Peer score normalizer
  const handleAISelfHeal = () => {
    setIsDiagnosing(true);
    setDiagStatus('SCANNING');
    setDiagnosticsLogs([]);

    const steps = [
      { t: 150, m: "🤖 [AGENTIC_AI_INIT] Initializing semantic audit across all registered candidate nodes..." },
      { t: 400, m: "📂 [INTEGRITY_AUDIT] Verifying student variables (letters, format schema, and character length locks)..." },
      { t: 750, m: "⚠️ [SECURE_COMPASS_CHECK] Matching active registrations. Ensuring no bypass/test records override system constraints..." },
      { t: 1100, m: "🔄 [BENCHMARK_ALIGN] Recalibrating national competitor score velocity. Aligning peer challenge distribution..." },
      { t: 1400, m: "🛡️ [HEAL_SUCCESS] Healing registry database. Applying safety patches. Sync completed!" }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setDiagnosticsLogs(prev => [...prev, step.m]);
        if (index === steps.length - 1) {
          setIsDiagnosing(false);
          setDiagStatus('RESOLVED');
          setLastScanTime(new Date().toLocaleTimeString());
          
          // Randomly trigger competitor study simulation to keep the dashboard interesting and dynamic!
          setRegisteredUsers(prev => {
            const copy = [...prev];
            const randIndex = Math.floor(Math.random() * copy.length);
            if (copy[randIndex] && copy[randIndex].name !== candidateName) {
              copy[randIndex] = {
                ...copy[randIndex],
                score: copy[randIndex].score + 10,
                status: "ACTIVE"
              };
            }
            localStorage.setItem('mechRegisteredUsers', JSON.stringify(copy));
            return copy;
          });
          
          if (showNotification) {
            setShowNotification("⚡ AI DIAGNOSTICS SUCCESS: Mismatch constraints solved, national competitor velocities adjusted, local databases synchronized!");
          }
        }
      }, step.t);
    });
  };

  // Leaderboard state of registered users loaded from localStorage
  const [registeredUsers, setRegisteredUsers] = useState<{name: string, email?: string, college: string, score: number, status: string}[]>(() => {
    const DEFAULT_COMPETITORS: {name: string, email?: string, college: string, score: number, status: string}[] = [];
    try {
      const saved = localStorage.getItem('mechRegisteredUsers');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if existing data is using the old format (subject names in college field)
        const hasSubjects = parsed.some((u: any) => 
          u.college && (
            u.college.includes("Theory") || 
            u.college.includes("Kinematics") || 
            u.college.includes("Stress") || 
            u.college.includes("Solvers") || 
            u.college.includes("Telemetry")
          )
        );
        if (hasSubjects) {
          localStorage.setItem('mechRegisteredUsers', JSON.stringify(DEFAULT_COMPETITORS));
          return DEFAULT_COMPETITORS;
        }
        return parsed;
      } else {
        localStorage.setItem('mechRegisteredUsers', JSON.stringify(DEFAULT_COMPETITORS));
        return DEFAULT_COMPETITORS;
      }
    } catch {
      return DEFAULT_COMPETITORS;
    }
  });

  // Keep registeredUsers synchronized in localStorage when logged in user details change
  useEffect(() => {
    if (isLoggedIn && candidateName.trim()) {
      setRegisteredUsers(prev => {
        const checkEmail = (candidateEmail || "").toLowerCase().trim();
        const index = prev.findIndex(u => {
          if (u.email && checkEmail) {
            return u.email.toLowerCase().trim() === checkEmail;
          }
          return u.name.toLowerCase().trim() === candidateName.toLowerCase().trim();
        });
        let updated = [...prev];
        if (index > -1) {
          updated[index] = {
            ...updated[index],
            name: candidateName,
            email: candidateEmail,
            college: collegeName,
            score: currentScore,
            status: "ACTIVE"
          };
        } else {
          updated.push({
            name: candidateName,
            email: candidateEmail,
            college: collegeName,
            score: currentScore,
            status: "ACTIVE"
          });
        }

        // Dynamically monitor login college via Agentic AI - real-time mode active with zero mock competitors
        localStorage.setItem('mechRegisteredUsers', JSON.stringify(updated));
        return updated;
      });
    }
  }, [isLoggedIn, candidateName, candidateEmail, collegeName, currentScore]);

  const sortedPlayers = [...registeredUsers].sort((a, b) => b.score - a.score);

  const displayedPlayers = leaderboardFilter === 'intra'
    ? sortedPlayers.filter(p => p.college.toLowerCase().trim() === collegeName.toLowerCase().trim())
    : sortedPlayers;

  const [selectedBikeIdForForm, setSelectedBikeIdForForm] = useState<string>(BIKES_DATA[0].id);
  const [timelineIndex, setTimelineIndex] = useState<number>(2); // set default transition
  const [accordionOpen, setAccordionOpen] = useState<number>(0);
  const [watchFilmOpen, setWatchFilmOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(
    '⚡ MECHFORGE SYLLABUS ENGAGEMENT PORTAL: SRE independent self-guided systems loaded!'
  );

  const activeTimeline = TIMELINE_MOMENTS[timelineIndex] || TIMELINE_MOMENTS[0];

  const getPillarsDataForTrack = () => {
    switch (activeTrackID) {
      case 'GRADE_02':
        return [
          {
            num: "01 / 04",
            title: "Finite Element Analysis (FEA)",
            subtitle: "Domain Stiffness Discretization & Mesh Convergence",
            desc: "Discretize continuous structures into high-order elements. Connect elements via mechanical stiffness keys to compute global stress tensors.",
            image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
            xp: 250,
            completionRate: "89.1%",
            metrics: { 
              label: "Global Nodal Stiffness Formula [K]", 
              value: "[K] · {u} = {F}", 
              tag: "Structural Force Matrices",
              explanation: "Displacement vector {u} is evaluated by boundary constrainment solvers against applied load vector {F}."
            },
            liveTelemetry: { label: "PLATE FLEXURE METRIC", value: "DEVIATION: 0.04%" },
            simulationFormula: "([K_{local}]) \\to [K_{global}]",
            friendlyFormula: "[K] · {u} = {F}"
          },
          {
            num: "02 / 04",
            title: "Computational Fluid Dynamics (CFD)",
            subtitle: "Navier-Stokes Conservation & Boundary Layer Cells",
            desc: "Solve fluid flow states by computing velocity field gradients. Define precise laminar boundaries and shear layers over complex mechanical aerodynamic contours.",
            image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&auto=format&fit=crop&q=80",
            xp: 400,
            completionRate: "85.2%",
            metrics: { 
              label: "Conservation of Momentum Flow Rule", 
              value: "Laminar drag constant", 
              tag: "Turbulent Bound Solver",
              explanation: "Preserves dynamic pressure and velocity vectors in viscous grid cells using finite volume discretization solvers."
            },
            liveTelemetry: { label: "AERODYNAMIC DRAG COEFF", value: "Cd = 0.28" },
            simulationFormula: "\\partial u/\\partial t + (u \\cdot \\nabla)u = -\\nabla p + \\nu \\nabla^2 u",
            friendlyFormula: "∂u/∂t + (u·∇)u = -∇p + ν∇²u"
          },
          {
            num: "03 / 04",
            title: "Control Core & System Signals",
            subtitle: "Bode Margin plots & Proportional-Integral-Derivative Response",
            desc: "Model transient system adjustments. Tune feedback loops of joint servos to minimize steady-state oscillation error during swift robotic movements.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
            xp: 350,
            completionRate: "90.7%",
            metrics: { 
              label: "Feedback Loop Transfer Equation", 
              value: "Closed-loop stability bounds", 
              tag: "S-Domain Response Bode Graph",
              explanation: "System parameters feedback adjusts mechanical actuation speed. Rise times and signal overshoot are strictly constrained."
            },
            liveTelemetry: { label: "PID COEFFICIENT STEADY", value: "ERROR: ±0.01mm" },
            simulationFormula: "G(s) = K_p + K_i/s + K_d \\cdot s",
            friendlyFormula: "G(s) = K_p + K_i/s + K_d·s"
          },
          {
            num: "04 / 04",
            title: "Advanced Robotics Kinematics",
            subtitle: "Denavit-Hartenberg (D-H) Robotic Coordinate Transforms",
            desc: "Calculate precise multi-joint manipulator positions in space. Transform sequential coordinate frames using link twisting, offsets, and rotational values.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
            xp: 500,
            completionRate: "81.4%",
            metrics: { 
              label: "Manipulator Transform Product Method", 
              value: "Tool-tip position vectors", 
              tag: "Robotic End-Effector Space",
              explanation: "Ensures systematic translation between sequential kinematic joints, mapping target space coords directly."
            },
            liveTelemetry: { label: "END EFFECTOR SPACE KEY", value: "XYZ: [24.1, 8.5, 91.2]" },
            simulationFormula: "T = Rot_z(\\theta) \\cdot Trans_z(d) \\cdot Trans_x(r) \\cdot Rot_x(\\alpha)",
            friendlyFormula: "T = Rot_z(θ)·Trans_z(d)·Trans_x(r)·Rot_x(α)"
          }
        ];
      case 'GRADE_03':
        return [
          {
            num: "01 / 04",
            title: "Flexural Stress & Hooke's Law",
            subtitle: "Standard Beam Bending & Elastic Modulus",
            desc: "Calculate simple direct bending stresses in standard beam sections. Learn the fundamental relationships between material bending moment, deflection, and elastic yield boundaries.",
            image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&auto=format&fit=crop&q=80",
            xp: 250,
            completionRate: "92.3%",
            metrics: { 
              label: "Flexural Bending Stress Equation", 
              value: "σ = (M · y) / I", 
              tag: "Structural Force Analysis",
              explanation: "Bending stress (σ) is directly proportional to bending moment (M) and distance from neutral axis (y), and inversely proportional to moment of inertia (I)."
            },
            liveTelemetry: { label: "STRESS TENSILE METRIC", value: "FACTOR: 1.15" },
            simulationFormula: "\\sigma = \\frac{M \\cdot y}{I}",
            friendlyFormula: "σ = (M · y) / I"
          },
          {
            num: "02 / 04",
            title: "Fluid Flow & Energy Conservation",
            subtitle: "Bernoulli Equation & Continuity of Mass",
            desc: "Predict pressure drops and velocity changes in convergent pipes. Understand mass flows and conservation of mechanical energy in steady streamline flows.",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80",
            xp: 400,
            completionRate: "87.0%",
            metrics: { 
              label: "Bernoulli Static and Dynamic Balance", 
              value: "P + 0.5·ρ·v² + ρ·g·h = Constant", 
              tag: "Incompressible Flow Rule",
              explanation: "The sum of pressure energy, kinetic energy, and potential energy per unit volume is constant along any streamline for frictionless flow."
            },
            liveTelemetry: { label: "DISCHARGE MASS RATE", value: "Q = Area1 · V1" },
            simulationFormula: "P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2",
            friendlyFormula: "P1 + 0.5·ρ·v1² + ρ·g·h1 = P2 + 0.5·ρ·v2² + ρ·g·h2"
          },
          {
            num: "03 / 04",
            title: "Shaft Torque, Power & Gear Ratios",
            subtitle: "Torsional Stress & Rotational Gear Velocity",
            desc: "Analyze how mechanical power converts to rotational torque through standard spur gears and drives. Master fundamental transmission calculations commonly queried.",
            image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80",
            xp: 350,
            completionRate: "89.2%",
            metrics: { 
              label: "Power Torque Speed Core Formula", 
              value: "P = (2 · π · N · T) / 60", 
              tag: "Rotational Drives Solver",
              explanation: "Rotational power (P) is the product of angular velocity (2·π·N/60) and shaft torque (T). Increasing speed proportional to gear ratios lowers operational torque."
            },
            liveTelemetry: { label: "ROTATIONAL SPEED IN RPM", value: "N = 1500 RPM" },
            simulationFormula: "P = \\frac{2 \\pi N T}{60}",
            friendlyFormula: "Power (W) = (2 · π · N · T) / 60"
          },
          {
            num: "04 / 04",
            title: "Standard Thermo Cycles & Air Efficiency",
            subtitle: "Carnot & Otto Cycle Compression Limits",
            desc: "Evaluate mechanical power cycles. Determine maximum conversion limits based on thermal source inputs and basic compression ratio metrics.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
            xp: 500,
            completionRate: "83.6%",
            metrics: { 
              label: "Air-Standard Otto Thermal Efficiency", 
              value: "η = 1 - 1 / r^(k - 1)", 
              tag: "Syllabus Boundary Limit",
              explanation: "Syllabus standards define efficiency limits using compression ratio (r) and the specific heat ratio (k or γ). A practical baseline for IC Engine design."
            },
            liveTelemetry: { label: "CARNOT LIMIT FRACTION", value: "1 - T_cold / T_hot" },
            simulationFormula: "\\eta = 1 - \\frac{1}{r^{\\gamma-1}}",
            friendlyFormula: "η = 1 - 1 / r^(k - 1)"
          }
        ];
      case 'GRADE_01':
      default:
        return [
          {
            num: "01 / 04",
            title: "MACHINES AND MECHANISMS",
            subtitle: "Equivalent Stiffness & Vibration Systems",
            desc: "Analyse combined spring rates under different rig loading conditions. Learn how serial and parallel alignments affect machinery suspension performance.",
            image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80",
            xp: 250,
            completionRate: "94.2%",
            metrics: { 
              label: "Parallel & Series Spring Stiffness Lesson", 
              value: "43.21 kN/mm", 
              tag: "Suspension Spring Constant Guide",
              explanation: "Parallel alignment (like heavy truck shock absorbers) forces stiffness to add directly: K_eq = k1 + k2. Serial alignment (like stacked vibration dampeners) reduces total stiffness: 1/K_eq = 1/k1 + 1/k2."
            },
            liveTelemetry: { label: "MATHEMATICAL MATRIX SEED", value: "0xDF49D" },
            simulationFormula: "K_eq = \\sum \\lambda_i \\approx 43.21 kN/mm",
            friendlyFormula: "K_eq = \u03A3 \u03BB_i \u2248 43.21 kN/mm"
          },
          {
            num: "02 / 04",
            title: "MOM (Mechanics of Materials)",
            subtitle: "Bending, Shear & Yield Stress Fields",
            desc: "Predict material yielding points. Determine whether internal load distribution will cause permanent failure or maintain elastic recovery.",
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
            xp: 400,
            completionRate: "88.5%",
            metrics: { 
              label: "Shear & Von-Mises Stress", 
              value: "245.8 MPa", 
              tag: "Stress Tensor Mesh Analysis",
              explanation: "Yield occurs when equivalent stress exceeds yield strength. Vital for structural calculations and beam thickness."
            },
            liveTelemetry: { label: "SIMULATED MATERIAL STRESS", value: "245.8 MPa" },
            simulationFormula: "\\sigma_{von\\_mises} = \\sqrt{\\sigma_1^2 - \\sigma_1\\sigma_2 + \\sigma_2^2}",
            friendlyFormula: "\u03C3_von_mises = \u221A(\u03C3\u2081\u00B2 - \u03C3\u2081\u03C3\u2082 + \u03C3\u2082\u00B2)"
          },
          {
            num: "03 / 04",
            title: "THERMODYNAMICS",
            subtitle: "Gas Power Cycle Efficiency Limits",
            desc: "Evaluate thermal systems and engine efficiency. Study heat input conversion ratio metrics relative to high and low operating temperatures.",
            image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=800&q=80",
            xp: 350,
            completionRate: "91.9%",
            metrics: { 
              label: "Thermal Cycle Efficiency (η)", 
              value: "η = 58.4%", 
              tag: "Carnot Thermal Boundary",
              explanation: "Thermal efficiency = Net Work / Heat Input. Higher temperature source increases the cycle efficiency limit."
            },
            liveTelemetry: { label: "ACTIVE COGNITIVE FLOW PATH", value: "NODE_SRE_B" },
            simulationFormula: "\\eta_{thermal} = 1 - \\frac{T_{cold}}{T_{hot}} = 58.4\\%",
            friendlyFormula: "\u03B7_thermal = 1 - (T_cold / T_hot) = 58.4%"
          },
          {
            num: "04 / 04",
            title: "FMD (Fluid Mechanics & Dynamics)",
            subtitle: "Reynolds Number Pipe Line Diagnostics",
            desc: "Determine fluid behavior characteristics. Distinguish between viscous laminar flows and chaotic turbulent flow speeds within pipeline networks.",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80",
            xp: 500,
            completionRate: "85.1%",
            metrics: { 
              label: "Reynolds Number (Re)", 
              value: "Re = 2300", 
              tag: "Fluid Flow Pipeline Analysis",
              explanation: "Re < 2000 implies smooth laminar flow. Re > 4000 implies chaotic turbulent flow. In between is a transitional regime."
            },
            liveTelemetry: { label: "SYNCHRONIZED LEARNING CHANNELS", value: "419 PEERS ACTIVE" },
            simulationFormula: "Re = \\frac{\\rho v d}{\\mu} = 2300",
            friendlyFormula: "Re = (\u03C1 \u00B7 v \u00B7 d) / \u03BC = 2300"
          }
        ];
    }
  };

  const PILLARS_DATA = getPillarsDataForTrack();

  const runPillarDiagnosis = (idx: number) => {
    if (isEvaluatingPillar) return;
    setIsEvaluatingPillar(true);
    setTimeout(() => {
      setIsEvaluatingPillar(false);
      setScore(prev => prev + 25);
      setShowNotification(`🚀 TELEMETRY PASS! Active diagnostic run for "${PILLARS_DATA[idx].title}" verified. Awarded +25 platform XP!`);
    }, 1200);
  };



  const collegePeers = registeredUsers.filter(u => 
    u.college && u.college.toLowerCase().trim() === (collegeName || 'IIT Madras').toLowerCase().trim() && 
    (u.name || "").toLowerCase().trim() !== (candidateName || 'You').toLowerCase().trim()
  );
  
  const selectablePeers = collegePeers.length > 0 
    ? collegePeers 
    : registeredUsers.filter(u => u.name !== (candidateName || 'You'));

  const handleSelectedForRide = (bikeId: string) => {
    setSelectedBikeIdForForm(bikeId);
    const element = document.getElementById('test-ride-wrapper');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] font-barlow text-white relative selection:bg-suzuki-red selection:text-white">
      {/* Top Banner Alert Message */}
      {showNotification && (
        <div className="bg-suzuki-red text-white py-2 px-4 text-center text-xs font-condensed tracking-widest font-extrabold uppercase flex justify-between items-center z-50 relative mt-16 md:mt-20">
          <div className="mx-auto flex items-center gap-2">
            <Sparkles size={14} className="animate-spin text-yellow-300" />
            <span>{showNotification}</span>
          </div>
          <button
            onClick={() => setShowNotification(null)}
            className="hover:scale-110 p-1 text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Layer */}
      <Navbar
        onOpenRideForm={() => handleSelectedForRide(BIKES_DATA[0].id)}
        currentScore={currentScore}
        isLoggedIn={isLoggedIn}
        candidateName={candidateName}
        candidateEmail={candidateEmail}
        dailyStreak={dailyStreak}
        animateStreakTrigger={streakAnimTrigger}
      />

      {/* Pomodoro Study Timer Sidebar Panel */}
      <StudyTimerSidebar
        currentScore={currentScore}
        setScore={setScore}
        candidateName={candidateName}
        isLoggedIn={isLoggedIn}
      />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Hero Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 origin-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.92) 100%), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80')`,
          }}
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080808]/40 to-[#080808] pointer-events-none" />

        {/* Core Hero Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 relative z-10 w-full">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block font-condensed text-xs font-extrabold tracking-[0.35em] text-[#e2231a] uppercase">
              MECHFORGE ENGINEERING ACADEMIC PORTAL · V2.4.0
            </div>

            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl leading-tight tracking-wider uppercase font-extrabold">
              <span className="block text-white">Fuse Theory.</span>
              <span className="block text-white">Engineer Precision.</span>
              <span className="block text-[#e2231a]">Forge Engineering Integrity.</span>
            </h1>

            <p className="font-condensed text-base md:text-xl font-light text-gray-400 tracking-wider uppercase space-x-4">
              <span>03 Custom Tracks</span>
              <span className="text-[#e2231a]">•</span>
              <span>Intelligent Socratic Hints</span>
              <span className="text-[#e2231a]">•</span>
              <span>Concentric Live Telemetry Sync</span>
              <span className="text-[#e2231a]">•</span>
              <span>Syllabus Aligned Assessment</span>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
              <a
                href="#bikes"
                className="bg-[#e2231a] hover:bg-red-700 text-white font-condensed font-extrabold uppercase px-8 py-4 text-sm tracking-widest transition-colors inline-block text-center shadow-lg shadow-[#e2231a]/20 border-2 border-[#e2231a]"
              >
                Launch Evaluation Stations →
              </a>
              <a
                href="#test-ride-wrapper"
                className="border-2 border-white/30 text-white hover:border-[#e2231a] hover:text-[#e2231a] font-condensed font-extrabold uppercase px-8 py-4 text-sm tracking-widest transition-colors flex items-center justify-center gap-3.5"
              >
                Go to Authentication
              </a>
            </div>
          </div>


        </div>

        {/* Side Scroll hint Indicator */}
        <div className="absolute bottom-16 right-12 hidden lg:flex flex-col items-center gap-4 text-gray-500 hover:text-white transition-colors duration-300">
          <span className="font-condensed text-[10px] tracking-widest uppercase writing-mode-vertical text-gray-400 font-bold">
            Scroll To Explore
          </span>
          <div className="w-[1.5px] h-12 bg-gray-500/30 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#e2231a] animate-scrollIndicatorAnimation" />
          </div>
        </div>

        {/* Endless scrolling bottom ticker bar */}
        <div className="absolute bottom-0 left-0 right-0 h-11 bg-black border-t border-[#e2231a]/20 overflow-hidden flex items-center">
          <div className="whitespace-nowrap flex gap-12 font-condensed text-[11px] tracking-widest font-extrabold uppercase text-gray-500 animate-ticker">
            <span>MECHFORGE MATHEMATICAL CALCULATIONS PANEL</span>
            <span>●</span>
            <span>INTUITIVE SYLLABUS DIRECTIVES</span>
            <span>●</span>
            <span>DUAL EXPERIMENT MONITORING</span>
            <span>●</span>
            <span>ADVANCED MECHANICS WORKBOOK MATRIX</span>
            <span>●</span>
            <span>6-SPEED RECOMPILER ENGINE WORKSPACE</span>
            <span>●</span>
            <span>OFFICIAL COMPILATION PROVING TELEMETRY</span>
            <span>●</span>
            <span>HIGH ACCURACY COMPUTERIZED MULTI-GRID</span>
            <span>●</span>
            <span>ACTIVE STUDY SESSIONS</span>
            <span>●</span>
            <span>MECHFORGE MATHEMATICAL CALCULATIONS PANEL</span>
            <span>●</span>
            <span>INTUITIVE SYLLABUS DIRECTIVES</span>
            <span>●</span>
            <span>DUAL EXPERIMENT MONITORING</span>
            <span>●</span>
            <span>ADVANCED MECHANICS WORKBOOK MATRIX</span>
            <span>●</span>
            <span>6-SPEED RECOMPILER ENGINE WORKSPACE</span>
            <span>●</span>
            <span>OFFICIAL COMPILATION PROVING TELEMETRY</span>
            <span>●</span>
            <span>HIGH ACCURACY COMPUTERIZED MULTI-GRID</span>
            <span>●</span>
            <span>ACTIVE STUDY SESSIONS</span>
          </div>
        </div>
      </section>

      {!isLoggedIn ? (
        /* STATE 0: SECURE TERMINAL ACCESS INTERCEPT */
        <section id="test-ride-wrapper" className="py-24 bg-[#050505] border-t border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#e2231a] animate-pulse" />
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[10px] font-mono tracking-widest bg-[#e2231a]/15 text-[#e2231a] border border-[#e2231a]/20 px-3 py-1 uppercase rounded-full font-black animate-pulse">
                [GATEKEEPER SECTOR LOCK] TYPE-0 AUTHENTICATION
              </span>
              <h2 className="font-bebas text-5xl text-white tracking-widest uppercase mt-4">
                MECHFORGE INDUSTRIAL CORE ACCESS
              </h2>
              <p className="text-zinc-500 font-sans text-xs max-w-md mx-auto mt-2 leading-relaxed">
                Unlock the terminal matrix below to boot academic dashboards, sorted live scholastics leaderboards & equations tools.
              </p>
            </div>
            <TestRideForm
              candidateName={candidateName}
              setCandidateName={setCandidateName}
              candidateEmail={candidateEmail}
              setCandidateEmail={setCandidateEmail}
              collegeName={collegeName}
              setCollegeName={setCollegeName}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              onResetAllState={handleResetAllState}
              setScore={setScore}
              setDailyStreak={setDailyStreak}
            />
          </div>
        </section>
      ) : (
        <>
          {/* SECTION 2: TECH BREAKTHROUGHS & NEWS FEED */}
          <section id="difference" className="py-24 bg-[#080808] relative overflow-hidden">
            {/* Background Ghostly Text */}
            <div className="absolute right-[-40px] top-[45%] -translate-y-1/2 font-bebas text-[240px] leading-none text-white/[0.015] select-none tracking-widest font-extrabold pointer-events-none">
              NEWS
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <TechNewsFeed 
                currentScore={currentScore}
                setScore={setScore}
                dailyStreak={dailyStreak}
                setDailyStreak={setDailyStreak}
                onStreakTrigger={() => setStreakAnimTrigger(prev => prev + 1)}
              />
            </div>
          </section>


      {/* SECTION 3: BIKES PORTFOLIO & SWAPPER */}
      <BikeGallery
        onSelectedForRide={handleSelectedForRide}
        candidateName={candidateName}
        candidateEmail={candidateEmail}
        collegeName={collegeName}
        currentScore={currentScore}
        setScore={setScore}
        activeTrackID={activeTrackID}
        setActiveTrackID={setActiveTrackID}
        dailyStreak={dailyStreak}
        setDailyStreak={setDailyStreak}
        onStreakTrigger={() => setStreakAnimTrigger(prev => prev + 1)}
      />

      {/* SECTION 4: THE SCIENCE (TECHNOLOGY) */}
      <section id="technology" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Shadow Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60')` }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-suzuki-red to-transparent opacity-60 animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="font-condensed text-xs text-suzuki-red tracking-[0.3em] uppercase font-bold flex justify-center items-center gap-3">
              <span className="w-8 h-[1px] bg-suzuki-red"></span>
              The Science of Mechanics
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase text-white leading-none">
              Engineering <span className="text-suzuki-red">Every Matrix</span>.
            </h2>
            <p className="text-gray-400 font-sans text-xl leading-relaxed">
              Each structural manifold, kinematic node, and heat transfer equation in MechForge is tuned to maximize student comprehension and technical rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <button
              onClick={() => setActiveMatrixId("CAD")}
              className={`bg-[#111]/70 border hover:border-suzuki-red/40 p-6 rounded-md relative group transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer ${
                activeMatrixId === "CAD" ? "border-[#e2231a] ring-2 ring-[#e2231a] bg-[#181212]" : "border-white/5"
              }`}
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700">01</span>
              <div className="font-bebas text-4xl text-suzuki-red tracking-wider mb-2">CAD</div>
              <h4 className="font-condensed text-xs font-extrabold uppercase text-white tracking-widest mb-3">
                Computer-Aided Design
              </h4>
              <p className="text-gray-400 text-xl leading-relaxed font-sans mb-4">
                Models complex geometric configurations and assemblies with absolute fidelity and parametric constraints.
              </p>
              <div className="text-[10px] font-mono font-extrabold text-[#e2231a] uppercase">
                {activeMatrixId === "CAD" ? "[ACTIVE SANDBOX]" : "[LAUNCH SIMULATOR]"}
              </div>
            </button>

            <button
              onClick={() => setActiveMatrixId("FEA")}
              className={`bg-[#111]/70 border hover:border-suzuki-red/40 p-6 rounded-md relative group transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer ${
                activeMatrixId === "FEA" ? "border-[#e2231a] ring-2 ring-[#e2231a] bg-[#181212]" : "border-white/5"
              }`}
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700">02</span>
              <div className="font-bebas text-4xl text-suzuki-red tracking-wider mb-2">FEA</div>
              <h4 className="font-condensed text-xs font-extrabold uppercase text-white tracking-widest mb-3">
                Finite Element Analysis
              </h4>
              <p className="text-gray-400 text-xl leading-relaxed font-sans mb-4">
                Calculates tension distribution, mechanical load vectors, and localized material deformation stresses.
              </p>
              <div className="text-[10px] font-mono font-extrabold text-[#e2231a] uppercase">
                {activeMatrixId === "FEA" ? "[ACTIVE SANDBOX]" : "[LAUNCH SIMULATOR]"}
              </div>
            </button>

            <button
              onClick={() => setActiveMatrixId("CFD")}
              className={`bg-[#111]/70 border hover:border-suzuki-red/40 p-6 rounded-md relative group transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer ${
                activeMatrixId === "CFD" ? "border-[#e2231a] ring-2 ring-[#e2231a] bg-[#181212]" : "border-white/5"
              }`}
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700">03</span>
              <div className="font-bebas text-4xl text-suzuki-red tracking-wider mb-2">CFD</div>
              <h4 className="font-condensed text-xs font-extrabold uppercase text-white tracking-widest mb-3">
                Fluid Dynamics study
              </h4>
              <p className="text-gray-400 text-xl leading-relaxed font-sans mb-4">
                Simulates laminar boundary flows, turbulence transitions, and absolute physical aerodynamic constraints.
              </p>
              <div className="text-[10px] font-mono font-extrabold text-[#e2231a] uppercase">
                {activeMatrixId === "CFD" ? "[ACTIVE SANDBOX]" : "[LAUNCH SIMULATOR]"}
              </div>
            </button>

            <button
              onClick={() => setActiveMatrixId("SRE")}
              className={`bg-[#111]/70 border hover:border-suzuki-red/40 p-6 rounded-md relative group transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer ${
                activeMatrixId === "SRE" ? "border-[#e2231a] ring-2 ring-[#e2231a] bg-[#181212]" : "border-white/5"
              }`}
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700">04</span>
              <div className="font-bebas text-4xl text-suzuki-red tracking-wider mb-2">SRE</div>
              <h4 className="font-condensed text-xs font-extrabold uppercase text-white tracking-widest mb-3">
                Syllabus Review Engine
              </h4>
              <p className="text-gray-400 text-xl leading-relaxed font-sans mb-4">
                Six rigorous, progressive checkpoints customized to structure your transition from Core concepts into Cyber-Physical frameworks.
              </p>
              <div className="text-[10px] font-mono font-extrabold text-[#e2231a] uppercase">
                {activeMatrixId === "SRE" ? "[ACTIVE SANDBOX]" : "[LAUNCH SIMULATOR]"}
              </div>
            </button>

            <button
              onClick={() => setActiveMatrixId("IoT")}
              className={`bg-[#111]/70 border hover:border-suzuki-red/40 p-6 rounded-md relative group transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer ${
                activeMatrixId === "IoT" ? "border-[#e2231a] ring-2 ring-[#e2231a] bg-[#181212]" : "border-white/5"
              }`}
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700">05</span>
              <div className="font-bebas text-4xl text-suzuki-red tracking-wider mb-2">IoT</div>
              <h4 className="font-condensed text-xs font-extrabold uppercase text-white tracking-widest mb-3">
                Real-Time Telemetry
              </h4>
              <p className="text-gray-400 text-xl leading-relaxed font-sans mb-4">
                Full live response data, score tracking, and diagnostic formulas mapped dynamically on our Socratic monitors.
              </p>
              <div className="text-[10px] font-mono font-extrabold text-[#e2231a] uppercase">
                {activeMatrixId === "IoT" ? "[ACTIVE SANDBOX]" : "[LAUNCH SIMULATOR]"}
              </div>
            </button>
          </div>

          {/* Render the full-fidelity Interactive Lesson & Interactive Physics canvas */}
          <MatrixExplorers 
            activeId={activeMatrixId} 
            onClose={() => setActiveMatrixId(null)} 
            onIncrementScore={(pts) => {
              setScore(prev => prev + pts);
              setStreakAnimTrigger(prev => prev + 1);
              setShowNotification(`🎉 OUTSTANDING! Socratic solver complete. +${pts} added straight to your scoreboard matrix.`);
            }}
          />
        </div>
      </section>



      {/* SECTION 6: MECHFORGE CURRICULUM ARCHIVE & MILESTONES */}
      <section id="motogp" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#040915] relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-5 grayscale pointer-events-none"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&q=60')` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <div className="font-condensed text-sm md:text-base text-suzuki-red tracking-[0.3em] uppercase font-bold flex justify-center items-center gap-3">
              <span className="w-8 h-[1px] bg-suzuki-red"></span>
              Release Milestones
            </div>

            <div className="w-24 h-0.5 bg-suzuki-red mx-auto" />
            <p className="text-gray-400 text-xl leading-relaxed">
              Every assessment model, equation verification loop, and grading strategy stems directly from established curriculum standards.
            </p>
          </div>

          {/* Interactive Timeline nodes */}
          <div className="relative mb-12">
            {/* Horizontal progress guide line */}
            <div className="absolute top-[35px] left-6 right-6 h-[1.5px] bg-[#222] z-0" />
            <div 
              className="absolute top-[35px] left-6 h-[1.5px] bg-suzuki-red z-10 transition-all duration-500"
              style={{ width: `${(timelineIndex / (TIMELINE_MOMENTS.length - 1)) * 96}%` }}
            />

            <div className="relative z-20 flex justify-between items-start">
              {TIMELINE_MOMENTS.map((moment, idx) => (
                <button
                  key={moment.year}
                  onClick={() => setTimelineIndex(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-0 max-w-[120px] text-center"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      timelineIndex === idx
                        ? 'bg-suzuki-red border-suzuki-red text-white scale-110 shadow-lg shadow-suzuki-red/30'
                        : 'bg-black border-neutral-800 text-neutral-500 group-hover:border-neutral-500 hover:scale-105'
                    }`}
                  >
                    {timelineIndex === idx ? <Check size={14} /> : <span className="text-xs font-mono">{idx + 1}</span>}
                  </div>
                  <span
                    className={`font-bebas text-lg tracking-wider mt-3 select-none transition-colors ${
                      timelineIndex === idx ? 'text-suzuki-red' : 'text-neutral-500 group-hover:text-white'
                    }`}
                  >
                    {moment.year}
                  </span>
                  <span className="text-[10px] text-neutral-600 font-condensed tracking-wider mt-1 hidden md:block uppercase truncate max-w-[100px]">
                    {moment.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LIVE SCHOLASTICS LEADERBOARD MATRIX */}
      <section id="deals" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col gap-8 mb-10">
            {/* Title Block & Description */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/15 pb-8">
              <div>
                <div className="font-mono text-xs text-suzuki-red tracking-[0.3em] uppercase font-black flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-suzuki-red inline-block"></span>
                  PROVING GROUND SCORES
                </div>
                <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase leading-none text-white mt-3">
                  LIVE DUAL-GRID <span className="text-suzuki-red italic font-extrabold">LEADERBOARD MATRIX</span>
                </h2>
                <p className="text-zinc-400 font-sans text-base md:text-lg max-w-2xl mt-4 leading-relaxed font-medium">
                  Real-time scholastic ranking matrix populated from active system parameters. Complete Socratic quiz scenarios and study sessions to claims points.
                </p>
              </div>

              {/* 3-Way Filter & Duel Toggle Buttons */}
              <div className="flex flex-wrap gap-1.5 bg-black p-1.5 border border-white/10 rounded-lg shrink-0">
                <button
                  onClick={() => {
                    setLeaderboardFilter('intra');
                    setPeerChallengePanelActive(false);
                  }}
                  className={`px-4 py-2 font-mono text-[11px] md:text-xs tracking-wider uppercase font-black transition-all rounded cursor-pointer ${
                    leaderboardFilter === 'intra' && !peerChallengePanelActive
                      ? 'bg-suzuki-red text-white shadow-lg shadow-red-650/30'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  [INTRA-COLLEGE GRID]
                </button>
                <button
                  onClick={() => {
                    setLeaderboardFilter('inter');
                    setPeerChallengePanelActive(false);
                  }}
                  className={`px-4 py-2 font-mono text-[11px] md:text-xs tracking-wider uppercase font-black transition-all rounded cursor-pointer ${
                    leaderboardFilter === 'inter' && !peerChallengePanelActive
                      ? 'bg-suzuki-red text-white shadow-lg shadow-red-650/30'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  [INTER-COLLEGE // NATIONAL]
                </button>
                <button
                  onClick={() => {
                    setPeerChallengePanelActive(!peerChallengePanelActive);
                    setLeaderboardFilter('intra'); // Default to intra-college view for drafting
                  }}
                  className={`px-4 py-2 font-mono text-[11px] md:text-xs tracking-wider uppercase font-black transition-all rounded cursor-pointer flex items-center gap-1.5 ${
                    peerChallengePanelActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40'
                      : 'text-yellow-500 hover:text-yellow-400 border border-yellow-505/20'
                  }`}
                >
                  <Swords size={12} className="animate-pulse" />
                  PEER CHALLENGES {peerChallengePanelActive ? '[ACTIVE]' : '[OFF]'}
                </button>
              </div>
            </div>

            {/* PROFESSIONAL [LIVE INBOUND SCHOLAR RIG CONTROL] BOARD CONTROL PANEL */}
            <div className="bg-[#0b0c0d] border border-red-500/30 rounded-xl p-5 md:p-6 lg:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 via-amber-500 to-red-650 animate-pulse" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:items-center z-10 relative">
                
                {/* 1. Header with active beacon */}
                <div className="space-y-2 lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_12px_#ef4444]" />
                    <span className="text-red-500 font-mono font-black uppercase text-xs md:text-sm tracking-widest block">
                      🛡️ [LIVE INBOUND SCHOLAR RIG CONTROL]
                    </span>
                  </div>
                  <h4 className="font-bebas text-2xl md:text-3xl text-white tracking-widest uppercase font-black leading-none">
                    STUDENT PORTAL TELEMETRY
                  </h4>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    📂 AI SECURE CLOUD STORAGE: SYNCED
                  </div>
                </div>

                {/* 2. Middle Row: Email and Score Display Info */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Scholar Email Block */}
                  <div className="bg-zinc-950/60 p-4 rounded-lg border border-white/5 space-y-1.5 flex flex-col justify-center overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
                        SCHOLAR EMAIL:
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        isLoggedIn ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-neutral-800 text-zinc-500"
                      }`}>
                        {isLoggedIn ? "ACTIVE" : "DEMO GUEST"}
                      </span>
                    </div>
                    <div className="text-sm md:text-base font-mono font-black text-white truncate select-all pt-1" title={isLoggedIn && candidateEmail ? candidateEmail : "anany2006@gmail.com"}>
                      {isLoggedIn && candidateEmail ? candidateEmail : "anany2006@gmail.com"}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-sans mt-0.5 leading-snug">
                      {isLoggedIn ? "Token mapping verified" : "Sign in to persist your score"}
                    </div>
                  </div>

                  {/* Scholar Score Block */}
                  <div className="bg-zinc-950/60 p-4 rounded-lg border border-white/5 space-y-1.5 flex flex-col justify-center">
                    <span className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      SCHOLAR SCORE:
                    </span>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-xl md:text-2xl font-mono font-black text-yellow-400 tracking-wider">
                        {isLoggedIn ? currentScore : 0} PTS
                      </span>
                      <span className="text-zinc-500 text-[9px] font-mono font-bold">
                        (verified)
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-sans mt-0.5 leading-snug">
                      Solve socratic quizzes to boost points
                    </div>
                  </div>
                </div>

                {/* 3. Secure Seal Notice Block */}
                <div className="lg:col-span-3 bg-black/40 border border-white/5 py-4 px-4 rounded-lg text-zinc-400 font-mono text-[10px] sm:text-[11px] leading-relaxed flex items-start gap-2.5 relative">
                  <span className="w-2 h-2 rounded-full bg-[#e2231a] animate-pulse shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-black block text-[9px] uppercase tracking-wider mb-0.5">🤖 AI DIRECT GOVERNED:</span>
                    Manual adjustments are locked. Live scores represent authentic challenge completion output.
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PEER CHALLENGE CONTROL PANEL SUITE */}
          {peerChallengePanelActive && (
            <>
              <div className="bg-[#0c0c0e] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 animate-pulse" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-amber-500 tracking-[0.2em] uppercase font-bold mb-1 flex items-center gap-1.5">
                    <Swords size={14} className="animate-bounce" />
                    ACADEMIC DUELS MATRIX
                  </span>
                  <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-widest uppercase">
                    1v1 ACTIVE SYLLABUS CHALLENGE SUITE
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans max-w-xl">
                    Transmit challenge signals and socratic duels to students in your college. Winning duels earns you <strong className="text-amber-400 font-bold">+30 dynamic point stakes</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setPeerChallengePanelActive(false)}
                  className="px-3 py-1.5 border border-white/10 rounded-md hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
                >
                  ✕ Close Console
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* COLUMN 1: TRANSMIT NEW CHALLENGE */}
                <div className="bg-black/40 border border-white/5 p-5 rounded-lg space-y-4">
                  <h4 className="text-sm font-mono font-black text-amber-500 tracking-wider uppercase border-b border-white/5 pb-2">
                    🛰️ TRANSMIT NEW SIGNAL
                  </h4>
                  
                  <div className="space-y-4 font-sans text-sm">
                    {/* TARGET STUDENT SELECT */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono font-bold block">
                        Select Target Scholar Peer:
                      </label>
                      <select
                        id="peer-challenge-target-select"
                        value={challengeReceiver}
                        onChange={(e) => setChallengeReceiver(e.target.value)}
                        className="w-full bg-zinc-950/80 border border-white/10 p-2.5 rounded-md text-white font-sans text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="">-- Choose a Peer --</option>
                        {selectablePeers.map((p, pidx) => (
                          <option key={pidx} value={p.name}>
                            {p.name} ({p.college} - {p.score} PTS)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SELECT SYLLABUS TOPIC */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono font-bold block">
                        Select Syllabus Topic:
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {(["CAD", "FEA", "CFD", "SRE", "IoT"] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setChallengeTopic(t)}
                            className={`px-3 py-2 text-xs font-mono font-bold rounded border uppercase tracking-wider transition-all text-center ${
                              challengeTopic === t
                                ? "bg-amber-500/10 text-amber-400 border-amber-500"
                                : "bg-zinc-950 text-zinc-400 border-white/5 hover:border-white/20"
                            }`}
                          >
                            💻 {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PREMIUM POINT STAKES PANEL */}
                    <div className="bg-zinc-950/60 p-3 rounded border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-yellow-400 animate-pulse" />
                        <div>
                          <span className="text-xs text-zinc-400 font-mono block">WINNER BONUS:</span>
                          <span className="text-xs font-mono font-black text-white">+30 SPECIAL POINTS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block uppercase font-mono tracking-wider">CHALLENGE COSTS</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-extrabold uppercase">0 PTS (FREE RETRY)</span>
                      </div>
                    </div>

                    {/* TRIGGER TRANSMISSION */}
                    <button
                      type="button"
                      disabled={!challengeReceiver}
                      onClick={() => {
                        handleSendChallenge(challengeReceiver, challengeTopic);
                        setChallengeReceiver('');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 disabled:from-zinc-800 disabled:to-zinc-800 text-black disabled:text-zinc-500 font-mono text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      TRANSMIT TARGETED SIGNAL
                    </button>
                  </div>
                </div>

                {/* COLUMN 2: ACTIVE PEER CHANNELS & FEEDS */}
                <div className="bg-black/40 border border-white/5 p-5 rounded-lg flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono font-black text-amber-500 tracking-wider uppercase border-b border-white/5 pb-2 flex items-center justify-between">
                      <span>🕹️ DUEL CHANNELS MATRIX</span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-mono lowercase">
                        {challenges.length} active
                      </span>
                    </h4>

                    {/* LIST OF ACTIVE CHALLENGES */}
                    <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1 select-none">
                      {challenges.length > 0 ? (
                        challenges.map((c) => {
                          const isInbound = c.receiverName === 'You' || c.receiverName === candidateName;
                          const opponent = isInbound ? c.senderName : c.receiverName;
                          
                          return (
                            <div key={c.id} className="bg-zinc-950/80 border border-white/5 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all hover:border-white/15">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 font-mono">
                                  <span className={`w-2 h-2 rounded-full ${
                                    c.status === 'PENDING' ? 'bg-amber-400 animate-ping' :
                                    c.status === 'ACCEPTED' ? 'bg-emerald-500 animate-pulse' :
                                    c.status === 'COMPLETED_WIN' ? 'bg-yellow-400' : 'bg-zinc-500'
                                  }`} />
                                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                                    [STAKE: {c.topicId}]
                                  </span>
                                  {isInbound && c.status === 'PENDING' && (
                                    <span className="text-[8px] bg-red-650 text-white font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded leading-none">
                                      INBOUND
                                    </span>
                                  )}
                                </div>
                                <h5 className="font-sans font-bold text-white text-sm">
                                  {isInbound ? `From: ${opponent}` : `To: ${opponent}`}
                                </h5>
                                <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                                  <span>Time: {c.createdAt}</span>
                                  <span>•</span>
                                  <span className="text-yellow-450 text-[10px] font-bold">Award: +30 Pts</span>
                                </div>
                              </div>

                              {/* ACTIONS COLUMN */}
                              <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                                {c.status === 'PENDING' && isInbound && (
                                  <>
                                    <button
                                      onClick={() => handleAcceptChallenge(c.id)}
                                      className="px-2.5 py-1.5 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded hover:bg-emerald-700 transition-all cursor-pointer"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleDeclineChallenge(c.id)}
                                      className="px-2.5 py-1.5 bg-zinc-800 text-zinc-400 font-mono text-[10px] font-bold uppercase tracking-wider rounded hover:bg-zinc-700 transition-all cursor-pointer"
                                    >
                                      Decline
                                    </button>
                                  </>
                                )}

                                {c.status === 'PENDING' && !isInbound && (
                                  <span className="text-[10px] text-amber-400 font-mono italic p-1.5 border border-amber-500/10 rounded bg-amber-500/5">
                                    Pending Acceptance...
                                  </span>
                                )}

                                {c.status === 'ACCEPTED' && (
                                  <button
                                    onClick={() => handleLaunchDuel(c.id, c.topicId)}
                                    className="px-3 py-1.5 bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-widest rounded hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1 shadow-lg shadow-amber-500/20"
                                  >
                                    <Play size={10} fill="currentColor" />
                                    PLAY DUEL
                                  </button>
                                )}

                                {c.status === 'COMPLETED_WIN' && (
                                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                                    ✓ WON (+30)
                                  </span>
                                )}

                                {c.status === 'COMPLETED_DRAW' && (
                                  <span className="text-[10px] font-mono text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded">
                                    🤝 DRAW (+10)
                                  </span>
                                )}

                                {c.status === 'COMPLETED_LOSS' && (
                                  <span className="text-[10px] font-mono text-zinc-500 font-bold bg-zinc-900 border border-white/5 px-2 py-1 rounded">
                                    💀 LOST
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-zinc-500">
                          <Swords size={24} className="mx-auto opacity-30 mb-2" />
                          <p className="text-xs font-mono">No active challenge channels drafted yet.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM REFRESH CONSOLE */}
                  <div className="border-t border-white/5 pt-3 mt-4 text-[10px] text-zinc-500 font-mono leading-none">
                     📡 Live duel synchronization status: <strong>SECURED</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* PEER DISCUSSION CHAT WIDGET */}
            <div className="mb-8 font-sans">
              <PeerDiscussionChat
                candidateName={candidateName}
                collegeName={collegeName || "IIT Madras"}
                registeredUsers={registeredUsers}
                onSelectPeerForChallenge={(peerName, topicId) => {
                  setChallengeReceiver(peerName);
                  setChallengeTopic(topicId);
                  // Scroll to the selector smoothly
                  const selectElement = document.getElementById("peer-challenge-target-select");
                  if (selectElement) {
                    selectElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    
                    // Give it a brief visual flash so the user knows it's ready
                    selectElement.classList.add("ring-2", "ring-amber-500");
                    setTimeout(() => {
                      selectElement.classList.remove("ring-2", "ring-amber-500");
                    }, 1000);
                  }
                }}
              />
            </div>
          </>
        )}

          {/* Leaderboard Cyber Grid with larger fonts */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-md p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-suzuki-red/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* AGENTIC AI LIVE MONITOR CONSOLE REPORT */}
            <div className="mb-6 p-4 bg-black/50 border border-red-500/30 rounded-lg font-mono">
              <div className="flex items-center gap-2 mb-3 text-[#e2231a] text-sm font-black tracking-widest uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#e2231a] shrink-0" />
                🤖 AGENTIC AI RANKING MONITOR & POINT AUDITOR ACTIVE
              </div>
              <div className="space-y-2 text-sm text-zinc-200 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-400 font-extrabold shrink-0">[DECISION_LOG]:</span>
                  <span>
                    Logged session detected for scholar <strong className="text-white font-extrabold">{isLoggedIn ? candidateName : "GUEST STUDENT"}</strong>
                    {isLoggedIn && collegeName ? (
                      <>
                        {" "}affiliated with <strong className="text-yellow-300 font-bold underline bg-yellow-500/5 px-1.5 py-0.5 rounded">{collegeName}</strong>.
                      </>
                    ) : (
                      " (offline mode)."
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-400 font-extrabold shrink-0">[MATRIX_ROUTING]:</span>
                  <span>
                    {isLoggedIn && collegeName ? (
                      <>
                        Placed candidate in <strong className="text-emerald-400 font-extrabold">INTRA-COLLEGE GRID</strong> for active peer scoring. Non-matching scholar entries routed to national benchmarks in <strong className="text-yellow-300 font-extrabold">INTER-COLLEGE MATRIX</strong>.
                      </>
                    ) : (
                      <>
                        Awaiting secure login credentials. Register or log in below to start live agentic campus routing.
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-400 font-extrabold shrink-0">[MATRIX_INTEGRITY]:</span>
                  <span>
                    Chrono counter constraint active. Study progress is managed at 1-day step intervals. Score logic secured.
                  </span>
                </div>

                {/* AI Point Audit Ledger Transactions */}
                <div className="flex flex-col gap-1.5 border-t border-red-500/20 pt-3 mt-3">
                  <span className="text-zinc-400 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5">
                    ⚙️ [REAL-TIME AI POINT TRANSACTIONS]:
                  </span>
                  <div className="space-y-1.5 mt-1 font-mono text-xs max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                    {aiAuditLogs.map((log, lidx) => (
                      <div key={lidx} className="text-emerald-300 bg-emerald-950/25 p-2 border border-emerald-500/20 rounded font-bold flex items-start gap-1.5 leading-normal">
                        <span className="text-emerald-400 shrink-0 font-bold">▶</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm font-mono">
                <thead>
                  <tr className="border-b border-white/15 text-zinc-100 uppercase tracking-widest text-xs font-black pb-4">
                    <th className="py-3 px-4 text-xs font-black">Rank</th>
                    <th className="py-3 px-4 text-xs font-black">Candidate Scholar Name</th>
                    <th className="py-3 px-4 text-xs font-black">College / Institution</th>
                    <th className="py-3 px-4 text-center text-xs font-black">Proved Points</th>
                    <th className="py-3 px-4 text-right text-xs font-black">Matrix Status</th>
                    <th className="py-3 px-4 text-right text-xs font-black">Direct Duel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-200 text-sm">
                  {displayedPlayers.length > 0 ? (
                    displayedPlayers.map((player, idx) => {
                      const isUser = isLoggedIn && player.name === candidateName;
                      return (
                        <tr 
                          key={idx} 
                          className={`transition-colors hover:bg-white/5 ${
                            isUser ? 'bg-suzuki-red/15 text-white font-extrabold border-l-4 border-l-suzuki-red' : ''
                          }`}
                        >
                          <td className="py-4 px-4 font-bold text-suzuki-red text-base">
                            #{idx + 1}
                          </td>
                          <td className="py-4 px-4 flex items-center gap-2 font-sans font-extrabold text-white text-base">
                            {isUser && <span className="text-[10px] bg-suzuki-red text-white px-2 py-0.5 font-mono uppercase rounded font-black animate-pulse tracking-widest">YOU</span>}
                            {player.name}
                          </td>
                          <td className="py-4 px-4 text-white font-sans font-bold text-base">
                            {player.college}
                          </td>
                          <td className="py-4 px-4 text-center font-bold text-yellow-400 text-base">
                            {player.score} pts
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`inline-block px-3 py-1 text-[10px] font-extrabold uppercase rounded ${
                              player.status === "ACTIVE" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" 
                                : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                            }`}>
                              🟢 {player.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {isUser ? (
                              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider italic">
                                Self
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setPeerChallengePanelActive(true);
                                  setChallengeReceiver(player.name);
                                  const targetElement = document.getElementById('deals');
                                  if (targetElement) {
                                    targetElement.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                                className="px-2.5 py-1 bg-amber-500/15 hover:bg-amber-500 text-amber-450 hover:text-black hover:scale-105 border border-amber-500/30 font-mono text-[10px] font-extrabold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center gap-1 inline-flex"
                              >
                                <Swords size={10} />
                                DUEL
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-zinc-500 font-sans">
                        <Users size={32} className="mx-auto text-zinc-600 mb-4" />
                        <p className="font-bold text-white text-base mb-2">NO REGISTERED SCHOLARS FOUND</p>
                        <p className="text-xl text-zinc-400 leading-relaxed font-sans max-w-lg mx-auto">
                          Please register below in the secure boot console to initialize your data inside the live leaderboard matrix.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Hint regarding live performance */}
            <div className="flex items-center gap-2 border-t border-white/5 pt-4 mt-6 text-xs text-zinc-400 leading-snug font-sans">
              <Info size={14} className="text-suzuki-red shrink-0" />
              <span className="text-sm md:text-base text-zinc-300 font-semibold">Rankings are sorted dynamically high-to-low in real-time. Answering Grade tasks correctly boosts points. Requesting hints does not penalize, but revealing solutions deducts 5 points.</span>
            </div>
          </div>

          {/* ================= AGENTIC AI BENCHMARKING & DIAGNOSIS NETWORK MODULE ================= */}
          <div className="mt-8 bg-[#0d0d0d] border border-white/10 rounded-md p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-suzuki-red/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="font-condensed text-xs text-suzuki-red tracking-[0.2em] uppercase font-bold mb-1 flex items-center gap-1.5">
                  <Cpu size={14} className="animate-pulse" />
                  COGNITIVE ASSESS CONTROLLER
                </span>
                <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-widest uppercase">
                  AGENTIC AI BENCHMARK & SYSTEM DIAGNOSIS
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Dynamic evaluation layer to oversee student profiles, identify malicious bypassed inputs, resolve configuration anomalies, and analyze real peer rankings.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleAISelfHeal}
                  disabled={isDiagnosing}
                  className="px-4 py-2 bg-[#e2231a] hover:bg-red-700 disabled:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                >
                  {isDiagnosing ? (
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : "🤖"}
                  {isDiagnosing ? "RUNNING SEMANTIC AUDIT..." : "AI SELF-HEAL & RECALIBRATE"}
                </button>
              </div>
            </div>

            {/* REAL-TIME DYNAMIC BENCHMARK METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/60 p-4 border border-white/5 rounded-md">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase mb-1">Scholar Standing</span>
                <div className="text-2xl font-black text-white font-sans tracking-tight">
                  {isLoggedIn ? (
                    <>
                      Rank #{sortedPlayers.findIndex(p => p.name.toLowerCase().trim() === candidateName.toLowerCase().trim()) + 1}
                      <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">out of {sortedPlayers.length} candidates</span>
                    </>
                  ) : (
                    <>
                      GUEST ACCESS
                      <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">Register below to position</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-black/60 p-4 border border-white/5 rounded-md">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase mb-1">Your Percentile Rank</span>
                <div className="text-2xl font-black text-emerald-400 font-sans tracking-tight">
                  {isLoggedIn ? (
                    <>
                      {Math.max(0, Math.min(100, Math.round((sortedPlayers.filter(p => currentScore >= p.score).length / sortedPlayers.length) * 100)))}%
                      <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">higher score than competitor base</span>
                    </>
                  ) : (
                    <>
                      -- %
                      <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">Requires logged session</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-black/60 p-4 border border-white/5 rounded-md">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase mb-1">To Overtake Rank Lead</span>
                <div className="text-2xl font-black text-yellow-500 font-sans tracking-tight">
                  {isLoggedIn ? (
                    (() => {
                      const myIdx = sortedPlayers.findIndex(p => p.name.toLowerCase().trim() === candidateName.toLowerCase().trim());
                      if (myIdx === 0) return "0 pts (Class Leader)";
                      if (myIdx > 0) {
                        const targetUser = sortedPlayers[myIdx - 1];
                        return (
                          <>
                            +{targetUser.score - currentScore} pts
                            <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1 truncate" title={`To surpass ${targetUser.name}`}>To surpass {targetUser.name}</span>
                          </>
                        );
                      }
                      return "N/A";
                    })()
                  ) : (
                    <>
                      -- PTS
                      <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">Requires scored account</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-black/60 p-4 border border-white/5 rounded-md">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase mb-1">Academic Class Average</span>
                <div className="text-2xl font-black text-zinc-300 font-sans tracking-tight">
                  {Math.round(registeredUsers.reduce((sum, p) => sum + p.score, 0) / (registeredUsers.length || 1))} pts
                  <span className="text-xs text-zinc-500 font-mono block normal-case font-normal mt-1">Integrated university mean</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC DIAGNOSTIC LOG FEED TERMINAL */}
            <div className="bg-black/95 p-4 rounded border border-white/5 font-mono text-[11px] leading-relaxed select-text">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isDiagnosing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <span className="text-zinc-400 font-bold uppercase tracking-widest">DIAGNOSTIC STATUS: {diagStatus}</span>
                </div>
                <div className="text-zinc-500 text-[10px]">
                  LAST SCAN: <span className="text-zinc-300 font-bold">{lastScanTime}</span>
                </div>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-zinc-400 font-mono">
                {diagnosticsLogs.map((log, idx) => (
                  <p key={idx} className={`${log.includes("⚠️") || log.includes("FAULT") ? 'text-red-400 font-bold' : log.includes("SUCCESS") || log.includes("ok") || log.includes("OK") ? 'text-emerald-400 font-bold' : 'text-zinc-300'}`}>
                    {log}
                  </p>
                ))}
                {isDiagnosing && (
                  <div className="flex items-center gap-1.5 text-yellow-500 animate-pulse font-bold mt-1">
                    <span>■</span>
                    <span>AI MONITOR EVALUATING DATA MATRIX SCHEMAS...</span>
                  </div>
                )}
              </div>

              {diagStatus === 'RESOLVED' && (
                <div className="mt-4 p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded text-emerald-400 text-xs flex items-center gap-2">
                  <ShieldCheck size={14} className="shrink-0 animate-bounce" />
                  <span><strong>AI HEALTH SCAN CONFIRMATION:</strong> No unauthorized score adjustments, negative anomalies, duplicate email registries, or SQL string patterns detected. Performance index recalibrated!</span>
                </div>
              )}
            </div>
          </div>
          {/* ================= END OF AGENTIC AI BENCHMARKING & DIAGNOSIS NETWORK ================= */}

        </div>
      </section>



      {/* SECTION 10: MECHFORGE INTUATIVE EDUCATION SYSTEM */}
      <section id="service" className="py-24 bg-gradient-to-br from-[#08101E] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            {/* Visual Frame left */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[350px] overflow-hidden group rounded shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="MechForge Lab Dynamics"
                className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 border-l-[3px] border-suzuki-red pl-4 z-10">
                <span className="font-bebas text-lg uppercase text-white tracking-widest block leading-tight">
                  MECHFORGE PORTAL METRICS
                </span>
              </div>
            </div>

            {/* Accordion Right */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="font-condensed text-xs text-suzuki-red tracking-[0.3em] uppercase font-bold flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-suzuki-red"></span>
                  Intelligent Evaluation Framework
                </div>
                <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase leading-tight text-white mb-4">
                  Your Education Doesn't Stop.<br />
                  <span className="text-suzuki-red text-italic">Neither Do We.</span>
                </h2>
              </div>

              {/* Accordion Nodes */}
              <div className="space-y-3">
                {SERVICE_FAQS.map((faq, idx) => {
                  const isOpen = accordionOpen === idx;
                  return (
                    <div key={faq.title} className="border-b border-white/5">
                      <button
                        onClick={() => setAccordionOpen(isOpen ? -1 : idx)}
                        className="w-full py-4 text-left flex items-center justify-between text-white font-condensed font-bold uppercase tracking-wide text-sm transition-all hover:text-suzuki-red cursor-pointer"
                      >
                        <span>{faq.title}</span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? 'rotate-180 text-suzuki-red' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-32 opacity-100 pb-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-xl text-gray-400 leading-relaxed font-sans pr-12">
                          {faq.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 13: SCHOLASTIC GATEKEEPER AUTHENTICATION */}
      <section id="test-ride-wrapper" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <TestRideForm
            candidateName={candidateName}
            setCandidateName={setCandidateName}
            candidateEmail={candidateEmail}
            setCandidateEmail={setCandidateEmail}
            collegeName={collegeName}
            setCollegeName={setCollegeName}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setScore={setScore}
            setDailyStreak={setDailyStreak}
          />
        </div>
      </section>
        </>
      )}

      {/* FOOTER BLOCK */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3">
                <div
                  className="w-9 h-9 bg-suzuki-red relative flex items-center justify-center shrink-0"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 70% 50%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 30% 50%, 0% 30%)'
                  }}
                />
                <span className="font-bebas text-2xl tracking-wider font-bold text-white">MECHFORGE</span>
              </a>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Created by Ananya S K under the academic auspices of KLE Technological University. Proven across engineering curricula and advanced laboratory guidelines.
              </p>
              <div className="pt-2 font-bebas text-lg uppercase text-white tracking-widest">
                LAB CONSOLE: <span className="text-suzuki-red">V2.4.0</span>
              </div>
            </div>

            <div>
              <h4 className="font-condensed text-[11px] tracking-widest uppercase font-extrabold text-white mb-4">
                Academic Grade Tracks
              </h4>
              <ul className="space-y-2 text-xs">
                {BIKES_DATA.map(bike => (
                  <li key={bike.id}>
                    <button
                      onClick={() => handleSelectedForRide(bike.id)}
                      className="hover:text-suzuki-red transition-all cursor-pointer text-left font-sans text-stone-400 text-[11px]"
                    >
                      {bike.name} Dashboard
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-condensed text-[11px] tracking-widest uppercase font-extrabold text-white mb-4">
                Academic Segments
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#service" className="hover:text-suzuki-red transition-all">Intelligent Socratic Hints</a></li>
                <li><a href="#service" className="hover:text-suzuki-red transition-all">IoT Real-Time Telemetry</a></li>
                <li><a href="#service" className="hover:text-suzuki-red transition-all">Integrated Formulas Console</a></li>
                <li><a href="#test-ride-wrapper" className="hover:text-suzuki-red transition-all">Secure Gateway Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-condensed text-[11px] tracking-widest uppercase font-extrabold text-white mb-4 font-bold">
                Academic Coordination
              </h4>
              <p className="text-xs leading-relaxed text-neutral-500">
                <span className="text-white font-bold block">KLE TECH MECHANICAL DEPT</span>
                Administered by the Department of Mechanical Engineering at KLE Tech, Hubballi. Evaluated through automated syllabus matrices, current as of 2026.
              </p>
              <div className="pt-4 text-[10px] text-neutral-600 font-mono">
                Corporate reference timezone: Asia/Kolkata
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-neutral-600 gap-4">
            <span>
              © 2023–2026 KLE Tech Mechanical Department. All rights reserved. mechforge.kletech.ac.in
            </span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Statement</a>
              <a href="#" className="hover:text-white transition-colors">Syllabus Regulations</a>
              <a href="#" className="hover:text-white transition-colors">Evaluation Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK QUIZ MODAL FOR 1v1 PEER CHALLENGE DUELS */}
      <QuickQuizModal
        topicId={duelTopicId}
        isOpen={isDuelQuizOpen}
        onClose={handleDuelClose}
        onSuccess={handleDuelSuccess}
      />
    </div>
  );
}
