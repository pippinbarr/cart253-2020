/**
  AzayashiMall()
  @constructor args: stateConfig, stateData, UILayer, characterPortrait
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class AzayashiMall extends State {
  constructor(stateConfig, stateData, UILayer, characterPortrait) {
    super(stateConfig, stateData, UILayer);
    this.characterPortrait = characterPortrait;
    this.resetStateTimer();
    this.positivityGrowthFactor = 50;
    this.positivityDecayFactor = 35; // Could become increasingly larger relative to growth factor by age slice.
    this.resetPositivity();
    this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    this.stateTag = "AzayashiMall";
    this.stateScoreTag = "7 years old -- Lost At The Mall";
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
    this.displayTitle("Game Psychologist: 7 years old. You got lost at the mall.\nYour parents never came back, so you walked back home alone.");
    this.displayPortrait();
    this.spawnMentalSchemas();
    this.displayStateTimer();
    this.displayEmotionalDimension();
    // Change scene after the duration of state
    if (this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      congratulations.play();
      this.positivityScore = this.positiveThoughts;
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
    textFont(AntonRegularType);
    // Instructions
    push();
    noStroke();
    fill(0, 255, 255);
    textSize(30);
    text("I got lost at the mall when I was around seven...", 50, 250);
    pop();

    push();
    fill(255);
    textSize(this.tSizer);
    translate(width / 2, height / 2);
    // TODO replace with array of different positive or negative thoughts
    text("I'm useless.", sin(this.timerAngle) * 200, cos(this.timerAngle) * 200);
    pop();

    push();
    translate(0, 0);
    stroke(255, 0, 0);
    strokeWeight(5);
    textSize(this.tSizer);
    text("I'm useless.", random(width / 2, width), random(height / 2, height));
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
      text("I'll wait for them. I'm sure they'll find me soon!", mouseX - 250, mouseY);
      pop();
    } else {
      push();
      noStroke();
      fill(255, 0, 0);
      textSize(42);
      text("I'm useless", mouseX - 250, mouseY);
      pop();
    }
    this.modifyStroke();
  }
  updateClicks(updateClickCounter) {
    this.contextMenuDisplayed = false;
  }
}
