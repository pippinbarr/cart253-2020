# Debugging object-oriented programming {

---

## In this module

- Syntax errors
- Behavioral errors

---

## Syntax errors

### Typo in `class`

```javascript
clas FireFly {

}
```

`Uncaught SyntaxError: Unexpected identifier    FireFly.js:1`

A familiar error telling us JavaScript has seen something unexpected. Again, this is so often a typo of some kind. The line number is correct, so we need to eyeball the line to spot the issue.

Note how in Atom, which uses "syntax highlighting" to change the colors of the various key words in your program, `clas` is the __wrong color__ for a keyword, turning white instead of purple (in my coloring at least).

Same thing for miswriting `extends` if using inheritance

```javascript
class FireFly extens Bug {

}
```

`Uncaught SyntaxError: Unexpected identifier    FireFly.js:1`

---

### Missing `{` in class definition

```javascript
class FireFly
  constructor(x, y) {

  }
}
```

`Uncaught SyntaxError: Unexpected identifier   FireFly.js:2`

Correct line number, which is good. Here the `constructor` is unexpected because there is no `{` signifying the beginning of the `class` code block. Fairly easy to spot.

---

### Missing `}` in class definition

```
class FireFly {
  constructor(x, y) {

  }
```

`Uncaught SyntaxError: Unexpected end of input   FireFly.js:4`

Our old friend "Unexpected end of input". Pretty much always means a missing closing curly bracket, and it means that here again.

---

## Missing `this`

### With properties

It can be the case we sometimes forget to use `this` in front of our properties, which will mean that JavaScript doesn't know what we're referring to...

```javascript
class FireFly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    size = 10;
  }
}
```

`Uncaught (in promise) ReferenceError: size is not defined   FireFly.js:5`

There is no variable called `size` in the program defined anywhere. We should have written `this.size` to make `size` a property of our new `FireFly` object.

This kind of error can be **even worse** if there **is** a variable called `size` somewhere in our program! Then our class **would** use that variable, setting it to `10`, and it would be doing the wrong thing.

### With methods

The same thing happens if we try to call a method within the class, but forget to include `this.` before it:

```javascript
class FireFly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  update() {
    move(); // UH OH!
    display(); // UH OH!
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
}
```

`Uncaught (in promise) ReferenceError: move is not defined   FireFly.js:9`

The same problem. There is no function called `move()` in this program. We intended to call the **method** called `move()` (and `display()`), but to do so we'd have needed to write:

```javascript
update() {
  this.move();
  this.display();
}
```

As above, this kind of error can be **even worse** if there **is** a function called `move()` or `display()` somewhere in our program! Then our class **would** call that method, and it would be doing the wrong thing.

---

### Typos in method names

```javascript
class FireFly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  update() {
    this.moov(); // OOPSIE!
    this.display();
  }

  move() {
    this.ex += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
}
```

`Uncaught (in promise) TypeError: this.moov is not a function   FireFly.js:9`

Easy to fix as it points to the line our typo is on! Can happen the other way, where we define the method name incorrectly, in which case it's a little more challenging to find:

```javascript
class FireFly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  update() {
    this.move();
    this.display();
  }

  moov() { // OH DEAR
    this.ex += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
}
```

`Uncaught (in promise) TypeError: this.move is not a function   FireFly.js:9`

Here the problem is in the definition of the method as `moov()`, causing our "correct" calling of `this.move()` to fail. In these cases it's wise to remember we should always look at the **place we call a method/function** and **the method/function definition** to figure out what's going on.

---

## Behavioral errors

The behavioral issues associated with Object-Oriented Programming are fairly similar to those of functions overall. They tend to stem from incorrectly setting properties (especially to `undefined`) or neglecting to call the methods needed.

Generally speaking, a solid approach to debugging will involve placing `console.log()` statements in methods you're not sure are being called, and also using `console.log()` to display the values in the properties of an object to determine whether they're being set to incorrect values.

---

## Summary

- Syntax errors lead to mostly understandable error messages, or at least helpful pointers to the problem
- Behavioral can be helpfully debugged with `console.log()`

---

# }
