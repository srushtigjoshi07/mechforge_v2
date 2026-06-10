import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BookOpen,
  Hourglass,
  Video,
  Music,
  Tv,
  GraduationCap,
  Volume1,
  RotateCw
} from 'lucide-react';

interface QuickQuizModalProps {
  topicId: "CAD" | "FEA" | "CFD" | "SRE" | "IoT";
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pts: number) => void;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Full-Fidelity Academic Multi-Media Theory Lessons mapping
interface TopicTheory {
  concept: string;
  formula: string;
  explanation: string;
  videoDescription: string;
  bulletPoints: string[];
  audioTranscript: string;
  synthesizerFrequency: number;
}

const getDynamicTheoryAndQuiz = (topicId: string): { theory: TopicTheory; quiz: QuizQuestion } => {
  const daySeed = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  
  // Deterministic seeded pseudo-random helper
  const makeRandom = (subSeed: number) => {
    let s = (daySeed * 9301 + 49297) % 233280 + subSeed * 1013904223;
    return () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  };

  const rand = makeRandom(0);
  const randRange = (min: number, max: number) => min + rand() * (max - min);
  const randInt = (min: number, max: number) => Math.floor(randRange(min, max + 1));
  function pick<T>(arr: T[]): T[] {
    const list = [...arr];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  }
  function pickOne<T>(arr: T[]): T {
    return arr[Math.floor(rand() * arr.length)];
  }

  // Choose which template index to run out of our 5 rich templates based on daySeed
  const templateIdx = daySeed % 5;

  let theory: TopicTheory;
  let quiz: QuizQuestion;

  if (topicId === "CAD") {
    switch (templateIdx) {
      case 0: {
        const N = pickOne([4, 6, 8, 10]);
        const J1 = N - 1;
        const J2 = randInt(0, 2);
        const dof = 3 * (N - 1) - 2 * J1 - J2;
        theory = {
          concept: `Planar Kinematics & Linkage Constraints (Scenario CAD-A-${daySeed % 1000})`,
          formula: "DOF = 3(N - 1) - 2·J_1 - J_2 (Gruebler’s Criterion)",
          explanation: `To fully define the reciprocating planar motion of an assembly of N = ${N} linkage parts, we configure exactly J_1 = ${J1} lower-pair joints and J_2 = ${J2} higher-pair guides. Gruebler's criterion resolves this with mobility DOF = ${dof}.`,
          videoDescription: `Dynamic CAD Pivot Simulator: Rendering ${N} parallel crank pivots and coplanar flat slider constraints locking free structural degrees of freedom in real-time.`,
          bulletPoints: [
            `N = ${N} represents the total count of moving parts within the kinematics assembly.`,
            `J_1 = ${J1} represents lower-pair joints with 1 degree of freedom (such as concentric pins and planar sliders).`,
            `J_2 = ${J2} represents higher-pair points (such as gear contact nodes or roller guides).`
          ],
          audioTranscript: `CAD simulation initialized. Analyzing kinematics linkage degrees of freedom. Gruebler's criterion dictates that planar assemblies are restricted exactly to safe sliding parameters when planar guides match concentric cylindrical pins.`,
          synthesizerFrequency: 180 + dof * 10
        };
        quiz = {
          question: `A mechanical assembly has been modeled with N = ${N} moving parts, J_1 = ${J1} lower-pair pins or slider joints, and J_2 = ${J2} higher-pair gear contacts or roller guides. What is the calculated mobility (DOF) according to Gruebler’s criterion?`,
          options: [
            `Exactly ${dof} degree(s) of freedom (calculated precisely via mobility formulations)`,
            `Exactly ${dof + 2} degree(s) of freedom with excessive redundant loose travel`,
            `Exactly ${Math.max(0, dof - 2)} degree(s) of freedom with frozen lock state`
          ],
          correctIndex: 0,
          explanation: `Applying Gruebler's formula: DOF = 3 * (${N} - 1) - 2 * ${J1} - ${J2} = ${3 * (N - 1)} - ${2 * J1} - ${J2} = ${dof}.`
        };
        break;
      }
      case 1: {
        const J11 = randInt(2, 6);
        const q1 = randInt(3, 8);
        const V_task = J11 * q1;
        theory = {
          concept: `Robotic Joint Velocity Space & Jacobian Task Coordination (Scenario CAD-B-${daySeed % 1000})`,
          formula: "V_task = J_11 · q_dot_1 (Kinematic Posture Mapping)",
          explanation: `Robotic tool synchronization transforms joint space input speeds into cartesian end-effector linear motions. At the current angular posture joint-coefficient J_11 = ${J11} mm/rad, and rotary speed q_dot_1 = ${q1} rad/s, the Cartesian tools linear velocity results in V_task = ${V_task} mm/s.`,
          videoDescription: `Singularity Tracker Engine: Displays joints speed gains peaking near physical boundary ranges, highlighting tool vector alignments.`,
          bulletPoints: [
            `J_11 = ${J11} represents the posture-dependent Jacobian multiplier value.`,
            `q_dot_1 = ${q1} is the rotational speed input of the primary linkage actuator in radians per second.`,
            `The linear output V_task scales proportionally with joint speeds.`
          ],
          audioTranscript: `Joint coordinator online. Detailing velocity bounds. Jacobian matrix transforms rates mapping joints to end effector coordinate space smoothly.`,
          synthesizerFrequency: 200 + V_task
        };
        quiz = {
          question: `If a robotic manipulator possesses a posture-dependent Jacobian coefficient J_11 = ${J11} mm/rad, and its primary joint actuator rotates at an instantaneous speed of q_dot_1 = ${q1} rad/s, what is the calculated Cartesian tools linear velocity along that primary task coordinate?`,
          options: [
            `Exactly ${V_task} mm/s (direct linear multiplication mapping)`,
            `Exactly ${V_task * 2} mm/s (assuming secondary angular acceleration components)`,
            `Exactly ${Math.floor(V_task / 2)} mm/s (due to joint frictional dampening limits)`
          ],
          correctIndex: 0,
          explanation: `Applying the mapping: V_task = J_11 * q_dot_1 = ${J11} * ${q1} = ${V_task} mm/s.`
        };
        break;
      }
      case 2: {
        const N = randInt(4, 8);
        const redundant = randInt(1, 4);
        theory = {
          concept: `Assembly Constraints & Redundant Gradients (Scenario CAD-C-${daySeed % 1000})`,
          formula: "M = 6(N - 1) - Sum(f_i) + H_r (Spatial Mobility)",
          explanation: `Adding excess redundant concentric cylinder joints beyond the primary alignment leads to severe numerical over-constraint. Systems with N = ${N} spatial bodies and H_r = ${redundant} redundant limits must be resolved to prevent assembly simulation failure.`,
          videoDescription: `Spatial Degrees Optimizer: Checks active assembly mates, identifying redundant structural seals and joint binds automatically.`,
          bulletPoints: [
            `N = ${N} represents the count of spatial bodies within the assembly matrix.`,
            `H_r = ${redundant} counts the excess redundant structural constraint bounds forcing over-constraints.`,
            `Excess redundant mates generate fictitious infinite stress peaks inside FEA solver matrices.`
          ],
          audioTranscript: `Constraint compiler activated. Merging concentric spatial anchors. Over-constrained boundaries detected.`,
          synthesizerFrequency: 220
        };
        quiz = {
          question: `During the design of a spatial assembly containing N = ${N} distinct mechanical parts, what is the direct downside of establishing ${redundant} excess redundant concentric mates on already aligned rotating shafts?`,
          options: [
            `It induces numerical over-constraint, potentially throwing mathematical errors in kinematic solvers or creating artificial stress peaks in FEA`,
            `It converts all rotary rotational mates into parallel flat sliders, locking lateral travel`,
            `It uniformly increases the computed volumetric gravity loads of the assembly by ${redundant}0%`
          ],
          correctIndex: 0,
          explanation: `Redundant joints reduce solver degrees of freedom excessively, introducing over-constrained algebraic equations and leading to artificial stiffness or stresses in structural models.`
        };
        break;
      }
      case 3: {
        const Nin = pickOne([12, 16, 20, 24]);
        const Nout = Nin * pickOne([2, 3, 4]);
        const RPM_in = randInt(1200, 2400);
        const RPM_out = Math.round(RPM_in * Nin / Nout);
        theory = {
          concept: `Gear Train Reductions & Rotational Kinetics (Scenario CAD-D-${daySeed % 1000})`,
          formula: "RPM_out = RPM_in · (N_in / N_out) (Angular Velocity Conservation)",
          explanation: `Mechanical speed reduction translates angular velocities via gear engagement. With input teeth N_in = ${Nin}, output teeth N_out = ${Nout}, and input motor speed RPM_in = ${RPM_in} RPM, the output shaft revolves at precisely ${RPM_out} RPM.`,
          videoDescription: `Torsional Gear Tooth Meshing Render: Visualizing tooth line contact stress and rotational speed drops across reduction cogwheels.`,
          bulletPoints: [
            `Input gear tooth count N_in = ${Nin} teeth.`,
            `Output gear tooth count N_out = ${Nout} teeth.`,
            `Rotational speed is inversely proportional to gear size, amplifying torque output.`
          ],
          audioTranscript: `Gear coordinator online. Speed reduction factor calculated. Motor torque output increases proportionally to the rotational drop.`,
          synthesizerFrequency: 190
        };
        quiz = {
          question: `A gear reducer is driven by a motor running at RPM_in = ${RPM_in} RPM with an input pinion of N_in = ${Nin} teeth. If the output gear has N_out = ${Nout} teeth, what is the calculated rotational velocity (RPM_out) of the output gear shaft?`,
          options: [
            `Exactly ${RPM_out} RPM (proportional gear ratio reduction)`,
            `Exactly ${Math.round(RPM_in * (Nout / Nin))} RPM (inverted gear ratio error)`,
            `Exactly ${Math.round(RPM_out * 1.5)} RPM (assuming high-speed slippage tolerances)`
          ],
          correctIndex: 0,
          explanation: `RPM_out = RPM_in * (N_in / N_out) = ${RPM_in} * (${Nin} / ${Nout}) = ${RPM_out} RPM. Torque is amplified by this same inverse factor.`
        };
        break;
      }
      default: {
        const bore = randInt(60, 90);
        const stroke = randInt(70, 110);
        const disp = Math.round(Math.PI * Math.pow(bore / 2, 2) * stroke / 1000 * 10) / 10;
        theory = {
          concept: `Reciprocating Piston Displacement Metrics (Scenario CAD-E-${daySeed % 1000})`,
          formula: "V_disp = π · (B/2)² · S (Volumetric Cylinder Sweep)",
          explanation: `In standard internal combustion configurations, physical piston travel sweeps out a specific volume. For a cylinder bore diameter B = ${bore} mm and stroke S = ${stroke} mm, the swept displacement volume evaluates to V_disp = ${disp} cm³.`,
          videoDescription: `Piston Crankshaft Swivel View: Rendering geometric cylinder sweep and gas boundaries changing across piston strokes.`,
          bulletPoints: [
            `B = ${bore} mm is the cylindrical piston bore diameter.`,
            `S = ${stroke} mm is the absolute top-to-bottom piston stroke length.`,
            `Swept volume is the principal geometric variable governing engine compression ratios.`
          ],
          audioTranscript: `Piston sweep volume analysis locked. Computing combustion chamber metrics.`,
          synthesizerFrequency: 175
        };
        quiz = {
          question: `A custom single-cylinder internal combustion engine is specified with a cylinder bore diameter boundary of B = ${bore} mm and a reciprocating piston stroke of S = ${stroke} mm. What is the calculated swept displacement volume (V_disp) of this cylinder in cm³?`,
          options: [
            `Approximately ${disp} cm³ (applying standard sweep formulas)`,
            `Approximately ${Math.round(disp * 4)} cm³ (due to mistaking bore diameter for cylinder radius)`,
            `Approximately ${Math.round(disp * 0.785)} cm³ (due to incorrect axial scaling factors)`
          ],
          correctIndex: 0,
          explanation: `V_disp = pi * (B/2)^2 * S = pi * (${bore}/2)^2 * ${stroke} mm³ = pi * ${Math.pow(bore / 2, 2)} * ${stroke} = ${Math.round(Math.PI * Math.pow(bore / 2, 2) * stroke)} mm³ ≈ ${disp} cm³.`
        };
        break;
      }
    }
  } else if (topicId === "FEA") {
    switch (templateIdx) {
      case 0: {
        const E1 = pickOne([50, 70, 100]);
        const E2 = E1 * 2;
        theory = {
          concept: `Continuous Strain Deflection & Young's Modulus (Scenario FEA-A-${daySeed % 1000})`,
          formula: "δ = F·L³ / (3·E·I) (Cantilever Deflection Limit)",
          explanation: `Young's Modulus of Elasticity (E) governs molecular stiffness. Overriding a load-bearing material from a low stiffness composite (E = ${E1} GPa) to structural alloy (E = ${E2} GPa) doubles E, which reduces maximum bending deflection by precisely 50%.`,
          videoDescription: `Stress Map Render: Displays colored tension contours and bending deformation profiles under extreme edge forces.`,
          bulletPoints: [
            `E1 = ${E1} GPa represents the initial low-rigidity elastomer material option.`,
            `E2 = ${E2} GPa is the high-strength replacement structural alloy.`,
            `Bending displacement is strictly inversely proportional to Young's modulus E.`
          ],
          audioTranscript: `Stiffness optimization run. Upgrading Young's Modulus provides a proportional benefit, reducing localized bending deflection in half.`,
          synthesizerFrequency: 240
        };
        quiz = {
          question: `Under identical mechanical dimensions and boundary load profiles, if a cantilever structural member's fabrication material is upgraded from a composite with E = ${E1} GPa to an alloy with E = ${E2} GPa, how does the computed peak tip deflection change?`,
          options: [
            `It decreases by exactly 50% (inverse correlation with the elastic modulus change)`,
            `It decreases by exactly 25% (due to non-linear tension boundary distributions)`,
            `It remains completely unchanged because deflection is governed strictly by the inertial area parameter I`
          ],
          correctIndex: 0,
          explanation: `Since deflection is inversely proportional to Young's modulus (E), doubling the modulus (from ${E1} GPa to ${E2} GPa) reduces deflection exactly by half (50% reduction).`
        };
        break;
      }
      case 1: {
        const sx = randInt(110, 160);
        const sy = randInt(60, 90);
        const vm = Math.round(Math.sqrt(sx * sx - sx * sy + sy * sy) * 10) / 10;
        theory = {
          concept: `Ductile Yielding & Biaxial Von Mises equivalent stresses (Scenario FEA-B-${daySeed % 1000})`,
          formula: "σ_v = sqrt( σ_x² - σ_x·σ_y + σ_y² ) (Plane Stress Tension Form)",
          explanation: `Von Mises equivalent stress aggregates multidirectional stress states into a single comparable scalar value (σ_v). Under normal biaxial tension σ_x = ${sx} MPa and σ_y = ${sy} MPa (with zero shear), the equivalent Von Mises stress calculates to σ_v = ${vm} MPa.`,
          videoDescription: `Von Mises Tension Canvas: Highlights ductile yield limits and safety boundaries across shear planes.`,
          bulletPoints: [
            `σ_x = ${sx} MPa is the primary normal axial tension.`,
            `σ_y = ${sy} MPa is the transverse normal tension.`,
            `Yielding initiates when equivalent Von Mises stress exceeds the material's yield strength under uniaxial load.`
          ],
          audioTranscript: `Von Mises solver complete. Calculating multiaxial equivalent stress fields to verify ductile elastic safety.`,
          synthesizerFrequency: 250
        };
        quiz = {
          question: `An aerospace titanium sheet undergoes uniform biaxial tensile loading on a planar surface with normal stress values of σ_x = ${sx} MPa and σ_y = ${sy} MPa (with zero shear stress). What is the calculated equivalent Von Mises stress (σ_v) in MPa?`,
          options: [
            `Approximately ${vm} MPa (evaluated under the multi-axial quadratic tensor)`,
            `Exactly ${sx + sy} MPa (the linear algebraic sum of normal stresses)`,
            `Exactly ${sx - sy} MPa (the shear difference margin of the two normal axes)`
          ],
          correctIndex: 0,
          explanation: `Applying the plane Von Mises equation: σ_v = sqrt(${sx}² - ${sx}*${sy} + ${sy}²) = sqrt(${sx * sx} - ${sx * sy} + ${sy * sy}) = sqrt(${sx * sx - sx * sy + sy * sy}) ≈ ${vm} MPa.`
        };
        break;
      }
      case 2: {
        const A = randInt(100, 300);
        const L = randInt(800, 1500);
        const k = Math.round((A * 200000) / L);
        theory = {
          concept: `Truss Member Axial Stiffness Formulations (Scenario FEA-C-${daySeed % 1000})`,
          formula: "k = A · E / L (Axial Bar Spring-Constant)",
          explanation: `Structural design resolves discrete truss networks. For an axial bar with area A = ${A} mm², fabrication material of Steel (E = 200,000 N/mm²), and element length L = ${L} mm, the internal axial stiffness constant k equals ${k} N/mm.`,
          videoDescription: `Axial Stress Wave Simulator: Tracks tensile/compressive strain nodes propagation along loaded linear structural beams.`,
          bulletPoints: [
            `A = ${A} mm² represents the cross-sectional area.`,
            `E = 200,000 N/mm² of standard structural grade steel.`,
            `L = ${L} mm is the single element finite truss length.`
          ],
          audioTranscript: `Axial stiffness matrices registered. Truss coordinate spring rates are strictly proportional to area and inversely proportional to length.`,
          synthesizerFrequency: 235
        };
        quiz = {
          question: `A steel structure contains an axial truss member with a cross-sectional area of A = ${A} mm² and a total length of L = ${L} mm. Assuming Young's Modulus for steel is E = 200,000 N/mm², what is the computed axial stiffness value (k) in N/mm of this truss element?`,
          options: [
            `Exactly ${k} N/mm (derived from 1D structural stiffness calculations)`,
            `Exactly ${Math.round(k * 10)} N/mm (due to unit conversion error in GPa factors)`,
            `Exactly ${Math.round(k / 2)} N/mm (assuming safety shear discounts across the pins)`
          ],
          correctIndex: 0,
          explanation: `k = A * E / L = ${A} * 200,000 / ${L} = ${A * 200000} / ${L} ≈ ${k} N/mm.`
        };
        break;
      }
      case 3: {
        const press = randInt(2, 6);
        const area = randInt(50, 120);
        const force = press * area * 100;
        theory = {
          concept: `Hydrostatic Pressure Vector Integrations (Scenario FEA-D-${daySeed % 1000})`,
          formula: "F = P · A (Uniform Pressure Force Integration)",
          explanation: `Hydraulic boundaries experience uniform lateral thrust from fluid volumes. If a flat sealing plate area A = ${area} cm² is subject to hydrodynamic pressures of P = ${press} MPa (N/mm²), the net clamping force resolves to F = ${force} Newtons.`,
          videoDescription: `Pressure Plate Deformation: Visualizing structural gasket seals compressing under uniform hydraulic thrust.`,
          bulletPoints: [
            `P = ${press} MPa is the uniform input fluid pressure.`,
            `A = ${area} cm² (${area * 100} mm²) is the flat sealing surface plane.`,
            `Total clamping force is calculated as pressure multiplied by surface area.`
          ],
          audioTranscript: `Hydraulic thrust mapped. Distributing normal stress vectors uniformly across the gasket boundary interface.`,
          synthesizerFrequency: 215
        };
        quiz = {
          question: `An aerospace hydraulic control block features a flat gasket cover plate with a surface area of A = ${area} cm². If the internal fluid holds a pressurized boundary of P = ${press} MPa, what is the integrated normal clamping force (F) in Newtons loading the bolts?`,
          options: [
            `Exactly ${force} Newtons (resolved via integrated pressure-area vectors)`,
            `Exactly ${force * 10} Newtons (due to incorrect mm² to cm² unit conversions)`,
            `Exactly ${Math.round(force * 0.707)} Newtons (assuming lateral drag loss vectors)`
          ],
          correctIndex: 0,
          explanation: `1 MPa = 1 N/mm² = 100 N/cm². Force F = P * A_mm² = ${press} N/mm² * (${area} * 100) mm² = ${press} * ${area * 100} = ${force} Newtons.`
        };
        break;
      }
      default: {
        const alpha = randInt(11, 23);
        const tempDelta = randInt(30, 80);
        const stress = Math.round(alpha * tempDelta * 200000 / 1000000);
        theory = {
          concept: `Thermal Expansion Constraints & Elastic Stresses (Scenario FEA-E-${daySeed % 1000})`,
          formula: "σ_thermal = α · ΔT · E (Restricted Linear Expansion Strain)",
          explanation: `Preventing thermal expansions generates substantial compressive stress. For steel girders (E = 200 GPa) with an expansion coefficient α = ${alpha} ppm/°C, rising ambient bounds by ΔT = ${tempDelta}°C under rigid axial seals induces a thermal stress of σ_thermal = ${stress} MPa.`,
          videoDescription: `Thermal Stress Expansion Render: Color-coding compression bounds within structural beams under constrained growth.`,
          bulletPoints: [
            `α = ${alpha} × 10⁻⁶ /°C represents the thermal strain expansion coefficient.`,
            `ΔT = ${tempDelta}°C represents the absolute thermal fluctuation from standard baseline.`,
            `Steel elasticity E = 200 GPa is highly sensitive to restricted thermal expands.`
          ],
          audioTranscript: `Thermal constraint analysis active. Constraints prevent linear molecular expansion, converting temperature elevation directly into uniform compressive stress.`,
          synthesizerFrequency: 245
        };
        quiz = {
          question: `A steel concrete structural beam (E = 200 GPa) is locked between two rigid abutments that completely prevent axial movement. If the material's expansion coefficient is α = ${alpha} ppm/°C and temperature increases by ΔT = ${tempDelta}°C, what thermal stress is induced in the girders?`,
          options: [
            `Exactly ${stress} MPa (calculated compressive thermal stress)`,
            `Exactly ${stress * 5} MPa (assuming dynamic non-linear expansion ratios)`,
            `Exactly 0 MPa (since physical length cannot stretch, stress remains zero)`
          ],
          correctIndex: 0,
          explanation: `Thermal strain = alpha * deltaT = (${alpha} * 10^-6) * ${tempDelta} = ${alpha * tempDelta} * 10^-6. Stress σ = strain * E = ${alpha * tempDelta * 10^-6} * 200,000 MPa = ${alpha * tempDelta * 0.2} = ${stress} MPa.`
        };
        break;
      }
    }
  } else if (topicId === "CFD") {
    switch (templateIdx) {
      case 0: {
        const vel = randInt(25, 45);
        const area = randInt(2, 5);
        const Cd = pickOne([0.3, 0.4, 0.5]);
        const drag = Math.round(0.5 * 1.2 * vel * vel * Cd * area);
        theory = {
          concept: `Aerodynamic Drag & Boundary Layer Separation (Scenario CFD-A-${daySeed % 1000})`,
          formula: "F_drag = 0.5 · ρ · v² · C_d · A (Form/Pressure Drag)",
          explanation: `Aerodynamic structures experience pressure drag proportional to fluid density, frontal surface area, and velocity squared. For a wing profile of area A = ${area} m², drag coefficient C_d = ${Cd}, moving through ambient air (ρ = 1.2 kg/m³) at speed v = ${vel} m/s, the drag force resolves to ${drag} Newtons.`,
          videoDescription: `Wind Tunnel Particle Stream: Showing laminar stream lines splitting apart and forming turbulent low-pressure wake eddies.`,
          bulletPoints: [
            `ρ = 1.2 kg/m³ represents nominal standard dry air density limits.`,
            `v = ${vel} m/s is the incoming streamline relative fluid speed.`,
            `C_d = ${Cd} represents the non-dimensional body form obstruction factor.`
          ],
          audioTranscript: `Wind tunnel data logged. Pressure wake drag scales quadratically with flow speed, reflecting vortex shedding behaviors.`,
          synthesizerFrequency: 320
        };
        quiz = {
          question: `An experimental wing segment of frontal profile area A = ${area} m² and drag coefficient Cd = ${Cd} is subjected to standard air (ρ = 1.2 kg/m³) flow testing. If the relative freestream velocity is v = ${vel} m/s, what is the calculated total aerodynamic pressure drag force (F_drag) in Newtons?`,
          options: [
            `Approximately ${drag} Newtons (applying standard drag formulas)`,
            `Approximately ${Math.round(drag * 2)} Newtons (neglecting the 0.5 multiplier component)`,
            `Approximately ${Math.round(drag * 0.5)} Newtons (due to incorrect velocity scaling assumptions)`
          ],
          correctIndex: 0,
          explanation: `F_drag = 0.5 * rho * v² * Cd * A = 0.5 * 1.2 * ${vel}² * ${Cd} * ${area} = 0.6 * ${vel * vel} * ${Cd} * ${area} = ${drag} Newtons.`
        };
        break;
      }
      case 1: {
        const reduction = 50;
        theory = {
          concept: `Viscous Hagen-Poiseuille Tube Loss Scaling (Scenario CFD-B-${daySeed % 1000})`,
          formula: "ΔP = (128 · μ · L · Q) / (π · D⁴) (Quartic Loss Conservation)",
          explanation: `Viscous frictional energy dissipation scales quadratically with speed, and is extremely sensitive to conduit diameter bounds. According to Hagen-Poiseuille equations, restricting the conduit tube diameter D to 50% under constant flow Q increases the viscous head loss exactly 16 times.`,
          videoDescription: `Pipe Velocity Grid: Renders high-viscosity fluid velocity gradients slowing down near tube walls.`,
          bulletPoints: [
            `D represents the nominal pipeline bore diameter, directly controlling core shear.`,
            `Pressure drop is inversely proportional to D raised to the fourth power.`,
            `Halving diameter forces massive flow accelerations and shear gradients.`
          ],
          audioTranscript: `Head loss calculator active. Halving conduit diameter under constant flow multiplies pressure differentials by sixteen due to quartic scaling limits.`,
          synthesizerFrequency: 310
        };
        quiz = {
          question: `In steady laminar conduit fluid flow, if manufacturing constraints dictate reducing the pipeline's internal diameter D by exactly ${reduction}%, how does the computed viscous pressure drop (ΔP) along the pipeline scale under a constant volumetric flow rate Q?`,
          options: [
            `It increases exactly 16 times (due to the inverse quartic diameter correlation)`,
            `It increases exactly 4 times (due to standard flow velocity doubling properties)`,
            `It decreases by exactly 75% due to reduced bulk perimeter viscous shearing contact`
          ],
          correctIndex: 0,
          explanation: `By Hagen-Poiseuille, DeltaP is proportional to 1/D⁴. Halving the diameter D (reduction of 50%) causes DeltaP to change by a factor of 1 / (0.5)⁴ = 1 / 0.0625 = 16 times increase.`
        };
        break;
      }
      case 2: {
        const vel = randInt(2, 5);
        const diam = pickOne([1, 2]);
        const reynolds = vel * (diam / 100) * 1000000;
        theory = {
          concept: `Flow Regime Transition & Reynolds Numbers (Scenario CFD-C-${daySeed % 1000})`,
          formula: "Re = v · D / ν (Inertial vs Viscous Forces Balance)",
          explanation: `Fluid flows change behavior from laminar arrays to chaotic vortexes based on the Reynolds number (Re). For water flowing in a tube of diameter D = ${diam} cm at velocity v = ${vel} m/s, the relative calculation yields Re = ${reynolds.toLocaleString()}.`,
          videoDescription: `Turbulent Vortex Dispersions: Shows orderly fluid stream lines shearing apart into chaotic eddies.`,
          bulletPoints: [
            `v = ${vel} m/s is the calculated average pipeline flow speed.`,
            `D = ${diam} cm (${diam / 100} m) is the pipe bore diameter boundary.`,
            `Re above 4,000 indicates a transition into fully turbulent flow behavior.`
          ],
          audioTranscript: `Flow regime analyzer running. The computed Reynolds number is high, indicating a transition from quiet laminar streamlines to chaotic turbulent eddies.`,
          synthesizerFrequency: 330
        };
        quiz = {
          question: `Water flows through a smooth pipe of diameter D = ${diam} cm at a velocity of v = ${vel} m/s. If the kinematic viscosity of water is ν = 1.0 × 10⁻⁶ m²/s, what is the calculated Reynolds number (Re) governing this flow state?`,
          options: [
            `Exactly ${reynolds.toLocaleString()} (turbulent boundary profile)`,
            `Exactly ${Math.round(reynolds / 10)} (boundary transition zone)`,
            `Exactly ${Math.round(reynolds * 2)} (high turbulence profile)`
          ],
          correctIndex: 0,
          explanation: `Re = v * D / v. Here, v = ${vel} m/s, D = ${diam / 100} m, and v = 1e-6 m²/s. Re = ${vel} * ${diam / 100} / 1e-6 = ${vel * (diam / 100) * 1000000} = ${reynolds}.`
        };
        break;
      }
      case 3: {
        const vel = randInt(350, 680);
        const c = 340;
        const mach = Math.round(vel / c * 100) / 100;
        theory = {
          concept: `Compressible Airflows & Mach Shock Propagation (Scenario CFD-D-${daySeed % 1000})`,
          formula: "M = v / c (Flow Compressibility Index)",
          explanation: `High-speed gas velocities trigger structural shockwaves as speeds bypass the sonic threshold. For gas velocities of v = ${vel} m/s relative to the speed of sound c = 340 m/s, the flow compressibility register matches Mach M = ${mach}.`,
          videoDescription: `Shockwave Envelope Render: Displays high-pressure shock cones forming off high-speed tips in supersonic flows.`,
          bulletPoints: [
            `v = ${vel} m/s is the relative gas boundary velocity.`,
            `c = 340 m/s represents the local acoustic soundwave velocity.`,
            `Mach values above 1.0 signify a transition into supersonic compressible dynamics.`
          ],
          audioTranscript: `Mach solver initialized. Sonic parameters exceeded, prompting shock boundary layer developments.`,
          synthesizerFrequency: 340
        };
        quiz = {
          question: `An aerospace airfoil operates in high-altitude environments where the local speed of sound is c = 340 m/s. If the relative freestream flow gas velocity is measured at v = ${vel} m/s, what is the calculated Mach Number (M) of this flow?`,
          options: [
            `Exactly M = ${mach} (verifying ${mach > 1 ? "supersonic" : "subsonic"} compressible flow regime)`,
            `Exactly M = ${Math.round(vel / 100)} (standard baseline approximation)`,
            `Exactly M = ${Math.round(mach * 10) / 100} (incorrect unit conversion calculation)`
          ],
          correctIndex: 0,
          explanation: `Mach number M = v / c = ${vel} / 340 = ${mach}.`
        };
        break;
      }
      default: {
        const areaRatio = pickOne([2, 4]);
        theory = {
          concept: `Venturi Differential Pressure & Mass Conservation (Scenario CFD-E-${daySeed % 1000})`,
          formula: "ΔP = 0.5 · ρ · v_throat² · (1 - 1/R²) (Pressure Venturi Drop)",
          explanation: `Venturi devices force fluids through narrow throat channels, converting static pressure into kinetic energy. Reducing the channel section area by raw ratio R = ${areaRatio} accelerates flow speeds proportionally, causing the static pressure to drop rapidly according to mass conservation laws.`,
          videoDescription: `Dynamic Venturi Flow: Color-mapping velocity boosts and related pressure drops through constriction sections.`,
          bulletPoints: [
            `R = ${areaRatio} represents the cross-sectional area reduction ratio from inlet to throat.`,
            `Flow velocity through the throat increases exactly by R times.`,
            `Pressure drop across the constriction scales quadratically with velocity gains.`
          ],
          audioTranscript: `Venturi optimizer online. Restricting flow coordinates elevates velocity while generating localized suction fields.`,
          synthesizerFrequency: 305
        };
        quiz = {
          question: `A fluid conduit features a Venturi flow constriction where the cross-sectional area drops from inlet down to constriction by a ratio of R = ${areaRatio}. Under incompressible inviscid flow assumptions, how many times does the relative velocity (v_throat) increase at the throat constriction?`,
          options: [
            `Exactly ${areaRatio} times (derived from the conservation of mass equation: A1·v1 = A2·v2)`,
            `Exactly ${areaRatio * areaRatio} times (matching cross-sectional area quadratic changes)`,
            `Exactly ${areaRatio * 3} times (assuming pressure viscosity offsets)`
          ],
          correctIndex: 0,
          explanation: `By the conservation of mass (A1 * v1 = A2 * v2), the velocity at the throat rises exactly as the area decreases, which is proportional to the area ratio R = ${areaRatio} times.`
        };
        break;
      }
    }
  } else if (topicId === "SRE") {
    switch (templateIdx) {
      case 0: {
        const n = pickOne([3, 4]);
        const R = pickOne([0.85, 0.9, 0.95]);
        const Rsys = Math.round(Math.pow(R, n) * 1000) / 10;
        theory = {
          concept: `Series Manifolds & Mechanical Product Reliability (Scenario SRE-A-${daySeed % 1000})`,
          formula: "R_sys = R_1 · R_2 · ... · R_n (Series System Convergence)",
          explanation: `Under standard series system configurations, every single mechanical component must function successfully. For an engineering module containing n = ${n} critical valve actuators connected in series, each with reliability R = ${R}, the overall aggregate reliability declines to R_sys = ${Rsys}%.`,
          videoDescription: `Series Failure Node: Highlights cascading system interruptions when any single serialized linkage stops operating.`,
          bulletPoints: [
            `n = ${n} is the count of serialized critical mechanical components.`,
            `Reliability R = ${R} represents the independent success rate per element.`,
            `The total system reliability is strictly lower than any individual part success rate.`
          ],
          audioTranscript: `Reliability assessment loaded. Series systems are highly vulnerable to component counts, as total reliability shrinks exponentially with each node addition.`,
          synthesizerFrequency: 140
        };
        quiz = {
          question: `A subsea safety manifold consists of n = ${n} critical pressure control actuators arranged in a strict series configuration (all actuators must work successfully for the system to pass). If each individual actuator has an independent reliability of R = ${R}, what is the overall reliability of the combined series system (R_sys)?`,
          options: [
            `Exactly ${Rsys}% (the mathematical product of each serialized component: R^n)`,
            `Exactly ${Math.round(R * 100)}% (limited only by the single weakest component threshold)`,
            `Exactly ${Math.round((1 - Math.pow(1 - R, n)) * 1000) / 10}% (calculated under parallel redundancy assumptions)`
          ],
          correctIndex: 0,
          explanation: `For series systems: R_sys = R^n. Here R_sys = (${R})^${n} = ${Math.pow(R, n).toFixed(4)} corresponding to ${Rsys}%.`
        };
        break;
      }
      case 1: {
        const ri = randInt(40, 60);
        const ro = randInt(85, 115);
        theory = {
          concept: `Contact Stress Mechanics & Clutches Wear Theories (Scenario SRE-B-${daySeed % 1000})`,
          formula: "p · r = constant (Uniform Wear Criterion Equation)",
          explanation: `Analyzing frictional torque capacity requires modeling contact wear fields. For revolving clutch plates of inner radius r_i = ${ri} mm and outer radius r_o = ${ro} mm, Uniform Pressure predicts higher initial loads because it assumes pressure remains constant everywhere, distributing forces heavily on outer radial areas. Over time, uniform wear takes over, forcing pressure drop-offs at larger radii.`,
          videoDescription: `Clutch Wear Simulator: Color-mapping changes in surface friction pressures transitioning from fresh plates to worn shapes.`,
          bulletPoints: [
            `r_i = ${ri} mm represents clutch internal radial boundary limit.`,
            `r_o = ${ro} mm represents clutch external radial boundary limit.`,
            `Uniform Wear Theory is highly recommended for safety engineering of worn components.`
          ],
          audioTranscript: `Clutch life analyzer active. Uniform pressure theory yields optimistic scores because forces aggregate on larger outer radii.`,
          synthesizerFrequency: 150
        };
        quiz = {
          question: `Why does Uniform Pressure Theory predict a higher initial starting torque capacity than Uniform Wear Theory for a flat plate clutch of outer radius r_o = ${ro} mm and inner radius r_i = ${ri} mm?`,
          options: [
            `Because uniform pressure assumes a constant pressure distribution over the entire plate surface, delivering more force to the outer larger radii (larger torque arm)`,
            `Because sliding friction coefficients double under uniform pressure patterns due to friction swelling`,
            `Because physical centrifugal forces are omitted from uniform pressure calculations`
          ],
          correctIndex: 0,
          explanation: `Uniform pressure allocates normal force uniformly over the entire area, resulting in more localized thrust on larger outer radii (which have more area and larger moment arms), yielding higher torque.`
        };
        break;
      }
      case 2: {
        const lambda = 0.0001;
        const hours = randInt(1000, 3000);
        const rel = Math.round(Math.exp(-lambda * hours) * 1000) / 10;
        theory = {
          concept: `Exponential Decent Survival Rate Models (Scenario SRE-C-${daySeed % 1000})`,
          formula: "R(t) = e^(-λ·t) (Constant Failure Reliability Curve)",
          explanation: `Industrial components operating during their main useful life display constant random failure rates. At a failure rate λ = 0.0001 failures/hour, the calculated survival probability (Reliability) of the system over t = ${hours} hours of continuous operation matches R = ${rel}%.`,
          videoDescription: `Reliability Decay Graph: Plots the exponential survival curve dropping off over operational hours.`,
          bulletPoints: [
            `λ = 0.0001 failures per hour represents the steady mechanical hazard rate.`,
            `t = ${hours} hours is the planned mission operating duration.`,
            `Exponential decay models represent the random stress stage of the bathtub curve.`
          ],
          audioTranscript: `Survival model active. Tracking continuous mechanical operation reliability under constant hazard stresses.`,
          synthesizerFrequency: 160
        };
        quiz = {
          question: `A critical hydraulic pump operates during its useful life with a constant failure rate of λ = 0.0001 failures per hour. What is the calculated reliability (probability of failure-free survival) of this pump over an continuous mission of t = ${hours} hours?`,
          options: [
            `Exactly ${rel}% (exponential decay probability R = e^(-λt))`,
            `Exactly ${Math.round(100 - (lambda * hours * 100))}% (assuming basic linear wear approximations)`,
            `Exactly ${Math.round(rel * 0.5)}% (including 50% environmental factor discounts)`
          ],
          correctIndex: 0,
          explanation: `R(t) = e^(-λt). Here R(${hours}) = e^(-0.0001 * ${hours}) = e^(-${(0.0001 * hours).toFixed(2)}) ≈ ${Math.exp(-lambda * hours).toFixed(4)} or ${rel}%.`
        };
        break;
      }
      case 3: {
        const r1 = pickOne([0.8, 0.9]);
        const overall = Math.round((1 - Math.pow(1 - r1, 2)) * 100);
        theory = {
          concept: `Active Parallel Redundancy & Safety Backups (Scenario SRE-D-${daySeed % 1000})`,
          formula: "R_sys = 1 - (1 - R_1)² (Parallel Double Active Path)",
          explanation: `Adding active parallel backups isolates single point failures. For a system featuring two parallel redundant actuators each with individual safety margins R_1 = ${r1}, failure occurs only if BOTH elements fail, elevating aggregate system reliability to ${overall}%.`,
          videoDescription: `Active Redundant Path: Renders parallel paths highlighting flow bypassing broken elements automatically.`,
          bulletPoints: [
            `R_1 = ${r1} represents the reliability of each independent actuator.`,
            `The system functions as long as at least one pathway remains active.`,
            `Parallel spacing isolates individual defects, creating high-safety systems.`
          ],
          audioTranscript: `Parallel systems boost safety. By pairing redundant paths, total failure chance drops to the joint probability of both links failing simultaneously.`,
          synthesizerFrequency: 145
        };
        quiz = {
          question: `A main mechanical backup valve utilizes two identical redundant actuators connected in an active parallel configuration. If each individual actuator has an independent reliability of R = ${r1}, what is the overall system reliability?`,
          options: [
            `Exactly ${overall}% (calculated via aggregate parallel formulas: 1 - (1-R)²)`,
            `Exactly ${Math.round(r1 * r1 * 100)}% (due to series multiplication error)`,
            `Exactly ${Math.round(r1 * 100)}% (the reliability remains identical to a single pathway)`
          ],
          correctIndex: 0,
          explanation: `R_sys = 1 - (1 - R1) * (1 - R2) = 1 - (1 - ${r1})² = 1 - ${(1 - r1).toFixed(2)}² = 1 - ${(Math.pow(1 - r1, 2)).toFixed(2)} = ${1 - Math.pow(1 - r1, 2)} or ${overall}%.`
        };
        break;
      }
      default: {
        const hours = randInt(12000, 24000);
        const fails = randInt(4, 10);
        const mtbf = Math.round(hours / fails);
        theory = {
          concept: `Mean Time Between Failures (MTBF) Data Modeling (Scenario SRE-E-${daySeed % 1000})`,
          formula: "MTBF = Total_Hours / Total_Failures (Empirical Reliability)",
          explanation: `Aggregate telemetry helps engineers compute lifespan statistics. If a fleet of machinery accumulates T_hours = ${hours} hours of combined runtime and registers F = ${fails} failures, the calculated Mean Time Between Failures evaluates to MTBF = ${mtbf} hours.`,
          videoDescription: `Fleet Reliability Register: Tracking mean wear times and failure instances across service hours.`,
          bulletPoints: [
            `T_hours = ${hours} hours is the combined operating runtime of the fleet.`,
            `F_failures = ${fails} represents the count of failures logged during observation.`,
            `MTBF represents the inverse of the constant failure rate (1/λ).`
          ],
          audioTranscript: `Empirical life calculator online. The calculated average time between hardware failures is registered in hours.`,
          synthesizerFrequency: 155
        };
        quiz = {
          question: `A fleet of heavy industrial gearboxes accumulates a combined operational runtime of ${hours} hours. During this observation period, a total of ${fails} structural gearbox failures are logged. What is the computed Mean Time Between Failures (MTBF) of these gearboxes?`,
          options: [
            `Exactly ${mtbf} hours (derived as Total Hours divided by Total Failures)`,
            `Exactly ${fails} hours (mistakenly matching the total failures count)`,
            `Exactly ${Math.round(hours * fails)} hours (due to incorrect multiplication modeling)`
          ],
          correctIndex: 0,
          explanation: `MTBF = Total Operating Hours / Total Failures = ${hours} / ${fails} ≈ ${mtbf} hours.`
        };
        break;
      }
    }
  } else {
    // IoT
    switch (templateIdx) {
      case 0: {
        const fmax = randInt(150, 480);
        const fs = 2 * fmax;
        theory = {
          concept: `Nyquist Telemetry Bandwidth Limits (Scenario IoT-A-${daySeed % 1000})`,
          formula: "f_sampling >= 2 · f_max (Nyquist-Shannon Shannon Limit)",
          explanation: `To prevent high-frequency noise from folding into telemetry streams and corrupting results, structural vibration sensors must sample at least twice as fast as the highest frequency present in the measured spectrum. With vibration peaks at f_max = ${fmax} Hz, the Nyquist threshold dictates f_sampling >= ${fs} Hz.`,
          videoDescription: `Digital Signal Aliasing: Highlights waveform distortion when sampling speeds drop below the critical Nyquist limit.`,
          bulletPoints: [
            `f_max = ${fmax} Hz is the highest frequency component of interest in the input signal.`,
            `f_sampling = ${fs} Hz is the calculated minimum sampling conversion rate.`,
            `Under-sampling forces frequencies to fold back as incorrect false low-frequency ghost outputs.`
          ],
          audioTranscript: `Digital signal analyzer online. Setting the master sampling frequency to at least twice the peak vibration speed satisfies the Nyquist condition.`,
          synthesizerFrequency: 180 + fmax
        };
        quiz = {
          question: `An industrial gear shaft accelerometer tracks vibration telemetry frequencies peaking at f_max = ${fmax} Hz. Under the Nyquist-Shannon sampling theorem, what is the absolute minimum sampling rate required to prevent digital signal aliasing distortion?`,
          options: [
            `At least ${fs} Hz (exactly twice the maximum signal frequency component)`,
            `Exactly ${fmax} Hz (matching peak signal frequency directly)`,
            `At least ${fmax * 4} Hz (required for standard safety margin multiplier ratios)`
          ],
          correctIndex: 0,
          explanation: `The Nyquist criterion states that the sampling frequency f_s must be at least twice the maximum signal frequency: f_s ≥ 2 * f_max = 2 * ${fmax} = ${fs} Hz.`
        };
        break;
      }
      case 1: {
        const bits = pickOne([8, 12, 16]);
        const Vfs = pickOne([3.3, 5.0]);
        const Vres = Math.round(Vfs / Math.pow(2, bits) * 1000 * 100) / 100;
        theory = {
          concept: `Analog-to-Digital Converter Resolution (Scenario IoT-B-${daySeed % 1000})`,
          formula: "V_resolution = V_fs / 2^b (ADC Bit Step Size)",
          explanation: `ADCs quantize continuous voltage signals into discrete steps. For an ADC with b = ${bits}-bit resolution and a full scale range of V_fs = ${Vfs}V, the smallest measurable voltage step is precisely V_resolution = ${Vres} mV.`,
          videoDescription: `Quantization Resolution wave: Zooming in on wave steps, highlighting resolution gaps in lower-bit systems.`,
          bulletPoints: [
            `b = ${bits} bits represents the digital word width.`,
            `V_fs = ${Vfs}V is the analog input full-scale voltage.`,
            `Increasing bits reduces step heights, lowering digital quantization noise.`
          ],
          audioTranscript: `ADC converter online. Converting analog signals. Under the current bit depth, the resolution step indicates the smallest measurable sensor fluctuation.`,
          synthesizerFrequency: 210
        };
        quiz = {
          question: `An analog pressure sensor streams continuous voltage signals to a ${bits}-bit ADC with a full-scale range of V_fs = ${Vfs}V. What is the calculated resolution step size (V_resolution) in millivolts?`,
          options: [
            `Approximately ${Vres} mV (applying bitwise division: V_fs / 2^b)`,
            `Approximately ${Vres * 2} mV (assuming half-scale multiplier thresholds)`,
            `Exactly ${Math.round(Vfs / bits * 1000) / 1000} mV (dividing directly by raw bit resolution counts)`
          ],
          correctIndex: 0,
          explanation: `V_res = V_fs / 2^b = ${Vfs} / 2^${bits} = ${Vfs} / ${Math.pow(2, bits)} = ${(Vfs / Math.pow(2, bits)).toFixed(6)} V ≈ ${Vres} mV.`
        };
        break;
      }
      case 2: {
        const fc = randInt(100, 500);
        theory = {
          concept: `Anti-Aliasing Filters & Analog Protection (Scenario IoT-C-${daySeed % 1000})`,
          formula: "f_cut = 1 / (2π · R · C) (First-Order Low-Pass Threshold)",
          explanation: `Anti-aliasing filters must be analog rather than digital. If high frequencies exceed the Nyquist limit, digital converters permanently fold them as fake low-frequency signals. Standard first-order filters with cutoff limits at f_cut = ${fc} Hz must be placed BEFORE analog-to-digital conversion blocks.`,
          videoDescription: `Analog Filter Waves: Shows high-frequency surface vibration noise being dampened while letting low frequency telemetry pass through.`,
          bulletPoints: [
            `Filters must be analog to scrub signals prior to ADC digitization.`,
            `Cutoff limit is set at f_cut = ${fc} Hz to protect the Nyquist boundary.`,
            `Stripping high frequencies prevents false signals from corrupting telemetry.`
          ],
          audioTranscript: `Hardware filter analyzer active. Setting analog cut-off bounds prior to the ADC converter prevents high-frequency system vibrations from posing as incorrect low-frequency signals.`,
          synthesizerFrequency: 220
        };
        quiz = {
          question: `Why must an anti-aliasing filter be an analog low-pass circuit placed BEFORE the ADC conversion block in a vibration monitoring gateway?`,
          options: [
            `To strip high frequencies above the Nyquist limit before digitization, preventing them from permanently folding into the spectrum as false low-frequency signals`,
            `To amplify low-voltage sensor inputs by a uniform factor of two`,
            `To filter out low-frequency mechanical drift coordinates exclusive to gravity`
          ],
          correctIndex: 0,
          explanation: `An anti-aliasing filter must be analog because once signal conversion occurs, digital filters cannot distinguish alias waves from raw low-frequency telemetry.`
        };
        break;
      }
      case 3: {
        const dist = randInt(10, 45);
        const db = Math.round(-20 * Math.log10(dist) * 10) / 10;
        theory = {
          concept: `Wireless Transceiver Signal Attenuation (Scenario IoT-D-${daySeed % 1000})`,
          formula: "dB_path = -20 · log10(d) (Simplified Free-Space Path Loss)",
          explanation: `Wireless telemetry drops in signal strength over space. Under standard mathematical models, expanding spatial distance to d = ${dist} meters results in a free-space attenuation factor of approximately ${db} dB.`,
          videoDescription: `Radio Signal Radiation: Highlighting signal energy drops and packet loss over expansion distances.`,
          bulletPoints: [
            `d = ${dist} meters represents wireless signal propagation distance.`,
            `Signal log-loss indicates that power density scales down with the square of distance.`,
            `Dampening curves guide antenna placement and booster relays.`
          ],
          audioTranscript: `Telemetry transceiver link analyzed. Free-space signal degradation calculates as a log factor of the distance.`,
          synthesizerFrequency: 230
        };
        quiz = {
          question: `An offshore gas platform wireless telemetry node transmits sensor data over a distance of d = ${dist} meters. According to free-space path loss equations, what is the calculated attenuation drop in signal strength in decibels?`,
          options: [
            `Approximately ${db} dB (logarithmic signal decay)`,
            `Exactly -${dist * 2} dB (assuming a direct linear decay coordinate per meter)`,
            `Approximately ${Math.round(db * 0.5)} dB (due to omitting the log scaling factors)`
          ],
          correctIndex: 0,
          explanation: `Path loss scales with log10 of distance: Attenuation = -20 * log10(d) = -20 * log10(${dist}) = -20 * ${(Math.log10(dist)).toFixed(4)} = ${db} dB.`
        };
        break;
      }
      default: {
        const R = randInt(5, 15);
        const C = randInt(1, 10);
        const fc = Math.round(1000 / (2 * Math.PI * R * C) * 10) / 10;
        theory = {
          concept: `RC Analog Passive Hardware Filters (Scenario IoT-E-${daySeed % 1000})`,
          formula: "f_c = 1 / (2π · R · C) (Passive Gasket Filter Cutoff)",
          explanation: `Passive RC configurations damp high-frequency signal noise prior to digitizers. With resistor R = ${R} kΩ and capacitor C = ${C} μF, this first-order hardware interface filters out signal components above a cutoff threshold of f_c = ${fc} Hz.`,
          videoDescription: `Gasket Filter Frequency sweeps: Visualizing amplitude drops of input frequencies relative to the passive RC cutoff.`,
          bulletPoints: [
            `R = ${R} kΩ (resistor value) and C = ${C} μF (capacitor value) form the low-pass filter.`,
            `Cutoff limit f_c is the boundary frequency where signals attenuate to 70.7% strength (-3dB).`,
            `Tuning R or C shifts the filter cutoff to protect vital sampling rates.`
          ],
          audioTranscript: `Gasket filter online. High-frequency signals are dampened by the passive RC cutoff to secure smooth telemetry.`,
          synthesizerFrequency: 195
        };
        quiz = {
          question: `A physical accelerometer transceiver is wired with a low-pass analog RC filter containing a resistor R = ${R} kΩ and capacitor C = ${C} μF. What is the calculated signal cutoff frequency (f_c) in Hz where amplitude is damped to -3dB?`,
          options: [
            `Approximately ${fc} Hz (calculated passive cutoff: 1 / (2πRC))`,
            `Exactly ${Math.round(fc * 2)} Hz (assuming double pole transition properties)`,
            `Approximately ${Math.round(fc * 10)} Hz (due to incorrect kilo/micro unit conversions)`
          ],
          correctIndex: 0,
          explanation: `Using f_c = 1 / (2 * pi * R_ohms * C_farads). Here, R = ${R} * 1000 Ohms, C = ${C} * 10⁻⁶ Farads. f_c = 1 / (2 * pi * ${R * 1000} * ${C * 1e-6}) = 1000 / (2 * pi * ${R} * ${C}) ≈ ${fc} Hz.`
        };
        break;
      }
    }
  }

  return { theory, quiz };
};

