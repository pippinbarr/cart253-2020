// Humidity
//
// That class represents humidity in the air as tiny drops
// The player has to collect them to get water for the plant

class Humidity {

  // constructor
  //
  // Set the inital values for Humidity's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedX, speedY, reductionRate) {
    // Position properties
    this.x = x;
    this.originX = x;
    this.y = y;
    // Display properties
    this.radius = radius;
    this.maxRadius = radius;
    this.reductionRate = reductionRate;
    this.colors = ["#3FE0D0", "#95C8D8", "#7EF9FF", "#89CFF0", "#57A0D3"];
    this.randomFillColor = floor(random(0, 1) * this.colors.length);
    this.fillColor = this.colors[this.randomFillColor];
    // Movement properties
    this.speedY = speedY;
    this.speedX = speedX;
    this.floor = 300;
    this.tx = random(0, 1000);
    this.vx = 0;
    // Interactive properties
    this.waterButtonClicked = false;

  }

  // gravity
  //
  // Move the drops down using perling noise on the x axis
  gravity() {
    // Move down
    this.y += this.speedY;
    // Ondulate its path to the bottom with noise
    this.vx = map(noise(this.tx), 0, 1, -this.speedX, this.speedX);
    this.x += this.vx;
    // Update time properties
    this.tx += 0.01;
  }

  // display
  //
  // Draw the humidity with an ellipse
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

  // size
  //
  // Reduce the size of humidity gradually to 0
  size() {
    this.radius -= this.reductionRate;
    this.radius = constrain(this.radius, 0, this.maxRadius);
  }

  // reset
  //
  // Set the position to back to its original position
  reset() {
    if (this.radius <= .5) {
      // Default radius
      this.radius = this.maxRadius;
      // Default position
      this.x = this.originX;
      this.y = random(-10, 0);
    }
  }
}