// Global variable to store the current bowknot color.
// I define it outside functions so it can be accessed in both draw and drawKT function.
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

  // ===== Outer Loop – Create rows (vertical repetition) =====
  // I use a for loop to repeat code that draws each row of Hello Kitty figures.
  // A for loop has 3 parts:
  // 1) let y = 0 initializes the variable y starting from 0
  // 2) y < height checks if y is still within the canvas
  // 3) y += 100 increases y by 100 each time, to move to the next row
  // This way, the loop draws one row every 100 pixels vertically.
  //
  // Why a nested loop instead of repeating one loop 10 times?
  // In class we used a single loop to draw items in one direction (like a row).
  // But I wanted to draw a grid — multiple rows and columns.
  // So I used a "loop inside a loop":
  // - The outer loop creates each row (moves vertically down)
  // - The inner loop draws figures across that row (moves horizontally)
  // This way, I didn’t need to manually repeat a row loop 10 times.
  // Nested loops make layout more efficient and easier to change later.
  for (let y = 0; y < height; y += 100) {
    // ===== Inner Loop – Create columns (horizontal repetition) =====
    // Same idea as above, but this time we move across the screen horizontally.
    // The x variable controls the position along the width of the canvas.
    for (let x = 0; x < width; x += 100) {
      push(); // ===== push(): save the current drawing state =====
      // push() saves the current transformation settings (like translate, rotate, scale).
      // This makes sure that the translation we apply for current KT does not affect the rest of the drawing.

      // ===== translate();
      // Now everything we draw will be relative to this cell’s position at (x, y)
      translate(x, y);

      // ===== dynamic rotation and scaling per mouse position =====

      // ===== Rotation logic based on mouseX =====
      // I want the Hello Kitty figure to rotate based on the horizontal mouse position.
      // map(mouseX, 0, width, 0, 420) turns the mouseX value into a number between 0 and 420.
      // angle is used for rotating each figure differently.
      let angle;
      // random(min, max) gives a random decimal between min and max.
      // In this case, we use y * 0.02 to increase the randomness based on vertical position.
      // So the further down the shape is, the more random its rotation becomes.
      let randomRotation = random(-y * 0.01, y * 0.01);
      angle = map(mouseX, 0, width, 0, 420); // Map mouseX from [0, width] to [0, 420]
      // Combine base rotation, x variation, and y-based randomness
      //Rotate the shape by a certain angle; x * 0.1 adds variation per column; 225 is base offset that I adjusted several times to visually looks great.
      // Combine base rotation, x variation, and y-based randomness
      rotate(radians(225 + angle + x * 0.1 + randomRotation));

      // ===== Scale logic based on mouseX + mouseY =====
      // Here I combine mouseX and mouseY to make the scale dynamic.
      // map() converts the mouse range into a scale between 0.1 and 2.
      // I multiply by 0.15 to make sure the final scale is subtle and doesn't explode the figure.
      let scaleFactor;
      scaleFactor = map(mouseX + mouseY, 0, height, 0.1, 2);
      scale(scaleFactor * 0.15);

      // ===== drawKT(): draw the Hello Kitty figure =====
      // This is a custom function that I wrote in Week 2 and reused here.
      // It handles the actual drawing of the Kitty face, bow, and whiskers.
      // Using a function keeps the code organized and avoids repeating code multiple times.
      push(); // I want to isolate the scale(0.8) so it doesn't affect future code
      // scale(0.8) Slightly shrink the Kitty to better visual fit.
      // I apply scale(0.8) to make the Hello Kitty smaller inside each cell.
      // I chose to scale here instead of redrawing a smaller figure because it's reusable and more flexible.
      scale(0.8);
      drawKT(); // Call the function that draws Hello Kitty
      pop(); // Restore the scale state

      pop(); // End of this cell (x)
    }
  }

  // ===== Text prompt: click to change bow color =====
  // This is a simple UI message to remind the user to interact with the canvas.
  // I added this text as a visual hint for the user to interact with the canvas.
  // Without it, users might not know they can click to change colors.
  rect(35, 18, 130, 30); //text background
  push(); // I want to isolate the color setting.
  fill(knotColor); // using current knotColor
  // Set size of the message text: https://p5js.org/reference/p5/textSize/
  textSize(20);
  // Display message,reference: https://p5js.org/reference/p5/text/
  text("Try Clicking!", 40, 40);
  pop();
}

// ===== mousePressed(): change the bowknot color when the mouse is clicked =====
// This is a built-in p5.js function that runs once every time the mouse is pressed.
//reference:https://p5js.org/reference/p5/mousePressed/

function mousePressed() {
  // ===== generate a random RGB color =====
  // The random() function is built into p5.js.
  // When used as random(max), it gives a random decimal number between 0 and max.
  // So here, random(255) gives a number between 0 and 255 (like 172.58 or 34.1).
  // This simulates picking a random value for each of the three RGB color channels:
  // - Red (r), Green (g), and Blue (b)
  //reference: https://p5js.org/examples/calculating-values-random/
  let r = random(255);
  let g = random(255);
  let b = random(255);

  // color(r, g, b) creates a new color from RGB values.
  knotColor = color(r, g, b);
}

