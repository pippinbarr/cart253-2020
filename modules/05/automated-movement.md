# Automated movement {

---

## In this module...

- Linear movement
- Random movement
- Less jittery random movement
- Pursuit
- Fleeing
- TMI: Perlin noise

---

## Linear movement

So far we've largely looked at linear movement: we set a velocity for x and y, and our shape moves in that direction indefinitely.

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(500, 500);

  // Linear movement down and to the right
  circle.vx = circle.speed;
  circle.vy = circle.speed;
}

function draw() {
  background(0);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

This is fine for many purposes, but we might want our shape to move in more complex ways. Let's look at some.

---

## Random movement

One clear option is simply to use the `random()` function to set the velocity each time in `draw()`, making our circle's movement unpredictable...

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // Choose random velocities within the "speed limit"
  circle.vx = random(-circle.speed, circle.speed);
  circle.vy = random(-circle.speed, circle.speed);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

This gives us very jittery movement. Our circle is vibrating indecisively. Could be interesting! Malfunctioning robot? Cornered animal? Too much coffee? Blender? Washing machine is about to explode?

---

## Less jittery random movement

If we want to feel more like our circle is "going about its business" and just moving around the canvas, we need to change its velocity __less often__ so it's not constantly changing its mind.

There are various ways to do this (we could use a timer for example), but a nice way is actually to use `random()` __again__ to randomly decide __when__ to change directions (change velocity).

If we generate a random number with `random()` (a number between `0` and `1`) we actually know that it will be between `0` and `0.5` 50% of the time and between `0.5` and `1.0` 50% of the time. It will be less than `0.25` 25% of the time, and less than `0.1` 10% of the time. This is because it follows a __uniform distribution__. That term is not so important, but the fact we can use `random()` in this way means we can use it for __probabilities__.

So, let's tell our circle to change direction randomly only 1% of the time...

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let change = random(); // Generate a random number between 0 and 1

  // Change direction 1% of the time
  if (change < 0.01) {
    // Choose random velocities within the "speed limit"
    circle.vx = random(-circle.speed, circle.speed);
    circle.vy = random(-circle.speed, circle.speed);
  }

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

This circle looks a lot more like it's trying to do something with its life! In fact we know it's still moving randomly, but the randomness is spread out enough that it starts to have the appearance of intention! Someone searching for their keys on the beach? Our heart metaphorically chasing different dreams? A toddler moving around inexplicably? A patrolling alien sentry?

Depending on the probability of changing movement (`0.01` above), the circle will be more or less jittery because it will change direction more or less often. This number is thus a way to control the "personality" of the circle in relation to its movement.

There's something nice in how it eventually just wanders off, too.

---

## Pursuit

We've already looked at this, but as a refresher, remember that we can set our circle's velocity (direction) based on the position of __something else__, like the mouse location for example. To do so we work out the different between the positions and move accordingly...

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let dx = circle.x - mouseX; // Distance between the circle and the mouse horizontally
  let dy = circle.y - mouseY; // Distance between the circle and the mouse vertically

  if (dx < 0) { // If dx is negative, the mouse is to the right
    // So move right
    circle.vx = circle.speed;
  }
  else if (dx > 0) { // If dx is positive, the mouse is to the left
    // So move left
    circle.vx = -circle.speed;
  }

  // Same again for the y axis
  if (dy < 0) {
    circle.vy = circle.speed;
  }
  else if (dy > 0) {
    circle.vy = -circle.speed;
  }

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

---

## Fleeing

We can use the identical code but just switch the direction of movement if we want the circle to "run away" from the mouse...

```javascript
if (dx < 0) { // If dx is negative, the mouse is to the right
  // So move left (run away!)
  circle.vx = -circle.speed;
}
else if (dx > 0) { // If dx is positive, the mouse is to the left
  // So move right (run away!)
  circle.vx = circle.speed;
}

// Same again for the y axis
if (dy < 0) {
  circle.vy = -circle.speed;
}
else if (dy > 0) {
  circle.vy = circle.speed;
}
```

If you only ran away from or chased the mouse when it is within a certain __distance__ (using `dist()`), that could be even more interesting.

---

## Summary

- We can control movement in more sophisticated ways than just linear motion
- For example we can move very randomly every frame
- Or we could randomly choose a new direction every now and then
- Or we could follow or run away from something else (like the mouse)

---

## TMI?

### Perlin noise

Without going into too much detail here, another very interesting function in p5 is called [`noise()`](https://p5js.org/reference/#/p5/noise). This is a function that, like `random()`, returns a number between `0` and `1`. However, the way it __chooses__ the number is not random, but rather a kind of "organic" (very complex) mathematical formula.

One of the great things about it is that it can create more "naturalistic" movement (among other things). Here's an example for reference:

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
  tx: 0, // A "time" value for the horizontal (for noise())
  ty: 10 // A "time" value for the vertical (for noise())
  // We start these two "time" values at different numbers because
  // we want the horizontal and vertical to have different resulting
  // noise() values (and behaviours)
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // To use noise we need to provide an argument to it
  // that changes over time, circle.tx for our horizontal movement
  // and circle.ty for our vertical movement. t is for "time" here.
  circle.tx = circle.tx + 0.025;
  circle.ty = circle.ty + 0.025;
  // Changing the number we add to our "time" values changes the
  // resulting "smoothness" of the movement.

  // Now we calculate the noise value based on those "time" values
  // Because they increase over time, noise() returns different values
  // each frame.
  let noiseX = noise(circle.tx);
  let noiseY = noise(circle.ty);

  // Then we set our velocity to the value noise() returned (between 0 and 1)
  // mapped to our circle's speed range
  circle.vx = map(noiseX, 0, 1, -circle.speed, circle.speed);
  circle.vy = map(noiseY, 0, 1, -circle.speed, circle.speed);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

---

# }
