import { MechQuestion, MechMCQQuestion } from '../data';

interface Scenario {
  q: string; // Question text with placeholder {0}, {1}, etc.
  p: [number, number][]; // Parameters configuration array [base, step]
  f: (...vals: number[]) => number; // Numeric solution formula
  u: string; // Metric unit label
  hs: string[]; // Dynamic hints templates
  decimals?: number; // Decimals for rounding. Defaults to 2
}

// Deterministic variable generator based on study day, question number, and real-world calendar day of today
const getVal = (day: number, questionId: number, base: number, step: number = 0.4): number => {
  // Absolute calendar days since epoch so values refresh uniquely every single calendar day
  const calendarDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  
  // High-entropy sinusoidal hashing to generate 30 distinct variations for each base parameter
  const sinVal = Math.sin(day * 17.513 + questionId * 29.137 + calendarDay * 41.611);
  const hash = (sinVal + 1) / 2; // Value between 0 and 1
  const multiplier = Math.floor(hash * 30);
  return Math.round((base + multiplier * step) * 100) / 100;
};

// ---------------- G1: FLUID MECHANICS & MACHINERY (g1_fmm / g3_fm) ---------------- //
const G1_FMM_SCENARIOS: Scenario[] = [
  {
    q: "A circular dynamic intake pipe of area A = {0} m² delivers fluid at a velocity of V = {1} m/s under steady flow. Calculate volumetric flow rate Q in m³/s.",
    p: [[0.05, 0.015], [1.2, 0.25]],
    f: (a, v) => a * v,
    u: "m3/s",
    hs: ["Apply the discharge formula: Q = A * V.", "Substitute area = {0} and velocity = {1}.", "Calculate {0} * {1} = {ans}."],
    decimals: 3
  },
  {
    q: "A pipe contracts from an inlet area A1 = {0} m² down to throat area A2 = {1} m². If fluid enters at speed V1 = {2} m/s, solve for throat velocity V2 in m/s assuming incompressible flow.",
    p: [[0.15, 0.02], [0.05, 0.005], [1.0, 0.2]],
    f: (a1, a2, v1) => v1 * (a1 / a2),
    u: "m/s",
    hs: ["Use the 1D Continuity relation: A1 * V1 = A2 * V2.", "Isolate velocity: V2 = V1 * (A1 / A2).", "Calculate: {2} * ({0} / {1}) = {ans}."]
  },
  {
    q: "A vertical rectangular gate of width w = {0} m and height h = {1} m is submerged in water with its centroid depth at h_bar = {2} m. Compute the hydrostatic pressure force acting on one face of the gate in kN (density = 1000 kg/m³, g = 9.81 m/s²).",
    p: [[1.5, 0.3], [2.0, 0.2], [1.0, 0.15]],
    f: (w, h, hb) => 1000 * 9.81 * hb * (w * h) / 1000,
    u: "kN",
    hs: ["Use the hydrostatic force formula: F = rho * g * h_bar * A.", "Area is width * height = {0} * {1} = {2} m².", "Substitute values to get exactly {ans} kN."]
  },
  {
    q: "A flat plate of area A = {0} m² slides over a fixed surface separated by a dynamic oil film of viscosity mu = {1} Pa·s and film thickness t = {2} m. Find the required shear force in Newtons to maintain velocity U = {3} m/s.",
    p: [[0.5, 0.1], [0.08, 0.02], [0.002, 0.0005], [2.0, 0.5]],
    f: (a, mu, t, u) => mu * a * u / t,
    u: "N",
    hs: ["Apply Newton's law of viscosity: Shear Force F = mu * A * (dU/dy).", "Shear gradient matches U/t = {3} / {2}.", "Solve: {1} * {0} * ({3} / {2}) = {ans}."]
  },
  {
    q: "A water pressure gauge reads exactly P = {0} kPa static pressure. Determine the equivalent hydrostatic static fluid column head (H) in meters (density = 1000 kg/m³, g = 9.81 m/s²).",
    p: [[147.15, 24.52]],
    f: (p) => p * 1000 / (1000 * 9.81),
    u: "m",
    hs: ["Hydrostatic pressure relates to head: P = rho * g * H.", "Rearrange: H = P / (rho * g).", "Solve: ({0} * 1000) / (1000 * 9.81) = {ans} m."]
  },
  {
    q: "In an engineering pipeline test, a conduit of length L = {0} m and diameter D = {1} m carries water at constant velocity V = {2} m/s. Calculate the friction head loss in meters using Darcy-Weisbach formula for friction factor f = {3} (g = 9.81 m/s²).",
    p: [[50.0, 10.0], [0.2, 0.05], [2.0, 0.4], [0.02, 0.002]],
    f: (l, d, v, f) => (4 * f * l * Math.pow(v, 2)) / (2 * 9.81 * d),
    u: "m",
    hs: ["Darcy's formula: h_f = 4 * f * L * V² / (2 * g * D).", "Numerator yields (4 * {3} * {0} * {2}²).", "Denominator represents (2 * 9.81 * {1}). Ratio is {ans}."]
  },
  {
    q: "A classic Venturi contraction pipeline has an inlet pipe diameter D1 = {0} mm and contracts to a throat diameter D2 = {1} mm. Get the area expansion acceleration ratio (A1 / A2).",
    p: [[120.0, 15.0], [60.0, 5.0]],
    f: (d1, d2) => Math.pow(d1 / d2, 2),
    u: "ratio",
    hs: ["Continuity area ratio is inversely proportional to square of diameter.", "Ratio = (D1 / D2)² = ({0} / {1})².", "Result is exactly {ans}."]
  },
  {
    q: "An industrial fluid boundary is compressed by pressure deltaP = {0} MPa, resulting in a volumetric compression strain (deltaV/V) of {1}. Compute the liquid Bulk Modulus of Elasticity (K) in MPa.",
    p: [[1.5, 0.3], [0.0006, 0.0001]],
    f: (dp, s) => dp / s,
    u: "MPa",
    hs: ["Bulk Modulus represents volumetric rigidity: K = deltaP / volumetricStrain.", "Divide pressure change by volume change fraction.", "Solve: {0} / {1} = {ans}."]
  },
  {
    q: "A floating ship model holds a second moment of area of waterplane I = {0} m⁴ and displaced cargo volume V = {1} m³. Calculate the BM distance (metacentric radius) in meters.",
    p: [[1200.0, 150.0], [400.0, 50.0]],
    f: (i, v) => i / v,
    u: "m",
    hs: ["Metacentric radius BM relates buoyancy centroid to density properties: BM = I / V.", "Substitute waterline inertia {0} m⁴ and displaced displacement volume {1} m³.", "Calculate {0} / {1} = {ans} m."]
  },
  {
    q: "Using the Chezy formula, determine flow velocity V in m/s of water in a municipal sewer with hydraulic mean depth m = {0} m and slope bed incline i = {1} if Chezy coefficient is C = {2}.",
    p: [[0.5, 0.1], [0.0004, 0.0001], [55.0, 5.0]],
    f: (m, i, c) => c * Math.sqrt(m * i),
    u: "m/s",
    hs: ["Chezy velocity equation: V = C * sqrt(m * i).", "Square root input is {0} * {1} = {2}.", "Calculate: {2} * sqrt({0} * {1}) = {ans}."]
  },
  {
    q: "Determine the boundary layer displacement thickness (delta*) in mm if the velocity profile is linear and nominal boundary layer thickness is {0} mm.",
    p: [[6.0, 1.0]],
    f: (d) => d / 2,
    u: "mm",
    hs: ["For a linear profile, displacement thickness is exactly half of the total boundary thickness.", "Formula: delta* = delta / 2.", "Solve: {0} / 2 = {ans}."]
  },
  {
    q: "Calculate the hydraulic efficiency in percent (%) of an impulse Pelton turbine wheel with bucket velocity ratio u/V1. Ideal jet velocity V1 = {0} m/s, runner bucket speed u = {1} m/s and bucket friction factor k = {2}.",
    p: [[30.0, 2.0], [14.0, 1.0], [0.9, 0.05]],
    f: (v1, u, k) => (2 * u * (v1 - u) * (1 + k)) / Math.pow(v1, 2) * 100,
    u: "%",
    hs: ["Hydraulic efficiency: eta_h = 2 * u * (V1 - u) * (1 + k) / V1².", "Input values: V1 = {0}, u = {1}, k = {2}.", "Solve and multiply by 100 to get percentage: {ans}%."]
  },
  {
    q: "A high-power Kaplan reaction turbine is running. Sensors register outer diameter Do = {0} m, hub diameter Di = {1} m, and axial velocity Vf = {2} m/s. Solve for the volumetric turbine discharge Q in m³/s.",
    p: [[3.2, 0.2], [1.6, 0.1], [4.5, 0.5]],
    f: (do_, di, vf) => (Math.PI / 4) * (Math.pow(do_, 2) - Math.pow(di, 2)) * vf,
    u: "m3/s",
    hs: ["Kaplan discharge equation: Q = (pi / 4) * (Do² - Di²) * Vf.", "Calculate flow passage area: (pi/4) * ({0}² - {1}²).", "Multiply by axial speed {2} to get exactly {ans}."]
  },
  {
    q: "A hydraulic ram pump lifts water under supply head h_s = {0} m with a supply flow rate of q = {1} m³/s to delivery elevation h_d = {2} m at delivery rate of Q = {3} m³/s. Determine D'Aubuisson pump efficiency in percent (%).",
    p: [[12.0, 2.0], [0.15, 0.02], [48.0, 4.0], [0.025, 0.005]],
    f: (hs, q, hd, qd) => (qd * hd) / (q * hs) * 100,
    u: "%",
    hs: ["D'Aubuisson efficiency relates delivery power output to supply power inputs.", "Formula: eta = (Q * h_d) / (q * h_s) * 100.", "Calculate: ({3} * {2}) / ({1} * {0}) * 100 = {ans}%."]
  },
  {
    q: "Water density = 1000 kg/m³. An hydraulic jet of area A = {0} m² flowing at V = {1} m/s strikes a static flat vertical baffle plate orthogonally. Calculate the dynamic impact force in Newtons.",
    p: [[0.015, 0.003], [15.0, 2.0]],
    f: (a, v) => 1000 * a * Math.pow(v, 2),
    u: "N",
    hs: ["Impact of jet force on flat plate: F = rho * A * V².", "Water density is 1000 kg/m³.", "Solve: 1000 * {0} * {1}² = {ans} Newtons."]
  },
  {
    q: "Evaluate the specific speed Ns of a turbine spinning at N = {0} RPM developing shaft power P = {1} kW under net head H = {2} m.",
    p: [[450.0, 50.0], [1200.0, 150.0], [45.0, 5.0]],
    f: (n, p, h) => n * Math.sqrt(p) / Math.pow(h, 1.25),
    u: "rpm-kw",
    hs: ["Turbine specific speed: Ns = N * sqrt(P) / H^(5/4).", "Numerator: {0} * sqrt({1}) = {0} * {2}.", "Denominator: {2}^(1.25). Ratio is {ans}."]
  },
  {
    q: "Find the kinematic viscosity in centistokes (cSt) (where 1 cSt = 10⁻6 m²/s) of a lubricant grease with dynamic viscosity mu = {0} Pa·s and density rho = {1} kg/m³.",
    p: [[0.24, 0.03], [880.0, 20.0]],
    f: (mu, rho) => (mu / rho) * 1000000,
    u: "cSt",
    hs: ["Kinematic viscosity is dynamic viscosity divided by density: nu = mu / rho.", "Convert m²/s to cSt by multiplying by 1,000,000.", "Solve: ({0} / {1}) * 1e6 = {ans} cSt."]
  },
  {
    q: "A booster pump supplies a manometric water column head h = {0} m at discharge Q = {1} m³/s with motor efficiency eta = {2}%. Compute the shaft input power in kW (density = 1000, g = 9.81).",
    p: [[22.0, 3.0], [0.04, 0.01], [78.0, 2.0]],
    f: (h, q, eff) => (1000 * 9.81 * q * h) / (eff / 100) / 1000,
    u: "kW",
    hs: ["Water power is P_w = rho * g * Q * H / 1000.", "Shaft Power = P_w / efficiency.", "Solve: (9.81 * {1} * {0}) / ({2}/100) = {ans} kW."]
  },
  {
    q: "A clean water pipe carries water at velocity V = {0} m/s. Calculate the local dynamic pressure head of the fluid in meters of water (g = 9.81 m/s²).",
    p: [[3.5, 0.5]],
    f: (v) => Math.pow(v, 2) / (2 * 9.81),
    u: "m",
    hs: ["Dynamic fluid head matches kinetic pressure: H_dyn = V² / (2 * g).", "Substitute velocity = {0} m/s and gravity = 9.81 m/s².", "Solve: {0}² / 19.62 = {ans}."]
  },
  {
    q: "Calculate capillary rise height of freshwater in a glass column of diameter d = {0} mm if surface tension coefficient is sigma = {1} N/m (density = 1000 kg/m³, g = 9.81 m/s², contact angle zero).",
    p: [[1.5, 0.3], [0.073, 0.002]],
    f: (d, s) => (4 * s) / (1000 * 9.81 * (d / 1000)) * 1000,
    u: "mm",
    hs: ["Capillary rise tube model: h = 4 * sigma * cos(theta) / (rho * g * d).", "Convert rise height output to mm.", "Solve: (4 * {1}) / (9810 * {0}/1000) * 1000 = {ans} mm."]
  },
  {
    q: "Centrifugal impeller tip peripheral speed u = {0} m/s. If exit guide angle whirl velocity fraction is {1}, compute exit whirl velocity component Cw2 in m/s.",
    p: [[32.0, 2.0], [0.85, 0.02]],
    f: (u, f) => u * f,
    u: "m/s",
    hs: ["Whirl component is the blade tip tangential multiplier: Cw2 = u * fraction.", "Calculate: {0} * {1} = {ans} m/s."]
  }
];

