# `p5.Oscillator` {

---

## In this module...

- What is an oscillator?
- What is a `p5.Oscillator`?
- Playing a tone
- A theramin
- A hearing test
- Oscillating oscillators
- `random()` frequencies
- `noise()`-based frequencies

---

## What is an oscillator?

In a general sense, an **oscillator** is anything that varies in a repetitive way over time. An object hanging off a spring **oscillates** (bounces) up and down. Our hearts **oscillate** (beat) to circulate our blood. Guitar strings **oscillate** (vibrate) to generate sound. Sine waves **oscillate** between a value of `-1` and `1` over time.

Given that we're talking about sound here, we're particularly interested in the connection between oscillation and sound.

---

## What is a `p5.Oscillator`

In the p5.sound library there's a section called `p5.Oscillator` on the main documentation page:

https://p5js.org/reference/#/libraries/p5.sound

`p5.Oscillator` is a **class** that allows us to work with a specific kind of oscillation that generates sound. The initial description is: "Generate Sine, Triangle, Square and Sawtooth waveforms".

So we can see we're dealing with a combination of math (e.g. the sine waveform) and sound (after all, this is inside the p5.sound library).

In fact, what we're touching on here is the basis of musical **synthesis**, creating music out of math!

Let's investigate by clicking through to the `p5.Oscillator` documentation:

https://p5js.org/reference/#/p5.Oscillator

---

## `p5.Oscillator` documentation

### Example

The first thing we see in the documentation for `p5.Oscillator` is a pretty complex example that allows us to play neat tones that fade in and fade out.

It's sufficiently complicated that it might not be our greatest starting point, though it's fun to play around with the interactive nature of the example itself for a while and at least **hear** the possibilities.

### Description

The description gives us the basic idea behind this class, that we can "create a signal that oscillates between -1.0 and 1.0" and that it defaults to a sine wave.

### Syntax

This section is very brief, just showing us that we can create a `new` oscillator object and provide it with optional arguments for a frequency (the pitch of the sound) and type (the specific waveform to use).

### Methods

Finally, we have a list of the methods we can use with this kind of object. In fact there aren't all that many.

---

## Writing out own basic oscillator example

In order to get to grips with the oscillator we need to understand a couple of key ideas.

1. We need to create a `new` oscillator object in order to play around with it. We see in the `setup()` of the example in the documentation.
2. To actually hear the oscillator we need to call its `start()` method. We see this in the `playOscillator()` function in the documentation example.
3. (And to stop hearing the oscillator we need to call its `stop()` method or reduce its amplitude to `0` with `amp()` to mute it)

Let's use these basic ideas to generate a simple tone at 440Hz.

```javascript
"use strict";

let oscillator; // To store our oscillator

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator at 440Hz with a sine waveform
  oscillator = new p5.Oscillator(440, `sine`);
}

function draw() {
  background(0);
}

// mousePressed() starts our sine wave oscillator
function mousePressed() {
  oscillator.start();
}

// mouseReleased() stops our sine wave oscillator
function mouseReleased() {
  oscillator.stop();
}
```

There we go - the tone starts when we press down on our mouse and stops when we let go. This is really the basic idea!

---

## Playing around

Note that we could now play around by changing either the frequency from `440` to something else, and/or changing the waveform from `sine` to something else (`triangle`, `sawtooth`, `square`). Playing around like this is a great idea because it gives us more of a sense of the possibilities.

At a certain point, though, we might well think about making this interactive by allowing the user to control the frequency. We could turn to our good friend `map()` to convert the mouse position to the frequency the oscillator should play at.

---

## A `freq()`-based instrument

Once again, we find quite a nice example at the top of the documentation for the `freq()` method.

https://p5js.org/reference/#/p5.Oscillator/freq

In particular it shows us the idea that `freq()` is able not just to immediately set the frequency of an oscillator but also to change to the specific frequency **over time** and even **after a delay**, which could be really neat to play with at some point.

For now, though, let's rely on the core idea that we can change the frequency of an oscillator at any time with `freq()` and use `map()` to map the mouse's y position to new frequency settings.

