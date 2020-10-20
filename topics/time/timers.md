# Timers {

---

## In this module...

- Timers are useful
- A circle clicking game
- Timers using a custom variable
- Timers using `frameCount`
- Timers using `setTimeout()`

---

## Timers are useful

Because our programs run **over time**, we often find ourselves wanting to run specific instructions at specific moments. Most obviously, we tend to want instructions to run after a set **delay**.

Examples of this might be a timer that triggers a new state after a delay, or a new element that appears after a delay, for example.

Let's look at three different ways to create timers in p5 (and JavaScript) to achieve those two effects.

---

## A circle clicking game

Let's start out with a (relatively) simple circle clicking game. A bunch of random circles are on the canvas and we click them to remove them. We have a win and lose state, but no way to trigger them yet.

```javascript
"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// The current state
let state = `title`; // title, game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

// title() displays the title
function title() {
  displayText(`title`);
}

// game() displays all the circles in the array
function game() {
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() switches from title to game or checks all circles to see if they were clicked
function mousePressed() {
  if (state === `title`) {
    state = `game`;
  }
  else if (state === `game`) {
    checkCircleClick();
  }
}

// checkCircleClick() checks if any circle was clicked and removes it if so
function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
```

---

## Adding timers?

What if we want to

1. End the game after 10 seconds, with the player winning if they have no circles on the canvas and losing if there are any left
2. Add circles to the game every 2 seconds

We'll need one timer to start at the beginning of the game and wait for 10 seconds and then check the number of circles. We'll need another timer to wait for 2 seconds, then add a circle, then wait again for another 2 seconds, etc. Until the game ends.

Let's do this.

---

## Timer using a custom variable

### Game length

One way to use a timer is to **count the number of frames that have passed** and then trigger instructions when that counter reaches a set number (representing the amount of time to wait).

So for our first timer, we want to start a `gameOverTimer` variable at `0` and then add `1` to it each frame in the `game` state until it reaches `600` (`60` frames per seconds multiplied by `10` seconds). We should also store out game's length in another variable.

When it reaches `600` we should check the number of circles, and if it's `0` we can go to the `win` state, and if it's not we'll go to the `lose` state...

```javascript
"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// NEW! A timer to count the number of frames in the game state
let gameOverTimer = 0;
// NEW! A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The current state
let state = `game`; // game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

// title() displays the title
function title() {
  displayText(`title`);
}

// game() displays all the circles in the array
function game() {
  // NEW! Increase the timer's count by one frame
  gameOverTimer++;
  // NEW! Check if we have reached the end of our timer
  if (gameOverTimer >= gameLength) {
    // The game is over! So we should check the win/lose state
    gameOver();
  }

  // Display all the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// NEW! gameOver() checks whether the player has won or lost
// and sets the state appropriately
function gameOver() {
  // Check if there are 0 circles left...
  if (circles.length === 0) {
    // There are no circles left, so the user won!
    state = `win`;
  }
  else {
    // Otherwise they lost
    state = `lose`;
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() switches from title to game or checks all circles to see if they were clicked
function mousePressed() {
  if (state === `title`) {
    state = `game`;
  }
  else if (state === `game`) {
    checkCircleClick();
  }
}

// checkCircleClick() checks if any circle was clicked and removes it if so
function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
```

### Adding circles

Our other timer is meant to add a new circle every 2 seconds. This will look very similar to our game over timer, but we will need to **reset** our timing counter each time it triggers so it counts back up from `0` again.

```javascript
"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// A timer to count the number of frames in the game state
let gameOverTimer = 0;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds


// NEW! A timer to count the number of frames up to adding a circle
let newCircleTimer = 0;
// NEW! A variable to store how long to wait before adding a circle (in frames)
let newCircleDelay = 60 * 2; // 2 seconds


// The current state
let state = `game`; // game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

// title() displays the title
function title() {
  displayText(`title`);
}

// game() displays all the circles in the array
function game() {
  // Increase the timer's count by one frame
  gameOverTimer++;
  // Check if we have reached the end of our timer
  if (gameOverTimer >= gameLength) {
    // The game is over! So we should check the win/lose state
    gameOver();
  }

  // NEW! Increase the new circle timer by one frame
  newCircleTimer++;
  // NEW! Check if we have reached the end of our timer
  if (newCircleTimer >= newCircleDelay) {
    // We have, so add a circle
    let circle = createCircle();
    circles.push(circle);
    // And reset the timer so it counts back up again
    newCircleTimer = 0;
  }

  // Display all the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// gameOver() checks whether the player has won or lost
// and sets the state appropriately
function gameOver() {
  // Check if there are 0 circles left...
  if (circles.length === 0) {
    // There are no circles left, so the user won!
    state = `win`;
  }
  else {
    // Otherwise they lost
    state = `lose`;
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() switches from title to game or checks all circles to see if they were clicked
function mousePressed() {
  if (state === `title`) {
    state = `game`;
  }
  else if (state === `game`) {
    checkCircleClick();
  }
}

// checkCircleClick() checks if any circle was clicked and removes it if so
function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
```

