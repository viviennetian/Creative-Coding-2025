// Version 2:November 26 – December 3: (Interaction, Editable Steps and Flower Controls)

// Version 1: November 19 – November 26:(Focus on global clock with Tone.js)
// why I picked Tone.js instead of using millis()
// in class we used millis() as the timer
// it's nice for small demos because you can just check how much time passed
// and estimate the beat from that

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
// docs: https://tonejs.github.io/docs/r13/
// =======================================

// =======================================
// Core data structures
// =======================================
let flowers = [];
let currentStep = 0; // Sequencer pointer (0–15)
let totalSteps = 16; // 16-step loop
let isPlaying = false; // Whether the sequencer has started

// Scale Pentatonic options
const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

// Color Data
// Just like a point needs (x, y) coordinates, a color needs (r, g, b) values.
// So for every note (like "C4"), I store a list (array) of three values.
// reference: https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
// This allows me to access them later as: color[0], color[1], and color[2].
const noteColors = {
  // === Cool Tones (Low Pitch) ===
  C4: [170, 190, 240],
  D4: [170, 220, 240],
  E4: [160, 240, 255],
  // === Bridge Tones (Mid Pitch) ===
  G4: [180, 250, 200],
  A4: [250, 245, 160],

  // === Warm Tones (High Pitch) ===
  C5: [255, 210, 170],
  D5: [255, 180, 180],
  E5: [255, 140, 140],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // Important for circular math

  background(34);

  // Tone.js global BPM
  Tone.Transport.bpm.value = 80;

  // [NEW] Disable the default browser right-click menu
  // This lets me use the right mouse button for "deleting" flowers
  // without a menu popping up and blocking the view.
  document.oncontextmenu = () => false;
}

function draw() {
  background(64);

  // =======================================
  // ===== [NEW] Background Grid Visual =====
  // =======================================
  // I added a grid to give the garden a sense of scale and structure.
  // It looks like a sequencer interface or a digital blueprint.
  push();

  stroke(255, 20);
  strokeWeight(1);

  let gridSize = 20; // The spacing between lines in pixels

  // Draw vertical lines (scanning from left to right)
  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }

  // Draw horizontal lines (scanning from top to bottom)
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }

  pop(); // Restore original settings

  // Draw all flowers on screen
  for (let flower of flowers) {
    flower.display();
  }

  // =======================================
  // ===== UI Instructions =====
  // =======================================
  push();
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);

  text("Garden Sequencer V2", 20, 20);

  textSize(14);
  text(
    "1. CLICK ANYWHERE: Start Audio\n" +
      "2. LEFT CLICK (Empty Space): Plant a new flower\n" +
      "3. LEFT CLICK (Petals): Toggle note ON/OFF\n" +
      "4. DRAG (Flower Center): Move Up/Down to adjust Volume\n" +
      "5. RIGHT CLICK (Flower Center): Remove flower",
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

//Tone.js gives us strict control over when the audio engine starts. Using await Tone.start() ensures that we don't try to play any sound before the browser has officially given us permission.
async function mousePressed() {
  // First click: start AudioContext
  if (Tone.context.state !== "running") {
    await Tone.start(); // Wait for AudioContext to start
    console.log("Audio Context Started");
  }

  // If sequencer hasn't started yet → start it
  if (!isPlaying) {
    startSequencer();
    isPlaying = true;
    return; // Don't plant a flower on the very first click
  }

  let clickedOnFlower = false;

  // Loop backwards:
  // Because if flowers overlap, I want to click the top one first.
  // Also, when deleting items from an array, going backwards is safer.
  for (let i = flowers.length - 1; i >= 0; i--) {
    let f = flowers[i];

    // I created a helper function inside the class to handle the logic
    // It returns what part of the flower I clicked: "CENTER", "PETAL", or "NONE"
    let result = f.checkClick(mouseX, mouseY);

    if (result === "CENTER") {
      // If I clicked the center...
      if (mouseButton === RIGHT) {
        // ...and it was a Right Click, delete it!
        flowers.splice(i, 1);
      } else if (mouseButton === LEFT) {
        // [new] left click on center starts dragging
        f.isDragging = true;
      }
      clickedOnFlower = true;
      break; // Stop checking other flowers
    } else if (result === "PETAL") {
      // If I clicked a petal, the class already toggled the note inside checkClick
      // So I just mark this as true so I don't plant a new flower by mistake
      clickedOnFlower = true;
      break;
    }
  }

  // If I didn't click any existing flower, AND I used Left Click
  // Plant a new one at the mouse position (Root)
  if (!clickedOnFlower && mouseButton === LEFT) {
    let note = random(scale);
    flowers.push(new Flower(mouseX, mouseY, note));
  }
}

// ===== [NEW] Dragging interaction Logic =====
function mouseDragged() {
  // Loop through all flowers to check which one is currently being dragged
  for (let f of flowers) {
    if (f.isDragging) {
      // Update the flower's height (and volume) based on the mouse's vertical position
      f.dragHeight(mouseY);
    }
  }
  // Prevent default browser behavior (like selecting text or scrolling) while dragging
  return false;
}

function mouseReleased() {
  // When the mouse is released, reset the dragging state for all flowers
  for (let f of flowers) {
    f.isDragging = false;
  }
}

// =======================================
// ===== Sequencer Core =====
// =======================================
function startSequencer() {
  Tone.Transport.scheduleRepeat((time) => {
    // Tell every flower what the current step index is
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].playStep(time, currentStep);
    }

    // Move the pointer forward 0 -> 15 -> 0
    currentStep = (currentStep + 1) % totalSteps;
  }, "16n");

  Tone.Transport.start();
}