// ---------------- G1: DYNAMICS OF MACHINERY (g1_dom) ---------------- //
const G1_DOM_SCENARIOS: Scenario[] = [
  {
    q: "Identify the degree-of-freedom mechanical mobility (DOF) of a planar 4-bar linkage comprising N = {0} links and J = {1} simple revolute joints.",
    p: [[4.0, 0.0], [4.0, 0.0]],
    f: (n, j) => 3 * (n - 1) - 2 * j,
    u: "DOF",
    hs: ["Apply Grubler's Mobility: F = 3 * (N - 1) - 2 * J.", "Here, N = {0}, J = {1}.", "Calculate 3 * ({0} - 1) - 2 * {1} = {ans}."]
  },
  {
    q: "A Stephenson six-bar kinematic mechanism has links N = {0} and low-pair revolute joint count J = {1}. Evaluate the mobility total DOF.",
    p: [[6.0, 0.0], [7.0, 0.0]],
    f: (n, j) => 3 * (n - 1) - 2 * j,
    u: "DOF",
    hs: ["Use planar Grubler mobility constraint: F = 3 * (N - 1) - 2 * J.", "N = {0}, J = {1}.", "Solve: 3 * 5 - 2 * 7 = {ans}."]
  },
  {
    q: "A spinning point mass is constrained on a radial rotary axis rod of diameter radius R = {0} m. If it rotates at steady speed w = {1} rad/s, find absolute radial acceleration in m/s².",
    p: [[0.45, 0.05], [12.0, 2.0]],
    f: (r, w) => Math.pow(w, 2) * r,
    u: "m/s2",
    hs: ["Centripetal radial acceleration: a_n = w² * R.", "Substitute radius = {0} and rotational velocity = {1}.", "Calculate: {1}² * {0} = {ans}."]
  },
  {
    q: "An undamped single-degree mass spring elements consists of an block of mass m = {0} kg and support spring of stiffness k = {1} kN/m. Estimate circular natural frequency wn in rad/s.",
    p: [[8.0, 1.0], [2.5, 0.5]],
    f: (m, k) => Math.sqrt((k * 1000) / m),
    u: "rad/s",
    hs: ["Circular natural frequency model: wn = sqrt(k / m).", "Convert kN/m stiffness to standard N/m stiffness: {1} * 1000 N/m.", "Calculate: sqrt({1}*1000 / {0}) = {ans}."]
  },
  {
    q: "An industrial hot gas motor flywheel absorbs fluctuation kinetic energy loading of deltaE = {0} Joules. Spindle spins at mean speed w = {1} rad/s, within fluctuation limit Cs = {2}%. Calculate required mass moment of inertia I in kg·m².",
    p: [[3500.0, 500.0], [50.0, 5.0], [2.0, 0.2]],
    f: (de, w, cs) => de / (Math.pow(w, 2) * (cs / 100)),
    u: "kg-m2",
    hs: ["Energy fluctuation matches: deltaE = I * w² * Cs.", "Rearrange: I = deltaE / (w² * (Cs/100)).", "Calculate: {0} / ({1}² * {2}/100) = {ans}."]
  },
  {
    q: "Spindle speed governor tests show upper threshold velocity is N1 = {0} RPM and lower load speed limit is N2 = {1} RPM. Evaluate the relative governor sensitivity coefficient in %.",
    p: [[320.0, 10.0], [290.0, 5.0]],
    f: (n1, n2) => ((n1 - n2) / ((n1 + n2) / 2)) * 100,
    u: "%",
    hs: ["Governor speed sensitivity represents speed range over mean speed: Sens = (N1 - N2) / N_mean * 100.", "Mean speed = ({0} + {1}) / 2.", "Calculate: ({0} - {1}) / N_mean * 100 = {ans}%."]
  },
  {
    q: "An unbalanced machine spinner of rotational mass component m = {0} kg holds an eccentric layout offset of e = {1} mm. Get the bearer outward centrifugal force in Newtons if speed is N = {2} RPM.",
    p: [[2.5, 0.5], [40.0, 5.0], [1200.0, 100.0]],
    f: (m, e, n) => m * (e / 1000) * Math.pow((2 * Math.PI * n) / 60, 2),
    u: "N",
    hs: ["Centrifugal force formula: F = m * r * w².", "Convert eccentricity mm to meters: {1}/1000. Angular speed: w = 2*pi*N/60.", "Solve: {0} * ({1}/1000) * w² = {ans} Newtons."]
  },
  {
    q: "A heavy machinery rotor causes static deflection in support shaft of yst = {0} mm. Find natural transverse frequency of shaft vibration in Hertz (Hz) (g = 9.81 m/s²).",
    p: [[4.0, 0.5]],
    f: (yst) => (1 / (2 * Math.PI)) * Math.sqrt(9.81 / (yst / 1000)),
    u: "Hz",
    hs: ["Shaft critical transverse frequency: fn = (1 / 2pi) * sqrt(g / y_st).", "Convert static deflection mm to meters: {0}/1000.", "Solve: (1 / 6.283) * sqrt(9.81 / ({0}/1000)) = {ans} Hz."]
  },
  {
    q: "A ship engine gyroscopic wheel holds inertia I = {0} kg·m². Spindle spins at speed w = {1} rad/s when vehicle undergoes pitching rate wp = {2} rad/s. Calculate induced reaction torque gyroscope couple in N·m.",
    p: [[2.2, 0.3], [120.0, 10.0], [1.8, 0.2]],
    f: (i, w, wp) => i * w * wp,
    u: "N-m",
    hs: ["Gyroscopic couple formula: C = I * w * wp.", "Multiply mass moment scale {0}, shaft speed {1}, and precession rate {2}.", "Solve: {0} * {1} * {2} = {ans} N·m."]
  },
  {
    q: "Telemetry records stabilizing flywheel holds moment of inertia I = {0} kg·m² spinning at speed N = {1} RPM inside satellite core. Find active angular momentum in kg·m²/s.",
    p: [[0.5, 0.1], [2200.0, 200.0]],
    f: (i, n) => i * ((2 * Math.PI * n) / 60),
    u: "kg-m2/s",
    hs: ["Angular momentum formula: H = I * w.", "Convert RPM speed parameter to circular velocity rad/s: w = 2*pi*{1}/60.", "Solve: {0} * w = {ans}."]
  },
  {
    q: "A motor of mass m = {0} kg stands on isolator elements. Support spring combined stiffness is k = {1} kN/m. If damper specifying coefficient ratio ζ = {2}, get required damping constant C in N·s/m.",
    p: [[180.0, 20.0], [45.0, 5.0], [0.25, 0.05]],
    f: (m, k, z) => z * 2 * Math.sqrt(k * 1000 * m),
    u: "N-s/m",
    hs: ["Critical damping is Cc = 2 * sqrt(k * m). Required C = zeta * Cc.", "Dynamic stiffness k standard form is {1} * 1000 N/m.", "Calculate: {2} * 2 * sqrt({1}*1000 * {0}) = {ans}."]
  },
  {
    q: "Tangure fly-wheel holds inertia I = {0} kg·m². A tangential force induces drive torque T = {1} N·m at outer diameter edge. Solve for angular rotary acceleration in rad/s².",
    p: [[12.0, 2.0], [60.0, 10.0]],
    f: (i, t) => t / i,
    u: "rad/s2",
    hs: ["Rotational inertia dynamics: Torque = I * alpha.", "Isolate angular acceleration: alpha = T / I.", "Calculate: {1} / {0} = {ans}."]
  },
  {
    q: "Gear spur mechanism has tooth counts on driver gear T1 = {0} and follower gear T2 = {1}. If input velocity is N1 = {2} RPM, solve output speed N2 in RPM.",
    p: [[20.0, 2.0], [80.0, 10.0], [1500.0, 100.0]],
    f: (t1, t2, n1) => n1 * (t1 / t2),
    u: "RPM",
    hs: ["Spur gear velocity ratio: N1 * T1 = N2 * T2.", "Isolate output speed: N2 = N1 * (T1 / T2).", "Solve: {2} * ({0} / {1}) = {ans} RPM."]
  },
  {
    q: "A single plate friction clutch carries clamping compression force W = {0} N. If contact faces have mean friction radius R = {1} mm and friction coefficient is mu = {2}, calculate torque load limit in N·m assuming uniform wear.",
    p: [[1500.0, 100.0], [120.0, 10.0], [0.35, 0.05]],
    f: (w, r, mu) => mu * w * (r / 1000),
    u: "N-m",
    hs: ["Clutch torque capacity assumes wear bounds: T = mu * W * R.", "Convert mean surface radius mm to meters: {1}/1000.", "Solve: {2} * {0} * ({1}/1000) = {ans} N·m."]
  },
  {
    q: "A heavy material screw jack holds thread pitch angle alpha = {0}° and friction contact angle phi = {1}°. Calculate active mechanical lifting efficiency in percent (%).",
    p: [[14.0, 1.0], [16.0, 1.0]],
    f: (a, p) => (Math.tan(a * Math.PI / 180) / Math.tan((a + p) * Math.PI / 180)) * 100,
    u: "%",
    hs: ["Screw jack thread efficiency: eta = tan(alpha) / tan(alpha + phi) * 100.", "Input angle limits: alpha = {0}°, phi = {1}°.", "Calculate: tan({0}) / tan({0}+{1}) * 100 = {ans}%."]
  },
  {
    q: "A flat belt driver wrap path angle theta = {0} radians experiences coefficient mu = {1} friction limits. Determine maximum tension ratio (T1 / T2) without slipping.",
    p: [[3.14, 0.2], [0.3, 0.05]],
    f: (t, m) => Math.exp(m * t),
    u: "ratio",
    hs: ["Belt friction tension equation: T1 / T2 = exp(mu * theta).", "Parameters: wrap angle = {0}, friction = {1}.", "Solve: e^({1} * {0}) = {ans}."]
  },
  {
    q: "Calculate pitch center distance in mm of standard spur gears with module m = {0} mm if teeth counts are T1 = {1} and T2 = {2}.",
    p: [[4.0, 1.0], [24.0, 3.0], [72.0, 5.0]],
    f: (m, t1, t2) => (m * (t1 + t2)) / 2,
    u: "mm",
    hs: ["Pitch circle radius spur center distance: C = module * (T1 + T2) / 2.", "Substitute: module m = {0}, driver T1 = {1}, dynamic T2 = {2}.", "Calculate: {0} * ({1} + {2}) / 2 = {ans} mm."]
  },
  {
    q: "An engine piston assembly of mass m = {0} kg moves dynamically. Telemetry records slider velocity of v = {1} m/s. Find core kinetic energy in Joules.",
    p: [[1.5, 0.3], [12.0, 2.0]],
    f: (m, v) => 0.5 * m * Math.pow(v, 2),
    u: "J",
    hs: ["Kinetic energy formula: KE = 0.5 * m * V².", "Parameters: mass = {0} kg, velocity = {1} m/s.", "Solve: 0.5 * {0} * {1}² = {ans} Joules."]
  },
  {
    q: "A structural shaft experiences forced vibration from unbalance. Standard springs stiffness combined is k = {0} kN/m. Estimate resonant critical speed in rad/s if support load mass is m = {1} kg.",
    p: [[64.0, 5.0], [16.0, 2.0]],
    f: (k, m) => Math.sqrt((k * 1000) / m),
    u: "rad/s",
    hs: ["Critical whirling speed of shaft matches spring frequency: wc = sqrt(k / m).", "Convert k values kN/m to standard: {0} * 1000 N/m.", "Calculate: sqrt({0} * 1000 / {1}) = {ans}."]
  },
  {
    q: "Determine dynamic torsional spring stiffness kt in N·m/rad of hollow metal pipe shaft holding polar J = {0} cm⁴, dynamic shear G = {1} GPa, and length L = {2} m.",
    p: [[120.0, 10.0], [80.0, 5.0], [2.2, 0.2]],
    f: (j, g, l) => ((g * 1e9) * (j * 1e-8)) / l,
    u: "N-m/rad",
    hs: ["Torsional stiffness equation: kt = G * J / L.", "Convert values: J = {0} * 1e-8 m⁴, G = {1} * 1e9 N/m².", "Calculate: ({1}e9 * {0}e-8) / {2} = {ans}."]
  },
  {
    q: "A simple physics pendulum sweeps. Radial weight center holds inertia load inertia moment I = {0} kg·m² and support thread torsional k_t = {1} N·m/rad limits. Resolve periodic time of swing in seconds.",
    p: [[0.15, 0.03], [2.4, 0.3]],
    f: (i, kt) => 2 * Math.PI * Math.sqrt(i / kt),
    u: "s",
    hs: ["Torsional pendulum period: T = 2 * pi * sqrt(I / k_t).", "Substitute inertia = {0}, stiffness = {1}.", "Calculate: 6.283 * sqrt({0} / {1}) = {ans}."]
  }
];

