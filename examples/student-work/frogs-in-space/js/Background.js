class Background {
  //constructor()
  //
  //set this background up
  constructor() {
    this.x = -50;
    this.y = -50;
    this.vx = 0;
    this.vy = 0;
  }
  //display()
  //
  //display the background image and update its position
  display() {
    this.constrainEdges();
    this.x += this.vx;
    this.y += this.vy;
    image(imgEarth, this.x, this.y, windowWidth * 1.4, windowHeight * 1.4);
  }

  //handleInput()
  //
  //Handle the movement of the background
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx += -0.03;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.vx += 0.03;
    }

    if (keyIsDown(UP_ARROW)) {
      this.vy += -0.03;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.vy += 0.03;
    }
  }

  //constrainEdges()
  //
  //Keep the background in frame at all times, so it doesnt move away from any side
  //to do this, keep the x and y between set points, and kill velocity
  constrainEdges() {
    if (this.y > 0) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.y < -200) {
      this.y = -200;
      this.vy = 0;
    }
    if (this.x > 0) {
      this.x = 0;
      this.vx = 0;
    }
    if (this.x < -200) {
      this.x = -200;
      this.vx = 0;
    }
  }

}
