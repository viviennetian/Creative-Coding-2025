let w;
let h;
let xOffset = 100;

function setup() {
  createCanvas(500, 500);
  stroke(0, 255, 128, 255); //rgba mode color setting
  strokeWeight(1);
}

//2D Perlin Noise
//https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=6
function draw() {
  background(0);
  for (w = -10; w < width + 10; w += 3) {
    for (h = -10; h < height + 10; h += 3) {
      let wNoise = map(noise(w + xOffset, h), 0, 1, -20, 20);
      let hNoise = map(
        noise(w * 0.03 + xOffset, h * 0.03 + 200),
        0,
        1,
        -20,
        20
      );
      stroke(0, 255 - noise(0 + xOffset) * 255, 128, 255);
      line(w, h, w + wNoise, h + hNoise);
    }
  }
  xOffset = xOffset + 0.1;
}
