import React from 'react';
import { Layers, Activity, Compass, Wind, HardDrive } from 'lucide-react';

interface ProblemDiagramProps {
  moduleId: string;
  questionId: number;
  subject: string;
  questionText: string;
}

export default function ProblemDiagram({ moduleId, questionId, subject, questionText }: ProblemDiagramProps) {
  // Lowercase check to identify scenario keywords
  const text = (questionText || "").toLowerCase();
  
  // Decide diagram type based on keywords
  let diagramType: 'flow' | 'beam' | 'shaft' | 'thermal' | 'spring' | 'cylinder' | 'robot' | 'default' = 'default';
  
  if (text.includes("flow") || text.includes("pipe") || text.includes("venturi") || text.includes("fluid") || text.includes("velocity") || text.includes("density")) {
    diagramType = 'flow';
  } else if (text.includes("beam") || text.includes("cantilever") || text.includes("stress") || text.includes("strain") || text.includes("elongation") || text.includes("load") || text.includes("tension")) {
    diagramType = 'beam';
  } else if (text.includes("torque") || text.includes("shaft") || text.includes("gear") || text.includes("rotor") || text.includes("speed") || text.includes("clutch")) {
    diagramType = 'shaft';
  } else if (text.includes("carnot") || text.includes("otto") || text.includes("cycle") || text.includes("thermal") || text.includes("temp") || text.includes("heat") || text.includes("entropy")) {
    diagramType = 'thermal';
  } else if (text.includes("spring") || text.includes("vibration") || text.includes("flywheel") || text.includes("governor")) {
    diagramType = 'spring';
  } else if (text.includes("cylinder") || text.includes("hoop") || text.includes("pressure vessel") || text.includes("vessel")) {
    diagramType = 'cylinder';
  } else if (text.includes("robot") || text.includes("kinematics") || text.includes("d-h") || text.includes("manipulator") || text.includes("coordinate")) {
    diagramType = 'robot';
  }

  // Render vector details based on parsed type
  switch (diagramType) {
    case 'flow':
      return (
        <div id={`diag-flow-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a] animate-ping" />
            SCHEMATIC: HYDRAULIC PIPELINE DYNAMICS
          </div>
          
          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Pipe mesh / outlines */}
            <path d="M 10,20 L 110,20 C 130,20 140,40 160,40 L 290,40 L 290,80 L 160,80 C 140,80 130,100 110,100 L 10,100 Z" fill="none" stroke="#2a2a2a" strokeWidth="2.5" />
            <path d="M 10,25 L 110,25 C 128,25 138,45 158,45 L 290,45" fill="none" stroke="rgba(226,35,26,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 10,95 L 110,95 C 128,95 138,75 158,75 L 290,75" fill="none" stroke="rgba(226,35,26,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            
            {/* Flow vectors */}
            {/* Flow lines in inlet */}
            <line x1="20" y1="40" x2="90" y2="40" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="5,3" className="animate-pulse" />
            <line x1="20" y1="60" x2="90" y2="60" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="4,4" />
            <line x1="20" y1="80" x2="90" y2="80" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="5,3" />
            
            {/* Flow line contraction vectors */}
            <path d="M 90,40 Q 130,40 170,50 L 280,50" fill="none" stroke="#e2231a" strokeWidth="1.5" strokeDasharray="4,2" />
            <path d="M 90,60 Q 130,60 170,60 L 280,60" fill="none" stroke="#00d2ff" strokeWidth="2" />
            <path d="M 90,80 Q 130,80 170,70 L 280,70" fill="none" stroke="#e2231a" strokeWidth="1.5" strokeDasharray="4,2" />
            
            {/* Gauges */}
            <line x1="60" y1="20" x2="60" y2="5" stroke="#3e3e3e" strokeWidth="2" />
            <circle cx="60" cy="5" r="4" fill="#00d2ff" />
            <text x="60" y="-3" fill="#00d2ff" fontSize="7" fontFamily="monospace" textAnchor="middle">P1 (Inlet)</text>

            <line x1="220" y1="40" x2="220" y2="25" stroke="#3e3e3e" strokeWidth="2" />
            <circle cx="220" cy="25" r="4" fill="#e2231a" />
            <text x="220" y="17" fill="#e2231a" fontSize="7" fontFamily="monospace" textAnchor="middle">P2 (Throat)</text>
            
            {/* Parameter Annotations */}
            <text x="50" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">A1 (Area Inlet)</text>
            <text x="210" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">A2 (Area Throat)</text>
          </svg>
          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Conservation of Volumetric Flow Rate: <code className="text-emerald-400 font-mono">Q = A₁·V₁ = A₂·V₂</code>
          </span>
        </div>
      );

    case 'beam':
      return (
        <div id={`diag-beam-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            DIAGRAM: SOLID MECHANICS BEAM FLEXURE
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Wall constraint */}
            <line x1="20" y1="10" x2="20" y2="100" stroke="#444" strokeWidth="4" />
            <line x1="12" y1="15" x2="20" y2="25" stroke="#444" strokeWidth="1" />
            <line x1="12" y1="35" x2="20" y2="45" stroke="#444" strokeWidth="1" />
            <line x1="12" y1="55" x2="20" y2="65" stroke="#444" strokeWidth="1" />
            <line x1="12" y1="75" x2="20" y2="85" stroke="#444" strokeWidth="1" />
            
            {/* Primary Cantilever Beam (undeflected ghost) */}
            <rect x="20" y="50" width="220" height="15" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
            
            {/* Deflected Beam curve */}
            <path d="M 20,50 Q 130,50 240,75 L 240,90 Q 130,65 20,65" fill="rgba(0,210,255,0.08)" stroke="#00d2ff" strokeWidth="1.5" />
            
            {/* Forces/Loads */}
            <path d="M 240,40 L 240,70" fill="none" stroke="#e2231a" strokeWidth="2" />
            <polygon points="237,65 243,65 240,73" fill="#e2231a" />
            <text x="248" y="55" fill="#e2231a" fontSize="9" fontFamily="monospace" fontWeight="bold">Load (F)</text>
            
            {/* Deflection indicator */}
            <line x1="240" y1="50" x2="270" y2="50" stroke="#555" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="240" y1="75" x2="270" y2="75" stroke="#555" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M 265,50 L 265,75" fill="none" stroke="#00d2ff" strokeWidth="1" />
            <polygon points="263,54 267,54 265,50" fill="#00d2ff" />
            <polygon points="263,71 267,71 265,75" fill="#00d2ff" />
            <text x="275" y="66" fill="#00d2ff" fontSize="8" fontFamily="monospace">δ Deflection</text>
            
            {/* Length parameter */}
            <path d="M 20,105 L 240,105" fill="none" stroke="#888" strokeWidth="1" />
            <polygon points="24,103 24,107 20,105" fill="#888" />
            <polygon points="236,103 236,107 240,105" fill="#888" />
            <text x="130" y="115" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">Beam Length (L)</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Ultimate Flexural Deflection Equation: <code className="text-emerald-400 font-mono">δ = F·L³ / (3·E·I)</code>
          </span>
        </div>
      );

    case 'shaft':
      return (
        <div id={`diag-shaft-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            SCHEMATIC: ROTATIONAL POWER SHAFT TORQUE
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Rotating Gear 1 */}
            <circle cx="80" cy="60" r="30" fill="none" stroke="#444" strokeWidth="1.5" />
            <circle cx="80" cy="60" r="34" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3,4" />
            <circle cx="80" cy="60" r="6" fill="#111" stroke="#888" strokeWidth="1.5" />
            
            {/* Interlaced Gear 2 */}
            <circle cx="144" cy="60" r="34" fill="none" stroke="#444" strokeWidth="1.5" />
            <circle cx="144" cy="60" r="30" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3,4" />
            <circle cx="144" cy="60" r="6" fill="#111" stroke="#888" strokeWidth="1.5" />
            
            {/* Gear labels */}
            <text x="80" y="105" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">Driver N1</text>
            <text x="144" y="105" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">Driven N2</text>
            
            {/* Shaft cylinder representation on right */}
            <path d="M 200,45 L 280,45 C 285,45 285,75 280,75 L 200,75 Z" fill="rgba(255,255,255,0.03)" stroke="#3e3e3e" strokeWidth="1.5" />
            <ellipse cx="200" cy="60" rx="6" ry="15" fill="#181818" stroke="#3e3e3e" strokeWidth="1.5" />
            <ellipse cx="280" cy="60" rx="6" ry="15" fill="#222" stroke="#00d2ff" strokeWidth="1.5" />
            
            {/* Torque arrow overlay */}
            <path d="M 270,30 A 18,18 0 0,1 292,60" fill="none" stroke="#e2231a" strokeWidth="2" strokeDasharray="1,1" />
            <path d="M 285,35 L 295,45 L 280,47" fill="#e2231a" />
            <text x="250" y="27" fill="#e2231a" fontSize="8" fontFamily="monospace" fontWeight="bold">Torque T (N-m)</text>
            
            {/* Stress gradient indicator in cross section */}
            <line x1="200" y1="45" x2="200" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
            <text x="235" y="93" fill="#00d2ff" fontSize="8" fontFamily="monospace">Shear Stress Peak at r</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Torsional Stress Formula: <code className="text-emerald-400 font-mono">T/J = τ_max / R = G·θ / L</code>
          </span>
        </div>
      );

    case 'thermal':
      return (
        <div id={`diag-thermal-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            DIAGRAM: CYCLIC THERMODYNAMIC WORK LOOP
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Axes */}
            <line x1="40" y1="10" x2="40" y2="105" stroke="#444" strokeWidth="1.5" />
            <line x1="40" y1="105" x2="260" y2="105" stroke="#444" strokeWidth="1.5" />
            <text x="30" y="15" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Pressure (P)</text>
            <text x="245" y="117" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Volume (V)</text>
            
            {/* Thermodynamic Loop (Closed system coordinates) */}
            <path d="M 70,35 C 100,32 150,45 180,60 C 150,85 100,95 80,90 C 65,75 62,50 70,35" fill="rgba(226,35,26,0.06)" stroke="#00d2ff" strokeWidth="2" />
            
            {/* Direction Arrows */}
            <polygon points="120,41 126,36 123,45" fill="#00d2ff" />
            <polygon points="130,86 124,91 127,82" fill="#00d2ff" />
            
            {/* Loop points */}
            <circle cx="70" cy="35" r="3" fill="#e2231a" />
            <text x="65" y="27" fill="#e2231a" fontSize="8" fontFamily="monospace">1 (T_high)</text>

            <circle cx="180" cy="60" r="3" fill="#888" />
            <text x="187" y="58" fill="#888" fontSize="8" fontFamily="monospace">2</text>

            <circle cx="80" cy="90" r="3" fill="#00d2ff" />
            <text x="80" y="101" fill="#00d2ff" fontSize="8" fontFamily="monospace">3 (T_low)</text>

            {/* Carnot Energy Heat interactions */}
            <path d="M 120,10 L 120,38" fill="none" stroke="#e2231a" strokeWidth="1.5" strokeDasharray="3,2" />
            <polygon points="120,38 117,33 123,33" fill="#e2231a" />
            <text x="130" y="18" fill="#e2231a" fontSize="8" fontFamily="monospace" fontWeight="bold">Heat In (Q_in)</text>

            <path d="M 110,83 L 110,102" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3,2" />
            <polygon points="110,102 113,97 107,97" fill="#00d2ff" />
            <text x="120" y="99" fill="#00d2ff" fontSize="8" fontFamily="monospace" fontWeight="bold">Heat Out</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Thermal Efficiency Limit (Carnot Ratio): <code className="text-emerald-400 font-mono">η = 1 - T_cold / T_hot</code>
          </span>
        </div>
      );

    case 'spring':
      return (
        <div id={`diag-spring-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            DIAGRAM: MECHANICAL STEADY STATE VIBRATION
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Top Ceiling */}
            <line x1="80" y1="15" x2="220" y2="15" stroke="#444" strokeWidth="3" />
            <line x1="90" y1="8" x2="100" y2="15" stroke="#444" strokeWidth="1" />
            <line x1="120" y1="8" x2="130" y2="15" stroke="#444" strokeWidth="1" />
            <line x1="150" y1="8" x2="160" y2="15" stroke="#444" strokeWidth="1" />
            <line x1="180" y1="8" x2="190" y2="15" stroke="#444" strokeWidth="1" />
            <line x1="210" y1="8" x2="220" y2="15" stroke="#444" strokeWidth="1" />
            
            {/* Spring 1 k1 */}
            <path d="M 110,15 L 110,25 L 115,30 L 105,35 L 115,40 L 105,45 L 115,50 L 105,55 L 110,60 L 110,70" fill="none" stroke="#00d2ff" strokeWidth="2" />
            <text x="90" y="42" fill="#00d2ff" fontSize="9" fontFamily="monospace">Stiffness k1</text>
            
            {/* Spring 2 k2 */}
            <path d="M 190,15 L 190,25 L 195,30 L 185,35 L 195,40 L 185,45 L 195,50 L 185,55 L 190,60 L 190,70" fill="none" stroke="#e2231a" strokeWidth="2" />
            <text x="205" y="42" fill="#e2231a" fontSize="9" fontFamily="monospace">Stiffness k2</text>
            
            {/* Solid Mass Plate */}
            <rect x="80" y="70" width="140" height="20" fill="rgba(255,255,255,0.06)" stroke="#888" strokeWidth="1.5" />
            <text x="150" y="83" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">STEADY MASS (M)</text>
            
            {/* Oscillation arrow */}
            <path d="M 150,96 L 150,112" fill="none" stroke="#00d2ff" strokeWidth="1.5" />
            <polygon points="150,115 146,108 154,108" fill="#00d2ff" />
            <polygon points="150,93 146,100 154,100" fill="#00d2ff" />
            <text x="160" y="108" fill="#00d2ff" fontSize="8" fontFamily="monospace">x(t) Motion</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Parallel Connection Rate Model: <code className="text-emerald-400 font-mono">K_eq = k₁ + k₂</code> · Natural Speed: <code className="text-emerald-400 font-mono">ω_n = √(K_eq / M)</code>
          </span>
        </div>
      );

    case 'cylinder':
      return (
        <div id={`diag-cylinder-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            SCHEMATIC: THIN CYLINDER HYDROSTATIC STRESS TENSOR
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Pressure cylinder ring outline */}
            <ellipse cx="150" cy="60" rx="75" ry="32" fill="rgba(255,255,255,0.01)" stroke="#3e3e3e" strokeWidth="3" />
            <ellipse cx="150" cy="60" rx="70" ry="28" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="2,2" />
            
            {/* Wall thickness callout */}
            <line x1="225" y1="60" x2="245" y2="60" stroke="#888" strokeWidth="1" />
            <circle cx="225" cy="60" r="2" fill="#888" />
            <text x="250" y="63" fill="#888" fontSize="8" fontFamily="monospace">Thickness (t)</text>
            
            {/* Internal pressure load ticks */}
            <line x1="150" y1="60" x2="150" y2="35" stroke="#e2231a" strokeWidth="1.5" />
            <polygon points="150,35 147,40 153,40" fill="#e2231a" />
            
            <line x1="150" y1="60" x2="150" y2="85" stroke="#e2231a" strokeWidth="1.5" />
            <polygon points="150,85 147,80 153,80" fill="#e2231a" />
            
            <line x1="150" y1="60" x2="105" y2="60" stroke="#e2231a" strokeWidth="1.5" />
            <polygon points="105,60 110,57 110,63" fill="#e2231a" />
            
            <line x1="150" y1="60" x2="195" y2="60" stroke="#e2231a" strokeWidth="1.5" />
            <polygon points="195,60 190,57 190,63" fill="#e2231a" />
            
            <circle cx="150" cy="60" r="10" fill="#050505" stroke="#e2231a" strokeWidth="1" />
            <text x="150" y="63" fill="#e2231a" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">P_int</text>
            
            {/* Hoop Stress arrows */}
            <path d="M 150,22 L 170,22" fill="none" stroke="#00d2ff" strokeWidth="2" />
            <polygon points="173,22 167,19 167,25" fill="#00d2ff" />
            <path d="M 150,22 L 130,22" fill="none" stroke="#00d2ff" strokeWidth="2" />
            <polygon points="127,22 133,19 133,25" fill="#00d2ff" />
            <text x="150" y="15" fill="#00d2ff" fontSize="8" fontFamily="monospace" textAnchor="middle">Hoop Stress (σ_h)</text>
            
            {/* Diameter annotation */}
            <line x1="75" y1="60" x2="130" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="75" y="105" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Diameter (D)</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Primary Hoop Stress Limit: <code className="text-emerald-400 font-mono">σ_h = P·D / (2·t)</code> · Longitudinal: <code className="text-emerald-400 font-mono">σ_l = P·D / (4·t)</code>
          </span>
        </div>
      );

    case 'robot':
      return (
        <div id={`diag-robot-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            SCHEMATIC: ROBOTIC KINEMATICS JOINT TRANSFORMS
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Base platform */}
            <rect x="30" y="90" width="40" height="15" rx="3" fill="#222" stroke="#444" strokeWidth="1.5" />
            <line x1="50" y1="90" x2="50" y2="70" stroke="#00d2ff" strokeWidth="3" />
            
            {/* Joint 1 Rotator */}
            <circle cx="50" cy="70" r="8" fill="#111" stroke="#e2231a" strokeWidth="2" />
            <path d="M 40,78 A 12,12 0 0,1 42,60" fill="none" stroke="#e2231a" strokeWidth="1" />
            <polygon points="42,60 38,65 46,65" fill="#e2231a" />
            <text x="25" y="73" fill="#e2231a" fontSize="8" fontFamily="monospace">θ1 Joint</text>
            
            {/* Link 1 */}
            <line x1="50" y1="70" x2="130" y2="45" stroke="#00d2ff" strokeWidth="3.5" />
            
            {/* Joint 2 Rotator */}
            <circle cx="130" cy="45" r="7" fill="#111" stroke="#e2231a" strokeWidth="2" />
            <text x="125" y="33" fill="#e2231a" fontSize="8" fontFamily="monospace">θ2 Joint</text>
            
            {/* Link 2 */}
            <line x1="130" y1="45" x2="210" y2="65" stroke="#00d2ff" strokeWidth="2.5" />
            
            {/* End Effector */}
            <polygon points="210,65 218,58 222,65 218,72" fill="#fff" stroke="#444" strokeWidth="1" />
            <text x="230" y="68" fill="#fff" fontSize="8" fontFamily="monospace" fontWeight="bold">Manipulator X_e, Y_e</text>
            
            {/* Coordinate systems indicator */}
            <line x1="30" y1="105" x2="30" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="30" y1="105" x2="55" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="25" y="85" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">Z₀</text>
            <text x="56" y="108" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">X₀</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            D-H Transform Matrices Product Layout: <code className="text-emerald-400 font-mono">T = T₁¹ · T₂² · T₃³</code>
          </span>
        </div>
      );

    default:
      return (
        <div id={`diag-default-${questionId}`} className="border border-white/5 bg-zinc-950/85 p-4 rounded-lg flex flex-col items-center justify-center space-y-3 shadow-inner h-60 relative overflow-hidden group">
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-widest text-[#e2231a] font-extrabold bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2231a]" />
            DIAGRAM: MECHANICAL SCHEMATIC SYSTEM FIELD
          </div>

          <svg className="w-full h-32" viewBox="0 0 300 120">
            {/* Abstract technical blueprints background */}
            <line x1="10" y1="10" x2="290" y2="110" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <line x1="10" y1="110" x2="290" y2="10" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <circle cx="150" cy="60" r="40" fill="none" stroke="rgba(226,35,26,0.04)" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Glowing conceptual network node */}
            <rect x="90" y="45" width="120" height="30" rx="3" fill="rgba(226,35,26,0.03)" stroke="rgba(226,35,26,0.2)" strokeWidth="1.5" />
            <line x1="150" y1="45" x2="150" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="150" y1="75" x2="150" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            
            <circle cx="150" cy="15" r="4" fill="#00d2ff" />
            <circle cx="150" cy="105" r="4" fill="#e2231a" />
            
            <text x="150" y="63" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Socratic Challenge {questionId}</text>
            <text x="150" y="27" fill="#00d2ff" fontSize="7" fontFamily="monospace" textAnchor="middle">INLET VECTOR</text>
            <text x="150" y="99" fill="#e2231a" fontSize="7" fontFamily="monospace" textAnchor="middle">OUTLET DISSIPATION</text>
          </svg>

          <span className="text-[10px] text-zinc-500 font-sans text-center leading-relaxed">
            Analytical System: <code className="text-emerald-400 font-mono">{subject || "Mechanical Process"}</code>
          </span>
        </div>
      );
  }
}
