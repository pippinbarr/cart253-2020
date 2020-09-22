class Debris {
  //constructor()
  //
  //set all setup variables for the object
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = 0;
    this.exitSize = 40;
  }

  //update()
  //
  //Update direction, position and speed of the debris, as well as draws it
  update() {
    let flyByX;
    let flyByY;

    //Check where debris is in relation to player target on x axis
    // (to create illusion of perspective)
    if (this.x < player.targetX) {
      flyByX = player.targetX - this.x;
    } else {
      flyByX = this.x - player.targetX;
    }
    //Check where debris is in relation to player target on y axis
    // (to create illusion of perspective)
    if (this.y < player.targetY) {
      flyByY = player.targetY - this.y;
    } else {
      flyByY = this.y - player.targetY;
    }

    //update position of the debris based on location in relation to player
    //x-axis:
    if (player.targetX < this.x) {
      this.x += flyByX / 50 + this.size / 3;
    } else {
      this.x -= flyByX / 50 + this.size / 3;
    }
    //and y-axis:
    if (player.targetY < this.y) {
      this.y += flyByY / 50 + this.size / 3;
    } else {
      this.y -= flyByY / 50 + this.size / 3;
    }
    //update size increase and decrease opacity
    this.size += 0.05;
    this.alpha += 3;
    //draw the star
    fill(255, 255, 255, this.alpha);
    noStroke();
    rect(this.x, this.y, this.size, this.size);

    //When the debris leaves the screen,(grows too big) reset it
    if (this.x > windowWidth || this.x < 0 || this.y < 0 || this.y > windowHeight) {
      this.reset();
    }
    //When the debris gets too close to the camera/too big, reset it
    if (this.size > this.exitSize) {
      this.reset();
    }
  }

  //reset()
  //
  //Reset position, size and alpha of the debris
  reset() {
    this.alpha = 0;
    this.size = 4;
    this.x = floor(random(0, windowWidth));
    this.y = floor(random(0, windowHeight));
  }

}
