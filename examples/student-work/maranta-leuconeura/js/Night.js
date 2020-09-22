// Night
//
// That class represents a night sky full of stars.
// It illustrates the concept of night time.
// It is basically tiny ellipse (sparkling stars).

class Night {

  // constructor
  //
  // Set the initial values for the Night's properties
  // Either sets default values or uses the arguments provided
  constructor(starX, starY, moonX, moonY, radius, reductionRate, growingRate, translationRate) {
    // Star position
    this.starX = starX;
    this.starY = starY;
    // Star display properties
    this.radius = radius;
    this.reductionRate = reductionRate;
    this.growingRate = growingRate;
    this.changeRate = this.reductionRate;
    this.starFill = 255;
    // Star movement properties
    this.starTranslationRate = translationRate;
    // Moon position properties
    this.moonX = moonX;
    this.moonY = moonY;
    // Moon display properties
    this.moonRadius = 25;
    this.moonFill = 255;
    // Moon movement properties
    this.moonTranslationRate = this.starTranslationRate;
    // For both
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10

  }

  // starSize
  //
  // Reduce and enlarge its size gradually to make it look like its glowing
  starSize() {
    // The star's radius is increasing or decreasing according to its current size
    if (this.radius > 1) {
      this.changeRate = this.reductionRate;
    }
    if (this.radius < .2) {
      this.changeRate = this.growingRate;
    }
    this.radius += this.changeRate;
  }

  // starDisplay
  //
  // Draw the star with an ellipse
  starDisplay() {
    push();
    noStroke();
    fill(this.starFill);
    ellipse(this.starX, this.starY, this.radius * 2, this.radius * 2);
    pop();
  }

  // starTranslation
  //
  // The stars move to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  starTranslation() {
    this.starX -= this.starTranslationRate;
    if (this.starX - 500 < this.resetX) {
      this.starX = this.starX + this.ninthFrameX;
    }
  }

  // moonDisplay
  //
  // Draw the moon with an ellipse
  moonDisplay() {
    push();
    noStroke();
    fill(this.moonFill);
    ellipse(this.moonX, this.moonY, this.moonRadius * 2, this.moonRadius * 2);
    pop();
  }

  // moonTranslation
  //
  // The moon moves to the left following the background
  moonTranslation() {
    this.moonX -= this.moonTranslationRate;
    if (this.moonX - 500 < this.resetX) {
      this.moonX = this.moonX + this.ninthFrameX;
    }
  }
}