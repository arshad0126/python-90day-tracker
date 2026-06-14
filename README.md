# 🐍 Python Quest: 90-Day Gamified Code Playbook

A premium, interactive, and gamified web-based tracker designed for parents to teach Python to their kids/teens (ages 10-15) over 90 days. 

Built with **zero external dependencies** and pre-compiled client-side libraries, the application is **100% offline-ready** and runs locally without needing Node.js or npm packages.

---

## 🌟 Key Features

*   **🎓 90-Day Structured Curriculum:** Divided into 8 thematic chapters covering printing, variables, conditions, loops, collections (lists/dicts/sets), functions, libraries (random/time/turtle), and file handling.
*   **💻 Built-in Python Sandbox:** Features an in-browser Python IDE editor (powered by Skulpt) so students can write, compile, and run code directly inside their web dashboard. No software configuration required!
*   **👥 Multi-Profile Setup:** Support for 2 learner profiles (independent stats, XP, badges, streaks) and 1 Parent Admin profile.
*   **🛡️ Parent Dashboard & Logs:** Passcode-protected parent portal containing:
    *   Side-by-side stats comparison of the kids.
    *   **Activity Audit Log:** Chronological logging showing exactly when they log in, click checklists, trigger hints, or run code.
    *   **Daily lockouts:** Toggle a rule restricting them to unlocking one day's lesson per calendar day.
    *   **Code Viewer:** Inspect and execute their saved code directly on your screen.
*   **💡 Three-Tier Progressive Hints:** Level 1 (Concept clue), Level 2 (Code syntax blueprint), and Level 3 (Full solution code with a 5-second warning countdown).
*   **📜 Dynamic Milestone Certificates:** 8 phase-specific milestone certificates and a grand final graduation certificate that can be printed or saved.
*   **🎨 Dual Minimalist Themes:** Swap between fresh **Light Minimalist Sage Green** (with mouse-reactive hover states) and a **Sleek Minimalist Dark Mode** using the floating toggle in the bottom right.
*   **🔊 Web Audio Retro SFX:** SATISFYING bleeps and fanfares synthesized natively in the browser on checks and accomplishments (includes mute switch).

---

## 🚀 How to Run Locally

### For Windows Users:
1. Make sure **Python** is installed (download from [python.org](https://www.python.org/)).
2. Double-click the **`start.bat`** file inside the project directory.
3. This will launch a local server and automatically open the application in your default browser at `http://localhost:8000`.

### For Mac/Linux Users:
1. Open your terminal in this directory.
2. Run the command:
   ```bash
   python server.py
   ```
3. Open your browser and navigate to `http://localhost:8000`.

---

## 🌐 Deploy to the Web (GitHub Pages)

Because this tracker is built as a static client-side web application, you can host it **for free** on GitHub Pages:

1. Create a new repository on GitHub and push these files.
2. Go to your repository settings page: **Settings** -> **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** and choose `main` (or `master`) as the source.
4. Click **Save**.
5. In a few seconds, GitHub will provide a public URL (e.g. `https://yourusername.github.io/repository-name/`) where anyone can use your tracker directly on the web!

---

## ⚙️ Customization (Parent Passcode)

By default, the Parent/Admin passcode is set to **`arshad0126`**. 

To customize this:
1. Open **`app.js`** in a text editor.
2. Search for the string `"arshad0126"` and replace it with your custom password/pin.
3. Save the file.
