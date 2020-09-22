"use strict";

/*************

THIRD EFFECT: DOMINOS

A class that inherents from Shape, and represents a moving box.
The user controls the location/angle of the box according to mouse location.
Clicking down (or dragging) the mouse changes the size of the box.

*************/

class Domino extends Shape {
  // constructor()
  //
  // Sets the initial values for Domino based on Shape
  constructor() {
    super();
    // Rotation speed
    this.rotationSpeed = 0.0000006;

    // Box dimensions
    this.boxWidth = 150;
    this.boxHeight = 250;
    this.boxDepth = 20;
  }

  // effect()
  //
  // Creating the effect: each box will rotate across the Y and Z axes based
  // on mouse location
  effect() {
    super.effect();

    // Rotation for domino
    // rotateY based on mouseX
    rotateY(frameCount * this.rotationSpeed * this.distX);
    // rotateZ based on mouseY
    rotateZ(frameCount * this.rotationSpeed * this.distY);
    this.display();
  }

  // display()
  //
  // Displaying the diamonds on the screen
  display() {
    push();
    // To make opacity for domino effect more responsive to amplitude
    this.opacityMultiplier = this.opacityMultiplier + 2;

    // Positions the dominos on the canvas (based on mouseX and mouseY dist)
    // divide by 20 to limit the range of movement
    translate(0 + (this.distX / 20), 0 + (this.distY / 20));

    // Box dimensions for width, height, and depth
    // Dimensions affected by pulsation (based on music amplitude)
    box(this.boxWidth + this.pulsation, this.boxHeight + this.pulsation, this.boxDepth + this.pulsation);
    pop();
  }

  // changeDimensions()
  //
  // Pressing mouse while moving accross screen (or simply clicking)
  // allows user to control width and height of box
  changeDimensions() {
    if (mouseIsPressed) {
      // Box width based on mouseX location
      this.boxWidth = this.distX;
      // Box height based on mouseY location
      this.boxHeight = this.distY;
    }
  }

  // keyPressed()
  //
  // User presses spacebar to activate mysterious music
  keyPressed() {
    // If music is already playing and spacebar is pressed again, it will simply continue
    if (keyCode === 32 && mysteriousMusic.isPlaying()) {
      mysteriousMusic.playMode('sustain');
    } else {
      mysteriousMusic.loop(); // Music starts on first spacebar click and loops
    }
  }
}
