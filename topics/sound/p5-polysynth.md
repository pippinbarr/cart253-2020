# `p5.PolySynth` {

---

## In this module...

- The `p5.PolySynth` class
- Playing a note
- Fake pianist
- Ghost pianist
- Player piano

---

## The `p5.PolySynth` class

One of the elements available to us in p5.sound is a pair of synthesizer classes, `p5.MonoSynth` and `p5.PolySynth`. These exist to "play musical notes" as per the documentation on the p5.sound reference's main page:

https://p5js.org/reference/#/libraries/p5.sound

Let's focus in on the `p5.PolySynth` class specifically to explore the basics of what we can do with it. So, let's take a look at its documentation page...

https://p5js.org/reference/#/p5.PolySynth

### Example

The example shows us the basics: creating a `p5.PolySynth` and then using its `play()` method to play a series of notes. That's what a synthesizer does after all! Sounds nice!

### Description

The description is a little complex if you're not a serious synthesizer person, talking about "voices". Generally speaking, the number of voices a synthesizer has determines how many notes it can play simultaneously.

### Syntax

The main page shows us the syntax for creating a `new` `p5.PolySynth` object, pointing out that we can provide two arguments: the specific type of voice (which defaults to the `p5.MonoSynth`) and the number of voices (which defaults to `8`). Unless you really need to change them, we can probably leave those ideas alone.

### Fields (Properties)

The fields section tells us some key properties of a `p5.PolySynth` object which might be worth exploring down the line. Note they use the word "fields" where we would say "properties", this is just a terminology thing.

### Methods

The methods section is, as is usually the case, the place where the action is. Here is where we can see how to `play()` a note with our synthesizer object as well as to work with its **envelope**. In terms of sound, an **envelope** describes how a sound changes over time, in terms of its amplitude (volume) most often, but perhaps frequency (pitch) or other properties.

An envelope is frequently described in terms of ADSR, and in terms of the `p5.PolySynth` it controls amplitude (volume):

- [A]ttack: the amount of time is takes a note to reach maximum (attack) volume when the note is activated
- [D]elay: the amount of time to go down from the maximum (attack) volume to the regular (sustain) volume
- [S]ustain: the amount of time the note will be held at its regular (sustain) volume
- [R]elease: the amount of time the volume will decrease to zero from the sustain volume after the note is released

Playing around with the various envelope parameters can change sounds significantly! However, it's relatively complicated and we won't actually go into it here.

---

## Playing a note

Let's read the documentation for the `play()` method, which is the key method for us right now...

https://p5js.org/reference/#/p5.PolySynth/play

### Example

The example is the same as for the overall class, playing a set of three notes simultaneously when the mouse is pressed. Just looking at the code, we can see that we can specify notes in terms of musical notation! `G2` refers to a specific G note (two below "middle G" for what it's worth). `G3` refers to the G note one octave higher.

### Description

In the description we can see that `play()` uses two other methods, `noteAttack()` and `noteRelease()` to play a note.

### Syntax

In the syntax section we can see the specifics of how to play a note, including the parameters it accepts:

- The **note** itself, specified either as in musical notation in a string (e.g. `"G3"`) or as a frequency number (e.g. `440`).
- The **velocity** to play the note at, referring to how forcefully the note should be played (in the range `0` to `1`)
- The **delay** at which to play the note, i.e. how long to wait before playing it (in seconds)
- The **sustain** time of the note, i.e. how long the note should last before stopping

So if we had a `p5.PolySynth` object in the variable `synth` we could write

```javascript
synth.play(`C4`,1,0,1);
```

And this would play middle C forcefully with no delay for one second.

---

## Let's play that note!

To actually play a note, we have to

1. Create a synthesizer object
2. Play the note after a user input

```javascript
"use strict";

let synth;

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  synth = new p5.PolySynth();
}

function draw() {
  background(0);
}

function mousePressed() {
  synth.play(`C4`, 1, 0, 1);
}
```

Houston, we have a synthesizer working.

And that's really the main thing we can do! It's just that musical notes have a lot of **meaning** potentially, and we could play with that idea in our program. Let's try a couple of things...

---

## Fake pianist

One thing we might like to do is allow the user to pretend they're a pianist. We could:

1. Create an array of notes that sound good together (a specific scale would make sense)
2. Allow the user to press keys to start notes
3. When the user presses a key, choose a random note to play!

Let's do it...

```javascript
"use strict";

let synth; // Our synthesizer
let notes = [`F4`, `G4`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F5`]; // The scale for F minor

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create the synthesizer
  synth = new p5.PolySynth();
}

