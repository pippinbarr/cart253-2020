# Activity 05: Looking for Love {

## Objectives

1. Use states to manage your program
2. Use functions to organize your program
3. Write a function with a parameter and return value

---

## The idea

Let's make another simulation:

_We will open with a title screen. When the simulation begins we see two circles in darkness, they each move off in a random direction. If they touch each other, the simulation ends with love triumphant! If one goes off the edge of the canvas, the simulation ends in deep sadness._

As always, there are different and reasonable ways to approach this, so feel free to go your own way! The steps discussed below are one approach designed to use the ideas we've been seeing.

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `05-looking-for-love`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "A5: Started the Looking for Love activity" and push

Remember that it's a nice idea to commit (and push) throughout the activity as you get different things done. This will be part of the evaluation for exercises and projects.

---

## Make a plan

If you want to go totally off road and just wing it, feel free, but generally it's still a good idea to have some kind of plan. Here's one:

1. Set up the program
  - Create objects representing our circles looking for love
  - Do basic set up of our canvas
  - Assign the circles random starting velocities in setup
  - Set the background in draw
2. Work on the simulation part
  - Get the circles moving and display them
  - Check for either circle moving off the screen (sadness)
  - Check for the circles intersecting (love)
  - Move the simulation stuff into functions
3. Add the idea of states (title, simulation, love, sadness)
  - Create a state variable and check it in draw
  - Add title, love, and sadness functions that use simple text
  - Connect the states (click to begin, simulation leads to outcomes)

Some stuff to do here. Let's do this!

---

## 1. Set up

---

## Create the objects

First we want to create variables containing our circles. We know that the circles move, so they'll need the standard set of properties: position, size, velocity, and speed. The circles should be positioned in the center of the canvas, but separated from one another by some distance. They shouldn't be moving.

1. Create the first circle (`circle1`) as a JavaScript object with properties `x`, `y`, `size`, `vx`, `vy`, and `speed`. Make the first circle start one third the width of the canvas and centered vertically, with size `100`, no velocity (`0` for both properties), and a `speed` of 5
2. Create the second circle (`circle2`) in the same way, but position it two thirds along the canvas horizontally and centered vertically.

---

## Set up the canvas

Create a canvas, of whatever size you prefer. In `setup()`.

1. Use `createCanvas()` to create your canvas. `windowWidth` and `windowHeight`? `500` and `500`? Something else?

---

## Start the circles moving

We want the circles to move in a random direction when our simulation starts, so we need to assign each circle a random velocity in both `vx` and `vy`, based on their `speed` properties. We can do this in `setup()` as well.

1. Set `circle1`'s `vx` and `vy` to a random number between `-circle.speed` and `circle.speed`
2. Do the same thing with `circle2`

The program won't do anything interesting for now. Nothing is being drawn!

---

## Fill the background

We probably want a background, so use `background()` to set a black background at the start of `draw()`.

---

## 2. The simulation

---

## Make the circles move

We want our circles to move according to their velocities and to display on the screen! Do that in `draw()`.

1. Move `circle1` by adding its `vx` to its `x` and its `vy` to its `y`
2. Move `circle2` in the same way
3. Display `circle1` as an ellipse using its `x`, `y` and `size` properties
4. Display `circle2` in the same way

Now the program should show two circles moving off in random directions each time we start it!

---

## Check for either circle going off the canvas

We need to know if either circle goes off the canvas because that's one of the endings of our simulation. So we should use an `if` statement that checks for this situation. It should check if either circle's `x` is less than `0` or greater than `width` and if either circle's `y` is less than `0` or greater than `height`.

We could have a giant `if` statement that checks every possibility using the `||` (or) operator. We could also think about writing a __function__ that takes a circle as an argument and __returns__ `true` if it's off the canvas and `false` if it's not. Then we could use that function in our `if` statement.

You choose!

In the actual action of the `if` we will just put a comment saying "Sad ending" or something like that, as we don't have a way to show the ending yet.

---

## Check for the circles overlapping

We also want to know if the circles overlap, because that is our "love" ending, where they find true love in the form of an identical circle. So we will need another `if` statement in `draw()` that checks if the distance between the circles is less than their two radiuses.

1. Calculate the distance between the two circles using `dist()`
2. Write an `if` statement to heck if the distance is less than the two circle's radiuses (half their size) added together
3. For now, put a comment as the action of the `if` that just says "True love!" or something as we don't have endings working

---

## "Refactor" into functions

We now have quite a few ideas in our code, and we could move different ideas into different functions.

1. Move the movement code into a `move()` function and call it
2. Move the off screen check code into a `checkOffscreen()` function and call it
3. Move the overlap check code into a `checkOverlap()` function and call it
4. Move the display code into a `display()` function and call it
5. Move all your simulation function calls into a `simulation()` function call and call it

Now `draw()` should just fill in the `background()` and then call `simulation()`. `simulation()` should call `move()`, `checkOffscreen()`, `checkOverlap()` and `display()`. Very tidy!

---

## 3. Add states

In order to make our program show a title screen, simulation screen, and ending screens, we need the idea of states controlling what we see.

---

## Create a state variable and check it

1. Add a `state` variable to the top of the program. Set it to `simulation` for now. (It will also be `title`, `love`, and `sadness` depending on what happens in the program.)
2. Add `if` statements to `draw()` that check whether `state` is `title`, `simulation`, `love`, or `sadness`
3. Move the `simulation()` function call into the action for `state` being `simulation`

The program should still run correctly because the `state` is set to `simulation`, and that calls the `simulation()` function.

---

## Add a `title()` function

We want to display a title for our simulation so

1. Define a `title()` function that displays the title as text (call it something like "LOVE?")
2. Call the `title()` function in the `if` statement that checks if `state` is `title`
3. Change `state` to `title` at the top to test your function (you should see the title)

---

## Go from title to simulation

We want to move from the title screen to the simulation itself when the user clicks the mouse.

1. Define a `mousePressed()` function in your program
2. In it, write an `if` statement that checks if `state` is `title`
3. If it is, set `state` to `simulation`

Now when you see the title, you should be able to click to start the simulation!

---

## Add a `love()` function

We want to display an ending when the circles find love.

1. Define a `love()` function that displays a text indicating the happy outcome! ("LOVE!")
2. Call the `love()` function in the `if` statement that checks if `state` is `love`
3. In the `if` statement that checks if the circles overlap (in `checkOverlap()`), set `state` to `love` to indicate the love ending should be triggered

Now if you run the program and the circles do intersect, you should see the love ending text.

---

## Add a `sadness()` function

We want to display an ending when the circles are forever alone.

1. Define a `sadness()` function that displays a text indicating the sad outcome! ("D:")
2. Call the `sadness()` function in the `if` statement that checks if `state` is `sadness`
3. In the `if` statement that checks if a circle has gone off screen (`checkOffscreen()`), set `state` to `sadness` if one has

---

## "Finished"!

Now our program does what we said it would do! Quite a nice thing actually!

We could do a few other things like
- Move the texts for the title, sad ending, and love ending into variables
- Improve our typography
- Improve colors etc.

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