// ===== drawKT(): custom function to draw one Hello Kitty =====
// This is a svg shape I drew in Week 2 and reused here.
// Hello Kitty SVG file is exported from a illustrator file I drew for ideation class.
// screenshot of illustrator file: ./assignment2/kittyIllustrator.png
// svg files: ./assignment2/SVG
//So I need a converter here. And I use GPT as a search engine to tell me is whether we have this kind of tool on the internet. And here it is:
//SVG to p5.js CONVERTER, made by Munus Shih.
//https://openprocessing.org/sketch/1997741/
//Basically, this tool takes SVG input, parses it using DOMParser() function, make it readable for javascript. And loop through all the SVG shapes. reads attributes like fill, stroke, geometry... And turn it to p5js code.(like <rect> to  rect(), <path> to a group of vertex and bezier). At last, it returns pjs code as string.

// Custom functions are useful for organizing reusable code blocks.(Maybe I will use it again in future projects?)
// In this project, it just a one time use. So I use this to keep my draw() code clean, shorter and easy to read (just personal preference).
// Usually, A custom function helps organize code — instead of repeating drawing code many times,I can just call drawKT() every time I want to draw the same figure.
// The function includes shapes (ellipse, rect, custom bezier curves) to draw the face and bow.
// I call it once inside each grid cell.
function drawKT() {
  // ===== translate(): recenters the drawing around the middle of the figure =====
  // The original Hello Kitty shape starts at the top-left corner.
  // To make it rotate nicely around its middle, I shift the whole shape left and up.
  // This makes (0,0) become the visual center of the drawing.
  // In Week 2, I originally drew Hello Kitty on a canvas that was 300x240, that means her face is roughly centered at (150, 120).
  translate(-150, -120);

  // ===== face shape =====
  // The face is drawn using beginShape() and multiple bezierVertex() calls.
  // bezierVertex() creates smooth, curvy lines — good for organic shapes like the Kitty head.
  // The strokeWeight sets the thickness of the outline.
  strokeWeight(5); //change stroke weight to 5 pixels wide
  fill("#ffffffff"); //change fill to white
  beginShape();
  vertex(273, 91);
  bezierVertex(300, 33, 273, 12, 273, 12);
  bezierVertex(246, -9, 215, 26, 215, 26);
  bezierVertex(187, 11, 107, 25, 107, 25);
  bezierVertex(82, -1, 50, 8, 50, 8);
  bezierVertex(18, 16, 37, 92, 37, 92);
  bezierVertex(26, 105, 20, 135, 20, 151);
  bezierVertex(20, 203, 86, 222, 161, 222);
  bezierVertex(235, 222, 289, 199, 289, 148);
  bezierVertex(289, 131, 284, 104, 273, 91);
  endShape(CLOSE);

  // ======  red bowknot ======
  // The bow is drawn similarly to the face, using bezier curves.
  // The fill color comes from knotColor, which changes on click.
  strokeWeight(5);
  fill(knotColor); // using current knotColor
  beginShape();
  vertex(286, 39);
  bezierVertex(277, 35, 267, 34, 258, 37);
  bezierVertex(256, 34, 253, 31, 249, 29);
  bezierVertex(245, 27, 241, 26, 237, 26);
  bezierVertex(234, 18, 228, 10, 219, 6);
  bezierVertex(200, -4, 178, 3, 169, 21);
  bezierVertex(160, 39, 168, 61, 186, 70);
  bezierVertex(195, 75, 205, 76, 214, 73);
  bezierVertex(216, 76, 219, 79, 223, 81);
  bezierVertex(227, 82, 231, 83, 234, 84);
  bezierVertex(238, 92, 244, 100, 253, 104);
  bezierVertex(271, 113, 294, 106, 303, 89);
  bezierVertex(312, 71, 304, 49, 286, 39);
  endShape(CLOSE);

  // ===== Eyes (black ellipses) =====
  // The eyes are drawn using ellipse() with specific width and height.
  // I use no stroke to keep them solid black.
  fill("#000000ff"); //change fill to black
  strokeWeight(0);
  ellipse(94, 142, 10.5 * 2, 15.5 * 2); // left eye
  ellipse(222, 142, 10.5 * 2, 15.5 * 2); // right eye

  // ===== Nose (yellow ellipse) =====
  // Same as the eyes, but with different color and size.
  strokeWeight(5); //change back
  fill("#fff000ff"); //change fill to yellow
  ellipse(158, 162, 11.5 * 2, 7.5 * 2); // nose

  // ===== Whiskers (short rectangles) =====
  // Each whisker is a thin rectangle. Some are rotated slightly.
  // I use push() and pop() around rotated whiskers to isolate their transformations.
  fill("#000000ff"); //change fill to black
  stroke(0);
  strokeWeight(1);

  // Left-center whisker (no rotation)
  rect(7, 140, 40, 6);

  // Left-top whisker (rotated slightly)
  // Without push/pop, the rotation would affect all shapes after this.
  push();
  translate(8, 112);
  rotate(radians(10));
  rect(0, 0, 40, 6);
  pop();

  // Left-bottom whisker
  push();
  translate(8, 170);
  rotate(radians(-10));
  rect(0, 0, 40, 6);
  pop();

  // Right-center whisker
  rect(275, 140, 40, 6);

  // Right-top whisker
  push();
  translate(270, 120);
  rotate(radians(-10));
  rect(0, 0, 40, 6);
  pop();

  // Right-bottom whisker
  push();
  translate(275, 160);
  rotate(radians(10));
  rect(0, 0, 40, 6);
  pop();
}
