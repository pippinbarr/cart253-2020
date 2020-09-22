/**
  StateParticles()
  @constructor args: states
    Takes in the states object.
  @Takes in the currentStateTag and updates the visuals to render
  on screen accordingly in the states object.
  @Transforms particle data inputted by the StateSystem and returns
  the processed output.
*/
class StateParticles {
  constructor(states) {
    this.states = states;
    console.log("StateParticles created.");
  }
  /**
    updateParticles()
    @constructor args: currentStateTag
      The string variable of the current state tag passed by the StateSystem.
    @Takes in the currentStateTag and updates the visuals to render
    on screen accordingly in the states object.
  */
  updateParticles(currentStateTag) {
    this.updateBackground(currentStateTag);
    this.updateText(currentStateTag);
  }
  updateBackground(currentStateTag) {
    push();
    background(this.states[currentStateTag].bgColor);
    pop();
  }
  updateText(currentStateTag) {
    push();
    fill(this.states[currentStateTag].textColor);
    textSize(this.states[currentStateTag].tSize);
    text(this.states[currentStateTag].narration, this.states[currentStateTag].narrationPosX, this.states[currentStateTag].narrationPosY);
    pop();
  }
  /**
    Takes an array of strings and calculate the average length of all the entries.

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
