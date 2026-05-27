import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Info, HelpCircle, Flame, ArrowRight, RotateCw } from 'lucide-react';

interface FilmModalProps {
  onClose: () => void;
}

interface StrokeInfo {
  name: string;
  pistonAction: 'down' | 'up' | 'down-power' | 'up-exhaust';
  intakeValve: 'open' | 'closed';
  exhaustValve: 'open' | 'closed';
  spark: boolean;
  color: string;
  description: string;
  formula: string;
  thermoState: string;
}

const STROKES: StrokeInfo[] = [
  {
    name: "1. INTAKE STROKE (Suction)",
    pistonAction: "down",
    intakeValve: "open",
    exhaustValve: "closed",
    spark: false,
    color: "stroke-[#3b82f6]",
    description: "The inlet valve opens as the piston moves downward from Top Dead Center (TDC) to Bottom Dead Center (BDC). This action draws a fresh, stoichiometric air-fuel mixture into the cylinder chamber under negative gauge atmospheric pressure.",
    formula: "Relative Vacuum: P_cylinder < P_atm",
    thermoState: "Volume increases from Clearance Volume (V_c) to Total Cylinder Volume (V_1)."
  },
  {
    name: "2. COMPRESSION STROKE (Isentropic)",
    pistonAction: "up",
    intakeValve: "closed",
    exhaustValve: "closed",
    spark: false,
    color: "stroke-[#eab308]",
    description: "Both inlet and exhaust valves are tightly closed. The piston sweeps upward from BDC to TDC, compressing the trapped air-fuel mixture. Compression ratio 'r' dictates the density and temperature increase, preparing the charge for instantaneous thermal ignition.",
    formula: "P_2 = P_1 * r^γ || T_2 = T_1 * r^(γ-1)",
    thermoState: "Pressure climbs rapidly. Volume equals Clearance Volume (V_c) at peak TDC."
  },
  {
    name: "3. POWER STROKE (Combustion & Expansion)",
    pistonAction: "down-power",
    intakeValve: "closed",
    exhaustValve: "closed",
    spark: true,
    color: "stroke-[#ef4444]",
    description: "The spark plug fires a high-voltage charge at the peak of compression, initiating a rapid deflagration. High pressure/temperature combustion gases expand violently, driving the piston downward. This is the ONLY stroke that produces mechanical work.",
    formula: "Power Output: W = ∫ P dV > 0",
    thermoState: "Peak temperature reached (T_max > 2000K). Gas expands isentropically doing work on the crank."
  },
  {
    name: "4. EXHAUST STROKE (Blowdown)",
    pistonAction: "up-exhaust",
    intakeValve: "closed",
    exhaustValve: "open",
    spark: false,
    color: "stroke-[#a855f7]",
    description: "The exhaust valve opens. The piston sweeps upward once more from BDC to TDC, mechanically sweeping the spent post-combustion residuals and carbon effluents out of the cylinder into the exhaust stream to restart the cycle.",
    formula: "Mass flow exit: m_dot = ρ * A * V_piston",
    thermoState: "Pressure decreases back to near-atmospheric level. Chamber prepares for subsequent suction."
  }
];

