# Basic sound {

---

## In this module...

- Sound is great!
- p5.sound
- Loading and playing a sound
- Browser autoplay restrictions :(

---

## Sound is great!

Sound is one of the most expressive elements of a program. From special effects to music, sound can be what really makes our programs come alive and be interesting to interact with.

Sound means music, speech, ambience, birds, trains, shepard tones, synthesizers, the Wilhelm Scream, and much more.

So, we want to be able to play sounds in our p5 programs, clearly.

---

## p5.sound

There is actually an entirely separate __library__ called p5.sound that handles loading and playing sounds ([among other things](https://p5js.org/reference/#/libraries/p5.sound)) in a p5 program.

It's already included by default in our template, which you can see both from the file `p5.sound.min.js` in our `js/libraries` folder, and from the script tag in our `index.html`:

```html
<script src="js/libraries/p5.sound.min.js"></script>
```

So we're ready to begin.

---

## Loading and playing a sound

Loading and playing sounds is pretty similar to how p5 handles images.

1. We load a sound file in a variable (like `mySound`) in `preload()` with `loadSound()`
2. We play the sound file while our program runs with `mySound.play()`

For a simple example, let's play the sound of a barking dog when the user clicks the mouse:

```javascript
let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
}

function mousePressed() {
  barkSFX.play();
}
```

When we click the mouse, the sound file plays! As easy as that.

A couple of notes:
1. Note that when we click __while the file is already playing__ it restarts, that's the default behaviour
2. Note that the specific sound files formats supported varies from browser to browser (`.wav` works on everything but Microsoft Edge, `.mp3` works on basically everything, `.ogg` works on Chrome, Firefox, and Opera)
3. If you look in the JavaScript Console you will see an error `Uncaught TypeError: Cannot read property 'length' of undefined at RingBuffer.push`, which is scary, but which we will ignore. (It's a problem with the p5.sound library itself)

---

## Browser autoplay restrictions :(

You might excitedly want to use this setup to play some music in `setup()` that would then play for the rest of your program, but it (almost always) doesn't work!

```javascript
let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(500, 500);

  barkSFX.play();
}

function draw() {
  background(0);
}
```

If you look in the JavaScript console, you'll see a __warning__ that reads:

`The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.`

This is telling us that in general a JavaScript program (like ours) isn't allowed to play a sound on a webpage __until the user has interacted with the page__.

Our original example worked because we only ever played the sound after the user had __clicked__. In the above example, there's no time for a user interaction before we try to play the sound, so it doesn't work.

---

## Responding to autoplay restrictions

There are a multitude of different ways of dealing with this desire to play a sound at the "start" of our program, potentially before the user has interacted.

Note that we can play __any__ sound __anytime__ after the __first__ user interaction (we don't need a user interaction for every sound).

Let's imagine we have some looping music we want to play. The simplest approach would be to start playing it __when the user interacts for the first time__. To do that we want to __play it on a loop__ it when the user clicks (or hits a key), but then we __don't__ want to play it again after that (because we don't want it to restart).

Fortunately we can use `loop()` to play a sound as a loop, and we can use `.isPlaying()` to check if a sound is already playing...

```javascript
let music;

function preload() {
  music = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
}

function mousePressed() {
  tryMusic();
}

function keyPressed() {
  tryMusic();
}

function tryMusic() {
  // Play music if this is the first interaction
  if (!music.isPlaying()) {
    music.loop();
  }
}
```

This successfully starts our music on the first user interaction.

Another approach that is very common is to have a starting screen that simply reads "click to begin" or something similar, and to use this moment of forced user interaction to play music and other sounds.

---

## Summary

- We use the p5.sound library to play sounds
- We load sounds with `loadSound()` in `preload()` and play sounds with `play()` or `loop()` after there has been at least one user interaction

---

# }
