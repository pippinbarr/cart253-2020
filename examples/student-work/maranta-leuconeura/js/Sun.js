// Sun
//
// That class represents a bright sun.
// It illustrates the concept of a sunny day.
// It is two ellipse that change size to make a glowing effect

class Sun {

  // constructor
  //
  // Set the initial values for the Sun's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, reductionRate, growingRate, maxRadius, minRadius, fill, translationRate) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display porperties
    this.radius = radius;
    this.reductionRate = reductionRate;
    this.growingRate = growingRate;
    this.changeRate = this.reductionRate;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    this.fill = fill;
    // Box properties
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10
    this.translationRate = translationRate;

  }

  // resize
  //
  // Reduce and enlarge its size gradually to make it look like its glowing
  resize() {
    // The sun's radius is increasing or decreasing according to its current size
    if (this.radius > this.maxRadius) {
      this.changeRate = this.reductionRate;
    }
    if (this.radius < this.minRadius) {
      this.changeRate = this.growingRate;
    }
    this.radius += this.changeRate;
  }

  // display
  //
  // Draw the object with an ellipse
  display() {
    push();
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

  // translation
  //
  // The sun moves to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  translation() {
    this.x -= this.translationRate;
    if (this.x - 500 < this.resetX) {
      this.x = this.x + this.ninthFrameX;
    }
  }
}