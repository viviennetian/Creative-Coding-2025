// Global variable to store current bowknot color
let knotColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // initialize bowknot color
  knotColor = color("#ff0000");
}

// ===== Main drawing loop: generates a grid of Hello Kitty drawings =====
// Each drawing is rotated and scaled dynamically based on the mouse position.
// The bowknot color changes when the mouse is clicked.

function draw() {
  background("#71ffeeff");

  // ===== outer loop: rows spaced vertically every 100 pixels =====
  for (let y = 0; y < height; y += 100) {
    push();
    translate(0, y); // shift origin downward for this row

    // ===== inner loop: columns spaced horizontally every 100 pixels =====
    for (let x = 0; x < width; x += 100) {
      push();
      translate(x, 0); // move origin to cell top-left

      // ===== dynamic rotation and scaling per mouse position =====
      let angle;
      angle = map(mouseX, 0, width, 0, 420); // Map mouseX from [0, width] to [0, 420]
      rotate(radians(225 + angle + x * 0.1)); //Rotate the shape by a certain angle; x * 0.1 adds variation per column; 225 is base offset.

      //scalable based on mouseY
      let scaleFactor; //make a variable to hold scale amount
      scaleFactor = map(mouseX + mouseY, 0, height, 0.1, 2);
      scale(scaleFactor * 0.15);

      // ===== draw the scaled Hello Kitty figure =====
      push();
      scale(0.8);
      drawKT();
      pop();

      pop();
    }
    pop();
  }

  //https://p5js.org/reference/p5/textSize/

  // ===== draw prompt text at top-left =====
  rect(35, 18, 130, 30); //text background

  push();
  fill(knotColor); // using current knotColor
  textSize(20);
  text("Try Clicking!", 40, 40);
  pop();
}

// ===== change bowknot color on mouse click =====
// Randomly pick a hex color from predefined palette
function mousePressed() {
  let hexColors = [
    "#ff0000", // red
    "#ff69b4", // pink
    "#ffa500", // orange
    "#00bfff", // blue
    "#9370db", // purple
    "#00ffcc", // mint green
    "#ffcc00", // gold
    "#ff6f61", // coral red
  ];
  knotColor = color(random(hexColors));
}

// ===== drawKT(): draws a Hello Kitty figure centered at (0,0) =====
// The shape includes face outline, bowknot, eyes, nose, and whiskers.
// The bowknot uses the current knotColor variable.
function drawKT() {
  translate(-150, -120); // recenters drawing around its visual center

  // ===== face shape =====
  strokeWeight(5); //change stroke weight to 5 pixels wide
  fill("#ffffffff"); //change fill to white
  beginShape();
  vertex(272.85, 90.94);
  bezierVertex(300.13, 33.14, 272.85, 11.84, 272.85, 11.84);
  bezierVertex(245.57, -9.47, 215.4, 25.6, 215.4, 25.6);
  bezierVertex(186.67, 10.63, 107.27, 25.02, 107.27, 25.02);
  bezierVertex(82.34, -1.12, 50.4, 7.6, 50.4, 7.6);
  bezierVertex(18.46, 16.31, 36.78, 91.73, 36.78, 91.73);
  bezierVertex(26.37, 105.0, 20.46, 134.83, 20.46, 151.0);
  bezierVertex(20.46, 202.64, 86.22, 222.47, 160.6, 222.47);
  bezierVertex(234.89, 222.47, 288.89, 199.36, 288.89, 147.72);
  bezierVertex(288.89, 131.23, 283.65, 104.4, 272.85, 90.94);
  endShape(CLOSE);

  // ======  red bowknot ======
  strokeWeight(5); //change stroke weight to 3 pixels wide
  fill(knotColor); // using current knotColor
  beginShape();
  vertex(285.62, 39.4);
  bezierVertex(276.72, 34.9, 266.92, 34.19, 258.15, 36.68);
  bezierVertex(255.69, 33.66, 252.57, 31.09, 248.87, 29.22);
  bezierVertex(245.17, 27.35, 241.26, 26.36, 237.37, 26.16);
  bezierVertex(234.18, 17.62, 227.81, 10.15, 218.91, 5.64);
  bezierVertex(200.49, -3.68, 178.23, 3.24, 169.2, 21.09);
  bezierVertex(160.17, 38.94, 167.77, 60.99, 186.19, 70.32);
  bezierVertex(195.09, 74.82, 204.89, 75.53, 213.66, 73.04);
  bezierVertex(216.12, 76.06, 219.24, 78.63, 222.94, 80.5);
  bezierVertex(226.64, 82.37, 230.55, 83.36, 234.44, 83.56);
  bezierVertex(237.63, 92.1, 244.0, 99.57, 252.9, 104.08);
  bezierVertex(271.32, 113.4, 293.58, 106.48, 302.61, 88.63);
  bezierVertex(311.64, 70.78, 304.04, 48.73, 285.62, 39.4);
  endShape(CLOSE);

  // ======  ellipse -- eyes and nose ======
  fill("#000000ff"); //change fill to black
  strokeWeight(0);
  ellipse(94, 142, 10.5 * 2, 15.5 * 2); // left eye
  ellipse(222, 142, 10.5 * 2, 15.5 * 2); // right eye

  strokeWeight(5); //change back
  fill("#fff000ff"); //change fill to yellow
  ellipse(158, 162, 11.5 * 2, 7.5 * 2); // nose

  // ====== beard -- rectangle ======
  fill("#000000ff"); //change fill to black
  stroke(0);
  strokeWeight(1);

  //left center
  rect(7, 140, 40, 6);

  //left upside
  push();
  translate(8, 112);
  rotate(radians(10));
  rect(0, 0, 40, 6);
  pop();

  //left downside
  push();
  translate(8, 170);
  rotate(radians(-10));
  rect(0, 0, 40, 6);
  pop();

  //right center
  rect(275, 140, 40, 6);

  //right upside
  push();
  translate(270, 120);
  rotate(radians(-10));
  rect(0, 0, 40, 6);
  pop();

  //right downside
  push();
  translate(275, 160);
  rotate(radians(10));
  rect(0, 0, 40, 6);
  pop();
}
