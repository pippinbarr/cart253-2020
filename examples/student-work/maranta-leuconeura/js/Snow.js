// Snow
//
// That class represents a snownflake falling down.
// It illustrates the concept of a snowy day.
// The snowflakes will be displayed by subclasses:
// Snowflake1 and Snowflake2

class Snow {

  // constructor
  //
  // Set the initial values for Snow's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedY, fill, translationRate) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.radius = radius;
    this.fill = fill;
    // Movemnet properties
    this.speedY = speedY;
    // Box properties
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10
    this.translationRate = translationRate;
  }

  // gravity
  //
  // Move the snownflakes down 
  gravity() {
    // Move down
    this.y += this.speedY;
  }

  // handleWrapping
  //
  // Checks if the snowflake has gone off the canvas and
  // wraps it to the other side if so (only up and down)
  handleWrapping() {
    // Off the bottom
    if (this.y > height) {
      this.y = 0;
    }
  }

  // translation
  //
  // The snowflake move to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  translation() {
    this.x -= this.translationRate;
    if (this.x - 500 < this.resetX) {
      this.x = this.x + this.ninthFrameX;
    }
  }
}