export default function FilmModal({ onClose }: FilmModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStrokeIdx, setActiveStrokeIdx] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(1200);

  // Dynamic animation clock
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setRotationAngle((prev) => {
          const next = (prev + rpm / 120) % 360;
          
          // Map angular rotation back to one of the 4 strokes
          // 4 Strokes happen in 2 full revolutions (720 degrees)
          const strokeCycle = next % 720;
          if (strokeCycle < 180) {
            setActiveStrokeIdx(0); // Intake
          } else if (strokeCycle < 360) {
            setActiveStrokeIdx(1); // Compression
          } else if (strokeCycle < 540) {
            setActiveStrokeIdx(2); // Power
          } else {
            setActiveStrokeIdx(3); // Exhaust
          }
          return next;
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isPlaying, rpm]);

  const activeStroke = STROKES[activeStrokeIdx];

  // Manual step through
  const handleNextStroke = () => {
    setIsPlaying(false);
    setActiveStrokeIdx((prev) => (prev + 1) % 4);
    setRotationAngle((prev) => (activeStrokeIdx + 1) * 180);
  };

  const handlePrevStroke = () => {
    setIsPlaying(false);
    setActiveStrokeIdx((prev) => (prev - 1 + 4) % 4);
    setRotationAngle((prev) => (activeStrokeIdx - 1 + 4) * 180);
  };

  // Convert stroke action to slider heights for piston motion
  // Stroke 0: Intake -> moves down (0 to 180 deg) -> height starts at TDC (20px) goes down to BDC (90px)
  // Stroke 1: Compression -> moves up (180 to 360 deg) -> height goes up from 90px to 20px
  // Stroke 2: Power -> moves down (360 to 540 deg) -> height goes down from 20px to 90px
  // Stroke 3: Exhaust -> moves up (540 to 720) -> height goes up from 90px to 20px
  const getPistonHeight = () => {
    const angleNormalized = rotationAngle % 360;
    // Simple harmonic oscillation approximation for piston slider
    // TDC height is 40, stroke height displacement is 60, total max 100
    const rad = (rotationAngle * Math.PI) / 180;
    return 65 + 30 * Math.cos(rad); 
  };

  const pistonY = getPistonHeight();

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-fadeIn" id="animated-video-simulation">
      <div className="bg-[#0b0b0b] border-2 border-white/10 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl relative">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ef4444] font-extrabold">
              Interactive 4-Stroke IC Engine Simulator & Dynamic Diagram Video Lesson
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all p-1.5 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
            id="close-simulation-btn"
          >
            <X size={22} />
          </button>
        </div>

        {/* Master Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Panel: Big Beautiful Engine Animation Video (7 Columns) */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-between items-center border-r border-white/5 relative min-h-[480px]">
            
            {/* Top diagnostic labels */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono text-zinc-500 mb-4">
              <span>Simulation Status: <b className={isPlaying ? "text-emerald-400" : "text-yellow-400"}>{isPlaying ? "RUNNING_AUTO" : "PAUSED_STEP"}</b></span>
              <span>Crank Angle: <b className="text-zinc-100">{(rotationAngle % 720).toFixed(0)}°</b> / 720°</span>
            </div>

            {/* Engine Diagram Canvas Container */}
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center bg-black/30 rounded-2xl border border-white/5 p-4 shadow-inner">
              
              {/* Spark flash effect during power stroke */}
              {activeStroke.spark && (rotationAngle % 180 < 40) && (
                <div className="absolute inset-0 bg-yellow-500/10 rounded-2xl filter blur-xl animate-pulse pointer-events-none z-0" />
              )}

              {/* Spark ignition explosion line indicator */}
              {activeStroke.spark && (rotationAngle % 180 < 40) && (
                <div className="absolute top-[32%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <Flame size={45} className="text-yellow-400 animate-bounce" />
                </div>
              )}

              <svg viewBox="0 0 200 240" className="w-full h-full z-10">
                {/* CYLINDER BLOCK OUTER CASING */}
                <path d="M 60,20 H 140 V 160 H 60 Z" fill="none" stroke="#333" strokeWidth="8" />
                <path d="M 50,15 H 150 M 50,30 H 150" stroke="#444" strokeWidth="3" />
                
                {/* CYLINDER INSIDE BORE */}
                <rect x="65" y="24" width="70" height="132" fill="#0d0d0d" />

                {/* THERMODYNAMIC COLOR GRADIENT SHADOW Inside combustion chamber */}
                {activeStrokeIdx === 0 && (
                  <rect x="65" y="24" width="70" height={pistonY - 24} className="fill-blue-500/20" /> // Intake air-fuel
                )}
                {activeStrokeIdx === 1 && (
                  <rect x="65" y="24" width="70" height={pistonY - 24} className="fill-yellow-500/20" /> // Compression
                )}
                {activeStrokeIdx === 2 && (
                  <rect x="65" y="24" width="70" height={pistonY - 24} className="fill-red-500/40" /> // Combustion flare
                )}
                {activeStrokeIdx === 3 && (
                  <rect x="65" y="24" width="70" height={pistonY - 24} className="fill-purple-500/20" /> // Spent exhaust gas
                )}

                {/* INTAKE VALVE (Left) */}
                <g transform={`translate(78, ${activeStroke.intakeValve === 'open' ? 28 : 20})`}>
                  <line x1="0" y1="0" x2="0" y2="-15" stroke={activeStroke.intakeValve === 'open' ? "#3b82f6" : "#555"} strokeWidth="3" />
                  <path d="M -8,0 H 8" stroke={activeStroke.intakeValve === 'open' ? "#3b82f6" : "#555"} strokeWidth="4" />
                </g>
                <text x="66" y="12" fill="#3b82f6" fontSize="6" fontFamily="monospace">INLET</text>

                {/* EXHAUST VALVE (Right) */}
                <g transform={`translate(122, ${activeStroke.exhaustValve === 'open' ? 28 : 20})`}>
                  <line x1="0" y1="0" x2="0" y2="-15" stroke={activeStroke.exhaustValve === 'open' ? "#a855f7" : "#555"} strokeWidth="3" />
                  <path d="M -8,0 H 8" stroke={activeStroke.exhaustValve === 'open' ? "#a855f7" : "#555"} strokeWidth="4" />
                </g>
                <text x="114" y="12" fill="#a855f7" fontSize="6" fontFamily="monospace">EXH</text>

                {/* SPARK PLUG (Center) */}
                <rect x="96" y="6" width="8" height="15" fill="#aaa" stroke="#111" strokeWidth="1" />
                <line x1="100" y1="21" x2="100" y2="24" stroke="#fff" strokeWidth="1.5" />
                {activeStroke.spark && (rotationAngle % 180 < 40) ? (
                  <circle cx="100" cy="25" r="4" fill="#fcff41" className="animate-ping" />
                ) : (
                  <circle cx="100" cy="25" r="1.5" fill="#a1a1aa" />
                )}

                {/* PISTON HEAD ASSEMBLAGE */}
                <g transform={`translate(100, ${pistonY})`}>
                  {/* Piston body */}
                  <rect x="-32" y="0" width="64" height="40" rx="3" fill="#666" stroke="#fff" strokeWidth="2" />
                  {/* Piston ring grooves */}
                  <line x1="-32" y1="8" x2="-28" y2="8" stroke="#333" strokeWidth="2.5" />
                  <line x1="-30" y1="16" x2="-28" y2="16" stroke="#333" strokeWidth="2.5" />
                  <line x1="32" y1="8" x2="28" y2="8" stroke="#333" strokeWidth="2.5" />
                  <line x1="30" y1="16" x2="28" y2="16" stroke="#333" strokeWidth="2.5" />
                  {/* Gudgeon pin */}
                  <circle cx="0" cy="20" r="7" fill="#222" stroke="#aaa" strokeWidth="1.5" />
                </g>

                {/* CONNECTING ROD */}
                {(() => {
                  const crankRadius = 30;
                  const rad = (rotationAngle * Math.PI) / 180;
                  const crankPinX = 100 + crankRadius * Math.sin(rad);
                  const crankPinY = 190 + crankRadius * Math.cos(rad);
                  const pistonPinX = 100;
                  const pistonPinY = pistonY + 20;

                  return (
                    <g>
                      <line
                        x1={pistonPinX}
                        y1={pistonPinY}
                        x2={crankPinX}
                        y2={crankPinY}
                        stroke="#fff"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <line
                        x1={pistonPinX}
                        y1={pistonPinY}
                        x2={crankPinX}
                        y2={crankPinY}
                        stroke="#b51a1a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Crankshaft wheel background */}
                      <circle cx="100" cy="190" r="30" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="4,2" />
                      {/* Spinning Crank Assembly */}
                      <line x1="100" y1="190" x2={crankPinX} y2={crankPinY} stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="100" cy="190" r="8" fill="#555" stroke="#fff" strokeWidth="2" />
                      <circle cx={crankPinX} cy={crankPinY} r="5" fill="#fff" />
                    </g>
                  );
                })()}

                {/* DEAD CENTER HEIGHT MARKERS */}
                <line x1="56" y1="65" x2="62" y2="65" stroke="#ff0000" strokeWidth="1.5" />
                <text x="44" y="68" fill="#ff0000" fontSize="7" fontFamily="monospace">TDC</text>

                <line x1="56" y1="125" x2="62" y2="125" stroke="#ff9900" strokeWidth="1.5" />
                <text x="44" y="128" fill="#ff9900" fontSize="7" fontFamily="monospace">BDC</text>
              </svg>
            </div>

            {/* Simulated Video Controller Bar */}
            <div className="w-full bg-[#111] p-4 border border-white/10 rounded-xl mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
                </button>
                
                <div className="flex gap-1">
                  <button
                    onClick={handlePrevStroke}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[11px] rounded transition-all cursor-pointer"
                    title="Previous Stroke step"
                  >
                    « REW
                  </button>
                  <button
                    onClick={handleNextStroke}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[11px] rounded transition-all cursor-pointer"
                    title="Next Stroke step"
                  >
                    STEP »
                  </button>
                </div>
              </div>

              {/* Slider simulation speed constraint */}
              <div className="flex items-center gap-3 w-full md:w-auto flex-1 justify-end">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">Engine Speed:</span>
                <input
                  type="range"
                  min="200"
                  max="3600"
                  step="100"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="w-32 bg-zinc-800 text-red-600 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <span className="text-xs font-mono text-white font-bold w-16">{rpm} RPM</span>
              </div>
            </div>

          </div>

          {/* Right Panel: Academic Syllabus & Video Lesson Notes (5 Columns) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-[#0e0e0e] flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Dynamic Stroke Selector */}
              <div>
                <span className="text-[#ef4444] text-[10px] uppercase font-mono tracking-widest block font-extrabold mb-1">
                  Lesson 04 // Internal Combustion Engines
                </span>
                <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase">
                  THE 4-STROKE OTTO CYCLE
                </h3>
              </div>

              {/* Progressive Stroke Highlights */}
              <div className="grid grid-cols-4 gap-1.5">
                {STROKES.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStrokeIdx(idx);
                      setRotationAngle(idx * 180 + 35);
                    }}
                    className={`p-2 text-center border font-condensed text-[10px] font-extrabold tracking-wider transition-all rounded cursor-pointer ${
                      activeStrokeIdx === idx
                        ? 'bg-red-600 border-red-600 text-white h-11'
                        : 'bg-[#181818] border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10 h-10'
                    }`}
                  >
                    S-{idx + 1}
                  </button>
                ))}
              </div>

              {/* Active stroke details styled with bigger visible fonts */}
              <div className="bg-[#151515] p-5 rounded-lg border border-white/10 space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#fcff41] bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded inline-block font-extrabold uppercase">
                  {activeStroke.name}
                </span>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-light">
                  {activeStroke.description}
                </p>

                <div className="border-t border-white/5 pt-3 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">State Pressure Equation:</span>
                    <span className="text-emerald-400 text-sm md:text-base font-bold">{activeStroke.formula}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Thermodynamic State Change:</span>
                    <span className="text-zinc-400 text-xs">{activeStroke.thermoState}</span>
                  </div>
                </div>
              </div>

              {/* Classroom Proving Question */}
              <div className="p-4 bg-red-600/5 border border-red-500/20 rounded-lg space-y-2">
                <span className="text-[10px] font-mono text-[#ef4444] font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <HelpCircle size={12} /> Syllabus Examination Connection
                </span>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  The efficiency of the Air-Standard Otto Cycle is governed by:
                  <code className="block bg-neutral-950 px-2 py-1.5 text-center text-white my-1 font-mono font-bold rounded text-xs select-all">
                    η_otto = 1 - (1 / r^(γ - 1))
                  </code>
                  where <strong>r</strong> is the geometric compression ratio, and <strong>γ = c_p / c_v</strong> is the adiabatic ratio of specific heats (1.4 for ambient air).
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
              <span className="text-zinc-500 font-mono text-[10px]">
                Educational Unit authorized for free academic use
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-neutral-800 text-white font-condensed font-extrabold uppercase tracking-wider text-xs border border-white/10 rounded transition-all cursor-pointer"
              >
                Return to lab Stations M3
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
