# Introduction to Object-Oriented Programming (OOP) {

---

## In this module...

- A fish simulation
- Thinking in objects
- Creating a `class`
- Creating a `new` object from a class
- Creating more than one `new` object

---

## One fish

Let's start off with a small fish simulation. Our fish should start in a random position and have a random color, and it should move around on our canvas, changing direction randomly based on how nervous it is, and it should be constrained to the canvas.

We'll use this as the basis for thinking about object oriented programming.

### A fish object

First we need a variable with a JavaScript object that will keep track of our fish's properties:

```javascript
// Our fish object
let fish = {
  // Position is undefined because we will set it random in setup
  x: undefined,
  y: undefined,
  size: 100,
  // Our fish is a random color, so we'll set it up in  setup
  fill: {
    r: 255,
    g: 255,
    b: 255
  },
  vx: 0,
  vy: 0,
  speed: 5,
  // Nervousness is the chance the fish will change direction in any frame
  nervousness: 0.05
}
```

Quite a bit of information, but nothing we haven't seen before except our `nervousness` property, which is just a nice way to give the fish some personality later on.

### Setting up our fish (and canvas)

Now we'll need to set up our program by creating a canvas and then giving the fish a random position and color...

```javascript
function setup() {
  createCanvas(500, 500);

  // Position our fish randomly
  fish.x = random(0, width);
  fish.y = random(0, height);

  // Give our fish a random color
  fish.fill.r = random(100, 255); // Starting at 100 so it's not too dark
  fish.fill.g = random(100, 255);
  fish.fill.b = random(100, 255);
}
```

So now we have the idea of creating a single fish and getting all its properties set up the way we want at the start of its little life.

### Moving

Because we're clever people who think in terms of __functions__ these days, let's write a `move()` function that makes our little fish move around on the canvas. It has three main jobs:

1. Decide whether the fish should change directions based on how "nervous" it is
2. Update the fish's position
3. Constrain the fish's position to the canvas


```javascript
function move() {
  // 1. Decide whether the fish should change directions based on how "nervous" it is
  // Generate a random number and check if it's less than the fish's nervousness
  if (random() < fish.nervousness) {
    // If it is, the fish gets nervous and changes direction randomly!
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // 2. Update the fish's position
  fish.x += fish.vx;
  fish.y += fish.vy;

  // 3. Constrain the fish's position to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}
```

### Displaying

Keeping with our nice and modular approach, we will also write a `display()` function that displays our fish on the canvas, using the classic "draw a circle" technique...

```javascript
function display() {
  push();
  // Display the fish on the canvas
  noStroke();
  // Use its color (randomly generated earlier)
  fill(fish.fill.r, fish.fill.g, fish.fill.b);
  // And draw a circle at its position
  ellipse(fish.x, fish.y, fish.size);
  pop();
}
```

### Calling our functions

Finally, for our program to do anything, we need to __call__ our functions in the `draw()` function so that the fish can move and display...

```javascript
function draw() {
  background(0);

  move(); // Move the fish
  display(); // Display the fish
}
```

Hey presto, a "fish" that moves around out canvas at random, bumping into the sides.

---

## `fish` is an object

We already know that our `fish` variable has a __JavaScript object__ in it. That object keeps track of the specific __properties__ of our fish (like its position, velocity, and color).

However, in our program it's also true that the __functions__ `move()` and `display()` as well as the majority of `setup()` are also directly related to the fish. They're essentially things that the fish can __do__ (move, display on the canvas, and set up its properties).

---

## Two fish...

If we want to add a second fish, currently we would have to:

1. Declare another variable (maybe `fish2`!) that would store another JavaScript object with all the same properties as the first one.
2. Set up `fish2` with a random position and color in `setup()`
3. Create a `moveFish2()` and `displayFish2()` function to move and display `fish2`
4. Call those functions in `draw()`

We probably don't need to actually try this out to realize that it doesn't seem like the best idea.

In particular we would end up with __a lot of repetition__ in the code we would add!

- The JavaScript objects `fish` and `fish2` would be almost identical (same properties)
- The code in `setup()` for setting them up would be almost identical (randomizing position and color)
- The moving and displaying functions would be pretty much identical

That is not a good thing.

---

## Repetition is suspicious

We've already run into the idea that repeated code is suspicious, and here we are again.

This is not, however, a situation where we can respond with a __loop__. The code we're repeating is spread out, it involves both variables and functions.

