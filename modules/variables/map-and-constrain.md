# Map and constrain {

---

## Ranges

A lot of the time in programming we're dealing with __numbers__, often stored in our __variables__ and used with various __functions__ to make something interesting happen (like drawing an ellipse or setting a fill color).

Most of the time these numbers can be thought of in terms of a sensible __range__ of values they should be in.

A fill color number is in the range between `0` and `255`, for example. `fill(0)` is black, and `fill(255)` is white. Any number outside this range won't make sense. `fill(312737219)` will just end up being white, since `255` is the highest it can be.

Likewise, we know that the visible pixels on our canvas are between `0` and `width` horizontally, and between `0` and `height` vertically. We can draw things at other pixel locations, but they won't be visible. (Well, unless part of them overlaps the canvas.)

We can also __invent__ ranges of our own. We might decide that an ellipse that can change size will have a minimum size of `10` pixels and a maximum size of `400` pixels because that's just the way we want it.

_This same idea of ranges will apply to lots of the numbers we use in our programs, so it's worth thinking about._

---

## Using numbers from other ranges...

It is often fun when programming to use a number that works in some other range...

Consider the built-in variable `mouseX`. We can sensibly think of it as being in the range `0` to `width` (that is, the width of the canvas).

What if we wanted to use the mouse position to set the `fill()` color of an ellipse? We could just use `mouseX` directly in `fill()`!

```javascript
let backgroundShade = 0;
let circle = {
  x: 250,
  y: 250,
  size: 100,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  fill(mouseX); // Set the fill to be the same number as the mouse's x position
  ellipse(circle.x, circle.y, circle.size);
}
```

This works! Notice how the circle changes its shade as we move the mouse horizontally. It's black (`0`) when we move the mouse all the way to the left, and it gets brighter as we move the mouse to the right.

__But__ it becomes white once the mouse moves past position `255` on the canvas, because then `mouseX` is `255` and that's the highest number `fill()` understands.

---

## Mapping between ranges!

If we wanted to control the color with the full width of the canvas, we'd need to __convert__ between the range `0` to `width` (the values `mouseX` can be) and the range `0` to `255` (the values a color can be).

We could do this on our own with... mathematics. Sigh.

__But__ we don't have to! There is a function called `map()` which does exactly this.

```javascript
let backgroundShade = 0;
let circle = {
  x: 250,
  y: 250,
  size: 100,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  circle.fill = map(mouseX,0,width,0,255); // Calculate the fill shade based on the mouse's x position
  fill(circle.fill); // Apply the fill
  ellipse(circle.x, circle.y, circle.size);
}
```

---

## Breaking it down

The key line of code that achieves our mapping here is:

```javascript
let fillShade = map(mouseX,0,width,0,255);
```

This is where we use `map()` to convert the pixel coordinate in `mouseX` (a number in the range `0`-`width`) to a color number (a number in the range `0`-`255`).

You can see that we provide `map()` with __five arguments__ so it can do its job:
1. The __value to convert__ (in this case it's the number in `mouseX` so we write `mouseX`, we almost always use a variable here)
2. The __start__ of the range the value is __from__ (for `mouseX` that's `0`, the far left of the screen)
3. The __end__ of the range the value is __from__ (for `mouseX` that's `width`, the far right of the screen)
4. The __start__ of the range you want to convert __to__ (in this case that's `0`, representing black for `fill()`)
5. The __end__ of the range the value is __from__ (in this case that's `255`, representing white for `fill()`)

With that information, `map()` __returns__ the converted version of `mouseX`, which we then store in our `fillShade` variable, and then use it to set the `fill()` color on the next line.

It's quite a lot to take in, but it's so very worth playing around with!

---

## Mappings galore

We can use this mapping trick to play around with all kinds of possible effects, the sky is the limit!

We could map the circle's __size__ to the mouse's __y coordinate__...

```javascript
let backgroundShade = 0;
let circle = {
  x: 250,
  y: 250,
  size: 100,
  fill: 0
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  circle.size = map(mouseY,height,0,100,400); // Set the circle size based on the mouse's y position
  ellipse(circle.x, circle.y, circle.size);
}
```

There are __two extra tricks__ going on with this one

1. Notice how we told `map()` that the __from__ range for `mouseY` is `height`-`0` - that's the reverse of how we normally think of it, but it helps because it means that as the mouse goes __up__ (toward `0` on the y axis, remember), the circle size gets __bigger__ (toward `400` in the __to__ range)
2. Notice how our __to__ range for the circle's size doesn't start at `0` - it doesn't have to! This gives us much better control of the effect of our mapping, because we can use any range at all!

---

## One more time

Let's make the circle move across the screen and map its fill color to its x coordinate so it kind of fades in as it moves...

```javascript
let backgroundShade = 0;
let circle = {
  x: 0, //  0 so it starts on the left
  y: 250,
  size: 100,
  fill: 0,
  speed: 1
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  circle.fill = map(circle.x, 0, width, 0, 255); // Calculate the fill based on the x position
  fill(circle.fill); // Apply the fill
  ellipse(circle.x, circle.y, circle.size);
  circle.x = circle.x + circle.speed; // Move the circle
}
```

Lovely!

There's no end to the fun stuff we can do with `map()` so it's always worth seeing what happens when you map numbers in your program to different ranges, __especially__ when you're dealing with a variable that __changes__ (like `circle.x` or `mouseX` above).

---

## Constrain

One last thing before we finish up.

Something we often want to do with numbers in our program is to prevent them from getting out of range.

Consider our moving circle. Right now, it moves across the screen, and then just keeps going. What if we wanted to guarantee it will stay on the screen? We need to __constrain__ its position so that it can't go outside the range of the canvas's width.

Luckily there's a function called `constrain()` that does this:

```javascript
let backgroundShade = 0;
let circle = {
  x: 0, // Back to 0 to it starts on the left
  y: 250,
  size: 100,
  fill: 255,
  speed: 5
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);
  ellipse(circle.x, circle.y, circle.size);
  circle.x = circle.x + circle.speed; // Move the circle
  circle.x = constrain(circle.x, 0, width); // Constrain the circle's x position within 0-width
}
```

Now the circle moves across the screen as before, but once its position reaches the `width` of the canvas, it stops!

As you can see, `constrain()` is similar to `map()` in that it calculates a value for you based on three arguments:

1. The value you want to constrain, usually a variable (`circle.x` above)
2. The start of the range to constrain it to (`0` above)
3. The end of the range to constrain it to (`width` above)

This tells constrain to take whatever value is in `circle.x` and give it back changed to be within the range `0` to `width`, we then store that back inside `circle.x` in the program above.

So, if `circle.x` were `-10`, `constrain()` would return `0` to make it fit within the range. If `circle.x` were `1000` (which is larger than the canvas width of `500`), `constrain()` would return `500` to make it fit within the range.

And that's what constrain does! It's a simple bit of bookkeeping, but it can be useful to take control in this way in all kinds of situations later on.

---

## Summary

- It's fun to use variables in different places in our code (like the mouse position used as a color or a circle's position as its size)
- But to do so it's best if we __map__ between the two ranges involved (like from the mouse position, which is within the canvas, to a color, which is between `0` and `255`)
- The `map()` function does that!
- And its friend, the `constrain()` function is good for just making sure a variable is within a specific range

---

# }
