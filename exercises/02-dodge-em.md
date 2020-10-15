# Exercise 02: Dodge-em {

#### Grade
- 1.25% of final grade (see guidelines at bottom)  

#### Deadline
- Section A (Thursdays): 11:59PM, 1 October 2020.
- Section B (Tuesdays): 11:59PM, 29 September 2020.

## Objectives

1. Writing your own if-statements
2. Working with loops for drawing
3. Playing with the mouse
4. Learning to display `image()`s

## Set up

1. Download the `template-p5-project` and rename the folder to `exercise2`
3. Move the `exercise2` folder to your `exercises` folder
4. Open the `exercise2` folder in Atom
5. Commit and push in GitHub Desktop with a message saying "E2: Started exercise 2"

## Brief

Improve (or just change!) the COVID-19 "simulation" from [Activity 4](../activities/04-dodging-covid19.md) with a new interaction style, new visuals, and even a new meaning (if you like).

Your program should:

1. __Change the way the user controls their circle__
  - Idea: make the circle __follow__ the mouse instead of just teleport to its location (see [Movement lecture](../modules/04/movement.md#speed-returns), consider acceleration if you're feeling ambitious!)
  - Idea: make the user __drag__ the circle (see [Mouse input lecture](../modules/04/mouse-input.md#a-draggable-circle))
  - (Optional idea: let the user control the circle with the __keyboard__ (we'll talk about this next week, but you could look at the keyboard documentation in the [Events](https://p5js.org/reference/#group-Events) section of the p5 reference))
2. __Add at least one new `if`-statement__ (including at least an `else`) that changes the nature of the simulation
  - Idea: make the COVID-19 circle move vertically toward the user while it moves left to right
  - Idea: make the COVID-19 circle grow if it is close to the user and shrink (back to a minimum size) when it is further away
  - Idea: make the user circle change color if it is moving by checking its `vy` and `vy` properties (maybe it could become harder to see?)
3. __Change the way the simulation looks__
  - Idea: new colors, new shapes, change the `for`-loop, etc.!
  - Idea: you could even to change what it is "about" to something else, like avoiding negative thoughts or avoiding work or even trying to _catch_ something elusive).
4. __Use at least one image__
  - Read the [`loadImage()`](https://p5js.org/reference/#/p5/loadImage) (pay attention to the new `preload()` function too!) and [`image()`](https://p5js.org/reference/#/p5/image) documentation.
  - Store your image files in `assets/images` in the project folder.

## Submission

Submission will take place on __Moodle__. Go to the appropriately named __exercise__ on the Moodle and then submit your work there.

Your submission should just be plain text that includes (substituting your GitHub username and any difference in the folder names):

1. A link to your exercise code (e.g. https://github.com/pippinbarr/cart253/tree/master/exercises/exercise2/)
2. A link to your project on the web (e.g. https://pippinbarr.github.io/cart253/exercises/exercise2/)

## Evaluation

Grading for exercises is pass/fail. Passing requires __all__ of the following to be satisfactory:

- __Runs__ and __meets the brief__
- Has __suitable commenting__
- Includes a __starting commit__ and then a reasonable number of commits throughout the work that include __descriptive messages__ about what was done. Messages should be __prefixed by `E2:`__,
- Uses __good naming__ for added variables
- Is __well structured__, with new code added in sensible places in sensible orders

---

# }
