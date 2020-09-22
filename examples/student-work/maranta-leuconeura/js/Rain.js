// Rain
//
// That class represents a rainy day.
// It is tiny square that falls down and appears
// again by mean of a HandleWrapping function.

class Rain {

  // constructor
  //
  // Set the initial values for the Rain properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, translationRate) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.width = 1;
    this.height = random(5, 10);
    this.theta = .45;
    // Create an array of random blue colors
    this.colors = ["#8CDFE8", "#99EDF3", "#BFF4F7", "#D4F1F9"];
    this.randomFillColor = floor(random(0, 1) * this.colors.length);
    this.fillColor = this.colors[this.randomFillColor];
    // Movement properties
    this.speedY = 5;
    // Translation properties
    this.translationRate = translationRate;
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10
  }

  // dropDisplay
  //
  // Draw the drop with a tiny rectangle rotated
  dropDisplay() {
    push();
    noStroke();
    fill(this.fillColor);
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    rect(0, 0, this.width, this.height);
    pop();
  }

  // dropGravity
  //
  // Move the drop down
  dropGravity() {
    this.y += this.speedY;
  }

  // handleWrapping
  //
  // Checks if the drop has gone off the canvas and
  // wraps it to the other side if so (only up and down)
  handleWrapping() {
    // Off the bottom
    if (this.y > height) {
      this.y = 0;
    }
  }

  // dropTranslation
  //
  // The drop move to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  dropTranslation() {
    this.x -= this.translationRate;
    if (this.x - 500 < this.resetX) {
      this.x = this.x + this.ninthFrameX;
    }
  }
}