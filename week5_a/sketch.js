let buttonX = 100;
let buttonY = 100;
let buttonD = 80;
let hovering = false;
//boolean variable that tracks whether the mouse is hovering over my button

let r = 0; //variables to store rgb values
let g = 0;
let b = 0;

let ballX = 0;
let ballSpeed = 4;
let ballDiameter = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // noLoop(); // prevent draw();to loop itself
  ballX = ballDiameter / 2;
}

function draw() {
  background(r, g, b); //use the rgb variables to set the bg color
  strokeWeight(1);
  fill(0, 255, 0); //green fill
  text("x:" + mouseX + " y:" + mouseY, 15, 15);

  let distance = dist(mouseX, mouseY, buttonX, buttonY);
  text("dist:" + distance, 15, 30);

  stroke(255); //white stroke
  noFill();

  //bounce back from the border
  if (ballX > width - ballDiameter / 2 || ballX < ballDiameter / 2) {
    ballSpeed = -ballSpeed;
  }

  // is the distance between the mouse and the center of the button less than the radius?
  if (distance < buttonD / 2) {
    fill(50);
    hovering = true; //flipped hovering variable
    ballX = ballX + ballSpeed;
    if (mouseIsPressed) {
      //如果mouse被按着。。。
      strokeWeight(4);
    }
  } else {
    hovering = false;
  }

  //button
  circle(buttonX, buttonY, buttonD);

  //bounce ball
  fill("red");
  noStroke();
  circle(ballX, 200, ballDiameter); // circle uses ballX for positionX
}

function mousePressed() {
  //只会返回一个值
  // the mousePressed function runs enclosed code ONCE when the mouse is pressed down
  if (hovering == true) {
    r = random(255);
    g = random(255);
    b = random(255);
    ballSpeed = -ballSpeed;
  }
}
