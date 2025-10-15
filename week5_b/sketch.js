let circleD = 25;

//x axis
let circleX;
let thetaX = 0;
let radiusX = 100;

//y axis
let circleY;
let thetaY = 0;
let radiusY = 100;

let prevMillis = 0;

let prevSecond = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  let r = map(second(), 0, 60, 0, width / 2);

  radiusX = r;
  radiusY = r;

  background(0, 30);
  strokeWeight(2);

  //动画曲线
  circleX = cos(radians(thetaX)) * radiusX;
  thetaX++; //++ adds one to existing var
  translate(width / 2, height / 2);
  textSize(40);
  text(day(), 0, 0);
  text(hour(), 0, 30);
  text(minute(), 0, 60);
  text(second(), 0, 90);

  noFill();
  stroke("red");
  circle(circleX, 0, circleD);

  stroke("green");
  circleY = sin(radians(thetaY)) * radiusY;
  circle(0, circleY, circleD);
  thetaY++;

  stroke(255);
  circle(circleX, circleY, circleD);

  for (let i = 0; i < 12; i++) {
    let theta = i * (360 / 12);
    let radius = 20;
    let x = cos(radians(theta)) * radiusX;
    let y = sin(radians(theta)) * radiusY;
    circle(x, y, radius);
  }

  //how to use millis():  https://openprocessing.org/sketch/2364172
  if (millis() - prevMillis >= 1000) {
    prevMillis = millis(); //new stopwatch time is current time
  }

  // let millisecond = millis() - prevMillis;

  // circle(0, 0, millisecond);

  // for (let i = 0; i < 12; i++) {
  //   let theta = i * (360 / 12);
  //   let radius = mouseX;
  //   let x = cos(radians(theta)) * radius;
  //   let y = sin(radians(theta)) * radius;
  //   circle(x, y, mouseY);
  //   text(i, x, y);
  // }
}
