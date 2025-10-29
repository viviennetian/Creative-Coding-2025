//X-Z surface

let tianSizeCenter;
let tianD;
let tianDCurrent;
let tianDOffset = 1;
let tianCircles = [];

let tianRects = []; // save rects that arrived
let tianXZStartX = 400;
let tianXZStartY = 0;
let tianX = tianXZStartX;
let tianY = tianXZStartY;
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
  tianSizeCenter = map(noise(tianDOffset), 0, 1, 180, 240);
  rect(400, 0, tianSizeCenter);

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
    tianX = tianXZStartX; // reset the rect to original position
    tianY = tianXZStartY;
    tianTargetX = random(100, 400);
    tianTargetY = random(0, 300);
  }

  tianDOffset += tianNoiseSpeed;
}
