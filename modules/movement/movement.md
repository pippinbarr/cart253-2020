# Movement {

---

## In this module

- Changing position
- Velocity
- Speed returns

---

## Changing position

We've already seen the magic of using variables to change the position of a shape over time

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;
  ellipse(circle.x,circle.y,circle.size);
}
```

Here we're adding the circle's `speed` property to its `x` property, and that creates movement over time.

It moves to the right if the `speed` is positive (because `x` gets bigger) and it moves to the left if the `speed` is negative (because `x` gets smaller).

If `speed` were `0`... it wouldn't move!

---

## Velocity

The correct name for the `speed` property in physics is actually `velocity` (TMI?: speed is a __scalar__ and velocity is a __vector__).

Additionally, because the `circle` exists in __two__ dimensions, it's more common to think about it as having __two__ velocities, one in the horizontal (x-axis) and one in the vertical (y-axis).

Let's change the program a little to account for all this...

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1, // x velocity
  vy: 0 // y velocity
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.vx; // Using the renamed speed
  circle.y = circle.y + circle.vy; // Using the new y velocity!

  ellipse(circle.x,circle.y,circle.size);
}
```

The program behaves the same, but it now resembles a __standard__ way of writing a program that deals with movement.

We have an object (`circle`) with a position (`x` and `y`) that can be changed according to its velocity (`vx` and `vy`). In `draw()`, every frame, we add the matching velocity to the matching position.

---

## Not just horizontal!

If we change the y velocity to a number, our circle can now move vertically too

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: -1 // A negative y velocity will move UP
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x,circle.y,circle.size);
}
```

The circle still moves the right (because `vx` is `1`), but it now also moves __up__ (because `vy` is `-1`, and as the position gets __smaller__ the circle moves upward toward `0`, and past it!).

---

## Taking control

Now that the circle knows how to move, we could allow the __user__ to control it with the mouse position. We could say that if the mouse is to the __right__ of the circle it should move right, if it's to the __left__ it should move left, and if it's __above__ the circle it should move up, and if it's __below__ the circle it should move down.

Sounds like we need some `if`-statements!

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0 // We can start the two velocities at 0 because we move the circle with the mouse now
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
  if (mouseX > circle.x) {
    // So set the circle's x velocity to a POSITIVE number to move it to the RIGHT
    circle.vx = 1;
  }
  // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
  else if (mouseX < circle.x) {
    // So set the circle's x velocity to a NEGATIVE number to move it to the LEFT
    circle.vx = -1;
  }

  // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
  if (mouseY > circle.y) {
    // So set the circle's x velocity to a POSITIVE number to move it DOWN
    circle.vy = 1;
  }
  // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
  else if (mouseY < circle.y) {
    // So set the circle's x velocity to a NEGATIVE number to move it UP
    circle.vy = -1;
  }

  // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  // And draw the ellipse at its new position
  ellipse(circle.x,circle.y,circle.size);
}
```

The circle follows the mouse like a slow, faithful dog. (__Question__: why does it "jiggle" if you leave the mouse in one place? See __TMI?__ at the end.)

So the user can now __control__ the circle in a new way. Previously we could __directly__ set the circle's `x` and `y` to `mouseX` and `mouseY` so it would always be exactly where the mouse cursor is. But now it's an __indirect__ form of control, which can be very interesting to play around with!

---

## Speed returns

In the previous version of our code we had a rogue number, the `1` or `-1` we used to change the velocity. This is just the `speed` the circle moves at, so we should add that back into our object and use it for completeness.

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1 // NEW: the circle knows how fast it can move
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
  if (mouseX > circle.x) {
    // So set the circle's x velocity to a POSITIVE number to move it to the RIGHT
    circle.vx = circle.speed;
  }
  // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
  else if (mouseX < circle.x) {
    // So set the circle's x velocity to a NEGATIVE number to move it to the LEFT
    circle.vx = -circle.speed;
  }

  // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
  if (mouseY > circle.y) {
    // So set the circle's x velocity to a POSITIVE number to move it DOWN
    circle.vy = circle.speed;
  }
  // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
  else if (mouseY < circle.y) {
    // So set the circle's x velocity to a NEGATIVE number to move it UP
    circle.vy = -circle.speed;
  }

  // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  // And draw the ellipse at its new position
  ellipse(circle.x,circle.y,circle.size);
}
```

Now __that is a nice program__!

Now it's also really easy to change how fast the circle moves, just change its `speed`!

---

## Summary

- In programs where we make things move we usually think about it in terms of __adding a velocity to the position__ each frame
- Using velocity allows us to control the movement of objects in new ways!

---

## TMI?

### The jiggles

So, why did the circle jiggle when we were controlling it with the mouse above?

Think about the situation as the circle's `x` position approaches `mouseX`...
- It gets closer and closer until it __equals__ `mouseX`.
- But then __neither__ of the `if` conditions for the `x` position apply, so the `vx` stays the same and moves it __past__ `mouseX`.
- And then the __other__ condition applies, which makes it move back the other way.
- And then the same thing happens, it overshoots `mouseX` and has to go back.
- And so on.

Jiggly.

### Acceleration

For completeness, here is a more complex version of the same program that includes acceleration! It's more complicated! But it is so, so satisfying to play around with!

It's also kind of the "same thing" as the velocity version, with just one extra layer of variables added.

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0, // NEW: acceleration in x
  ay: 0, // NEW: acceleration in y
  maxSpeed: 2, // RENAMED: to reflect a maximum speed
  acceleration: 0.05 // NEW: how much the circle can accelerate per frame
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
  if (mouseX > circle.x) {
    // So set the circle's x acceleration to positive to start moving it right
    circle.ax = circle.acceleration;
  }
  // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
  else if (mouseX < circle.x) {
    // So set the circle's x acceleration to negative to start it moving left
    circle.ax = -circle.acceleration;
  }

  // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
  if (mouseY > circle.y) {
    // So set the circle's y acceleration to positive start it moving down
    circle.ay = circle.acceleration;
  }
  // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
  else if (mouseY < circle.y) {
    // So set the circle's y acceleration to negative start it moving up
    circle.ay = -circle.acceleration;
  }

  // Update the circle's current velocity based on its acceleration!
  // Note that we also want to CONSTRAIN the velocity to not exceed the maximum speed
  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed);

  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed);

  // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  // And draw the ellipse at its new position
  ellipse(circle.x, circle.y, circle.size);
}
```

---

# }
