// UserClown
//
// A class defining a clown displayed as an image that can move with the
// arrow keys!

class UserClown {

  // constructor(x, y, speed, clownImage)
  // Sets up the basic properties for movement and displaying
  constructor(x, y, speed, clownImage) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.image = clownImage;
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

  // move()
  // Updates the position with the velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // display()
  // Displays the image of this clown at its position
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}