// app.js - Core application engine for the 90-Day Python Tracker

// ==========================================================================
// 1. APPLICATION STATE & GLOBAL CONFIGS
// ==========================================================================
let activeProfile = null; // 1, 2 or null
let isAdminMode = false;
let isMuted = false;
let activeChapter = 0; // 0 = All Chapters, 1-8 for specific phases
let statusFilter = 'all'; // 'all', 'todo', 'done'
let activeDayDetail = null;
let hintLevelOpened = 0; // Tracks hint level opened for current active day
let hintTimerInterval = null;
let dayStartTime = null; // Tracks epoch milliseconds when detail modal opens

const CODETRIVIA = [
  "The first computer bug was a real moth found trapped in a computer relay by Grace Hopper in 1947!",
  "The first computer programmer was Ada Lovelace in 1843, who wrote an algorithm for an early mechanical computer.",
  "Python was named after the British comedy group 'Monty Python' and creator Guido van Rossum's love for their show.",
  "The first hard disk drive, made by IBM in 1956, could hold only 5 megabytes of data and weighed over a ton!",
  "The QWERTY keyboard layout was designed in 1873 to prevent mechanical typewriter keys from jamming by separating common letters.",
  "In 1999, the Mars Climate Orbiter was lost because one software team used English units and another used metric units!",
  "The first computer game was called 'Spacewar!' and was created in 1962 at MIT on a computer the size of a car.",
  "More than 70% of professional software code relies on open-source libraries created by communities for free.",
  "The word 'algorithm' is named after the 9th-century Persian mathematician Muhammad ibn Musa al-Khwarizmi.",
  "CAPTCHA stands for 'Completely Automated Public Turing test to tell Computers and Humans Apart'."
];

// Ranks structure based on XP thresholds
const RANKS = [
  { xp: 0, title: "Script Kitten" },
  { xp: 500, title: "Byte Initiate" },
  { xp: 1200, title: "Logic Novice" },
  { xp: 2500, title: "Loop Apprentice" },
  { xp: 4500, title: "Python Squire" },
  { xp: 7500, title: "Syntax Sorcerer" },
  { xp: 12000, title: "Grand Master Code Wizard" }
];

// Phase Milestone mappings
const PHASE_METADATA = {
  1: { title: "Basic Foundations", days: [1, 15], cert: "Apprentice of Variables & Inputs" },
  2: { title: "Logic & Decisions", days: [16, 30], cert: "Guardian of Logic Gates" },
  3: { title: "Loops & Repetition", days: [31, 45], cert: "Master of the Infinite Loop" },
  4: { title: "Lists & Sequences", days: [46, 60], cert: "Squire of Lists & Sequences" },
  5: { title: "Dicts & Collections", days: [61, 70], cert: "Archivist of Key-Value Maps" },
  6: { title: "Reusable Functions", days: [71, 80], cert: "Architect of Functions" },
  7: { title: "Imports & Graphics", days: [81, 85], cert: "Imports & Visual Artistry Squire" },
  8: { title: "Files & Capstone", days: [86, 90], cert: "Grand Master Python Code Wizard" }
};

// ==========================================================================
// 2. AUDIO SYNTHESIZER MODULE (Web Audio API)
// ==========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'coin') {
      // Satisfying retro coin pickup (ascending pitch)
      osc.type = 'square';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'levelup') {
      // Ascending chord fanfare
      osc.type = 'triangle';
      const notes = [261.63, 329.63, 392.00, 523.25]; // C chord
      notes.forEach((freq, idx) => {
        const timeOffset = idx * 0.08;
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'triangle';
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.frequency.setValueAtTime(freq, now + timeOffset);
        noteGain.gain.setValueAtTime(0.06, now + timeOffset);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.3);
        noteOsc.start(now + timeOffset);
        noteOsc.stop(now + timeOffset + 0.3);
      });
    } else if (type === 'alert') {
      // Quick synth alert
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    console.warn("Audio Context failed: ", e);
  }
}

// ==========================================================================
// 3. STORAGE & PROFILE CONTROLLERS
// ==========================================================================
function getProfileKey(profileId) {
  return `python_tracker_profile_${profileId}`;
}

function getDefaultProfileData(defaultName) {
  return {
    displayName: defaultName,
    xp: 0,
    streak: 0,
    shields: 0,
    lastCompletedDate: null,
    dailyLockChecked: true, // limit to 1 per day
    completedDays: {}, // dayNum -> { badge: 'gold'/'silver'/'bronze', code: '', parentSigned: false }
    unlockedCerts: []
  };
}

function loadProfileData(profileId) {
  const key = getProfileKey(profileId);
  let data = localStorage.getItem(key);
  if (!data) {
    const defaultName = profileId === 1 ? "Learner A" : "Learner B";
    data = getDefaultProfileData(defaultName);
    saveProfileData(profileId, data);
  } else {
    data = JSON.parse(data);
  }
  return data;
}

function saveProfileData(profileId, data) {
  const key = getProfileKey(profileId);
  localStorage.setItem(key, JSON.stringify(data));
}

// Activity logging (System Audit Trail)
function logActivity(profileId, message) {
  const logKey = "python_tracker_activity_log";
  let logs = localStorage.getItem(logKey);
  logs = logs ? JSON.parse(logs) : [];
  
  const timestamp = new Date().toLocaleString();
  const profileName = profileId ? loadProfileData(profileId).displayName : "Parent (Admin)";
  
  logs.unshift({
    timestamp,
    profileName,
    message
  });
  
  // Cap logs to 200 items to conserve memory
  if (logs.length > 200) {
    logs.pop();
  }
  
  localStorage.setItem(logKey, JSON.stringify(logs));
}

// Initialize Profile selection display
function initProfileScreen() {
  for (let i = 1; i <= 2; i++) {
    const data = loadProfileData(i);
    document.getElementById(`p${i}-display-name`).innerText = data.displayName;
    
    const ageEl = document.getElementById(`p${i}-display-age`);
    if (data.age) {
      ageEl.innerText = `Age: ${data.age}`;
      ageEl.style.display = "block";
    } else {
      ageEl.style.display = "none";
    }
    
    document.getElementById(`p${i}-display-rank`).innerText = getRankTitle(data.xp);
    document.getElementById(`p${i}-display-xp`).innerText = `${data.xp} XP`;
  }
}

