// //FIELDS:
// let x = 0;
// let y = 0;
// let d = 20; // diameter of circle
// let speed = 5;
// let hue = 20;
// let opacity = 127;

// // version 1: manually
// let harry; //this is a variable to store my object
// let samantha; //this will store another object

let drunks = []; //square brackets indicate I'm making an array
let drunkAmount = 50;

//an array is a variable that contains multiple  variables
//each individual variables can access using an index number that is fed into the square brackets
//like so: drunk5[5], would give me the 6th drunk in the list

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 80, 0);
  x = width / 2;
  y = height / 2;
  colorMode(HSB);

  // // version 1: manually
  // harry = new Drunk(width / 2, height / 2, 100, 3, 220);
  // samantha = new Drunk(width / 3, height / 3, 20, 3, 10);

  for (let i = 0; i < drunkAmount; i++) {
    let drunkD = random(10, 40); //diameter from 10 to 100
    let drunkSpeed = random(0.2, 3); //speed from 1 to 70
    let drunkHue = random(0, 60);
    drunks[i] = new Drunk(width / 2, height / 2, drunkD, drunkSpeed, drunkHue);
  }
}

function draw() {
  // //METHOD 1: MOVE THE DRUNK
  // //drunk walk
  // x = x + random(-speed, speed); //increment itself
  // y = y + random(-speed, speed);
  // //METHOD 2: DRAW THE DRUNK
  // fill(hue, 70, 100, opacity);
  // circle(x, y, d);

  // //version 1.0
  // harry.move();
  // harry.drawDrunk();

  // samantha.move();
  // samantha.drawDrunk();

  for (let i = 0; i < drunks.length; i++) {
    drunks[i].move();
    drunks[i].drawDrunk();
  }
}

class Drunk {
  // class declares a new type of object
  constructor(x, y, diameter, speed, hue) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.hue = hue;
    this.opacity = random(0, 1); //you can also initialize variables
  }
  move() {
    //you can declare functions or "methods" like this inside class
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }
  drawDrunk() {
    fill(this.hue, 70, 100, this.opacity);
    circle(this.x, this.y, this.diameter);
  }
}
