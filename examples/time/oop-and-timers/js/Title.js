// Title
// A state representing the Title of our program
// Displays the title on the screen and switches to
// Animation on a key press.

// NOTE: We extend the State class to guarantee this class will have
// the key methods that we call in the main program,
// draw() and keyPressed() in this case.
class Title extends State {

  // constructor()
  // Acts as the setup() of the state, called when the
  // state is created. Sets the title of the program.
  constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();

    // Set our property determining the title of the simulation
    this.titleString = `Life`;

    // Our timer for switching to the next state (Animation)
    // Note the .bind(this) after the name of our function.
    // This makes sure that when changeTitle() is called, "this"
    // still refers to the current object!
    this.changeTitleTimer = setTimeout(this.changeTitle.bind(this), 3000);
  }

  // changeTitle()
  // Called by a timer. Changes the title string so that the title
  // changes on screen. Starts another timer to move to the next state.
  changeTitle() {
    this.titleString = `Life: A Metaphor.`;
    this.nextStateTimer = setTimeout(this.nextState.bind(this), 3000);
  }

  // nextState()
  // Moves the program to the animation state
  nextState() {
    currentState = new Animation();
  }

  // draw()
  // Called every frame in the main script. Handles what the title
  // state needs to do each frame, which is display the title.
  draw() {
    // Always call the super() version of the method if there is one
    // just in case it does something important.
    super.draw();

    // Set the background. We could do this in State if we knew that
    // we wanted all states to have a black background, but it probably
    // makes more sense to have this set per state like this.
    background(0);

    // Overkill perhaps, but we have a separate method to just display
    // the actual title text. More methods/functions is generally better.
    this.displayTitle();
  }

  // displayTitle()
  // Sets style and then display the title in the titleString property on the canvas
  displayTitle() {
    push();
    fill(255);
    text(this.titleString, width / 4, height / 2);
    pop();
  }

  // No keyPressed, so we can only switch to the animation state via timer!
}