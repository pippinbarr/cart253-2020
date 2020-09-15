# Debugging guide

1. [Debugging suggestions](#debugging-suggestions)
2. [`console.log()`](#console-log)

## Debugging suggestions

1. __Always have the JavaScript console open__. You should never be seriously working on code without it.
2. __Use `console.log()`__ (or the Debugging tools). Print out messages and values in variables to help work out where the problem is.
3. __Simplify your code__. Try to zone in on where in your code the problem is by removing parts of the code (comment them out) until the problem disappears (then you know where the culprit is!).
4. __Show your code to someone else__. Explaining your code to someone else can help you find the problem, or help them to spot it for you.
5. __Take a break__. Don't keep debugging the same problem for hours, make sure you rest and take breaks.
6. __Ask for help__. Don't forget to ask Pippin or your TA or a knowledgeable friend if you need to.

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
