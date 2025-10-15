let circleD = 25; // Diameter of the orbiting circle

// Variables to hold X and Y position of the orbiting circle
let circleX;
let circleY;

let thetaOrbit = 0; // Angle for circular orbit animation (in radians)

let thetaB = 0; // Angle for breathing animation (also in radians)

function setup() {
  // It creates a canvas the size of the browser window.
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // This function runs every frame (around 60 times per second by default).

  // ===== Background Color Based on Current Hour =====
  // Get the current hour using p5's hour() function (0–23).
  // Use custom getSkyColor(hour) function to return a sky-inspired color.
  // Set alpha to 30 to achieve soft trail/fade effect in animation.
  let currentHour = hour();
  let bgColor = getSkyColor(currentHour);
  background(bgColor, 30);

  // Draw 24-hour timeline bar at bottom left of screen
  //
  drawTimeline();

  // ===== Dynamic Color Mapping =====
  // I set red value is fixed at 0, but green and blue change based on real time.
  // map() function scales time values to RGB ranges for subtle color shifts.
  let colorR = 0;
  let colorG = map(minute(), 0, 60, 150, 210); // Green slowly changes over 1 hour
  let colorB = map(second(), 0, 60, 150, 210); // Blue changes every minute

  // ===== Move the Origin to the Center of the Canvas =====
  // Since my animation is circular and symmetrical, it's easier to draw from the center.
  translate(width / 2, height / 2);
  // Set fill color with low alpha (transparency) for soft, overlapping effects
  fill(colorR, colorG, colorB, 40);
  // Semi-transparent white stroke
  stroke("#ffffffb8");

  // ===== Breathing Animation Using Sine Curve =====
  // I simulate a "breathing" effect using a sine wave function.
  // My reference about sinusoidal motion is from the example. Instead of using variable for positionX, I used it for diameter.
  // reference: https://openprocessing.org/sketch/2364172

  //but for diameter, I need a positive value.
  // abs(x) returns the absolute (positive) value of x.
  // Since sine values can be negative, abs() ensures the circle's size is always positive.
  //reference: https://p5js.org/reference/p5/abs/
  // The value of breath will oscillate between 0 and width/4.
  breath = abs(sin(radians(thetaB)) * (width / 4));
  thetaB++; // Increase the angle value by 1 degree each frame to keep the sine function changing over time.

  // ===== Draw 12 Pulsing Circles Like a Clock Face =====
  // These 12 circles change size together, mimicking a slow inhale/exhale rhythm.
  for (let i = 0; i < 12; i++) {
    let theta = i * (TWO_PI / 12); // Spread evenly in a circle
    let x = cos(theta) * 80;
    let y = sin(theta) * 80;
    circle(x, y, breath); // All circles expand/contract together
  }

  // Save drawing state so I can remove stroke below
  push();
  noStroke();

  // ===== Draw Orbiting Circle =====
  //Orbiting position calculation using cosine and sine
  // This creates a circular movement path
  circleX = cos(thetaOrbit) * (width / 4);
  circleY = sin(thetaOrbit) * (width / 4);
  // One full orbit every 2 seconds (60 fps * 2 = 120 frames)
  let speed = TWO_PI / 120;
  thetaOrbit += speed;
  // Draw the orbiting circle
  circle(circleX, circleY, circleD);

  // ===== Create a Radius That Shrinks Over Each Minute =====
  // R shrinks from width/3 to 0 as seconds progress
  let R = map(second(), 0, 60, width / 3, 0);

  // ===== From Outer to Inner: Growing Circles =====
  // As time passes, the circles shrink inward with radius based on current second
  for (let i = 0; i < 12; i++) {
    let theta = i * (TWO_PI / 12);
    let radius = 4 * second(); // every circle's diameter get bigger over time
    let x = cos(theta) * R;
    let y = sin(theta) * R;
    circle(x, y, radius);
  }

  // ===== Outward Growing System with Shrinking Balls =====
  // This section reverses: the radius increases over time while balls shrink
  // r grows from 0 to width/3 as seconds progress
  let r = map(second(), 0, 60, 0, width / 3);
  for (let i = 0; i < 12; i++) {
    let theta = i * (TWO_PI / 12);
    let radius = 480 / second(); // every circle's diameter get smaller over time
    let x = cos(theta) * r;
    let y = sin(theta) * r;
    circle(x, y, radius);
  }

  // ===== Outward Balls with Fixed Size =====
  for (let i = 0; i < 12; i++) {
    let theta = i * (TWO_PI / 12);
    let radius = 20; // Constant size
    let x = cos(theta) * r;
    let y = sin(theta) * r;
    circle(x, y, radius); // Restore previous stroke settings
  }

  pop();
}

