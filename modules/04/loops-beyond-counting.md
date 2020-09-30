# Loops beyond counting {

---

## In this module

- Using a `while` loop for more than counting

---

## Beyond counting

Using loops for __repetition a set number of times__ (essentially __counting__) like we've been seeing is __by far__ the common use, and indeed that's essentially all that `for` loops do.

However, `while` loops in particular are actually more flexible than just this. In particular, there are __other__ situations where we want to repeat some action __until__ some desired situation is reached. This still requires __repetition__, but of a different kind.

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

We could try to fix this with an `if` statement in `setup()` that checks if our circle is in the danger zone and then repositions it if so...

```javascript
function setup() {
  createCanvas(500, 500);

  // Give our white circle a random position
  circle.x = random(0, width);
  circle.y = random(0, height);
  // Calculate the distance from our circle to the danger zone...
  let d = dist(circle.x,circle.y,dangerZone.x,dangerZone.y);
  // Check if our white circle overlaps the danger zone...
  if (d < circle.size/2 + dangerZone.size/2) {
    // If it does, use a different random position!
    circle.x = random(0, width);
    circle.y = random(0, height);
  }
}
```

This is better, but it still doesn't __guarantee__ our circle stays out of the danger zone because the `if`-state only checks __once__.

What if the __repositioning__ in the `if`-statement __also__ puts the circle in the danger zone? Then we're out of luck.

This is where we need a __loop__, because what we really want is to keep repositioning the circle __until__ it's out of the danger zone.

That exactly what a `while` loop can do.

---

## `while` to the rescue

Let's think about the three components of loops in our current example...

1. Our __starting context__ is that we have just positioned our white circle at a random location, and that we want it to end up outside the danger zone.
2. Our __condition__ is that we need to check if the circle in its current position is __in__ the danger zone (because if it is we need to move it!)
3. If it is, our __action__ in the loop is to __move__ the circle to a new random position

A `while` loop will check the __condition__ and perform the __action__ over and over until the condition becomes __false__. Our loop will thus continually reposition our circle __until it isn't in the danger zone__. Perfect!

It'll look like this...

```javascript
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
```

This is a more sophisticated use of a loop than straight-forward counting because it's __dynamic__. We don't __know__ how many times the loop will have to run to reach the desired outcome, we just know the outcome we need to reach eventually.

These kinds of loop are much less common in day-to-day programming than counting loops, but it's still well worth knowing this general kind of approach and use of loops as well!

---

## Summary

- `while` loops can achieve more than just counting
- In particular, we can keep trying an action until it has the desired outcome

---

# }