function selectProfile(profileId) {
  activeProfile = profileId;
  isAdminMode = false;
  document.getElementById("profile-select-screen").classList.remove("active");
  
  const data = loadProfileData(profileId);
  logActivity(profileId, "Logged in");
  
  // Update header and view
  updateHeader();
  renderCertsNav();
  filterChapter(0); // Load all days
  
  playSound('levelup');
}

function logoutProfile() {
  if (activeProfile) {
    logActivity(activeProfile, "Logged out");
  }
  activeProfile = null;
  isAdminMode = false;
  initProfileScreen();
  document.getElementById("profile-select-screen").classList.add("active");
}

// ==========================================================================
// 4. RANK & STATS CALCULATION
// ==========================================================================
function getRankTitle(xp) {
  let title = RANKS[0].title;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) {
      title = RANKS[i].title;
    } else {
      break;
    }
  }
  return title;
}

function getXPNeededForNextRank(xp) {
  let nextRank = RANKS[RANKS.length - 1];
  let currentThreshold = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].xp) {
      nextRank = RANKS[i];
      currentThreshold = RANKS[i-1].xp;
      break;
    }
  }
  const diffTotal = nextRank.xp - currentThreshold;
  const currentProgress = xp - currentThreshold;
  return {
    nextTitle: nextRank.title,
    nextXp: nextRank.xp,
    percent: diffTotal > 0 ? (currentProgress / diffTotal) * 100 : 100
  };
}

function updateHeader() {
  if (!activeProfile) return;
  const data = loadProfileData(activeProfile);
  
  document.getElementById("streak-val").innerText = `${data.streak} days`;
  document.getElementById("shields-val").innerText = `${data.shields} / 3`;
  document.getElementById("rank-title").innerText = getRankTitle(data.xp);
  
  // Calculate XP values
  const needed = getXPNeededForNextRank(data.xp);
  document.getElementById("xp-val").innerText = `${data.xp} XP`;
  document.getElementById("xp-progress-bar").style.width = `${needed.percent}%`;

  // Update header profile bubble
  const usernameEl = document.getElementById("header-username");
  const ageEl = document.getElementById("header-user-age");
  const avatarEl = document.getElementById("header-avatar");
  
  if (usernameEl) usernameEl.innerText = data.displayName;
  if (ageEl) {
    if (data.age) {
      ageEl.innerText = `Age: ${data.age}`;
      ageEl.style.display = "block";
    } else {
      ageEl.style.display = "none";
    }
  }
  if (avatarEl) avatarEl.innerText = activeProfile === 1 ? "🤖" : "👾";
}

