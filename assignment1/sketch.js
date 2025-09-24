//====== checkered background preparation ======
// Custom column widths and row heights
let colWidths = [22, 48, 28, 20, 34, 36, 106, 24, 32, 60, 38, 28, 18]; // 13 columns
let rowHeights = [30, 44, 38, 38, 38, 42, 90, 22, 32]; // 9 rows

// Pre-calculate x positions for columns
let xPos = [];
let accX = 0;
for (let i = 0; i < colWidths.length; i++) {
  xPos[i] = accX;
  accX += colWidths[i];
}

// Pre-calculate y positions for rows
let yPos = [];
let accY = 0;
for (let j = 0; j < rowHeights.length; j++) {
  yPos[j] = accY;
  accY += rowHeights[j];
}

// ====== Color palette ======
let color1Green = " #ffb27eff";
let color2Green = " #FF5F9E";
let color22Green = " #FF0060";
let color3Green = " #E90064";
let color4Green = " #B3005E";
let color5Green = " #5f0033ff";
let color6Green = "#470000ff";

// let color1Green = " #ffb27eff";
// let color2Green = " #fc8b4aff";
// let color22Green = " #ff6a00ff";
// let color3Green = " #e96500ff";
// let color4Green = " #d05000ff";
// let color5Green = " #5f1b00ff";
// let color6Green = "#300047ff";

// let color1Green = " rgb(217, 209, 93)";
// let color2Green = " rgba(164, 190, 77, 1)";
// let color22Green = " rgb(175, 195, 10)";
// let color3Green = " rgb(86, 153, 82)";
// let color4Green = " rgb(61,126,88)";
// let color5Green = " rgb(43, 85, 78)";
// let color6Green = " rgb(42,70,78)";

let color1Dark = "#00FFDE";
let color2Dark = "#41d9ffff";
let color3Dark = "#20b1ffff";
let color4Dark = "#0073ffff";

// let color1Dark = "rgb(139,91,38)";
// let color2Dark = "rgb(108,61,49)";
// let color3Dark = "rgb(100,23,38)";
// let color4Dark = "rgb(33,33,35)";

