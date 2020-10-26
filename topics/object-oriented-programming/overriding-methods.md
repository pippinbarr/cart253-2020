# Overriding methods {

---

## In this module

- Our traffic simulation
- A drunk driver
- Build a better `display()`

## Our traffic simulation

Here are our class files and main script to work with as an example.

`Vehicle.js`
```javascript
class Vehicle {
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    this.width = undefined;
    this.height = undefined;
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  display() {

  }
}
```

`Car.js`
```javascript
class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  display() {
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

`Motorcycle.js`
```javascript
class Motorcycle extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  display() {
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

In `index.html`
```html
<!-- My script(s) -->
<script src="js/Car.js"></script>
<script src="js/Motorcycle.js"></script>
<script src="js/script.js"></script>
```

`script.js`
```javascript
"use strict";

// Our cars
let cars = [];
let numCars = 5;

// Our motorcycles
let motorcycles = [];
let numMotorcycles = 10;

// Set up the canvas and our cars
function setup() {
  createCanvas(600, 600);
  // Create the correct number of cars and put them in our array
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    cars.push(car);
  }

  // Create the correct number of motorcycles and put them in our array
  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    motorcycles.push(motorcycle);
  }
}

// Display and move the cars
function draw() {
  background(0);

  // Go through all the cars and move, wrap, and display them
  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];
    car.move();
    car.wrap();
    car.display();
  }

  // Go through all the motorcycles and move, wrap, and display them
  for (let i = 0; i < motorcycles.length; i++) {
    let motorcycle = motorcycles[i];
    motorcycle.move();
    motorcycle.wrap();
    motorcycle.display();
  }
}
```

## A drunk driver

What if we want to change our `Car` class to have a drunk driver? We could make the car's movement erratic by having it randomly change its `vy` to veer around on the screen. Given it would move on the y-axis, we would also want to update `wrap()` to make sure that cars would also wrap on the `y` axis.

But `Car` doesn't **have** `move()` or `wrap` methods anymore! They're in `Vehicle` now. What should we do?

What we want is to still use the `Vehicle` versions of `move()` and `wrap()` because they're useful! But we want to **add** extra behaviour to those methods so we can make our `Car` behave in a specific (drunken) way.

---

## Overriding methods

To create a more **specific** version of a superclass' methods (like `move()` and `wrap()`) we can **define** those methods in a subclass.

But can also call the **superclass versions** of the methods! This way we don't need to repeat code already in the superclass.

To do this we use the `super` variable. `super` contains a reference to the superclass (`Vehicle` in our case).

So we can define our own versions of `move()` and `wrap()` that can call the superclass versions with `super`, while also adding in extra behaviour!

`Car.js`
```javascript
class Car extends Vehicle {
  // Create a new Car object that moves to the right
  constructor(x, y) {
    super(x, y);
    this.width = 50;
    this.height = 20;
    this.vx = 5;
    this.drunkenness = 0.2;
  }

  // Overriding the superclass' move() method!
  move() {
    // Make the car veer by calling our veer() method
    // This is specific to the Car's version of move()
    // We use "this" to access other methods in THIS class
    this.veer()

    // NEW! Call the superclass (Vehicle) version of move()
    // This will handle adding velocity to position for us
    // We use "super" to access methods in the SUPERclass (Vehicle)
    // So this calls the Vehicle version of move()
    super.move();
  }

  // veer() causes the car to randomly veer on the y axis
  veer() {
    let r = random();
    if (r < this.drunkenness) {
      this.vy = random(-5, 5);
    }
  }

  // Overriding the superclass' wrap() method!
  wrap() {
    // NEW! Call the superclass (Vehicle) version of wrap()
    // This will handle wrapping on the x axis for us.
    // We use "super" to access methods in the SUPERclass (Vehicle)
    // So this calls the Vehicle version of wrap()
    super.wrap();

    // Our Car-specific vertical wrapping code
    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
  }

  // Display the car as a rectangle
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

Lovely! This idea of **overriding** methods from the superclass, but **still calling** the superclass version of those methods is central to writing well-structured object-oriented progras.

---

## Build a better `display()`

We can use this idea of overriding to make a much better version of `display()` too.

The only difference between the `display()` methods in `Car` and `Motorcycle` is that they use a different fill color!

We could move the code that just draws a rectangle at the position into the `Vehicle` class and just set the **color** inside the subclasses `Car` and `Motorcycle`!

Here's the updated `Vehicle`, `Car` and `Motorcycle` classes:

`Vehicle.js`
```javascript
class Vehicle {
  // Create a new Vehicle object
  // Almost exactly as we saw in both Car and Motorcycle!
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    // NOTE: We don't know the dimensions of a generic vehicle
    // so we start them as undefined
    this.width = undefined;
    this.height = undefined;
    // NOTE: We don't know how a generic vehicle will move
    // so we set its velocity to 0
    this.vx = 0;
    this.vy = 0;
  }

  // Move the vehicle according to its velocity
  // Just like we saw in both Car and Motorcycle!
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Wrap the vehicle if it reaches the right edge
  // Just like we saw in both Car and Motorcycle!
  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  // NEW! display() draws a rectangle at the vehicle's position
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    // NOTE: We don't set a fill() because this will be handled in the subclass
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

`Car.js`
```javascript
class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  display() {
    push();
    // NEW! First we set the red fill
    fill(255, 0, 0);
    // NEW! Then we call the superclass's version of display(), which will display
    // a rectangle with the Car's dimensions at the Car's position. Because we set
    // the fill to red before this, the rectangle will be red.
    super.display();
    pop();
  }
}
```


`Motorcycle.js`
```javascript
class Motorcycle extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  display() {
    push();
    // NEW! First we set the fill to yellow
    fill(255, 255, 0);
    // NEW! Then we call the superclass's version of display(), which will display
    // a rectangle with the Motorcycle's dimensions at the Motorcycle's position
    super.display();
    pop();
  }
}
```

**Note**: we could achieve the same kind of idea with a fill property in the `Vehicle` class that we set appropriately in the `Car` and `Motorcycle` constructors.

---

## Summary

- Overriding methods allows us to make more specific versions of them in a subclass
- This is very helpful when we want to have similar but different behaviour in a subclass, because we can include the superclass version of the behaviour, but then add to or change it in the subclass

---

# }
