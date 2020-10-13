# Intermediate drawing {

---

## In this module

- Styling with `push()` and `pop()`
- Transformations

---

## Styling instructions apply to everything

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  fill(255, 0, 0);
  stroke(0, 255, 255);
  strokeWeight(10);
  rect(100, 100, 100, 100);

  fill(0, 0, 255);
  rect(300, 100, 100, 100);
}
```

This program draws two squares, side by side. It's likely that what we __intended__ was

- the first square should have a red fill, cyan stroke, and a stroke weight of 10
- the second square should have a fill of blue

But the second square ends up with all the settings for the first square as well (except for the `fill()` which is set to blue).

__This is inconvenient!__

---

## A bad solution

A not very good solution might be to always explicitly set every styling property you change...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  fill(255, 0, 0);
  stroke(0, 255, 255);
  strokeWeight(10);
  rect(100, 100, 100, 100);

  fill(0, 0, 255);
  stroke(0); // Set stroke back to default
  strokeWeight(1); // Set stroke weight back to default
  rect(300, 100, 100, 100);
}
```

This works, but it's frustrating and it gets hard to keep track of in a larger program.

__There must be a better way!__

---

## A better way with `push()` and `pop()`

Our best solution is with two new functions, `push()` and `pop()`.

- `push()` __saves__ the current drawing settings (like `fill()`, `stroke()`, etc.)
- `pop()` __reloads__ the previous saved drawing settings

This means that before we draw a new shape with new drawing settings we can __save__ the previous settings, then do our drawing, then __restore__ the old settings so we don't interfere with anything else.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  push();
  fill(255, 0, 0);
  stroke(0, 255, 255);
  strokeWeight(10);
  rect(100, 100, 100, 100);
  pop();

  push();
  fill(0, 0, 255);
  rect(300, 100, 100, 100);
  pop();
}
```

This has the results we want, but now we can __separate__ each shape and its specific styling instructions from the other. This gives us peace of mind to know that one shape's drawing settings won't accidentally affect another one.

So, our rule of thumb: use `push()` and `pop()` any time you draw a new shape (or shapes) that uses drawing settings. Put `push()` __before__ you start the drawing settings, put `pop()` after you've drawn the shape(s).

---

## Transformation

At present, all our drawings are locked into a standard rotation and scale. What if I wanted to draw a rectangle rotated 45 degrees, for instance?

Well, we can with p5's [Transform functions](https://p5js.org/reference/#group-Transform). The most important for now are:

- `translate()`
- `rotate()`
- `scale()`

Let's look at them.

---

## `translate()`

The `translate()` function is a tiny bit odd. What it does it it __moves the origin point__ of our canvas. That is, it moves where the position `0,0` is on the canvas.

For example...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  // Red rectangle, no translation
  fill(255, 0, 0);
  rect(0, 0, 100, 100);

  // Blue rectangle, translated
  translate(200, 100); // Move the origin 200 pixels to the right, 100 pixels down
  fill(0, 0, 255);
  rect(0, 0, 100, 100);
}
```

Notice how __both rectangles use `0,0` as their position__.

The first (red) rectangle is drawn at the top left corner, where `0,0` (the origin) usually is.

But for the second (blue) rectangle we first use `translate()` to __move__ `0,0` (the origin) by `200` pixels to the right and `100` pixels down.

Then, when we draw the blue rectangle at `0,0`, it is displayed in a different position because of this! It's as if we drew it at `200,100` relative to the original `0,0`.

---

## `translate()` is additive

It's tempting to assume that `translate()` moves the origin __to the position specified__, but it does not. It moves the origin __by the amount specified__.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  // Red rectangle
  translate(100,100); // Move the origin 100 pixels right and 100 pixels down
  fill(255, 0, 0);
  rect(0, 0, 100, 100);

  // Blue rectangle
  translate(100, 100); // Move the origin 100 MORE pixels to the right, 100 MORE pixels down
  fill(0, 0, 255);
  rect(0, 0, 100, 100);
}
```

Here we can see the second (blue) rectangle has been moved an __additional__ `100` pixels to the right and `100` pixels down by the `translate()` instruction.

---

## Use `push()` and `pop()` with transformations

Because the transformation functions affect __everything__ after them (as with the translations above), it's a good idea to protect yourself from weird mistakes by using `push()` and `pop()` around transformations as well. They have the same effect as with the styling instructions...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  // Red rectangle
  push(); // Save the defaults (for example the origin is at the top left)
  translate(100,100); // Move the origin 100 pixels right and 100 pixels down
  fill(255, 0, 0);
  rect(0, 0, 100, 100);
  pop(); // Restore the defaults (the origin goes back to the top left)

  // Blue rectangle
  push(); // Save the defaults (like the origin is at the top left)
  translate(100, 200); // Move the origin 100 pixels to the right, 200 pixels down
  fill(0, 0, 255);
  rect(0, 0, 100, 100);
  pop(); // Restore the defaults (the origin goes back to the top left)
}
```

Here the two rectangles use `translate()`, but because we used `push()` and `pop()` the two translations are __independent__ of each other, which is very often what we want.

__Note:__ there are neat tricks to be performed by __not__ using `push()` and `pop()` like this every time, but this is the most common case.

---

## `rotate()`

So far, using `translate()` has just been a funny way to move where `0,0` is on the canvas, not exactly all that inspiring.

It comes into its own when we start wanting to rotate shapes, however, because shapes are __rotated around the origin__.

