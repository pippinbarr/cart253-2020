# Sound activity {

## Objectives

1. Use oscillators to add sound to movement
2. Use a synth to add sound to collision
3. Marvel at the majesty of physics-music

---

## The idea

Let's make a simple musical toy!

_The canvas will start blank and the user can add moving circles by clicking. As a circle moves it will emit a tone based on its distance from the centre of the canvas. When a circle touches the edges of the canvas it will bounce, and play a note!_

The result will hopefully be a kind of musical instrument based on some basic physics programming and an example of how we can use procedural sound creatively.

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `sound-activity`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "Activity: Started the sound activity" and push

Remember that it's a nice idea to commit (and push) throughout the activity as you get different things done. This will be part of the evaluation for exercises and projects.

---

## Make a plan

Here is a suggested plan:

1. Write a basic Ball class
2. Integrate the class into the main script
3. Add an oscillator to the Ball class
4. Add a synthesizer to the Ball class

Let's do this!

For the ideas that we've seen before in activities, the instructions will be shorter!

---

## 1. Write a basic Ball class

The main entity in our toy is a simple circle that can move around on the canvas and bounce off the edges. We've made this kind of thing various times, but let's think about the steps anyway...

1. Create the class file
2. Add a `constructor()`
3. Add a `move()` method
4. Add a `bounce()` method
5. Add a `display()` method

---

### Create the class file

1. Create a new file in your `js/` folder called `Ball.js`
2. Add a `<script>` tag to your `index.html` __before__ the main script to include your `Ball.js` file
3. Add the standard `class` definition structure to the file to define a `Ball`

---

### Add a `constructor()`

For now we want to construct a ball that can move around on the screen, so it'll need position, velocity, and speed properties. It would make sense to set its position via parameters. Let's also have a randomized fill property for beauty and success!

1. Define a `constructor()` method with two parameters, `x` and `y`
2. Set position properties via the parameters
3. Set a size property to a size you like (`50`?)
4. Set a fill property that contains an object with random `r`, `g` and `b` properties (maybe set them to something like `random(200,255)`?)
5. Set a speed property to a movement speed you like (`3`?)
6. Set velocity properties to random numbers in the range `-this.speed` to `this.speed`

---

### Add a `move()` method

Do the usual thing of adding the velocity to the position!

---

### Add a `bounce()` method

We need to check if the ball should bounce off the "walls" of the canvas (its edges). We need to check both horizontally and vertically and reverse the appropriate velocity if needed.

1. Check if the ball has moved past the left or right edge of the canvas (is its x position less than `0` or greater than `width`?)
  1. If so, reverse its x velocity
1. Check if the ball has moved past the top or bottom edge of the canvas (is its y position less than `0` or greater than `height`?)
  1. If so, reverse its y velocity

If we want to make the bouncing look nice, we should take account of the ball's `size` property as well.

---

### Add a `display()` method

Display the ball as a circle on the canvas. Use its `fill` property.

---

### Done.

---

## 2. Integrate the class into the main script

Okay. Now we have a class that defines a ball that can move and bounce around on the canvas. Clearly our program doesn't yet do anything because we haven't got any of these objects in our main program, so let's get to that.

The plan is that the user can click to add new balls to the canvas, so we'll need an array to store them in, we'll need to move and display the balls in the array in `draw()` and we'll need to add new balls when the user clicks.

---

### Integrate!

`script.js`
1. Add an empty array called `balls` to the top of your script
2. In `setup()` create a canvas with your preferred dimensions
3. In `draw()`
  1. Set the `background()`
  2. Write a `for`-loop that goes through the `balls` array and for each one call `move()`, `bounce()` and `display()`
4. Define a `createBall(x,y)` function and in it
  1. Create a new `Ball` object at the specified location (store it in a variable called `ball`)
  2. Add the new object in `ball` to your `balls` array (use `push()` with your array)
5. Define a `mousePressed()` function and in it
  1. Call the `createBall()` function, passing the current mouse position as arguments

---

### Done!

If we run the program now, we should be able to click on the canvas and see a new ball appear and start to move and bounce on the canvas!

---

## 3. Add an oscillator to the Ball class

Now that we've got our core simulation running, it's time to integrate our audio ideas! The first idea is that a `Ball` should include an oscillator that plays a tone based on its distance from the center of the canvas. We will:

