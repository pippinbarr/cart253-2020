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

Let's start off with a small fish simulation so we have something to work with.

Our fish should start in a random position and have a random color. It should move around on our canvas, changing direction randomly based on how "nervous" it is (the more nervous, the more often is changing direction), and it should be constrained to the canvas (an aquarium!).

We'll use this as the basis for thinking about object oriented programming.

### A fish object

First we need a variable with a JavaScript object that will keep track of our fish's properties:

```javascript
// Our fish object
let fish = {
  // Position is undefined because we will set it randomly in setup
  x: undefined,
  y: undefined,
  size: 100,
  // Our fish will be a random color, so we'll set it up in setup
  fill: {
    r: 255,
    g: 255,
    b: 255
  },
  vx: 0,
  vy: 0,
  speed: 5,
  // Nervousness is the chance the fish will change direction in any frame
  nervousness: 0.05 // 5% chance of changing direction
}
```

Quite a bit of information, but nothing we haven't seen before except our new `nervousness` property, which is just a nice way to give the fish some personality later on.

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

So now we have the idea of __creating__ a single fish and getting all its __properties__ set up the way we want at the start of its little life.

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
  // Display the fish on the canvas
  push();
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

Hey presto, a "fish" that moves around out canvas at random, bumping into the sides. The majesty of nature!

---

## `fish` is an object

We already know that our `fish` variable has a __JavaScript object__ in it. That object keeps track of the specific __properties__ of our fish (like its position, velocity, and color). Objects created this way are technically called __JavaScript object literals__ (because we __literally__ write out all the properties when we create them).

However, in our program there are multiple other places that are directly related to our `fish`:

- In `setup()` we set its starting position and color
- In `move()` we move it around on the canvas
- In `display()` we display in on the canvas

So those parts of our code basically "belong" to the fish. They're essentially things that the fish can __do__.

---

## Two fish...

If we want to add a second fish we would have to:

1. Declare another variable (maybe `fish2`!) that would store __another__ JavaScript object literal with all the same properties as the first one.
2. Set up `fish2` with a random position and color in `setup()`
3. Create a `moveFish2()` and `displayFish2()` functions to move and display `fish2`
4. Call those functions in `draw()`

We probably don't need to actually try this out to realize that it doesn't seem like the best idea.

In particular we would end up with __a lot of repetition__ in the code we would add!

- The JavaScript object literals `fish` and `fish2` would be almost identical (same properties)
- The code in `setup()` for setting them up would be almost identical (randomizing position and color)
- The moving and displaying functions would be identical too

That is not a good thing.

---

## Repetition is suspicious

We've already run into the idea that repeated code is suspicious, and here we are again.

This is not, however, a situation where we can respond with a __loop__. The code we're repeating is spread out, it involves both variables and functions.

Most importantly, our repetition here is all about this idea that we have two __objects__ (`fish` and `fish2`) that are __the same kind of thing__. They're both fish!

What we really want is a way to write down a kind of __template__ for what a fish is. Ideally this would include both its __properties__ (position, size, etc.) and its __functions__ (setting up, moving, displaying).

If we had such a template, we could __create two (or more!) fish__ out of that template and not have to repeat all that code.

As you might image, that __is__ something we can do.

And so, my friends, we come to __Object-Oriented Programming__ (OOP)

---

## The template we want is called a `class`

We want to write a template that describes what a fish is. In Object-Oriented Programming, a template for creating new objects like this is called a `class`.

So, we are going to make a `class` called `Fish`.

We're going to create this `class` inside a __new file__ which we will __name after the class__, so it will be called `Fish.js`. Any time we want to create a class, we will make a new file in our `js/` folder with the same name as the class.

So, we create `Fish.js`.

To begin with, we'll include the most basic skeleton for defining a class, which looks like this

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

