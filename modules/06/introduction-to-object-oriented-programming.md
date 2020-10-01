# Introduction to object-oriented programming (OOP) {

---

## In this module...

- A fish simulation
- Thinking in objects
- Creating a `class`
- Creating a `new` object from a class
- Creating more than one `new` object

---

## One fish

Let's start off with a small fish simulation. Our fish should start in a random position and have a random color, and it should move around on our canvas, changing direction randomly based on how nervous it is, and it should be constrained to the canvas.

We'll use this as the basis for thinking about object oriented programming.

### A fish object

First we need a variable with a JavaScript object that will keep track of our fish's properties:

```javascript
// Our fish object
let fish = {
  // Position is undefined because we will set it random in setup
  x: undefined,
  y: undefined,
  size: 100,
  // Our fish is a random color, so we'll set it up in  setup
  fill: {
    r: 255,
    g: 255,
    b: 255
  },
  vx: 0,
  vy: 0,
  speed: 5,
  // Nervousness is the chance the fish will change direction in any frame
  nervousness: 0.05
}
```

Quite a bit of information, but nothing we haven't seen before except our `nervousness` property, which is just a nice way to give the fish some personality.

### Setting up our fish (and canvas)

Now we'll need to set up our program by creating a canvas and then giving the fish a random position and color...

```javascript
function setup() {
  createCanvas(500, 500);

  // Position our fish randomly
  fish.x = random(0, width);
  fish.y = random(0, height);

  // Give our fish a random color
  fish.fill.r = random(100, 255); // Starting at 100 so it's not too dark
  fish.fill.g = random(100, 255);
  fish.fill.b = random(100, 255);
}
```

So now we have the idea of creating a single fish and getting all its properties set up the way we want at the start of its little life.

### Moving

Because we're clever people who think in terms of __functions__ these days, let's first write a `move()` function that makes our little fish move around on the canvas. It has three main jobs:

1. Decide whether the fish should change directions based on how "nervous" it is
2. Update the fish's position
3. Constrain the fish's position to the canvas


```javascript
function move() {
  // 1. Decide whether the fish should change directions based on how "nervous" it is

  // Generate a random number and check if it's less than the fish's nervousness
  if (random() < fish.nervousness) {
    // If it is, the fish gets nervous and changes direction randomly!
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // 2. Update the fish's position

  fish.x += fish.vx;
  fish.y += fish.vy;

  // 3. Constrain the fish's position to the canvas

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}
```

### Displaying

Keeping with our nice and modular approach, we will also write a `display()` function that displays our fish on the canvas, using the classic "draw a circle" technique...

```javascript
function display() {
  // Display the fish on the canvas
  noStroke();
  // Use its color (randomly generated earlier)
  fill(fish.fill.r, fish.fill.g, fish.fill.b);
  // And draw a circle at its position
  ellipse(fish.x, fish.y, fish.size);
}
```

### Calling our functions

Finally, for our program to do anything, we need to __call__ our functions in the `draw()` function so that the fish can move and display...

```javascript
function draw() {
  background(0);

  move(); // Move the fish
  display(); // Display the fish
}
```

Hey presto!

---

## `fish` is an object

We already know that our `fish` variable has a JavaScript object in it. That object keeps track of the specific __properties__ of our fish (like its position, velocity, and color).

---

## Summary

...

---

# }
