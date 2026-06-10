import React from 'react';
import { Layers, Activity, Compass, Wind, HardDrive } from 'lucide-react';

interface ProblemDiagramProps {
  moduleId: string;
  questionId: number;
  subject: string;
  questionText: string;
}

// Map highly specific, standard, premium Unsplash images and titles for each question context
const getStandardImageForQuestion = (text: string, subjectStr: string, questionId: number): { url: string; label: string } => {
  const txt = (text || "").toLowerCase();
  const subject = (subjectStr || "").toLowerCase();

  // 1. Fluid Mechanics & Machinery Subjects G1_FMM / G3_FM
  if (subject.includes("fluid") || subject.includes("hydraul") || txt.includes("fluid") || txt.includes("pipe") || txt.includes("venturi") || txt.includes("gate") || txt.includes("viscosity") || txt.includes("aquatic") || txt.includes("ship")) {
    if (txt.includes("intake pipe") || txt.includes("area a =") || txt.includes("volumetric flow rate")) {
      return {
        url: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?w=600&q=80",
        label: "Q-INTRALINE HYDROSTATIC INLET FLOW"
      };
    }
    if (txt.includes("contracts from an inlet") || txt.includes("throat velocity") || txt.includes("throat diameter")) {
      return {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        label: "H-VENTURI CONVERGENT FLOW NOZZLE"
      };
    }
    if (txt.includes("rectangular gate") || txt.includes("submerged") || txt.includes("hydrostatic pressure force")) {
      return {
        url: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=600&q=80",
        label: "S-SUBMERGED SECTOR RESERVOIR BARRIER"
      };
    }
    if (txt.includes("slides over") || txt.includes("grease") || txt.includes("oil film") || txt.includes("viscosity")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "V-LUBRICATED JOURNAL BEARING OIL FILMS"
      };
    }
    if (txt.includes("pressure gauge") || txt.includes("manometric") || txt.includes("fluid column head")) {
      return {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        label: "M-STATIC PRESSURIZED MANOMETRIC HUD"
      };
    }
    if (txt.includes("friction head loss") || txt.includes("darcy") || txt.includes("conduit of length")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "D-DARCY PIPE REYNOLDS FLUID NETWORK"
      };
    }
    if (txt.includes("bulk modulus") || txt.includes("elasticity")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "C-BULK MODULUS HYDRAULIC PRESSURE CHAMBER"
      };
    }
    if (txt.includes("floating ship") || txt.includes("bm distance") || txt.includes("buoyancy") || txt.includes("metacentric")) {
      return {
        url: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=600&q=80",
        label: "L-METACENTRIC SHIP HEIGHT STRUCTURAL BALLAST"
      };
    }
    if (txt.includes("chezy") || txt.includes("channel") || txt.includes("sewer")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "O-MUNICIPAL OPEN CONDUIT CHANNEL SEWER"
      };
    }
    if (txt.includes("boundary layer") || txt.includes("displacement thickness") || txt.includes("velocity profile")) {
      return {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
        label: "B-PRANDTL SHEARING BOUNDARY VELOCITY PATHS"
      };
    }
    if (txt.includes("pelton") || txt.includes("impulse") || txt.includes("bucket")) {
      return {
        url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
        label: "I-IMPULSE PELTON TURBINE BLADE RUNNER"
      };
    }
    if (txt.includes("kaplan") || txt.includes("reaction turbine")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "K-KAPLAN AXIAL STRUCTURAL ENGINE HUB"
      };
    }
    if (txt.includes("ram pump") || txt.includes("d'aubuisson")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "R-D'AUBUISSON WATER RAM PRESSURE COMPILING"
      };
    }
    if (txt.includes("jet of area") || txt.includes("strikes") || txt.includes("baffle plate")) {
      return {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        label: "E-ORTHOGONAL HIGH-POWERED JET BAFFLE PLATE"
      };
    }
    if (txt.includes("specific speed") || txt.includes("turbine spinning")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "P-SPECIFIC UNIT SPEED FLUID PERFORMANCE"
      };
    }
    if (txt.includes("centistokes") || txt.includes("lubricant") || txt.includes("viscometer")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "K-REDWOOD OIL LUBRICANT VISCOSITY PROFILES"
      };
    }
    if (txt.includes("booster pump") || txt.includes("supplies a manometric")) {
      return {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        label: "U-BOOSTER WATER PIPELINE CENTRIFUGAL UNIT"
      };
    }
    if (txt.includes("pressure head") || txt.includes("pitot")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "P-PITOT PROBE FLOW VELOCITY INDICATOR"
      };
    }
    if (txt.includes("capillary") || txt.includes("rise height") || txt.includes("surface tension")) {
      return {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        label: "X-CAPILLARY WATER DROPLET TENSION FIELD"
      };
    }
    if (txt.includes("tip peripheral speed") || txt.includes("impeller exit")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "Y-IMPELLER BLADE TIP SLIP MULTIPLIERS"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
      label: "F-GENERAL FLUID DYNAMICS CALIBRATION MATRIX"
    };
  }

  // 2. Dynamics of Machinery Subjects G1_DOM
  if (subject.includes("dynam") || subject.includes("machin") || txt.includes("linkage") || txt.includes("flywheel") || txt.includes("governor") || txt.includes("vibration") || txt.includes("clutch") || txt.includes("gear") || txt.includes("pendulum")) {
    if (txt.includes("planar 4-bar") || txt.includes("4-bar") || txt.includes("four-bar") || txt.includes("mechanical mobility")) {
      return {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
        label: "M-PLANAR MECHANISM KINEMATIC MOBILITY DEGREES"
      };
    }
    if (txt.includes("stephenson") || txt.includes("six-bar")) {
      return {
        url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
        label: "S-STEPHENSON INTEGRATED COMPILER LINKAGE"
      };
    }
    if (txt.includes("spinning point mass") || txt.includes("radial") || txt.includes("eccentric offset")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "C-CENTRIPETAL ROTATIONAL MOTION FORCE VECTOR"
      };
    }
    if (txt.includes("undamped single-degree") || txt.includes("mass spring elements")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "V-UNDAMPED HARMONIC VIBRATING SPRING ASSEMBLY"
      };
    }
    if (txt.includes("absorbs fluctuation kinetic") || txt.includes("flywheel absorbs") || txt.includes("motor flywheel")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "F-STEADY-STATE ROTARY FLYWHEEL KINETICS"
      };
    }
    if (txt.includes("governor tests") || txt.includes("spindle speed governor") || txt.includes("upper threshold velocity")) {
      return {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        label: "G-GOVERNOR SPINDLE SLEEVE ROTARY CONTROL"
      };
    }
    if (txt.includes("unbalanced machine spinner")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "U-DAMPED ECCENTRIC VIBRATION EXCITATION"
      };
    }
    if (txt.includes("static deflection") || txt.includes("transverse frequency")) {
      return {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        label: "W-SHAFT TRANSVERSE CRITICAL SPECTRAL SPEEDS"
      };
    }
    if (txt.includes("gyroscopic wheel") || txt.includes("pitching") || txt.includes("couple")) {
      return {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        label: "C-GYROSCOPIC PRECESSION VEHICLE MOMENTUM COUPLE"
      };
    }
    if (txt.includes("satellite core") || txt.includes("active angular momentum")) {
      return {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        label: "A-ANGULAR MOMENTUM SATELLITE ROTOR SPINS"
      };
    }
    if (txt.includes("isolator elements") || txt.includes("damping constant c")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "D-VISCOUS DAMPER ISOLATOR TRANSLATION COUPLER"
      };
    }
    if (txt.includes("rotary acceleration") || txt.includes("angular rotary")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "T-STEADY INERTIAL COMPRESSED ROTATION ENGINE"
      };
    }
    if (txt.includes("spur gear mechanism") || txt.includes("spur gear velocity")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "R-SPUR COUPLER GEAR SPEED CONVERSION HUB"
      };
    }
    if (txt.includes("friction clutch") || txt.includes("uniform wear")) {
      return {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        label: "C-SINGLE-PLATE CLUTCH CLAMPING TORQUE PLANE"
      };
    }
    if (txt.includes("screw jack") || txt.includes("thread pitch")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "J-THREAD SCREW JACK HELICAL LIFTER"
      };
    }
    if (txt.includes("flat belt") || txt.includes("belt friction")) {
      return {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
        label: "B-BELT FRICTION SYSTEM TENSION ROTATION PATHS"
      };
    }
    if (txt.includes("pitch center distance") || txt.includes("spur gears with module")) {
      return {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        label: "P-GEAR CENTER DISTANCE MODULAR ENGAGEMENT"
      };
    }
    if (txt.includes("piston assembly") || txt.includes("slider velocity")) {
      return {
        url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
        label: "P-RECIPROCATING SLIDER CRANK PISTON SLIDE"
      };
    }
    if (txt.includes("springs stiffness combined") || txt.includes("whirling")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "R-ROTATING SHAFT RESONATING SPECTRAL WHIRL"
      };
    }
    if (txt.includes("torsional spring stiffness kt") || txt.includes("hollow metal pipe")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "S-HOLLOW METAL PIPE POLAR DRIVE TWISTS"
      };
    }
    if (txt.includes("pendulum") || txt.includes("periodic time of swing")) {
      return {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        label: "L-TORSIONAL PENDULUM OSCILLATION OSCILLATOR"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
      label: "M-GENERAL DYNAMICS OF MULTI-BODY MECHANISMS"
    };
  }

  // 3. Applied Thermodynamics Subjects / Systems G1_TOF / G3_AT
  if (subject.includes("thermo") || subject.includes("heat") || subject.includes("gas") || subject.includes("cycle") || txt.includes("gas") || txt.includes("compressor") || txt.includes("steam") || txt.includes("boiler") || txt.includes("stagnation") || txt.includes("nozzle")) {
    if (txt.includes("ideal gas law") || txt.includes("gas constant") || txt.includes("gas sample")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "C-CONFINED PRESSURIZED CORE IDEAL GAS MATRIX"
      };
    }
    if (txt.includes("isothermally") || txt.includes("boundary work")) {
      return {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        label: "P-PISTON CYLINDER ISOTHERMAL ISOLATOR PV WORK"
      };
    }
    if (txt.includes("carnot heat engine") || txt.includes("thermal efficiency")) {
      return {
        url: "https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=600&q=80",
        label: "T-REVERSED CARNOT POWER REFRIGERATION CYCLES"
      };
    }
    if (txt.includes("steady state fluid turbine") || txt.includes("steam boundary entering") || txt.includes("enthalpy")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "T-STEAM EXPANSION STEADY FLOW TURBINE SHAFT"
      };
    }
    if (txt.includes("entropy rate change") || txt.includes("entropy")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "E-THERMODYNAMIC ENTROPIC TRANSFER PATHWAYS"
      };
    }
    if (txt.includes("carnot refrigerator") || txt.includes("cop of")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "C-CARNOT COOLER COMPRESSION CYCLE REFRIG"
      };
    }
    if (txt.includes("piston air compressor") || txt.includes("polytropically")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "P-POLYTROPIC BOUNDARY AIR CYLINDER COMPRESSION"
      };
    }
    if (txt.includes("otto air cycle") || txt.includes("volumetric compression ratio")) {
      return {
        url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
        label: "O-FOUR-STROKE OTTO CYCLE GASOLINE CORE"
      };
    }
    if (txt.includes("clearance percentage ratio") || txt.includes("tdc")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "V-CYLINDER ENGINE STROKE TO clearance Ratio"
      };
    }
    if (txt.includes("wet steam quality") || txt.includes("dryness") || txt.includes("separator column")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "W-SATURATED MOISTURE SEPARATOR DRYNESS VALUE"
      };
    }
    if (txt.includes("diesel pressure limits") || txt.includes("throat volume")) {
      return {
        url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
        label: "D-DIESEL THERMODYNAMIC RATIO COMBUSTION CHAMBER"
      };
    }
    if (txt.includes("nitrogen gas") || txt.includes("constant volume heating") || txt.includes("isochoric")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "N-ISOCHORIC NITROGEN SEALED CALORIME CORES"
      };
    }
    if (txt.includes("wet steam wet expansion") || txt.includes("spec volume")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "S-SATURATED MIXTURE EXPANSION SPECIFIC METRICS"
      };
    }
    if (txt.includes("recuperator") || txt.includes("exhaust gas stream")) {
      return {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
        label: "R-RECUPERATOR GAS EXHAUST RECOVERY COGENS"
      };
    }
    if (txt.includes("brayton cycle") || txt.includes("aircraft closed gas")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "B-AIRCRAFT PROPULSION COMPRESSER ROTOR CYCLES"
      };
    }
    if (txt.includes("warm side fluid") || txt.includes("lmtd") || txt.includes("parallel flow")) {
      return {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
        label: "L-COUNTERFLOW LOG-MEAN TEMPERATURE HEAT EXCHANGE"
      };
    }
    if (txt.includes("wet steam line") || txt.includes("boiler vaporization")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "S-STEAM DRYNESS FRACTION ENTHALPY COEFFICIENT"
      };
    }
    if (txt.includes("polytropic index n") || txt.includes("expands in a turbine")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "T-POLYTROPIC EXPAND COMPRESS SHAFT COEFFICIENTS"
      };
    }
    if (txt.includes("processing compressor") || txt.includes("volumetric efficiency")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "C-COMPRESSOR VOLUMETRIC METRICS clearance STAGES"
      };
    }
    if (txt.includes("carnot heat pump") || txt.includes("room warmth")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "H-CARNOT HEAT PUMP DUAL OUTSIDE HEAT EXCHANGER"
      };
    }
    if (txt.includes("steam generator") || txt.includes("specific steam consumption")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "D-STEAM UTILITY SPECIFIC STEAM DRUM RATINGS"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
      label: "T-GENERAL INDUSTRIAL THERMODYNAMIC ANALYSIS"
    };
  }

  // 4. Strength of Materials / Structures G1_MTS / G3_SOM
  if (subject.includes("strength") || subject.includes("solid") || subject.includes("structur") || txt.includes("stress") || txt.includes("strain") || txt.includes("deflection") || txt.includes("girder") || txt.includes("column") || txt.includes("rod") || txt.includes("shear") || txt.includes("mohr")) {
    if (txt.includes("tie-bar") || txt.includes("axial pulling tension")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "S-STRUCTURAL STEEL TIE AXIAL TENSION"
      };
    }
    if (txt.includes("steel structural rod") || txt.includes("extends by factor")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "R-ROD TENSILE TEST deflection STRAIN CALIBRATOR"
      };
    }
    if (txt.includes("drive shaft") || txt.includes("torque loading") || txt.includes("torsional twisting")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "S-TORSION TRANSVERSE SHEATING TORQUE LOADING"
      };
    }
    if (txt.includes("boiler shell") || txt.includes("hoop tensile") || txt.includes("cylinder vessel")) {
      return {
        url: "https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=600&q=80",
        label: "C-THIN CYLINDRICAL HOOP STRAIN BOILER EXPANSION"
      };
    }
    if (txt.includes("triaxial elastic strain")) {
      return {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=600&q=80",
        label: "T-TRIAXIAL STRESS TESTING ELASTIC DEFORMATION"
      };
    }
    if (txt.includes("steel structural column") || txt.includes("elongates under")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "P-REINFORCED PILLAR STRUT AXIAL COUPLING FORCE"
      };
    }
    if (txt.includes("stores strain energy") || txt.includes("strain energy resilience")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "E-ELASTIC RESILIENCE STRAIN PRESSURE CHAMBER"
      };
    }
    if (txt.includes("shear stress of tau") || txt.includes("shear stress of exactly")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "S-SHEARING LOAD SLIDING FORCE INTERFACIAL PROFILE"
      };
    }
    if (txt.includes("bending moment m") || txt.includes("rectangular structural span")) {
      return {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&q=80",
        label: "M-RECTANGULAR SPAN BENDING FORCE FLEXURAL CORES"
      };
    }
    if (txt.includes("sectional modulus") || txt.includes("rectangular cross section")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "Z-RECTANGULAR BEAM CROSS-SECTION MODULUS WARM"
      };
    }
    if (txt.includes("radius of gyration") || (txt.includes("column radius") && txt.includes("gyration"))) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "R-GYRATION RADIUS STRUCTURAL STABILITY STRUT"
      };
    }
    if (txt.includes("locked at both end boundaries") || txt.includes("thermal compression stress")) {
      return {
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
        label: "T-THERMAL EXPANSION RIGID BOUNDARY REACTION FORCE"
      };
    }
    if (txt.includes("cantilever steel") || (txt.includes("cantilever") && txt.includes("deflection"))) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "C-CANTILEVER SHEAR LOAD DEFLECTION CHARACTER"
      };
    }
    if (txt.includes("shear web bar") || txt.includes("shear force v")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "W-SHEAR WEB INERTIA BEAM SEGMENT COEFFICIENTS"
      };
    }
    if (txt.includes("mohr circular") || txt.includes("mohr circle envelope")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "C-MOHR CIRCLE PRINCIPAL COORDINATE TRANSTION"
      };
    }
    if (txt.includes("mohr circle centroid") || txt.includes("average average normal")) {
      return {
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
        label: "M-BIAXIAL CENTROID AVERAGE AVERAGE NORSTRESS"
      };
    }
    if (txt.includes("outer diameter do") || txt.includes("shaft polar j")) {
      return {
        url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        label: "J-POLAR INERTIA DRIVE TWISTS RESURANCE VALUE"
      };
    }
    if (txt.includes("column strut bar") || txt.includes("pinned") || txt.includes("euler buckling")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "K-EULER PINNED COLUMN BUCKLING INSTABILITY INDEX"
      };
    }
    if (txt.includes("simply-supported beam") || txt.includes("center deflection")) {
      return {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
        label: "B-SIMPLY SUPPORTED GRID BEAM FLEXURAL COMPONENT"
      };
    }
    if (txt.includes("helical round coil spring") || txt.includes("coil diameter")) {
      return {
        url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
        label: "H-COIL SPRING RADIABILITY COMPRESSION TORSION"
      };
    }
    if (txt.includes("slenderness ratio lambda") || txt.includes("radius gyration")) {
      return {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
        label: "K-COLUMN STABILTY SLENDERNESS LAMBDA METRIC"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
      label: "S-STRUCTURAL SOLID STRESS MECHANICS CALIBRATOR"
    };
  }

  // 5. G2 & G3 Custom submodules
  if (txt.includes("control system") || txt.includes("bandwidth") || txt.includes("feedback")) {
    return {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      label: "C-DYNAMIC FREQUENCY BANDWIDTH LOOP CONTROL"
    };
  }
  if (txt.includes("truss") || txt.includes("fea") || txt.includes("finite element") || txt.includes("nodes")) {
    return {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      label: "S-SPATIAL TRUSS NODE DEGREE OF FREEDOM CONNECTORS"
    };
  }
  if (txt.includes("bearing") || txt.includes("bearing rated") || txt.includes("ball bearing") || txt.includes("dme key")) {
    return {
      url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
      label: "B-BALL BEARING L10 DATED SYSTEM OPERATIONAL RATINGS"
    };
  }
  if (txt.includes("turbomachinery") || txt.includes("whirl component") || txt.includes("euler turbo") || txt.includes("rotor blades")) {
    return {
      url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&q=80",
      label: "E-TURBOMACHINERY VELOCITY TRIANGLE SPECIFICS"
    };
  }
  if (txt.includes("gas expansion nozzle stagnation") || txt.includes("stagnation total temperature") || txt.includes("compressor expansion nozzle")) {
    return {
      url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
      label: "N-STAGNATION GAS EXPANSION CHOKED NOZZLE CORES"
    };
  }

  // Final fallback
  return {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    label: "A-COMPUTER-AIDED MECHANICAL ENGINEERING CORES"
  };
};

