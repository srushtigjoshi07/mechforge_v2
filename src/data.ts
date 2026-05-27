import { Bike, Dealer, TimelineMoment, TechItem, DealItem, SafetyPillar, ServiceFAQ } from './types';

// Custom MechForge Types
export interface MechQuestion {
  id: number;
  subject: string;
  question: string;
  hints: string[];
  correctAnswer: string;
  explanation: string;
}

export interface MechMCQQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  hints: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  equation: string;
  category: string;
}

// GRADE 01: UNIVERSITY CORE (Syllabus-Compliant Subjective Workbook)
// MODULE A: Fluid Mechanics & Machinery (FMM)
export const GRADE_1_FMM_QUESTIONS: MechQuestion[] = [
  {
    id: 1,
    subject: "Fluid Mechanics & Machinery",
    question: "A clean water pipe features a cross-sectional area of 0.05 m². If the fluid velocity is steady at 2.5 m/s, calculate the volumetric flow rate (Q) in m³/s.",
    hints: [
      "Use the steady flow rate formula: Q = A * V.",
      "A = 0.05 m², V = 2.5 m/s.",
      "Q = 0.05 * 2.5 = 0.125. Enter '0.125'."
    ],
    correctAnswer: "0.125",
    explanation: "Steady flow rate Q = A * V = 0.05 * 2.5 = 0.125 m³/s."
  },
  {
    id: 2,
    subject: "Fluid Mechanics & Machinery",
    question: "Determine the total pressure head (H) in meters of water for a static pressure gauge reading exactly 294.3 kPa.",
    hints: [
      "Use the hydrostatic pressure equation: P = ρ * g * H.",
      "In standard metric, density of water ρ = 1000 kg/m³, g = 9.81 m/s².",
      "H = P / (ρ * g) = 294300 / (1000 * 9.81) = 30.0. Enter '30'."
    ],
    correctAnswer: "30",
    explanation: "H = P / (ρ * g) = 294.3 x 10³ / (1000 * 9.81) = 30 meters."
  },
  {
    id: 3,
    subject: "Fluid Mechanics & Machinery",
    question: "Water flows through a venturi meter with an inlet diameter of 100mm and a throat diameter of 50mm. Calculate the area ratio (A_1 / A_2) needed for the discharge velocity vector layout.",
    hints: [
      "Area of a circle is proportional to the square of its diameter.",
      "Area ratio is (D_1 / D_2)².",
      "(100 / 50)² = 2² = 4. Enter '4'."
    ],
    correctAnswer: "4",
    explanation: "A_1 / A_2 = (π/4 * D_1²) / (π/4 * D_2²) = (100 / 50)² = 4."
  },
  {
    id: 4,
    subject: "Fluid Mechanics & Machinery",
    question: "An oil layer with a kinematic viscosity of 0.0002 m²/s flows through a 50mm pipe at 1.5 m/s. Compute the Reynolds Number (Re) to classify the flow regime.",
    hints: [
      "Reynolds Number: Re = V * D / ν.",
      "D = 0.05 m (50mm), V = 1.5 m/s, ν = 0.0002 m²/s.",
      "Re = 1.5 * 0.05 / 0.0002 = 375. Enter '375'."
    ],
    correctAnswer: "375",
    explanation: "Re = (1.5 * 0.05) / 0.0002 = 375, which classifies the flow as laminar (Re < 2000)."
  },
  {
    id: 5,
    subject: "Fluid Mechanics & Machinery",
    question: "Calculate the boundary layer displacement thickness (delta*) in mm if the velocity profile is linear and nominal thickness is 6.0 mm.",
    hints: [
      "For a linear velocity profile (u/U = y/δ), the displacement thickness is δ* = δ / 2.",
      "Substitute δ = 6.0 mm.",
      "δ* = 6.0 / 2 = 3. Enter '3'."
    ],
    correctAnswer: "3",
    explanation: "δ* = ∫ (1 - u/U) dy from 0 to δ. With u/U = y/δ, δ* = δ/2 = 6.0 / 2 = 3.0 mm."
  },
  {
    id: 6,
    subject: "Fluid Mechanics & Machinery",
    question: "A Pelton wheel turbine operates under a net head of H = 60m. If the bucket speed ratio (u/V_1) is optimized at 0.46, calculate the absolute velocity of the jet entering the runner buckets, neglecting friction.",
    hints: [
      "Absolute jet velocity is given by V_1 = sqrt(2 * g * H).",
      "g = 9.81 m/s², H = 60m.",
      "V_1 = sqrt(2 * 9.81 * 60) ≈ 34.31 m/s. Enter '34.31'."
    ],
    correctAnswer: "34.31",
    explanation: "V_1 = sqrt(2 * 9.81 * 60) ≈ 34.31 m/s."
  },
  {
    id: 7,
    subject: "Fluid Mechanics & Machinery",
    question: "Find the hydraulic efficiency (eta_h) of a Pelton turbine wheel if jet velocity V_1 is 30 m/s, bucket speed u is 14 m/s, and the blade friction reduction factor k is 0.9 with smooth exit.",
    hints: [
      "Hydraulic efficiency formula: η_h = 2 * u * (V_1 - u) * (1 + k) / V_1².",
      "Substitute: V_1 = 30, u = 14, k = 0.9.",
      "η_h = 2 * 14 * 16 * 1.9 / 900 ≈ 0.9458 or 94.58%. Enter '94.58'."
    ],
    correctAnswer: "94.58",
    explanation: "η_h = [2 * u * (V_1 - u) * (1 + k)] / V_1² = [2 * 14 * 16 * 1.9] / 900 ≈ 94.58%."
  },
  {
    id: 8,
    subject: "Fluid Mechanics & Machinery",
    question: "A centrifugal pump impeller features an outer radius of 0.2m and rotates at 1450 RPM. Evaluate the peripheral velocity (u_2) at the outlet blade tip.",
    hints: [
      "Peripheral velocity: u_2 = 2 * π * N * R_2 / 60.",
      "N = 1450 RPM, R_2 = 0.2 m.",
      "u_2 = 2 * π * 1450 * 0.2 / 60 ≈ 30.37. Enter '30.37'."
    ],
    correctAnswer: "30.37",
    explanation: "u_2 = 2 * π * N * R_2 / 60 = 2 * 3.14159 * 1450 * 0.2 / 60 = 30.37 m/s."
  },
  {
    id: 9,
    subject: "Fluid Mechanics & Machinery",
    question: "Estimate the typical standard design manometric efficiency percentage (%) of a centrifugal impeller delivering to industrial targets under ideal guide bounds.",
    hints: [
      "Standard centrifugal pumps are optimized to reach 85.0% manometric yields.",
      "Use standard integer representation.",
      "Enter '85'."
    ],
    correctAnswer: "85",
    explanation: "Based on hydrodynamic scale analysis of standard industrial pump systems with matching boundary conditions."
  },
  {
    id: 10,
    subject: "Fluid Mechanics & Machinery",
    question: "Comprehensive 4th-Sem FMM Exam: Synthesize a complete multi-stage centrifugal pump performance loop and calculate the critical Thoma cavitation number limit.",
    hints: [
      "This is a comprehensive analytical workbook final test.",
      "The critical cavitation Thoma parameter resolves to '0.12'.",
      "Enter '0.12'."
    ],
    correctAnswer: "0.12",
    explanation: "Sufficient performance bounds map to a cavitation index threshold value of exactly 0.12."
  }
];

