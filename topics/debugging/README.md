# Debugging guide

1. [Debugging basics](#debugging-basics)
2. [The JavaScript Console](the-javascript-console.md)
3. [`console.log()`](#console-log)
4. [`"use strict";`](use-strict.md)
5. [Debugging tactics](debugging-tactics.md)
6. [Debugging variables](debugging-variables.md)
7. [Debugging conditionals](debugging-conditionals.md)
8. [Debugging loops](debugging-loops.md)
9. [Debugging functions](debugging-functions.md)
10. [Debugging object-oriented-programming](debugging-object-oriented-programming.md)

## Debugging basics

1. __Always have the JavaScript console open__. You should never be seriously working on code without it.
2. __Use `console.log()`__ (or the Debugging tools). Print out messages and values in variables to help work out where the problem is.
3. __Use `"use strict";`__. It should be at the top of your `script.js` file and will save you from specific errors.
4. __Simplify your code__. Try to zone in on where in your code the problem is by removing parts of the code (comment them out) until the problem disappears (then you know where the culprit is!).
5. __Show your code to someone else__. Explaining your code to someone else can help you find the problem, or help them to spot it for you.
6. __Take a break__. Don't keep debugging the same problem for hours, make sure you rest and take breaks.
7. __Ask for help__. Don't forget to ask Pippin or your TA or a knowledgeable friend if you need to.

## `console.log()`

You can use `console.log()` to print messages while your program is running. You can print out text messages:

```javascript
console.log("My program is working!");
```

You can also print out the values in variables:

```javascript
console.log(circleX);
```

But it's probably better to print values with some extra text. You can do this with "string concatenation":

```javascript
console.log("circleX: " + circleX + ", circleY: " + circleY);
// Prints something like:
// circleX: 100, circleY: 200
```

Or you can do the same with with template strings, which is preferred:

```javascript
console.log(`circleX: ${circleX}, circleY: ${circleY}`);
// Prints something like:
// circleX: 100, circleY: 200
```
