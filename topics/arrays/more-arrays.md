# More arrays {

---

## In this module...

- The nature of arrays
- A fortune teller
- A speech
- A trail
- Singing dogs
- Loading many images and displaying one


- TMI: Removing fish from an aquarium

---

## The nature of arrays

We've seen that arrays are a very powerful way to store related values together in one place. We also know that arrays store their elements __in order__ according to their __index__. So the first element is at index `0`, the second is at position `1` and so on.

The fact that arrays store a group of elements in order allows us to use them in (at least) three key ways:

### Working with an entire collection of elements

We can treat the array as __place to store related elements__ that we want to deal with all at the same time (by using `for`-loops).

For example, if we have a bunch of fish and we want to group them together because they all need to move and be displayed, we can store them in an array to do that.

Also, because arrays allow us to add elements with `push()` we can also treat this collection of related elements dynamically, adding elements when we need to.

### Choosing random elements from an array

An array allows us to store a collection of elements, but rather than dealing with them __all__ we might find we want to just __pick one randomly__ from that collection.

For example, if our array contains a list of prizes we could use it to pick out a random prize to give to the user when they open a loot box.

### Working with the elements in an array sequentially

We can also leverage the fact that an array stores its elements __in order__ to deal with situations where it makes sense to care about an ordering of values.

For example, if we want to display a series of texts that represent a character speaking to the user, we can store the sequence in an array and access them in order when we display them.

---

## A fortune teller

Let's make a really simple fortune teller. The user clicks the canvas and gets a fortune chosen randomly from our array of fortunes. The fortunes will just be strings of text.

To do this, we can rely on the fact that the `random()` function from p5 can actually give us back a __random element from an array__ if we provide the array as an argument. Very handy.

Additionally, rather than starting with an empty array and putting our fortunes into it one by one in `setup()` we'll actually __initalize__ the array with the fortunes in it from the beginning...

```javascript
"use strict";

// Our array of fortunes, each of which is a string
// Note that we still use square brackets around the array,
// but now we list the elements the array should start with
// separated by commas.
// As here, we can put each element on a separate line for clarity.
let fortunes = [
  `It's not looking great.`,
  `You will trip over an apple today.`,
  `Beware of over-friendly cats.`,
  `Bank error in your favor, collect $200.`,
  `Start your Korean skincare regime.`,
  `You will feel better than 20 years ago.`,
  `David Lynch will call you on your birthday.`,
  `Happiness is just around the corner.`,
  `You will make it look easy today.`,
  `Your future is cloudy.`
];

// We need a variable to store the chosen fortune so we can
// display it in draw()
let chosenFortune = `I am looking into your soul...`;

// setup() gets basic styling ready
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
}

// draw() displays the current fortune
function draw() {
  background(0);
  text(chosenFortune, width / 2, height / 2);
}

// mousePressed() chooses a random fortune from the fortunes array
function mousePressed() {
  // By passing the fortunes array as an argument to random() we get back
  // a RANDOM ELEMENT in the array (one of the fortune strings) which we
  // can then store in the chosenFortune variable for displaying
  chosenFortune = random(fortunes);
}
```

---

## A speech

Sticking with the idea of text, let's create a speech in which we display the strings in an array __in order__ to the user.

To do this we will need a way to switch from one element in the array (a line of the speech) to the next, for which we'll just use a `mousePressed()` function.

We will also need to keep track of __which index we are currently using in the array__ for the current line of dialog, which we do with a variable called `currentLine`.

Because clicking over and over would eventually get to the __end__ of the array, we will also need to make sure we don't keep increasing the index we're looking at __past__ the end of the array, which would cause an error, so we'll need an `if`-statement for that.

```javascript
"use strict";

// Our array of lines from one of Hamlet's soliloquys (a sequence
// where he essentially talks to himself). We will want to display
// each line one after the other as the user clicks.
let soliloquy = [
  `To be, or not to be`,
  `That is the question.`,
  `Whether 'tis nobler in the mind`,
  `To suffer the slings and arrows`,
  `Of outrageous fortune`,
  `Or to take arms`,
  `Against a sea of sorrows`,
  `And by opposing end them.`
];

// We need a variable to store the current line we want to display
// It should start at ZERO because that's the first index in the array
let currentLine = 0;

// setup() gets basic styling ready
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
}

// draw() displays the current line
function draw() {
  background(0);
  // Get the element in the array at the CURRENT index (starts at 0 and goes up)
  let dialog = soliloquy[currentLine];
  // Display the string in that element on the canvas
  text(dialog, width / 2, height / 2);
}