// MODULE B: Dynamics of Machinery (DOM)
export const GRADE_1_DOM_QUESTIONS: MechQuestion[] = [
  {
    id: 1,
    subject: "Dynamics of Machinery",
    question: "Calculate the total degrees of freedom (DOF) for a planar four-bar mechanism using Gruebler’s criterion with 4 binary links and 4 revolute pairs.",
    hints: [
      "Gruebler's equation: F = 3*(N - 1) - 2*J - H.",
      "Substitute N = 4, J = 4, H = 0.",
      "F = 3*(4 - 1) - 2*4 = 9 - 8 = 1. Enter '1'."
    ],
    correctAnswer: "1",
    explanation: "F = 3 * (4 - 1) - 2 * 4 = 1."
  },
  {
    id: 2,
    subject: "Dynamics of Machinery",
    question: "A slider-crank mechanism features a crank length of 100mm. Find the total stroke length of the reciprocating piston slider in mm.",
    hints: [
      "Stroke length of a slider-crank mechanism is equal to twice the crank radius: S = 2 * r.",
      "Crank length r = 100 mm.",
      "S = 2 * 100 = 200. Enter '200'."
    ],
    correctAnswer: "200",
    explanation: "Stroke is double the crank radius: L_stroke = 2 * 100 mm = 200 mm."
  },
  {
    id: 3,
    subject: "Dynamics of Machinery",
    question: "The crank of an engine rotates at a constant angular velocity of 20 rad/s. If the crank radius is 0.15m, determine the linear velocity of the crank pin.",
    hints: [
      "Linear velocity: V = ω * r.",
      "ω = 20 rad/s, r = 0.15 m.",
      "V = 20 * 0.15 = 3. Enter '3'."
    ],
    correctAnswer: "3",
    explanation: "V = ω * r = 20 * 0.15 = 3 m/s."
  },
  {
    id: 4,
    subject: "Dynamics of Machinery",
    question: "An engine flywheel experiences a total fluctuation of energy equal to 3000 Joules. If the mean speed is 30 rad/s, calculate the required mass moment of inertia (I) for a 2% coefficient of fluctuation in kg·m².",
    hints: [
      "Fluctuation of energy: ΔE = I * ω_mean² * C_s.",
      "Substitute: ΔE = 3000 J, ω_mean = 30 rad/s, C_s = 0.02 (2%).",
      "I = 3000 / (900 * 0.02) = 166.67. Enter '166.67'."
    ],
    correctAnswer: "166.67",
    explanation: "I = 3000 / (30² * 0.02) = 166.67 kg·m²."
  },
  {
    id: 5,
    subject: "Dynamics of Machinery",
    question: "Identify the primary unbalance force magnitude in a single-cylinder reciprocating engine running at 1500 RPM with a reciprocating mass of 2.0 kg and stroke of 120mm.",
    hints: [
      "Primary unbalance force is F_p = m * ω² * r.",
      "m = 2.0 kg, r = stroke / 2 = 0.06 m, speed N = 1500 RPM.",
      "ω = 2 * π * 1500 / 60 = 157.08 rad/s. Enter '2960.88'."
    ],
    correctAnswer: "2960.88",
    explanation: "F_p = m * r * ω² = 2.0 * 0.06 * 157.08² = 2960.88 N."
  },
  {
    id: 6,
    subject: "Dynamics of Machinery",
    question: "An undamped torsional vibration system has a rotor with mass moment of inertia I = 2.5 kg·m² and a shaft with torsional stiffness q_t = 40 kN·m/rad. Determine the system's natural frequency (omega_n) in rad/s.",
    hints: [
      "Natural frequency: ω_n = sqrt(q_t / I).",
      "q_t = 40000 N·m/rad, I = 2.5 kg·m².",
      "ω_n = sqrt(40000 / 2.5) = 126.49. Enter '126.49'."
    ],
    correctAnswer: "126.49",
    explanation: "ω_n = sqrt(40000 / 2.5) = 126.49 rad/s."
  },
  {
    id: 7,
    subject: "Dynamics of Machinery",
    question: "A static governor mechanism expands its sleeve by 20mm when speed increases from 300 RPM to 315 RPM. Evaluate the explicit sensitivity metric of the governor.",
    hints: [
      "Sensitivity can be defined as (N_2 - N_1) / N_mean.",
      "N_2 = 315, N_1 = 300, N_mean = 307.5.",
      "Sensitivity = 15 / 307.5 ≈ 0.0488. Enter '0.0488'."
    ],
    correctAnswer: "0.0488",
    explanation: "Governor sensitivity relates dynamic range to mean operation, yielding 0.0488."
  },
  {
    id: 8,
    subject: "Dynamics of Machinery",
    question: "A spinning rotor disk of 5kg mass and 0.1m radius rotates at 3000 RPM. If the axis precesses at 2 rad/s, calculate the gyroscopic couple torque in N·m.",
    hints: [
      "Gyroscopic couple: C = I * ω * ω_p.",
      "Moment of inertia of a disk: I = 0.5 * m * R² = 0.5 * 5 * 0.1² = 0.025 kg·m².",
      "ω = 2 * π * 3000 / 60 ≈ 314.16 rad/s. ω_p = 2 rad/s. Enter '15.71'."
    ],
    correctAnswer: "15.71",
    explanation: "C = (0.5 * 5 * 0.1²) * 314.16 * 2 = 15.71 N·m."
  },
  {
    id: 9,
    subject: "Dynamics of Machinery",
    question: "Analyze a dynamic secondary balance matrix for an inline 4-cylinder engine configuration, identifying the critical imbalance multiplier factor.",
    hints: [
      "Secondary forces operate at twice the crank frequency (2 * ω).",
      "The critical multiplier coefficient for secondary imbalance sums to '2'.",
      "Enter '2'."
    ],
    correctAnswer: "2",
    explanation: "Inline four-cylinder lines feature unbalanced secondary forces, scaling correspondency by a factor of 2."
  },
  {
    id: 10,
    subject: "Dynamics of Machinery",
    question: "Comprehensive 4th-Sem DOM Exam: Execute complete force balance and calculate the resultant piston acceleration polygon vector length in m/s².",
    hints: [
      "Analysis resolves acceleration parameters.",
      "For standard slider-crank layout under exam limits, the piston acceleration reduces to '22.5'.",
      "Enter '22.5'."
    ],
    correctAnswer: "22.5",
    explanation: "Acceleration polygon resolves kinematics to exactly 22.5 m/s²."
  }
];

// Fallback arrays to retain compatibility with old code loads inside App.tsx or components:
export const GRADE_1_QUESTIONS: MechQuestion[] = [...GRADE_1_FMM_QUESTIONS];

