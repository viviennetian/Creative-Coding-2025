//noise

let noisePosition = 0;
let noiseSpeed = 0.01;
let startingPoint = 0;

let noiseTheta = 0;
let noiseRadius = 0;
let noisePositionAngle = 1000; //different starting point for angle

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  translate(width / 2, height / 2);
  strokeWeight(3);

  noiseTheta = map(noise(noisePositionAngle), 0, 1, 0, 360);
  noiseRadius = map(noise(noisePosition), 0, 1, 0, width / 2);

  let x = cos(noiseTheta) * noiseRadius;
  let y = sin(noiseTheta) * noiseRadius;

  //random gradient background
  //from color to color with smooth transition
  // background(noiseTheta, 20, noiseRadius);

  point(0, 0);
  stroke(noiseTheta, 100, noiseRadius);
  line(0, 0, x, y);
  circle(x, y, 10);
  noisePosition += noiseSpeed;
  noisePositionAngle += noiseSpeed;

  // ver1.0
  // circleD = noise(noisePosition) * width; //fixed random number inside every frame
  // noise is continuous random number between 0 and 1
  // circle(0, 0, circleD);
  // noisePosition += noiseSpeed;

  // ver2.0 (doesn't work???)
  // noisePosition = 0;
  // for (let i = 0; i < width; i++) {
  //   let y = noise(noisePosition) * height;
  //   noisePosition = noisePosition + noiseSpeed;
  //   let d = map(i, 0, width, 0, 25);
  //   circle(i, y, 5);
  // }

  // startingPoint = startingPoint + noiseSpeed;
}

function mousePressed() {}
