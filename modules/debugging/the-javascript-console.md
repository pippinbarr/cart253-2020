# The JavaScript console {

---

## Programming doesn't work

- You will notice that when you write programs they don't work
- You will notice this happens all the time
- You will notice that the default state of a program is "not working"
- And if it's "working" its default state is often "not the way you wanted"

__We constantly need to _debug_ our work__

---

## Bugs! Gross!

- We can think of a "bug" as basically any problem with our program
- Many of them are _syntax errors_ where we've typed something that doesn't make sense to JavaScript in some way
- But the worst ones of all are the errors in _behaviour_, where the program itself "works" (it runs), but it doesn't do what you thought it would

__True story__: The story goes that they're called "bugs" from back in the day when moths used to fly into the vacuum tubes of Ye Olde Computers and cause them to stop working or work incorrectly. Debugging meant literally finding and removing a real physical insect from the hardware!

---

## Debugging!

- Debugging is the process of going through our code and getting rid of all the bugs
- Controversial opinion: __Debugging is actually pretty fun__ once you get used to it
- It's like solving a puzzle or, you know, hunting for a fugitive in a dark forest with only a flashlight and your wits to guide you
- One big part of debugging is just knowing the kinds of things that can go wrong
- Another big part of debugging is having strategies for finding where those things are

---

## The JavaScript console

- For right now, we're just going to learn about the existence of our strongest ally in debugging JavaScript code
- It's called the JavaScript console and we access it via the _browser_
- Let's get set up and take a look

---

## A program

```javascript
function setup() {
  createCanvas(500,500);
  background(255,200,200);
  fill(0);
  ellipseMode(CENTER);
  ellipse(250,250,200,200);
}

function draw() {
}
```

---

## Run your program

- Use `atom-live-server` to start a local server and run the program
- You should see a black circle on a pink background
- Everything is working as expected!

---

## Open the JavaScript console

- In Chrome go to `View > Developer > JavaScript Console`
- In FireFox go to `Tools > Web Developer > Web Console`
- A new window will show up in your browser
- You will likely see the text "Live reload enabled.", which is `atom-live-server` reporting for duty
- That is the JavaScript console
- Because everything is going well, it doesn't need to say much

__Good ideas:__ Ideally, memorize the shortcut for bringing up the JavaScript console. Also, get into the habit of __always having it open__. You'll need it.

---

## Cause a problem

- In Atom, go to your script and let's break it a bit
- Misspell `background` as `bckground`

```javascript
function setup() {
  createCanvas(500,500);
  bckground(255,200,200);
  fill(0);
  ellipseMode(CENTER);
  ellipse(250,250,200,200);
}

function draw() {
}
```

- Go back to Chrome and notice that the program stopped working! Nothing displays anymore.

---

## Brokenness

We can tell the program is broken in two ways:

1. Most obviously, it doesn't display _at all_ in the browser
2. But now that we have the JavaScript Console open, we can also see a nice red __error message__:

```text
Uncaught ReferenceError: bckground is not defined
    at setup (script.js:3)
    at e.<anonymous> (p5.min.js:7)
    at e.<anonymous> (p5.min.js:7)
    at new e (p5.min.js:7)
    at e (p5.min.js:7)
```

- This is a key use of the JavaScript Console: it reports errors in our code
- Again, for that reason we should __always open the console every time we run our code__!
- Seriously, don't even bother looking at your program without the console!

---

## Where?

```text
Uncaught ReferenceError: bckground is not defined
    at setup (script.js:3)
    at e.<anonymous> (p5.min.js:7)
    at e.<anonymous> (p5.min.js:7)
    at new e (p5.min.js:7)
    at e (p5.min.js:7)
```

- This error message tells us a lot
- Critically, it tells us _where_ it thinks the error is: `script.js:3`
- That means "line 3 of the file `script.js`"
- The fact that Atom numbers your lines is very helpful now!
- Also, you can type `Control-G` to specify a line to jump to if you have a big program

__Extra:__ You can see that the answer to "Where?" is actually more detailed than this:

- After `at setup (script.js:3)`, which is the part that tells us where in _our code_ the problem was, it also tells us the chain of places in other code that _led to our code_
- Right now this chain isn't all that helpful to us because it leads into the p5 library which we don't want to look at, but it can help us later on, so we'll come back to it

---

## What?

```text
Uncaught ReferenceError: bckground is not defined
    at setup (script.js:3)
    at e.<anonymous> (p5.min.js:7)
    at e.<anonymous> (p5.min.js:7)
    at new e (p5.min.js:7)
    at e (p5.min.js:7)
```

- The error message also tries to tell us _what the problem is_
- In this case it is an `Uncaught ReferenceError` that `bckground is not defined`
- A `ReferenceError` is a computer way of saying "I've never heard of this thing you're talking about, I don't believe it even exists!"
- When you see this error you should immediately suspect a _typo_ or some related mistake so examine the "not defined" thing in error message closely!
- There are other causes, too, and we'll come to them in the future

In this case, the explanation is right there in the error message: "bckground is not defined". It's literally showing you the typo you made.

---

## Fix it

- Having diagnosed the error using the console we simply go to our code and make the appropriate change
- Go to Atom and fix the broken code
- Then go back into Chrome and confirm that it works again
- That's debugging!

---

## Debugging!

- We now know the basic process for debugging in JavaScript
- We run our code in the browser (using `atom-live-server`)
- We make sure the JavaScript Console is open
- We look in the console to check for errors
- We interpret the errors
- We fix the errors
- We win at life???

---

# }