// GRADE 02: ANALYTICAL SPRINT (GATE-Level High-Velocity MCQ Matrix)
// MODULE A: Advanced Material & Structural Mechanics
export const GRADE_2_AMSM_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Advanced Material & Structural Mechanics",
    question: "A structural steel rod of 20mm diameter is subjected to a 40 kN axial tensile load. Determine the nominal engineering normal stress in MPa.",
    options: ["127.3 MPa", "63.7 MPa", "254.6 MPa", "31.8 MPa"],
    hints: [
      "Normal stress: σ = Force / Area.",
      "Area = π * d² / 4 = π * (0.02)² / 4 ≈ 0.00031416 m².",
      "σ = 40,000 / 0.00031416 ≈ 127.32 MPa."
    ],
    correctAnswerIndex: 0,
    explanation: "σ = 40,000 N / [π/4 * 20² mm²] = 127.32 MPa, which rounds to 127.3 MPa."
  },
  {
    id: 2,
    subject: "Advanced Material & Structural Mechanics",
    question: "An aluminum column experiences a true strain value of 0.05. Compute the corresponding engineering strain value.",
    options: ["0.0513", "0.0488", "0.0500", "0.0250"],
    hints: [
      "True strain: ε_true = ln(1 + ε_eng).",
      "1 + ε_eng = e^ε_true.",
      "ε_eng = e^0.05 - 1 ≈ 0.0513."
    ],
    correctAnswerIndex: 0,
    explanation: "ε_eng = e^ε_true - 1 = e^0.05 - 1 = 0.05127 ≈ 0.0513."
  },
  {
    id: 3,
    subject: "Advanced Material & Structural Mechanics",
    question: "A solid circular shaft transmits 50 kW of mechanical power at an angular velocity of 200 rad/s. Calculate the torsional torque experienced by the input face.",
    options: ["250 N·m", "500 N·m", "125 N·m", "1000 N·m"],
    hints: [
      "Power formula: Power = Torque * ω.",
      "Substitute: Power = 50,000 W, ω = 200 rad/s.",
      "Torque = 50,000 / 200 = 250 N·m."
    ],
    correctAnswerIndex: 0,
    explanation: "T = P / ω = 50000 / 200 = 250 N·m."
  },
  {
    id: 4,
    subject: "Advanced Material & Structural Mechanics",
    question: "Determine the maximum bending stress in a 100mm x 200mm rectangular beam cross-section subjected to a bending moment of 20 kN·m.",
    options: ["30.0 MPa", "15.0 MPa", "60.0 MPa", "45.0 MPa"],
    hints: [
      "Bending stress: σ_max = M / Z.",
      "Section modulus of rectangle: Z = b * h² / 6.",
      "b = 0.1 m, h = 0.2 m, Z = 0.1 * 0.2² / 6 = 0.0006667 m³."
    ],
    correctAnswerIndex: 0,
    explanation: "Z = (0.1 * 0.2²) / 6 = 6.67e-4 m³. σ_max = 20e3 / 6.67e-4 = 30 MPa."
  },
  {
    id: 5,
    subject: "Advanced Material & Structural Mechanics",
    question: "A thin cylindrical pressure vessel features an internal diameter of 1m and wall thickness of 10mm. Find the hoop stress if internal gauge pressure is 2 MPa.",
    options: ["100 MPa", "200 MPa", "50 MPa", "150 MPa"],
    hints: [
      "Hoop stress in a cylinder: σ_h = P * D / (2 * t).",
      "P = 2 MPa, D = 1 m, t = 0.01 m (10mm).",
      "σ_h = 2 * 1 / (2 * 0.01) = 100 MPa."
    ],
    correctAnswerIndex: 0,
    explanation: "σ_h = P*D / 2t = (2 * 1) / (2 * 0.01) = 100 MPa."
  },
  {
    id: 6,
    subject: "Advanced Material & Structural Mechanics",
    question: "A cantilever beam of length L supporting a concentrated end load P experiences a deflection delta. If the length is doubled while maintaining load, find the new deflection factor.",
    options: ["8 times delta", "4 times delta", "2 times delta", "16 times delta"],
    hints: [
      "Tip deflection of an end-loaded cantilever is delta = P * L³ / (3EI).",
      "Deflection is proportional to L³.",
      "(2L)³ = 8L³, so deflection is multiplied by 8."
    ],
    correctAnswerIndex: 0,
    explanation: "Deflection is proportional to the cube of length: delta_new = P * (2L)³ / 3EI = 8 * delta."
  },
  {
    id: 7,
    subject: "Advanced Material & Structural Mechanics",
    question: "Evaluate the principal stresses for a localized plane stress element experiencing sigma_x = 80 MPa, sigma_y = 20 MPa, and shear tau_xy = 40 MPa.",
    options: ["100 MPa and 0 MPa", "120 MPa and -20 MPa", "80 MPa and 20 MPa", "60 MPa and 40 MPa"],
    hints: [
      "Principal stress formula: σ_1,2 = (σ_x + σ_y)/2 ± sqrt(((σ_x - σ_y)/2)² + τ_xy²).",
      "Average stress = 50 MPa. Radial component = sqrt(30² + 40²) = 50.",
      "Principal stresses are 100 MPa and 0 MPa."
    ],
    correctAnswerIndex: 0,
    explanation: "σ_1 = 50 + 50 = 100 MPa. σ_2 = 50 - 50 = 0 MPa."
  },
  {
    id: 8,
    subject: "Advanced Material & Structural Mechanics",
    question: "Calculate the critical Euler buckling load for a pin-ended structural column of length 3m, elastic modulus 200 GPa, and minimum moment of inertia I_min = 10x10^-6 m^4.",
    options: ["2193 kN", "4386 kN", "1096 kN", "8772 kN"],
    hints: [
      "Euler Buckling load for pin-pin ends: P_cr = π² * E * I / L².",
      "E = 200 * 10^9 N/m², I = 10 * 10^-6 m⁴, L = 3 m.",
      "P_cr = π² * 200x10^9 * 10x10^-6 / 9."
    ],
    correctAnswerIndex: 0,
    explanation: "P_cr = π² * 2e11 * 1e-5 / 9 ≈ 2193.2 kN."
  },
  {
    id: 9,
    subject: "Advanced Material & Structural Mechanics",
    question: "Apply the Maximum Distortion Energy Theory (von Mises) to evaluate the factor of safety for a triaxial stress state running close to the material yield limits.",
    options: ["1.50", "2.00", "1.15", "1.73"],
    hints: [
      "Equivalent Von Mises Stress is 200 MPa under yield strength 300 MPa.",
      "Factor of Safety = Yield Strength / von Mises Stress.",
      "FOS = 300 / 200 = 1.50."
    ],
    correctAnswerIndex: 0,
    explanation: "Standard shear stress yield evaluation results in an analytical FOS of 1.50."
  },
  {
    id: 10,
    subject: "Advanced Material & Structural Mechanics",
    question: "GATE Structural Analytics Finale: 10-Question 180s Countdown Exam covering combined asymmetrical bending, torsional shear strain, and Mohr's circle verification loops.",
    options: ["PASSED", "BLOCKED", "STABILIZED", "OVERHEAD"],
    hints: [
      "This represents passing the comprehensive design verification sprint.",
      "Completing the assessment delivers the verified clearance 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "Verification loops record elite analytical standard 'PASSED'."
  }
];

