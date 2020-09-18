# Activity 04: Dodging COVID-19 {

## Objectives

1. Keep getting comfortable with variables for movement, visuals, and more
2. Get used to conditionals for making decisions
3. Learn new functions (`dist()`, `noLoop()`, `noCursor()`)
4. Use a loop for a visual effect (static)

---

## The idea

The idea for this activity will be to make a simple "simulation":

_COVID-19, represented by a red circle, will move from the left side of the canvas to the right at a random y position. Each time it reaches the right side, it will reset to the left at a random y position. The user will control their own circle with the mouse position. If the COVID-19 circle touches the user circle, everything stops! In the background we see random static for visual flair and we don't see the mouse cursor._

As always, there are different and reasonable ways to approach this, so feel free to go your own way! The steps discussed below are one approach designed to use the ideas we've been seeing.

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `04-dodging-covid-19`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "A4: Started the COVID-19 activity" and push

Remember that it's a nice idea to commit (and push) throughout the activity as you get different things done. This will be part of the evaluation for exercises and projects.

---

## Make a plan

If you want to go totally off road and just wing it, feel free, but generally it's still a good idea to have some kind of plan. Here's one:

1. Display the COVID-19 circle and move it across the screen, starting at a random y
2. Make the COVID-19 circle move back to the left if it goes off the right side
3. Display the user circle at the mouse location
4. Check if the two circles overlap and, if they do, stop the program
5. Display random static in the background for a visual flourish
6. Hide the mouse cursor

Let's do this!

---

## Creating the COVID-19 circle

In order to make our COVID-19 circle be part of the program, first we should make a variable to store a JavaScript object with information about it. At the top of your script:

1. Declare a variable called `covid19` that contains an object
2. Add properties for its position (`x` set to `0`, and `y`, set to `250`) and size (`size`, set to something like `100`)
3. Because it needs to move, add properties for velocity (`vx`, set to `0`, and `vy`, set to `0`) and speed (`speed`, set to `5`)
4. Because it needs to be red, add a `fill` property, but instead of using a __number__, set the property to be __another__ JavaScript object (using curly brackets) which has its own three properties of `r` (set to 255, for red), `g`, and `b`

Quite a lot of setup, and the nested JavaScript object is a new but nice way to keep things organized.

---

## Setting up the canvas

Now we should work on our `setup()` function to create the canvas and tell the `covid19` object to start moving. So, in `setup()`:

1. Use `createCanvas()` to create a canvas. You can choose the size, but `windowWidth` by `windowHeight` could be nice!
2. Set the `covid19` object's `y` property to a random number between `0` and `height` so it starts at an unpredictable height
3. Set the `covid19` object's `vx` property to match its `speed` property, so that it will move to the right

We still won't have anything visible yet, but now the `covid19` circle is ready to move and be displayed!

---

## Draw the background, move COVID-19, draw COVID-19

Now we need to work in `draw()` to make the program change `covid19`'s position based on its velocity and draw it on the screen!

1. Use `background()` to set the background to black (or some other color if you like)
2. Update `covid19`'s `x` and `y` by adding its `vx` and `vy` properties (the standard movement code)
3. Set the `fill()` to use `covid19`'s fill property. Remember that the property has an object with its own properties, so you would set the fill to: `fill(covid19.fill.r,covid19.fill.g,covid19.fill.b)`
4. set `noStroke()` because it just looks better
5. Draw an `ellipse()` at `covid19`'s position and using its size

With that, we should see our red `covid19` circle move across the screen and vanish!

---

## Resetting COVID-19 to the left

We want our `covid19` to go back to the left side if it leaves the canvas, so we will need an `if`-statement to check for that situation and handle it.

1. Write an `if`-statement with a condition that checks if `covid19`'s `x` property is greater than the `width` (meaning it has gone off the right side)
2. In the `if`-statement's curly brackets (its "code block"), set `covid19`'s `x` property back to `0` (so it moves back) __and__ set its `y` property to a random number between `0` and `height`, so it starts at a new height

Now when we run the program `covid19` should move across the screen at a random `y` and then when it goes off the right side, it should start again on the left side at a new height.

---

## Enter the user

Now we're ready for our user circle. This one is much simpler because it will always be drawn at the mouse location. First we need a variable for the user:

1. Declare a `user` variable at the top of the script with properties `size` (maybe `100` again?) and `fill` (let's just use a single number like `255` here)

We want this circle to be drawn where the mouse is, so in `draw()` __before__ the code that draws `covid19`:

1. Set `user`'s `x` and `y` to the mouse position variables.

And we want to draw the user on the screen, so in `draw()` __after__ the code that draws `covid19`:

1. Set the `fill()` to the user's `fill` property
2. Draw an `ellipse()` using the user's `x`, `y`, and `size`.

Now we should have a `user` circle that moves around with the mouse. Notice how it starts at `0,0` until we move the mouse? Annoying, but let's leave it alone this time.

We're almost there!

---

## Catching COVID-19!

We want to check if the `covid19` circle touches the `user` circle, in which case the user catching COVID-19 and the "simulation" is over! We will need another `if`-statement. So, in `draw()` __after__ the code that updates `covid19` and `user`'s positions:

1. Declare a variable `d` (for distance) that calculates the distance between `covid19` and `user`'s positions, using the `dist()` function. Look up [`dist()`](https://p5js.org/reference/#/p5/dist) in the documentation!
2. Write an `if`-statement that checks whether `d` (the distance) is __less than__ the radius of `covid19` plus the radius of `user` (the radius is __half__ the `size`). This is the mathematical way of checking whether two circles overlap!
3. In the `if`-statement's code block (actions), use [`noLoop()`](https://p5js.org/reference/#/p5/noLoop) to stop the program!

Now the program does everything we want functionally! COVID-19 moves across the screen repeatedly and for as long as the user avoids it, things carry on. If the two circles overlap, though, the program ends because you caught COVID-19!

---

## Static

Let's add a background of static. Static can be displayed by drawing lots of `point()`s on the screen at random locations every frame. Because each new frame they change position, you end up with static! Because we want to draw a __lot__ of dots/points, we will use a __loop__ to achieve this.

We will write this immediately after our `background()` instruction in `draw()` (because we want to draw our static on top of the background, but behind `covid19` and `user`):

1. Write a `for` loop that counts from `0` up to `1000` (the number of points of static to display)
2. Inside the `for` loop's curly brackets:
  1. Declare a variable `x` and assign it a random position between `0` and `width` (use `random()`!)
  2. Declare a variable `y` and assign it a random position between `0` and `height`
  3. Set the `stroke()` to white
  4. Draw a `point()` at your `x` and `y`

Hey presto! Static fizzing away against the background! Looks great! What happens if you display `5000` points of static? `10000`? `100000`???

It would be nice to use a variable instead of that number for static, so declare a variable `staticAmount` at the top of your program and assign it `1000` (or your choice of number) and use that in the `for` loop instead.

---

## "Finished"!

Now our program does what we said it would do!

There's always more tweaking we might do, but this is pretty good. We should probably add comments, though, if we didn't while we were doing the work!

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
