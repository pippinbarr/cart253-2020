/**
  Introduction()
  @constructor args:  stateConfig, stateData, UILayer, characterPortrait
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Introduction extends State {
  constructor(stateConfig, stateData, UILayer, characterPortrait) {
    super(stateConfig, stateData, UILayer);
    this.characterPortrait = characterPortrait;
    this.resetStateTimer();
    this.positivityGrowthFactor = 50;
    this.positivityDecayFactor = 35; // Could become increasingly larger relative to growth factor by age slice.
    this.resetPositivity();
    this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    this.stateTag = "Introduction";
    this.stateScoreTag = "4 years old -- In The Sandbox"; // The display text for the life score board.
  }

  /**
    updateState()
    @no custom args.
    @Updates this state.
  */
  updateState() {
    this.setFrameRate();
    this.updateStateTimer();
    this.autoDecreasePositivity(this.positivityDecayFactor);
    this.positivityScore = this.incrementPositivity(this.positivityGrowthFactor);
    this.displayPositivity();
    this.curveDecayFactor();
    this.displayTitle("Game Psychologist: Hmm... You noted something here.\n\"Life is not a movie, Allison.\"...Do you often talk to yourself?");
    this.displayStateTimer();
    this.displayPortrait();
    this.spawnMentalSchemas();
    this.displayEmotionalDimension();
    // Change scene after the duration of state
    if (this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      congratulations.play();
      this.positivityScore = this.positiveThoughts; // the score to display in the next between slice of life
    }
  }

  /**
    spawnMentalSchemas()
    @arg:
    @spawn allison's thoughts (stored in an array) in random coordinates to create a mental map.
      also known as a mental schema or script.
    @allows the player to redirect their x-y values towards the portrait.
      The positive or negative thoughts that touch her will be the life choice of that slice of life.
      Output should be displayed in the life bar skills.
  */
  spawnMentalSchemas() {
    this.timerAngle += 0.10;
    // Instructions
    textFont(AntonRegularType);
    push();
    noStroke();
    fill(0, 255, 255);
    textSize(30);
    text("Game Psychologist: Try holding any key or mouse button down.", 50, 250);
    pop();

    push();
    stroke(255, 0, 0);
    strokeWeight(this.strokeW);
    fill(255);
    textSize(this.tSizer);
    push();
    translate(width / 2, height / 2);
    // TODO replace with array of different positive or negative thoughts
    text("I don't fit in...", sin(this.timerAngle) * 200, cos(this.timerAngle) * 200);
    pop();

    push();
    translate(0, 0);
    stroke(255, 0, 0);
    strokeWeight(5);
    textSize(this.tSizer);
    text("I don't like playing in the sand", random(width / 2, width), random(height / 2, height));
    pop();

    // Hold any key down or mouse button to think about the opposite
    if (keyIsPressed || mouseIsPressed) {
      // Re-display the colored portrait to show the character's renewed self-confidence
      push();
      imageMode(CENTER);
      image(this.characterPortrait, 300, 640, this.characterPortrait.width, this.characterPortrait.height);
      pop();

      push();
      noStroke();
      fill(0, 255, 0);
      textSize(42);
      text("No, I can be friends with everyone!", mouseX - 50, mouseY);
      pop();
    } else {
      push();
      noStroke();
      fill(255, 0, 0);
      textSize(42);
      text("I really don't fit in...", mouseX - 50, mouseY - 100);
      pop();
    }
    // Decrement the text stroke size and weight properties
    this.modifyStroke();
  }

  /**
    updateClicks()
    @arg: updateClickCounter.
      callbacks the function updateClickCounter in the UISystem after this is done.
    @Listens to mousePressed in main.js.
  */
  updateClicks(updateClickCounter) {
    this.contextMenuDisplayed = false;
  }
}
