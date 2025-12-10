// ===== Version 3: December 3 – December 10:
//with [new] , I mean this part was added in this version
// - UI Buttons to select flower type
// - Different flower shapes for each instrument
// - Auto-layout buttons based on window size
// - Wind sway effect for more organic motion
// - color mode HSB for easier color control
//   different hues for different instruments, and brightness based on note pitch

// ===== Version 2:November 26 – December 3:
// - Interaction
// - Editable Steps
// - Flower Controls

// ===== Version 1: November 19 – November 26:(Focus on global clock with Tone.js)
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
let flowers = [];
let currentStep = 0; // Sequencer pointer (0–15)
let totalSteps = 16; // 16-step loop
let isPlaying = false; // Whether the sequencer has started

// [new] ui variables
let uiHeight = 120; // Height of the bottom UI panel

let uiButtons = [];

function setupUIButtons() {
  uiButtons.push(new UIButton("Glyph", "GLYPH", 260, "RECT"));
  uiButtons.push(new UIButton("Sharp", "SHARP", 200, "SQUARE"));
  uiButtons.push(new UIButton("Bloom", "BLOOM", 100, "CIRCLE"));
  uiButtons.push(new UIButton("Thorn", "THORN", 30, "TRIANGLE"));
}

let currentFlowerType = "ROUND";

// Scale Pentatonic options
const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

// [new/updated] Color Data
const instrumentConfig = {
  BLOOM: { hue: 100 }, //green
  THORN: { hue: 30 }, // orange
  GLYPH: { hue: 260 }, // purple
  SHARP: { hue: 200 }, // blue
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES); // Important for circular math

  // [new/updated] Color mode HSB for easier color control
  colorMode(HSB, 360, 100, 100, 1);

  // Tone.js global BPM
  Tone.Transport.bpm.value = 80;

  // Disable the default browser right-click menu
  // This lets me use the right mouse button for "deleting" flowers
  // without a menu popping up and blocking the view.
  document.oncontextmenu = () => false;

  //[new]
  setupUIButtons();
}

function draw() {
  background("#F2F2F2");

  // =======================================
  // ===== Background Grid Visual =====
  // =======================================
  // I added a grid to give the garden a sense of scale and structure.
  // It looks like a sequencer interface or a digital blueprint.
  push();

  stroke("#B7EF2E");
  strokeWeight(0.5);

  let gridSize = 10; // The spacing between lines in pixels

  // Draw vertical lines (scanning from left to right)
  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }

  // Draw horizontal lines (scanning from top to bottom)
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }

  pop(); // Restore original settings

  // =======================================
  // ===== Draw all flowers on screen =====
  // =======================================
  for (let flower of flowers) {
    flower.display();
  }

  // =======================================
  // ===== UI Instructions =====
  // =======================================
  // [new] create a separate function to draw the UI
  drawUI();
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
  }
  // [new] check if clicked on the UI area
  if (mouseY > height - uiHeight) {
    // if clicked in the UI panel area, check which button
    // loop to check each button
    for (let btn of uiButtons) {
      // check if this button was hit
      for (let i = 0; i < uiButtons.length; i++) {
        let btn = uiButtons[i];
        // if hit, change currentFlowerType
        //.isHit is a helper function inside the UIButton class, it checks if the mouse is close enough to the button position
        if (btn.isHit(mouseX, mouseY)) {
          currentFlowerType = btn.type;
          return;
        }
      }
    }
    return; // if clicked UI, return, don't plant any flower.
  }

  // If sequencer hasn't started yet, start it
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
        //  left click on center starts dragging
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
    flowers.push(new Flower(mouseX, mouseY, note, currentFlowerType));
  }
}

// ===== Dragging interaction Logic =====
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
// To build a sequencer, I need something that triggers the callback on every 1/16 note.
// Each trigger tells all the flowers what the current step is and then advances the sequencer by one step.
function startSequencer() {
  //scheduleRepeat() is one of the method in:  https://tonejs.github.io/docs/14.5.3/Transport
  // Schedule a repeated event along the timeline. The event will fire at the interval starting at the startTime and for the specified duration.
  // (time) => {...}:
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

  //after scheduling all the events, start the transport to kick things off
  Tone.Transport.start();
}