(The eagle-eyed among you may have noticed we did not write `"use strict";` at the top of our `Fish.js` file. That's because __class definitions__ like this are __automatically__ in strict mode.)

---

## Connecting the class to our program

In order to actually __use__ our `class` later on, we're going to need our main program to know that class is there. It doesn't by default.

To do this, we have to go into our `index.html` to add our `Fish.js` file to the set of __scripts__ (JavaScript) that our project knows about.

If you look in `index.html` you'll see a line like this:

```html
<script src="js/script.js"></script>
```

This is the line that tells your browser to pay attention to the __main script__ called `script.js`. Without it, your program wouldn't even run when the webpage loads.

We need to do the same thing to include our `Fish.js` in our project: we write a new `script` tag in exactly the same way, but pointing to `Fish.js` instead of `script.js`. Importantly, our new script should be added __before__ the main script:

```html
<script src="js/Fish.js"></script>
<script src="js/script.js"></script>
```

As a rule of thumb, you should add new scripts so that they come __before__ any script that __needs to use them__. We put `Fish.js` __before__ `script.js`, because the main program in `script.js` will be using the class we're going to define in `Fish.js`.

---

## Let there be Fish!

When we write a class like `Fish` we need to remember that we'll be using this class to __create new `Fish` objects__ that will be part of our running program. Our `class` __describes__ how these objects will work when they are created.

In order to create a new fish object from our class, the first thing we will need is a special function that will __construct__ (create) the fish when asked. It's called the `constructor` and it works a lot like `setup()` in p5, it is called at the moment our `Fish` is created.

It looks like this:

`Fish.js`
```javascript
class Fish {

  constructor() {
    // We write instructions to set up a fish here
  }
}
```

A couple of notes:
- Note that we __do not__ write `function` in front of the constructor function, even though we are clearly __defining a function__. Because it's inside our `class` definition for `Fish`, it's already understood by JavaScript that we are defining functions.
- Again, the work we do in the `constructor` is a __lot__ like the work we were doing in `setup()` for our fish: setting up the __properties__ of the fish.
- A terminology note: we don't actually call the functions in a class "functions", we call them __methods__.


---

## What does a `Fish` know?

So, in our `constructor` we want to write code that can set up a prospective `Fish` with the properties it needs to work. It should end up with the same properties we defined earlier in our JavaScript object literal earlier. Because the `constructor` is like the `setup()` for the `class`, though, we should also include any special stuff we did in `setup()`, like choosing a random position and color.

So, in the `constructor`, we __set__ each property in the following way:

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

The big difference you probably notice here is the use of the word `this`. In a `class` definition, `this` refers to the __object__ that will be created with the class.

So in the `constructor`, `this` means "__this object__ we are constructing from the class".

We set the __properties__ for the object we are constructing by treating them as, well, properties of the object being created. So we write
- `this` for the current object,
-  `.` to access a property of that object
- the __property name__ (like `x` or `fill` or `nervousness`) we want to set
- `=` to assign a value
- and then the value to assign (like `random(0,width)` or our `fill` object or `0.05`)

The key thing to understand from this is that we don't __declare variables__ for these properties. Just the act of writing `this.x = random(0,width);` __causes the `x` property to be created and set__.

By the end of the `constructor`, we have all the properties that our two fish in the starting example had, set to their default values.

---

## What can a Fish do?

We use the `constructor()` to set up our `Fish`, but to get it to __do__ things (like move and display), we need to add __methods__ (remember these are just __functions__) to the `Fish` class that give us the template for what `Fish` can do.

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

- Again, we don't write `function` before `move()` (because we're in a `class` and JavaScript understands we're defining a method)
- We use `this` to access the properties of the `Fish` (again, it means __this `Fish`__)

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
    // Draw a circle at the fish's position
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

Again, this is the same code as previously, but we use `this` to specify the object to be created from this template or `class`.

This completes our `Fish` class, in fact. We have a class that

1. Sets up `Fish` properties in the `constructor()`
2. Defines a `move()` method to make a `Fish` move
3. Defines a `display()` method to draw a `Fish` on the canvas

---

## A brand `new` `Fish`

So we have a `Fish` class defined in `Fish.js`.

To actually take advantage of this `class`, we need to __create__ (construct) fish with it.

To do this we use a special word called `new`. Which makes sense, because we want to create __new `Fish`__...

We do this back in our __main script__.

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

There are two key components to this

1. We need a `fish` __variable__ to store the `Fish` object we will create with the `class`
2. We use `new Fish()` to __construct__ a new `Fish` object and we assign it to our `fish` variable

Importantly, when we write `Fish()` here, we are actually calling the `constructor()` method of our `Fish` class.

It might feel a bit weird we don't write `constructor()` here, but we don't, we use the __name of the class__ instead. If you think about it, if we used `constructor()` but we had more than one class, JavaScript wouldn't know which one we meant, so we use the name of the class to clarify.

---

## A living `Fish`

Now our `Fish` exists (it's in our `fish` variable), but it doesn't __do anything__.

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

Now our fish is back to life! It does all the fishy things we wanted, except this time it's being done through a `class` called `Fish`!

1. We declare a variable to store our fish in called `fish`
2. We construct a `new` `Fish` in `setup()` and assign it into `fish`
3. We call the `Fish` methods that our `fish` knows about in `draw()`

---

## So?

This was quite a lot of work just to get the same basic program we had before. Why did we do it?

It comes back to our friends __modularity__ and __reusability__.

For one thing, by consolidating __all the aspects of a fish__ into one place, the `Fish` class is really helpful. If we ever want to change what a fish does or what properties it has, we can just change the `class`. This is a highly __modular__ way of writing this program.

Also good: the class is in its own file, making it even easy to work on fish-related tasks by editing that one file.

But perhaps even better than the modularity is the fact that our `Fish` class is __reusable__. We can make as many `Fish` objects from it as we want, and they will __all__ work in the ways the `Fish` class dictates!

---

## Two fish

Let's add another `Fish` to our script.

Remember how annoying this was going to be last time? We were going to have to make another JavaScript object literal, do the same setup work in `setup()` and write new `moveFish2()` and `displayFish2()` functions. All of which was very repetitive.

Now it's as simple as adding another variable for the object, creating another `new` `Fish` object, and then calling its methods...

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

Now __that__ is useful. Both our fish, `fish` and `fish2`, are created using the `Fish` class's `constructor()` method, which gives them a random position and color and so on.

Then both `fish` and `fish2` use the `Fish` class's `move()` and `display()` methods to come to life!

We can add a third fish, a fourth, and so on. We would just create them using the __same__ `class`, the same template.

Also great is that if we __change__ our `Fish` class, that change will be reflected in all the `Fish` objects we create. If we change the speed property in the `Fish` class to be faster, both `fish` and `fish2` above will move faster!

It really is a bit of a life-changing moment. We can now think of __objects__ in our programs whose nature and behaviour is defined by __classes__.

---

## Summary

- Creating multiple objects with the same properties and functions is incredibly repetitive
- Defining a `class` allows us to think about objects in terms of a template that __describes__ how they work
- This allows us make our programs __modular__, because all the information about these objects is in their `class` definition
- And it makes our programs __reusable__, because we can create as many objects from our `class` as we wish

---

## TMI?

### Functional programming

If you really, really wanted to, you could actually write a better version of our original program using only functions. This would be using the "functional programming" paradigm (where we do all our work with functions), and it might look something like this:

```javascript
// Declare variables to contain fish objects
let fish;
let fish2;

function setup() {
  createCanvas(500, 500);

  // Create our two fish
  fish = createFish();
  fish2 = createFish();
}

function draw() {
  background(0);

  // Move our two fish
  moveFish(fish);
  moveFish(fish2);

  // Display our two fish
  displayFish(fish);
  displayFish(fish2);
}

// Creates an object literal with fish properties and returns it
function createFish() {
  let f = {
    x: random(0, width),
    y: random(0, height),
    size: 100,
    fill: {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    },
    vx: 0,
    vy: 0,
    speed: 5,
    nervousness: 0.05
  };

  return f;
}

// Takes a fish `f` as a parameter and moves it
function moveFish(f) {
  if (random() < f.nervousness) {
    f.vx = random(-f.speed, f.speed);
    f.vy = random(-f.speed, f.speed);
  }

  f.x += f.vx;
  f.y += f.vy;

  f.x = constrain(f.x, 0, width);
  f.y = constrain(f.y, 0, height);
}

// Takes a fish `f` as a parameter and displays it
function displayFish(f) {
  push();
  noStroke();
  fill(f.fill.r, f.fill.g, f.fill.b);
  ellipse(f.x, f.y, f.size);
  pop();
}
```

Here we've regained the resuability of our code because we only write the setup, movement, and display code __once__, but create __two__ fish. We do this by leaning on the ability of functions to receive arguments (such as a fish to move or display) and to return value (such as a fish created as an object literal).

There's nothing wrong with doing things this way, but there's a certain clarity to Object-Oriented Programming that can make large program structures that definitively involve the idea of "objects" significantly easier to work with.



---

# }
