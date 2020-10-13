# Introducing variables {

---

## `draw()`

We haven't used it yet, but underneath the `setup()` function in our template project is the function called `draw()`:

```javascript
function setup() {

}

function draw() {

}
```

We know that the instructions in `setup()` are executed once, right when our program starts. Well, the code in `draw()` is executed __over and over again__, once per frame of animation. The default animation speed is 60 frames per second.

Normally, we actually put most of our code inside `draw()`, because it's the dynamic and active part of our program. `setup()` is generally reserved for, well, setting things up at the start.

So, if we were to actually draw something in our `draw()`, we might do something like this...

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  // Make the background red
  background(255,0,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(250,250,100,100);
}
```

But when we actually run this code, we find that it looks completely static. Why?

Because nothing is __changing__. The program executes the instructions inside `draw()` over and over again, but that just means that it paints the background red and draws the square over and over. Which always looks the same!

---

## Enter the variable...

The main way that things change in a program is through the use of __variables__. A __variable__ is a way to give a name to some piece of data inside our program. For now, we can think of them as storing __numbers__ inside them, since that's what we've been using everywhere.

p5 actually has a number of these variables __built in__ already. That is, it has __names__ for specific numbers that could be useful for you to use in your code.

---

## mouseX and mouseY

Perhaps the most fun built-in variables are called `mouseX` and `mouseY`. These are the __names__ in p5 for the __numbers__ that tell you the current x and y coordinates of the user's mouse.

As the user moves their mouse around over the screen, the numbers inside `mouseX` and `mouseY` __change__ to reflect that.

So, knowing that `mouseX` and `mouseY` are special names for the two numbers that give location of the mouse, we can __use__ those variables in our code instead of numbers. The most obvious thing would be to replace the x and y position of a shape with the variables.

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  // Make the background red
  background(255,0,0);
  // Draw a square at the mouse position
  rectMode(CENTER);
  rect(mouseX,mouseY,100,100); // Using the variables for the position!
}
```

If we run this program, we see something amazing. The rectangle moves around with our mouse cursor!

---

## What is happening?

All we did was replace the x and y position of the rectangle, which used to be numbers, with the variable names `mouseX` and `mouseY`. Because `draw()` is executing its code __every frame__, and because `mouseX` and `mouseY` change their value based on where the mouse cursor really is, the rectangle is being drawn in __difference places__ each time the `draw()` function is called.

---

## No `background()`

Try removing the `background()` instruction in the previous code, to get the following:

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  // Draw a square at the mouse position
  rectMode(CENTER);
  rect(mouseX,mouseY,100,100); // Using the variables for the position!
}
```

Now, because each new frame is being drawn __without__ painting over the background, we see __all the previous rectangles__ that were drawn in previous frames. It leads to a kind of painting program!

__Note:__ While this is a cool effect, it's usually pretty inconvenient to not use `background()` at the start of the `draw()` function, so you'll probably find you won't do this all that often. Still, play around!

---

## Just numbers

One really interesting thing to think about when you're programming is that if a variable has a number in it, you can use that variable __anywhere__ you would use a number.

Even though `mouseX` and `mouseY` contain numbers that __mean__ something (the position of the mouse cursor), that doesn't mean we always have to use them to control the position of something.

What if we used them for the dimensions of the rectangle instead?

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  background(255,0,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(250,250,mouseX,mouseY); // Using the variables for the dimensions!
}
```

Now the rectangle is being __resized__ based on the mouse position! The closer the mouse is to the top-left corner, the smaller the rectangle is because `mouseX` and `mouseY` approach `0`. The close it is to the bottom-right, the larger the rectangle is, because `mouseX` and `mouseY` get bigger!

We can apply this idea to any of the numbers in a program, although of course it may not always make sense.

What about controlling the color of the background with those variables?

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  // Set the background color based on the mouse position
  background(mouseX,mouseY,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(250,250,100,100);
}
```

Now when we move the mouse, the background changes color! The closer the mouse is to the top-left, the close the color is to black because `mouseX` and `mouseY` approach `0`. As the mouse moves to the right and down, `mouseX` and `mouseY` get larger, and the background takes on different colors.

Notice how the effect stops when the `mouseX` gets bigger than `255` pixels and `mouseY` gets bigger than `255` pixels. Why? Because `255` is the maximum value a color can be, once you go higher there's no more change.

---

## Variables are amazing

So variables like `mouseX` and `mouseY` do two very important things:

1. They give a __name__ and therefore a __meaning__ to a number in our program. (In the case of `mouseX` and `mouseY` they give a name to the position of the mouse cursor.)
2. If the number in a variable __changes__ then whatever we were doing with the variable in our program __changes too__. (Such as the position of a shape, or its dimensions, or a color.)

---

## Other built-in variables in p5

While `mouseX` and `mouseY` are probably the most exciting and immediately fun built-in variables in p5, there are a couple more that are worth knowing.

### `width` and `height`

The variable `width` always contains the width of the canvas (as it was set in `createCanvas()` or just the default of `100`). The variable `height` contains the height of the canvas.

This is useful because we might want to write programs that work relative to the width and height, even if it changes at some point. For example:

```javascript
function setup() {  
  createCanvas(500,500);
}

function draw() {
  background(255,0,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(width/2,height/2,100,100); // We're dividing the width and height by two to find the center
}
```

Here we position our rectangle in the center by setting its x coordinate to the `width` (which is `500`) divided by `2` and its y coordinate to the `height` (which is `500`) divided by `2`.

Now if we __change__ the canvas size, the rectangle will still be centered:

```javascript
function setup() {  
  createCanvas(640,640);
}

function draw() {
  background(255,0,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(width/2,height/2,100,100); // Still centered!
}
```

This is because in this new program, `width` now contains `640` and `height` now contains `640`, just like we set it up in `createCanvas()`.

### `windowWidth` and `windowHeight`

The variable `windowWidth` always contains the width of the usable area inside the browser window, and `windowHeight` contains the height of that area. This is useful if we want our program to take up the whole window, because we can use the variables as arguments for `createCanvas()`.

```javascript
function setup() {  
  // Canvas is the size of the window
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(255,0,0);
  // Draw a square in the centre of the canvas
  rectMode(CENTER);
  rect(width/2,height/2,100,100);
}
```

Now our program will always start up at the same size as the browser window. Try resizing the browser window and then reloading the page.

Notice how the canvas always takes up precisely the dimensions of the window (thanks to `windowWidth` and `windowHeight`), and how the rectangle is always in the center (thanks to `width` and `height`);

---

## Food for thought

We've suddenly gone from writing programs that run their code once and then completely stop (by just using `setup()`) to writing programs that __exist over time__ (by using `draw()`).

Now we need to think about the code in our program not as something __static__, but as something __dynamic__. This introduces so many possibilities! (And so many problems!) In a way, now we need to look at a page full of code and __see time__, we need to __feel time__ in relation to our lines of code.

It's a whole new ballgame!

---

## Summary
We saw that if we write instructions in the `draw()` function they are executed __every frame__ of animation (roughly 60 frames per second). This gives rise to the possibility of programs that __change over time__.

To achieve this change, we have also seen the basic and powerful idea behind __variables__. They give __names__ to numbers (and other values, as we will see later). This:

- Makes code __easier to read__ because we see variable names instead of numbers
- Makes code __dynamic__ because the numbers in a variable can change how the program behaves over time

p5's built-in variables like `mouseX` and `mouseY` give us quick and easy access to some of the most important numbers in our program.

---

# }
