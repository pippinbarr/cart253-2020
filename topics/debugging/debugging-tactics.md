# Debugging {

---

## Programming doesn't work

You may have noticed that your __programs often don't work__

You may have noticed this happens __all the time__

You may have noticed that the default state of a program is: __not working__

And if it's working its default state is: __not doing what you wanted__

---

## Bugs

Any aspect of our program that is causing it either not to run at all or to run incorrectly is called a __bug__.

Some bugs are __syntax errors__ where we've typed something that doesn't make sense to JavaScript. But arguably the worst of all are the bugs in __behaviour__, where our program itself "works" (it runs), but it doesn't behave correctly (maybe it's a blank screen, maybe something isn't displaying, maybe something is in the wrong place, etc.)

---

## Debugging!

We call the process of fixing the bugs in our code "__debugging__".

To some extent it's tempting to say that most of programming basically __is__ debugging.

Controversially, we might even say that debugging is __actually pretty fun__ once you get used to it.

In terms of improving our abilities at debugging, the big two elements are...

### Knowing what _can_ go wrong

This one is tricky as a beginning because we haven't built up a database of all the kinds of weird things that happen in a program. We haven't even had a chance to learn what all the various red syntax errors in the JavaScript console are trying to tell us.

Part of becoming a better programmer is just __learning__ these things as we encounter them. The first time you run into a "ReferenceError" telling you a variable doesn't exist, it's very disorienting. But over time, as you encounter and fix this problem over and over, you get used to the idea that it's usually just a typo.

## Knowing how to figure out what _did_ go wrong

For the red syntax errors that show in the JavaScript Console, it's often relatively clear __where__ and __what__ the problem is. Often the error literally tells you the line in your program that is the culprit, though occasionally the line listed as having the error isn't actually where you need to look (more on that later).

For behavioural bugs, it's more complex and we have to develop strategies for figuring out where things are going wrong as well as just lived experience with programming.

---

## Syntax errors

We've covered the basic syntax errors elsewhere. Remember that the most common culprits are:

### Typos

### Forgetting what a function is called

### Missing parentheses

### Missing curly brackets

So, syntax errors are usually the easiest to fix because the JavaScript Console notices them for you. It's not too bad at warning you about most of the common syntax errors and a lot of the time its error messages can even be pretty helpful...

---

## Behavioral errors

Again, we cover specific behavioral issues elsewhere, but the some classic issues are:

### Forgetting to call a function

### Passing incorrect arguments to a function (especially `undefined` arguments)

### Using `=` instead of `===`

```javascript
"use strict";

let x = 250;
let y = 250;
let size = 100;

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  if (x = 250 && y = 250) {
   ellipse(x,y,size);
  }
}
```

---

## Bugs and errors are inescapable

You will undoubtedly run into many errors as you write more and more complicated programs.

It's a real mixed bag in terms of whether you will get an error message or not

Much of improving at debugging comes down to:

1. Experiencing every kind of error and remembering the kinds of things that happen and how to fix them
2. Avoiding the kinds of mistakes you're already familiar with in the first place (like curly brackets!)


---

## Okay, my program works now...

__... but it doesn't, you know... work.__

- As we all know, just fixing all the errors in a program isn't enough
- Once we've done that we need to fix all the errors we wrote in __perfectly good code__

---

## The basic process

