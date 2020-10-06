# Object-Oriented Programming and p5 events {

---

## In this module...

- Our aquarium
- p5 Events
- Clickable fish?


- __TMI?__ Keyboard controlled fish?

---

## Our aquarium

Just to start on the same page, here is a `Fish.js` and `script.js` for the purposes of this lesson:

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

## p5 Events

As we know, and important part of programming with p5 is the ability to __respond to events__. We do this by defining __event handler functions__ that p5 already knows about like `mousePressed()` and `keyPressed()`.

Now that we're defining __classes__, how will they know about the p5 events we might want them to handle.

What if we wanted to be able to __click__ a fish in order to make it bigger? (Maybe a bit like we're feeding it.)

---

## An event handler in our class?

In our dreams we could just add a __method__ (function) to our class called `mousePressed()` and p5 would automatically see this and make sure the method gets called when the mouse is pressed down.

`Fish.js`
```javascript
mousePressed() {
  // Calculate the distance between this fish and the mouse
  let d = dist(this.x,this.y,mouseX,mouseY);
  // Check if the distance is less that this fish's radius
  if (d < this.size/2) {
    // If it is, this fish was clicked, so increase its size
    this.size = this.size + 5;
  }
}
```

But this doesn't work on its own. Sadly, p5 __doesn't__ automatically check this kind of thing for us. The __only__ time p5 will automatically call a `mousePressed()` function is if it's defined in our main script.

---

## Connecting our event handler

Fortunately, we can __connect__ the event handler in the main script (which will be automatically called) to our event handler in the class (which we have to call ourselves)!

It's actually fairly simple, we __define__ our `mousePressed()` function in the main script and then __call__ the `mousePressed()` method on all the `Fish` objects that need to respond to a mouse click!

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

// NEW!
// Defining the mousePressed() function that p5 will automatically call
function mousePressed() {
  // Call the specific Fish mousePressed() method for our two fish!
  fish.mousePressed();
  fish2.mousePressed();
}
```

Hey presto! Now when we click __either__ fish, it gets bigger! This is because p5 calls our `mousePressed()` function in the main script, and then that function called the `mousePressed()` method in the `Fish` class for our two fish!

This is the basic approach to handling events in our classes. We define a __method__ in our class that will be an event handler for that class (like `mousePressed()` or `keyPressed()` or `mouseDragged()` or anything else) and then __call__ that method from within the actual event handler in the main script.

---

## Summary

- Classes can handle p5 events
- We need to define an event handler __method__ in the class
- We need to __call__ the event handler method in the class from the event handler function in the main script

---

## TMI?

### Keyboard-controlled fish?

What if we wanted to be able to create a `Fish` that the user can move around with the keyboard? It's (quite a lot) more complex, but we can do it!

The easiest approach would be to have a __property__ called `userControls` in our `Fish` that can be set with our constructor. This property should be set to
- `false` if the user cannot control the fish (it should just move randomly)
- an object with properties listing the specific keys if the user can control the fish!

It would look like this:

`Fish.js`
```javascript
class Fish {

  constructor(x, y, size, color, speed, nervousness, userControls) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fill = color;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.nervousness = nervousness;
    // Save the user controls parameter
    // It will either be
    // - false if there are no user controls and the fish should move randomly
    // - an object containing the keyboard controls to use
    this.userControls = userControls;
  }

  move() {
    // If this.userControls contains an OBJECT it will be "true"
    if (this.userControls) {
      // We call other methods within the same class using "this" as well
      this.userMove();
    } else {
      this.randomMove();
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Constrain position
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  userMove() {
    // Check which keys are pressed and move in the matching direction...

    if (keyIsDown(this.userControls.left)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.userControls.right)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    if (keyIsDown(this.userControls.up)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.userControls.down)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // This is the same as before, just moved to a new function
  randomMove() {
    if (random() < this.nervousness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
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

  // The first fish is not user controlled so we put false for the userControls argument
  fish = new Fish(100, 250, 100, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1, false);

  // The second fish is user controlled so we put a JavaScript object with the different
  // key codes for the controls as properties in the userControls argument
  fish2 = new Fish(100, 250, 50, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01, {
    left: LEFT_ARROW,
    right: RIGHT_ARROW,
    up: UP_ARROW,
    down: DOWN_ARROW
  });

}

function draw() {
  background(0);

  fish.move();
  fish2.move();

  fish.display();
  fish2.display();
}
```

Note we can create multiple keyboard controls easily this way. If we wanted `fish` to respond to the WASD keys...

```javascript
fish = new Fish(100, 250, 100, {
  r: 220,
  g: 200,
  b: 0
}, 10, 0.1, {
  left: 65, // A
  right: 68, // D
  up: 87, // W
  down: 83 // S
});
```

---

# }
