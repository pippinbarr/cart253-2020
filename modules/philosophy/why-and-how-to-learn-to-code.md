# Why and how to learn to code? {

---

## Why programming?

Hopefully you don't seriously need to ask this question, but...

Software is an incredibly exciting __medium for artistic expression__. Think of videogames and virtual reality experiences and digital media installation work and weird websites and amazing apps. It's all driven entirely or primarily by software.

Software is __how the world works now__. Beyond the world of art and entertainment, so much of our lives are dictated and shaped by software. We do banking with software, we talk to our friends via software, we order pizza with software, we buy pet food with software. Software, software, software.

Software __pays the bills__. Getting a job as an artist or videogame designer or 3D modeller is entirely possible, but getting a job as a software developer more generally is a much safer bet. People want to pay those of us who can create software.

And __programming is how we create software__

---

## Why JavaScript?

In this course we're learning to program with a specific programming language: JavaScript. Why?

- Because it is the __language of interactivity__ on the web

Pretty much every fancy thing you see a web page do is being done with JavaScript.

- Because it is a __good learning language__

JavaScript is a great learning language because so many people use it for so many tasks. For any question you have, there is likely an answer online. For any genre of program you want to write, there is probably a community online.

Perhaps most importantly for learning, JavaScript is a modern language with the standard suite of features we expect to see. Your knowledge of JavaScript will allow you to learn other languages much, much more easily.

- Because it is __incredibly popular__

Given that JavaScript is what drives the web, it's understandably a very popular language to use out in the world. Any web developer needs to know JavaScript!

- Because it has __countless libraries and extensions available__

JavaScript has been around for a long time and has had many, many libraries and extensions created for it that give you greater power with less work! (More on this later in the course.)

- Because it is __not just for the web__

JavaScript isn't limited to programming for the web. With technologies like [Node](https://nodejs.org/en/) and [Electron](https://electronjs.org/) you can build your own applications in JavaScript.

---

## Why p5.js?

In this course we use a "library" called "p5.js" on top of JavaScript to do our work. Why?

