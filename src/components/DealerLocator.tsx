import React, { useState, useEffect } from 'react';
import { Compass, RotateCw, Play, Pause, Info, HelpCircle, RefreshCw, Layers } from 'lucide-react';

export default function DealerLocator() {
  const [mechanismType, setMechanismType] = useState<'slider-crank' | 'four-bar'>('slider-crank');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [theta, setTheta] = useState<number>(0); // Angle in degrees
  const [crankRadius, setCrankRadius] = useState<number>(35); // r (mm)
  const [rodLength, setRodLength] = useState<number>(100); // l (mm)
  const [omega, setOmega] = useState<number>(3); // Rotational velocity coefficient (deg / interval)

  // Autoplay kinematics loop
  useEffect(() => {
    let animFrame: number;
    const tick = () => {
      if (isPlaying) {
        setTheta((prev) => (prev + omega) % 360);
      }
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying, omega]);

  // Calculations for Slider Crank mechanism
  const thetaRad = (theta * Math.PI) / 180;
  
  // Crank axle center: (50, 100) on SVG
  const cx = 50;
  const cy = 100;
  
  // Crankpin coordinates
  const cpx = cx + crankRadius * Math.cos(thetaRad);
  const cpy = cy + crankRadius * Math.sin(thetaRad);

  // Slider coordinates: constrained horizontally to y = cy
  // l^2 = (xs - cpx)^2 + (cy - cpy)^2
  // (xs - cpx) = sqrt(l^2 - (cpy - cy)^2)
  // xs = cpx + sqrt(l^2 - (cpy - cy)^2)
  const radVal = rodLength * rodLength - (cpy - cy) * (cpy - cy);
  const sliderX = cpx + Math.sqrt(Math.max(0, radVal));

  // Velocity of piston approximation: v_p = ω * r * (sin θ + sin(2θ) / (2 * (l/r)))
  const ratio = rodLength / (crankRadius || 1);
  const pistonVelocity = omega * 0.1 * crankRadius * (Math.sin(thetaRad) + Math.sin(2 * thetaRad) / (2 * ratio));
  const pistonDisplacement = crankRadius * (1 - Math.cos(thetaRad) + (ratio - Math.sqrt(ratio * ratio - Math.sin(thetaRad) * Math.sin(thetaRad))));

  // Calculations for Four-Bar Linkage representation
  // Driver crank: cx, cy -> cpx, cpy
  // Coupler: cpx, cpy -> jointX, jointY
  // Follower lever: jointX, jointY -> baseAuxX, baseAuxY (140, 100)
  const baseAuxX = cx + 80;
  const baseAuxY = cy;
  
  // Simple trigonometric path mapping for joint coordinate to keep linkage stable
  const couplerAngle = 0.5 * Math.sin(thetaRad);
  const followerLength = 50;
  const jointX = baseAuxX + followerLength * Math.cos(Math.PI / 2 + couplerAngle);
  const jointY = baseAuxY + followerLength * Math.sin(Math.PI / 2 + couplerAngle);

  return (
    <div id="dealers" className="bg-[#0b0b0b] py-24 border-t-2 border-white/10 relative overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)]"
        style={{ backgroundSize: '40px 40px' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="font-condensed text-sm md:text-base text-red-500 tracking-[0.3em] uppercase font-bold mb-3 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-red-600"></span>
              [LAB STATION M2] // MECHANICAL KINEDYNAMICS
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase text-white leading-tight">
              INTERACTIVE <span className="text-red-500">MECHANISM KINEMATICS LAB</span>
            </h2>
            <p className="text-neutral-400 font-sans mt-3 max-w-2xl text-base md:text-lg">
              Explore rigid body motion, joint trajectory circles, and piston kinematics first-hand. Change physical metrics using the sliders on the left to see live trajectory deformations in real time!
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-2">
            <button
              onClick={() => setMechanismType('slider-crank')}
              className={`px-5 py-3 font-condensed text-sm font-extrabold tracking-widest uppercase border transition-all cursor-pointer ${
                mechanismType === 'slider-crank'
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              Slider-Crank Mechanism
            </button>
            <button
              onClick={() => setMechanismType('four-bar')}
              className={`px-5 py-3 font-condensed text-sm font-extrabold tracking-widest uppercase border transition-all cursor-pointer ${
                mechanismType === 'four-bar'
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              Four-Bar Linkage
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column A: Parameters & Live Math (5 Columns) */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            
            <div className="space-y-6">
              <h3 className="font-bebas text-2xl text-zinc-100 tracking-wider flex items-center gap-2">
                <Compass className="text-red-500 w-5 h-5 animate-spin" /> Linkage Configuration Inputs
              </h3>
              
              {/* Sliders for Radius and Connecting Rod */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5">
                    <span className="uppercase text-white font-bold">Crank Radius (r):</span>
                    <span className="text-red-500">{crankRadius} mm</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    value={crankRadius}
                    onChange={(e) => setCrankRadius(Number(e.target.value))}
                    className="w-full accent-red-600 bg-zinc-800 rounded-lg cursor-pointer h-2"
                  />
                  <p className="text-sm text-zinc-500 font-sans mt-0.5">Adjusts the circular driving motion radius (TDC to BDC displacement span equals 2r).</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5">
                    <span className="uppercase text-white font-bold">Connecting Rod Length (l):</span>
                    <span className="text-red-500">{rodLength} mm</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={rodLength}
                    onChange={(e) => setRodLength(Number(e.target.value))}
                    className="w-full accent-red-600 bg-zinc-800 rounded-lg cursor-pointer h-2"
                  />
                  <p className="text-sm text-zinc-500 font-sans mt-0.5">Defines spatial distance between driving crankpin and target piston node.</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono text-zinc-300 mb-1.5">
                    <span className="uppercase text-white font-bold">Rotational Speed (ω):</span>
                    <span className="text-red-500">{omega * 60} deg/sec</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={omega}
                    onChange={(e) => setOmega(Number(e.target.value))}
                    className="w-full accent-red-600 bg-zinc-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              </div>

              {/* Dynamic Calculations Panel with HUGE Fonts */}
              <div className="bg-black/40 border border-white/5 p-4 rounded-lg space-y-3 font-mono text-sm">
                <span className="text-xs text-red-500 font-extrabold uppercase tracking-widest block">Live Analytical Kinematics</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-zinc-500 text-sm block">CRANK ANGLE (θ):</span>
                    <span className="text-xl text-white font-bold">{theta.toFixed(1)}°</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-sm block">SLIDER STROKE R (λ):</span>
                    <span className="text-xl text-white font-bold">{ratio.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-sm block">PISTON TRAVEL (x):</span>
                    <span className="text-xl text-red-400 font-bold">
                      {mechanismType === 'slider-crank' ? `${pistonDisplacement.toFixed(2)} mm` : 'N/A: Four-Bar'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-sm block">PISTON SPEED (v):</span>
                    <span className="text-xl text-emerald-400 font-bold">
                      {mechanismType === 'slider-crank' ? `${Math.abs(pistonVelocity).toFixed(2)} m/s` : 'N/A: Angular'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Socratic Equation Explanation with high visibility */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-xs font-mono text-red-500 font-extrabold tracking-widest uppercase block mb-1">Cylinder Displacement Law:</span>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-medium">
                At any crank angle <strong className="text-zinc-200">θ</strong>, linear travel is governed by the Reciprocating Equation:
                <code className="block bg-neutral-950 p-2 text-center text-red-400 font-bold rounded font-mono text-[11px] my-2">
                  x = r(1 - cos θ + λ - sqrt(λ² - sin² θ))
                </code>
                Large connecting rods (high <strong className="text-zinc-200">λ</strong> ratios) yield pure sinusoidal harmonic movements, reducing secondary high-frequency lateral structural vibrations.
              </p>
            </div>

          </div>

          {/* Column B: Live SVG Animation Card (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0f0f0f] border-2 border-white/10 rounded-xl p-6 md:p-8 flex flex-col justify-between items-center shadow-2xl min-h-[460px] relative">
            
            {/* Simulation controllers */}
            <div className="w-full flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-condensed font-extrabold tracking-wider text-sm uppercase flex items-center gap-1.5 rounded cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  {isPlaying ? 'Pause Sim' : 'Play Sim'}
                </button>
                <button
                  onClick={() => setTheta(0)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-condensed font-extrabold tracking-wider text-sm uppercase flex items-center gap-1.5 rounded cursor-pointer"
                >
                  <RefreshCw size={12} />
                  Reset Angle
                </button>
              </div>
              
              <span className="text-xs font-mono tracking-widest text-[#a855f7] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase font-bold">
                {mechanismType === 'slider-crank' ? 'SLIDER-CRANK KINEMATIC' : 'FOUR-BAR KINEMATIC PATH'}
              </span>
            </div>

            {/* Interactive Vector Stage */}
            <div className="w-full max-w-[420px] aspect-video flex-1 flex items-center justify-center p-6 bg-black/60 rounded-xl border border-white/5 relative shadow-inner overflow-hidden">
              
              {/* Back reference circular crank-path path */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-500" />
              </div>

              <svg viewBox="0 0 240 180" className="w-full h-full z-10" strokeLinecap="round">
                {/* DRAWING BACKGROUND COORDINATES */}
                <line x1="10" y1="100" x2="230" y2="100" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />

                {/* THE SIMULATED KINEMATICS ASSEMBLIES */}
                {mechanismType === 'slider-crank' ? (
                  <g>
                    {/* Reciprocating Cylinder outline guide */}
                    <path d="M 140,88 H 220 M 140,112 H 220" stroke="#333" strokeWidth="2.5" />
                    
                    {/* Fixed crankshaft bearing axis core */}
                    <circle cx={cx} cy={cy} r="6" fill="#111" stroke="#ef4444" strokeWidth="2.5" />
                    <text x={cx - 15} y={cy - 12} fill="#777" fontSize="5" fontFamily="monospace">AXIS_CENTRE</text>

                    {/* Rotational Crank link */}
                    <line x1={cx} y1={cy} x2={cpx} y2={cpy} stroke="#ffffff" strokeWidth="4.5" />
                    <line x1={cx} y1={cy} x2={cpx} y2={cpy} stroke="#b51a1a" strokeWidth="2" />
                    <circle cx={cpx} cy={cpy} r="4" fill="#ff0000" stroke="#fff" strokeWidth="1" />
                    <text x={cpx + 6} y={cpy - 6} fill="#fff" fontSize="5" fontFamily="monospace">CP pin</text>

                    {/* Long Connecting Rod link */}
                    <line x1={cpx} y1={cpy} x2={sliderX} y2={cy} stroke="#ffffff" strokeWidth="3" />
                    <line x1={cpx} y1={cpy} x2={sliderX} y2={cy} stroke="#888" strokeWidth="1" />

                    {/* Connecting pin on Slider head */}
                    <circle cx={sliderX} cy={cy} r="4" fill="#00e1ff" stroke="#fff" strokeWidth="1" />
                    <text x={sliderX - 8} y={cy - 14} fill="#00e1ff" fontSize="5" fontFamily="monospace">PISTON PIN</text>

                    {/* Piston Slider profile shape block */}
                    <rect x={sliderX - 14} y={cy - 8} width="28" height="16" rx="2.5" fill="#444" stroke="#fff" strokeWidth="1.5" />
                    <line x1={sliderX - 14} y1={cy} x2={sliderX + 14} y2={cy} stroke="#fff" strokeWidth="1" />
                  </g>
                ) : (
                  // FOUR-BAR LINKAGE ASSEMBLY
                  <g>
                    {/* Fixed base auxiliary mount */}
                    <circle cx={cx} cy={cy} r="6" fill="#111" stroke="#fff" strokeWidth="2.5" />
                    <circle cx={baseAuxX} cy={baseAuxY} r="6" fill="#111" stroke="#fff" strokeWidth="2.5" />
                    <line x1={cx} y1={cy} x2={baseAuxX} y2={baseAuxY} stroke="#333" strokeWidth="3" strokeDasharray="3,2" />
                    <text x={cx + 15} y={cy + 15} fill="#444" fontSize="5" fontFamily="monospace">FIXED_BASE_LINKAGE_1</text>

                    {/* Driving Crank Link */}
                    <line x1={cx} y1={cy} x2={cpx} y2={cpy} stroke="#ffffff" strokeWidth="4" />
                    <line x1={cx} y1={cy} x2={cpx} y2={cpy} stroke="#b51a1a" strokeWidth="1.5" />
                    <circle cx={cpx} cy={cpy} r="4" fill="#ff0000" stroke="#fff" strokeWidth="1" />

                    {/* Coupler link */}
                    <line x1={cpx} y1={cpy} x2={jointX} y2={jointY} stroke="#ffffff" strokeWidth="3" />
                    <line x1={cpx} y1={cpy} x2={jointX} y2={jointY} stroke="#7c3aed" strokeWidth="1.5" />

                    {/* Follower link lever */}
                    <line x1={baseAuxX} y1={baseAuxY} x2={jointX} y2={jointY} stroke="#ffffff" strokeWidth="4" />
                    <line x1={baseAuxX} y1={baseAuxY} x2={jointX} y2={jointY} stroke="#059669" strokeWidth="2" />
                    <circle cx={jointX} cy={jointY} r="4" fill="#059669" stroke="#fff" strokeWidth="1" />

                    {/* Dynamic trace trajectory node dots */}
                    <path d={`M ${cpx} ${cpy} L ${jointX} ${jointY}`} fill="none" stroke="#666" strokeWidth="0.5" strokeDasharray="1,2" />
                  </g>
                )}
              </svg>
            </div>

            {/* Explanation box with crisp high visibility */}
            <div className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl mt-4 font-sans text-sm md:text-base text-zinc-300">
              <span className="text-white block font-bold mb-1 font-condensed uppercase tracking-wider text-base md:text-lg">
                💡 Real-world Engineering Application:
              </span>
              {mechanismType === 'slider-crank' 
                ? "This assembly forms the fundamental core kinematics of internal combustion reciprocating engines. The rotational kinetic energy of the crankshaft is converted to linear motion of the piston (and vice-versa). Heavy inline-four crankshaft weights balance reciprocal forces."
                : "The four-bar linkage is the most basic single-degree-of-freedom mechanical linkage used in industrial assembly machines, car hood hinges, wiper layouts, and robotic joint articulations. Path tracking is governed by Grashof's link length inequality criteria."
              }
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
