# Inheritance activity {

## Objectives

1. Using inheritance to create and use multiple, similar classes


---

## The idea

Let's making a road-crossing simulator!

_The user will control a circular pedestrian at the bottom of the canvas. Cars, trucks, and motorcycles will be moving left and right across the canvas. If the pedestrian collides with any of the vehicles, they die. If they make it to the other side, they succeeded. Just like life!_

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `inheritance-activity`
3. Move the folder into your `cart253` repository folder inside the `activities` folder
4. In GitHub Desktop, commit with a message like "Activity: Started the Inheritance activity" and push

Remember that it's a nice idea to commit (and push) throughout the activity as you get different things done. This will be part of the evaluation for exercises and projects.

---

## Make a plan

Here is a suggested plan:

1. Write a main script with states
2. Create a basic Pedestrian class and integrate it into the main script
3. Create a Vehicle class
4. Create Car, Truck, and Motorcycle classes that extend the Vehicle class
5. Add cars, trucks, and motorcycles to the main script
6. Add success and failure conditions

Let's do this!

For the ideas that we've seen before in activities, the instructions will be shorter!

---

## 1. Write a main script with states

Let's start with the our main script.

For now let's

1. Add a state variable that starts off as `title` (and can also be `simulation`, `success`, and `dead`)
2. Create your canvas in `setup()`
3. Define functions for each of the four states
4. Write an `if`-statement in `draw()` that checks each state and calls the appropriate function
5. Write a `displayText()` function to display a text parameter in the center of the screen
6. Call the `displayText()` function in the `title()` function to display your simulation's title
7. Call the `displayText()` function in the `success()` function to display your simulation's success message ("You crossed the road!"?)
8. Call the `displayText()` function in the `title()` function to display your simulation's death message ("You died!"?)
9. Add a `keyPressed()` function that checks if the state is `title` and switches to `simulation` if it is

When we run the program we should see the title! We should then be able to press a key to switch to the simulation state, which will be blank.

---

## 2. Create a basic Pedestrian class and integrate it into the main script

We'll need to

1. Create a class file and link it in `index.html`
2. Add the class structure
3. Add a `constructor()`
4. Add a `handleInput()` method
5. Add a `move()` method
6. Add a `display()` method
7. Add a pedestrian to the main script

---


### Create a class file and link it in `index.html`

First we need a new file in our project to store the `Pedestrian` class in, so:

1. Create a new file in your `js/` folder called `Pedestrian.js`
2. Add a `<script>` tag to your `index.html` __before__ the main script to include your `Pedestrian.js` file

### Add the class structure

Now we want to get the basics of our `Pedestrian` class working. To begin with, we need the basic `class` structure for the `Pedestrian`.

`Pedestrian.js`
1. Add the standard `class` definition structure to the file to define a `Pedestrian`

### Add a `constructor()`

The constructor should set the default properties of a pedestrian when it is created. Our pedestrian will be moving around in the simulation, so it needs a position, velocity, speed, and size. Since we know the pedestrian can be killed in traffic, it will need a property for that too. The position should be passed as parameters.