// MODULE B: Advanced Thermal Systems & Thermodynamics
export const GRADE_2_ATST_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "A heat engine operates between source/sink reservoirs at 900K and 300K. Compute the maximum theoretical Carnot thermal efficiency.",
    options: ["66.7%", "33.3%", "50.0%", "75.0%"],
    hints: [
      "Carnot Efficiency η = 1 - T_cold / T_hot.",
      "η = 1 - 300 / 900 = 2/3 = 66.67%."
    ],
    correctAnswerIndex: 0,
    explanation: "η = 1 - T_L/T_H = 1 - 300/900 = 0.667."
  },
  {
    id: 2,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "An ideal gas expands isothermally, performing 500 J of work output. Determine the total heat energy added to the system boundaries.",
    options: ["500 J", "0 J", "250 J", "-500 J"],
    hints: [
      "First law of thermodynamics: Q = ΔU + W.",
      "Since the process is isothermal, temperature is constant, so ΔU = 0 for ideal gas.",
      "Therefore, Q = W = 500 J."
    ],
    correctAnswerIndex: 0,
    explanation: "Isothermal means constant temperature, thus ΔU = 0 for ideal gas, making heat transfer equal to work: Q = 500 J."
  },
  {
    id: 3,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "Air is compressed isentropically from an initial pressure of 100 kPa to a final pressure of 800 kPa. If gamma = 1.4, calculate the absolute temperature ratio (T_2 / T_1).",
    options: ["1.81", "2.00", "1.50", "2.25"],
    hints: [
      "Isentropic compression relation: T_2 / T_1 = (P_2 / P_1)^((γ - 1)/γ).",
      "P_2 / P_1 = 8, exponent is (1.4 - 1)/1.4 = 0.4 / 1.4 = 1/3.5."
    ],
    correctAnswerIndex: 0,
    explanation: "T_2/T_1 = (8)^(0.4/1.4) ≈ 1.811."
  },
  {
    id: 4,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "A steady-flow steam turbine handles a fluid enthalpy drop from 3200 kJ/kg at the inlet to 2500 kJ/kg at the exit. Calculate work output per kg neglecting heat loss.",
    options: ["700 kJ/kg", "5700 kJ/kg", "350 kJ/kg", "1400 kJ/kg"],
    hints: [
      "Steady flow energy equation (SFEE): h_1 + q = h_2 + w.",
      "Neglecting heat loss, q = 0. Work output is w = h_1 - h_2."
    ],
    correctAnswerIndex: 0,
    explanation: "Work output per kg is equal to enthalpy drop: 3200 - 2500 = 700 kJ/kg."
  },
  {
    id: 5,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "Determine the total change in entropy when 2 kg of water is heated reversibly at a constant temperature of 373K absorbing 4500 kJ of heat energy.",
    options: ["12.06 kJ/K", "24.12 kJ/K", "6.03 kJ/K", "3.73 kJ/K"],
    hints: [
      "Entropy change in isothermal process: ΔS = Q / T.",
      "Q = 4500 kJ, T = 373 K."
    ],
    correctAnswerIndex: 0,
    explanation: "Regardless of mass, total heat added determines entropy increase dynamically: ΔS = 4500 kJ / 373 K ≈ 12.06 kJ/K."
  },
  {
    id: 6,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "An air-standard Otto cycle features a volumetric compression ratio (r) equal to 8. Calculate the ideal thermal efficiency factor assuming gamma = 1.4.",
    options: ["56.5%", "43.5%", "66.5%", "50.0%"],
    hints: [
      "Otto cycle efficiency η = 1 - 1 / r^(γ - 1).",
      "r^(γ - 1) = 8^(0.4) ≈ 2.2974."
    ],
    correctAnswerIndex: 0,
    explanation: "η_otto = 1 - 1/(8^0.4) ≈ 1 - 0.435 = 0.565 or 56.5%."
  },
  {
    id: 7,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "A gas turbine power plant operates on an ideal Brayton cycle with a pressure ratio of 6. Find the cycle efficiency metric.",
    options: ["40.1%", "59.9%", "33.3%", "49.9%"],
    hints: [
      "Brayton cycle efficiency η = 1 - 1 / (r_p)^((γ-1)/γ).",
      "Using air with γ = 1.4, exponent is (1.4-1)/1.4 ≈ 0.2857."
    ],
    correctAnswerIndex: 0,
    explanation: "η = 1 - 1 / [6^0.2857] ≈ 1 - 0.599 = 40.1%."
  },
  {
    id: 8,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "A vapor compression refrigeration system works between evaporator enthalpy 180 kJ/kg and compressor exit 220 kJ/kg. If liquid entering expansion is 80 kJ/kg, calculate the COP.",
    options: ["2.50", "3.00", "2.00", "4.00"],
    hints: [
      "COP = Refrigerating Effect / Compressor Work.",
      "Refrigerating effect = h_evap - h_liq = 180 - 80 = 100 kJ/kg.",
      "Compressor work = h_exit - h_evap = 220 - 180 = 40 kJ/kg."
    ],
    correctAnswerIndex: 0,
    explanation: "COP = (180 - 80) / (220 - 180) = 100 / 40 = 2.5."
  },
  {
    id: 9,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "Evaluate the second-law exergy destruction rate for a counter-flow heat exchanger transferring thermal vectors across high-temperature exhaust paths.",
    options: ["8.42 kW", "16.84 kW", "4.21 kW", "0.00 kW"],
    hints: [
      "Exergy destruction is S_gen * T_0.",
      "Under nominal parameters irreversibility yields exactly 8.42 kW."
    ],
    correctAnswerIndex: 0,
    explanation: "Second-law exergy depletion calculations resolve irreversibility vectors to 8.42 kW."
  },
  {
    id: 10,
    subject: "Advanced Thermal Systems & Thermodynamics",
    question: "GATE Thermal Analytics Finale: Integrated countdown exam tracking multi-stage gas power cycles, transient entropy balances, and psychrometric fluid variables.",
    options: ["PASSED", "DEGRADED", "STABILIZED", "CRITICAL"],
    hints: [
      "Completing the countdown exam submits the thermodynamic state.",
      "Clearance evaluates to 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "System exergy evaluation yields stable loop operation 'PASSED'."
  }
];

export const GRADE_2_QUESTIONS: MechMCQQuestion[] = [...GRADE_2_AMSM_QUESTIONS];

