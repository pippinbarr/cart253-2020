# Drawing colors {

---

## Color my world!

The points, lines, and shapes we've drawn have had a black outline and a white fill on a white background. Those are the __default__ settings for how p5 will color things in for us.

But we can specify what __color__ p5 will use for these with yet more functions. In the reference, these functions are listed under the [Color](https://p5js.org/reference/#group-Color) section, unsurprisingly.

The main functions we need to read about and use are:

- `background();` fills the background
- `fill();` sets the fill color
- `stroke();` sets the line color (includes the lines around the edges of shapes)

Like the shape modes, the coloring instructions `fill` and `stroke` apply to all drawing instructions __after__ them.

---

## RGB

You're quite probably already familiar with the idea of specifying colors in terms of __red__, __green__ and __blue__. Most image software uses this, for example. It's known as the __RGB color model__. Essentially, we get a color by adding up how much red, green, and blue it has together.

In p5, we use the RGB color model by default, so we specify colors in those three parts, and we specify them using numbers between `0` and `255`.

`0` means __none__ of the color and `255` means __all__ of the color. So:

- `(0,0,0)` is __black__ because it has __none__ of any color
- `(255,0,0)` is pure __red__ because it has __all__ the red, and __none__ of anything else
- `(255,255,0)` is __yellow__ because it has red and green added together, and no blue
- `(255,255,255)` is __white__ because it has all the colors added together
- `(127,127,127)` is a mid-range __grey__ because it has equal amounts (but not all) of the colors added together
- `(255,127,127)` is a __lovely pink__ because it has all the red, and then equal amounts of the other two to brighten it up

---

## Using RGB

We can __use__ our ability to specify colors in the RGB format with the `background()`, `fill()` and `stroke()` functions to make (pretty?) pictures.

```javascript
function setup() {
  createCanvas(500, 500);
  background(255, 127, 127);
  rectMode(CENTER);
  stroke(0, 0, 255);
  fill(127, 255, 127);
  rect(250, 250, 400, 400);
  fill(255, 255, 127);
  rect(250, 250, 300, 300);
  fill(127, 127, 255);
  rect(250, 250, 200, 200);
  fill(127, 255, 255);
  rect(250, 250, 100, 100);
}

function draw() {

}
```

Notice the background is __pink__ and then each rectangle is filled with a different color specified by the `fill()` instruction __just before__ the `rect()` instruction. But notice how __all__ the rectangles are outlined in __green__ because of the `stroke()` instruction at the start which applies to all of them.

---

## Subtle

You can specify very, very similar colors given that you can use numbers from `0` to `255`. For instance, let's draw two rectangles side by side that are almost exactly the same color...

```javascript
function setup() {
  createCanvas(500, 500);
  background(255, 127, 127);
  fill(255,0,0);
  rect(0,0,250,500);
  fill(254,0,0);
  rect(250,0,250,500);
}

function draw() {

}
```

It's quite difficult to see the different in those shades as they're only `1` apart. But if you change the difference to, say, `20`...

```javascript
function setup() {
  createCanvas(500, 500);
  background(255, 127, 127);
  fill(255,0,0);
  rect(0,0,250,500);
  fill(235,0,0);
  rect(250,0,250,500);
}

function draw() {

}
```

Now you can see that the second rectangle is clearly __darker__ that the first, because it has __less__ red (and none of the other two colors).

---

## p5 noir

You may have noticed that you can draw in shades of grey just by making the red, green, and blue numbers equal to each other, e.g.

```javascript
function setup() {
  createCanvas(500, 500);
  background(255, 255, 255);
  rectMode(CENTER);
  fill(200,200,200);
  rect(250, 250, 400, 400);
  fill(175,175,175);
  rect(250, 250, 300, 300);
  fill(150,150,150);
  rect(250, 250, 200, 200);
  fill(125,125,125);
  rect(250, 250, 100, 100);
}

function draw() {

}
```

But there's a shorthand available in p5, which is that if you __only specify one number__ when using `background()`, `fill()`, or `stroke()`, it will assume you want to use that value for all three color values. So the above could be "simplified" to:

```javascript
function setup() {
  createCanvas(500, 500);
  background(255);
  rectMode(CENTER);
  fill(200);
  rect(250, 250, 400, 400);
  fill(175);
  rect(250, 250, 300, 300);
  fill(150);
  rect(250, 250, 200, 200);
  fill(125);
  rect(250, 250, 100, 100);
}

function draw() {

}
```

It's debatable that it's all that much simpler, but it may come in handy!

---

## Finding colors

You probably already have a way of finding out the RGB values of a color

- Maybe you use an application like Photoshop, which may also give you an 'eyedropper' to pick colors from your screen
- You can also just [Google 'rgb color picker'](https://www.google.com/search?q=rgb+color+picker) and it will bring one up

These are both straightforward ways to figure out the specific values for a color you actually like.

---

## No color

You might want to make things transparent sometimes, that is give them _no color at all_, and you can do this with the following functions:

- `noFill();` sets a transparent fill
- `noStroke();` sets a transparent stroke

As with `stroke()` and `fill()`, these instructions apply to all drawing done _after_ them

---

## See-through colors

On computers colors often have an _alpha_ value which refers to how transparent the color should be. In p5 we can set this by adding yet another number to our RGB colors, bringing the total to __four__. For the __alpha value__ `0` means completely transparent, `255` means completely opaque.

- `fill(255,0,0,127);` will give us a semi-transparent red fill
- `stroke(0,0,0,0);` will give us an invisible black stroke! What a concept!

When we include the alpha value, we can call it the RGBA color model.

---

## Draw something! Colorful!

Now when we're drawing we can use colors and transparency!

```javascript
function setup() {
  createCanvas(500, 500);
  background(127, 255, 127);
  rectMode(CENTER);
  noStroke();
  fill(200);
  rect(250, 250, 300, 300);
  ellipse(200, 200, 50, 50);
  ellipse(300, 200, 50, 50);
  rect(250, 200, 25, 200);
  arc(250, 300, 200, 100, 0, PI / 2);
}

function draw() {

}
```

What a nice looking robot!

---

## Summary

- We can specify colors in RGB for our backgrounds and shapes using the "big three" of `background()`, `fill()`, and `stroke()`
- When we use `fill()` and `stroke()` they apply to __every shape__ after them (until we change the setting)
- We can choose to display `noFill()` or `noStroke()`
- We can use an __alpha value__ by adding one extra number to our RGB colors

---

## TMI?

### Hexadecimal colors

You might notice that in many color pickers you see color values displayed as a set of numbers __and letters__ after a hash sign, like `#12FF08`. This is called the __hexadecimal__ representation of the color. It's still RGB, just in a slightly different representation. If you prefer to, you can use it in your code too if you want, as follows:

```javascript
background("#00FF00"); // Green
```

Note how the hexadecimal code is __inside double quotes__, that's important.

__Inside baseball:__ In hexadecimal you count from 0 to f, which is weird. That is, you count 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, e, d, f. So `f` is the highest "number" and 0 is still the lowest.

A standard color representation in hexadecimal has 6 "numbers". The first two are the red, the second two are the green, the third two are the blue. `00` is __none__ of a color, and `ff` is __all__ of a color. And everything in between.

- `#ffffff` is __white__
- `#000000` is __black__
- `#ff0000` is __red__
- `#abcdef` is __a surprisingly nice blue__

Note that in CSS it's fairly standard to specify colors using this hexadecimal notation.

---

# }
