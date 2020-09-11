# Introducing JavaScript objects {

---

## Lots of variables about the same thing

Consider this program that moves a circle across the screen:

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + circleSpeed;
}
```

It works well, it's easy to understand, but one thing that is less than ideal is how we have four __separate variables__ that __all deal with with the same thing__: our moving circle.

---

## Enter the object

JavaScript has a really nice way to organize variables that are about the same "thing", like our circle. It's called an __object__ and we can transform our circle variables into an object like this:

```javascript
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;
```

becomes

```javascript
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1
};
```

Let's look at this a little more closely:

- We have __one variable__ now, called `circle` (we know this because of the `let circle` which __declares__ it)
- We're still __assigning__ a value to our variable with the assignment operator `=`
- But what we are assigning is something new! It's not a number as with our previous variables. It's an __object__
- We can tell it's an object because after the `=` we have information about the object __inside curly brackets__. Those curly brackets are how we know we're creating an object to put in the variable.
- Inside the curly brackets we can a list of names and values that are a lot like our variables, e.g. `x: 0`. - The names are called the __properties__ of the object, and we set the __value__ inside the property by writing it after a __colon__ (`:`)
- The list of properties is separated with __commas__

So our `circle` variable contains an __object__ with __four properties__ (`x`, `y`, `size`, and `speed`), each of which has a value set for it.

In essence, we're tidying away the four variables we had before into a single object with the same information as properties.

---

## Using the object

Now that we have an object to represent our circle we need to write our `draw()` differently too, because all the information about the circle is inside these properties.

We get access to the property of an object by writing the __variable name__ then a __dot__ and then the __property name__. So our code would become:

```javascript
let backgroundShade = 0;

let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1
};

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circle.x,circle.y,circle.size);
  circle.x = circle.x + circle.speed;
}
```

Again, this code will run in __exactly the same way__, but it's now that much more tidy. We call this way of using the properties inside objets __"dot notation"__.

That's literally it in terms of the syntax and use of objects!

---

## Why the object?

There are reasons to feel excited about JavaScript objects and to use them!

- They let us __organize related data__ together (like all the properties of our circle), and being organized is good
- They let us __think about our programming in terms of cohesive objects__ rather than sets of related but individual variables (a "circle" rather than the circle's x, its y, its size, and its speed)
- They are the gateway to __object-oriented programing__, an approach to programming we will talk about later in the course

In short, if you ever find yourself needing multiple variables, all related to the __same thing__... __use a JavaScript Object__ instead!

---

## Summary

- JavaScript Objects allow us to group related information/data in our code
- JavaScript Objects are tidy
- JavaScript Objects mean we can think about our code in terms of different objects with different purposes
- JavaScript Objects are great!

---

# }
