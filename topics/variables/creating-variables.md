# Creating variables {

---

## In this module

- Numbers suck
- Creating variables
- Variable rules

---

## Numbers suck

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  ellipse(250,250,300,300);
  ellipse(200,200,50,50);
  ellipse(300,200,50,50);
  ellipse(250,300,100,100);
}
```

Technically, this code draws a little horrified face, but it would be very hard to tell just by looking at it. Which of these ellipses is the head, for instance?

When we type a number directly into our code as an argument for a function (among other things) we sometimes call this "hardcoding" the number.

__Hardcoded numbers are a huge pain to edit and are mostly meaningless to look at in code__

We can partly solve this issue by using __comments__ to explain the code, but we're still left starting at a wall of numbers that aren't easy to look at.

---

## Variables are the solution!

We've already seen variables like `mouseX` and `mouseY` are built into p5 for us. These are so helpful because they give a __name__ to a particular number in our program (the x and y position of the mouse in this case.)

And so, a huge part of programming is about __creating our own variables__ in order to give __names__ to the values in our program (for now, this is generally numbers).

To work with variables there are three main ideas:

- __Declare__ the variable.

Before we can do anything with a variable, we have to tell JavaScript to create it. This is called declaring the variable.

- __Assign__ to the variable. This is the step where we put a value into the variable.

In order for the variable to be useful, it needs to store a value that makes sense. `mouseX` magically contains the x coordinate of the mouse, but for our own variables we will need to put the values in ourselves.

- __Use__ the variable.

Once we have our variable with its value, we can proceed to use it in our program whenever we need to, just like we use `mouseX` and `mouseY`.

---

## A humble circle

To look at these steps, consider this simple program

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  ellipse(250,250,100);
}
```

So we have a circle in the center of the canvas against a black background.

Let's make a variable that will contain the __size__ of the circle.

### Step 1. Declare the variable

The first thing is to tell JavaScript we want it to create our new variable. To do this, we write:

```javascript
let circleSize;
```

The first thing we write is the special word `let`. This tells JavaScript we are about to __create a new variable__. (It's a bit like "Let There Be Light!"). Note that when you look at code online, some of the time you will see variables declared using the special word `var` instead of `let`. In this class we __always use `let`__, so adjust accordingly.

The second thing we write is the __variable name__, `circleSize`. We get to make this up! We will talk about some of the rules and best practice for these names later on. For now, just notice that the name of our variable should reflect what it is for: `circleSize` will store the __circle__'s __size__.

We can declare variable in different places, but for now let's always declare them at the __top__ of our program, __before__ all the functions, like this:

```javascript
let circleSize;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  ellipse(250,250,100);
}
```

This program doesn't do anything because a) we haven't put a value in `circleSize` and b) we don't use `circleSize` in the program.

### Step 2. Assign a value

For `circleSize` to be useful, we need to store a value in it. We know that the circle's size is `100` by looking at the code, so how do we get the `100` into `circleSize`? Like this:

```javascript
circleSize = 100;
```

This is called a __variable assignment statement__. We are telling JavaScript to put the value `100` into our variable `circleSize`.

First we write the __name__ of the variable, `circleSize`.

Next we write an equals sign, `=`, which is called the __assignment operator__. It tells JavaScript we will be putting a value into the variable we just wrote the name of.

Next we write the __value__ to put in the variable, `100`.

Finally, we write a semicolon, `;`, to end the instruction.

From this point on, `circleSize` contains the value `100` unless we change it.

Given that we are currently just setting up `circleSize`, a sensible place to put this assignment statement would be in `setup()`:

```javascript
let circleSize;

function setup() {
  createCanvas(500,500);
  circleSize = 100;
}

function draw() {
  background(0);
  ellipse(250,250,100);
}
```

However, we can also combine the __declaration__ and __assignment__ into one line if we wish to, and that is often cleaner:

```javascript
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  ellipse(250,250,100);
}
```

### Step 3. Use the variable

For our variable to be of any help at all, we need to actually use it in our program! We know from using other variables that we can just substitute the name `circleSize` for the value it contains (`100`).

We could technically use it anywhere there's a number, but it makes the most sense to use it in the `ellipse()` function call in place of the `100` that sets its size.

```javascript
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  ellipse(250,250,circleSize);
}
```

The program hasn't changed at all in its behaviour, but it __has__ become a little bit more readable!

