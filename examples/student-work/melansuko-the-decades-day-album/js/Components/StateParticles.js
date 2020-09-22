/**
  StateParticles()
  @constructor args: states, UILayer, stateConfig, characterPortrait
    Takes in the states object.
  @Takes in the currentStateTag and updates the visuals to render
  on screen accordingly in the states object.
  @TODO - Transforms particle data inputted by the StateSystem and returns
  the processed output.
*/
class StateParticles extends StateSystem {
  constructor(states, UILayer, stateConfig, characterPortrait) {
    super(states, UILayer, stateConfig, characterPortrait);
    console.log("StateParticles created.");
  }

  /**
    updateParticles()
    @constructor args: checkCurrentStateTag
      The string variable of the current state tag returned by the callback function.
    @Takes in the callback function checkCurrentStateTag(stateConfig) and gets the currentState.
    Updates the visuals to render on screen the currentState's defined settings.
  */
  updateParticles(checkCurrentStateTag) {
    let currentState = checkCurrentStateTag();
    this.updateBackground(currentState);
    this.updateText(currentState);
    this.updateSpecialState(currentState);
  }

  /**
    updateBackground()
    @currentState custom args.
    @Updates the current state's text background color as defined in the stateData.json.
  */
  updateBackground(currentState) {
    push();
    background(this.states[currentState].bgColor);
    pop();
  }

  /**
    updateText()
    @currentState custom args.
    @Updates the current state's text as defined in the stateData.json.
  */
  updateText(currentState) {
    textFont(AntonRegularType);
    push();
    noStroke();
    fill(this.states[currentState].textColor);
    textSize(this.states[currentState].tSize);
    text(this.states[currentState].narration, this.states[currentState].narrationPosX, this.states[currentState].narrationPosY);
    pop();
  }

  /**
    updateSpecialState()
    @arg: currentState
      The current state in the StateSystem to update.
    @Calls the current state's updateState method.
  */
  updateSpecialState(currentState) {
    this.states[currentState].updateState();
  }

  /**
    displayPortrait()
    @arg: character
      The cached image to display.
    @Displays the character image provided as an argument
    at the portrait's default x, y positions.
  */
  displayPortrait() {
    let portraitDefaultX = 300;
    let portraitDefaultY = 640;
    push();
    imageMode(CENTER);
    image(this.characterPortrait, portraitDefaultX, portraitDefaultY, this.characterPortrait.width, this.characterPortrait.height);
    pop();
  }

  /**
    textLineWidth()
    @arg: stringArray
      The string array to check for width.
    @Takes an array of strings and calculate the average length of all the entries.
  */
  textLineWidth(stringArray) {
    let averageLengthPerWord = 0;
    let numberOfChars = 0;
    let totalLength = 0;
    let textLineWidth = 0;
    for(let i = 0; i < stringArray.length; i++) {
      let word = stringArray[i];
      for(let j = 0; j < word.length; j++) {
        // Count each letter char of the word
        numberOfChars++;
      }
      totalLength += numberOfChars; // increment
      numberOfChars = 0; // reset
    }
    averageLengthPerWord = totalLength / stringArray.length;
    textLineWidth = averageLengthPerWord * (this.stateData.tSize - this.stateData.tSize / 2);
    return textLineWidth;
  }
}
