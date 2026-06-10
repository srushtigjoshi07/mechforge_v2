import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Activity, 
  Layers, 
  RotateCw, 
  Sliders, 
  Eye, 
  Zap, 
  Compass, 
  Info, 
  Check, 
  X,
  Gauge,
  Sparkles as SparklesIcon
} from 'lucide-react';
import QuickQuizModal from './QuickQuizModal';

interface MatrixExplorersProps {
  activeId: "CAD" | "FEA" | "CFD" | "SRE" | "IoT" | null;
  onClose: () => void;
  onIncrementScore: (points: number) => void;
}

export default function MatrixExplorers({ activeId, onClose, onIncrementScore }: MatrixExplorersProps) {
  if (!activeId) return null;

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // State states for various simulator modules
  // CAD state
  const [crankLength, setCrankLength] = useState<number>(60);
  const [conRodLength, setConRodLength] = useState<number>(140);
  const [crankSpeed, setCrankSpeed] = useState<number>(30); // scale speed
  const [crankAngle, setCrankAngle] = useState<number>(0);

  // FEA State
  const [loadForce, setLoadForce] = useState<number>(500); // Newtons
  const [beamMaterial, setBeamMaterial] = useState<"structural-steel" | "6061-aluminum" | "carbon-fiber">("structural-steel");
  const [selectedNodeId, setSelectedNodeId] = useState<number>(3);

  // CFD State
  const [velocity, setVelocity] = useState<number>(25); // m/s
  const [angleAttack, setAngleAttack] = useState<number>(5); // degrees
  const [fluidDensity, setFluidDensity] = useState<number>(1.225); // air at sea level

  // SRE State
  const [sreCompletedUnits, setSreCompletedUnits] = useState<string[]>(["kinematics-01"]);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [sreQuizAnswered, setSreQuizAnswered] = useState<boolean>(false);
  const [sreCorrect, setSreCorrect] = useState<boolean | null>(null);

  // IoT State
  const [sensorFrequency, setSensorFrequency] = useState<number>(5); // Hz
  const [dampingRatio, setDampingRatio] = useState<number>(0.25); // underdamped
  const [liveLog, setLiveLog] = useState<string[]>(["[IOT GATEWAY]: Initiating telemetry co-processor..."]);

  // Crank math loop for CAD
  useEffect(() => {
    if (activeId !== 'CAD') return;
    let animId: number;
    const tick = () => {
      setCrankAngle(prev => (prev + crankSpeed * 0.1) % 360);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [activeId, crankSpeed]);

  // Append logs for IoT
  useEffect(() => {
    if (activeId !== 'IoT') return;
    const interval = setInterval(() => {
      const timestamps = new Date().toLocaleTimeString();
      const amplitudeVal = (Math.sin(Date.now() * 0.005) * Math.exp(-dampingRatio * 2 * 0.1)).toFixed(3);
      const newLogs = [
        `[${timestamps}] AMPLITUDE ACCELERATION: ${amplitudeVal} G`,
        `[${timestamps}] STREAMING RATE: ${sensorFrequency} Hz · STATUS: OPTIMAL`,
        `[${timestamps}] TEMPERATURE REGISTER: ${(42.5 + Math.random() * 2.1).toFixed(2)} °C`
      ];
      setLiveLog(prev => [newLogs[Math.floor(Math.random() * newLogs.length)], ...prev].slice(0, 8));
    }, 1800);
    return () => clearInterval(interval);
  }, [activeId, sensorFrequency, dampingRatio]);

  // Math variables for FEA
  const getElasticModulus = () => {
    switch (beamMaterial) {
      case "structural-steel": return 200; // GPa
      case "6061-aluminum": return 70; // GPa
      case "carbon-fiber": return 150; // GPa
    }
  };

  const calculateMaxDeflection = () => {
    const E = getElasticModulus() * 1e9; // Pa
    const I = (0.05 * Math.pow(0.1, 3)) / 12; // Moment of inertia of rectangle
    const L = 1.8; // beam length in m
    // Deflection = (F * L^3) / (3 * E * I)
    const def = (loadForce * Math.pow(L, 3)) / (3 * E * I);
    return (def * 1000).toFixed(3); // in mm
  };

  const calculatePeakStress = () => {
    // Stress = M * y / I where M = F * L
    const L = 1.8;
    const M = loadForce * L;
    const y = 0.05; // half height of 100mm beam
    const I = (0.05 * Math.pow(0.1, 3)) / 12;
    const stress = (M * y) / I;
    return (stress / 1e6).toFixed(2); // in MPa
  };

  return (
    <div className="mt-12 bg-[#0d0d0d] border border-white/10 rounded-xl p-6 md:p-10 relative overflow-hidden shadow-2xl animate-fadeIn">
      {/* Decorative Red Laser Boundary Glow */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-suzuki-red via-[#e2231a] to-transparent animate-pulse" />
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={onClose}
          className="p-2 bg-neutral-900 border border-white/10 hover:bg-suzuki-red hover:text-white hover:border-suzuki-red transition-all duration-300 rounded-full text-zinc-400 cursor-pointer"
          title="Close Virtual Matrix Workspace"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Side: Dynamic Workspace Control & Information Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="font-condensed text-xs text-suzuki-red tracking-[0.3em] uppercase font-black flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-[#e2231a] rounded-full animate-ping"></span>
              Active Educational Sandbox
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-widest uppercase">
              {activeId === "CAD" && "Computer-Aided Design Simulator"}
              {activeId === "FEA" && "Finite Element Analysis Simulator"}
              {activeId === "CFD" && "Navier-Stokes Fluid Wind-Tunnel"}
              {activeId === "SRE" && "Independent Study Progress Engine"}
              {activeId === "IoT" && "Sensor Telemetry Diagnostic Sandbox"}
            </h3>
            <p className="text-zinc-400 text-base md:text-lg mt-3 font-sans leading-relaxed">
              {activeId === "CAD" && "Explore parametric equations and kinematic linkage vectors by modifying physical bar dimensions dynamically."}
              {activeId === "FEA" && "Determine lateral stresses and deflection curves inside a simulated cantilever structure subjected to localized load forces."}
              {activeId === "CFD" && "Observe boundary layer friction, turbulence vortices, and aerodynamic lift limits across fluid speeds and airfoil pitch."}
              {activeId === "SRE" && "Verify your 4th-Sem syllabus core topics, toggle completed milestones, and validate answers to boost score matrix."}
              {activeId === "IoT" && "Stream high-frequency vibration accelerometers to analyze damping equations and structural decay patterns."}
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 font-extrabold block">
              Parameter Override Deck
            </span>

            {/* CAD SLIDERS */}
            {activeId === "CAD" && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Crank Radius (r):</span>
                    <span className="text-[#e2231a] font-bold">{crankLength} mm</span>
                  </div>
                  <input 
                    type="range" min="30" max="90" value={crankLength}
                    onChange={(e) => setCrankLength(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Connecting Rod (l):</span>
                    <span className="text-[#e2231a] font-bold">{conRodLength} mm</span>
                  </div>
                  <input 
                    type="range" min="110" max="200" value={conRodLength}
                    onChange={(e) => setConRodLength(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Rotational RPM Speed:</span>
                    <span className="text-[#e2231a] font-bold">{crankSpeed * 10} RPM</span>
                  </div>
                  <input 
                    type="range" min="5" max="80" value={crankSpeed}
                    onChange={(e) => setCrankSpeed(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
            )}

            {/* FEA SLIDERS */}
            {activeId === "FEA" && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Select Material Alloy:</label>
                  <select 
                    value={beamMaterial}
                    onChange={(e) => setBeamMaterial(e.target.value as any)}
                    className="w-full bg-[#181818] border border-white/10 text-white rounded p-2 focus:ring-1 focus:ring-suzuki-red outline-none text-xs"
                  >
                    <option value="structural-steel">Structural Steel (E: 200 GPa)</option>
                    <option value="6061-aluminum">6061-Aluminum (E: 70 GPa)</option>
                    <option value="carbon-fiber">High Hardness Carbon Fiber (E: 150 GPa)</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Extreme End Load Point (F):</span>
                    <span className="text-[#e2231a] font-bold">{loadForce} Newtons</span>
                  </div>
                  <input 
                    type="range" min="100" max="2500" step="50" value={loadForce}
                    onChange={(e) => setLoadForce(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
                <div className="bg-[#141414] border border-white/5 p-4 rounded text-zinc-400 space-y-2">
                  <span className="text-xs text-zinc-500 font-extrabold uppercase tracking-wide block">Mathematical Results:</span>
                  <div className="flex justify-between text-xs">
                    <span>Elastic Modulus E:</span>
                    <span className="text-white font-bold">{getElasticModulus()} GPa</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Max Beam Deflection δ:</span>
                    <span className="text-[#e2231a] font-extrabold">{calculateMaxDeflection()} mm</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Peak Bending Stress σ:</span>
                    <span className="text-yellow-400 font-extrabold">{calculatePeakStress()} MPa</span>
                  </div>
                </div>
              </div>
            )}

            {/* CFD SLIDERS */}
            {activeId === "CFD" && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Tunnel Flow Speed (V):</span>
                    <span className="text-[#e2231a] font-bold">{velocity} m/s</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Airfoil Angle of Attack (α):</span>
                    <span className="text-[#e2231a] font-bold">{angleAttack}°</span>
                  </div>
                  <input 
                    type="range" min="-10" max="25" value={angleAttack}
                    onChange={(e) => setAngleAttack(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
                <div className="bg-[#141414] border border-white/5 p-4 rounded text-zinc-400 space-y-2">
                  <span className="text-xs text-zinc-500 font-extrabold uppercase tracking-wide block">Aerodynamic Ratios:</span>
                  <div className="flex justify-between text-xs">
                    <span>Reynolds Number Re:</span>
                    <span className="text-white font-bold">{(velocity * 1000 * 0.15 / 0.05).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Calculated Stagnation P:</span>
                    <span className="text-[#e2231a] font-extrabold">{(0.5 * fluidDensity * velocity * velocity).toFixed(1)} Pa</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Lift-To-Drag Ratio L/D:</span>
                    <span className="text-emerald-400 font-extrabold">{(angleAttack <= 0 ? 0 : angleAttack > 15 ? 4.5 : (18 - (angleAttack - 6) * (angleAttack - 6) * 0.15)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SRE CONFIG DECK */}
            {activeId === "SRE" && (
              <div className="space-y-4 font-mono text-xs">
                <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Configure Syllabus Milestones:</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2 bg-neutral-900 border border-white/5 rounded cursor-pointer hover:bg-neutral-800 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={sreCompletedUnits.includes("kinematics-01")}
                      onChange={(e) => {
                        if (e.target.checked) setSreCompletedUnits(prev => [...prev, "kinematics-01"]);
                        else setSreCompletedUnits(prev => prev.filter(x => x !== "kinematics-01"));
                      }}
                      className="accent-suzuki-red"
                    />
                    <span>Unit 1: Rigid Kinematic Links</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2 bg-neutral-900 border border-white/5 rounded cursor-pointer hover:bg-neutral-800 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={sreCompletedUnits.includes("thermo-02")}
                      onChange={(e) => {
                        if (e.target.checked) setSreCompletedUnits(prev => [...prev, "thermo-02"]);
                        else setSreCompletedUnits(prev => prev.filter(x => x !== "thermo-02"));
                      }}
                      className="accent-suzuki-red"
                    />
                    <span>Unit 2: Isentropic Gas Expansion</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2 bg-neutral-900 border border-white/5 rounded cursor-pointer hover:bg-neutral-800 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={sreCompletedUnits.includes("vibe-03")}
                      onChange={(e) => {
                        if (e.target.checked) setSreCompletedUnits(prev => [...prev, "vibe-03"]);
                        else setSreCompletedUnits(prev => prev.filter(x => x !== "vibe-03"));
                      }}
                      className="accent-suzuki-red"
                    />
                    <span>Unit 3: Undamped Torsional Decay</span>
                  </label>
                </div>
              </div>
            )}

            {/* IoT SLIDERS */}
            {activeId === "IoT" && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Oscillating Damping Ratio (ζ):</span>
                    <span className="text-[#e2231a] font-bold">{dampingRatio}</span>
                  </div>
                  <input 
                    type="range" min="0.05" max="1.5" step="0.05" value={dampingRatio}
                    onChange={(e) => setDampingRatio(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>ζ &lt; 1 (Underdamped)</span>
                    <span>ζ = 1 (Critical)</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Telemetry Sampling Rate:</span>
                    <span className="text-[#e2231a] font-bold">{sensorFrequency} Hz</span>
                  </div>
                  <input 
                    type="range" min="2" max="25" value={sensorFrequency}
                    onChange={(e) => setSensorFrequency(Number(e.target.value))}
                    className="w-full accent-suzuki-red cursor-pointer h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visual Simulator Output with Interactive Component Animations */}
        <div className="lg:col-span-8 flex flex-col h-full bg-[#111111] border border-white/10 rounded-lg p-5 min-h-[360px] relative overflow-hidden">
          {/* Background grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4 z-10">
            <span className="font-mono text-[10px] font-extrabold text-[#e2231a] uppercase bg-suzuki-red/15 border border-suzuki-red/25 px-2 py-0.5 rounded">
              {activeId === "CAD" && "CAD // Real-Time Kinematic Linkage Model"}
              {activeId === "FEA" && "FEA // Solid Stress Mesh Visualizer"}
              {activeId === "CFD" && "CFD // Turbulent Flow Wind Tunnel Simulation"}
              {activeId === "SRE" && "SRE // Socratic Quick Diagnostic Scenario"}
              {activeId === "IoT" && "IoT // Telemetry Wave Oscilloscope"}
            </span>
            <span className="font-mono text-[9px] text-zinc-500">
              MECHFORGE COMPILER SYSTEM · LIVE ACTIVE
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center z-10 relative">
            
            {/* CAD RENDER */}
            {activeId === "CAD" && (
              <div className="w-full h-full flex flex-col items-center justify-between text-center py-4">
                {/* Linked SVG Crank-Slider mechanism */}
                <div className="w-full max-w-[400px] aspect-[4/3] bg-black/60 rounded border border-white/5 p-4 flex items-center justify-center relative">
                  <svg className="w-full h-full" viewBox="0 0 300 200">
                    {/* Definitions for grid and arrowheads */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#e2231a" />
                      </marker>
                    </defs>

                    {/* Ground line and ticks */}
                    <line x1="20" y1="120" x2="280" y2="120" stroke="#222" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="50" y1="120" x2="50" y2="130" stroke="#333" strokeWidth="2" />
                    
                    {/* Anchor pivot point A */}
                    <circle cx="100" cy="120" r="6" fill="#444" stroke="#888" strokeWidth="2" />
                    <circle cx="100" cy="120" r="2" fill="#fff" />
                    <text x="88" y="140" fill="#666" fontSize="10" className="font-mono">Pivot A</text>

                    {/* Instantaneous velocity coordinate math */}
                    {(() => {
                      const rad = (crankAngle * Math.PI) / 180;
                      // Crank B point
                      const bx = 100 + crankLength * 0.7 * Math.cos(rad);
                      const by = 120 - crankLength * 0.7 * Math.sin(rad);

                      // Slider C point (lies on y = 120)
                      // Math: distance BC = conRodLength
                      // dy = 120 - by
                      const dy = 120 - by;
                      const cx = bx + Math.sqrt(Math.max(0, conRodLength * conRodLength * 0.49 - dy * dy));
                      const cy = 120;

                      return (
                        <>
                          {/* Crank link AB */}
                          <line x1="100" y1="120" x2={bx} y2={by} stroke="#e2231a" strokeWidth="4" strokeLinecap="round" />
                          <circle cx={bx} cy={by} r="5" fill="#fff" stroke="#e2231a" strokeWidth="2" />
                          <text x={bx - 12} y={by - 12} fill="#e2231a" fontSize="10" className="font-mono font-bold">B</text>

                          {/* Connecting Rod BC */}
                          <line x1={bx} y1={by} x2={cx} y2={cy} stroke="#005ea6" strokeWidth="3" strokeLinecap="round" />
                          <circle cx={cx} cy={cy} r="4" fill="#fff" stroke="#005ea6" strokeWidth="2" />

                          {/* Slider piston block C */}
                          <rect x={cx - 15} y={cy - 10} width="30" height="20" fill="#222" stroke="#888" strokeWidth="1.5" rx="2" />
                          <text x={cx - 10} y={cy + 4} fill="#888" fontSize="10" className="font-mono font-black">C</text>

                          {/* Instantaneous Velocity Vectors of Piston */}
                          <line x1={cx} y1={cy} x2={cx + (bx - 100) * 0.4} y2={cy} stroke="#e2231a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                          <text x="180" y="35" fill="rgb(226,35,26)" fontSize="10" className="font-mono">Piston Velocity v_c</text>
                        </>
                      );
                    })()}
                  </svg>
                  
                  {/* Rotating gear icon representing CAD parametric speed */}
                  <div className="absolute top-3 left-3 bg-neutral-900 border border-white/5 rounded p-2 text-zinc-500 flex items-center gap-2">
                    <RotateCw size={14} className="animate-spin text-suzuki-red" style={{ animationDuration: `${3 / (crankSpeed + 0.1)}s` }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Continuous Kinematic Solve</span>
                  </div>
                </div>

                <div className="max-w-md mt-3 space-y-1.5 font-mono text-center">
                  <p className="text-sm md:text-base text-zinc-300">
                    Crank Position Angle: <span className="text-white font-bold">{crankAngle.toFixed(0)}°</span> | Transmission Angle (μ): <span className="text-emerald-400 font-bold">{(Math.asin((crankLength * Math.sin((crankAngle * Math.PI) / 180)) / conRodLength) * 180 / Math.PI).toFixed(1)}°</span>
                  </p>
                  <p className="text-xs text-zinc-400 bg-white/5 py-1.5 px-3.5 rounded inline-block font-bold">
                    FORMULA: x_c = r·cos(θ) + sqrt(l² - r²·sin²(θ)) (Analytical Piston Displacement)
                  </p>
                </div>
              </div>
            )}

            {/* FEA RENDER */}
            {activeId === "FEA" && (
              <div className="w-full h-full flex flex-col items-center justify-between text-center py-4">
                <div className="w-full max-w-[450px] bg-black/60 border border-white/5 rounded p-5 relative">
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-500">LOAD CONCENTRATION AREA</span>
                  
                  {/* Interactive beam visualization */}
                  <div className="space-y-4 my-4">
                    <div className="text-left font-mono text-[10px] text-zinc-500 mb-2">CANTILEVER STRESSED SHEAR NODES:</div>
                    
                    <div className="relative h-16 w-full bg-zinc-900 rounded border border-white/10 flex items-stretch">
                      {/* Fixed Wall anchor anchor support */}
                      <div className="w-8 shrink-0 bg-gradient-to-r from-red-800 to-zinc-700 border-r border-[#e2231a]/40 flex items-center justify-center font-bebas text-xs tracking-wider" style={{ writingMode: 'vertical-lr' }}>
                        WALL FIX
                      </div>

                      {/* Flexed structural bar nodes */}
                      <div className="flex-1 flex pointer-events-auto">
                        {[1, 2, 3, 4, 5].map((nodeId) => {
                          const stressFraction = (nodeId / 5) * (loadForce / 2500);
                          const isSelected = selectedNodeId === nodeId;
                          
                          // Color interpolation based on strain factors
                          let bgClass = "bg-sky-950 text-sky-400 border-sky-900";
                          if (stressFraction > 0.6) bgClass = "bg-rose-950 text-rose-400 border-rose-800";
                          else if (stressFraction > 0.3) bgClass = "bg-amber-950 text-amber-400 border-amber-900";

                          return (
                            <button
                              key={nodeId}
                              onClick={() => setSelectedNodeId(nodeId)}
                              className={`flex-1 flex flex-col items-center justify-center border-r border-white/5 transition-all duration-300 relative uppercase font-mono text-[10px] cursor-pointer ${bgClass} ${
                                isSelected ? 'ring-2 ring-suzuki-red ring-offset-2 ring-offset-black scale-[1.03] z-10' : 'hover:bg-neutral-800'
                              }`}
                            >
                              <span>Node {nodeId}</span>
                              <span className="text-[8px] opacity-70">{(stressFraction * 100).toFixed(0)}% Str</span>
                              {isSelected && <span className="absolute top-0.5 right-1 text-suzuki-red font-black text-[8px] animate-pulse">●</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stress load force downward arrow indicator */}
                    <div className="flex justify-end pr-4 animate-bounce">
                      <div className="flex flex-col items-center text-[#e2231a] font-mono text-xs font-bold">
                        <span>↓ {loadForce} N Applied</span>
                      </div>
                    </div>
                  </div>

                  {/* Socratic feedback node explanations */}
                  <div className="text-left font-mono text-sm text-zinc-300 bg-neutral-900 p-4 rounded border border-white/5">
                    <div className="font-extrabold text-[#e2231a] uppercase text-xs tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Info size={11} /> Selected FEA Analysis Node Model {selectedNodeId}
                    </div>
                    {selectedNodeId === 1 && "High strain localized shear directly boundary-locked to the wall. Under uniform load, bending stress σ is theoretical maximum at this junction."}
                    {selectedNodeId === 2 && "Normal structural compression zone. Elastic displacement represents modest deflection bending curvature."}
                    {selectedNodeId === 3 && "Mid-span node zone. Maintains balanced tension-shear parameters as deflection trends downstream."}
                    {selectedNodeId === 4 && "Elevated deflection zone. Moderate stress concentration point as rigidity properties are tested."}
                    {selectedNodeId === 5 && "Maximum deflection margin. Tension matches zero but physical vertical deviation satisfies (F·L³)/(3EI)."}
                  </div>
                </div>
              </div>
            )}

            {/* CFD AIRFOIL STREAMLINES */}
            {activeId === "CFD" && (
              <div className="w-full h-full flex flex-col items-center justify-between py-4">
                <div className="w-full max-w-[440px] aspect-[16/10] bg-black/60 rounded border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden">
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-500">BOUNDS REYNOLDS WIND-TUNNEL</span>

                  {/* SVG Airfoil and interactive particles flow */}
                  <div className="flex-1 relative w-full flex items-center justify-center">
                    <svg className="w-full h-[140px]" viewBox="0 0 350 140">
                      {/* Grid background lines */}
                      <line x1="0" y1="35" x2="350" y2="35" stroke="#111" strokeWidth="1" />
                      <line x1="0" y1="70" x2="350" y2="70" stroke="#111" strokeWidth="1" />
                      <line x1="0" y1="105" x2="350" y2="105" stroke="#111" strokeWidth="1" />

                      {/* Streamlines upper and lower */}
                      {(() => {
                        // Deflection curve based on angle of attack
                        const offset = angleAttack * 1.5;
                        const streamPathUpper = `M 10 30 Q 150 ${20 - offset} 200 ${50 + offset} T 340 70`;
                        const streamPathLower = `M 10 90 Q 150 ${120 - offset} 200 ${110 + offset} T 340 100`;
                        
                        return (
                          <>
                            {/* Laminar streamlines */}
                            <path d={streamPathUpper} fill="none" stroke="rgba(0, 94, 166, 0.4)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
                            <path d={streamPathLower} fill="none" stroke="rgba(0, 94, 166, 0.4)" strokeWidth="1.5" strokeDasharray="5,5" />

                            <path d={`M 10 60 Q 140 ${45 - offset} 185 ${55 + offset} T 340 ${80 + offset}`} fill="none" stroke="rgba(226, 35, 26, 0.55)" strokeWidth="2" />
                            
                            {/* SVG Aerodynamic Airfoil NACA 0012 rotated by pitch angle of attack */}
                            <g transform={`translate(150, 65) rotate(${angleAttack})`}>
                              <path 
                                d="M -60 0 C -40 -15 20 -15 60 -1 C 30 1 -20 5 -60 0 Z" 
                                fill="#222" 
                                stroke="#fff" 
                                strokeWidth="1.5" 
                              />
                              <text x="-15" y="4" fill="#666" fontSize="8" className="font-mono">AIRFOIL</text>
                            </g>

                            {/* Stagnation point overlay */}
                            <circle cx={148 - Math.max(0, angleAttack * 0.4)} cy={65 + (angleAttack * 0.6)} r="4" fill="#e2231a" />
                            <text x={125 - angleAttack} y={92 + angleAttack} fill="#e2231a" fontSize="7" className="font-mono">STAG POINT</text>
                          </>
                        );
                      })()}
                    </svg>

                    {/* Wind particles simulation overlay style */}
                    {velocity > 60 && (
                      <div className="absolute inset-0 flex items-center justify-between text-rose-500/20 font-mono text-[8px] pointer-events-none tracking-widest leading-none">
                        <span>☄ TURBULENCE CRITICAL DETECTED ☄ SHOCK SPIKE ☄</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive study variables */}
                  <div className="p-3.5 border-t border-white/5 font-mono text-xs text-zinc-400 flex justify-between">
                    <div>BOUNDARY STALL INDICATION: <span className={angleAttack > 16 ? "text-amber-400 font-extrabold animate-pulse" : "text-emerald-400 font-medium"}>{angleAttack > 16 ? "[STALL CRITICAL]" : "[STABLE LIFT]"}</span></div>
                    <div>DRAG COEFFICIENT C_d: <span className="text-[#e2231a] font-bold">{(0.012 + (angleAttack * angleAttack * 0.0016)).toFixed(4)}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* SRE QUICK SOCRATIC SCENARIO QUIZ */}
            {activeId === "SRE" && (
              <div className="w-full h-full flex flex-col justify-between py-4">
                <div className="w-full max-w-[450px] bg-black/60 border border-white/5 rounded-md p-5 text-left font-mono text-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#e2231a] font-black uppercase text-xs">Active Socratic Validation Block</span>
                    <span className="text-zinc-500 text-xs bg-white/5 px-2 py-0.5 rounded">Grade Target 01</span>
                  </div>

                  <p className="text-zinc-200 leading-relaxed font-sans mb-4 text-sm md:text-base">
                    <strong>Challenge:</strong> During uniform wear theory torque calculations inside multi-plate clutches, if we maintain identical axial clutch engagement force, how does the Mean Friction Radius comparing with Uniform Pressure theory?
                  </p>

                  <div className="space-y-2 mb-4">
                    <button 
                      onClick={() => { setSelectedQuizIdx(1); setSreQuizAnswered(false); }}
                      className={`w-full text-left p-2.5 rounded border transition-all cursor-pointer text-sm ${
                        selectedQuizIdx === 1 
                          ? 'border-suzuki-red bg-suzuki-red/5 text-white animate-pulse font-bold' 
                          : 'border-white/5 bg-neutral-900 text-zinc-400 hover:border-white/15'
                      }`}
                    >
                      A. Uniform wear mean radius is always strictly LESS than uniform pressure radius.
                    </button>
                    <button 
                      onClick={() => { setSelectedQuizIdx(2); setSreQuizAnswered(false); }}
                      className={`w-full text-left p-2.5 rounded border transition-all cursor-pointer text-sm ${
                        selectedQuizIdx === 2
                          ? 'border-suzuki-red bg-suzuki-red/5 text-white animate-pulse font-bold' 
                          : 'border-white/5 bg-neutral-900 text-zinc-400 hover:border-white/15'
                      }`}
                    >
                      B. Uniform wear mean radius is always strictly GREATER than uniform pressure radius.
                    </button>
                    <button 
                      onClick={() => { setSelectedQuizIdx(3); setSreQuizAnswered(false); }}
                      className={`w-full text-left p-2.5 rounded border transition-all cursor-pointer text-sm ${
                        selectedQuizIdx === 3 
                          ? 'border-suzuki-red bg-suzuki-red/5 text-white animate-pulse font-bold' 
                          : 'border-white/5 bg-neutral-900 text-zinc-400 hover:border-white/15'
                      }`}
                    >
                      C. Both theories result in mathematically identical mean friction radiuses.
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      disabled={selectedQuizIdx === null}
                      onClick={() => {
                        setSreQuizAnswered(true);
                        const isCorrect = selectedQuizIdx === 1; // Option A is the correct mechanical wear fact
                        setSreCorrect(isCorrect);
                        if (isCorrect) {
                           onIncrementScore(15);
                        }
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 font-condensed tracking-wider text-xs font-black uppercase text-white rounded cursor-pointer disabled:bg-neutral-800 disabled:text-zinc-600"
                    >
                      [SUBMIT RESOLUTION CODE]
                    </button>

                    {sreQuizAnswered && (
                      <span className={`text-xs font-extrabold uppercase py-1 px-3 border rounded ${
                        sreCorrect 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {sreCorrect ? "🟢 CORRECT! +15 Score Matrix Boosted" : "❌ DISCORDANT RESOLUTION"}
                      </span>
                    )}
                  </div>

                  {sreQuizAnswered && (
                    <p className="mt-3 text-xs text-zinc-400 leading-relaxed bg-white/5 p-2 rounded">
                      {sreCorrect 
                        ? "Indeed! Average radius R_wear = (r1+r2)/2 is always less than R_pressure = 2/3 * (r1^3 - r2^3) / (r1^2 - r2^2). Wear reduces transfer capability limits." 
                        : "Incorrect fact. Since initial pressure peaks at the inner radius during wear development, the mean radius drifts slightly inward, hence R_wear is always smaller than R_pressure."}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* IoT GRAPH OSCILLOSCOPE */}
            {activeId === "IoT" && (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  
                  {/* Dynamic wave plot canvas mockup */}
                  <div className="bg-black/60 border border-white/5 rounded p-4 flex flex-col justify-between h-[180px]">
                    <span className="text-[9px] font-mono text-zinc-500">REAL-TIME ACCELEROMETER OSCILLOSCOPE</span>
                    
                    <div className="flex-1 flex items-end justify-between relative px-2 py-4 h-[100px] border-b border-white/5">
                      {/* Grid line background */}
                      <div className="absolute top-[50%] left-0 right-0 h-0.5 bg-[#e2231a]/10 pointer-events-none" />
                      
                      {/* Continuous sinus wave nodes */}
                      {[...Array(20)].map((_, index) => {
                        // Calculate simple sine dynamic wave adjusted for frequency parameter and damping exponential
                        const radian = (index / 19) * Math.PI * sensorFrequency;
                        const envelopeVal = Math.exp(-dampingRatio * (index * 0.1));
                        const calculatedY = Math.sin(radian) * envelopeVal * 32; // height amplitude
                        
                        return (
                          <div 
                            key={index} 
                            className="bg-suzuki-red w-[2.5px] rounded-full transition-all duration-300 pointer-events-none" 
                            style={{ 
                              height: `${Math.max(4, 35 + calculatedY)}px`,
                              opacity: envelopeVal
                            }} 
                          />
                        );
                      })}
                    </div>

                    <div className="flex justify-between font-mono text-[9px] text-[#e2231a]">
                      <span>SEC_T: 0.0s</span>
                      <span>TIME STABLE DECAY WAVE</span>
                      <span>SEC_T: 2.5s</span>
                    </div>
                  </div>

                  {/* Inbound stream list logs */}
                  <div className="bg-black/75 border border-white/5 rounded p-3 h-[180px] overflow-hidden flex flex-col justify-between font-mono text-[9px]">
                    <div className="text-[#e2231a] tracking-widest font-extrabold uppercase border-b border-white/5 pb-1 flex items-center justify-between">
                      <span>⚡ GATEWAY RESPONSE STREAM</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1.5 py-2 text-zinc-400 leading-none">
                      {liveLog.map((logStr, idx) => (
                        <div key={idx} className="truncate">
                          <span className="text-[#e2231a]">&gt;&gt;</span> {logStr}
                        </div>
                      ))}
                    </div>
                    <div className="text-[8px] text-zinc-600 text-right mt-1">STATUS: CONTINUOUS CO-PROCESSING LOGS ACTIVE</div>
                  </div>
                </div>

                <div className="bg-[#141414] border border-white/5 p-4 rounded text-zinc-400 text-sm mt-3 flex items-start gap-2.5">
                  <Cpu className="text-suzuki-red shrink-0" size={16} />
                  <p className="font-sans leading-relaxed text-sm font-medium">
                    Real-time vibration stream displays the logarithmic decrement equation: <strong>δ = ln(x_1 / x_2) = 2πζ / sqrt(1 - ζ²)</strong>. High ζ triggers rapid geometric decay, testing sensory limits under optimal friction thresholds.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Socratic Interactive Retention Quiz Trigger Panel */}
          <div className="mt-5 p-4 bg-indigo-950/25 border border-indigo-500/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/30 text-indigo-400 shrink-0">
                <SparklesIcon size={18} className="animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  Interactive Lesson Progressed!
                  <span className="px-1.5 py-0.5 bg-[#e2231a]/15 border border-[#e2231a]/20 rounded text-[9px] text-yellow-400 font-extrabold font-mono animate-pulse">
                    READY FOR RETENTION TESTING
                  </span>
                </h4>
                <p className="text-[10px] md:text-xs text-zinc-400 font-semibold font-sans mt-0.5 leading-relaxed">
                  You successfully verified models in <strong className="text-zinc-200 uppercase">{activeId}</strong> module. Answer the verification scenario to claim certified bonus credits.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/35"
              title="Initiate Socratic Quiz Scenario"
            >
              🎓 TAKE RETENTION QUIZ (+15 PTS)
            </button>
          </div>

          {/* Quick Quiz Modal Render Portals */}
          <QuickQuizModal
            topicId={activeId}
            isOpen={isQuizOpen}
            onClose={() => setIsQuizOpen(false)}
            onSuccess={(pts) => {
              onIncrementScore(pts);
              setIsQuizOpen(false);
            }}
          />

          {/* Interactive footer lesson hints */}
          <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-between text-xs md:text-sm font-mono text-zinc-400 z-10">
            <span className="flex items-center gap-1.5 uppercase font-bold text-zinc-500">
              <Info size={11} className="text-suzuki-red text-xs hover:scale-110 cursor-help" />
              Educational Target: Learn mechanical variables by tuning live inputs
            </span>
            <span className="text-suzuki-red font-black">
              LIVE SIM // VER-2.4.0
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
