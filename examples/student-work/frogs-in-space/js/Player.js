class Player {
  //constructor()
  //
  //Set all major variables for the player such as size, location and values
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 1.5;
    this.targetX = this.x;
    this.targetY = this.y - 100;
    this.size = windowWidth / 20;
    this.vx = 0;
    this.vy = 0;
    //create variable for what sprite to display
    this.currentSprite;
    //create bullet using a vector
    this.bullet = createVector(this.x, this.y);
    this.bulletSize = 10;
    this.bulletIsActive = false;
    //set player health
    this.health = 100;

    this.energy = 100;
    this.overHeated = false;
  }

  //update()
  //
  //Update the position of the player, bullet and the targete
  update() {
    //If the bullet is not currently being fired, set it to the same location as the player
    if (this.bulletIsActive === false) {
      this.bullet.x = this.x;
      this.bullet.y = this.y;
    }

    //Add velocity to player
    this.x += this.vx;
    this.y += this.vy;
    //Add inverted velocity to target
    this.targetX -= this.vx;
    this.targetY -= this.vy;
    //Set velocity to max values
    this.vx = constrain(this.vx, -8, 8);
    this.vy = constrain(this.vy, -8, 8);
    //Keep player within a reasonable playing field
    this.constrainToMap();
    //run all functions within the bullet
    this.handleBullet();

  }

  //handleInput()
  //
  //Handle the input keys to change velocity, and set velovity to balance itself
  //if no keys are pressed
  handleInput() {
    //If pressing left...
    if (keyIsDown(LEFT_ARROW)) {
      this.vx += -0.5;
      //if pressing right...
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx += 0.5;
      //the following two neutralize the velocity
    } else if (this.vx < 0) {
      this.vx += 0.3;
    } else if (this.vx > 0) {
      this.vx -= 0.3;
    }
    //if pressing up...
    if (keyIsDown(UP_ARROW)) {
      this.vy += -0.5;
      //if pressing down...
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy += 0.5;
      //the following two neutralize the velocity
    } else if (this.vy < 0) {
      this.vy += 0.3;
    } else if (this.vy > 0) {
      this.vy -= 0.3;
    }

    // When firing, set bullets to active (and phasers to stun, spock)
    if (keyIsDown(SHIFT) && this.bulletIsActive === false && this.overHeated === false) {
      this.bulletIsActive = true;
      this.energy -= 20;
      audLaser.play();
    }

  }

  //display()
  //
  //display images for the player and the target
  display() {
    push();
    imageMode(CENTER, CENTER);
    ellipseMode(CENTER);
    //draw target
    image(imgTarget, this.targetX, this.targetY, this.size, this.size);
    //Find the right sprite to display for the ship, depending on location
    this.findSprite();
    //draw ship based on result in findSprite()
    image(this.currentSprite, this.x, this.y, this.size * 2, this.size);
    pop();
  }

  //handleShooting()
  //
  //Checks if bullet collides with enemy or enemy bullet when shots are fired
  handleShooting() {
    //check if laser collides with enemy bullet when at a certain distance (technically size)
    let dBullet = dist(this.bullet.x, this.bullet.y, enemyBullet.x, enemyBullet.y)
    if ((dBullet < enemyBullet.size / 2) && this.bulletIsActive === true && this.bulletSize <= 4) {
      //remove one plot point from the enemy, reset bullet, and play sound effect
      enemy.plotPoints -= 1;
      //Additionally, set a location to the bullet to explode, as well as set it's alpha to full
      enemyBullet.explosionX = this.x;
      enemyBullet.explosionY = this.y;
      enemyBullet.explosionSelf = 255;
      //then, reset bullet and play sound
      audEnemyExplosion.play();
      enemyBullet.reset();
    }
  }

  //constrainToMap()
  //
  //Nudges the player ship to a smaller area of the screen
  //by adding to opposite velocity when the player is about to leave the screen
  constrainToMap() {
    //check position on x axis and counter force
    if (this.x < (windowWidth / 20)) {
      this.vx += 1;
    }
    if (this.x > (windowWidth - windowWidth / 20)) {
      this.vx -= 1;
    }

    // check position on y axis and counter force
    if (this.y < (windowHeight / 5)) {
      this.vy += 1;
    }
    if (this.y > (windowHeight - windowHeight / 10)) {
      this.vy -= 1;
    }
  }

  //findSprite()
  //
  //check location of the player and find the appropriate sprite to use
  findSprite() {
    //(This code is set to find the sprite in order of bottom to top)
    // * * *
    //If player is on the left of the screen, find the right left sprite
    if (this.x < windowWidth / 3) {
      if (this.y > (windowHeight - (windowHeight / 3))) {
        this.currentSprite = imgPlayerBottomLeft;
      } else if (this.y > (windowHeight / 3)) {
        this.currentSprite = imgPlayerLeft;
      } else {
        this.currentSprite = imgPlayerTopLeft;
      }
      //If player is on the right of the screen, find the right, um, right sprite
    } else if (this.x > (windowWidth - windowWidth / 3)) {
      if (this.y > (windowHeight - (windowHeight / 3))) {
        this.currentSprite = imgPlayerBottomRight;
      } else if (this.y > (windowHeight / 3)) {
        this.currentSprite = imgPlayerRight;
      } else {
        this.currentSprite = imgPlayerTopRight;
      }
      //If player is in the center, find the right sprite
    } else {
      if (this.y > (windowHeight - (windowHeight / 3))) {
        this.currentSprite = imgPlayerBottom;
      } else if (this.y > (windowHeight / 3)) {
        this.currentSprite = imgPlayer;
      } else {
        this.currentSprite = imgPlayerTop;
      }
    }
  }

  //handleBullet()
  //
  //This function sets angle, velocity and displaying of the bullet based on the set state
  handleBullet() {
    //if the bullet is active, run the code
    if (this.bulletIsActive === true) {
      //create variable for finding distance to target
      let bulletToTarget = dist(this.bullet.x, this.bullet.y, this.targetX, this.targetY);
      //If the bullet is close enough to the target, reset it as inactive
      if (bulletToTarget < 10) {
        this.bulletIsActive = false;
        this.bullet.x = this.x;
        this.bullet.y = this.y;
        this.bulletSize = 10;
      } else {
        //We use three vectors to find distance, angle and speed
        //and then display the bullet there

        //Create a variable for the distance from ship to reticle
        let d = dist(this.x, this.y, this.targetX, this.targetY);
        //Create vectors for bullet, target, and the velocity we want
        let vecBullet = createVector(this.bullet.x, this.bullet.y);
        let vecTarget = createVector(this.targetX, this.targetY);
        let vecDesiredVel = vecTarget.sub(vecBullet);
        //Create velocity for the bullet based on the desired velocity vector
        //limited by the distance between ship and target, to achieve
        //the effect of the bullet traveling at the same speed no matter angle
        let frameVel = vecDesiredVel.limit(d / 10);
        //actually update position of bullet
        this.bullet.x += frameVel.x;
        this.bullet.y += frameVel.y;

        //display the bullet
        push();
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(255, 28, 51);
        ellipse(this.bullet.x, this.bullet.y, this.bulletSize, this.bulletSize);
        pop();

        //Shrink bullet to make it seem like it's going further away
        this.bulletSize -= 1;
      }
    }
    this.handleOverheating();
  }

  //handleOverheating()
  //
  //if player fires gun too much, it overheats and can not be fired until
  //it has recharged
  handleOverheating() {
    if (this.energy <= 0) {
      this.energy = 0;
      this.overHeated = true;
    }
    //when overheated, recharge slowly
    if (this.overHeated === true) {
      this.energy += 0.5;
      if (audOverheat.isPlaying()) {
        //do nothing
      } else {
        audOverheat.play();
      }
    } else if (this.energy < 100) {
      this.energy += 0.5;
    }
    //when full recharged, allow the player to shoot again
    if (this.energy >= 100) {
      this.overHeated = false;
    }
    //cap energy at 100
    constrain(this.energy, -10, 100);
  }

  //reset()
  //
  //reset player variables on restart of game
  reset() {
    this.health = 100;
    this.energy = 100;
  }
}
