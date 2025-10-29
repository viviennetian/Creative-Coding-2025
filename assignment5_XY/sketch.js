//X-Y surface

let tianSizeCenter;
let tianD;
let tianDCurrent;
let tianDOffset = 1;
let tianCircles = [];

let tianRects = []; // save rects that arrived
let tianXYStartX = 0;
let tianXYStartY = 400;
let tianX = tianXYStartX;
let tianY = tianXYStartY;
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
  rect(0, 400, tianSizeCenter);

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
    tianX = tianXYStartX; // reset the rect to original position
    tianY = tianXYStartY;
    tianTargetX = random(0, 300);
    tianTargetY = random(100, 400);
  }

  tianDOffset += tianNoiseSpeed;
}
