import React, { useState, useEffect } from 'react';
import { ShieldCheck, CalendarCheck, Check, Loader2, Send, Lock, User, Home, Mail, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';

interface TestRideFormProps {
  candidateName: string;
  setCandidateName: (n: string) => void;
  candidateEmail: string;
  setCandidateEmail: (e: string) => void;
  collegeName: string;
  setCollegeName: (c: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  onResetAllState?: () => void;
  setScore?: React.Dispatch<React.SetStateAction<number>>;
  setDailyStreak?: React.Dispatch<React.SetStateAction<number>>;
}

interface UserAccount {
  name: string;
  email: string;
  password: string;
  collegeName: string;
}

const PRE_SEEDED_ACCOUNTS: UserAccount[] = [
  { name: "Pranav Kulkarni", email: "pranav@mechforge.edu", password: "student123", collegeName: "KLE Technological University" },
  { name: "Shruti Hegde", email: "shruti@mechforge.edu", password: "student123", collegeName: "IIT Bombay" },
  { name: "Aniket Deshpande", email: "aniket@mechforge.edu", password: "student123", collegeName: "RV College of Engineering" },
  { name: "Rohan Kamath", email: "rohan@mechforge.edu", password: "student123", collegeName: "MIT Manipal" },
  { name: "Megha Kundapur", email: "megha@mechforge.edu", password: "student123", collegeName: "COEP Technological University" },
];

export default function TestRideForm({
  candidateName,
  setCandidateName,
  candidateEmail,
  setCandidateEmail,
  collegeName,
  setCollegeName,
  isLoggedIn,
  setIsLoggedIn,
  onResetAllState,
  setScore,
  setDailyStreak
}: TestRideFormProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCollege, setRegCollege] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Profile Editor state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(candidateName);
  const [editEmail, setEditEmail] = useState(candidateEmail);
  const [editCollege, setEditCollege] = useState(collegeName);
  const [editPassword, setEditPassword] = useState('');

  // Initialize and load accounts list from localStorage
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('mechUserAccounts');
      if (saved) {
        return JSON.parse(saved);
      } else {
        localStorage.setItem('mechUserAccounts', JSON.stringify(PRE_SEEDED_ACCOUNTS));
        return PRE_SEEDED_ACCOUNTS;
      }
    } catch {
      return PRE_SEEDED_ACCOUNTS;
    }
  });

  // Sync profile editing fields when user logging or status changes
  useEffect(() => {
    if (isLoggedIn) {
      setEditName(candidateName);
      setEditEmail(candidateEmail);
      setEditCollege(collegeName);
      const currentAcc = accounts.find(a => a.email.toLowerCase().trim() === candidateEmail.toLowerCase().trim());
      setEditPassword(currentAcc ? currentAcc.password : 'student123');
    }
  }, [isLoggedIn, candidateName, candidateEmail, collegeName, accounts]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const checkEmail = email.trim().toLowerCase();
    const checkPassword = password;

    if (!checkEmail || !checkPassword) {
      setErrorMsg("Please complete email and password fields.");
      return;
    }

    // Input sanitization / injection checks
    const dangerPattern = /[<>{}[\]"'`\\;]/;
    if (dangerPattern.test(checkEmail) || dangerPattern.test(checkPassword)) {
      setErrorMsg("SECURITY INFRASTRURE WARNING: Input contains prohibited character sequences.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(checkEmail)) {
      setErrorMsg("Syntax error: Please enter a correct, validated email address.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      const foundAccount = accounts.find(
        acc => acc.email.toLowerCase().trim() === checkEmail && acc.password === checkPassword
      );

      if (foundAccount) {
        setIsLoggedIn(true);
        setCandidateName(foundAccount.name);
        setCollegeName(foundAccount.collegeName);
        setCandidateEmail(foundAccount.email);
        localStorage.setItem('mechCandidateName', foundAccount.name);
        localStorage.setItem('mechCollegeName', foundAccount.collegeName);
        localStorage.setItem('mechUserEmail', foundAccount.email);
        localStorage.setItem('mechIsLoggedIn', 'true');

        const emailKey = foundAccount.email.toLowerCase().trim();

        // Restore or initialize fresh academic metrics specific to this student
        const savedScore = localStorage.getItem(`mechCurrentScore_${emailKey}`);
        const savedStreak = localStorage.getItem(`mechDailyStreak_${emailKey}`);
        
        let loadedScore = 0;
        if (savedScore) {
          loadedScore = parseInt(savedScore, 10);
        } else {
          const globalScore = localStorage.getItem('mechCurrentScore');
          loadedScore = globalScore ? parseInt(globalScore, 10) : 0;
          localStorage.setItem(`mechCurrentScore_${emailKey}`, loadedScore.toString());
        }
        if (setScore) setScore(loadedScore);

        let loadedStreak = 1;
        if (savedStreak) {
          loadedStreak = parseInt(savedStreak, 10);
        } else {
          const globalStreak = localStorage.getItem('mechDailyStreak');
          loadedStreak = globalStreak ? parseInt(globalStreak, 10) : 1;
        }

        // Daily login tracking logic to implement "increase daily if logged in every day"
        const todayStr = new Date().toDateString(); // e.g. "Wed May 27 2026"
        const lastLoginStr = localStorage.getItem(`mechLastLoginDate_${emailKey}`);

        if (lastLoginStr) {
          if (lastLoginStr === todayStr) {
            // Already logged in today, preserve streak
          } else {
            // Check if last login was yesterday to maintain/increment daily streak
            const todayDate = new Date(todayStr);
            const lastLoginDate = new Date(lastLoginStr);
            const diffTime = Math.abs(todayDate.getTime() - lastLoginDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              // Streak maintained! Increment by 1 for accessing on consecutive day
              loadedStreak += 1;
            } else if (diffDays > 1) {
              // Streak broken! Reset to 1
              loadedStreak = 1;
            }
            localStorage.setItem(`mechLastLoginDate_${emailKey}`, todayStr);
          }
        } else {
          // No previous login date recorded, set to today
          localStorage.setItem(`mechLastLoginDate_${emailKey}`, todayStr);
        }

        localStorage.setItem(`mechDailyStreak_${emailKey}`, loadedStreak.toString());
        if (setDailyStreak) setDailyStreak(loadedStreak);
        
        // Ensure user is also in the leaderboard state
        const currentRegUsers = (() => {
          try {
            const saved = localStorage.getItem('mechRegisteredUsers');
            return saved ? JSON.parse(saved) : [];
          } catch { return []; }
        })();
        
        const hasUserOnLeaderboard = currentRegUsers.some(
          (u: any) => u.name.toLowerCase().trim() === foundAccount.name.toLowerCase().trim()
        );
        
        if (!hasUserOnLeaderboard) {
          currentRegUsers.push({
            name: foundAccount.name,
            college: foundAccount.collegeName,
            score: loadedScore,
            status: "ACTIVE"
          });
          localStorage.setItem('mechRegisteredUsers', JSON.stringify(currentRegUsers));
        }

        setSuccessMsg(`Welcome back, ${foundAccount.name}!`);
      } else {
        setErrorMsg("ACCESS DENIED: Invalid email or password. You can also sign up for a new account.");
      }
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const nameVal = regName.trim();
    const emailVal = regEmail.trim().toLowerCase();
    const passwordVal = regPassword;
    const collegeVal = regCollege.trim();

    if (!nameVal || !emailVal || !passwordVal || !collegeVal) {
      setErrorMsg("Please fill in all registration fields.");
      return;
    }

    // Prohibit cross-site scripting or database injection payloads
    const dangerPattern = /[<>{}[\]"'`\\;]/;
    if (dangerPattern.test(nameVal) || dangerPattern.test(emailVal) || dangerPattern.test(passwordVal) || dangerPattern.test(collegeVal)) {
      setErrorMsg("SECURITY VIOLATION: Input fields contain prohibited structural characters to safeguard platform integrity.");
      return;
    }

    const lowerName = nameVal.toLowerCase();
    const lowerEmail = emailVal.toLowerCase();
    const lowerCollege = collegeVal.toLowerCase();

    // Enforce real name syntax: only alphabets, spaces, dots, and hyphens/apostrophes
    const realNameRegex = /^[a-zA-Z\s'\-.]+$/;
    if (!realNameRegex.test(nameVal) || nameVal.length < 3) {
      setErrorMsg("AUTHENTICATION BLOCK: Scholar name must consist of at least 3 alphabetical characters only (letters, spaces, dots/hyphens allowed). Code strings, numbers, or symbols are prohibited.");
      return;
    }

    // College validation: must contain clean name strings, no random numbers
    if (!realNameRegex.test(collegeVal) || collegeVal.length < 4) {
      setErrorMsg("INTEGRITY FAULT: Institution name must consist of at least 4 alphabetical characters. Prohibiting coordinates, digits, and random string entries.");
      return;
    }

    // Strict front-end pre-screening for dummy accounts
    const fakeKeywords = ["test", "dummy", "fake", "admin", "none", "nobody", "asd", "asdf", "qwert", "zxcv", "xyz", "123", "placeholder", "mock", "guest", "temp", "trash"];
    const isNameSuspicious = fakeKeywords.some(kw => lowerName === kw || lowerName.includes("test ") || lowerName.includes("dummy ") || lowerName.replace(/\s+/g, '') === kw);
    const isCollegeSuspicious = fakeKeywords.some(kw => lowerCollege === kw || lowerCollege.includes("fake ") || lowerCollege.replace(/\s+/g, '') === kw);
    const isEmailSuspicious = fakeKeywords.some(kw => lowerEmail.includes(kw)) || emailVal.includes("example") || emailVal.includes("test@") || emailVal.includes("gmail1") || emailVal.includes("tempmail") || emailVal.endsWith("@mail.com") || emailVal.includes("mailinator");

    if (isNameSuspicious) {
      setErrorMsg("AUTHENTICATION BLOCK: Simulated, test, or placeholder user identities cannot be registered on this secure instance.");
      return;
    }
    if (isCollegeSuspicious) {
      setErrorMsg("INTEGRITY FAULT: Please specify an authentic physical college or academic specialization instead of a mock keyword.");
      return;
    }
    if (isEmailSuspicious) {
      setErrorMsg("SECURITY GATEWAY BLOCK: Disposable, junk, or suspicious domain configurations are disabled. Please use your verified academic or private mail identifier.");
      return;
    }

    // Enforce Password Quality constraint: min 6 chars, must contain a mix of letters and numbers
    if (passwordVal.length < 6) {
      setErrorMsg("Security constraint: Password must be at least 6 characters long to maintain strict account security.");
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(passwordVal);
    const hasDigit = /[0-9]/.test(passwordVal);
    if (!hasLetter || !hasDigit) {
      setErrorMsg("Security constraint: Password must contain a mixture of alphabetical letters and numerical numbers for robust score locking.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      setErrorMsg("Syntax error: Please enter a correct, validated email syntax.");
      return;
    }

    const emailExists = accounts.some(acc => acc.email.toLowerCase().trim() === emailVal);
    if (emailExists) {
      setErrorMsg("REGISTER FAILURE: An account with this email already exists.");
      return;
    }

    setIsSubmitting(true);

    fetch('/api/detect-fake-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameVal, email: emailVal, college: collegeVal })
    })
      .then(res => res.json())
      .then(analysis => {
        setIsSubmitting(false);

        if (analysis && analysis.isReal === false) {
          setErrorMsg(`❌ SECURE SCHOLASTIC GATEKEEPER FLAG:\nAnalysis Confidence: ${analysis.confidenceScore}%\nReason: ${analysis.reason || "This is flagged as a placeholder or testing registration parameters."}`);
          return;
        }

        const newAccount: UserAccount = {
          name: nameVal,
          email: emailVal,
          password: passwordVal,
          collegeName: collegeVal
        };

        const updatedAccounts = [...accounts, newAccount];
        setAccounts(updatedAccounts);
        localStorage.setItem('mechUserAccounts', JSON.stringify(updatedAccounts));

        // Successfully log in the newly registered account
        setIsLoggedIn(true);
        setCandidateName(nameVal);
        setCollegeName(collegeVal);
        setCandidateEmail(emailVal);
        localStorage.setItem('mechCandidateName', nameVal);
        localStorage.setItem('mechCollegeName', collegeVal);
        localStorage.setItem('mechUserEmail', emailVal);
        localStorage.setItem('mechIsLoggedIn', 'true');

        // New accounts start entirely clean on day 1 with isolated profile metrics
        const emailKey = emailVal.toLowerCase().trim();
        localStorage.setItem(`mechCurrentScore_${emailKey}`, '0');
        localStorage.setItem(`mechDailyStreak_${emailKey}`, '1');
        localStorage.setItem(`mechLastLoginDate_${emailKey}`, new Date().toDateString());
        if (setScore) setScore(0);
        if (setDailyStreak) setDailyStreak(1);

        // Add they to the active leaderboard
        const currentRegUsers = (() => {
          try {
            const saved = localStorage.getItem('mechRegisteredUsers');
            return saved ? JSON.parse(saved) : [];
          } catch { return []; }
        })();
        
        currentRegUsers.push({
          name: nameVal,
          college: collegeVal,
          score: 0,
          status: "ACTIVE"
        });
        localStorage.setItem('mechRegisteredUsers', JSON.stringify(currentRegUsers));

        setSuccessMsg(`🎉 Real student verified! ${analysis ? `AI Validation Confidence: ${analysis.confidenceScore}%. ` : ''}Welcome, ${nameVal}!`);
      })
      .catch(err => {
        console.error("Auth API communicating failure:", err);
        setIsSubmitting(false);
        setErrorMsg("Communication error communicating with the Scholastic Gatekeeper AI. Please try again.");
      });
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const nameVal = editName.trim();
    const emailVal = editEmail.trim().toLowerCase();
    const passwordVal = editPassword;
    const collegeVal = editCollege.trim();

    if (!nameVal || !emailVal || !passwordVal || !collegeVal) {
      setErrorMsg("All profile fields are required.");
      return;
    }

    // Sanitization & check
    const dangerPattern = /[<>{}[\]"'`\\;]/;
    if (dangerPattern.test(nameVal) || dangerPattern.test(emailVal) || dangerPattern.test(passwordVal) || dangerPattern.test(collegeVal)) {
      setErrorMsg("SECURITY WARNING: Prohibited special characters detected inside inputs.");
      return;
    }

    const realNameRegex = /^[a-zA-Z\s'\-.]+$/;
    if (!realNameRegex.test(nameVal) || nameVal.length < 3) {
      setErrorMsg("AUTHENTICATION BLOCK: Please provide a valid, real scholar name containing letters/spaces.");
      return;
    }
    if (!realNameRegex.test(collegeVal) || collegeVal.length < 4) {
      setErrorMsg("INTEGRITY FAULT: Please input a valid university name (at least 4 alphabetical characters).");
      return;
    }

    if (passwordVal.length < 6) {
      setErrorMsg("Security constraint: Password must be at least 6 characters.");
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(passwordVal);
    const hasDigit = /[0-9]/.test(passwordVal);
    if (!hasLetter || !hasDigit) {
      setErrorMsg("Security constraint: Password must contain letters and numbers.");
      return;
    }

    // Verify if changed email is already utilized by another account
    if (emailVal !== candidateEmail.toLowerCase().trim()) {
      const emailExists = accounts.some(acc => acc.email.toLowerCase().trim() === emailVal);
      if (emailExists) {
        setErrorMsg("UPDATE FAILURE: An account with this email address already exists.");
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Map and update account object inside dynamic state
      const updatedAccounts = accounts.map(acc => {
        if (acc.email.toLowerCase().trim() === candidateEmail.toLowerCase().trim()) {
          return {
            name: nameVal,
            email: emailVal,
            password: passwordVal,
            collegeName: collegeVal
          };
        }
        return acc;
      });
      setAccounts(updatedAccounts);
      localStorage.setItem('mechUserAccounts', JSON.stringify(updatedAccounts));

      // Update current registered identity keys
      const oldCandidateName = candidateName;
      setCandidateName(nameVal);
      setCandidateEmail(emailVal);
      setCollegeName(collegeVal);

      localStorage.setItem('mechCandidateName', nameVal);
      localStorage.setItem('mechUserEmail', emailVal);
      localStorage.setItem('mechCollegeName', collegeVal);

      // Sync user profile state dynamically on leaderboard database
      const currentRegUsers = (() => {
        try {
          const saved = localStorage.getItem('mechRegisteredUsers');
          return saved ? JSON.parse(saved) : [];
        } catch { return []; }
      })();

      const idx = currentRegUsers.findIndex((u: any) => u.name.toLowerCase().trim() === oldCandidateName.toLowerCase().trim());
      if (idx > -1) {
        currentRegUsers[idx].name = nameVal;
        currentRegUsers[idx].college = collegeVal;
      } else {
        const currentScore = parseInt(localStorage.getItem('mechCurrentScore') || '85', 10);
        currentRegUsers.push({
          name: nameVal,
          college: collegeVal,
          score: currentScore,
          status: "ACTIVE"
        });
      }
      localStorage.setItem('mechRegisteredUsers', JSON.stringify(currentRegUsers));

      setIsEditingProfile(false);
      setSuccessMsg("Your scholar credentials and registered student database fields have been compiled.");
    }, 1200);
  };

  const startEditing = () => {
    setEditName(candidateName);
    setEditEmail(candidateEmail);
    setEditCollege(collegeName);
    const currentAcc = accounts.find(a => a.email.toLowerCase().trim() === candidateEmail.toLowerCase().trim());
    setEditPassword(currentAcc ? currentAcc.password : 'student123');
    setIsEditingProfile(true);
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleLogout = () => {
    setCandidateName('');
    setCollegeName('');
    setEmail('');
    setPassword('');
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegCollege('');
    setIsLoggedIn(false);
    setCandidateEmail('');
    localStorage.removeItem('mechCandidateName');
    localStorage.removeItem('mechCollegeName');
    localStorage.removeItem('mechUserEmail');
    localStorage.removeItem('mechIsLoggedIn');
    if (setScore) setScore(0);
    if (setDailyStreak) setDailyStreak(0);
  };

  return (
    <div id="test-ride-section" className="bg-[#111111] p-6 md:p-10 border border-white/10 rounded-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-suzuki-red/5 rounded-full blur-3xl" />
      
      {/* Visual Success / Logged In State */}
      {isLoggedIn ? (
        <div className="relative z-10 animate-fadeIn">
          {isEditingProfile ? (
            /* ================= EDIT PROFILE PANEL ================= */
            <form onSubmit={handleSaveProfileSubmit} className="space-y-6">
              <div>
                <span className="font-condensed text-xs text-suzuki-red tracking-[0.2em] uppercase font-bold mb-2 flex items-center gap-2">
                  <UserPlus size={14} />
                  Credentials Desk
                </span>
                <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase">
                  EDIT ACADEMIC PROFILE CREDENTIALS
                </h3>
                <p className="text-xs text-gray-400 font-sans tracking-wide">
                  Configure your real-user identity parameters. Modifying email immediately updates local sandbox registries.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/20 border border-red-500/30 text-xs font-mono text-red-400">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-condensed uppercase tracking-widest text-gray-500 font-bold mb-1.5 flex items-center gap-1">
                    <User size={10} className="text-suzuki-red" />
                    Full Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-condensed uppercase tracking-widest text-gray-500 font-bold mb-1.5 flex items-center gap-1">
                    <Home size={10} className="text-suzuki-red" />
                    Area of Specialization
                  </label>
                  <input
                    type="text"
                    required
                    value={editCollege}
                    onChange={(e) => setEditCollege(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-condensed uppercase tracking-widest text-gray-500 font-bold mb-1.5 flex items-center gap-1">
                  <Mail size={10} className="text-suzuki-red" />
                  Your Email Address (Access ID)
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-condensed uppercase tracking-widest text-gray-500 font-bold mb-1.5 flex items-center gap-1">
                  <Lock size={10} className="text-suzuki-red" />
                  Password
                </label>
                <input
                  type="text"
                  required
                  placeholder="Set account password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-suzuki-red hover:bg-red-700 text-white font-condensed font-extrabold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={12} /> : null}
                  SAVE CREDENTIALS
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-750 text-white font-condensed font-extrabold text-xs tracking-widest uppercase transition-all cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </form>
          ) : (
            /* ================= LOGGED IN DASHBOARD VIEW ================= */
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Check size={32} />
              </div>

              <h3 className="font-bebas text-4xl tracking-wider text-white uppercase mb-2">
                MECHFORGE COGNITIVE ACCESS ONLINE
              </h3>
              
              <p className="text-base text-gray-400 max-w-md mx-auto font-sans leading-relaxed mb-6">
                Welcome back scholar, <span className="text-white font-extrabold">{candidateName}</span>! <br />
                Your system access for email <span className="text-suzuki-red font-semibold">{candidateEmail}</span> is authenticated under specialization <span className="text-white font-semibold">{collegeName}</span>.
              </p>

              {successMsg && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-6 max-w-md mx-auto">
                  ✓ {successMsg}
                </div>
              )}

              <div className="bg-black/60 border border-white/10 inline-block p-4 rounded font-mono text-xs mb-8 font-bold">
                <div className="text-gray-400 uppercase text-sm tracking-widest mb-1 font-bold">SCHOLASTIC_TOKEN</div>
                <div className="text-suzuki-red text-xl font-bold tracking-widest font-mono">MECHFORGE_CREDENTIALS_ACTIVE</div>
                <div className="text-gray-400 mt-2 text-sm">Session Status: REAL-TIME EVALUATION SYNC · Database: LOCAL SANDBOX</div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={startEditing}
                  className="px-6 py-2.5 bg-[#181818] text-white border border-white/20 hover:border-suzuki-red transition-all text-xs font-condensed font-bold uppercase tracking-widest cursor-pointer"
                >
                  Edit Profile & Custom Email
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-white text-black hover:bg-[#e2231a] hover:text-white transition-all text-xs font-condensed font-bold uppercase tracking-widest cursor-pointer"
                >
                  Sign Out & Close Console
                </button>
              </div>
              <p className="text-base text-gray-400 font-mono font-medium mt-6">Your profile details & high score are stored locally inside the sandbox.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative z-10 space-y-6">
          <div>
            <span className="font-condensed text-xs text-suzuki-red tracking-[0.2em] uppercase font-bold mb-2 flex items-center gap-2">
              <CalendarCheck size={14} />
              Unified Credentials Desk
            </span>
            <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase">
              STUDY SUITE BOOT CONSOLE
            </h3>
            <p className="text-sm md:text-base text-gray-300 font-sans tracking-wide font-medium">
              Configure your permanent student authentication credentials to start monitoring academic scores and diagnostic calculations.
            </p>
            {onResetAllState && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#e2231a]/10 border border-[#e2231a]/25 rounded mt-2">
                <div className="text-xs text-gray-400 font-mono">
                  <span className="text-[#e2231a] font-bold">💡 EXPERIENCING THE PLATFORM FIRST TIME?</span> You can wipe all previous demo progress, scores, and active credentials to begin from scratch.
                </div>
                <button
                  type="button"
                  onClick={onResetAllState}
                  className="px-3.5 py-1.5 bg-[#e2231a] hover:bg-neutral-800 border border-[#e2231a]/30 text-[10px] text-white uppercase font-mono font-extrabold rounded cursor-pointer transition-colors whitespace-nowrap self-start sm:self-center"
                >
                  ⚙️ RESET AND START FRESH
                </button>
              </div>
            )}
          </div>

          {/* Secure Mode Switch Tabs */}
          <div className="flex border-b border-white/10">
            <button
              type="button"
              id="tab-login-btn"
              onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-3 text-xs font-condensed font-black tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
                authMode === 'login'
                  ? 'border-suzuki-red text-white bg-white/[0.03]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <LogIn size={13} className={authMode === 'login' ? 'text-suzuki-red' : ''} />
              SECURE LOG IN
            </button>
            <button
              type="button"
              id="tab-signup-btn"
              onClick={() => { setAuthMode('signup'); setErrorMsg(null); }}
              className={`flex-1 py-3 text-xs font-condensed font-black tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
                authMode === 'signup'
                  ? 'border-suzuki-red text-white bg-white/[0.03]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <UserPlus size={13} className={authMode === 'signup' ? 'text-suzuki-red' : ''} />
              CREATE ACCOUNT
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/20 border border-red-500/30 text-xs font-mono text-red-400 animate-fadeIn">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 animate-fadeIn">
              ✓ {successMsg}
            </div>
          )}

          {authMode === 'login' ? (
            /* ================= LOG IN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <Mail size={10} className="text-suzuki-red" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., student@mechforge.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <Lock size={10} className="text-suzuki-red" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 pr-10 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded p-3 text-xs text-gray-300">
                <span className="font-bold text-white block mb-1">Pre-seeded Test Accounts:</span>
                <p className="font-mono text-xs text-[#e2231a] leading-relaxed">
                  Email: <span className="text-white font-semibold">pranav@mechforge.edu</span> <br />
                  Password: <span className="text-white font-semibold">student123</span>
                </p>
                <p className="mt-1 font-sans text-xs">
                  All test users can be logged into utilizing <code className="bg-black/40 text-rose-300 font-mono px-1 rounded">student123</code>. Or feel free to sign up.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="w-full py-4 bg-suzuki-red hover:bg-red-700 disabled:bg-neutral-800 disabled:text-gray-500 text-white font-condensed font-extrabold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Securing Session Terminal...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    BOOT CONTROL CONSOLE →
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ================= SIGN UP FORM ================= */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <User size={10} className="text-suzuki-red" />
                  Full Student Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <Mail size={10} className="text-suzuki-red" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jsmith@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <Lock size={10} className="text-suzuki-red" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create security password..."
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 pr-10 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-condensed uppercase tracking-widest text-gray-400 font-bold mb-1.5 flex items-center gap-1">
                  <Home size={10} className="text-suzuki-red" />
                  College or Institution Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford University or MIT"
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white rounded p-3 text-xs focus:ring-1 focus:ring-suzuki-red focus:border-suzuki-red outline-none font-mono"
                />
              </div>

              <div className="p-3 bg-white/5 border border-white/5 rounded text-xs text-gray-300 flex items-start gap-2">
                <ShieldCheck size={14} className="text-suzuki-red shrink-0 mt-0.5" />
                <span>By registering, your account is securely stored locally inside your browser's workspace storage. No external servers receive your details.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !regName || !regEmail || !regPassword || !regCollege}
                className="w-full py-4 bg-suzuki-red hover:bg-red-700 disabled:bg-neutral-800 disabled:text-gray-500 text-white font-condensed font-extrabold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Compiling Profile Schema...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    COMPILE & REGISTER ACCOUNT →
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