1. Run your program
2. Notice it doesn't do what you expected (__testing__)
3. Figure out what is causing the problem (__debugging__)
4. Fix the problem (__debugging__)
5. Go to 1 (it's okay to begin weeping around iteration five or so)

---

## Testing

Because you write your own code, __testing__ is a little bit easier than it would be for someone else: you __know__ what your program is meant to do, so you __know__ when it's not doing that.

As your programs get more complicated, though, you do need to be more __thorough__ with testing. And with __interactive__ programs someone other than you will use it (the dreaded user!) and they will do weird things you might not have thought about.

What if they press every key at once? What if they head-butt the mouse repeatedly? What if they keep clicking a spot on your button that doesn't work?

Thus, with interactive programs it's a very good idea to get someone else to use your program and to observe them doing so to figure out the kinds of things they end up doing that you wouldn't have expected.

---

## Debugging

Once you run into an actual problem in your code it's a good idea to think about what __kind__ of problem it is, especially in relation to your own code. This will allow you to __find__ the location of the problem more easily.

If it's a problem with the way some user-controlled element is moving, you can probably start out looking in the function that __makes that thing move__ or perhaps in the function that __listens to the user input__. (This is just another part of why breaking everything up into functions is such a good idea.)

In essence, we need to be like a detective, working out the most reasonable explanation for why something doesn't work and investigating in the most likely place that would cause that.

---

## Some tactics

There are a few basic things you can do to make your life of debugging easier:

1. __Format__ your code
2. __Simplify__ your code
3. Send yourself __messages__
4. __Show it__ to someone else
5. Take a __break__
6. Ask for __help__

---

## Format

## Remember to use proper formatting

It is __really__ important to make sure that when you write (and debug) code it is properly indented. This is best achieved with a package in Atom that will automatically do this for you.

`atom-prettier`, which you should have installed already, has an option in its preferences called "Format files on save" which you should have __on__. This will autoformat your entire file whenever you save it, which is __very__ helpful.

In particular, formatting our JavaScript files will often help to identify serious issues in the code, particularly around missing curly brackets which are the bane of our existence!

---

## Simplify

One beauty of the __modularity__ we get from functions (and later Object-Oriented Programming) is that we can more easily __simplify__ our program.

If we're having trouble with the way some fish are moving around, we can start by just commenting out all the functions that deal with the fish to see if our program works __without them__. If it __does work__, the problem is with our fish and their functions. If it __still doesn't work__, the problem is __not__ with the fish.

The benefit here is to zero in on exactly __where__ in our code the problem is being created.

---

## Extreme simplifying

An extreme version of the __simplify__ approach is to comment out __literally everything__ in your `setup()` and `draw()` functions and then gradually add things back in by uncommenting them __one by one__. Mostly obviously in `setup()` first and then `draw()`, in order.

When your problem shows up, you know with certainty that the last thing you uncommented is a part of the problem!

---

## Messages

Easily the most common way to debug is by sending __messages__ inside the code with `console.log()`. This is especially useful to

1. Print a message to __show that the program reached a certain point__ (e.g. that a specific function is being called, or that a loop is actually looping)
2. Print out the __values of variables or parameters__ to check if they're reasonable, to watch them change, etc. (is something `undefined`? is something negative when it shouldn't be?)

---

## Show it

As a programmer in a programming course, you're usually surrounded by other people who know how to program to varying degrees. So, if you're totally stuck on a weird bug, __show it to someone else__.

If nothing else, the process of __explaining__ what is going wrong will often trigger a realization of how to __fix__ it!

If you're capable of sufficient dissociation, this can even work if you just verbally explain your code __to yourself__.

> Me: Hey... uh, me?"
> Me: Yeah?
> Me: This circle just will not display on the screen...
> Me: Oh yeah? That's no good.
> Me: Yeah, it almost like there an undefined parameter or s-... wait a second! There it is. Fixed it.
> Me: Oh.. yeah, good for you.

---

## Take a break

You have probably experienced the obsession of trying to fix a bug for multiple hours with no luck.

It's very tempting and even perversely "easy" to just keep going and going and going on a bug. It's probably not a good idea though. You can end up totally exhausted and not able to think straight, which is not the best situation for debugging.

Taking a break, even a short one, is often a great way to suddenly come up with the answer. Go for a walk, just stand up and stretch, pat a cat, go to sleep for four days, just do something else.

---

## Ask for help

It is a great instinct to want to work through all the problems in your code on your own, you'll learn a lot.

However, it's important, too, to remember that we're here to __learn__ how to program, not to already be good at it. So, if you're struggling, just ask for help.

There is studio time, office hours, email, Discord, latent psychic powers. So many ways to reach out.

---

## Dark Arts Option: Call it a feature!?

One of the darker arts in programming is to sometimes decide that an element of your program that doesn't work the way you wanted is actually... __what you wanted__.

This is __only__ a good idea if you actually __understand__ why it doesn't work. That is, you understand why your code does what it does.

Still, it can be an interesting design process to consider: __not all unexpected behavior in your code is necessarily bad__.

---

# }
