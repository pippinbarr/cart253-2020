// Snowflake2
//
// That class represents a crystallized snowflake falling down
// It illustrates the concept of a snowy day.

class Snowflake2 extends Snow {

  // constructor
  //
  // Set the initial values for Snowflake2's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedY, fill, translationRate) {
    super(x, y, radius, speedY, fill, translationRate);
    // Display properties
    this.width = 1;
    this.height = 10;
    // Rotation properties
    this.theta = PI;
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
  // Draw the snowflakes2 with a tiny rectangle flipped around its center
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.fill);
    translate(this.x, this.y);
    rotate(this.theta * 2); // horizontal
    rect(0, 0, this.width, this.height);
    rotate(this.theta * 5 / 4); // slash
    rect(0, 0, this.width, this.height);
    rotate(this.theta / 4); // slash
    rect(0, 0, this.width, this.height);
    rotate(this.theta / 4); // slash
    rect(0, 0, this.width, this.height);
    pop();
  }
}