# Debugging variables {

---

## Variables can cause trouble

Like any new piece of programming we learn, variables have the potential to go wrong. So we need some strategies for dealing with the classic issues we'll run into.

Let's talk about...

- Forgetting to declare
- Typos
- Seeing inside variables with `console.log()`
- `undefined`
- `NaN`
- Extra: Seeing inside variables with the debugger

---

## Back to the moving circle

Let's return to our moving circle code and introduce some common issues.

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);
}
```

Note: Here we're changing `circleX` __before__ we draw the circle with `ellipse()`. It doesn't matter __too__ much whether we make this change before or after doing the drawing, to some extent it's just a matter of preference. You can use either, but it's probably a little more common to change variables __before__ drawing things that depend on them.

---

## Forgetting to declare

One way we might make a mistake in our code is if we forget to actually __declare__ one of our variables with `let` at the top. We might forget to declare `circleY`, say...

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);
}
```

```
Uncaught ReferenceError: circleY is not defined
```

Which is exactly right - we forgot to __define__ (declare) what `circleY` is before we __used__ it. So this error message is helpful.

It points to the line where we __use__ `circleY`, though, which isn't where we need to __fix__ it. We need to think it through and realize that `circleY` should be __declared__ up the top before we use it.

---

## Typos when using a variable

Another classic is just to have a typo. For instance, what if we just write `circleY` incorrectly when we use it?

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circlY,circleSize);
}
```

```
Uncaught ReferenceError: circlY is not defined
```

The exact same kind of error message, but this time it's pointing out our typo, which is nice. It even gives us the line number where we got it wrong. We fix it by realizing we've written it wrong.

---

## Typos when declaring a variable

What if we typo when __declaring__ our variable, but write it correctly when using it?

```javascript
let backgroundShade = 0;
let circleX = 0;
let circlY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);
}
```

```
Uncaught ReferenceError: circleY is not defined
```

Here the error message is confusing at first, since in our minds we intended to call the variable `circleY` and it's saying that doesn't exist.

In cases where we think the variable name looks correct in the error message, we should first suspect the __declaration__ of the variable may have a typo. We go and check, notice we wrote `let circlY = 250;` and fix it.

---

## Seeing inside variables with `console.log()`

For other kinds of variable errors, we need the help of our trusty friend `console.log()`, because when things go wrong with variables we often want to __see what's inside them__. We need to make sure we have the JavaScript Console open for this to work!

If we want to see what's inside `circleX` while our program is running, for example, we can add a `console.log()` inside our `draw()` function like this:

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);

  console.log(circleX); // NEW!
}
```

As you can see, we call the `console.log()` function and we give it the variable as an argument, this tells it to print out the value inside the variable every time `draw()` executes. If you run this, you'll see it first print out `0`, then `1`, then `2` and so on as `circleX` goes up in value each time when we add `circleSpeed`.

Each `console.log()` output in the JavaScript is telling us the __value__ in `circleX` at that moment. Which also means that it's telling us __where the circle is__ over time (on the horizontal axis), which is fun.

We can see it voyage off the edge of the canvas and disappear, but we still get our `console.log()` outputs telling us where it is, even when it's gone! Deep.

---

## Prettifying `console.log()` messages

Tracking the circle's location worked well because it was the only thing we were looking at, but we'll end up having multiple `console.log()` messages in our programs, so we need to be able to tell them all apart.

Fortunately we can give them labels like this:

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);

  console.log("circleX is " + circleX); // NEW!
  console.log("circleY is " + circleY); // NEW!
}
```

Here we're printing out both `circleX` and `circleY`, but we're adding a label text in front of them so we can tell which is which. When we run this, in the console we'll see...

```
script.js:16 circleX is 1
script.js:17 circleY is 250
script.js:16 circleX is 2
script.js:17 circleY is 250
script.js:16 circleX is 3
script.js:17 circleY is 250
script.js:16 circleX is 4
script.js:17 circleY is 250
script.js:16 circleX is 5
script.js:17 circleY is 250
```

... and so on. We see the little message in the quote marks followed by the value in the variable we put after the `+` (plus) sign. This is called __string concatenation__ and is more generally useful, but for now we'll just use it for this situation.

---

## Template strings and `console.log()`

If you want to be a bit more fancy, there's another way to display text along with your variable values in `console.log()`, which is to use a template string:

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);

  console.log(`circleX is ${circleX}`); // NEW!
  console.log(`circleY is ${circleY}`); // NEW!
}
```

