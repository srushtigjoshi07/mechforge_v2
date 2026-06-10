import React, { useState } from 'react';
import { Award, Lock, Unlock, Shield, Filter, Star, Sparkles, BookOpen } from 'lucide-react';

interface BadgeDefinition {
  id: string;
  name: string;
  sourceModuleId: string;
  grade: 'GRADE_01' | 'GRADE_02' | 'GRADE_03';
  title: string;
  description: string;
  unlockedCriteria: string;
  themeColor: string; // Tailwind tint
  icon: React.ComponentType<any>;
}

const ALL_SYSTEM_BADGES: BadgeDefinition[] = [
  // Grade 1: Core University
  {
    id: "g1_fmm",
    name: "FMD ELITE",
    sourceModuleId: "g1_fmm",
    grade: "GRADE_01",
    title: "Fluid Mechanics Master",
    description: "Demonstrates standard mastery of fluid dynamics, pipeline head-losses, and pump kinetic speed calculations.",
    unlockedCriteria: "Achieve perfect accuracy in G1 Fluid Mechanics workbook tasks.",
    themeColor: "from-blue-600/20 to-cyan-600/10 border-blue-500/30 text-blue-400",
    icon: Shield
  },
  {
    id: "g1_dom",
    name: "MACHINES ELITE",
    sourceModuleId: "g1_dom",
    grade: "GRADE_01",
    title: "Dynamics of Machinery Pro",
    description: "Awarded for resolving complex rotational balancing forces, planetary epicyclic gear, and dynamic mechanical linkages.",
    unlockedCriteria: "Conquer the designated G1 DOM assessment.",
    themeColor: "from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400",
    icon: Award
  },
  {
    id: "g1_tof",
    name: "THERMAL ELITE",
    sourceModuleId: "g1_tof",
    grade: "GRADE_01",
    title: "Thermal Sciences Scholar",
    description: "Assessing complete thermodynamic cycles, heat energy flux, and steady boundary state cooling.",
    unlockedCriteria: "Solve the entire progression of G1 Thermal Science questions.",
    themeColor: "from-orange-600/20 to-red-600/10 border-orange-500/30 text-orange-400",
    icon: Star
  },
  {
    id: "g1_mts",
    name: "MOM ELITE",
    sourceModuleId: "g1_mts",
    grade: "GRADE_01",
    title: "Mechanics of Materials Ace",
    description: "Requires advanced strain tensors, composite shear, and localized buckling calculations under eccentric axial loading.",
    unlockedCriteria: "Submit correct analytical formulas in Mechanics of Materials modules.",
    themeColor: "from-purple-600/20 to-indigo-600/10 border-purple-500/30 text-purple-400",
    icon: BookOpen
  },
  // Grade 2: Analytical Sprint
  {
    id: "g2_amsm",
    name: "AMSM MASTER",
    sourceModuleId: "g2_amsm",
    grade: "GRADE_02",
    title: "Advanced Structural Mechanics",
    description: "Requires solving thermal stress equations and anisotropic Hooke's matrices within thick pressure vessels.",
    unlockedCriteria: "Graduate from the intensive level-2 Advanced Material & Structural Mechanics modules.",
    themeColor: "from-yellow-600/20 to-amber-600/10 border-yellow-500/30 text-yellow-500",
    icon: Sparkles
  },
  {
    id: "g2_atst",
    name: "THERMO MASTER",
    sourceModuleId: "g2_atst",
    grade: "GRADE_02",
    title: "Applied Thermal Sciences",
    description: "Requires optimizing regenerative Rankine layouts, combustion enthalpies, and nozzle choked flow thresholds.",
    unlockedCriteria: "Successfully traverse Grade 2 Applied Thermo & Systems modules.",
    themeColor: "from-rose-600/20 to-pink-600/10 border-rose-500/30 text-rose-400",
    icon: Star
  },
  {
    id: "g2_acs",
    name: "ACS MASTER",
    sourceModuleId: "g2_acs",
    grade: "GRADE_02",
    title: "Control System Guru",
    description: "Earned by analyzing high-order feedback stability, Root-Locus dampening ratios, and state space matrices.",
    unlockedCriteria: "Master G2 Control Systems curriculum tracks completely.",
    themeColor: "from-sky-600/20 to-sky-400/10 border-sky-500/30 text-sky-400",
    icon: Shield
  },
  {
    id: "g2_feg",
    name: "FEG MASTER",
    sourceModuleId: "g2_feg",
    grade: "GRADE_02",
    title: "Engineering Geology Master",
    description: "Solving heavy geostructural stress equilibria, slip planes, and tectonic load redistributions.",
    unlockedCriteria: "Acquire full proficiency in Grade 2 Structural Geology workbook modules.",
    themeColor: "from-green-600/20 to-emerald-500/10 border-green-500/30 text-green-400",
    icon: BookOpen
  },
  // Grade 3: Placement Exams
  {
    id: "g3_som",
    name: "SOM CHAMP",
    sourceModuleId: "g3_som",
    grade: "GRADE_03",
    title: "Strength of Materials Titan",
    description: "Concurring shear deformation, elastic strain energy, and non-symmetric Euler load limits under test environments.",
    unlockedCriteria: "Pass Grade 3 ultimate SOM exam modules successfully.",
    themeColor: "from-amber-600/20 to-rose-600/10 border-amber-500/40 text-amber-500",
    icon: Award
  },
  {
    id: "g3_fm",
    name: "FLUIDS CHAMP",
    sourceModuleId: "g3_fm",
    grade: "GRADE_03",
    title: "Advanced Fluids Champion",
    description: "Evaluated on sub-sonic/supersonic compressible boundary flight, shock propagation, and Navier-Stokes limits.",
    unlockedCriteria: "Clear structural fluid assessment limits in Grade 3 advanced pipeline modules.",
    themeColor: "from-cyan-600/20 to-blue-600/10 border-cyan-500/30 text-cyan-400",
    icon: Sparkles
  },
  {
    id: "g3_dme",
    name: "DESIGN CHAMP",
    sourceModuleId: "g3_dme",
    grade: "GRADE_03",
    title: "Machine Elements Elite",
    description: "Requires advanced calculations of fatigue endurance, stress concentration factors, and bearing wear lifespans.",
    unlockedCriteria: "Obtain high compliance ratings inside G3 Design of Machine Elements.",
    themeColor: "from-violet-600/20 to-fuchsia-600/10 border-violet-500/30 text-violet-400",
    icon: Shield
  },
  {
    id: "g3_at",
    name: "THERMAL CHAMP",
    sourceModuleId: "g3_at",
    grade: "GRADE_03",
    title: "Total Thermal Champion",
    description: "Unlocked by mapping complex radiant transfer geometry parameters, view factors, and non-steady boundary conduction.",
    unlockedCriteria: "Pass Grade 3 core thermal dynamics placement mock drills.",
    themeColor: "from-red-600/20 to-orange-500/10 border-red-500/30 text-red-400",
    icon: Star
  },
  {
    id: "g3_tvt",
    name: "TURBO CHAMP",
    sourceModuleId: "g3_tvt",
    grade: "GRADE_03",
    title: "Turbomachinery Specialist",
    description: "Conquering multi-stage reaction blade angles, Euler turbine formulations, and high-energy hydraulic cavitation limits.",
    unlockedCriteria: "Pass designated industrial Grade 3 turbomachinery exams.",
    themeColor: "from-lime-600/20 to-teal-600/10 border-lime-500/35 text-lime-400",
    icon: Award
  },
  {
    id: "g3_cgd",
    name: "GAS DY CHAMP",
    sourceModuleId: "g3_cgd",
    grade: "GRADE_03",
    title: "Gas Dynamics Professional",
    description: "Requires deep thermodynamic expertise in supersonic Rayleigh flow, Fanno friction parameters, and Prandtl-Meyer expansions.",
    unlockedCriteria: "Complete extreme challenge sets inside Grade 3 supersonic flow modules.",
    themeColor: "from-emerald-700/20 to-blue-700/10 border-emerald-600/35 text-emerald-400",
    icon: Sparkles
  }
];