- p5.js is a web-native, __JavaScript version of [Processing](https://processing.org/)__, the popular teaching environment, so it has a tried-and-true teaching history.
- p5.js provides a __thoughtful and constrained set of elements__ to learn programming with
- p5.js allows us to __create visual programs quickly and easily__

Check out some __[examples](https://p5js.org/examples/)__ of people using p5.js to do neat stuff.

---

## Why focus on playful interaction?

In this course the kinds of programming we'll do with have an emphasis on being __playful__. Why?

- Because playful interactions tend to be __computationally intensive__

Play is one of the most interestingly complex interactions we can create using software. The most obvious example if the enormous videogame industry, but playfulness is everywhere and is a great design approach to all kinds of interactivity.

- Because if we can program something playful and interactive, we can __program pretty much anything__

The skills needed to make playful experiences demand learning all kinds of coding approaches, from user-interfaces to tracking user data to sophisticated input schemes.

- Because __it's just more fun__ to practice programming with play

Ultimately, if the thing you're making is designed to be fun and playful (whether it's a game or something else), you're probably just going to enjoy making it more!

---

## How do I learn programming? By being taught.

- This is a course designed to teach you programming in JavaScript
- From the ground up
- With the specific aim of giving you a solid foundation in the fundamentals
- And therefore the ability to expand your abilities moving forward

---

## How do I learn programming? By asking questions.

- This is a course where we absolutely welcome questions at any time
- If you're ever slightly confused, getting lost, have something to contribute: speak up
- The course is far more interesting when people are asking questions
- If you have a question there is a high, high probability someone else is wishing someone would ask it too

---

## How do I learn programming? By practicing.

- Programming can often make perfectly good sense when someone explains it to you
- It's logical, there aren't that many scary concepts (really!)
- But the only way you really learn is to practice
- You need to __spend a lot of time programming__

Unsurprisingly it's like learning anything practical. __Practice__ makes perfect. When you learn the guitar, it's one thing to listen to someone tell you the different strings and how frets work and then watch them play a song using that information, but it's very different getting your brain to understand how to __do__ that.

Practice, practice, practice.

---

## How do I learn programming? By experimenting.

- Programming can be intimidating because it's easy for things to go wrong
- That can scare us away from just playing around with it
- But playing around with code is fun, and a great way to learn what's possible
- When you're just starting you can't really just "make stuff up", but you can definitely play around with __numbers__, for example
- Whenever we use a number in our code, why not try using a whole range of different numbers just to see what happens?
- Sometimes nothing very interesting happens, sometimes we get a pleasant surprise!
- Having an experimental mindset is a great way to learn more about how programming behaves in the real world

---

## How do I learn programming? By helping others.

- Like any course, there will be different levels of ability with programming distributed among you
- If you can help someone else with something, do it - it will help you learn the concepts better too
- But do remember that everyone here is trying to __learn__, so give people space to work things out for themselves

---

## How do I learn p5.js?

- As we delve into programming a question will arise:

> How the heck am I supposed to _know_ what to write to draw a circle? Or a line? Or make something red?""

It's a good question, and the answer is: __documentation__.

__Nobody "just knows"__ all the possible functions and their parameters. All of us are _constantly_ looking things up to remember them or to find new things, so getting used to reading documentation is a crucial skill

For now, the most important documentation for us is [The p5 Reference](https://p5js.org/reference/). This is a webpage that contains the names of __everything__ you can do with p5.js. Go ahead and check it out now!

In a very real sense, this collection of things _is p5_, this is what it does. There are two obvious ways to use the reference:

1. You can __look up__ the specifics of something you're trying to do (like detect a mouse click)
2. You can __browse__ the reference to discover new possibilities by just reading stuff at random and seeing what's in there.

The p5.js reference is especially nice in that it pretty much always provides __example code__ that illustrates what a specific part of the p5.js library does. Try them out! Paste them into your own code and play around with them until you get a sense of it.

---

## Use the reference!

If you're uncertain about how some part of p5.js works your __first__ action should be to read the appropriate page in the reference.

Let's say you're unsure of how to draw a circle.

1. Go to the reference page
2. Search for "circle" in there
3. Click on the [`circle()`] link to get to the specific documentation
4. Look at the example at the top, which shows you a simple circle-drawing instruction
5. Read the description below for a detailed explanation in plain language
6. Read the syntax section for the specifics (especially the "parameters" that circle expects, which are its x location, its y location, and its diameter)

Naturally, you won't always know the correct name of what you're looking for, which is why it can be good to just browse. And naturally, this course will teach you a lot of the names, too.

As you're reading the documentation, you'll probably also run into things you don't understand yet, but by the end of the course __every single thing in the reference will be understandable to you__.

---

## How can I learn JavaScript more generally?

p5.js is a very specific way of thinking about JavaScript, but __p5.js is not JavaScript__.

All the fundamentals of programming like functions, variables, conditionals and more are part of the __programming language__ called JavaScript, whereas all the things like drawing circles, coloring them in, and displaying images in the p5.js reference are part of the __library__ called p5.js.

The main objective of this course is for you to know __JavaScript__, so we'll be covering everything from the ground up. But you can also check out the internet, which has many, many resources available. As a place to start, check out the [Resources](../../course-information/resources.md) page for suggestions.

---

## Don't use the internet too much!

There's so much information about programming on the internet it could get confusing. Try to resist diving all the way in before you quite know what you're doing.

For this course you hopefully shouldn't __need__ other resources, even though they can be helpful.

Most especially __please resist taking code from online and using it in your own projects__. Naturally people do this in the real world, but when we're learning it tends to cause far more trouble than it's worth. You'll end up doing it anyway, but be aware it can lead to problems understanding code yourself.

---

## So... why?

- Because knowing how to program is probably one of the single most important skills you can have today
- Because making art and interactive experiences and websites and videogames is fun and rewarding

---

## And... how?

- Follow the course
- Practice
- Experiment
- Read the p5 reference
- Read online resources about programming
- __Don't rely too much on finding solutions online__

---

# }
