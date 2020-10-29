class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.width = 30;
    this.height = 10;
    this.angle = random(0, TWO_PI);
    this.maxSpeed = 4;
    this.fill = {
      r: 255,
      g: 255,
      b: 0
    };
    this.speed = this.maxSpeed;
  }
}