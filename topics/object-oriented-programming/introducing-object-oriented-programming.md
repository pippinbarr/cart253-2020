# Introducing Object-Oriented Programming (OOP) {

---

## In this module...

- A garden simulation
- Thinking in objects
- Creating a `class`
- Creating `new` objects from a class

---

## A garden

Let's start off with a small garden simulation so we have something to work with.

We want to display some grass (a background color) and then flowers in random locations. We'll use an array to store individual flower objects so we can have as many as we like.

We'll use this as the basis for thinking about object oriented programming.

### A garden object

First we need a variable with a JavaScript object that will keep track of our garden's properties, most importantly the array of flowers in the garden:

```javascript
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
```

### Setting up our flowers (and canvas)

Now we'll need to set up our program by creating a canvas and then creating a set of flowers that we will store in our `flowers` array inside the `garden`. To do this we'll write a `createFlower()` function that creates a new flower object and returns it.

```javascript
// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create a new flower
    let flower = createFlower();
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
}

// createFlower()
// Creates a new JavaScript Object describing a flower and returns it
function createFlower() {
  // Create our object
  let flower = {
    // Position and size information
    x: random(0, width),
    y: random(0, height),
    size: 50,
    stemLength: 75,
    stemThickness: 10,
    petalThickness: 10,
    // Color information
    stemColor: {
      r: 50,
      g: 150,
      b: 50
    },
    petalColor: {
      r: 200,
      g: 50,
      b: 50
    },
    centreColor: {
      r: 50,
      g: 0,
      b: 0
    }
  };
  return flower;
}
```

You can see we have quite a few properties for the flower which we could consider modifying in different ways to create different-looking flowers.

So now we have the idea of __creating__ a flower and getting all its __properties__ set up the way we want at the start of its little life. We're also using the idea of a `for`-loop that can add as many of these flower objects to our array as we want (specified by `garden.numFlowers`).

### Displaying

Keeping with our nice and modular approach, we will write a `displayFlower()` function that displays a flower specified as a `flower` parameter:

```javascript
// displayFlower(flower)
// Displays the provided flower on the canvas
function displayFlower(flower) {
  push();
  // Draw a line for the stem
  strokeWeight(flower.stemThickness);
  stroke(flower.stemColor.r, flower.stemColor.g, flower.stemColor.b);
  line(flower.x, flower.y, flower.x, flower.y + flower.stemLength);
  // Draw a circle with a heavy outline for the flower
  strokeWeight(flower.petalThickness);
  fill(flower.centreColor.r, flower.centreColor.g, flower.centreColor.b);
  stroke(flower.petalColor.r, flower.petalColor.g, flower.petalColor.b);
  ellipse(flower.x, flower.y, flower.size);
  pop();
}
```

A little bit of effort here to draw a nice-looking flower.

### Calling our functions

Finally, for our program to do anything, we need to __call__ our `displayFlower()` function in the `draw()` function so that we see our beautiful garden!

```javascript
// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    displayFlower(flower);
  }
}
```

Hey presto, a garden of flowers! The majesty of nature!

---

## Each flower is an object

We already know that each of our flowers in the `flowers` array is a __JavaScript object__, created using `createFlower()`. That object keeps track of the specific __properties__ of a flower (like its position and colors). Objects created by writing out the properties inside curly brackets as in `createFlower()` are technically called __JavaScript object literals__. (Because we __literally__ write out all the properties when we create them.)

However, in our program there are other places that are directly related to our flowers:

- The `createFlower()` function is devoted to __creating__ a flower
- The `displayFlower()` function is devoted to __displaying__ a flower on the canvas

So those parts of our code basically "belong" to the flower objects. They're essentially things that a flower can __do__ (be created and be displayed).

---

## Combining properties and functions

The fact that in our program we have both __properties__ that provide information about flowers and __functions__ for dealing with flowers leads toward another way of thinking about these flowers (and JavaScript Objects in general).

In particular, it might be nice to be able to __combine__ the properties and functions related to a flower into one place. This would potentially make our program even clearer, more modular, and perhaps more reusable.

This is the idea behind __Object-Oriented Programming__ (OOP).

In OOP we think about our program as being explicitly organized according to different kinds of __objects__, each of which has its own set of __properties__ (which we already do) but also its own set of __functions__ that control how it behaves.

To do this we write __classes__ that describe how a particular kind of object (like a flower) behaves (its properties and functions). A class is like a template for an object.

Let's look at how to do this.

---

## Creating a flower `class`

So, let's write a `class` called `Flower`.

We're going to create this `class` inside a __new file__ which we will __name after the class__, so the file will be called `Flower.js`. Any time we want to create a class, we will make a new file in our `js/` folder with the same name as the class.

So, we create `Flower.js`.

To begin with, we'll include the most basic skeleton for defining a class, which looks like this