Most importantly, our repetition here is all about this idea that we have two __objects__ (`fish` and `fish2`) that are __the same kind of thing__ (they're both fish!).

What we really want is a way to write down a kind of __template__ for what a fish is. This would include its qualities (its properties) and how it behaves (its functions). Then we could __create two (or more!) fish__ out of that template.

Well, that __is__ something we can do.

And so, my friends, we come to __Object-Oriented Programming__ (OOP)

---

## A `class` is a template

So, we want to tell our program about the general idea of a fish. To do this we are going to make a `class` called `Fish`.

We're going to create this `class` inside a __new file__ which we will name after the class, so it will be called `Fish.js`. Any time we want to create a class, we will make a new file with the same name as the class like this. These files can live in the `js/` folder alongside our main script.

For now we create `Fish.js`.

To begin with, we'll include the most basic part of defining a class, which looks like this

`Fish.js`
```javascript
class Fish {
  // We will define what a fish is like in here!
}
```

As you can see we include

- `class` - this tells JavaScript we are going to __define a class__
- `Fish` - this is the name of our class (by convention this __begins with a capital letter__, unlike a variable name or a function name)
- `{ ... }` - we use curly brackets to define a __block of code__ that will contain our definition of the `Fish` class

---

## Connecting the class to our program

In order to actually __use__ our `class` later on, we're going to need our main program to be able to know that class is there. It doesn't by default.

To do this, we have to go into our `index.html` to add our `Fish.js` file to the list of __scripts__ (JavaScript) that our project knows about.

If you look in `index.html` you'll a line like this:

```html
<script src="js/script.js"></script>
```

This is the line that tells your browser to pay attention to the __main script__ called `script.js`. Without it, your program wouldn't even run when the webpage loads.

We need to do the same thing to include our `Fish.js` in our project: we write a new `script` tag in exactly the same way, but pointing to `Fish.js` instead of `script.js`. Importantly, our new script should be added __before__ the main script:

```html
<script src="js/Fish.js"></script>
<script src="js/script.js"></script>
```

As a rule of thumb, you should add new scripts so that they come __before__ any script that needs to use them. We put `Fish.js` __before__ `script.js`, because the program in `script.js` will be using the class we're going to define in `Fish.js`.

---

## Let there be Fish!

When we write a new class like `Fish` we need to remember that we'll be using this class to __create new fish objects__ that will be part of our running program.

In order to create a new fish object from our class, we will need a special function that will __construct__ the fish when asked. It's called the `constructor`. And it looks like this:

`Fish.js`
```javascript
class Fish {

  constructor() {
    // We write instructions to set up a fish here
  }
}
```

A couple of notes:
- Note that we __do not__ write `function` in front of the constructor function, even though we are clearly __defining a function__. Because it's inside our `class` definition for `Fish`, it's already implied that we are defining functions.
- We don't actually call the functions in a class "functions", we call them __methods__. (This is not that important, but it's a widely used piece of terminology.)
- The work we do in the `constructor` is a __lot__ like the work we were doing in `setup()` for our fish: setting up the __properties__ of the fish.

---

## What does Fish know?

So, in our `constructor` we want to write code that can set up a prospective fish with the properties it needs to work. It should end up with the same properties it had when we defined it as a JavaScript object earlier. Including any special stuff we did in `setup()` to set those properties (like choosing a random position).

To do this, we __set__ each property in the following way:

`Fish.js`
```javascript
class Fish {

  constructor() {
    // Set up the fish's properties...
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = 100;
    this.fill = {
      r: random(0,255),
      g: random(0,255),
      b: random(0,255)
    };
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.nervousness = 0.05;
  }
}
```

The big difference you probably notice here is the use of the word `this`. In `class` definition like this one, `this` refers to the __object__ that is created out of the class.

So in the `constructor`, `this` means "__this__ object we are constructing from the class".

We set the __properties__ for the object we are constructing by treating them as, well, properties. So we write
- `this` for the current object,
-  `.` to access a property of that object
- the __property name__ (like `x` or `fill` or `nervousness`) we want to set
- `=` to assign a value
- and then the value to assign (like `random(0,width)` or our `fill` object or `0.05`)

The key thing to understand from this is that we don't need to __declare variables__ for these properties. Just the act of writing `this.x = random(0,width);` __causes that property to be created and set__.

So, by the end of the `constructor`, we have all the properties that our two fish in the starting example had, set to default values.

---

## What can a Fish do?

We use the `constructor()` to set up our Fish, but to get it to __do__ things (like move and display), we need to add __methods__ (remember these are just functions) to the `Fish` class that give us the template for what Fish can do.

The code in the `move()` method, for example, will be __very similar__ to what we used for our earlier version of this program, with a couple of changes. Let's look at it:

`Fish.js`
```javascript
class Fish {

  constructor() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = 100;
    this.fill = {
      r: random(0,255),
      g: random(0,255),
      b: random(0,255)
    };
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.nervousness = 0.05;
  }

  // NEW!
  move() {
    // Check if the fish is nervous this frame...
    if (random() < this.nervousness) {
      // If it is, change direction
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update the fish's position based on its velocity
    this.x += this.vx;
    this.y += this.vy;

    // Constrain the fish's position to the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
```

