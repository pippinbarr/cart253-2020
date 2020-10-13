# Keyboard input {

---

## In this module...

- The keyboard
- Keyboard events
- Other keyboard functions

---

## The keyboard

Other than the mouse, the major input device most users have when they're on a computer is a __keyboard__.

The keyboard is interesting for many reasons, including:
- It provokes the idea of __typing__ (and therefore __writing__)
- It can be seen as being a device with __many distinct buttons__ (and therefore many possible effects)
- It usually has __arrow keys__ (which map well to thinking about movement and space)

Dealing with the keyboard in p5 is very similar to the mouse, so let's jump right in.

---

## `keyPressed()`

The most obvious keyboard related event is when the user presses down a key. We use the `keyPressed()` function to handle this event. The function will be called __at the moment__ the key is pressed down.

Here is a program that sets a random background shade each time a key is pressed...

```javascript
let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);
}

// keyPressed() is called whenever a key is pressed!
function keyPressed() {
  // Set out bg variable to a random number
  bg = random(0, 255);
}
```

---

## Which key was pressed?

Most of the time when we're dealing with the keyboard we're going to want to know __which key__ was pressed!

To find out, there are two variables available:

### [`key`](https://p5js.org/reference/#/p5/key)

`key` contains a __string__ with the key just typed, __if__ the key was a letter or number (other keys are unreliable between different browsers and operating systems). Here is a program that displays the value in the `key` variable on the canvas...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(key, 250, 250);
}
```

We can use `key` to __check__ which key was pressed in `keyPressed()` and thus to only do something when the correct key is pressed.

Here is a program that sets the background to black if we press the `a` key, grey if we pressed the `b` key, and white if we press the `c` key...

```javascript
let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);
}

function keyPressed() {
  // We can check which key was just pressed using if-statements
  // that compare the `key` variable with specific strings...
  if (key === `a`) {
    bg = 0;
  }
  else if (key === `b`) {
    bg = 127;
  }
  else if (key === `c`) {
    bg = 255;
  }
}
```

---

### [`keyCode`](https://p5js.org/reference/#/p5/keyCode)

The `keyCode` variable contains a __number__ that represents the most recently pressed key. This number is the [ASCII](https://en.wikipedia.org/wiki/ASCII) code for the key. So `32` means the space bar, `49` is the `1` key, `65` is the `a` key, `8` is the backspace key, etc.

An easy way to find out which key code is for which character is to use https://keycode.info. It will also show you the `key` as well.

`keyCode` is a good way to check special keys like the arrow keys, shift keys, and so on.

Even better, p5 has special variables built in for the key codes of specific "special keys" (see the `keyCode` reference page), like `LEFT_ARROW` and `RIGHT_ARROW`.

Here is a program that makes the background brighter if we press the up arrow, and darker if we press the down arrow...

```javascript
let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);
}

function keyPressed() {
  // Again, we check keyCodes in an if-statement that compares the value in
  // keyCode either with a number (the ASCII code) or with one of p5's
  // special variables that stores the ASCII code for us (like UP_ARROW)
  if (keyCode === UP_ARROW) {
    bg = bg + 10;
    bg = constrain(bg, 0, 255);
  }
  else if (keyCode === DOWN_ARROW) {
    bg = bg - 10;
    bg = constrain(bg, 0, 255);
  }
}
```

---

## Other event handlers

There are a two other keyboard event functions to read about in the reference:

- `keyReleased()` is called when the user releases a key
- `keyTyped()` is called when the user presses a key (but it ignores special keys like `SHIFT` and `CONTROL` and `BACKSPACE`).

`keyTyped()` is especially useful if you want to deal with __typing__ because it will only put keys you can display (lower and uppercase letters as well as numbers and punctuation) into the `key` variable.  (See: TMI later)

---

## `keyIsDown()`

The last keyboard function is not an event handler, but it instead a function we __call__ to check whether a specific key is down. It takes one argument, the __key code__ we want to check, and returns `true` if the key is down, and `false` if it isn't.

We can use this in `draw()` for example, to know whether a specific key is being held down.

Here is a program that draws a square if we hold down `a` and a `circle` if we hold down `b`...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // Check if the a key (code 65) is currently pressed
  if (keyIsDown(65)) {
    // If it is, display a square
    rectMode(CENTER);
    rect(width / 2, height / 2, 100, 100);
  }
  // Otherwise check if the b key (code 66) is currently pressed
  else if (keyIsDown(66)) {
    // If it is, display a circle
    ellipse(width / 2, height / 2, 100, 100);
  }
}
```

---

## Keyboard movement

`keyIsDown()` is a nice way to control the movement of something with the keyboard! We can check if an arrow key is down, and move a shape (or image, or anything) in that direction while it is...

```javascript
let circle = {
  x: 250,
  y: 250,
  vx: 0,
  vy: 0,
  speed: 5,
  size: 100
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // First check for horizontal movement
  // Is the left arrow pressed?
  if (keyIsDown(LEFT_ARROW)) {
    // If it is, set the x velocity to be negative
    circle.vx = -circle.speed;
  }
  // Otherwise is the right arrow pressed?
  else if (keyIsDown(RIGHT_ARROW)) {
    // If it is, set the x velocity to be positive
    circle.vx = circle.speed;
  }
  // If neither of those keys are pressed...
  else {
    // Then set the x velocity to 0 to stop moving horizontally
    circle.vx = 0;
  }

  // Do the same thing with vertical movement and the UP and DOWN keys
  if (keyIsDown(UP_ARROW)) {
    circle.vy = -circle.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    circle.vy = circle.speed;
  }
  else {
    circle.vy = 0;
  }

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

---

## Summary

- The keyboard is an exciting input device!
- So many buttons!
- So many meaningful buttons!
- So many letters and numbers!
- We can use event functions like `keyPressed()` to react the moment a key is pressed
- We can use `keyIsDown()` to respond continuously to pressed keys

---

## TMI?

### Typing

We mentioned `keyTyped()` earlier on as a way to include typing letters, numbers, and punctuation in our programs.

To do that we would want a variable that stores the text typed so far (starting with nothing), and then to add each key as it is typed, displaying the cumulative string in the variable.

```javascript
let typing = ``; // Empty string to begin with

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // Display our cumulative typing variable on the canvas...
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(typing, width / 2, height / 2);
}

function keyTyped() {
  // Whenever a "typeable" key is pressed, add the most recent key to our typing string
  // (Using + with two strings like this is called concatenation, adding them together)
  typing = typing + key;
}
```

We'd need to get a bit more fancy if we want things like backspace and returns to work. Importantly, we'd have to also use `keyPressed()` and check for their key codes to change our string appropriately.

---

# }
