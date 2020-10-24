// Class clown! Ahahahaha!
class Clown {
  constructor(x, y, speed, clownImage) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.image = clownImage;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}