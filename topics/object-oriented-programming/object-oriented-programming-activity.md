# Object-Oriented Programming activity {

## Objectives

1. Get comfortable with defining classes
2. Work with interacting classes via collision
3. Learn to feel okay about acceleration and gravity

---

## The idea

Let's make a juggling simulation!

_The user will control a rectangular "paddle" at the bottom of the screen, moving it horizontally with the mouse position. Balls will fall from the top of the screen. If they hit the paddle, they will bounce upward and fall again. If they miss the paddle, they will disappear off the bottom._

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `object-oriented-programming-activity`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "Activity: Started the Object-Oriented Programming activity" and push

Remember that it's a nice idea to commit (and push) throughout the activity as you get different things done. This will be part of the evaluation for exercises and projects.

---

## Make a plan

Here is a suggested plan:

1. Define a Paddle class
  - Create a new file for the class and include it in `index.html`
  - Write a constructor and methods to move and display the paddle
2. Set up the main program
  - Do basic setup like creating the canvas and setting a background
  - Add a paddle to the program
3. Define a Ball class
  - Create a new file for the class and include it in `index.html`
  - Write a constructor and methods to make the ball move, bounce, and display
  - To begin with make the ball bounce off the bottom of the screen (ignore the paddle)
4. Add balls to the main program
  - Create an array to store Ball objects
  - Add some new Ball objects to the array`
  - Go through the ball objects and move, bounce, and display them
5. Make the balls bounce on the paddle
  - Change the Ball class's bouncing function to instead bounce when the ball hits a paddle
  - Improve the bouncing function to make a ball move horizontally if it bounces toward the edges of a paddle

Let's do this!

---

## 1. Define the `Paddle` class

Let's start with the `Paddle` because it's easier.

We'll want to create a new file with a class definition, and then write methods to construct, move, and display our paddle.

---

### Create the class file

First we need a new file in our project to store the `Paddle` class in, so:

1. Create a new file in your `js/` folder called `Paddle.js`
2. Add a `<script>` tag to your `index.html` __before__ the main script to include your `Paddle.js` file

### Add the `class` structure

Now we want to get the basics of our Paddle class working. To begin with, we need the basic `class` structure for the `Paddle`.

`Paddle.js`
1. Add the standard `class` definition structure to the file to define a `Paddle`

### Add a `constructor()` to the class

The constructor should set the default properties of a paddle when it is created. Our paddle needs a position, a width, and a height. The width and height should be passed in as parameters.

`Paddle.js`
1. Define a `constructor()` method with two parameters, `w` and `h` (avoid `width` and `height` so they don't conflict with p5's variables of the same name)
2. Create properties `width` and `height` and set them to the parameters `w` and `h` (again: `this.width` and `this.height` to refer to the properties)
3. Add a property `x` (defaults to `0`) and `y` (set this to the `height` of the canvas minus half the height of the paddle to get it perfectly at the bottom) (remember you refer to properties with `this`, so it would be `this.x` and `this.y`)


### Add a `move()` method

We want the paddle to move according to the mouse position, but only __horizontally__ so we only need to adjust its `x` position

`Paddle.js`
1. Define a `move()` method in the class after the `constructor()`
2. In the method, set the `x` property to the mouse's x position (`mouseX`)

### Add a `display()` method

Unless we want to juggle with invisible "hands", we will need to see the paddle. So we'll need a method in the class that knows how to display a paddle on the canvas.

`Paddle.js`
1. Define a `display()` method
2. In the method use `push()` and `pop()` around your instructions to keep them isolated
3. Choose a `fill()` and `stroke()` and set `rectMode(CENTER)`
4. Draw a `rect()` at the paddle's position and with its dimensions

### Done

Now we have a `Paddle` class that tells our program how a paddle works.

---

## 2. Set up the main program

Back over in `script.js` we want to set up a basic program with a paddle in it!

---

### Basic setup

Let's do the basics!

`script.js`
1. Add a `createCanvas()` instruction to `setup()` to choose your canvas size
2. Add a `background()` instruction to `draw()` to choose a background color

### Add a paddle

Now we want to have a paddle in our program. We'll need a variable to store it, then we'll need to create the paddle, and then we'll need to move and display it...

`script.js`
1. Declare a variable called `paddle` at the top of the program
2. In `setup()` create a `new` `Paddle` object and store it in `paddle` (choose the dimensions of your paddle and use them as arguments)
3. In `draw()` call the `paddle`'s `move()` and `draw()` methods

### Done

Now we should have a program vaguely worth looking at. We should see our paddle moving around on the screen horizontally with the mouse.

---

## 3. Define a Ball class

Now let's work on our second kind of object, a ball. We'll need to create a class definition and write methods to handle movement, bouncing, and displaying. Our ball is going to use velocity and acceleration for movement. It's also going to be affected by __gravity__ so we'll need a method to handle that.

---

### Create the class file

First we need a new file in our project to store the `Ball` class in, so:

1. Create a new file in your `js/` folder called `Ball.js`
2. Add a `<script>` tag to your `index.html` __before__ the main script to include your `Ball.js` file

### Add the `class` structure

Now we want to get the basics of our `Ball` class working. To begin with, we need the basic `class` structure for the `Ball`.

`Ball.js`
1. Add the standard `class` definition structure to the file to define a `Ball`

### Add a `constructor()` to the class

The constructor should set the default properties of a `Ball` when it is created.

Our `Ball` will move using velocity __and__ acceleration, so we'll need to account for that with our properties.

A `Ball` needs a position, size, velocity, acceleration, and maximum speed. The position can be passed as parameters. For organization, we'll also have an `active` property to track whether the ball is still on the screen and part of the simulation.

`Ball.js`
1. Define a `constructor()` method with two parameters, `x` and `y`
2. In the method, add properties for `x` and `y` and assign them the values in the parameters
3. Add properties for velocity and acceleration, defaulting to `0`
4. Add a `maxSpeed` property, set it to something like `10`
5. Add a `size` property to set the size of the ball (`50`?)
6. Add an `active` property that defaults to `true` (balls should start out active)

### Add a `gravity()` method

Our ball needs to respond to gravity. This will allow it to fall downwards on its own. To do this, we'll create a method that takes a parameter specifying the amount of gravity to apply to the ball's `y` acceleration.

`Ball.js`
1. Define a `gravity()` method in the class that takes one parameter, `force`
2. Add the `force` parameter to the ball's `y` acceleration

A positive force will then cause the ball to accelerate __downwards__. That's what gravity does!

### Add a `move()` method

We want the ball to move according to its acceleration and velocity...

`Ball.js`
1. Define a `move()` method in the class after the `constructor()`
2. Add the acceleration to the velocity for both `x` and `y` axes
3. Constrain the velocity based on the maximum speed of the ball
4. Add the velocity to the position to move the ball

### Add a `bounce()` method

For now, let's have our ball bounce off the bottom of the canvas. To do this, we need to check if it has passed the bottom of the canvas (specified by `height`) and reverse its `y` velocity if so!

`Ball.js`
1. Define a `bounce()` method
2. Write an `if`-statement that checks if the bottom of the ball has gone past the bottom of the canvas
3. If it has:
  - reverse its `y` velocity (`vy`)
  - set its `y` acceleration to `0` (`ay`) (this is technically not right in terms of physics, but it will lead to a more entertaining simulation where a ball never loses its bounce height)

### Add a `display()` method

Unless we want to juggle with invisible balls, we will need to see the ball. So we'll need a method in the class that knows how to display a ball on the canvas.

`Ball.js`
1. Define a `display()` method
2. In the method use `push()` and `pop()` around your instructions to keep them isolated
3. Choose a `fill()` and `stroke()`
4. Draw an `ellipse()` at the ball's position and with its size

### Done

Now we have a `Ball` class that tells our program how a ball works. It's reasonably sophisticated even!

---

## 4. Add balls to the main program

For our `Ball` class to be of any use, we need to create some `Ball` objects and use them in the main program in `script.js` by calling their methods.

---

### Add a gravity variable

We want to apply gravity to our `Ball` objects, so let's declare a variable for gravity

`script.js`
1. Declare a variable called `gravityForce` with the value `0.0025` (you can play with the value later to affect gravity)

### Add a `balls` variable and a `numBalls` variable

We want to have more than one `Ball` in our program (you can't juggle __one__ ball can you?) so we'll want an array to store them in. We'll also want a variable that tells the program how many `Ball` objects to create

`script.js`
1. Declare a variable called `balls` and assign it an empty array
2. Declare a variable called `numBalls` and assign it the number of balls you want in the program (`3`?)

### Add `Ball` objects to the array

Now we want to create our `Ball` objects and put them in the array. We'll do this in `setup()`

`script.js`
1. Create a `for`-loop that counts from `0` up to `numBalls`
2. In the loop, create a new `Ball` object and assign it to a variable called `ball`. Give it a random `x` argument on the canvas and a random `y` argument above the canvas (negative)
3. Push the `ball` variable into the `balls` array

### Use the `Ball` objects by calling their methods

In order for the `Ball` objects in our `balls` array to do anything, we have to call their methods (`gravity()`, `move()`, `bounce()`, `display()`). We'll need another `for`-loop for this. We'll work inside `draw()`.

`script.js`
1. Create a `for`-loop that counts from `0` up to `balls.length`
2. In the loop call the `Ball` methods on each `ball` object
  - Call `gravity()` with `gravityForce` as an argument
  - Call `move()`
  - Call `bounce()`
  - Call `display()`

### Done

All going to plan, we should now see a program with our user-controlled paddle and three balls that drop from the top of the screen and bounce off the bottom of the screen!

---

## 5. Make the balls bounce on the paddle

The final thing we want is to "connect" the balls and the paddle so that they interact. That is, the balls should bounce on the paddle, and if they miss the paddle they should just fall off the screen and that's that.

---

### Modify the `Ball` class's `bounce()` method to work with a paddle

Since the ball is the thing that __bounces__ we'll still deal with bouncing there even though a paddle is now implicated (as the surface to bounce off). In order to make this work, the `bounce()` method will need to know about the paddle to check for bouncing on and will need to check if the ball has collided with that paddle.

`Ball.js`
1. Add a parameter called `paddle` to the `bounce()` method
2. Replace the conditional the checks if the ball touched the bottom of the screen with a conditional the checks if the ball has hit the top of the paddle. This will need to check
  - If the ball's `x` position is within the `x` range of the paddle (that is, greater than the left edge position of the paddle and less than the right edge position)
  - If the ball overlaps the paddle on the `y` axis (e.g. is the bottom position of the ball greater than the top edge of the paddle and is the top position of the ball less than the bottom edge of the paddle)
3. (Advanced?) Make the ball move horizontally based on how close to the left or right edge of the paddle it hits (we can use `map()` for this to map the distance of the ball from the centre of the paddle to a force to add to the ball's velocity)

---

### Pass the `paddle` as an argument to `bounce()`

Now that the `bounce` method receives a paddle as a parameter, we need to go back to the main script and make sure that we use `paddle` as an argument when we call it!

`script.js`
1. Change your `ball.bounce()` instruction to include the `paddle` as an argument

---

### Modify the `Ball` class's `move()` method to check if the ball goes off the bottom

We don't really want to keep simulating balls that have fallen off the bottom of the screen because they can't really do anything any more. So we should deactivate them if they pass the bottom of the canvas. So in the `move()` method:

`Ball.js`
1. Check if the ball has gone off the bottom of the canvas and deactivate it if it has (set `active` to `false`)

---

### Only update balls in the array if they are `active`

Now that we actually set out `active` property to false if a ball leaves the canvas, we should __use__ that fact. In particular there's no need to apply gravity to, move, bounce, or display any ball that isn't active, so in our `draw()` in the main script:

`script.js`
1. In the `for`-loop write an `if`-statement that only calls the `gravity()`, `move()`, `bounce()` and `display()` methods if the ball is active

### Done

We should now be able to happily bounce the various balls off our paddle for as long as we can keep it up! A juggling simulation!

---

## "Finished"!

Now our program does what we said it would do! Not bad, not bad.

We could do a few other things like
- Make the balls bounce of the left and right sides of the canvas
- Make the balls move at different speeds
- Make the balls be of different sizes
- Add a second paddle controlled some other way (keyboard) and try to actually juggle the balls two-"handed"!
- Add sounds that play when a ball bounces
- Add a new balls to the simulation over time if the user keeps going for long enough so they can set a record

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