---

## All variables, all the time

The dream scenario is that we have __no numbers written in our program unless they are being assigned to variables__. In practice, this can be hard to remember to do, but it's very much something to aim for.

If we were to use variables for all of our circle's qualities, we might have something like this...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
}
```

The program still runs in __exactly the same way__, but now it is being drawn entirely with variables.

Now, even without comments we can easily read the code in `draw()` and see which argument for the `ellipse()` is for what purpose.

---

## Variable naming rules

There are a set of rules for variable names. Some of them are enforced by JavaScript and some of them are "just" best practice, but you should follow __all of them__.

A variable name:

- Must __explain__ what the variable is for (the nature of the value it contains)

`circleX` is good, `higgleSlig` is not. (It is meaningless.)

- Must include __no spaces__

`circleX` is good, `circle x coordinate` is not. (It includes spaces.)

- Must be __unique__ (you can't name two variables the same thing or use a variable name that's already taken by p5 like `mouseX` or `height`)

`circleSize` is good, `width` is not. (It uses a name already used by p5.)

- Must not be a __reserved word__ in JavaScript (such as `let`, `function`, `const`, `class`)

`ticketClass` is good, `class` is not. (It uses a reserved word in JavaScript.)

- Must only consist of __letters, digits, underscores, and dollar signs__

`circleX` is good, `ç!®çl€X` is not. (It contains illegal symbols.)

- Must only __begin with a letter, a $ or a \___. (But unless you have a __really good reason__, just don't use the $ or _ symbols in your variable names.)

`twelthOfMay` is good, `12thOfMay` is not. (It starts with a number.)

- Is __case sensitive__ (`y` and `Y` are different variables)

`circleX` and `circlex` would be different variables.

- Must use __camel case__: if there are multiple words in the name, the __first word is lowercase__ and the __remaining words start with a capital__ to make it easier to read

`circleSize` uses camel case, `circlesize` does not.

---

## Example variable names

### Yes!

```javascript
let age = 30;
let pi = 3.14159;
let myLuckyNumber = 7;
```

### No!

See if you can figure out what's wrong with the following variable names before reading the answers below...

```
let foo = 30;
let what'sMyScore? = 10;
let 314159 = 3.14159;
let let = 1;
let the_number_1 = 2;
```

---

## Why not?

- `foo` is a meaningless name for a variable
- `what'sMyScore?` has an apostrophe and question-mark in it, which are illegal symbols
- `314159` starts with a number
- `let` is reserved by JavaScript
- `the_number_1` doesn't use camel case

That last "no" is technically a different __style__ of writing variables. If you have a really serious reason for wanting to us a different style, ask if it's okay. Otherwise, just stick with camel case.

---

## What is there when there isn't anything there?

When we separate out variable declaration from variable assignment, something funny can happen. We might __forget to assign a value to a variable__. For instance:

```javascript
// Declare the variables
let backgroundShade;
let circleX;
let circleY;
let circleSize;

function setup() {
  createCanvas(500,500);
  // Initialize the variables
  backgroundShade = 0;
  circleX = 250;
  circleY = 250;
  // Oops, I forgot to assign a value to circleSize...
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
}
```

When we run this program... the circle doesn't appear! Why? Because it __has no size__ - there's nothing in `circleSize` to tell it how big to be, so it just doesn't get drawn.

This is a __bad thing__ to have happen especially because it doesn't count as an official error to JavaScript. If you look in your JavaScript console, there is no error message and it's as though the program is "fine" even though you know it isn't.

For this reason, it's always important to __make sure__ you assign values to your variables. One way is to always start them off with a default value, even if you'll change them later on.

__Insider information:__ you might think that if you don't assign a value the default will be something like `0`, but if you were to check what's inside `circleSize` in the above example, you would find that it is a value called `undefined`. A pretty good name for the situation: the value is undefined. JavaScript stores the value `undefined` in all variables before they are assigned a value. You can even assign undefined on purpose if you want to!

```javascript
let donaldTrumpsJawline = undefined; // Too mean?
```

---

## Summmary

- We __declare__ values with `let` and __assign__ them values with `=`
- We need to name our variables carefully and correctly
- Variables allow us to understand code significantly better __just because of their names__
- They also can be used in multiple places to keep our code consistent
- Variables without values assigned to them contain a special value called `undefined`


---

# }
