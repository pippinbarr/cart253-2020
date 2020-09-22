"use strict";
/**
  Allison's Therapy
  Author: Sylvain Tran

  @Goals of program:

  @Extend basics of arrays and trigonometry.
  @Explore the meaning of depression, relationships of visual outputs
    through a basic story.
  @Take some things learned from Phaser.js and P2 and incorporate
    some complex ideas using other libraries.
  @Simplify my code and use more robust designs.

  Music:
  https://opengameart.org/content/chill-lofi-inspired
  Voices:
  https://opengameart.org/content/voiceover-pack-40-lines
*/
// State System variables
let states = {};
let stateConfig, stateData0, stateData1, stateData2, stateData3, stateData4, stateData5, stateData6, stateData7, stateData8;
// UI Layer, game canvases
let UILayer;
let gameCanvas;
// Typeface
let zeyadaType, AntonRegularType;
// Allison's anime life portraits
let allison, allisonMall, allisonHighSchool, allisonFirstJob, allisonMasterJudge, allisonFloristMiddleAge, allisonVeryOldAged, duckguy;
// 2D platformer Allison's avatar
let moveableAllison, oldAllison;
// Parallaxed background for the fake platformer
let cloudsPlatformerBg;
// Fake platformer input keys
let inputKeys = {
  "LEFT": 37,
  "RIGHT": 39,
  "ENTER": 13
};
// Sound assets
let ChillLofiR; // Chill lofi song
let readyVoice;
let congratulations;
let go;
let positiveChime;
let hurryUp;
// Position X, Z of the camera
let player3DPositionX; // simple X position in 3D space
let player3DPositionZ; // simple Z position in 3D space
// 3D camera speed, velocities
let speed = 50;
let vx = 0;
let vz = 0;
// Whether the cube universe is visible, its dimensions and growth rate
let cubeUniverseVisible = false;
let cubeUniverseX = 500;
let cubeUniverseY = 500;
let cubeUniverseZ = 500;
let cubeUniverseGrowthRate = 15;
let climaticScene = false; // If we are the ending.
let triggeredCubeUniverse = false; // If the player entered the cube
// Scoreboard settings
let scoreBoardLineSpacing = -500;
// UI Settings
let UIXPos;
let maxUIXPos;
/**
  preload()
  @no custom args.
  @Preload images and sounds needed.
*/
function preload() {
  duckguy = loadImage("assets/images/duckguy.jpg");
  allison = loadImage("assets/images/Allison-0001-FourYears-FX.png");
  allisonMall = loadImage("assets/images/Allison-0002-AMall-FX.png");
  allisonHighSchool = loadImage("assets/images/Allison-0003-HighSchool-FX.png");
  allisonFirstJob = loadImage("assets/images/Allison-0004-first-job.png");
  allisonMasterJudge = loadImage("assets/images/Allison-0005-judge.png");
  allisonFloristMiddleAge = loadImage("assets/images/Allison-0006-HotelSpa.png");
  allisonVeryOldAged = loadImage("assets/images/Allison-0007-very-old-aged.png");
  oldAllison = loadImage("assets/images/old-allison.gif");
  cloudsPlatformerBg = loadImage("assets/images/cloudsPlatformerBg.png");
  zeyadaType = loadFont("assets/fonts/Zeyada-Regular.ttf");
  AntonRegularType = loadFont("assets/fonts/Anton-Regular.ttf");
  stateConfig = loadJSON("data/states/stateConfig.json");
  stateData0 = loadJSON("data/states/stateData/stateData0.json");
  stateData1 = loadJSON("data/states/stateData/stateData1.json");
  stateData2 = loadJSON("data/states/stateData/stateData2.json");
  stateData3 = loadJSON("data/states/stateData/stateData3.json");
  stateData4 = loadJSON("data/states/stateData/stateData4.json");
  stateData5 = loadJSON("data/states/stateData/stateData5.json");
  stateData6 = loadJSON("data/states/stateData/stateData6.json");
  stateData7 = loadJSON("data/states/stateData/stateData7.json");
  stateData8 = loadJSON("data/states/stateData/stateData8.json");
  ChillLofiR = loadSound("assets/sounds/ChillLofiR.mp3");
  readyVoice = loadSound("assets/sounds/ready.ogg");
  congratulations = loadSound("assets/sounds/congratulations.ogg");
  go = loadSound("assets/sounds/go.ogg");
  positiveChime = loadSound("assets/sounds/positiveChime.wav");
}

