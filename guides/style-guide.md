# Style Guide

1. [Commenting](#commenting)
2. [Variables](#variable-naming)

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

At the top of every JavaScript file (`.js`) you should have a comment that describes the file. This is most important for your main screen (usually `script.js`), which should have a description of your project at the top.

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