As you can see, the same idea worked here too. We track the number of frames as they pass, and when they reach our threshold (either the length of the game or the delay before a new circle) we carry out the appropriate action (game over or adding a circle). In the case of a timer that needs to **repeat** we also reset our counter back to `0` so it can count up again.

---

## Timer using `frameCount`

We can do something very similar to the above, but using the `frameCount` variable provided by p5. This tells us how many frames have passed since the **beginning** of the program.

If we **save** the `frameCount` value into another variable, it will tell us when the timer **started**. If we then compare that start time with the `frameCount` variable as it increases, the **difference** will tell us how many frames have passed.

Let's look at this in action with the same example rewritten.

```javascript
"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// NEW!
// A timer to remember the starting time of the game over timer
let gameOverStartTime;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// NEW!
// A timer to count the starting time of the new circle timer
let newCircleStartTime;
// A variable to store how long to wait before adding a circle (in frames)
let newCircleDelay = 60 * 2; // 2 seconds


// The current state
let state = `title`; // title, game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

// title() shows the game title and we click to continue
function title() {
  displayText(`CIRCLE CLICKER`);
}

// game() displays all the circles in the array
function game() {
  // NEW!
  // Check if we have reached the end of our game over timer
  // We subtract the starting time of our timer from the current frameCount
  // to find out the number of frames that have elapsed since the timer was
  // started
  if (frameCount - gameOverStartTime >= gameLength) {
    // The game is over! So we should check the win/lose state
    gameOver();
  }

  // NEW!
  // Check if we have reached the end of our timer
  // We subtract the starting time of our timer from the current frameCount
  // to find out the number of frames that have elapsed since the timer was
  // started
  if (frameCount - newCircleStartTime >= newCircleDelay) {
    // We have, so add a circle
    let circle = createCircle();
    circles.push(circle);
    // And reset the timer so it counts back up again
    newCircleStartTime = frameCount;
  }

  // Display all the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// gameOver() checks whether the player has won or lost
// and sets the state appropriately
function gameOver() {
  // Check if there are 0 circles left...
  if (circles.length === 0) {
    // There are no circles left, so the user won!
    state = `win`;
  }
  else {
    // Otherwise they lost
    state = `lose`;
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() switches from title to game or checks all circles to see if they were clicked
function mousePressed() {
  if (state === `title`) {
    // NEW!
    // Set our two counters to their start time (the frame count when the game started)
    gameOverStartTime = frameCount;
    newCircleStartTime = frameCount;

    state = `game`;
  }
  else if (state === `game`) {
    checkCircleClick();
  }
}

// checkCircleClick() checks if any circle was clicked and removes it if so
function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
```

---

## Timers using `setTimeout()`

There's a different way to think about timers and this one comes from JavaScript rather than p5. Instead of thinking in terms of the number of **frames** that have passed in our game, we can actually directly ask JavaScript to set a timer for us with a function called `setTimeout()`.

There are two novelties with `setTimeout()`

1. We provide the name of a **function** to call to `setTimeout()` as an argument and it will call that function after a specified delay
2. If we want to **cancel** a timer, we need to use `clearTimeout()` and we have to save the timer's ID number, provided when we start it

### A function as an argument

Let's look at a toy example to get this straight. First let's deal with part 1, the basic idea of providing a function to call as an argument. Here's a program that will display a circle after two seconds:

```javascript
// Whether or not to display the circle
let visible = false;

function setup() {
  createCanvas(600, 600);

  // We call setTimeout with TWO arguments
  // 1. The name of the function to call (we do NOT use parentheses after it, just the name)
  // 2. The delay in milliseconds to wait before calling the function
  // So the below ill call the showCircle() function after two seconds
  setTimeout(showCircle, 2000);
}

function draw() {
  background(0);

  if (visible) {
    ellipse(width / 2, height / 2, 100);
  }
}

function showCircle() {
  visible = true;
}
```

### Cancelling a timer

The other thing we may need to do is **cancel** a timer that is already counting down. As discussed, we will use `clearTimeout()` for this, but we will need to remember our timer's ID when we start it.

If we want to cancel the timer on a mouse press for instance, we could write the following:

