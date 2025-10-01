# Hello Kitty Grid – p5.js Week 3 Practice

This is a practice sketch I made while learning p5.js.  
It draws a grid of Hello Kitty figures that rotate and scale based on mouse position.  
Each time I click the canvas, the bowknot color changes randomly.

---

## Loop Logic

I used **two `for` loops** to draw a grid:

- The **outer loop** goes over the vertical rows (spaced every 100px)
- The **inner loop** goes across horizontal columns
- In each cell:
  - I translated the origin
  - Rotated the shape based on `mouseX`
  - Scaled it based on `mouseX + mouseY`
  - Then called a function to draw the Hello Kitty

---

## drawKT() was reused from Week 2

The `drawKT()` function — which draws the face, bowknot, eyes, nose, and whiskers —  
was written in **Week 2**. In this sketch, I reused it instead of redrawing everything.  
This helped me understand how to modularize drawing logic and keep the main loop cleaner.

---

## Functions I used

- `setup()` – to create the canvas and initialize the color
- `draw()` – to loop the drawing every frame
- `mousePressed()` – to change the bow color on each click
- `translate()`, `rotate()`, `scale()` – to move, rotate, and resize the Kitty figures
- `map()` – to map `mouseX` and `mouseY` to angle and scale
- `push()` and `pop()` – to isolate transformations inside loops
- `beginShape()`, `bezierVertex()` – to draw the face and bow by hand
- `ellipse()`, `rect()` – for eyes, nose, and whiskers

---
