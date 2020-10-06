# Interacting objects {

---

## In this module...

- Our aquarium
- Adding a shark

---

## Our aquarium

Just to start on the same page, here is a `Fish.js` and `script.js` for the purposes of this lesson. Two fish that move randomly around on the canvas:

`Fish.js`
```javascript
class Fish {

  constructor(x, y, size, color, speed, nervousness) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fill = color;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.nervousness = nervousness;
  }

  move() {
    if (random() < this.nervousness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

`script.js`
```javascript
"use strict";

let fish;
let fish2;

function setup() {
  createCanvas(500, 500);

  fish = new Fish(100, 250, 100, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1);

  fish2 = new Fish(100, 250, 50, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01);

}

function draw() {
  background(0);

  fish.move();
  fish2.move();

  fish.display();
  fish2.display();
}
```

---

## Adding a shark

What is we wanted to add a shark to this little aquarium simulation? A little sadistic, perhaps, but we could have a user-controlled shark (using the mouse) that could __eat__ the fish when they overlap.

---

## Summary

- ...

---

# }
