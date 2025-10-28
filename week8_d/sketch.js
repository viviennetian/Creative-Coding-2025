//noise
//eye ball
let eye1;
let eye2;

let eye2x = 400;
let eye2y = 200;

let pX = 0;
let pY = 0;

let targetX = 0;
let targetY = 0;

let currentX;
let currentY;

let lerpAmount = 1;
let speed = 0.1;

let prevS = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  // to make the eyes look in the same direction
  //set r and t values the same numbers
  //to have them look differently, set different r and t values
  eye1 = new EyeBall(200, 200, 100, 150, 0, 100);
  eye2 = new EyeBall(eye2x, eye2y, 100, 150, 0, 100);
}

function draw() {
  background(0);
  //set current position according to lerp functions
  currentX = lerp(pX, targetX, lerpAmount);
  currentY = lerp(pY, targetY, lerpAmount);

  eye1.x = currentX;
  eye1.y = currentY;
  eye1.display();

  // //mouse follow for eye2
  // eye2x = lerp(eye2x, mouseX, 0.05);
  // eye2y = lerp(eye2y, mouseY, 0.05);

  // easy out
  eye2x = lerp(eye2x, targetX, 0.05);
  eye2y = lerp(eye2y, targetY, 0.05);

  eye2.x = eye2x;
  eye2.y = eye2y;
  eye2.display();

  lerpAmount = lerpAmount + speed;
  lerpAmount = constrain(lerpAmount, 0, 1);

  if (second() != prevS) {
    prevS = second();
    pX = currentX;
    pY = currentY;
    targetX = random(width);
    targetY = random(height);
    lerpAmount = 0;
  }
}

function mousePressed() {
  //reset pX and pY to current position
  pX = currentX;
  pY = currentY;

  //set target position to mouse position
  targetX = mouseX;
  targetY = mouseY;

  //reset lerpAmount
  lerpAmount = 0;
}

class EyeBall {
  constructor(x, y, w, h, r, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.speed = 0.005;
    this.noiseR = r;
    this.noiseT = t;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(255);
    ellipse(0, 0, this.w, this.h);

    let eyeTheta = noise(this.noiseT) * 360; //angle from 0 to 360
    let eyeXRadius = (noise(this.noiseR) * this.w) / 2;
    let eyeYRadius = (noise(this.noiseR) * this.h) / 2;

    let eyeX = cos(eyeTheta) * eyeXRadius;
    let eyeY = sin(eyeTheta) * eyeYRadius;

    fill(0);
    ellipse(eyeX, eyeY, this.w / 2, this.h / 2);

    this.noiseR += this.speed;
    this.noiseT += this.speed;
    pop();
  }
}
