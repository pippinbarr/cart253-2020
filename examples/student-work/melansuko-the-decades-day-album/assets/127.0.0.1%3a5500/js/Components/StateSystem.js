/**
  StateSystem()
  @constructor args: states
    inits default state parameters in parent State prototype.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states, UILayer) {
    this.states = states;
    this.UILayer = UILayer;
    this.currentStateTag = "Introduction";
    this.previousStateTag = "Tutorial";
    this.nextStateTag = "";
    this.maxScenes = 2;
    this.numberOfClicksOverPortrait = 0;    
    console.log("StateSystem created.");
  }
  /**
    createSubSystems()
    @args: none.
    @Creates the UISystem, StatesParticles and StateInteractor subsystems.
  */   
  createSubSystems() {
    this.UISystem = new UISystem(this.states, this.UILayer);    
    this.StateParticles = new StateParticles(this.states);
    this.StateInteractors = new StateInteractors(this.states);
  }
  /**
    updateSystems()
    @args: none.
    @Updates the UISystem and the StateParticles subsystems.
  */  
  updateSystems() {
    this.UISystem.updateStateUI(this.currentStateTag);
    this.StateParticles.updateParticles(this.currentStateTag);
  }
  /**
    changeState()
    @args: none.
    @Changes state if the StateInteractor returned a scene change event.
  */
  changeState() {
    if(this.StateInteractors.updateInteractors()){
      this.states[this.currentStateTag].updateState();
    }
  }

  /**
    updateClickCounter()
    @arg: none.
    @Displays the click counter for this state. TODO pass parameters for other scenes.
  */
  updateClickCounter() {
    ++this.numberOfClicksOverPortrait;
    push();
    textSize(42);
    fill(255);
    //console.log(this.numberOfClicksOverPortrait);
    text("Number of recalls: " + this.numberOfClicksOverPortrait, 100, 50);
    pop();
  }
}
