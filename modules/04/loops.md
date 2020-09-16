# Loops {

---

## In this module

- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- Repetition
- You get the idea

---

## Repetition

So let's say you want to draw a caterpillar. A caterpillar could be just a series of overlapping circles to represent the different body segments. We might do something like this:

```javascript
let caterpillar = {
  x: 100,
  y: 250,
  segmentSize: 50,
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100, 200, 100); // A nice green

  ellipse(caterpillar.x, caterpillar.y, caterpillar.segmentSize);
  ellipse(caterpillar.x + 40, caterpillar.y, caterpillar.segmentSize);
  ellipse(caterpillar.x + 80, caterpillar.y, caterpillar.segmentSize);
  ellipse(caterpillar.x + 120, caterpillar.y, caterpillar.segmentSize);
}
```

It works. We have four segments of a caterpillar. If we wanted five, we'd add another ellipse. If we wanted 500, we'd add another 496. Which would __not__ be fun.

---

## Repetition is so repetitive!

We can already see from the previous program how similar each ellipse is (only the x position changes), but what if we took it further and wrote it like this:

```javascript
let caterpillar = {
  x: 100,
  y: 250,
  segmentSize: 50
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100, 200, 100); // A nice green

  // Our variable x tracks where to draw the next caterpillar piece
  let x = caterpillar.x;
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  ellipse(x, caterpillar.y, caterpillar.segmentSize);
}
```

Now __that__ is repetitive! The lines of code that draw an ellipse and then increase `x` are __exactly the same__, over and over again!

We could just keep pasting those two lines in to get more segments as needed, but something is wrong here...

---

## Repetition is for computers

As programmers, we should always be suspicious when we see code that is __identical__ being repeated. (We should also get suspicious even when we see code that is __very similar__ being repeated, but we can talk about that another time.)

Doing incredibly repetitive tasks is the kind of thing that __computers__ are good at.

Given that we are literally __programming a computer__, there must be a way to take care of this repetition that doesn't involve all this work for us, right?

Right.

The things we use to control repetition in programming are called __loops__, and there are two basic kinds. There are `while` loops, and there are `for` loops. Let's meet them.

---

## `while` loops are like `if`-statements

A `while` loop is a lot like an `if`-statement, except it __keeps doing the action__ until the condition is false.

```javascript
// The imaginary action() function will be executed ONCE if the condition is true
if (condition) {
  action();
}

// The imaginary action() will be executed UNTIL the condition is false
while (condition) {
  action();
}
```

---

## Breaking down `while` loops

We need __three things__ to write a good while loop:

We need to know the __starting context__, the state of our program just before the `while` loop.

> For our caterpillar this would be that we know we have drawn __zero__ segments of our caterpillar, we know how many segments it __should__ have, and we know the starting x position of the caterpillar.

We need to know the __condition__, the `true` or `false` condition that needs to be met to execute the code in the loop (just like the condition for an `if`-statement).

> For our caterpillar this would be that we have drawn __less than__ the desired number of segments of our caterpillar.