// ==========================================================================
// 5. THEME MANAGEMENT (Light Minimal Sage Green vs Dark Minimalist)
// ==========================================================================
function initTheme() {
  const currentTheme = localStorage.getItem("python_tracker_theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("theme-floating-toggle").querySelector(".theme-icon").innerText = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    document.getElementById("theme-floating-toggle").querySelector(".theme-icon").innerText = "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("python_tracker_theme", isDark ? "dark" : "light");
  document.getElementById("theme-floating-toggle").querySelector(".theme-icon").innerText = isDark ? "☀️" : "🌙";
  playSound('coin');
}

function toggleMute() {
  isMuted = !isMuted;
  document.getElementById("sound-toggle").innerText = isMuted ? "🔇" : "🔊";
}

// ==========================================================================
// 6. ADVENTURE PLAYBOOK LAYOUT & CARD RENDERING
// ==========================================================================
function getXPForDay(dayNum) {
  if (dayNum <= 15) return 100;
  if (dayNum <= 30) return 150;
  if (dayNum <= 45) return 200;
  if (dayNum <= 60) return 250;
  if (dayNum <= 70) return 300;
  if (dayNum <= 80) return 350;
  if (dayNum <= 85) return 400;
  return 500; // Boss levels (86-90)
}

function filterChapter(chapterNum) {
  activeChapter = chapterNum;
  
  // Highlight navigation button
  document.querySelectorAll(".nav-chapter-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`chapter-btn-${chapterNum}`).classList.add("active");
  
  // Update view title
  const viewTitle = document.getElementById("current-chapter-view-title");
  if (chapterNum === 0) {
    viewTitle.innerText = "All Chapters Playbook";
  } else {
    viewTitle.innerText = `Chapter ${chapterNum}: ${PHASE_METADATA[chapterNum].title}`;
  }
  
  renderDaysGrid();
}

function filterStatus(status) {
  statusFilter = status;
  
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`f-${status}`).classList.add("active");
  
  renderDaysGrid();
}

// Render dynamic day grid
function renderDaysGrid() {
  if (!activeProfile) return;
  const data = loadProfileData(activeProfile);
  const grid = document.getElementById("playbook-grid");
  grid.innerHTML = "";
  
  // Fetch curriculum
  let days = window.CURRICULUM;
  
  // Filter by Chapter (Phase)
  if (activeChapter !== 0) {
    days = days.filter(d => d.phase === activeChapter);
  }
  
  const todayStr = new Date().toDateString();
  
  days.forEach((day, idx) => {
    const dayNum = day.day;
    const completedInfo = data.completedDays[dayNum];
    const isCompleted = !!completedInfo;
    
    // Check Status Filter
    if (statusFilter === 'todo' && isCompleted) return;
    if (statusFilter === 'done' && !isCompleted) return;
    
    // Logic Lock (Pacing Controls)
    // Locked if previous day is not completed, AND parent has lock enabled.
    let isLocked = false;
    if (dayNum > 1 && data.dailyLockChecked) {
      const prevCompleted = !!data.completedDays[dayNum - 1];
      if (!prevCompleted) {
        isLocked = true;
      }
    }
    
    // Build Card Element
    const card = document.createElement("div");
    card.className = `day-card ${isCompleted ? 'done' : ''} ${isLocked ? 'locked' : ''}`;
    
    // Click action
    if (!isLocked) {
      card.setAttribute("onclick", `openDayDetail(${dayNum})`);
    }
    
    // Status Icon
    let statusIcon = "⬜";
    if (isLocked) {
      statusIcon = "🔒";
    } else if (isCompleted) {
      if (completedInfo.badge === 'gold') statusIcon = "🏆";
      else if (completedInfo.badge === 'silver') statusIcon = "🥈";
      else statusIcon = "🥉";
    }
    
    let parentSigStamp = "";
    if (isCompleted && completedInfo.parentSigned) {
      parentSigStamp = `<span class="card-parent-sig" title="Parent Reviewed & Approved">🛡️</span>`;
    }
    
    card.innerHTML = `
      <div class="day-card-header">
        <span class="card-day-badge">Day ${dayNum}</span>
        <span class="card-status-indicator">${statusIcon}</span>
      </div>
      <div class="day-card-body">
        <h4>${day.title}</h4>
        <p class="card-desc">${day.concept}</p>
        <span class="card-xp-indicator">${getXPForDay(dayNum)} XP</span>
      </div>
      ${parentSigStamp}
    `;
    
    grid.appendChild(card);
  });
}

// ==========================================================================
// 7. DAY DETAILS PANEL & PROGRESSIVE HINT CONTROLLERS
// ==========================================================================
// ==========================================================================
function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function openNextDay() {
  if (!activeDayDetail) return;
  const nextDayNum = activeDayDetail.day + 1;
  if (nextDayNum <= 90) {
    openDayDetail(nextDayNum);
  }
}

function openDayDetail(dayNum) {
  const day = window.CURRICULUM.find(d => d.day === dayNum);
  if (!day) return;
  
  activeDayDetail = day;
  hintLevelOpened = 0;
  dayStartTime = Date.now(); // Start timer
  
  const data = loadProfileData(activeProfile);
  const completedInfo = data.completedDays[dayNum];
  const isCompleted = !!completedInfo;
  
  // Show modal overlay
  const modal = document.getElementById("day-detail-modal");
  modal.classList.add("active");
  
  // Update elements
  document.getElementById("detail-day-num").innerText = `Day ${dayNum}`;
  document.getElementById("detail-title").innerText = day.title;
  document.getElementById("detail-phase-name").innerText = `Phase ${day.phase}: ${PHASE_METADATA[day.phase].title}`;
  document.getElementById("detail-lore").innerText = day.lore;
  document.getElementById("detail-concept").innerText = day.concept;
  document.getElementById("detail-guide").innerText = day.parentGuide;
  document.getElementById("detail-challenge").innerText = day.challenge;
  
  // Setup Next Day Button
  const nextBtn = document.getElementById("detail-footer-next-btn");
  if (dayNum === 90) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-flex";
    const nextDayNum = dayNum + 1;
    let isNextLocked = false;
    if (data.dailyLockChecked) {
      // Locked if this day (prev of next) is not complete
      if (!isCompleted) {
        isNextLocked = true;
      }
    }
    
    if (isNextLocked) {
      nextBtn.innerText = "Next Day 🔒";
      nextBtn.disabled = true;
      nextBtn.style.opacity = 0.5;
      nextBtn.style.cursor = "not-allowed";
    } else {
      nextBtn.innerText = "Next Day ➡️";
      nextBtn.disabled = false;
      nextBtn.style.opacity = 1;
      nextBtn.style.cursor = "pointer";
    }
  }

  // Setup Sibling / Speed Nudge & Start Live Stopwatch Timer
  if (detailTimerInterval) {
    clearInterval(detailTimerInterval);
  }
  updateDetailTimer(); // Update nudge content immediately
  detailTimerInterval = setInterval(updateDetailTimer, 1000);

  // Setup Badge status label
  const badgeEarned = document.getElementById("detail-badge-earned");
  if (isCompleted) {
    let badgeText = "🏆 Gold Badge Earned!";
    if (completedInfo.badge === 'silver') badgeText = "🥈 Silver Badge Earned";
    if (completedInfo.badge === 'bronze') badgeText = "🥉 Bronze Badge Earned";
    badgeEarned.innerText = badgeText;
    badgeEarned.style.display = "block";
  } else {
    badgeEarned.style.display = "none";
  }

  // Setup Code Vault textarea
  const vaultTextarea = document.getElementById("detail-code-vault");
  vaultTextarea.value = (completedInfo && completedInfo.code) ? completedInfo.code : "";
  
  // Setup Subtasks checklist
  renderChecklist(day, isCompleted, completedInfo);
  
  // Setup Hints Reset
  const hintDisplay = document.getElementById("hint-display-box");
  hintDisplay.style.display = "none";
  hintDisplay.innerText = "";
  
  const hintBtn = document.getElementById("btn-hint");
  hintBtn.innerText = "Request Clue (Level 1 Hint)";
  hintBtn.disabled = isCompleted; // Disable if completed
  if (isCompleted) {
    hintBtn.innerText = "Challenge Completed!";
  }
  
  if (hintTimerInterval && isCompleted) {
    // Stop running stopwatch if already complete
    clearInterval(detailTimerInterval);
    detailTimerInterval = null;
  }
  
  playSound('coin');
}

function closeDayDetail() {
  document.getElementById("day-detail-modal").classList.remove("active");
  if (hintTimerInterval) {
    clearInterval(hintTimerInterval);
  }
  if (detailTimerInterval) {
    clearInterval(detailTimerInterval);
    detailTimerInterval = null;
  }
  renderDaysGrid();
  updateHeader();
}

