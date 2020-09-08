# Debugging variables {

---

## Variables can cause trouble

Like any new piece of programming we learn, variables have the potential to go wrong. So we need some strategies for dealing with the classic issues we'll run into.

Let's talk about...

- Forgetting to declare
- Typos
- Seeing inside variables with `console.log()`
- `undefined`
- `NaN`
- Extra: Seeing inside variables with the debugger

---

## Back to the moving circle

Let's return to our moving circle code and introduce some common issues.

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + circleSpeed;
}
```

---

## Forgetting to declare

One way we might make a mistake in our code is if we forget to actually __declare__ one of our variables with `let` at the top. We might forget to declare `circleY`, say...

```javascript
let backgroundShade = 0;
let circleX = 0;
let circleSize = 100;
let circleSpeed = 1;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circleX,circleY,circleSize);
  circleX = circleX + circleSpeed;
}
```

---

## Summary

- ...

---

# }
