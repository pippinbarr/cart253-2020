"use strict";

/*************

FIRST EFFECT: ROTATING SPHERE

A class that inherents from Shape, and represents a rotating sphere.
The user controls the size and speed of the sphere according to mouse location.
Clicking down (or dragging) the mouse changes the speed of the music.

*************/

class RotatingSphere extends Shape {
  // constructor()
  //
  // Sets the initial values for Rotating Sphere based on Shape
  constructor(rotationSpeed, sizeDivider) {
    super();
    // Rotation speed
    this.rotationSpeed = rotationSpeed;

    // Divider for size (for proportional sphere sizes)
    this.sizeDivider = sizeDivider;
  }

  // effect()
  //
  // Creating the effect: each sphere will rotate across the X,Y and Z axes based
  // on mouse location
  effect() {
    super.effect();

    // The sphere will rotate the same way across the three axes
    // based on frame rate, rotation speed, and mouseX location
    let rotationValue = (frameCount * this.rotationSpeed * this.distX);

    rotateY(rotationValue);
    rotateX(rotationValue);
    rotateZ(rotationValue);

    // Display it
    this.display();
  }

  // display()
  //
  // Displaying the sphere
  display() {
    push();
    // Size of sphere is mouseX location divided by this.sizeDivider
    // so that we can create spheres of different sizes (proportionally)
    let size = this.distX / this.sizeDivider;

    // Size controlled by user and sphere pulsates according to music amplitude
    sphere(size + this.pulsation, this.sphereDetail, this.sphereDetail);
    pop();
  }

  // musicSpeed
  //
  // Mouse click (or holding it down) affects music speed (based on mouseX)
  musicSpeed() {
    if (mouseIsPressed) {
      // Set the rate to a range between 0.05 and 1
      // changing the rate alters the pitch
      let speed = map(mouseX, 0.1, width, 0, 2);
      speed = constrain(speed, 0.05, 1);
      pianoMusic.rate(speed);
    }
  }

  // keyPressed()
  //
  // User presses spacebar to activate piano music
  keyPressed() {
    // If music is already playing and spacebar is pressed again, it will simply continue
    if (keyCode === 32 && pianoMusic.isPlaying()) {
      pianoMusic.playMode('sustain');
    } else {
      pianoMusic.loop(); // Music starts on first spacebar click and loops
    }
  }
}