Let's use `rotate()` __without__ `translate()`...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  push();
  rectMode(CENTER);
  rotate(PI/4); // Rotate the following shape by PI/4 radians (45 degrees)
  fill(255, 0, 0);
  rect(250, 250, 100, 100);
  pop();
}
```

We drew our rectangle in the center of the canvas, rotated by 45 degrees. We might have expected it to appear __in the center of the canvas, rotated by 45 degrees__, but instead it appears at the bottom right. Why?

Because it was rotated by 45 degrees __around the origin__ (which is at the top left of the canvas by default!)

It might be easier to see if we animate the angle of rotation...

```javascript
let angle = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  push();
  rectMode(CENTER);
  rotate(angle); // Rotate the following shape by 45 degrees
  fill(255, 0, 0);
  rect(250, 250, 100, 100);
  pop();

  angle = angle + 0.05;
}
```

As the angle increases, the rectangle is rotated around `0,0`, which is the top left of the canvas.

__That's not what we wanted...__

---

## `rotate()` and `translate()`

__This__ is where being able to __move__ the origin is useful! We can move the origin to the centre of our rectangle __then__ rotate it around __that__ point...


```javascript
let angle = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  push();
  rectMode(CENTER);
  translate(250,250); // Translate to the rectangle's drawing position
  rotate(angle); // Rotate the following shape by 45 degrees
  fill(255, 0, 0);
  rect(0, 0, 100, 100); // Draw the rectangle at 0,0 because we translated the origin
  pop();

  angle = angle + 0.05;
}
```

A spinning rectangle! Just how we wanted it to be.

---

## `scale()`

The `scale()` function works roughly according to the same idea. You `translate()` to your desired center of scaling, then apply the scale, then draw your shape. The `scale()` function requires an argument determining how much to scale by (`1` is no scaling, `0.5` is half-size, `2` is double-size, etc.).

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  push();
  rectMode(CENTER);
  translate(250,250); // Translate to the rectangle's drawing position
  scale(2); // Double the size of our rectangle when displayed...
  fill(255, 0, 0);
  rect(0, 0, 100, 100); // Draw the rectangle at 0,0 because we translated the origin
  pop();
}
```

So even though we know we drew the rectangle at a size of `100x100` we can see that it __displays__ at a size of `200x200` because we used `scale()` to double its size!

---

## All together

We could put all this together to have a moving, rotating, scaling rectangle object!

```javascript
let rectangle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
  scale: 1,
  angle: 0
}

function setup() {
  createCanvas(500, 500);
  rectangle.vx = rectangle.speed;
}

function draw() {
  background(0);

  // Move the rectangle according to its velocirty
  rectangle.x = rectangle.x + rectangle.vx;
  rectangle.y = rectangle.y + rectangle.vy;

  // Increase the rectangle's scale and angle
  rectangle.scale = rectangle.scale + 0.01;
  rectangle.angle = rectangle.angle + 0.05;

  // Display the rectangle
  push();
  rectMode(CENTER); // Centered
  translate(rectangle.x, rectangle.y); // Translate to rectangle position
  scale(rectangle.scale); // Apply scale
  rotate(rectangle.angle); // Apply rotation
  rect(0, 0, rectangle.size, rectangle.size); // Draw rectangle at 0,0 because of translate()
  pop();
}
```

---

## Summary

- `push()` and `pop()` are our very special friends
- Transformation instructions open up new frontiers for drawing and animation!

---

## TMI?

### Orbit

We've seen that keeping your different shapes with their transformations and style instructions inside `push()` and `pop()` keeps them isolated, which is very often what we want.

But we can get nice effects if we __don't__ do that too...

```javascript
let angle1 = 0;
let angle2 = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  translate(250, 250);
  rotate(angle1);
  rectMode(CENTER);
  rect(0, 0, 100, 100);

  translate(100, 0);
  rotate(angle2)
  rect(0, 0, 50, 50);

  angle1 = angle1 + 0.01;
  angle2 = angle2 + 0.02;
}
```

Because there's no `push()` and `pop()` here the `translate()` __and__ the `rotate()` from the first rectangle are applied to the second! This has the effect of causing it to rotate __around__ the first rectangle! Nice!

---

## 3D

It's a whole other thing, but we can also draw in 3D in p5! There are three main things to remember with this

1. When you use `createCanvas()` you need to use __`WEBGL`__ as a third argument, e.g. `createCanvas(500,500,WEBGL);`
2. When you use `translate()`, `rotate()`, etc. you need to remember there's an __extra dimension__ (called `z`)
3. When you use `WEBGL` your canvas's __origin__ will be in the __center__ by default instead at the top left corner

So, just for an example (and you can find out more in the reference's [Transform](https://p5js.org/reference/#group-Transform) and [Shape](https://p5js.org/reference/#group-Shape) categories)...

```javascript
// Angles of rotation for our shape
let angleX = 0;
let angleY = 0;

function setup() {
  // Using WEBGL in createCanvas to specify 3D graphics
  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(0);

  // Our shape
  push();
  // Translate to the center (not really needed, but just for completeness)
  translate(0, 0, 0);
  // Rotate AROUND the x axis
  rotateX(angleX);
  // Rotate AROUND the y axis
  rotateY(angleY);
  // Looks nicer
  noStroke();
  // Our central cube is white
  fill(255);
  box(100);
  // A red bar passing through the box
  fill(255, 0, 0);
  box(200, 25, 25);
  // A green bar passing through the box
  fill(0, 255, 0);
  box(25, 200, 25);
  // A blue bar passing through the box
  fill(0, 0, 255);
  box(25, 25, 200);
  // Note how the entire shape rotates because the rotateX() and rotateY() are applied to everything
  // afterwards until the pop() below here
  pop();

  // Increase the angles to rotate over time
  angleX = angleX + 0.01;
  angleY = angleY + 0.05;
}
```

Can you get some cool orbiting things going in 3D?


---

# }
