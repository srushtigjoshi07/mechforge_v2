import { MechQuestion, MechMCQQuestion } from '../data';

// Deterministic parameter generator based on current day and question ID
const getVal = (day: number, questionId: number, base: number, step: number = 0.4): number => {
  const cycleIndex = (day - 1 + questionId * 3) % 7; // yields 0 to 6
  const val = base + cycleIndex * step;
  return Math.round(val * 100) / 100;
};

// Generates the 21 questions for a specified module ID and virtual elapsed study day
export const getQuestionsForModule = (moduleId: string, elapsedDays: number): any[] => {
  const day = Math.max(1, elapsedDays);
  const activeWeek = Math.min(3, Math.ceil(day / 7)); // Week 1 (Beginner), Week 2 (Intermediate), Week 3 (Advanced)
  const difficultyLabel = activeWeek === 1 ? 'Beginner' : activeWeek === 2 ? 'Intermediate' : 'Advanced';

  let subject = '';
  const isMCQ = !['g1_fmm', 'g1_dom', 'g1_tof', 'g1_mts'].includes(moduleId);

  if (moduleId === 'g1_fmm' || moduleId === 'g3_fm') {
    subject = moduleId === 'g1_fmm' ? 'Fluid Mechanics & Dynamics (FMD)' : 'Fluid Mechanics';
  } else if (moduleId === 'g1_dom') {
    subject = 'Machines and Mechanisms';
  } else if (moduleId === 'g1_tof') {
    subject = 'Thermodynamics';
  } else if (moduleId === 'g1_mts') {
    subject = 'Mechanics of Materials (MOM)';
  } else if (moduleId === 'g2_amsm') {
    subject = 'Advanced Material & Structural Mechanics';
  } else if (moduleId === 'g2_atst' || moduleId === 'g3_at') {
    subject = moduleId === 'g2_atst' ? 'Advanced Thermal Systems & Thermodynamics' : 'Applied Thermodynamics';
  } else if (moduleId === 'g2_acs') {
    subject = 'Automatic Control Systems';
  } else if (moduleId === 'g2_feg') {
    subject = 'Finite Element Grid Formulations';
  } else if (moduleId === 'g3_som') {
    subject = 'Strength of Materials';
  } else if (moduleId === 'g3_dme') {
    subject = 'Design of Machine Elements';
  } else if (moduleId === 'g3_tvt') {
    subject = 'Turbomachinery Velocity Triangles';
  } else if (moduleId === 'g3_cgd') {
    subject = 'Compressible Gas Dynamics';
  }

  const list: any[] = [];

  for (let i = 1; i <= 21; i++) {
    let tierLabel = '';
    let categoryTitle = '';
    if (i <= 7) {
      tierLabel = 'Tier 01 // Basics';
      categoryTitle = 'Fundamentals & Core Theory';
    } else if (i <= 14) {
      tierLabel = 'Tier 02 // Syllabus-Oriented';
      categoryTitle = 'Standard Exam Formulation';
    } else {
      tierLabel = 'Tier 03 // Real-Time Application';
      categoryTitle = 'Applied Industrial Case Challenge';
    }

    const sIdx = (day * 3 + i) % 4; // Unique physical scenario for different days 1 to 21

    if (!isMCQ) {
      // SUBJECTIVE TRACKS (G1)
      if (moduleId === 'g1_fmm') {
        if (i <= 7) {
          // Tier 1: Basics (4 Scenarios)
          if (sIdx === 0) {
            const area = getVal(day, i, 0.05, 0.015);
            const vel = getVal(day, i, 1.2, 0.25);
            const ans = Math.round((area * vel) * 1000) / 1000;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A circular dynamic intake pipe of area A = ${area} m² delivers fluid at a speed of V = ${vel} m/s under steady flow conditions. Calculate the volumetric flow rate Q in m³/s.`,
              hints: [
                "Use the core discharge equation: Q = A * V.",
                `Substitute: Area is ${area} m² and velocity is ${vel} m/s.`,
                `Multiply to find the answer: ${area} * ${vel} = ${ans} m³/s. Enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `Computed volumetric discharge: Q = Area * Velocity = ${area} * ${vel} = ${ans} m³/s.`
            });
          } else if (sIdx === 1) {
            const area1 = getVal(day, i, 0.12, 0.02);
            const area2 = getVal(day, i, 0.04, 0.005);
            const vel1 = getVal(day, i, 1.0, 0.2);
            const ans = Math.round((vel1 * (area1 / area2)) * 100) / 100;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A divergent-convergent pipeline duct contracts from an inlet area A1 = ${area1} m² down to throat area A2 = ${area2} m². If fluid enters at V1 = ${vel1} m/s, solve for the throat velocity V2 in m/s assuming incompressible flow.`,
              hints: [
                "Apply the 1D Continuity relation: A1 * V1 = A2 * V2.",
                `Isolate the parameter: V2 = V1 * (A1 / A2).`,
                `Substitute: ${vel1} * (${area1} / ${area2}) = ${ans} m/s. Enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `By continuity: V2 = V1 * A1 / A2 = ${vel1} * ${area1} / ${area2} = ${ans} m/s.`
            });
          } else if (sIdx === 2) {
            const width = getVal(day, i, 1.5, 0.3);
            const height = getVal(day, i, 2.0, 0.2);
            const depth = getVal(day, i, 1.0, 0.15); // center depth of plate
            const density = 1000;
            const g = 9.81;
            const area = width * height;
            const ans = Math.round((density * g * depth * area / 1000) * 10) / 10; // force in kN
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A flat rectangular gate (${width}m wide x ${height}m tall) is submerged vertically in freshwater. If its centroid depth is ${depth} m, compute the total hydrostatic pressure force in kN acting on one face of the gate (ρ = 1000 kg/m³, g = 9.81 m/s²).`,
              hints: [
                "Hydrostatic Force is given by: F = ρ * g * h_bar * A.",
                `Area of gate is ${width} * ${height} = ${area} m².`,
                `Multiply values: 1000 * 9.81 * ${depth} * ${area} N, then divide by 1000 for kN. Enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `Hydrostatic force acting on gate: F = ρ * g * h_bar * A = 1000 * 9.81 * ${depth} * ${area} = ${(density * g * depth * area).toFixed(1)} N = ${ans} kN.`
            });
          } else {
            const mu = getVal(day, i, 0.08, 0.02); // Pa-s
            const thick = getVal(day, i, 0.002, 0.0005); // m
            const area = getVal(day, i, 0.5, 0.1); // m2
            const vel = getVal(day, i, 2.0, 0.5); // m/s
            const ans = Math.round((mu * area * vel / thick) * 10) / 10; // Force in N
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A flat plate of area A = ${area} m² slides over a fixed surface separated by a viscous lubrication fluid film of dynamic viscosity μ = ${mu} Pa·s and thickess t = ${thick} m. Find the required shear force in Newtons to maintain velocity U = ${vel} m/s.`,
              hints: [
                "Apply Newton's Law of Viscosity: F = μ * A * (dU/dy).",
                `Here, dU/dy = U/t = ${vel} / ${thick} = ${Math.round(vel/thick)} s⁻¹.`,
                `Multiply: ${mu} * ${area} * ${Math.round(vel/thick)} = ${ans} N.`
              ],
              correctAnswer: String(ans),
              explanation: `Viscous force: F = μ * A * U / t = ${mu} * ${area} * ${vel} / ${thick} = ${ans} N.`
            });
          }
        } else if (i <= 14) {
          // Tier 2: Syllabus-Oriented (4 Scenarios)
          if (sIdx === 0) {
            const pressKpa = getVal(day, i, 147.15, 24.525);
            const ans = Math.round((pressKpa * 1000 / (1000 * 9.81)) * 10) / 10;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A pressure tap situated at the bottom of a municipal clean water column reads a static gauge pressure of P = ${pressKpa} kPa. Compute the equivalent static fluid head (H) in meters (ρ = 1000 kg/m³, g = 9.81 m/s²).`,
              hints: [
                "Pressure is related to head by: P = ρ * g * H.",
                `Rearrange: H = P / (ρ * g). Remember to convert kPa to Pascals: ${pressKpa} * 10³ Pa.`,
                `H = ${pressKpa * 1000} / (1000 * 9.81) = ${ans} m. Enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `Static hydraulic head conversion: H = P / (ρ * g) = ${pressKpa * 1000} / 9810 = ${ans} meters of water.`
            });
          } else if (sIdx === 1) {
            const f = getVal(day, i, 0.02, 0.002);
            const L = getVal(day, i, 50, 10);
            const D = getVal(day, i, 0.2, 0.05);
            const vel = getVal(day, i, 2.0, 0.4);
            const ans = Math.round((4 * f * L * Math.pow(vel, 2) / (2 * 9.81 * D)) * 100) / 100;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: In an engineering test of pipeline head losses, a smooth conduit of length L = ${L} m and diameter D = ${D} m carries flow at isentropic velocity V = ${vel} m/s. Calculate structural head loss due to friction using standard Darcy's formula h_f = 4*f*L*V² / (2*g*D) for the friction factor f = ${f} (g = 9.81 m/s²).`,
              hints: [
                "Directly plug in values into: h_f = (4 * f * L * V²) / (2 * g * D).",
                `Numerator: 4 * ${f} * ${L} * ${vel}² = ${(4*f*L*vel*vel).toFixed(4)}.`,
                `Denominator: 2 * 9.81 * ${D} = ${(2*9.81*D).toFixed(3)}. Calculate the ratio.`
              ],
              correctAnswer: String(ans),
              explanation: `Friction pipe loss (Darcy-Weisbach): h_f = 4 * f * L * V² / (2 * g * D) = (4 * ${f} * ${L} * ${vel*vel}) / (19.62 * ${D}) = ${ans} m.`
            });
          } else if (sIdx === 2) {
            const d1_mm = getVal(day, i, 120, 15);
            const d2_mm = getVal(day, i, 60, 5);
            const ratioSquare = Math.round(Math.pow(d1_mm / d2_mm, 2) * 10) / 10;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A classical Venturi meter is situated inline within a fresh water pipeline. Under standard syllabus sizing metrics, the inlet pipe diameter D1 = ${d1_mm} mm contracts to throat diameter D2 = ${d2_mm} mm. Solve for the ratio of inlet area to throat area (A1/A2) representing cross acceleration.`,
              hints: [
                "Area ratio A1/A2 is equal to the square of the diameter ratio: (D1 / D2)².",
                `D1/D2 = ${d1_mm} / ${d2_mm} = ${(d1_mm/d2_mm).toFixed(2)}.`,
                `Square this diameter ratio: (${(d1_mm/d2_mm).toFixed(2)})² = ${ratioSquare}.`
              ],
              correctAnswer: String(ratioSquare),
              explanation: `The pipe contracting area ratio matches A1 / A2 = (D1 / D2)² = (${d1_mm}/${d2_mm})² = ${ratioSquare}.`
            });
          } else {
            const deltaP = getVal(day, i, 1.5, 0.3); // MPa
            const volFrac = getVal(day, i, 0.0006, 0.0001); // dimensionless
            const ans = Math.round((deltaP / volFrac) * 10) / 10; // Bulk modulus in MPa
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Under intense compressibility tests, the surrounding pressure on a liquid is increased by ΔP = ${deltaP} MPa, causing an objective volumetric compression strain (ΔV/V) of ${volFrac}. Compute the liquid Bulk Modulus of Elasticity (K) in MPa.`,
              hints: [
                "Bulk Modulus is defined as: K = ΔP / (ΔV/V).",
                `Plug in pressure change ΔP = ${deltaP} MPa and strain = ${volFrac}.`,
                `Divide: ${deltaP} / ${volFrac} = ${ans} MPa.`
              ],
              correctAnswer: String(ans),
              explanation: `Bulk modulus of elasticity K = ΔP / (ΔV/V) = ${deltaP} / ${volFrac} = ${ans} MPa.`
            });
          }
        } else {
          // Tier 3: Real-Time Application (4 Scenarios)
          if (sIdx === 0) {
            const sPower = getVal(day, i, 160, 30); // kW
            const head = getVal(day, i, 50, 5); // m
            const disch = getVal(day, i, 0.5, 0.08); // m3/s
            const hydraulicPower = 9.81 * disch * head; // kW (1000*9.81*Q*H/1000)
            const ans = Math.round((sPower / hydraulicPower) * 10000) / 100; // Efficiency %
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A real-time hydroelectric Pelton wheel installation develops an active shaft power S.P. = ${sPower} kW. Sensors register a net dynamic inlet water head H = ${head} m and flow rate Q = ${disch} m³/s. Find the overall plant efficiency in percent (%) (density = 1000 kg/m³, g = 9.81 m/s²).`,
              hints: [
                "Water input power in kW is: P_water = (ρ * g * Q * H) / 1000 = 9.81 * Q * H.",
                `P_water = 9.81 * ${disch} * ${head} = ${hydraulicPower.toFixed(2)} kW.`,
                `Overall efficiency is η = (Shaft Power / P_water) * 100. Calculate and enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `Overall efficiency: η = S.P. / P_water = ${sPower} / (9.81 * ${disch} * ${head}) = ${ans}%.`
            });
          } else if (sIdx === 1) {
            const flow = getVal(day, i, 0.04, 0.01); // m3/s
            const head = getVal(day, i, 22, 3); // m
            const eff = getVal(day, i, 78, 2); // %
            const ans = Math.round((1000 * 9.81 * flow * head / (eff / 100) / 1000) * 10) / 10; // Shaft energy in kW
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A booster centrifugal pump conveys water discharge Q = ${flow} m³/s against a manometric head H_m = ${head} m in a industrial cooling loop. If overall shaft hydraulic efficiency of the pump is η = ${eff}%, compute the motor input shaft power required in kW (g = 9.81 m/s², density = 1000 kg/m³).`,
              hints: [
                "Water delivery power is: P_water = (ρ * g * Q * H_m) / 1000 kW.",
                `Calculate: P_water = 9.81 * ${flow} * ${head} = ${(9.81 * flow * head).toFixed(3)} kW.`,
                `Motor Shaft Power = P_water / Efficiency = ${(9.81 * flow * head).toFixed(3)} / ${(eff/100)} = ${ans} kW. enter '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `Power required = ρgQH / η = 9.81 * ${flow} * ${head} / ${(eff/100)} = ${ans} kW.`
            });
          } else if (sIdx === 2) {
            const dOuter = getVal(day, i, 3.2, 0.3); // m
            const dInner = getVal(day, i, 1.6, 0.15); // m
            const flowVel = getVal(day, i, 4.5, 0.5); // m/s
            const area = (Math.PI / 4) * (Math.pow(dOuter, 2) - Math.pow(dInner, 2));
            const ans = Math.round((area * flowVel) * 100) / 100;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A massive Kaplan reaction turbine is running. The runner blades have an outer diameter Do = ${dOuter} m and boss/hub diameter Di = ${dInner} m. If the axial flow velocity enters at Vf = ${flowVel} m/s, solve for the absolute volumetric discharge Q in m³/s.`,
              hints: [
                "Axial flow passage area of Kaplan runner is: A = π / 4 * (Do² - Di²).",
                `Calculate A: π/4 * (${dOuter}² - ${dInner}²) = ${area.toFixed(4)} m².`,
                `Multiply by flow velocity: Q = A * Vf = ${area.toFixed(4)} * ${flowVel} = ${ans} m³/s.`
              ],
              correctAnswer: String(ans),
              explanation: `Overall Kaplan discharge: Q = π/4 * (Do² - Di²) * Vf = π/4 * (${dOuter}² - ${dInner}²) * ${flowVel} = ${ans} m³/s.`
            });
          } else {
            const hSupply = getVal(day, i, 12, 2); // m
            const hDelivery = getVal(day, i, 48, 4); // m
            const dischSupply = getVal(day, i, 0.15, 0.02); // m3/s supply
            const dischDeliv = getVal(day, i, 0.025, 0.005); // m3/s delivery
            const efficiency = (dischDeliv * hDelivery) / (dischSupply * hSupply);
            const ans = Math.round(efficiency * 10000) / 100; // d'Aubuisson efficiency %
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A hydraulic ram plumbing layout taps water under an supply head h_s = ${hSupply} m, consuming a supply stream q = ${dischSupply} m³/s. The mechanism successfully pumps a small stream Q = ${dischDeliv} m³/s to a delivery header at elevation h_d = ${hDelivery} m. Determine the D'Aubuisson hydraulic plant efficiency in percent (%).`,
              hints: [
                "D'Aubuisson efficiency is computed as: η = (Q * h_d) / (q * h_s).",
                `Input energy factor is q * h_s = ${dischSupply} * ${hSupply} = ${(dischSupply*hSupply).toFixed(3)}.`,
                `Output lifting energy factor is Q * h_d = ${dischDeliv} * ${hDelivery} = ${(dischDeliv*hDelivery).toFixed(3)}.`,
                `Calculate ratio and multiply by 100 for percent. Enter exactly '${ans}'.`
              ],
              correctAnswer: String(ans),
              explanation: `D'Aubuisson efficiency formulation: η = (Q * h_d) / (q * h_s) = (${dischDeliv} * ${hDelivery}) / (${dischSupply} * ${hSupply}) = ${ans}%.`
            });
          }
        }
      } else if (moduleId === 'g1_dom') {
        if (i <= 7) {
          // Tier 1 Basics (Dynamics)
          if (sIdx === 0) {
            const links = 4;
            const joints = 4;
            const ans = 1;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Standard kinematics review: Identify the degree-of-freedom mechanical mobility (DOF) of an ideal planar 4-bar linkage comprising N = ${links} links and J = ${joints} simple revolute single-degree joints.`,
              hints: [
                "Apply Grubler's Mobility criterion: F = 3*(N - 1) - 2*J.",
                `Substitute: 3 * (${links} - 1) - 2 * ${joints} = 3 * 3 - 8 = 1.`,
                "Enter '1' directly as the planar mobile constraint."
              ],
              correctAnswer: "1",
              explanation: `Using planar Grubler linkage criterion: DOF = 3*(4 - 1) - 2*4 = 1.`
            });
          } else if (sIdx === 1) {
            const links = 6;
            const joints = 7;
            const ans = 1;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Determine the planar mechanical mobility degrees of freedom (DOF) of a Stephenson six-bar kinematic chain structure comprising N = ${links} flat links and J = ${joints} low-pair sliding joints.`,
              hints: [
                "Apply the planar Grubler equation: F = 3 * (N - 1) - 2 * J.",
                `Substitute: N = ${links}, J = ${joints}.`,
                `Calculate: 3 * (6 - 1) - 2 * 7 = 3 * 5 - 14 = 1.`
              ],
              correctAnswer: "1",
              explanation: `Grubler calculation yields F = 3 * (6 - 1) - 2 * 7 = 1 degree of freedom.`
            });
          } else if (sIdx === 2) {
            const radius = getVal(day, i, 0.4, 0.05); // m
            const speed = getVal(day, i, 10, 2); // rad/s
            const ans = Math.round((Math.pow(speed, 2) * radius) * 10) / 10;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A rotor balancing shaft spins a point mass on a radial arm path of length R = ${radius} m at a steady angular velocity of ω = ${speed} rad/s. Calculate the absolute centripetal radial acceleration in m/s².`,
              hints: [
                "Use the traditional circular radial acceleration formula: a_c = ω² * R.",
                `Calculate speed term squared: ${speed}² = ${speed*speed}.`,
                `Multiply: ${speed*speed} * ${radius} = ${ans} m/s².`
              ],
              correctAnswer: String(ans),
              explanation: `Centripetal acceleration is determined using a_c = ω² * R = ${speed}² * ${radius} = ${ans} m/s².`
            });
          } else {
            const mass_kg = getVal(day, i, 8, 1);
            const stiff_kn = getVal(day, i, 2.0, 0.5); // kN/m
            const natFreq = Math.sqrt((stiff_kn * 1000) / mass_kg);
            const ans = Math.round(natFreq * 10) / 10; // rad/s
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An undamped single-degree-of-freedom mass-spring mechanical element consists of a block of mass m = ${mass_kg} kg coupled to a structural spring of lateral stiffness k = ${stiff_kn} kN/m. Find the circular natural frequency (ω_n) in rad/s.`,
              hints: [
                "Recall the fundamental mass-spring natural frequency equation: ω_n = √(k / m).",
                `Convert k to standard stiffness unit (N/m): ${stiff_kn} * 1000 = ${stiff_kn * 1000} N/m.`,
                `ω_n = √(${stiff_kn * 1000} / ${mass_kg}) = √(${(stiff_kn * 1000 / mass_kg).toFixed(1)}) ≈ ${ans} rad/s.`
              ],
              correctAnswer: String(ans),
              explanation: `Natural frequency computed as: ω_n = √(k/m) = √(${stiff_kn*1000}/${mass_kg}) = ${ans} rad/s.`
            });
          }
        } else if (i <= 14) {
          // Tier 2 Syllabus Dynamic Governors / Fluctuation (4 Scenarios)
          if (sIdx === 0) {
            const eFluc = getVal(day, i, 3500, 500); // Joules
            const meanSpeed = getVal(day, i, 50, 5); // rad/s
            const cs = 0.02; // max fluctuation
            const ans = Math.round((eFluc / (Math.pow(meanSpeed, 2) * cs)) * 10) / 10; // I in kg-m2
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A reciprocating hot-gas machine flywheel absorbs a maximum kinetic energy fluctuation of ΔE = ${eFluc} Joules between cycles. If its design speed is ω_mean = ${meanSpeed} rad/s and it must remain within speed fluctuation limits Cs = 2% (0.02), solve for the mass moment of inertia (I) in kg·m².`,
              hints: [
                "Utilize the flywheel energy equation: ΔE = I * ω_mean² * Cs.",
                `Rearrange parameters: I = ΔE / (ω_mean² * Cs).`,
                `Solve: I = ${eFluc} / ( (${meanSpeed})² * 0.02 ) = ${ans} kg·m².`
              ],
              correctAnswer: String(ans),
              explanation: `The flywheel structural inertia determines: I = ΔE / (ω_mean² * Cs) = ${eFluc} / (${Math.pow(meanSpeed,2)} * 0.02) = ${ans} kg·m².`
            });
          } else if (sIdx === 1) {
            const n1 = getVal(day, i, 310, 15);
            const n2 = getVal(day, i, 290, 10);
            const meanN = (n1 + n2) / 2;
            const ans = Math.round(((n1 - n2) / meanN) * 10000) / 100; // sensitivity %
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Mechanical Watt speed governor tests show a maximum upper spindle speed of N1 = ${n1} RPM and a minimum spindle speed of N2 = ${n2} RPM. Evaluate the relative speed sensitivity coefficient of the governor in percent (%).`,
              hints: [
                "Governor sensitivity is relative limit difference: Sens = (N1 - N2) / N_mean.",
                `Mean operating speed: N_mean = (${n1} + ${n2}) / 2 = ${meanN} RPM.`,
                `Substitute: (${n1} - ${n2}) / ${meanN} * 100 = ${ans}%.`
              ],
              correctAnswer: String(ans),
              explanation: `Governor performance sensitivity is computed as (N1 - N2)/N_mean = (${n1}-${n2})/${meanN} = ${ans}%.`
            });
          } else if (sIdx === 2) {
            const mass = getVal(day, i, 2.5, 0.5); // kg
            const eccentric = getVal(day, i, 40, 5); // mm
            const speed_rpm = getVal(day, i, 1200, 100);
            const r_meter = eccentric / 1000;
            const omega = 2 * Math.PI * speed_rpm / 60;
            const force = mass * Math.pow(omega, 2) * r_meter;
            const ans = Math.round(force); // Centrifugal force in N
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An imbalanced motor rotor of total mass m = ${mass} kg exhibits an eccentric center alignment shift of e = ${eccentric} mm. Find the maximum centrifugal outward force in Newtons induced on bearings when spinning at ${speed_rpm} RPM.`,
              hints: [
                "Centrifugal force formula is: F = m * ω² * r.",
                `Angular velocity: ω = 2 * π * N / 60 = 2 * π * ${speed_rpm} / 60 ≈ ${omega.toFixed(2)} rad/s.`,
                `Solve: ${mass} * ${omega.toFixed(2)}² * ${(eccentric/1000)} ≈ ${ans} N.`
              ],
              correctAnswer: String(ans),
              explanation: `Vibratory centrifugal unbalance force: F = m * r * ω² = ${mass} * ${(eccentric/1000)} * (${omega.toFixed(2)})² = ${ans} Newtons.`
            });
          } else {
            const staticDef_mm = getVal(day, i, 4.0, 0.8);
            const ratioSec = 9.81 / (staticDef_mm / 1000);
            const ans = Math.round(Math.sqrt(ratioSec) / (2 * Math.PI) * 100) / 100; // Freq in Hz
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A heavy industrial rotor element causes a static transverse elastic deflection of exactly δst = ${staticDef_mm} mm in its support shaft. Evaluate the critical natural frequency of transverse shaft vibration in Hertz (Hz) (g = 9.81 m/s²).`,
              hints: [
                "Natural transverse frequency matches static deflection correlation: fn = 1 / (2*π) * √(g / δst).",
                `Convert static deflection to meters: ${staticDef_mm} / 1000 = ${(staticDef_mm/1000).toFixed(5)} m.`,
                `Substitute: fn = 1 / (2*π) * √(9.81 / ${(staticDef_mm/1000).toFixed(5)}) = ${ans} Hz.`
              ],
              correctAnswer: String(ans),
              explanation: `Transverse dynamic vibration ceiling matches: fn = 1/(2π) * √(g/δ) = 1/(2π) * √(9.81 / ${(staticDef_mm/1000)}) = ${ans} Hz.`
            });
          }
        } else {
          // Tier 3 Real-time applications (4 Scenarios)
          if (sIdx === 0) {
            const rotMass = getVal(day, i, 15, 3); // kg
            const gyRadius = getVal(day, i, 0.22, 0.04); // m
            const rotSpeed = getVal(day, i, 1800, 200); // RPM
            const precSpeed = getVal(day, i, 1.8, 0.4); // rad/s
            const inertia = rotMass * Math.pow(gyRadius, 2);
            const omega = 2 * Math.PI * rotSpeed / 60;
            const coupleVal = inertia * omega * precSpeed;
            const ans = Math.round(coupleVal * 10) / 10;
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An industrial steam turbine rotor of mass m = ${rotMass} kg has a radius of gyration kg = ${gyRadius} m. It is spinning at ${rotSpeed} RPM when the vehicle undergoes a pitching precession rate of ωp = ${precSpeed} rad/s. Calculate the induced gyroscopic couple reaction torque in N·m.`,
              hints: [
                "Apply Gyroscopic Couple relation: C = I * ω * ωp.",
                `Calculate mass moment of inertia: I = m * k² = ${rotMass} * ${gyRadius}² = ${inertia.toFixed(4)} kg·m².`,
                `Solve: ${inertia.toFixed(4)} * (${rotSpeed} * 2π/60) * ${precSpeed} = ${ans} N·m.`
              ],
              correctAnswer: String(ans),
              explanation: `Gyroscopic reaction torque is determined by: C = I * ω * ωp = (${rotMass} * ${gyRadius}²) * (${rotSpeed} * 2π/60) * ${precSpeed} = ${ans} N·m.`
            });
          } else if (sIdx === 1) {
            const rotSpeed = getVal(day, i, 2200, 200); // rpm
            const rotorI = getVal(day, i, 0.5, 0.1); // kg-m2
            const dampingC = getVal(day, i, 12, 2); // N-m-s/rad (damping metric)
            const ans = Math.round((2 * Math.PI * rotorI * rotSpeed / 60) * 10) / 10; // Angular momentum
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An aerospace drone active stabilizing wheel holds a total mass moment of inertia I = ${rotorI} kg·m². If telemetry registers a continuous rotational spin rate of N = ${rotSpeed} RPM, compute the active angular momentum in kg·m²/s.`,
              hints: [
                "Angular momentum is calculated as: L = I * ω.",
                `Convert RPM to angular velocity: ω = 2 * π * N / 60 = 2 * π * ${rotSpeed} / 60 ≈ ${(rotSpeed * Math.PI / 30).toFixed(2)} rad/s.`,
                `Multiply values: L = ${rotorI} * ${(rotSpeed * Math.PI / 30).toFixed(2)} = ${ans} kg·m²/s.`
              ],
              correctAnswer: String(ans),
              explanation: `Angular momentum evaluates to: L = I * ω = ${rotorI} * (${rotSpeed} * 2π/60) = ${ans} kg·m²/s.`
            });
          } else if (sIdx === 2) {
            const mass = getVal(day, i, 180, 20); // kg
            const lateralK = getVal(day, i, 45, 5); // kN/m
            const dampingRatio = 0.25; // damping fraction
            const k_nm = lateralK * 1000;
            const criticalC = 2 * Math.sqrt(k_nm * mass);
            const dampValue = Math.round(dampingRatio * criticalC);
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A sensitive industrial laboratory machine motor of mass m = ${mass} kg is isolates on dampening springs of combined stiffness k = ${lateralK} kN/m. Design limits specify an active damping ratio of exactly ζ = ${dampingRatio}. Calculate the required damping coefficient (C) in N·s/m.`,
              hints: [
                "Critical damping is: Cc = 2 * √(k * m). Natural damping coefficient is C = ζ * Cc.",
                `Calculate k in N/m: ${lateralK} * 1000 = ${k_nm} N/m.`,
                `Critical dynamic damping: Cc = 2 * √(${k_nm} * ${mass}) = ${criticalC.toFixed(1)} N·s/m.`,
                `C = ${dampingRatio} * ${criticalC.toFixed(1)} = ${dampValue} N·s/m.`
              ],
              correctAnswer: String(dampValue),
              explanation: `Damping system coefficient: C = ζ * [2 * √(k * m)] = ${dampingRatio} * [2 * √(${k_nm} * ${mass})] = ${dampValue} N·s/m.`
            });
          } else {
            const mass_kg = getVal(day, i, 12, 2);
            const radius_mm = getVal(day, i, 250, 20);
            const trans_force = getVal(day, i, 600, 100);
            const inertia = mass_kg * Math.pow(radius_mm / 1000, 2);
            const ans = Math.round(trans_force * (radius_mm / 1000) / inertia * 10) / 10; // Accel in rad/s2
            list.push({
              id: i,
              subject,
              question: `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An industrial rotary fly-mechanism has a mass m = ${mass_kg} kg with radius of gyration R = ${radius_mm} mm. A tangential torque force of F = ${trans_force} N gets applied at this outer radius. Find the resulting rotational angular acceleration in rad/s².`,
              hints: [
                "Torque T = F * R. Inertia I = m * R².",
                `Determine parameters: Torque T = ${trans_force} * ${(radius_mm/1000)} N·m. Inertia I = ${mass_kg} * ${(radius_mm/1000)}² kg·m².`,
                `Solve equation: Angular Accel α = T / I. calculate: ${ans} rad/s².`
              ],
              correctAnswer: String(ans),
              explanation: `Angular acceleration is F * R / (m * R²) = F / (m * R) = ${trans_force} / (${mass_kg} * ${radius_mm/1000}) = ${ans} rad/s².`
            });
          }
        }
      } else if (moduleId === 'g1_tof') {
        const p1 = getVal(day, i, 100, 10);
        const t1 = getVal(day, i, 300, 20);
        const v1 = getVal(day, i, 0.8, 0.05);
        if (i <= 7) {
          const ans = Math.round((p1 * v1 / (0.287 * t1)) * 100) / 100;
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 1] Gas Ideal Gas Law: An ideal gas sample at pressure P = ${p1} kPa has temperature T = ${t1} K and volume V = ${v1} m³. Calculate the mass of the gas sample in kg using the gas constant R = 0.287 kJ/(kg·K).`,
            hints: [
              "Recall the ideal gas equation: P * V = m * R * T.",
              "Rearrange to solve for mass: m = (P * V) / (R * T).",
              `Divide: (${p1} * ${v1}) / (0.287 * ${t1}) = ${ans} kg.`
            ],
            correctAnswer: String(ans),
            explanation: `Mass is computed as m = P*V / (R*T) = ${p1} * ${v1} / (0.287 * ${t1}) = ${ans} kg.`
          });
        } else if (i <= 14) {
          const r = getVal(day, i, 8, 0.5);
          const ans = Math.round((1 - 1 / Math.pow(r, 0.4)) * 1000) / 10;
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 2] Otto Cycle Efficiency: A standard air Otto cycle has a compression ratio of exactly r = ${r}. Estimate the theoretical thermal efficiency in percent (%). (Use ratio of specific heats γ = 1.4).`,
            hints: [
              "Thermal efficiency of Otto Cycle: η = 1 - 1 / (r^(γ-1)).",
              `In this case: η = 1 - 1 / (${r}^0.4).`,
              `Calculate and multiply by 100 to get percentage. Target: ${ans}%.`
            ],
            correctAnswer: String(ans),
            explanation: `Efficiency η = 1 - 1 / r^0.4 = 1 - 1 / ${r}^0.4 = ${ans}%.`
          });
        } else {
          const tH = getVal(day, i, 800, 50);
          const tC = getVal(day, i, 300, 10);
          const ans = Math.round((1 - tC / tH) * 1000) / 10;
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 3] Carnot Engine: A reversible power cycle operates between a warm thermal energy reservoir at TH = ${tH} K and a cold sink temperature TC = ${tC} K. Find maximum legal Carnot efficiency in percent (%).`,
            hints: [
              "Carnot thermal efficiency: η_max = 1 - T_C / T_H.",
              `Calculate: η_max = 1 - ${tC} / ${tH}.`,
              `Express in %: ${ans}%.`
            ],
            correctAnswer: String(ans),
            explanation: `Maximum thermodynamic efficiency (Carnot): η = 1 - Tc / TH = 1 - ${tC}/${tH} = ${ans}%.`
          });
        }
      } else if (moduleId === 'g1_mts') {
        const force = getVal(day, i, 40, 5); // kN
        const dia = getVal(day, i, 20, 2); // mm
        const area = Math.PI * Math.pow(dia / 2, 2);
        if (i <= 7) {
          const ans = Math.round((force * 1000 / area) * 10) / 10;
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 1] Nominal Stress: A standard tensile specimen of diameter D = ${dia} mm experiences an axial pulling force F = ${force} kN. Compute the engineering tensile stress σ in MPa in the core.`,
            hints: [
              "Tensile stress is defined as Force / Area.",
              `Calculate cross-sectional area: A = π * D² / 4 = ${area.toFixed(2)} mm².`,
              `Divide: ${force * 1000} N / ${area.toFixed(2)} mm² = ${ans} MPa.`
            ],
            correctAnswer: String(ans),
            explanation: `Engineering tensile stress σ = F/A = ${force * 1000} / ${area.toFixed(2)} = ${ans} MPa.`
          });
        } else if (i <= 14) {
          const length = getVal(day, i, 200, 15); // mm
          const ext = getVal(day, i, 0.4, 0.05); // mm
          const ans = Math.round((ext / length) * 100000) / 1000; // in percent or strain scale
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 2] Material Strain: A bar section of origin length L = ${length} mm extends by exactly δ = ${ext} mm under elastic loading. Compute the engineering normal strain fraction in thousandths (strain * 1000).`,
            hints: [
              "Strain ε is defined as elongation over length: δ / L.",
              "To express in thousandths, calculate: (δ / L) * 1000.",
              `Divide and scale: (${ext} / ${length}) * 1000 = ${ans}.`
            ],
            correctAnswer: String(ans),
            explanation: `Engineering strain ε = δ / L = ${ext} / ${length} = ${(ext/length).toFixed(6)}. Scaled by 1000: ${ans}.`
          });
        } else {
          const torque = getVal(day, i, 120, 15); // N-m
          const outerRad = dia / 2;
          const J_polar = (Math.PI / 32) * Math.pow(dia, 4);
          const maxStress = (torque * 1000 * outerRad) / J_polar;
          const ans = Math.round(maxStress * 10) / 10;
          list.push({
            id: i,
            subject,
            question: `[Day ${day} • ${difficultyLabel} • Tier 3] Torsional Shear: A round solid metal shaft of diameter d = ${dia} mm is subjected to twisted torque T = ${torque} N·m during shear testing. Solve for the peak torsional shear stress τ_max in MPa.`,
            hints: [
              "Apply torsional stress formula: τ_max = T * r / J.",
              `Polar moment inertia for solid cylinder is J = π * d⁴ / 32 = ${J_polar.toFixed(1)} mm⁴.`,
              `Solve using outer radius r = ${outerRad} mm: τ_max = (${torque*1000} * ${outerRad}) / ${J_polar.toFixed(1)} = ${ans} MPa.`
            ],
            correctAnswer: String(ans),
            explanation: `Peak torsional stress: τ_max = T * R / J = (${torque} * 1000 * ${outerRad}) / [π * ${dia}⁴ / 32] = ${ans} MPa.`
          });
        }
      }
    } else {
      // MCQ TRACKS (G2 & G3)
      // Standard MCQs with diverse setups depending on active week, day, and scenario.
      let questionText = '';
      let optionsList: string[] = [];
      let correctIdx = 0;
      let hintsList: string[] = [];
      let explanationText = '';

      if (moduleId === 'g2_amsm') {
        if (i <= 7) {
          // AMSM Tier 1: Basics
          if (sIdx === 0) {
            const force = getVal(day, i, 45, 5); // kN
            const dia = getVal(day, i, 18, 2); // mm
            const area = Math.PI * Math.pow(dia / 2, 2);
            const stress = Math.round((force * 1000 / area) * 10) / 10;
            const opt1 = `${stress} MPa`;
            const opt2 = `${Math.round(stress * 0.85)} MPa`;
            const opt3 = `${Math.round(stress * 1.3)} MPa`;
            const opt4 = `150.0 MPa`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A cylindrical ductile tie-bar with diameter d = ${dia} mm must carry a steady state axial tension load of P = ${force} kN. What is the engineering normal stress induced in the bar?`;
            hintsList = ["σ = P / A.", `Calculate cross-sectional area: A = π * d² / 4 = ${area.toFixed(1)} mm².`, `Divide force by area in MPa: ${force * 1000} N / ${area.toFixed(1)} mm² = ${stress} MPa.`];
            explanationText = `Stress equals tensile force divided by cross section: σ = ${force * 1000} / (π/4 * ${dia}²) = ${stress} MPa.`;
          } else if (sIdx === 1) {
            const normalP = getVal(day, i, 80, 10); // MPa
            const poison = 0.3;
            const lateralStrain = Math.round((normalP / 210000 * poison * 1e6) * 10) / 10; // in microstrain
            const ansStr = `${lateralStrain} μ-strain`;
            const opt1 = ansStr;
            const opt2 = `${(lateralStrain * 1.5).toFixed(1)} μ-strain`;
            const opt3 = `${(lateralStrain * 0.5).toFixed(1)} μ-strain`;
            const opt4 = `50.0 μ-strain`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(ansStr);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A specimen experiences structural tension causing axial stress of σ = ${normalP} MPa. Find the lateral contraction strain in microstrain if E = 210 GPa and Poisson's ratio ν = ${poison}.`;
            hintsList = ["Axial Strain ε_axial = σ / E.", "Lateral Strain ε_lat = ν * ε_axial.", `Let E = 210000 MPa. Microstrain means multiply strain value by 10⁶.`];
            explanationText = `Lateral elastic strain: ε = ν * (σ / E) = 0.3 * (${normalP} / 210000) = ${lateralStrain} * 10⁻⁶ = ${ansStr}.`;
          } else if (sIdx === 2) {
            const outerD = getVal(day, i, 50, 5); // mm
            const thickness = getVal(day, i, 5, 1); // mm
            const innerD = outerD - 2 * thickness;
            const polarJ = (Math.PI / 32) * (Math.pow(outerD, 4) - Math.pow(innerD, 4));
            const polarZ = Math.round((polarJ / (outerD / 2)) / 100) * 100; // sectional modulus in mm3
            const opt1 = `${polarZ} mm³`;
            const opt2 = `${polarZ - 500} mm³`;
            const opt3 = `${polarZ + 800} mm³`;
            const opt4 = `10000 mm³`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A hollow cylindrical machine tube has outer diameter Do = ${outerD} mm and thickness t = ${thickness} mm. Compute its polar sectional modulus (Zp = J / R) rounded to the nearest hundred.`;
            hintsList = ["The polar section modulus for a hollow circular tube is: Zp = π * (Do⁴ - Di⁴) / (32 * R).", `Inner diameter is Di = Do - 2*t = ${innerD} mm.`, `Compute J first, then divide by Do/2.`];
            explanationText = `Polar sectional property: Zp = π/16 * (Do⁴ - Di⁴) / Do = π/32 * (${outerD}⁴ - ${innerD}⁴) / ${(outerD/2)} ≈ ${polarZ} mm³.`;
          } else {
            const shear_mpa = getVal(day, i, 60, 10);
            const shear_mod = 80; // GPa
            const angleVal = Math.round((shear_mpa / (shear_mod * 1000) * 1e4) * 10) / 10;
            const opt1 = `${angleVal} x 10⁻⁴ rad`;
            const opt2 = `${(angleVal * 1.5).toFixed(1)} x 10⁻⁴ rad`;
            const opt3 = `${(angleVal * 0.5).toFixed(1)} x 10⁻⁴ rad`;
            const opt4 = `10.0 x 10⁻⁴ rad`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An element undergoes a state of pure structural shear stress of τ = ${shear_mpa} MPa. Calculate the shear strain (γ) if the material shear modulus is G = ${shear_mod} GPa.`;
            hintsList = ["Apply Hooke's Law for Shear: τ = G * γ.", `Convert G to MPa: ${shear_mod} GPa = ${shear_mod * 1000} MPa.`, `γ = ${shear_mpa} / ${shear_mod * 1000} = ${angleVal} * 10⁻⁴ rad.`];
            explanationText = `Shear strain matches: γ = τ / G = ${shear_mpa} / (${shear_mod * 1000}) = ${angleVal} x 10⁻⁴ radians.`;
          }
        } else if (i <= 14) {
          // AMSM Tier 2: Syllabus-Oriented
          if (sIdx === 0) {
            const sx = getVal(day, i, 140, 15);
            const sy = getVal(day, i, 60, 10);
            const txy = getVal(day, i, 40, 5);
            const avg = (sx + sy) / 2;
            const diff = (sx - sy) / 2;
            const rad = Math.sqrt(Math.pow(diff, 2) + Math.pow(txy, 2));
            const sigma1 = Math.round((avg + rad) * 10) / 10;
            const opt1 = `${sigma1} MPa`;
            const opt2 = `${Math.round(sigma1 + 25)} MPa`;
            const opt3 = `${Math.round(sigma1 - 25)} MPa`;
            const opt4 = `120.0 MPa`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A planar stress element exhibits biaxial stresses of σx = ${sx} MPa, σy = ${sy} MPa, and shear stress τxy = ${txy} MPa. Evaluate the maximum principal stress (σ1) in MPa.`;
            hintsList = ["σ1,2 = (σx + σy)/2 ± √[((σx - σy)/2)² + τxy²].", `Average is ${avg} and Mohr's circle radius is ${rad.toFixed(2)}.`, `Substitute & compute.`];
            explanationText = `Major stress eigenvalue evaluates: σ1 = (sx+sy)/2 + √((sx-sy)²/4 + txy²) = ${sigma1} MPa.`;
          } else if (sIdx === 1) {
            const dColumn = getVal(day, i, 100, 10); // mm
            const normalP = getVal(day, i, 16, 2); // kN load
            const area = Math.PI * Math.pow(dColumn / 2, 2);
            const directStress = Math.round((normalP * 1000 / area) * 100) / 100;
            const opt1 = `${directStress} N/mm²`;
            const opt2 = `${(directStress * 1.5).toFixed(2)} N/mm²`;
            const opt3 = `${(directStress * 0.5).toFixed(2)} N/mm²`;
            const opt4 = `5.00 N/mm²`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A static short column section with circular diameter d = ${dColumn} mm is compressed by an axial force P = ${normalP} kN. Compute the direct axial compressive stress.`;
            hintsList = ["Stress σ = Compressing Force / Area.", `Calculate: A = π * ${dColumn}² / 4 = ${area.toFixed(1)} mm².`, `Substitute: ${normalP * 1000} N / ${area.toFixed(1)} mm²`];
            explanationText = `Compressive stress: σ = P / A = ${normalP * 1000} / [3.1416 * ${dColumn}² / 4] = ${directStress} N/mm².`;
          } else if (sIdx === 2) {
            const outerD = getVal(day, i, 80, 10); // mm
            const thickness = getVal(day, i, 4, 1); // mm
            const pressure = getVal(day, i, 2.5, 0.5); // MPa internal
            const internalD = outerD - 2 * thickness;
            const stressVal = Math.round((pressure * internalD / (2 * thickness)) * 10) / 10; // thin hoop
            const opt1 = `${stressVal} MPa`;
            const opt2 = `${Math.round(stressVal * 0.75)} MPa`;
            const opt3 = `${Math.round(stressVal * 1.35)} MPa`;
            const opt4 = `50.0 MPa`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A thin cylindrical air vessel holds fluid at internal gauge pressure p = ${pressure} MPa. If its shell outer diameter is ${outerD} mm and plates thickness t = ${thickness} mm, solve for the thin circular hoop stress.`;
            hintsList = ["Hoop stress is given by: σ_hoop = p * d_internal / (2 * t).", `Internal diameter of cylinder: di = Do - 2*t = ${internalD} mm.`, `Substitute: ${pressure} * ${internalD} / (2 * ${thickness})`];
            explanationText = `Thin vessel hoop stress evaluates as: σ = p * d / 2t = ${pressure} * ${internalD} / (2 * ${thickness}) = ${stressVal} MPa.`;
          } else {
            const height = getVal(day, i, 120, 10); // mm
            const width = getVal(day, i, 60, 5); // mm
            const moment_knm = getVal(day, i, 6, 1); // kN-m
            const inertia = (width * Math.pow(height, 3)) / 12; // mm4
            const stress = Math.round((moment_knm * 1e6 * (height / 2) / inertia) * 10) / 10;
            const opt1 = `${stress} MPa`;
            const opt2 = `${Math.round(stress * 0.8)} MPa`;
            const opt3 = `${Math.round(stress * 1.5)} MPa`;
            const opt4 = `100.0 MPa`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A rectangular beam of cross section ${width}mm wide x ${height}mm deep experiences an active bending moment M = ${moment_knm} kN·m. Determine the maximum outer fiber bending stress.`;
            hintsList = ["Bending formula: σ_bend = M * y / I.", `Inertia of section: I = b * h³ / 12 = ${width} * ${height}³ / 12 = ${inertia.toFixed(1)} mm⁴.`, `Maximum fiber boundary height: y = h / 2 = ${height / 2} mm.`];
            explanationText = `Max bending stress: σ = M * (h/2) / [b*h³/12] = ${moment_knm*1e6} * ${(height/2)} / ${inertia} = ${stress} MPa.`;
          }
        } else {
          // AMSM Tier 3: Real-Time Applications
          if (sIdx === 0) {
            const length = getVal(day, i, 3.2, 0.2); // m
            const colDia = getVal(day, i, 60, 5); // mm
            const E = 200; // GPa
            const inertia = (Math.PI / 64) * Math.pow(colDia, 4) * 1e-12; // m4
            const criticalP = Math.round((Math.pow(Math.PI, 2) * (E * 1e9) * inertia / Math.pow(length, 2) / 1000) * 10) / 10;
            const opt1 = `${criticalP} kN`;
            const opt2 = `${Math.round(criticalP * 1.35)} kN`;
            const opt3 = `${Math.round(criticalP * 0.65)} kN`;
            const opt4 = `110.0 kN`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An structural steel hydraulic support column (pinned-pinned endpoints) spans a length L = ${length} m with diameter d = ${colDia} mm. What is the critical Euler elastic buckling limit in kN? (E = 200 GPa).`;
            hintsList = ["Euler Buckling Formula: P_cr = π² * E * I / L².", `Inertia: I = π * d⁴ / 64 ≈ ${(inertia*1e8).toFixed(3)} x 10^-8 m⁴.`, `Substitute values & scale to kN.`];
            explanationText = `Euler column structural limit critical buckling evaluates to: P_cr = π² * E * I / L² = ${criticalP} kN.`;
          } else if (sIdx === 1) {
            const length = getVal(day, i, 1.8, 0.2); // m
            const deflection_mm = getVal(day, i, 8.0, 1.0); // mm
            const force_kn = 3; // kN point load
            const supportK = Math.round((force_kn * 1000 / (deflection_mm / 1000) / 1000)); // kN/m
            const opt1 = `${supportK} kN/m`;
            const opt2 = `${Math.round(supportK * 1.5)} kN/m`;
            const opt3 = `${Math.round(supportK * 0.6)} kN/m`;
            const opt4 = `250 kN/m`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: In an engineering structural field test, a point load force of P = ${force_kn} kN is applied to a cantilever beam tip, causing tip deflection δ = ${deflection_mm} mm. What is the structural spring rate stiffness of the beam?`;
            hintsList = ["Stiffness matches: k = Force / Deflection.", `Deflection = ${deflection_mm} mm = ${(deflection_mm/1000)} m.`, `Solve: ${force_kn} kN / ${(deflection_mm/3)} ... or ${force_kn * 1000} N / ${(deflection_mm/1000)} m.`];
            explanationText = `Spring rate is force divided by displacement: k = P / δ = ${force_kn} kN / ${(deflection_mm/1000)} m = ${supportK} kN/m.`;
          } else if (sIdx === 2) {
            const force = getVal(day, i, 12, 2); // kN
            const offset = getVal(day, i, 180, 20); // mm
            const sectionZ = getVal(day, i, 45, 5); // x10^3 mm^3
            const stress = Math.round((force * 1000 * offset / (sectionZ * 1000)) * 10) / 10;
            const opt1 = `${stress} MPa`;
            const opt2 = `${Math.round(stress * 1.5)} MPa`;
            const opt3 = `${Math.round(stress * 0.5)} MPa`;
            const opt4 = `120.0 MPa`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A structural bracket carries an eccentric load P = ${force} kN offset by e = ${offset} mm. Find the maximum bending stress on critical fibers if section modulus is Z = ${sectionZ} x 10³ mm³.`;
            hintsList = ["Eccentric bending moment M = P * e.", `Stress = M / Z = (P * e) / Z.`, `Substitute: ${force*1000} N * ${offset} mm / (${sectionZ * 1000} mm³)`];
            explanationText = `Bending stress: σ = M / Z = [${force*1000} * ${offset}] / [${sectionZ*1000}] = ${stress} MPa.`;
          } else {
            const strainG = getVal(day, i, 4.5, 0.5); // x10^-4
            const modulusE = 200; // GPa
            const energyDen = Math.round((0.5 * modulusE * 1e9 * Math.pow(strainG * 1e-4, 2) / 1000) * 10) / 10; // kJ/m3
            const opt1 = `${energyDen} kJ/m³`;
            const opt2 = `${(energyDen * 1.5).toFixed(1)} kJ/m³`;
            const opt3 = `${(energyDen * 0.5).toFixed(1)} kJ/m³`;
            const opt4 = `50.0 kJ/m³`;
            optionsList = [opt1, opt2, opt3, opt4].sort();
            correctIdx = optionsList.indexOf(opt1);
            questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Calculate the volumetric strain energy density storing rate of structural steel straining under normal uniform axial strain ε = ${strainG} x 10⁻⁴ (Modulus E = 200 GPa).`;
            hintsList = ["Strain energy density formula: u = 0.5 * E * ε².", `strain = ${strainG * 1e-4}. Strain squared matches: ${Math.pow(strainG * 1e-4, 2).toFixed(9)}.`, `Substitute: 0.5 * 200 * 10⁹ * isentropic strain. Scale to kJ by dividing by 1000.`];
            explanationText = `Elastic strain energy density: u = 0.5 * E * ε² = 0.5 * 200 * 10⁹ * (${strainG * 1e-4})² = ${energyDen} kJ/m³.`;
          }
        }
      } else if (moduleId === 'g2_atst') {
        const tHot = getVal(day, i, 820, 40);
        const tCold = getVal(day, i, 310, 15);
        if (i <= 7) {
          const eff = Math.round(((1 - tCold / tHot) * 100) * 10) / 10;
          const opt1 = `${eff}%`;
          const opt2 = `${Math.round(eff - 10)}%`;
          const opt3 = `${Math.round(eff + 10)}%`;
          const opt4 = `50.0%`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Find the Carnot thermodynamic limit thermal efficiency index of a thermal loop operating between reservoir boundaries of Th = ${tHot} K and Tc = ${tCold} K.`;
          hintsList = ["Carnot η = 1 - Tc / Th.", `Here, Tc = ${tCold} K, Th = ${tHot} K.`, `η = 1 - ${tCold}/${tHot} = ${(1-tCold/tHot).toFixed(4)}`];
          explanationText = `Maximum possible thermodynamic efficiency matches η = 1 - Tc/Th = ${eff}%.`;
        } else if (i <= 14) {
          const compR = getVal(day, i, 9.0, 0.5);
          const t1 = getVal(day, i, 300, 5);
          const t2 = Math.round(t1 * Math.pow(compR, 0.4) * 10) / 10;
          const opt1 = `${t2} K`;
          const opt2 = `${Math.round(t2 + 50)} K`;
          const opt3 = `${Math.round(t2 - 50)} K`;
          const opt4 = `650.0 K`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An air standard reciprocating compressor operates under a volumetric compression ratio r = ${compR}. If air enters at T1 = ${t1} K, compute isentropic terminal temperature T2 in Kelvin (assume gamma = 1.4).`;
          hintsList = ["Adiabatic relation: T2 = T1 * (r)^(γ - 1).", `γ - 1 = 0.4. Exponent value: (${compR})^(0.4) = ${Math.pow(compR, 0.4).toFixed(3)}.`, `Substitute and calculate.`];
          explanationText = `Adiabatic isentropic temperature rises to: T2 = T1 * (r)^0.4 = ${t1} * ${compR}^0.4 = ${t2} K.`;
        } else {
          const flow = getVal(day, i, 18, 2); // kg/s
          const h1 = getVal(day, i, 3300, 40); // kJ/kg
          const h2 = getVal(day, i, 2400, 30); // kJ/kg
          const power = flow * (h1 - h2);
          const opt1 = `${power} kW`;
          const opt2 = `${Math.round(power * 0.8)} kW`;
          const opt3 = `${Math.round(power * 1.2)} kW`;
          const opt4 = `12000 kW`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An industrial steam generator turbine receives a mass fluid stream flow rate of ${flow} kg/s. If steam entering holds enthalpy h1 = ${h1} kJ/kg and exits at h2 = ${h2} kJ/kg with negligible heat radiation losses, evaluate overall shaft power output in kW.`;
          hintsList = ["SFEE turbine energy rate formulation: P = m * (h1 - h2).", `Enthalpy drop: ${h1} - ${h2} = ${h1-h2} kJ/kg.`, `P = ${flow} * ${(h1-h2)} kW.`];
          explanationText = `First law steady flow energy equation gives: P = m * (h1 - h2) = ${flow} * (${h1 - h2}) = ${power} kW.`;
        }
      } else if (moduleId === 'g3_som') {
        if (i <= 7) {
          // SOM Tier 1: Basics
          const force = getVal(day, i, 15, 2); // kN
          const length = getVal(day, i, 2.5, 0.2); // m
          const dia = getVal(day, i, 12, 1); // mm
          const area = Math.PI * Math.pow(dia / 2, 2);
          const elong = Math.round((force * 1000 * length * 1000 / (area * 200000)) * 100) / 100;
          const opt1 = `${elong} mm`;
          const opt2 = `${(elong * 1.5).toFixed(2)} mm`;
          const opt3 = `${(elong * 0.5).toFixed(2)} mm`;
          const opt4 = `0.60 mm`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A cylindrical bar of structural steel (dia d = ${dia} mm, L = ${length} m) is strained under an axial tension of P = ${force} kN. What is the total elastic elongation in mm? (E = 200 GPa).`;
          hintsList = ["Hooke's extension equation: δ = P * L / (A * E).", `Calculate area: A = π * ${dia}² / 4 = ${area.toFixed(1)} mm².`, `Substitute: P = ${force*1000} N, L = ${length*1000} mm, E = 200000 MPa.`];
          explanationText = `Direct extension: δ = P * L / (A * E) = [${force*1000} * ${length*1000}] / [${area.toFixed(1)} * 200000] = ${elong} mm.`;
        } else if (i <= 14) {
          // SOM Tier 2: Syllabus
          const torque = getVal(day, i, 400, 50); // N-m
          const dia = getVal(day, i, 45, 2); // mm
          const shear = Math.round((16 * torque * 1000 / (Math.PI * Math.pow(dia, 3))) * 10) / 10;
          const opt1 = `${shear} MPa`;
          const opt2 = `${Math.round(shear * 0.8)} MPa`;
          const opt3 = `${Math.round(shear * 1.35)} MPa`;
          const opt4 = `35.0 MPa`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A dynamic solid circular power shaft of diameter d = ${dia} mm transmits mechanical torque T = ${torque} N·m. Calculate the maximum shear stress induced at the outer fibers.`;
          hintsList = ["Apply shaft torsion formula: τ = 16 * T / (π * d³).", `Convert torque parameter: T = ${torque} * 1000 N·mm.`, `Solve: 16 * ${torque * 1000} / (π * ${dia}³)`];
          explanationText = `Outer radius shear stress resolves to: τ = 16 * T / (π * d³) = ${shear} MPa.`;
        } else {
          // SOM Tier 3: Applications
          const length = getVal(day, i, 2.2, 0.1); // m
          const load_kn = getVal(day, i, 6, 1); // kN point load
          const inertia = 1600; // cm4
          const E = 200; // GPa
          const i_m4 = inertia * 1e-8;
          const tipDef = Math.round((load_kn * 1000 * Math.pow(length, 3) / (3 * E * 1e9 * i_m4) * 1000) * 10) / 10; // mm
          const opt1 = `${tipDef} mm`;
          const opt2 = `${(tipDef * 1.5).toFixed(1)} mm`;
          const opt3 = `${(tipDef * 0.5).toFixed(1)} mm`;
          const opt4 = `10.0 mm`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A structural cantilever beam spans length L = ${length} m. Standard sensors detect a concentrated point load F = ${load_kn} kN at its free boundary tip. Find tip deflection in mm if I = ${inertia} cm⁴, E = 200 GPa.`;
          hintsList = ["Cantilever end deflection: δ = F * L³ / (3 * E * I).", `Convert section property: I = ${inertia} * 10^-8 m⁴.`, `Scale tip parameters and convert meters to mm.`];
          explanationText = `Tip deflection is: δ = F * L³ / (3 * E * I) = [${load_kn*1000} * ${length}³] / [3 * 200 * 10⁹ * ${i_m4}] * 1000 = ${tipDef} mm.`;
        }
      } else if (moduleId === 'g3_fm') {
        if (i <= 7) {
          const spg = getVal(day, i, 0.85, 0.02);
          const dens = Math.round(spg * 1000);
          const opt1 = `${dens} kg/m³`;
          const opt2 = `${dens - 100} kg/m³`;
          const opt3 = `${dens + 100} kg/m³`;
          const opt4 = `1000 kg/m³`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Determine absolute mass density of a hydraulic lubricant having relative specific gravity index S.G. = ${spg}.`;
          hintsList = ["Water density baseline: ρ_water = 1000 kg/m³.", `Density = S.G. * ρ_water.`, `Calculate: ${spg} * 1000.`];
          explanationText = `Fluid density matches: S.G. * 1000 = ${dens} kg/m³.`;
        } else if (i <= 14) {
          const d1 = getVal(day, i, 160, 10);
          const d2 = getVal(day, i, 80, 5);
          const ratio = Math.round(Math.pow(d1 / d2, 2) * 100) / 100;
          const opt1 = `Ratio: ${ratio}`;
          const opt2 = `Ratio: ${(ratio * 0.75).toFixed(2)}`;
          const opt3 = `Ratio: ${(ratio * 1.5).toFixed(2)}`;
          const opt4 = `Ratio: 2.00`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(`Ratio: ${ratio}`);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Standard hydraulics metrics check: In inline piping, a diameter of D1 = ${d1} mm contracts to throat D2 = ${d2} mm. Estimate section area ratio factor (A1 / A2).`;
          hintsList = ["Area ratio scales as the squared diameter ratio: (D1 / D2)².", `Solve: (${d1} / ${d2})².`];
          explanationText = `Contraction area ratio resolves as: (D1/D2)² = ${ratio}.`;
        } else {
          const L = getVal(day, i, 120, 10);
          const d = getVal(day, i, 0.25, 0.02);
          const V = getVal(day, i, 2.2, 0.2);
          const f = 0.02;
          const headL = Math.round((f * L * Math.pow(V, 2) / (2 * 9.81 * d)) * 100) / 100;
          const opt1 = `${headL} m`;
          const opt2 = `${(headL * 1.35).toFixed(2)} m`;
          const opt3 = `${(headL * 0.65).toFixed(2)} m`;
          const opt4 = `6.50 m`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: Calculate friction head energy loss hf in meters of water for pipeline velocity V = ${V} m/s, length L = ${L} m, and diameter D = ${d} m if f = ${f}.`;
          hintsList = ["Darcy formula: hf = f * L * V² / (2 * g * D).", `g = 9.81 m/s². Diameter is ${d} m.`, `Substitute parameters.`];
          explanationText = `Darcy friction loss matches: h_f = f * L * V² / (2 * g * D) = ${headL} m.`;
        }
      } else if (moduleId === 'g3_dme') {
        if (i <= 7) {
          const force = getVal(day, i, 15, 2); // kN
          const stressSafe = getVal(day, i, 75, 5); // MPa
          const area = Math.round((force * 1000 / stressSafe) * 10) / 10;
          const opt1 = `${area} mm²`;
          const opt2 = `${Math.round(area * 1.35)} mm²`;
          const opt3 = `${Math.round(area * 0.65)} mm²`;
          const opt4 = `120.0 mm²`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A load P = ${force} kN acts on a cylindrical link component. If permissible safe stress index is σ_allow = ${stressSafe} MPa, solve for minimal required cross area.`;
          hintsList = ["Area required matches axial relation: A = Force / σ_allow.", `Force = ${force * 1000} N. stress = ${stressSafe} MPa.`, `Divide values.`];
          explanationText = `Design static cross area requirement: A = P / σ_allow = ${force*1000} / ${stressSafe} = ${area} mm².`;
        } else if (i <= 14) {
          const load_kn = getVal(day, i, 18, 2);
          const dia_mm = getVal(day, i, 32, 2);
          const pitch_mm = getVal(day, i, 6, 1);
          const friction = 0.15;
          const tanL = pitch_mm / (Math.PI * dia_mm);
          const raiseT = Math.round((load_kn * 1000 * (dia_mm / 2) * (tanL + friction) / (1 - friction * tanL) / 1000) * 10) / 10;
          const opt1 = `${raiseT} N·m`;
          const opt2 = `${Math.round(raiseT * 1.5)} N·m`;
          const opt3 = `${Math.round(raiseT * 0.5)} N·m`;
          const opt4 = `150.0 N·m`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A single-thread power screw has a mean diameter dm = ${dia_mm} mm and pitch p = ${pitch_mm} mm. What is the torque in N·m required to hoist load W = ${load_kn} kN if f = ${friction}?`;
          hintsList = ["Torque raising T = W * (dm / 2) * [ (tanα + f) / (1 - f * tanα) ].", `tanα = p / (π * dm) = ${pitch_mm} / (π * ${dia_mm}) ≈ ${tanL.toFixed(4)}.`, `Combine terms & evaluate.`];
          explanationText = `Hoisting thread required torque evaluates to: T = ${raiseT} N·m.`;
        } else {
          const radLoad = getVal(day, i, 5.0, 0.5); // kN
          const capC = getVal(day, i, 35, 5); // kN catalog
          const speedFactor = getVal(day, i, 1500, 100); // RPM
          const l10mill = Math.pow(capC / radLoad, 3);
          const hours = Math.round((l10mill * 1e6) / (speedFactor * 60));
          const opt1 = `${hours} Hours`;
          const opt2 = `${Math.round(hours * 1.45)} Hours`;
          const opt3 = `${Math.round(hours * 0.55)} Hours`;
          const opt4 = `12000 Hours`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A deep groove ball bearing sustains radial force shaft load P = ${radLoad} kN at rotating speed N = ${speedFactor} RPM. Compute L10 service lifetime in Hours if dynamic core rating C = ${capC} kN.`;
          hintsList = ["Revolutions: L10 (millions) = (C/P)³.", `Operating hours matches: L10Hours = (L10 * 10⁶) / (Speed * 60).`, `Solve carefully.`];
          explanationText = `Rated L10 rolling mechanical bearing life: L10 = (${capC}/${radLoad})³ = ${l10mill.toFixed(1)} million revs, of ${hours} operating Hours.`;
        }
      } else if (moduleId === 'g3_at') {
        if (i <= 7) {
          const cop = getVal(day, i, 4.0, 0.2);
          const work = getVal(day, i, 2.5, 0.5); // kW
          const extraction = Math.round((cop * work) * 10) / 10;
          const opt1 = `${extraction} kW`;
          const opt2 = `${(extraction * 1.5).toFixed(1)} kW`;
          const opt3 = `${(extraction * 0.5).toFixed(1)} kW`;
          const opt4 = `15.0 kW`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A commercial fluid chiller compressor holds COP = ${cop}. If electrical work input is W = ${work} kW, compute extraction cooling rate in kW.`;
          hintsList = ["Extraction is: Q = COP * Work.", `Multiply: ${cop} * ${work} = ${extraction} kW.`];
          explanationText = `Chg extraction heat rate: Q = COP * W_in = ${cop} * ${work} = ${extraction} kW.`;
        } else if (i <= 14) {
          const clearP = getVal(day, i, 6.0, 1.0); // % clearance
          const compressRatio = 1 + (100 / clearP);
          const formatRatio = Math.round(compressRatio * 10) / 10;
          const opt1 = `CR: ${formatRatio}`;
          const opt2 = `CR: ${(formatRatio * 0.8).toFixed(1)}`;
          const opt3 = `CR: ${(formatRatio * 1.3).toFixed(1)}`;
          const opt4 = `CR: 15.0`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(`CR: ${formatRatio}`);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: An Otto cycle power combustion layout has cylinder clearance volume measuring ${clearP}% of swept displacement piston stroke volume. Solve for compression ratio.`;
          hintsList = ["Clearance relation matches: r = 1 + V_swept / V_clear = 1 + 100 / clearance_percent.", `Solve: 1 + 100 / ${clearP}`];
          explanationText = `Reciprocating cylinder compression ratio yields: r = 1 + 100/${clearP} = ${formatRatio}.`;
        } else {
          const loadKw = getVal(day, i, 500, 50);
          const lmtd = getVal(day, i, 40, 5);
          const U = 0.8; // heat coeff
          const area = Math.round((loadKw / (U * lmtd)) * 10) / 10;
          const opt1 = `${area} m²`;
          const opt2 = `${Math.round(area * 1.35)} m²`;
          const opt3 = `${Math.round(area * 0.65)} m²`;
          const opt4 = `20.0 m²`;
          optionsList = [opt1, opt2, opt3, opt4].sort();
          correctIdx = optionsList.indexOf(opt1);
          questionText = `[Day ${day} • ${difficultyLabel} • ${tierLabel}] ${categoryTitle}: A heat transmission unit discharges thermal energy Q = ${loadKw} kW at logarithmic mean dynamic temperature difference LMTD = ${lmtd}°C. Solve for required pipe surface area in m² if heat transmission is U = ${U} kW/(m²·K).`;
          hintsList = ["Use core heat equation bounds: Q = U * A * LMTD.", `Rearrange: Area A = Q / (U * LMTD).`, `Substitute.`];
          explanationText = `Exchanger required surface element area limits: A = Q / (U * LMTD) = ${loadKw} / [${U} * ${lmtd}] = ${area} m².`;
        }
      } else if (moduleId === 'g2_acs') {
        const designS = getVal(day, i, 5, 1);
        const frequency = getVal(day, i, 20, 2);
        const opt1 = `${designS} rad/s`;
        const opt2 = `${designS * 2} rad/s`;
        const opt3 = `1.2 rad/s`;
        const opt4 = `10.0 rad/s`;
        optionsList = [opt1, opt2, opt3, opt4].sort();
        correctIdx = optionsList.indexOf(opt1);
        questionText = `[Day ${day} • ${difficultyLabel} • MCQ] Control Core: A closed-loop feedback motor stabilizer has an active frequency bandwidth of ${frequency} Hz. Select structural crossover speed representing gain margin transition.`;
        hintsList = [`Refer to bandwidth margin: target ${designS} rad/s.`];
        explanationText = `Optimal feedback parameters require crossover frequency matching ${designS} rad/s.`;
      } else if (moduleId === 'g2_feg') {
        const nodes = getVal(day, i, 120, 10);
        const opt1 = `${nodes * 3} DOFs`;
        const opt2 = `${nodes * 2} DOFs`;
        const opt3 = `${nodes} DOFs`;
        const opt4 = `400 DOFs`;
        optionsList = [opt1, opt2, opt3, opt4].sort();
        correctIdx = optionsList.indexOf(opt1);
        questionText = `[Day ${day} • ${difficultyLabel} • MCQ] Truss FEA Grid: A spatial 3D structural steel mesh frame has exactly ${nodes} joint nodal connector points. Calculate total unrestrained Degrees of Freedom (DOF) assuming 3 translational coordinate vectors per Node.`;
        hintsList = ["Multiply number of nodes by spatial coordinates per node (3).", `Calculate: ${nodes} * 3.`];
        explanationText = `Total spatial degrees of freedom matches: DOFs = Nodes * 3 = ${nodes} * 3 = ${nodes * 3}.`;
      } else if (moduleId === 'g3_tvt') {
        const bladeVel = getVal(day, i, 250, 20); // m/s
        const whirlVel = getVal(day, i, 380, 30); // m/s
        const workPerKg = Math.round(bladeVel * whirlVel / 1000); // kJ/kg
        const opt1 = `${workPerKg} kJ/kg`;
        const opt2 = `${Math.round(workPerKg * 1.3)} kJ/kg`;
        const opt3 = `${Math.round(workPerKg * 0.7)} kJ/kg`;
        const opt4 = `50 kJ/kg`;
        optionsList = [opt1, opt2, opt3, opt4].sort();
        correctIdx = optionsList.indexOf(opt1);
        questionText = `[Day ${day} • ${difficultyLabel} • MCQ] Euler's Turbine Law: An axial steam turbine rotor stage spinner holds mean blade speed U = ${bladeVel} m/s. The entering jet fuel nozzle stream creates an inlet whirl velocity component Cw1 = ${whirlVel} m/s (Cw2 = 0). Resolve the specific Euler turbo work delivered in kJ/kg.`;
        hintsList = ["Apply Euler turbine work formula: W_spec = U * (Cw1 - Cw2) / 1000.", `Multiply blade speed ${bladeVel} by whirl velocity ${whirlVel} and divide by 1000.`];
        explanationText = `Specific Euler turbomachinery work: w = U * ΔCw = ${bladeVel} * ${whirlVel} / 1000 = ${workPerKg} kJ/kg.`;
      } else if (moduleId === 'g3_cgd') {
        const staticTemp = getVal(day, i, 280, 10); // K
        const mach = getVal(day, i, 1.5, 0.1);
        const stagTemp = Math.round(staticTemp * (1 + 0.2 * Math.pow(mach, 2))); // K
        const opt1 = `${stagTemp} K`;
        const opt2 = `${Math.round(stagTemp * 1.25)} K`;
        const opt3 = `${Math.round(stagTemp * 0.8)} K`;
        const opt4 = `298 K`;
        optionsList = [opt1, opt2, opt3, opt4].sort();
        correctIdx = optionsList.indexOf(opt1);
        questionText = `[Day ${day} • ${difficultyLabel} • MCQ] Compressible Gas stagnation: Fluid air flow expands in a converging nozzle to Mach M = ${mach} at local static gas temperature T = ${staticTemp} K. Evaluate stagnation temperature T₀ representing total enthalpy containment (γ = 1.4).`;
        hintsList = ["Use stagnation ratio formula: T0 = T * (1 + (γ-1)/2 * M²).", `For γ = 1.4, the coefficient is 1 + 0.2 * M².`, `Calculate: ${staticTemp} * (1 + 0.2 * ${mach}²).`];
        explanationText = `Stagnation temperature: T0 = T * (1 + 0.2 * M²) = ${staticTemp} * (1 + 0.2 * ${mach*mach}) = ${stagTemp} K.`;
      }

      list.push({
        id: i,
        subject,
        question: questionText,
        options: optionsList,
        hints: hintsList,
        correctAnswerIndex: correctIdx,
        explanation: explanationText
      });
    }
  }

  return list;
};
