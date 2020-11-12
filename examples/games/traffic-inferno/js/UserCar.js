// UserCar
// A kind of vehicle that can be steered by the user with the keyboard

class UserCar extends Car {
  // constructor(x,y)
  // Create a user car at position x,y
  constructor(x, y) {
    super(x, y);
    // Cyan fill
    this.fill = {
      r: 0,
      g: 255,
      b: 255
    };
    // Start out not moving
    this.speed = 0;
  }

  // steer()
  // Overriding steer() to use arrow key controls
  steer() {
    super.steer();

    // LEFT and RIGHT arrows turn the car
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= this.turnMax;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.angle += this.turnMax;
    }

    // UP arrow sets speed to max, otherwise the car stops
    if (keyIsDown(UP_ARROW)) {
      this.speed = this.maxSpeed;
    }
    else {
      this.speed = 0;
    }
  }
}