// RE-ALIGNED GRADE 03: TECHNICAL EXAM & INTERVIEW PREP CONSOLE
// SUBJECT 01: STRENGTH OF MATERIALS (SOM)
export const GRADE_3_SOM_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Strength of Materials",
    question: "A metal bar of cross-sectional area 250 mm² is pulled by a 50 kN force. Calculate the axial stress.",
    options: ["200 MPa", "100 MPa", "50 MPa", "400 MPa"],
    hints: [
      "Stress = Force / Area.",
      "Force = 50 * 10³ N, Area = 250 mm².",
      "Stress = 50,000 / 250 = 200 MPa."
    ],
    correctAnswerIndex: 0,
    explanation: "Stress = P/A = 50000 N / 250 mm² = 200 N/mm² = 200 MPa."
  },
  {
    id: 2,
    subject: "Strength of Materials",
    question: "A structural steel rod of length 2m has an elastic modulus of 200 GPa. If subjected to 100 MPa check stress, determine strain.",
    options: ["0.0005", "0.0001", "0.0010", "0.0002"],
    hints: [
      "Strain = Stress / Young's Modulus.",
      "E = 200 * 10³ MPa, Stress = 100 MPa.",
      "Strain = 100 / 200,000 = 0.0005."
    ],
    correctAnswerIndex: 0,
    explanation: "Strain = Stress / E = 100 * 10^6 / (200 * 10^9) = 0.0005."
  },
  {
    id: 3,
    subject: "Strength of Materials",
    question: "Find the polar moment of inertia (J) of a solid circular shaft of diameter 100mm.",
    options: ["9.82 x 10^-6 m^4", "4.91 x 10^-6 m^4", "1.96 x 10^-5 m^4", "2.45 x 10^-6 m^4"],
    hints: [
      "Standard formula: J = π * D^4 / 32.",
      "D = 0.1 m.",
      "J = π * D^4 / 32 ≈ 9.817 x 10^-6 m^4."
    ],
    correctAnswerIndex: 0,
    explanation: "J = π * D^4 / 32 = π * (0.1)^4 / 32 = 9.817 x 10^-6 m^4."
  },
  {
    id: 4,
    subject: "Strength of Materials",
    question: "What is the relation between shear modulus (G), Young's modulus (E), and Poisson's ratio (v)?",
    options: ["E = 2G(1 + v)", "E = 3G(1 - v)", "E = G(1 + 2v)", "E = 2G(1 - v)"],
    hints: [
      "This is a fundamental mechanical elasticity relation.",
      "Relates axial stiffness to lateral properties.",
      "E = 2G * (1 + v)."
    ],
    correctAnswerIndex: 0,
    explanation: "By standard elasticity relations, Young's modulus is E = 2G(1 + v)."
  },
  {
    id: 5,
    subject: "Strength of Materials",
    question: "A beam under pure bending experiences zero bending stress at which plane?",
    options: ["Neutral Axis Plane", "Top Fiber Plane", "Bottom Fiber Plane", "Outer Extremes Plane"],
    hints: [
      "Pure bending induces linear stress profile from tension to compression.",
      "Stress crosses zero at the exact center axis.",
      "Neutral axis is the zone of zero strain."
    ],
    correctAnswerIndex: 0,
    explanation: "Standard flexure theory states bending stress is zero at the neutral axis."
  },
  {
    id: 6,
    subject: "Strength of Materials",
    question: "Determine the strain energy stored in a solid bar of volume V under uniform axial stress S.",
    options: ["(S² / 2E) * V", "(S / 2E) * V", "(S² / E) * V", "(2S² / E) * V"],
    hints: [
      "Resilience represents strain energy per unit volume.",
      "U_vol = S² / 2E.",
      "Multiply by volume V to retrieve absolute energy."
    ],
    correctAnswerIndex: 0,
    explanation: "Strain energy per unit volume is S² / 2E. Total strain energy is (S² / 2E) * V."
  },
  {
    id: 7,
    subject: "Strength of Materials",
    question: "A thick cylinder under internal pressure displays maximum hoop stress at which location?",
    options: ["Inner wall surface", "Outer wall surface", "Mid-thickness plane", "Constant throughout"],
    hints: [
      "Lame's equations govern stress distribution in thick cylinders.",
      "Internal stress reaches extremes on internal boundary conditions.",
      "Stress decays as we move outwards."
    ],
    correctAnswerIndex: 0,
    explanation: "By Lame's equations, hoop stress decreases continuously from the inner to the outer radius."
  },
  {
    id: 8,
    subject: "Strength of Materials",
    question: "The buckling load of a column with both ends fixed is how many times that of a column with both ends pinned?",
    options: ["4 times", "2 times", "1/4 times", "1/2 times"],
    hints: [
      "Effective length of pinned-pinned column is L.",
      "Effective length of fixed-fixed column is L / 2.",
      "Load is inversely proportional to square of effective length."
    ],
    correctAnswerIndex: 0,
    explanation: "Fixed-fixed critical load is 4 * π²EI/L², whereas pin-pin critical load is π²EI/L². Ratio is 4."
  },
  {
    id: 9,
    subject: "Strength of Materials",
    question: "Under a pure torsion condition of a shaft, what is the ratio of maximum shear stress to maximum normal stress?",
    options: ["1.0", "0.5", "2.0", "1.73"],
    hints: [
      "Consider principal axes Mohr's circle of a shaft in torsion.",
      "Mohr's circle is centered at origin with radius equal to shear stress.",
      "Maximum normal stress equals maximum shear stress."
    ],
    correctAnswerIndex: 0,
    explanation: "Pure shear state on Mohr's circle has equal maximum shear stress and principal normal stresses."
  },
  {
    id: 10,
    subject: "Strength of Materials",
    question: "SOM Technical Viva Panel: 10-Question timed simulation evaluating complex beam deflections, thermal stresses, and strain energy variations.",
    options: ["PASSED", "BLOCKED", "STABILIZED", "REJECTED"],
    hints: [
      "The final interview deck testing has completed with high results.",
      "Clearance evaluates to 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "Conceptual core mechanical validation successfully completed."
  }
];

// SUBJECT 02: FLUID MECHANICS (FM)
export const GRADE_3_FM_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Fluid Mechanics",
    question: "If a fluid has a specific gravity of 0.85, evaluate its density in kg/m³.",
    options: ["850 kg/m³", "85 kg/m³", "1000 kg/m³", "1150 kg/m³"],
    hints: [
      "Density = Specific gravity * Density of fresh water.",
      "Density of fresh water = 1000 kg/m³.",
      "0.85 * 1000 = 850."
    ],
    correctAnswerIndex: 0,
    explanation: "Density = Specific Gravity * Density of Water = 0.85 * 1000 = 850 kg/m³."
  },
  {
    id: 2,
    subject: "Fluid Mechanics",
    question: "Calculate the dynamic viscosity in Pa-s if shearing stress of 0.5 N/m² produces a velocity gradient of 10 s^-1.",
    options: ["0.05 Pa-s", "0.50 Pa-s", "5.00 Pa-s", "0.005 Pa-s"],
    hints: [
      "Newton's viscosity rule: Shear stress = Viscosity * velocity gradient.",
      "Substitute values: 0.5 = μ * 10.",
      "μ = 0.05."
    ],
    correctAnswerIndex: 0,
    explanation: "By Newton's law of viscosity, τ = μ * (du/dy). μ = 0.5 / 10 = 0.05 Pa-s."
  },
  {
    id: 3,
    subject: "Fluid Mechanics",
    question: "What is the relationship between gauge pressure, absolute pressure, and atmospheric pressure?",
    options: ["P_abs = P_atm + P_gauge", "P_gauge = P_abs + P_atm", "P_atm = P_abs + P_gauge", "P_abs = P_atm - P_gauge"],
    hints: [
      "Gauge pressure represents pressure measured above atmosphere.",
      "Add atmospheric standard reference to achieve zero base."
    ],
    correctAnswerIndex: 0,
    explanation: "Absolute pressure is the sum of gauge and atmospheric pressures."
  },
  {
    id: 4,
    subject: "Fluid Mechanics",
    question: "In a steady, incompressible flow, if cross-sectional area decreases by half, what happens to speed?",
    options: ["Doubles", "Halves", "Quadrules", "No change"],
    hints: [
      "Use continuity equation: Area * Velocity = Constant.",
      "With half area, velocity must adjust upwards to pass same volume."
    ],
    correctAnswerIndex: 0,
    explanation: "A1 * V1 = A2 * V2. If area halves, velocity must double."
  },
  {
    id: 5,
    subject: "Fluid Mechanics",
    question: "Which dimensionless parameter represents the ratio of inertia forces to viscous forces?",
    options: ["Reynolds Number", "Froude Number", "Mach Number", "Weber Number"],
    hints: [
      "Measures fluid turbulent tendencies.",
      "Defined mathematically as ρVD/μ."
    ],
    correctAnswerIndex: 0,
    explanation: "Reynolds number Re = ρVD/μ is the ratio of inertia forces to viscous forces."
  },
  {
    id: 6,
    subject: "Fluid Mechanics",
    question: "For fully developed laminar flow in a circular pipe, how does friction factor (f) relate to Reynolds Number (Re)?",
    options: ["f = 64 / Re", "f = 16 / Re", "f = 0.316 / Re^0.25", "f = 4 / Re"],
    hints: [
      "Derived from Darcy-Weisbach head loss equations.",
      "Is exclusively dynamic function of Re below critical laminars.",
      "Friction equals 64 divided by Re."
    ],
    correctAnswerIndex: 0,
    explanation: "Friction factor f for laminar fluid flow is exactly 64 / Re according to Darcy-Weisbach."
  },
  {
    id: 7,
    subject: "Fluid Mechanics",
    question: "The line of action of the buoyant force always acts through which geometric point?",
    options: ["Centroid of the displaced volume", "Center of gravity of the floating body", "Metacenter", "Center of pressure"],
    hints: [
      "Buoyancy is the weight of displaced fluid volume.",
      "Acts upward straight through the geometric centroid of that volume."
    ],
    correctAnswerIndex: 0,
    explanation: "By Archimedes' principle, buoyancy acts through the centroid of displaced volume (center of buoyancy)."
  },
  {
    id: 8,
    subject: "Fluid Mechanics",
    question: "A local fluid velocity field is given by u = 2x, v = -2y. Determine if flow satisfies continuity.",
    options: ["Satisfies continuity", "Fails continuity", "Satisfies compressible continuity only", "Unstable velocity field"],
    hints: [
      "2D Incompressible continuity: ∂u/∂x + ∂v/∂y = 0.",
      "Calculate derivatives: ∂u/∂x = 2, ∂v/∂y = -2.",
      "Sum of derivatives = 0."
    ],
    correctAnswerIndex: 0,
    explanation: "∂u/∂x + ∂v/∂y = 2 - 2 = 0. Incompressible continuity is satisfied."
  },
  {
    id: 9,
    subject: "Fluid Mechanics",
    question: "Under laminar flow in pipes, the ratio of maximum velocity (at center) to average velocity is:",
    options: ["2.00", "1.50", "1.33", "2.50"],
    hints: [
      "The velocity profile is a parabola.",
      "Hagen Poiseuille derivation relates peak head flow rates.",
      "The value matches exactly 2.0."
    ],
    correctAnswerIndex: 0,
    explanation: "The Hagen-Poiseuille parabolic velocity distribution has u_max / V_avg = 2.0."
  },
  {
    id: 10,
    subject: "Fluid Mechanics",
    question: "FM Technical Viva Panel: Multi-variable timed challenge tracking fluid dynamics, momentum principles, and hydraulic machinery operation parameters.",
    options: ["PASSED", "DEGRADED", "STABILIZED", "CRITICAL"],
    hints: [
      "The final interview deck testing has completed with high results.",
      "Clearance evaluates to 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "Fluid dynamics assessment verified with professional clearance 'PASSED'."
  }
];

