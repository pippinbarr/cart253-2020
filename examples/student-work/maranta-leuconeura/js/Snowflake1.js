// Snowflake1
//
// That class represents a tiny round snowflake falling down
// It illustrates the concept of a snowy day.

class Snowflake1 extends Snow {

  // constructor
  //
  // Set the initial values for Snowflake1's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedY, fill, translationRate) {
    super(x, y, radius, speedY, fill, translationRate);
  }

  // gravity
  //
  // Move the snownflakes down
  gravity() {
    super.gravity();
  }

  // handleWrapping
  //
  // Checks if the snowflake has gone off the canvas and
  // wraps it to the other side if so (only up and down)
  handleWrapping() {
    super.handleWrapping();
  }

  // translation
  //
  // The snowflake move to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  translation() {
    super.translation();
  }

  // display
  //
  // Draw the snowflakes1 with a tiny ellipse
  display() {
    push();
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}