// Extract precise numeric variables from active question text dynamically
const extractQuestionParams = (text: string) => {
  const params: Record<string, string> = {};
  
  // Find variables in the format "VarName = value" (e.g. A = 0.05, V = 1.25, h_bar = 2.0, Th = 800)
  // Supports letters, numbers, sub-indices and custom Greek letters
  const matches = text.matchAll(/([A-Za-z1-2₀_a-z\*μδσηληβ\s\-]+)\s*=\s*([0-9\.\-\/]+)/g);
  for (const match of matches) {
    if (match[1] && match[2]) {
      const key = match[1].trim();
      const value = match[2].trim();
      // Keep only simple key definitions
      if (key.length <= 15 && !key.toLowerCase().includes("sample") && !key.toLowerCase().includes("law")) {
        params[key] = value;
      }
    }
  }

  // Check specific units fallback
  if (text.toLowerCase().includes("rpm")) {
    const rpmMatch = text.match(/(\d+(\.\d+)?)\s*rpm/i);
    if (rpmMatch) params["Speed (N)"] = `${rpmMatch[1]} RPM`;
  }
  if (text.toLowerCase().includes("links")) {
    const linksMatch = text.match(/N\s*=\s*(\d+)/i);
    if (linksMatch) params["Links (N)"] = linksMatch[1];
    const jointsMatch = text.match(/J\s*=\s*(\d+)/i);
    if (jointsMatch) params["Joints (J)"] = jointsMatch[1];
  }

  return params;
};