/**
  setup()
  @no custom args.
  @Creates canvas and appends it to the game container.
  @Initializes the game states.
  @Creates a new StateSystem and pass it the states/scenes.
  Creates the StateSystem subsystems next, then display the
  portrait of Allison.
*/
function setup() {
  gameCanvas = createCanvas(1000, 1000, WEBGL);
  gameCanvas.parent('gameCanvas');
  UILayer = createGraphics(1000, 200);
  states = {
    "Tutorial": new Tutorial(stateConfig, stateData1, UILayer, allison),
    "BetweenLifeSlicesA": new BetweenLifeSlicesA(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Introduction": new Introduction(stateConfig, stateData2, UILayer, allison),
    "BetweenLifeSlicesB": new BetweenLifeSlicesB(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "AzayashiMall": new AzayashiMall(stateConfig, stateData3, UILayer, allisonMall),
    "BetweenLifeSlicesC": new BetweenLifeSlicesC(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "HighSchool": new HighSchool(stateConfig, stateData4, UILayer, allisonMall),
    "BetweenLifeSlicesD": new BetweenLifeSlicesD(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "FirstJob": new FirstJob(stateConfig, stateData5, UILayer, allisonFirstJob),
    "BetweenLifeSlicesE": new BetweenLifeSlicesE(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Judge": new Judge(stateConfig, stateData6, UILayer, allisonMasterJudge),
    "BetweenLifeSlicesF": new BetweenLifeSlicesF(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "HotelSpa": new HotelSpa(stateConfig, stateData7, UILayer, allisonFloristMiddleAge),
    "BetweenLifeSlicesG": new BetweenLifeSlicesG(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Downtown": new Downtown(stateConfig, stateData8, UILayer, allisonVeryOldAged, cloudsPlatformerBg)
  };
  StateSystem = new StateSystem(states, UILayer, stateConfig, allison);
  StateSystem.createSubSystems();
  ChillLofiR.loop();
  player3DPositionX = width / 2;
  player3DPositionZ = height / 2;
  // Adjust the 3D UI
  UIXPos = player3DPositionX - width / 2;
  maxUIXPos = constrain(UIXPos, 0, width / 2);
}

/**
  draw()
  @no custom args.
  @Render each frame. Places camera, updates the StateSystem for each active state, and registers input. Draws UI.
*/
function draw() {
  // First-person view
  //camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
  camera(player3DPositionX - 150, height / 3, player3DPositionZ / tan(PI / 6), mouseX * 2.5, mouseY * 2.5, 0, 0, 1, 0);
  // Re-center the origin to top left
  translate(-width / 2, -height / 2, 10);
  // Update state graphics
  StateSystem.updateSystems();
  // Handle the score board and the checks for the climatic scene
  StateSystem.handleLifeScoreBoard();
  StateSystem.handleClimaticScene();
  // 3D Movement
  StateSystem.handleInputs();
  // Bounce off walls
  StateSystem.roomBoundariesBounce();
  image(UILayer, maxUIXPos, -250, 1000, 200);
}

/**
  mousePressed()
  @no custom args (has a default callback arg)
  @Listens to mouse presses on canvas. Activates the current state's updateClicks() function,
    which has its own callback function to request an update of the click counter in the UISystem.
  This current state should always be up to date due to the StateSystem's own update function.
*/
function mousePressed() {
  if (StateSystem.UISystem.mouseOverPortrait()) {
    StateSystem.states[StateSystem.currentStateTag].updateClicks(StateSystem.UISystem.updateClickCounter());
  }
  if (StateSystem.UISystem.mouseOverUIButton()) {
    StateSystem.UISystem.updateStateInstructions();
  } else {
    StateSystem.UISystem.clearContextMenu();
  }
}