function updateDetailTimer() {
  if (!activeDayDetail || !activeProfile || !dayStartTime) return;
  
  const elapsedSeconds = Math.floor((Date.now() - dayStartTime) / 1000);
  const formattedTime = formatTime(elapsedSeconds);
  
  // Get sibling details
  const otherProfileId = activeProfile === 1 ? 2 : 1;
  const otherData = loadProfileData(otherProfileId);
  const dayNum = activeDayDetail.day;
  const otherCompleted = otherData.completedDays[dayNum];
  
  const nudgeBox = document.getElementById("sandbox-sibling-nudge");
  if (!nudgeBox) return;
  
  let content = `⏱️ <strong>Time Spent:</strong> <span style="font-family: monospace; font-size: 14px; font-weight: 700; color: var(--accent-color); margin: 0 4px;">${formattedTime}</span> | `;
  
  if (otherCompleted && otherCompleted.completionTime) {
    const otherTime = otherCompleted.completionTime;
    const timeDiff = otherTime - elapsedSeconds;
    
    if (timeDiff > 0) {
      content += `🔥 <strong>Record Beat:</strong> beat <strong>${otherData.displayName}</strong>'s time of <strong>${formatTime(otherTime)}</strong>! (Remain faster by ${formatTime(timeDiff)})`;
    } else {
      content += `🐢 <strong>Keep Coding:</strong> <strong>${otherData.displayName}</strong> finished this day in <strong>${formatTime(otherTime)}</strong>. Take your time!`;
    }
  } else {
    // Speed bonuses targets
    if (elapsedSeconds <= 60) {
      content += `⚡ <strong>Super Sonic:</strong> finish in under 1 min for <strong>+100 XP</strong> bonus!`;
    } else if (elapsedSeconds <= 180) {
      content += `🚀 <strong>Speedy Coder:</strong> finish in under 3 min for <strong>+75 XP</strong> bonus!`;
    } else if (elapsedSeconds <= 300) {
      content += `🏃‍♂️ <strong>Quick Solver:</strong> finish in under 5 min for <strong>+50 XP</strong> bonus!`;
    } else {
      content += `🐢 <strong>Slow & Steady:</strong> speed bonus expired. focus on getting the solution right!`;
    }
  }
  
  nudgeBox.innerHTML = content;
}

function renderChecklist(day, isCompleted, completedInfo) {
  const ul = document.getElementById("checklist-tasks");
  ul.innerHTML = "";
  
  const standardLabels = [
    "Step 1: Read the concept, lore, and challenge.",
    "Step 2: Type your Python code in the sandbox editor.",
    "Step 3: Run your code and check the console output.",
    "Step 4: Parent reviewed & signed off on code."
  ];
  
  standardLabels.forEach((task, idx) => {
    const li = document.createElement("li");
    const isChecked = isCompleted ? completedInfo.tasks[idx] : (completedInfo ? completedInfo.tasks[idx] : false);
    
    // Enforce sequential step-by-step: 
    // Disable unless previous step is checked.
    let disabledAttr = "";
    if (idx === 3) {
      // Parent sign-off only checked by parent admin dashboard
      disabledAttr = "disabled";
    } else if (idx > 0) {
      const prevChecked = isCompleted ? completedInfo.tasks[idx - 1] : (completedInfo ? completedInfo.tasks[idx - 1] : false);
      if (!prevChecked) {
        disabledAttr = "disabled";
      }
    }
    
    if (isCompleted && idx < 3) {
      // Lock student tasks if day is already fully completed
      disabledAttr = "disabled";
    }
    
    li.innerHTML = `
      <input type="checkbox" id="task-chk-${idx}" ${isChecked ? 'checked' : ''} ${disabledAttr} onchange="toggleTask(${day.day}, ${idx})">
      <label for="task-chk-${idx}" style="${disabledAttr ? 'opacity: 0.6; cursor: not-allowed;' : ''}">${task}</label>
    `;
    ul.appendChild(li);
  });
}

// Save pasted code vault
function saveVaultCode() {
  if (!activeProfile || !activeDayDetail) return;
  const dayNum = activeDayDetail.day;
  const data = loadProfileData(activeProfile);
  
  const code = document.getElementById("detail-code-vault").value;
  
  if (!data.completedDays[dayNum]) {
    data.completedDays[dayNum] = { badge: 'gold', tasks: [false, false, false, false], code: '', parentSigned: false };
  }
  
  data.completedDays[dayNum].code = code;
  saveProfileData(activeProfile, data);
  logActivity(activeProfile, `Saved code vault backup for Day ${dayNum}`);
}

// In-browser Python Sandbox Execution (via Skulpt)
function runSandboxCode(editorId, outputId) {
  const code = document.getElementById(editorId).value;
  const outputArea = document.getElementById(outputId);
  outputArea.innerText = "Compiling and running...";
  outputArea.style.display = "block";
  
  // Check if Skulpt loaded
  if (typeof Sk === 'undefined') {
    outputArea.innerText = "❌ Execution Error: Skulpt compiler library not loaded. Make sure you are online or CDN scripts are fetched.";
    playSound('alert');
    return;
  }

  // Clear output area
  outputArea.innerText = "";

  // Auto-save student work if they run it in the main editor
  if (editorId === 'detail-code-vault') {
    saveVaultCode();
  }

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }

  Sk.configure({
    output: function(text) {
      outputArea.innerText += text;
    },
    read: builtinRead,
    inputfun: function(promptText) {
      return window.prompt(promptText || "Input requested:");
    },
    inputfunTakesPrompt: true
  });

  try {
    const myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    });

    myPromise.then(
      function(mod) {
        outputArea.innerText += "\n\n--- [Execution Finished] ---";
      },
      function(err) {
        outputArea.innerText += "\n\n❌ Python Error:\n" + err.toString();
        playSound('alert');
      }
    );
  } catch (err) {
    outputArea.innerText += "\n\n❌ Compiler Error:\n" + err.toString();
    playSound('alert');
  }
}

function clearConsole(outputId) {
  const outputArea = document.getElementById(outputId);
  outputArea.innerText = "";
  outputArea.style.display = "none";
}

// Helper: Download a local `.py` script template
function downloadStarterFile() {
  if (!activeDayDetail) return;
  const day = activeDayDetail;
  const filename = `day${day.day}_${day.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.py`;
  const blob = new Blob([day.starterCode], { type: "text/plain;charset=utf-8" });
  
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  logActivity(activeProfile, `Downloaded starter Python file for Day ${day.day}`);
}

