# Functions with parameters {

---

## In this module...

- Making functions reusable with parameters!
- TMI: `undefined` parameters (Good to know)
- TMI: Default parameters (ADVANCED)
- TMI: Using objects and destructuring for parameters (VERY ADVANCED)

---

## Drawing lines

Here is a program that draws a set of parallel lines with a `for`-loop

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // Variables for the starting position
  let x = 50;
  let y = 250;
  // For loop counts from 0 to 20 in i
  for (let i = 0; i < 20; i++) {
    // Drawing style
    noStroke();
    fill(255);
    rectMode(CENTER);
    // Draw a 2x50 rectangle at the current position
    rect(x, y, 2, 50);
    // Increase x so the next rectangle is to the right
    x = x + 5;
  }
}
```

If we decide we like the parallel lines enough, we might think it would be good to put those instructions into a function so we can tidy up our code and __reuse it__.

---

## Parallel lines function

Let's move the code into a function called `parallels()` and call it in `draw()`...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  parallels(); // Call the function
}

// Defining the function
function parallels() {
  // Variables for the starting position
  let x = 50;
  let y = 250;
  // For loop counts from 0 to 20 in i
  for (let i = 0; i < 20; i++) {
    // Drawing style
    noStroke();
    fill(255);
    rectMode(CENTER);
    // Draw a 2x50 rectangle at the current position
    rect(x, y, 2, 50);
    // Increase x so the next rectangle is to the right
    x = x + 5;
  }
}
```

This works! The program is tidier. __But__ if we want to call the function again to draw __more__ parallel lines...

```javascript
function draw() {
  background(0);

  parallels(); // Call the function
  parallels(); // Call the function again...?
}
```

Nothing changes.

That's because the `parallels()` function always draws the parallel lines exactly the same, starting at the __same__ `x` and `y` values. Calling it again just draws the exact same thing on top of the previous one.

This is not what we wanted, really.

As with `ellipse()` and `rect()` and so on, we would like to be able to tell the `parallels()` function __where__ to draw the set of parallel lines.

We need __arguments__. How?

---

## Improving `parallels()`: function parameters

First, we need to specify the information the function accepts, the arguments we will give to it when we call it.

We know we want to be able to specify the __position__ of the lines, so we would want an `x` and `y` here.

In a function definition, the `x` and `y` are called __function parameters__.

```javascript
// Define our parallels function, which will accept two arguments
function parallels(x,y) {
  // The instructions will be in here
}
```

To add parameters to our function definition, you can see that we literally write the parameter names inside the parentheses, separated by commas. The parameters (`x` and `y` in this case) are exactly like __variables__ inside the function. (With a superpower: we can set those parameters using arguments when we call the function.)

---

## Improving `parallels()`: using the parameters

For our function to actually respond to the new parameters, we need to __use__ them in the function's block of code inside the curly brackets.

Most importantly, we need to know, again, that the parameters are __variables__, and that when we __call__ this function with arguments, the values will be put into the parameters (an x and y position in this case). In the original code we had declared variables for `x` and `y`, but we no longer need them! The parameters will do the job instead...

```javascript
function parallels(x,y) {
  // We don't need to declare x and y now because they are provided as parameters
  for (let i = 0; i < 20; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    // We can still use x and y as variables
    rect(x, y, 2, 50);
    // Including changing x inside our loop
    x = x + 5;
  }
}
```

Now our function __uses__ the `x` and `y` parameters (in exactly the same way as it used to use the declared variables before). It uses those parameters to position each rectangle as we draw it.

---

## Improving `parallels()`: calling the function

In order to actually __use__ our improved `parallels()` function we need to change how we __call__ it. Previously we called it with no arguments:

```javascript
parallels();
```

But now this doesn't make sense, because `parallels()` expects __two arguments__, an x position and a y position, that it will use to position the resulting parallel lines. So, we treat it like `ellipse()` etc., and provide a position to draw at:

```javascript
parallels(100,200);
```

Now when we call the function it will take those two arguments (`100` and `200`) __in that order__ and store their values in the `x` and `y` parameters __in that order__ (`x` will be set to `100` because it's the first parameter, `y` will be set to `200` because it's the second parameters).

Then the `parallels()` function will __use__ those values in `x` and `y` to actually draw the lines!

---

## Calling the function again

Now we can use our new `parallels()` function to draw a set of parallel lines __anywhere__ we want, and we can call it __more than once__ to draw multiple sets of them...

```javascript
parallels(100, 200);
parallels(200, 100);
parallels(200, 300);
```

At this point it's a lot like `ellipse()` or `rect()`!

---

## More parameters

Currently our parameters only let us specify the __position__ of our lines, but there are other numbers in the function definition we could convert to parameters! For instance, we could have a parameter for the number of lines, the thickness of the lines, the height of the lines, and the spacing of the lines...

```javascript
function parallels(x,y,numLines,lineThickness,lineHeight,lineSpacing) {
  // We use the numLines parameter in our for-loop to determine how many
  // lines we will draw in the loop
  for (let i = 0; i < numLines; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    // We use the x, y, lineThickness, and lineHeight parameters to specify each rectangle
    rect(x, y, lineThickness, lineHeight);
    // We add the lineSpacing parameter to x to space out our lines
    x = x + lineSpacing;
  }
}
```

And then we can call the function with more variations...

```javascript
parallels(0, 200, 100, 1, 100, 4);
parallels(0, 300, 20, 10, 50, 12);
parallels(0, 350, 80, 5, 5, 6);
```

