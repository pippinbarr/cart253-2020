# Changing variables {

---

## Variables are lovely

We now know we can use variables as a way to make our code readable and easier to change:

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
}
```

---

## Variables can change!

We've already seen that we can use __assignment__ to set the value of a variable. We could use it to change the size of our circle at the start of `draw()` for example:

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  circleSize = 200;
  ellipse(circleX,circleY,circleSize);
}
```

This works, we see a bigger circle, but it's not all that exciting because we just continue to see the same `200` pixel diameter circle forever after. Although we did __change__ the variable by assigning it a new value, it only happened __once__.

What we want is for the change to take place __over time__.

To do this, we need to alter our variable __relative__ to its current value...

---

## Plusses

We can use __addition__ to change our `circleSize` variable by a set amount:

```javascript
circleSize = circleSize + 1;
```

Here we're using the same idea of assigning a new value to `circleSize`, but the value we are assigning is `circleSize + 1`. That is, whatever `circleSize` is at that moment, we set it to be __one more__. If it was `250` it becomes `251`, if it was `251` it becomes `252`, and so on.

If we use this line inside `draw()`, we see an amazing thing...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + 1;
}
```

The circle gets bigger! And keeps getting bigger until it engulfs the screen! And eventually the whole world!

Remember that the code in `draw()` is being executed 60 times per second! This means every 60th of a second this code

- Sets the background color (to black)
- Draws an ellipse at `circleX` and `circleY` with a size of `circleSize`
- Adds `1` to the value in `circleSize`

This means `circleSize` keeps changing over time! It gets bigger by `1` over and over again! Honestly it's kind of scary.

---

## Minusus

We could do exactly the same thing with another of the variables. Let's change the value in `circleX` over time as well. We'll make it get smaller by `1` each time...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + 1;
  circleX = circleX - 1;
}
```

Now the circle also __moves the left__!

Because the value in `circleX` starts at `250`, meaning it is drawn at the centre of the screen, but then `circleX` gets smaller by `1` each time `draw()` is executed (60 times per second). As `circleX` gets smaller and smaller, it moves left because smaller numbers on the x axis are to the left!

---

## Multiplication and division

As you may expect, we can do other kinds of math as well. We use `*` for multiplication and `/` for division.

We could make things move differently like this for example:

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize * 0.99; // Multiplying
  circleX = circleX / 1.01; // Dividing
}
```

This works differently specifically because we're creating a different effect with the math. While addition and subtraction are "linear" (the change is the same every frame or `draw()`), multiplication and division used like this are more exponential, the change is exaggerated over time because it's relative.

These are things to play around with!

---

## Colors are just numbers too

So far, `backgroundShade` has been getting a free pass, just sitting around doing nothing. But there's no reason we can't change that variable as well...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  backgroundShade = backgroundShade + 1;
}
```

Our very own hand-written fade! `backgroundShade` starts at `0`, which is black. We add `1` to it every single frame/`draw()` and so over time it gets bigger and eventually gets to `255`, which is white! It passes through all the shades along the way, creating a fading effect. Lovely.

---

## Numbers should be variables

Remember earlier we said that all numbers in our program should ideally be represented by variables? Well then let's take a look at our growing circle again...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + 1;
}
```

There's an opportunity here to change a number to a variable - can you see it?

That `1` we're adding to the `circleSize` variable should probably be a variable too, and this gives us the chance to ask what that `1` __means__. What is it? Well, let's change it to a larger number like `10` and look at the result...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + 10;
}
```

The circle grows __faster__ because its size is going up by `10` every frame instead of `1`. So that number represents the __growth amount__ of our circle then. It would be a good idea to create a variable with an appropriate name as use that instead...

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;
let growthAmount = 1; // New variable

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + growthAmount; // Using the new variable
}
```

The program works the same way, but now it makes a little bit more sense because of our variable names. Even without a comment explaining the change to `circleSize` we can tell what's going on: it's __growing__.

Going through this kind of process with your programs is a __very good idea__. Remember to keep checking for places you're using __hardcoded numbers__ and ideally replace them with variables.

---

## Let's be negative, just for a moment

A quick pointer now that we're using a variable called `growthAmount` for our circle. What would we do if we wanted the circle to __shrink__ instead of grow?

One option would be to __subtract__ the `growthAmount` like this

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;
let growthAmount = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize - growthAmount;
}
```

The circle does shrink now, so that's good.

(Although one weird thing is that it shrinks all the way to a size of `0` and then starts getting bigger again. Why? Because the `circleSize` becomes negative and for some reason p5 kind of flips the ellipse inside out in this case so it gets bigger again.)

However, it would actually be significantly better to make the circle shrink in a different way, by __making the `growthAmount` negative__ instead. In the future, this idea will generally allow us to control things in our code much better. So we'd have:

```javascript
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;
let growthAmount = -1; // A negative growth amount means... shrink!

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleSize = circleSize + growthAmount; // We add -1 to the circleSize, which makes it smaller
}
```

---

## Changing variables that change variables...

Let's do the same thing for movement and create a `speed` variable for our circle, that would be the amount it moves per frame. (I also moved its starting `circleX` value to `0` so it's all the way to the left.)

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let speed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + speed; // Each frame, circleX increases by 1, so it moves to the right
}
```

If we were to also increase the `speed` variable in `draw()` we would affect how the circle moves. Each frame it would move a little further than the last time!

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let speed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + speed;
  speed = speed + 0.2; // The circle gets faster each frame
}
```

That's called acceleration! So we could carry on and make the `0.2` into a variable too!

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let speed = 1;
let acceleration = 0.2;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + speed;
  speed = speed + acceleration; // The circle gets faster each frame
}
```

This could go on for a while, but the point is that changing numbers into variables gives us __so much control__ over the way our program behaves, as well as making it __much easier to read__.

Variables are just that good.

---

## A final note on this kind of math

A lot of what we've been doing here is changing our variables by adding/subtracting another number (or multiplying or dividing by one). We've done that like this:

```javascript
circleX = circleX + speed;
```

This is nice because it makes more or less immediate sense: `circleX` becomes __itself__ plus `1`.

There is a shorter way to write this though, and you'll see it out in the wild (the internet):

```javascript
circleX += speed;
```

This does exactly the same thing, and we call the `+=`... "plus equals"! It's just a faster way to write the expression, and you can use it or not as you wish.

The same ideas exist for subtract (`-=`), multiplication (`*=`), and division (`/=`).

---

## Summary

- Variables are already amazing because they let us name values in our program
- But __changing__ variables unlocks dynamic, exciting programs!
- We can change number variables with standard math (addition, subtraction, etc.)
- The more numbers we turn into variables, the more we can __control__ the parts of our program

---

# }
