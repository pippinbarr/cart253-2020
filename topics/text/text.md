# Text {

---

## In this module...

- Strings
- Text functions

---

## Strings

Before we look at __displaying__ text in a p5 program, we should first talk about how we __represent__ text as a kind of value.

In JavaScript we call any text a __string__, and we signal that some text is a string using __quotation marks__. So, if we wanted to store some text in a variable, we would store it as a string in one of these three ways...

```javascript
let hamlet1 = "To be or not to be."; // A string with double quotes

let hamlet2 = 'That is the question.'; // A string with single quotes

let hamlet3 = `Whether 'tis nobler in the mind...`; // A "template string", using back ticks
```

Each of these stores the text inside the quote marks as a __string__ in the variable it is assigned to.

---

## Which quotes?

How do you choose which quote marks you use?

### Double quotes, `"..."`

Double-quotes are very common, perhaps the most common. Their only real weakness is if you need to write some __double quotes__ inside the string! If we try the obvious way...

```
let string = "She said, "I do not agree at all."";
```

We run into trouble. The double quotes that start the quote __inside__ our string make JavaScript thing we are __ending__ the overall string. We can avoid this specific problem by putting a backslash in front of any double quotes we want to be part of the string

```javascript
let string = "She said, \"I don't agree at all.\"";
```

Now the string works as intended. This use of a backslash is called "escaping".

If we specifically need double quotes, we could also just use...

### Single quotes, `'...'`

Single quotes are common too. And they do let you write double quotes inside your string...

```javascript
let string = 'She said, "I do not agree at all."';
```

But they have their own weakness. Which is that now we run into trouble if we try to use a __single quote__ inside our string...

```
let string = 'She said, "I don't agree at all."';
```

We can again fix this with escaping

```javascript
let string = 'She said, "I don\'t agree at all."';
```

### Template strings

If we use back tick characters for quotes, we can use both double and single quotes at will...

```javascript
let string = `She said, "I don't agree at all."`;
```

The only thing we'd have trouble with is a back tick character, which of course we don't write very often!

Template strings can also include the values of variables by placing the variable name inside `${...}`...

```javascript
let name = `Hamlet`;
let title = `Prince`;
let country = `Denmark`;
let string = `Hi, my name is ${name}, ${title} of ${country}!`; // "Hi, my name is Hamlet, Prince of Denmark!"
```

Compare this to achieving the same effects with double quotes:

```javascript
let name = "Hamlet";
let title = "Prince";
let country = "Denmark";
let string = "Hi, my name is " + name + ", " + title + " of " + country + "!"; // "Hi, my name is Hamlet, Prince of Denmark!"
```

So template strings are __very__ useful. They are the way to go almost all the time.

---

## Linebreaks

It's often the case that you want to store some text that should be on multiple lines, something like:

```
To be or not to be
That is the question.
```

You could create __two__ strings, one for each line, but you can also include a linebreak in a string. There are two ways:

### `\n`

If you include `\n` in a string, it signifies a linebreak. The text will have a new line (hence `\n`) inserted at that point whenever it's displayed.

```javascript
let speech = `To be or not to be\nThat is the question.`;
```

Alternatively, if you're using a __template string__ you can just put the linebreak in the string itself! (Another neat feature.)

```javascript
let speech = `To be or not to be
That is the question.`;
```

---

## Displaying strings

Now that we know that text is represented in JavaScript as a __string__, let's look at the function for displaying text on the canvas in p5, `text()`. We provide `text()` with __three arguments__: the text to display, and the x and y position to display it:

```javascript
function setup() {
  createCanvas(500,500);
}

function draw() {
  background(127);
  rect(250,250,10,10);
  text(`Hello, World!`,250,250);
}
```

We see the text appear on the canvas at `250,250`, and we also learn a few things about the defaults! There is
- A default font (some kind of sans-serif)
- A default font size (not very big!)
- A default fill color (black)
- A default alignment (the text is aligned with it's bottom left corner at the position specified)

---

## Typography

We can control the various qualities of our text with various functions! For details see the [Typography](https://p5js.org/reference/#group-Typography) category of the reference (as well as `fill()` and `stroke()` to control those elements).

By way of example:

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);

  // Typography-specific functions
  textAlign(CENTER, CENTER);
  textSize(64);
  textStyle(BOLD);

  // Color and line functions
  fill(200, 100, 200);
  stroke(0);
  strokeWeight(2);

  // This text is purple with a 2 pixel black outline, size 64 pixels, bold, and centered at 250,250
  text(`Hello, World!`, 250, 250);
}
```

---

## Animated typography

Since various arguments for text-related functions are just numbers, we can of course use variables to play around with them!

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);

  textAlign(CENTER, CENTER);
  // Make the font size respond to the mouse
  let size = map(mouseX, 0, width, 12, 128);
  textSize(size);
  textStyle(BOLD);

  // Make the fill respond to the mouse
  let red = map(mouseX, 0, width, 100, 200);
  let green = map(mouseY, 0, height, 100, 200);
  let blue = map(mouseX + mouseY, 0, width + height, 100, 200);
  fill(red, green, blue);

  // Make the stroke color respond to the mouse
  let strokeShade = map(mouseX, 0, width, 0, 255);
  stroke(strokeShade);

  // Make the stroke weight respond to the mouse
  let weight = map(mouseY, 0, height, 0, 40);
  strokeWeight(weight);

  text(`Hello, World!`, 250, 250);
}
```

---

## Summary

- We represent text in JavaScript by using __strings__
- There are different ways of writing strings with different quote marks
- We should prefer __template strings__ which use back tick characters
- We can easily insert variable values into template strings with `${...}`
- We use `text()` to display text in p5
- There are various functions to control the appearance and alignment of the text we display

---

# }
