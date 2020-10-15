# Object-Oriented Programming and p5 events {

---

## In this module...

- A garden
- p5 Events
- Clickable flowers?

---

## Our Garden

Just to start on the same page, here is a `Flower.js` and `script.js` for the purposes of this discussion:

`Flower.js`
```javascript
class Flower {
  // The constructor() sets up a flower's properties
  constructor(x, y, size, stemLength, petalColor) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
  }

  // display()
  // Displays the flower on the canvas
  display() {
    push();
    // Set the stroke weight for the petals and the stem
    strokeWeight(this.stemThickness);
    // Draw a line for the stem
    stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Draw a circle with a heavy outline for the flower
    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

`script.js`
```javascript
"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 20,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
}


// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
  }
}
```

---

## p5 Events

As we know, an important part of programming is the ability to __respond to events__. In p5, we do this by defining __event handler functions__ that p5 already knows about like `mousePressed()` and `keyPressed()`.

Now that we're defining __classes__, how will they know about the p5 events we might want them to handle.

What if we wanted to be able to __click__ a flower in order to make it taller? (Maybe a bit like we're helping it grow...)

---

## An event handler in our class?

In our dreams we could just add a __method__ (remember, it's just a kind of function) to our class called `mousePressed()` and p5 would automatically see this and make sure the method gets called when the mouse is pressed down.

`Flower.js`
```javascript
mousePressed() {
  // Calculate the distance between this flower and the mouse
  let d = dist(this.x,this.y,mouseX,mouseY);
  // Check if the distance is less than the head of the flower
  if (d < this.size/2 + this.petalThickness) {
    // If it is, this flower was clicked, so increase its stem length
    this.stemLength = this.stemLength + 5;
    // And also change its y position so it grows upward! (If we didn't do this
    // the then stem would grow downward, which would look weird.)
    this.y = this.y - 5;
  }
}
```

But this doesn't work on its own. Sadly, p5 __doesn't__ automatically check this kind of thing for us. The __only__ time p5 will automatically call a `mousePressed()` function is if it's defined in our __main script__.

---

## Connecting our event handler

Fortunately, we can __connect__ the event handler in the main script (which will be automatically called) to our event handler in the class (which we have to call ourselves)!

It's actually fairly simple, we __define__ our `mousePressed()` function in the main script and then __call__ the `mousePressed()` method on all the flower objects that need to respond to a mouse click! Because they're in an array, we'll use the same `for`-loop we used to display them...

`script.js`
```javascript
"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 20,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
}


// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
  }
}

// NEW! mousePressed() calls the equivalent mousePressed() method on every flower
function mousePressed() {
  // Loop through every flower in the garden
  for (let i = 0; i < garden.flowers.length; i++) {
    // Get the current flower in the loop
    let flower = garden.flowers[i];
    // Call the flower's mousePressed() method
    flower.mousePressed();
  }
}
```

Hey presto! Now when we click __any__ flower, it gets taller! Our beautiful garden is growing! This is because p5 automatically calls our `mousePressed()` function in the main script, and then in that function definition we manually call the `mousePressed()` method for every flower in the array.

This is the basic approach to handling events in our classes. We define a __method__ in our class that will be an event handler for objects in that class (like `mousePressed()` or `keyPressed()` or `mouseDragged()` or anything else) and then __call__ that method from within the actual event handler in the main script.

---

## Summary

- Classes can handle p5 events
- We need to define an event handler __method__ in the class
- We need to __call__ the event handler method in the class from the event handler function in the main script

---

# }
