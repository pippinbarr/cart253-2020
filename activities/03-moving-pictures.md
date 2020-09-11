# Activity 03: Moving Pictures {

## Objectives

1. Continue to get comfortable using Git and GitHub when you work on new projects
2. Declaring and changing variables (especially JavaScript objects!)
3. Using `map()` and `constrain()`

---

## The idea

The idea for this activity will be to make a simple abstract animation:

_Two circles, the left one bigger and more transparent than the right, come in from either side of the screen, growing as they do so. They stop in the centre while still growing. The background goes from black to red._

There are many different and reasonable ways to interpret this, so feel free to go your own way! The steps discussed below are just one approach designed to use the ideas we've been seeing.

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `03-moving-pictures`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "A3: Started the moving pictures activity" and push

Remember, this is how we should __always__ start any new project, whether it's an experimental sandbox for lecture topics, an activity like this, or our final project.

Remember, too, that it's a nice idea to commit (and push) throughout the activity as you get different things done.

---

## Make a plan

If you want to go totally off road and just wing it, feel free, but generally it's still a good idea to have a plan. Here's one:

- First we'll figure out what variables we need
- Then we'll set up the canvas
- Then we'll set the background color, remembering it needs to change over time
- Then we'll deal with the left circle coming onto the screen, stopping in the middle, and growing
- Then we'll deal with the right circle doing the same thing

Quite a lot to think about, but we'll take it step by step

---

## Set up our variables

The key with working out our variables is about knowing what may need to __change__ during our program. Anything that __will change__ or that is a number we need to use in a function should be a variable.

We can think about the project in terms of three key "things": the background color, the first circle, and the second circle.

So:

1. Declare a variable called `bg` and assign it a JavaScript object (using curly brackets). For now don't put anything inside the object (the curly brackets)
2. Do the same thing for a variable called `circle1`
3. And again for `circle2`

Now we have our three parts of the program in three JavaScript objects in three variables. To continue, we'll need to figure out what __properties__ our objects need to have...

---

## Add properties for the background

The `bg` variable is going to be used to set the `background()` each frame, so it needs to have properties that can specify a color.

We know that colors are defined by __red__, __green__ and __blue__, and that we want to start our background as __black__ which is all `0`s, so

1. Create a property in the `bg` object for red (called it `red` or `r`) and set it to `0`. Remember a property starts with a __name__, then a __colon__ (`:`), then a __value__, then a __comma__
2. Do the same for green
3. Do the same for blue

---

## Add properties for the first circle

The `circle1` variable will contain our circle that moves in from the left. Let's think about what that circle needs to know and make properties for each thing

1. We need to know the circle's __position__ to draw it, so make `x` and `y` properties. The `x` should start at the __left__ (`0`) and the `y` should be the centre of the screen (depends on your height, note that you'll need to just use the __number__ here)
2. We need to know the circle's __size__ as well, so make a `size` property, start it as `100`
3. We need to set the circle's `fill()` for its shade and alpha values, so make a `fill` property and set it to white (`255`) and an `alpha` property set to something transparent (maybe `200`?)

There will be a few other things we'll end up wanting to make properties too (see if you can think of them!), but this will at least allow us to draw our ellipse on the screen for now.

---

## Add properties for the second circle

Do the same thing for the second circle, except its `x` property should start on the right (the width of your canvas as a number) and its `size` should be smaller than `circle1`s so that they can nest later on.

(Again, we'll actually do something smarter for the size stuff, but for now let's do it like this.)

__Okay!__ We now have the basic variables set up to make our program work.

---

## Set the canvas size and set no stroke

The first thing we want to do is specify the dimensions of our canvas. We'll do this in `setup()`:

1. Use the `createCanvas()` function to set the dimensions of your canvas to 500x500
2. Use `noStroke()` to remove stroke from our shapes (just for aesthetics)

---

## Color in the background

We want to use our `bg` variable to set the background color with `background()` at the start of `draw()`. We also want it to get more __red__ over time.

