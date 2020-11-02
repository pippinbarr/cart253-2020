# `p5.AudioIn` {

---

## In this module...

- The `p5.AudioIn` class
- Seeing the level
- Visualizing the level
- Scaring away a ghost
- The red "recording" circle

---

## The `p5.AudioIn` class

The `p5.AudioIn` class exists for us to get access to the user's microphone. This can be a super interesting way to create interactions in a program because it's still a fairly uncommon approach and because sound input can be very evocative in ways that pressing keys or clicking a mouse aren't necessarily.

Let's take a look at its documentation page...

https://p5js.org/reference/#/p5.AudioIn

### Example

The example here shows us perhaps the most useful idea that we can easily take from the class, which is obtaining the **level** (volume) of the audio coming into the microphone. As you can see from the example, it's surprisingly simple!

### Description

There are a couple of things of note in the description. First we see the emphasis on getting the level of the sound coming from the microphone, which is good. Second, we see that we don't **hear** the microphone input by default because it can create horrible feedback loops if you aren't using headphones. Third, we see that different browsers handle microphone input differently, which is always worth taking note of.

Because the microphone is a bit of a sensitive device privacy-wise, your program can't just access it immediately. Instead, when you try to start access to the microphone, the user will see a message asking them whether they want to allow access. If they do, your program can go ahead listening to the microphone input. If not... sorry.

### Syntax

The base syntax is fairly straightforward: we create a new `p5.AudioIn` object! There's the possibility of error handling, but for now let's not worry about it.

### Fields (Properties)

There are a few fields that give us information about the microphone input, perhaps most importantly the `enabled` property, which tells us whether the user has authorized the use of their microphone. We could use this to allow our program to react dynamically to whether the user has authorized use of the microphone or not. Maybe it could have hurt feelings if they won't let it listen!

### Methods

In the methods section we see various options, but the "big two" are really

- `start()` which we use to request access to the user's microphone
- `getLevel()` which we use to get the current input level into the microphone

The others can be useful for more complex projects, including being able to check which devices the user has that can provide audio input (`getSources()`) and the ability to connect or disconnect the input to various other elements of the p5.sound library (`connect()` and `disconnect()`).

For our own purposes, it will be enough to access the microphone and then use the level (amplitude) data coming into it.

---

## Seeing the level

The first thing we might want to do is just get a sense of what kind of number the "level" of the microphone turns out to be, so we can write a program that will:

1. Create a `p5.AudioIn` object to work with the microphone
2. Use `start()` to request access
3. Use `getLevel()` to check the current input level

We can then display the current input level on the canvas to check out the number...


```javascript
"use strict";

// The microphone
let mic;

function setup() {
  createCanvas(600, 600);

  // Create our AudioIn object
  mic = new p5.AudioIn();
  // Try to connect to the user's microphone
  mic.start();
}

function draw() {
  background(0);

  // Get the current level of sound going into the microphone
  // We're doing this in draw() so we can see it changing
  // over time
  let level = mic.getLevel();

  // Display the current level on the canvas
  push();
  textAlign(LEFT, CENTER);
  textSize(32);
  fill(255);
  text(level, 50, height / 2);
  pop();
}
```

So, looking at this we can see that the level is generally a very **small** number. When things are quiet it's around `0.0001` or so. When you make a fairly loud noise it can get up to around `0.8` or so. So, pretty clearly based on a range of `0`-`1`.

---

## Visualizing the level

We could visualize the level (as in the example in the documentation) by using the level's value as input into a visual element on the canvas. For example, we could map a circle's size to the level...

```javascript
"use strict";

// The microphone
let mic;

function setup() {
  createCanvas(600, 600);

  // Create our AudioIn object
  mic = new p5.AudioIn();
  // Try to connect to the user's microphone
  mic.start();
}

function draw() {
  background(0);

  // Get the current level of sound going into the microphone
  let level = mic.getLevel();

  // Visualize the level as a circle's size
  let size = map(level, 0, 1, 0, width);
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(width / 2, height / 2, size);
  pop();
}
```

Now we have a circle that responds to the volume going into the microphone! Neat. We can do potentially more interesting things though...

---

## Scaredy ghost

What about a ghost (okay, a transparent clown face) that moves around on the canvas, but then runs away if we make a loud noise. That sounds funny. What would we need?

1. A way to track how the clown ghost is feeling (happy or scared)
2. A check for how loud the level is, and if it's loud enough we change the ghost from happy to scared
3. Different movement patterns based on the clown ghost's feelings: random if they're okay and running away if not...

Let's do it!

```javascript
"use strict";

// The microphone
let mic;
// A ghost
let ghost;
// A clown image
let clownImage;

function preload() {
  clownImage = loadImage(`assets/images/clown.png`);
}

function setup() {
  createCanvas(600, 600);

  // Create our AudioIn object
  mic = new p5.AudioIn();
  // Try to connect to the user's microphone
  mic.start();
  // Create our ghost
  ghost = createGhost(clownImage);
}

// Create a ghost in the center of the screen with various
// ghostly properties
function createGhost(ghostImage) {
  let ghost = {
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0,
    happySpeed: 1, // How fast the ghost moves when happy
    scaredSpeed: 25, // How fast the ghost moves when scared
    image: ghostImage, // The image to display
    alpha: 50, // How transparent is the ghost,
    state: `happy`, // How does the ghost feel right now?,
    scaredThreshold: 0.5 // How loud a sound makes the ghost afraid?
  };
  return ghost;
}

function draw() {
  background(0);

  // Get the current level of sound going into the microphone
  let level = mic.getLevel();

  // Check if the ghost gets scared
  if (level > ghost.scaredThreshold) {
    ghost.state = `afraid`;
    // The ghost should run away to the right
    ghost.vx = ghost.scaredSpeed;
  }

  // Check if the ghost is happy at the moment
  if (ghost.state === `happy`) {
    // If the ghost is happy, it moves around randomly
    let r = random(0, 1);
    if (r < 0.1) {
      ghost.vx = random(-ghost.happySpeed, ghost.happySpeed);
      ghost.vy = random(-ghost.happySpeed, ghost.happySpeed);
    }
  }

  // Move the ghost
  ghost.x += ghost.vx;
  ghost.y += ghost.vy;

  // Display the ghost
  push();
  tint(255, ghost.alpha);
  image(ghost.image, ghost.x, ghost.y);
  pop();
}
```

This is of course just one possible way of thinking about audio volume and the microphone. Being loud is fun because it's not something we regularly do in our lives. See also [GNILLEY](https://www.youtube.com/watch?v=QYPwYfbi8jA) for a great example of building this approach into a game. (Note that they're only using volume, not speech recognition or anything like that.)

We could also think about being **quiet**. Maybe you need to keep quiet so you don't scare away all the adorable woodland animals gathering in a clearing that you want to photograph?

Beyond this there's much more sophisticated audio analysis, including frequency analysis and more.

---

## The red circle and other issues

A quick note. You probably noticed that when you're using the microphone a little icon comes up in your browser tab showing a "recording" symbol. That's good, because it reminds you and any other user that the program is listening through the microphone.

However, it can sometimes be the case that if you have **more than one tab** that is trying to listen to the microphone, things can go wrong. So it's best to limit things to just one tab that's using the microphone.

Further, things can just go wrong in other ways. When in doubt, close your program tab and restart your local server.

---

## Summary

- Microphone input is super fun because it's so personal
- We can animate visual elements based on the input volume (level)
- Perhaps most importantly, we can think in terms of **thresholds**, either what is considered "quiet enough" or "loud enough" to trigger some response

---

# }
