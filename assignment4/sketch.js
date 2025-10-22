let cakes = [];
let decoType = "cream";
let numberOfMango = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  //H: Hue, S: saturation, B: brightness.
  // colorMode(HSB, maxH, maxS, maxB, maxA);
  //  https://p5js.org/reference/p5/colorMode/
}

function draw() {
  background(40, 40, 30);
  textSize(16);
  stroke(10, 90, 100);
  fill(100);
  text("welcome to cake factory!", 20, 20);
  text("press 'm' order for mango cake", 20, 40);
  text("press 'l' order for lemon cake", 20, 60);
  text("press 'h' order for 'happy everyday' cake", 20, 80);
  text("press 'c' order for regular cream cake", 20, 100);
  text("click on top to cancel the order", 20, 120);

  //draw all cakes in the cakes array
  for (let i = 0; i < cakes.length; i++) {
    cakes[i].checkHover(); //check if hovering

    cakes[i].drawPlate();
    cakes[i].drawCakeBase();
    cakes[i].cream(); //all cakes have cream

    //based on decoration type, draw different decorations
    if (cakes[i].decoType === "mango") {
      cakes[i].mango();
    } else if (cakes[i].decoType === "lemon") {
      cakes[i].lemon();
    } else if (cakes[i].decoType === "HEDText") {
      cakes[i].HEDText();
    }
  }
}

function mousePressed() {
  let amIHovering = false;

  //===== hovering and click to delete the cake from array =====
  for (let i = 0; i < cakes.length; i++) {
    if (cakes[i].hovering == true) {
      //Array.splice is a method for removing elements form an array
      //parameter one is the element to remove
      //parameter two is how many elements to remove
      cakes.splice(i, 1); //erase element i form our array, erase only one element

      amIHovering = true;
    }
  }

  //if not clicking on any cake, create a new cake at mouse position
  if (amIHovering == false) {
    //if no hovering was detected in previous for loop

    let tempCake = new Cake(
      //===== cake base =====
      mouseX, // x pos of Ellipse1, cake plate center
      mouseY, //y pos of Ellipse1, cake plate center

      random(0, 360), //color of base cake

      //===== cream =====
      TWO_PI / 18,
      TWO_PI / 24,
      //===== top decorations =====
      decoType,
      numberOfMango //number of mango
    );
    //take my newly created cake and add it to my cakes array
    cakes.push(tempCake);
  }
}

function keyPressed() {
  if (key === "m") {
    decoType = "mango";
  } else if (key === "l") {
    decoType = "lemon";
  } else if (key === "h") {
    decoType = "HEDText";
  } else if (key === "c") {
    decoType = "cream";
  }
}

class Cake {
  // class declares a new type of object
  constructor(
    x, // x pos of ellipseTop, plate center
    y, //y pos of ellipseTop, plate center

    hue, //color of base cake

    creamAngle, //cream angle
    creamBottomAngle, //cream bottom angle

    decoType,
    numberOfMango //number of mango
  ) {
    //for deleting cake when hovering and clicking
    this.hovering = false;

    //=== plate parameters ===
    this.plateDiameterX = random(200, 450);
    this.plateDiameterY = this.plateDiameterX * 0.7;

    //=== Cake Base parameters ===
    //I used two ellipses and one rectangle to create a cake base

    //one rectangle, rect(x, y, w, [h])，
    //rect is the height of the cake

    //plate size decides cake size
    this.wRect = this.plateDiameterX / 2;
    this.hRect = random(80, 120);

    //center position of rectangle
    this.xRect = x;
    this.yRect = y + this.hRect / 2;

    //two ellipse, ellipse(x, y, w, [h])
    this.xEllipse = x; //center x position for both ellipses

    this.yEllipseTop = y; //cake top surface position y
    this.yEllipseBottom = this.yEllipseTop + this.hRect; //cake bottom surface position y
    //the size of the cake will be based on the plate size
    this.wEllipse = this.plateDiameterX / 2;
    this.hEllipse = this.plateDiameterY / 2;

    //=== base cake color ===
    this.baseHue = hue;

    //all types of deco have cream
    this.creamAngle = creamAngle;
    this.creamBottomAngle = creamBottomAngle;
    this.creamD = this.wEllipse / 5;

    //=== top decorations ===
    this.decoType = decoType;
    this.numberOfMango = numberOfMango;
    this.mangoPositions = [];
    //position of mango, mango position X and mango position Y, randomly generated within the cake top area
    //used example template from recorded course video
    for (let i = 0; i < this.numberOfMango; i++) {
      let spacing = 360 / this.numberOfMango;
      let mangoX =
        cos(radians(i * spacing)) * random(10, this.wEllipse / 2 - 20);
      let mangoY =
        sin(radians(i * spacing)) * random(10, this.hEllipse / 2 - 20);
      let newVector = createVector(mangoX, mangoY);
      this.mangoPositions.push(newVector);
    }
    this.mangoAngles = [];
    for (let i = 0; i < this.numberOfMango; i++) {
      this.mangoAngles.push(random(-0.5, 0.5));
    }
  }

