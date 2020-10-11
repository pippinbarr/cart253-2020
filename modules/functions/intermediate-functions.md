# Intermediate functions {

---

## In this module...

- Working with multiple objects
- Using functions to improve our code
- Creating objects with functions

---

## Working with multiple objects

It's very often the case in our programming, especially in games or simulations or similar projects, that we want to have multiple objects with similar behaviour.

Consider a simple simulation with a user-controlled (with the mouse) circle that can "eat" other circles on the screen. Here we have two kinds of objects:

1. One user-controlled circle
2. Some number of edible circles

To create this simulation, we might well lean toward dealing with each object in the simulation __separately__, because they're each distinct elements of the program.

Let's try this out with two edible circles.

---

## Eat 'em up

```javascript
"use strict";

// Our user, to move with the mouse
let user = {
  x: 0,
  y: 0,
  size: 100
};

// First food object
let food1 = {
  x: 250,
  y: 300,
  size: 50,
  eaten: false // We want to track whether the user has eaten the food
};

// Second food object
let food2 = {
  x: 350,
  y: 300,
  size: 50,
  eaten: false
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Move the user (with the mouse)
  moveUser();

  // Check whether the user has eaten either food
  checkFood1();
  checkFood2();

  // Display the user and foods
  displayUser();
  displayFood1();
  displayFood2();
}

// Sets the user position to the mouse position
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

// Checks if the user overlaps the food1 object and eats it if so
function checkFood1() {
  // We only want to check for an overlap if food1 hasn't been eaten yet
  if (!food1.eaten) {
    let d = dist(user.x, user.y, food1.x, food1.y);
    if (d < user.size / 2 + food1.size / 2) {
      food1.eaten = true;
    }
  }
}

// The same as above, but for food2
function checkFood2() {
  if (!food2.eaten) {
    let d = dist(user.x, user.y, food2.x, food2.y);
    if (d < user.size / 2 + food2.size / 2) {
      food2.eaten = true;
    }
  }
}

// Draw the user as a circle
function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

// Draw food1 as a circle
function displayFood1() {
  // We don't want to display food1 if it's been eaten
  if (!food1.eaten) {
    push();
    fill(255, 100, 100);
    ellipse(food1.x, food1.y, food1.size);
    pop();
  }
}

// As above but for food2
function displayFood2() {
  if (!food2.eaten) {
    push();
    fill(255, 100, 100);
    ellipse(food2.x, food2.y, food2.size);
    pop();
  }
}
```

So here we have the desired program. We can move the user circle over the food circle and they vanish! A marvellous eating simulation.


### Eaten?

One nice thing we're doing in this program is this idea of __tracking__ whether or not a food object has been eaten yet with the `eaten` property. This allows us to only __display__ or __check__ a food object if it's still present in our simulation.

Something to remember in the future. Many game engines, for example, will give agents/entities in the game world a property like `alive` or `active` for exactly this kind of reason.

---

## Adding more food...

Now that we have such a nice simulation, we might very well want to add __more food__. It would be fun to have a few more food objects around. At some point we might animate them somehow for example, but for now we'd just like to put more on the screen.

It pretty obvious, referring to our current code, the the way we've been going about things isn't ideal. To add another food we will have to:

1. Add a `food3` variable at the top with a JavaScript Object in it with the same properties
2. Add a `checkFood3()` function that checks if the `user` object overlaps the `food3` object
3. Add a `displayFood3()` function that displays the `food3` object
4. Call our new functions in `draw()`

In each case we will almost certainly end up __copying and pasting__ the code for one of the other food objects and then just renaming everything to reflect it's for `food3`. That is, we will be __repeating almost identical code__.

Even the __comments__ we have written for the `food2` functions in our current code show how repetitive this is. Writing "`As above but for food2`" is a good sign we're doing something needlessly repetitive. (This is actually a reason commenting is useful - we can show ourselves when we're doing something less than ideal.)

---

## Repetition is our enemy

We know that __repeated code__ is, generally speaking, our enemy.

We know that sometimes we can solve repetition with __loops__, but that won't work here because our repetition is all over the place, including repeated function definitions.

We also know that sometimes we can solve repetition with __functions__, because they allow us to use the same code in more than one place without repeating it.