// Progressive Hint triggering
function triggerNextHint() {
  if (!activeDayDetail || !activeProfile) return;
  const day = activeDayDetail;
  const hintDisplay = document.getElementById("hint-display-box");
  const hintBtn = document.getElementById("btn-hint");
  
  if (hintLevelOpened === 0) {
    // Reveal Level 1 Hint
    hintLevelOpened = 1;
    hintDisplay.innerHTML = `<strong>💡 Level 1 Hint (Concept clue):</strong>\n${day.hints[0]}`;
    hintDisplay.style.display = "block";
    hintBtn.innerText = "Request Blueprint (Level 2 Hint)";
    
    playSound('alert');
    logActivity(activeProfile, `Unlocked Level 1 hint for Day ${day.day}`);
  } else if (hintLevelOpened === 1) {
    // Reveal Level 2 Hint
    hintLevelOpened = 2;
    hintDisplay.innerHTML += `\n\n<strong>🛠️ Level 2 Hint (Code Blueprint):</strong>\n${day.hints[1]}\n<em>(Using this hint cap rewards at Silver Badge status)</em>`;
    hintBtn.innerText = "Unlock Master Solution (Level 3 Hint)";
    
    playSound('alert');
    logActivity(activeProfile, `Unlocked Level 2 hint for Day ${day.day}`);
  } else if (hintLevelOpened === 2) {
    // Reveal Level 3 Hint (Countdown Warning)
    hintBtn.disabled = true;
    let secondsLeft = 5;
    
    playSound('alert');
    
    hintTimerInterval = setInterval(() => {
      hintBtn.innerText = `Unlocking code in ${secondsLeft}s... Try typing it yourself first!`;
      secondsLeft--;
      
      if (secondsLeft < 0) {
        clearInterval(hintTimerInterval);
        hintLevelOpened = 3;
        hintDisplay.innerHTML += `\n\n<strong>🔑 Level 3 Hint (Exact Solution Code):</strong>\n<pre>${day.hints[2]}</pre>\n<em>(Using this hint caps rewards at Bronze Badge status)</em>`;
        hintBtn.innerText = "Solution Unlocked";
        
        logActivity(activeProfile, `Unlocked Level 3 exact solution for Day ${day.day}`);
      }
    }, 1000);
  }
}

// Task checkbox toggle logic
function toggleTask(dayNum, taskIdx) {
  if (!activeProfile) return;
  const data = loadProfileData(activeProfile);
  
  // Create day data object if empty
  if (!data.completedDays[dayNum]) {
    data.completedDays[dayNum] = { badge: 'gold', tasks: [false, false, false, false], code: '', parentSigned: false };
  }
  
  const chk = document.getElementById(`task-chk-${taskIdx}`);
  data.completedDays[dayNum].tasks[taskIdx] = chk.checked;
  
  // Sequential unchecking: if this task is unchecked, clear all subsequent tasks
  if (!chk.checked) {
    for (let i = taskIdx + 1; i < 4; i++) {
      data.completedDays[dayNum].tasks[i] = false;
    }
  }
  
  saveProfileData(activeProfile, data);
  playSound('coin');
  
  logActivity(activeProfile, `${chk.checked ? 'Checked' : 'Unchecked'} task ${taskIdx + 1} of Day ${dayNum}`);
  
  // Verify if day is complete (only Student tasks: indexes 0, 1, 2)
  const tasks = data.completedDays[dayNum].tasks;
  const isStudentCompleted = tasks[0] && tasks[1] && tasks[2];
  
  if (isStudentCompleted && !isDayAlreadyEarned(data.completedDays[dayNum])) {
    completeDay(dayNum, data);
  } else {
    // Re-render checklist to update enabled/disabled states of checkboxes dynamically
    const completedInfo = data.completedDays[dayNum];
    const isCompleted = isDayAlreadyEarned(completedInfo);
    renderChecklist(activeDayDetail, isCompleted, completedInfo);
  }
}

function isDayAlreadyEarned(completedDayObj) {
  // If badge is set and it is already counted in streak
  return completedDayObj.badge === 'gold' || completedDayObj.badge === 'silver' || completedDayObj.badge === 'bronze';
}

// Day completion logic
function completeDay(dayNum, data) {
  // Stop running stopwatch
  if (detailTimerInterval) {
    clearInterval(detailTimerInterval);
    detailTimerInterval = null;
  }

  // 1. Determine Badge based on Hint usage
  let badge = 'gold';
  if (hintLevelOpened === 2) badge = 'silver';
  if (hintLevelOpened >= 3) badge = 'bronze';
  
  data.completedDays[dayNum].badge = badge;
  
  // Calculate completion time spent
  const durationSeconds = dayStartTime ? Math.floor((Date.now() - dayStartTime) / 1000) : 120;
  data.completedDays[dayNum].completionTime = durationSeconds;
  
  // 2. Award XP
  let xpReward = getXPForDay(dayNum);
  
  // Speed bonuses:
  let speedBonusXP = 0;
  let speedBonusTitle = "";
  
  if (durationSeconds <= 60) {
    speedBonusXP = 100;
    speedBonusTitle = "⚡ Super Sonic Bonus +100 XP!";
  } else if (durationSeconds <= 180) {
    speedBonusXP = 75;
    speedBonusTitle = "🚀 Speedy Coder Bonus +75 XP!";
  } else if (durationSeconds <= 300) {
    speedBonusXP = 50;
    speedBonusTitle = "🏃‍♂️ Quick Solver Bonus +50 XP!";
  }
  
  xpReward += speedBonusXP;
  data.xp += xpReward;
  
  // 3. Update Streaks & Shields
  updateStreakAndShields(data);
  
  // 4. Save
  saveProfileData(activeProfile, data);
  
  // 5. Trigger Sound and Visual Confetti
  playSound('levelup');
  triggerConfetti();
  
  // 6. Update UI labels
  const badgeEarned = document.getElementById("detail-badge-earned");
  const speedText = speedBonusXP > 0 ? ` (${speedBonusTitle})` : "";
  let badgeText = `🏆 Gold Badge Earned! +${xpReward} XP Awarded!${speedText}`;
  if (badge === 'silver') badgeText = `🥈 Silver Badge Earned. +${xpReward} XP Awarded!${speedText}`;
  if (badge === 'bronze') badgeText = `🥉 Bronze Badge Earned. +${xpReward} XP Awarded!${speedText}`;
  badgeEarned.innerText = badgeText;
  badgeEarned.style.display = "block";
  
  // Immediately unlock Next Day button on completion
  const nextBtn = document.getElementById("detail-footer-next-btn");
  if (nextBtn && dayNum < 90) {
    nextBtn.innerText = "Next Day ➡️";
    nextBtn.disabled = false;
    nextBtn.style.opacity = 1;
    nextBtn.style.cursor = "pointer";
  }
  
  document.getElementById("btn-hint").disabled = true;
  document.getElementById("btn-hint").innerText = "Challenge Completed!";
  
  logActivity(activeProfile, `Completed Day ${dayNum} with a ${badge.toUpperCase()} badge in ${formatTime(durationSeconds)}! Earned ${xpReward} XP.`);
  
  // 7. Check for Chapter Certificates
  checkChapterMilestone(dayNum, data);
}

