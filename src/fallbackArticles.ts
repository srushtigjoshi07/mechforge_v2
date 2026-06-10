export interface ArticleQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Article {
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

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: "starship-shield",
    title: "SpaceX Starship Orbital Heat Shield Structural Redesign",
    category: "Aerospace / Material Science",
    date: "Current Curated",
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
    date: "Current Curated",
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
    date: "Current Curated",
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
    date: "Current Curated",
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
    date: "Current Curated",
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
  },
  {
    id: "tesla-casting",
    title: "Tesla Giga-Casting Structural Underbody Shear Failure Optimization",
    category: "Automotive / Structural Mechanics",
    date: "Current Curated",
    author: "Dr. Elena Rostov, Materials Director",
    summary: "Tesla has optimized its mega-casting process for custom front-and-rear unibody aluminum castings. Initial fatigue models indicated localized shear failure under cyclic vibration stresses at suspension linkage lugs. Thermal aging and finite element topology optimization was applied to increase the density of the load-bearing rib grids.",
    significance: "This highlights the importance of elastic shear fatigue coefficients. Standard casting suffers from micro-porosity during cooling. Topology optimization ensures the stresses are kept below the fatigue threshold, increasing vehicle operating lifetime.",
    learnSyllabus: "Connect this to AMSM (Finite Element Method) and DME (Fatigue Strength curves). Focus on stress concentration factor (K_t) and S-N curves.",
    principles: ["Fatigue Strength Curves", "Stress Concentration Factor", "Topology Optimization", "Mega-Casting Rib Density"],
    moduleLink: { track: "GRADE_02", label: "AMSM Section (Topology Design)" },
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80",
    questions: [
      {
        question: "What engineering method was used to optimize Tesla's unibody aluminum castings against localized shear failure?",
        options: [
          "Hydrodynamic vacuum chokes",
          "Thermal aging combined with finite element topology optimization",
          "Copper-clad superalloy fasteners",
          "Pneumatic air compressibility buffers"
        ],
        correctIndex: 1,
        explanation: "The article highlights that Tesla applied key thermal aging along with finite element topology optimization of rib grids to resist cyclic shear vibrations."
      },
      {
        question: "How does topology optimization prevent structural fatigue in a unibody casting block?",
        options: [
          "It forces fluid speeds to remain at supersonic bounds",
          "It redistributes localized loads to keep stresses permanently below material fatigue thresholds",
          "It permits infinite volumetric expansion up to 300%",
          "It implements an epicyclic velocity curve model"
        ],
        correctIndex: 1,
        explanation: "Topology optimization recalculates the load paths, adding material only where stress demands it, keeping local stress indices safely inside endurance bounds."
      }
    ]
  },
  {
    id: "siemens-turbine",
    title: "Siemens Hydrogen-Capable Gas Turbine Blade Centrifugal Stress",
    category: "Thermodynamics / Power Systems",
    date: "Current Curated",
    author: "Aisha Gunter, EV Battery Integrity Group",
    summary: "Siemens has initiated trials for gas turbines burning up to 100% pure hydrogen fuel. To survive turbine inlet temperatures of 1700°C under high rotation speeds (3600 RPM), the single-crystal superalloy blades are equipped with dynamic film cooling passages. This prevents thermal creeps and severe stress fractures caused by centrifugal forces.",
    significance: "Under high RPM, blades experience severe tensile loading due to centrifugal acceleration (F_c = m • ω² • r). Combined with high thermal gradients, this triggers the thermal aging of metal superalloys. Modern film cooling layers protect the structural metal core from direct heat convection.",
    learnSyllabus: "Study DME (Design of Machine Elements) and SOM (Strength of Materials). Focus on centrifugal hoop stress, thermal stress vectors, and superalloy creep deformation rates.",
    principles: ["Centrifugal Acceleration Load", "Thermal Creep Deformation", "Single-Crystal Superalloys", "Film Cooling boundary layer"],
    moduleLink: { track: "GRADE_03", label: "SOM Section (Centrifugal Stresses)" },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    questions: [
      {
        question: "What primary loading scenario acts on turbine blades operating at 3600 RPM in the Siemens hydrogen-capable gas turbine?",
        options: [
          "Compressible supersonic choke",
          "Superconductivity electromagnetic Lorentz pressure",
          "Severe tensile loading due to centrifugal acceleration",
          "Epicyclic gearing backlash impacts"
        ],
        correctIndex: 2,
        explanation: "High rotation speeds of 3600 RPM generate tremendous centrifugal inertia forces, placing blades under substantial static tensile stress along their radial axis."
      },
      {
        question: "What structural mechanism is used to defend the blade cores from thermal metal creep factors?",
        options: [
          "Vacuum-formed silicon-carbide plates",
          "Dynamic film cooling passages shielding the single-crystal superalloy surface",
          "Copper plating holding high current densities",
          "Passive hydrostatic expansion shells"
        ],
        correctIndex: 1,
        explanation: "Integrated cooling passages flow air to create a boundary layer film, keeping superalloy metals below their plastic creep-activation heat thresholds."
      }
    ]
  },
  {
    id: "haliade-gearbox",
    title: "GE Vernova Advanced Offshore Wind Turbine Nacelle Gearbox Backlash",
    category: "Machine Elements / Clean Energy",
    date: "Current Curated",
    author: "Julian Vance, Biorobotics Lead Researcher",
    summary: "GE Vernova introduced a redesigned robust epicyclic planetary gearbox for its massive Haliade-X wind turbine. Under sudden storm gust-induced torque shifts, gears experience rapid backlash-driven torque spikes. Custom fluid damper couplings and high-contact roller bearings were integrated to absorb shock loads and prevent tooth fatigue.",
    significance: "This highlights gear teeth contact mechanics. Planetary gear gearboxes suffer from uneven load sharing if carrier plates deflection exceeds tolerances. Elastohydrodynamic lubricant film thickness must be actively maintained to preserve gear teeth longevity.",
    learnSyllabus: "Learn the FMM/DOM tracks (Dynamics of Machinery). Focus on epicyclic planetary gear ratios, elastohydrodynamic lubrication, and torsional vibration damping.",
    principles: ["Epicyclic Planetary Gears", "Plentary Gearbox Backlash", "Elastohydrodynamic Film", "Torsional Vibration Coupling"],
    moduleLink: { track: "GRADE_01", label: "DOM Section (Planetary Gears)" },
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&q=80",
    questions: [
      {
        question: "Why do offshore wind turbine gearboxes experience severe torque spikes during sudden storm wind gust variations?",
        options: [
          "They undergo rapid backlash-driven impact loadings across gear meshes",
          "They experience thin vessel hoop wall buckling",
          "They trigger magnetic field Lorentz decay",
          "They suffer from convergent supersonic bypass bounds"
        ],
        correctIndex: 0,
        explanation: "Sudden speed and direction shifts cause alternating contact across gear teeth mating gaps, leading to sudden impact fatigue spike profiles unless damping is added."
      },
      {
        question: "What lubrication mechanism is critical to prevent metal-to-metal friction fatigue across planetary gears?",
        options: [
          "Liquid carbon-fiber binders",
          "Elastohydrodynamic lubricant film thickness preservation",
          "Pneumatic air compression layers",
          "Hexagonal silica dust lubrication"
        ],
        correctIndex: 1,
        explanation: "Elastohydrodynamic lubrication profiles provide a high-pressure thin fluid wedge that completely separates teeth flanks under extremely heavy contact loading."
      }
    ]
  },
  {
    id: "lockheed-supersonic",
    title: "Lockheed Martin Supersonic Concorde-2 Sonic Boom Inlet Nozzle Dynamics",
    category: "Fluid Aerodynamics / Propulsion",
    date: "Current Curated",
    author: "Marcello Moretti, Aerodynamics Consultant",
    summary: "Lockheed Martin engineers completed flight trials of an adjustable-cone engine inlet nozzle designed for low-boom supersonic flight. As air enters the nacelle at Mach 1.4, a moveable central cone dynamically shifts to position a system of oblique shock waves inside the boundary throat, slowing the incoming air to subsonic levels (Mach 0.5) with minimal stagnation pressure loss.",
    significance: "Supersonic engine compressor blades cannot accept supersonic inlet velocity directly without stalling. The variable-throat design acts mathematically as an active convergent-divergent nozzle. Dynamic throat variation preserves the total kinetic pressure head throughout variable supersonic climb flight profiles.",
    learnSyllabus: "Connect to FMM (Fluid Mechanics & Machinery). Focus on supersonic oblique shock waves, stagnation pressure, and flow throat continuity dynamics.",
    principles: ["Variable Throat Geometry", "Sonic Oblique Shockwaves", "Stagnation Pressure Recovery", "Continuity Flow Throat"],
    moduleLink: { track: "GRADE_01", label: "FMM Section (Supersonic Flow)" },
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
    questions: [
      {
        question: "Why must supersonic inlet air be slowed down to subsonic speeds before it reaches the first compressor blade row?",
        options: [
          "Supersonic velocity creates magnetic field leakage in alloy brackets",
          "Turbine blade hubs stall and suffer devastating aerodynamic shock losses at supersonic input",
          "It forces the system back into a hydrostatic vacuum ceiling",
          "It causes the single-crystal superalloy blades to melt instantly"
        ],
        correctIndex: 1,
        explanation: "Compressor profiles operate as subsonic airfoil cascades; direct supersonic flows create massive shock fronts that choke the engine and induce severe aerodynamic stall."
      },
      {
        question: "What physical method does the Lockheed-engine inlet use to slow down isentropic flows safely?",
        options: [
          "A dynamic movable central cone creating focused oblique shockwaves",
          "A silicon-carbide composite facing sheet",
          "A high-torque harmonic rotor reducer",
          "An active planetary bypass valve"
        ],
        correctIndex: 0,
        explanation: "Slowing down is achieved through oblique shock waves generated by a movable center-body cone, compressing the flow and maximizing stagnation pressure retention up to the engine throat."
      }
    ]
  },
  {
    id: "mit-thermovoltaic",
    title: "MIT Thermophotovoltaic Clean Grid Carnot Efficiency Optimization",
    category: "Thermodynamics / Sustainable Energy",
    date: "Current Curated",
    author: "Prof. Charles Vance, Fusion Engineering Lab",
    summary: "MIT researchers engineered a high-efficiency solid-state thermal heat battery system operating at 2000°C. Stored renewable energy is reclaimed using thermophotovoltaic cells absorbing photon heat radiation directly from incandescent graphite blocks. The system achieves a thermal-to-electric conversion efficiency of 41.1%, breaking previous limits.",
    significance: "This is a direct application of Carnot thermal efficiency boundaries (η = 1 - T_C/T_H). By maintaining an ultra-high heat source temperature (2273K) and cold heat-sink boundaries, the system approaches the theoretical thermodynamic ceiling while avoiding mechanical turbine blades completely.",
    learnSyllabus: "Study SOM and thermodynamical track modules. Particularly, Carnot efficiency, radiative heat transfer (Stefan-Boltzmann law), and thermal energy battery design.",
    principles: ["Carnot Efficiency Ceiling", "Stefan-Boltzmann Radiation", "Incandescent Grid Heat Battery", "Solid-State Thermophotovoltaic"],
    moduleLink: { track: "GRADE_03", label: "DME Section (Thermal Management)" },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    questions: [
      {
        question: "Which thermodynamics boundary mathematically explains the 41.1% conversion efficiency limit at 2000°C?",
        options: [
          "The mechanical epicyclic gear factor",
          "The Carnot efficiency limit formula (η = 1 - T_clow / T_high)",
          "The Hoop vessel buckling coefficient",
          "Euler-Bernoulli simple bending load"
        ],
        correctIndex: 1,
        explanation: "The theoretical upper ceiling of heat engine efficiency is governed strictly by the Carnot relation between source and sink temperatures."
      },
      {
        question: "How is energy transferred from the 2000°C graphite incandescent blocks to the electrical converter surface?",
        options: [
          "Convective high-pressure oil lubrication flows",
          "Radiative photon heat energy radiation (Stefan-Boltzmann law)",
          "Elastic strain energy transfer across fasteners",
          "A magnetic Lorentz planetary coil pairing"
        ],
        correctIndex: 1,
        explanation: "At extreme heats of 2000°C, radiative heat transfer dominates, allowing block photons to be directly collected and converted into electric currents."
      }
    ]
  }
];
