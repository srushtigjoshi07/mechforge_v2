import { useState, useEffect } from 'react';
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
  Info
} from 'lucide-react';

import { BIKES_DATA, DEALS_DATA, SAFETY_PILLARS, SERVICE_FAQS, TIMELINE_MOMENTS } from './data';
import Navbar from './components/Navbar';
import BikeGallery from './components/BikeGallery';
import TestRideForm from './components/TestRideForm';
import FilmModal from './components/FilmModal';
import TechNewsFeed from './components/TechNewsFeed';

import MatrixExplorers from './components/MatrixExplorers';

export default function App() {
  // One-time auto-reset schema check for 120s timer per question & Day 1 start
  useEffect(() => {
    if (localStorage.getItem('mechResetCompleted_v3') !== 'true') {
      localStorage.removeItem('mechCurrentScore');
      localStorage.removeItem('unlockedModules');
      localStorage.removeItem('mechUserBadges');
      localStorage.removeItem('mechCompletedAnswers');
      localStorage.removeItem('mechHintsUsed');
      localStorage.removeItem('g1Answers');
      localStorage.removeItem('mcqAnswers');
      localStorage.removeItem('solutionsRevealed');
      localStorage.removeItem('mechMistakeCounter');
      localStorage.removeItem('mechVirtualDaysSimulated');
      localStorage.removeItem('mechUnlimitedAccess');
      localStorage.setItem('mechResetCompleted_v3', 'true');
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
  const [currentScore, setScore] = useState<number>(() => {
    const isLg = localStorage.getItem('mechIsLoggedIn') === 'true';
    if (!isLg) return 0;
    const email = localStorage.getItem('mechUserEmail');
    if (email) {
      const saved = localStorage.getItem('mechCurrentScore_' + email.toLowerCase().trim());
      if (saved) return parseInt(saved, 10);
    }
    const savedGlobal = localStorage.getItem('mechCurrentScore');
    const resetDone = localStorage.getItem('mechResetCompleted_v3') === 'true';
    if (!resetDone) return 0;
    return savedGlobal ? parseInt(savedGlobal, 10) : 0; // Default score starts at 0 for a clean assess track
  });


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

  // Trial Reset Mode for fast visual review matching user scenario
  const handleSecureMockTrialReset = () => {
    localStorage.clear();
    
    // Seed standard competitors
    const DEFAULT_COMPETITORS = [
      { name: "Pranav Kulkarni", college: "KLE Technological University", score: 90, status: "ACTIVE" },
      { name: "Shruti Hegde", college: "IIT Bombay", score: 105, status: "ACTIVE" },
      { name: "Aniket Deshpande", college: "RV College of Engineering", score: 75, status: "STABILIZED" },
      { name: "Rohan Kamath", college: "MIT Manipal", score: 120, status: "ACTIVE" },
      { name: "Megha Kundapur", college: "COEP Technological University", score: 115, status: "ACTIVE" },
    ];
    
    // Auto-login as a secure trial candidate
    const trialUser = {
      name: "Alex Rivera",
      email: "alex.rivera@cybernet.edu",
      collegeName: "Institute of High Cybernetics",
      password: "secureUser123"
    };

    localStorage.setItem('mechCandidateName', trialUser.name);
    localStorage.setItem('mechCollegeName', trialUser.collegeName);
    localStorage.setItem('mechUserEmail', trialUser.email);
    localStorage.setItem('mechIsLoggedIn', 'true');
    localStorage.setItem('mechCurrentScore', '95');
    localStorage.setItem('mechDailyStreak', '4');
    localStorage.setItem('mechCurrentScore_alex.rivera@cybernet.edu', '95');
    localStorage.setItem('mechDailyStreak_alex.rivera@cybernet.edu', '4');
    localStorage.setItem('mechLastLoginDate_alex.rivera@cybernet.edu', new Date().toDateString());
    
    const seededRegistries = [
      ...DEFAULT_COMPETITORS,
      { name: trialUser.name, email: trialUser.email, college: trialUser.collegeName, score: 95, status: "ACTIVE" },
      { name: "Rahul Mehta", college: trialUser.collegeName, score: 75, status: "ACTIVE" },
      { name: "Ananya Sen", college: trialUser.collegeName, score: 110, status: "ACTIVE" }
    ];

    localStorage.setItem('mechRegisteredUsers', JSON.stringify(seededRegistries));
    localStorage.setItem('mechUserAccounts', JSON.stringify([
      { name: trialUser.name, email: trialUser.email, password: trialUser.password, collegeName: trialUser.collegeName }
    ]));
    localStorage.setItem('unlockedModules', JSON.stringify(['CAD', 'FEA']));
    localStorage.setItem('mechResetCompleted_v3', 'true');

    // Trigger state refreshes
    setCandidateName(trialUser.name);
    setCandidateEmail(trialUser.email);
    setCollegeName(trialUser.collegeName);
    setIsLoggedIn(true);
    setScore(95);
    setDailyStreak(4);
    setRegisteredUsers(seededRegistries);
    setLeaderboardFilter('intra');

    setDiagnosticsLogs([
      "🔄 [MOCK_TRIAL_INIT]: System completely wiped and re-initialized.",
      "🗝️ [AUTH_OK]: Securely authenticated Scholar Candidate: Alex Rivera.",
      "🎓 [COLLEGE_ROUTING]: Academic specialized college routed: Institute of High Cybernetics.",
      "🛡️ [BENCHMARK_READY]: Intra-college peers (Rahul Mehta, Ananya Sen) loaded and aligned. National competitors synchronized."
    ]);
    setDiagStatus('RESOLVED');
    setLastScanTime(new Date().toLocaleTimeString());

    alert("🎉 SUCCESS: Secure mock trial session compiled successfully! You have been logged in as a simulated student user: Alex Rivera, from Institute of High Cybernetics, starting on Day 4 with 95 Proved Points. Check out the automated peer benchmarking inside the leaderboard matrix!");
  };

  // Leaderboard state of registered users loaded from localStorage
  const [registeredUsers, setRegisteredUsers] = useState<{name: string, email?: string, college: string, score: number, status: string}[]>(() => {
    const DEFAULT_COMPETITORS = [
      { name: "Pranav Kulkarni", college: "KLE Technological University", score: 90, status: "ACTIVE" },
      { name: "Shruti Hegde", college: "IIT Bombay", score: 105, status: "ACTIVE" },
      { name: "Aniket Deshpande", college: "RV College of Engineering", score: 75, status: "STABILIZED" },
      { name: "Rohan Kamath", college: "MIT Manipal", score: 120, status: "ACTIVE" },
      { name: "Megha Kundapur", college: "COEP Technological University", score: 115, status: "ACTIVE" },
    ];
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

        // Dynamically monitor login college via Agentic AI
        if (collegeName && collegeName.trim() !== "" && collegeName !== "OFFLINE" && collegeName !== "Undecided") {
          const formattedCollege = collegeName.trim();
          const peers = updated.filter(u => u.college.toLowerCase().trim() === formattedCollege.toLowerCase() && u.name !== candidateName);
          if (peers.length === 0) {
            // Seed peer challengers for realistic Intra-College benchmarking
            updated.push({
              name: `Rahul Mehta`,
              college: formattedCollege,
              score: Math.max(30, currentScore - 20),
              status: "ACTIVE"
            });
            updated.push({
              name: `Ananya Sen`,
              college: formattedCollege,
              score: currentScore + 35,
              status: "ACTIVE"
            });
          }
        }

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
              />
            </div>
          </section>


      {/* SECTION 3: BIKES PORTFOLIO & SWAPPER */}
      <BikeGallery
        onSelectedForRide={handleSelectedForRide}
        candidateName={candidateName}
        collegeName={collegeName}
        currentScore={currentScore}
        setScore={setScore}
        activeTrackID={activeTrackID}
        setActiveTrackID={setActiveTrackID}
        dailyStreak={dailyStreak}
        setDailyStreak={setDailyStreak}
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
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-condensed text-xs text-suzuki-red tracking-[0.3em] uppercase font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-suzuki-red"></span>
                PROVING GROUND SCORES
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase leading-tight text-white mb-2">
                LIVE DUAL-GRID <span className="text-suzuki-red italic font-extrabold">LEADERBOARD MATRIX</span>
              </h2>
              <p className="text-gray-400 font-sans text-xl max-w-xl leading-relaxed">
                Real-time scholastic ranking matrix populated from active system parameters. Answering Socratic challenges boosts points in real-time.
              </p>
            </div>

            {/* Practical Real-time Scholar Score rig for direct evaluation testing */}
            <div className="bg-[#141414] border border-white/15 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono shadow-xl relative overflow-hidden w-full lg:max-w-[448px]">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500/40 animate-pulse" />
              
              <div className="space-y-2.5 flex-1">
                <span className="text-red-500 font-extrabold uppercase text-xs md:text-sm tracking-widest block">
                  🛡️ [LIVE INBOUND SCHOLAR RIG CONTROL]
                </span>

                <div className="flex flex-wrap gap-4 items-center">
                  {isLoggedIn && candidateEmail && (
                    <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                      <span className="text-zinc-300 text-xs md:text-sm font-bold block mb-1">SCHOLAR EMAIL:</span>
                      <span className="text-sm md:text-base font-bold text-white block truncate max-w-[160px]" title={candidateEmail}>
                        {candidateEmail}
                      </span>
                    </div>
                  )}
                  
                  <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                    <span className="text-zinc-300 text-xs md:text-sm font-bold block mb-1">SCHOLAR SCORE:</span>
                    <span className="text-xl md:text-3xl font-black text-yellow-400 tracking-wider">
                      {currentScore} PTS
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/60 border border-white/5 py-2.5 px-4 rounded-lg text-zinc-500 font-mono text-[10px] text-right max-w-sm shrink-0 leading-normal">
                <span className="w-2 h-2 rounded-full bg-[#e2231a] animate-ping shrink-0" />
                <span>🤖 AI DIRECT GOVERNED: Manual adjustments/bypasses are locked. Live scores represent authentic challenge completion output.</span>
              </div>

            </div>

            {/* 2-Way Filter Toggle Buttons */}
            <div className="flex gap-2 bg-[#111] p-1.5 border border-white/5 rounded">
              <button
                onClick={() => setLeaderboardFilter('intra')}
                className={`px-4 py-2 font-mono text-xs md:text-sm tracking-wider uppercase font-bold transition-all cursor-pointer ${
                  leaderboardFilter === 'intra'
                    ? 'bg-suzuki-red text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                [INTRA-COLLEGE]
              </button>
              <button
                onClick={() => setLeaderboardFilter('inter')}
                className={`px-4 py-2 font-mono text-xs md:text-sm tracking-wider uppercase font-bold transition-all cursor-pointer ${
                  leaderboardFilter === 'inter'
                    ? 'bg-suzuki-red text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                [INTER-COLLEGE // NATIONAL]
              </button>
            </div>
          </div>

          {/* Leaderboard Cyber Grid with larger fonts */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-md p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-suzuki-red/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* AGENTIC AI LIVE MONITOR CONSOLE REPORT */}
            <div className="mb-6 p-4 bg-black/50 border border-red-500/30 rounded-lg font-mono">
              <div className="flex items-center gap-2 mb-3 text-[#e2231a] text-xs font-black tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-red-650 animate-ping"></span>
                🤖 AGENTIC AI RANKING MONITOR ACTIVE
              </div>
              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold shrink-0">[DECISION_LOG]:</span>
                  <span>
                    Logged session detected for scholar <strong className="text-white">{isLoggedIn ? candidateName : "GUEST STUD"}</strong>
                    {isLoggedIn && collegeName ? (
                      <>
                        {" "}affiliated with <strong className="text-yellow-400 font-bold underline bg-yellow-500/5 px-1.5 py-0.5 rounded">{collegeName}</strong>.
                      </>
                    ) : (
                      " (offline mode)."
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold shrink-0">[MATRIX_ROUTING]:</span>
                  <span>
                    {isLoggedIn && collegeName ? (
                      <>
                        Placed candidate in <strong className="text-emerald-400">INTRA-COLLEGE GRID</strong> for active peer scoring. Checked other scholars not matches <strong className="text-[#e2231a]">{collegeName}</strong> and routed to national benchmarks in <strong className="text-yellow-400">INTER-COLLEGE MATRIX</strong>.
                      </>
                    ) : (
                      <>
                        Awaiting secure login credentials. Register or log in below to start live agentic campus routing.
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold shrink-0">[MATRIX_INTEGRITY]:</span>
                  <span>
                    Chrono counter constraint active. Study progress is managed at 1-day step intervals. Score logic secured.
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-widest text-[11px] pb-4">
                    <th className="py-3 px-4 text-sm font-bold">Rank</th>
                    <th className="py-3 px-4 text-sm font-bold">Candidate Scholar Name</th>
                    <th className="py-3 px-4 text-sm font-bold">College / Institution</th>
                    <th className="py-3 px-4 text-center text-sm font-bold">Proved Points</th>
                    <th className="py-3 px-4 text-right text-sm font-bold">Matrix Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300 text-sm">
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
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-zinc-500 font-sans">
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

                <button
                  type="button"
                  onClick={handleSecureMockTrialReset}
                  className="px-4 py-2 bg-neutral-900 border border-white/20 hover:border-[#e2231a] hover:bg-[#e2231a]/10 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🧪 SECURE STUDENT TRIAL RESET
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
                Created under the academic auspices of KLE Technological University. Proven across engineering curricula and advanced laboratory guidelines.
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
    </div>
  );
}
