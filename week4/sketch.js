function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //any transformation are reset at the start of draw
  background("#00ffe1ff");

  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI);

  push();
  rotate(radians(mouseX));
  stroke("white");
  strokeWeight(5);
  line(0, 0, 100, 0);
  pop();

  //push and pop ISOLATE transformations and style changes to only the code between them
  push();

  if (mouseX > width / 2 && mouseY > height / 2) {
    fill("#ffdfeaff");
  } else if (mouseX < width / 2 && mouseY < height / 2) {
    fill("#ffa702ff");
  } else {
    fill("#e5ff00ff");
  }

  if (mouseIsPressed == true) {
    fill("#ff0202ff");
  }

  //translate is a TRANSFORMATION function, it moves the coordinate system matrix according to a new set of coordinates, which become the "new" 0,0
  translate(width / 2, height / 2);

  let angle;
  //map is a FUNCTION that scale numbers proportionately parameters:
  //1: input variable to scale
  //2: input variable minimum
  //3: input variable maximum
  //4: output variable minimum
  //5: output variable maximum
  angle = map(mouseX, 0, width, 0, 360);
  rotate(radians(angle));

  let scaleFactor; //make a variable to hold scale amount
  scaleFactor = map(mouseY, 0, height, 0.1, 3);

  //scale makes the coordinate system larger or smaller, it takes a "factor" as parameter
  //if you supply two parameters, the first is for x axis, the second for y axis
  scale(scaleFactor, 2);

  circle(0, 0, 100);
  circle(-15, -10, 5);
  circle(15, -10, 5);
  arc(0, 0, 60, 60, 0, PI);

  pop();

  //text function: text, x,y of top left corner
  text(mouseX + "," + mouseY, 5, 15);
}