// =======================================
// ===== Flower Class =====
// =======================================
class Flower {
  constructor(x, y, note, type) {
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
    this.type = type;
    this.hue = (instrumentConfig[this.type] || instrumentConfig["ROUND"]).hue;

    let noteIndex = scale.indexOf(this.note);
    this.brightness = map(noteIndex, 0, scale.length - 1, 20, 100);

    this.radius = 40;

    // Random pattern
    this.pattern = [];
    for (let i = 0; i < totalSteps; i++) {
      // Roll the dice: 70% chance to be 0 (mute), 30% chance to be 1 (play).
      this.pattern.push(random() > 0.7 ? 1 : 0);
    }

    this.pulse = 0; // Animation value

    // Sound setup
    // [new] Create the Tone.js Synth based on type
    if (this.type === "BLOOM") {
      // Triangle Wave Synth
      this.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.1, release: 1 },
      }).toDestination();
    } else if (this.type === "THORN") {
      // FMSynth
      this.synth = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 10,
        envelope: { attack: 0.01, decay: 0.2 },
      }).toDestination();
    } else if (this.type === "GLYPH") {
      //AMSynth
      this.synth = new Tone.PolySynth(Tone.AMSynth, {
        harmonicity: 2,
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }, // 短促的声音
      }).toDestination();
    } else if (this.type === "SHARP") {
      // Square Wave Synth
      this.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "square" },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.8 },
      }).toDestination();
    }

    // Volume control
    this.isDragging = false;
    this.updateVolume();
  }

  // ===== collision detection =====
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

  // ===== play sound at this step =====
  playStep(time, stepIndex) {
    if (this.pattern[stepIndex] === 1) {
      // Trigger the note for one 16th note at the scheduled time
      // https://tonejs.github.io/docs/14.5.3/Synth#triggerAttackRelease
      //triggerAttackRelease(note, duration, time, velocity), Trigger the attack and then the release after the duration.
      this.synth.triggerAttackRelease(this.note, "16n", time);
      this.pulse = 10; // Trigger animation
    }
  }

  // =====  interactively update height and volume =====
  dragHeight(my) {
    // 1. Calculate new height: Root Y (ground), Mouse Y (current)
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

  // ===== Map the stem height to audio volume (Decibels) =====
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

  // ===== Draw whatever Display on the Screen =====
  display() {
    // Wind sway effect for more organic motion
    let windOffset = map(
      noise(frameCount / 100, this.rootX / 200),
      0,
      1,
      -30,
      30
    );
    let visualHeadX = this.headX + windOffset;

    // 1. Draw Stem (Line from root to head)
    stroke(0);
    strokeWeight(5);
    line(this.rootX, this.rootY, visualHeadX, this.headY);

    // 2. Draw Root point (visual guide)
    stroke(0);
    strokeWeight(1);
    fill(255, 100);
    ellipse(this.rootX, this.rootY, 8, 8);

    // 3. Draw Flower Head (Move origin to headX, headY)
    push();
    translate(visualHeadX, this.headY);

    // Center bloom
    fill(255);
    stroke(0);
    strokeWeight(1);
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
      translate(this.radius + 10, 0); // Push out from center, along the rotated axis

      // each step(petal) color is depend on currentStep and pattern
      if (i === currentStep) {
        fill(0, 0, 100); // Scanner white
        stroke(0);
      } else if (this.pattern[i] === 1) {
        fill(this.hue, 40, this.brightness); // Active note
        strokeWeight(1);
        stroke(0);
      } else {
        fill(this.hue, 20, 90, 0.3); // Inactive note (transparent)
        strokeWeight(1);
        stroke(0);
      }

      // [new] Draw the petal shape
      if (this.type === "BLOOM") {
        //green
        ellipse(0, 0, 20, 20);
        ellipse(-10, 0, 6, 6);
      } else if (this.type === "GLYPH") {
        //purple
        push();
        rectMode(CENTER);
        rotate(20);
        rect(0, 0, 40, 12);
        pop();
      } else if (this.type === "THORN") {
        //orange
        push();
        rotate(-20);
        triangle(10, 10, -20, -0, 20, -20);
        pop();
      } else if (this.type === "SHARP") {
        //blue
        rect(0, 0, 26, 26);
      } else {
        //default
        ellipse(0, 0, 50, 18);
      } //petal shape at (0,0) after translation and rotation
      pop(); // recover from rotate and translate
    }

    pop(); // End translate
  }
}

