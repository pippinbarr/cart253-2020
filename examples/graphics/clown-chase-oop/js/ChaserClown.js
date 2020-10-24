// ChaserClown
//
// A class defining a clown displayed as an image that can chase another clown!
class ChaserClown {

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

  // chase(chased)
  // Sets velocity to move towards the position of the provided "chased" clown
  chase(chased) {
    // Determine the distance between the two
    let dx = this.x - chased.x;
    let dy = this.y - chased.y;

    // If x distance is negative, the chaser should move right
    if (dx < 0) {
      this.vx = this.speed;
    }
    // If x distance positive the chaser should move left
    else {
      this.vx = -this.speed;
    }

    // If y distance is negative, the chaser should move up
    if (dy < 0) {
      this.vy = this.speed;
    }
    // If y distance is positive, the chaser should move down
    else {
      this.vy = -this.speed;
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