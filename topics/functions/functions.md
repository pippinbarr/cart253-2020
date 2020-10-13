# Functions {

---

## In this module...

- What are functions?
- Calling functions
- Defining p5 functions
- Defining our own functions

---

## What are functions?

We've already seen and used functions a lot in our programming. `background()` is a function. `random()` is a function, `ellipse()` is a function.

Essentially, a function is a way to group code that does a specific job together into one place and to give that code a __name__.

The `ellipse()` function does the (very important!) job of drawing an ellipse on the canvas. Somewhere (inside p5), is all the code that knows how to draw an ellipse on a canvas, and it has been given the name `ellipse()`. By giving it a name (by making that code into a function), we are then able to __call__ that function whenever we want to draw an ellipse.

And so it goes for __any__ code we want to group together and give a name.

---

## Calling functions

The main thing we've been doing with functions is __calling__ them. That's when we write the __name__ of the function followed by parentheses (and perhaps put some __arguments__ inside those parentheses). So to draw an ellipse we write:

```javascript
ellipse(250,250,100);
```

This is __calling__ the `ellipse()` function, meaning that we want to __execute__ the instructions that make up the `ellipse()` function (which are somewhere inside p5). The __arguments__ in this case (`250,250,100`) are to tell `ellipse()` (the function) the __x position__, __y position__, and __size__ of the ellipse to draw.

Calling functions is amazing because we can __make things happen__ (like draw an ellipse, get a random number, or create a canvas) __without needing to know how it works__!

We have __no idea__ how the `ellipse()` function actually goes off and draws an ellipse - it just works, and we rely on it.

---

## Defining p5 functions

We have been __defining__ functions in our programs as well, the special p5 functions like `setup()` and `draw()`. We have __defined__ those functions because we want to specify exactly __what instructions should be executed__ when those functions are called (automatically, by p5).

So we might have a simple program like this...

```javascript
function setup() {
  createCanvas(500,500);
  background(0);
  ellipse(250,250,100);
}
```

Here we are __defining__ the `setup()` function, not calling it. A function definition has four key parts:

1. We write the word `function` first to tell JavaScript we want to define a function
2. We write the __name__ of the function we are defining (`setup` in this case, which we know is the __special__ name of a function p5 will call automatically at the start of our program)
3. After the name we have __parentheses__ `()` (they are __empty__ in this case, but we will see that we use them sometimes to specify what __arguments__ a function can receive)
4. We use __curly brackets__ `{}` to enclose the __instructions__ our function will execute when it is called (so our `setup()` function will create a canvas, set the background to black, and draw a circle when p5 calls it at the start of the program)

---

## Motivating our own functions

It's already very useful both to __call__ p5's functions (to __do__ things in our programs) and to __define__ p5's functions (to tell p5 what to do when).

It is also __very__ useful to be able to define our own functions. Consider this program:

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  circle.x = circle.x + circle.vx;
  circle.x = circle.x + circle.vy;

  if (circle.x > width) {
    circle.x = 0;
    circle.vx = circle.vx + 2;
    circle.size = circle.size + 5;
  }

  fill(255,0,0);
  ellipse(circle.x, circle.y, circle.size);
}

function mousePressed() {
  circle.x = 0;
  circle.vx = circle.vx + 1;
  circle.size = circle.size + 5;
}
```

A circle moves across the screen, left to right. When it gets to the right side it:
1. Moves back to the left
2. Gets faster
3. Gets bigger

We also have an event when the mouse button is pressed, so when the user clicks the circle:
1. Moves back to the left
2. Gets faster
3. Gets bigger

Those three things are the __same__ both times! We could write a __function__ that does that task of "resetting" the circle, and then we could __call__ that new function in both places instead of writing out the same code twice...

---

## Defining our own function

To make the improvement, we will define a function called `reset()` (because it's resets the circle's position, along with speeding it up and making it grow) and put the code for resetting in it. Then we will be able to __call__ that function when we need to do that specific job...

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  circle.x = circle.x + circle.vx;
  circle.x = circle.x + circle.vy;

  if (circle.x > width) {
    // CALLING reset()
    reset();
  }

  fill(255,0,0);
  ellipse(circle.x, circle.y, circle.size);
}

function mousePressed() {
  // CALLING reset()
  reset();
}

// DEFINING reset()
function reset() {
  circle.x = 0;
  circle.vx = circle.vx + 1;
  circle.size = circle.size + 5;
}
```

Now our program is undeniably __better__. Instead of writing out the same resetting code twice, we have it __once__ in our `reset()` function and we just call that function when we want that specific code to execute.

Note how much easier this makes it if we want to change what "resetting" __means__. If we also wanted to change the circle's y velocity, we could just add that into the `reset()` function definition...

```javascript
function reset() {
  circle.x = 0;
  circle.vx = circle.vx + 1;
  circle.vy = circle.vy - 1;
  circle.size = circle.size + 5;
}
```

And because both the "reaching the right side" conditional and the "mouse pressed" event use the `event()` function, they __both__ now also change the y velocity, we didn't have to change it in two places, just in the __function definition__.

The fact we can use `reset()` twice like this (and as many other times as we want!) is __reusability__,

The fact that `reset()` organizes the specific code for resetting into a special, defined place, is __modularity__.

---

## Functions for organization

We don't __only__ define functions when we want to be able to do the same thing more than once, we also define them just to organize our code and make it clearer. We could actually turn all the pieces of our `draw()` loop into separate functions to clarify it. Let's think about the different steps we take in `draw()`...

1. Setting the `background()` probably doesn't need to be in its own function because it's just one line.
2. Moving the circle according to its velocity is a specific set of instructions we could call `move`, so that can be a function
3. Checking if the circle is at the right edge of the canvas and resetting is a specific set f instructions we could call `wrap` (since it makes the circle "wrap" from the right side to the left side), so that can be a function
4. Drawing the ellipse itself is another set of instructions we could call `display`, so that can be a function too!

Let's define those functions and call them in `draw()`...

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  move(); // Call our move function so the circle position is updates
  wrap(); // Call our wrap function so the circle moves back to the left if it reaches the right
  display(); // Call our display function so the circle is displayed
}

// Defining our move function
function move() {
  circle.x = circle.x + circle.vx;
  circle.x = circle.x + circle.vy;
}

// Defining our wrap function
function wrap() {
  if (circle.x > width) {
    reset();
  }
}

// Defining our reset function
function reset() {
  circle.x = 0;
  circle.vx = circle.vx + 1;
  circle.size = circle.size + 5;
}

// Defining our display function
function display() {
  fill(255,0,0);
  ellipse(circle.x, circle.y, circle.size);
}

function mousePressed() {
  // CALLING reset()
  reset();
}
```

Now our program is nice and tidy indeed.

Our `draw()` function is now very simple and quite readable: it fills the background, moves the circle, wraps the circle, and displays the circle. With one __function call__ per "idea" in the code.

If we want to know or to change the __details__ of any of those functions, we go to the corresponding __function definition__ and read the instructions there, making any changes we wish.

So if we want to do something about the circle's appearance, we know we should edit the `display()` function for instance!

Likewise, if we __don't want the circle to display__ we can either __remove__ the `display()` function call, or just __comment it out__. This can be useful for debugging, when you want to simplify your program while you're figuring out what's wrong.

---

## Summary

It's __extremely__ useful and important to also __define our own functions__. There are two key reasons for this:

1. We can __organize__ our code by separating different sets of instructions and giving them names. This is called __modularity__. Each function is a little __module__ of code.
2. We can __use our functions more than one__ to accomplish tasks in our program. This is called __reusability__.

---

# }