So, __let's use functions__ to improve our program.

---

## Displaying food objects

Let's focus on the code for displaying our two food objects:

```javascript
function displayFood1() {
  if (!food1.eaten) {
    push();
    fill(255, 100, 100);
    ellipse(food1.x, food1.y, food1.size);
    pop();
  }
}

function displayFood2() {
  if (!food2.eaten) {
    push();
    fill(255, 100, 100);
    ellipse(food2.x, food2.y, food2.size);
    pop();
  }
}
```

These two functions are __identical__ except that the first one deals with `food1` and the second one deals with `food2`.

If we wanted to write a function that can display __either__ food object, we could do this by using __parameters__. Specifically, we could write a function that receives a food object as a parameter, and displays __that food object__:

```javascript
// Display the food provided as a parameter
function displayFood(food) {
  // Check if the food is still available to be eaten
  if (!food.eaten) {
    // Display the food as its position and with its size
    push();
    fill(255, 100, 100);
    ellipse(food.x, food.y, food.size);
    pop();
  }
}
```

We can then __call this same function twice__ in `draw()` instead of called `displayFood1()` and `displayFood2()`:

```javascript
displayFood(food1);
displayFood(food2);
```

---

## Checking food objects

We can do the same trick for the checking functions, where were:

```javascript
function checkFood1() {
  if (!food1.eaten) {
    let d = dist(user.x, user.y, food1.x, food1.y);
    if (d < user.size / 2 + food1.size / 2) {
      food1.eaten = true;
    }
  }
}

function checkFood2() {
  if (!food2.eaten) {
    let d = dist(user.x, user.y, food2.x, food2.y);
    if (d < user.size / 2 + food2.size / 2) {
      food2.eaten = true;
    }
  }
}
```

But can become:

```javascript
function checkFood(food) {
  if (!food.eaten) {
    let d = dist(user.x, user.y, food.x, food.y);
    if (d < user.size / 2 + food.size / 2) {
      food.eaten = true;
    }
  }
}
```

We can then call them in the same way as the displaying function:

```javascript
checkFood(food1);
checkFood(food2);
```

---

## Adding food

At this point we could add another food object __very easily__ because all we need to do is add the variable at the beginning with its object, and then call the `checkFood()` and `displayFood()` functions with our new object as a parameter.

Let's look at the whole program with four foods!

```javascript
"use strict";

// Our user, to move with the mouse
let user = {
  x: 0,
  y: 0,
  size: 100
};

// First food object
let food1 = {
  x: 150,
  y: 300,
  size: 50,
  eaten: false // We want to track whether the user has eaten the food
};

// Second food object
let food2 = {
  x: 250,
  y: 300,
  size: 50,
  eaten: false
};

// Third food object
let food3 = {
  x: 350,
  y: 300,
  size: 50,
  eaten: false
};

// Fourth food object
let food4 = {
  x: 450,
  y: 300,
  size: 50,
  eaten: false
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Move the user (with the mouse)
  moveUser();

  // Check whether the user has eaten either food
  checkFood(food1);
  checkFood(food2);
  checkFood(food3);
  checkFood(food4);

  // Display the user and foods
  displayUser();
  displayFood(food1);
  displayFood(food2);
  displayFood(food3);
  displayFood(food4);
}

// Sets the user position to the mouse position
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

// Checks if the user overlaps the food object and eats it if so
function checkFood(food) {
  if (!food.eaten) {
    let d = dist(user.x, user.y, food.x, food.y);
    if (d < user.size / 2 + food.size / 2) {
      food.eaten = true;
    }
  }
}

// Draw the user as a circle
function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

// Draw the food as a circle
function displayFood(food) {
  // Check if the food is still available to be eaten
  if (!food.eaten) {
    // Display the food as its position and with its size
    push();
    fill(255, 100, 100);
    ellipse(food.x, food.y, food.size);
    pop();
  }
}
```

So much better! We have four foods, but still only __one__ function for displaying food and __one__ function for checking food.

---

## Creating food...

One thing that's still very repetitive here is the __declaration__ of our food objects. Each one is the same except with a different __position__.

This suggests we can probably write a function for __creating__ food objects to reduce repetition even further.

