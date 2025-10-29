//Y-Z surface

let tianSizeCenter;
let tianD;
let tianDCurrent;
let tianDOffset = 1;
let tianCircles = [];

let tianRects = []; // save rects that arrived
let tianYZStartX = 0;
let tianYZStartY = 0;
let tianX = tianYZStartX;
let tianY = tianYZStartY;
let tianTargetX, tianTargetY;
let tianPrevS = -1;

let tianSpeed = 0.04;
let tianMoveSpeed = 0.04;
let tianSizeLerpSpeed = 0.04;
let tianNoiseSpeed = 0.02;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  fill(255, 255, 100);
  stroke(0);

  // rectangle size in the center
  rect(0, 0, tianSizeCenter);
  tianSizeCenter = map(noise(tianDOffset), 0, 1, 180, 240);

  // lerp the position, to get the easy out animation
  tianX = lerp(tianX, tianTargetX, tianMoveSpeed);
  tianY = lerp(tianY, tianTargetY, tianMoveSpeed);

  tianD = map(noise(tianDOffset), 0, 1, 20, 120);
  tianDCurrent = lerp(tianD, 0, tianSizeLerpSpeed);
  rectMode(CENTER);
  fill(255);
  rect(tianX, tianY, tianDCurrent);

  // every second, refresh the new random position
  if (second() != tianPrevS) {
    tianPrevS = second();
    tianX = tianYZStartX; // reset the rect to original position
    tianY = tianYZStartY;
    tianTargetX = random(0, 300);
    tianTargetY = random(0, 300);
  }

  tianDOffset += tianNoiseSpeed;
}