// mousePressed() moves to the next line in the soliloquy unless we've reached the end
function mousePressed() {
  // Go to the next line in the soliloquy
  currentLine = currentLine + 1;
  // Check if we've reached the LENGTH of the array
  // If we have, we've gone past the end because we started counting at 0
  // The LENGTH of our array is 8, but the final element is at index 7
  if (currentLine === soliloquy.length) {
    // If we've gone past the end, go back one to the last real element
    currentLine = soliloquy.length - 1;
  }
}
```

---

## A trail

This idea of using the sequential nature of an array can be used for visual ideas like having a __trail__ behind a moving element on the screen.

We could place a circle at our mouse location, and then display a sequence of circles trailing behind it at previous mouse positions as we move the mouse.

To do this we would need to __store the mouse position in an array__ each frame and draw circles at all the positions in the array in `draw()`.

```javascript
"use strict";

let circle = {
  x: 0,
  y: 0,
  size: 100,
  trail: [] // Note that we are creating an EMPTY TRAIL ARRAY as a PROPERTY of the circle
}

// setup() the canvas ready
function setup() {
  createCanvas(600, 600);
}

// draw() draws a circle with a trails
function draw() {
  background(0);

  // Use a for loop to go through each element in the circle's trail array in order
  for (let i = 0; i < circle.trail.length; i++) {
    // Get the element at the index indicated by i (0, then 1, then 2, etc.)
    let element = circle.trail[i];
    // Draw an ellipse the same size as the circle at that position
    ellipse(element.x, element.y, circle.size);
  }

  // Move the circle to the mouse position
  circle.x = mouseX;
  circle.y = mouseY;

  // Draw the circle
  ellipse(circle.x, circle.y, circle.size);

  // Create a new position object that stores where the circle is now
  // which we can add to the trail to trace the path of the circle
  let newTrailPosition = {
    x: circle.x,
    y: circle.y
  };
  // Add the position to the circle's trail array
  circle.trail.push(newTrailPosition);
}
```

This is neat because it allows us to recreate the effect of not including a `background()` function call in our `draw()` loop! The array stores all the previous positions of our circle and we can draw them each frame of `draw()`.

## A limited trail

You might well not want an __infinite__ trail of circles behind your mouse circle, so how would you __limit__ them?

This requires us to set a limit on the number of circles in a property of our circle. Let's call it `maxTrail` and set it to `10`.

We will also need to __remove__ positions from our trail array when it gets too long. In particular we want to remove the __oldest__ position (the back of the trail) when it gets too long.

`push()` adds new elements to the __end__ of an array, which is how we're adding positions to our trail over time.

To __remove__ something from the __start__ of an array (to get rid of old positions), we will use `shift()`.

```javascript
"use strict";

let circle = {
  x: 0,
  y: 0,
  size: 100,
  trail: [],
  maxTrail: 10 // NEW! Maximum number of positions in the trail array
}

// setup() the canvas ready
function setup() {
  createCanvas(600, 600);
}

// draw() draws a circle with a trails
function draw() {
  background(0);

  // Use a for loop to go through each element in the circle's trail array in order
  for (let i = 0; i < circle.trail.length; i++) {
    // Get the element at the index indicated by i (0, then 1, then 2, etc.)
    let element = circle.trail[i];
    // Draw an ellipse the same size as the circle at that position
    ellipse(element.x, element.y, circle.size);
  }

  // Move the circle to the mouse position
  circle.x = mouseX;
  circle.y = mouseY;

  // Draw the circle
  ellipse(circle.x, circle.y, circle.size);

  // Create a new position object that stores where the circle is now
  // which we can add to the trail to trace the path of the circle
  let newTrailPosition = {
    x: circle.x,
    y: circle.y
  };
  // Add the position to the circle's trail array
  circle.trail.push(newTrailPosition);

  // NEW! Check if the trail's length has exceeded the maximum
  if (circle.trail.length > circle.maxTrail) {
    // If it has, remove the oldest element (the one at the START of the array)
    circle.trail.shift();
  }
}
```

---

## Singing dogs

Going back to the idea of storing values in an array we want to randomly select, we could repeat the idea for __sound__ instead of text. In particular, we could make a "singing dogs program" by storing a set of specific playback rates (which affect pitch) in an array, and using them with our barking dog soundfile to create different "notes"...

This relies on using the [`rate()`](https://p5js.org/reference/#/p5.SoundFile/rate) that is part of the p5.sound library.

```javascript
"use strict";

// An array of different playback rates to use with our dog bark
// 1 means normal rate, greater than one increases the speed and pitch
// So 3 is three times faster with a correspondingly higher pitch.
let rates = [1.5, 1.75, 2.25, 2.5, 2.75, 3];

// Our sound effect
let barkSFX;

// preload() loads the barking sound effect
function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

// setup() the canvas ready
function setup() {
  createCanvas(600, 600);
}