// ---------------- G1: THERMODYNAMICS (g1_tof / g3_at) ---------------- //
const G1_TOF_SCENARIOS: Scenario[] = [
  {
    q: "Ideal Gas Law: An ideal gas sample at pressure P = {0} kPa has temperature T = {1} K and volume V = {2} m³. Calculate structural mass of gas sample in kg if gas constant is R = 0.287 kJ/(kg·K).",
    p: [[100.0, 10.0], [300.0, 20.0], [0.8, 0.05]],
    f: (p, t, v) => (p * v) / (0.287 * t),
    u: "kg",
    hs: ["Ideal Gas equation: P * V = m * R * T.", "Isolate mass: m = (P * V) / (R * T).", "Solve: ({0} * {2}) / (0.287 * {1}) = {ans} kg."]
  },
  {
    q: "An ideal gas system expands isothermally at temperature T doing boundary work. If expansion moves from origin V1 = {0} m³ to output V2 = {1} m³ under pressure P1 = {2} kPa, solve work completed in kJ.",
    p: [[0.5, 0.05], [1.5, 0.1], [150.0, 10.0]],
    f: (v1, v2, p1) => p1 * v1 * Math.log(v2 / v1),
    u: "kJ",
    hs: ["Isothermal gas boundary work: W = P1 * V1 * ln(V2/V1).", "Check parameters: P1 = {2} kPa, V1 = {0} m³.", "Calculate: {2} * {0} * ln({1} / {0}) = {ans} kJ."]
  },
  {
    q: "Reversible Carnot heat engine runs between heat reservoir Th = {0} K and cold cooler sink Tc = {1} K. Estimate analytical thermal efficiency in percent (%).",
    p: [[800.0, 50.0], [300.0, 10.0]],
    f: (th, tc) => (1 - tc / th) * 100,
    u: "%",
    hs: ["Carnot thermal efficiency is limit boundary: eta = (1 - T_c / T_h) * 100.", "Temperatures must be absolute: Tc = {1} K, Th = {0} K.", "Solve: (1 - {1} / {0}) * 100 = {ans}%."]
  },
  {
    q: "A steady state fluid turbine receives dynamic mass flow m = {0} kg/s. If steam boundary entering holds enthalpy h1 = {1} kJ/kg and exits at h2 = {2} kJ/kg with negligible heat losses, calculate shaft power output in kW.",
    p: [[5.0, 1.0], [3200.0, 100.0], [2400.0, 50.0]],
    f: (m, h1, h2) => m * (h1 - h2),
    u: "kW",
    hs: ["Steady flow turbine output converts enthalpy drop: Power = m * (h1 - h2).", "Enthalpy drops: {1} - {2} = {1-h2} kJ/kg.", "Multiply mass flow rate: {0} * ({1} - {2}) = {ans} kW."]
  },
  {
    q: "A system absorbs heat flow of Q = {0} kW isothermally at temperature limit T = {1} K. Calculate entropy rate change in kW/K.",
    p: [[450.0, 50.0], [373.0, 10.0]],
    f: (q, t) => q / t,
    u: "kW/K",
    hs: ["Entropy change during isothermal process: dS = Q / T.", "Parameters: Heat flow Q = {0} kW, Temp T = {1} K.", "Solve: {0} / {1} = {ans}."]
  },
  {
    q: "Determine dynamic Coefficient of Performance (COP) of reversible Carnot refrigerator running between cold expansion block Tc = {0} K and condenser ceiling Th = {1} K.",
    p: [[260.0, 10.0], [310.0, 10.0]],
    f: (tc, th) => tc / (th - tc),
    u: "COP",
    hs: ["Reversing Carnot cooler performance: COP_ref = T_c / (T_h - T_c).", "Ensure absolute values: Tc = {0} K, Th = {1} K.", "Solve: {0} / ({1} - {0}) = {ans}."]
  },
  {
    q: "An industrial piston air compressor expands gas polytropically. Initial volume V1 = {0} m³, pressure P1 = {1} kPa contracts to V2 = {2} m³, pressure P2 = {3} kPa. If index is n = 1.3, evaluate boundary work work in kJ.",
    p: [[0.8, 0.1], [100.0, 10.0], [0.2, 0.05], [350.0, 20.0]],
    f: (v1, p1, v2, p2) => (p1 * v1 - p2 * v2) / 0.3,
    u: "kJ",
    hs: ["Polytropic boundary work: W = (P1 * V1 - P2 * V2) / (n - 1).", "Index value n = 1.3, making denominator 0.3.", "Calculate: ({1} * {0} - {3} * {2}) / 0.3 = {ans} kJ."]
  },
  {
    q: "Calculate thermal efficiency margin in percent (%) of standard Otto air cycle holding volumetric compression ratio r = {0} if isentropic adiabatic index is gamma = 1.4.",
    p: [[8.0, 0.5]],
    f: (r) => (1 - 1 / Math.pow(r, 0.4)) * 100,
    u: "%",
    hs: ["Otto thermal cycle efficiency: eta = (1 - 1 / r^(gamma-1)) * 100.", "With gamma = 1.4, exponent matches 0.4.", "Calculate: (1 - 1 / {0}^0.4) * 100 = {ans}%."]
  },
  {
    q: "A high-pressure steam compressor holds total volume inside cylinder at BDC as V_total = {0} cc. Clearance volume at TDC is V_c = {1} cc. Calculate clearance percentage ratio (c) of cylinder.",
    p: [[500.0, 50.0], [50.0, 5.0]],
    f: (vt, vc) => (vc / (vt - vc)) * 100,
    u: "%",
    hs: ["Cylinder clearance ratio is: c = V_c / V_stroke.", "Stroke volume is total minus clearance: {0} - {1}.", "Solve: ({1} / ({0} - {1})) * 100 = {ans}%."]
  },
  {
    q: "A saturated steam water mixture separator column stores liquid mass fraction m_fluid = {0} kg and vapor gas mass m_steam = {1} kg. Evaluate wet steam quality dryness fraction (x).",
    p: [[2.0, 0.5], [8.0, 1.0]],
    f: (mf, mg) => mg / (mf + mg),
    u: "fraction",
    hs: ["Dryness steam fraction: x = m_vapor / (m_liquid + m_vapor).", "Parameters: liquid mf = {0}, vapor mg = {1}.", "Solve: {1} / ({0} + {1}) = {ans}."]
  },
  {
    q: "Under Diesel pressure limits, a standard engine gas volume contracts from maximum cylinder V1 = {0} cc to combustion throat volume V2 = {1} cc. Compute dynamic compression ratio (r).",
    p: [[750.0, 50.0], [45.0, 5.0]],
    f: (v1, v2) => v1 / v2,
    u: "ratio",
    hs: ["Engine cycle compression ratio: r = V1 / V2.", "Divide maximum BDC volume {0} by minimum TDC clearance {1}.", "Solve: {0} / {1} = {ans}."]
  },
  {
    q: "A closed reactor cylinder surrounds dynamic mass m = {0} kg of nitrogen gas. If constant volume heating raises temperature by dT = {1} K, compute thermal energy inputs in kJ (Cv = 0.743 kJ/(kg·K)).",
    p: [[2.5, 0.5], [40.0, 5.0]],
    f: (m, dt) => m * 0.743 * dt,
    u: "kJ",
    hs: ["Constant volume heat addition: Q = m * Cv * dT.", "Specific heat parameter Cv is 0.743.", "Calculate: {0} * 0.743 * {1} = {ans} kJ."]
  },
  {
    q: "Saturated steam wet expansion operates. If quality is x = {0} and constant spec volume of dry vapor is vg = {1} m³/kg, calculate specific volume of wet steam mixture in m³/kg.",
    p: [[0.85, 0.02], [0.24, 0.03]],
    f: (x, vg) => x * vg,
    u: "m3/kg",
    hs: ["Wet steam specific volume matches approx: v = x * vg.", "Quality x = {0}, dry volume vg = {1}.", "Calculate: {0} * {1} = {ans}."]
  },
  {
    q: "A gas stack runs heat recovery. Telemetry signals Exhaust Gas stream temp drop is dT = {0} K across recuperator ducts. If flow rate is m = {1} kg/s, calculate heat recaptured load in kW (Cp = 1.05 kJ/(kg·K)).",
    p: [[140.0, 15.0], [12.0, 2.0]],
    f: (dt, m) => m * 1.05 * dt,
    u: "kW",
    hs: ["Exhaust stack heat transmission rate: Q = m * Cp * dT.", "Specific heat Cp for dry gas matches 1.05.", "Calculate: {1} * 1.05 * {0} = {ans} kW."]
  },
  {
    q: "An aircraft closed gas turbine runs on Brayton cycle boundaries. System holds pressure ratio rp = {0} for standard specific heats (gamma = 1.4). Set theoretical gas power cycle performance efficiency in percent (%).",
    p: [[6.5, 0.5]],
    f: (rp) => (1 - 1 / Math.pow(rp, 0.2857)) * 100,
    u: "%",
    hs: ["Brayton thermal efficiency reads: eta = (1 - 1 / rp^((gamma-1)/gamma)) * 100.", "With gamma = 1.4, exponential fraction is 0.2857.", "Calculate: (1 - 1 / {0}^0.2857) * 100 = {ans}%."]
  },
  {
    q: "Thermal heat flow exchanges. Warm side fluid enters at T1 = {0}°C, exits at T2 = {1}°C. Reverse path cold coolant enters at t1 = {2}°C and exits at t2 = {3}°C. Find parallel flow temperature LMTD in °C.",
    p: [[320.0, 20.0], [180.0, 10.0], [40.0, 5.0], [90.0, 5.0]],
    f: (t1, t2, c1, c2) => {
      const dt1 = t1 - c1;
      const dt2 = t2 - c2;
      return (dt1 - dt2) / Math.log(dt1 / dt2);
    },
    u: "C",
    hs: ["LMTD is computed as (theta1 - theta2) / ln(theta1 / theta2).", "Theta1 (inlet delta) = {0} - {2} = {0-c1}.", "Theta2 (outlet delta) = {1} - {3} = {1-c2}. Calculate ratio."],
    decimals: 1
  },
  {
    q: "A wet steam line carries mixture with quality of x = {0}. If standard hf = {1} kJ/kg and boiler vaporization enthalpy is hfg = {2} kJ/kg, evaluate dynamic mix wet enthalpy in kJ/kg.",
    p: [[0.82, 0.02], [760.0, 40.0], [2010.0, 100.0]],
    f: (x, hf, hfg) => hf + x * hfg,
    u: "kJ/kg",
    hs: ["Wet steam enthalpy formulation: h = h_f + x * h_fg.", "Substitute limits: hf = {1}, x = {0}, hfg = {2}.", "Calculate: {1} + {0} * {2} = {ans}."]
  },
  {
    q: "A gas expands in a turbine. P1 = {0} kPa, V1 = {1} m³ goes to P2 = {2} kPa, V2 = {3} m³ under polytropic index n = {4}. Evaluate boundaries turbine dynamic work outputs in kJ.",
    p: [[600.0, 40.0], [0.15, 0.02], [120.0, 10.0], [0.55, 0.05], [1.32, 0.02]],
    f: (p1, v1, p2, v2, n) => (p1 * v1 - p2 * v2) / (n - 1),
    u: "kJ",
    hs: ["Isentropic work expansion matching: W = (P1 * V1 - P2 * V2) / (n - 1).", "Calculate numerator: {0} * {1} - {2} * {3}.", "Divide by index decrement = {4} - 1. Solve: {ans}."]
  },
  {
    q: "An municipal air gas processing compressor works under clearance ratio c = {0}% showing stage compression pressure ratio rp = {1}. Resolve air volumetric efficiency in % if index is n = 1.25.",
    p: [[6.0, 0.5], [4.5, 0.4]],
    f: (c, rp) => (1 - (c / 100) * (Math.pow(rp, 1 / 1.25) - 1)) * 100,
    u: "%",
    hs: ["Volumetric compressor efficiency: eta_v = 1 - c * (rp^(1/n) - 1).", "Input parameters: c = {0}%, rp = {1}, n = 1.25.", "Calculate and convert to percentage: {ans}%."]
  },
  {
    q: "Calculate Coefficient of Performance (COP) of Carnot heat pump working to maintain room warmth when hot limit Th = {0} K and outer environment Tc = {1} K.",
    p: [[300.0, 10.0], [260.0, 5.0]],
    f: (th, tc) => th / (th - tc),
    u: "COP",
    hs: ["Carnot thermal warming pump COP: COP_hp = T_h / (T_h - T_c).", "Hot absolute boundary Th = {0} K, cold sink is Tc = {1} K.", "Solve: {0} / ({0} - {1}) = {ans}."]
  },
  {
    q: "Industrial power cycle steam generator holds net specific mechanical turbine work output of W_net = {0} kJ/kg. Resolve specific steam consumption coefficient SSC in kg/(kW·h).",
    p: [[720.0, 40.0]],
    f: (wn) => 3600 / wn,
    u: "kg/kW-h",
    hs: ["Specific steam consumption formula: SSC = 3600 / W_net.", "Divide standard hour energy conversion 3600 by net cycle work {0}.", "Solve: 3600 / {0} = {ans}."]
  }
];

