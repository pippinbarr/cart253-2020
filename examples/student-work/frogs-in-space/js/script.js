//**************************************************************************************************
//FROGS IN SPACE
//
//all art, music, audio and code by Martin Hanses
//
// In this game, you play as Frank Linna, the sickest and coolest
// frog starpilot in the frog galaxy. After the great wars, he was awarded a
// swanky medal. This medal proved to induce massive jealousy in his fellow
// frogs, much to his dismay. This game takes place on a day like any other,
// except a douchey frog has some douchey things to say to our hero. Regarding
// his swanky medal.
//
// INSTRUCTIONS:
// Use arrow keys to fly the ship, and as such, move your reticule in an inverted manner.
// (that's just how the laws of physics work)
// Press shift to fire laser. Take out those missiles! Don't shoot the enemy, no matter how
// annoying he is.
// *************************************************************************************************

//LET'S CRETE VARIABLES
//Create game state variables
let introState = 0;
let gameStarted = false;
let gameOver = false;
let gameWon = false;

//Create debris array
let debris = [];

//create player and target variables
let player;
let imgTarget;

//create player HUD variable
let playerHUD;

//create background variable
let backGround;

//create enemy & enemy bullet variable
let enemy;
let enemyBullet;

//IMAGE VARIABLES
//Create sprite variables for player
let imgPlayer;
let imgPlayerBottomLeft;
let imgPlayerBottomRight;
let imgPlayerTopLeft;
let imgPlayerTopRight;
let imgPlayerRight;
let imgPlayerLeft;
let imgPlayerTop;
let imgPlayerBottom;
//Create sprite variables for enemy and enemy bullet
let imgEnemy;
let imgEnemyBullet;
//create explosion variable for both enemybullet and player
let imgExplosion;
//create images for HUD and background
let imgSpeakerPortrait;
let imgHudFlair;
let imgEarth;
//create sprites variables for intro, win and end screens
let imgSplash;
let imgIntro1;
let imgIntro2;
let imgIntro3;
let imgWinScreen;
let imgLoseScreen;

//create audio variables
let audLaser;
let audPlayerHit;
let audEnemyExplosion;
let audOverheat;
let audMusic;


//preload()
//
//Preload images and sounds
function preload() {
  //SPRITES
  //load target sprite
  imgTarget = loadImage('assets/images/target.png');
  //load background
  imgEarth = loadImage('assets/images/earth.png');
  //load player sprites
  imgPlayer = loadImage('assets/images/playerShipCenter.png');
  imgPlayerBottomLeft = loadImage('assets/images/playerShipBottomLeft.png');
  imgPlayerBottomRight = loadImage('assets/images/playerShipBottomRight.png');
  imgPlayerTopLeft = loadImage('assets/images/playerShipTopLeft.png');
  imgPlayerTopRight = loadImage('assets/images/playerShipTopRight.png');
  imgPlayerLeft = loadImage('assets/images/playerShipLeft.png');
  imgPlayerRight = loadImage('assets/images/playerShipRight.png');
  imgPlayerTop = loadImage('assets/images/playerShipTop.png');
  imgPlayerBottom = loadImage('assets/images/playerShipBottom.png');
  //load sprites for enemy ship and bullet
  imgEnemyShip = loadImage('assets/images/enemyShip.gif')
  imgEnemyBullet = loadImage('assets/images/enemyBullet.gif');
  //load fancy explosion
  imgExplosion = loadImage('assets/images/explosion.gif');
  //Load image for enemy portrait and HUD assets
  imgSpeakerPortrait = loadImage('assets/images/hudPortrait.gif')
  imgHudFlair = loadImage('assets/images/hudFlair.png')
  imgSplash = loadImage('assets/images/splash.png');
  imgIntro1 = loadImage('assets/images/intro1.png');
  imgIntro2 = loadImage('assets/images/intro2.png');
  imgIntro3 = loadImage('assets/images/intro3.png');
  imgWinScreen = loadImage('assets/images/winScreen.PNG');
  imgLoseScreen = loadImage('assets/images/loseScreen.PNG');

  //AUDIO
  //Load all audio files
  audLaser = loadSound('assets/sounds/laser.wav');
  audPlayerHit = loadSound('assets/sounds/hit.wav');
  audEnemyExplosion = loadSound('assets/sounds/explosion.wav');
  audOverheat = loadSound('assets/sounds/overheat.wav');
  audMusic = loadSound('assets/sounds/music.wav');
}

