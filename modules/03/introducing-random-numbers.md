# Introducing random numbers {

---

## Numbers are so predictable

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

This is a very good "circle moving to the right" kind of experience, but there's not much suspense. We know what's going to happen. The numbers march along so predictably...

---

## Random numbers are not so predictable

One of the most fun functions in programming is the one that __generates random numbers__. In p5 it's called `random()`. It's an example of a function that "gives something back", it __returns__ a value.

We'll talk about this idea more later, but for now the key is that when we call `random()` we need to imagine it __giving__ us something, which we can then put directly into a variable.


```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  let randomNumber = random();
  console.log(randomNumber);
}
```

As we can see by watching `randomNumber`, used on its own, `random()` "just" gives us a random number between `0` and `1` (non-inclusive). Notice that this happens __each time__ it is called, so we get a different random number every time - it's totally unpredictable.

---

## Beyond `0` to `1`

Numbers between `0` and `1` are actually really powerful, and we'll see that later, but for now we probably want random numbers in different ranges than this.

Consider the idea we might want to set the `fill()` for our ellipse to a random shade of grey. We know that a shade of grey is between `0` and `255`, so we'd need a random number in that range.

Fortunately we can __also__ use `random()` by telling it the __range__ we want our random number in. For a shade of grey, we could use `random(0,255)`, which means "give me a random number between 0 and 255"...

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;
  circle.fill = random(0, 255); // Get a random fill for our circle!
  fill(circle.fill); // Apply our circle's random fill
  ellipse(circle.x, circle.y, circle.size);
}
```

(Note: we added a property to our circle object to handle its fill, this is a nice tidy way to keep things together.)

The circle still moves across the screen, but now it flickers! That's because its fill is being set to a __random__ number between `0` and `255` every frame.

---

## Random movement

We can apply this same idea to any number we want to behave randomly. What if we wanted our circle to __move__ randomly? We could change its speed to be a __random number__ instead of a static one.

```javascript
let backgroundShade = 0;
let circle = {
  x: 250,
  y: 250,
  size: 100,
  speed: 1,
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  circle.speed = random(-5, 5);
  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);
}
```

(Note: we set our random speed to be a number between `-5` and `5`, meaning it may move left or right each frame. Importantly, this shows we can have a range that includes __negative__ numbers!)

---

## Once more

Let's do one more random thing. Let's make the circle's y coordinate jump around by setting it each frame to a random number between `0` and the `height` of our canvas...

```javascript
let backgroundShade = 0;
let circle = {
  x: 250,
  y: 250,
  size: 100,
  speed: 1,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  
  circle.speed = random(-5, 5);
  circle.x = circle.x + circle.speed;
  circle.y = random(0, height);
  ellipse(circle.x, circle.y, circle.size);
}
```

Now the circle moves with a random __speed__ horizontally, but it also jumps to random __positions__ vertically because we set its y position each frame to a random number between `0` and the `height` of the canvas.

This is getting quite satisfying! Try removing the `background()` instruction to see the same program with a slightly different visual appearance!

---

## Summary

- We often want our programs to behave in __surprising__ ways and __random numbers__ are one way to do this
- We can use p5's `random()` function to get a random number in a specific range and then __use__ that random number in our variables
- This leads to some fun visual (and other!) effects as we apply it to different parts of our programs
- When in doubt, get random!

---

# }
