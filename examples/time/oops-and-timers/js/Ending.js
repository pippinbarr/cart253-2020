// Ending
// Displays the ending message of the program.

// NOTE: We extend the State class to guarantee this class will have
// the key methods that we call in the main program,
// draw() and keyPressed() in this case.

// NOTE: Even though at the moment the Ending does *not* define a keyPressed()
// method, the fact it extends State means it *does* have one when it is called
// in the main program. This is a key benefit of extending State.
class Ending extends State {

  // constructor()
  // Acts as the setup() of the state, called when the
  // state is created. Sets the ending message of the program.
  constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();

    // Set our property determining the ending message of the simulation
    this.endingString = "Ah, mortality.";
  }

  // draw()
  // Called every frame in the main script. Handles what the ending
  // state needs to do each frame, which is display the ending message.
  draw() {
    // Always call the super() version of the method if there is one
    // just in case it does something important.
    super.draw();

    background(0);

    // Overkill perhaps, but we have a separate method to just display
    // the actual ending text. More methods/functions is generally better.
    this.displayEnding();
  }

  // displayTitle()
  // Sets style and then display the text in the endingString property on the canvas
  displayEnding() {
    push();
    fill(255, 0, 0);
    text(this.endingString, width / 2, height / 2)
    pop();
  }

  // NO keyPressed() needed down here, it is handled by the State version
}