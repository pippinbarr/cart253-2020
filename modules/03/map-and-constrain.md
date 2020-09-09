# Map and constrain {

---

## Ranges

A lot of the time in programming we're dealing with __numbers__, often stored in our __variables__ and use with various __functions__ to make something interesting happen (like drawing an ellipse or setting a fill color).

Most of the time these numbers can be thought of in terms of a sensible __range__ of values that make sense.

A fill color number is in the range between `0` and `255`, for example. `fill(0)` is black, and `fill(255)` is white. Any number outside this range won't make sense. `fill(312737219)` will just end up being white, since `255` is the highest it can be.

Likewise, we know that the visible pixels on our canvas are between `0` and `width` horizontally, and between `0` and `height` vertically. We can draw things at other pixel locations, but they won't be visible. (Well, unless part of them overlaps the canvas.)

We can also __invent__ ranges of our own. We might decide that an ellipse that can change size will have a minimum size of `10` pixels and a maximum size of `400` pixels because that's just the way we want it.

_This same idea of ranges will apply to lots of the numbers we use in our programs, so it's worth thinking about._

---

## Mapping

It is often useful when programming to be able to __convert__ between different ranges.

Consider the built-in variable `mouseX`. We can sensibly think of it as being in the range `0` to `width` (that is, the width of the canvas).

What is we wanted to use the mouse position to set the `fill()` color of an ellipse? We could just use `mouseX` directly in `fill()`!

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
  fill(mouseX);
  ellipse(circle.x, circle.y, circle.size);
}
```

This works! Notice how the circle changes its shade as we move the mouse horizontally. It's black (`0`) when we move the mouse all the way to the left, and it gets bright as we move the mouse to the right.

__But__ it becomes white once the mouse moves past position `255` on the canvas, because then `mouseX` is `255` and that's the highest number `fill()` understands.

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
  let fillShade = map(mouseX,0,width,0,255);
  fill(fillShade);
  ellipse(circle.x, circle.y, circle.size);
}
```

The key line here is:

```javascript
let fillShade = map(mouseX,0,width,0,255);
```

This is where we use `map()` to convert the value in `mouseX` (a number in the range `0`-`width`) to a color number (a number in the range `0`-`255`).

You can see that we provide `map()` with __five arguments__ so it can do its job:
1. The __value to convert__ (in this case it's the number in `mouseX` so we write `mouseX`, we almost always use a variable here)
2. The __start__ of the range the value is __from__ (in this case that's `0`, the far left of the screen)
3. The __end__ of the range the value is __from__ (in this case that's `width`, the far right of the screen)
4. The __start__ of the range you want to convert __to__ (in this case that's `0`, representing black for `fill()`)
5. The __end__ of the range the value is __from__ (in this case that's `255`, representing white for `fill()`)

With that information, `map()` __returns__ the converted version of `mouseX`, which we then store in our `fillShade` variable, and then use it to set the `fill()` color on the next line.

It's quite a lot to take in, but it's so very worth playing around with!



---

## Summary

- ...

---

# }
