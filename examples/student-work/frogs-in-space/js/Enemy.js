class Enemy {

  //set up position, size, velocity and points
  constructor() {
    this.x = player.targetX;
    this.y = player.targetY;
    this.size = windowWidth / 20;
    this.tx = random(0, 10);
    this.ty = random(0, 10);
    this.maxPlotPoints = 10;
    this.plotPoints = this.maxPlotPoints;
  }

  //update();
  //
  //update position of ship based on noise
  update() {
    this.x = width * noise(this.tx);
    this.y = height * noise(this.ty);

    this.tx += 0.003;
    this.ty += 0.003;

    constrain(this.x, (player.targetX - 100), (player.targetX + 100))
    constrain(this.y, (player.targetY - 100), (player.targetY + 100))
  }

  //display()
  //
  //displays the enemy
  display() {
    push();
    imageMode(CENTER, CENTER);
    image(imgEnemyShip, this.x, this.y, this.size, this.size);
    pop();

  }
  //reset()
  //
  //called to reset the enemy when game is restarted
  reset() {
    this.plotPoints = this.maxPlotPoints;
  }

}
