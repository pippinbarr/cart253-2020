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

It works. We have four segments of a caterpillar. If we wanted five, we'd add another ellipse. If we wanted 500, we'd add another 496. But that would __not be fun__ to do.

---

## Repetition is so repetitive!

We can already see from the previous program how similar each ellipse is (only the x position changes!). Let's take it a bit further and write the program a little differently to emphasize that:

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

  // Draw the first ellipse
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  // Draw the second ellipse
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  // Draw the third ellipse
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + 40;

  // Draw the final ellipse
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
}
```

Now __that__ is repetitive! The lines of code that draw an ellipse and then increase `x` are __exactly the same__, over and over again!

We could just keep pasting those two lines in to get more segments as needed, but __something is wrong__ here...

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

// The imaginary action() will be executed FOR AS LONG AS the condition is true, over and over
while (condition) {
  action();
}
```

---

## Breaking down loops

We need __three things__ to write a good loop:

First, we need to know the __starting context__, the state of things just before the `while` loop starts.

> For our caterpillar this would be
> 1. we have drawn __zero__ segments of our caterpillar
> 2. we know how many segments it __should__ have
> 3. we know the starting x position of the caterpillar.

Second, we need to know the __condition__, the `true` or `false` condition that needs to be met to execute the code in the loop (just like the condition for an `if`-statement).

> For our caterpillar this would be that "we have drawn __less than__ the desired number of segments of our caterpillar". For as long as that is TRUE, we should keep drawing segments.

