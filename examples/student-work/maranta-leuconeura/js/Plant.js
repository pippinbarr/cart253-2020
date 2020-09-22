// Leaves
//
// That class represents a leaves growing up.
// It illustrates the concept of a plant.

class Leaves {

  // constructor
  //
  // Set the initial values for the Leaves properties
  // Either sets default values or use the arguments provided
  constructor(x, y, width, height, avatar, growingRate, maxHeight) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display property
    this.width = width;
    this.height = height;
    this.originHeight = height;
    this.avatar = avatar;
    // Growing properties
    this.heightGrowingRate = growingRate;
    this.widthGrowingRate = this.heightGrowingRate / 2;
    this.maxHeight = maxHeight;
  }

  // display
  //
  // Display the leaf as an image
  display() {
    push();
    imageMode(CENTER);
    image(this.avatar, this.x, this.y, this.width, this.height);
    pop();
  }

  // grow
  //
  // Enlarge the plant on both axis
  grow() {
    if (this.height <= this.maxHeight) {
      this.width += this.widthGrowingRate;
      this.height += this.heightGrowingRate;
    }
  }

  // handleWinning
  //
  // Check if the plant as grown to its full size
  handleWinning() {
    if (this.height >= this.maxHeight) {
      gameOver = true
    }
  }
}