interface BadgeInventoryProps {
  earnedBadges: string[];
}

export default function BadgeInventory({ earnedBadges }: BadgeInventoryProps) {
  const [filter, setFilter] = useState<'ALL' | 'EARNED' | 'LOCKED'>('ALL');
  const [gradeFilter, setGradeFilter] = useState<'ALL' | 'GRADE_01' | 'GRADE_02' | 'GRADE_03'>('ALL');
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const displayedBadges = ALL_SYSTEM_BADGES.filter(badge => {
    const isEarned = earnedBadges.includes(badge.name);
    
    // Status Filter Matches
    let matchesStatus = true;
    if (filter === 'EARNED') matchesStatus = isEarned;
    if (filter === 'LOCKED') matchesStatus = !isEarned;

    // Grade Filter Matches
    let matchesGrade = true;
    if (gradeFilter !== 'ALL') matchesGrade = badge.grade === gradeFilter;

    return matchesStatus && matchesGrade;
  });

  const earnedCount = ALL_SYSTEM_BADGES.filter(b => earnedBadges.includes(b.name)).length;
  const progressPercent = Math.round((earnedCount / ALL_SYSTEM_BADGES.length) * 100);

  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-500 via-[#e2231a] to-yellow-500" />
      <div className="absolute -right-16 -top-16 w-44 h-44 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Matrix */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_#facc15]" />
            <span className="font-mono text-xs uppercase font-black tracking-[0.25em] text-yellow-300">[STATE_02] // BADGE_INVENTORY_ROOT</span>
          </div>
          <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-widest uppercase font-black mt-1">
            SCHOLASTIC SCHOLAR INSIGNIAS
          </h3>
          <p className="text-sm md:text-base text-zinc-200 font-sans max-w-xl leading-relaxed">
            Live digital database tracking your certified capabilities. Solve 21 intensive curriculum modules within their designated countdown timeline to weld insignia badges to your academic record.
          </p>
        </div>

        {/* Mini progress tracker */}
        <div className="bg-neutral-900/60 p-3.5 rounded border border-white/10 space-y-2 font-mono text-sm w-full md:w-52 shrink-0">
          <div className="flex justify-between text-xs text-zinc-100 font-bold">
            <span>UNLOCKED STATUS:</span>
            <span className="text-yellow-300 font-extrabold">{earnedCount} / {ALL_SYSTEM_BADGES.length}</span>
          </div>
          <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-right text-[10px] text-zinc-300 font-bold tracking-wider">
            {progressPercent}% COMPLETE
          </div>
        </div>
      </div>

      {/* Filter Tabs & Controllers */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-zinc-950/40 p-4 rounded-lg border border-white/5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Filter Toggle */}
          <div className="space-y-1.5">
            <span className="font-mono text-xs text-zinc-200 uppercase font-black tracking-wider block">Verify Verification:</span>
            <div className="flex gap-1.5 bg-black/50 p-1 border border-white/5 rounded">
              {([
                { key: 'ALL', label: 'All Status' },
                { key: 'EARNED', label: 'Earned' },
                { key: 'LOCKED', label: 'Locked' }
              ] as const).map(tab => {
                const count = ALL_SYSTEM_BADGES.filter(b => {
                  const isEarned = earnedBadges.includes(b.name);
                  const matchesG = gradeFilter === 'ALL' ? true : b.grade === gradeFilter;
                  const matchesS = tab.key === 'ALL' ? true : (tab.key === 'EARNED' ? isEarned : !isEarned);
                  return matchesG && matchesS;
                }).length;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`px-3 py-1.5 font-mono text-[10px] md:text-xs uppercase font-black tracking-wider transition-all rounded cursor-pointer ${
                      filter === tab.key 
                        ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-extrabold' 
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grade Level Filter Toggle */}
          <div className="space-y-1.5">
            <span className="font-mono text-xs text-zinc-200 uppercase font-black tracking-wider block">Academic Level:</span>
            <div className="flex gap-1.5 bg-black/50 p-1 border border-white/5 rounded">
              {([
                { key: 'ALL', label: 'All Grades' },
                { key: 'GRADE_01', label: 'UG_Core G1' },
                { key: 'GRADE_02', label: 'Analytical G2' },
                { key: 'GRADE_03', label: 'Placement G3' }
              ] as const).map(tab => {
                const count = ALL_SYSTEM_BADGES.filter(b => {
                  const isEarned = earnedBadges.includes(b.name);
                  const matchesG = tab.key === 'ALL' ? true : b.grade === tab.key;
                  const matchesS = filter === 'ALL' ? true : (filter === 'EARNED' ? isEarned : !isEarned);
                  return matchesG && matchesS;
                }).length;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setGradeFilter(tab.key)}
                    className={`px-3 py-1.5 font-mono text-[10px] md:text-xs uppercase font-black tracking-wider transition-all rounded cursor-pointer ${
                      gradeFilter === tab.key 
                        ? 'bg-[#e2231a]/15 border border-[#e2231a]/40 text-red-400 font-extrabold' 
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-350 border-t md:border-t-0 border-white/5 pt-2.5 md:pt-0">
          <Filter size={12} className="text-zinc-400" />
          <span className="text-zinc-300 uppercase font-bold text-[10px] tracking-wider">Syllabus Filter Shield Active</span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedBadges.map((badge, idx) => {
          const isEarned = earnedBadges.includes(badge.name);
          const Icon = badge.icon;
          
          return (
            <div
              id={`badge-card-${badge.id}`}
              key={badge.id}
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
              className={`p-4 rounded-lg border transition-all duration-300 relative overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 hover:scale-[1.02] ${
                isEarned 
                  ? `bg-gradient-to-br ${badge.themeColor} cursor-pointer hover:shadow-[0_10px_25px_-10px_rgba(234,179,8,0.25)]` 
                  : 'bg-zinc-950/20 border-white/5 text-zinc-400 hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.40)]'
              }`}
            >
              {/* Decorative glowing backdrops */}
              {isEarned && hoveredBadge === badge.id && (
                <div className="absolute inset-0 bg-yellow-400/[0.03] pointer-events-none animate-pulse transition-all duration-300" />
              )}

              {/* Main structure of card */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  {/* Badge Icon Slot */}
                  <div className={`p-2 rounded-md ${
                    isEarned 
                      ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300' 
                      : 'bg-zinc-900/10 border border-white/5 text-zinc-500'
                  }`}>
                    <Icon size={20} className={isEarned && hoveredBadge === badge.id ? "animate-bounce" : ""} />
                  </div>

                  {/* Check / Lock stamp */}
                  <div className="font-mono text-[10px] uppercase tracking-wider">
                    {isEarned ? (
                      <span className="flex items-center gap-1 text-emerald-300 font-extrabold">
                        <Unlock size={11} /> SECURED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-zinc-400 font-bold">
                        <Lock size={11} /> LOCK
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges details */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-zinc-400 block font-bold tracking-wide">
                    {badge.grade === 'GRADE_01' ? '🎓 UNIV_CORE' : badge.grade === 'GRADE_02' ? '⚡ ANALYTICAL_SPRINT' : '👑 PLACEMENT_GATE'}
                  </span>
                  <h4 className={`font-bebas text-xl md:text-2xl tracking-wider uppercase leading-none ${
                    isEarned ? 'text-white' : 'text-zinc-400 font-bold'
                  }`}>
                    {badge.name}
                  </h4>
                  <span className={`text-[12px] md:text-xs font-sans font-bold block leading-tight ${
                    isEarned ? 'text-yellow-300' : 'text-zinc-350'
                  }`}>
                    {badge.title}
                  </span>
                </div>

                <p className="text-[11px] md:text-xs leading-relaxed text-zinc-200 font-sans font-medium line-clamp-3">
                  {badge.description}
                </p>
              </div>

              {/* Footnotes showing conditions or completion */}
              <div className="border-t border-white/5 pt-2.5 mt-3">
                <span className={`text-[10px] font-mono leading-normal block ${
                  isEarned ? 'text-emerald-400 font-extrabold' : 'text-zinc-350'
                }`}>
                  {isEarned ? (
                    "✓ Criteria successfully verified on pipeline"
                  ) : (
                    `Lock: ${badge.unlockedCriteria}`
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {displayedBadges.length === 0 && (
        <div className="text-center p-12 border border-white/5 bg-zinc-950/20 rounded font-mono text-zinc-200 text-sm">
          🚫 No badges found matching "{filter}" selection parameter.
        </div>
      )}
    </div>
  );
}
