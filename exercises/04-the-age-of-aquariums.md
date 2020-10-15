# Exercise 04: The Age of Aquariums {

#### Grade
- 1.25% of final grade (see guidelines at bottom)  

#### Deadline
- Section A (Thursdays): 11:59PM, 22 October 2020.
- Section B (Tuesdays): 11:59PM, 20 October 2020.

## Objectives

1. Working with arrays and `for`-loops
2. Working with arrays and random selection

## Set up

1. Download the `template-p5-project` and rename the folder to `exercise4`
3. Move the `exercise4` folder to your `exercises` folder
4. Open the `exercise4` folder in Atom
5. Commit and push in GitHub Desktop with a message saying "E4: Started exercise 4"

## Brief

Begin with the "Aquarium" simulation from [Introducing arrays](https://pippinbarr.github.io/cart253-2020/topics/arrays/introducing-arrays.html) in its final form with the ability to add a fish.

Once again, think about how you want to change the meaning/nature of the simulation (instead of fish it might be chickens, or viruses, or feelings). Make it __yours__. (If you want to keep it about fish, that's okay too so long as you follow the requirements.)

Make your changes to the simulation with the following requirements:

1. __Add a user-controlled shape (or image)__
  - This can be controlled with the mouse or keyboard or whatever you like
2. __Make the user interact with the fish (or whatever they are in your simulation)__
  - It could make them disappear (eating fish? counting chickens? destroying viruses? feeling feelings?)
  - It could make them run away (scaring fish or chickens? Immunity to the virus? Pushing away bad feelings?)
  - It could attract them (fishing lure? very popular with chickens? not wearing a mask? easily overwhelmed?)
  - It could disappear/end the simulation if the user is touched (pecked or nibbled to death? caught COVID-19? felt too many feelings?)
  - Or some combination of the above, or anything else!
  - Remember you'll need to use a `for`-loop to call a function that makes the user and each element in the array interact
3. __Change the fish (or whatever) creation__
  - Include more parameters so that the fish (or whatever) can be more varied (color? speed? size?)
  - Add at least one new property to the fish (or whatever) that changes their behaviour  
4. __Add at least two endings__
  - Currently the simulation never ends, so make it end in at least two ways
  - You'll need states to do this (at least for the simulation and the two endings, you can add a title and instructions too if you like)
  - Maybe you either eat all the fish or you run out of time? (A simple timer could check the `frameCount` variable built into p5 and when it is greater than a specific amount, the ending is triggered)
  - Maybe there is a special fish (or whatever) that triggers a special ending?

## Submission

Submission will take place on __Moodle__. Go to the appropriately named __exercise__ on the Moodle and then submit your work there.

Your submission should just be plain text that includes (substituting your GitHub username and any difference in the folder names):

1. A link to your exercise code (e.g. https://github.com/pippinbarr/cart253/tree/master/exercises/exercise4/)
2. A link to your project on the web (e.g. https://pippinbarr.github.io/cart253/exercises/exercise4/)

## Evaluation

Grading for exercises is pass/fail. Passing requires __all__ of the following to be satisfactory:

- __Runs__ and __meets the brief__
- Has __suitable commenting__
- Includes a __starting commit__ and then a reasonable number of commits throughout the work that include __descriptive messages__ about what was done. Messages should be __prefixed by `E4:`__.
- Uses __good naming__ for added variables
- Is __well structured__, with new code added in sensible places in sensible orders

---

# }
