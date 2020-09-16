# Conditionals {

---

## In this module

- Computers making decisions
- The `if`-statement
- Relational operators
- Examples

---

## That predictable old moving circle

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

This moving circle is __great__ in terms of doing some animation with p5 and JavaScript, but it's also very limited. It only does one thing and pays no attention to us or the little world it lives in.

We know we can make surprising things happen by using `random()` to change aspects of the circle, but this is at the other extreme: it's often __too__ out of control.

What we often want is for our programs to __make decisions__ based on what's happening, whether it's based on the user's mouse input, or a keypress, or the position of the circle on the canvas, or something else entirely.

---

## Humans making decisions?

When we humans make decisions based on information about the world, we often are thinking something like this:

> __"If the metro is still broken down in 10 minutes, then I'm going to get off and walk."__

This is made up of two key parts.

First, there's the __condition__ we're thinking about:

> __If the metro is still broken down in 10 minutes...__

This is what we are checking. We stand there on the metro checking whether the metro is running again yet and whether 10 minutes have passed. While this is __false__, we don't need to put our plan into action, but once it is __true__ we will act!

Second, then, there's the __action__ we're going to perform:

> __I'm going to get off and walk.__

This is what we will __do__ when the condition is true.

So to make a decision (and act on it) we generally have the idea of "__If__ some condition is true, __then__ I'm going to perform some action."

---

## Computers making decisions!

You guessed it, computers can make the same kinds of decisions in exactly the same kind of way! And yes, we tell them how to decide using programming.

The __condition__ for a computer is anything that can be __true__ or __false__ (just like for us), but in a computer that is very often something __mathematical__.

Consider our circle. Let's say we want it to jump back to the left side of the screen when it reaches the right side. We can express this as a decision:

__If__ the circle has gone past the right side of the canvas (condition), __then__ move it back to the left side (action).

How can the computer express that specific condition? Well, we need to check if the circle's __x position__ is greater than the __width__ of the canvas, which we can write in maths (with variables) as:

```javascript
circle.x > width
```

This will be __true__ if `circle.x` is greater than `width`, and __false__ otherwise.

---

## An if-statement

In order to combine checking our __condition__ with taking an __action__, we use a new idea in JavaScript: the __if-statement__. For the previous decision, it will look like this:

```javascript
if (circle.x > width) {
  circle.x = 0;
}
```

If the condition in the parenthesis is __true__ (`circle.x` __is__ greater than `width`), then the block of code in the curly brackets will happen (setting `circle.x` back to `0`, which moves it to the left of the canvas).

If the condition in the parentheses is __false__ (`circle.x` is __not__ greater than `width`), then the block of code in the curly brackets will __not__ happen.

Simple as that!

---

## Using the if-statement

Let's put the if statement into our code. We probably want to put it __just after__ we change `circle.x`, so that we can check at that precise moment whether it has gone off the right side.

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

  // If the circle is off the right side
  if (circle.x > width) {
    // Move it back to the left
    circle.x = 0;
  }

  ellipse(circle.x,circle.y,circle.size);
}
```

Eureka! The circle reaches the right side and then jumps back to the left! The program has made a decision! And it keeps working, because the circle moves back to the right again, then jumps back to the left again!

---

## if-statement syntax

```javascript
if (circle.x > width) {
  circle.x = 0;
}
```

So this is our if statement. Let's break it down:

`if`
- First we write the special word `if` which signals we are going to make a decision

`(circle.x > width)`
- Next we write our __condition__ inside __parentheses__
- Those parentheses __have to be there__ or it won't work

`{ ... }`
- Then we have a set of curly brackets to signal the action to take
- The block of code written __inside__ these curly brackets will execute __if the condition is true__

`circle.x = 0;`
- This is our action inside the curly brackets
- It sets the circle's x position back to `0`, which moves it back to the left

The __condition__ can be anything we can think of, and the __action__ code can be as many lines of code as we like.

---

## Other comparisons

In our example, we're using the greater-than (`>`) __relational operator__ to describe our condition. But you will probably not be surprised to know that there are operators for all the other usual comparisons:

```javascript
circle.x > width // Greater than
circle.x < width // Less than
circle.x >= width // Greater than or equal to (note the order of the > and =)
circle.x <= width // Less than or equal to (note the order of the < and =)
circle.x === width // Equality, true if the two numbers are the same (note the use of three ===)
circle.x !== width // Inequality, true if the two numbers are NOT the same
```

Those are our tools for comparing numbers!

---

## Using other comparisons

Let's add a couple more if-statements to our program, using other operators...

```javascript
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  fill: 255 // NEW: A default fill for the circle
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  backgroundShade = backgroundShade + 0.5; // NEW: Increasing the background shade

  // NEW: If the background shade is exactly 255 (white, the maximum color number)
  if (backgroundShade === 255) {
    // Set it back to 0 (black)
    backgroundShade = 0;
  }

  circle.x = circle.x + circle.speed;

  // If the circle is off the right side
  if (circle.x > width) {
    // Move it back to the left
    circle.x = 0;
  }

  // NEW: Use the circle's default fill
  fill(circle.fill);

  // NEW: If the mouse is on the left half of the canvas
  if (mouseX < width / 2) {
    // Use a red fill
    fill(255, 0, 0);
  }

  ellipse(circle.x, circle.y, circle.size);
}
```

Now the program makes many decisions about its little world.

1. The background shade increases (to white) and our first if-statement decides to set it back to black (action) if it reaches exactly 255 (condition)
2. The circle moves from left to right and our second if-statement decides to moves it back to 0 (action) if it moves past the right side (condition)
3. The user moves the mouse and our third if-statement decides to use a red fill (action) if the cursor is in the left-hand side of the canvas (condition)

---

## Summary

- Our programs can make decisions just like us using if-statements
- Our if-statements often compare numbers (often in variables) using standard relational operators
- Using if-statements make our programs much more dynamic, it lets them __react to the world__
- The kinds of things our programs can react to moving forward is amazing (positions of objects, colors, microphone input, the weather, the time, the size of the window, GPS coordinates, and more and more!)

---

## TMI?

### `===`

Earlier on when listing the relational operators we saw that we check equality using `===`, which is __three equals signs__ in a row. A couple of things about this...

#### `=`?

It's easy to forget this and use __one__ `=` instead, but don't forget that one `=` is the __assignment operator__ that we use for storing values in variables. It is __not__ for comparison.

#### `==`?

You will see people using __two__ `==` for comparisons, and this does work, but it is __much better__ to use three `===`.

Using `===` is called __strict equality__ and is almost always what you really want. It guarantees the two things you are comparing are __exactly equal__. This matters more as we start to store different kinds of values in our variables, but it's best to start now.

Using two `==` is called __loose equality__ and it is weirder and can feel more unpredictable. It tries to __convert__ the compared values into a common type of value (e.g. if one is a string of text and one is a number it will convert the text to a number!). This is almost never what you want.

Like, seriously:

```
1 == "1" // true
1 === "1" // false

1 == true // true
1 === true // false
```

---

# }