1. Add an oscillator to the `constructor()`
2. Change the oscillator's frequency in `move()`
3. Add `userStartAudio()` to the main script

---

### Add an oscillator to the `constructor()`

In our `constructor()` we need to create an oscillator as a property of the ball. We'll also need properties that determine its minimum and maximum frequency range. In addition, we should start the oscillator in the `constructor()` and probably turn its amplitude down a bit (they can be quite loud!).

`Ball.js`
1. Add an `oscillator` property to the `constructor()` and assign it a new `p5.Oscillator` object
2. Add `nearFreq` and `farFreq` properties that determine the frequency when the oscillator is near to the center or far from it (maybe `220` and `440`? You could also randomize this.)
3. Set the amplitude of the oscillator to something a bit quiet (maybe `0.1`? Use the `amp()` method)
4. Start the oscillator (use the `start()` method)

If you start the program now, your ball objects will drone at the default frequency as they move around.

---

### Change the oscillator's frequency in `move()`

We want the ball's oscillator's frequency to be determined by its proximity to the center of the canvas, so we need to check the distance and map the frequency based on it. So, in `move()`:

`Ball.js`
1. Calculate the distance between the ball and the center of the canvas
2. Calculate the maximum distance between the ball and the center of the canvas (you can either do this by getting the distance from `0,0` to the center, or do it with Pythagoras yourself!)
3. Create a `newFreq` variable and assign it the `map()` of the distance from the ball to the center of the canvas, which has a range `0` to the maximum you calculate, and should be mapped to the range specified by the `nearFreq` and `farFreq` properties
4. Set the frequency of the oscillator to `newFreq` using the `freq()` method

---

### Add `userStartAudio()` to the main script

To be professional, let's call `userStartAudio()` in `setup()` since we're doing sound stuff now

`script.js`
1. Call `userStartAudio()` in `setup()`

---

### Done

Now if you run the program, the balls will shift frequency based on their proximity to the centre of the canvas. Beautiful generative physics music!

---

## 4. Add a synthesizer to the Ball class

Our second musical flourish it to have each ball play a note on a synthesizer when it bounces off a "wall". It would be nice if different balls played different notes from a scale so we get something more musical, so we'll provide a note to play in the constructor. We'll therefore also need to represent the scale and assign a note in the main program. We will:

1. Add a note and synthesizer to the `Ball` constructor
2. Play the note in `bounce()` when appropriate
3. Integrate notes into the main script

---

### Add a note and synthesizer to the `Ball` constructor

First of all we need each `Ball` to have a synthesizer object it can use to play a note, and it needs to know which note to play!

`Ball.js`
1. Add a `note` parameter to the `constructor` and store it in a `note` property
2. Add a `synth` property and assign it a new `p5.PolySynth` object

---

### Play the note in `bounce()` when appropriate

Now we need to play the note **if** the ball bounces.

`Ball.js`
1. Define a `playNote()` method that plays the ball's note using its synthesizer (you can choose the velocity, delay, and sustain parameters as desired, maybe `0.2,0,0.1`?)
2. In `bounce()` call the `playNote()` method if the ball bounces (don't forget to use `this` when calling the method)

---

### Integrate notes into the main script

Our notes don't play yet because we haven't specified which note to play in the `constructor()`. We'll need a scale of notes to choose from (for musicality!) and we'll need to provide a random note to each new `Ball` as we create it.

`script.js`
1. Add a `notes` variable to the top of the program and assign an array containing a scale of notes (each note should be in a string). For example, F-minor is `F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`.
2. In the `createBall()` method:
  1. Choose a random note from the `notes` array
  2. Pass the note as an argument to `Ball`'s constructor when it is created (after its position)

---

### Done

Ha! Now the balls bounce and play their random notes. It sounds beautiful, like the music of the universe!

---

## "Finished"!

We have a musical generation toy. John Cage and Brian Eno are so proud of us.

We could do many other things:
- Add more physics so the balls bounce off each other and play notes
- Make balls deletable so the user can tweak their toy's sound further
- Make balls draggable and throwable to give a little more finesse to the user's input
- Calculate a ball's frequency in a more sophisticated way rather than just the distance from the centre
- Change a ball's fill based on its frequency
- Make a ball flash when it plays a note for visual feedback
- And so on!

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
