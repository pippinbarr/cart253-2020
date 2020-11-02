# Reintroducing p5.sound {

---

## In this module...

- The p5.sound we know
- `userStartAudio()`
- p5.sound the iceberg
- p5.SoundFile
- Backwards dog
- TMI?
  - `getPeaks()`
  - `addCue()`

---

## The p5.sound we know

To this point, we've used p5.sound to handle some basic elements of sound in our programs, namely: loading sound files and playing them.

And, indeed, p5.sound is great for that. We can make our program bark every time the user clicks the mouse, say:

```javascript
"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  // Just to be cute, let's also change the background color
  // based on whether the dog bark is currently playing
  if (barkSFX.isPlaying()) {
    background(255);
  }
  else {
    background(0);
  }
}

function mousePressed() {
  barkSFX.play();
}
```

To some extent, other than ideas like looping sounds (with `loop()`) and dealing with browser autoplay restrictions (by only trying to play sounds after a user interaction like a click or keypress), that's what we've used p5.sound for.

---

## p5.sound is an iceberg, I mean library

p5.sound is actually a **big** thing. In particular, p5.sound is a **completely separate library** from the regular p5.js library we use. Indeed, if you go and look in the `index.html` for a project using `p5.sound` (such as our template) you'll find it's in a separate file:

```html
<!-- Library script(s) -->
<script src="js/libraries/p5.min.js"></script>
<script src="js/libraries/p5.sound.min.js"></script>
```

This is because p5.sound is **big and complex** and full of its own detail. It made sense to the developers to separate it out into a **separate library**.

A **library** is effectively a collection of functions (or methods) and variables (or properties) that deal with some specific kind of task or idea. p5 is a library focused on making visually creative programs in JavaScript. p5.sound is a library focused on making sonically creative programs alongside the p5 library.

As you might image, then, p5.sound can do more than just play sound files.

---

## p5.sound has its own documentation

Whenever we deal with a library, we need to make sure we refer to its **documentation** or **reference**. We're already familiar with the reference material for p5, which is in the "Reference" section on p5js.org:

https://p5js.org/reference/

Well, p5.sound has its **own** documentation, completely separate from that of p5, which we can find by navigating to the library through the "Libraries" section on p5js.org:

https://p5js.org/reference/#/libraries/p5.sound

When we arrive on that page, we can immediately see that there is a **lot** more going on than just playing sound files. In fact, the sound file stuff is **literally** the tip of the iceberg - it's the first element of the library listed on that page, under the name `p5.SoundFile`.

**Terminology note:** You will most often find people referring to the kind of documentation we're looking at here, listing the possibilities a library offers, as its **API** documentation. API stands for Application Programming Interface.

---

## `userStartAudio()`

Before we delve further into the depths of the p5.sound library, let's take note of a nice "housekeeping" function we can start using, called `userStartAudio()`.

We already know that we can't play sounds until the user interacts with our program in some way (notably via a mouse click or a key press), and so we avoid trying to play audio until then.

A nice addition to our programs is to include `userStartAudio()` in our `setup()` which tells p5.sound to do some behind-the-scenes work to make this smoother. In the end, it doesn't change a lot in terms of the behaviour, but it's a good idea to include it anyway.

```javascript
"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
  // Tell p5.sound to work on starting the audio for this page as soon as
  // the user interacts with it
  userStartAudio()
}

function draw() {
  // Just to be cute, let's also change the background color
  // based on whether the dog bark is currently playing
  if (barkSFX.isPlaying()) {
    background(255);
  }
  else {
    background(0);
  }
}

function mousePressed() {
  barkSFX.play();
}
```

---

## `p5.SoundFile`

As we can see from the main documentation, `p5.SoundFile` is one part of the `p5.sound` API, available so we can "load and play sound files", which is what we've been doing with it.

However, let's delve into the documentation of `p5.SoundFile` specifically for a moment, just to get a sense of scale...

To view the documentation for this part of `p5.sound`'s API we click on its name on the main reference for the library, arriving at this page:

https://p5js.org/reference/#/p5.SoundFile

Let's decipher it...

### Example

This page begins with a conventional example of loading a sound file and playing it when the user clicks, much as we did above. That's the fundamental use of `p5.SoundFile`.

### Description

If we keep scrolling, however, we'll get more and more detail. There's a **Description** which explains the idea of loading files in `preload()` as well as providing multiple file formats for cross-browser compatibility.

### Syntax

We also run into a **Syntax** section that might be a little surprising because it discusses creating new `SoundFile` objects in our program in order to load a sound, unlike our usual use of `loadSound()`. This tells us that `p5.SoundFile` is a **class** and that, overall, `p5.sound` is implemented as a set of classes that deal with sound.

### Methods

The OOP-ness of p5.sound is emphasized when we get to the next section, called **Methods**, which tells us all the different things a `p5.SoundFile` can do.

It's also here that the iceberg begins to reveal itself, because the list of **Methods** is **much longer** than just `loadSound()`, `play()` and `loop()`! There are more than 30 different methods we can use with a `p5.SoundFile`.

For each method there is a separate documentation page that we can access by clicking on the method's name.

So, let's learn something newish...

---

## `rate()`

Let's read the documentation for the `rate()` method, which is described as: "Set the playback rate of a sound file. Will change the speed and the pitch. Values less than zero will reverse the audio buffer."

### Example

Again, it's fairly standard to have an **example** of any method in API documentation, and that's how we begin here, with a small program mapping the rate of a sound to the y position of the mouse.

### Description

The **description** repeats what we know, that `rate()` allows us to change the playback rate and even to **reverse** playback, which sounds fun!

