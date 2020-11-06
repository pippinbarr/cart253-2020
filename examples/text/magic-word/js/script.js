"use strict";

/**************************************************
Magic Word
Pippin Barr

A riddle for the user to solve by typing in the magic
word. The magic word is "what".
**************************************************/

// The magic word the user is supposed to type in
let magicWord = `what`;
// The riddle to display
let riddleText = `What is the magic word`;
// A variable to track what the user has typed so far
let currentInput = ``;

// setup()
// Create a canvas and set up the text style
function setup() {
  createCanvas(600, 600)
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
}

// draw()
// Displays the riddle and input and changes the
// background based on whether the user is correct.
function draw() {
  // Check if they've got it right yet
  let correct = checkInput();

  // If they get it right we have a green background,
  // otherwise a black background.
  if (correct) {
    background(0, 255, 0);
  }
  else {
    background(0);
  }

  // Display the riddle
  text(riddleText, width / 2, height / 3);
  // Display the current input from the user
  text(currentInput, width / 2, 2 * height / 3);
}

// checkInput()
// Compares the current input text with the magic word
// Returns true if it matches and false otherwise.
function checkInput() {
  // First convert the input to lower case so we can
  // ignore any capitalization stuff
  let lowerCaseInput = currentInput.toLowerCase();
  // Check if the converted input is the same as the magic word
  if (lowerCaseInput === magicWord) {
    return true;
  }
  else {
    return false;
  }
}

// keyTyped()
// Add the typed key to the input string
function keyTyped() {
  currentInput += key;
}

// keyPressed()
// Handle the backspace key
function keyPressed() {
  // If they press backspace, delete the current input
  if (keyCode === BACKSPACE) {
    // It would be classier to let them delete one character
    // at a time, but this is easier for a simple example!
    currentInput = ``;
  }
}