// admin.js - Parent Passcode Controller & Admin Dashboard

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

async function setupAdminPassword() {
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
  
  const hashedPin = await hashPasscode(pin1);
  localStorage.setItem("python_tracker_admin_passcode", hashedPin);

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

async function verifyAdminPassword() {
  const pin = document.getElementById("admin-passcode-input").value;
  const savedPin = localStorage.getItem("python_tracker_admin_passcode");
  const hashedInput = await hashPasscode(pin);
  
  if (savedPin && (hashedInput === savedPin || (savedPin.length !== 64 && pin === savedPin))) {
    // Migrate to hash if legacy plain-text
    if (savedPin.length !== 64) {
      localStorage.setItem("python_tracker_admin_passcode", hashedInput);
      logActivity(null, "Migrated plain-text passcode to SHA-256 hash.");
    }
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
