# Polymorphism {

---

## In this module...

- What is polymorphism?
- The traffic classes
- Using polymorphism
- Polymorphism and arrays

---

## What is polymorphism?

In Object-Oriented Programming, **polymorphism** refers to the idea that any class that extends a specific super class can be **used like it is that superclass**. Specifically, we can assume that it has the **properties** and **methods** of the superclass.

This can be very useful. It'll make more sense if we have an example.

---

## Our vehicle classes

Let's return to the idea of traffic and our three classes `Vehicle`, `Car` and `Motorcycle`. Here they are to add to a new program (remember to add them in `index.html!`):

`Vehicle.js`
```javascript
class Vehicle {
  // Create a new Vehicle object
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    // NOTE: We don't know the dimensions of a variable
    // so they start undefined
    this.width = undefined;
    this.height = undefined;
    // NOTE: We don't know how a vehicle will move
    // so we set its velocity to 0
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
    // We will leave this empty because we don't display a generic
    // vehicle! Instead, we leave this up to the subclasses.
  }
}
```

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

  // Make the car veer and then move like a vehicle
  move() {
    this.veer();
    super.move();
  }

  // Make the car veer on the y access randomly
  veer() {
    let r = random();
    if (r < this.drunkenness) {
      this.vy = random(-5, 5);
    }
  }

  // Make the car wrap on x (using Vehicle's wrap()) and also
  // on the y axis
  wrap() {
    super.wrap();

    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
  }

  // Display the car as a rectangle with four wheels
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    // Draw the wheels of the car
    fill(127);
    rect(this.x - this.width / 3, this.y - this.height / 2, this.width / 4, this.height / 2);
    rect(this.x + this.width / 3, this.y - this.height / 2, this.width / 4, this.height / 2);
    rect(this.x - this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2);
    rect(this.x + this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2);
    // Draw the body of the car
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

`Motorcycle.js`
```javascript
class Motorcycle extends Vehicle {
  // Create a new motorcycle object that moves to the right
  constructor(x, y) {
    super(x, y);
    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  // Display the motorcycle as a skinny rectangle
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    // Draw the front and back wheels
    fill(127);
    rect(this.x - this.width / 2, this.y, this.width, this.height / 2);
    rect(this.x + this.width / 2, this.y, this.width, this.height / 2);
    // Draw the body of the motorcycle
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
```

---

## Cars and Motorcycles are Vehicles

Now let's return to our script with cars and motorcycles...

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

An observation here is that all the `Car` objects in the `cars` array call `move()`, `wrap()`, and `display()`. And all the `Motorbike` objects in the `motorcycles` **also** call `move()`, `wrap()`, and `display()`.

Importantly, we know that `move()`, `wrap()` and `display()` are defined by the `Vehicle` class. That's why `Car` and `Motorcycle` **both** have those methods defined. Admittedly `Car` does **more** in `move()` and `wrap()`, but `Vehicle` **guarantees** that they both share those methods.

By calling methods that are defined in `Vehicle` we're essentially treating both cars and motorcycles **as vehicles**. They're just doing things that vehicles can do.

---

## An array of vehicles

The observation that we can treat cars and motorcycles as vehicles means that we could actually put them in the **same** array together. An array of **vehicles**. Let's do that...

### Create the variables

First we'll change our variables so that we've got a single array to contain vehicles (both cars and motorcycles), as well as our existing variables determining how many to create.

`script.js`
```javascript
"use strict";

// Our vehicles
let vehicles = [];
// How many of each kind
let numCars = 5;
let numMotorcycles = 10;
```

### Fill up the array

Now we still need to create the correct number of cars and motorcycles, but this time we'll put them **all into the `vehicles` array**. By the end of `setup()` we'll have `5` cars and `10` motorcycles in the array.

`script.js`
```javascript
// Set up the canvas and our vehicles
function setup() {
  createCanvas(600, 600);
  // Create the correct number of cars and put them in our vehicles array
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  // Create the correct number of motorcycles and put them in our vehicles array
  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }
}
```

### Use the vehicles array in `draw()`

Finally, in `draw()` we can treat our vehicles array just like an array of vehicles and call the appropriate methods on each object...

`script.js`
```javascript
// Display and move the cars
function draw() {
  background(0);

  // Go through all the vehicles (both cars and motorcycles)
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

In going through the array, some vehicles will be **cars** and thus the methods will use the `Car`  definitions, and some vehicles will be **motorcycles** and thus the methods will use the `Motorcycle` definitions.

If we had many more kinds of vehicles, like trucks, cycles, skateboards, and more, this would be even more efficient!

That's the beauty of polymorphism! Once we have multiple subclasses that **extend** one superclass, we can often **use** those subclasses based on the **superclass** methods, allowing us not to worry about which specific subclass any one object is from.

---

## Summary

So, that's **polymorphism**!

In a nutshell, we can use a **superclass**' methods and properties with its **subclasses** and this will often allow us to write more efficient programs.

It tends to be particularly useful in simulations, where we often want to work with groups of objects that share methods and properties from a superclass.

---

# }