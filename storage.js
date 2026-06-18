// storage.js - Local Storage, Passcode Cryptography, and Data Backups

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
  
  // Resolve name (handling case where active profile load may cause circular loop during initial load)
  let profileName = "Parent (Admin)";
  if (profileId) {
    const stored = localStorage.getItem(getProfileKey(profileId));
    if (stored) {
      try {
        profileName = JSON.parse(stored).displayName;
      } catch (e) {
        profileName = profileId === 1 ? "Learner A" : "Learner B";
      }
    } else {
      profileName = profileId === 1 ? "Learner A" : "Learner B";
    }
  }
  
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

// Cryptographic hash function (asynchronous SHA-256)
async function hashPasscode(passcode) {
  const msgBuffer = new TextEncoder().encode(passcode);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Data backup export controller
function exportBackupData() {
  try {
    const backupObj = {
      version: 1,
      timestamp: new Date().toISOString(),
      profiles: {
        1: loadProfileData(1),
        2: loadProfileData(2)
      },
      adminPasscode: localStorage.getItem("python_tracker_admin_passcode"),
      activityLogs: JSON.parse(localStorage.getItem("python_tracker_activity_log") || "[]"),
      theme: localStorage.getItem("python_tracker_theme")
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `python_quest_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logActivity(null, "Exported complete profile backup file.");
  } catch (error) {
    console.error("Backup export failed:", error);
    alert("❌ Export failed: Could not generate JSON file.");
  }
}

// Data backup import controller
function importBackupData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      
      // Schema verification
      if (!imported.profiles || !imported.profiles[1] || !imported.profiles[2]) {
        throw new Error("Invalid backup file format (missing profile keys).");
      }

      // Save admin passcode
      if (imported.adminPasscode) {
        localStorage.setItem("python_tracker_admin_passcode", imported.adminPasscode);
      }

      // Save profiles
      saveProfileData(1, imported.profiles[1]);
      saveProfileData(2, imported.profiles[2]);

      // Save activity logs
      if (Array.isArray(imported.activityLogs)) {
        localStorage.setItem("python_tracker_activity_log", JSON.stringify(imported.activityLogs));
      }

      // Save theme
      if (imported.theme) {
        localStorage.setItem("python_tracker_theme", imported.theme);
      }

      logActivity(null, "Imported profile backup file successfully.");
      alert("🎉 Backup restored successfully! Refreshing dashboard.");
      
      // Reload UI elements
      location.reload();
    } catch (error) {
      console.error("Backup import failed:", error);
      alert("❌ Import failed: Invalid backup file JSON structure.");
    }
  };
  reader.readAsText(file);
}
