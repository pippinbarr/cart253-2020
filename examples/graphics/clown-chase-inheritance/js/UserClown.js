// UserClown
//
// A class defining a clown displayed as an image that can move with the
// arrow keys!

class UserClown extends Clown {

  // constructor(x, y, speed, clownImage)
  // Just calls the superclass constructor
  constructor(x, y, speed, clownImage) {
    super(x, y, speed, clownImage);
  }

  // handleInput()
  // Checks which arrow keys are held down and sets velocity
  // accordingly.
  handleInput() {
    // Handle horizontal movement
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }

    // Handle vertical movement
    if (keyIsDown(UP_ARROW)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
  }
}