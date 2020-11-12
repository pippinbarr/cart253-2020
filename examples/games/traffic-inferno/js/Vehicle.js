// Vehicle
// Basic definition of a simulated vehicle that can drive around
// the canvas and also catch on fire and explode
class Vehicle {

  // constructor(x,y)
  // Creates a new vehicle at position x,y with vehicle properties
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;
    // Properties for dimensions
    this.width = undefined;
    this.height = undefined;
    // Properties for movement
    this.speed = 0;
    this.angle = 0;
    // Tracking the state of the vehicle
    this.state = `active`; // active, on_fire, exploded
    // Fill color
    this.fill = {
      r: 255,
      g: 255,
      b: 255
    };
    // How much the vehicle turns per frame (radians)
    this.turnMax = undefined;
    // Properties for blazing fires
    this.numFireParticles = 20;
    this.fireParticleSize = 10;
  }

  // steer()
  // Steering algorithm, to be implemented by subclasses
  steer() {
    if (this.state === `exploded`) {
      return;
    }
  }

  // move()
  // Standard movement with polar coordinates
  move() {
    let vx = this.speed * cos(this.angle);
    let vy = this.speed * sin(this.angle);

    this.x += vx;
    this.y += vy;
  }

  // wrap()
  // Standard wrapping at the edges of the canvas
  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
    else if (this.x < 0) {
      this.x += width;
    }

    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
  }

  // checkCrash(vehicle)
  // Handles checking for and reacting to a crash between two vehicles
  checkCrash(vehicle) {
    // Full crash
    // Only check if the vehicle is active or on fire
    if (this.state === `active` || this.state === `on_fire`) {
      // This is very imperfect way of checking collisions, but checking
      // rotated rectangles is COMPLICATED!!
      let d = dist(this.x, this.y, vehicle.x, vehicle.y);
      if (d < this.height / 2 + vehicle.height / 2) {
        // If they overlap then explode both vehicles
        this.explode();
        vehicle.explode();
      }
    }

    // Catching on fire
    // Only check if the current vehicle is not on fire and the other vehicle is
    if (this.state === `active` && vehicle.state === `exploded`) {
      // Again a bit of a lame way to check for catching on fire, but good enough
      let d = dist(this.x, this.y, vehicle.x, vehicle.y);
      if (d < this.height / 2 + vehicle.width) {
        // If this vehicle is in range of the blaze of the other, then it
        // catches on fire
        this.catchFire();
      }
    }
  }

  // explode()
  // Just changes state
  explode() {
    this.state = `exploded`;
  }

  // catchFire()
  // Just changes state
  catchFire() {
    this.state = `on_fire`;
  }

  // display()
  // Checks state and display the vehicle along with trail of fire
  // or explodedness as needed
  display() {
    // We always display the body of the vehicle
    this.displayVehicle();

    // If on fire then display the trail of fire too
    if (this.state === `on_fire`) {
      this.displayFire();
    }
    // If exploded then display the explosion too
    else if (this.state === `exploded`) {
      this.displayExploded();
    }
  }

  // displayVehicle()
  // It's a rectangle rotated to point in the right direction
  displayVehicle() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    rect(0, 0, this.width, this.height);
    pop();
  }

  // displayFire()
  // Displays radomly positioned fire particles at the back of the car
  displayFire() {
    // Displays fire particles between the centre of the car and out behind it,
    // and within the height of the car
    this.displayFireParticles(-this.width, 0, -this.height / 2, this.height / 2);
  }

  // displayExploded()
  // Displays fireparticles all around the car
  displayExploded() {
    this.displayFireParticles(-this.width, this.width, -this.width, this.width);
  }

  // displayFireParticles(minX, maxX, minY, maxY)
  // Displays fire particles in the area specified by an x range and a y range
  displayFireParticles(minX, maxX, minY, maxY) {
    push();
    noStroke();
    rectMode(CENTER);
    // Translate and rotate to match the main vehicle body
    translate(this.x, this.y);
    rotate(this.angle);
    // Draw a set number of fire particles
    for (let i = 0; i < this.numFireParticles; i++) {
      // Choose a random reddish fill
      let randomRed = random(200, 255);
      fill(randomRed, 50, 50);
      // Draw fire particles within the ranges specified on x and y
      let randomX = random(minX, maxX);
      let randomY = random(minY, maxY);
      rect(randomX, randomY, this.fireParticleSize);
    }
    pop();
  }
}