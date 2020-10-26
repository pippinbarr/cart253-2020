# Inheritance {

---

## In this module...

- Traffic
- Repetitive classes
- Inheritance

---

## A car

Let's begin by creating a class that represents a car. We'll just focus on the idea of a rectangle that can move in a straight line to the right and will wrap back to the left when it reaches the right edge of the canvas.

Recall that we need to create a new file matching the name of the class, `Car.js` and also add a `<script>` tag to our `index.html` to include it.

`Car.js`
```javascript
class Car {
  // Create a new Car object that moves to the right
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 20;
    this.vx = 5;
    this.vy = 0;
  }

  // Move the car according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Wrap the car if it reaches the right edge
  wrap() {
    if (this.x > width) {
      this.x -= width;
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

In `index.html`
```html
<!-- My script(s) -->
<script src="js/Car.js"></script>
<script src="js/script.js"></script>
```

Let's add some cars in an array to our script so we have some traffic!

`script.js`
```javascript
"use strict";

// Our cars array and its starting length
let cars = [];
let numCars = 5;

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
}
```

Okay! A nice little program! So realistic!

---

## A motorcycle

Let's add a motorcycle class to this simulation! As always, we'll create a new file called `Motorcycle.js` and add it to `index.html`, then update our `script.js` to include motorcycles in the simulation.

`Motorcycle.js`
```javascript
class Motorcycle {
  // Create a new motorcycle object that moves to the right
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 10;
    this.vx = 10;
    this.vy = 0;
  }

  // Move the motorcycle according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Wrap the motorcycle if it reaches the right edge
  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  // Display the motorcycle as a skinny rectangle
  display() {
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

Even better! Now we have both cars and motorcycles racing along.

(We'll ignore any collisions for this simulation as we want to keep it a bit simple.)

---

## Repetitive classes

Ah yes, in our continuing desire to hunt down and eliminate repetitive code we have found another enemy.

The `Car` and `Motorcycle` classes are **really similar**. In particular:

- Their `constructor()` methods are identical except for their velocity and dimensions values
- Their `move()` and `wrap()` methods are completely identical

In most ways, their `display()` method is the only really unique thing about them, although even here they **both** do have a method called `display()`, so that idea is shared too.

---

## The same kind of thing

The `Car` and `Motorcycle` are **the same kind of thing**. They share so many similarities because they are both kinds of **vehicles**.

We can think about our simulation this way:

- A **vehicle** has a position, dimensions, and velocity. It moves to the right and it wraps around the right edge. It can be displayed on the screen.
- A **car** is a **kind of vehicle** that is displayed as a red rectangle and moves at `5` pixels per frame.
- A **motorcycle** is **a kind of vehicle** that is displayed as a yellow rectangle and moves at `10` pixels per frame.

Because of all these shared properties and behaviours, our program would be improved if we could define what a **vehicle** is and then tell our program that both cars and motorcycles are **kinds of vehicles**.

Well, we can with an idea called **inheritance**.

---

## Inheritance

In Object-Oriented Programming, **inheritance** allows us to define a class (such as `Vehicle`) that other classes **inherit** from. That is, we can create a class that handles all of the shared qualities of a vehicle, and then define our car and motorcycle **based on** that class.

The terminology here is:
- The `Vehicle` class is the **superclass** (sometimes called the **parent** class)
- The `Car` and `Motorcycle` classes are the **subclasses** (sometimes called the **child** classes)
- The `Car` and `Motorcycle` classes **extend** the `Vehicle` class so that they can **inherit** all the properties and methods of the `Vehicle` class, along with anything specific of their own

Let's change our program to use this idea.

---

## A `Vehicle`

The first thing we want to do is define a `Vehicle` class that takes care of all the **shared** aspects of the `Car` and `Motorcycle`. We do this in the same way as any other class.

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

  // Display the vehicle
  display() {
    // We will leave this empty because we don't display a generic
    // vehicle! Instead, we leave this up to the subclasses.
  }
}
```

As you can see, the code for our `Vehicle` class is **very** similar to the code for both the `Car` and the `Motorcycle`, but it's **generic**.

The `constructor()` is very similar. It has all the same properties, but doesn't make assumptions about dimensions or velocity because the car and motorcycle differ on those properties.

The `move()` and `wrap()` methods are identical, because those are shared by both kinds of vehicle.

The `display()` method is empty, because cars and motorcycles are displayed differently. It's still worth having the empty `display()` method because it at least tells us that any subclass of the vehicle **should** be able to be displayed. Also, later on there might be something we want to do with displaying for **all** vehicles, in which case we would put it here.

---

## Adding `Vehicle.js` to `index.html`

As with any class, we need to add our `Vehicle.js` file as a `<script>` tag in `index.html`.

An important thing to know is that we need to add it **before** `Car.js` and `Motorcycle.js` because they will be its **subclasses** and therefore need to know about it before they are defined. So the **superclass** (`Vehicle`) is included **first**, followed by the **subclasses** (`Car` and `Motorcycle`).

`index.html`
```html
<!-- My script(s) -->
<script src="js/Vehicle.js"></script>
<script src="js/Car.js"></script>
<script src="js/Motorcycle.js"></script>
<script src="js/script.js"></script>
```

---

## Updating `Car` to **extend** `Vehicle`

Now that we have the definition of a `Vehicle` we can use this to simplify our `Car` class. We want to tell JavaScript that the `Car` is a kind of `Vehicle`, that it should be a **subclass** (or child) of `Vehicle`.

To do this we will add code to `Car`:

1. We will add something to specify that the `Car` class **extends** the `Vehicle` class
2. We will change the `constructor()` to make sure that it calls the `Vehicle` `constructor()` because whenever we create a `Car` we are also creating a `Vehicle`!
3. We will remove methods in `Car` that are no longer needed because they are already defined in `Vehicle`
4. We will still define our `display()` method because the `Vehicle` `display()` method is empty and a `Car` has a specific appearance

`Car.js`
```javascript
// NEW! 1. We show that the Car is a subclass of Vehicle by using the
// key word "extends" and then the name of the class it extends
// Our Car extends the Vehicle class...
class Car extends Vehicle {
  // Create a new Car object that moves to the right
  constructor(x, y) {
    // NEW! 2. We call the Vehicle's constructor() first! Because the Vehicle
    // is the superclass for our Car, we call its constructor super()!
    // So super(x,y) means: call the superclass' constructor with arguments
    // x and y (values passed in as arguments when the Car is created)
    super(x, y);
    // After using the Vehicle's constructor() we need to set
    // the Vehicle properties to the specific values for a Motorcycle
    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  // 3. We don't need to define move() or wrap() because they are already part
  // of the Vehicle class so our Car inherits them

  // 4. We do want to define our display() method because the car
  // has a specific visual appearance: a rectangle with four wheels
  display() {
    // Even though the Vehicle's version of display() does nothing, we should STILL
    // call it. The variable "super" contains a reference to the Vehicle part of this car,
    // so we can call the Vehicle version of the display() method by writing:
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

Phew! Now our `Car` class is a **subclass** of the `Vehicle` class. It has **all the properties** of the `Vehicle` class set when we called the `Vehicle` class' `constructor()`. It has **all the methods** of the `Vehicle` class too (notably `wrap()` and `move()`).

---

## Updating `Motorcycle`

We need to do the exact same thing with `Motorcycle`

`Motorcycle.js`
```javascript
class Motorcycle extends Vehicle {
  // Create a new motorcycle object that moves to the right
  constructor(x, y) {
    // Call the Vehicle's constructor()
    // Remember, it's called super() when we call it from a subclass
    super(x, y);
    // Set our properties to the specific motorcycle values
    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  // Display the motorcycle as a skinny rectangle
  display() {
    // Remember to call the superclass' version of this method!
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

---

## It works!

We don't have to change anything in `script.js` because the program just continues to work!

Now when we create our cars we're still using the `Car` class, but that `Car` class extends (or inherits from) the `Vehicle` class to define its properties and methods. Same thing for the motorcycles.

At no point do we create a `new Vehicle()`! We don't want to create generic "vehicles" because they would have no width and height and nothing in their `display()` method. The `Vehicle` class is only there to collect together code that will be shared by the `Car` and `Motorcycle` classes.

---

## Summary

We've now seen the essential tricks of **inheritance** in JavaScript.

- We can create a class that defines basic properties and methods, designed to be **extended** by other classes (e.g. `Vehicle`). This is a **superclass**.
- We use the `extends` key word in our **subclasses** to establish the relationship with the **superclass** (e.g. `class Car extends Vehicle` means the `Car` class is a **subclass** of the `Vehicle` class, which is its **superclass**)
- In our **subclass**' constructor, we call the **superclass** constructor with `super()` to make sure it sets up the properties correctly
- In our **subclass** we can **override** methods from the **superclass** by defining them
- We can also call the **superclass** version of methods by using the `super` variable
- We can have properties (e.g. `drunkenness` in `Car`) and methods (e.g. `veer()` in `Car`) that are **specific** to a **subclass** (and we often want to in order to create unique behaviour)

---

# }
