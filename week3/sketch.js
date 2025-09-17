//a number in programming language can be replaced by viariable
//and make it affect by interaction
//"let" is a variable that allows you to declare a variable in the below example, a new variable is being created called " circleSize" which is storing a number(125)
let circleSize = 125; //variable to store circle size

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400, 400);
}

function draw() {
  //inspect-console in chrome
  // console.log(mouseX, mouseY);

  //color picker 用完整格式("rgba(238, 111, 111, 1)"
  background("rgba(42, 134, 255, 1)");

  noStroke();
  fill("#00ffe1cb");
  rect(0, 0, width / 2, height / 2);
  rect(width / 2, height / 2, width, height);

  strokeWeight(5);
  //nostroke(); //no outline
  //nofill(); //no fill

  stroke(255);
  fill("rgba(0, 217, 255, 1)");

  //circle takes 3 parameters: x y and d:
  circle(200, 200, circleSize);

  //setting a new fill for my rectangle
  fill("rgba(255, 255, 0, 1)");
  rect(50, 50, 100, 150); //x y w h

  //setting a new fill for my ellipse
  fill("rgba(77, 255, 178, 1)");
  ellipse(600, 400, 200, 280); //x, y, w, h
  line(200, 200, 400, 400); //x1, y1, x2, y2

  //to draw complex polygons(more than 2 coords);
  //create a beginShape(); function and an endShape function
  //any vertex(x,y) functions you place inbetween beginShape and endShape will be rendered as a complete polygon

  beginShape();
  vertex(100, 100);
  vertex(200, 100);
  vertex(200, 150);
  endShape(CLOSE); //CLOSE parameter connects the last and first vertex

  //position variables
  fill("rgba(169, 77, 255, 1)");
  circle(windowWidth / 2, windowHeight / 2, 50);

  fill("rgba(89, 77, 255, 1)");
  ellipse(mouseX, mouseY, mouseY / 3, mouseX / 3); //draw circle that follows mouse movement

  fill("rgba(255, 174, 86, 1)");
  //arcs are like ellipse, except they take two extra parameters, a start angle and an end angle,which are provided in RADIANS format
  arc(width / 2, height * 0.75, 100, 100, -PI / 2, radians(180)); //x,y,w,h,start angle,end angle
  arc(width / 2, height * 0.25, 100, 100, -PI / 2, radians(180), PIE);
  arc(width / 4, height * 0.5, 100, 100, radians(30), radians(180), CHORD);

  //curves

  //quadraticVertex();
  //https://p5js.org/reference/p5/quadraticVertex/
}
