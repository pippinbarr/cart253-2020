# Mouse input {

---

## In this module

- Mouse variables
- Mouse functions

---

## Mouse variables

We already know useful mouse variables that come with p5. They are

- `mouseX` and `mouseY`, which tell us where the mouse is
- `mouseIsPressed`, which tells us whether a mouse button is down

---

## Mouse functions

So far we've only looked at things that are __continuous__, like the position of the mouse, which is updated every frame of our program.

But there are also things about the mouse that happen in a __single moment__, like the moment a button is pressed down or released.

These kinds of moments in a program are called __events__. And we have special functions that deal with them which we call __event handlers__ (because they handle those events!).

By way of example, let's look at the event handler function for pressing down the mouse button.

---

## `mousePressed()`

The `mousePressed()` function is like `setup()` and `draw()` in that it is __called automatically__ by p5 at the right moment, which is the instant when the mouse button is pressed down!

When we add it to our program, we will write it __after__ `draw()`, and the code we put inside it will be run at the moment the user clicks the mouse button...

```javascript
// A circle object
let circle = {
  x: 250,
  y: 250,
  size: 50,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);
  // Draw the circle
  fill(circle.fill);
  ellipse(circle.x,circle.y,circle.size);
}

function mousePressed() {
  // When the mouse button is pressed, move the circle to the mouse position
  circle.x = mouseX;
  circle.y = mouseY;
}
```

So here we can click to position our circle object on the canvas.

The `mousePressed()` function is __automatically called__ whenever the user presses the mouse button down, and we can run any code we want when that happens!

---

## Build a better light switch

```javascript
// A variable to track whether or not the light is on...
let lightIsOn = false;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255);

  // Draw a red ellipse you can only see when the light is on!
  fill(255,0,0);
  ellipse(250,250,100,100);

  // If the light is off, draw a black rectangle on top of everything
  // to hide it (make it "dark")
  // Notice how we check if the light is NOT on by using ! in front of the variable
  if (!lightIsOn) {
    fill(0);
    rect(0,0,width,height);
  }
}

function mousePressed() {
  // When the mouse button is pressed, flip the variable
  lightIsOn = !lightIsOn;
  // Notice how we can flip the true/false value by using the NOT operator !
  // If lightIsOn is true, then ! will make it false
  // If lightIsOn is false, then ! will make it true
}
```

---

## More event handlers!

There are many more event handlers for the mouse, all of which work according to the same idea. We add them to our code (again, usually __below__ `draw()`) and they will be called __when the event in question occurs__. We have:

- `mousePressed()` (called when the mouse button is pressed down)
- `mouseReleased()` (called when the mouse button is released)
- `mouseClicked()` (called when the mouse button is clicked down and released)
- `doubleClicked()` (called when the mouse button is clicked twice quickly)
- `mouseMoved()` (called every frame that the mouse moves, which can be a lot!)
- `mouseDragged()` (like `mouseMoved()` but only called if the mouse button is down too)
- `mouseWheel()` (called when the mouse wheel is turns, or with two finger scrolling on a touchpad)

All of these event handlers are documented in the [Events](https://p5js.org/reference/#group-Events) category of the p5 Reference.

---

## Summary

- Mouse variables tell us current information about the mouse (its position, whether its button is down, etc.)
- Mouse event handler functions are called when a specific mouse event occurs (the button is pressed, the mouse is moved, etc.)
- With this information we have huge access to the user's mouse and can make our program respond to it!

---

## TMI?

### `pmouseX` and `pmouseY`

These variables contain the __previous__ position of the mouse (i.e. in the previous frame). This can be useful for things like drawing...

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  // No background() so we can see it building up

  // Draw a line from the previous to the current mouse position
  // if the mouse is pressed
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
```

We can also use this for other ideas, like calculating how __fast__ the mouse is moving for example (the bigger the difference between the previous and current position, the faster it moved).

### A draggable, scalable circle

Let's use some other event handlers. Here is a circle that can be dragged and changes size when we scroll. Notice how all the "action" is taking place in the event handlers!

```javascript
// Our circle object
let circle = {
  x: 250,
  y: 250,
  size: 50,
  // Because it changes size, let's set a minimum and maximum size
  minSize: 50,
  maxSize: 400,
  fill: 0,
  // We need to keep track of whether the circle is being dragged or not
  // so we know whether to move it with the mouse position
  dragging: false
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);
}

// mousePressed() is called at the moment the user presses down a mouse button
function mousePressed() {
  // Calculate the distance between the mouse position and the circle position
  let d = dist(mouseX, mouseY, circle.x, circle.y);
  // If the distance is less that the circle's radius, we know the mouse was
  // inside the circle when pressed
  if (d < circle.size / 2) {
    // So we can now drag the circle
    circle.dragging = true;
  }
}

// mouseReleased() is called at the moment the user releases a mouse button
function mouseReleased() {
  // If the mouse is released, we should stop dragging the circle
  circle.dragging = false;
}

// mouseDragged() is called every frame that the user is moving the mouse
// with a button held down
function mouseDragged() {
  // When the mouse is dragged (with the mouse button down), we check if the circle
  // is being dragged
  if (circle.dragging) {
    // If it is, we move it to the mouse position
    circle.x = mouseX;
    circle.y = mouseY;
  }
}

// mouseWheel() is called every frame that the user is scrolling with the scroll wheel on
// a mouse or using their touchpad
function mouseWheel(event) {
  // When the mouse wheel (or touchpad) is scrolled
  // event.delta contains the distance (in pixels) it scrolled
  // So we can add this to the size of the circle
  circle.size += event.delta;
  // And constrain the size to stay within the minimum and maximum
  circle.size = constrain(circle.size, circle.minSize, circle.maxSize);
}
```

---

# }
