"use strict";

/**************************************************
Traffic Inferno
Pippin Barr

A simulation of cars driving around insanely and crashing
into each other.
**************************************************/

let vehicles = [];
let numCars = 1;

let userCar;

let score = 0;

let addCarInterval;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  createCanvas(600, 600);

  userCar = new UserCar(width / 2, height / 2);
  vehicles.push(userCar);

  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  addCarInterval = setInterval(addCar, 2000);
}

function addCar() {
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
  let car = new Car(x, y);
  vehicles.push(car);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    if (vehicle.state !== `exploded`) {
      vehicle.steer();
      vehicle.move();
      vehicle.wrap();
    }

    vehicle.display();

    for (let j = 0; j < vehicles.length; j++) {
      if (i !== j) {
        let vehicle2 = vehicles[j];
        vehicle.checkCrash(vehicle2);
      }
    }
  }

  if (userCar.state === `exploded`) {
    clearInterval(addCarInterval);
  }
  else {
    updateScore();
  }

  displayScore();
}

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

function displayScore() {
  push();
  textAlign(LEFT, TOP);
  textSize(32);
  fill(255);
  text(score, 10, 10);
  pop();
}