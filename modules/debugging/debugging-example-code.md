# Debugging example code {

---

## In this module

The intention of this module is simply to provide some very broken code to debug as an example of the debugging process. It's meant to be paired with the accompanying video.

---

## The broken code

Here is our example code. Assuming we wrote it (terribly) then we would know it's meant to do the following:

- Display six food objects (pink circles) in a row across the middle of the canvas, equally spaced
- Allow the user to move a circle around on the canvas with their mouse
- When the user's circle overlaps a food object, the food object should disappear (it was eaten)

That's it! Let's debug this son of a gun!

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

Boy was that ugly.

---

# }
