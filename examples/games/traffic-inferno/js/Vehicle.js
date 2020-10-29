class Vehicle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = undefined;
    this.height = undefined;
    this.speed = 0;
    this.angle = 0;
    this.state = `active`; // active, on_fire, exploded
    this.fill = {
      r: 255,
      g: 255,
      b: 255
    };
    this.turnMax = 0.1;
    this.t = random(0, 100);
    this.erratic = 0.01;
    this.numFireParticles = 20;
    this.fireParticleSize = 10;
  }

  steer() {
    if (this.state === `exploded`) {
      return;
    }

    let angleNoise = noise(this.t);
    this.angle += map(angleNoise, 0, 1, -this.turnMax, this.turnMax);

    this.t += this.erratic;
  }

  move() {
    let vx = this.speed * cos(this.angle);
    let vy = this.speed * sin(this.angle);

    this.x += vx;
    this.y += vy;
  }

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

  checkCrash(vehicle) {
    // This is an imperfect way of checking collisions, but checking
    // rotated rectangles is COMPLICATED!!
    if (this.state === `active` || this.state === `on_fire`) {
      let d = dist(this.x, this.y, vehicle.x, vehicle.y);
      if (d < this.height / 2 + vehicle.height / 2) {
        this.explode();
        vehicle.explode();
      }
    }

    if (this.state === `active` && vehicle.state === `exploded`) {
      let d = dist(this.x, this.y, vehicle.x, vehicle.y);
      if (d < this.height / 2 + vehicle.width) {
        this.catchFire();
      }
    }
  }

  explode() {
    this.state = `exploded`;
  }

  catchFire() {
    this.state = `on_fire`;
  }

  display() {
    if (this.state === `active`) {
      this.displayVehicle();
    }
    else if (this.state === `on_fire`) {
      this.displayVehicle();
      this.displayFire();
    }
    else if (this.state === `exploded`) {
      this.displayVehicle();
      this.displayExploded();
    }
  }

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

  displayFire() {
    push();
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    for (let i = 0; i < this.numFireParticles; i++) {
      let randomRed = random(200, 255);
      fill(randomRed, 100, 100);
      let randomX = random(-this.width, 0);
      let randomY = random(-this.height / 2, this.height / 2);
      rect(randomX, randomY, this.fireParticleSize / 2);
    }
    pop();
  }

  displayExploded() {
    push();
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    for (let i = 0; i < this.numFireParticles; i++) {
      let randomRed = random(200, 255);
      fill(randomRed, 50, 50);
      let randomX = random(-this.width, this.width);
      let randomY = random(-this.width, this.width);
      rect(randomX, randomY, this.fireParticleSize);
    }
    pop();
  }
}