// ---------------- G1: MECHANICS OF MATERIALS (g1_mts / g3_som) ---------------- //
const G1_MTS_SCENARIOS: Scenario[] = [
  {
    q: "An structural tie-bar of cross area A = {0} mm² experiences standard axial pulling tension force P = {1} kN. Determine tensile normal stress inside bar in MPa.",
    p: [[200.0, 20.0], [40.0, 5.0]],
    f: (a, p) => (p * 1000) / a,
    u: "MPa",
    hs: ["Normal stress is axial force divided by cross-sectional area: sigma = P / A.", "Convert force kN to Newtons: {1} * 1000 N.", "Solve: ({1} * 1000) / {0} = {ans} MPa."]
  },
  {
    q: "A carbon steel structural rod bar of initial length L = {0} mm extends by exactly delta = {1} mm under tensile check test. Determine material engineering strain factor in thousandths (strain * 1000).",
    p: [[250.0, 15.0], [0.35, 0.05]],
    f: (l, d) => (d / l) * 1000,
    u: "thousandths",
    hs: ["Engineering normal strain is deflection over original length: strain = delta / L.", "Multiply by 1000 to express in thousandths as requested.", "Solve: ({1} / {0}) * 1000 = {ans}."]
  },
  {
    q: "A solid circular drive shaft of diameter d = {0} mm transmits torque under test. If dynamic torque loading reads T = {1} N·m, solve for peak fiber shear stress in MPa.",
    p: [[40.0, 5.0], [250.0, 30.0]],
    f: (d, t) => (16 * t * 1000) / (Math.PI * Math.pow(d, 3)),
    u: "MPa",
    hs: ["Peak surface shear stress on raw circular shaft: tau = 16 * T / (pi * d³).", "Convert torque format: T = {1} * 1000 N·mm.", "Solve: (16 * {1} * 1000) / (pi * {0}³) = {ans} MPa."]
  },
  {
    q: "A thin-walled boiler shell cylindrical cylinder vessel diameter is D = {0} mm and wall thickness is t = {1} mm. Compute internal hoop tensile stress in MPa if internal gauge pressure matches P = {2} MPa.",
    p: [[800.0, 50.0], [8.0, 1.0], [1.5, 0.2]],
    f: (d, t, p) => (p * d) / (2 * t),
    u: "MPa",
    hs: ["Cylinder hoop circumferential normal stress is: sigma_h = P * D / (2 * t).", "Inputs: pressure P = {2} MPa, diameter D = {0} mm, thick t = {1} mm.", "Solve: ({2} * {0}) / (2 * {1}) = {ans} MPa."]
  },
  {
    q: "Triaxial elastic strain tests run. A metallic block experiences normal stress sum (s1+s2+s3) = {0} MPa. Calculate total micro-volumetric strain (e_v * 10⁶) if E = {1} GPa and Poisson ratio is v = {2}.",
    p: [[300.0, 20.0], [200.0, 10.0], [0.3, 0.02]],
    f: (sum_, e, v) => (sum_ / (e * 1000)) * (1 - 2 * v) * 1000000,
    u: "microstrain",
    hs: ["Volumetric strain model: e_v = (s1 + s2 + s3) / E * (1 - 2 * v).", "Modulus E in MPa is {1} * 1000.", "Solve and scale by 1e6: e_v = ({0} / ({1}*1000)) * (1 - 2 * {2}) * 1e6 = {ans}."]
  },
  {
    q: "A modular steel structural column bar of length L = {0} m and sectional area A = {1} mm² elongates under tension load P = {2} kN. Find dynamic extension deflection in mm if E = 200 GPa.",
    p: [[2.2, 0.2], [150.0, 10.0], [45.0, 5.0]],
    f: (l, a, p) => (p * 1000 * (l * 1000)) / (a * 200000),
    u: "mm",
    hs: ["Hooke's extension distance matches: delta = P * L / (A * E).", "Convert inputs: length L = {0}e3 mm, load P = {2}e3 N, E = 200000 MPa.", "Solve: ({2}*1000 * {0}*1000) / ({1} * 200000) = {ans} mm."]
  },
  {
    q: "A structural steel rod stores strain energy under tension stress sigma = {0} MPa. If total material volume is V = {1} cm³, compute stored strain energy in Joules (E = 200 GPa).",
    p: [[150.0, 25.0], [500.0, 50.0]],
    f: (s, v) => (Math.pow(s, 2) / (2 * 200000)) * (v * 1000) / 1000,
    u: "J",
    hs: ["Elastic resilience strain energy: U = (sigma² / 2E) * Volume.", "Convert parameters: E = 2e11 N/m², Volume = {1} * 1e-6 m³.", "Calculate: ({0}e6)² / (4e11) * ({1}*1e-6) = {ans} J."]
  },
  {
    q: "In an structural materials lab, an block experiences dynamic shear stress of tau = {0} MPa. If mechanical shear modulus is G = {1} GPa, resolve shear angles strain in thousandths of radian (strain * 1000).",
    p: [[60.0, 10.0], [80.0, 5.0]],
    f: (t, g) => (t / (g * 1000)) * 1000,
    u: "thousandths",
    hs: ["Shear strain matches: gamma = tau / G.", "Convert shear G GPa to MPa: {1} * 1000.", "Multiply dynamic result by 1000: ({0} / {1}000) * 1000 = {ans}."]
  },
  {
    q: "A rectangular structural span timber beam of dimensions (width b = {0} mm, height h = {1} mm) handles bending moment M = {2} kN·m. Compute peak outer normal fiber stress in MPa.",
    p: [[100.0, 10.0], [150.0, 15.0], [15.0, 2.0]],
    f: (b, h, m) => (m * 1e6 * (h / 2)) / ((b * Math.pow(h, 3)) / 12),
    u: "MPa",
    hs: ["Bending stress is M * y / I. For rectangle, Section Modulus is Z = b * h² / 6.", "Calculate section property: Z = {0} * {1}² / 6 = {ans_z} mm³.", "Solve: ({2} * 1e6) / Z = {ans} MPa."]
  },
  {
    q: "Calculate sectional modulus (Z) in cm³ of structural bar of rectangular cross section profile with width b = {0} cm and height h = {1} cm.",
    p: [[6.0, 1.0], [12.0, 2.0]],
    f: (b, h) => (b * Math.pow(h, 2)) / 6,
    u: "cm3",
    hs: ["Section modulus of rectangular section is: Z = b * h² / 6.", "Parameters wide b = {0} cm, tall h = {1} cm.", "Solve: {0} * {1}² / 6 = {ans} cm³."]
  },
  {
    q: "Evaluate column radius of gyration (k) in mm of circular structural steel rod of diameter d = {0} mm.",
    p: [[80.0, 5.0]],
    f: (d) => d / 4,
    u: "mm",
    hs: ["Radius of gyration for section is k = sqrt(I / A).", "For circular cross profile, this reduces to exactly diameter / 4.", "Solve: {0} / 4 = {ans}."]
  },
  {
    q: "A metallic rod of length L is locked at both end boundaries. Thermal sensor logs temperature elevation of dT = {0} K. Calculate induced thermal compression stress in MPa if E = 200 GPa and coefficient alpha = {1} x 10⁻⁵ /K.",
    p: [[50.0, 5.0], [1.2, 0.1]],
    f: (t, a) => 200000 * (a * 1e-5) * t,
    u: "MPa",
    hs: ["Induced thermal stress in constraints is: sigma = E * alpha * dT.", "Parameters: dT = {0}, E = 2e5 MPa, alpha = {1}e-5.", "Solve: 2e5 * ({1}*1e-5) * {0} = {ans} MPa."]
  },
  {
    q: "A cantilever steel channel span beam reaches length L = {0} m experiencing point weight F = {1} kN at free tip. Compute maximum elastic tip deflection deflection in mm if EI = {2} kN·m².",
    p: [[2.0, 0.2], [6.0, 1.0], [1200.0, 100.0]],
    f: (l, f, ei) => (f * Math.pow(l, 3)) / (3 * ei) * 1000,
    u: "mm",
    hs: ["Cantilever end point load deflection: delta = P * L³ / (3 * EI).", "Parameters: P = {1} kN, L = {0} m, EI = {2} kN·m².", "Calculate: ({1} * {0}³) / (3 * {2}) * 1000 = {ans} mm."]
  },
  {
    q: "A shear web bar is subjected to shear force V = {0} kN. If area inertia property is I = 2000 cm⁴ and first area moment is Q = 150 cm³ with width t = 10 mm, find local web shear stress in MPa.",
    p: [[50.0, 5.0]],
    f: (v) => (v * 1000 * (150 * 1e-6)) / ((2000 * 1e-8) * 0.01) / 1000000,
    u: "MPa",
    hs: ["Apply structural shear formula: tau = V * Q / (I * t).", "Convert metrics safely to standard meters or matching MPa bounds.", "Solve: ({0} * 1e3 * 150e-6) / (2000e-8 * 0.01) Pa = {ans} MPa."]
  },
  {
    q: "Mohr circular analysis: A plane stress element experiences tensile stress sigma_x = {0} MPa and shear tau_xy = {1} MPa (sigma_y = 0). Choose maximum shear stress in MPa.",
    p: [[80.0, 10.0], [30.0, 5.0]],
    f: (sx, txy) => Math.sqrt(Math.pow(sx / 2, 2) + Math.pow(txy, 2)),
    u: "MPa",
    hs: ["Maximum shear matches radius of Mohr's circle: tau_max = sqrt(((sigma_x - sigma_y)/2)² + tau_xy²).", "Substitute: (( {0} - 0 ) / 2)² = {0/2}².", "Calculate root of ({s_half}² + {1}²) = {ans}."]
  },
  {
    q: "A plane element undergoes biaxial loading sigma_x = {0} MPa and sigma_y = {1} MPa (tau_xy = 0). Determine Mohr circle centroid location on normal stress coordinate axis in MPa.",
    p: [[140.0, 15.0], [40.0, 5.0]],
    f: (sx, sy) => (sx + sy) / 2,
    u: "MPa",
    hs: ["Centroid of Mohr circle coordinates: C_avg = (sigma_x + sigma_y) / 2.", "Average bounds: ({0} + {1}) / 2.", "Result is exactly {ans}."]
  },
  {
    q: "A cylindrical steel shaft is parsed. Outer diameter reaches Do = {0} mm and inner wall core holds Di = {1} mm. Get shaft cross area moment J_polar in cm⁴ (convert from mm⁴).",
    p: [[100.0, 5.0], [60.0, 5.0]],
    f: (do_, di) => (Math.PI / 32) * (Math.pow(do_, 4) - Math.pow(di, 4)) / 10000,
    u: "cm4",
    hs: ["Hollow circular polar moment inertia is: J = pi/32 * (Do⁴ - Di⁴) mm⁴.", "Convert calculated J mm⁴ to cm⁴ by dividing by 10000.", "Solve: (pi/32 * ({0}⁴ - {1}⁴)) / 1e4 = {ans}."]
  },
  {
    q: "A column strut bar of Effective Length L_eff = {0} m is pinned at both end boundaries. Elastic modulus is E = 200 GPa and area moment of inertia is I = {1} cm⁴. Find Euler buckling critical load in kN.",
    p: [[3.0, 0.2], [80.0, 10.0]],
    f: (l, i) => (Math.PI * Math.PI * 200e9 * (i * 1e-8)) / Math.pow(l, 2) / 1000,
    u: "kN",
    hs: ["Euler pin-pin column buckling threshold: P_cr = pi² * E * I / L².", "Ensure units: E = 2e8 kN/m², I = {1} * 1e-8 m⁴, L = {0} m.", "Solve: (pi² * 2e8 * {1}e-8) / {0}² = {ans} kN."]
  },
  {
    q: "A simply-supported beam spans length L = {0} m. Standard sensors detect a concentrated point load P = {1} kN at center midpoint. Find center deflection in mm if EI = {2} kN·m².",
    p: [[4.0, 0.4], [12.0, 2.0], [3200.0, 200.0]],
    f: (l, p, ei) => (p * Math.pow(l, 3)) / (48 * ei) * 1000,
    u: "mm",
    hs: ["Bending deflection at midpoints is: delta = P * L³ / (48 * EI).", "Parameters: P = {1} kN, L = {0} m, EI = {2} kN·m².", "Calculate: ({1} * {0}³) / (48 * {2}) * 1000 = {ans} mm."]
  },
  {
    q: "A helical round coil spring holds spring diameter coil mean D = {0} mm and wire diameter d = {1} mm carrying compression load P = {2} N. Solve for spring deflection in mm if coil counts n = {3} (G = 80 GPa).",
    p: [[80.0, 5.0], [8.0, 1.0], [400.0, 40.0], [10.0, 1.0]],
    f: (d_c, d_w, p, n) => (8 * p * Math.pow(d_c, 3) * n) / ((80 * 1e9 / 1e6) * Math.pow(d_w, 4)),
    u: "mm",
    hs: ["Coil spring deflection rule: delta = 8 * P * D³ * n / (G * d⁴).", "Shear modulus standard G is 80000 MPa.", "Solve: (8 * {2} * {0}³ * {3}) / (80000 * {1}⁴) = {ans} mm."]
  },
  {
    q: "Determine column slenderness ratio lambda (dimensionless) of structural column with effective height H = {0} m and radius gyration parameter k = {1} mm.",
    p: [[2.4, 0.2], [16.0, 1.5]],
    f: (h, k) => (h * 1000) / k,
    u: "lambda",
    hs: ["Strut column slenderness ratio matches: lambda = Leff / radius_gyration.", "Convert effective height scale to mm: {0} * 1000.", "Solve: ({0} * 1000) / {1} = {ans}."]
  }
];

