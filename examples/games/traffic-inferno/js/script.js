"use strict";

/**************************************************
Traffic Inferno
Pippin Barr

A simulation of cars driving around insanely and crashing
into each other. The user controls their own car and gains
points the longer they drive around, losing points for
pausing.

Controls:
UP arrow to accelerate
DOWN arrow to decelerate
LEFT and RIGHT arrows to turn
**************************************************/

// The "AI" vehicles
let vehicles = [];
// How many AI cars at the start
let numCars = 1;
// How often to add a new AI car (milliseconds)
const ADD_CAR_DELAY = 2000;

// The user-controlled car
let userCar;

// Yes, this is the score
let score = 0;

// To track the interval that adds new cars over time
let addCarInterval;

// setup()
// Creates our canvas and cars, sets up the interval
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a user car in the centre of the canvas and add it to the vehicles
  userCar = new UserCar(width / 2, height / 2);
  vehicles.push(userCar);

  // Create all the AI cars
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new AICar(x, y);
    vehicles.push(car);
  }

  // Start an interval that will add new cars every interval
  addCarInterval = setInterval(addCar, ADD_CAR_DELAY);
}

// addCar
// Chooses a random edge of the canvas and creates a new car there
function addCar() {
  // Choose an x and y reflect the left, right, top, or bottom edge
  // of the canvas
  let x;
  let y;
  let r = random(0, 1);
  if (r < 0.25) {
    x = 0;
    y = height / 2;
  }
  else if (r < 0.5) {
    x = width;
    y = height / 2;
  }
  else if (r < 0.75) {
    x = width / 2;
    y = 0;
  }
  else {
    x = width / 2;
    y = height;
  }
  // Create and add a car at that position
  let car = new AICar(x, y);
  vehicles.push(car);
}

// draw()
// Update all the vehicles on the screen and display the score
function draw() {
  background(0);

  updateVehicles();

  // Check if the user exploded and stop the car-adding if so
  if (userCar.state === `exploded`) {
    clearInterval(addCarInterval);
  }

  // If the user isn't exploded, keep updating their score
  if (userCar.state !== `exploded`) {
    updateScore();
  }

  // Display the current score
  displayScore();
}

// updateVehicles()
// Goes through all vehicles moving and displaying them. Also
// checks for crashes
function updateVehicles() {

  // Go through every vehicle (includes the user)
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    // If the vehicle isn't exploded then move it
    if (vehicle.state !== `exploded`) {
      vehicle.steer();
      vehicle.move();
      vehicle.wrap();
    }

    // Display the vehicle regardless of explodedness
    vehicle.display();

    // Check for collisions against all the other vehicles
    for (let j = 0; j < vehicles.length; j++) {
      let vehicle2 = vehicles[j];
      // Only check for collision if the two cars are different
      if (vehicle2 !== vehicle) {
        vehicle.checkCrash(vehicle2);
      }
    }
  }
}

// updateScore()
// Add to the score if the user car is moving, subtract otherwise
function updateScore() {
  if (userCar.speed > 0) {
    score++;
  }
  else {
    score--;
    if (score < 0) {
      score = 0;
    }
  }
}

// displayScore()
// Displays the score as text at the top left
function displayScore() {
  push();
  textAlign(LEFT, TOP);
  textSize(32);
  fill(255);
  text(score, 10, 10);
  pop();
}