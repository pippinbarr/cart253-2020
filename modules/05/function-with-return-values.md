# Functions with return values {

---

## In this module...

- Return values
- Defining functions with return values

---

## Return values

Most of the function we've used so far just go away and __do something__ and that's that. `ellipse()` draws an ellipse on the screen, `createCanvas()` creates the canvas, `fill()` sets the fill color, and so on.

But some functions also __give something back__.

Consider `random()`. When we call `random()` it goes away, comes up with a random number, and then __gives it back to us__. We call this __returning a value__. We then store this value in a variable (often) and use it some how. So, for example:

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  // Use random() to get a random x position
  let x = random(0,width);
  // Use random() to get a random y position
  let y = random(0,height);

  ellipse(x,y,100,100);
}
```

In both cases above, `random()` __returns__ a random number that we then store in a variable and use to position our ellipse. The ellipse moves to a random position on the screen every frame.

So functions that return values are __useful__.

---

## Using return values right away

So far we've always __assigned__ a function's return value to a variable, but we don't always have to. We can actually use the __function call itself__ as if it were the value it returns.

We could rewrite the previous program like this without variables:

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  ellipse(random(0,width),random(0,height),100,100);
}
```

Now we __call__ `random()` right inside the `ellipse()` function's arguments. The first time we call `random(0,width)` instead of providing an `x` position. `random()` __returns__ a random number between `0` and `width`, which is then used as the `x` argument for our `ellipse()`. The same thing happens again for the `y` argument!

Just because we __can__ do this (use function with a return value in place of an argument) doesn't mean we necessarily should, but it's good to know. Think about whether it makes your program more or less confusing, and base your decision on that. (Less confusing is better!)

---

## Defining a function with a return value

Let's take a very simple example to check out the syntax for a function with a return value: converting from Fahrenheit to Celsius.

To convert a number from Fahrenheit to Celcius, we subtract `32` and multiply by `5/9`. Exactly the kind of thing a computer would be good at.

We can already imagine a function that does most of this job. It needs to have a __parameter__ to tell it the Fahrenheit value to convert, and then it needs to do the math to calculate the Celsius value:

```javascript
function toCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5/9;
}
```

This is almost all we need, but the final thing is we need this function to __return__ the value it calculated, so wherever we __call__ `toCelsius()` we can then use the value it return.

To do this we need to end our function with a `return` that sends back the calculated value.

```javascript
function toCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5/9;
  // Return the value in the celsius variable
  return celsius;
}
```

Now our function is ready to use:

```javascript
function setup() {
  createCanvas(500,500)
  let hotCelsius = toCelsius(100);
  console.log(`100 degrees Fahrenheit is ${hotCelsius} degrees Celsius.`);

  let coldCelsius = toCelsius(10);
  console.log(`10 degrees Fahrenheit is ${coldCelsius} degrees Celsius`);
}

function toCelsius(fahrenheit) {
  let result = (fahrenheit - 32) * 5/9;
  // Return the value in the celsius variable
  return result;
}
```

---

## Beyond calculation

Even though converting one number to another is a great use of functions (think of `map()` and `constrain()` for example!), we can do other things too.

Here's a program that launches a circle of the screen and then brings it back when it goes off the edge of example:

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0
}

function setup() {
  createCanvas(500, 500)
  reset();
}

function draw() {
  background(0);

  move();

  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    reset();
  }

  ellipse(circle.x, circle.y, circle.size);
}

function move() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
}

function reset() {
  circle.x = 250;
  circle.y = 250;
  circle.vx = random(-10, 10);
  circle.vy = random(-10, 10);
}
```

We know we could move the `if`-statement into its own function too, but what it we want to just give a name to the __condition__ it checks: is the circle off the screen?

We could write a function that checks if the circle is off the screen and returns `true` if it is and `false` otherwise...

```javascript
function circleIsOffScreen() {
  let result = (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height);
  return result;
}
```

And we could use that in our program...

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0
}

function setup() {
  createCanvas(500, 500)
  reset();
}

function draw() {
  background(0);

  move();

  let offScreen = circleIsOffScreen();
  if (offScreen) {
    reset();
  }

  ellipse(circle.x, circle.y, circle.size);
}

function circleIsOffScreen() {
  let result = (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height);
  return result;
}

function move() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
}

function reset() {
  circle.x = 250;
  circle.y = 250;
  circle.vx = random(-10, 10);
  circle.vy = random(-10, 10);
}
```

This is a nice example of a function with a return value that makes our code __easier to read__. Rather than having to look at the logical condition in our `if`-statement, we can just look at the variable name that describes what we're checking!

As with `random()` earlier, we can also just use the function directly where we need its value:

```javascript
if (circleIsOffScreen()) {
  reset();
}
```

So nice and tidy!

---

## Summary

- Functions with return values are helpful!
- They can perform calculations and give us back the result
- They can also do more than this, such as checking whether something is true of false
- They make our code more readable
- We will see them more and more as we work

---

## TMI?

### Returning more than one value

Sometimes you might want a function that can return more than one value at one. In that case you can return an __object__ with __properties__ for each value you want your function to return.

Consider this function that returns a random color:

```javascript
function randomColor() {
  // We set the result to be an object containing a random red, green, and blue property
  let result = {
    r: random(0,255),
    g: random(0,255),
    b: random(0,255)
  };
  // Then return that object
  return result;
}
```

We could then use this to set the color of something in a program...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  // We assign the return value of randomColor() into our color variable
  // so it will have an object with three random color properties
  let color = randomColor();
  fill(color.r, color.g, color.b);
  ellipse(250, 250, 100, 100);
}

function randomColor() {
  let result = {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
  return result;
}
```

---

# }
