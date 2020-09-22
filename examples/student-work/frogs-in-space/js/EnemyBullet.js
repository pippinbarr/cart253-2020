class EnemyBullet extends Debris {

  //constructor()
  //
  //set all setup variables for the object
  constructor(x, y, size) {
    super(x, y, size);
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
    this.alpha = 0;

    //set variable for what size causes the bullet to leave the screen
    this.exitSize = windowWidth / 10;
    //set variable for initial increase of size
    this.sizeIncrease = 0;

    //Set time variable (alpha) for handleExplosion
    this.explosionHit = 0;
    this.explosionSelf = 0;
    //Set location variables for when enemy bullet is hit by laser
    this.explosionX;
    this.explosionY;
  }

  //update()
  //
  //updates speed and position for enemyBullet, as well as displays it
  update() {
    //establish flyby variables:
    let flyByX;
    let flyByY;

    //Check where enemybullet is in relation to player target on x axis
    // (to create illusion of perspective)
    if (this.x < player.targetX) {
      flyByX = player.targetX - this.x;
    } else {
      flyByX = this.x - player.targetX;
    }
    //Check where enemybullet is in relation to player target on y axis
    // (to create illusion of perspective)
    if (this.y < player.targetY) {
      flyByY = player.targetY - this.y;
    } else {
      flyByY = this.y - player.targetY;
    }

    //Set velocity based on distance on x-axis
    if (player.x < this.x) {
      this.vx -= flyByX / 4000 + this.size / 250;
    } else {
      this.vx += flyByX / 4000 + this.size / 250;
    }
    //Set velocity based on distance on y-axis
    if (player.y < this.y) {
      this.vy -= flyByY / 4000 + this.size / 250;
    } else {
      this.vy += flyByY / 4000 + this.size / 250;
    }

    //update position
    this.x += this.vx;
    this.y += this.vy;

    //increase size of the bullet exponentially. Kinda.
    this.sizeIncrease += 0.01;
    this.size += this.sizeIncrease;

    //When the bullet leaves the screen, reset it
    if (this.x > windowWidth || this.x < 0 || this.y < 0 || this.y > windowHeight) {
      this.reset();
    }
    //When the bullet gets too close to the camera/too big, reset it
    if (this.size >= this.exitSize) {
      this.reset();
    }
    //display the bullet
    push();
    imageMode(CENTER, CENTER);
    fill(255, 0, 0);
    image(imgEnemyBullet, this.x, this.y, this.size, this.size);
    console.log("Bullet");
    pop();
  }

  //reset()
  //
  //reset all variables for the bullet to its starting position
  reset() {
    this.explosionX = this.x;
    this.explosionY = this.y;
    this.alpha = 0;
    this.size = 1;
    //this.x = floor(random(player.targetX - (windowWidth/4), player.targetX + (windowWidth/4)));
    //this.y = floor(random(0, windowHeight));
    this.x = enemy.x;
    this.y = enemy.y;
    this.vy = 0;
    this.vx = 0;
    this.sizeIncrease = 0;
  }

  //handleCollisions()
  //
  //See if the bullet is about to hit the player right before it leaves the screen
  handleCollisions() {
    //find distance between player and bullet and if close enough, player takes damage
    //and bullet resets
    let d = dist(player.x, player.y, this.x, this.y)
    if ((d < this.exitSize / 2) && this.size >= (this.exitSize - this.exitSize / 6)) {
      //take damage
      player.health -= 20;
      //play sound
      audPlayerHit.play();
      this.explosionHit = 255
      this.reset();
    }
  }

  //handleExplosion()
  //
  //Displays an explosion on the player if hit or on the bullet if the bullet is hit,
  //using two separate functions
  handleExplosion() {
    this.handleHitAnimation();
    this.handleExplodeSelf();
  }

  //handleHitAnimation
  //
  //Display animation when player is hit by enemy bullet
  handleHitAnimation() {
    push();
    tint(255, 255, 255, this.explosionHit);
    imageMode(CENTER, CENTER);
    image(imgExplosion, player.x, player.y, player.size * 2, player.size * 2);
    pop();
    if (this.explosionHit > 0) {
      this.explosionHit -= 20;
    }
  }

  //handleExplodeSelf()
  //
  //Handles explosions when the bullet is hit by player laser
  handleExplodeSelf() {
    push();
    tint(255, 255, 255, this.explosionSelf);
    imageMode(CENTER, CENTER);
    image(imgExplosion, this.explosionX, this.explosionY, player.size * 2, player.size * 2);
    if (this.explosionSelf > 0) {
      this.explosionSelf -= 20;
    }
    pop();

  }

}
