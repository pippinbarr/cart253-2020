# Interacting objects {

---

## In this module...

- Our aquarium
- Adding a shark
- Eating fish

---

## Our aquarium

Just to start on the same page, here is a `Fish.js` and `script.js` for the purposes of this lesson. Two fish that move randomly around on the canvas:

`Fish.js`
```javascript
class Fish {

  constructor(x, y, size, color, speed, nervousness) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fill = color;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.nervousness = nervousness;
  }

  move() {
    if (random() < this.nervousness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

`script.js`
```javascript
"use strict";

let fish;
let fish2;

function setup() {
  createCanvas(500, 500);

  fish = new Fish(100, 250, 100, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1);

  fish2 = new Fish(100, 250, 50, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01);

}

function draw() {
  background(0);

  fish.move();
  fish2.move();

  fish.display();
  fish2.display();
}
```

---

## Adding a shark

What is we wanted to add a shark to this little aquarium simulation? How about a user-controlled shark (using the mouse) that could __eat__ the fish when they overlap.

This is an important example because we will need to solve the question of __how two objects interact__ (a shark and a fish in this case), which is something we commonly need to do in Object-Oriented Programming.

What would "eating" mean? Perhaps the shark could get __bigger__ each time it eats some of a fish, and the fish could get __smaller__. If a fish gets __too small__ it could be considered __dead__.

Perhaps we could also make the shark get smaller over time, so it needs to eat the fish in order to live! If it gets too small, it dies.

Let's break this down into a set of tasks

1. Define a `Shark` class that is similar to the `Fish` class, except movement is controlled by the mouse and it shrinks each frame until it dies when it's too small
2. Add a new `Shark` to our main script and call its methods
3. Add the idea of eating to this new situation

---

## Starting with a `Shark`

### Create the file `Shark.js` and add a `script` tag for it

First of all we want a `Shark` class, so we need to create `Shark.js` first of all.

Then we should immediately __add it to our `index.html` so our main program can use it__.

### Planning the `Shark` class

For now we want our Shark to have

1. A `constructor` that should
  - to set its size and color with parameters
  - set defaults for position, minimum size, and rate of shrinking
  - have an `alive` property that starts as `true` so we can track whether it's still alive
2. A `shrink()` method to shrink the `Shark` every frame and to check if it has died
3. A `move()` method to position the `Shark` at the mouse position
4. A `display()` method to display the `Shark`

Now that the `Shark` can __die__ it also makes sense to just ignore `shrink()`, `move()` and `display()` instructions if it's already dead, so we'll do that too.

### Defining the `Shark` class

The `Shark` will be similar in various ways to a `Fish`, with important differences marked with comments below...

`Shark.js`
```javascript
class Shark {

