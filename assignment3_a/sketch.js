let circleD = 25;

//x axis
let circleX;
let thetaX = 0;
let radiusX = 100;

//y axis
let circleY;
let thetaY = 0;
let radiusY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 30);

  let r = map(second(), 0, 60, 0, width / 2);

  radiusX = r;
  radiusY = r;

  circleX = cos(radians(thetaX)) * radiusX;
  thetaX++; //++ adds one to existing var

  circleY = sin(radians(thetaY)) * radiusY;
  thetaY++;

  translate(width / 2, height / 2);

  fill("#ffffff10");
  stroke("#ffff63ff");

  // When creating the breathing animation, I originally arranged 12 small circles evenly around a fixed circular path.
  // Then I experimented by replacing the fixed radius with `circleX` and `circleY` — two values that change based on the current second().
  // (I wasn’t sure what would happen, just wanted to try it out.)
  // This unexpectedly created a rotating "donut" effect — I’m sure there’s some math behind it, but it’s beyond my current understanding!

  for (let i = 0; i < 60; i++) {
    let theta = i * (360 / 60);
    let radius = second() * 10;
    let x = cos(radians(theta)) * circleX;
    let y = sin(radians(theta)) * circleY;
    circle(x, y, radius);
  }
}