It's the same basic idea, written in a slightly different way. The whole thing to be printed is in "back-tick" quote marks (the key usually to the left of `1` on your keyboard), and the variable to display is written inside curly brackets after a `$` (dollar) sign.

You can use either, they do the same thing. I have a personal preference for the template string.

---

## `undefined`

Now that we have the ability to print out variables, we can tackle the more tricky errors that often come up.

What if we forget to put a value in a variable?

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);
}
```

Here I've forgotten to put a value in `circleY`, so when I run the code, it doesn't show the ellipse I'm trying to draw (it has an undefined y coordinate, so it can't be drawn).

It's unfortunate, but this doesn't break the program or give an error message. However, a __lot__ of the time these sorts of issues are caused by weird values in our variables, so a major strategy is to __print out the variables__.

In larger projects we'd need to think about which variable might be the problem, but here we can print them all (here I'm using one big template string)...

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);

  console.log(`circleX: ${circleX}, circleY: ${circleY}, circleSize: ${circleSize}, circleSpeed: ${circleSpeed}`);
}
```

When we look in the console we see that `circleY`'s value is `undefined`. So we know `circleY` is the culprit, and we look in the code for where that happened. That leads us to the declarations, where we notice we didn't give it a value. And we fix it.

---

## `NaN`

`undefined`'s partner in crime is `NaN`, which stands for __Not a Number__. `NaN` ends up in a variable whenever we try to do some weird and impossible math. Notable when we try to do math with `undefined` as one of the elements.

So, for example `1 + 1` is `2`, but `1 + undefined` is `NaN`.

This can happen to us in our code. Consider what happens if I don't give `circleSpeed` a value. With the same `console.log()` from last time...

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);

  circleX = circleX + circleSpeed;
  ellipse(circleX,circleY,circleSize);

  console.log(`circleX: ${circleX}, circleY: ${circleY}, circleSize: ${circleSize}, circleSpeed: ${circleSpeed}`);
}
```

Now we see `circleSpeed` is `undefined`, as expected, but this has the follow-on effect of making `circleX` into `NaN`! That's because we take `circleX` which is a number, and add `undefined` to it, which gives us `NaN`.

Just like with `undefined`, trying to draw an ellipse when one of the arguments is `NaN` leads to no ellipse, but also no error message.

Here we should see `NaN` and immediately suspect that `undefined` is sneaking into some math. From there we can track it down to `circleSpeed`, which is `undefined`, and realize we forgot to give it a value at the beginning.

Phew!

---

## Extra: Seeing inside variables with the debugger

You'll be able to get along just fine with `console.log()` for this course, and probably for the rest of your life, but if you want to, you can also track the content of variables using the built in "Debugger" in your browser.

In __Chrome__ go to the JavaScript Console (which you have open, right!?!?), and in the menu at the top of the console select "Sources" instead of "Console".

There is a __lot__ of stuff going on here, but for now go to the bottom right and choose "Watch". From there you can click the little `+` button to add variable names one by one. You just click the `+`, then type in a variable name from the program, and it will tell you the value of the variable.

Note that you have to hit the "Refresh" button to update the value, it doesn't just update them live.

__Feel free to use this approach or not, it's just so you know it exists!__

---

## Summary

- Variables are our first big opportunity to run into frustrating errors
- Be on the lookout for typos!
- Always remember to put values in your variables to avoid `undefined`
- Use `console.log()` (or the Watch option in the Debugger) to keep track of the values in variables while the program runs
- Remember that `undefined` and `NaN` in your variables probably mean trouble

---

# }
