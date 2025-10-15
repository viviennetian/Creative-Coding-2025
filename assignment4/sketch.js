let cake1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  //H: Hue, S: saturation, B: brightness.
  // colorMode(HSB, maxH, maxS, maxB, maxA);
  //  https://p5js.org/reference/p5/colorMode/
  background(160, 20, 200);

  cake1 = new Cake(
    //cake base
    width / 2, //center x
    height / 2, //y pos of Ellipse1
    height / 2 + 80, //y pos of Ellipse2
    200, //width of ellipses and rect
    140, //height of ellipses
    height / 2 + 40, //y pos of rect
    80, //height of rect
    0, //color of base cake
    TWO_PI / 18
  );
}

function draw() {
  cake1.drawPlate();
  cake1.drawCakeBase();
  if (cake1.decoType === "cream") {
    cake1.cream();
  }
  cake1.mango();
}

function mousePressed() {
  cake1.decoType = "cream";
  cake1.creamType = "circle";
}

class Cake {
  // class declares a new type of object
  constructor(
    x,
    yEllipse1,
    yEllipse2,
    widthE,
    heightE,
    yRect,
    heightRect,
    hue,
    angle
  ) {
    //=== Cake Base parameters ===
    //two ellipse, ellipse(x, y, w, [h])
    this.xE = x;
    this.yE1 = yEllipse1;
    this.yE2 = yEllipse2;
    this.wEllipse = widthE;
    this.hEllipse = heightE;
    //one rectangle, rect(x, y, w, [h])
    this.xR = x;
    this.yR = yRect;
    this.wR = widthE;
    this.hR = heightRect;
    this.baseHue = hue;

    //all types of deco have cream,cream have different shapes
    this.creamAngle = angle;
    this.creamD = 40;
    this.creamType = "circle";

    //=== top decorations ===
    this.decoType = "mango";
    this.numMango = 80;

    //  this.decoType = "cherries";
    //  this.decoType = "HBD text";
    //  this.decoType = "mango";
    //  this.decoType = "lemon";
    //deco Type Also can be:"cherries","HBD text","mango"
  }

  //===== I can randomly change the plate style ?
  drawPlate() {
    noStroke();
    //plate
    fill(250, 200, 30);
    ellipse(this.xE, this.yE2 + 8, 400, 280);
    fill(0, 200, 30);
    ellipse(this.xE, this.yE2, 400, 280);
  }

  drawCakeBase() {
    noStroke();
    //Base Cake
    fill(this.baseHue, 60, 255);
    ellipse(this.xE, this.yE2, this.wEllipse, this.hEllipse);
    //I want to base on the center position, to draw the rectangle, so that ellipse and rect can use the same x center position.
    //https://p5js.org/reference/p5/rectMode/
    rectMode(CENTER);
    rect(this.xR, this.yR, this.wR, this.hR);
    //top layer lighter color
    fill(this.baseHue, 40, 255);
    ellipse(this.xE, this.yE1, this.wEllipse, this.hEllipse);
  }

  cream() {
    noStroke();
    fill(0, 0, 255);
    for (let i = 0; i < 18; i++) {
      let currentAngle = this.creamAngle * i;
      //this is the parametric equations of an ellipse
      //You start from the center point (cx, cy), then move horizontally by "a * cos(theta) and vertically by b * sin(theta). As theta goes from 0 to 360 degrees, the point traces out the shape of an ellipse.
      let x = this.xE + cos(currentAngle) * (this.wEllipse / 2.2);
      let y = this.yE1 + sin(currentAngle) * (this.hEllipse / 2.2);

      // ===== I can create more cream type =====?
      if (this.creamType === "circle") {
        circle(x, y, this.creamD);
      }
      if (this.creamType === "semiCircle") {
        arc(x, y, this.creamD, this.creamD, PI, TWO_PI, PIE);
      }
    }
  }

  lemon() {
    noStroke();
    fill(50, 255, 255);
    for (let i = 0; i < 18; i++) {
      let currentAngle = this.creamAngle * i;
      let x = this.xE + cos(currentAngle) * (this.wEllipse / 2.2) * sqrt(r);
      let y = this.yE1 + sin(currentAngle) * (this.hEllipse / 2.2) * sqrt(r);
      fill(50, 255, 255);
      //draw the pericarp
      arc(x, y - 10, this.creamD, this.creamD, PI / 6, PI + PI / 6, PIE);
      fill(50, 10, 255);
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
  }
  mango() {
    rectMode(CENTER);
    noStroke();
    fill(50, 255, 255);

    //how to draw shapes inside certain area??
  }

  HBDText() {
    text("happy");
    text("birthday");
  }

  //outside of cake decorations
  sparkling() {}
}
