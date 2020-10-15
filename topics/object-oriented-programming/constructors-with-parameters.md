# Constructors with parameters (OOP) {

---

## In this module...

- `Flower.js`
- Build a better `Flower`
- Parameters save the day

---

## `Flower.js`

By way of a reminder, here is our `class` describing what a `Flower` is. It's pretty great, creating a `Flower` with multiple properties we can display on the canvas.

```javascript
class Flower {

  // The constructor() sets up a flower's properties
  constructor() {
    // Position and size information
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 50;
    this.stemLength = 75;
    this.stemThickness = 10;
    this.petalThickness = 10;
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = {
      r: 200,
      g: 50,
      b: 50
    };
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
  }

  // display()
  // Displays the flower on the canvas
  display() {
    push();
    // Set the stroke weight for the petals and the stem
    strokeWeight(this.stemThickness);
    // Draw a line for the stem
    stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Draw a circle with a heavy outline for the flower
    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
```

---

## Build a better `Flower`

Our `Flower` is kind of limited, though, in that we can't really __control__ much about it. If we wanted a flower to be a __specific color__, say, or if we wanted it to __start in a specific position__, we couldn't actually do that.

That's because the `constructor` __always does the same thing__. It always sets the position randomly, it always sets the `size` to `50`, it always sets the `stemColor` to a specific set of RGB values, etc.

We might like to be able to __specify__ a bunch of the properties of a flower __when we create it__, right? Let's say the position, size, stem length, and petal color for now.

Well, we've run into this problem before with __functions__ and we solved it then with...

... __parameters__!

---

## Parameters save the day

In exactly the same way we can use parameters with functions to make them more powerful and flexible, we can use parameters in a `class`'s `constructor` to __configure__ an object when we create it. So if we wanted to specify position, size, stem length, and petal color, we could change our `constructor` accordingly:

`Flower.js`
```javascript
// The constructor() sets up a flower's properties
constructor(x,y,size,stemLength,petalColor) {
  // Position and size information
  this.x = x;
  this.y = y;
  this.size = size;
  this.stemLength = stemLength;
  this.stemThickness = 10;
  this.petalThickness = 10;
  // Color information
  this.stemColor = {
    r: 50,
    g: 150,
    b: 50
  };
  this.petalColor = petalColor;
  this.centreColor = {
    r: 50,
    g: 0,
    b: 0
  };
}
```

As we can see, we've added the list of parameters inside the parentheses of the `constructor`'s definition. Then we've __used__ those parameters to set the values in the `Flower`'s __properties__. So we use the `x` parameter to set the `x` property (`this.x`) and the `size` parameter to set the `size` property (`this.size`), and so on.

We then __use__ this new version of the `constructor()` by specifying __arguments__ when we create our flowers in the main script in `setup()`:

`script.js`
```javascript
// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
}
```

With these arguments we still get a bunch of flowers, but because we've been able to specify different __properties__ for those flowers they __look different__ when we display them. This is a huge part of the power of using a `class`. It allows us to create a __kind__ of object, but there can be huge variation in how that object works in our program. This is especially true if the object has some kind of behaviour like movement that we could modify through its properties.

---

## Summary

- Adding parameters to our `constructor` and then using them makes a `class` __much more flexible__
- It really allows us to see how the class defines a __kind__ of object, which can vary significantly in its appearance, behaviour and other aspects

---

## TMI?

### Using objects for constructor parameters

Whenever we use parameters, and perhaps especially when we use parameters for a `constructor`, we can end up with what feels like __too many__. For instance, we we turn every property of a `Flower` into a parameter, the `constructor` would look like this:

```javascript
// The constructor() sets up a flower's properties
constructor(x, y, size, stemLength, stemThickness, petalThickness, stemColor, petalColor, centreColor) {
  // Position and size information
  this.x = x;
  this.y = y;
  this.size = size;
  this.stemLength = stemLength;
  this.stemThickness = stemThickness;
  this.petalThickness = ptealThickness;
  // Color information
  this.stemColor = stemColor;
  this.petalColor = petalColor;
  this.centreColor = centreColor;
}
```

That list of parameters is getting kind of long, and now if we create a new `Flower` by specifying the arguments in the function call (as opposed to creating temporary variables as above)...

```javascript
flower = new Flower(
      random(0, width),
      random(0, height),
      random(50, 80),
      random(50, 80),
      random(8, 12),
      random(8, 12), {
        r: random(0, 100),
        g: random(100, 255),
        b: random(0, 100)
      }, {
        r: random(100, 255),
        g: random(100, 255),
        b: random(100, 255)
      }, {
        r: random(0, 50),
        g: random(0, 50),
        b: random(0, 50)
      });
```

And that is getting __quite hard to read__. Which parameter is which? You just have to remember the right order. Not ideal. Even if we'd used temporary variables it would be hard to remember the __order__ of the parameters.

This is where using a JavaScript object literal to set up the properties will be better:

`Flower.js`
```javascript
// The constructor() sets up a flower's properties
constructor(config) {
  // Position and size information
  this.x = config.x;
  this.y = config.y;
  this.size = config.size;
  this.stemLength = config.stemLength;
  this.stemThickness = config.stemThickness;
  this.petalThickness = config.petalThickness;
  // Color information
  this.stemColor = config.stemColor;
  this.petalColor = config.petalColor;
  this.centreColor = config.centreColor;
}
```

`script.js`
```javascript
let config = {
  x: random(0, width),
  y: random(0, height),
  size: random(50, 80),
  stemLength: random(50, 80),
  stemThickness: random(8, 12),
  petalThickness: random(8, 12),
  stemColor: {
    r: random(0, 100),
    g: random(100, 255),
    b: random(0, 100)
  },
  petalColor: {
    r: random(100, 255),
    g: random(100, 255),
    b: random(100, 255)
  },
  centreColor: {
    r: random(0, 50),
    g: random(0, 50),
    b: random(0, 50)
  }
};
let flower = new Flower(config);
```

This is __much better__ in `script.js` because we can __easily read the arguments we are using__. This makes creating a new `Flower` much clearer. (We can even specify the properties of our config object in __any order we want__ without causing a problem.)

### Add in destructuring

We can make this whole thing just a little bit better.

Right now when we look at the `constructor()` we see only one paramter, called `properties`. This means if we want to know the property names we should use when creating a `Flower` in our script, we'd have to read through the various instructions inside the `constructor`.

Instead of this, we can use __object destructuring__ to get an even tidier result:

`Flower.js`
```javascript
// The constructor() sets up a flower's properties
// The constructor() sets up a flower's properties
constructor({
  x,
  y,
  size,
  stemLength,
  stemThickness,
  petalThickness,
  stemColor,
  petalColor,
  centreColor
}) {
  // Position and size information
  this.x = x;
  this.y = y;
  this.size = size;
  this.stemLength = stemLength;
  this.stemThickness = stemThickness;
  this.petalThickness = petalThickness;
  // Color information
  this.stemColor = stemColor;
  this.petalColor = petalColor;
  this.centreColor = centreColor;
}
```

Now both the `script.js` side, where we __create__ a `Flower`, and the `Flower.js` where we __define__ a `Flower` are extremely readable in terms of the properties we can set when we create `Flower` objects.

---

# }
