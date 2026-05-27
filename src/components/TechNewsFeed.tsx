import React, { useState, useEffect } from 'react';
import { Newspaper, Terminal, Sparkles, BookOpen, Clock, Lightbulb, CheckCircle, Flame, Cpu, Shield, BrainCircuit, AlertCircle, HelpCircle } from 'lucide-react';

interface ArticleQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  significance: string;
  learnSyllabus: string;
  principles: string[];
  moduleLink: { track: 'GRADE_01' | 'GRADE_02' | 'GRADE_03'; label: string };
  imageUrl: string;
  questions: ArticleQuestion[];
}

const ARTICLES_DATA: Article[] = [
  {
    id: "starship-shield",
    title: "SpaceX Starship Orbital Heat Shield Structural Redesign",
    category: "Aerospace / Material Science",
    date: "May 25, 2026",
    author: "Dr. Elena Rostov, Materials Director",
    summary: "SpaceX has initiated a major mechanical redesign of the Starship thermal protection mechanism. The existing individual hexagonal silica tiles are being reinforced with vacuum-formed silicon-carbide composite sheets. This transition prevents tile shedding caused by heavy shear stresses and aerodynamic thermal-expansion shear forces during high-energy atmospheric re-entry at Mach 25.",
    significance: "This solution demonstrates critical stress-equilibrium engineering. Under high temperature gradients (from 1800K face down to 350K alloy backing), standard mechanical fasteners suffer differential thermal expansion. Combining these tiles into monolithic structural layers redistributes localized shearing strains drag and keeps backing alloys under active safety tension thresholds.",
    learnSyllabus: "Study the AMSM track (Advanced Material & Structural Mechanics) or SOM (Strength of Materials). Specifically, focus on thermal stress equations, Hooke's Poisson coefficients, and thermal expansion matching (α₁ • ΔT = α₂ • ΔT) inside thick multi-layer materials.",
    principles: ["Thermal Stress Equations", "Elastic Expansion Coefficient", "Shear Deformation Force", "Symmetric Heat Transfer"],
    moduleLink: { track: "GRADE_02", label: "AMSM Section (Advanced Structural)" },
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
    questions: [
      {
        question: "What material technology is SpaceX adopting to reinforce Starship's heat shield against Mach 25 thermal shear stresses?",
        options: [
          "Hydraulic manganese plungers",
          "Vacuum-formed silicon-carbide composite sheets",
          "Copper-clad superalloys",
          "Monolithic liquid plastic binders"
        ],
        correctIndex: 1,
        explanation: "The article specifies that individual hexagonal silica tiles are reinforced with vacuum-formed silicon-carbide composite sheets to resist localized shearing strains and thermal shear stresses during Mach 25 re-entry."
      },
      {
        question: "Why do standard mechanical fasteners fail under large temperature gradients during atmospheric re-entry?",
        options: [
          "They trigger severe epicyclic gear ratios",
          "They suffer from differential thermal expansion between the outer facing material and the metal backing matrix",
          "They cause a massive drop in Superconductivity Lorentz forces",
          "They form near-sonic convergent-divergent fluid boundaries"
        ],
        correctIndex: 1,
        explanation: "Extreme temperature differences induce differential thermal expansion across layers, causing classical shearing strains that can sheer off individual fasteners unless uniform tension distribution is established."
      }
    ]
  },
  {
    id: "atlas-electric",
    title: "Boston Dynamics Next-Gen Electric Atlas Actuator Transition",
    category: "Robotics / Machine Elements",
    date: "May 18, 2026",
    author: "Julian Vance, Biorobotics Lead Researcher",
    summary: "Boston Dynamics officially retired its legendary hydraulic-manifold Atlas humanoid to introduce a fully electric version. The new mechanical core employs custom high-torque brushless motors paired with compact, integrated harmonic drives. This results in unprecedented power density and 360-degree rotational mobility at all joint clusters.",
    significance: "This marks a massive paradigm shift in kinetic machine design. Hydraulics offer superior force holding but suffer from continuous fluid drag and fluid leaks. The electric transition utilizes advanced gear optimization where rotary momentum is converted directly with minimum play, eliminating oil-fluid compression lag and damping torsional vibration harmonics.",
    learnSyllabus: "Connect this breakthrough to DOM (Dynamics of Machinery) and DME (Design of Machine Elements). Key subjects include epicyclic/harmonic gear ratio kinetics, torque-speed curves, radial bearing fatigue coefficients, and rotor torsional vibration frequency analysis.",
    principles: ["Harmonic Drive Kinematics", "Torsional Resonance Speed", "Epicyclic Gear Ratios", "Dynamic Friction Damping"],
    moduleLink: { track: "GRADE_01", label: "DOM Section (Dynamics of Machinery)" },
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    questions: [
      {
        question: "Which high-torque layout has replaced hydraulics in the humanoid joints of the next-generation Atlas robot mechanical core?",
        options: [
          "High-torque brushless motors paired with compact integrated harmonic drives",
          "Evacuated pipeline vacuum conduits",
          "Silicon-anode thin pressure canisters",
          "Pneumatic air compressibility rotors"
        ],
        correctIndex: 0,
        explanation: "The electric Atlas leverages custom brushless motors integrated directly with harmonic gear units to achieve exceptional structural leverage, high torque density, and zero backlash."
      },
      {
        question: "What physical loss, typical of traditional oil manifolds, is completely avoided by switching to an all-electric actuator gear core?",
        options: [
          "High thermal expansion matching coefficients",
          "Continuous oil fluid leaks, internal fluid drag, and oil compression lag",
          "Thin hoop vessel tensile buckling parameters",
          "Compressible gas flow chokes"
        ],
        correctIndex: 1,
        explanation: "Hydraulic actuators suffer from physical viscosity friction, fluid leaks, and compression elasticity, which are eliminated through direct high-torque electromechanical rotary transmission."
      }
    ]
  },
  {
    id: "iter-magnets",
    title: "ITER Fusion Toroidal Field Coil Structural Realignment",
    category: "Nuclear Systems / Heavy Machinery",
    date: "May 10, 2026",
    author: "Prof. Charles Vance, Fusion Engineering Lab",
    summary: "At the International Thermonuclear Experimental Reactor (ITER), technicians completed a high-precision realignment of the D-shaped superconducting toroidal field coils. The massive magnets must be aligned within an ultra-fine structural tolerance of ±0.2 mm across the 15-meter circular frame to resist crushing Lorentz forces during plasma compression cycles.",
    significance: "When magnetic coils carry 68,000 Amperes, they create immense inward load forces. If magnet housings have even microscopic angular misalignments, uneven shear force distributions can trigger structural buckling. Advanced finite element calculation ensures that the D-shape keeps the internal steel casing under uniform pure tensile stress.",
    learnSyllabus: "This applies directly to AMSM (Advanced Material & Structural Mechanics). Study elastic buckling limits, structural load vectors, shear stress tensors, and Finite Element Analysis (FEA) grid boundaries.",
    principles: ["Superconductivity Lorentz Load", "Symmetric Buckling Limits", "Tensile Stress Equilibrium", "Angular Strain Margin"],
    moduleLink: { track: "GRADE_02", label: "AMSM Section (Finite Element)" },
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&q=80",
    questions: [
      {
        question: "To prevent localized shearing and buckling from high Lorentz loading, within what tolerance must ITER toroidal coils be aligned?",
        options: [
          "Within a loose tolerance of ±10 cm",
          "Within an ultra-fine critical margin of ±0.2 mm",
          "Within a ±300 mm radial buffer",
          "No specific mathematical tolerance is calculated"
        ],
        correctIndex: 1,
        explanation: "The article highlights that superconducting magnets must be centered within a critical mathematical tolerance of ±0.2 mm to guard against asymmetric shear forces."
      },
      {
        question: "How does the specific symmetric D-shape geometry preserve structural integrity under the massive 68,000 Amperes plasma compression?",
        options: [
          "It forces the surrounding steel support casing to be loaded under uniform pure tensile stress",
          "It maximizes heat release to standard silica hexagon tiles",
          "It initiates convergent-divergent bypass nozzle chokes",
          "It permits continuous volumetric expansion up to 300%"
        ],
        correctIndex: 0,
        explanation: "A D-shaped profile is mathematically calculated to equilibrate radial electromagnetic fields, utilizing structural tension instead of severe bending moments in the support housing."
      }
    ]
  },
  {
    id: "solid-state",
    title: "Canister Stress Ruptures in Electric Solid-State Battery Flight",
    category: "Mechanical Design / EV Propulsion",
    date: "May 02, 2026",
    author: "Aisha Gunter, EV Battery Integrity Group",
    summary: "Electric aerospace developers have warned that high-capacity silicon-anode solid-state batteries are showing premature canister casing ruptures. High current discharge causes the solid silicon anodes to expand volumetrically by up to 300%, creating extreme physical pressure against the surrounding metal canister shells during standard flights.",
    significance: "The battery canister acts exactly like a micro high-pressure steam vessel. Volumetric material swelling translates to continuous internal hydrostatic-like pressure, inducing high hoop (tangential) and longitudinal stresses in the canister wall. Designers must optimize wall thickness and weld profiles to prevent catastrophic fatigue failure.",
    learnSyllabus: "This is a perfect real-world application of SOM (Strength of Materials) and DME (Design of Machine Elements). Master thin/thick pressure vessel formulas (Hoop Stress σ = P•D / 2t) and elastic fatigue calculation parameters.",
    principles: ["Thin Pressure Vessel Stress", "Anode Volumetric Swelling", "Canister Hoop Stress Limit", "Elastic Yield Creep Curve"],
    moduleLink: { track: "GRADE_03", label: "SOM Section (Canister Stresses)" },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    questions: [
      {
        question: "Exactly how much volumetric expansion do high-capacity silicon anodes undergo under high current discharge?",
        options: [
          "Up to 10%",
          "Up to 50%",
          "Up to 300%",
          "Minimal expansion (less than 2%)"
        ],
        correctIndex: 2,
        explanation: "According to the industrial report, silicon anodes expand by up to 300% during operation, creating significant hydrostatic-like swelling limits in containment canisters."
      },
      {
        question: "Which classical Strength of Materials formulation determines the safety index of the battery canister under anode volumetric swelling?",
        options: [
          "Continuous fluid drag coefficient equation",
          "Superconductivity Lorentz tensile factor",
          "Hoop stress in a thin pressure vessel (σ = P•D / 2t)",
          "Epicyclic gear ratio velocity curves"
        ],
        correctIndex: 2,
        explanation: "The battery casing acts much like a classic localized pressure vessel, where hoop (tangential) stress equations dictate casing thickness and micro welding fatigue barriers."
      }
    ]
  },
  {
    id: "hyperloop-flow",
    title: "Near-Sonic Flow Choke in Low-Pressure Evacuated Wave Conduits",
    category: "Fluid Mechanics / Transit Systems",
    date: "April 24, 2026",
    author: "Marcello Moretti, Aerodynamics Consultant",
    summary: "Hyperloop transit trials revealed critical flow choke formations inside transit tubes. As pods accelerate past Mach 0.8 inside the narrow reduced-pressure steel tube, the restricted bypass flow area around the vehicle induces a natural convergent-divergent nozzle effect, leading to shockwave drag and flow choke limits.",
    significance: "When fluid velocity reaches Mach 1.0 at the minimum cross-section around the pod (flow throat), the flow chokes, which mathematically locks the mass flow rate. The resulting high pressure spike ahead of the pod forms a shock wave barrier, dramatically decreasing system energy efficiency and forcing active exhaust duct bypasses.",
    learnSyllabus: "This is the ultimate study of FMM (Fluid Mechanics & Machinery) and FM (Fluid Mechanics). Focus on continuity equations, Bernoulli's pressure gradient, convergent-divergent supersonic flow nozzle characteristics, and Mach number dynamics.",
    principles: ["Compressible Flow Choke", "Convergent-Divergent Nozzle", "Sonic Mach Wave Boundary", "Mass Flow Rate Lockout"],
    moduleLink: { track: "GRADE_01", label: "FMM Section (Pipeline Flow)" },
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
    questions: [
      {
        question: "What aerodynamic phenomenon occurs when restricted bypass fluid speeds reach Mach 1.0 around a fast transit pod?",
        options: [
          "Magnetic field leakage",
          "Compressible flow choking which mathematically locks mass flow rates",
          "Instantaneous epicyclic gear slip",
          "Tensile stress equilibrium reversal"
        ],
        correctIndex: 1,
        explanation: "When fluid speeds reach Mach 1.0 at the minimum cross-section, the flow chokes, limiting further mass flow and causing highly energy-depleting pressure shock waves ahead."
      },
      {
        question: "What physical geometry is formed unintentionally around the pod as it accelerates past Mach 0.8 in the narrow Hyperloop conduit?",
        options: [
          "A monolithic silicon-carbide composite facing",
          "An integrated superconducting Lorentz loop",
          "A convergent-divergent nozzle profile",
          "A hydraulic fluid compressor joint"
        ],
        correctIndex: 2,
        explanation: "The restricted bypass boundary surrounding the pods behaves as an active convergent-divergent nozzle throat, setting off supersonic shockwave limits and choked mass flow rates."
      }
    ]
  }
];