// ====== Make whole picture Scalable ======
let baseW = 500;
let baseH = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // ===== scale the whole picture according to window size =====
  let scaleX = width / baseW;
  let scaleY = height / baseH;

  push(); //https://p5js.org/reference/p5/push/
  //Begins a drawing group that contains its own styles and transformations.By default, styles such as fill() and transformations such as rotate() are applied to all drawing that follows. The push() and pop() functions can limit the effect of styles and transformations to a specific group of shapes, images, and text.

  scale(scaleX, scaleY); //https://p5js.org/examples/transformation-scale/

  push();

  //===== checkered background =====
  //defined a function below. To draw checkered background.
  drawComplexBackground();

  // ===== left upside arc =====
  noFill(); // no fill color
  strokeWeight(9); // line thickness
  strokeCap(SQUARE); // square line endings instead of round
  stroke(color3Dark);
  arc(75, 85, 60, 60, radians(20), radians(40));
  arc(75, 85, 60, 60, radians(60), radians(80));
  arc(75, 85, 60, 60, radians(100), radians(120));
  arc(75, 85, 60, 60, radians(140), radians(160));

  stroke(color4Dark);
  arc(75, 85, 60, 60, radians(40), radians(60));
  arc(75, 85, 60, 60, radians(80), radians(100));
  arc(75, 85, 60, 60, radians(120), radians(140));

  pop();

  // ===== right arc =====
  noFill(); // no fill color
  strokeWeight(8); // line thickness
  strokeCap(SQUARE); // square line endings instead of round
  stroke(color2Green);
  arc(353, 95, 130, 130, radians(45), radians(135));

  // ===== left triangle =====
  noStroke();
  fill(color3Dark);
  strokeCap(SQUARE); // square line endings instead of round
  triangle(75, 115, 50, 302, 100, 300);
  fill(color4Dark);
  triangle(75, 115, 65, 188, 85, 188);
  triangle(75, 278, 50, 302, 100, 300);

  // ===== sandglass =====
  fill(color1Dark);
  triangle(129, 219, 178, 219, 154, 326);
  triangle(129, 358, 178, 358, 154, 251);

  // ===== middle arc =====
  push();
  noFill(); // no fill color
  strokeWeight(8); // line thickness
  strokeCap(SQUARE); // square line endings instead of round
  stroke(color3Dark);
  arc(155, 234, 107, 107, radians(30), radians(40));
  arc(155, 234, 107, 107, radians(50), radians(60));
  arc(155, 234, 107, 107, radians(70), radians(80));
  arc(155, 234, 107, 107, radians(90), radians(100));
  arc(155, 234, 107, 107, radians(110), radians(120));
  arc(155, 234, 107, 107, radians(130), radians(140));

  stroke(color4Dark);
  arc(155, 234, 107, 107, radians(40), radians(50));
  arc(155, 234, 107, 107, radians(60), radians(70));
  arc(155, 234, 107, 107, radians(80), radians(90));
  arc(155, 234, 107, 107, radians(100), radians(110));
  arc(155, 234, 107, 107, radians(120), radians(130));
  arc(155, 234, 107, 107, radians(140), radians(150));

  pop();

  // ===== right sandglass =====

  fill(color2Dark);
  triangle(427, 30, 477, 30, 450, 173);
  triangle(450, 92, 425, 173, 475, 173);
  fill(color4Dark);
  triangle(450, 92, 429, 165, 472, 165);
  fill(color2Dark);
  triangle(450, 92, 431, 157, 469, 157);

  // ===== animation factors =====
  // The mouse position serves as the source of dynamic data for the head
  let baseX = mouseX;
  let baseY = mouseY;

  // with the offset being the displacement of the mouse relative to the original reference point (385, 265).
  let dx = (baseX - 385) / 3;
  let dy = (baseY - 265) / 3;

  // ===== middle triangle groups =====
  fill(color1Dark);
  triangle(223, 56, 223 + dx / 2, 74 + dy / 2, 196 + dx, 74 + dy); //head
  triangle(223, 92, 223 + dx / 2, 74 + dy / 2, 251 + dx, 74 + dy); //head
  triangle(223, 92, 223, 188, 251, 188);
  triangle(273, 128, 273, 188, 251, 188);
  fill(color3Dark);
  triangle(223, 56, 223 + dx / 2, 74 + dy / 2, 251 + dx, 74 + dy); //head
  triangle(223, 92, 223 + dx / 2, 74 + dy / 2, 196 + dx, 74 + dy); //head
  triangle(223, 265, 223, 188, 251, 188);
  triangle(273, 265, 273, 188, 251, 188);

  fill(color4Dark);
  triangle(273, 265, 223, 265, 251, 188);
  triangle(273, 265, 294, 265, 294, 188);
  fill(color3Dark);
  triangle(273, 265, 273, 358, 251, 358);
  fill(color4Dark);
  triangle(273, 265, 273, 358, 294, 358);

  // ===== version 1.0 without animation =====
  // ===== middle right triangle groups =====
  // triangle(386, 265, 386, 310, 350, 310);
  // fill(color3Dark);
  // triangle(386, 265, 386, 310, 420, 310);

  // triangle(386, 233, 386, 265, 340, 233);
  // triangle(386, 233, 386, 205, 425, 233);
  // fill(color4Dark);
  // triangle(386, 233, 386, 265, 425, 233);
  // triangle(386, 233, 386, 205, 340, 233);

  // ===== middle right triangle groups =====
  triangle(386, 265, 386, 310, 340, 310);
  fill(color3Dark);
  triangle(386, 265, 386, 310, 420, 310);

  triangle(386 + dx / 2, 233 + dy / 2, 386, 265, 340 + dx, 233 + dy); //head
  triangle(386 + dx / 2, 233 + dy / 2, 386, 205, 425 + dx, 233 + dy); //head
  fill(color4Dark);
  triangle(386 + dx / 2, 233 + dy / 2, 386, 265, 425 + dx, 233 + dy); //head
  triangle(386 + dx / 2, 233 + dy / 2, 386, 205, 340 + dx, 233 + dy); //head

  pop(); //https://p5js.org/reference/p5/pop/
}

