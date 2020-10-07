# Debugging conditionals {

---

## In this module

- Syntax errors
- The unreachable `if`

---

## Conditional statements

With conditional statements comes the possibility of making various typos when you're writing them. Here is a simple program that changes a circle's color based on the mouse position...

```javascript
let circle = {
  x: 250,
  y: 250,
  size: 100,
};

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(0);

  if (mouseX < width / 2) {
    fill(255, 0, 0);
  }
  else {
    fill(0, 255, 0);
  }

  ellipse(circle.x, circle.y, circle.size);
}
```

So that works. Now, let's look at the most "popular" issues and their error messages.

---

## Syntax error: missing both parentheses

```javascript
if mouseX < width / 2 {
  fill(255, 0, 0);
}
else {
  fill(0, 255, 0);
}
```

If we accidentally forget to put the parentheses around our __condition__ in the `if`-statement, we will get the error message

```
Uncaught SyntaxError: Unexpected identifier
```

We also get the line number, which correctly identifies the exact line our mistake is on. The error message isn't very helpful, so hopefully we will be able to see the mistake by looking at the line of code indicated.

The "unexpected identifier" issue here is JavaScript telling us that after it sees `if` it __always expects to see an opening parenthesis next__. Because the next thing it sees here is actually `mouseX`, that's unexpected, and an error.

You get the same error if you only omit the first parenthesis of the condiction.

---

## Syntax error: missing the closing parenthesis

We might just forget to __close__ the parentheses around our conditional...

```
if (mouseX < width / 2 {
  fill(255, 0, 0);
}
else {
  fill(0, 255, 0);
}
```

```
Uncaught SyntaxError: Unexpected token '{'
```

This is the same basic idea. JavaScript expected us to __close__ our parentheses __before__ telling it what action our conditional should take with our opening curly bracket. This error identifies the line again, so it's helpful.

---

## Syntax error: missing a curly bracket

What if we forget to open our curly brackets?

```javascript
if (mouseX < width / 2)
  fill(255, 0, 0);
}
else {
  fill(0, 255, 0);
}
```

```
Uncaught SyntaxError: Unexpected token 'else'
```

This error indicates the line our `else` is on, which is __not__ where the actual problem is. Some errors are like this because the error that JavaScript sees is related to our mistake, but it only comes up later in our code. This makes them depressingly harder to find unfortunately.

The key here is to look at our code and see that the `else` is clearly fine. Instead, we will need to move upward from that point to locate the thing that made the `else` unexpected. In these kinds of error we can __very often__ suspect a missing curly bracket, so we should be on the lookout for that specifically.

Still, these ones are tough, and they are why you should __always__ match your curly brackets properly.

Forgetting the closing curly bracket leads to the same kind of error.

__Make sure you match your curly brackets properly! It can be really hard to solve later!__

---

## Always `true`!

Moving away from error messages, another thing that can happen is we accidentally write a condition that is always `true`...

```javascript
if (mouseX >= 0)
  fill(255, 0, 0);
}
else {
  fill(0, 255, 0);
}
```

Our circle is __always red__ now because we wrote a condition that can't be `false`. We can't move the mouse so that `mouseX` is __less than `0`__, and so the `else` of our `if`-statement can never happen.

You will generally be able to find these problems when you program just __won't do something you think you wrote the code for__. One thing to suspect is a poorly written condition.

---

## Invisibly always `true`!

The previous example of a conditional with a condition that is always `true` was relatively easy to spot in our program because there's a __visual__ component: we notice that no matter where we move our mouse, the circle is red, and this tells us what's wrong.

However, a lot of our lines of code (including conditionals) aren't necessarily things that are __visible__ on the screen. In these situations, if we suspect a conditional might be a problem, we can use `console.log()` to check whether or not a particular `if` or `else` is ever occuring. Imagine we're instead tracking whether the mouse is to the "left" or "right" on the canvas, but we get it wrong...

```javascript
let mouseIsLeft = undefined;

if (mouseX > 0) {
  console.log("Mouse is to the right...")
  mouseIsLeft = true;
}
else {
  console.log("Mouse is to the left...")
  mouseIsLeft = false;
}
```

Now when we run our program, even though we don't __see__ `mouseIsLeft` visually, we're going to see that no matter where we move our mouse, we __only ever see the second message__ ("Mouse is to the right..."). That will tell us that our conditional can never be `false`!

Then we can examine our conditional and realize that its condition doesn't really check what we wanted and change it (to `mouseX > width/2` in this case).

---

## Always false!

We can of course have the exact opposite problem, where we write a condition that is always `false`...

```javascript
if (mouseX < 0)
  fill(255, 0, 0);
}
else {
  fill(0, 255, 0);
}
```

Same issue. A condition that can't be `true` means that the `else` will always be in effect. (Or, if you have no `else`, your `if`-statement will just be ignored.)

---

## Summary

- Syntax errors generally come from forgetting parentheses or curly brackets
- Other errors are usually from poorly written conditions that don't mean what you wanted
- If your error is something you can see/hear/experience when the program runs, focus on the figuring out the incorrect __behavior__ of the program to narrow down the culprit
- If it isn't, use `console.log()` inside your conditionals to check what code is being run and what isn't

---

# }