  //draw the plate
  drawPlate() {
    stroke(1);
    //plate
    fill(this.baseHue, 20, 30);
    ellipse(
      this.xEllipse,
      this.yEllipseBottom + 8,
      this.plateDiameterX,
      this.plateDiameterY
    );
    fill(this.baseHue * 3, 30, 60);
    ellipse(
      this.xEllipse,
      this.yEllipseBottom,
      this.plateDiameterX,
      this.plateDiameterY
    );
  }

  //draw the cake base, the size based on plate size
  drawCakeBase() {
    noStroke();
    //Base Cake
    fill(this.baseHue, 30, 100);
    ellipse(this.xEllipse, this.yEllipseBottom, this.wEllipse, this.hEllipse);
    //I want to base on the center position, to draw the rectangle, so that ellipse and rect can use the same x center position.
    //https://p5js.org/reference/p5/rectMode/
    rectMode(CENTER);
    rect(this.xRect, this.yRect, this.wRect, this.hRect);
    //top layer lighter color
    fill(this.baseHue, 20, 100);
    ellipse(this.xEllipse, this.yEllipseTop, this.wEllipse, this.hEllipse);
  }

  //use polar coordinates to draw cream around the cake top
  cream() {
    stroke(10, 90, 100);
    fill(0, 0, 100);
    for (let i = 0; i < 18; i++) {
      let currentAngle = this.creamAngle * i;
      //this is the parametric equations of an ellipse
      //start from the center point (cx, cy), then move horizontally by "a * cos(theta) and vertically by b * sin(theta). As theta goes from 0 to 360 degrees, the point traces out the shape of an ellipse
      let x = this.xEllipse + cos(currentAngle) * (this.wEllipse / 2.2);
      let y = this.yEllipseTop + sin(currentAngle) * (this.hEllipse / 2.2);

      ellipse(x, y, this.creamD / 1.2, this.creamD / 1.4);
    }

    //bottom colorful cream
    //choose only to draw half of the bottom cream, so i starts from 2 to 11
    for (let i = 2; i < 11; i++) {
      let currentAngle = this.creamBottomAngle * i;
      let x = this.xEllipse + cos(currentAngle) * (this.wEllipse / 2);
      let y = this.yEllipseBottom - 5 + sin(currentAngle) * (this.hEllipse / 2);
      fill(this.baseHue, 15, 100);
      ellipse(x, y, this.creamD / 1.2, this.creamD / 1.4);
    }
  }

  lemon() {
    push(); //I need to add push and pop, or it will affect text on the left top corner
    stroke(40, 90, 100);
    fill(50, 100, 100);
    for (let i = 0; i < 18; i++) {
      let currentAngle = this.creamAngle * i;
      let x = this.xEllipse + cos(currentAngle) * (this.wEllipse / 2.2);
      let y = this.yEllipseTop + sin(currentAngle) * (this.hEllipse / 2.2);
      fill(50, 100, 100);
      //draw the pericarp
      //same as cream, but use arc to draw part of the ellipse
      arc(x, y - 10, this.creamD, this.creamD, PI / 6, PI + PI / 6, PIE);
      //use a smaller arc to draw the pulp, and some offset
      fill(50, 10, 100);
      arc(
        x + 2,
        y - 10 - 2,
        this.creamD,
        this.creamD,
        PI / 6,
        PI + PI / 6,
        PIE
      );
    }
    pop();
  }

  mango() {
    //to draw shapes inside certain area
    //define the position of mango based on pre-calculated positions
    //used example template from recorded course video
    for (let i = 0; i < this.numberOfMango; i++) {
      push();
      rectMode(CENTER);
      stroke(40, 90, 100);
      fill(50, 50, 100);
      //move the canvas origin to the mango position
      translate(
        this.mangoPositions[i].x + this.xEllipse,
        this.mangoPositions[i].y + this.yEllipseTop
      );
      rotate(this.mangoAngles[i]);
      rect(0, 0, 20, 20);

      pop();
    }
  }

  HEDText() {
    //candle
    //also I want to draw a animated fire. And it looks like drunk walk example, so I learned from that, add some random value to the fire position
    //I want the candle size dependent on the cake size, so I use hEllipse as a reference

    push(); //I need to add push and pop, or it will affect text on the left top corner
    rectMode(CENTER);
    fill(100);
    rect(
      this.xEllipse,
      this.yEllipseTop - this.hEllipse * 0.5,
      this.hEllipse * 0.1,
      this.hEllipse * 0.6
    );
    //draw the fire
    let fireX = this.xEllipse + random(-2, 2);
    let fireY = this.yEllipseTop - this.hEllipse * 0.9 + random(-2, 2);
    fill(30, 100, 100);
    ellipse(fireX, fireY, this.hEllipse * 0.1, this.hEllipse * 0.2);

    //Text
    noStroke();
    fill(0, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(10 * (this.wEllipse / 100));
    text("HAPPY", this.xEllipse, this.yEllipseTop);
    text(
      "EVERYDAY",
      this.xEllipse,
      this.yEllipseTop + 10 * (this.wEllipse / 100)
    );
    pop();
  }

  checkHover() {
    let d = dist(mouseX, mouseY, this.xEllipse, this.yEllipseTop);
    this.hovering = d < this.wEllipse / 2; // check if mouse is within the cake top area
  }
}