Third, we need to know the __action(s)__ to take in the loop. This is the code we should execute if our condition is true. Importantly these actions should __eventually cause the loop to stop__! That is, they should eventually __make the condition become false__. (We don't want the loop going on forever!)

> For our caterpillar this would be:
> 1. __drawing__ a segment,
> 2. __increasing__ the x position to be ready to draw the next one
> 3. __increasing__ our record of the number of segments drawn so far by one

---

## Drawing a caterpillar with a `while` loop

With all this in mind, we can change our caterpillar program. We need to

1. Include some new information
  - the number of segments in the caterpillar,
  - the number drawn,
  - the current x position to draw a segment at
2. Write the while loop's condition
  - it should check if we have drawn enough segments
3. Write the while loop's action. It should
  - draw a segment
  - increase the next x position
  - update the segments drawn

Let's do it...

```javascript
let caterpillar = {
  x: 100,
  y: 250,
  totalSegments: 10, // NEW: Need to know how many segments it has!
  segmentSize: 50,
  segmentSpacing: 40, // NEW: better to have this as a property of the caterpillar
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100, 200, 100); // A nice green

  // Note that the following two variables are DECLARED here in the draw() function.
  // That's because they are TEMPORARY. We only need them right now for the while
  // loop, so they don't need to be declared at the top.

  // NEW!
  // Tracks where to draw the next caterpillar piece
  // Starts at the caterpillar's x position
  let x = caterpillar.x;

  // NEW!
  // Tracks how many segments have been drawn so far
  // Starts at 0 (none!)
  let segmentsDrawn = 0;

  // NEW!
  // Our while loop checks if the number of segments drawn is still less than the
  // total segments of the caterpillar. It will stop when the segments drawn is
  // equal to the total segments.
  while (segmentsDrawn < caterpillar.totalSegments) {
    // We draw the ellipse at the current position
    ellipse(x, caterpillar.y, caterpillar.segmentSize);
    // We increase the x position for the next segment
    x = x + caterpillar.segmentSpacing;
    // We add one to the segments drawn (because we just drew one)
    // This is the thing that will eventually make our condition false, because
    // segmentsDrawn gets bigger by one each time through the loop until it
    // reaches the same number as the totalSegments property
    segmentsDrawn = segmentsDrawn + 1;
  }
}
```

Quite a lot to take in here, but the most important thing to understand is that our `while` loop is essentially __counting__.

It counts from `0` (which is what `segmentsDrawn` starts at) up to `10` (which is what `caterpillar.totalSegments` contains).

Each time through the loop we increase `segmentsDrawn` by `1` and it eventually hits `10` and the `while` loop stops and the program moves on.

## Adding one

We increased `segmentsDrawn` by one each time through our loop.

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

## Instant!

A really important thing to realize about loops is they do their work essentially __instantly__. Consider this loop that draws circles all the way across the canvas...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  // Start at position 0
  let x = 0;
  // While our position is less than the width
  while (x <= width) {
    // Draw an ellipse
    ellipse(x, height / 2, 50, 50);
    // Increase the position
    x = x + 50;
  }
}
```

Note that __all the circles__ are drawn __every frame__. That is, the `while` loop executes __within__ the frame, drawing all the circles to the canvas.

Importantly, then, you __do not__ see the circles appear one by one. They appear all at once.

So, we need to think of a loop as taking place kind of instantly (even though it's actually just happening __really, really, really fast__ within a single frame).

---

## `for` loops

Using loops to do something a specific number of times (like drawing a specific number of caterpillar segments) is __so popular__ that programming languages have a specific kind of loop that compresses all the details down.

It's called a `for` loop. The way it's written is really just a super compressed version of what we've been doing with a `while` loop.

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

Neither style of writing this loop is "better" than the other, but `for` loops are __very, very, very, very common__ in all programming, so it's important to love them.

---

## Breaking down the `for` loop

```javascript
for (let segmentsDrawn = 0; segmentsDrawn < caterpillar.totalSegments; segmentsDrawn++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}
```

The `for` loop is compressing the three key pieces of information we need for a loop into its parentheses!

1. `let segmentsDrawn = 0` is the __starting context__ for our loop (no segments are drawn)
2. `segmentsDrawn < caterpillar.totalSegments` is the __condition__ we check in our loop (the loop keeps running while it is `true`)
3. `segmentsDrawn++` is the action that makes sure the loop will finish (it increases `segmentsDrawn` by one, so that it eventually reaches the number in `caterpillar.totalSegments` and the loop stops)

A couple of notes:
- Notice how the different parts of our loop information in the parentheses are separated by __semicolons__ (`;`), __not__ commas
- In keeping with the way our loops have worked, the `segmentsDrawn++` part happens __after__ the instructions in the curly brackets are executed

---

## More compression

A large proportion of the time, you'll see `for` loops use `i` as the name for the variable that counts each time through the loop:

```javascript
for (let i = 0; i < caterpillar.totalSegments; i++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}
```

Here `i` stands for "iterator", it's the place we store the number of times we've been through the loop. It starts at `0` and counts up to `caterpillar.totalSegments`.

---

## A long, long caterpillar

Part of the point of all this is we can draw __as many segments as we want__ because the computer just takes care of it. So just for fun, here is a `100` segment caterpillar (with smaller segments to fit on the screen):

```javascript
let caterpillar = {
  x: 0,
  y: 250,
  totalSegments: 100, // ONE HUNDRED SEGMENTS!!!
  segmentSize: 6,
  segmentSpacing: 5
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100, 200, 100); // A nice green

  let x = caterpillar.x;
  for (let i = 0; i < caterpillar.totalSegments; i++) {
    ellipse(x, caterpillar.y, caterpillar.segmentSize);
    x = x + caterpillar.segmentSpacing;
  }
}
```

So we can draw 100 segments by literally changing one number. All the loop code remains the same!

Imagine writing that without a loop! Yuck!

---

## Beyond counting

Using loops for __repetition a set number of times__ (essentially __counting__) like we've been seeing is __by far__ the common use, and indeed that's essentially all that `for` loops do.

It's now worth looking at `while` loops again, because they're actually more flexible than just this. In particular, there are __other__ situations where we want to repeat some action __until__ some desired situation is reached.

And that's what a `while` loop can give us!

---

## A starting point...

Consider a program that positions a white circle in a random location. This is easy enough to put together.

```javascript
// Our randomly placed circle
let circle = {
  x: undefined, // We don't know x yet because we set it randomly
  y: undefined, // We don't know y yet because we set it randomly
  size: 100
};

function setup() {
  createCanvas(500, 500);

  // Give our white circle a random position (once at the start of the program)
  circle.x = random(0, width);
  circle.y = random(0, height);
}

function draw() {
  background(0);

  // Draw the white circle
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
}
```

---

## The danger zone!

Now, what if we want to specify a zone of the canvas that we __don't__ want our white circle to appear in. A __danger zone__!!

```javascript
// Our white circle
let circle = {
  x: undefined, // We don't know x yet because we set it randomly
  y: undefined, // We don't know y yet because we set it randomly
  size: 100
};

// The danger zone we'd like to avoid
let dangerZone = {
  x: 250,
  y: 250,
  size: 150
}

function setup() {
  createCanvas(500, 500);

  // Give our white circle a random position (once at the start of the program)
  circle.x = random(0, width);
  circle.y = random(0, height);
}

function draw() {
  background(0);

  // Draw the danger zone!
  noFill();
  stroke(255, 0, 0);
  ellipse(dangerZone.x, dangerZone.y, dangerZone.size);

  // Draw the white ellipse
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
}
```

Currently, because the circle is positioned randomly, we __can't__ guarantee it won't end up in the danger zone. Sometimes the circle will be outside it, sometimes it won't, it just depends on the `random()` numbers that happen to be generated in `setup()`...

---

## `if` cannot save us

We could try to do it with an `if` statement in `setup()` that checks if our circle is in the danger zone and then reposition it...

```javascript
// Our white circle
let circle = {
  x: undefined, // We don't know x yet because we set it randomly
  y: undefined, // We don't know y yet because we set it randomly
  size: 100
};