`Pedestrian.js`
1. Define a `constructor()` method with two parameters, `x` and `y`
2. Create properties `x` and `y` and set them to the parameters `x` and `y`
3. Create property `size` and set it to something like `20`
4. Create properties `vx` and `vy` and set them to `0` (it's not moving)
5. Create property `speed` and set it to something like `5`
6. Create property `alive` and set it to `true`

### Add a `handleInput()` method

The pedestrian will move around using the arrow keys, so we need a method that checks which arrow key(s) are pressed and sets the pedestrian's velocity appropriately.

`Pedestrian.js`
1. Define a `handleInput()` method
2. Check the left and right arrow keys to set the x velocity appropriately based on the `speed` property. If neither is held down, set the x velocity to `0`. (Use `keyIsDown()` to check the key codes `LEFT_ARROW` and `RIGHT_ARROW`)
3. Check the up and down arrow keys to set the y velocity appropriately based on the `speed` property. If neither is held down, set the y velocity to `0`. (Use `keyIsDown()` to check the key codes `UP_ARROW` and `DOWN_ARROW`)

### Add a `move()` method

We want the pedestrian to move according to its velocity, so we should add its velocity to its position.

`Pedestrian.js`
1. Define a `move()` method
2. Add the two velocity properties to the two position properties

### Add a `display()` method

It would be sensible is we could, you know, **see** the pedestrian, so let's write a `display()` method to display it on the canvas.

`Pedestrian.js`
1. Define a `display()` method
2. Use `push()` and `pop()` around drawing instructions that display an ellipse at the pedestrian's position and use its size. Or draw something super fancy if you like!

### Add a pedestrian to the main script

Now we have a `Pedestrian` class that tells our program how a pedestrian works we need to create one in our main script. It's probably smart to switch the default state to `simulation` so we can see what's happening.

1. Change the `state` variable to start as `simulation`
2. Add a `pedestrian` variable to the top of the program (leave it undefined)
3. In `setup()` create a `new Pedestrian()`, positioning it at the bottom center of the canvas
4. In the `simulation()` function, call the `handleInput()`, `move()` and `display()` methods of the `pedestrian`

### Done

We should now be able to run our program and move our pedestrian around on the screen. So nice and safe! So relaxing! A world without traffic!

---

## 3. Create a Vehicle class

Now we want some **traffic**. We know that we want different kinds of vehicles driving around in our program, so it makes sense to define a `Vehicle` class to collect together all the shared properties and methods a vehicle will need. We can then `extend` that class to create specific kinds of vehicles that have different speeds and appearance.

A vehicle will be some kind of rectangle that can move horizontally at a set speed. It will wrap when it reaches the left or right edges of the canvas.

We will need to:

1. Create a `Vehicle` class file and link it in `index.html`
2. Add the class structure
3. Add a `constructor()`
4. Add a `move()` method
5. Add a `wrap()` method
6. Add an empty `display()` method

Yes, these are things we covered in the videos/lectures so it shouldn't be too complex to get this going again hopefully!

---

### Create a `Vehicle` class file and link it in `index.html`

First we need a new file in our project to store the `Vehicle` class in, so:

1. Create a new file in your `js/` folder called `Vehicle.js`
2. Add a `<script>` tag to your `index.html` __before__ the main script to include your `Vehicle.js` file

---

### Add the class structure

Now we want to get the basics of our `Vehicle` class working. To begin with, we need the basic `class` structure for the `Vehicle`.

`Vehicle.js`
1. Add the standard `class` definition structure to the file to define a `Vehicle`

### Add a `constructor()`

The constructor should set the default properties of a vehicle when it is created.

Our vehicle needs to move on the screen so it will need a position, velocity, and speed. It will technically also have dimensions when we create specific vehicles extending this class.

`Vehicle.js`
1. Define a `constructor()` method with two parameters, `x` and `y`
2. Create properties `x` and `y` and set them to the parameters `x` and `y`
3. Create properties `width` and `height` and set them to `undefined` (this superclass doesn't have specific dimensions)
4. Create properties `vx` and `vy` and set them to `0` (it's not moving)
5. Create property `speed` and set it to `undefined` (this superclass doesn't have an actual speed)

---

### Add a `move()` method

We want the vehicle to move according to its velocity, so we should add its velocity to its position.

`Vehicle.js`
1. Define a `move()` method
2. Add the two velocity properties to the two position properties

---

### Add a `wrap()` method

We want the vehicle to wrap around the right and left edges of the screen.

1. Define a `wrap()` method
2. If the vehicle moves off the right side of the canvas (`x > width`) move it to the left side
3. If the vehicle moves off the left side of the canvas (`x < 0`) move it to the right side

---

### Add an empty `display()` method

All vehicles should be able to be displayed, so we should have a `display()` method. But this one will just be a placeholder because this is an abstract idea of a vehicle.

1. Define an empty `display()` method

---

### Done

Now we have our generic `Vehicle` class. We'll extend this class to create different kinds of vehicles for our simulation.

---

## 4. Create Car, Truck, and Motorcycle classes that extend the Vehicle class

Now that we have our `Vehicle` class we can extend it. The process of extending the class is the same in each case, so let's look at making a `Car` class and then follow the same idea for the other two. We will:

1. Create a `Car` class file and link it in `index.html`
2. Add the class structure, making sure to extend the Vehicle class
3. Add a `constructor()`
4. Add `display()` method
5. Do the same thing for a `Truck` and `Motorcycle` class

---

### Create a `Car` class file and link it in `index.html`

You know how to do this by now. Make sure that you link to the `Car.js` file **after** the `Vehicle.js` file, since the `Car` class needs to know about the `Vehicle` class.

---

### Add the class structure, making sure to extend the Vehicle class

`Car.js`
1. Add the standard `class` definition structure to the file to define a `Car` but include `extends Vehicle` after the class name to make it inherit its properties and methods from the `Vehicle` class.

---

### Add a `constructor()`

Our `Car` needs to call the `super()` constructor to set itself up as a `Vehicle`, then we can set specific versions of the `Vehicle` properties to reflect the fact this is a car specifically.

1. Define a `constructor()` method with two parameters, `x` and `y`
2. Call the `super()` constructor, passing `x` and `y` as arguments
3. Set the `width` and `height` properties to something car-like, perhaps `50`x`20`?
4. Set the `speed` property to a car-like speed, perhaps `5`?

---

### Add `display()` method

A car should have a specific visual appearance. So we need to define the `display()` method

1. Define a `display()` method
2. Call the `super.display()` method, just in case (even though `Vehicle`'s `display()` method does nothing right now, it might later)
3. Use `push()` and `pop()` around drawing instructions that draw a car you like, making sure to use the position and dimensions of the car

---

### Do the same thing for a `Truck` and `Motorcycle` class

We should follow the same pattern to create classes representing a `Truck` and `Motorcycle`. Probably:

1. The `Truck` should have larger dimensions than a `Car` (maybe dimensions of `80`x`20`) and should be slower than a `Car` (maybe a `speed` of `3`?)
2. The `Motorcycle` should have a smaller dimensions than a `Car` (maybe dimensions of `30`x`10`) and should be faster than a `Car` (maybe a `speed` of `10`?)

You can also make the `Truck` and `Motorcycle` display differently, with different colors etc. as desired.

---

### Done

Phew! Now we have classes for `Vehicle`, `Car`, `Truck` and `Motorcycle`. We can use the final three in our main script to create our basic traffic simulation.

---

## 5. Add cars, trucks, and motorcycles to the main script

Now for a big step. We want to include some number of cars, trucks, and motorcycles in our simulation. The idea is to have some number of each moving either left to right or right to left. We can put them all together in a single array because they all extend the `Vehicle` class and we can treat them as vehicles!

We will:

1. Declare variables at the top
2. Create our three kinds of vehicles in `setup()`
3. Randomly set vehicle direction in `setup()`
4. Update all our vehicles in `simulation()`

---

### Declare variables at the top

We'll need an array to store all our vehicles in, as well as variables storing the desired number of each type. We'll do this at the top of our script.

1. Declare a `vehicles` variable and assign an empty array to it
2. Declare `numCars`, `numTrucks` and `numMotorcycles` variables and assign them numbers you like (maybe `10`, `10` and `5`?)

---

### Create our three kinds of vehicles in `setup()`

We need to create our different kinds of vehicles in `setup()` and add them to our `vehicles` array. There are sneaky ways of doing this more efficiently, but in this case, let's just have a `for`-loop for each kind of vehicle we need to create. So for the cars we would:

1. Write a `for`-loop that counts from `0` to `numCars`. Inside:
  1. Declare `x` and `y` variables and assign random positions (for the `y` variable, choose a random position that does not include the bottom of the canvas, to the pedestrian has somewhere to stand!)
  2. Declare a `car` variable and assign a new `Car` using the `x` and `y` as arguments
  3. Push the new `car` variable into the `vehicles` array

That will take care of the cars. Now **do the same thing for the trucks and motorcycles**.

---

### Randomly set vehicle direction in `setup()`

We want our various vehicles to be moving either right or left for some visual chaos! There are different ways to achieve this, but we'll do it in another `for`-loop at the end of `setup()`.

1. Write a `for`-loop that goes through the `vehicles` array from `0` to `vehicles.length` in a variable `i`. Inside:
  1. Store the current vehicle in the array (at index `i`) in a variable called `vehicle`
  2. Declare a variable `r` and assign it a random number between `0` and `1`
  3. Write an `if`-statement that checks if `r` is less than `0.5` (50% of the time it will be)
    1. If it is `true`, then assign `-vehicle.speed` to `vehicle.vx` (so it moves to the left)
    2. If it is `false` then assign `vehicle.speed` to `vehicle.vx` (so it moves to the right)

Now our vehicles are all set up to either move to the left or the right when the program starts. Note the magic of inheritance and polymorphism that allows us to do this to all the vehicles, regardless of whether they are cars, trucks, or motorcycles!

---

### Update all our vehicles in `simulation()`

Finally, for our simulation to actually show our vehicles moving around, we need to add a `for`-loop that runs through all the vehicles and calls their `move()`, `wrap()` and `display()` methods.

1. In `simulation()` write a `for`-loop that counts from `0` to `vehicles.length` with a variable `i`. Inside:
  1. Store the current vehicle in the array (at index `i`) in a variable called `vehicle`
  2. Call the `move()` method of the `vehicle`
  3. Call the `wrap()` method of the `vehicle`
  4. Call the `display()` method of the `vehicle`

---

### Done

Now if we run out program we should see all our traffic! And we should also be able to make our pedestrian walk fearlessly around in it, because they cannot be hit! There is no code for that! Imagine if there was no code for being hit by a car in reality. That would be much nicer.

---

## 6. Add success and failure conditions

Sadly, we should probably update our simulation one last time to make being hit by vehicles possible. We should also update it to handle the two possible endings - being hit by a car or reaching the other side of the road (the top of the canvas). We will need to:

1. Add a method to `Pedestrian` to check if it was hit by a vehicle
2. Check if the pedestrian is dead in the main script
3. Check if the pedestrian crossed the road in the main script

---

### Add a method to `Pedestrian` to check if it was hit by a vehicle

A central part of our simulation is knowing whether or not the pedestrian is hit by a vehicle in any frame. We will add a method to the `Pedestrian` class to handle this. To simplify, we will think of the pedestrian only in terms of its position, not its dimensions. This will make it easier to check for collisions. If the pedestrian gets hit, it should become... not alive.

1. Define a `checkHit()` method in the `Pedestrian` class. It should have one parameter, `vehicle`, which is the vehicle to check for hitting the pedestrian
2. In the method, check whether the position of the pedestrian is inside the vehicle's dimensions. (To do this we need to check if the `x` position of the pedestrian is between the left and right edges of the vehicle, and whether the `y` position of the pedestrian if between the top and bottom edges of the vehicle.)
3. If it is, set the `alive` property to `false`

For simplicity, if you're struggling to think about it, this particular code would look like this:

`Pedestrian.js`
```javascript
checkHit(vehicle) {
  if (this.x > vehicle.x - vehicle.width / 2 &&
    this.x < vehicle.x + vehicle.width / 2 &&
    this.y > vehicle.y - vehicle.height / 2 &&
    this.y < vehicle.y + vehicle.height / 2) {
    this.alive = false;
  }
}
```

---

### Check if the pedestrian is dead in the main script

At the bottom of the `simulation()` function we will want to check if the pedestrian is dead. If it is we should switch to the `dead` state.

1. In `simulation()` write an `if`-statement that checks if the `pedestrian`'s `alive` property is `false`
2. If it is, switch to the `dead` state

---

### Check if the pedestrian crossed the road in the main script

Also at the bottom of the `simulation()` function we will want to check if the pedestrian made it across the road. If so, we should switch to the `success` state.

1. In `simulation()` write an `if`-statement that checks if the pedestrian's `y` is above the top of the canvas (less than `0`).
2. If it is, switch to the `success` state

---

### Done

Wow! Now we have a very depressing commentary of trying to cross the road! Love it!

---

## "Finished"!

Now our program does what we said it would do! Not bad, not bad.

We could do so many things:
- Tweak the relative speeds and relative of our objects to change the experience of play
- Implement movement with angle/speed instead of our current movement style (it would be pretty interesting to do this with the vehicles too!)
- Fix the "easter egg" of being able to walk the pedestrian off the canvas to the left or right and then up to the top our of harm's way!
- Create more interesting kinds of vehicles
- Arrange the vehicles onto actual roads we could display to make things a bit more structures
- Add horns to the vehicles so they toot at the pedestrian if they get too close
- Give the pedestrian a set number of lives
- Have vehicles crash into each other and explode!
- And so on!

---

## Commit! Push!

Remember to commit and push your code at the end (at least!) in order to save it.

---

## }
