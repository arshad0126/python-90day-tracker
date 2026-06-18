// sandbox.js - In-browser Python Execution Sandbox & CodeMirror Editor Integration

window.editorInstance = null;

function initializeCodeMirror(initialCode) {
  const textarea = document.getElementById("detail-code-vault");
  if (!textarea) return;

  if (typeof CodeMirror === 'undefined') {
    // CodeMirror did not load, fallback to plain textarea
    textarea.value = initialCode || "";
    textarea.style.display = "block";
    return;
  }

  // Hide the original textarea
  textarea.style.display = "none";

  if (!window.editorInstance) {
    window.editorInstance = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: "python",
      indentUnit: 4,
      matchBrackets: true,
      viewportMargin: Infinity
    });

    // Auto-save to parent model when code is modified
    window.editorInstance.on("change", (instance) => {
      textarea.value = instance.getValue();
      saveVaultCode();
    });
  } else {
    window.editorInstance.setValue(initialCode || "");
  }

  setTimeout(() => {
    window.editorInstance.refresh();
  }, 100);
}

// In-browser Python Sandbox Execution (via Skulpt)
function runSandboxCode(editorId, outputId) {
  let code = "";
  if (editorId === 'detail-code-vault' && window.editorInstance) {
    code = window.editorInstance.getValue();
  } else {
    const textarea = document.getElementById(editorId);
    code = textarea ? textarea.value : "";
  }

  const outputArea = document.getElementById(outputId);
  if (!outputArea) return;

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

  // Configure Turtle Graphics dynamically
  const hasTurtle = code.includes("import turtle") || code.includes("from turtle import");
  const turtleWrapper = document.getElementById("turtle-canvas-wrapper");
  const turtleCanvas = document.getElementById("turtle-canvas");

  if (hasTurtle) {
    if (turtleWrapper) turtleWrapper.style.display = "block";
    if (turtleCanvas) turtleCanvas.innerHTML = ""; // Clear old drawing canvas
    (Sk.turtleHTML || (Sk.turtleHTML = {})).target = "turtle-canvas";
  } else {
    if (turtleWrapper) turtleWrapper.style.display = "none";
    if (turtleCanvas) turtleCanvas.innerHTML = "";
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
    inputfunTakesPrompt: true,
    yieldLimit: 100,
    __future__: Sk.python3
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
  if (outputArea) {
    outputArea.innerText = "";
    outputArea.style.display = "none";
  }
  
  // Hide turtle graphics canvas if present
  const turtleWrapper = document.getElementById("turtle-canvas-wrapper");
  const turtleCanvas = document.getElementById("turtle-canvas");
  if (turtleWrapper) turtleWrapper.style.display = "none";
  if (turtleCanvas) turtleCanvas.innerHTML = "";
}