// ===== Timeline Settings =====
function drawTimeline() {
  let timelineX = 20; // Leave a margin on the left
  let timelineY = height - 40; // Position slightly above the bottom
  let blockSize = 16; // Width and height of each time block
  let currentHour = hour(); // Get current hour (0–23)

  // ===== Draw Each Hour Block =====
  for (let h = 0; h < 24; h++) {
    let x = timelineX + h * blockSize;

    // Get sky color for this hour from function getSkyColor
    let c = getSkyColor(h);
    fill(c);
    noStroke();
    rect(x, timelineY, blockSize, blockSize);
    // Add semi-transparent white overlay to improve contrast
    //make current time more readable
    fill(210, 40);
    rect(x, timelineY, blockSize, blockSize);

    // ===== Draw Current Hour Indicator =====
    // this block corresponds to the current hour,
    // draw a small triangle above it as a pointer
    if (h == currentHour) {
      fill(120); // Triangle is gray
      triangle(
        x + blockSize / 2,
        timelineY, // Top point
        x + blockSize / 4,
        timelineY - blockSize / 2, // Left corner
        x + (blockSize * 3) / 4,
        timelineY - blockSize / 2 // Right corner
      );
    }
  }
}

// ===== Generate Sky-Like Color Based on Hour =====
//I need a function that can tell me the color value corresponding to a given time input.
// This function returns a different RGB color depending on the hour of the day (0-23).
// It simulates natural sky color changes from night to dawn, noon, sunset, and back to night.
// Colors are manually sampled from a custom-designed 24 hour gradient palette.
// color(r, g, b) returns a p5.Color object, which represents a color value in p5.js. By default, the parameters are interpreted as RGB values. Calling color(49, 50, 111) will return a dark color.
// reference about color https://p5js.org/reference/p5/color/
// wherever the function was called, so the returned value (the color values) can be used outside the function.
// return means when this function finishes executing, it will give back a answer.
// reference about define functions and return by Daniel Shiffman: https://www.youtube.com/watch?v=qRnUBiTJ66Y
function getSkyColor(h) {
  if (h >= 1 && h < 5) {
    return color(49, 50, 111); // Deep night: dark blue-purple
  } else if (h >= 5 && h < 6) {
    return color(99, 122, 185); // Early morning blue
  } else if (h >= 6 && h < 7) {
    return color(79, 183, 179); // Pale turquoise
  } else if (h >= 7 && h < 8) {
    return color(136, 212, 207); // Soft minty blue
  } else if (h >= 8 && h < 9) {
    return color(199, 249, 225); // Morning light: pale green-white
  } else if (h >= 9 && h < 12) {
    return color(211, 248, 243); // Daytime sky blue
  } else if (h >= 12 && h < 15) {
    return color(253, 243, 216); // Noon: warm white
  } else if (h >= 15 && h < 16) {
    return color(255, 243, 191); // Afternoon yellow
  } else if (h >= 16 && h < 17) {
    return color(255, 189, 163); // Sunset: pastel orange-pink
  } else if (h >= 17 && h < 18) {
    return color(254, 119, 67); // Golden hour: orange-red
  } else if (h >= 18 && h < 19) {
    return color(131, 36, 0); // Dusk: deep reddish-brown
  } else {
    return color(28, 0, 56); // Night: dark purple
  }
}
