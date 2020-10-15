# Interacting objects {

---

## In this module...

- Our garden
- Dying flowers
- Adding a bee

---

## Our garden

Just to start on the same page, here is a `Flower.js` and `script.js` for the purposes of this lesson. Again, it's a garden of flowers:

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

## Dying flowers

Let's create a problem for our garden, which is that the flowers die. We'll represent this by having their petals shrink over time. They will vanish when any part of them gets too small. (We could also change colors etc., but let's keep this at least a little simple.)

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
    this.alive = true; // NEW! Track whether this flower is alive
  }

  // NEW! shrink()
  // Shrinks the flower
  shrink() {
    // Choose a random amount to shrink
    let shrinkage = random(0, 0.1);
    // Reduce the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness - shrinkage / 10;
    // Reduce the centre of the flower
    this.size = this.size - shrinkage;

    // If any of the key properties reach 0 or less, the flower is dead
    if (this.petalThickness <= 0 || this.size <= 0) {
      this.alive = false;
    }
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
    // NEW! Check if this flower is alive before updating it
    if (flower.alive) {
      // Update the flower by shrinking it and displaying it
      flower.shrink(); // NEW! Shrink living flowers every frame
      flower.display();
    }
  }
}
```

The key addition here is the `shrink()` method in the `Flower` class that handles gradually reducing the size of a flower. It's designed to be called once per frame, so it takes a very small amount off the flower's key size properties and checks if they reach `0`. We've added an `alive` property to the flower and we set that to `false` if it shrinks too much.

In the main script we make sure to call `shrink()` on all the flowers. We also only bother to update a flower with `shrink()` and `display()` if it's still alive!

---

## Adding a bee

Now our garden is sad and dying! :(

We need some bees to come and cheer things up a bit. We'll create a __new__ class that defines a `Bee` that can fly around at random on the canvas. When it overlaps a flower it will cause the flower to grow again to some maximum size. We'll call this "pollinating" just to have a word for this magical bee action. (Yes, I know that's not how bees work, but let's just go with it.)

This is an important example because we will need to solve the question of __how two objects interact__ (a bee and a flower in this case), which is something we commonly need to do in Object-Oriented Programming.

Perhaps we could also make bees get smaller over time, so they also need to pollinate the flower (and collect nectar) in order to live! If a bee gets too small, it dies. It's a tough ol' world.

Let's break this down into a set of tasks

1. Define a `Bee` class that just represents a bee flying around
2. Add an array of bees to our main script and call their methods in `draw()`
3. Add the idea of pollinating to this new situation

---

## Starting with a `Bee`

### Create the file `Bee.js` and add a `script` tag for it

First of all we want a `Bee` class, so we need to create `Bee.js` first of all.

Then we should immediately __add it to our `index.html` so our main program can use it__.

### Planning the `Bee` class

For now we want our Bee to have

1. A `constructor` that should
  - Set the bee's position according to parameters
  - Set the bee's other properties (size, velocity, speed, jitteriness, rate of shrinking)
  - have an `alive` property that starts as `true` so we can track whether it's still alive
2. A `shrink()` method to shrink the `Bee` every frame and to check if it has died
3. A `move()` method to change the `Bee`'s position based on velocity and jitteriness
4. A `display()` method to display the `Bee`

### Defining the `Bee` class

`Bee.js`
```javascript
class Bee {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.shrinkRate = 0.05; // How much smaller we get each frame
    this.jitteriness = 0.1; // How likely the bee is to change direction
    this.alive = true; // The Bee starts out alive!
  }

  // shrink() causes the bee to get smaller over time
  shrink() {
    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  // move() moves the bee by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our bee onto the canvas
  display() {
    push();
    // Wings on either side
    fill(255, 255, 255);
    noStroke();
    ellipse(this.x - this.size / 2, this.y, this.size / 2);
    ellipse(this.x + this.size / 2, this.y, this.size / 2);
    pop();

    // Body
    push();
    fill(225, 225, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

    // Eyes
    push();
    fill(0, 0, 0);
    noStroke();
    ellipse(this.x - this.size / 10, this.y, this.size / 10);
    ellipse(this.x + this.size / 10, this.y, this.size / 10);
    pop();
  }
}
```

## Add a `Bee` to our main program

In our main script we want to

1. Add a `bees` property to our `garden` that will store an array
2. Create `new` `Bee` objects and store them in the array
3. Call each bee's `shrink()`, `move()` and `display()` methods

`script.js`
```javascript
"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 20,
  // An array to our the bees
  bees: [],
  // How many bees in the garden
  numBees: 5,
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

  // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
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
    // Check if this flower is alive
    if (flower.alive) {
      // Update the flower by shrinking it and displaying it
      flower.shrink();
      flower.display();
    }
  }

  // Loop through all the bees in the array and display them
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this bee is alive
    if (bee.alive) {
      // Update the bee by shrinking, moving and displaying it
      bee.shrink();
      bee.move();
      bee.display();
    }
  }
}
```

Phew! Already quite a lot of code, but now we have our desperate shrinking bees. Tragically, because the bees can't actually eat anything, they just wither and die alongside our shrinking flowers. So sad! So very much a metaphor for how real life feels sometimes!

---

## Let the the pollination begin!

We want our bees to be able to pollinate flowers so that both they and the flowers can grow and not die. We'll need two things:

1. We need to check if any bee overlaps any flower (in which case pollination can occur)
2. If we get an overlap the bee and the flower should get a bit bigger (pollination result)

### Update the `Bee` class to handle pollinating flowers...

This is where our key problem of dealing with a moment where __two objects needs to communicate__ in order to accomplish something. __Both__ the bee and the flower are implicated in the act of pollination, so __where__ should the code for this go? In the main script? In the bee? In the flower?

There are different ways to think about this, but because the `Bee` is the __active__ part of this, the __pollinator__, it should be the one to handle the majority of the task.

To attempt to pollinate a flower, a bee will check if it's overlapping the flower (provided as a parameter), and then it will handle getting bigger and telling the flower to get bigger too.

`Bee.js`
```javascript
class Bee {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.maxSize = 40; // We can't get bigger than this
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.shrinkRate = 0.05; // How much smaller we get each frame
    this.jitteriness = 0.1; // How likely the bee is to change direction
    this.alive = true; // The Bee starts out alive!
  }

  // shrink() causes the bee to get smaller over time
  shrink() {
    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  // tryToPollinate() attempts to pollinate the flower provided as a parameter
  // If pollination succeeds (the two overlap) then both grow
  tryToPollinate(flower) {
    // Calculate the distance between the bee and the flower
    let d = dist(this.x, this.y, flower.x, flower.y);
    // If they overlap...
    if (d < this.size / 2 + flower.size / 2) {
      // The bee should grow
      // Notice how we can call OTHER METHODS of the Bee by using "this"
      // So this.grow() calls the grow() method for THIS bee
      this.grow();
      // The flower should react to being pollinated so we call its method
      // that handles that!
      flower.pollinate();
    }
  }

  // grow() causes the bee to get bigger up to a maximum (called by tryToPollinate())
  grow() {
    // Grow by increasing the size by a set amount
    this.size = this.size + this.growRate;
    // Constrain the growth to a maximum
    this.size = constrain(this.size, 0, this.maxSize);
  }

  // move() moves the bee by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our bee onto the canvas
  display() {
    push();
    // Wings on either side
    fill(255, 255, 255);
    noStroke();
    ellipse(this.x - this.size / 2, this.y, this.size / 2);
    ellipse(this.x + this.size / 2, this.y, this.size / 2);
    pop();

    // Body
    push();
    fill(225, 225, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

    // Eyes
    push();
    fill(0, 0, 0);
    noStroke();
    ellipse(this.x - this.size / 10, this.y, this.size / 10);
    ellipse(this.x + this.size / 10, this.y, this.size / 10);
    pop();
  }
}
```

The most important observations here are as follows (echoing the comments above):

1. The `Bee` class is the more active in handling the question of pollination because it's the one that can actually check whether the bee is pollinating a flower (with `tryToPollinate()`).
2. The `Bee` class __does not directly change the flower's properties__ when it overlaps, instead it calls a __method__ on the flower so that the `Flower` class can deal with being pollinated (`pollinate()`). This is considered best practice.
3. In the `Bee` class's methods, we can call __other__ methods in the same class by using `this`, e.g. `this.grow()`.

### Update the `Flower` class to handle being pollinated

As above, because the flower should deal with what it means to get pollinated, we will need to add a `pollinate()` method to our `Flower`. This can grow the flower in this case.


`Flower.js`
```javascript
class Flower {

  // The constructor() sets up a flower's properties
  constructor(x, y, size, stemLength, petalColor) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size; // NEW! To limit growth
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    this.maxPetalThickness = 10; // NEW! To limit growth
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
    this.alive = true;
  }

  // shrink()
  // Shrinks the flower
  shrink() {
    // Choose a random amount to shrink
    let shrinkage = random(0, 0.1);
    // Reduce the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness - shrinkage / 10;
    // Reduce the centre of the flower
    this.size = this.size - shrinkage;

    // If any of the key properties reach 0 or less, the flower is dead
    if (this.petalThickness <= 0 || this.size <= 0) {
      this.alive = false;
    }
  }

  // NEW! pollinate() handles the flower being pollinated (it grows)
  pollinate() {
    // Choose a random amount to grow
    let growth = random(0, 0.5);
    // Increase the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness + growth / 10;
    // Increase the centre of the flower
    this.size = this.size + growth;

    // Constrain the elements
    this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
    this.size = constrain(this.size, 0, this.maxSize);
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

### Use `tryToPollinate()` in the main script

And, finally, we need to add our `tryToPollinate()` method call into the main script so that every bee checks every flower and tries to pollinate it (based on overlap).

Because we're talking about __every__ bee checking __every__ flower, we actually need __another__ `for`-loop inside our `for`-loop dealing with our bees.

That is, for each bee we deal with in our `draw()` function `for`-loop, we will need another (nested) `for`-loop to check all the flowers to see if the current bee can pollinate them.

`script.js`
```javascript
"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 20,
  // An array to our the bees
  bees: [],
  // How many bees in the garden
  numBees: 5,
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

  // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
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
    // Check if this flower is alive
    if (flower.alive) {
      // Update the flower by shrinking it and displaying it
      flower.shrink();
      flower.display();
    }
  }

  // Loop through all the bees in the array and display them
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this flower is alive
    if (bee.alive) {
      // Shrink and move the bee
      bee.shrink();
      bee.move();

      // NEW! Go through the entire flower array and try to pollinate the flowers!
      // Note that we use j in our for-loop here because we're already inside
      // a for-loop using i!
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }

      // Display the bee
      bee.display();
    }
  }

}
```

---

## We made it!


We have the start of an __ecosystem simulation__.

You'll probably notice that the bees and flowers tend to die out with the values used in the examples above.

That's because the mechanics of our simulation along with the properties of the simulation, such as the number of bees, number of flowers, starting size of both, speed of the bees, how much flowers and bees shrink and grow.

In fact this is already quite complex! There are a __lot__ of factors contributing to whether this ecosystem can thrive or not. Balancing a system like this is not trivial and depends both on us understanding the relevant factors and on experimenting with values.

If, for example we have __many__ flowers and __many__ bees (try 200 of each!) then everyone's pretty happy because there's a positive cycle. Bees and flowers work together to grow, so if there's just a lot of both then they can support each other without worrying about the bees moving away from the flowers and dying, nor worrying about a flower not having a bee to look after it.

Finding a more realistic-looking balance would require much more tweaking! We would probably also want to include code to have bees sense flowers and move toward them, for instance.

The possibilities are endless!

---

## Summary

- We often find we need two objects to interact/communicate with one another (like when a bee tries to pollinate a flower)
- The most important rule is to do this through __methods__ rather than directly changing properties of an object from a different object (e.g. the bee shouldn't change the properties of a flower, and vice versa)
- In fact, in a perfect program we shouldn't even __check__ the properties of another object directly, we should use methods, but this is much more tedious and we won't worry about it
- We now have quite a sophisticated framework for two different kinds of objects interacting with each other! Through it, we can now see the general outline for how two objects can communicate (most importantly, through their __methods__)
- We also saw specifically how two __arrays__ of objects can interact with each other, which is often very useful

---

# }