// The danger zone we'd like to avoid
let dangerZone = {
  x: 250,
  y: 250,
  size: 150
}

function setup() {
  createCanvas(500, 500);

  // Give our white circle a random position (once at the start of the program)
  circle.x = random(0, width);
  circle.y = random(0, height);

  // Calculate the distance from our circle to the danger zone...
  let d = dist(circle.x,circle.y,dangerZone.x,dangerZone.y);
  // Check if our white circle overlaps the danger zone...
  if (d < circle.size/2 + dangerZone.size/2) {
    // If it does, try a different random position!
    circle.x = random(0, width);
    circle.y = random(0, height);
  }
}

function draw() {
  background(0);

  // Draw the danger zone!
  noFill();
  stroke(255, 0, 0);
  ellipse(dangerZone.x, dangerZone.y, dangerZone.size);

  // Draw the white ellipse
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
}
```

This is better, but it still doesn't __guarantee__ our circle stays out of the danger zone because the `if`-state only checks __once__. If the first time the circle is positioned it ends up in the danger zone, then our `if`-state will trigger, which is good...

... but what if the __repositioning__ also ends up in the danger zone? We have no way to react to that.

This is where we need a __loop__ - we want to __keep repositioning the circle until it's out of the danger zone__.

---

## `while` to the rescue

The `while` loop is what can solve this problem. Let's think about the three components of loops for a moment here.

1. Our __starting context__ is that we have just positioned our white circle at a random location, and that we want it to end up outside the danger zone.
2. Our __condition__ is that we need to check whether or not the circle in its current position is __in__ the danger zone (because if it is we need to move it!)
3. Our __action__ in the loop is to __move__ the circle to a new random position

Our loop will thus continually reposition our circle __until it isn't in the danger zone__. Perfect!

It'll look like this...

```javascript
// Our white circle
let circle = {
  x: undefined, // We don't know x yet because we set it randomly
  y: undefined, // We don't know y yet because we set it randomly
  size: 100
};

// The danger zone we'd like to avoid
let dangerZone = {
  x: 250,
  y: 250,
  size: 150
}

function setup() {
  createCanvas(500, 500);

  // Give our white circle a random position (once at the start of the program)
  circle.x = random(0, width);
  circle.y = random(0, height);

  // Calculate the distance from our circle to the danger zone...
  let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
  // Check if our white circle overlaps the danger zone...
  while (d < circle.size / 2 + dangerZone.size / 2) {
    // If it does, try a different random position!
    circle.x = random(0, width);
    circle.y = random(0, height);
    // Recalculate the distance for the next time through the loop
    d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
  }
}

function draw() {
  background(0);

  // Draw the danger zone!
  noFill();
  stroke(255, 0, 0);
  ellipse(dangerZone.x, dangerZone.y, dangerZone.size);

  // Draw the white ellipse
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
}
```

This is a more sophisticated use of a loop that straight-forward counting, and it's correspondingly less common in day-to-day programming. Still, it's worth knowing this general kind of approach and use of loops as well!

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

Consider the situation of wanting to draw a star-filled sky. We want to draw each star in a random position, and we want to draw a lot of them...

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
  // each time draw() is called
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

What happens if you remove `randomSeed(0)`? Well, `random()` would start generating completely random numbers every frame, so the points get drawn anywhere each frame, and so you get static!

---

### Even more caterpillar compression

Going back to our caterpillar `for`-loop, we can actually use our counting variable (`i`) to make a slightly more compressed version of our loop, because we can use it to calculate the spacing of our segments directly

```javascript
for (let i = 0; i < caterpillar.totalSegments; i++) {
  ellipse(caterpillar.x + i * caterpillar.segmentSpacing, caterpillar.y, caterpillar.segmentSize);
}
```

Here we draw each segment at an x position of `caterpillar.x + i * caterpillar.segmentSpacing`. That is the __starting__ x position (`caterpillar.x`) plus the number of the current segment being drawn (`i`) multiplied by the spacing of the segments (`caterpillar.segmentSpacing`).

When `i` is `0` for the first segment, we don't add any spacing. When `i` is `1` for the second segment, we add one spacing unit. When `i` is `2` for the third segment, we add two spacing units, and so on.

Whether you __want__ to go to this kind of level of efficiency is up to you. Again, you'll see it in the wild, so it's worth understanding.

---

# }
