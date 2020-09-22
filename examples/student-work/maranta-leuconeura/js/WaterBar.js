// WaterBar
//
// That class displays how much water has been collected.
// When the bar is full, a button appears to water the plant
// The player.score is changing the height of the bar.

class WaterBar {

  // constructor
  //
  // Set the initial values for the WaterBar's properties
  // Either sets default values or uses arguments provided
  constructor(lowX, lowY, highX, highY, maxHeight, color, buttonImage) {
    // Position properties
    this.lowX = lowX;
    this.lowY = lowY;
    this.highX = highX;
    this.highY = highY;
    this.originHighY = highY;
    this.width = this.lowX - this.highX;
    // Display properties
    this.maxHeight = maxHeight;
    this.fill = color;
    // Button position properties
    this.x = this.highX + this.width / 2;
    this.y = 190;
    // Button display properties
    this.radius = 15;
    this.maxRadius = 16;
    this.growingRate = 2;
    this.buttonImage = buttonImage;
    this.buttonImageWidth = 20;
    this.buttonImageHeight = this.buttonImageWidth;
    // Button filling properties
    this.buttonFillingRadius = 0;
    this.buttonFillRate = .3;
    this.buttonFillingFill = "#7EF9FF";
    // Sound properties
    this.playWaterSound = false;
    // Score properties
    this.waterScore = 0;
  }

  // display
  //
  // Display the bar as a rectangle with round egde
  display() {
    push();
    rectMode(CORNERS);
    fill(this.fill);
    noStroke();
    rect(this.highX, this.highY, this.lowX, this.lowY);
    pop();
  }

  // handleScore
  //
  // The size of the rectangle is linked to the player.score
  handleScore(player) {
    if (player.scoring === true) {
      this.highY = this.highY - player.score * 2 / 1000; // adjust the rate to the size of the bar
      this.highY = constrain(this.highY, this.maxHeight, this.lowY);
      player.scoring = false;
    }
    if (this.highY === this.maxHeight) {
      this.button();
    }
  }

  // handleButton
  //
  // Check if the player overlaps the button and fill the button to reset the bar values
  handleButton(player) {
    // Calculate distance from player to button
    let d = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than the button's radius
    if (d < player.width / 4 + this.radius && this.highY === this.maxHeight) {
      // Change the button's radius
      this.radius += this.growingRate;
      this.radius = constrain(this.radius, 15, this.maxRadius);
      // Fill up the button
      push();
      noStroke();
      fill(this.buttonFillingFill);
      ellipse(this.x, this.y, this.buttonFillingRadius * 2, this.buttonFillingRadius * 2);
      this.buttonFillingRadius += this.buttonFillRate;
      this.buttonFillingRadius = constrain(this.buttonFillingRadius, 0, this.maxRadius);
      pop();
      // If the button is fully filled reset all the values and play a sound
      if (this.buttonFillingRadius === this.maxRadius) {
        // Play a sound of pouring water
        this.playWaterSound = true;
        // Reset score
        player.resetScore();
        // Reset bar
        this.highY = this.originHighY;
        // ButtonFill
        this.buttonFillingRadius = 0;
        // Add one to the counter of
        // times that the player watered the plant
        this.waterScore += 1;
      }
    }
  }

  // button
  //
  // If the bar reach its maxHeight, display a button to water the plant
  button() {
    push();
    stroke(this.fill);
    strokeWeight(1.5);
    noFill();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    imageMode(CENTER);
    image(this.buttonImage, this.x, this.y, this.buttonImageWidth, this.buttonImageHeight);
    pop();
  }
}