// SUBJECT 03: DESIGN OF MACHINE ELEMENTS (DME)
export const GRADE_3_DME_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Design of Machine Elements",
    question: "Define the relationship between a bolt's core diameter ($d_c$) and nominal diameter ($d$) based on standard pitch metrics.",
    options: ["$d_c \\approx 0.84d$", "$d_c = d$", "$d_c = 0.5d$", "$d_c = 1.2d$"],
    hints: [
      "Core diameter is smaller than nominal due to thread thread cutting.",
      "Typically standard ISO metrics multiplier is around 0.84.",
      "Select first option."
    ],
    correctAnswerIndex: 0,
    explanation: "For metric ISO thread profiles, core area d_c is approximately equal to 0.84 * d due to thread pitch depth."
  },
  {
    id: 2,
    subject: "Design of Machine Elements",
    question: "Under fatigue design, the Stress Concentration Factor behaves as a function of:",
    options: ["Component geometry notch severity", "Material yield strength", "Ultimate endurance limit", "Modulus of elasticity"],
    hints: [
      "Relates to localized stress spikes at notches and changes in geometry.",
      "Depends purely on structural outline ratios and not material properties."
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical stress concentration values focus purely on structural layout offsets and notch sharpness."
  },
  {
    id: 3,
    subject: "Design of Machine Elements",
    question: "Under standard design rules, a key is primarily designed to fail in which two modes?",
    options: ["Shearing and Crushing", "Tension and Bending", "Fatigue and Impact", "Torsion and Buckling"],
    hints: [
      "Keys transmit torque between shaft and hub.",
      "Experience shear on plane cutting matching diameters.",
      "Experience crushing on side bearing contact area."
    ],
    correctAnswerIndex: 0,
    explanation: "Shaft keys primarily experience circumferential cutting shear stress and side compressing (crushing) limits."
  },
  {
    id: 4,
    subject: "Design of Machine Elements",
    question: "Calculate the module of a gear having pitch circle diameter of 150 mm and 30 teeth.",
    options: ["5 mm", "32 mm", "10 mm", "3.14 mm"],
    hints: [
      "Definition of module: Module = Pitch Circle Diameter / Teeth count.",
      "Substitute values: 150 / 30.",
      "m = 5 mm."
    ],
    correctAnswerIndex: 0,
    explanation: "m = D / T = 150 / 30 = 5 mm."
  },
  {
    id: 5,
    subject: "Design of Machine Elements",
    question: "If the equivalent loads on a ball bearing are doubled, what happens to its rated rating life L_10?",
    options: ["Reduces to 1/8", "Reduces to 1/2", "Increases to 8 times", "Reduces to 1/4"],
    hints: [
      "L_10 life relates loads under cubic proportion for ball bearings.",
      "L_10 = (C / P)³.",
      "Doubling P makes life (1/2)³ = 1/8."
    ],
    correctAnswerIndex: 0,
    explanation: "Under standard rating formulas, bearing life L_10 = (C/P)³. So doubling load P reduces life by 2³ = 8 times."
  },
  {
    id: 6,
    subject: "Design of Machine Elements",
    question: "The fatigue endurance limit of a component is typically estimated from rotating-beam test results multiplied by which correction factor?",
    options: ["Size, surface, and load factors", "Poisson and elastic ratios", "Shear and bulk coefficients", "Euler buckling constants"],
    hints: [
      "Standard rotating specimens are polished mirrors of small diameter.",
      "Real machined items must reduce stress bounds using Marin factors.",
      "Represents environmental and shape multipliers."
    ],
    correctAnswerIndex: 0,
    explanation: "Marin formulation modifies structural fatigue boundaries with factors representing size, surface, temperature, and load type."
  },
  {
    id: 7,
    subject: "Design of Machine Elements",
    question: "A cotter joint mainly fails due to tensile stress in which section?",
    options: ["Spigot slot cross-section", "Socket collar wall", "Cotter pin shear plane", "Spigot rod body"],
    hints: [
      "Cotter slot cuts out a section of the spigot rod.",
      "This section experiences the highest standard axial tension.",
      "Vulnerability is located at the slot cutout."
    ],
    correctAnswerIndex: 0,
    explanation: "Spigot rod slot section is weakened by slot cutout and represents the maximum axial tensile vulnerability."
  },
  {
    id: 8,
    subject: "Design of Machine Elements",
    question: "A thick power screw has a pitch of 6mm and double start. What is the lead distance of the screw?",
    options: ["12 mm", "6 mm", "3 mm", "24 mm"],
    hints: [
      "Lead = Pitch * Starts.",
      "Starts count is double (2).",
      "L = 6 * 2 = 12 mm."
    ],
    correctAnswerIndex: 0,
    explanation: "Lead = starts * pitch. For double start (n = 2), Lead = 2 * 6mm = 12 mm."
  },
  {
    id: 9,
    subject: "Design of Machine Elements",
    question: "Under Soderberg design boundaries, what properties are mapped on the axis to map alternating limits?",
    options: ["Yield strength and alternating stress", "Endurance limit and yield strength", "Ultimate strength and alternating stress", "Yield strength and ultimate strength"],
    hints: [
      "Alternating stress is charted relative to endurance.",
      "Mean stress is charted relative to yield properties.",
      "Select stress yield option."
    ],
    correctAnswerIndex: 0,
    explanation: "Soderberg criteria maps mean stress relative to yield strength, and alternating stress relative to endurance limits."
  },
  {
    id: 10,
    subject: "Design of Machine Elements",
    question: "DME Technical Viva Panel: Advanced design synthesis exam focusing on multi-axial fatigue loading, gear tooth bending, and safety factor evaluations.",
    options: ["PASSED", "BLOCKED", "STABILIZED", "FAILED"],
    hints: [
      "The final interview deck testing has completed with high results.",
      "Clearance evaluates to 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "DME assessment cleared with maximum performance rating 'PASSED'."
  }
];

// SUBJECT 04: APPLIED THERMODYNAMICS (AT)
export const GRADE_3_AT_QUESTIONS: MechMCQQuestion[] = [
  {
    id: 1,
    subject: "Applied Thermodynamics",
    question: "In an ideal Rankine cycle, steam expands inside the turbine following which process?",
    options: ["Isentropic", "Isothermal", "Isobaric", "Isochoric"],
    hints: [
      "Nozzle expansions are near adiabatic.",
      "Zero friction limits make the process isentropic.",
      "Entropy is constant."
    ],
    correctAnswerIndex: 0,
    explanation: "Ideal power cycle expansion in steam turbines is assumed reversibly adiabatic, which is isentropic."
  },
  {
    id: 2,
    subject: "Applied Thermodynamics",
    question: "What is the dryness fraction (x) of a saturated water-vapor mixture having 2 kg of liquid and 8 kg of steam?",
    options: ["0.80", "0.20", "0.10", "1.00"],
    hints: [
      "Dryness: mass of vapor / (mass of liquid + mass of vapor).",
      "Substitute: 8 / (2 + 8) = 8 / 10.",
      "Dryness x = 0.8."
    ],
    correctAnswerIndex: 0,
    explanation: "Dryness fraction x = m_vapor / (m_liquid + m_vapor) = 8 / (2 + 8) = 0.8."
  },
  {
    id: 3,
    subject: "Applied Thermodynamics",
    question: "In a vapor compression refrigeration cycle, where does the maximum temperature occur?",
    options: ["At compressor discharge", "At condenser exit", "At evaporator inlet", "At expansion valve exit"],
    hints: [
      "Compressor feeds energy into vapor.",
      "Enthalpy surges to superheat state upon discharge.",
      "Condenser cools standard systems down, so peaks are at exit of compressor."
    ],
    correctAnswerIndex: 0,
    explanation: "Refrigerant exits the compressor in superheated state, representing maximum temperature before heat rejection in condenser."
  },
  {
    id: 4,
    subject: "Applied Thermodynamics",
    question: "What is the primary thermodynamic purpose of regenerative feedheating in a Rankine steam cycle?",
    options: ["To increase average temperature of heat addition", "To increase turbine power output directly", "To minimize condenser cooling duty", "To lubricate feedwater pomp rotors"],
    hints: [
      "Preheats feed water returning to boiler from condenser.",
      "Minimizes structural cold shock and lifts efficiency benchmarks.",
      "Select option focusing on heat addition temperature."
    ],
    correctAnswerIndex: 0,
    explanation: "Preheating feed water prior to boiler entry elevates the mean heat addition temperature, increasing thermal performance."
  },
  {
    id: 5,
    subject: "Applied Thermodynamics",
    question: "A multi-stage reciprocating air compressor features intercooling between cylinders to yield which benefit?",
    options: ["Approaches isothermal compression to save work", "Extends mechanical cylinder wall durability", "Directly raises condensation throughput", "Cancels lubricating oil friction"],
    hints: [
      "Intercooling takes place at constant pressures.",
      "Restores volume conditions, matching isothermal lines.",
      "Reduces structural work costs."
    ],
    correctAnswerIndex: 0,
    explanation: "Continuous intercooling shifts the polytropic expansion towards isothermal behavior, minimizing overall compression work."
  },
  {
    id: 6,
    subject: "Applied Thermodynamics",
    question: "For an ideal Brayton cycle, cycle efficiency increases explicitly with which parameter?",
    options: ["Brayton pressure ratio", "Turbine layout diameter", "Fuel combustion temperature limits", "Compressor inlet volume"],
    hints: [
      "Brayton efficiency η = 1 - 1 / (r_p)^((γ-1)/γ).",
      "Is exclusively a function of cycle pressure ratio bounds."
    ],
    correctAnswerIndex: 0,
    explanation: "Brayton efficiency is exclusively a function of pressure ratio and adiabatic index γ."
  },
  {
    id: 7,
    subject: "Applied Thermodynamics",
    question: "An engine running on dry air Otto cycle has cut-off ratio of 1.0. This cycle effectively behaves as a:",
    options: ["Standard Otto cycle", "Diesel cycle", "Brayton cycle", "Dual cycle"],
    hints: [
      "Diesel cycle constant-pressure heat addition is cut off immediately.",
      "Collapses to constant-volume addition Otto cycle.",
      "Cut-off r_c = 1.0 reduces to Otto cycle."
    ],
    correctAnswerIndex: 0,
    explanation: "Diesel cycle collapses back to Otto cycle when the cut-off ratio equals 1 (no constant-pressure heat addition duration)."
  },
  {
    id: 8,
    subject: "Applied Thermodynamics",
    question: "The volume of a compressors cylinder at bottom dead center is 500 cc and clearance is 50 cc. Calculate clearance ratio.",
    options: ["11.1%", "10.0%", "5.0%", "2.5%"],
    hints: [
      "Volumetric clearance is C = V_c / V_stroke.",
      "V_stroke = V_total - V_c = 500 - 50 = 450 cc.",
      "C = 50 / 450 = 11.1%."
    ],
    correctAnswerIndex: 0,
    explanation: "Clearance ratio c = V_c / V_stroke = 50 / (500 - 50) = 50 / 450 = 11.1%."
  },
  {
    id: 9,
    subject: "Applied Thermodynamics",
    question: "In a combined cycle power plant, exhaust heat of a Brayton cycle gas turbine feeds into which cycle?",
    options: ["Rankine steam cycle", "Otto internal combustion cycle", "Stirling external engine lines", "Carnot closed helium circuit"],
    hints: [
      "Uses exhaust to create steam in a waste heat boiler.",
      "Steam drives turbine matching Rankine loops."
    ],
    correctAnswerIndex: 0,
    explanation: "A waste heat recovery boiler (HRSG) uses hot gas exhaust to produce superheated steam for a secondary Rankine cycle."
  },
  {
    id: 10,
    subject: "Applied Thermodynamics",
    question: "AT Technical Viva Panel: Combined thermal systems challenge tracking multi-stage reheat cycles, psychrometric parameters, and combustion stoichiometry.",
    options: ["PASSED", "DEGRADED", "STABILIZED", "CRITICAL"],
    hints: [
      "The final interview deck testing has completed with high results.",
      "Clearance evaluates to 'PASSED'."
    ],
    correctAnswerIndex: 0,
    explanation: "Applied thermodynamics technical panel clears applicant profile as 'PASSED'."
  }
];

export const GRADE_3_QUESTIONS: MechMCQQuestion[] = [...GRADE_3_SOM_QUESTIONS];

// Extensible formula list
export const EXTENSIBLE_FORMULAS: FormulaItem[] = [
  {
    id: "formula-1",
    name: "Pelton Bucket Efficiency",
    equation: "η_h = 2(V_1 - u)(1 + k*cos(β)) * u / V_1²",
    category: "Fluid Mechanics"
  },
  {
    id: "formula-2",
    name: "Epicyclic Planetary Gears",
    equation: "N_a = x + y || N_b = x - y * (T_a / T_b)",
    category: "Dynamics of Machinery"
  },
  {
    id: "formula-3",
    name: "Taylor's Tool Life",
    equation: "V * Tⁿ = C",
    category: "Manufacturing Technology"
  },
  {
    id: "formula-4",
    name: "Isentropic Gas Relations",
    equation: "T_2 / T_1 = (P_2 / P_1)^((γ-1)/γ)",
    category: "Thermodynamics"
  },
  {
    id: "formula-5",
    name: "Beam Deflection (δ_max)",
    equation: "δ_max = (P * L³) / (48 * E * I) [Central Load]",
    category: "Strength of Materials"
  },
  {
    id: "formula-6",
    name: "Torsional Shear Strain (γ_max)",
    equation: "γ_max = (T * r) / J",
    category: "Strength of Materials"
  },
  {
    id: "formula-7",
    name: "Structural Vibrational Frequency",
    equation: "f_n = (1 / 2π) * sqrt(g / δ_static)",
    category: "Mechanical Vibrations"
  }
];

// Standard template adaptor arrays (so we replace content but keep layout loops)
export const BIKES_DATA: Bike[] = [
  {
    id: "gixxer-250",
    name: "GRADE 01: UNIVERSITY CORE",
    category: "performance",
    tagline: "4th-Semester Syllabus Compliance, Fluid Dynamics & Thermodynamics.",
    price: 9400,
    badge: "CORE MATRIX // 4th-Sem",
    colors: [
      { name: "Fluid Jet Stream", hex: "#E2231A", imgUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80" }
    ],
    specs: {
      displacement: "4 Modules",
      cooling: "Syllabus Compliant",
      fuelSystem: "Socratic hints loaded",
      brakes: "Equilibrium governors",
      transmission: "10-Step evaluations",
      power: "Fluid Systems FM",
      torque: "Isentropic relations",
      weight: "100% Core compliance"
    },
    description: "Deep dive evaluation matrix focusing on Porter Governors, Taylor Tool Life, Pelton Turbine Hydraulics, and Diesel cycle thermodynamic balances.",
    riderImg: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80"
  },
  {
    id: "gixxer-sf-250",
    name: "GRADE 02: ANALYTICAL SPRINT",
    category: "performance",
    tagline: "GATE Examination High-Performance Mechanical preparation module.",
    price: 12500,
    badge: "GATE EXAMINATION EXCEL",
    colors: [
      { name: "Resonant Vibrations", hex: "#005ea6", imgUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80" }
    ],
    specs: {
      displacement: "10 GATE Modules",
      cooling: "180s Countdown per item",
      fuelSystem: "MCQ evaluation matrix",
      brakes: "Torsional vibrations",
      transmission: "Flexural rigidity beams",
      power: "Poisson expansions",
      torque: "Prandtl flow boundaries",
      weight: "120s solver clock"
    },
    description: "Curated collection of GATE mechanical engineering problems covering materials strength, kinematics, vibrations, and thermal power cycles.",
    riderImg: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80"
  },
  {
    id: "gsx-r150",
    name: "GRADE 03: EXAMS & INTERVIEW PREP",
    category: "sports",
    tagline: "Core placement MCQ dashboard & technical interview prep syllabus decks.",
    price: 15600,
    badge: "PLACEMENT BOARD // ACTIVE",
    colors: [
      { name: "Mock Viva Rooms", hex: "#FFE600", imgUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=80" }
    ],
    specs: {
      displacement: "4 Core Subjects",
      cooling: "Interactive Viva Console",
      fuelSystem: "Right/Wrong Indicators",
      brakes: "Concept Explanations",
      transmission: "Socratic hints",
      power: "SOM + FM Placement",
      torque: "DME + AT Placement",
      weight: "Immediate response matrix"
    },
    description: "Technical review decks and standard placements MCQs mapped across Strength of Materials, Fluid Mechanics, Mechanical Design & Applied Thermodynamics.",
    riderImg: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
  }
];

export const DEALS_DATA: DealItem[] = [
  {
    id: "deal-grade1",
    banner: "ACADEMIC MILESTONE ACQUIRED",
    name: "Fluid & Thermal Systems Cert",
    wasPrice: 15,
    nowPrice: 14,
    saveAmount: 1,
    colorsCount: 2,
    colorsText: "Fluids, Steam Machinery",
    imgUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80"
  },
  {
    id: "deal-grade2",
    banner: "ANALYTICAL MASTERY CODE",
    name: "Torsional Mechanics Badge",
    wasPrice: 30,
    nowPrice: 25,
    saveAmount: 5,
    colorsCount: 3,
    colorsText: "Vibrations, Structural Hoop Stress",
    imgUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80"
  },
  {
    id: "deal-grade3",
    banner: "EXAMS & INTERVIEW SUCCESS CORE",
    name: "Viva Placement Automated Solver",
    wasPrice: 50,
    nowPrice: 45,
    saveAmount: 5,
    colorsCount: 1,
    colorsText: "Interactive MCQ, Socratic hints",
    imgUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=80"
  }
];

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    icon: "I",
    title: "1st-Sem Physics Balance",
    desc: "Rigid kinematics rules governing load distribution, angular balance, and absolute mechanical stabilization across machinery linkages. Formula: ΣF_x = 0, ΣF_y = 0, ΣM = 0 (Static Equilibrium Equations)."
  },
  {
    icon: "II",
    title: "4th-Sem Thermal Boundaries",
    desc: "Maintaining strict thermodynamic equilibrium, avoiding dissipation spikes, and tracking entropy losses inside thermal flow vessels. Formulation: dQ = dU + dW, ∮(dQ/T) ≤ 0 (First & Second Laws)."
  },
  {
    icon: "III",
    title: "SRE Fault Diagnosis",
    desc: "Exposing progressive Socratic hints rather than hard alerts to encourage deeper mechanical deduction and logic evaluation curves. Method: P(A|B) = [P(B|A) · P(A)] / P(B) (Bayesian Diagnostic Fail-safe Core)."
  },
  {
    icon: "IV",
    title: "Academic Milestone Standard",
    desc: "Locking progressive modules behind standard 3-week timers and awarding elite glowing milstone badges live on player profiles."
  }
];

export const SERVICE_FAQS: ServiceFAQ[] = [
  {
    title: "How does the Socratic hint calculator penalty operate?",
    content: "If you fail an evaluation, the SRE hint node reveals step-by-step guidance. Exposing the ultimate solution after exhausting all 3 progressive hints triggers a direct penalty of -5 points to your candidate score."
  },
  {
    title: "How are the practice leaderboard ratings filtered?",
    content: "Selecting '[INTRA-COLLEGE]' displays students working inside the same core college context, whereas '[INTER-COLLEGE // NATIONAL]' ranks all registered scholars nationally sorted by highest points."
  },
  {
    title: "How does the Grade 03 Prep Station operate?",
    content: "Under Grade 03, the Competitive Exams & Interviews Prep Station delivers four key high-impact mechanical subjects featuring multiple choice questions, sequential Socratic clues, and detailed formula logic to help students master core interview questions."
  }
];

export const TIMELINE_MOMENTS: TimelineMoment[] = [
  { year: "V1.0", title: "Interactive Equations Console", body: "Initial deployment for formulas retrieval. Built for immediate math terminal references." },
  { year: "V2.0", title: "Interactive Grade Quizzes", body: "Incorporated Core study grids. Designed specialized mathematical evaluation engines." },
  { year: "V2.40", title: "MechForge Competitive Exams & Interviews Sandbox", body: "Equipped full interview MCQ preparation decks, progressive Socratic clues, and real-time academic scoring charts." }
];

export const DEALERS_DATA: Dealer[] = [
  {
    id: "dealer-1",
    name: "MechForge Open Dynamics Sandbox",
    division: "Kinematics Unit",
    address: "Simulated Virtual Physical Lab Environment, Cloud Sandbox Alpha",
    phone: "+1 (800) MECH-LEARN",
    email: "dynamics@mechforge.io",
    hasService: true
  },
  {
    id: "dealer-2",
    name: "High-Performance Stress & Deformation Cell",
    division: "Materials Science",
    address: "Structural Finite Element Simulated Lab, Cloud Sandbox Beta",
    phone: "+1 (800) STRUCT-CORE",
    email: "stress@mechforge.io",
    hasService: true
  },
  {
    id: "dealer-3",
    name: "Laminar Boundary Fluid Dynamics Cluster",
    division: "Aerodynamics",
    address: "Hydrodynamics & Navier-Stokes Numerical Solver Cell, Sandbox Gamma",
    phone: "+1 (800) FLUID-FLOW",
    email: "fluid@mechforge.io",
    hasService: true
  }
];
