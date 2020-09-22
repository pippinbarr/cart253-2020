/**
  HotelSpa
  @constructor args: stateConfig, stateData, UILayer, characterPortrait
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class HotelSpa extends State {
  constructor(stateConfig, stateData, UILayer, characterPortrait) {
    super(stateConfig, stateData, UILayer);
    this.characterPortrait = characterPortrait;
    this.resetStateTimer();
    this.positivityGrowthFactor = 50;
    this.positivityDecayFactor = 40;
    this.resetPositivity();
    this.positivityScore = 0;
    this.stateTag = "HotelSpa";
    this.stateScoreTag = "44 years old -- Becoming A Florist, Divorcing";
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
    this.displayTitle("Game Psychologist: 44 years old. You decided\nto become a florist. Your husband divorced you.");
    this.displayStateTimer();
    this.displayPortrait();
    this.spawnMentalSchemas();
    this.displayEmotionalDimension();
    // Change scene after the duration of state
    if (this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      if (this.positivityScore < 0) {
        congratulations.play();
      }
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
    translate(0, 0);
    stroke(255, 0, 0);
    strokeWeight(5);
    textSize(this.tSizer);
    text("I'm having a midlife crisis.", random(width / 2, width), random(height / 2, height));
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
      text("No, I'm proud of what I've done.", mouseX - 250, mouseY);
      pop();
    } else {
      push();
      noStroke();
      fill(255, 0, 0);
      textSize(42);
      text("I... messed up my life.", mouseX - 250, mouseY);
      pop();
    }
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
