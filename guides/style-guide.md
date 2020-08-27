# Style Guide

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