A `createFood()` function could receive parameters for an `x` and `y` position, then create a new object with `x`, `y`, `size`, and `eaten` properties and __return__ it...

```javascript
function createFood(x,y) {
  let food = {
    x: x,
    y: y,
    size: 50,
    eaten: false
  };
  return food;
}
```

We could then __call__ this function in `setup()` to create each of our four food objects more efficiently...

```javascript
let food1;
let food2;
let food3;
let food4;

function setup() {
  createCanvas(windowWidth,windowHeight);

  food1 = createFood(150,300);
  food2 = createFood(250,300);
  food3 = createFood(350,300);
  food4 = createFood(450,300);
}
```

Now we've reduced the repetition in our program even further, because we create food objects in one function and call that function each time we want to add more food. Go functions!

---

## The program with six food objects...

Here's our full program with six food objects. Remember that in the original version we would have needed __six__ JavaScript Object declarations, __six__ checking functions and __six__ displaying functions to take care of all the food. Now:

```javascript
"use strict";

// Our user, to move with the mouse
let user = {
  x: 0,
  y: 0,
  size: 100
};

// Food objects
let food1;
let food2;
let food3;
let food4;
let food5;
let food6;

function setup() {
  createCanvas(600, 600);

  food1 = createFood(50, 300);
  food2 = createFood(150, 300);
  food3 = createFood(250, 300);
  food4 = createFood(350, 300);
  food5 = createFood(450, 300);
  food6 = createFood(550, 300);
}


function createFood(x, y) {
  let food = {
    x: x,
    y: y,
    size: 50,
    eaten: false
  };
  return food;
}

function draw() {
  background(0);

  // Move the user (with the mouse)
  moveUser();

  // Check whether the user has eaten either food
  checkFood(food1);
  checkFood(food2);
  checkFood(food3);
  checkFood(food4);
  checkFood(food5);
  checkFood(food6);

  // Display the user and foods
  displayUser();
  displayFood(food1);
  displayFood(food2);
  displayFood(food3);
  displayFood(food4);
  displayFood(food5);
  displayFood(food6);
}

// Sets the user position to the mouse position
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

// Checks if the user overlaps the food object and eats it if so
function checkFood(food) {
  if (!food.eaten) {
    let d = dist(user.x, user.y, food.x, food.y);
    if (d < user.size / 2 + food.size / 2) {
      food.eaten = true;
    }
  }
}

// Draw the user as a circle
function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

// Draw the food as a circle
function displayFood(food) {
  // Check if the food is still available to be eaten
  if (!food.eaten) {
    // Display the food as its position and with its size
    push();
    fill(255, 100, 100);
    ellipse(food.x, food.y, food.size);
    pop();
  }
}
```

This program is __so nice now__! We've used the power of functions to eliminate (almost) all forms of repetition in the code. This allows us to:

- Add new food objects very easily
- Change how all food objects are created just by changing the `createFood()` function
- Change how all food objects react to the user just by changing the `checkFood()` function
- Change how all food objects display just by changing the `displayFood()` function

Behold, the wonder of __modularity__ (moving repeated code into a function) and __reusability__ (writing functions that can be used more than once, ideally including parameters to increase flexibility)

---

## Summary

- Writing functions doesn't just __organize__ our code in a readable way (modularity)
- We can write functions that hugely __reduce repetition__ by using parameters and return values to perform tasks flexibly (reusability)
- The basic structure we see here is itself reusable!

---

## TMI?

### Functional programming and immutable data

If you listen to programmers talk enough (probably on the internet) you might end up hearing someone talking about "functional programming".

Functional programming is a very specific approach to programming that prioritizes functions above everything else. It's very powerful and very interesting.

What we see in this module above is __not__ functional programming, it's just programming nicely with functions.

One idea in functional programming, in particular, is to __never change a parameter inside a function__. So the fact, for example, that `checkFood()` sets `eaten` to `true` if the user overlaps the food is considered a __bad thing__ because data (like the `food` parameter) is meant to be __immutable__.

Similarly, the fact that `checkFood()` uses the `user` variable, which isn't provided as a parameter but is instead a global variable (declared at the top of the script), is also a __bad thing__ because functions should only deal with their parameters.

It's a whole thing.

---

# }