function draw() {
  background(0);
}

// keyPressed() plays a note
function keyPressed() {
  playRandomNote()
}

// playRandomNote() plays a random note
function playRandomNote() {
  // Chose a random note
  let note = random(notes);
  // Play it
  synth.play(note, 1, 0, 1);
}
```

Now you can sit there tapping away at keys and vaguely sound like you know what you're doing!

---

## Ghost pianist

We could use the same idea, but play random notes with a timer to create a spooky automatic music machine. We would use all the same ideas, but instead of playing our notes in `keyPressed()` we would play them in a function and we'd use `setInterval()` to call that function over and over...

```javascript
"use strict";

// Our synthesizer
let synth;
// The scale for F minor ("b" means "flat" if you haven't seen it before)
let notes = [`F4`, `G4`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F5`];
// To track the interval that plays note
let interval;

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create the synthesizer
  synth = new p5.PolySynth();
}

function draw() {
  background(0);
}

// mousePressed() starts and stops our piano playing
function mousePressed() {
  // First check that the piano isn't already playing
  // The interval will be undefined if it hasn't started
  if (interval === undefined) {
    // Start our interval, calling playRandomNote every 500 milliseconds
    // Assign the result to interval to remember the interval
    interval = setInterval(playRandomNote, 500);
  }
  else {
    // If they click when it's playing, clear the interval and set interval
    // back to undefined to stop play
    clearInterval(interval);
    interval = undefined;
  }
}

// playRandomNote() plays a random note
function playRandomNote() {
  // Chose a random note
  let note = random(notes);
  // Play it
  synth.play(note, 1, 0, 1);
}
```

Now if we click once, the mysterious ghost piano starts to play spookily, and if we click again, it stops. The power of randomness again!

That was fun!

---

## Player piano

We can use exactly the same idea to play notes **in sequence** by going through the array step by step. To do this we need:

1. Our array of notes again (we'll just use the same scale)
2. A variable to track which note to play by its index in the array, starting at `0`
3. An interval to play notes over and over, increasing the current note to play each time

```javascript
"use strict";

// Our synthesizer
let synth;
// The scale for F minor ("b" means "flat" if you haven't seen it before)
let notes = [`F4`, `G4`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F5`];
// The current note to play, start at the beginning
let currentNote = 0;
// To track the interval that plays note
let interval;

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  // Create the synthesizer
  synth = new p5.PolySynth();
}

function draw() {
  background(0);
}

// mousePressed() starts and stops our piano playing
function mousePressed() {
  // First check that the piano isn't already playing
  // The interval will be undefined if it hasn't started
  if (interval === undefined) {
    // Start our interval, calling playNextNote every 500 milliseconds
    // Assign the result to interval to remember the interval
    interval = setInterval(playNextNote, 500);
  }
  else {
    // If they click when it's playing, clear the interval and set interval
    // back to undefined to stop play
    clearInterval(interval);
    interval = undefined;
  }
}

// playNextNote() plays the next note in our array
function playNextNote() {
  // Chose the note at the current position
  let note = notes[currentNote];
  // Play it
  synth.play(note, 0.2, 0, 0.4);
  // Increase the current position and go back to 0 when we reach the end
  currentNote = currentNote + 1;
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}
```

And so we achieve the profound experience of listening to a robot practicing the F-minor scale forever and ever and ever. The horror, the horror.

---

## Summary

- The `p5.PolySynth` class lets us play notes with a synthesizer!
- Playing notes implies music!
- We can let the user play music!
- We can let the program itself play music!

---

# }