// =======================================
// ===== [new] Draw UI function =====
// =======================================
function drawUI() {
  push();

  // Dark Panel Background
  stroke(0);
  strokeWeight(1);
  fill(43, 65, 29);
  rect(0, height - uiHeight, width, uiHeight);

  // Yellow Panel Behind
  let panelX = width * 0.1;
  let panelW = width * 0.4;
  let panelY = height - uiHeight - 30;
  let panelH = uiHeight + 30;

  fill(64, 11, 100);
  rect(panelX, panelY, panelW, panelH);

  pop();

  // [new] Auto-layout Buttons
  layoutButtons();
  //Draw Buttons
  for (let i = 0; i < uiButtons.length; i++) {
    let btn = uiButtons[i];
    let isSelected = currentFlowerType === btn.type;
    btn.display(isSelected);
  }

  // Instructions Text
  fill(0, 0, 90);
  textAlign(LEFT, TOP);
  textSize(14);
  text("Instructions:", width * 0.62, height - uiHeight + 15);
  textSize(12);
  text(
    "1. CLICK ANYWHERE: Start Audio\n" +
      "2. SELECT A TYPE FROM THE PANEL\n" +
      "3. LEFT CLICK (Empty Space): Plant a new flower\n" +
      "4. LEFT CLICK (Petals): Toggle note ON/OFF\n" +
      "5. DRAG (Flower Center): Move Up/Down to adjust Volume\n" +
      "6. RIGHT CLICK (Flower Center): Remove flower",
    width * 0.7,
    height - uiHeight + 15
  );
  // Title Text
  fill(43, 65, 29);
  textSize(20);
  text("Garden Sequencer V3", 30, 20);
}

// =======================================
// ===== [new] UIButton Class =====
// =======================================
// why a class for buttons?
// Because each button has its own properties (label, type, hue, shape, position)
// and methods (setPosition, isHit, display).
// Using a class keeps the code organized and reusable.
class UIButton {
  constructor(label, type, hue, shape) {
    this.label = label;
    this.type = type;
    this.hue = hue;
    this.shape = shape;

    this.x = 0;
    this.y = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isHit(mx, my) {
    if (abs(mx - this.x) < 40 && abs(my - this.y) < 40) {
      return true;
    }
    return false;
  }

  display(isSelected) {
    push();
    translate(this.x, this.y);

    // Highlight if selected
    if (isSelected) {
      stroke(255, 0, 0);
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }

    //Button Style
    fill(this.hue, 20, 100);
    stroke(1);

    // button shape
    if (this.shape === "RECT") {
      rectMode(CENTER);
      rect(0, 0, 60, 30);
    } else if (this.shape === "SQUARE") {
      rectMode(CENTER);
      rect(0, 0, 40, 40);
    } else if (this.shape === "CIRCLE") {
      ellipse(0, 0, 45, 45);
    } else if (this.shape === "TRIANGLE") {
      triangle(0, -25, 25, 20, -25, 20);
    }

    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(14);
    text(this.label, 0, 30);

    pop();
  }
}

function layoutButtons() {
  let panelX = width * 0.1;
  let panelW = width * 0.4;
  let spacing = panelW / uiButtons.length / 1.5;
  let btnY = height - uiHeight / 1.4;

  for (let i = 0; i < uiButtons.length; i++) {
    let btn = uiButtons[i];
    let x = panelX + spacing * (i + 1.5);
    btn.setPosition(x, btnY);
  }
}
