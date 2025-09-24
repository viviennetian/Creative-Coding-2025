# Assignment 1 : Geometric Abstraction

---

## Step-by-Step Process

**Step 1:**  
I first used Illustrator to match the original image’s full proportions and colors on a 400×500 pixel canvas.

The original image is here:  
[https://artsandculture.google.com/asset/untitled/KgGv7jz6YWO86g?ms={"x"%3A0.5%2C"y"%3A0.5%2C"z"%3A9.195123090636399%2C"size"%3A{"width"%3A1.7609727056946738%2C"height"%3A1.2374999999194376}}](https://artsandculture.google.com/asset/untitled/KgGv7jz6YWO86g?ms=%7B%22x%22%3A0.5%2C%22y%22%3A0.5%2C%22z%22%3A9.195123090636399%2C%22size%22%3A%7B%22width%22%3A1.7609727056946738%2C%22height%22%3A1.2374999999194376%7D%7D)

**Step 2:**  
I divided the background into a 13×9 grid of rectangles with varying width and height, using variables, arrays, and cumulative sums to draw each row of the green checkerboard background.

- Defined arrays for `colWidths` and `rowHeights` to simulate a flexible layout system.
- Used cumulative sums (`xPos[]` and `yPos[]`) to precalculate drawing anchor points.

**Step 3:**  
Since the grid drawing code was getting long, I wrapped it in a function called `drawComplexBackground()`. I then placed the function call inside `draw()`, so when interactive animations are added later, each frame clears and redraws the previous one.

**Step 4:**  
I drew the dark-colored parts in the foreground of the original image. I thought the arc and triangle patterns looked like small characters — something I could possibly expand on later. I used `arc()` and `triangle()`, and grouped style-heavy sections with `push()` and `pop()`.

(Since this recreation didn’t require `beginShape()`, `vertex()` and `endShape()`, I didn’t use them here. But I did use them in my Week 2 sketch.js where I drew Hello Kitty.)

**Step 5:**  
I added interactive animation to the head of the little triangle characters. The mouse position serves as the source of dynamic data for the head. I added a dynamic offset to the original coordinates to make them move.

**Step 6:**  
I made the whole drawing scalable based on a 500×400 pixel canvas by applying the `scale()` function relative to the window size. This was done by dividing to get a scale factor:

```js
let baseW = 500;
let baseH = 400;

let scaleX = width / baseW;
let scaleY = height / baseH;
scale(scaleX, scaleY);
```

---
