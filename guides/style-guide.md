# Style Guide

1. [Formatting](#formatting)
2. [Commenting](#commenting)
3. [README.md](#readme-md)
4. [Variables](#variables)
5. [Functions](#functions)
6. [Version control](#version-control)
7. [Attribution](#attribution)]

---

## Formatting

### Use a package

__Use the `prettier-atom` package to format your code automatically!__ It won't do absolutely everything you need, but it will do most of it. In the settings, select "Format Code on Save" so that it happens automatically.

There is another package called `atom-beauty` which you can install and use instead if you prefer it.

### The basic ideas

When programming, it's really important to keep our code nicely formatted. This is most of all so that we can read it easily ourselves, but also so that other people can read it too. This mostly means:

- Using whitespace well (spaces to separate out parts of a line of code, extra space between functions or different chunks of code)
- Indenting your code (making sure a line is indented to match the curly brackets it is within)
- Ending instructions with a semicolon (`;`)

Poorly formatted example:

```javascript
let circle={x:0,y:250,speed:1,size:100}
function setup() {
createCanvas(500,500)}
function draw(){
background(0);
  circle.x=circle.x+circle.speed
    ellipse(circle.x,circle.y,circle.size);




}




function mousePressed() {
         circle.size=circle.size    + 10
}
```

The above example makes many mistakes. For instance:
- The object variable `circle` is all on one line with no whitespace and has no semicolon
- No whitespace between the variable declaration and the `setup()` function
- `createCanvas()` isn't indented and has no semicolon
- The closing `}` for `setup()` is on the same line as `createCanvas()`
- There is no space between the `setup()` function and the `draw()` function
- `background(0)` is not indented correctly
- `circle.x=circle.x+circle.speed` has no semicolon and would be better with spacing
- The `ellipse()` instruction is indented too far
- There is too much whitespace between the `ellipse()` and the closing `}` of `draw()`
- There is too much whitespace between the `draw()` and `mousePressed()` functions
- `circle.size=circle.size    + 10` is indented too far and has inconsistent spacing

A correctly formatted version:

```javascript
let circle = {
  x: 0,
  y: 250,
  speed: 1,
  size: 100
};

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);
  circle.x = circle.x + circle.speed;
  ellipse(circle.x,circle.y,circle.size);
}

function mousePressed() {
  circle.size = circle.size + 10;
}
```

---

## Commenting

We write comments in our code to __explain__ it to ourselves and to others. If your code is still confusing to you or others with comments in it, you need to think about writing better comments!

### Rule: Comment your lines of code

Make sure to write a comment before any block of code that does something cohesive. Your comment should explain what the lines of code after it do, not just literally describe the code. When in doubt, write more comment, not fewer.

The syntax for a comment is to write two forward slashes, `//`, and then the text of your comment.

```javascript
// Draw the face/head
ellipse(250,250,200,200);
// Draw the eyes
ellipse(200,250,20,20);
ellipse(300,250,20,20);
// Draw the mouth
ellipse(250,300,50,50);
```

Some people like to comment next to their lines of code, and this is fine too:

```javascript
ellipse(250,250,200,200); // Draw the face/head
ellipse(200,250,20,20); // Draw the left eye
ellipse(300,250,20,20); // Draw the right eye
ellipse(250,300,50,50); // Draw the mouth
```

### Rule: Comment your functions

Every function in your program (recognizable because they start with `function`) should have a comment above it that explains what the function does. It should also explain any parameters it needs and any values it returns if relevant.

```javascript
// setup()
//
// Draws a simple face on the canvas
function setup() {
  createCanvas(500,500);
  background(0,0,0);
  // Draw the face/head
  ellipse(250,250,200,200);
  // Draw the eyes
  ellipse(200,250,20,20);
  ellipse(300,250,20,20);
  // Draw the mouth
  ellipse(250,300,50,50);
}
```

### Rule: Comment your files

At the top of every JavaScript file (`.js`) you should have a comment that describes the file. This is most important for your main screen (usually `script.js`), which should have a description of your project at the top. Your description should be fairly detailed and give an overview of anything relevant to the project's implementation and purpose.

It is common to use a "multi-line comment" for these kinds of descriptions (and sometimes for functions too), which we write by starting with `/*` and ending with `*/`.

`script.js`:  
```javascript
/***********************
Face drawing machine
Pippin Barr

Draws a face on the canvas
***********************/

function setup() {
  createCanvas(500,500);
  background(0,0,0);
  // Draw the face/head
  ellipse(250,250,200,200);
  // Draw the eyes
  ellipse(200,250,20,20);
  ellipse(300,250,20,20);
  // Draw the mouth
  ellipse(250,300,50,50);
}
```

---

## `README.md`

Any formally submitted project should include a file titled `README.md` in the main project folder. This document should explain your project and should provide any information someone interested in it might need to understand the implementation and also how to interact with it. It should clearly state the title of the project as well as your authorship.

The `README.md` is also a good place for attribution if you are using code and/or media from other sources that you need to credit.

Example:

```
# Aquarium Simulation
## Pippin Barr

This is an aquarium simulation in which fish of different kinds swim around on the canvas. The user can interact with the fish by clicking on them to make them grow (as if feeding them). Over time the fish shrink, so the user will need to keep busy clicking to keep them alive!

The fish images were sourced from the [Creative Commons image "Georgia Aquarium Fish"](https://search.creativecommons.org/photos/96f6f770-eac1-488c-8abb-16bee7bcc874) by Mike Johnston which is licensed with CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/.
```

---

## Variables

### Naming variables

Naming variables involves both __technical__ constraints as well as __style__ rules.

1. Your variable name must clearly __describe__ or __explain__ the value stored in it (`circleX` for your circle's x position, not `flimFlam`, `cX`)
2. You variable name should be written using __camel case__, starting with a lowercase letter and capitalizing each new word (`secretGardenPassword`, not `secretgardenpassword`, not `secret_garden_password`)
3. Variable names can only contain __letters and numbers__ (and `$` and `_`, but avoid them). (`starDensity`, not `*density`, not `%starDenity%`)
4. Variable names must be __unique__. You cannot reuse variable names from your own code or from p5. (`mouseImageX`, not `mouseX` because it is used by p5; `classStatus`, but not `class` because it is a JavaScript reserved word)
5. Variable names are __case sensitive__. (`circleX` is not the same as `circlex`)

### Use JavaScript objects

Whenever you find yourself needed more than one variable that relates to the same "thing" in your code (like a circle you are animating), you should use a JavaScript object instead of individual variables.

```javascript
// Yes!
let circle = {
  x: 0,
  y: 0,
  size: 100,
  speed: 1
};

// No.
let circleX = 0;
let circleY = 0;
let circleSize = 100;
let circleSpeed = 1;
```

---

## Functions

### Naming functions

Naming functions follows the same essential rules as variables.

1. Your function name must clearly __describe__ or __explain__ the purpose of the function (`displayFish()` to display a fish, not `df()`, `fishRay()`)
2. You function name should be written using __camel case__, starting with a lowercase letter and capitalizing each new word (`displayFish()`, now `DisplayFish()`, not `displayfish()`, not `display_fish()`)
3. Function names can only contain __letters and numbers__ (and `$` and `_`, but avoid them). (`displayFish()`, not `displayFish!()`)
4. Function names must be __unique__. You cannot reuse function names from your own code, from p5, or key words from JavaScript. (`displayImage()`, not `image()` because it is used by p5; `create()`, but not `new()` because `new` it is a JavaScript reserved word)
5. Function names are __case sensitive__. (`displayFish()` is not the same as `displayfish()`)

---

## Version control

__Always use version control__ (Git and GitHub) with your programming projects. There is literally never a good reason not to use it.

### Prefixes

Because this class uses one repository for multiple projects, we will always put a __prefix in front of our commit messages__ to indicate which project they are for (e.g. "E1" for exercise 1 or "P2" for project 2).

### Starting a project

When you start a new project make sure to create an __initial commit__ that marks the start of the project (usually when you have just placed some template code in a folder named for the project).

### Commit when you get a meaningful unit of work done

We want to avoid projects where we commit once at the start and once at the end. The idea is to create a __history__ of our project through our commits and their commit messages.

Therefore, each time you get a unit of work done, commit it with a message. This might be getting an image to display correctly on the canvas, making the mouse control a specific element successfully, or getting a sound effect to work.

### Write meaningful commit messages

Your commit messages should be fairly brief, but they should concisely describe exactly what you did since the previous commit. For example. `E2: Got the mouse controls working` or `P1: Now the snake moves according to a sine wave`.

### Don't forget to push

It's important to __push__ your work to the remote server to keep it extra safe. Don't forget. You don't have to push after every commit, but you should certainly push when you're stopping work for a while.

---

## Attribution

### The general idea

Whenever you use code or media from somewhere else you must **attribute** it to give credit, this includes:

- Code/media found online
- Code/media drawn from the course examples
- Code drawn from your own previous work

The general idea is to make it very clear what about your project was "pre-made" versus what it completely new.

To attribute, make sure to include the place you found the code/media and the original author.

### Licenses

Much code and media online comes with a specific **license** (e.g. the Creative Commons) which you must respect. Make sure you read the licensing agreement and follow it.

### Where to attribute

For media, you can attribute

- In your comment at the top of your main program file
- In your `README.md` file in your project folder

For code, you can attribute

- In the location you are **using** the code (this is usually best for specific snippets of code)
- In your comment at the top of your main program file (this may be better if you are using an entire framework of code from somewhere else)
- In your README.md (as above, this is better when using a large amount of pre-existing code)
