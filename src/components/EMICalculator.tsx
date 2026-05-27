import React, { useState } from 'react';
import { Landmark, Settings, Flame, Layers, Info, CheckCircle, Database } from 'lucide-react';
import { EXTENSIBLE_FORMULAS } from '../data';

interface EMICalculatorProps {
  initialBikeId?: string;
  onClose?: () => void;
}

export default function EMICalculator({ initialBikeId, onClose }: EMICalculatorProps) {
  const [activeTab, setActiveTab] = useState<'beam' | 'formulas'>('beam');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>("formula-1");
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Beam Simulator inputs
  const [beamLoad, setBeamLoad] = useState<number>(15); // P (kN or kips)
  const [beamLength, setBeamLength] = useState<number>(6); // L (meters or feet)
  const [elasticModulus, setElasticModulus] = useState<number>(200); // E (GPa or Mpsi)
  const [areaInertia, setAreaInertia] = useState<number>(45); // I (10^-8 m^4 or in^4)
  const [beamType, setBeamType] = useState<'cantilever' | 'simply-supported'>('cantilever');

  // Interactive dynamic unit conversions
  const handleUnitSystemToggle = (newSystem: 'metric' | 'imperial') => {
    if (newSystem === unitSystem) return;

    if (newSystem === 'imperial') {
      // Metric to Imperial
      const imperialLoad = Math.max(0.2, Math.min(11, parseFloat((beamLoad * 0.224809).toFixed(2))));
      const imperialLength = Math.max(6, Math.min(40, parseFloat((beamLength * 3.28084).toFixed(1))));
      const imperialModulus = Math.max(10, Math.min(32, parseFloat((elasticModulus * 0.145038).toFixed(1))));
      const imperialInertia = Math.max(0.2, Math.min(6, parseFloat((areaInertia * 0.0240251).toFixed(2))));

      setBeamLoad(imperialLoad);
      setBeamLength(imperialLength);
      setElasticModulus(imperialModulus);
      setAreaInertia(imperialInertia);
    } else {
      // Imperial to Metric
      const metricLoad = Math.max(1, Math.min(50, Math.round(beamLoad * 4.44822)));
      const metricLength = Math.max(2, Math.min(12, parseFloat((beamLength * 0.3048).toFixed(1))));
      const metricModulus = Math.max(70, Math.min(220, Math.round(elasticModulus * 6.89476)));
      const metricInertia = Math.max(10, Math.min(150, Math.round(areaInertia * 41.6233)));

      setBeamLoad(metricLoad);
      setBeamLength(metricLength);
      setElasticModulus(metricModulus);
      setAreaInertia(metricInertia);
    }
    setUnitSystem(newSystem);
  };

  // Generic calculations inputs
  const [inputs, setInputs] = useState<Record<string, number>>({
    v1: 34.31,
    u: 15.78,
    k: 0.9,
    beta: 15, // degrees
    x: 40,
    y: 10,
    Ta: 20,
    Tb: 30,
    V: 120,
    n: 0.5,
    C: 150,
    T1: 300,
    P1: 100,
    P2: 600,
    gamma: 1.4,
    Twist: 500, // N-m
    r: 25, // mm
    J: 98174, // mm^4
    g: 9.81,
    delta: 0.4 // mm
  });

  const activeFormula = EXTENSIBLE_FORMULAS.find(f => f.id === selectedFormulaId) || EXTENSIBLE_FORMULAS[0];

  const handleInputChange = (key: string, val: string) => {
    const num = parseFloat(val);
    setInputs(prev => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num
    }));
  };

  // Compute Euler-Bernoulli Maximum Deflection
  // Cantilever end-load: delta = (P * L^3) / (3 * E * I)
  // Simply supported central-load: delta = (P * L^3) / (48 * E * I)
  const computeBeamDeflection = () => {
    const denominatorFactor = beamType === 'cantilever' ? 3 : 48;

    if (unitSystem === 'metric') {
      const pNewtons = beamLoad * 1000;
      const lMeters = beamLength;
      const ePa = elasticModulus * 1e9;
      const iM4 = areaInertia * 1e-8;

      const numerator = pNewtons * Math.pow(lMeters, 3);
      const denominator = denominatorFactor * ePa * iM4;

      if (denominator === 0) return 0;
      const valInMeters = numerator / denominator;
      return valInMeters * 1000; // Return in mm
    } else {
      // Imperial system
      // P in kips -> convert to lbs: beamLoad * 1000
      // L in feet -> convert to inches: beamLength * 12
      // E in Mpsi -> convert to psi: elasticModulus * 110^6
      // I in in⁴ -> directly areaInertia
      const pLbs = beamLoad * 1000;
      const lInches = beamLength * 12;
      const ePsi = elasticModulus * 1e6;
      const iIn4 = areaInertia;

      const numerator = pLbs * Math.pow(lInches, 3);
      const denominator = denominatorFactor * ePsi * iIn4;

      if (denominator === 0) return 0;
      return numerator / denominator; // Return in inches
    }
  };

  const currentDeflection = computeBeamDeflection();

  // Performance computations for other textbook formulas
  const calculateResult = () => {
    try {
      if (activeFormula.id === "formula-1") {
        const { v1, u, k, beta } = inputs;
        if (v1 === 0) return "0.00 %";
        const betaRad = (beta * Math.PI) / 180;
        const eff = (2 * (v1 - u) * (1 + k * Math.cos(betaRad)) * u) / (v1 * v1);
        return `${(Math.max(0, eff) * 100).toFixed(2)} %`;
      }
      if (activeFormula.id === "formula-2") {
        const { x, y, Ta, Tb } = inputs;
        if (Tb === 0) return "Undefined Ratio";
        const Na = x + y;
        const Nb = (x - y * (Ta / Tb)).toFixed(2);
        return `N_a = ${Na} RPM || N_b = ${Nb} RPM`;
      }
      if (activeFormula.id === "formula-3") {
        const { V, n, C } = inputs;
        if (V === 0 || n === 0) return "0.00 mins";
        const T = Math.pow(C / V, 1 / n);
        return `${T.toFixed(2)} mins`;
      }
      if (activeFormula.id === "formula-4") {
        const { T1, P1, P2, gamma } = inputs;
        if (P1 === 0 || gamma === 0 || gamma === 1) return `0.00 K`;
        const T2 = T1 * Math.pow(P2 / P1, (gamma - 1) / gamma);
        return `${T2.toFixed(2)} K`;
      }
      if (activeFormula.id === "formula-5") {
        return `${currentDeflection.toFixed(4)} ${unitSystem === 'metric' ? 'mm' : 'in'}`;
      }
      if (activeFormula.id === "formula-6") {
        const { Twist, r, J } = inputs;
        if (J === 0) return "0.00 strain";
        const strain = (Twist * 1000 * r) / (J * 80e9);
        return `${strain.toExponential(4)} strain`;
      }
      if (activeFormula.id === "formula-7") {
        const { g, delta } = inputs;
        if (delta === 0) return "0.00 Hz";
        const deltaMeters = delta / 1000;
        const fn = (1 / (2 * Math.PI)) * Math.sqrt(g / deltaMeters);
        return `${fn.toFixed(2)} Hz`;
      }
      return "0.00";
    } catch (e) {
      return "Calculation Error";
    }
  };

  return (
    <div className="bg-[#111] border-2 border-white/10 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden" id="beam-deflection-terminal">
      {/* Design accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Component Title & Navbar Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <Landmark className="text-red-500 w-8 h-8 shrink-0" />
          <div>
            <h3 className="font-bebas text-3xl md:text-4xl tracking-wider text-white">
              STRUCTURAL DESIGN SOLVER & DOCK
            </h3>
            <p className="text-sm md:text-base text-zinc-200 font-mono font-bold tracking-wide">Euler-Bernoulli Elastic Flexure & Academic Dynamic Formulary</p>
          </div>
        </div>

        {/* Big Switch Tabs */}
        <div className="flex gap-2 bg-neutral-950 p-1.5 border border-white/5 rounded-lg text-xs leading-none">
          <button
            onClick={() => setActiveTab('beam')}
            className={`px-4 py-2 rounded-md font-condensed font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'beam'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Beam Deflection Lab
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2 rounded-md font-condensed font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'formulas'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Formulary Solvers
          </button>
        </div>
      </div>

      {activeTab === 'beam' ? (
        /* TAB 1: EULER-BERNOULLI BEAM DEFLECTION LAB WITH VISUAL VECTOR DRAWING */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: sliders (5 columns) */}
          <div className="lg:col-span-5 space-y-6 bg-black/40 p-5 rounded-lg border border-white/5 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Structural Configuration</span>
                <div className="inline-flex rounded-md bg-stone-900 border border-white/5 p-1 text-[10px] font-mono uppercase">
                  <button
                    onClick={() => setBeamType('cantilever')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${beamType === 'cantilever' ? 'bg-red-600 text-white font-bold' : 'text-zinc-500'}`}
                  >
                    Cantilever
                  </button>
                  <button
                    onClick={() => setBeamType('simply-supported')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${beamType === 'simply-supported' ? 'bg-red-600 text-white font-bold' : 'text-zinc-500'}`}
                  >
                    Simply-Supported
                  </button>
                </div>
              </div>

              {/* Dynamic Unit System Toggle Row */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Standard Unit System</span>
                <div className="inline-flex rounded-md bg-stone-900 border border-white/5 p-1 text-[10px] font-mono uppercase">
                  <button
                    onClick={() => handleUnitSystemToggle('metric')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${unitSystem === 'metric' ? 'bg-red-600 text-white font-bold' : 'text-zinc-500'}`}
                  >
                    Metric (S.I.)
                  </button>
                  <button
                    onClick={() => handleUnitSystemToggle('imperial')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${unitSystem === 'imperial' ? 'bg-red-600 text-white font-bold' : 'text-zinc-500'}`}
                  >
                    Imperial (U.S.)
                  </button>
                </div>
              </div>

              {/* Sliders with direct large typography labels */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5 font-bold">
                    <span className="uppercase text-white font-bold">Concentrated Load (P):</span>
                    <span className="text-red-500 font-bold">
                      {unitSystem === 'metric' ? `${beamLoad} kN` : `${beamLoad} kips`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === 'metric' ? "1" : "0.2"}
                    max={unitSystem === 'metric' ? "50" : "11"}
                    step={unitSystem === 'metric' ? "1" : "0.1"}
                    value={beamLoad}
                    onChange={(e) => setBeamLoad(Number(e.target.value))}
                    className="w-full h-2 accent-red-600 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 block font-bold leading-relaxed mt-1">
                    {unitSystem === 'metric' 
                      ? "Mechanical point-load force vector applied normal to beam line (in Kilonewtons)."
                      : "Mechanical point-load force vector applied normal to beam line (in Kilopounds / kips)."}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5 font-bold">
                    <span className="uppercase text-white font-bold">Span length (L):</span>
                    <span className="text-red-500 font-bold">
                      {unitSystem === 'metric' ? `${beamLength} meters` : `${beamLength} feet`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === 'metric' ? "2" : "6"}
                    max={unitSystem === 'metric' ? "12" : "40"}
                    step="0.5"
                    value={beamLength}
                    onChange={(e) => setBeamLength(Number(e.target.value))}
                    className="w-full h-2 accent-red-600 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 block font-bold leading-relaxed mt-1">
                    {unitSystem === 'metric'
                      ? "Total unsupported length of the beam elements in meters."
                      : "Total unsupported length of the beam elements in feet."}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5 font-bold">
                    <span className="uppercase text-white font-bold">Elastic Modulus (E):</span>
                    <span className="text-red-500 font-bold">
                      {unitSystem === 'metric' ? `${elasticModulus} GPa` : `${elasticModulus} Mpsi`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === 'metric' ? "70" : "10"}
                    max={unitSystem === 'metric' ? "220" : "32"}
                    step={unitSystem === 'metric' ? "5" : "0.5"}
                    value={elasticModulus}
                    onChange={(e) => setElasticModulus(Number(e.target.value))}
                    className="w-full h-2 accent-red-600 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 font-bold block mt-1">
                    {unitSystem === 'metric'
                      ? "Material stiffness parameter (e.g., Structural Mild Steel: ~200 GPa, Aluminum: ~70 GPa)."
                      : "Material stiffness parameter (e.g., Structural Mild Steel: ~29 Mpsi, Aluminum: ~10 Mpsi)."}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5 font-bold">
                    <span className="uppercase text-white font-bold">Area Moment of Inertia (I):</span>
                    <span className="text-red-500 font-bold">
                      {unitSystem === 'metric' ? `${areaInertia} × 10⁻⁸ m⁴` : `${areaInertia} in⁴`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === 'metric' ? "10" : "0.2"}
                    max={unitSystem === 'metric' ? "150" : "6"}
                    step={unitSystem === 'metric' ? "2" : "0.1"}
                    value={areaInertia}
                    onChange={(e) => setAreaInertia(Number(e.target.value))}
                    className="w-full h-2 accent-red-600 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 font-bold block mt-1">
                    {unitSystem === 'metric'
                      ? "Second moment of area of the beam's cross-section in centimeters to the fourth power."
                      : "Second moment of area of the beam's cross-section in inches to the fourth power."}
                  </span>
                </div>
              </div>

            </div>

            {/* Live Euler Bernoulli Equation block */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-sm md:text-base font-mono">
              <span className="text-xs text-[#A52A2A] font-extrabold uppercase block mb-1">Primary Kinematic Relation</span>
              <p className="text-zinc-300 leading-relaxed font-sans mb-2 font-medium">
                The absolute deflection curves inside these elastic components are governed by solving integration boundary conditions:
              </p>
              <div className="bg-neutral-950 p-3 text-center rounded text-sm md:text-base text-red-400 font-bold">
                {beamType === 'cantilever' 
                  ? "δ_max = (P * L³) / (3 * E * I)" 
                  : "δ_max = (P * L³) / (48 * E * I)"
                }
              </div>
            </div>

          </div>

          {/* Right panel: Live SVG Beam deflection drawing & Output (7 columns) */}
          <div className="lg:col-span-7 bg-[#0b0b0b] p-6 border-2 border-white/10 rounded-lg flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5 text-xs font-mono text-zinc-400">
                <span>Vector Static Analysis</span>
                <span className="text-emerald-400">STATUS: SOLVED</span>
              </div>

              {/* Physical Beam Graphic Frame */}
              <div className="h-44 bg-zinc-950 rounded-lg border border-white/5 flex flex-col items-center justify-center p-4 relative shadow-inner overflow-hidden">
                <span className="absolute top-2 left-2 text-xs font-mono text-zinc-400 uppercase">Interactive Flexural Render</span>
                
                <svg viewBox="0 0 240 120" className="w-full h-full">
                  {/* WALL ANCHOR SUPPORT RENDER */}
                  {beamType === 'cantilever' ? (
                    <g>
                      {/* Grey hashed wall background */}
                      <rect x="25" y="30" width="10" height="60" fill="#222" />
                      <line x1="35" y1="20" x2="35" y2="100" stroke="#fff" strokeWidth="3" />
                      {[25, 35, 45, 55, 65, 75, 85, 95].map(y => (
                        <line key={y} x1="25" y1={y-10} x2="35" y2={y} stroke="#555" strokeWidth="1" />
                      ))}
                    </g>
                  ) : (
                    // Simply-Supported supports (Triangles on ends)
                    <g>
                      {/* Left pivot */}
                      <polygon points="40,80 34,92 46,92" fill="#555" stroke="#fff" strokeWidth="1" />
                      {/* Right rollers */}
                      <polygon points="200,80 194,92 206,92" fill="#555" stroke="#fff" strokeWidth="1" />
                      <circle cx="197" cy="94" r="2" fill="#fff" />
                      <circle cx="203" cy="94" r="2" fill="#fff" />
                    </g>
                  )}

                  {/* FLEXED ELASTIC BEAM PATH */}
                  {(() => {
                    // Maximum visual deflection scale
                    const visDeflectionMM = unitSystem === 'metric' ? currentDeflection : currentDeflection * 25.4;
                    const maxVis = Math.min(32, visDeflectionMM * 1.5);
                    
                    let pathD = "";
                    let loadArrowX = 200;
                    let loadArrowY = 60;

                    if (beamType === 'cantilever') {
                      // Cantilever: left end fixed, right end deflected maximum
                      const bx = 35;
                      const by = 60;
                      // Cubic bezier path: standard deflection curves start horizontal (control handles)
                      pathD = `M ${bx} ${by} C ${bx + 60} ${by}, 150 ${by + maxVis * 0.5}, 200 ${by + maxVis}`;
                      loadArrowX = 200;
                      loadArrowY = by + maxVis;
                    } else {
                      // Simply supported: both ends fixed heights at (40, 60) and (200, 60), center is deflected maximum
                      const bx = 40;
                      const by = 60;
                      const centerDef = by + maxVis;
                      pathD = `M ${bx} ${by} Q 120 ${centerDef * 1.2} 200 ${by}`;
                      loadArrowX = 120;
                      loadArrowY = by + maxVis * 0.7; // Arrow points to center
                    }

                    return (
                      <g>
                        {/* Ref straight beam template for context */}
                        <line x1={beamType === 'cantilever' ? 35 : 40} y1="60" x2="200" y2="60" stroke="#1c1918" strokeWidth="6" strokeDasharray="2,2" />

                        {/* Deflected beam path */}
                        <path d={pathD} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                        <path d={pathD} fill="none" stroke="#e2231a" strokeWidth="2" strokeLinecap="round" />

                        {/* LOAD P FORCE VECTOR VECTOR ARROW */}
                        <g transform={`translate(${loadArrowX}, ${loadArrowY - 26})`}>
                          <line x1="0" y1="0" x2="0" y2="20" stroke="#3b82f6" strokeWidth="2.5" />
                          <polygon points="-4,16 4,16 0,22" fill="#3b82f6" />
                          <text x="6" y="8" fill="#3b82f6" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Load P</text>
                        </g>

                        {/* Text values */}
                        <text x="210" y="65" fill="#777" fontSize="7" fontFamily="monospace">x-axis</text>
                      </g>
                    );
                  })()}
                </svg>

                <div className="absolute bottom-2 right-4 text-xs text-zinc-400 font-mono">
                  Scale x10 Zoom
                </div>
              </div>

              {/* Solved maximum deflection box with massive text */}
              <div className="mt-6 flex flex-col md:flex-row items-stretch gap-4">
                
                <div className="flex-1 bg-stone-900 border border-emerald-500/20 rounded-lg p-4 text-center relative overflow-hidden">
                  <span className="absolute top-2 left-2 text-[11px] font-mono text-emerald-400 font-extrabold tracking-widest uppercase">
                    MAXIMUM DEFLECTION (δ_max)
                  </span>
                  <div className="text-zinc-400 text-xs font-mono mt-2 mb-1">OUTERMOST ELASTIC BOUNDARY</div>
                  <div className="text-3xl md:text-4xl text-emerald-400 font-mono font-bold tracking-wider leading-none">
                    {currentDeflection.toFixed(4)} <span className="text-sm font-sans text-stone-400 shrink-0 font-normal">{unitSystem === 'metric' ? 'mm' : 'in'}</span>
                  </div>
                </div>

                <div className="flex-1 bg-stone-900 border border-white/5 rounded-lg p-4 space-y-2.5 text-sm md:text-base text-zinc-300">
                  <span className="text-red-500 font-mono font-extrabold uppercase tracking-widest text-[11px]">Syllabus Quality Metrics</span>
                  <p className="text-zinc-300 leading-relaxed font-sans font-medium">
                    Structural limit regulations state that the maximum span deflection should remain securely below:
                    <code className="block bg-neutral-950 p-1 font-mono text-xs rounded text-white mt-1 text-center">
                      {unitSystem === 'metric' ? (
                        `δ_limit = L / 360 = ${(beamLength * 1000 / 360).toFixed(2)} mm`
                      ) : (
                        `δ_limit = L_inches / 360 = ${(beamLength * 12 / 360).toFixed(4)} in`
                      )}
                    </code> 
                    {(() => {
                      const limit = unitSystem === 'metric' ? (beamLength * 1000 / 360) : (beamLength * 12 / 360);
                      return currentDeflection < limit ? (
                        <span className="text-emerald-400 font-bold block mt-1">✓ STRUCTURE IS SAFE (Within limits)</span>
                      ) : (
                        <span className="text-red-500 font-bold block mt-1">⚠️ CRITICAL: Structural deflection limits breached!</span>
                      );
                    })()}
                  </p>
                </div>

              </div>

            </div>

            <div className="flex items-center gap-2 mt-4 text-xs md:text-sm text-zinc-400 font-sans border-t border-white/5 pt-4 font-semibold">
              <Info size={12} className="text-red-500" />
              <span>Use parameters solver to model structures safely without physical catastrophic buckling fatigue load failures.</span>
            </div>
          </div>

        </div>
      ) : (
        /* TAB 2: GENERAL SYLLABUS FORMULARY DICTIONARY (RESTORED ACCORDING TO DATA.TS) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left selectors */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-condensed tracking-widest font-extrabold text-zinc-400 uppercase flex items-center gap-2 mb-2">
              <Database size={13} className="text-red-500" /> Choose Textbook Formula
            </h4>
            <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
              {EXTENSIBLE_FORMULAS.map(formula => (
                <button
                  key={formula.id}
                  id={`formulasolver-${formula.id}`}
                  onClick={() => setSelectedFormulaId(formula.id)}
                  className={`p-3 text-left border rounded transition-all flex flex-col justify-between cursor-pointer ${
                    selectedFormulaId === formula.id
                      ? 'bg-red-600/20 border-red-600 text-white'
                      : 'bg-zinc-900 border-white/5 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span className="text-xs font-condensed tracking-wider font-extrabold uppercase leading-tight truncate">
                    {formula.name}
                  </span>
                  <span className="text-xs font-mono mt-1 font-semibold text-zinc-400">
                    Syllabus: {formula.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right solvers panel */}
          <div className="lg:col-span-7 bg-[#0b0b0b] p-6 border-2 border-white/10 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5 text-xs font-mono text-zinc-400">
                <span>Calculative Solvers</span>
                <span>Port: 3000 // CORE_C2</span>
              </div>

              {/* Display equation math box */}
              <div className="p-4 bg-black/60 border border-white/5 rounded font-mono text-center mb-5 relative">
                <span className="absolute top-2 left-2 text-xs text-[#A52A2A] font-extrabold tracking-widest">FORMULA EXPRESSION</span>
                <div className="py-2 text-red-500 text-sm md:text-lg font-bold">
                  {activeFormula.equation}
                </div>
              </div>

              {/* Dynamic input entries depending on active formula selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                
                {activeFormula.id === "formula-1" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">V_1 (Jet Speed m/s)</label>
                      <input
                        type="number"
                        value={inputs.v1}
                        onChange={(e) => handleInputChange('v1', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">u (Bucket Speed m/s)</label>
                      <input
                        type="number"
                        value={inputs.u}
                        onChange={(e) => handleInputChange('u', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">k (Friction Factor)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={inputs.k}
                        onChange={(e) => handleInputChange('k', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">β (Bucket Angle °)</label>
                      <input
                        type="number"
                        value={inputs.beta}
                        onChange={(e) => handleInputChange('beta', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                  </>
                )}

                {activeFormula.id === "formula-2" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">x parameter</label>
                      <input
                        type="number"
                        value={inputs.x}
                        onChange={(e) => handleInputChange('x', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">y parameter</label>
                      <input
                        type="number"
                        value={inputs.y}
                        onChange={(e) => handleInputChange('y', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">T_a (Sun Teeth)</label>
                      <input
                        type="number"
                        value={inputs.Ta}
                        onChange={(e) => handleInputChange('Ta', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">T_b (Planet Teeth)</label>
                      <input
                        type="number"
                        value={inputs.Tb}
                        onChange={(e) => handleInputChange('Tb', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                  </>
                )}

                {activeFormula.id === "formula-3" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">V (Speed m/min)</label>
                      <input
                        type="number"
                        value={inputs.V}
                        onChange={(e) => handleInputChange('V', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">n (Taylor Exponent)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={inputs.n}
                        onChange={(e) => handleInputChange('n', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <div>
                        <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">C (Tool Life Constant)</label>
                        <input
                          type="number"
                          value={inputs.C}
                          onChange={(e) => handleInputChange('C', e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeFormula.id === "formula-4" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">T_1 (Initial Temp K)</label>
                      <input
                        type="number"
                        value={inputs.T1}
                        onChange={(e) => handleInputChange('T1', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">γ (Adiabatic ratio)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={inputs.gamma}
                        onChange={(e) => handleInputChange('gamma', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">P_1 (Pressure 1 kPa)</label>
                      <input
                        type="number"
                        value={inputs.P1}
                        onChange={(e) => handleInputChange('P1', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">P_2 (Pressure 2 kPa)</label>
                      <input
                        type="number"
                        value={inputs.P2}
                        onChange={(e) => handleInputChange('P2', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                  </>
                )}

                {activeFormula.id === "formula-5" && (
                  <div className="col-span-2">
                    <p className="text-zinc-400 font-sans text-xs italic">
                      Note: To compute Beam Deflections, please use the designated visual &quot;Beam Deflection Lab&quot; tab above with complete material slider overlays (currently in <strong className="text-white uppercase">{unitSystem}</strong> units)!
                    </p>
                  </div>
                )}

                {activeFormula.id === "formula-6" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">Twist Torque (N-m)</label>
                      <input
                        type="number"
                        value={inputs.Twist}
                        onChange={(e) => handleInputChange('Twist', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">Radius r (mm)</label>
                      <input
                        type="number"
                        value={inputs.r}
                        onChange={(e) => handleInputChange('r', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <div>
                        <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">Polar J (mm⁴)</label>
                        <input
                          type="number"
                          value={inputs.J}
                          onChange={(e) => handleInputChange('J', e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeFormula.id === "formula-7" && (
                  <>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">g Acceleration (m/s²)</label>
                      <input
                        type="number"
                        value={inputs.g}
                        onChange={(e) => handleInputChange('g', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 uppercase font-mono mb-1.5 font-bold">δ Static deflection (mm)</label>
                      <input
                        type="number"
                        value={inputs.delta}
                        onChange={(e) => handleInputChange('delta', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 text-white rounded p-1.5 text-xs font-mono outline-none"
                      />
                    </div>
                  </>
                )}

              </div>
            </div>

            <div>
              {/* Output coefficient with big fonts */}
              <div className="p-4 bg-zinc-950 border border-emerald-500/20 text-center rounded relative overflow-hidden mb-2">
                <span className="text-xs font-mono tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded absolute top-2 right-2">
                  SOLVER_OUTPUT
                </span>
                <div className="text-zinc-400 text-xs font-mono mb-1 uppercase">Computed Parameter</div>
                <div className="text-2xl md:text-3xl text-emerald-400 font-mono font-bold leading-none tracking-wider">
                  {calculateResult()}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