interface TechNewsFeedProps {
  currentScore?: number;
  setScore?: React.Dispatch<React.SetStateAction<number>>;
  dailyStreak?: number;
  setDailyStreak?: React.Dispatch<React.SetStateAction<number>>;
}

export default function TechNewsFeed({
  currentScore = 0,
  setScore,
  dailyStreak = 1,
  setDailyStreak,
}: TechNewsFeedProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(ARTICLES_DATA[0]);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{[key: string]: { correct: boolean; answered: boolean }}>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechNewsAnswered');
      if (saved) {
        setSubmittedAnswers(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnswerSubmit = (articleId: string, qIndex: number, correctIndex: number) => {
    const key = `${articleId}_${qIndex}`;
    const chosenIndex = selectedAnswers[key];
    if (chosenIndex === undefined) return;

    const isCorrect = chosenIndex === correctIndex;
    const newSubmissions = {
      ...submittedAnswers,
      [key]: { correct: isCorrect, answered: true }
    };

    setSubmittedAnswers(newSubmissions);
    localStorage.setItem('mechNewsAnswered', JSON.stringify(newSubmissions));

    if (isCorrect) {
      // Award +2 points!
      if (setScore) {
        setScore(prev => {
          const next = prev + 2;
          localStorage.setItem('mechCurrentScore', next.toString());
          try {
            const saved = localStorage.getItem('mechRegisteredUsers');
            if (saved) {
              const users = JSON.parse(saved);
              const name = localStorage.getItem('mechCandidateName') || 'Guest Candidate';
              const updated = users.map((u: any) => {
                if (u.name.toLowerCase().trim() === name.toLowerCase().trim()) {
                  return { ...u, score: next };
                }
                return u;
              });
              localStorage.setItem('mechRegisteredUsers', JSON.stringify(updated));
            }
          } catch (e) {}
          return next;
        });
      }

      // Update Daily Streak also!
      if (setDailyStreak) {
        setDailyStreak(prev => {
          const next = prev + 1;
          localStorage.setItem('mechDailyStreak', next.toString());
          return next;
        });
      }
    }
  };

  const filteredArticles = ARTICLES_DATA.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerMockAiAnalysis = (art: Article) => {
    setLoadingAi(true);
    setAiAnalysisResult('');
    
    // Smooth technical progression terminal text animation simulation (feels incredibly premium, high visual quality)
    setTimeout(() => {
      setLoadingAi(false);
      setAiAnalysisResult(`
⚡ MECHFORGE AI COPILOT DIRECT DIAGNOSTIC DISPATCH ⚡
===============================================
[ANALYSIS TOPIC]: ${art.title}
[ESTABLISHED PARADIGM]: ${art.category}
===============================================

1. MATH MODEL ANALYSIS:
   The physical challenge described relates to ${art.principles[0]} and ${art.principles[2]}. 
   We evaluate this system using standard engineering stress mechanics. Under steady-state load:
   
   • Physical Stress Tensor: σ_ij = C_ijkl * ε_kl
   • Dynamic Volumetric Distortion: dV/V = P_int / B (where B is thermal modulus)
   
   This explains why the issue has a direct structural relationship with standard classroom equations.

2. HOW TO STUDY THIS Break-through:
   To truly master this technology, candidates should focus on the following core academic syllabus areas:
   
   • Path A: ${art.learnSyllabus}
   • Path B: Explore the corresponding ${art.moduleLink.label} within the MechForge dashboard.
   
3. CRITICAL TAKEAWAY FOR YOUR CAREER:
   "Modern technologies do not replace fundamental mechanics—they expand them. Superconducting magnets, spacecraft engines, and bipedal speed governors rely fundamentally on classical stress mechanics, fluid drag vectors, and thermodynamics bounds."
      `);
    }, 1800);
  };

  return (
    <div className="space-y-12">
      {/* Intro details */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="font-mono text-xs text-suzuki-red tracking-[0.3em] uppercase font-bold flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-suzuki-red"></span>
            REPLACING PASSIVE CYCLES // THE EMERGE SYSTEM
          </div>
          <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase text-white">
            ENGINEERING TECH <span className="text-suzuki-red">PULSE FEED</span>
          </h2>
          <p className="text-gray-400 text-sm font-sans mt-2 max-w-2xl">
            Syllabus-connected emerging technologies and heavy industry updates. Curated daily, detailed, and directly linked to your academic tracks to clarify physical real-world significance.
          </p>
        </div>
        
        {/* Search input styled beautifully */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search emerging techs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border border-white/10 hover:border-white/25 focus:border-[#e2231a] focus:ring-1 focus:ring-[#e2231a] px-4 py-2.5 rounded font-mono text-xs text-white placeholder-zinc-500 w-full md:w-64 outline-none transition-all"
          />
          <Newspaper size={14} className="absolute right-3.5 top-3.5 text-zinc-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Articles List (Left 5 cols) */}
        <div className="lg:col-span-5 space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 border border-white/5 bg-zinc-900/20 rounded font-mono text-sm">
              📂 No matching articles found matching search criteria.
            </div>
          ) : (
            filteredArticles.map(art => {
              const isActive = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => {
                    setSelectedArticle(art);
                    setAiAnalysisResult('');
                  }}
                  className={`p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isActive 
                      ? "bg-zinc-900 border-suzuki-red shadow-lg scale-[1.01]" 
                      : "bg-[#0c0c0c] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className={`absolute top-0 left-0 h-full w-[3px] transition-all ${isActive ? "bg-suzuki-red" : "bg-transparent"}`} />
                  
                  <div className="flex justify-between items-center text-sm font-mono mb-2 text-zinc-500">
                    <span className="text-[#e2231a] font-bold uppercase tracking-wider">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  
                  <h4 className="font-bebas text-3xl text-zinc-100 tracking-wide mb-1.5 group-hover:text-suzuki-red transition-all">
                    {art.title}
                  </h4>
                  
                  <p className="text-sm text-zinc-400 font-sans line-clamp-2 leading-relaxed font-medium">
                    {art.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {art.principles.slice(0, 2).map((p, i) => (
                      <span key={i} className="text-sm bg-white/5 border border-white/5 text-zinc-400 px-2 py-0.5 rounded font-mono">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Article Detail & AI Dashboard (Right 7 cols) */}
        <div className="lg:col-span-7">
          {selectedArticle ? (
            <div className="bg-[#0e0e0e] border border-white/15 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[4px] bg-suzuki-red" />
              
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="px-3 py-1 bg-suzuki-red/15 text-suzuki-red border border-suzuki-red/20 font-bold rounded">
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
                    <Clock size={11} />
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>
                
                <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wider leading-none">
                  {selectedArticle.title}
                </h3>
                
                <div className="text-xs font-mono text-zinc-500">
                  By <span className="text-zinc-300 font-bold">{selectedArticle.author}</span>
                </div>
              </div>

              {/* Decorative Unsplash background image of high technical value */}
              <div className="relative aspect-[16/6] w-full rounded-lg overflow-hidden border border-white/5 bg-black">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover grayscale opacity-40 hover:opacity-85 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>

              {/* Core summary */}
              <div className="space-y-4">
                <div className="text-base text-zinc-300 font-sans leading-relaxed">
                  <p className="font-sans leading-relaxed text-base">{selectedArticle.summary}</p>
                </div>

                {/* Significance Section */}
                <div className="p-5 bg-black/40 border border-[#e2231a]/10 rounded-lg space-y-2">
                  <span className="text-[#e2231a] text-xs font-mono tracking-wider font-extrabold flex items-center gap-2">
                    <Lightbulb size={13} className="text-[#e2231a] shrink-0" />
                    🌐 ENGINEERING SIGNIFICANCE CHECK:
                  </span>
                  <p className="text-zinc-300 text-sm font-sans leading-relaxed">
                    {selectedArticle.significance}
                  </p>
                </div>

                {/* Study connection section */}
                <div className="p-5 bg-emerald-950/10 border border-emerald-500/10 rounded-lg space-y-2">
                  <span className="text-emerald-400 text-xs font-mono tracking-wider font-extrabold flex items-center gap-2">
                    <BookOpen size={13} className="text-emerald-400 shrink-0" />
                    🎓 HOW YOU CAN LEARN THIS FROM YOUR SYLLABUS:
                  </span>
                  <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                    {selectedArticle.learnSyllabus}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-zinc-500 font-mono">🎯 Link to Active track: </span>
                    <span className="text-xs bg-zinc-900 border border-zinc-800 text-white font-mono font-bold px-2 py-0.5 rounded ml-1">
                      {selectedArticle.moduleLink.track.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Core principles tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {selectedArticle.principles.map((pr, i) => (
                  <span key={i} className="text-xs bg-white/5 border border-white/5 hover:border-[#e2231a]/30 text-zinc-400 px-2.5 py-1 rounded font-mono">
                     {pr}
                  </span>
                ))}
              </div>


              {/* Active AI analysis button section */}
              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs font-mono text-zinc-500 max-w-sm">
                  Let the MechForge AI Copilot evaluate the math-model parameters of this breakthrough instantly.
                </span>
                
                <button
                  onClick={() => triggerMockAiAnalysis(selectedArticle)}
                  disabled={loadingAi}
                  className="bg-[#e2231a] hover:bg-neutral-900 border border-red-600 hover:border-white/30 text-white font-condensed font-extrabold px-6 py-3 tracking-widest text-xs uppercase cursor-pointer rounded transition-all flex items-center justify-center gap-2"
                >
                  {loadingAi ? (
                    <>
                      <Sparkles className="animate-spin text-white" size={13} />
                      SYNCHRONIZING AI DIAGNOSTIC FILE...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      [ACTIVATE AI SYSTEM INSIGHTS]
                    </>
                  )}
                </button>
              </div>

              {/* AI result terminal display */}
              {(loadingAi || aiAnalysisResult) && (
                <div className="bg-black border border-white/10 rounded-lg p-5 font-mono text-sm text-emerald-400 space-y-2 max-h-[300px] overflow-y-auto animate-fadeIn select-all">
                  {loadingAi ? (
                    <div className="flex flex-col gap-2">
                       <span className="text-zinc-500 blink">{`$ mechforge-copilot --analyze "${selectedArticle.id}"`}</span>
                      <span className="text-zinc-500">Connecting to Google DeepMind Gemini-3.5-flash engine...</span>
                      <span className="text-yellow-500 animate-pulse">Initializing token context paths. Building schematic calculations...</span>
                      <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden">
                        <div className="bg-emerald-400 h-full w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap leading-normal font-mono">{aiAnalysisResult}</pre>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-12 text-center text-zinc-500 font-mono text-sm">
              <Newspaper className="mx-auto text-zinc-600 mb-2" size={32} />
              Please select an emerging tech news story from the left feed list to start exploring its thermodynamic and mechanical engineering significance.
            </div>
          )}
        </div>
      </div>

      {/* Syllabus-Connected Interactive Questionnaire Section (Horizontal Landscape View) */}
      {selectedArticle && (
        <div id="syllabus-compliance-challenge-section" className="mt-8 bg-[#0c0c0c] border border-white/15 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#e2231a] via-transparent to-[#e2231a]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <HelpCircle size={26} className="text-[#e2231a]" />
                <h4 className="font-bebas text-4xl tracking-wider text-white">SYLLABUS COMPLIANCE CHALLENGE</h4>
              </div>
              <p className="text-base text-zinc-300 font-sans leading-relaxed">
                Read the industry breakdown above completely and resolve the key engineering diagnostics. 
                <span className="text-[#e2231a] font-bold"> Earn +2 Score Points and increment your Streak</span> for every correct answer!
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-sm text-[#e2231a]">
              <span className="font-bold">[STREAK ACCELERATOR ACTIVE]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedArticle.questions && selectedArticle.questions.map((q, qIdx) => {
              const key = `${selectedArticle.id}_${qIdx}`;
              const hasAnswered = submittedAnswers[key]?.answered;
              const isCorrectAnswer = submittedAnswers[key]?.correct;
              const chosenOptionIdx = selectedAnswers[key];

              return (
                <div key={qIdx} className="p-6 bg-zinc-950/60 border border-white/5 rounded-lg space-y-5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-mono text-base text-[#e2231a] font-bold uppercase shrink-0">
                        QUESTION 0{qIdx + 1}:
                      </span>
                      <p className="font-sans text-xl text-zinc-100 leading-relaxed font-bold flex-1">
                        {q.question}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const worksAsChosen = chosenOptionIdx === optIdx;
                        const isOptionCorrect = optIdx === q.correctIndex;
                        let btnClass = "bg-black/30 border border-white/10 text-zinc-300 hover:bg-zinc-850/45 hover:text-white";
                        
                        if (hasAnswered) {
                          if (isOptionCorrect) {
                            btnClass = "bg-emerald-950/30 border-emerald-500/50 text-emerald-300";
                          } else if (worksAsChosen) {
                            btnClass = "bg-rose-950/30 border-rose-500/50 text-rose-300";
                          } else {
                            btnClass = "bg-black/10 border-white/5 text-zinc-600 opacity-60";
                          }
                        } else if (worksAsChosen) {
                          btnClass = "bg-[#e2231a]/15 border-[#e2231a]/70 text-white shadow-[#e2231a]/5";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasAnswered}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [key]: optIdx }))}
                            className={`p-4 rounded-md text-base text-left font-sans transition-all flex items-center gap-3 w-full ${btnClass} ${!hasAnswered ? "cursor-pointer" : "cursor-not-allowed"}`}
                          >
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                              worksAsChosen ? "bg-[#e2231a] text-white border-white" : "border-zinc-500 text-zinc-400"
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4">
                    {!hasAnswered ? (
                      <div className="flex justify-end">
                        <button
                          disabled={chosenOptionIdx === undefined}
                          onClick={() => handleAnswerSubmit(selectedArticle.id, qIdx, q.correctIndex)}
                          className={`px-6 py-2.5 font-mono text-xs tracking-widest uppercase rounded transition-all flex items-center gap-2 font-bold ${
                            chosenOptionIdx !== undefined
                              ? "bg-[#e2231a] text-white hover:bg-red-700 cursor-pointer shadow-md shadow-[#e2231a]/10"
                              : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-white/5"
                          }`}
                        >
                          SUBMIT SCHOLASTIC ANSWER
                        </button>
                      </div>
                    ) : (
                      <div className={`p-4 rounded-md space-y-2 font-sans mt-3 text-base flex items-start gap-3 ${
                        isCorrectAnswer ? "bg-emerald-950/25 border border-emerald-500/10 text-emerald-400" : "bg-rose-950/25 border border-[#e2231a]/10 text-rose-400"
                      }`}>
                        <div className="shrink-0 mt-0.5">
                          {isCorrectAnswer ? (
                            <CheckCircle size={19} className="text-emerald-400" />
                          ) : (
                            <AlertCircle size={19} className="text-[#e2231a]" />
                          )}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="font-bold flex items-center gap-2 flex-wrap text-base">
                            <span>{isCorrectAnswer ? "SCHOLASTIC VERIFY: LOGIC CORRECT!" : "DIAGNOSIS INACCURATE"}</span>
                            <span className="text-xs bg-zinc-950 border border-white/10 font-mono font-medium px-2 py-0.5 rounded text-white inline-block">
                              {isCorrectAnswer ? "+2 Points Issued // Streak Boosted" : "Points Locked"}
                            </span>
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed font-sans mt-1">
                            <strong className="text-zinc-200 font-mono text-xs uppercase mr-1">[ACADEMIC FEEDBACK]:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