export default function ProblemDiagram({ moduleId, questionId, subject, questionText }: ProblemDiagramProps) {
  // 1. Map to high-quality Unsplash image and label corresponding to the actual active problem
  const imgInfo = getStandardImageForQuestion(questionText, subject, questionId);
  
  // 2. Parse the dynamic numerical variables inside the question text
  const params = extractQuestionParams(questionText);
  const paramKeys = Object.keys(params);

  // 3. Determine specific diagram layout based on terms inside the question sentence
  const textLower = (questionText || "").toLowerCase();
  let diagramType: 'flow' | 'beam' | 'shaft' | 'thermal' | 'spring' | 'cylinder' | 'robot' | 'default' = 'default';
  
  if (textLower.includes("flow") || textLower.includes("pipe") || textLower.includes("venturi") || textLower.includes("fluid") || textLower.includes("velocity") || textLower.includes("density") || textLower.includes("jet")) {
    diagramType = 'flow';
  } else if (textLower.includes("beam") || textLower.includes("cantilever") || textLower.includes("stress") || textLower.includes("strain") || textLower.includes("elongation") || textLower.includes("load") || textLower.includes("tension") || textLower.includes("tie")) {
    diagramType = 'beam';
  } else if (textLower.includes("torque") || textLower.includes("shaft") || textLower.includes("gear") || textLower.includes("rotor") || textLower.includes("rotation") || textLower.includes("clutch") || textLower.includes("spindle") || textLower.includes("governor")) {
    diagramType = 'shaft';
  } else if (textLower.includes("carnot") || textLower.includes("otto") || textLower.includes("cycle") || textLower.includes("thermal") || textLower.includes("temp") || textLower.includes("heat") || textLower.includes("entropy") || textLower.includes("gas law") || textLower.includes("compressor")) {
    diagramType = 'thermal';
  } else if (textLower.includes("spring") || textLower.includes("vibration") || textLower.includes("flywheel") || textLower.includes("damper") || textLower.includes("damping")) {
    diagramType = 'spring';
  } else if (textLower.includes("cylinder") || textLower.includes("hoop") || textLower.includes("pressure vessel") || textLower.includes("vessel") || textLower.includes("boiler")) {
    diagramType = 'cylinder';
  } else if (textLower.includes("robot") || textLower.includes("kinematics") || textLower.includes("d-h") || textLower.includes("manipulator") || textLower.includes("coordinate") || textLower.includes("nodes") || textLower.includes("fea") || textLower.includes("truss")) {
    diagramType = 'robot';
  }

  // Display constants matching equation types
  let formulaStr = "Computational Mechanics System";
  if (diagramType === 'flow') {
    formulaStr = "Continuity Force: Q = A₁·V₁ = A₂·V₂  |  F_impact = ρ·A·V²";
  } else if (diagramType === 'beam') {
    formulaStr = "Stress Tensor: σ = P / A  |  Elastic Deflection: δ = F·L³ / (3·E·I)";
  } else if (diagramType === 'shaft') {
    formulaStr = "Shaft Mechanics: T/J = τ / R = G·θ / L  |  Inertia Torque: T = I·α";
  } else if (diagramType === 'thermal') {
    formulaStr = "Power Loop: P·V = m·R·T  |  Carnot Efficiency η = 1 - T_c / T_h";
  } else if (diagramType === 'spring') {
    formulaStr = "Dynamic Response: ω_n = √(K_eq / M)  |  Damping CC = 2·√(K·M)";
  } else if (diagramType === 'cylinder') {
    formulaStr = "Thin Shell Stresses: Hoop σ_h = P·D/(2·t)  |  Radial σ_r ≈ 0";
  } else if (diagramType === 'robot') {
    formulaStr = "Coordinate Joint Transforms: T = T₁¹ · T₂² · T₃³  |  Grid DOF = Nodes · d";
  }

  return (
    <div className="relative border border-white/10 bg-[#070707] rounded-xl overflow-hidden shadow-2xl h-64 md:h-64 flex flex-col justify-between group select-none">
      {/* 1. Underlying Premium Engineering Background Image related specifically to the active problem */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/90 to-[#070707]/30 z-10 transition-all duration-300 group-hover:via-[#070707]/80" />
        <img
          src={imgInfo.url}
          alt={imgInfo.label}
          className="w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:scale-[1.03] transition-all duration-700 pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 2. Top Banner HUD indicators */}
      <div className="relative z-10 p-4 pb-0 flex justify-between items-center sm:items-start select-none">
        <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-emerald-400 font-extrabold bg-black/80 border border-emerald-500/20 px-2 py-0.5 rounded backdrop-blur-md uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          {imgInfo.label} // Q-{questionId}
        </span>
        <span className="hidden sm:inline font-mono text-[9px] text-zinc-500 tracking-widest bg-white/5 border border-white/15 px-2 py-0.5 rounded uppercase font-bold">
          EVAL_STATION_TELEMETRY
        </span>
      </div>

      {/* 3. Central Drawing SVG Blueprint overlaid on top of the engineering photo with dynamic parameter feedback */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 space-y-2 md:space-y-0 select-none">
        
        {/* Left Side: Glowing SVG Schematic */}
        <div className="w-full md:w-3/5 h-36 flex items-center justify-center">
          {diagramType === 'flow' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#00d2ff" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="#e2231a" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#e2231a" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path d="M 10,25 L 110,25 C 130,25 140,50 160,50 L 290,50 L 290,90 L 160,90 C 140,90 130,115 110,115 L 10,115 Z" fill="url(#flowGrad)" stroke="#3e3e3e" strokeWidth="2" />
              <line x1="20" y1="45" x2="280" y2="45" stroke="rgba(0,210,255,0.2)" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="20" y1="70" x2="280" y2="70" stroke="rgba(226,35,26,0.3)" strokeWidth="2" />
              <line x1="20" y1="95" x2="280" y2="95" stroke="rgba(0,210,255,0.2)" strokeWidth="1.5" strokeDasharray="4,4" />
              <circle cx="60" cy="25" r="4" fill="#00d2ff" />
              <circle cx="210" cy="50" r="4" fill="#e2231a" />
              
              {/* Floating Dynamic Variables */}
              <text x="60" y="15" fill="#00d2ff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Inlet: {params["A"] || params["A1"] ? `A₁=${params["A"] || params["A1"]}m²` : "A₁ Area"}
              </text>
              <text x="210" y="40" fill="#e2231a" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Throat: {params["A2"] || params["D2"] ? `A₂=${params["A2"] || "Throat"}` : "A₂ Throat"}
              </text>
              <text x="135" y="85" fill="#c8ff00" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["V"] || params["V1"] ? `V₁ = ${params["V"] || params["V1"]} m/s` : "FLOW V_1"}
              </text>
            </svg>
          )}

          {diagramType === 'beam' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <line x1="25" y1="15" x2="25" y2="105" stroke="#444" strokeWidth="4" />
              <path d="M 17,20 L 25,30 M 17,45 L 25,55 M 17,70 L 25,80 M 17,95 L 25,105" stroke="#444" strokeWidth="1.5" />
              {/* Undeflected bar contour line */}
              <rect x="25" y="50" width="220" height="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
              {/* Curved deflected blueprint */}
              <path d="M 25,50 Q 130,50 240,75 L 240,91 Q 130,66 25,66" fill="rgba(0,210,255,0.05)" stroke="#00d2ff" strokeWidth="1.5" />
              
              {/* Load Arrow */}
              <path d="M 240,35 L 240,71" fill="none" stroke="#e2231a" strokeWidth="2" />
              <polygon points="237,66 243,66 240,74" fill="#e2231a" />
              
              <text x="245" y="47" fill="#e2231a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                {params["P"] || params["Force"] || params["Load"] ? `Force P = ${params["P"] || params["Force"] || params["Load"]} kN` : "Load F"}
              </text>
              <text x="135" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {params["L"] ? `Length L = ${params["L"]} mm` : "Beam Length L"}
              </text>
              <text x="135" y="42" fill="#00d2ff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {params["A"] ? `Area = ${params["A"]} mm²` : params["Thickness"] ? `t = ${params["Thickness"]} mm` : "Normal Cross Area A"}
              </text>
            </svg>
          )}

          {diagramType === 'shaft' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              {/* Rotating Gear assemblies */}
              <circle cx="75" cy="60" r="28" fill="none" stroke="#444" strokeWidth="1.5" />
              <circle cx="75" cy="60" r="32" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="75" cy="60" r="5" fill="#111" stroke="#888" strokeWidth="1.5" />
              <circle cx="135" cy="60" r="32" fill="none" stroke="#444" strokeWidth="1.5" />
              <circle cx="135" cy="60" r="28" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="135" cy="60" r="5" fill="#111" stroke="#8c8c8c" strokeWidth="1.5" />
              
              {/* Rotating arrow indicator */}
              <path d="M 235,35 A 16,16 0 0,1 251,60" fill="none" stroke="#e2231a" strokeWidth="2" />
              <polygon points="252,56 247,61 254,64" fill="#e2231a" />
              
              {/* Cylinder shaft section */}
              <path d="M 180,50 L 245,50 C 250,50 250,70 245,70 L 180,70 Z" fill="rgba(255,255,255,0.03)" stroke="#444" strokeWidth="1.5" />
              <ellipse cx="180" cy="60" rx="5" ry="10" fill="#151515" stroke="#444" strokeWidth="1.5" />
              <ellipse cx="245" cy="60" rx="5" ry="10" fill="#202020" stroke="#00d2ff" strokeWidth="1.5" />
              
              <text x="135" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {params["N1"] || params["N"] ? `Speed: ${params["N1"] || params["N"]} RPM` : "Speed Ratio N₁/N₂"}
              </text>
              <text x="210" y="42" fill="#e2231a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["T"] ? `T = ${params["T"]} N-m` : params["I"] ? `I = ${params["I"]} kg-m²` : "Torque Load T"}
              </text>
              <text x="75" y="22" fill="#00d2ff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {params["d"] ? `Dia d = ${params["d"]} mm` : "Drive Axis"}
              </text>
            </svg>
          )}

          {diagramType === 'thermal' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <line x1="40" y1="15" x2="40" y2="105" stroke="#555" strokeWidth="1" />
              <line x1="40" y1="105" x2="260" y2="105" stroke="#555" strokeWidth="1" />
              <path d="M 70,35 C 105,30 155,42 195,55 C 165,85 110,95 85,90 C 65,75 62,50 70,35" fill="rgba(226,35,26,0.05)" stroke="#00d2ff" strokeWidth="1.5" />
              
              <circle cx="70" cy="35" r="3.5" fill="#e2231a" />
              <circle cx="195" cy="55" r="3" fill="#888" />
              <circle cx="85" cy="90" r="3.5" fill="#00d2ff" />
              
              <text x="135" y="27" fill="#e2231a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["Th"] || params["T"] ? `Th = ${params["Th"] || params["T"]} K` : "T_high (Source)"}
              </text>
              <text x="135" y="115" fill="#00d2ff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["Tc"] ? `Tc = ${params["Tc"]} K` : params["V"] ? `Vol V = ${params["V"]} m³` : "T_cold (Sink)"}
              </text>
              <text x="235" y="55" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
                {params["P"] ? `P = ${params["P"]} kPa` : "P-V Loop"}
              </text>
            </svg>
          )}

          {diagramType === 'spring' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <line x1="70" y1="15" x2="230" y2="15" stroke="#444" strokeWidth="3" />
              <path d="M 80,8 L 90,15 M 110,8 L 120,15 M 140,8 L 150,15 M 170,8 L 180,15 M 200,8 L 210,15" stroke="#444" strokeWidth="1" />
              
              {/* Spring coil */}
              <path d="M 110,15 L 110,25 L 115,30 L 105,35 L 115,40 L 105,45 L 115,50 L 105,55 L 110,60 L 110,70" fill="none" stroke="#00d2ff" strokeWidth="2" />
              
              {/* Damper check piston */}
              <line x1="190" y1="15" x2="190" y2="40" stroke="#e2231a" strokeWidth="1.5" />
              <rect x="180" y="40" width="20" height="20" fill="none" stroke="#e2231a" strokeWidth="1.5" />
              <line x1="185" y1="50" x2="195" y2="50" stroke="#e2231a" strokeWidth="2" />
              <line x1="190" y1="50" x2="190" y2="70" stroke="#e2231a" strokeWidth="1.5" />
              
              {/* Load block mass */}
              <rect x="80" y="70" width="140" height="20" fill="rgba(255,255,255,0.06)" stroke="#888" strokeWidth="1.5" />
              
              <text x="150" y="83" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["m"] || params["M"] ? `MASS m = ${params["m"] || params["M"]} kg` : "STEADY MASS (M)"}
              </text>
              <text x="65" y="42" fill="#00d2ff" fontSize="8" fontFamily="monospace">
                {params["k"] ? `k = ${params["k"]} kN/m` : "Stiffness k"}
              </text>
              <text x="215" y="42" fill="#e2231a" fontSize="8" fontFamily="monospace">
                {params["ζ"] || params["zeta"] ? `ζ Ratio = ${params["ζ"] || params["zeta"]}` : "Damping ratio ζ"}
              </text>
            </svg>
          )}

          {diagramType === 'cylinder' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <ellipse cx="150" cy="60" rx="70" ry="28" fill="none" stroke="#444" strokeWidth="3.5" />
              <ellipse cx="150" cy="60" rx="64" ry="24" fill="none" stroke="#e2231a" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="150" cy="60" r="12" fill="rgba(226,35,26,0.1)" stroke="#e2231a" strokeWidth="1" />
              
              <line x1="150" y1="60" x2="150" y2="35" stroke="#e2231a" strokeWidth="1.5" />
              <polygon points="150,35 147,40 153,40" fill="#e2231a" />
              <line x1="150" y1="60" x2="150" y2="85" stroke="#e2231a" strokeWidth="1.5" />
              <polygon points="150,85 147,80 153,80" fill="#e2231a" />
              
              <text x="150" y="63" fill="#e2231a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["P"] ? `${params["P"]} MPa` : "Press. P"}
              </text>
              <text x="150" y="24" fill="#00d2ff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["D"] ? `Dia D = ${params["D"]} mm` : "Cylinder Outer Dia D"}
              </text>
              <text x="215" y="93" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
                {params["t"] ? `thickness t = ${params["t"]} mm` : "Shell Wall thickness (t)"}
              </text>
            </svg>
          )}

          {diagramType === 'robot' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              <rect x="25" y="85" width="40" height="15" rx="2" fill="#222" stroke="#444" strokeWidth="1" />
              <line x1="45" y1="85" x2="45" y2="65" stroke="#00d2ff" strokeWidth="3.5" />
              <circle cx="45" cy="65" r="7" fill="#111" stroke="#e2231a" strokeWidth="2" />
              
              {/* Arm Links */}
              <line x1="45" y1="65" x2="125" y2="40" stroke="#00d2ff" strokeWidth="3" />
              <circle cx="125" cy="40" r="6" fill="#111" stroke="#e2231a" strokeWidth="2" />
              <line x1="125" y1="40" x2="205" y2="60" stroke="#00d2ff" strokeWidth="2.5" />
              <polygon points="205,60 213,54 217,60 213,66" fill="#fff" stroke="#444" strokeWidth="1" />
              
              <text x="45" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {params["Nodes (N)"] || params["Nodes"] ? `FEA Nodes: ${params["Nodes (N)"] || params["Nodes"]}` : "Planar kinematic anchor Z₀"}
              </text>
              <text x="125" y="27" fill="#e2231a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {params["Joints (J)"] || params["Joints"] ? `Joints: ${params["Joints (J)"] || params["Joints"]}` : "Coordinate Joints θ₁, θ₂"}
              </text>
              <text x="215" y="52" fill="#00d2ff" fontSize="8" fontWeight="bold" fontFamily="monospace">
                {params["Links (N)"] || params["Links"] ? `Links = ${params["Links (N)"] || params["Links"]}` : "End Effector X_e"}
              </text>
            </svg>
          )}

          {diagramType === 'default' && (
            <svg className="w-full h-full max-h-[140px]" viewBox="0 0 300 120">
              {/* Technical background grids */}
              <line x1="10" y1="10" x2="290" y2="110" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
              <line x1="10" y1="110" x2="290" y2="10" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
              <circle cx="150" cy="60" r="32" fill="none" stroke="rgba(226,35,26,0.04)" strokeWidth="1" strokeDasharray="3,3" />
              
              <rect x="75" y="40" width="150" height="40" rx="4" fill="rgba(0,210,255,0.02)" stroke="rgba(0,210,255,0.2)" strokeWidth="1.5" />
              <circle cx="150" cy="20" r="3.5" fill="#e2231a" />
              <circle cx="150" cy="100" r="3.5" fill="#00d2ff" />
              <line x1="150" y1="40" x2="150" y2="23.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="150" y1="80" x2="150" y2="96.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,2" />
              
              <text x="150" y="63" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Socratic Challenge Q-{questionId}
              </text>
              <text x="150" y="12" fill="#e2231a" fontSize="7" fontFamily="monospace" textAnchor="middle">INLET BOUNDS</text>
              <text x="150" y="112" fill="#00d2ff" fontSize="7" fontFamily="monospace" textAnchor="middle">OUTLET FLUID RATIO</text>
            </svg>
          )}
        </div>

        {/* Right Side: Floating dynamic variable lookup array board */}
        <div className="w-full md:w-2/5 md:pl-6 flex flex-col justify-center select-none">
          <div className="bg-black/75 border border-white/10 p-3 rounded font-mono text-[9px] sm:text-[10px] space-y-2 backdrop-blur-md max-w-[240px] md:max-w-none mx-auto w-full">
            <div className="text-zinc-500 font-extrabold pb-1.5 border-b border-white/5 uppercase flex items-center gap-1.5">
              <Compass size={11} className="text-emerald-400" />
              DYNAMIC PARAMETERS BOARD
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 max-h-[100px] overflow-y-auto pr-1">
              {paramKeys.length > 0 ? (
                paramKeys.map((k, idx) => (
                  <div key={idx} className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-500 max-w-[70px] truncate">{k}:</span>
                    <span className="text-emerald-400 font-bold truncate max-w-[80px]">{params[k]}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-500">Track ID:</span>
                    <span className="text-yellow-400 font-bold uppercase">{moduleId.replace('g1_','').replace('g2_','').replace('g3_','')}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-500">Problem:</span>
                    <span className="text-yellow-400 font-bold uppercase">Dynamic Q-{questionId}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Engineering Formula Bar */}
      <div className="relative z-10 px-4 py-2 bg-gradient-to-r from-neutral-950 to-[#0e0e0e] border-t border-white/10 flex justify-between items-center text-[9px] text-zinc-400 font-mono select-none">
        <span className="truncate pr-4 flex items-center gap-1.5 text-zinc-300 uppercase">
          <Wind size={10} className="text-suzuki-red" />
          {formulaStr}
        </span>
        <span className="text-zinc-500 font-bold hidden sm:inline whitespace-nowrap">
          SCALE: ACTIVE FORMULA CONSTANTS SET
        </span>
      </div>
    </div>
  );
}
