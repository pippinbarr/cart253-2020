class BetweenLifeSlicesG extends BetweenLifeSlices {
  constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
    super(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg);
    this.resetStateTimer();
    this.stateDuration = 365;
    this.stateTag = "BetweenLifeSlicesG";
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
    this.displayTitle("Game Psychologist: Hmm... It looks like we're nearing the end.");
    this.updateParallaxBg();
    this.updateText();
    this.moveableAllison.handleInput();
    this.moveableAllison.move();
    this.moveableAllison.display();
    if (this.stateTimer >= this.stateDuration) {
      // This final call will unroll all game states in an infinite loop to create the
      // Flash of life effect
      this.readyToChangeState = true;
      readyVoice.play();
      // Silence for all states
      masterVolume(0.0, 2.0);
    }
  }

  updateText() {
    push();
    noStroke();
    textSize(40);
    fill(255);
    text("“Life is rolling by, but what are you doing here? He's waiting for you... -The Guide”", 20, 850);
    pop();
  }
}
