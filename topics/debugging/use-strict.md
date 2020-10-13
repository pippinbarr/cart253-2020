# `"use strict";` {

---

## In this module...

- `"use strict";`

---

## `"use strict";`

We have an ally in our fight against bugs and mistakes in our code called `"use strict";`. It's a setting we can use in JavaScript that __changes what counts as an error__ in our code.

To use it, we include

```javascript
"use strict";
```

at the top of every JavaScript (`.js`) file we work on.

This puts JavaScript into "strict mode".

---

## What's so strict about it?

Essentially what `use strict` does for us is make a number of potential problems in our code into __errors__ instead of just letting them cause problems. By making them errors (showing up in red in the JavaScript console and all that!), `"use strict";` forces us to deal with these potential problems right away.

There are quite a variety of specific problems that `"use strict";` deals with, [and you can read a full list here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), but the most important thing it does from our perspective is __prevent declaring variables by mistake__!

---

## What's the problem?

A really silly feature of JavaScript is that it allows you to declare variables just by __assigning__ to them. So for example, we can write:

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  x = 250;
  y = 250;
  ellipse(x,y,100);
}
```

The variables `x` and `y` __magically come into existence__ just because we __assigned values__ to them.

This might seem like a neat trick, or like it might be useful somehow, but in fact it is __terrible__.

Consider:

```javascript
let circle = {
  x: 0,
  y: 0,
  size: 100
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  circle.x = mouseX;
  circley = mouseY; // Uh oh!

  ellipse(circle.x, circle.y, 100);
}
```

I typo-ed `circle.y` as `circley` by missing the period. Unfortunately, JavaScript assumes that what I wanted was to __create a variable called `circley`__, which it does. But then my circle won't move in the y-axis, because I never actually assign `mouseY` to `circle.y`.

Note that this ends up being a problem with the __behaviour__ of my program, not an error. And these kinds of "behavioural issues" can be very hard to debug as we create more complex programs.

---

## Bring on `"use strict";`

If we were using `"use strict";` with the previous program...

```javascript
"use strict";

let circle = {
  x: 0,
  y: 0,
  size: 100
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  circle.x = mouseX;
  circley = mouseY; // Uh oh!

  ellipse(circle.x, circle.y, 100);
}
```

```
Uncaught ReferenceError: circley is not defined
```

Now we get a helpful __error message__ that points our we're trying to assign to a variable that does not exist, `circley`. We see the error message and thus our typo!

Problem solved.

---

## Summary

- `"use strict";` is great for helping us avoid particularly difficult bugs in our code
- It prevents us from accidentally declaring variables (often through typoes)
- We should include `"use strict";` at the top of every `.js` file we create!

---

# }
