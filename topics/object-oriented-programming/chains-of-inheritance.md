# Chains of inheritance {

---

## In this module...

- Extending a class that extends a class
- To infinity and beyond

---

## Extending a class that extends a class

The idea of inheritance unlocks a whole new way of thinking about our programming. We're able to think about **kinds** of things in the world of our program.

A **car** is a kind of **vehicle**. A **motorcycle** is a kind of **vehicle**. And so on.

But... a **sports car** is a kind of **car** that's faster and "cooler"... hmmmm.

Once we start talking about inheritance, it's clear that we don't necessarily stop at one level. We could have a class that extends a class that extends a class!

A `SportCar` would extend a `Car` which would extend a `Vehicle`.

---

## A `Vehicle` class

Here's our simple `Vehicle` class...

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

  // Move the vehicle according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Wrap the vehicle if it reaches the right edge
  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  // Display the vehicle
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

## A `Car` class

Here's a simple `Car` class that extends the `Vehicle` class...

`Car.js`
```javascript
class Car extends Vehicle {
  // Create a new Car object that moves to the right
  constructor(x, y) {
    super(x, y);
    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  // Display the car
  display() {
    push();
    fill(255, 0, 0);
    super.display();
    pop();
  }
}
```

So `Car` is a **subclass** of `Vehicle`.

---

## A `SportsCar` class

Now let's add a specific kind of car, a sports car, that **extends** the standard car class. For simplicity, we'll say that a `SportsCar` is the same as a `Car` but faster and with two racing stripes!

`SportsCar.js`
```javascript
class SportsCar extends Car {
  // Create a new SportsCar object, make it faster than a Car
  constructor(x, y) {
    // Call the super class (Car) constructor
    super(x, y);
    this.vx = 15; // So fast!
  }

  // Display the sports car by first displaying the regular car
  // then added our racing stripes
  display() {
    push();

    // Call the super class (Car) display() method to display the standard
    // car shape (note that this will also call the Vehicle version of display()!)
    super.display();

    // Add our racing stripes!
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 0);
    rect(this.x, this.y - this.height / 10, this.width, this.height / 20)
    rect(this.x, this.y + this.height / 10, this.width, this.height / 20)
    pop();
  }
}
```

Remember that we'll need to add a `<script>` tag to include our new file in the project, making sure it is **after** the `Car.js` tag since this file depends on that one.

`index.html`
```html
<!-- My script(s) -->
<script src="js/Vehicle.js"></script>
<script src="js/Car.js"></script>
<script src="js/SportsCar.js"></script>
<script src="js/script.js"></script>
```

---

## Using both `Car`s and `SportsCar`s...

We can go ahead and use the new class alongside the original `Car` class just as we've seen before. Polymorphism is still our friend here because both `Car` and `SportsCar` objects are `Vehicle` objects. (They're also both `Car` objects!)

`script.js`
```javascript
"use strict";

// Our vehicles
let vehicles = [];
// How many of each kind
let numCars = 5;
let numSportsCars = 5;

// Set up the canvas and our cars
function setup() {
  createCanvas(600, 600);
  // Create the correct number of cars and put them in our vehicles array
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  // Create the correct number of sports cars and put them in our vehicles array
  for (let i = 0; i < numSportsCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let sportscar = new SportsCar(x, y);
    vehicles.push(sportscar);
  }
}

// Display and move the cars
function draw() {
  background(0);

  // Go through all the vehicles (cars and sports cars)
  // and move, wrap, and display them. We can do this because we know
  // that all vehicles have those methods!
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
  }
}
```

Et voilà! We have a chain of inheritance. `SportsCar` extends `Car` which extends `Vehicle`. Thus a `SportsCar` is both a kind of `Car` **and** a kind of `Vehicle`.

We could take this as far as we want! We could have...

A `Testarosa` class
... that extends a `Ferrari` class
... that extends a `SportsCar` class
... that extends a `Car` class
... that extends a `Vehicle` class!

In each class we could specify specific features of **that kind of thing**. And if we have a `Testarosa` object we can treat is as a `Testarosa`, a `Ferrari`, a `SportsCar`, a `Car`, or a `Vehicle`, depending on what we need to do!

---

## Summary

- We can extend classes in a chain, extending classes that extend other classes
- This allows us to create more complicated relationships between classes
- This is great because we can make more and more specific versions of classes as needed for our work

---

# }
