class BetweenLifeSlicesF extends BetweenLifeSlices {
  constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
    super(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg);
    this.resetStateTimer();
    this.stateDuration = 365;
    this.stateTag = "BetweenLifeSlicesF";
  }

  /**
    updateState()
    @no custom args.
    @Updates this state.
  */
  updateState() {
    frameRate(60);
    this.updateStateTimer();
    this.displayStateTimer();
    this.displayTitle("Game Psychologist: You know, I think we could have been friends.");
    this.updateParallaxBg();
    this.updateText();
    this.moveableAllison.handleInput();
    this.moveableAllison.move();
    this.moveableAllison.display();
    if (this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      readyVoice.play();
    }
  }

  updateText() {
    push();
    noStroke();
    textSize(40);
    fill(255);
    text("“Be proud of what you've accomplished, whether it's\nlittle or big. Nobody else could have\ndone it the same way.” - Your Own Self", 20, 850);
    pop();
  }
}