  constructor(size, color) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.shrinkRate = 0.1; // How much smaller we get each frame
    this.fill = color;
    this.alive = true; // The Shark starts out alive!
  }

  // shrink() causes the shark to get smaller over time
  shrink() {
    // Don't bother to shrink if we're already dead
    if (!this.alive) {
      // By using return on its own we just exit the function here
      // without executing any of the instructions below. Useful trick.
      return;
    }

    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  move() {
    // Don't bother to move if we're already dead
    if (!this.alive) {
      return;
    }

    // Move to the mouse position
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    // Don't bother to display if we're already dead
    if (!this.alive) {
      return;
    }

    // Display as an ellipse at the current position
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

## Add a `Shark` to our main program

In our main script we want to

1. Declare a `shark` variable
2. Create a `new` `Shark` and put it in the variable
3. Call the shark's `shrink()`, `move()` and `display()` methods

`script.js`
```javascript
"use strict";

let fish;
let fish2;

let shark; // NEW: Our shark variable

function setup() {
  createCanvas(500, 500);

  fish = new Fish(100, 250, 100, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1);

  fish2 = new Fish(100, 250, 50, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01);

  // NEW! We construct a new shark (it's grey-blue)
  shark = new Shark(0, 0, 100, {
    r: 100,
    g: 100,
    b: 120
  });

}

function draw() {
  background(0);

  // NEW! We want to call the shrink() method every frame
  shark.shrink();

  fish.move();
  fish2.move();
  // NEW! We want to move the shark!
  shark.move();

  fish.display();
  fish2.display();
  // NEW! We want to display the shark!
  shark.display();
}
```

Phew! Already quite a lot of code, but now we have our desperate shrinking shark. Tragically, because the shark can't actually eat anything, it just withers and dies. So sad! So very much a metaphor for how real life feels sometimes!

---

## Let them eat `Fish`!

We want our `Shark` to be able to eat `Fish`. To do so we need three things

1. We need to check if the shark overlaps a fish (either of the two in the program)
2. If it does the shark should get a bit bigger
3. And the fish should get a little smaller (potentially dying in the process)

### Update the `Shark` class to handle eating fish...

This is where our key problem of dealing with a moment where __two objects needs to communicate__ in order to accomplish something. __Both__ the shark and the fish are implicated in the act of eating, so __where__ should the eating take place? In the main script? In the shark? In the fish?

There are different ways to think about this, but let's say that because the `Shark` is the __active__ part of this, it should be the one to handle the majority of the eating.

It will check if it's overlapping a fish (provided as a parameter), and then it will handle getting bigger and telling the fish to get smaller.

`Shark.js`
```javascript
class Shark {

  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.shrinkRate = 0.1; // How much smaller we get each frame
    this.fill = color;
    this.alive = true; // The Shark starts out alive!
  }

  shrink() {
    // Don't bother to shrink if we're already dead
    if (!this.alive) {
      // By using return on its own we just exit the function here
      // without doing anything below
      return;
    }

    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  move() {
    // Don't bother to move if we're already dead
    if (!this.alive) {
      return;
    }

    // Move to the mouse position
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    // Don't bother to display if we're already dead
    if (!this.alive) {
      return;
    }

    // Display as an ellipse at the current position
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // NEW!
  // Our method for checking if the shark is eating a fish
  checkEating(fish) {
    // Don't bother checking if we're dead or the fish is dead or both!
    if (!this.alive || !fish.alive) {
      return;
    }

    // Calculate the distance between this shark and the fish
    let d = dist(this.x, this.y, fish.x, fish.y);
    // Check if we overlap the fish
    if (d < this.size / 2 + fish.size / 2) {
      // If we do, we should grow, so we call our OWN grow() method
      this.grow();
      // And the fish should handle being bitten with its own method called bitten()
      // which we will need to add shortly
      fish.bitten();
      // We do this because we don't want the Shark class meddling directly with the properties
      // of the fish like "size" and "alive" for example. The best practice is only to call the
      // METHODS of another class, not to directly change properties.
    }
  }

  // NEW!
  // Our method for getting bigger (when we eat a fish)
  grow() {
    // Get bigger.
    this.size = this.size + 1;
    // That 1 should probably be a property called something like biteAmount
  }

}
```

The most important observations here are as follows (echoing the comments above):

1. The `Shark` class is the more active in handling the question of eating because it's the one that can actually check whether the shark is eating a fish (with `checkEating()`).
2. The `Shark` class __does not directly change the fish's properties__ when it overlaps, instead it calls a __method__ on the fish so that the `Fish` class can deal with being eaten. This is considered best practice.

### Update the `Fish` class to handle being eaten

As above, because the fish should deal with what it means to get bitten, we will need to add a `bitten()` method to our `Fish`. This can shrink the fish and also check if it has died if it gets too small.

Because we now have the idea of the fish being alive or dead, we also need to improve our fish by checking whether it's `alive` (with a property) and only running its updating functions (`move()`, `draw()`) if it is.

`Fish.js`
```javascript
class Fish {

  constructor(x, y, size, color, speed, nervousness) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.minSize = 20; // NEW! The minimum size before a fish is considered dead
    this.fill = color;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.nervousness = nervousness;
    this.alive = true; // NEW: Whether this fish is alive or not
  }

  // NEW! The bitten() function handles being bitten by the shark
  bitten() {
    // Get smaller
    this.size = this.size - 1;
    // That 1 should probably be a property
    // Check if we are too small
    if (this.size < this.minSize) {
      // If we're too small, we're dead
      this.alive = false;
    }
  }

  move() {
    // NEW! Don't move if we're dead!
    if (!this.alive) {
      return;
    }

    if (random() < this.nervousness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    // NEW! Don't display if we're dead!
    if (!this.alive) {
      return;
    }

    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

### Use `checkEating()` in the main script

And, finally, we need to add our `checkEating()` method call into the main script so that the `shark` checks if it's eating either fish...

`script.js`
```javascript
"use strict";

let fish;
let fish2;
let shark;

function setup() {
  createCanvas(500, 500);

  fish = new Fish(100, 250, 100, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1);

  fish2 = new Fish(100, 250, 50, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01);

  shark = new Shark(0, 0, 100, {
    r: 100,
    g: 100,
    b: 120
  });

}

function draw() {
  background(0);

  shark.shrink();

  fish.move();
  fish2.move();
  shark.move();

  // NEW! Check if the shark is eating either of the two fish
  shark.checkEating(fish);
  shark.checkEating(fish2);

  fish.display();
  fish2.display();
  shark.display();
}
```

### We made it!

That was quite a lot of work, but we now have quite a sophisticated framework for two different kinds of objects interacting with each other! And we can now see the general outline for how two objects can communicate (most importantly, through their __methods__).

We could improve this new version of our simulation in all kinds of ways, of course, such as

- Adding more parameters to our constructors to make our `Fish` and `Shark` classes more customizable when they're created
- Adding the idea of a variable "bite amount" when the shark bites a fish instead of it always being the same amount
- Adding the idea of the shark getting slower as it gets fatter
- Adding the idea of a fish getting slower after being bitten
- Adding the idea of the fish avoiding the shark (another example of the objects interacting)
- And on and on

With the basic structure we have here, all of the above is possible!


---

## Summary

- We often find we need two objects to interact/communicate with one another (like when the shark tries to eat a fish, or when a fish needs to flee from the shark)
- The most important rule is to do this through __methods__ rather than directly changing properties of an object from a different object (e.g. the shark shouldn't change the properties of a fish, and vice versa)
- In fact, in a perfect we shouldn't even __check__ the properties of another object directly, but this is much more tedious to avoid

---

# }