function updateStreakAndShields(data) {
  const todayStr = new Date().toDateString();
  const lastDateStr = data.lastCompletedDate;
  
  if (!lastDateStr) {
    // First completed day
    data.streak = 1;
  } else {
    const today = new Date(todayStr);
    const lastDate = new Date(lastDateStr);
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Completed yesterday, streak continues!
      data.streak += 1;
      
      // Earn a Streak Shield every 7 days (max 3)
      if (data.streak % 7 === 0) {
        if (data.shields < 3) {
          data.shields += 1;
          logActivity(activeProfile, "Earned a Streak Shield 🛡️ for a 7-day streak!");
        }
      }
    } else if (diffDays > 1) {
      // Missed days!
      // Check if they have a shield to absorb the drop
      if (data.shields > 0) {
        data.shields -= 1;
        data.streak += 1; // Preserve streak
        logActivity(activeProfile, "Streak Shield 🛡️ consumed to protect coding streak!");
      } else {
        // Break streak
        data.streak = 1;
      }
    }
  }
  data.lastCompletedDate = todayStr;
}

// Check if all days in a phase are complete to trigger certificate
function checkChapterMilestone(dayNum, data) {
  const currentPhase = window.CURRICULUM.find(d => d.day === dayNum).phase;
  
  // Find boundaries of this phase
  const metadata = PHASE_METADATA[currentPhase];
  const startDay = metadata.days[0];
  const endDay = metadata.days[1];
  
  let allDone = true;
  for (let d = startDay; d <= endDay; d++) {
    if (!data.completedDays[d] || !data.completedDays[d].badge) {
      allDone = false;
      break;
    }
  }
  
  if (allDone && !data.unlockedCerts.includes(currentPhase)) {
    data.unlockedCerts.push(currentPhase);
    saveProfileData(activeProfile, data);
    
    // Trigger perfect chapter bonus XP
    // Check if all are Gold Badges
    let allGold = true;
    for (let d = startDay; d <= endDay; d++) {
      if (data.completedDays[d].badge !== 'gold') {
        allGold = false;
        break;
      }
    }
    
    if (allGold) {
      data.xp += 1000;
      saveProfileData(activeProfile, data);
      logActivity(activeProfile, `🏆 Perfect Chapter! Unlocked all Gold Badges in Phase ${currentPhase}. Awarded +1000 XP bonus!`);
    }
    
    logActivity(activeProfile, `🎖️ Unlocked Certificate for Phase ${currentPhase}: ${metadata.cert}`);
    
    // Wait a brief second for details modal closure before displaying cert
    setTimeout(() => {
      openCertModal(currentPhase);
    }, 1500);
  }
}

// Confetti effects
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ==========================================================================
// 8. CHAPTER COMPLETION CERTIFICATES MODULE
// ==========================================================================
function openCertModal(phaseNum) {
  if (!activeProfile) return;
  const data = loadProfileData(activeProfile);
  const metadata = PHASE_METADATA[phaseNum];
  
  const modal = document.getElementById("certificate-modal");
  
  document.getElementById("cert-student-name").innerText = data.displayName;
  document.getElementById("cert-achievement-text").innerText = 
    `For successfully completing all daily exercises and coding projects in Chapter ${phaseNum}: "${metadata.title}" of the 90-Day Python Playbook.`;
  
  // Date completed formatting
  document.getElementById("cert-date-val").innerText = new Date().toLocaleDateString();
  document.getElementById("cert-rank-val").innerText = getRankTitle(data.xp);
  
  // Count parents signatures in this phase
  let signedCount = 0;
  for (let d = metadata.days[0]; d <= metadata.days[1]; d++) {
    if (data.completedDays[d] && data.completedDays[d].parentSigned) {
      signedCount++;
    }
  }
  
  const totalDaysInPhase = metadata.days[1] - metadata.days[0] + 1;
  document.getElementById("cert-signature-val").innerText = 
    signedCount === totalDaysInPhase ? "Verified Parent Sign-Off" : "Self-Certified Verification";

  modal.classList.add("active");
  playSound('levelup');
  triggerConfetti();
}

function closeCertModal() {
  document.getElementById("certificate-modal").classList.remove("active");
  renderCertsNav();
}

function printCertificate() {
  window.print();
}

function renderCertsNav() {
  if (!activeProfile) return;
  const data = loadProfileData(activeProfile);
  const list = document.getElementById("unlocked-certs-list");
  list.innerHTML = "";
  
  if (data.unlockedCerts.length === 0) {
    list.innerHTML = `<div class="no-certs">No chapters completed yet. Keep studying!</div>`;
    return;
  }
  
  data.unlockedCerts.forEach(phaseNum => {
    const meta = PHASE_METADATA[phaseNum];
    const item = document.createElement("div");
    item.className = "cert-item-badge";
    item.setAttribute("onclick", `openCertModal(${phaseNum})`);
    
    item.innerHTML = `
      <div class="badge-icon">🎖️</div>
      <div class="badge-details">
        <span class="badge-name">${meta.cert}</span>
        <span class="badge-unlock">Chapter ${phaseNum} Milestones</span>
      </div>
    `;
    list.appendChild(item);
  });
}