//setup()
//
//Set up game window and screen
function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  //Set player and background
  player = new Player();
  backGround = new Background();
  //create your evil opponent
  enemy = new Enemy();
  //Create debris based on amount set in loop
  for (let i = 0; i < 100; i++) {
    //randomize location
    let x = floor(random(0, windowWidth));
    let y = floor(random(0, windowHeight));
    let size = floor(random(1, 1));
    //Create debris based on the variable
    let newStar = new Debris(x, y, size);
    //place the new piece of debris in the debris array
    debris.push(newStar);
  }
  let x = floor(random(0, windowWidth));
  let y = floor(random(0, windowHeight));
  //create an enemy bullet at the position of the enemy
  enemyBullet = new EnemyBullet(enemy.x, enemy.y, 20);
  debris.push(enemyBullet);
  //Create a HUD object
  playerHUD = new HUD();
}

//draw()
//call all functions we use
function draw() {
  //if player health is zero, show game over function
  if (player.health <= 0) {
    handleGameOver();
    //if enemy health(plotpoints) reach zero, show win function
  } else if (enemy.plotPoints <= 0) {
    gameWon = true;
    handleVictory();
    //if the intro is over, call gameplay
  } else if (introState >= 4) {
    handleGameplay();
    //if nothing else matters, show the intro. It's kinda cool I guess
  } else {
    handleGameIntro();
  }
}

//function handleGameplay()
//
//This function displays the elements of the main game
function handleGameplay() {

  //Handle background functions
  backGround.display();
  backGround.handleInput();
  //Handle enemy functions
  enemy.display();
  enemy.update();
  //handle debris and enemyBullet
  for (let i = 0; i < debris.length; i++) {
    debris[i].update();
  }
  //handle enemyBullet collisions
  enemyBullet.handleCollisions();
  enemyBullet.handleExplosion();
  //handle all player functions
  player.update();
  player.display();
  player.handleInput();
  player.handleShooting();
  //display and set playerHUD
  playerHUD.setDialogue();
  playerHUD.display();
}

//handleGameIntro()
//
//Run game intro state when applicable:
//Displays intro images in order and also checks if the music has loaded, and if so, plays it
function handleGameIntro() {
  if (introState === 0) {
    //set initial picture to be the splash
    currentIntro = imgSplash;
  } else if (introState === 1) {
    currentIntro = imgIntro1;
    if (audMusic.isPlaying() === false) {
      audMusic.loop();
    }
  } else if (introState === 2) {
    currentIntro = imgIntro2;
    if (audMusic.isPlaying() === false) {
      audMusic.loop();
    }
  } else if (introState === 3) {
    currentIntro = imgIntro3;
    if (audMusic.isPlaying() === false) {
      audMusic.loop();
    }
  } else if (introState === 4) {
    currentIntro = imgIntro4;
    if (audMusic.isPlaying() === false) {
      audMusic.loop();
    }
    gameStarted = true;
  }
  //display the currently set intro image
  image(currentIntro, 0, 0, windowWidth, windowHeight);
}

//handleGameOver()
//
//Run gameover state when applicable
function handleGameOver() {
  gameOver = true;
  image(imgLoseScreen, 0, 0, windowWidth, windowHeight);
}

//handleVictory()
//
//Run gameover state when applicable
function handleVictory() {
  gameOver = true;
  image(imgWinScreen, 0, 0, windowWidth, windowHeight);
}

//mouseClicked()
//
//run whenever we click the mouse
function mouseClicked() {

  //If game still hasnt started, click to move forward in the game state (handleGameIntro)
  if (gameStarted === false) {
    introState += 1;
  } 
  //if the player has lost, click to restart the whole thaang
  if (gameOver === true) {
    player.reset();
    enemy.reset();
    gameOver = false;
    gameStarted = false;
    introState = 0;
  }
  //if the player has won, click to restart the game
  if (gameWon === true) {
    player.reset();
    enemy.reset();
    gameWon = false;
    gameStarted = false;
    gameOver = false;
    introState = 0;
  }

}
