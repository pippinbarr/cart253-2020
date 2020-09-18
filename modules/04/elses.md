# More conditionals {

---

## In this module...

- `else`
- `else if`
- Logic operators

---

## Our circular fiend

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

---

## What else?

Currently our `if`-statements either perform the action specified or they do nothing. But often when we make decisions we want to have alternatives. Very often we want to decide something like:

> __If__ there is freezing rain, __then__ I will stay at home, __otherwise__ I will go to my local café.

That is, there a specific action to take if the condition (there being freezing rain) is __true__, and a __different__ action to take if it is __false__.

In programming that "otherwise" is called `else`.

---

## Using `else`

We always use the `else` __with__ an `if`, as you might imagine. And we put the `else` __after__ the action part of the `if` to say what we should do if the __condition__ of the `if` is __false__.

Consider setting the fill to red if our mouse cursor is in the left half of the canvas and __otherwise__ setting it to blue...

```javascript
if (mouseX < width/2) {
  fill(255,0,0);
}
else {
  fill(0,0,255);
}
```

So we have our familiar `if`-statement that checks the condition (is the mouse in the left half of the canvas?) and carries out an action if it's __true__ (set the fill to red).

But __after__ the closing curly bracket of the action, we add our `else`, followed by a different action in curly brackets (set the fill to blue). The action of the `else` will happen when the `if`'s condition is __false__ (which is when the mouse is in the __right__-hand side of the canvas).

---

## In action

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

  // If the mouse is on the left side...
  if (mouseX < width/2) {
    // Set the fill to red
    fill(255,0,0);
  }
  // Otherwise (if it's NOT on the left side, which means it's on the RIGHT!)
  else {
    // Set the fill to blue
    fill(0,0,255);
  }
  ellipse(circle.x,circle.y,circle.size);
}
```

And it works! The circle is red while the mouse is on the left, and blue while it's on the right.

---

## More alternatives!

We may have more complicated plans for our programs! If this is the case, we use `if`-statements that include a series of potential conditions, each checked one after the other. Here we combine `else` with `if`.

So, say we want the circle to be red if the mouse cursor is in the left third of the canvas, green if it's in the middle third of the canvas, and blue if it's in the right third. We would write:

```javascript
if (mouseX < width/3) {
  fill(255,0,0);
}
else if (mouseX < 2 * width/3) {
  fill(0,255,0);
}
else {
  fill(0,0,255);
}
```

Notice two important things here:

### The `else if` part only happens if the previous condition was __false__.

The `else if` after the first `if` can __assume that the first condition was false__. Because if it had been true, then the program would set `fill(255,0,0)` and the `else if` and the `else` would be ignored.

This means we can use the condition `mouseX < 2 * width/3` (the mouse's x position is less than two thirds of the canvas) because we __already know__ it must be greater than one third of the canvas (this was checked by the first `if`).

### The `else` only happens if __all__ the previous conditions were __false__

It's kind of a catch-all at the end there. It has no condition of its own, because it's like the "last resort".

In this case we know it means that both `mouseX < width/3` and `mouseX < 2 * width/2` are false. Which means that `mouseX` must be greater than two thirds of the `width`.

---

## In action

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;

  if (mouseX < width / 3) {
    fill(255, 0, 0);
  }
  else if (mouseX < 2 * width / 3) {
    fill(0, 255, 0);
  }
  else {
    fill(0, 0, 255);
  }

  ellipse(circle.x, circle.y, circle.size);
}
```

Disco time! Wave your mouse like you just don't care!

---

## Decisions within decisions

It is also common to make a decision based on __more than one piece of information__. So, for example we might make a decision like

> "__If__ the café is open __and__ there is a table near the window __then__ I will go in."

In this case we only go into the café if __both__ those things are true.

---

## Nested `if`-statements

We can achieve this kind of decision by putting one `if`-statement __inside__ another one! This is called __nesting__ the `if`-statements.

Consider the idea that we want to make our circle red if it is in the central third of the canvas. That is, if its x position is greater than the left third __and__ less than the right third. We would write:

```javascript
// Is the circle past the left third?
if (circle.x > width/3) {
  // Is the circle ALSO before the right third?
  if (circle.x < 2 * width/3) {
    fill(255,0,0);
  }
}
```

So the first `if`'s condition checks the first part of our condition (has the circle to the right the left third)...

... and if it's __true__ then we get to the action inside the curly brackets...

... which is __another__ `if` which checks our second condition (is the circle the left of the right third)...

... and if that is __true__ then we get to that `if`-statement's action...

... which sets the fill to red. Phew!

We end up with a circle that is red only in the central third of our canvas.

---

## In action

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  fill: 255
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;

  // Default fill
  fill(circle.fill);

  // Conditionals to set fill based on position
  if (circle.x > width / 3) {
    if (circle.x < 2 * width / 3) {
      fill(255, 0, 0);
    }
  }

  ellipse(circle.x, circle.y, circle.size);
}
```

---

## Logic

This idea of wanting to check more complicated conditions is very common in programming. You can do pretty much anything with fancy (sometimes nested) structures of `if` and `else if` and `else` statements, but another very common way to express conditions is with __logic__.

There are just three key logical operators we can use: __and__, __or__, and __not__.

### And

- We write the symbol for "and" as two ampersands: `&&`.
- We can combine two conditions with `&&` and the result will only be true if __both__ conditions are true.
- So `(a && b)` is true if both `a` and `b` are true.

```javascript
// If the circle's x is greater than one third AND less that two thirds of the width
if (circle.x > width/3 && circle.x < 2 * width/3) {
  // This only happens if BOTH those conditions are true
  fill(255,0,0);
}
```

Notice how the above is __exactly__ the same as our previous nested if, it's just all done inside one `if`-statement because we can __combine__ the two conditions with `&&`.

### Or

- We write the symbol for "or" as two "pipes": `||`.
- We can combine two conditions with `||` and the result will be true if __either__ condition is true.
- So `(a || b)` is true if `a` is true, `b` is true, or both are true.

```javascript
// If the circle's x is less than one third OR greater than two thirds of the width
if (circle.x < width/3 || circle.x > 2 * width/3) {
  // This happens when EITHER of the two conditions are true
  fill(255,0,0);
}
```

This circle is red if it's in the left or right third (but not when it's in the central third).

### Not

- We write the symbol for "not" as an exclamation mark: `!`.
- We can put the `!` __before__ a condition to negate it, so the result will be true only if the condition is __false__.
- So `(!a)` is true if `a` is false!

```javascript
// If it is NOT true that the circle's x is in the left half
if (!(circle.x < width/2)) {
  // This only happens if (circle.x < width/2) is FALSE
  fill(255,0,0);
}
```

This circle is red when it is __not__ in the left half, which means that it is red when the circle is in the right half!

__Note__ that we needed __parentheses__ around the condition `(circle.x < width/2)` in order to use the `!` in front of it, because the `!` needs to apply to the __whole condition__.

---

## Summary

- We can make more complex decisions with `else` and `else if`
- And we can write more detailed conditions using __logic operators__ `&&` (and), `||` (or), and `!` (not)

---

# }
