# States {

---

## In this module...

- Program states
- TMI: `switch` statements
- TMI: Behavioral states

---

## A program to be proud of

Imagine a program in which a circle goes from the left side of the screen to the right side of the screen. Something like:

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;
}

function draw() {
  background(0);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
```

Let's also imagine we're super proud of this code-based animation and we want to show it to our friends.

Before we do, we might well want to add a __title__ and an __ending__ to the program, to go along with the __animation__ bit we already have. We don't want the animation to be running while we display the title. We don't want the title to display when we're showing the ending, and so on.

Each of __title__, __animation__, and __ending__ would involve __different parts__ of our program being active, with the other parts sitting idle until they are needed.

How do we do this?

---

## Program states

In programming, we would call __title__, __animation__, and __ending__ the __states__ of our program. The program can be in the __title state__, the __animation state__, or the __ending state__. Each state is exclusive: __only__ the code for that state should be running.

If we just add code for the title and ending to `draw()` all the different states will be active at the same time...

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}
let titleString = "Life: A Metaphor";
let endingString = "Ah, mortality.";


function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;

  // Text settings
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  // Title
  fill(255);
  text(titleString, width / 2, height / 2);

  // Animation
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);

  // Ending
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}
```

This is kind of interesting, but not what we want. We need a way to __know which state should be active__ and to __only run the instructions for that state__.

---

## Working program states

To know which state should be active, we need a __variable__ that will tell us which state to pay attention to in `draw()`. We can call this variable `state`, declaring it at the top of the script, and it makes sense to store a __string__ inside it with the name of the current state. It should start with `title` in it, because that's the first state.

```javascript
let state = `title`;
```

To make our program respect the different states, we can use `if`-statements that __check which state the `state` variable says is active__ and then to __run the instructions for that state__.

```javascript
if (state === `title`) {
  // Title
  fill(255);
  text(titleString, width / 2, height / 2);
}
else if (state === `animation`) {
  // Animation
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
else if (state === `ending`) {
  // Ending
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}
```

This works! Now the program only displays the __title__ state, not the __animation__ or the __ending__. And if we change the value in the `state` variable (by typing either `animation` or `ending` into its assignment), we see the other two states!

But we're missing something. Currently our program cannot __change states__, which is important. We need a way to go from one state to another.

The way we move from one state to another is by __changing the value in `state`__ to the name of the state we want to switch to.

Then we just need to work out __when__ to do that. For now, let's say

- We should change from `title` to `animation` if the user presses any key (but __only__ if they press a key during the `title` state!)
- We should change from the `animation` to `ending` when the circle reaches the right hand side

Let's do this...

---

## Changing states

Here is a full, working version of our state-based program!

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

let titleString = "Life: A Metaphor";
let endingString = "Ah, mortality.";

let state = `title`; // We start in the title state

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;

  // Text settings
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  if (state === `title`) {
    // In the title state we display the title
    fill(255);
    text(titleString, width / 2, height / 2);
  }
  else if (state === `animation`) {
    // In the animation state we animate the circle
    circle.x = circle.x + circle.vx;
    circle.y = circle.y + circle.vy;

    ellipse(circle.x, circle.y, circle.size);

    // NEW!
    // And we change to the ending state if the circle reaches the right side
    if (circle.x > width) {
      state = `ending`;
    }
  }
  else if (state === `ending`) {
    // In the ending state we display the ending
    fill(255, 0, 0);
    text(endingString, width / 2, height / 2)
  }
}

// NEW!
function keyPressed() {
  // If any key is pressed, we check if the current state is the title state
  if (state === `title`) {
    // If it is, we switch to the animation state
    state = `animation`;
  }
}
```

This is pretty powerful stuff! We could have more states by adding to our `if`-statement and using more names for different states. We can change between states in all kinds of ways, from user input to specific events that occur in our program.

---

## With functions

The previous program would be a lot tidier if each state were handled by a separate function. Let's do that.

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

let titleString = "Life: A Metaphor";
let endingString = "Ah, mortality.";

let state = `title`;

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;

  // Text settings
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `ending`) {
    ending();
  }
}

function title() {
  fill(255);
  text(titleString, width / 2, height / 2);
}

function animation() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);

  if (circle.x > width) {
    state = `ending`;
  }
}

function ending() {
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
}
```

---

## Summary

- Thinking of our programs in terms of distinct states is a __very__ powerful way to build up more complicated projects
- We need to __name__ our states
- We need to __track__ our states with a variable (like `state` above)
- We need to __execute__ our states using `if`-statements that check what the current state is
- We need to be able to __change__ between states in some way


---

## TMI?

### `switch` statements

Above we saw a nice way of choosing between states in our `draw()` function using `if`-statements:

```javascript
if (state === `title`) {
  title();
}
else if (state === `animation`) {
  animation();
}
else if (state === `ending`) {
  ending();
}
```

Because this kind of `if`-statement that checks whether a variable is equal to a specific set of options is very common, there's another way to write it, called a `switch` statement. The identical `switch` statement to the above would be:

```javascript
switch (state) {
  case `title`:
    title();
    break;

  case `animation`:
    animation();
    break;

  case `ending`:
    ending();
    break;
}
```

Some people find this a neater way to write out these kinds of conditionals, though it's up to you whether you want to use it or not.

---

### Behavioral states

In the above material we've talked exclusively about the states of our running __program__, but we can also use states in other ways.

Consider a program in which a circle moves randomly by default, but if the mouse gets too close to it, it runs away! We can think of this circle as having two possible __states__ for its behaviour. Either it is in a __safe__ state (moving randomly) or it is in a __fleeing__ state, moving away from the mouse cursor.

We can use exactly the same ideas from above to write this program! It's quite long, but we now have a circle with __two kinds of behavior__ depending on the circumstances, which is neat!

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
  safeDistance: 150, // How many pixels away the mouse must be for the circle to feel safe
  state: `safe` // safe or fleeing
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  checkSafety();
  move();
  display();
}

// The checkSafety function sets the circle's state based on how close
// it is to the mouse
function checkSafety() {
  // Calculate the distance to the mouse
  let d = dist(circle.x, circle.y, mouseX, mouseY);
  if (d < circle.safeDistance) {
    // If it's too close, use the fleeing state
    circle.state = `fleeing`;
  }
  else {
    // If it's still outside a safe distance, use the safe state
    circle.state = `safe`;
  }
}

// The move function moves the circle based on its current state
function move() {
  if (circle.state === `safe`) {
    // If the circle is in the safe state, move by choosing a random
    // direction occasionally...
    let change = random();
    if (change < 0.05) {
      circle.vx = random(-circle.speed, circle.speed);
      circle.vy = random(-circle.speed, circle.speed);
    }
  }
  else if (circle.state === `fleeing`) {
    // If the circle is in the fleeing state, almost moving away
    // from the mouse in the x and y axes
    if (circle.x < mouseX) {
      circle.vx = -circle.speed;
    }
    else {
      circle.vx = circle.speed;
    }

    if (circle.y < mouseY) {
      circle.vy = -circle.speed;
    }
    else {
      circle.vy = circle.speed;
    }
  }

  // Update the circle's position to move it
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
}

function display() {
  ellipse(circle.x, circle.y, circle.size);
}
```