function drawComplexBackground() {
  noStroke();

  // ===== Row 0 =====
  fill(color3Green);
  rect(xPos[0], yPos[0], colWidths[0], rowHeights[0]);

  fill(color3Green);
  rect(xPos[1], yPos[0], colWidths[1], rowHeights[0]);

  fill(color4Green);
  rect(xPos[2], yPos[0], colWidths[2], rowHeights[0]);

  fill(color4Green);
  rect(xPos[3], yPos[0], colWidths[3], rowHeights[0]);

  fill(color2Green);
  rect(xPos[4], yPos[0], colWidths[4], rowHeights[0]);

  fill(color2Green);
  rect(xPos[5], yPos[0], colWidths[5], rowHeights[0]);

  fill(color4Green);
  rect(xPos[6], yPos[0], colWidths[6], rowHeights[0]);

  fill(color3Green);
  rect(xPos[7], yPos[0], colWidths[7], rowHeights[0]);

  fill(color3Green);
  rect(xPos[8], yPos[0], colWidths[8], rowHeights[0]);

  fill(color3Green);
  rect(xPos[9], yPos[0], colWidths[9], rowHeights[0]);

  fill(color2Green);
  rect(xPos[10], yPos[0], colWidths[10], rowHeights[0]);

  fill(color2Green);
  rect(xPos[11], yPos[0], colWidths[11], rowHeights[0]);

  fill(color2Green);
  rect(xPos[12], yPos[0], colWidths[12], rowHeights[0]);

  // ===== Row 1 =====
  fill(color4Green);
  rect(xPos[0], yPos[1], colWidths[0], rowHeights[1]);

  fill(color4Green);
  rect(xPos[1], yPos[1], colWidths[1], rowHeights[1]);

  fill(color5Green);
  rect(xPos[2], yPos[1], colWidths[2], rowHeights[1]);

  fill(color5Green);
  rect(xPos[3], yPos[1], colWidths[3], rowHeights[1]);

  fill(color2Green);
  rect(xPos[4], yPos[1], colWidths[4], rowHeights[1]);

  fill(color2Green);
  rect(xPos[5], yPos[1], colWidths[5], rowHeights[1]);

  fill(color1Green);
  rect(xPos[6], yPos[1], colWidths[6], rowHeights[1]);

  fill(color6Green);
  rect(xPos[7], yPos[1], colWidths[7], rowHeights[1]);

  fill(color6Green);
  rect(xPos[8], yPos[1], colWidths[8], rowHeights[1]);

  fill(color4Green);
  rect(xPos[9], yPos[1], colWidths[9], rowHeights[1]);

  fill(color2Green);
  rect(xPos[10], yPos[1], colWidths[10], rowHeights[1]);

  fill(color2Green);
  rect(xPos[11], yPos[1], colWidths[11], rowHeights[1]);

  fill(color2Green);
  rect(xPos[12], yPos[1], colWidths[12], rowHeights[1]);

  // ===== Row 2 =====
  fill(color22Green);
  rect(xPos[0], yPos[2], colWidths[0], rowHeights[2]);

  fill(color22Green);
  rect(xPos[1], yPos[2], colWidths[1], rowHeights[2]);

  fill(color22Green);
  rect(xPos[2], yPos[2], colWidths[2], rowHeights[2]);

  fill(color22Green);
  rect(xPos[3], yPos[2], colWidths[3], rowHeights[2]);

  fill(color4Green);
  rect(xPos[4], yPos[2], colWidths[4], rowHeights[2]);

  fill(color5Green);
  rect(xPos[5], yPos[2], colWidths[5], rowHeights[2]);

  fill(color1Green);
  rect(xPos[6], yPos[2], colWidths[6], rowHeights[2]);

  fill(color4Green);
  rect(xPos[7], yPos[2], colWidths[7], rowHeights[2]);

  fill(color4Green);
  rect(xPos[8], yPos[2], colWidths[8], rowHeights[2]);

  fill(color6Green);
  rect(xPos[9], yPos[2], colWidths[9], rowHeights[2]);

  fill(color2Green);
  rect(xPos[10], yPos[2], colWidths[10], rowHeights[2]);

  fill(color2Green);
  rect(xPos[11], yPos[2], colWidths[11], rowHeights[2]);

  fill(color2Green);
  rect(xPos[12], yPos[2], colWidths[12], rowHeights[2]);

  // ===== Row 3 =====
  fill(color22Green);
  rect(xPos[0], yPos[3], colWidths[0], rowHeights[3]);

  fill(color22Green);
  rect(xPos[1], yPos[3], colWidths[1], rowHeights[3]);

  fill(color22Green);
  rect(xPos[2], yPos[3], colWidths[2], rowHeights[3]);

  fill(color22Green);
  rect(xPos[3], yPos[3], colWidths[3], rowHeights[3]);

  fill(color3Green);
  rect(xPos[4], yPos[3], colWidths[4], rowHeights[3]);

  fill(color4Green);
  rect(xPos[5], yPos[3], colWidths[5], rowHeights[3]);

  fill(color1Green);
  rect(xPos[6], yPos[3], colWidths[6], rowHeights[3]);

  fill(color4Green);
  rect(xPos[7], yPos[3], colWidths[7], rowHeights[3]);

  fill(color4Green);
  rect(xPos[8], yPos[3], colWidths[8], rowHeights[3]);

  fill(color6Green);
  rect(xPos[9], yPos[3], colWidths[9], rowHeights[3]);

  fill(color2Green);
  rect(xPos[10], yPos[3], colWidths[10], rowHeights[3]);

  fill(color2Green);
  rect(xPos[11], yPos[3], colWidths[11], rowHeights[3]);

  fill(color2Green);
  rect(xPos[12], yPos[3], colWidths[12], rowHeights[3]);

  // ===== Row 4 =====
  fill(color5Green);
  rect(xPos[0], yPos[4], colWidths[0], rowHeights[4]);

  fill(color5Green);
  rect(xPos[1], yPos[4], colWidths[1], rowHeights[4]);

  fill(color5Green);
  rect(xPos[2], yPos[4], colWidths[2], rowHeights[4]);

  fill(color3Green);
  rect(xPos[3], yPos[4], colWidths[3], rowHeights[4]);

  fill(color3Green);
  rect(xPos[4], yPos[4], colWidths[4], rowHeights[4]);

  fill(color4Green);
  rect(xPos[5], yPos[4], colWidths[5], rowHeights[4]);

  fill(color1Green);
  rect(xPos[6], yPos[4], colWidths[6], rowHeights[4]);

  fill(color4Green);
  rect(xPos[7], yPos[4], colWidths[7], rowHeights[4]);

  fill(color4Green);
  rect(xPos[8], yPos[4], colWidths[8], rowHeights[4]);

  fill(color6Green);
  rect(xPos[9], yPos[4], colWidths[9], rowHeights[4]);

  fill(color2Green);
  rect(xPos[10], yPos[4], colWidths[10], rowHeights[4]);

  fill(color2Green);
  rect(xPos[11], yPos[4], colWidths[11], rowHeights[4]);

  fill(color2Green);
  rect(xPos[12], yPos[4], colWidths[12], rowHeights[4]);

  // ===== Row 5 =====
  fill(color5Green);
  rect(xPos[0], yPos[5], colWidths[0], rowHeights[5]);

  fill(color2Green);
  rect(xPos[1], yPos[5], colWidths[1], rowHeights[5]);

  fill(color2Green);
  rect(xPos[2], yPos[5], colWidths[2], rowHeights[5]);

  fill(color2Green);
  rect(xPos[3], yPos[5], colWidths[3], rowHeights[5]);

  fill(color1Green);
  rect(xPos[4], yPos[5], colWidths[4], rowHeights[5]);

  fill(color1Green);
  rect(xPos[5], yPos[5], colWidths[5], rowHeights[5]);

  fill(color3Green);
  rect(xPos[6], yPos[5], colWidths[6], rowHeights[5]);

  fill(color3Green);
  rect(xPos[7], yPos[5], colWidths[7], rowHeights[5]);

  fill(color1Green);
  rect(xPos[8], yPos[5], colWidths[8], rowHeights[5]);

  fill(color1Green);
  rect(xPos[9], yPos[5], colWidths[9], rowHeights[5]);

  fill(color1Green);
  rect(xPos[10], yPos[5], colWidths[10], rowHeights[5]);

  fill(color5Green);
  rect(xPos[11], yPos[5], colWidths[11], rowHeights[5]);

  fill(color5Green);
  rect(xPos[12], yPos[5], colWidths[12], rowHeights[5]);

  // ===== Row 6 =====
  fill(color5Green);
  rect(xPos[0], yPos[6], colWidths[0], rowHeights[6]);

  fill(color2Green);
  rect(xPos[1], yPos[6], colWidths[1], rowHeights[6]);

  fill(color2Green);
  rect(xPos[2], yPos[6], colWidths[2], rowHeights[6]);

  fill(color2Green);
  rect(xPos[3], yPos[6], colWidths[3], rowHeights[6]);

  fill(color1Green);
  rect(xPos[4], yPos[6], colWidths[4], rowHeights[6]);

  fill(color1Green);
  rect(xPos[5], yPos[6], colWidths[5], rowHeights[6]);

  fill(color3Green);
  rect(xPos[6], yPos[6], colWidths[6], rowHeights[6]);

  fill(color3Green);
  rect(xPos[7], yPos[6], colWidths[7], rowHeights[6]);

  fill(color1Green);
  rect(xPos[8], yPos[6], colWidths[8], rowHeights[6]);

  fill(color1Green);
  rect(xPos[9], yPos[6], colWidths[9], rowHeights[6]);

  fill(color1Green);
  rect(xPos[10], yPos[6], colWidths[10], rowHeights[6]);

  fill(color3Green);
  rect(xPos[11], yPos[6], colWidths[11], rowHeights[6]);

  fill(color5Green);
  rect(xPos[12], yPos[6], colWidths[12], rowHeights[6]);

  // ===== Row 7 =====
  fill(color5Green);
  rect(xPos[0], yPos[7], colWidths[0], rowHeights[7]);

  fill(color2Green);
  rect(xPos[1], yPos[7], colWidths[1], rowHeights[7]);

  fill(color2Green);
  rect(xPos[2], yPos[7], colWidths[2], rowHeights[7]);

  fill(color2Green);
  rect(xPos[3], yPos[7], colWidths[3], rowHeights[7]);

  fill(color1Green);
  rect(xPos[4], yPos[7], colWidths[4], rowHeights[7]);

  fill(color1Green);
  rect(xPos[5], yPos[7], colWidths[5], rowHeights[7]);

  fill(color3Green);
  rect(xPos[6], yPos[7], colWidths[6], rowHeights[7]);

  fill(color3Green);
  rect(xPos[7], yPos[7], colWidths[7], rowHeights[7]);

  fill(color2Green);
  rect(xPos[8], yPos[7], colWidths[8], rowHeights[7]);

  fill(color2Green);
  rect(xPos[9], yPos[7], colWidths[9], rowHeights[7]);

  fill(color2Green);
  rect(xPos[10], yPos[7], colWidths[10], rowHeights[7]);

  fill(color3Green);
  rect(xPos[11], yPos[7], colWidths[11], rowHeights[7]);

  fill(color5Green);
  rect(xPos[12], yPos[7], colWidths[12], rowHeights[7]);

  // ===== Row 8 =====
  fill(color5Green);
  rect(xPos[0], yPos[8], colWidths[0], rowHeights[8]);

  fill(color5Green);
  rect(xPos[1], yPos[8], colWidths[1], rowHeights[8]);

  fill(color3Green);
  rect(xPos[2], yPos[8], colWidths[2], rowHeights[8]);

  fill(color3Green);
  rect(xPos[3], yPos[8], colWidths[3], rowHeights[8]);

  fill(color1Green);
  rect(xPos[4], yPos[8], colWidths[4], rowHeights[8]);

  fill(color1Green);
  rect(xPos[5], yPos[8], colWidths[5], rowHeights[8]);

  fill(color4Green);
  rect(xPos[6], yPos[8], colWidths[6], rowHeights[8]);

  fill(color4Green);
  rect(xPos[7], yPos[8], colWidths[7], rowHeights[8]);

  fill(color2Green);
  rect(xPos[8], yPos[8], colWidths[8], rowHeights[8]);

  fill(color2Green);
  rect(xPos[9], yPos[8], colWidths[9], rowHeights[8]);

  fill(color2Green);
  rect(xPos[10], yPos[8], colWidths[10], rowHeights[8]);

  fill(color5Green);
  rect(xPos[11], yPos[8], colWidths[11], rowHeights[8]);

  fill(color5Green);
  rect(xPos[12], yPos[8], colWidths[12], rowHeights[8]);
}
