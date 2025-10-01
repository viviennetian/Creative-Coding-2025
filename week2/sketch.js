let pinkDiameter = 25;
let originalX = 50;
let originalY = 50;

function setup() {
  //runs once at the start
  createCanvas(400, 400);
  // createCanvas(windowWidth, windowHeight);

  //createCanvas is a function, that creates a canvas for our p5.js sketch to draw to, it takes two parameters, width and height.
  //windowWidth, windowHeight are used to set the size to the full size of our browser window.

  console.log(windowWidth);
  background(0, 44, 153);

  // The push() and pop() functions can limit the effect of styles and transformations to a specific group of shapes, images, and text.

  push();
  noStroke();
  fill(232, 204, 215);

  circle(originalX, originalY, pinkDiameter); // top left circle
  circle(originalX + 150, originalY, pinkDiameter * 2); // top center circle
  circle(originalX + 300, originalY, pinkDiameter); // top right circle

  //iteration
  originalY = originalY + 150;

  circle(originalX, originalY, pinkDiameter); // top left circle
  circle(originalX + 150, originalY, pinkDiameter); // top center circle
  circle(originalX + 300, originalY, pinkDiameter * 2); // top right circle

  //iteration
  originalY = originalY + 150;

  circle(originalX, originalY, pinkDiameter * 2.5); // top left circle
  circle(originalX + 150, originalY, pinkDiameter * 2); // top center circle
  circle(originalX + 300, originalY, pinkDiameter * 2); // top right circle
  pop();

  // 把整个图形平移到画布中央
  push();
  translate(40, 85);

  // ====== Hello Kitty! ======

  //I drew the Kitty's face in Illustrator and let GPT do the boring part, converting the SVG paths into the numbers inside bezierVertex.

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

  pop(); // <- 把 translate 包住的整体图形还原
}

function draw() {
  //runs ina loop after setup
  //circle(mouseX,mouseY,20);//draw circles follow mouse movement
}

//https://p5js.org/reference/
