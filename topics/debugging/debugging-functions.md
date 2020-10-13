# Debugging functions {

---

## In this module

- Syntax errors
- Behavioral errors

---

## Syntax errors

### Typo in `function`

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

funtion drawCircle() {
  ellipse(width / 2, height / 2, 100);
}
```

`Uncaught SyntaxError: Unexpected identifier    script.js:11`

A familiar error telling us JavaScript has seen something unexpected. Again, this is so often a typo of some kind. The line number is correct, so we need to eyeball the line to spot the issue.

Note how in Atom, which uses "syntax highlighting" to change the colors of the various key words in your program, `funtion` is the __wrong color__ for a keyword, turning white instead of purple (in my coloring at least).

---

### Missing `(` or `)`

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drawCircle) {
  ellipse(width / 2, height / 2, 100);
}
```

`Uncaught SyntaxError: Unexpected token ')'   script.js:11`

Correct line number, which is good. Here the `)` is unexpected because there is no `(` before it. Fairly easy to spot.

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drawCircle( {
  ellipse(width / 2, height / 2, 100);
}
```

`Uncaught SyntaxError: Invalid destructuring assignment target   script.js:11`

Bit of a freaky error message because it's talking about an aspect of JavaScript (destructuring) we don't necessarily know about, but again it points to the right location in the script. And, again, much of the time we can rely on eyeballing the line to see where the issue is.

As with many of these errors, if you are indenting your code correctly, you will be able to spot this because the code will indent strangely:

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drawCircle({
    ellipse(width / 2, height / 2, 100);
  }
```

---

## Missing `{` or `}`

Missing a curly bracket leads to the same kinds of errors as in any element of a program that uses curly brackets around blocks of code, e.g.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drawCircle()
ellipse(width / 2, height / 2, 100);
}
```

`Uncaught SyntaxError: Unexpected identifier   script.js:12`

Here the `ellipse()` function call is unexpected because there's no `{` before it to properly start our function's block of code. We just need to search backward from the unexpected part to the thing that's causing it.

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drawCircle() {
  ellipse(width / 2, height / 2, 100);
```

`Uncaught SyntaxError: Unexpected end of input   script.js:12`

Good old unexpected end of input. This is always caused by a missing closing curly bracket, so we have to search upward for the culprit.

---

### Typos in the function name

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  dawCircle();
}

function drawCircle() {
  ellipse(width / 2, height / 2, 100);
}
```

`Uncaught ReferenceError: dawCircle is not defined   script.js:8`

Hopefully you know what you intended to call your function, so you notice if you write it wrong. The line number helpfully points at the location we got the function name wrong. If you think you got it __right__ you need to go look at the function __definition__ (e.g. on line 11) and make sure the spelling (and case) is exactly correct.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}

function drewCircle() {
  ellipse(width / 2, height / 2, 100);
}
```

`Uncaught ReferenceError: drawCircle is not defined   script.js:8`

This is the other case, where we write the actual name of the function wrong in our function definition. The error is still identified in the place we __call__ the function, so we need to recognize our function call is "correct" in the sense it's what we wanted to call the function, and so we need to look at the function __definition__ to correct the problem

---

### Non-existent function

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle();
}
```

`Uncaught ReferenceError: drawCircle is not defined    script.js:8`

Same error, but this time the problem there is __no function definition__. Obviously we can't call a function if we haven't defined it somewhere (and if it isn't part of p5 or JavaScript etc.).

---

## Behavioral errors

There are all kinds of things that can go wrong in functions because they're kind of the life blood of JavaScript, so it's a little harder to talk about specific problems. Still, there are a couple of things to be on the look-out for.

### Forgot to call the function

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
}

function drawCircle() {
  ellipse(width / 2, height / 2, 100);
}
```

We just don't see the circle on our canvas and there's no error. We forgot to call the function so it could do its job!

If you have a complex program and it's not so easy to spot, it can be helpful to add a `console.log()` to your function as its first line to confirm it isn't being called as opposed to just not working in some other way:

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
}

function drawCircle() {
  console.log(`drawCircle() called`);
  ellipse(width / 2, height / 2, 100);
}
```

When we run this we __do not see our message__, confirming that the function is never called. Then we can find the place in our program to call it and actually do so!

---

### Bad parameters

The other major thing that can happen in a function is that something goes wrong with its parameters, causing it to do a bad job. For instance, we might fail to give it all the parameters it needs when we call it...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle(width / 2, height / 2);
}

function drawCircle(x, y, size) {
  ellipse(x, y, size);
}
```

Here we see nothing on the canvas because we forgot to include the `size` argument. Again, in a large program this might be hard to see. One thing to do when a function seems not to be doing its job is to use `console.log()` to print out the value it is receiving:

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  drawCircle(width / 2, height / 2);
}

function drawCircle(x, y, size) {
  console.log(`drawCircle(${x},${y},${size})`);
  ellipse(x, y, size);
}
```

At which point we see in the JavaScript Console

`drawCircle(250,250,undefined)   script.js:12`

And therefore know that our program is calling `drawCircle()` incorrectly!

### A more tangled path

Note that it's not always as simple as a missing parameter, it might be that we provide an argument that is itself `undefined`...

```javascript
let circleX;
let circleY;
let circleSize;

function setup() {
  createCanvas(500, 500);

  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  background(0);

  drawCircle(circleX, circleY, circleSize);
}

function drawCircle(x, y, size) {
  console.log(`drawCircle(${x},${y},${size})`);
  ellipse(x, y, size);
}
```

Here we get the same message in the console, so we know that `drawCircle()` is called with an `undefined` size. But when we look at the call on line 15, we see that we __have__ provided three arguments.

This means the `circleSize` variable is `undefined` when we call `drawCircle`, so we need to continue our detective work to check when or whether we have a value inside `circleSize`. By reviewing all the mentions of `circleSize` in the program, we can see that it is never assigned a value, and this is our problem.

This kind of multi-layered problem solving is common in debugging. It's kind of fun, right?

---

## Summary

- Syntax errors lead to mostly understandable error messages, or at least helpful pointers to the problem
- Behavioral errors are often related to not calling your function or providing it with incorrect parameters, which can be helpfully debugged with `console.log()`

---

# }
