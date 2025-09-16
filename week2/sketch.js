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

  // ====== face ======
  strokeWeight(3); //change stroke weight to 3 pixels wide
  fill(255); //change fill to white
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
  strokeWeight(3); //change stroke weight to 3 pixels wide
  fill(255, 0, 0); //change fill to red
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
  fill(0); //change fill to black
  strokeWeight(0);
  ellipse(94, 142, 10.5 * 2, 15.5 * 2); // left eye
  ellipse(222, 142, 10.5 * 2, 15.5 * 2); // right eye

  strokeWeight(3); //change back
  fill(255, 255, 0); //change fill to yellow
  ellipse(158, 162, 11.5 * 2, 7.5 * 2); // nose

  // ====== beard -- rectangle ======
  fill(50); //change fill to black
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

  pop(); // <- 把 translate 包住的整体图形还原
}

function draw() {
  //runs ina loop after setup
  //circle(mouseX,mouseY,20);//draw circles follow mouse movement
}

//https://p5js.org/reference/
