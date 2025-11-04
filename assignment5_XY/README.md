# Assignment 5 : flower

## Projection Mapping, Week 8 Workshop

---

## Concept

I wanted to create a projection effect centered on one corner of a cube. So I made a simple animation resembling a daisy flower, where the XY plane serves as the top face, the XZ plane as the left face, and the YZ plane as the right face. (However, during the workshop, due to time constraints, we only managed to debug one face successfully and couldn’t assemble the full flower.)

---

## Component

### Stationary rectangle (center/base)

```
tianSizeCenter = map(noise(tianDOffset), 0, 1, 180, 240);
rect(0, 400, tianSizeCenter);
```

This part draws the “central rectangle,” which functions as the core of the flower.
Although it’s positioned at (0, 400), it essentially serves as a fixed visual anchor.
Its size changes slightly according to the noise value, giving it a subtle “breathing” or rhythmic feel.

### Moving rectangle without clearing the background (forming petal trails)

```
rect(tianX, tianY, tianDCurrent);
```

This rectangle receives a new random target position`(tianTargetX, tianTargetY)`every second, and uses `lerp()` to move smoothly toward it.
Because the `draw()` function doesn’t clear the background, the content from the previous frame remains visible.
As a result, each movement leaves a visible trail on the canvas,and these overlapping traces create a visual effect similar to petals spreading outward from the flower’s center.