We need to know the __action(s)__ to take in the loop. This is the code we should execute if our condition is true. Importantly these actions should __eventually cause the loop to stop__! (We don't want the loop going on forever!)

> For our caterpillar this would the action of __drawing__ a segment, __increasing__ the x position for the next one, and __increasing__ our record of the number of segments drawn.

---

## Drawing a caterpillar with a `while` loop

With all this in mind, we can change our caterpillar program. We need to

- Include some new information (the number of segments in the caterpillar, the number drawn, and the current x position to draw at)
- Write the while loop's condition (it should check if we have drawn enough segments)
- Write the while loop's action (it should draw a segment, and then increase the next x position and the segments drawn)

```javascript
let caterpillar = {
  x: 100,
  y: 250,
  totalSegments: 10,
  segmentSize: 50,
  segmentSpacing: 40,
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100, 200, 100); // A nice green

  // Tracks where to draw the next caterpillar piece
  // Starts at the caterpillar's x position
  let x = caterpillar.x;
  // Tracks how many segments have been drawn so far
  // Starts at 0 (none!)
  let segmentsDrawn = 0;

  // Our while loop checks if the number of segments drawn is still less than the
  // total segments of the caterpillar. It will stop when the segments drawn is
  // equal to the total segments.
  while (segmentsDrawn < caterpillar.totalSegments) {
    // We draw the ellipse at the current position
    ellipse(x, caterpillar.y, caterpillar.segmentSize);
    // We increase the x position for the next segment
    x = x + caterpillar.segmentSpacing;
    // We add one to the segments drawn (because we just drew one)
    segmentsDrawn = segmentsDrawn + 1;
  }
}
```

Quite a lot to take in here, but the most important thing to understand is that our `while` loop is essentially just __counting__ from `0` (which is what `segmentsDrawn` starts at) up to `10` (which is what `caterpillar.totalSegments` contains).

Each time through the loop we increase `segmentsDrawn` by `1` and it eventually hits `10` and the `while` loop stops and the program moves on.

### Adding one

```javascript
segmentsDrawn = segmentsDrawn + 1; // Add one to segmentsDrawn
```

Because adding one is __so popular__ in programming, people often abbreviate it. We've already seen one way to do that...

```javascript
segmentsDrawn += 1; // Add one to segmentsDrawn
```

And there actually an __even more efficient__ way to write it...

```javascript
segmentsDrawn++; // Add one to segmentsDrawn
```

You'll see the abbreviated versions quite often, so it's worth getting used to them.

(Note that there is also `--`, which __subtracts one__ from a variable.)

---

## `for` loops

Using loops to do something a specific number of times (like drawing a specific number of segments) is __so popular__ that programming language have a specific kind of loop that compresses all the details down.

It's called a `for` loop. The way it's written is really just a super compressed version of what you can do with a `while` loop.

So our `while` loop was

```javascript
let x = caterpillar.x;
let segmentsDrawn = 0;
while (segmentsDrawn < caterpillar.totalSegments) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
  segmentsDrawn = segmentsDrawn + 1;
}
```

For `for` loop equivalent of this is

```javascript
let x = caterpillar.x;
for (let segmentsDrawn = 0; segmentsDrawn < caterpillar.totalSegments; segmentsDrawn++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}
```

Neither style of writing this loop is "better" than the other, but `for` loops are __very, very, very, very common__ in all programming, so it's important to adjust to them.

---

## Breaking down the `for` loop

```javascript
let x = caterpillar.x;
for (let segmentsDrawn = 0; segmentsDrawn < caterpillar.totalSegments; segmentsDrawn++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}
```

The `for` loop is compressing the three key pieces of information we need for a loop into its parentheses!

1. `let segmentsDrawn = 0` is the __starting condition__ for our loop (no segments are drawn)
2. `segmentsDrawn < caterpillar.totalSegments` is the __condition__ we check in our loop (the loop keeps running while it is `true`)
3. `segmentsDrawn++` is the action that makes sure the loop will finish (it increases `segmentsDrawn` by one until it reaches the number in `caterpillar.totalSegments`)

---

## More compression

In fact, a very big proportion of the time, you'll see `for` loops use `i` as the name for the variable that counts each time through the loop

```javascript
let x = caterpillar.x;
for (let i = 0; i < caterpillar.totalSegments; i++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}
```

Here `i` stands for "iterator", it's the place we store the number of times we've been through the loop. It starts at `0` and counts up to `caterpillar.totalSegments`.

---

## Summary

- Repetition is for computers
- `while` loops let us repeat code
- `for` loops let us repeat code too

---

## TMI?

### "Sphere"

We can achieve gradient-like effects with loops, because a gradient is basically just a sequence of colors/shades changing gradually and predictably.

```javascript
// The basic properties of our "sphere" (a circular gradient)
let sphere = {
  x: 250,
  y: 250,
  size: 300
}

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(0);
  // Our loop continues while the next circle to drawn is larger than 0
  for (let size = sphere.size; size > 0; size--) {
    // Calculate our fill by mapping the current circle's size based on the overall size
    let currentFill = map(size, 0, sphere.size, 255, 0);
    // Apply the fill
    fill(currentFill);
    // Draw the ellipse
    ellipse(sphere.x, sphere.y, size);
  }
}
```

### "Star field"

We can use loops to do all kinds of things. Consider the situation of wanting to draw a star-filled sky. We want to draw each star in a random position, and we want to draw a lot of them...

```javascript
// We need to know how many stars we want to draw in the sky
let numStars = 100;

function setup() {
  createCanvas(500, 500);
  // White stroke because we're using point() on black
  stroke(255);
}

function draw() {
  // Black sky
  background(0);
  // randomSeed() lets us make random() predictable: it will generate the same sequence of numbers
  randomSeed(0);
  // Our for loop counts from 0 to numStars
  for (let i = 0; i < numStars; i++) {
    // Choose a random x and y position on the canvas
    let x = random(0, width);
    let y = random(0, height);
    // Draw a point (star) there
    point(x, y);
  }
}
```

---

### Even more caterpillar compression

Going back to our caterpillar `for`-loop, we can actually use our counting variable (`i`) to make a slightly more compressed version of our loop, because we can use it to calculate the spacing of our segments directly

```javascript
for (let i = 0; i < caterpillar.totalSegments; i++) {
  ellipse(caterpillar.x + i * caterpillar.segmentSpacing, caterpillar.y, caterpillar.segmentSize);
}
```

Here we draw each segment at an x position of `caterpillar.x + i * caterpillar.segmentSpacing`. That is the __starting__ x position (`caterpillar.x`) plus the number of the current segment being drawn (`i`) multiplied by the spacing of the segments (`caterpillar.segmentSpacing`).

When `i` is `0` for the first segment, we don't add any spacing. When `i` is `1` for the second segment, we add one spacing unit. When `i` is `2` for the third segment, we add two space units, and so on.

Whether you __want__ to go to this kind of level of efficiency is up to you. Again, you'll see it in the wild, so it's worth understanding.

---

# }