// Combine other modules configs dynamically using lightweight arrays or functions
const GET_SCENARIOS_FOR_MODULE = (moduleId: string): Scenario[] => {
  switch (moduleId) {
    case 'g1_fmm':
    case 'g3_fm':
      return G1_FMM_SCENARIOS;
    case 'g1_dom':
      return G1_DOM_SCENARIOS;
    case 'g1_tof':
    case 'g3_at':
    case 'g2_atst':
      return G1_TOF_SCENARIOS;
    case 'g1_mts':
    case 'g3_som':
    case 'g2_amsm':
      return G1_MTS_SCENARIOS;
      
    // ---------------- G2: AUTOMATIC CONTROL SYSTEMS (g2_acs) ---------------- //
    case 'g2_acs':
      return Array.from({ length: 21 }, (_, index) => {
        const id = index + 1;
        return {
          q: `Control System block dynamic check T${id}: Bandwidth frequency is {0} Hz. Crossover speed margin under dynamic feedback yields factor multiplier crossover limit in rad/s if frequency is paired with factor {1}.`,
          p: [[20.0, 2.0], [5.0, 1.0]],
          f: (f, fact) => fact,
          u: "rad/s",
          hs: ["Crossover performance parameter is directly governed by factor.", "Look at parameter 1: {1}.", "Target is exactly {ans}."],
          decimals: 1
        };
      });
      
    // ---------------- G2: FINITE ELEMENT GRID FORMULATIONS (g2_feg) ---------------- //
    case 'g2_feg':
      return Array.from({ length: 21 }, (_, index) => {
        const id = index + 1;
        return {
          q: `Spatial Truss FEA computational grid T${id}: Structural steel joint nodes count is {0} connectors. Assuming 3 unrestrained coordinate degrees per Node, determine overall spatial Degrees of Freedom (DOF).`,
          p: [[100.0 + index * 5, 5.0]],
          f: (nodes) => nodes * 3,
          u: "DOFs",
          hs: ["Finite element DOF matches: Nodes * coord_degrees.", "Multiplier coordinate dimensions are spatial (3).", "Solve: {0} * 3 = {ans}."]
        };
      });

    // ---------------- G3: DESIGN OF MACHINE ELEMENTS (g3_dme) ---------------- //
    case 'g3_dme':
      return Array.from({ length: 21 }, (_, index) => {
        const id = index + 1;
        return {
          q: `DME Key Shaft layout constraint T${id}: Standard ball bearing operates. If equivalent dynamic load capacity goes under force multiplier factor of exactly {0}, bearing rated rating life (L10) alters by factor (inverse of cube).`,
          p: [[2.0, 0.4]],
          f: (fac) => Math.round((1 / Math.pow(fac, 3)) * 1000) / 1000,
          u: "life-multiplier",
          hs: ["Rated life equation ball bearings is L10 = (C/P)³.", "Load increases by factor: {0}.", "Factor is 1 / {0}³ = {ans}."]
        };
      });

    // ---------------- G3: TURBOMACHINERY VELOCITY TRIANGLES (g3_tvt) ---------------- //
    case 'g3_tvt':
      return Array.from({ length: 21 }, (_, index) => {
        const id = index + 1;
        return {
          q: `Turbomachinery speed stage T${id}: Rotor blades peripheral velocity is U = {0} m/s and fluid inlet whirl component is Cw1 = {1} m/s (Cw2 = 0). Find Euler turbo specific work delivery in kJ/kg.`,
          p: [[240.0 + index * 5, 10.0], [350.0 + index * 10, 20.0]],
          f: (u, cw1) => (u * cw1) / 1000,
          u: "kJ/kg",
          hs: ["Euler's turbine work law: w = U * deltaCw / 1000.", "Numerator product: {0} * {1}.", "Divide product by 1000 to get kJ/kg: {ans}."],
          decimals: 1
        };
      });

    // ---------------- G3: COMPRESSIBLE GAS DYNAMICS (g3_cgd) ---------------- //
    case 'g3_cgd':
      return Array.from({ length: 21 }, (_, index) => {
        const id = index + 1;
        return {
          q: `Gas expansion nozzle stagnation T${id}: Air expansion holds Mach M = {0} at static temperature T = {1} K. Compute stagnation total temperature T₀ in K representing total energy bounds (gamma = 1.4).`,
          p: [[1.2 + index * 0.05, 0.05], [260.0 + index, 10.0]],
          f: (mach, temp) => temp * (1 + 0.2 * Math.pow(mach, 2)),
          u: "K",
          hs: ["Stagnation temperature expansion matches: T0 = T * (1 + (gamma-1)/2 * M²).", "With specific heats gamma = 1.4, coefficient multiplier is 0.2.", "Solve: {1} * (1 + 0.2 * {0}²) = {ans} K."]
        };
      });

    default:
      return G1_FMM_SCENARIOS;
  }
};

