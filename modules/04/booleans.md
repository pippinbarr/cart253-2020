# Booleans {

---

## In this module...

- `true` and `false` are Boolean values
- Built-in Boolean variables
- Making our own Boolean variables

---

## Booleans!

The ideas of __true__ and __false__ are known as __Boolean values__. They're named after a logician called [George Boole](https://en.wikipedia.org/wiki/George_boole), who was an important figure in the world of mathematics and logic.

We use these exact ideas in programming, too, where we write them as `true` and `false`. (Sometimes people write `true` as `1` and `false` as `0`, but that's not a very good habit, even if it's how computers actually represent true/false underneath it all.)

Because `true` and `false` are __values__ in JavaScript, they can be stored in __variables__.

This is good, because as we have seen, knowing whether something is true or false is a great way to make __decisions__!

---

## Built-in Boolean variables

p5 provides a number of built-in variables that contain __Boolean values__. That is, variables that can contain either `true` or `false` depending on what's happening.

The two most immediately useful are `mouseIsPressed` and `keyIsPressed`.

### `mouseIsPressed`

`mouseIsPressed` is a variable that contains `true` if the mouse button is pressed and `false` if it isn't!

Because it contains either `true` or `false` it can be used as a __condition__ for an `if`-statement, just like our mathematical comparisons. Consider this "light switch":

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  if (mouseIsPressed === true) {
    background(255);
  }
  else {
    background(0);
  }
}
```

Here our `if`-statement's condition checks whether `mouseIsPressed` is equal to `true`. If it is, the background is set to white (the light is on!), if it isn't then the `else` part applies, and the background is set to black (the light is off!).

Now if we hold down the mouse button on the canvas, it turns white! When we let go, it turns black!

### `keyIsPressed`

`keyIsPressed` works in exactly the same way as `mouseIsPressed`, but it's `true` if any keyboard key is pressed down, and `false` otherwise. So our light switch could use a key instead...

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  if (keyIsPressed === true) {
    background(255);
  }
  else {
    background(0);
  }
}
```

---

## Checking `true` and `false`

Above, we used `mouseIsPressed === true` and `keyIsPressed === true` to check our conditions, but that wasn't actually necessary. When we're dealing with variables with `true` or `false` in them, we can literally just check the variable itself, e.g.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  // We can just write mouseIsPressed and the if-statement will take its action
  // if mouseIsPressed is true, and won't if it is false
  // There no need to explicitly check if the variable is equal to true
  if (mouseIsPressed) {
    background(255);
  }
  else {
    background(0);
  }
}
```

This way of checking variables in `if`-statement is __much more common__, and indeed you will almost never see the other way.

---

## Our own Boolean variables

Just as p5 has built-in variables that store Booleans, we can make our own as well.

For example, we could have a variable that tracks whether we have __ever__ pressed the mouse.

```javascript
// Here is our Boolean variable, it starts as false because we don't want
// to show our circle until they click down the mouse for the first time.
let displayCircle = false;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  if (mouseIsPressed) {
    background(255);
    // We set our Boolean variable to true now, because we know the mouse was pressed.
    // Effectively displayCircle is true after the FIRST TIME the user clicks the mouse.
    displayCircle = true;
  }
  else {
    background(0);
  }

  // We check our displayCircle variable and if it's true, we draw the circle!
  // The circle will be displayed even after we let go of the mouse button, because
  // displayCircle will STAY true.
  // So this boolean basically means we can make the circle appear the first time
  // the mouse is clicked.
  if (displayCircle) {
    ellipse(width/2,height/2,100,100);
  }
}
```

Notice how our variable `displayCircle` __stays `true`__ even after we let go of the mouse button. It behaves differently to `mouseIsPressed`, which is only `true` while the mouse is pressed down. A subtle but potentially useful difference!

---

## Summary

- `true` and `false` are very useful ideas in logic, life, and programming
- p5 has built-in variables that use `true` or `false` to tell us whether the mouse is pressed (`mouseIsPressed`), a key is pressed (`keyIsPressed`), and other things
- We can create our own Boolean variables to track specific ideas of our own

---

## TMI?

We saw that `1` and `0` are a kind of "computer-equivalent" to `true` and `false`. In fact, you could use them just like `true` and `false`:

```javascript
let displayCircle = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  if (mouseIsPressed) {
    background(255);
    displayCircle = 1;
  }
  else {
    background(0);
  }

  // We check our displayCircle variable and if it's true, we draw the circle!
  if (displayCircle) {
    ellipse(width/2,height/2,100,100);
  }
}
```

Notice how the `if`-statement still works, even though `displayCircle` is now `1` or `0` instead of `true` or `false`. That's because in many situations, JavaScript treats them the same way.

It's still __much better__ to use `true` and `false`, though. It's more readable, and less likely to lead to weird problems!

This is also an instance where we can see the difference between `===` (which we __do__ use!) and `==` (which we __don't__ use!):

```javascript
1 == true // This is true! What??!??!
1 === true // This is false! Much better.
```

Given that `1` and `true` are __not actually the same thing__, using `===` is clearly the more sensible option.

---

# }