`Flower.js`
```javascript
class Flower {
  // We will define what a Flower is like in here!
}
```

As you can see we include

- `class` - this tells JavaScript we are going to __define a class__
- `Flower` - this is the name of our class (by convention this __begins with a capital letter__, unlike a variable name or a function name)
- `{ ... }` - we use curly brackets to define a __block of code__ that will contain our definition of the `Flower` class

(The eagle-eyed among you may have noticed we did not write `"use strict";` at the top of our `Flower.js` file. That's because __class definitions__ like this are __automatically__ in strict mode.)

---

## Linking the class to our program

In order to actually __use__ our `class` later on, we're going to need our main program in `script.js` to know that class is there. __It doesn't by default__.

To do this, we have to go into our `index.html` to add our `Flower.js` file to the set of __scripts__ (JavaScript) that our project knows about.

If you look in `index.html` you'll see a line like this:

```html
<script src="js/script.js"></script>
```

This is the line that tells your browser to pay attention to the __main script__ called `script.js`. Without it, your program wouldn't even run when the webpage loads.

We need to do exactly the same thing to include our `Flower.js` file in our project: we write a new `script` tag in exactly the same way, but pointing to `Flower.js` instead of `script.js`. Importantly, our new script should be added __before__ the main script:

```html
<script src="js/Flower.js"></script>
<script src="js/script.js"></script>
```

As a rule of thumb, you should add new scripts so that they come __before__ any script that __needs to use them__. We put `Flower.js` __before__ `script.js`, because the main program in `script.js` will be using the class we're going to define in `Flower.js` (it needs to create and display flowers which will rely on the `Flower` class in `Flower.js`).

---

## Let there be `Flower`!

When we write a class like `Flower` we need to remember that we'll be using this class to __create new `Flower` objects__ that will be part of our running program. Our class __describes__ how these objects will work when they are created.

In order to create a new `Flower` object from our class, the first thing we will need is a special function that will __construct__ (create) the Flower when asked. It's called the `constructor`.

It looks like this:

`Flower.js`
```javascript
class Flower {

  constructor() {
    // We write instructions to set up a Flower here
  }
}
```

A couple of notes:
- Note that we __do not__ write `function` in front of the constructor function, even though we are clearly __defining a function__. Because it's inside our `class` definition for `Flower`, it's already understood by JavaScript that we are defining functions.
- A terminology note: we don't actually call the functions in a class "functions", we call them __methods__.


---

## How do you create a `Flower`?

So, in our `constructor` we want to write code that can set up a prospective `Flower` with the properties it needs to work. In fact, this is very much the same thing that our `createFlower()` function does! Our `constructor` will be highly similar to `createFlower()`, with a couple of key differences:

1. We don't need to declare a variable to store the object, there is a special variable called "`this`" that "magically" refers to the flower being created in the `constructor`.
2. We don't need to `return` the flower being created because the `constructor` just does that automatically.

Here's what it looks like (notice the similarity to `createFlower()`):

`Flower.js`
```javascript
class Flower {

  // The constructor() sets up a flower's properties
  constructor() {
    // Position and size information
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 50;
    this.stemLength = 75;
    this.stemThickness = 10;
    this.petalThickness = 10;
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = {
      r: 200,
      g: 50,
      b: 50
    };
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
  }
}
```

Again, the biggest difference you probably notice here is the use of the word `this`. In a `class` definition, `this` refers to the __object__ that will be created with the class.

So in the `constructor`, `this` means "__this object__ we are constructing from the class".

We set the __properties__ for the object we are constructing by treating them as, well, properties of `this` object being created. So we write
- `this` for the current object,
-  `.` to access a property of that object
- the __property name__ we want to set (like `x` or `size` or `stemLength` or `centreColor`)
- `=` to assign a value
- and then the value to assign (like `random(0,width)` for `x` or `10` for `petalThickness`)

The key thing to understand from this is that we don't __declare variables__ for these properties (we don't write `let` anywhere). Just writing `this.x = random(0, width);` __causes the `x` property to be created and set to `random(0, width)`__.

By the end of the `constructor`, we have all the properties that our flowers in the starting example had, set to their default values.

---

## What can a `Flower` do?

We use the `constructor()` to set up our `Flower`, but to get it to __do__ something, we need to add a __method__ (remember this is just the name for a __function__ inside a class) to the `Flower` class.

Specifically we need to write a `display()` method that handles displaying the flower (using its properties) on the canvas.

This code will be __very similar__ to the code we used in `displayFlower()` in our initial program!


