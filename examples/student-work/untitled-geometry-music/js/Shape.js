"use strict";

// The parent class for the three effects. It represents a basic shape.

class Shape {
  // constructor()
  //
  // Sets the initial values for the Shape properties
  constructor() {
    // Position
    this.x = (width / 2);
    this.y = (height / 2);

    // Weight of stroke
    this.strokeThickness = 0.8;

    // Details for shape
    this.sphereDetail = 20;

    // For the stroke opacity (glow effect) - based on rms
    this.opacityMultiplier = 200;

    // For measuring amplitude
    this.rms;

    // For mapping mouse distances
    this.distX;
    this.distY;

    // For pulsating effect
    this.pulsation;
  }

  // effect()
  //
  // Generic measurements for the three effects
  effect() {
    // To get amplitude (rms level) of music
    this.rms = analyzer.getLevel();

    // For measuring distances (mapping mouseX & mouseY)
    this.distX = map(mouseX, width / 2, 2, 0, width);
    this.distY = map(mouseY, height / 2, 2, 0, height);

    // Pulsating effect based on music amplitude
    this.pulsation = this.rms * 200;

    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    stroke(255, 5 + this.rms * this.opacityMultiplier);
  }

  // styling()
  //
  // Basic styling to be inherited by child classes
  styling() {
    // Styling for shapes
    strokeWeight(this.strokeThickness);
    noFill();
  }
}