// ==========================================================================
// 9. PARENT PASSCODE CONTROLLER & ADMIN DASHBOARD
// ==========================================================================
function openAdminPasswordModal() {
  document.getElementById("admin-passcode-error").innerText = "";
  document.getElementById("admin-password-modal").classList.add("active");
  
  const loginSection = document.getElementById("admin-login-section");
  const setupSection = document.getElementById("admin-setup-section");
  const title = document.getElementById("admin-modal-title");
  const desc = document.getElementById("admin-modal-desc");
  const submitBtn = document.getElementById("admin-passcode-submit-btn");
  
  const currentPasscode = localStorage.getItem("python_tracker_admin_passcode");
  
  if (!currentPasscode) {
    // Setup mode on first launch
    title.innerText = "Setup Parent Onboarding";
    desc.innerText = "Welcome! Set a secret parent passcode and configure your kids' profiles to start their Python adventure.";
    loginSection.style.display = "none";
    setupSection.style.display = "block";
    submitBtn.innerText = "Complete Onboarding";
    submitBtn.onclick = setupAdminPassword;
    document.getElementById("admin-passcode-setup-1").focus();
  } else {
    // Standard verification mode
    title.innerText = "Enter Admin Passcode";
    desc.innerText = "Please type your parent passcode to access the tracking logs and settings.";
    loginSection.style.display = "block";
    setupSection.style.display = "none";
    submitBtn.innerText = "Unlock";
    submitBtn.onclick = verifyAdminPassword;
    document.getElementById("admin-passcode-input").focus();
  }
}

function closeAdminPasswordModal() {
  document.getElementById("admin-password-modal").classList.remove("active");
}

function handleAdminPasswordKey(event) {
  if (event.key === "Enter") {
    verifyAdminPassword();
  }
}

function handleAdminSetupKey(event) {
  if (event.key === "Enter") {
    setupAdminPassword();
  }
}

function setupAdminPassword() {
  const pin1 = document.getElementById("admin-passcode-setup-1").value.trim();
  const pin2 = document.getElementById("admin-passcode-setup-2").value.trim();
  
  if (pin1.length < 4) {
    document.getElementById("admin-passcode-error").innerText = "Passcode must be at least 4 characters!";
    playSound('alert');
    return;
  }
  
  if (pin1 !== pin2) {
    document.getElementById("admin-passcode-error").innerText = "Passcodes do not match! Try again.";
    playSound('alert');
    return;
  }

  const p1Name = document.getElementById("setup-p1-name").value.trim() || "Learner A";
  const p1Age = document.getElementById("setup-p1-age").value.trim();
  const p2Name = document.getElementById("setup-p2-name").value.trim() || "Learner B";
  const p2Age = document.getElementById("setup-p2-age").value.trim();
  
  localStorage.setItem("python_tracker_admin_passcode", pin1);

  // Initialize profiles with customized configurations
  const p1Data = loadProfileData(1);
  p1Data.displayName = p1Name;
  p1Data.age = p1Age ? parseInt(p1Age) : null;
  saveProfileData(1, p1Data);

  const p2Data = loadProfileData(2);
  p2Data.displayName = p2Name;
  p2Data.age = p2Age ? parseInt(p2Age) : null;
  saveProfileData(2, p2Data);

  logActivity(null, `Completed parent onboarding. Configured profiles: ${p1Name} (Age: ${p1Age || 'N/A'}), ${p2Name} (Age: ${p2Age || 'N/A'})`);
  
  initProfileScreen(); // Refresh profile select screen labels
  closeAdminPasswordModal();
  openAdminDashboard();
}

function verifyAdminPassword() {
  const pin = document.getElementById("admin-passcode-input").value;
  const savedPin = localStorage.getItem("python_tracker_admin_passcode");
  if (savedPin && pin === savedPin) {
    closeAdminPasswordModal();
    openAdminDashboard();
  } else {
    document.getElementById("admin-passcode-error").innerText = "Incorrect parent passcode! Try again.";
    playSound('alert');
  }
}

// Render Parent Panel values
function openAdminDashboard() {
  isAdminMode = true;
  
  // Fill student stats cards
  for (let i = 1; i <= 2; i++) {
    const data = loadProfileData(i);
    document.getElementById(`admin-p${i}-name`).innerText = data.displayName;
    document.getElementById(`admin-p${i}-xp`).innerText = `${data.xp} XP`;
    document.getElementById(`admin-p${i}-rank`).innerText = getRankTitle(data.xp);
    document.getElementById(`admin-p${i}-streak`).innerText = `${data.streak} days`;
    document.getElementById(`admin-p${i}-shields`).innerText = `${data.shields} / 3`;
    
    // Count badge counts
    let gold = 0, silver = 0, bronze = 0;
    Object.values(data.completedDays).forEach(day => {
      if (day.badge === 'gold') gold++;
      else if (day.badge === 'silver') silver++;
      else if (day.badge === 'bronze') bronze++;
    });
    
    document.getElementById(`admin-p${i}-golds`).innerText = `🏆 ${gold}`;
    document.getElementById(`admin-p${i}-silvers`).innerText = `🥈 ${silver}`;
    document.getElementById(`admin-p${i}-bronzes`).innerText = `🥉 ${bronze}`;
    
    // Fill drop-down options for Code signoff list
    fillAdminDaysDropdown(i, data);
    
    // Sync locks switches
    document.getElementById(`admin-p${i}-lock-toggle`).checked = data.dailyLockChecked;
    document.getElementById(`admin-p${i}-lock-label`).innerText = `Restrict ${data.displayName} to 1 lesson/day`;
  }
  
  // Render Activity Log feed
  renderActivityLogsList();
  
  // Render edit inputs
  const p1Data = loadProfileData(1);
  const p2Data = loadProfileData(2);
  document.getElementById("p1-rename-input").value = p1Data.displayName;
  document.getElementById("p1-age-input").value = p1Data.age || "";
  document.getElementById("p2-rename-input").value = p2Data.displayName;
  document.getElementById("p2-age-input").value = p2Data.age || "";
  
  // Open modal overlay
  document.getElementById("parent-admin-modal").classList.add("active");
  switchAdminTab('stats');
}

