// TimeFrames
//
// Frames all the sceneries as moving boxes
// This class handles the background color
// and the movement of the sequence

class TimeFrames {

  // constructor
  //
  // Set the initial values for the timeFrames' properties
  // Either sets default values or uses the arguments provided
  constructor(x, color, translationRate) {
    // Position properties
    this.x = x;
    this.y = 0;
    // Display properties
    this.color = color;
    this.width = 500;
    this.height = 600;
    // Moving properties
    this.translationRate = translationRate;
    this.ninthFrameX = 4500; // offsetTargetX + timeFrameInterval * 9
    this.resetX = -500;
  }

  // background
  //
  // Size and shape of the box object
  backgroundDisplay() {
    push();
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop()
  }

  // boxTranslation
  //
  // The box move to the left at a slow pace
  // Its position is reset to the end of the loop if it is offcanvas
  backgroundTranslation() {
    this.x -= this.translationRate;
    if (this.x < this.resetX) {
      this.x = this.ninthFrameX;
    }
  }
}