1. At the top of `draw()` add a comment that says "Background"
2. Use the `background()` function to set the background color using the `r`, `g`, and `b` properties of the `bg` object
3. Add some amount (maybe `1`?) to the `bg` object's `r` property so that it gets redder for the next frame

When you run the program you should now see the screen get more red over time!

---

## Draw the first circle

We now want to draw our first circle, which means setting its `fill()` and then drawing it as an `ellipse()`

1. After your `background()` instruction, add a comment that says "Circle 1" to show what you're doing
2. Use `fill()` to set the fill based on `circle1`'s `fill` and `alpha` properties
3. Use `ellipse()` to draw the circle based on its `x`, `y` and `size` properties

When you run the program you should see the first circle on the left now.

---

## Draw the second circle

Add a comment that says "Circle 2" after the `circle1` code to start your new instructions. Then repeat the previous step, but for `circle2` this time.

Now we have both circles on the screen.

---

## Make the first circle move right

Go back to your `circle1` code and __before__ the `fill()` instruction:

1. Add a positive number to `circle1`'s `x` property to make it move to the right (maybe `1`?)

When you run your program you should see `circle1` move to the right

---

## Make the first circle stop in the centre

We want our circle to stop moving once it reaches the centre of the canvas, so we'll use `constrain()`

1. After you add to `circle1`'s `x` property, use `constrain()` to limit that property to be between `0` (the left) and `width / 2` (the center)

When your run your program you should see `circle1` move to the right, then stop in the middle

---

## Repeat for the second circle

We want to do the same things for our second circle, with some small differences. So, just before the `fill()` for your second circle:

1. Add a __negative__ number to `circle2`'s `x` property to make it move __left__ (maybe `-1`?)
2. Use `constrain()` to limit that property to be between `width / 2` (the center) and `width` (the right)

Now the two circles should both move toward the centre, then stop (overlapping) in the middle. Quite satifying!

---

## Make the first circle grow

We want the circles to get bigger. For `circle1` we'll do that by adding to its `size` directly. We also want it to stop growing when it's the same width as the canvas.

1. After your code for changing `circle1`'s x property, add a positive number to `circle1`'s `size` property (maybe `0.25`?)
2. After adding to the `size` use `constrain()` to limit the circle's `size` property to be between `0` and `width`

Now the first circle moves and grows, and stops growing when it's the same width as the canvas!

---

## Make the second circle grow

We could use the same approach to make the second circle grow (just adding to its `size`), but instead let's make the size of our second circle __relative__ to the first circle. We can do that by setting its size to a __fraction__ of the first circle's size.

1. After your code for changing `circle2`'s x position, set its `size` property to be the `size` property of the __first__ circle multiplied by `0.9` (or some other fraction).

Both circles grow now! `circle1` grows because we add to its `size` and `circle2` grows because its `size` is relative to `circle1`'s. This also means `circle2` __stops__ growing when `circle1` does. Nice.

---

## "Finished"!

Now our program does what we said it would do!

However, there are things we could do to make it better. Most importantly, there are a few __numbers__ in our instructions that would be better if they were converted to variables/properties or otherwise removed. So for tidying up, let's do the following:

1. Instead of adding a number to the `bg` object's `r` property, try using `map()` to map the `r` property based on `circle1`'s `size`. Remember, we want the canvas to be __red__ by the time the circle grows to match the `width`
2. Instead of adding a positive number to `circle1`'s `x` position, give the circle a `speed` property with the same number and add that instead
3. Do the same for `circle2`'s `x` position (but set its `speed` to a negative number)
4. Instead of adding a positive number to `circle1`'s `size`, give it a `growth` property with that number and add that instead
5. Instead of setting `circle1`'s size with a fraction in the instruction, give `circle1` a `relativeSize` property set to that number and use that instead

After all this the program does the same thing, but it's much neater.

A further good thing to do, of course, is to add __more comments__ everywhere to make the code nice and readable.

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