function closeAdminDashboard() {
  document.getElementById("parent-admin-modal").classList.remove("active");
}

function switchAdminTab(tabId) {
  // Tabs toggle
  document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`tab-btn-${tabId}`).classList.add("active");
  
  document.querySelectorAll(".admin-tab-content").forEach(content => content.classList.remove("active"));
  document.getElementById(`admin-tab-${tabId}`).classList.add("active");
}

function fillAdminDaysDropdown(studentId, data) {
  const select = document.getElementById(`admin-p${studentId}-select-day`);
  select.innerHTML = '<option value="">-- Choose Completed Day --</option>';
  
  // List all completed days
  Object.keys(data.completedDays).sort((a,b) => a-b).forEach(dayNum => {
    const isSigned = data.completedDays[dayNum].parentSigned;
    select.innerHTML += `<option value="${dayNum}">Day ${dayNum} ${isSigned ? '(Signed)' : '(Unsigned)'}</option>`;
  });
  
  // Change listener to show code
  select.onchange = function() {
    const dayVal = select.value;
    const view = document.getElementById(`admin-p${studentId}-code-viewer`);
    if (dayVal && data.completedDays[dayVal]) {
      view.value = data.completedDays[dayVal].code || "# Student did not save code vault backup for this day.";
    } else {
      view.value = "";
    }
  };
}

// Parent signoff action
function adminSignoff(studentId) {
  const select = document.getElementById(`admin-p${studentId}-select-day`);
  const dayNum = select.value;
  if (!dayNum) {
    alert("Please select a day to sign off!");
    return;
  }
  
  const data = loadProfileData(studentId);
  if (data.completedDays[dayNum].parentSigned) {
    alert("This day is already signed off!");
    return;
  }
  
  // Perform Sign off
  data.completedDays[dayNum].parentSigned = true;
  data.completedDays[dayNum].tasks[3] = true; // Mark checklist sign-off checkbox
  data.xp += 50; // Give parent signoff bonus XP!
  
  saveProfileData(studentId, data);
  playSound('levelup');
  
  logActivity(studentId, `Parent signed off on Day ${dayNum} code and awarded +50 XP bonus!`);
  
  alert(`Successfully signed off on Day ${dayNum}! +50 XP awarded.`);
  
  // Refresh Admin View
  openAdminDashboard();
}

function renderActivityLogsList() {
  const ul = document.getElementById("admin-logs-ul");
  ul.innerHTML = "";
  
  const logKey = "python_tracker_activity_log";
  let logs = localStorage.getItem(logKey);
  logs = logs ? JSON.parse(logs) : [];
  
  if (logs.length === 0) {
    ul.innerHTML = `<li>No logs captured yet.</li>`;
    return;
  }
  
  logs.forEach(log => {
    ul.innerHTML += `
      <li>
        <strong>[${log.timestamp}]</strong> - <em>${log.profileName}:</em> ${log.message}
      </li>
    `;
  });
}

function clearActivityLogs() {
  if (confirm("Are you sure you want to clear all activity history logs?")) {
    localStorage.removeItem("python_tracker_activity_log");
    renderActivityLogsList();
  }
}

function toggleDailyLock(studentId) {
  const chk = document.getElementById(`admin-p${studentId}-lock-toggle`);
  const data = loadProfileData(studentId);
  data.dailyLockChecked = chk.checked;
  saveProfileData(studentId, data);
  
  logActivity(studentId, `Parent toggled daily locks restriction to: ${chk.checked}`);
}

function saveProfileConfig(studentId) {
  const nameInput = document.getElementById(`p${studentId}-rename-input`);
  const ageInput = document.getElementById(`p${studentId}-age-input`);
  
  const newName = nameInput.value.trim();
  const newAge = ageInput.value.trim();
  
  if (!newName) {
    alert("Name cannot be empty!");
    return;
  }
  
  const data = loadProfileData(studentId);
  const oldName = data.displayName;
  data.displayName = newName;
  data.age = newAge ? parseInt(newAge) : null;
  saveProfileData(studentId, data);
  
  logActivity(studentId, `Parent updated profile config: '${oldName}' to '${newName}' (Age: ${newAge || 'N/A'})`);
  alert("Profile configuration saved successfully!");
  openAdminDashboard();
  initProfileScreen(); // Refresh select screen
}

function fullDataReset() {
  if (confirm("🚨 WARNING: This will permanently wipe all student files, streak counts, logs, and badge progress. This cannot be undone! Are you sure?")) {
    localStorage.clear();
    logoutProfile();
    closeAdminDashboard();
    initProfileScreen();
    alert("System data cleared successfully.");
  }
}

// ==========================================================================
// 10. ENTRY INITS
// ==========================================================================
function rotateTrivia() {
  if (typeof CODETRIVIA === 'undefined' || CODETRIVIA.length === 0) return;
  const idx = Math.floor(Math.random() * CODETRIVIA.length);
  const text = document.getElementById("sidebar-trivia-text");
  if (text) {
    text.innerText = CODETRIVIA[idx];
  }
}

function rotateMainTrivia() {
  if (typeof CODETRIVIA === 'undefined' || CODETRIVIA.length === 0) return;
  const idx = Math.floor(Math.random() * CODETRIVIA.length);
  const text = document.getElementById("main-fun-fact-text");
  if (text) {
    text.innerText = CODETRIVIA[idx];
  }
}

// ==========================================================================
// 10. ENTRY INITS
// ==========================================================================
window.onload = function() {
  initTheme();
  initProfileScreen();
  rotateTrivia();
  rotateMainTrivia();
  setInterval(rotateTrivia, 25000); // Rotate coding trivia every 25 seconds
  setInterval(rotateMainTrivia, 30000); // Rotate main banner trivia every 30 seconds
};
