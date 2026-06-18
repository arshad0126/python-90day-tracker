// audio.js - Audio Synthesizer module (Web Audio API)

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
  if (window.isMuted) return;
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
