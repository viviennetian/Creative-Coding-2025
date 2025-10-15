let bugs = [];
let prevS = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let tempBug = new Bug(random(width), random(height)); //make a new bug, store it in a temporary variable
  bugs.push(tempBug); //add that new bug to my array
  console.log(bugs);
}

function draw() {
  background(255);

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }

  //bug clock
  if (prevS != second()) {
    prevS = second(); //resets the one second timer
    let tempBug = new Bug(random(width), random(height));
    bugs.push(tempBug);
  }

  if (second() == 0) {
    bugs = [];
  }
}

function mousePressed() {
  let amIHovering = false;

  //===== use this in the assignment!!!! =====
  for (let i = 0; i < bugs.length; i++) {
    if (bugs[i].hovering == true) {
      //Array.splice is a method for removing elements form an array
      //parameter one is the element to remove
      //parameter two is how many elements to remove
      bugs.splice(i, 1); //erase element i form our array, erase only one element

      amIHovering = true;
    }
  }

  if (amIHovering == false) {
    //if no hovering was detected in previous for loop
    let tempBug = new Bug(mouseX, mouseY);
    bugs.push(tempBug);
  }
}

class Bug {
  constructor(x, y) {
    //sets the initial values of "fields" or variables
    this.x = x;
    this.y = y;
    this.hovering = false;
    this.noisePositionX = random(1000); //drop into perlin noise space at a random position for X
    this.noisePositionY = random(1000);
    this.speed = 0.005;
  }

  move() {
    //about perlin noise
    this.x = map(
      noise(this.noisePositionX + frameCount / 1000),
      0,
      1,
      0,
      width
    );
    this.y = map(
      noise(this.noisePositionY + frameCount / 1000),
      0,
      1,
      0,
      height
    );

    this.noisePositionX = this.noisePositionX + this.speed;
    this.noisePositionY = this.noisePositionY + this.speed;

    // this.x = this.x + random(-4, 4);
    // this.y = this.y + random(-4, 4);
  }

  display() {
    if (dist(mouseX, mouseY, this.x, this.y) < 7.5) {
      //is the mouse hovering over the bug?
      //we are hovering!
      this.hovering = true;
      fill(0); //change fill to black
    } else {
      this.hovering = false;
      fill(255);
    }

    push();
    translate(this.x, this.y);
    line(0, 3, 10, 3);
    line(0, -3, -10, 3);
    line(0, 0, -10, 0);

    circle(0, 0, 15);
    pop();
  }
}
