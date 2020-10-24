"use strict";

// Variables to store our two entities
let user;
let evilTwin;

// Variables to store our two images
let userImage;
let evilTwinImage;

// preload()
// Load our two images into their variables for later
function preload() {
  userImage = loadImage(`assets/images/user.png`);
  evilTwinImage = loadImage(`assets/images/evil-twin.png`);
}

// setup()
// Create a canvas and two clowns!
function setup() {
  createCanvas(600, 600);

  // Create the user clown to the left, with faster speed and the correct image
  user = new UserClown(width / 3, height / 2, 5, userImage);
  // Create the evil (chaser) clown to the right, with slower speed and the correct image
  evilTwin = new ChaserClown(2 * width / 2, height / 2, 1, evilTwinImage);
}

// draw()
// Calls the methods to make the evil clown chase
// the user clown
function draw() {
  background(0);

  // Get input from the user
  user.handleInput();

  // Make the evil twin chase the user
  evilTwin.chase(user);

  // Move both clowns
  user.move();
  evilTwin.move();

  // Display both clowns
  user.display();
  evilTwin.display();
}