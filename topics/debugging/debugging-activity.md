# Debugging activity {

---

## In this module

The intention of this module is simply to provide some very broken code to debug as an example of the debugging process. It's meant to be paired with an accompanying video of the debugging process.

---

## Brief

The code we will be debugging is supposed to do the following:

- Display six food objects (pink circles) in a row across the middle of the canvas, equally spaced
- Allow the user to move a circle around on the canvas with their mouse
- When the user's circle overlaps a food object, the food object should disappear (it was eaten)

It is badly in need of repair, however, and that will be our activity. __Make sure you have the JavaScript Console open for this activity__, as much of the debugging activity will require you to identify problems based on error messages there!

Remember the key steps of debugging, which are:

1. Run the program
2. Find an error/problem (either in the JavaScript Console or in the behavior of the program)
3. Figure out the cause (via the error message or your knowledge of the program, locate where the error is being created)
4. Fix the error (fix syntax errors and correct behavioral problems)
5. Start again at 1

Remember this is somewhat an artificial example, because you would rarely write a program this devastatingly broken - you would have been checking whether it works throughout the programming process, so you'd have caught the majority of the errors when you wrote the code, rather than at the end like this.

---

## Please remember to use proper formatting!

It is __really__ important to make sure that when you write (and debug) code it is properly indented. This is best achieved with a package in Atom that will automatically do this for you.

`atom-prettier`, which you should have installed already, has an option in its preferences called "Format files on save" which you should have __on__. This will autoformat your entire file whenever you save it, which is __very__ helpful.

As a backup, consider also installing `atom-beautify`, another package which handles autoindenting and formatting.

Formatting our JavaScript files will often help to identify serious issues in the code, particularly around missing curly brackets which are the bane of our existence!

---

## The code to debug

```
"use strict";

// Our user, to move with the mouse
    let luser = {
  x: 0,
    y: 0,
  userSize: 100


// Food objects
let food2;
let food3;
  let food4;
    let food5;
    let food6;

function setup()
  createCanvas(600, 600);

      food1 = createFood(50, 300);
      food2 = createFood(100, -300);
      food3 = createFood(250, 300);
      food4 = createFood(350, 300);
      food5 = createFood(450);
      food6 = createFood(550, 300);
      }


function createFood(x y) {
  let food = {
  x: x,
  y: y,
  size: 50,
  eaten: flase
  };
  return food;
}

function drew( {
  backgrund(0);

  // Move the user (with the mouse)
  MoveUser();

  // Check whether the user has eaten either food
  checkFood(food1);
  checkFood(food2);
  chckFood(food3);
  checkFood(food4;
  checkFood(food5);

// Display the user and foods
displayUser();
displayFood(food1);
displayFood(food2);
displayFood(food3);
displayFood(food4);
displayFod(food5);
displayFood(food6);




      }

// Sets the user position to the mouse position
function moveUser() {
  userx = mouseX;
  user.y = mouseY;
}

// Checks if the user overlaps the food object and eats it if so
function checkFood(food) {
  if (!food.eaten) {
  let d = dist(user.x, user.x, food.x, food.y);
  if (d < user.size / 2 + food.size / 2 {
  food.eaten = true;
  }
}

// Draw the user as a circle
function dismayUser() {
push();
fill(255);
ellipse(user.x, user.y, user.size);
pop();
}

// Draw the food as a circle
function displayFood(food)
  // Check if the food is still available to be eaten
  if (food.ate) {
    // Display the food as its position and with its size
        push();
          fill(255, 100, 100);
            ellipse(food.x, food.y);
              pop();
  }
}

```

---

## Finished?!

That was some terrible, terrible code wasn't it? But we made it through and now it works!

That is debugging!

Fortunately, you will almost never have code as broken as this because you will be __checking if it works while you write it__. That's lucky!

---

# }
