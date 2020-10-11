# Introducing arrays {

---

## In this module...

- Working with related values
- Arrays to the rescue

---

## Working with related values

We often find in programming that we want to deal with more than one example of the same kind of thing.

Let's build an "aquarium" with fish swimming around in it using the power of functions!

```javascript
"use strict";

// Our fish
let fish1;
let fish2;
let fish3;
let fish4;

function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly
  fish1 = createFish(random(0, width), random(0, height));
  fish2 = createFish(random(0, width), random(0, height));
  fish3 = createFish(random(0, width), random(0, height));
  fish4 = createFish(random(0, width), random(0, height));
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}

// draw()
// Moves and displays our fish
function draw() {
  background(0);

  moveFish(fish1);
  moveFish(fish2);
  moveFish(fish3);
  moveFish(fish4);

  displayFish(fish1);
  displayFish(fish2);
  displayFish(fish3);
  displayFish(fish4);
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}
```

Although this is a lovely little program, it still has a kind of flaw. We can see we are __repeating similar code__ in order to create and draw all our circles.

Specifically, we call `createFish()` four times in a row with the same arguments. And we call `moveFish()` and `displayFish()` four times in a row, doing the same thing.

It's not the end of the world, but if we wanted 10 or 100 or (shudder) 1000 fish, this would be a disaster even though we've written such nice functions.

This repetition is happening because each circle is __the same kind of thing__ (a fish) and so we need to do the same kind of thing (call the same functions) each time we deal with one of the fish.

---

## Storing similar things together with arrays

What we would like to do is __store all our fish together__ and to do things to them (like create and move and display them) all at the same time.

Well, we can.

We use __arrays__ for this.

An __array__ is a special kind of object in JavaScript (and other programming languages) that allows us to store __multiple__ values inside __one__ variable.

We know that JavaScript Objects do this too, storing each value according to separate __properties__, but arrays store each value at a __numbered address__ and __in order__.

Why is this useful? We shall see!

---

## Storing our fish in an array

Let's see an example of this. We want to store __all__ our fish inside a single __array__ which we will store in a variable called `school` (as in it will contain a "school of fish").

To start with, our array will be __empty__, so we will start our `school` variable with an empty array at the top of the program like this:

```javascript
"use strict";

let school = []; // Create an empty array and assign it to the school variable
```

Those square brackets with nothing inside them represent an __empty array__, which we then assign into our `school` variable. This is always how we create empty arrays when we need them.

In order to put each fish into the array, we need to specify __which numbered address in the array to put it in__. We do this by writing the name of our array variable `school` followed by square brackets containing the __address of the space we want to access__.

Funnily enough, the numbering starts at __zero__, so to put all four fish into our `school` array in `setup()` we would write:

```javascript
function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly, storing each one in four successive
  // spaces in our array by using the addresses `0` through `3`
  school[0] = createFish(random(0, width), random(0, height));
  school[1] = createFish(random(0, width), random(0, height));
  school[2] = createFish(random(0, width), random(0, height));
  school[3] = createFish(random(0, width), random(0, height));
}
```

As you may be able to see, each separate address in the array is acting like a __variable__ here, and we can assign a value to it as with any variable, it's just that __all__ our fish are inside __one array__ which is in __one__ variable (`school`).

### A note on terminology

There are some specific terms we use when talking about arrays. Specifically:

- The __address__ of a specific space in the array is called its __index__ (`0` is the __index__ of the first fish in our `school` array)
- The __values__ in each space in the array are called __elements__ (each fish in our array is called an array __element__)

---

## Using the fish in the `school` array

We could continue our program using this same idea in `draw()`...

```javascript
function draw() {
  background(0);

  moveFish(school[0]);
  moveFish(school[1]);
  moveFish(school[2]);
  moveFish(school[3]);

  displayFish(school[0]);
  displayFish(school[1]);
  displayFish(school[2]);
  displayFish(school[3]);
}
```

Now instead of separate `fish1`, `fish2`, `fish3` and `fish4` variables, we're going through and drawing each element (the fish) stored at the indexes in our `school` array, using their indexes to get access to them. `0` for the first one, `1` for the second one, and so on.

And so, our program... well, it does the same thing.

---

## Hard-coded numbers???

You may have noticed that right now when we're dealing with specific indexes in the array we're writing them out directly in the program as numbers (`0`, `1`, `2`, `3`).

You may have also noticed that we're just going through each element in the array __in order__, from `0` to `3`, increasing by one each time.

You may feel a stirring in your memory that __this is exactly what a `for`-loop does__!

Yes indeed, we can use a `for`-loop to go through every element (circle) in our `circles` array very efficiently indeed!

---

## Using a `for`-loop to draw the fish

Currently we move and display our fish like this:

```javascript
function draw() {
  background(0);

  moveFish(school[0]);
  moveFish(school[1]);
  moveFish(school[2]);
  moveFish(school[3]);

  displayFish(school[0]);
  displayFish(school[1]);
  displayFish(school[2]);
  displayFish(school[3]);
}
```

But given that we're counting `0`, `1`, `2`, `3`, and this is what a `for`-loop can do, we could use a `for`-loop to take care of this.

