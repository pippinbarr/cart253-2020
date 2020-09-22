// MoveablePerson
//
// A class that represents a simple moveable person
// controlled by the arrow keys. It can move around
class MoveablePerson {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, avatar) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Display properties
    this.avatar = avatar;
    // Input properties
    this.upKey = UP_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Jump
    if(keyIsDown(this.upKey)) {
    // Apply force from physics library
      // May add more complete platformer in the future.
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    this.x += this.vx;
    this.handleWrapping();
  }

  /**
    handleWrapping()
    Handles wrapping to the left and right.
    Prevents from going backwards but wraps when going forward.

  */
  handleWrapping() {
    if (this.x < 0) {
      // Reverse the velocity and sums it to the negative x value to block the left side
      this.vx = -this.vx;
      this.x += this.vx;
    }
    else if (this.x > width) {
      this.x -= width;
    }
  }

  // display
  //
  // Draw the avatar
  display() {
    const sizeMultiplier = 3;
    image(this.avatar, this.x, this.y, this.avatar.width * sizeMultiplier, this.avatar.height * sizeMultiplier);
  }
}
