class HUD {
  //constructor()
  //
  //set all setup variables for the object
  constructor() {
    this.x = windowWidth / 4;
    this.y = windowHeight - (windowHeight / 5);
    this.width = windowWidth / 2;
    this.height = windowHeight / 5.2;

    this.currentDialogue = "First shot ";
  }

  //display()
  //
  //Displays all elements for the popup: background, dialogue, flair  and image
  display() {

    //DISPLAY FLAIR
    image(imgHudFlair, 0, 0, windowWidth, windowHeight);

    //DISPLAY DIALOGUE BOX
    //display background for box
    push();
    stroke(0, 255, 0);
    strokeWeight(3);
    fill(0);
    rect(this.x, this.y, this.width, this.height);
    pop();

    //display enemy dialogue and "incoming transmission"
    textSize(windowWidth / 80);
    fill(255);
    text(this.currentDialogue, this.x + this.width / 5, this.y + this.width / 12, this.width - (this.width / 5), this.y + (windowHeight / 10));
    text("INCOMING TRANSMISSION - SENDER: PVT-ARN2411", this.x + this.width / 5, this.y + this.width / 23, this.width - (this.width / 5), this.y + (windowHeight / 10));

    //draw portrait of enemy
    push();
    image(imgSpeakerPortrait, this.x + this.width / 50, this.y + this.width / 50, this.width / 7, this.width / 7);
    pop();

    //DISPLAY HEALTH FOR PLAYER
    push();
    rectMode(BOTTOM);
    if (player.health <= 50) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    stroke(5);
    rect(windowWidth - (windowWidth / 20), this.y + (this.height * 0.9), windowWidth / 50, -player.health);
    pop();

    //DISPLAY ENERGY FOR PLAYER
    push();
    rectMode(BOTTOM);
    //switch colors depending on if overheated or not
    if (player.overHeated === true) {
      fill(200, 0, 0);
    } else {
      fill(255, 200, 20);
    }
    stroke(4);
    //Display actual energy bar
    rect(windowWidth - (windowWidth / 16), this.y + (this.height * 0.9), windowWidth / 80, -player.energy);
    pop();

    //Display status texts for health and energy:
    //ENERGY
    push();
    textSize(this.width / 25);
    strokeWeight(4);
    stroke(255);
    fill(0);
    //When lasers are overheated, show this message
    if (player.overHeated === true) {
      text("LASERS\nOVERHEATED!", this.x + (this.width * 1.01), this.y + (this.height * 0.5));
    }
    pop();
    //HEALTH
    push();
    strokeWeight(4);
    stroke(255);
    fill(0);
    textSize(this.width / 38);
    //If player health dips below 50, show this message
    if (player.health <= 50) {
      text("SHIP INTEGRITY CRITICAL", this.x + (this.width * 1.01), this.y * 1.05);
    }
    pop();
  }

  //setDialogue();
  //
  //Sets the current dialogue based on progress
  setDialogue() {
    if (enemy.plotPoints === enemy.maxPlotPoints) {
      this.currentDialogue = "Alright, medal boy. Let's see how you handle THIS"
    } else if (enemy.plotPoints >= 9) {
      this.currentDialogue = "That one was a lucky shot. I bet you have no idea what you're doing. You're just mashing buttons."
    } else if (enemy.plotPoints >= 8) {
      this.currentDialogue = 'Eh. That one was easy. I bumped my elbow onto the "set difficulty to easy"-button on the missile.'
    } else if (enemy.plotPoints >= 7) {
      this.currentDialogue = "You think you're soooo cooool, don't you. Psh. To me, you're a tadpole, bud."
    } else if (enemy.plotPoints >= 6) {
      this.currentDialogue = "You didn't actually hit that one. It exploded. It exploded out of embarrassment. Because how how much you suck."
    } else if (enemy.plotPoints >= 5) {
      this.currentDialogue = "Dang, you actually hit that? ...I mean, ANYONE could have hit that one. That was a baby missile. You just shot a baby. You monster."
    } else if (enemy.plotPoints >= 4) {
      this.currentDialogue = "...How?? How are you hitting them?? You're cheating, aren't you? That or you're trying real hard! Tryhard!"
    } else if (enemy.plotPoints >= 3) {
      this.currentDialogue = "ARGH. Running low on missiles. No matter - I still got the best ones. They're extra deadly. They kill you twice."
    } else if (enemy.plotPoints >= 2) {
      this.currentDialogue = "No! There's no way you can beat me, swanky medal or not! Not a chance!! "
    } else if (enemy.plotPoints >= 1) {
      this.currentDialogue = "This is it! This one WILL hit you! You can't win! I'm better than you! I'M BETTER THAN YOU!"
    } else {
      this.currentDialogue = "welp i died "
    }
  }
}