```javascript
"use strict";

let oscillator; // To store our oscillator

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator at 440Hz with a sine waveform
  oscillator = new p5.Oscillator(440, `sine`);
}

function draw() {
  background(0);

  // Calculate a frequency between 0-440 based on the mouse's y position
  // We go from height to 0 so that higher frequencies are higher visually
  // on the canvas.
  let newFreq = map(mouseY, height, 0, 0, 440);
  // Set the frequency of the oscillator based on the mouse position
  oscillator.freq(newFreq);
}

// mousePressed() starts our sine wave oscillator
function mousePressed() {
  oscillator.start();
}
```

After clicking to start the oscillator we can wave the mouse up and down to create interesting transitions between frequencies. It's sounding a lot like an instrument and is allowing us to explore some of the sonic qualities of a simple waveform like this!

In fact it's starting to sound like a theramin...

---

## A theramin

A theramin is the ultimate instrument for spooky, ethereal music. It makes you think an alien is disembarking from a UFO or a ghost is phasing through a nearby wall.

The theramin allows its player to control both the pitch (frequency) of a tone as well as its volume (amplitude). Specifically, you play a theramin by moving your hands near to it! One hand controls frequency (pitch) and the other controls amplitude (volume).

So if we want a theramin program, we could play with `freq()`, mapping it to the y axis as above, but also `amp()` which allows us to control amplitude, mapping it to the x axis...

```javascript
"use strict";

let theramin; // To store our oscillator

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator
  theramin = new p5.Oscillator(0, `sine`);
}

function draw() {
  background(0);

  // Calculate a frequency between 0-880 based on the mouse's y position
  // We go from height to 0 so that higher frequencies are higher visually
  // on the canvas.
  let newFreq = map(mouseY, height, 0, 0, 880);
  // Set the frequency of the theramin based on the mouse position
  theramin.freq(newFreq);

  // Calculate an amplitude based on the mouse's position on the x axis
  let newAmp = map(mouseX, 0, width, 0, 0.5);
  // Set the amplitude
  theramin.amp(newAmp);
}

// mousePressed() starts our theramin
function mousePressed() {
  theramin.start();
}
```

You can potentially start to be quite expressive with this instrument!

We should note, too, that this is really about playing particular sounds (frequencies and amplitudes) based on a **position** on a canvas. We happen to be doing that with the **mouse position** in this example because it's easy to get going, but you could also do this with the position of **anything**!

---

## Hearing test

The frequency of our oscillator can go arbitrarily high - it will just try to play at whatever frequency we specify. This gives us the chance to explore what the highest pitch we can hear is!

We could write a program that takes a much wider range of frequencies to take into account the range of human hearing which is apparently around 20Hz to 20kHz. We could then move the mouse to test how high a frequency we can still actually hear. We should display the frequency on the canvas so we can tell...

```javascript
"use strict";

let oscillator; // To store our oscillator

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator
  oscillator = new p5.Oscillator(0, `sine`);
  // Set its amplitude down a bit or this could hurt
  oscillator.amp(0.1);
}

function draw() {
  background(0);

  // Calculate a frequency between 20-20000 based on the mouse's y position
  // We go from height to 0 so that higher frequencies are higher visually
  // on the canvas.
  /// 20Hz-20kHz is the standard range of human hearing
  let newFreq = map(mouseY, height, 0, 20, 20000);
  // Set the frequency of the oscillator based on the mouse position
  oscillator.freq(newFreq);

  // Display the current frequency on the canvas so we can tell what it is
  push();
  textSize(32);
  textAlign(LEFT, CENTER);
  fill(255);
  text(newFreq, 50, height / 2);
  pop();
}

// mousePressed() starts our test
function mousePressed() {
  oscillator.start();
}
```

I start to lose my sense of hearing it at roughly 16kHz, for the record. The younger you are, the higher frequencies you can likely hear.

Be gentle to your ears.

---

## Oscillating an oscillator

