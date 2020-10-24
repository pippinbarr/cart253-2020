// ChaserClown
//
// A class defining a clown displayed as an image that can chase another clown!

class ChaserClown extends Clown {

  // constructor(x, y, speed, clownImage)
  // Just calls the superclass constructor
  constructor(x, y, speed, clownImage) {
    super(x, y, speed, clownImage);
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
}