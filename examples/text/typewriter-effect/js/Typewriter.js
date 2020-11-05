// Typewriter
// A class for typewriting text. Uses an interval to incrementally
// add characters to a displayed text

class Typewriter {

  // constructor()
  // Sets the basic properties
  constructor() {
    // The full text this typewriter is currently typing out (empty to start)
    this.fullText = ``;
    // The current portion of the full text to actually display (empty to start)
    this.displayText = ``;
    // The index of the next character to add to the displayed text
    this.nextChar = 0;
    // How often to add a character (milliseconds)
    this.speed = 50;
    // The interval used to display the characters so we can cancel it
    this.interval = undefined;
    // The position to display the text at
    this.x = 0;
    this.y = 0;
  }

  // typewrite(message,x,y)
  // The main method. Displays the message at the specified position using
  // a typewriter effect
  typewrite(message, x, y) {
    // First reset the typewriter for safety
    this.reset();
    // Set the text we're going to display
    this.fullText = message;
    // Set the position
    this.x = x;
    this.y = y;
    // Start our interval to call addNextCharacter repeatedly at the typewriter
    // speed so that we add characters to the displayed text over time
    this.interval = setInterval(this.addNextCharacter.bind(this), this.speed);
  }

  // addNextCharacter()
  // Adds the next character to our display text if possible
  addNextCharacter() {
    // First check if we've reached the end of the full text
    if (this.nextChar >= this.fullText.length) {
      // If so, just return and don't do anything because we're finished
      return;
    }
    // Add the next character of the full text to the displayed next
    // Note that charAt() allows us to get the character at a specified
    // position in a string (numbered just like an array)
    this.displayText += this.fullText.charAt(this.nextChar);
    // Increase the next character by one for next time
    this.nextChar = this.nextChar + 1;
  }

  // display()
  // Display the current display text at the correct location
  display() {
    push();
    fill(255);
    textFont(`Courier`);
    textSize(18);
    textAlign(LEFT, BOTTOM);
    text(this.displayText, this.x, this.y);
    pop();
  }

  // reset()
  // Empty the texts and reset the counters and cancel the interval
  reset() {
    this.fullText = ``;
    this.displayText = ``;
    this.nextChar = 0;
    clearInterval(this.interval);
  }

}