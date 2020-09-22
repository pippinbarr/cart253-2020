"use strict";

/*************

SECOND EFFECT: DIAMOND

A class that inherents from Shape, and represents a diamond that floats around.
The user controls the location/angle of the diamond according to mouse location.
Clicking down on the mouse makes the diamond appear to spin.

*************/

class Diamond extends Shape {
  // constructor()
  //
  // Sets the initial values for Diamond based on Shape
  constructor() {
    super();
    // Depth (in terms of how far away they appear)
    this.positionZ = random(-1000, 1000);

    // Size of diamonds
    this.size = random(50, 100);

    // Rotation speed (so they move at different rates)
    this.rotationSpeed = random(0.0000007, 0.0000009);

    // DetailY (to give diamond shape)
    this.sphereDetailY = 2;
  }

  // effect()
  //
  // Creating the effect: each diamond will rotate across the Y and Z axes based
  // on mouse location
  effect() {
    super.effect();

    // rotateY based on mouseX
    rotateY(frameCount * this.rotationSpeed * this.distX);
    // rotateZ based on mouseY
    rotateZ(frameCount * this.rotationSpeed * this.distY);

    // Display it
    this.display();
  }

  // display()
  //
  // Displaying the diamond on the screen
  display() {
    push();
    // Positions the diamonds on the canvas (based on mouseX dist)
    translate(0, 0, this.positionZ * this.distX / 300);

    // Size controlled by user and diamond pulsates according to music amplitude
    sphere(this.size + this.pulsation, this.sphereDetail, this.sphereDetailY);
    pop();
  }

  // spin()
  //
  // Mouse click (or holding it down) changes detailX of the diamonds
  // which creates a spinning effect (due to how quickly it moves)
  spin() {
    if (mouseIsPressed) {
      // Round to nearest full number since decimals don't work for sphere details
      // range between 6 and 20
      this.sphereDetail = floor(random(6, 20));
    }
  }

  // keyPressed()
  //
  // User presses spacebar to activate ringing music
  keyPressed() {
    // If music is already playing and spacebar is pressed again, it will simply continue
    if (keyCode === 32 && ringingMusic.isPlaying()) {
      ringingMusic.playMode('sustain');
    } else {
      ringingMusic.loop(); // Music starts on first spacebar click and loops
    }
  }
}
