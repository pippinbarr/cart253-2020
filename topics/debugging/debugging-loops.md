# Debugging loops {

---

## In this module

- Syntax errors
- The infinite loop

---

## Syntax errors

### Missing `(`

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while x <= width) {
    ellipse(x, y, size);
    x = x + size;
  }
}
```

`Uncaught SyntaxError: Unexpected identifier   script.js:11`

And indeed the opening parenthesis is missing on line 11.

---

### Missing `)`

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while (x <= width {
    ellipse(x, y, size);
    x = x + size;
  }
}
```

`Uncaught SyntaxError: Unexpected token '{'   script.js:11`

Again, the line identifier is correct and we just need to know the syntax well enough to spot the missing `)`. Note that the error is helpful, too, in that it tells us the `{` is __unexpected__. When something is unexpected it usually means something __before__ it is the problem.

---

### Missing `{`

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while (x <= width)
    ellipse(x, y, size);
    x = x + size;
  }
}
```

`Uncaught SyntaxError: Unexpected token '}'   script.js:15`

This is a tricky error message because it points to line 15, which is the __last__ `}` in the program, quite far from where the error is on line 11 (the missing `{`).

Here we need to think like JavaScript a little more. Essentially, the `}` on line 14 now __closes__ the code block for `draw()`, which is the last `{` in the program. This means that the next `}` on line 15 is technically closing __nothing__. Hence it is unexpected.

When we see an unexpected `}` error, we should either

- Search upward from the line number for a missing `{`
- Figure out that we literally have a __spare__ `}` in our program (this can happen)

We should __never just deleted the unexpected `}`__ and hope it will help. Make sure you know what the issue is before you try a fix.

---

### Missing `}`

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while (x <= width) {
    ellipse(x, y, size);
    x = x + size;

}
```

`Uncaught SyntaxError: Unexpected end of input    script.js:15`

Again the error does not point to the real location of the issue, but the error can help us. `Unexpected end of input` almost always means that the program reaches the end of the file without finding enough `}` to close the functions that are written in it.

To solve this error we should work backwards from the __bottom__ of the program and look for a spot that is missing a `}`.

Note that these curly bracket errors are also __vastly__ easier if you are indenting your code automatically with the `atom-prettier` or `atom-beautify` packages in Atom because a missing `{` or `}` will make the indentation of the program look __very wrong__.

e.g. with auto-indenting:

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while (x <= width) {
    ellipse(x, y, size);
    x = x + size;

  }
```

That final `}` is clearly being matches with the `while` loop, but this makes it clear there is no `}` matching the `draw()` function that the loop is in.

Just more evidence that forgetting curly brackets is hellish.

---

### Missing `;` in a `for` loop

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  for (let i = 0 i < 11; i++) {
    ellipse(x, y, size);
    x = x + size;
  }
}
```

`Uncaught SyntaxError: Unexpected identifier    script.js:11`

Correct line number. The unexpected identifier here is presumably the second `i` after `let i = 0` because it just doesn't make sense to JavaScript. Again, we should be able to eyeball the line here and see our missing element.

Same issue if you miss the other `;`, for the record.

---

## Behavioral errors

### Infinite loops

The main non-syntactical issue you can run into with loops is loops that never end! This happens when we write a condition that can never become `false`, which causes the loop to run over and over literally forever.

```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let x = 0;
  let y = 250;
  let size = 50;
  while (x >= 0) {
    ellipse(x, y, size);
    x = x + size;
  }
}
```

This `while` loop will never end because `x` is __always__ going to be greater than or equal to `0`. It starts at `0` and then it only ever gets larger (by `50` each time through the loop).

You won't see any error messages because JavaScript is technically doing the "right thing" based on the condition you wrote.

In practice this will cause your computers fans to spin up as the processor does lots and lots of repetitive work, and probably your browser tab will crash at some point.

Visually you'll see your program freeze (or not display at all). This, paired with no errors in the JavaScript Console and signs your computer is working very hard suggest an infinite loop.

Importantly, you'll most likely need to __close the tab__ and restart your server to recover from this kind of error (once you've fixed it).

---

## Summary

- Loops suffer the usual kinds of syntax errors associated with typoes or forgetting key pieces of the syntax (like parentheses or curly brackets)
- Loops suffer the unique issue of __infinite loops__, in which a loop can never stop executing because its condition can never become false

---

# }
