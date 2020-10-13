# Constructors with parameters (OOP) {

---

## In this module...

- `Fish.js`
- Build a better `Fish`
- Parameters save the day

---

## `Fish.js`

By way of a reminder, here is our `class` describing what a `Fish` is. It's pretty great, creating a `Fish` that can move around randomly on the canvas, bumping into the edges.

```javascript
class Fish {

  constructor() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = 100;
    this.fill = {
      r: random(0,255),
      g: random(0,255),
      b: random(0,255)
    };
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.nervousness = 0.05;
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

---

## Build a better `Fish`

Our `Fish` is kind of limited, though, in that we can't really __control__ much about it. If we wanted a fish to be a __specific color__, say, or if we wanted it to __start in a specific position__, we couldn't actually do that.

That's because the `constructor` __always does the same thing__. It always sets the position randomly, it always sets the `speed` to `5`, it always sets the `fill` to a random set of RGB values.

We might like to be able to __specify__ what color a fish is, where it starts, how fast it is, and how nervous it is __when we create it__, right?

Well, we've run into this problem before with __functions__ and we solved it then with...

... __parameters__!

---

## Parameters save the day

In exactly the same way we can use parameters with functions to make them more powerful and flexible, we can use parameters in an `class`'s `constructor` to __configure__ an object when we create it. So if we wanted to specify position, color, speed and nervousness, we could change our `constructor` accordingly:

`Fish.js`
```javascript
constructor(x,y,color,speed,nervousness) {
  this.x = x;
  this.y = y;
  this.size = 100;
  this.fill = color;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.nervousness = nervousness;
}
```

As we can see, we've added the list of parameters inside the parentheses of the `constructor`'s definition. Then we've __used__ those parameters to set the values in the `Fish`'s __properties__. So we use the `x` parameter to set the `x` property (`this.x`) and the `color` parameter to set the `fill` property (`this.fill`), and so on.

We then use this change by specifying __arguments__ when we create our two `Fish` in the main script in `setup()`:

`script.js`
```javascript
function setup() {
  createCanvas(500,500);

  // Create a "goldfish" that is kind of orange, fast, and very nervous
  fish = new Fish(100, 250, {
    r: 220,
    g: 200,
    b: 0
  }, 10, 0.1);

  // Create a chilled out greenish fish
  fish2 = new Fish(100, 250, {
    r: 0,
    g: 200,
    b: 100
  }, 1, 0.01);
}
```

With these arguments we still get two `Fish` objects, but because we've been able to specify very different __properties__ for those `Fish` they __behave very differently__. This is a huge part of the power of using a `class`. It allows us to create a __kind__ of object, but there can be huge variation in how that object behaves based on how we set it up!

__Note__: here we see the new idea of writing a JavaScript object literal directly as an __argument__ here for the color.

---

## Summary

- Adding parameters to our `constructor` and then using them makes a `class` __much more flexible__
- It really allows us to see how the class defines a __kind__ of object, which can vary significantly in its behaviour and other aspects

---

## TMI?

### Using objects for constructor parameters

Whenever we use parameters, and perhaps especially when we use parameters for a `constructor`, we can end up with what feels like __too many__. For instance, we we turn every property of a `Fish` into a parameter, the `constructor` would look like this:

```javascript
constructor(x, y, size, color, vx, vy, speed, nervousness) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.fill = color;
  this.vx = vx;
  this.vy = vy;
  this.speed = speed;
  this.nervousness = nervousness;
}
```

Which isn't too bad, but now when we create a new `Fish` it will look like

```javascript
fish = new Fish(width / 2, height / 2, 150, {
  r: 255,
  g: 255,
  b: 0
}, 0, 0, 5, 0.05);
```

And that is getting __quite hard to read__. Which parameter is which? You just have to remember the right order.

This is where using a JavaScript object literal to set up the properties will be better:

`Fish.js`
```javascript
constructor(properties) {
  this.x = properties.x;
  this.y = properties.y;
  this.size = properties.size;
  this.fill = properties.color;
  this.vx = properties.vx;
  this.vy = properties.vy;
  this.speed = properties.speed;
  this.nervousness = properties.nervousness;
}
```

`script.js`
```javascript
fish = new Fish({
  x: width / 2,
  y: height / 2,
  size: 150,
  color: {
    r: 255,
    g: 255,
    b: 0
  },
  vx: 0,
  vy: 0,
  speed: 5,
  nervousness: 0.05
});
```

This is __much better__ in `script.js` because we can __easily read the arguments we are using__. This makes creating a new `Fish` much clearer.

### Add in destructuring

We can make this whole thing just a little bit better.

Right now when we look at the `constructor()` we see only one paramter, called `properties`. This means if we want to know the property names we should use when creating a `Fish` in our script, we'd have to read through the various instructions inside the `constructor`.

Instead of this, we can use __object destructuring__ to get an even tidier result:

`Fish.js`
```javascript
constructor({x, y, size, color, vx, vy, speed, nervousness}) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.fill = color;
  this.vx = vx;
  this.vy = vy;
  this.speed = speed;
  this.nervousness = nervousness;
}
```

Now both the `script.js` side, where we __create__ a `Fish`, and the `Fish.js` where we __define__ a `Fish` are extremely readable in terms of the properties we can set when we create `Fish` objects.

---

# }