// Main generator routing handler returning 21 unique problems per syllabus specifications
export const getQuestionsForModule = (moduleId: string, elapsedDays: number): any[] => {
  const day = Math.max(1, elapsedDays);
  const activeWeek = Math.min(3, Math.ceil(day / 7));
  const difficultyLabel = activeWeek === 1 ? 'Beginner' : activeWeek === 2 ? 'Intermediate' : 'Advanced';

  let subject = 'Mechanical Engineering Science';
  if (['g1_fmm', 'g3_fm'].includes(moduleId)) {
    subject = 'Fluid Mechanics & Machinery';
  } else if (moduleId === 'g1_dom') {
    subject = 'Dynamics of Machinery (DOM)';
  } else if (moduleId === 'g1_tof' || moduleId === 'g3_at' || moduleId === 'g2_atst') {
    subject = 'Applied Thermodynamics & Systems';
  } else if (moduleId === 'g1_mts' || moduleId === 'g3_som' || moduleId === 'g2_amsm') {
    subject = 'Strength of Materials & Structures';
  } else if (moduleId === 'g2_acs') {
    subject = 'Automatic Control Systems';
  } else if (moduleId === 'g2_feg') {
    subject = 'Finite Element Grid Formulations';
  } else if (moduleId === 'g3_dme') {
    subject = 'Design of Machine Elements';
  } else if (moduleId === 'g3_tvt') {
    subject = 'Turbomachinery Velocity Triangles';
  } else if (moduleId === 'g3_cgd') {
    subject = 'Compressible Gas Dynamics';
  }

  const isMCQ = !['g1_fmm', 'g1_dom', 'g1_tof', 'g1_mts'].includes(moduleId);
  const scList = GET_SCENARIOS_FOR_MODULE(moduleId);
  const list: any[] = [];
  const calendarDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));

  for (let i = 1; i <= 21; i++) {
    // Select the unique scenario template relative to calendar dates so the entire template rotates daily!
    const sc = scList[(i - 1 + calendarDay) % scList.length];
    
    // Format and generate the full problem structures
    const questionObj = generateQuestionFromScenario(moduleId, subject, sc, day, i, isMCQ, difficultyLabel);
    list.push(questionObj);
  }

  return list;
};

