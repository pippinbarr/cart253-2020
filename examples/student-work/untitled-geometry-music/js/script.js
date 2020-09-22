"use strict";

/*************

Project 3
by Amanda Clement

This project features three scenes that share similar characteristics but
have distinctive features from one another. The user must press the spacebar to
begin and to navigate through the different visuals. Each scene responds to
mouse location and mouse click, and has accompanying audio.

*************/

// We create a JavaScript object with a property for each potential state of our
// program, making sure each one has a different value in it
let State = {
  STARTSCREEN: 0,
  ROTATINGSPHERES: 1,
  DIAMONDS: 2,
  DOMINOS: 3,
  ENDSCREEN: 4
};

// Then we can set our state to one of these properties in order to track state
let state = State.STARTSCREEN; // This variable tells us what state the program is in

// Inner and outer rotating spheres to build first effect
let rotatingInnerSphere;
let rotatingOuterSphere;

// Store diamonds in an array for second effect
let diamonds = [];
// Number of diamonds to be created
let numDiamonds = 50;

// Store dominos in an array for third effect
let dominos = [];
// Number of dominos to be created
let numDominos = 9;

// Music
let pianoMusic; // for the first effect
let ringingMusic; // for the second effect
let mysteriousMusic; // for the third effect

// Analyzer for measuring amplitude of music
let analyzer;

// preload()
//
function preload() {
  // MUSIC BY KAI ENGEL - https://freemusicarchive.org/music/Kai_Engel
  // Piano music (background music for first effect)
  pianoMusic = loadSound('assets/sounds/pianoMusic.mp3');
  // Ringing music (background music for second effect)
  ringingMusic = loadSound('assets/sounds/ringingMusic.mp3');
  // Mysterious music (background music for third effect)
  mysteriousMusic = loadSound('assets/sounds/mysteriousMusic.mp3');
}

// setup()
//
function setup() {
  // Use WEBGL since effects use 3D
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  // Create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(pianoMusic);
  analyzer.setInput(ringingMusic);
  analyzer.setInput(mysteriousMusic);

  // Creating the inner and outer rotating spheres (first effect)
  rotatingInnerSphere = new RotatingSphere(0.000002, 5);
  rotatingOuterSphere = new RotatingSphere(0.000001, 1);

  // Styling for the rotating spheres
  rotatingInnerSphere.styling();
  rotatingOuterSphere.styling();

  // Run a for loop numDiamonds times to generate each diamond
  // and put it in the array
  for (let i = 0; i < numDiamonds; i++) {
    diamonds.push(new Diamond());
    diamonds[i].styling();
  }

  for (let i = 0; i < numDominos; i++) {
    dominos.push(new Domino());
    dominos[i].styling();
  }
}

// draw()
//
function draw() {
  background(0);

  switch (state) {
    case State.STARTSCREEN:
      // Just a black screen with the HTML text on it
      // prompting user to press spacebar to begin
      break;

      // First effect is rotating spheres
    case State.ROTATINGSPHERES:
      rotatingOuterSphere.effect();
      rotatingInnerSphere.effect();
      rotatingOuterSphere.musicSpeed();
      rotatingInnerSphere.keyPressed();
      break;

      // Second effect is diamonds
    case State.DIAMONDS:
      for (let i = 0; i < diamonds.length; i++) {
        // Turning off music from previous effect
        pianoMusic.stop();
        diamonds[i].effect();
        diamonds[i].spin();
        diamonds[i].keyPressed();
      }
      break;

      // Third effect is dominos
    case State.DOMINOS:
      for (let i = 0; i < dominos.length; i++) {
        // Turning off music from previous effect
        ringingMusic.stop();
        dominos[i].effect();
        dominos[i].changeDimensions();
        dominos[i].keyPressed();
      }
      break;

      case State.ENDSCREEN:
      // Turning off music from previous effect
      mysteriousMusic.stop();
        // Just a black screen with the HTML text on it
        // indicating the end
      break;
  }
}

// keyPressed()
//
// When user clicks spacebar, they will be brought to new scene/effect
function keyPressed() {
  // If spacebar pressed on start screen, remove HTML text
  if (keyCode === 32 && state === State.STARTSCREEN) {
    document.getElementById('intro-text').style.display = 'none';
    state = State.ROTATINGSPHERES;
  } else if (keyCode === 32 && state === State.ROTATINGSPHERES) {
    state = State.DIAMONDS;
  } else if (keyCode === 32 && state === State.DIAMONDS) {
    state = State.DOMINOS;
  } else if (keyCode === 32 && state === State.DOMINOS) {
    state = State.ENDSCREEN;
    document.getElementById('ending-text').style.display = 'block';
  } else {
    state = State.STARTSCREEN;
  }
}
