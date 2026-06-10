import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  Hash, 
  Volume2, 
  VolumeX, 
  Users, 
  Plus, 
  CheckCheck,
  Swords,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  senderName: string;
  college: string;
  message: string;
  timestamp: string;
  topicId?: "CAD" | "FEA" | "CFD" | "SRE" | "IoT";
  isUser?: boolean;
}

interface PeerDiscussionChatProps {
  candidateName: string;
  collegeName: string;
  registeredUsers: Array<{ name: string; college: string; score: number; status: string }>;
  onSelectPeerForChallenge: (peerName: string, topicId: "CAD" | "FEA" | "CFD" | "SRE" | "IoT") => void;
}

const CHANNELS = [
  { id: "general", name: "general-coordination", topic: "Coordinate 1v1 duels & form study groups", topicId: "CAD" as const },
  { id: "cad", name: "cad-slider-constrains", topic: "Crank-sliders, planar mates, cylinder axes", topicId: "CAD" as const },
  { id: "fea", name: "fea-nodes-vibration", topic: "Stiffness matrices, deflection vertices, cantilever beams", topicId: "FEA" as const },
  { id: "cfd", name: "cfd-boundary-streams", topic: "Vortex shedding, separation cells, attack angles", topicId: "CFD" as const },
  { id: "sre", name: "sre-thermal-friction", topic: "Overheating limits, caliper wear points, thermal growth", topicId: "SRE" as const },
  { id: "iot", name: "iot-oscilloscope-freq", topic: "Discretized telemetry, sampling rates, vibration spikes", topicId: "IoT" as const },
];

