/**
  UISystem()
  @constructor args: states, UILayer, stateConfig
    the states object required for certain methods.
    the create graphics layer used to update the UI.
  @Displays the UI images provided at the specified x, y positions.
*/
class UISystem extends StateSystem {
  constructor(states, UILayer, stateConfig) {
    super(states, UILayer, stateConfig)
    this.clickedOnMenuButton = false; // Whether the menu button was clicked in any state.
    this.contextMenuDisplayed = false;
    this.openContextMenuButtonX = 850;
    this.openContextMenuButtonHeight = 100;
    this.timerAngle = 0;
  }

  /**
    updateStateUI()
    @no custom args.
    @Drives the whole UI updating process. Not much going on for now.
  */
  updateStateUI() {
    this.updateUI();
    this.updatePsyInstructions();
  }

  /**
    updateUI()
    @no custom args.
    @Updates the UI elements on the slice of life bar.
  */
  updateUI() {
    // The UI at the top. Black bar with a turquoise button. DISCONTINUED for now, will modify later.
    // this.UILayer.push();
    // this.UILayer.fill(0);
    // this.UILayer.rect(0,0,width,100);
    // this.UILayer.fill(64,224,208);
    // this.UILayer.rect(width-150,0,150,100);
    // this.UILayer.pop();

    // Displays the slice-of-life bar
    this.UILayer.push();
    this.UILayer.fill(255);
    this.UILayer.rect(0, 75, width, 50);
    this.UILayer.pop();

    this.UILayer.push();
    this.UILayer.textSize(35);
    this.UILayer.fill(0);
    this.UILayer.text("Keep clicking the mouse for Cognitive Restructuration (%)...", 0, 115); // TODO change years as per state
    this.UILayer.pop();
  }

  /**
    updatePsyInstructions()
    @no custom args.
    @Updates the psychologists' instructions on the button at the top-right for the introduction state.
    Toggles off and on. DISCONTINUED for now.
  */
  updatePsyInstructions() {
    // // Psychologist's Instructions
    // this.UILayer.push();
    // this.UILayer.fill(0);
    // this.UILayer.textSize(25);
    // this.UILayer.text("Instructions", this.openContextMenuButtonX + 10, 50); // "Instructions"
    // this.UILayer.pop();
  }

  /**
    createContextMenu()
    @arg: message.
      The string to be passed as the first argument of text().
    @Displays Displays the context menu at the top.
  */
  createContextMenu(message) {
    this.contextMenuDisplayed = true;
    this.UILayer.push();
    this.UILayer.fill(0);
    this.UILayer.rect(this.openContextMenuButtonX - 300, this.openContextMenuButtonHeight, 600, 200);
    this.UILayer.textSize(25);
    this.UILayer.fill(255);
    this.UILayer.text(message, this.openContextMenuButtonX - 295, this.openContextMenuButtonHeight + 50);
    this.UILayer.pop();
  }

  /**
    clearContextMenu()
    @arg: none.
    @Clears the context menu. DISCONTINUED for now, will be modified later.
  */
  clearContextMenu() {
    UILayer.push();
    //UILayer.background(255);
    UILayer.pop();
  }

  /**
    mouseOverPortrait()
    @no custom args.
    @Checks if the mouse is hovering over the
    current state's portrait (always fixed position).
    Returns the state as a result.
  */
  mouseOverPortrait() {
    let state = false;
    const portraitX = 0 + 300;
    const portraitY = 250;
    if(mouseX >= 0 && mouseX <= portraitX + 300 && mouseY >= portraitY && mouseY <= height){
      state = true;
    }
    return state;
  }

  /**
    mouseOverUIButton()
    @no custom args.
    @Checks if the mouse is hovering over the
    turquoise UI button at the top right. Returns the
    state as a result.
  */
  mouseOverUIButton() {
    let state = false;
    if(mouseX >= this.openContextMenuButtonX && mouseX <= width && mouseY >= 0 && mouseY <= this.openContextMenuButtonHeight){
      state = true;
    }
    return state;
  }

  /**
    updateStateInstructions()
    @no custom args.
    @Called by mousePressed() in main.js if the click was on the instructions button.
    Updates the psychologists' instructions on the button at the top-right as per state.
  */
  updateStateInstructions() {
    console.log(this.currentStateTag);
    switch(this.currentStateTag) {
      case "Tutorial":
        this.updateIntroInstructions();
        break;
      case "Introduction":
        this.updateIntroInstructions();
        break;
      case "AzayashiMall":
        this.updateAzayashiMallIntructions();
        break;
      default:
        break;
    }
  }

  /**
    updateAzayashiMallIntructions()
    @no custom args.
    @Called by updateStateInstructions ().
    Updates the psychologists' instructions on the button at the top-right for the AzayashiMall state.
    Toggles off and on.
  */
  updateAzayashiMallIntructions() {
    this.clickedOnMenuButton = !this.clickedOnMenuButton;
    let message = null;
    if(this.clickedOnMenuButton) {
      if(this.numberOfClicksOverPortrait <= 3) {
        message = "Find out what happened to your parents.";
      }
      else if(this.numberOfClicksOverPortrait <= 6) {
        message = "Keep trying.";
      }
      else {
        message = "...";
      }
      createContextMenu(message);
    }
    else {
      this.clearContextMenu();
    }
  }

  /**
    updateInstructions()
    @no custom args.
    @Called by updateStateInstructions ().
    Updates the psychologists' instructions on the button at the top-right for the introduction state.
    Toggles off and on. DISCONTINUED for now.
  */
  updateIntroInstructions() {
    console.log("Clicking over menu button.");
    this.clickedOnMenuButton = !this.clickedOnMenuButton;
    let message = null;
    if(this.clickedOnMenuButton) {
      // UI text prompt
      if(this.numberOfClicksOverPortrait <= 3) {
        message = "Keep clicking on the picture to recall\nthe memory.";
      }
      else if(this.numberOfClicksOverPortrait <= 6) {
        message = "That's good. You're doing great.";
      }
      else {
        message = "...";
      }
      this.createContextMenu(message);
    }
    else {
      this.clearContextMenu();
    }
  }

  /**
    updateClickCounter()
    @arg: none.
    @Increments the numberOfClicksOverPortrait variable after the player clicked on the portrait.
  */
  updateClickCounter() {
    this.numberOfClicksOverPortrait++;
  }
}
