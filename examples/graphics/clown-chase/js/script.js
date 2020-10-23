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
  user = createClown(width / 3, height / 2, 5, userImage);
  // Create the evil clown to the right, with slower speed and the correct image
  evilTwin = createClown(2 * width / 2, height / 2, 1, evilTwinImage);
}

// createClown()
// Creates a clown, parameters for
// - starting position
// - maximum speed
// - image to display
function createClown(x, y, speed, clownImage) {
  let clown = {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    speed: speed,
    image: clownImage
  };
  return clown;
}

// draw()
// Calls the programs methods to make the evil clown chase
// the user clown
function draw() {
  background(0);

  // Update the user velocity based on keyboard
  handleUserInput();
  // Make the evil clown chase the user
  chase(evilTwin, user);

  // Move both clowns
  move(user);
  move(evilTwin);

  // Display both clowns
  display(user);
  display(evilTwin);
}

// handleUserInput()
// Use the arrow keys to set the user clown's velocity
function handleUserInput() {
  if (keyIsDown(LEFT_ARROW)) {
    user.vx = -user.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    user.vx = user.speed;
  }
  else {
    user.vx = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    user.vy = -user.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    user.vy = user.speed;
  }
  else {
    user.vy = 0;
  }
}

// chase(chaser, chased)
// Set the chaser clown's velocity so that it moves
// toward the chased clown's position
function chase(chaser, chased) {
  // Determine the distance between the two
  let dx = chaser.x - chased.x;
  let dy = chaser.y - chased.y;

  // If x distance is negative, the chaser should move right
  if (dx < 0) {
    chaser.vx = chaser.speed;
  }
  // If x distance positive the chaser should move left
  else {
    chaser.vx = -chaser.speed;
  }

  // If y distance is negative, the chaser should move up
  if (dy < 0) {
    chaser.vy = chaser.speed;
  }
  // If y distance is positive, the chaser should move down
  else {
    chaser.vy = -chaser.speed;
  }
}

// move(clown)
// Moves the provided clown based on its velocity
function move(clown) {
  clown.x += clown.vx;
  clown.y += clown.vy;
}

// display(clown)
// Displays the provided clown using its position and image
function display(clown) {
  push();
  imageMode(CENTER);
  image(clown.image, clown.x, clown.y);
  pop();
}