// Dynamic mapping handler parsing scenarios into physical coordinate parameters
const generateQuestionFromScenario = (
  moduleId: string, 
  subject: string, 
  sc: Scenario, 
  day: number, 
  i: number, 
  isMCQ: boolean,
  difficultyLabel: string
) => {
  const tierLabel = i <= 7 ? 'Tier 01 // Basics' : i <= 14 ? 'Tier 02 // Syllabus-Oriented' : 'Tier 03 // Applications';
  const categoryTitle = i <= 7 ? 'Fundamentals & Core Theory' : i <= 14 ? 'Standard Exam Formulation' : 'Applied Industrial Case Challenge';

  // 1. Compute dynamic arguments
  const params = sc.p.map((pDef) => getVal(day, i, pDef[0], pDef[1]));
  
  // 2. Solve mathematical formula
  const ansRaw = sc.f(...params);
  const decimals = sc.decimals !== undefined ? sc.decimals : 2;
  const ans = Math.round(ansRaw * Math.pow(10, decimals)) / Math.pow(10, decimals);
  
  // 3. Format dynamic question templates
  let qText = sc.q;
  params.forEach((pVal, idx) => {
    qText = qText.replace(new RegExp(`\\{${idx}\\}`, 'g'), String(pVal));
  });
  qText = `[${tierLabel}] ${categoryTitle}: ${qText}`;
  
  // 4. Format progressive Socratic hint elements
  const hintsList = sc.hs.map((hTemp) => {
    let formatted = hTemp;
    params.forEach((pVal, idx) => {
      formatted = formatted.replace(new RegExp(`\\{${idx}\\}`, 'g'), String(pVal));
    });
    formatted = formatted.replace(/\{ans\}/g, String(ans));
    return formatted;
  });
  
  // 5. Build concept step explanations
  let explanationText = `${categoryTitle} Validation: `;
  params.forEach((v, idx) => { 
    explanationText += `Arg[${idx}] = ${v}; `; 
  });
  explanationText += `Result calculation evaluates to precisely ${ans} [${sc.u}].`;

  if (!isMCQ) {
    // Subjective Numeric Inputs (Grade 1)
    return {
      id: i,
      subject,
      question: qText,
      hints: hintsList,
      correctAnswer: String(ans),
      explanation: explanationText
    };
  } else {
    // Multiple Choice Inputs (Grade 2 & 3)
    const opt1 = `${ans} ${sc.u}`;
    const opt2 = `${Math.round((ans * 1.5 + 1.25) * 100) / 100} ${sc.u}`;
    const opt3 = `${Math.round((ans * 0.5) * 100) / 100} ${sc.u}`;
    const opt4 = `${Math.round((ans + (ans !== 0 ? ans * 0.35 : 15)) * 100) / 100} ${sc.u}`;
    
    // Deterministically rotate the correct answer index using calendarDay so even the correct option shifts daily!
    const calendarDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    const correctIdx = (i + 1 + calendarDay) % 4; // Vary indices beautifully as B, C, D, A, etc.
    const optionsList = new Array(4);
    optionsList[correctIdx] = opt1;
    
    const distractionOpts = [opt2, opt3, opt4];
    let distractionIdx = 0;
    for (let oIdx = 0; oIdx < 4; oIdx++) {
      if (oIdx !== correctIdx) {
        optionsList[oIdx] = distractionOpts[distractionIdx++];
      }
    }
    
    return {
      id: i,
      subject,
      question: qText,
      options: optionsList,
      hints: hintsList,
      correctAnswerIndex: correctIdx,
      explanation: explanationText
    };
  }
};
