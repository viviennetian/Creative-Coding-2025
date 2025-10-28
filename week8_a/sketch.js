//random

//https://p5js.org/reference/p5/createVector/
//createVector is used to create a vector object which holds x and y coordinates
let points = [];
let lineStart = 0;
let lineEnd = 0;

// let otherPoints = [
//   { x: 0, y: 0 },
//   { x: 0, y: -100 },
//   { x: 85, y: 50 },
//   { x: -85, y: 50 },
//   { x: 0, y: 100 },
//   { x: -85, y: -50 },
//   { x: 85, y: -50 },

//   // object literals
//   //name of field
// ];

function setup() {
  createCanvas(500, 500);

  points = [
    createVector(0, 0),
    createVector(0, -100),
    createVector(85, 50),
    createVector(-85, 50),
    createVector(0, 100),
    createVector(-85, -50),
    createVector(85, -50),
  ];
}

function draw() {
  noLoop();

  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(5);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }
  stroke(255, 0, 0);
  line(
    points[lineStart].x,
    points[lineStart].y,
    points[lineEnd].x,
    points[lineEnd].y
  );

  let lineAmount = floor(random(1, 9));
  for (let i = 0; i < lineAmount; i++) {
    let start = floor(random(points.length));
    let end = floor(random(points.length));
    line(points[start].x, points[start].y, points[end].x, points[end].y);
  }
}

function mousePressed() {
  lineStart = floor(random(points.length));
  //floor function will round down the number
  //to whatever the lower whole number is
  lineEnd = floor(random(points.length));
}