### Syntax

The information on the syntax is pretty simple - we call `rate()` with a single argument that specifies the playback rate. `1` is normal playback, `2` is double speed, and `-1` would be reverse playback at the normal rate.

---

## Backwards dog

Often, reading the documentation can lead to some kind of idea! In this case, it sees like it would be very fun to make our dog bark **backwards**! To do this we still need to load and trigger our sound file as per usual, but before we play the sound we can set its playback rate with `rate()`...

```javascript
"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
  userStartAudio();
}

function draw() {
  background(0);
}


function mousePressed() {
  // Make the dog bark backwards by setting its rate to -1
  barkSFX.rate(-1);
  barkSFX.play();
}
```

A dog from the the Waiting Room in [_Twin Peaks_](https://www.youtube.com/watch?v=xw9bpuJRoyU) (kind of)! It sounds pretty eerie and seems like it would be fun to include in some kind of lightly disturbing experience? Maybe if we have some visuals the dog could be running backwards too? Starts to sound connected to a time-control game like [_Braid_](http://braid-game.com/)?

Maybe it would be interesting to experiment with different rates... and the best way to do that would be to make the rate **interactive** by mapping it to the mouse position as in the p5.sound example.

---

## Mapping rate to mouse position

Let's map the rate to the x position of the mouse, but let's make sure we include negative rates to explore those, perhaps a rate between `-3` and `3`?

```javascript
"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
  userStartAudio();
}

function draw() {
  background(0);

  // We can calculate the rate we should set the sound to by mapping
  // the mouse's x position to our desired range..
  let newRate = map(mouseX, 0, width, -3, 3);
  // And then set the rate of our sound file to the new rate
  // Note how we can do this while the sound is still playing!
  barkSFX.rate(newRate);
}

function mousePressed() {
  // Since we'll be playing around with the sound, it makes sense to loop it
  // so it doesn't stop.
  barkSFX.loop();
}
```

There are some very interesting sounds to be "found" in that space, moving the mouse around.

And indeed this is a lot of the fun of exploring a new library, a new API - we can end up **having new ideas just by exploring technical documentation**!

---

## The iceberg

So, we've seen that p5.sound is quite enormous, with all kinds of possibilities hidden within it. Even something as simple as dealing with a single sound file (in `p5.SoundFile`) turns out to have a huge number of interesting opportunities.

It can of course be easy to get overwhelmed, but the key is to remember you don't have to do **everything** that a library can do, just the things that **you find interesting**. The process is to browse through the documentation, looking for fun things to experiment with, and then take those things and use the documentation to implement them in your own project.

Reading documentation is certainly something we need to **practice**, however, as it can feel like a lot to deal with. Just remember to take it piece by piece.

Many great projects can be born just by exploring documentation.

---

## Summary

- p5.sound is a library full of new possibilities specifically connected to sound
- Reading the p5.sound API documentation is a great way to think of new ideas
- Reading and experimenting with API documentation is a skill we will build over time

---

## TMI?

### `getPeaks()`

One neat thing we can do with `p5.SoundFile` is visualize the waveform of the sound by using `getPeaks()`. This returns an array with data representing the amplitude of the sound over
time. We can use that data to graph the wave form on the canvas...

```javascript
"use strict";

let barkSFX;
let peaks; // To store our array of peaks

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Use getPeaks() to get the peaks in our sound file
  // We specify "width" as the size of the array of peaks
  // so that we can easily draw the waveform across the
  // width of the canvas, one piece of peak data per pixel
  peaks = barkSFX.getPeaks(width);
}

function draw() {
  background(0);

  // Display the peaks if the sound file is currently playing
  if (barkSFX.isPlaying()) {
    drawPeaks();
  }
}

// drawPeaks() runs through the array of peaks and graphs them
function drawPeaks() {
  push();
  stroke(255);
  // Run through every peak in the array
  for (let i = 0; i < peaks.length; i++) {
    // Get the current peak data
    let peak = peaks[i];
    // Map the data to a y position. The peak data is between -1 and 1
    // but we want to display it on the canvas, so we map to a number
    // between 0 and height
    let y = map(peak, -1, 1, 0, height);
    // Draw a line from the center of the canvas to the mapped peak value
    // with an x set to "i" because we're going through an array the
    // width of the canvas...
    line(i, height / 2, i, y);
  }
  pop();
}

function mousePressed() {
  barkSFX.play();
}
```

Even more fancy is `processPeaks()` which attempts to detect the **beat** of a sound file!

---

### `addCue()`

What if we wanted some dynamic text that represents the barking? We could use `addCue()` which allows us to trigger events at specific moments during a sound file's playback...

```javascript
"use strict";

let barkSFX;
// Whether to display "BARK!"
let showBarkText = false;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Add cues to our sound at specific times (in seconds)
  // which will call either showBark() or hideBark() in order
  // to only show the text during barking sounds...
  barkSFX.addCue(0.1, showBark);
  barkSFX.addCue(0.3, hideBark);
  barkSFX.addCue(0.4, showBark);
  barkSFX.addCue(0.7, hideBark);
}

function draw() {
  background(0);

  // If showBarkText is true, we should display BARK! on the canvas
  if (showBarkText) {
    push();
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`BARK!`, width / 2, height / 2);
    pop();
  }
}

// Called when the appropriate cue is triggered!
function showBark() {
  showBarkText = true;
}

// Called when the appropriate cue is triggered!
function hideBark() {
  showBarkText = false;
}

function mousePressed() {
  barkSFX.play();
}
```

---

# }
