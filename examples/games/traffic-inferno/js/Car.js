// Car
// A specific sized vehicle

class Car extends Vehicle {
  // constructor(x,y)
  // Creates a car
  constructor(x, y) {
    super(x, y);
    // Specify dimensions
    this.width = 30;
    this.height = 10;
    // Randomise starting rotation
    this.angle = random(0, TWO_PI);
    // Define maximum speed of movement
    this.maxSpeed = 4;
    // Maximum turning rate
    this.turnMax = 0.1;
  }
}