const getDynamicTheoryData = (topicId: string): TopicTheory => {
  return getDynamicTheoryAndQuiz(topicId).theory;
};

const getDynamicQuizData = (topicId: string): QuizQuestion => {
  return getDynamicTheoryAndQuiz(topicId).quiz;
};

export const THEORY_DATA = new Proxy({} as Record<string, TopicTheory>, {
  get: (target, prop) => {
    if (typeof prop !== "string") return undefined;
    return getDynamicTheoryData(prop);
  }
});

export const QUIZ_DATA = new Proxy({} as Record<string, QuizQuestion>, {
  get: (target, prop) => {
    if (typeof prop !== "string") return undefined;
    return getDynamicQuizData(prop);
  }
});

const TOPIC_NAMES: Record<string, string> = {
  CAD: 'Computer-Aided Design (Planar Kinematics)',
  FEA: 'Finite Element Analysis (Structural deflection)',
  CFD: 'Computational Fluid Dynamics (Boundary Aerodynamics)',
  SRE: 'System Reliability Engineering (Contact & Gas Cycles)',
  IoT: 'Internet of Things (Vibration & Telemetry Dynamics)'
};

export default function QuickQuizModal({ topicId, isOpen, onClose, onSuccess }: QuickQuizModalProps) {
  if (!isOpen) return null;

  const quiz = QUIZ_DATA[topicId];
  const theory = THEORY_DATA[topicId];
  
  // Phase management
  const [phase, setPhase] = useState<'learn' | 'quiz'>('learn');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  // Animated transition helper to guide student phase flow smoothly
  const transitionToPhase = (nextPhase: 'learn' | 'quiz') => {
    if (nextPhase === phase || isTransitioning) return;
    
    const direction = nextPhase === 'quiz' ? 'forward' : 'backward';
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    // Clean up synthesizer notes and spoken guides during transition
    stopSynthGuide();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeechActive(false);

    // Swap phase after the out-going fade/scale transition concludes
    setTimeout(() => {
      setPhase(nextPhase);
      setIsTransitioning(false);
    }, 250);
  };

  // Pomodoro timer states
  const [timeLeft, setTimeLeft] = useState<number>(25); // 25s Pomodoro Cognitive Learn block
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  // Sound and simulation states
  const [muted, setMuted] = useState<boolean>(false);
  const [synthActive, setSynthActive] = useState<boolean>(false);
  const [speechActive, setSpeechActive] = useState<boolean>(false);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

  // Quiz states
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Simulation animation frame variables
  const [animVal, setAnimVal] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Pomodoro countdown timer logic
  useEffect(() => {
    if (phase !== 'learn' || !timerRunning) return;
    if (timeLeft <= 0) {
      // Auto-transition when timer runs out with smooth fade-out
      transitionToPhase('quiz');
      playBuzzer(400, 0.3);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, timeLeft, timerRunning]);

  // Video canvas animations simulation variables
  useEffect(() => {
    if (!videoPlaying) return;
    let frameId: number;
    const render = () => {
      setAnimVal(prev => (prev + 1.5) % 360);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [videoPlaying]);

  // Handle Speech and Audio Guide Synthesis
  const startSynthGuide = () => {
    if (muted) return;
    try {
      // Stop existing synth first
      stopSynthGuide();

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Configure synthesis properties based on topic mechanical characteristics
      osc.type = topicId === 'CFD' ? 'sawtooth' : topicId === 'IoT' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(theory.synthesizerFrequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      
      // Let it hum or oscillate like a live laboratory coordinate
      if (topicId === 'IoT') {
        osc.frequency.linearRampToValueAtTime(theory.synthesizerFrequency + 40, ctx.currentTime + 1);
        osc.frequency.linearRampToValueAtTime(theory.synthesizerFrequency, ctx.currentTime + 2);
      } else if (topicId === 'CAD') {
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 1.5);
      }
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      
      oscillatorRef.current = osc;
      gainNodeRef.current = gainNode;
      setSynthActive(true);
    } catch {
      // Ignored
    }
  };

  const stopSynthGuide = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setSynthActive(false);
    } catch {
      // Ignored
    }
  };

  // Text-To-Speech (Speech Guide) integration
  const toggleSpeechGuide = () => {
    if ('speechSynthesis' in window) {
      if (speechActive) {
        window.speechSynthesis.cancel();
        setSpeechActive(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(theory.audioTranscript);
        utterance.rate = 0.95;
        utterance.onend = () => setSpeechActive(false);
        utterance.onerror = () => setSpeechActive(false);
        window.speechSynthesis.speak(utterance);
        setSpeechActive(true);
      }
    } else {
      alert("Text-to-speech audio rendering is not supported on this browser context.");
    }
  };

  // Safe release of synthesizer nodes on unmount
  useEffect(() => {
    return () => {
      stopSynthGuide();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playBuzzer = (frequency: number, duration: number) => {
    if (muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignored
    }
  };

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
    playBuzzer(440, 0.05);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || submitted) return;
    const correct = selectedIdx === quiz.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      playBuzzer(523.25, 0.2);
      setTimeout(() => playBuzzer(659.25, 0.25), 150);
      onSuccess(15); // +15 points!
    } else {
      playBuzzer(220, 0.4);
    }
  };

  // Safe closing handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Dismiss only if clicked exact background wrapper
    if (e.target === e.currentTarget) {
      stopSynthGuide();
      window.speechSynthesis.cancel();
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
    >
      <div 
        className="w-full max-w-4xl bg-[#0c0c0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        id="quick-quiz-dialog-box"
        onClick={(e) => e.stopPropagation()} // Prevent closing when interacting with content inside dialog
      >
        {/* Colorful Highlight Header Stripe */}
        <div className={`h-1.5 w-full shrink-0 ${
          phase === 'learn' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 animate-pulse' :
          submitted ? (isCorrect ? 'bg-emerald-500' : 'bg-red-500') : 'bg-indigo-500'
        }`} />

        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-white/5 bg-black/40 flex justify-between items-center shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`p-1 px-2 rounded font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 ${
                phase === 'learn' ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400' : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400'
              }`}>
                <Sparkles size={11} className={phase === 'learn' ? 'animate-spin text-amber-400' : 'text-indigo-400'} />
                {phase === 'learn' ? 'POMODORO STUDY WAVE ACTIVE' : 'VALIDATION RUN'}
              </span>
              <span className="p-1 px-2 text-yellow-400 bg-yellow-500/5 border border-yellow-500/10 font-mono text-[9px] font-black uppercase">
                🏷️ +15 PTS ACCREDITATION
              </span>
            </div>
            <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wider uppercase">
              {TOPIC_NAMES[topicId]}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setMuted(!muted)}
              className="p-2 bg-zinc-950 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={muted ? "Unmute sound effects" : "Mute sound effects"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button 
              onClick={() => {
                stopSynthGuide();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 bg-zinc-950 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all cursor-pointer"
              title="Exit modal safely"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Pomodoro Study / Applying navigation tab bar */}
        <div className="bg-[#111115] border-b border-white/5 px-6 py-2.5 flex items-center justify-between text-xs font-mono shrink-0 select-none">
          <div className="flex items-center gap-4">
            <button
              onClick={() => transitionToPhase('learn')}
              className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                phase === 'learn' ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {phase === 'quiz' || submitted ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-[8px] font-bold">✓</span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block" />
                )}
                <BookOpen size={13} />
                <span>1. Learn Theory</span>
              </div>
            </button>

            <span className="text-zinc-700 font-bold font-sans">→</span>

            <button
              onClick={() => transitionToPhase('quiz')}
              className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                phase === 'quiz' ? 'text-indigo-400 border-b border-indigo-400 pb-1' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {submitted ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-[8px] font-bold">✓</span>
                ) : phase === 'quiz' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/80 animate-pulse inline-block" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/5 inline-block" />
                )}
                <GraduationCap size={13} />
                <span>2. Apply Quiz</span>
              </div>
            </button>
          </div>

          {phase === 'learn' && (
            <div className="flex items-center gap-2">
              <Hourglass size={12} className="text-amber-500 animate-spin" />
              <span className="text-[10px] text-zinc-400">POMODORO LEARN TIMER:</span>
              <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
              </span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1 hover:bg-white/5 text-zinc-300 rounded"
                title={timerRunning ? "Pause timer" : "Resume timer"}
              >
                {timerRunning ? <Pause size={10} /> : <Play size={10} />}
              </button>
            </div>
          )}
        </div>

        {/* Dynamic visual progress bar indicating flow completion percentage */}
        <div className="h-1 w-full bg-zinc-950 overflow-hidden relative shrink-0">
          <div 
            className="h-full transition-all duration-500 ease-out" 
            style={{ 
              width: phase === 'learn' ? '50%' : submitted ? '100%' : '75%',
              background: phase === 'learn' 
                ? 'linear-gradient(to right, #f59e0b, #f97316)' 
                : submitted 
                  ? 'linear-gradient(to right, #6366f1, #10b981)' 
                  : 'linear-gradient(to right, #f97316, #6366f1)'
            }}
          />
        </div>

        {/* Overflows handled scroll container for small viewports */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          <div className={`transition-all duration-300 ease-in-out transform ${
            isTransitioning 
              ? (slideDirection === 'forward' ? 'opacity-0 -translate-x-6 scale-98 blur-[1px]' : 'opacity-0 translate-x-6 scale-98 blur-[1px]') 
              : 'opacity-100 translate-x-0 scale-100 blur-0'
          }`}>

            {/* PHASE 1: POMODORO REALTIME LEARNING CONTENT SECTION */}
            {phase === 'learn' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN: MULTIMEDIA VIDEO & AUDIO SOURCE CO-PROCESSORS */}
                <div className="col-span-1 lg:col-span-5 space-y-4">
                  
                  {/* VIDEO EMULATION VIEWPORT */}
                  <div className="bg-black/80 border border-zinc-800 rounded-xl overflow-hidden relative">
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      <span className="text-[9px] font-mono font-bold bg-black/60 text-zinc-300 px-2 py-0.5 border border-white/10 rounded">
                        VIDEO STREAM FEED
                      </span>
                    </div>

                    {/* HTML Video-like high-fidelity interactive animated canvas */}
                    <div className="h-[185px] w-full flex items-center justify-center bg-zinc-950 p-4 transition-all relative select-none">
                      <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
                      
                      {/* Topic-specific animated render */}
                      {topicId === 'CAD' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Crank link rotates */}
                          <svg className="w-48 h-48 text-zinc-800" stroke="currentColor" fill="none" strokeWidth="2">
                            <circle cx="96" cy="96" r="30" stroke="rgba(255,255,255,0.05)" />
                            {/* Crank handle rotates */}
                            <line x1="96" y1="96" x2={96 + Math.cos(animVal * Math.PI / 180) * 30} y2={96 + Math.sin(animVal * Math.PI / 180) * 30} stroke="#e2231a" strokeWidth="4" />
                            {/* Connecting rod */}
                            <line x1={96 + Math.cos(animVal * Math.PI / 180) * 30} y1={96 + Math.sin(animVal * Math.PI / 180) * 30} x2={160} y2={96} stroke="#3b82f6" strokeWidth="3" />
                            {/* Slider block */}
                            <rect x={150} y={86} width="20" height="20" fill="rgba(255,255,255,0.1)" stroke="#10b981" />
                          </svg>
                        </div>
                      )}

                      {topicId === 'FEA' && (
                        <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
                          {/* Bending cantilever beam */}
                          <svg className="w-full h-24" fill="none" stroke="currentColor">
                            {/* Clamped bound */}
                            <line x1="20" y1="15" x2="20" y2="85" stroke="#ef4444" strokeWidth="4" />
                            {/* Beam deflection curves based on animVal */}
                            <path d={`M 20 50 Q 110 ${50 + Math.sin(animVal * Math.PI / 180) * 12} 220 ${50 + Math.sin(animVal * Math.PI / 180) * 20}`} stroke="#e2231a" strokeWidth="8" />
                            {/* Nodes representation */}
                            {Array.from({ length: 6 }).map((_, nIdx) => (
                              <circle key={nIdx} cx={20 + nIdx * 40} cy={50 + Math.sin(animVal * Math.PI / 180) * (nIdx * 4)} r="4" fill="#3b82f6" />
                            ))}
                          </svg>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1">Stress Tensor: Localized Deflection Vector Nodes</span>
                        </div>
                      )}

                      {topicId === 'CFD' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <svg className="w-full h-full" fill="none" stroke="currentColor">
                            {/* Airfoil representation */}
                            <path d="M 40 100 Q 110 50 180 95 Q 110 100 40 100 Z" fill="rgba(255,255,255,0.1)" stroke="#3b82f6" strokeWidth="2" />
                            {/* Parallel particle streams separating based on attack angle/animation */}
                            {Array.from({ length: 4 }).map((_, lIdx) => (
                              <path 
                                key={lIdx}
                                d={`M 10 ${40 + lIdx * 35} Q 80 ${45 + lIdx * 35} 140 ${40 + lIdx * 35 - 15} Q 200 ${90 + Math.sin(animVal * Math.PI / 180) * 20} 240 ${130 + (lIdx - 2) * 45}`} 
                                stroke={lIdx % 2 === 0 ? "#e2231a" : "rgba(255,255,255,0.25)"} 
                                strokeWidth="1.5" 
                                strokeDasharray="4, 4"
                              />
                            ))}
                          </svg>
                        </div>
                      )}

                      {topicId === 'SRE' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Revolving rotor and pad contact */}
                          <svg className="w-40 h-40" stroke="currentColor" fill="none">
                            <circle cx="80" cy="80" r="50" stroke="#3b82f6" strokeWidth="8" strokeDasharray="10, 15" transform={`rotate(${animVal}, 80, 80)`} />
                            <circle cx="80" cy="80" r="30" stroke="rgba(255,255,255,0.05)" />
                            {/* Friction caliper wear point overlay */}
                            <path d="M 45 45 A 50 50 0 0 1 115 45" stroke="#e2231a" strokeWidth="12" strokeLinecap="round" />
                          </svg>
                          <div className="absolute text-[8px] font-mono text-amber-400 bg-black/80 px-2 py-0.5 border border-white/5 rounded">
                            CONTACT RADIAL OVERHEATING
                          </div>
                        </div>
                      )}

                      {topicId === 'IoT' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Vibration oscillation with sampling lines */}
                          <svg className="w-full h-28" stroke="currentColor" fill="none">
                            <path d={`M 10 56 Q 60 ${56 - Math.sin(animVal * Math.PI / 180) * 35} 110 56 Q 160 ${56 + Math.sin(animVal * Math.PI / 180) * 35} 210 56`} stroke="#3b82f6" strokeWidth="2" />
                            {/* Discretized sampling dot nodes */}
                            {Array.from({ length: 9 }).map((_, dIdx) => (
                              <line 
                                key={dIdx}
                                x1={20 + dIdx * 22} 
                                y1={10} 
                                x2={20 + dIdx * 22} 
                                y2={100} 
                                stroke="rgba(255,255,255,0.06)" 
                                strokeWidth="1"
                              />
                            ))}
                            {Array.from({ length: 9 }).map((_, dIdx) => (
                              <circle 
                                key={dIdx} 
                                cx={20 + dIdx * 22} 
                                cy={56 + Math.sin((animVal + dIdx * 45) * Math.PI / 180) * 20} 
                                r="4" 
                                fill="#ef4444" 
                              />
                            ))}
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Video Actions Controls Overlay */}
                    <div className="p-2.5 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span className="uppercase text-zinc-500 font-bold">ANIMATED FLUID MODEL FEED</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setVideoPlaying(!videoPlaying)}
                          className="px-2 py-0.5 border border-white/5 bg-[#141414] hover:bg-neutral-800 rounded transition text-white text-[9px] font-black cursor-pointer uppercase"
                        >
                          {videoPlaying ? '⏸ Pause Render' : '▶ Play Render'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AUDIO FEED & CONTINUOUS SYNTHESIZER BOARD */}
                  <div className="bg-[#111113] border border-zinc-800 p-4 rounded-xl space-y-3">
                    <h4 className="text-[10px] font-mono font-black text-amber-500 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                      <Music size={12} />
                      SCI-TECH AUDIO RETENTION GUIDE
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                      Synthesizer maps raw physical formula vectors into dynamic coordinate sound waves, helping you absorb variables. Also plays real-time spoken guidance.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={synthActive ? stopSynthGuide : startSynthGuide}
                        className={`py-2 px-3 border rounded text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          synthActive 
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500' 
                            : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <Volume1 size={13} className={synthActive ? 'animate-bounce' : ''} />
                        {synthActive ? 'Stop Oscillator' : 'Oscillator hum'}
                      </button>

                      <button
                        type="button"
                        onClick={toggleSpeechGuide}
                        className={`py-2 px-3 border rounded text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          speechActive 
                            ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500' 
                            : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <Tv size={13} className={speechActive ? 'animate-pulse' : ''} />
                        {speechActive ? 'Mute Voice' : 'Voice Explainer'}
                      </button>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: DETAILED RIGOROUS THEORY CONTENT */}
                <div className="col-span-1 lg:col-span-7 space-y-4">
                  <div className="bg-zinc-950/50 p-4 border border-zinc-800 rounded-xl space-y-3">
                    <div>
                      <span className="text-[10px] font-mono font-black text-amber-400 uppercase block tracking-widest mb-1">
                        CORE SCIENTIFIC CONCEPT
                      </span>
                      <h4 className="text-lg font-bebas text-white tracking-widest uppercase">
                        {theory.concept}
                      </h4>
                    </div>

                    <p className="font-sans text-[12.5px] text-zinc-300 leading-relaxed font-semibold">
                      {theory.explanation}
                    </p>

                    {/* FORMULA MATHEMATICAL FOCUS BLOCK */}
                    <div className="bg-black/80 border border-amber-500/30 p-3.5 rounded-lg font-mono relative overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 bg-amber-500/5 w-1/4 pointer-events-none blur-lg" />
                      <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                        GOVERNING MECHANICAL EQUATION:
                      </span>
                      <span className="text-sm md:text-base font-black text-yellow-300 tracking-wider block">
                        {theory.formula}
                      </span>
                    </div>

                    {/* Bullet specifics parameters */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">
                        PARAMETER RESOLVING BREAKDOWN:
                      </span>
                      <div className="space-y-1.5">
                        {theory.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="flex items-start gap-2 text-xs text-zinc-400 leading-snug">
                            <CheckCircle2 size={13} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="font-sans font-medium">{bp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ADVANCE TO VERIFICATION ACTION */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 block font-bold">READY TO VERIFY COGNITIVE MATRIX?</span>
                      <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Skip remaining Pomodoro time and test your retention right away!</p>
                    </div>
                    <button
                      onClick={() => transitionToPhase('quiz')}
                      className="px-4 py-2 bg-amber-500 text-black font-mono font-black text-xs uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center gap-1"
                    >
                      APPLY NOW 🤝
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* PHASE 2: RETENTION TESTING & DYNAMIC SOCRAT TREATMENT */}
            {phase === 'quiz' && (
              <div className="space-y-5">
                <div className="bg-black/30 border border-white/5 p-4 md:p-5 rounded-lg flex gap-3.5 items-start">
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg font-mono text-sm shrink-0">
                    ⚡ Q_VER
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase font-black text-indigo-400 block mb-1 tracking-widest">
                      SYSTEM INQUIRY CHALLENGE:
                    </span>
                    <p className="font-sans text-base text-zinc-100 font-bold leading-relaxed">
                      {quiz.question}
                    </p>
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {quiz.options.map((option, idx) => {
                    const isSelected = selectedIdx === idx;
                    const isAnswerCorrectIndex = idx === quiz.correctIndex;
                    
                    let choiceStyle = "bg-neutral-900 border-white/5 text-zinc-300 hover:border-white/15";
                    if (isSelected) {
                      choiceStyle = "bg-indigo-500/10 border-indigo-505 text-white shadow-lg shadow-indigo-950/20";
                    }
                    if (submitted) {
                      if (isAnswerCorrectIndex) {
                        choiceStyle = "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 pointer-events-none";
                      } else if (isSelected && !isCorrect) {
                        choiceStyle = "bg-red-500/15 border-red-500/50 text-red-300 pointer-events-none";
                      } else {
                        choiceStyle = "bg-zinc-950 border-white/5 text-zinc-600 opacity-40 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={submitted}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${choiceStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                          isSelected ? 'bg-indigo-500 text-white border border-indigo-400' : 'bg-zinc-800 text-zinc-400 border border-white/10'
                        } ${submitted && isAnswerCorrectIndex ? 'bg-emerald-500 text-white' : ''} ${
                          submitted && isSelected && !isCorrect ? 'bg-red-500 text-white' : ''
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-sans font-semibold text-xs md:text-sm leading-snug pt-0.5">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic feedback layout */}
                {submitted && (
                  <div className={`p-4 md:p-5 rounded-xl border font-mono text-xs md:text-sm leading-relaxed animate-fadeIn ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                    <div className="flex items-center gap-2 mb-2 font-black uppercase text-xs tracking-wider">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 animate-bounce" />
                          <span>🏆 INTUITION ALIGNMENT STABLE (+15 POINTS CREDITED)</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className="text-red-400 shrink-0 animate-shake" />
                          <span>❌ INTEGRITY ERROR: FORMULA DEVIATION RECORDED</span>
                        </>
                      )}
                    </div>
                    <p className="font-sans font-medium text-zinc-300 text-xs md:text-sm mt-1.5 leading-relaxed">
                      <strong>THEORETICAL EXPLANATION:</strong> {quiz.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 md:p-6 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="font-mono text-[10.5px] text-zinc-500 text-left">
            {phase === 'learn' ? (
              <span className="text-amber-500/80 font-bold flex items-center gap-1.5">
                <RotateCw size={11} className="animate-spin text-amber-500" />
                Continuous studying strengthens deep comprehension streams. Refer to Multimedia pane to learn.
              </span>
            ) : submitted ? (
              <span className="text-zinc-400 font-bold">Session authenticated. Closing locks and registers points state.</span>
            ) : (
              <span className="text-zinc-500 font-semibold">Verify choices. Responding unlocks academic credit gates.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {phase === 'learn' ? (
              <button
                onClick={() => transitionToPhase('quiz')}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
              >
                PROCEED TO RETENTION QUIZ &gt;
              </button>
            ) : !submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedIdx === null}
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-neutral-800 disabled:text-zinc-600 cursor-pointer text-center"
              >
                <span>[SUBMIT SCORE ACCREDITATION]</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <button
                onClick={() => {
                  stopSynthGuide();
                  window.speechSynthesis.cancel();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 uppercase font-black text-xs font-mono rounded-xl cursor-pointer text-center"
              >
                CLOSE TEST SANDBOX
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
