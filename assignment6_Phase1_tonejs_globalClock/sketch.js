// why I picked Tone.js instead of using millis()
// in class we used millis() as the timer
// it's nice for small demos because you can just check how much time passed
// and kinda estimate the beat from that

// but for this project I needed timing that stays more steady and structured
// since I have multiple flowers and each one has its own pattern and sound
// once several tracks play together the small timing errors get obvious

// millis() depends on the frame rate
// if the browser slows down or the fps drops a bit
// the step timing can drift a little
// with one sound you might not notice but stacked together it stands out

// Tone.js uses the Web Audio clock
// that timing is more stable for musical stuff
// scheduleRepeat() keeps all the flowers locked onto the same rhythmic grid
// even if the visuals get heavy or the frame rate moves around

// =======================================
// tone.js: https://tonejs.github.io/
//  https://github.com/Tonejs
// docs new version: https://tonejs.github.io/docs/15.1.22/index.html
// docs: https://tonejs.github.io/docs/r13/

// =======================================
// how tone.js basically works (my own understanding)
// =======================================
// core gives you the main audio context and the global clock (Transport)(which is like a DAW timeline, the most important part in my project)
// docs about transport: https://tonejs.github.io/docs/14.5.3/Transport
// source is where the raw sound comes from, like an oscillator or a player
// then instrument wraps the source with things like envelope and signal paths
// after that the sound goes through effects or other components for shaping
// finally everything goes into the destination which is the actual output

// all the scheduling stuff is handled by tone events and the Transport timeline
// so when I trigger a note I am not calling it "right now"
// I'm asking the Transport to place it at a very specific audio time
// and tone makes sure all of that stays in sync

// =======================================
// Core data structures
// =======================================
// Flowers in the garden
let flowers = [];
let currentStep = 0; // Sequencer pointer (0–15)
let totalSteps = 16; // 16-step loop
let isPlaying = false; // Whether the sequencer has started

// =======================================
// Scale options
// Using a pentatonic scale because it's easy on the ears
// =======================================
const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  background(34);

  // Tone.js global BPM
  Tone.Transport.bpm.value = 80;
}

function draw() {
  background(30);

  // Draw all flowers on screen
  for (let flower of flowers) {
    flower.display();
  }

  // =======================================
  // ===== Prompt UI (drawn in p5) =====
  // =======================================
  push();
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);

  text("Garden Sequencer Demo", 20, 20);

  textSize(14);
  text(
    "1. Click anywhere to start audio\n" +
      "2. Click again to plant a flower\n" +
      "3. Each petal = one of the 16 steps\n" +
      "4. When the scanner hits a petal, it flashes & plays",
    20,
    55
  );
  pop();
}

// =======================================
// ===== Interaction logic =====
// =======================================

// Why use 'async' and 'await' here?
//
// 1. Tone.js Requirement:
//    Tone.start() returns a "Promise". We must wait for it to resolve
//    to ensure the AudioContext is fully running before playing sound.
//    Ref: https://tonejs.github.io/docs/15.1.22/functions/start.html
//
// 2. JavaScript Syntax Requirement:
//    To use the "await" keyword, the parent function must be declared as "async".
//    Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// It's because of the Web Audio Autoplay Policy introduced by Chrome in 2018. Tone.js gives us strict control over when the audio engine starts. Using await Tone.start() ensures that we don't try to play any sound before the browser has officially given us permission.
async function mousePressed() {
  // First click: start AudioContext
  if (Tone.context.state !== "running") {
    await Tone.start(); // // Wait for AudioContext to start
    console.log("Audio Context Started");
  }

  // If sequencer hasn't started yet, start it
  if (!isPlaying) {
    startSequencer();
    isPlaying = true;
  } else {
    // After it's running, clicking spawns a flower
    let note = random(scale);
    flowers.push(new Flower(mouseX, mouseY, note));
  }
}

// =======================================
// ===== Sequencer Core =====
// =======================================
// scheduleRepeat docs: https://tonejs.github.io/docs/r13/Transport
function startSequencer() {
  // scheduleRepeat fires on every musical interval ("16n" here)
  // (time) => {...} is an arrow function — basically:
  // when the next step hits, run this block
  Tone.Transport.scheduleRepeat((time) => {
    // Tell every flower what the current step index is
    // and pass the exact Tone.js timing so their sounds line up
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].playStep(time, currentStep);
    }

    // Move the pointer forward by 1 step, but keep looping 0-15
    // Using modulo (%) makes it wrap automatically.
    //
    // For example:
    // If totalSteps = 16 and currentStep becomes 16,
    // then 16 % 16 = 0, it jumps back to the beginning.
    //
    // So the sequencer will forever cycle through 0 .. 15 .. 0 .. 15...
    currentStep = (currentStep + 1) % totalSteps;
  }, "16n"); // "16n" = one sixteenth note per step

  Tone.Transport.start();
}

// =======================================
// ===== Flower Class =====
// =======================================
class Flower {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.note = note;
    this.radius = 40;

    // Random pattern for demo purposes
    // 1 = play, 0 = silent
    this.pattern = [];
    for (let i = 0; i < totalSteps; i++) {
      this.pattern.push(random() > 0.7 ? 1 : 0);
    }

    // Each flower gets its own synth
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 1 },
    }).toDestination();

    // Color tone for this flower
    this.hue = random(100, 300);
  }

  playStep(time, stepIndex) {
    // If this step is active, trigger a note
    if (this.pattern[stepIndex] === 1) {
      // Trigger the note for one 16th note at the scheduled time
      this.synth.triggerAttackRelease(this.note, "16n", time);

      // Kick a small pulse effect
      this.pulse = 20;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    colorMode(HSB);

    // Draw center bloom
    fill(this.hue, 60, 90);
    noStroke();
    let r = this.radius + (this.pulse || 0); // using || makes it use pulse if it exists, otherwise use 0.
    ellipse(0, 0, r, r);

    // Decay the pulse
    //inside draw function(60 fps), every frame it checks if pulse is greater than 0, and if so, it decreases pulse by 1
    if (this.pulse > 0) {
      this.pulse -= 1;
    }

    // Draw petals = steps on the loop
    for (let i = 0; i < totalSteps; i++) {
      let angle = map(i, 0, totalSteps, 0, 360) - 90;
      let px = cos(angle) * (this.radius + 15);
      let py = sin(angle) * (this.radius + 15);

      // Petal coloring logic
      if (i === currentStep) {
        // The global scanner is currently here
        fill(255);
        stroke(255);
      } else if (this.pattern[i] === 1) {
        // Active step for this flower
        fill(this.hue, 80, 80);
        noStroke();
      } else {
        // Inactive step
        noFill();
        stroke(this.hue, 40, 40);
      }

      ellipse(px, py, 15, 15);
    }

    pop();
  }
}