Let's continue to play around with the frequency of an oscillator. One interesting thing to think about is the idea of changing the frequency of an oscillator based on something else that oscillates! Rather than changing frequency with our mouse, what if we changed it based on a `sin()` function?

The `sin()` function oscillates between -1 and 1 as the angle provided changes. We can use that to map the output of a `sin()` function with a changing angle to the frequency of an oscillator...

```javascript
"use strict";

let siren; // To store our oscillator
let angle = 0; // The angle we'll use to oscillate the siren
let angleIncrease = 0.1; // How much to increase the angle each frame

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator
  siren = new p5.Oscillator(0, `sine`);
  // Set its amplitude down a bit or this could hurt
  siren.amp(0.25);
}

function draw() {
  background(0);

  // Increase the angle
  angle += angleIncrease;
  // Calculate the result of the sine of the current angle
  let sinAngle = sin(angle);
  // Map the result (between -1 and 1) to a frequency range
  let newFreq = map(sinAngle, -1, 1, 440, 880);

  // Set the frequency of the oscillator based on the sin calculation
  siren.freq(newFreq);
}

// mousePressed() starts our siren
function mousePressed() {
  siren.start();
}
```

A siren is born!

Again, playing around with the different elements like the `angleIncrease` or the frequency range being mapped to will lead to different and potentially fun results.

What if you set the angle increase much higher, like `1.5`? What if you `map()` the mouse position to set the `angleIncrease`?

What if you set a much wider frequency range, like between `0` and `4000`?

What if you use `tan()` instead of `sin()`?

It all sounds **amazing**!

---

## `random()` frequencies

Always interesting to just try out complete randomness. We could map the result of `random(0,1)` to a frequency range...

```javascript
"use strict";

let oscillator; // To store our oscillator

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator
  oscillator = new p5.Oscillator(0, `sine`);
  // Set its amplitude down a bit or this could hurt
  oscillator.amp(0.25);
}

function draw() {
  background(0);

  // Generate a random number
  let r = random(0, 1);
  // Map the result (between 0 and 1) to a frequency range
  let newFreq = map(r, 0, 1, 440, 880);

  // Set the frequency of the oscillator based on the random value
  oscillator.freq(newFreq);
}

// mousePressed() starts our siren
function mousePressed() {
  oscillator.start();
}
```

Sounds like a computer from a very old science fiction TV show!

---

## `noise()`-based frequencies

What might this sound like using Perlin `noise()` instead of pure randomness?

```javascript
"use strict";

let oscillator; // To store our oscillator
let t = 0; // The t (time) value to use with noise()
let tIncrease = 0.075; // How much to increase t each frame

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create a new oscillator
  oscillator = new p5.Oscillator(0, `sine`);
  // Set its amplitude down a bit or this could hurt
  oscillator.amp(0.25);
}

function draw() {
  background(0);

  // Generate a Perlin noise value based on our t value
  let perlinValue = noise(t);
  // Map the result (between 0 and 1) to a frequency range
  let newFreq = map(perlinValue, 0, 1, 110, 880);
  // Set the frequency of the oscillator based on the Perlin value
  oscillator.freq(newFreq);
  // Increase t
  t += tIncrease;
}

// mousePressed() starts our siren
function mousePressed() {
  oscillator.start();
}
```

It sounds kind of alive? Like some weird animal trapped in a jar? Interesting here to play around with both the `tIncrease` (the higher the number the close to purely random the results) and the frequency range.

---

## So fun!

How fun is this?! We can combine our knowledge of things like `map()` and `random()` and `noise()` (which deal in **numbers**) with a specific kind of number, the **frequency** of an audio waveform, to create all kinds of interesting effects.

The `p5.Oscillator` class is helping us to genuinely start to play with computer-generated and procedural sound!

---

## Summary

- `p5.Oscillator` allows us to create pure tones in our code
- By combining the basic idea of an oscillator with changing its frequency (with `freq()`) we can achieve many fun audio effects
- This is one of the great joys of many libraries (like p5.sound): they let us play!

---

# }