export default function PeerDiscussionChat({
  candidateName,
  collegeName,
  registeredUsers,
  onSelectPeerForChallenge
}: PeerDiscussionChatProps) {
  const [activeChannelId, setActiveChannelId] = useState<string>("general");
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Local active chat thread state loaded from localStorage or pre-populated
  const [channelMessages, setChannelMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem("mechPeerDiscussions_v4");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading discussion channels", e);
    }

    // Default pre-populated historic discussion threads
    return {
      general: [
        {
          id: "g1",
          senderName: "Pranav Kulkarni",
          college: "IIT Madras",
          message: "Ayo, anyone up for a 1v1 duel on CFD boundary layer simulation? Need some quick points to scale up the national roster.",
          timestamp: "10:14 AM",
          topicId: "CFD",
        },
        {
          id: "g2",
          senderName: "Shruti Hegde",
          college: "IIT Bombay",
          message: "Just completed a national-tier verification scenario. CAD planar joint mates are surprisingly tricky under high rotational speeds.",
          timestamp: "10:18 AM",
          topicId: "CAD",
        },
        {
          id: "g3",
          senderName: "Megha Kundapur",
          college: "RV College of Engineering",
          message: "Agreed! Megha here. I'm focusing on the SRE friction wear point thermodynamic equations right now. Let's study in the dedicated channel.",
          timestamp: "10:25 AM",
          topicId: "SRE",
        }
      ],
      cad: [
        {
          id: "cad1",
          senderName: "Aniket Deshpande",
          college: "COEP Pune",
          message: "When defining planar piston mates, the degrees of freedom (DOF) shouldn't be fully locked before checking the slide groove line.",
          timestamp: "09:30 AM",
          topicId: "CAD",
        },
        {
          id: "cad2",
          senderName: "Rohan Kamath",
          college: "VIT Vellore",
          message: "Correct, Aniket. Grounding the frame establishes the baseline global matrix. Coincident axes keep the pins from twisting out.",
          timestamp: "09:44 AM",
          topicId: "CAD",
        }
      ],
      fea: [
        {
          id: "fea1",
          senderName: "Shruti Hegde",
          college: "IIT Bombay",
          message: "If you analyze a cantilever beam, does anyone else see localized deflection vectors spike suddenly near node 6?",
          timestamp: "08:15 AM",
          topicId: "FEA",
        },
        {
          id: "fea2",
          senderName: "Pranav Kulkarni",
          college: "IIT Madras",
          message: "Check your boundary pressure stress tensor! A sudden local refinement is likely required near the clamp seat.",
          timestamp: "08:22 AM",
          topicId: "FEA",
        }
      ],
      cfd: [
        {
          id: "cfd1",
          senderName: "Rohan Kamath",
          college: "VIT Vellore",
          message: "The airfoil lift-to-drag transition shows deep stall beyond 12 degrees attack. Flow separates completely at the upper rear.",
          timestamp: "07:10 AM",
          topicId: "CFD",
        },
        {
          id: "cfd2",
          senderName: "Aniket Deshpande",
          college: "COEP Pune",
          message: "That's standard separation behavior. Try decreasing the attack angle slightly or increasing the mesh growth rate to resolve turbulence.",
          timestamp: "07:32 AM",
          topicId: "CFD",
        }
      ],
      sre: [
        {
          id: "sre1",
          senderName: "Megha Kundapur",
          college: "RV College of Engineering",
          message: "Getting overheating safety warnings in SRE caliper simulations. What friction factor coefficient stabilizer is recommended?",
          timestamp: "11:02 AM",
          topicId: "SRE",
        },
        {
          id: "sre2",
          senderName: "Rohan Kamath",
          college: "VIT Vellore",
          message: "Make sure you adjust the radial contact wear-rate model variables. High-kinetic materials stabilize thermal swelling.",
          timestamp: "11:15 AM",
          topicId: "SRE",
        }
      ],
      iot: [
        {
          id: "iot1",
          senderName: "Aniket Deshpande",
          college: "COEP Pune",
          message: "The sensor vibration diagnostic is dropping samples. Is 60Hz enough for the digital oscilloscope converter?",
          timestamp: "Yesterday",
          topicId: "IoT",
        },
        {
          id: "iot2",
          senderName: "Megha Kundapur",
          college: "RV College of Engineering",
          message: "According to Nyquist, you need to sample at least at 2x the highest system frequency. Try bumping it up to 120Hz.",
          timestamp: "Yesterday",
          topicId: "IoT",
        }
      ],
    };
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Synchronize chat with localStorage
  useEffect(() => {
    localStorage.setItem("mechPeerDiscussions_v4", JSON.stringify(channelMessages));
  }, [channelMessages]);

  // Scroll to bottom on thread change or message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages, activeChannelId, isTyping]);

  // Play a soft high-tech chirp sound using standard HTML5 Audio synthesis
  const playChirp = (frequency: number, duration: number, type: "sine" | "triangle" | "sine" = "sine") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // safe fallback
    }
  };

  // Automated smart reply scheduler mimicking real-time active multi-user participation
  const triggerAutomatedReply = async (userMsg: string, targetChannelId: string) => {
    setIsTyping(true);
    
    // Choose which peer will reply
    const peersAvailable = registeredUsers.length > 0 
      ? registeredUsers 
      : [{ name: "Pranav Kulkarni", college: "IIT Madras" }, { name: "Shruti Hegde", college: "IIT Bombay" }];
    const chosenPeerIndex = Math.floor(Math.random() * peersAvailable.length);
    const peer = peersAvailable[chosenPeerIndex];
    setTypingUser(peer.name);

    try {
      // 1. Fetch real-time context-aware academic response from server-side Gemini route
      const response = await fetch("/api/peer-discussion-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          channelId: targetChannelId,
          candidateName: candidateName || "You",
          collegeName: collegeName || "IIT Madras",
          peers: registeredUsers
        })
      });

      if (!response.ok) {
        throw new Error("Server response was not successful code");
      }

      const data = await response.json();
      
      // Delay slightly (1-1.2s) to preserve normal reading pace and real-time feel
      setTimeout(() => {
        const activeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderName: data.senderName || peer.name,
          college: data.college || peer.college || "IIT Participant",
          message: data.message,
          timestamp: activeTime,
          topicId: data.topicId || CHANNELS.find(c => c.id === targetChannelId)?.topicId || "CAD"
        };

        setChannelMessages(prev => {
          const currentTh = prev[targetChannelId] || [];
          return {
            ...prev,
            [targetChannelId]: [...currentTh, newReply]
          };
        });

        setIsTyping(false);
        setTypingUser("");
        playChirp(520, 0.15, "sine"); // Received message chirp
      }, 1000);

    } catch (error) {
      console.warn("Peer Discussion API unreachable. Engaging high-fidelity local semantic fallback:", error);
      
      // 2. High-fidelity Local Semantic Fallback
      setTimeout(() => {
        let replyMessage = "";
        const lowerMsg = userMsg.toLowerCase();

        // Simple keywords dictionary matching student coordination or topic questions
        if (lowerMsg.includes("1v1") || lowerMsg.includes("challenge") || lowerMsg.includes("compete") || lowerMsg.includes("duel")) {
          replyMessage = `Sounds awesome! Count me in. Click the "Challenge Target" button next to my name and initiate the socratic matrix. I'm locked in!`;
        } else if (lowerMsg.includes("anyone") || lowerMsg.includes("who is") || lowerMsg.includes("study")) {
          replyMessage = `I'm studying the current topic right now. Let's do a joint study run! Use the study timer widget on the right to sync up cycles.`;
        } else if (lowerMsg.includes("help") || lowerMsg.includes("formula") || lowerMsg.includes("equation")) {
          replyMessage = `For this syllabus topic, the primary formulas are detailed inside the Interactive Lesson popups. Double check the mechanical bounds!`;
        } else {
          // Topic-specific generic smart tips
          switch (targetChannelId) {
            case "cad":
              replyMessage = `Don't forget that grounding the crankshaft base pin is critical to stop the whole 3D model from drifting on the assembly plane. Let's dual!`;
              break;
            case "fea":
              replyMessage = `Mesh count plays a major role. Lower Node count computes faster but loses deflection stress gradients. Dynamic boundary refinement is key!`;
              break;
            case "cfd":
              replyMessage = `The lift coefficient curve has a steep drop when separation takes hold. Keep an eye on localized vortex turbulence vectors.`;
              break;
            case "sre":
              replyMessage = `Indeed, caliper friction SRE coefficients require perfect heat-swelling compensation. Make sure the radial wear math reflects the speed limit.`;
              break;
            case "iot":
              replyMessage = `Remember that Nyquist theorem is key in telemetry sampling. Low sampling rates result in severe aliasing of the vibration graph.`;
              break;
            default:
              replyMessage = `Got it! That coordinate matches perfectly with my syllabus notes. Let's continue testing our dynamic cognitive limits in the provings grounds.`;
          }
        }

        const activeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderName: peer.name,
          college: peer.college || "IIT Participant",
          message: replyMessage,
          timestamp: activeTime,
          topicId: CHANNELS.find(c => c.id === targetChannelId)?.topicId || "CAD"
        };

        setChannelMessages(prev => {
          const currentTh = prev[targetChannelId] || [];
          return {
            ...prev,
            [targetChannelId]: [...currentTh, newReply]
          };
        });

        setIsTyping(false);
        setTypingUser("");
        playChirp(520, 0.15, "sine"); // Received message chirp
      }, 1500);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const activeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      senderName: candidateName || "You",
      college: collegeName || "IIT Madras (You)",
      message: newMessage,
      timestamp: activeTime,
      topicId: CHANNELS.find(c => c.id === activeChannelId)?.topicId || "CAD",
      isUser: true,
    };

    setChannelMessages(prev => {
      const currentTh = prev[activeChannelId] || [];
      return {
        ...prev,
        [activeChannelId]: [...currentTh, userMsg]
      };
    });

    const typedText = newMessage;
    setNewMessage("");
    playChirp(680, 0.08, "triangle"); // Sent message chirp

    // Trigger auto peer response
    triggerAutomatedReply(typedText, activeChannelId);
  };

  return (
    <div className="bg-[#0b0b0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-teal-500 via-indigo-500 to-amber-500" />
      
      {/* 1. HEADER ELEMENT */}
      <div className="p-4 md:px-6 bg-zinc-950/70 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageSquare size={18} className="text-teal-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <h4 className="font-mono text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              PEER NETWORK DISCUSSION TERMINAL
              <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-zinc-400">ACTIVE CAMPUS MESH</span>
            </h4>
            <p className="text-[10px] md:text-xs text-zinc-400 font-sans mt-0.5 font-medium leading-none">
              Coordinate live 1v1 challenges, debug academic formulas, and debate syllabus parameters.
            </p>
          </div>
        </div>

        {/* Action controllers buttons */}
        <div className="flex items-center gap-2 font-mono text-[10px] shrink-0">
          <button
            type="button"
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playChirp(800, 0.05);
            }}
            className={`p-1.5 px-2.5 rounded border transition-all flex items-center gap-1 cursor-pointer ${
              soundEnabled ? "bg-teal-500/15 border-teal-500/20 text-teal-405" : "bg-zinc-900 border-white/5 text-zinc-500"
            }`}
            title="Toggle Notification Sounds"
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span>{soundEnabled ? "Sounds: On" : "Muted"}</span>
          </button>
        </div>
      </div>

      {/* 2. CHAT & CHANNEL DIVISION GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] lg:min-h-[420px]">
        
        {/* LEFT COMPASS: CHANNELLIST RAIL (4 / 12 Cols) */}
        <div className="col-span-1 md:col-span-4 bg-zinc-950/40 border-r border-white/5 p-3 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest block px-2 leading-none pb-1">
              CHANNELS BY TOPIC
            </span>
            <div className="space-y-1">
              {CHANNELS.map((ch) => {
                const isActive = activeChannelId === ch.id;
                const unread = ch.id === "cad" && activeChannelId !== "cad"; // Static aesthetic touch
                
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChannelId(ch.id);
                      playChirp(480, 0.05);
                    }}
                    className={`w-full text-left p-2 rounded-lg font-mono text-[11px] transition-all flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? "bg-zinc-900/90 border border-white/10 text-teal-400 font-extrabold shadow" 
                        : "text-zinc-400 hover:bg-zinc-900/40 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Hash size={13} className={isActive ? "text-teal-400" : "text-zinc-600 group-hover:text-zinc-400"} />
                      <span className="truncate">#{ch.name}</span>
                    </div>
                    {unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connected peers count bottom gauge */}
          <div className="p-2 bg-black/60 border border-white/5 rounded-lg mt-4 text-[10px] font-mono text-zinc-400 space-y-1.5">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-zinc-500">Live Campus Nodes:</span>
              <span className="text-emerald-400 font-bold block">● {registeredUsers.length + 1} ONLINE</span>
            </div>
            <div className="space-y-1 text-[9px] text-zinc-500 max-h-[85px] overflow-y-auto">
              <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                <span className="truncate">✓ You ({candidateName || "IIT Scholar"})</span>
                <span className="text-[8px] px-1 bg-teal-500/15 border border-teal-500/20 text-teal-400 rounded">Me</span>
              </div>
              {registeredUsers.map((reg, idx) => (
                <div key={idx} className="flex justify-between items-center px-1">
                  <span className="truncate">• {reg.name} ({reg.college})</span>
                  <span className="text-[8px] text-emerald-400 font-semibold">{reg.score}p</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT DECK: DISCUSSION WINDOW FEEDS (8 / 12 Cols) */}
        <div className="col-span-1 md:col-span-8 flex flex-col bg-zinc-950/20 text-xs">
          
          {/* Active room topic label banner */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 truncate">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span className="font-mono text-[10px] font-black text-zinc-300 uppercase tracking-wide truncate">
                TOPIC: {CHANNELS.find(c => c.id === activeChannelId)?.topic}
              </span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline uppercase">SECURED COGNITIVE SYNC</span>
          </div>

          {/* CHAT MESSAGES SCROLL SCREEN */}
          <div className="flex-1 p-4 space-y-4 max-h-[290px] md:max-h-[330px] overflow-y-auto">
            {(channelMessages[activeChannelId] || []).map((msg) => {
              const matchesTarget = !msg.isUser;
              const matchesTopicId = msg.topicId || "CAD";
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2.5 transition-all animate-fadeIn ${
                    msg.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bullet user tag indicator */}
                  {!msg.isUser && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-mono text-xs font-black text-teal-400 select-none shrink-0">
                      {msg.senderName.charAt(0)}
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className={`max-w-[85%] rounded-xl p-3 border space-y-1.5 ${
                    msg.isUser 
                      ? "bg-indigo-950/20 border-indigo-500/20 text-indigo-100" 
                      : "bg-[#111114] border-white/5 text-zinc-350"
                  }`}>
                    {/* Header info bar */}
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] select-none text-zinc-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className={`font-bold font-sans ${msg.isUser ? "text-indigo-400" : "text-teal-400"}`}>
                          {msg.senderName}
                        </span>
                        <span className="truncate">({msg.college})</span>
                      </div>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Body message text */}
                    <p className="font-sans font-medium text-xs md:text-[12.5px] leading-relaxed break-words whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    {/* CHALLENGE REDIRECT ACTION TRIGGER PILL */}
                    {matchesTarget && (
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                        <span className="text-[9.5px] font-mono text-amber-500 font-bold block shrink-0">
                          🎯 Active Topic: {matchesTopicId}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectPeerForChallenge(msg.senderName, matchesTopicId);
                            playChirp(720, 0.1);
                          }}
                          className="px-2 py-1 bg-amber-500 text-black hover:bg-amber-400 transition-all font-mono text-[9px] font-black uppercase tracking-wider rounded flex items-center gap-1 cursor-pointer select-none"
                        >
                          <Swords size={10} />
                          <span>Challenge {msg.senderName.split(" ")[0]}</span>
                          <ArrowRight size={8} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Simulated typist indicators */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 italic pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-650 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.4s]" />
                <span className="font-sans font-bold text-teal-550 mr-1">{typingUser}</span>
                <span>is formulating reply...</span>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* SEND MESSAGE FOOT FORM */}
          <form 
            onSubmit={handleSendMessage} 
            className="p-3 bg-zinc-950/90 border-t border-white/10 flex items-center gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type message to #${CHANNELS.find(c => c.id === activeChannelId)?.name}...`}
                className="w-full bg-black border border-white/15 p-2.5 pl-3 pr-10 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-teal-500/80 tracking-wide text-zinc-150"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-650 tracking-wider">
                ENTER TO SEND
              </span>
            </div>
            
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="py-2.5 px-4 bg-teal-550 border border-teal-550/20 text-white disabled:bg-zinc-900 disabled:border-white/5 disabled:text-zinc-600 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-teal-500 transition-all cursor-pointer"
            >
              <Send size={12} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
