# Time {

---

## In this module

- Time
- `setup()` and `draw()`
- Events

---

## Time

At this point we've seen all the key elements of __time__ in our p5 programs. Let's build up a program and look at the key parts and how they relate to each other in time...

---

## "JavaScript Time"

The first kind of time that exists in a program is kind of "JavaScript Time". This is the time that applies without using p5 at all, and we see it in our programs when we're declaring our variables for instance. We declare our variable outside all functions at the top of our program, so they're completely separate from p5.

```javascript
let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined // Not loaded yet
};
```

This is a program (even if it doesn't do much). It just declares a variable. Because it's outside all the p5 functions, we can think of it happening __instantly__ as soon as our `script.js` file loads.

(This is why we __can't use p5 variables in our declarations at the top of the script__. p5 isn't actually loaded and working yet.)

---

## `preload()`

The next kind of time that exists is in the `preload()` function we use to load images (and sounds, and other things) at the very beginning of our p5 program. The `preload()` function is called before anything else and the rest of our program only runs once the thing in `preload()` are __finished__.

```javascript
let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined // Not loaded yet
};

function preload() {
  // Load the clown image
  clown.image = loadImage("assets/images/clown.png");
}
```

Here we use the `preload()` function to load our clown image (storing it in our `clown` object's `image` property). `preload()` will stay in control of the program until the image is loaded. Nothing else will happen and you will see "Loading..." during this period if you run the program.

---

## `setup()`

Finally we get to our actual running program. As we know, the `setup()` function is called exactly __once__ when the program starts running. That is, after `preload()` has finished. If we don't have a `preload()` then it will just be called once p5 itself is loaded.

```javascript
let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined // Not loaded yet
};

function preload() {
  // Load the clown image
  clown.image = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(500,500);
}
```

So our `createCanvas()` instruction will be run __after__ the `clown` variable is declared, and __after__ `preload()` has been called and has __finished__ loading the clown image.

(You might be figuring out that this is why we're writing all this code in this order, too. Note that we don't __have to__ - we could write `preload()` after `setup()` above - but it's a helpful way to visualize the order of things.)

---

## `draw()`

As we know, after `setup()` has done its thing exactly __once__, the `draw()` function is then called around 60 times every second (that is, we have a __framerate__ of 60). This continues until our program explicitly stops.

This is really our major representation of __continuous, ongoing time__ in our programs.

```javascript
let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined // Not loaded yet
};

function preload() {
  // Load the clown image
  clown.image = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  // Position the clown at the mouse position
  clown.x = mouseX;
  clown.y = mouseY;

  // Display the clown (we're using the size arguments so we can change size)
  imageMode(CENTER);
  image(clown.image,clown.x,clown.y,clown.size,clown.size);
}
```

At last we can "see" our program working. Each frame, `draw()` is called and positions the clown at the mouse location, then displays the clown image on the canvas at its current location.

Because `draw()` is called over and over again (60 times per second), what we see is the clown image moving around following our mouse position.

---

## Events

The final kind of time we need to remember is the __event__. Once our program is running and `draw()` is being called over and over, we can also react to specific events that occur during that time. For example, we can use the `mousePressed()` function to respond to (handle) the user clicking their mouse...

```javascript
let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined // Not loaded yet
};

function preload() {
  // Load the clown image
  clown.image = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  // Position the clown at the mouse position
  clown.x = mouseX;
  clown.y = mouseY;

  // Display the clown (we're using the size arguments so we can change size)
  imageMode(CENTER);
  image(clown.image,clown.x,clown.y,clown.size,clown.size);
}

function mousePressed() {
  // Increase the clown's size when the user clicks
  clown.size = clown.size + 50;
}
```

The `mousePressed()` function is called __exactly when the mouse is pressed down__.

In relation to `draw()` this really means that when the mouse is pressed the p5 waits for the current `draw()` call (frame) to end and then calls the `mousePressed()` function, running the code inside. Because the program is running so fast, we perceive this as happening instantly when we click.

---

## Summary

- There are multiple components to thinking about time in our programs
- "JavaScript time" runs our code outside functions as soon as our `script.js` loads
- `preload()` is called first by p5 and stops everything until its job is done
- `setup()` is called once, right after `preload()` or after the `script.js` loads if there's no `preload()`
- `draw()` is called every frame (60 times per second)
- Event handler functions like `mousePressed()` are called when the event occurs

---

# }
