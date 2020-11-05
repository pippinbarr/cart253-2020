"use strict";

/**************************************************
Typewriter Effect
Pippin Barr

One way to create a typewriter effect to display text.
Uses a class to achieve the effect.
**************************************************/

let typewriter;

// setup()
// Create a typewriter object for display text is typewriter style
function setup() {
  createCanvas(600, 600);

  typewriter = new Typewriter();
}

// draw()
// Display the typewriter's current text
function draw() {
  background(0);
  typewriter.display();
}

// keyPressed()
// Typewrite some text!
function keyPressed() {
  typewriter.typewrite(`Friends, Romans, Countryfolk...`, 100, 100);
}