```javascript
function draw() {
  background(0);

  // Use a for loop to count from 0 up to 3
  // and move the fish at that index in the schools array each time
  for (let i = 0; i < 4; i++) {
    // Use i as the index to get the current fish to move
    // The first time i will be 0, the second time 1, then 2, then 3
    let fish = school[i];
    // Move the fish!
    moveFish(fish);
  }

  // Same again for displaying
  for (let i = 0; i < 4; i++) {
    let fish = school[i];
    displayFish(fish);
  }
}
```

Slightly more efficiently

```javascript
function draw() {
  background(0);

  for (let i = 0; i < 4; i++) {
    moveFish(school[i]);
  }

  // Same again for displaying
  for (let i = 0; i < 4; i++) {
    displayFish(school[i]);
  }
}
```

And because in this case our two `for`-loops are __both__ just doing things to each fish, we could even improve this to:

```javascript
function draw() {
  background(0);

  for (let i = 0; i < 4; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}
```

Now __that__ is some nice programming.

__Note:__ there may be cases where we __don't__ want to run all our fish-related functions in the same loop as it can lead to issues. In the above code we now __move__ and __display__ each fish successively, rather than moving __all__ the fish and then displaying __all__ the fish. Order matters sometimes. We'll talk about it when we see it come up.

---

## What about creating the school of fish?

Creating the school of fish was very repetitive in a predictable way too:

```javascript
function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly, storing each one in four successive
  // spaces in our array by using the addresses `0` through `3`
  school[0] = createFish(random(0, width), random(0, height));
  school[1] = createFish(random(0, width), random(0, height));
  school[2] = createFish(random(0, width), random(0, height));
  school[3] = createFish(random(0, width), random(0, height));
}
```

Again, we're counting from `0` to `3` and creating each circle in the same way (at a random position). Again, we can do this in a `for`-loop:

```javascript
function setup() {
  createCanvas(600,600);

  for (let i = 0; i < 4; i++) {
    school[i] = createFish(random(0,width),random(0,height));
  }
}
```

Good __grief__ this is getting nice!

But there are still a couple of neat ideas to look at.

---

## The length of our array

Currently in our two `for`-loops (one for creating fish and one for moving and displaying them) we use the hardcoded number `4` to specify how many times we should go through the loop.

This is clearly not great and we should use a __variable__ when creating our fish:

```javascript
"use strict";

let school = [];
let schoolSize = 4;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}
```

This is just clearer programming.

We __could__ do the same thing with the `for`-loop in `draw()` because it also just counts through the length of the array, but we __shouldn't__.

After __creating__ an array in this way (using our variable), we should afterwards always rely on the useful fact that __arrays know how long they are__! They have a __property__ (just like a JavaScript Object) called `length`.

So we can rewrite out `draw()` `for`-loop using the `school` array's `length` property:

```javascript
function draw() {
  background(0);

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}
```

Once an array has been created and we want to run through all its elements we should __always__ use the `length` property to do so.

---

## How many fish?

Moving the `4` into a variable called `schoolSize` immediately points to something very, very powerful. Now that we have an __array__ and we work with it using `for`-loops, we can have __as many fish as we want without any extra code__.

Try changing `schoolSize` to `40` or to `400` or to `4000`. The __exact same code__ can now deal with any number of fish we specify!

Outrageous.

---

## Adding fish while the simulation is running

One more thing we may want to be able to do is to __add__ fish dynamically. What if we want to add a fish to the school whenever the user clicks. We could even add it to the position they click at.

To do this we need to know a special __function__ that arrays provide called `push()`. The `push()` function lets us add something to an array at any time. So to add a fish to our array we could write:

```javascript
let fish = createFish(100,100); // Create a fish at position 100,100
school.push(fish); // Add the fish to our array
```

Importantly we can do this __while the program is running__.

So, if we added a `mousePressed()` function to our aquarium code, we could __push__ a new fish into the array any time the user clicks...

```javascript
function mousePressed() {
  let fish = createFish(mouseX,mouseY); // Create a fish at the mouse position
  school.push(fish); // Add the fish to our array
  // Now the school array has our new fish and it will be moved and drawn
  // with all the others in the for loop!
}
```

Now when we click, a new fish appears at that location and starts swimming around. Kind of wonderful.

__Note:__ This is one reason why using `school.length` in our `for`-loop in `draw()` is so important. When we add a new fish the array gets __longer__ and its `length` property reflects this. If there were `4` fish and we add one by clicking, then `length` becomes `5`. Notice how if we'd just used `schoolSize` there, it wouldn't have worked because it would still be `4`.

__Note:__ You might well want to __remove__ fish from the array too, but this turns out to be just a little more complex so we'll leave that alone for now.

---

## One last `push()`

If we wanted to, we could have used `push()` in `setup()` too:

```javascript
"use strict";

let school = [];
let schoolSize = 4;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < schoolSize; i++) {
    // Create a fish
    let fish = createFish(random(0, width), random(0, height));
    // Add the fish to our array
    school.push(fish);
  }
}
```

---

## Summary

- We can use arrays to store multiple values in order (like a school of fish!)
- We call the values in our array the __elements__ and we access those elements using __indexes__ (numbers that give the address of each element, starting from `0`)
- Arrays work very well with `for`-loops because we can do something to __every element__ in an array
- Using arrays allows us to work with large and dynamic numbers of similar elements (like fish!)

---

# }