The `move()` method here is identical to the `move()` function we used previously, except:

- We don't write `function` before `move()` (because we're in a `class` and JavaScript understands we're defining a method)
- We use `this` to access the properties of the `Fish` (the one we create from this class definition)

---

## Displaying the fish

We also need a `display()` method that will display a fish that we create out of the `Fish` class, so let's add that too. Same idea:

`Fish.js`
```javascript
class Fish {

  constructor() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = 100;
    this.fill = {
      r: random(0,255),
      g: random(0,255),
      b: random(0,255)
    };
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.nervousness = 0.05;
  }

  move() {
    // Check if the fish is nervous this frame...
    if (random() < this.nervousness) {
      // If it is, change direction
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update the fish's position based on its velocity
    this.x += this.vx;
    this.y += this.vy;

    // Constrain the fish's position to the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // NEW!
  display() {
    push();
    // Styling
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    // And draw a circle at the fish's position
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

Again, this is the same code as previously, but we use `this` to specify the object created from this template or `class`.

This completes our `Fish` class, in fact. This is a class that

1. Sets up `Fish` properties in the `constructor()`
2. Defines a `move()` method to make a `Fish` move
3. Defines a `display()` method to draw a `Fish` on the canvas

---

## A brand `new` `Fish`

So we have a `Fish` class defined in `Fish.js`.

To actually take advantage of this class, which is like a __description__ of a fish, or a __template__ for a fish, we need to __create__ fish with it.

To do this we use a special word called `new` to create new `Fish`...

We do this back in our main script.

`script.js`
```javascript
// A variable to store our Fish in...
let fish;

function setup() {
  createCanvas(500,500);
  // Create our new Fish
  fish = new Fish();
}

function draw() {
  background(0);
}
```

There are two main components to this

1. We need a `fish` __variable__ to store the `Fish` object we will create in
2. We use `new Fish()` to __construct__ a new `Fish` object and we assign it to our `fish` variable

Importantly, when we write `Fish()` here, we are calling the `constructor()` of our `Fish` class. It's honestly a bit weird we don't write `constructor()` here, but we don't, we use the __name of the class__ instead.

---

## A living `Fish`

Now our `Fish` exists (in our `fish` variable), but it doesn't __do anything__, it just exists.

To make to do something, we need to __call__ its __methods__ (`move()` and `display()`). It makes sense to do this in `draw()`, just as we did before this approach:

`script.js`
```javascript
// A variable to store our Fish in...
let fish;

function setup() {
  createCanvas(500,500);
  // Create our new Fish
  fish = new Fish();
}

function draw() {
  background(0);

  // Move and display our fish
  fish.move();
  fish.display();
}
```

Now our fish is back to life! It does all the fishy things we wanted, except this time it's being done through a `class` called `Fish`! We create a `new` `Fish` in `setup()` and we call its methods in `draw()`.

---

## So?

This was quite a lot of work just to get the same basic program we had before. Why did we do it?

It comes down to our friends __modularity__ and __reusability__ again.

For one thing, consolidating all the aspects of a fish into one place, the `Fish` class is really helpful. Even better, the class is in its own file, making it easy to work on fish-related tasks by editing that one file. This is a highly __modular__ way of writing this program.

But perhaps better than this is the fact that our `Fish` class is __reusable__. We can make as many `Fish` objects from it as we want, and they will __all__ behave in the ways the class dictates!

---

## Two fish

Let's add another `Fish` to our script. It's as simple as adding another variable for the object, creating another `new` `Fish` object, and then calling its methods...

`script.js`
```javascript
// Variables to store our Fish in...
let fish;
let fish2;

function setup() {
  createCanvas(500,500);
  // Create our Fish
  fish = new Fish();
  fish2 = new Fish();
}

function draw() {
  background(0);

  // Move and display our fish
  fish.move();
  fish2.move();

  fish.display();
  fish2.display();
}
```

Now __that__ is useful. Both our fish, `fish` and `fish2`, are created using the `Fish` class's `constructor()` method, which gives them a random position and color and so on. Then both `fish` and `fish2` use the `Fish` class's `move()` and `display()` methods to come to life!

We can add a third fish, a fourth, and so on. As many as we want, we can create using the __same__ class, the same template.

Also great is that if we __change__ our `Fish` class, that change will be reflected in all the `Fish` objects we created. If we change the speed property in the `Fish` class to be faster, both `fish` and `fish2` will move faster!

It really is a bit of a life-changing moment. We can now think of __objects__ in our programs whose behaviour is defined by __classes__.

---

## Summary

...

---

## TMI?

### Functional programming

We __could__ actually do a lot of this stuff __without__ using classes and instead using standard JavaScript functions. It might look something like this...

---

# }