// =======================================
// ===== Flower Class =====
// =======================================
class Flower {
  constructor(x, y, note) {
    // Visual positions
    // The click defines the ROOT (on the ground)
    this.rootX = x;
    this.rootY = y;

    // The flower grows upwards by a random amount
    this.stemHeight = random(100, 200);

    // The HEAD is where the petals are
    this.headX = x;
    this.headY = y - this.stemHeight;

    this.note = note;
    this.rgb = noteColors[this.note] || [255, 255, 255];

    this.radius = 40;

    // Random pattern
    this.pattern = [];
    for (let i = 0; i < totalSteps; i++) {
      this.pattern.push(random() > 0.7 ? 1 : 0);
    }

    // Synth
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 1 },
    }).toDestination();

    this.pulse = 0; // Animation value

    // [new] Volume
    this.updateVolume();
    this.isDragging = false;
  }

  // ===== [NEW] Simple collision detection =====
  // I re-calculate where the petals are and check if the mouse is close to them.
  checkClick(mx, my) {
    // 1. Check Center (Head)
    let dHead = dist(mx, my, this.headX, this.headY);
    if (dHead < this.radius) {
      return "CENTER";
    }

    //Check Petals
    for (let i = 0; i < totalSteps; i++) {
      // Calculate the exact position of this petal
      // (Using the same math I use in display())
      let angle = map(i, 0, totalSteps, 0, 360) - 90;

      // Formula: center + cos(angle) * distance
      // (radius + 15) is how far the petals are from center
      let pX = this.headX + cos(angle) * (this.radius + 15);
      let pY = this.headY + sin(angle) * (this.radius + 15);

      // Check distance to this specific petal
      if (dist(mx, my, pX, pY) < 15) {
        // Toggle the pattern directly here
        this.pattern[i] = 1 - this.pattern[i];
        return "PETAL";
      }
    }

    return "NONE";
  }

  playStep(time, stepIndex) {
    if (this.pattern[stepIndex] === 1) {
      this.synth.triggerAttackRelease(this.note, "16n", time);
      this.pulse = 10; // Trigger animation
    }
  }

  // =====  [NEW] interactively update height and volume =====
  dragHeight(my) {
    // 1. Calculate new height: Root Y (ground) - Mouse Y (current)
    // Since screen Y coordinates get smaller as you go up, we subtract.
    let newHeight = this.rootY - my;

    // 2. Constrain the height range (min 50px, max 300px)
    // This prevents the flower from going "underground" or flying off-screen.
    this.stemHeight = constrain(newHeight, 50, 300);

    // 3. Update the visual position of the flower head based on new height
    this.headY = this.rootY - this.stemHeight;

    // 4. Sync the volume immediately
    this.updateVolume();
  }

  // ===== [NEW] Map the stem height to audio volume (Decibels) =====
  updateVolume() {
    // map(value, inputMin, inputMax, outputMin, outputMax)
    // Tone.js uses Decibels (dB) for volume:
    // 0 dB = Full volume
    // -30 dB = Very quiet
    // -Infinity = Silent
    // Taller flower = Louder sound.
    let vol = map(this.stemHeight, 50, 300, -30, 0);

    // =======================================
    // Why use rampTo() instead of simple assignment?
    // =======================================
    // If I wrote "this.synth.volume.value = vol", the volume would jump instantly.
    // In digital audio, sudden changes cause audible "clicks" or "pops".
    //
    // rampTo(targetValue, rampTime) smoothly interpolates the value.
    // Here, it takes 0.1 seconds to slide to the new volume, making it sound smooth.
    // Ref: https://tonejs.github.io/docs/15.1.22/classes/Signal.html#rampTo
    this.synth.volume.rampTo(vol, 0.1);
  }

  display() {
    // color palette
    let r = this.rgb[0];
    let g = this.rgb[1];
    let b = this.rgb[2];

    // 1. Draw Stem (Line from root to head)
    stroke(229);
    strokeWeight(4);
    line(this.rootX, this.rootY, this.headX, this.headY);

    // 2. Draw Root point (visual guide)
    noStroke();
    fill(255, 100);
    ellipse(this.rootX, this.rootY, 8, 8);

    // 3. Draw Flower Head (Move origin to headX, headY)
    push();
    translate(this.headX, this.headY);

    // Center bloom
    fill(255);
    noStroke();
    // Decay the pulse logic:
    // if pulse > 0, make radius bigger, then shrink back
    let radius = this.radius + (this.pulse || 0);
    ellipse(0, 0, radius, radius);

    if (this.pulse > 0) {
      this.pulse -= 1;
    }

    // Draw petals
    for (let i = 0; i < totalSteps; i++) {
      let angle = map(i, 0, totalSteps, 0, 360) - 90;

      push();
      rotate(angle); //rotate to the petal angle
      translate(this.radius + 15, 0); // Push out from center, along the rotated axis

      // Coloring logic
      if (i === currentStep) {
        fill(255); // Scanner white
        stroke(255);
      } else if (this.pattern[i] === 1) {
        fill(r, g, b); // Active note
        strokeWeight(1);
        stroke(255);
      } else {
        fill(r, g, b, 50); // Inactive note (transparent)
        strokeWeight(1);
        stroke(255);
      }

      // Draw the petal shape
      ellipse(0, 0, 50, 18); //petal shape at (0,0) after translation and rotation
      pop(); // recover from rotate and translate
    }

    pop(); // End translate
  }
}