// draw() does nothing much
function draw() {
  background(0);
}

// mousePressed() plays a dog bark at a randomly chosen rate
function mousePressed() {
  // Choose a random rate from the array
  let barkRate = random(rates);
  // Set the barking sound effect to that rate
  barkSFX.rate(barkRate);
  // Play the barking sound effect
  barkSFX.play();
}
```

---

## Loading many images and choosing one

Continuing with our theme of random selection, let's do the same with __images__. We'll store a series of images in our array, and then choose one to actually display.

It's not unlike the fortune teller from earlier, except with images instead of strings.

```javascript
"use strict";

// An array to store our images
let images = [];
// A variable to store the image we want to display
let displayImage;

// preload() loads 10 images
function preload() {
  images[0] = loadImage(`assets/images/clown-0.png`);
  images[1] = loadImage(`assets/images/clown-1.png`);
  images[2] = loadImage(`assets/images/clown-2.png`);
  images[3] = loadImage(`assets/images/clown-3.png`);
  images[4] = loadImage(`assets/images/clown-4.png`);
  images[5] = loadImage(`assets/images/clown-5.png`);
  images[6] = loadImage(`assets/images/clown-6.png`);
  images[7] = loadImage(`assets/images/clown-7.png`);
  images[8] = loadImage(`assets/images/clown-8.png`);
  images[9] = loadImage(`assets/images/clown-9.png`);
}

// setup() selects the image to display randomly
function setup() {
  createCanvas(600, 600);
  // Choose an image to display randomly from the array
  displayImage = random(images);
}

// draw() displays the randomly chosen image
function draw() {
  background(0);
  // Display the randomly selected image
  imageMode(CENTER);
  image(displayImage, width / 2, height / 2);
}
```

Great, that works! A different clown every time (if you have the images `clown-0.png` to `clown-9.png`).

---

## Loading files with a `for`-loop

We can actually do something that makes our loading process much better. Once again, we need to notice that the filenames have been carefully chosen here. They're all __identical__ except for the different __number__ used. Those numbers go from `0` to `9` __consecutively__.

Does that perhaps remind you of a `for`-loop that typically counts from `0` up to a set number?

It should. Let's use a `for`-loop to do this, including a variable stating how many images to load.

```javascript
"use strict";

// An array to store our images
let images = [];
// A variable storing the number of images to load
let numImages = 10;
// A variable to store the image we want to display
let displayImage;

// preload() loads 10 images
function preload() {
  // Use a for loop to count from 0 up to 9
  for (let i = 0; i < numImages; i++) {
    // Load the image into a variable
    // Note that we use i to specify the number in the filename!
    // Note how nice this is with a template literal string
    let loadedImage = loadImage(`assets/images/clown-${i}.png`);
    // Add the loaded image to the images array
    images.push(loadedImage);
  }
}

// setup() selects the image to display randomly
function setup() {
  createCanvas(600, 600);
  // Choose an image to display randomly from the array
  displayImage = random(images);
}

// draw() displays the randomly chosen image
function draw() {
  background(0);
  // Display the randomly selected image
  imageMode(CENTER);
  image(displayImage, width / 2, height / 2);
}
```

---

## Summary

- Arrays are very, very powerful in programming
- They allow us to collect related elements into one place
- We can access them "all at once" with a `for`-loop
- We can access them randomly with `random()`
- We can access them sequentially by keeping track of which index we're currently using

---

## TMI?

### Removing a fish from an aquarium

What if we had an aquarium of fish swimming around, each one represented by a JavaScript Object in an array. What if we wanted to be able to __click on a fish and remove it__?

We would need to:
1. detect which fish was clicked in the first place (by comparing the mouse position with all the fish positions)
2. remove the fish from the array (remembering it could be at any index!)

Here's how we would do that by using the following `mousePressed()` function...

```javascript
// mousePressed() checks whether a fish in the school was clicked
// and removes it if so
function mousePressed() {
  // Use a for loop to examine every fish in the school one by one
  for (let i = 0; i < school.length; i++) {
    // Store the current fish in the fish variable
    let fish = school[i];
    // Calculate the distance between the mouse position and the fish
    let d = dist(mouseX, mouseY, fish.x, fish.y);
    // If the distance means the mouse was clicked inside the fish
    if (d < fish.size / 2) {
      // Remove the fish using the splice() function which takes two arguments
      // - The index to start remove elements from (i in our case)
      // - The number of elements to remove from that position (just one for us)
      school.splice(i, 1);
      // Now that we've found our fish to remove, we don't want to continue
      // going through the loop, so we end it prematurely with break
      // This forces the for-loop to stop immediately
      break;
    }
  }
}
```

---

# }