```javascript
// A variable to store our timer's ID number
let circleTimer;
// Whether or not to display the circle
let visible = false;

function setup() {
  createCanvas(600, 600);

  // We use the same call to setTimeout() but now we also ASSIGN
  // the result to our timer variable. setTimeout() always RETURNS
  // the ID number of the timer created, and we want to save it
  // here so we can cancel it later.
  circleTimer = setTimeout(showCircle, 2000);
}

function draw() {
  background(0);

  if (visible) {
    ellipse(width / 2, height / 2, 100);
  }
}

function showCircle() {
  visible = true;
}

function mousePressed() {
  // If the user pressed the mouse, we cancel the timer by
  // using clearTimeout() and providing the ID number variable
  clearTimeout(circleTimer);
}
```

Now if we click before the circle appears it will no longer be displayed because the timer has been cleared (cancelled).

---

## Using `setTimeout()` in our game

So let's incorporate these ideas into one last version of the circle clicking game for good measure. This time we'll use `setTimeout()` for our timers. We'll also remember to **cancel** the circle adding timer so it doesn't run after the game is over!

```javascript
"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// NEW! A variable to store how long our game is (in milliseconds)
let gameLength = 10 * 1000; // 10 seconds


// NEW! A timer for adding a new circle
let newCircleTimer
// NEW! A variable to store how long to wait before adding a circle (in milliseconds)
let newCircleDelay = 2 * 1000; // 2 seconds

// The current state
let state = `title`; // title, game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

// title() shows the game title and we click to continue
function title() {
  displayText(`CIRCLE CLICKER`);
}

// game() displays all the circles in the array
function game() {
  // Display all the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() checks all circles to see if they were clicked
// and removes the first clicked circle in the array
function mousePressed() {
  if (state === `title`) {
    // NEW!  Start our gameover timer to call the gameOver() function
    // when the game ends
    setTimeout(gameOver, gameLength);
    // NEW! Start our circle adding timer to run after two seconds
    // Remember the ID so we can cancel it when the game ends
    newCircleTimer = setTimeout(addCircle, newCircleDelay);
    state = `game`;
  }
  else if (state === `game`) {
    checkCircleClick();
  }
}

// gameOver() checks whether the player has won or lost
// and sets the state appropriately
function gameOver() {
  // Check if there are 0 circles left...
  if (circles.length === 0) {
    // There are no circles left, so the user won!
    state = `win`;
  }
  else {
    // Otherwise they lost
    state = `lose`;
  }
  // NEW! Cancel the circle adding timer since it shouldn't run
  // when the game is over!
  clearTimeout(newCircleTimer);
}

// NEW! addCircle() called by the new circle timer to add a circle
// also starts the timer again so it will run again
function addCircle() {
  // Ad a circle
  let circle = createCircle();
  circles.push(circle);
  // Start our circle adding timer to run after two seconds
  // Remember the ID so we can cancel it when the game ends
  // Note how this function is effectively CALLING ITSELF
  // after a delay! (Quite a lot like how draw() works)
  newCircleTimer = setTimeout(addCircle, newCircleDelay);
}


function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
```

Again, this code does the same thing as our previous iterations. It's possible it can feel more "elegant" because the actual time aspect is being handled by JavaScript's `setTimeout()` instead of explicitly by us.

It does require us to get used to the idea of a function as an argument (the function `setTimeout()` should call). Importantly, we must remember that we only provide the **name** of the function to `setTimeout()`. (We don't include the parentheses after the function because then it would be called **immediately** instead of after a delay.)

Finally, we use `clearTimeout()` to cancel timers that have been started already.

---

## Summary

We've seen three examples of creating timers in our programs, two using the idea of counting **frames** and checking when they meet a threshold, and one using JavaScript's `setTimeout()` function to handle the timing for us.

You can use any of these approaches that suits you. On the balance, `setTimeout()` is probably the most common out in the wild.

---

## TMI?

### `setInterval()`

There's another timer function in JavaScript called `setInterval()` that is exactly the same as `setTimeout()` except that it calls the function you provide **repeatedly** based on the delay you specify.

We could make a circle blink link this, for example:

```javascript
let visible = true;

function setup() {
  createCanvas(600, 600);

  // Make the circle blink every 500 milliseconds
  setInterval(blink, 500);
}

function draw() {
  background(0);

  if (visible) {
    ellipse(width / 2, height / 2, 100);
  }
}

function blink() {
  // If the visible is true, make it false. If it's false, make it true.
  visible = !visible;
}
```

We could use this idea for our circle adding timer in the main example in this module.

---

# }
