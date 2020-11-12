// AICar
// A kind of vehicle that can steer itself according to Perlin noise

class AICar extends Car {
  // constructor(x,y)
  // Creates an AI car
  constructor(x, y) {
    super(x, y);
    // Yellow fill
    this.fill = {
      r: 255,
      g: 255,
      b: 0
    };
    // Start out alreaduy moving at maximum speed
    this.speed = this.maxSpeed;
    // A random time value for Perlin noise
    this.t = random(0, 100);
    // How fast does the time value change (the higher the more erratic the driving)
    this.erratic = 0.01;
  }

  // steer()
  // Steers the car's angle with Perlin noise
  steer() {
    super.steer();

    // Get the next noise value
    let angleNoise = noise(this.t);
    // Map the noise value to a turning amount in the turning range
    this.angle += map(angleNoise, 0, 1, -this.turnMax, this.turnMax);
    // Increment the time value
    this.t += this.erratic;
  }
}