Again, the __order__ we write the arguments when we __call__ the function needs to __match__ the order of the __parameters__ in the function __definition__. It's how JavaScript knows which parameter is which!

---

## Summary

- Functions become even more powerful and flexible with __parameters__
- By writing our functions to accept parameters and to __use__ them they become much more __reusable__
- The sky is the limit!

---

## TMI?

### `undefined` arguments

Generally speaking we __always__ want to specify every argument when we call a function, it just makes sense.

If we __don't__ include an argument, we can run into trouble. Consider this contrived example:

```javascript
function setup() {
  createCanvas(500,500);
  background(0);
  oval(250,250,400,200);
}

function oval(x,y,w,h) {
  ellipse(x,y,w,h);
}
```

Here we're writing a function called `oval()` that literally just turns around and uses `ellipse()` to actually draw the shape.

What if we forgot to include the height (the `h` parameter) when we called it?

```javascript
function setup() {
  createCanvas(500,500);
  background(0);
  oval(250,250,400);
}

function oval(x,y,w,h) {
  ellipse(x,y,w,h);
}
```

We see nothing! The reason for this is that if we don't include an argument for a parameter (`h` in this case), it gets set to __undefined__. Just like any variable we don't assign a value.

This is almost always __not__ what we want, so we should avoid it.

Further, imagine we forget to include the `x` parameter like this:

```javascript
function setup() {
  createCanvas(500,500);
  background(0);
  oval(250,400,200);
}

function oval(x,y,w,h) {
  ellipse(x,y,w,h);
}
```

Even though __we__ forgot the `x` parameter, in the actual function it will still be the `h` parameter that's undefined. `x` will get the first value (`250`), `y` will get the second value (`400`), `w` will get the third value (`200`), and `h` will get `undefined` because there's nothing in the function call.

### Default parameters

We can actually specify __defaults__ in our function definitions by using standard variable assignment. If we wanted our `oval()` to default to using `250,250,100,100` as the defaults, we would write the function definition like this:

```javascript
function oval(x = 250,y = 250,w = 100,h = 100) {
  ellipse(x,y,w,h);
}
```

Now if we call over with __no__ arguments:

```javascript
oval();
```

It will be drawn at the default position and size!

If we call it with a position but no size:

```javascript
oval(100,100);
```

It will be drawn at that position, but with a size of `100x100` because of the defaults.

Note, again, that the order matters. If we only provide two arguments, as above, the function assumes they are the __first two__. Really what it means is we're kind of writing:

```javascript
oval(100,100,undefined,undefined);
```

If we wanted to use the default position with a different size, we can use that approach:

```javascript
oval(undefined,undefined,500,500);
```

This will draw an oval at the default position (since we made `x` and `y` undefined), but with a specified size of `500,500`.

### Using objects and destructuring for parameters

This is very advanced, but it's a really nice way to handle parameters for a function, especially when you have a lot of them and you start getting confused as to which is which when specifying arguments.

Let's return to the lines example...

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  parallels(0, 200, 100, 1, 100, 4);
  parallels(0, 300, 20, 10, 50, 12);
  parallels(0, 350, 80, 5, 5, 6);
}

function parallels(x,y,numLines,lineThickness,lineHeight,lineSpacing) {
  // We use the numLines parameter in our for-loop to determine how many
  // lines we will draw in the loop
  for (let i = 0; i < numLines; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    // We use the x, y, lineThickness, and lineHeight parameters to specify each rectangle
    rect(x, y, lineThickness, lineHeight);
    // We add the lineSpacing parameter to x to space out our lines
    x = x + lineSpacing;
  }
}
```

It's already hard to look at the three calls of the `parallels()` function and to know what the various numbers mean! So here is a way we can improve this. We can provide __one__ argument, which is an object with properties for each argument, and we can __rewrite__ the function definition to handle this case with "object destructuring" to convert the properties of the object back to variables.

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  // We call parallels each time with a single OBJECT as the argument, containing one property for
  // each parameter we're wanting to use
  parallels({x: 0, y: 200, numLines: 100, lineThickness: 1, lineHeight: 100, lineSpacing: 4});
  parallels({x: 0, y: 300, numLines: 20, lineThickness: 10, lineHeight: 50, lineSpacing: 12});
  parallels({x: 0, y: 350, numLines: 80, lineThickness: 5, lineHeight: 5, lineSpacing: 6});
}

// Our function definition DESTRUCTURES the object into variables based on the property names
function parallels({x,y,numLines,lineThickness,lineHeight,lineSpacing}) {
  // We use the numLines parameter in our for-loop to determine how many
  // lines we will draw in the loop
  for (let i = 0; i < numLines; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    // We use the x, y, lineThickness, and lineHeight parameters to specify each rectangle
    rect(x, y, lineThickness, lineHeight);
    // We add the lineSpacing parameter to x to space out our lines
    x = x + lineSpacing;
  }
}
```

Significantly more readable code! But very advanced JavaScript.

### Gradients...

Mapping the each line's fill to the value of `i` gives us gradients...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  parallels(0, 200, 100, 1, 100, 4);
  parallels(0, 300, 20, 10, 50, 12);
  parallels(0, 350, 80, 5, 5, 6);
}

function parallels(x, y, numLines, lineThickness, lineHeight, lineSpacing) {
  for (let i = 0; i < numLines; i++) {
    noStroke();
    let lineFill = map(i, 0, numLines, 0, 255);
    fill(lineFill);
    rectMode(CENTER);
    rect(x, y, lineThickness, lineHeight);
    x = x + lineSpacing;
  }
}
```

---

# }
