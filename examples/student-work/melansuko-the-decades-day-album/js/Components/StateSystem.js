/**
  StateSystem()
  @constructor args: states, UILayer, stateConfig, characterPortrait
    inits default state parameters in parent State prototype.
    Starts at the currentStateTag.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states, UILayer, stateConfig, characterPortrait) {
    this.states = states;
    this.UILayer = UILayer;
    this.stateConfig = stateConfig;
    this.currentStateTag = "Tutorial";
    this.nextStateTag = "BetweenLifeSlicesA";
    this.characterPortrait = characterPortrait;
    this.numberOfClicksOverPortrait = 0;
    this.lifeScoreBoard = []; // The total positivity score for each slice of life. Accessible from outside to display the score to the player.
    console.log("StateSystem created.");
  }

  /**
    createSubSystems()
    @args: none.
    @Creates the UISystem, StatesParticles and StateInteractor subsystems.
  */
  createSubSystems() {
    this.UISystem = new UISystem(this.states, this.UILayer, this.stateConfig);
    this.StateParticles = new StateParticles(this.states, this.UILayer, this.stateConfig, this.characterPortrait);
  }

  /**
    updateSystems()
    @args: none.
    @Updates the UISystem and the StateParticles subsystems using a callback function, i.e., using closure
    on the checkCurrentStateTag(stateConfig) method for the stateConfig.
  */
  updateSystems() {
    this.updateCurrentStateTag();
    // If we are not in a BetweenLifeSlices, display the UI
    if(!this.states[this.currentStateTag].stateTag.includes("Life")) {
      this.UISystem.updateStateUI();
    }
    else {
      UILayer.clear();
    }
    this.StateParticles.updateParticles(this.checkCurrentStateTag);
  }

  /**
    updateCurrentStateTag()
    @args: none.
      @Updates the current state tag depending on in-state behaviours.
  */
  updateCurrentStateTag() {
    // Check the current active state
    // See if the boolean variable flag "readyToChangeState" is true
    // If so, update the currentState flags' values (this one and the next state)
    if(this.states[this.currentStateTag].readyToChangeState === true) {
      this.states[this.currentStateTag].readyToChangeState = false;
      this.stateConfig[this.currentStateTag].currentState = "false";
      this.stateConfig[this.nextStateTag].currentState = "true";

      // Stores the positivity score of the last state if it's a slice of life game state.
      console.log("Final Score: " + this.states[this.currentStateTag].positivityScore);
      if(!this.states[this.currentStateTag].stateTag.includes("Life") && this.states[this.currentStateTag].stateTag !== "Tutorial") {
        if(this.lifeScoreBoard.length < 50) { // Capping at 50 to prevent overloading the array at the climax which fills it frantically
          this.lifeScoreBoard.push(this.states[this.currentStateTag].stateScoreTag + " " + this.states[this.currentStateTag].positivityScore);
          console.log(this.lifeScoreBoard);
        }
      }
      // Update the current and next state tags in the config file
      this.currentStateTag = this.stateConfig[this.nextStateTag].stateTag;
      this.nextStateTag = this.stateConfig[this.currentStateTag].nextStateTag;
    }
  }

  /**
    checkCurrentStateTag()
    @args: none.
      Contains the state config objects to check for the status of states.
    @Returns the currentState by looping through the stateConfig.
  */
  checkCurrentStateTag() {
    let currentState = null;
    for(let i = 0; i < Object.keys(stateConfig).length; i++)
    {
      for (var state in stateConfig)
      {
        if(stateConfig[state].currentState === "true")
        {
            //&& stateConfig[state].stateTag !== this.currentStateTag
            currentState = state;
        }
      }
    }
    return currentState;
  }

  /**
    triggerReadyToChangeState()
    @no custom args
    @triggers the ready to change state.
  */
  triggerReadyToChangeState() {
    this.states[this.currentStateTag].readyToChangeState = true;
  }

  /**
    handleInputs()
    @no custom args
    @handles velocity changes depending on the keycode down:
      currently set to WASD keys.
  */
  handleInputs() {
    if(keyIsDown(65)) { // Left
      vx = -speed;
    }
    else if(keyIsDown(68)) { // Right
      vx = speed;
    }
    else if(keyIsDown(87)) { // Forward
      vz = -speed;
    }
    else if(keyIsDown(83)) { // Backward
      vz = speed;
    }
    else {
      vx = 0;
      vz = 0;
    }
    player3DPositionX += vx;
    player3DPositionZ += vz;
  }

  /**
    roomBoundariesBounce()
    @no custom args
    @handles screen bouncing at the borders of the game scene.
  */
  roomBoundariesBounce() {
    const sceneUnitThreshold = 2500;
    const bounceFactor = 50;
    if(player3DPositionX <= -sceneUnitThreshold) { // Left
      player3DPositionX += bounceFactor;
    }

    if(player3DPositionX >= sceneUnitThreshold) { // Right
      player3DPositionX -= bounceFactor;
    }

    if(player3DPositionZ <= 0) { // Forward
      player3DPositionZ += bounceFactor;
    }

    if(player3DPositionZ >= sceneUnitThreshold) { // Backward
      player3DPositionZ -= bounceFactor;
    }
  }

  /**
    handleLifeScoreBoard()
    @no custom args
    @handles life score board.
  */
  handleLifeScoreBoard() {
    // Update Life Scoreboard (positivity score for each slice of life)
    push();
    fill(255);
    textSize(100);
    text("Cognitive Restructuring  Life Scoreboard", -2250, -500);
    pop();

    if(this.lifeScoreBoard.length > 0) {
      for(let i = 0; i < this.lifeScoreBoard.length; i++) {
        push();
        fill(255);
        textSize(50);
        text(this.lifeScoreBoard[i] + " positive thoughts", -2050, -400 + i * 100);
        pop();
        scoreBoardLineSpacing += 100;
      }
    }
  }

  /**
    handleClimaticScene()
    @no custom args
    @handles climatic scene cinematics.
  */
  handleClimaticScene() {
    if(climaticScene) {
      let totalLifeBoardScore = 0;
      let meetingGodThreshold = 2000; // The score threshold at which the player can meet God (if they were too negative)
      // Count the total score of all states
      for(let i = 0; i < this.lifeScoreBoard.length; i++) {
        totalLifeBoardScore += parseInt(this.lifeScoreBoard[i]);
      }
      console.log("Total life score: " + totalLifeBoardScore);
      if(totalLifeBoardScore <= meetingGodThreshold) {
        // God NPC
        text("(Undiscernible voice): It is time to return to your maker, who gave you his life.", -1000, -1300);
        // Creates the Door of life
        push();
        translate(-1250, 1000, 100);
        fill(0, 255, 0);
        box(500, 700, 10);
        translate(1250, -1000, -100);
        pop();
      }
      else {
        // Go to the next room where you see all the good that you have done on earth
        // Spawn relatives and friends as cubes
      }
      // Text cue for the red door
      push();
      fill(0, 255, 0);
      textSize(100);
      text("Door of Life", -1450, 100);
      pop();

      // Check if player collided the Door of life
      if(player3DPositionX <= -1410 && player3DPositionZ <= 100) {
        cubeUniverseVisible = true;
      }

      if(cubeUniverseVisible) {
        translate(500, 1000, 500);
        push();
        texture(cloudsPlatformerBg);
        box(cubeUniverseX, cubeUniverseY, cubeUniverseZ);
        pop();
        translate(-500, -1000, -500);
      }

      if(cubeUniverseVisible && player3DPositionX >= -300 && player3DPositionX <= 500 && player3DPositionZ >= 150 && player3DPositionZ <= 500) {
        // We are inside the cube
        triggeredCubeUniverse = true;
        // Quick universe expansion effect
        cubeUniverseX += cubeUniverseGrowthRate;
        cubeUniverseY += cubeUniverseGrowthRate;
        cubeUniverseZ += cubeUniverseGrowthRate;
      }

      if(triggeredCubeUniverse) {
        if(player3DPositionX >= 0 && player3DPositionX <= 1000 && player3DPositionZ <= 50) {
          let numberOfBoxes = 10000;
          // we're going into the screen
          push();
          // Matrix neon green-blue glitchy colors
          fill(0, random(35, 255), random(5, 255));
          for(let i = 0; i <= numberOfBoxes; i++) {
            translate(random(0, width), random(0, height), random(0, 100));
            box(30 + random(0, player3DPositionZ), 30 + random(0, 150), 30 + random(0, 150));
            translate(-random(0, width), -random(0, height), -random(0, 100));
          }
          pop();
        }
        // Rain emotions
        push();
        rotateZ(PI/4);
        translate(random(0, width), random(0, height), random(0, 500));
        box(30 + random(0, 50), 30 + random(0, 50), 30 + random(0, 50));
        translate(-random(0, width), -random(0, height), -random(0, 500));
        pop();

        // Display young Allison inside boxes
        translate(100, 1000, 100);
        push();
        texture(allisonMall);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -100);

        // Display young Allison inside boxes
        translate(100, 1000, 200);
        push();
        texture(allisonFirstJob);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -200);

        // Display middle aged Allison inside boxes
        translate(100, 1000, 300);
        push();
        texture(allisonMasterJudge);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -300);

        // Display middle middle aged Allison inside boxes
        translate(100, 1000, 400);
        push();
        texture(allisonFloristMiddleAge);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -400);

        // Display very old aged Allison inside boxes
        translate(100, 1000, 500);
        push();
        texture(allisonVeryOldAged);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -500);

        // Display kid Allison inside boxes
        translate(100, 1000, 600);
        push();
        texture(allison);
        box(100, 100, 100);
        pop();
        translate(-100, -1000, -600);

        // Display the duckguy
        translate(500, 1000, 500);
        push();
        texture(duckguy);
        box(100, 100, 100);
        pop();
        translate(-500, -1000, -500);
      }
    }
  }
}
