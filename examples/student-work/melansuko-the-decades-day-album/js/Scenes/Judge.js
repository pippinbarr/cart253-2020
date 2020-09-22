/**
  Judge()
  @constructor args: stateConfig, stateData, UILayer, characterPortrait
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Judge extends State {
  constructor(stateConfig, stateData, UILayer, characterPortrait) {
    super(stateConfig, stateData, UILayer);
    this.characterPortrait = characterPortrait;
    this.resetStateTimer();
    this.positivityGrowthFactor = 50;
    this.positivityDecayFactor = 45; // Could become increasingly larger relative to growth factor by age slice.
    this.resetPositivity();
    this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    this.stateTag = "Judge";
    this.stateScoreTag = "34 years old -- Becoming A Judge";
  }

  /**
    updateState()
    @no custom args.
    @Updates this state.
  */
  updateState() {
    this.setFrameRate();
    this.updateStateTimer();
    this.autoDecreasePositivity(this.positivityDecayFactor)
    this.positivityScore = this.incrementPositivity(this.positivityGrowthFactor)
    this.displayPositivity();
    this.curveDecayFactor();
    this.displayTitle("Game Psychologist: 34 years old. You were a judge in Seattle.\nOkay, let's get to work.");
    this.displayStateTimer();
    this.displayPortrait();
    this.spawnMentalSchemas();
    this.displayEmotionalDimension();
    if (this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      congratulations.play();
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
    push();
    fill(255);
    textSize(42);
    // TODO replace with array of different positive or negative thoughts
    text("I'm an impostor.", random(width / 2, width), random(height / 2, height));
    pop();
    // Hold any key down to think about the opposite
    if (keyIsPressed || mouseIsPressed) {
      push();
      fill(0, 255, 0);
      textSize(42);
      text("I have everything I need to succeed.\nI need to do my best.", mouseX - 250, mouseY);
      pop();
    } else {
      push();
      fill(255, 0, 0);
      textSize(42);
      text("Someone should take my job.", mouseX - 250, mouseY);
      pop();
    }
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