`Flower.js`
```javascript
class Flower {

  // The constructor() sets up a flower's properties
  constructor() {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = 50;
    this.stemLength = 75;
    this.stemThickness = 10;
    this.petalThickness = 10;
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = {
      r: 200,
      g: 50,
      b: 50
    };
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

The `display()` method here is identical to the `displayFlower()` function we used previously, except:

- We don't write `function` before `display()` (because we're in a `class` and JavaScript understands we're defining a method)
- We don't need to have a `flower` parameter because we can use `this` to refer to the flower we're displaying
- We use `this` to access the properties of the `Flower` we set up in the `constructor()`. (Remember, `this` means __this `Flower`__.)

---

## A brand `new` `Flower`

So we have a complete `Flower` class defined in `Flower.js`. It replicates all the properties and functions we had written in our initial program.

It sets all the the same properties in its `constructor()` that we were setting in `createFlower()`. And it does all the same things in `display()` that we were doing in `displayFlower()`.

To actually use this `class`, we need to __create__ (construct) flowers with it.

To do this we use another special word called `new`. This makes sense, because we want to create __new `Flower`__...

We do this back in our __main script__.

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
    // NEW! Create a new flower
    let flower = new Flower();
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
}
```

The big difference here is that we have replaced

```javascript
let flower = createFlower();
```

with

```javascript
let flower = new Flower();
```

A pretty small difference. Let's look at the pieces of the `new` version...

1. `let` tells JavaScript we're going to create a new variable
2. `flower` is the name of the variable we're creating to temporarily store a new flower in before we put it in our array
3. We use `=` to assign the new flower into the variable
4. `new` tells JavaScript we are going to create a __new object using a class definition__
5. `Flower()` tells JavaScript to use the `constructor()` of the `Flower` class to create a new object

It might feel a bit weird we never write `constructor()`, but we don't, we use the __name of the class__ instead. If you think about it, if we __did__ write `constructor()` but we had more than one class (which we can), JavaScript wouldn't know __which class__ we meant. And so we use the name of the class to clarify.

---

## Displaying our flowers

Now we have all our flowers objects, created with the `Flower` class, in our array. We just need to __display__ them in the `draw()` function.

We know our `Flower` class has a `display()` method, so we'll want to use that to display all our flowers in the `for` loop that goes through the array.

To call a method that is part of an object created with a class, we use __dot notation__ just like we do when we're accessing an object's properties.

`script.js`
```javascript
// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display(); // NEW! Call the display() method for this flower
  }
}
```

As you can see, we write

```javascript
flower.display();
```

To call the `display()` methods for the specific flower inside our `flower` variable. Simple as that!

---

## Return of the garden

Now our garden is back! But this time it's being done through a `class` called `Flower`!

So what did we do?

1. We defined a `class` called `Flower` which provides a `constructor()` to set all the properties of a flower and a `display()` method to draw a flower on the canvas
2. We created new `Flower` objects using the `new` keyword and the constructor (written as `Flower()`), storing them in our array
3. We called the `display()` method of the flowers created this way to draw them to the canvas

---

## What a beautiful thing

Using OOP in this way by creating a __class__ brings us back to our friends __modularity__ and __reusability__.

By consolidating __all the aspects of a flower__ into one location in a separate file, the `Flower` class is really helpful. If we ever want to change what a Flower does or what properties it has, we can just change the __class__. This is a highly __modular__ way of writing this program.

And, as we have seen, our `Flower` class is __reusable__. We made many `Flower` objects and stored them in our array, with each one working in the way the `Flower` class defines.

Note that the result is still __functionally the same__ as the initial program we wrote. It's ultimately just a different way of expressing the same ideas. But it's often a very satisfying and clear way to write a program because it so explicitly separates different objects out into classes.

---

## Summary

- Defining a `class` allows us to think about objects in terms of a template that __describes__ how they work
- This allows us make our programs highly __modular__, because all the information about these objects is in their `class` definition
- And it makes our code nicely __reusable__, because we can create as many objects from our `class` as we wish

---

## TMI?

### Display order

Currently we have the situation where our garden may display flowers that are "further back" on top of flowers that are "closer". That's because the array of flowers isn't __sorted__ so we just display the flowers at their random positions one by one without checking where they are on the y axis.

Ideally we would want to display the flowers in order of their `y` property, starting with the lowest and going up. This would cause them to layer in the correct way.

To do this, we can __sort__ our array according to the `y` property using the array's `sort()` function. We would do this in `setup()` because we just want to sort the array once at the start of the program. (If we were adding flowers dynamically we might need to resort the array or add flowers into the correct position of our array according to their `y`).

```javascript
// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create a new flower
    let flower = new Flower();
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }

  // NEW! Sort the array using the sortByY() function
  garden.flowers.sort(sortByY);
}

// sortByY() takes two flowers as parameters to compare
// It should return a negative number if flower1 should come
// BEFORE flower2 in the array, a positive number if flower1 should
// come AFTER flower2 in the array, and 0 if there they have the
// same priority
function sortByY(flower1, flower2) {
  // We achieve the above by subtracting flower2's y position
  // from flower1's! How elegant!
  return flower1.y - flower2.y;
}
```

---

# }
