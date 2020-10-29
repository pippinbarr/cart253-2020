class UserCar extends Car {
  constructor(x, y) {
    super(x, y);
    this.width = 30;
    this.height = 10;
    this.angle = random(0, TWO_PI);
    this.maxSpeed = 4;
    this.turnMax = 0.1;
    this.fill = {
      r: 0,
      g: 255,
      b: 255
    };
    this.speed = 0;
  }

  steer() {
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= this.turnMax;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.angle += this.turnMax;
    }

    if (keyIsDown(UP_ARROW)) {
      this.speed = this.maxSpeed;
    }
    else {
      this.speed = 0;
    }
  }
}