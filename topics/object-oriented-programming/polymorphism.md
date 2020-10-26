# Polymorphism {

---

## In this module...

- What is polymorphism?
- The traffic classes
- Using polymorphism
- Polymorphism and arrays

---

## What is polymorphism?

In Object-Oriented Programming, **polymorphism** refers to the idea that any class that extends a  superclass can be **used as if it *is* that superclass**. Specifically, we can assume that it has the **properties** and **methods** of the superclass. Because, well, it does.

This can be very useful. It'll make more sense if we have an example.

---

## Our traffic simulation

Let's return to the idea of traffic and our three classes `Vehicle`, `Car` and `Motorcycle`. Here they are:

`Vehicle.js`
```javascript
class Vehicle {
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

  // display() draws a rectangle at the vehicle's position
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
    fill(255, 0, 0);
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
    fill(255, 255, 0);
    super.display();
    pop();
  }
}
```

`index.html`
```html
<!-- My script(s) -->
<script src="js/Car.js"></script>
<script src="js/Motorcycle.js"></script>
<script src="js/script.js"></script>
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

An observation here is that in `draw()` we call `move()`, `wrap()`, and `display()` on each `Car` in the `cars` array. And we **also** call `move()`, `wrap()`, and `display()` on each `Motorcycle` in the `motorcycles` array.

Importantly, we know that `move()`, `wrap()` and `display()` are defined by the `Vehicle` class. That's why `Car` and `Motorcycle` **both** have those methods defined.

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

If we had many more kinds of vehicles, like trucks, bicycles, skateboards, and more, this would be even more efficient!

That's the beauty of polymorphism! Once we have multiple subclasses that **extend** one superclass, we can often **use** those subclasses based on the **superclass** methods, allowing us not to worry about which specific subclass any one object is from.

---

## Summary

So, that's **polymorphism**!

In a nutshell, we can use a **superclass**' methods and properties when working with its **subclasses** and this will often allow us to write more efficient programs.

It tends to be particularly useful in simulations, where we often want to work with groups of objects that share methods and properties from a superclass.

---

# }
